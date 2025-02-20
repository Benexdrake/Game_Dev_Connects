import styles from '@/styles/modules/request/request.module.css'
import { FileType } from '@/types/file';
import { RequestBlockType, RequestType } from '@/types/request';
import { TagType } from '@/types/tag';
import { UserShortType, UserType } from '@/types/user';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import File from '../file/download_file';
import { APIResponse } from '@/types/api_response';

export default function RequestBlock(props:any)
{
    const {id} = props;
    const [requestBlock, setRequestBlock] = useState<RequestBlockType>();

    const getData = async () =>
    {
        const resultRequest = await axios.get<APIResponse>(`http://localhost:3000/api/request/${id}`).then(x => x.data)
        
        if(!resultRequest.status) return;
        const r:RequestType = resultRequest.data;
        
        // Tags
        const resultTags = await axios.get<APIResponse>(`http://localhost:3000/api/tag/request/${id}`).then(x => x.data)
        
        // User
        const resultUser = await axios.get<APIResponse>(`http://localhost:3000/api/user/short/${r.ownerId}`).then(x => x.data)
        if(!resultUser.status) return;

        // comment length
        const resultCommentsCount = await axios.get<APIResponse>(`http://localhost:3000/api/comment/count/${r.id}`).then(x => x.data)
        
        setRequestBlock({request:resultRequest.data, tags:resultTags.data, user:resultUser.data, count:resultCommentsCount.data})
    }

    useEffect(() =>
    {
        getData();
    },[])
    

    return (
        <>
            {requestBlock?.user && requestBlock?.request && (
                <article className={styles.main}>
                    <>
                        <Link href={`/request/${requestBlock?.request.id}`}>
                            <div style={{display:'flex', padding:'16px 16px 8px 16px'}}>
                                <img className={styles.avatar} src={requestBlock?.user?.avatar} alt="" />
                                <div style={{width:'100%', paddingLeft:'8px'}}>
                                <div style={{display:'flex', justifyContent:'space-between'}}>
                                    <p className={styles.username}>{requestBlock?.user?.username}</p>
                                    <p className={styles.date}>{new Date(requestBlock?.request?.created).toLocaleDateString('en-us', { year: "numeric", month: "short", day: "numeric" })}</p>
                                </div>
                                <div style={{textAlign:'center', paddingBottom:'8px'}}>
                                    <p className={styles.title}>{requestBlock?.request?.title}</p>
                                </div>    
                                <div className={styles.content}><p>{requestBlock?.request?.description}</p></div>
                                </div>
                            </div>
                            <div className={styles.tags}>
                                {requestBlock?.tags && requestBlock?.tags.map((tag:TagType) => ( <span className={styles.tag}>{tag.name}</span> ))}
                            </div>
                        </Link>
                            
                        <div className={styles.navbar}>

                                <Link href={`/request/${requestBlock?.request.id}`}> <div><i className="fa-solid fa-comment"></i>
                            {requestBlock?.count && (
                                requestBlock?.count
                            )}
                                 </div> </Link>
                            <div><i className="fa-solid fa-share"></i> 1</div>
                            <div><i className="fa-solid fa-heart"></i> 5</div>
                            <div><i className="fa-solid fa-chart-simple"></i> 100</div>
                            {requestBlock?.request.fileId !== 0 && ( <div className={styles.download}> <File fileId={requestBlock?.request.fileId} /> </div> )}
                        </div>
                    </>
                </article>
            )}
        </>
    )
}
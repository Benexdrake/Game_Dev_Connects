import LoginOutButton from "@/components/login_btn";
import RequestBlock from "@/components/request/request";
import { UserType } from "@/types/user";
import axios from "axios";
import { useSession } from "next-auth/react";

export default function Home(props:any) 
{
  const {data:session} = useSession();

  const {requestIds} = props;

  return (
    <>
      {session ?
      (
        <div>
          <div style={{display:'grid', gap:'8px'}}>
          { requestIds && requestIds.map((r:string) => {return <RequestBlock key={crypto.randomUUID()} id={r} userId={(session.user as UserType).id}/>})}
          </div>
        </div>
      )
      :
      (
        <LoginOutButton/>
      )}
    </>
  );
}

export async function getServerSideProps()
{
  const requestIds = await axios.get(`${process.env.FRONTEND_URL}/api/request`).then(x => x.data);

  return {
    props: {
      requestIds
    }
  }
}
import { APIResponse } from "@/types/api_response";
import { CommentType } from "@/types/comment";
import axios from "axios";

const url = process.env.url+'/comment/';

export const getCommentIds = async (parentId:number) =>
{
    return await axios.get<APIResponse>(`${url}${parentId}`).then( x => x.data)
}

export const getComment = async (id:number) =>
{
    return await axios.get<APIResponse>(`${url}id/${id}`).then( x => x.data)
}

export const addComment = async (comment:CommentType) =>
{
    return await axios.post<APIResponse>(`${url}add`, comment).then( x => x.data)
}

export const updateComment = async (comment:CommentType) =>
{
    return await axios.put<APIResponse>(`${url}update`, comment).then( x => x.data)
}

export const deleteComment = async (id:number) =>
{
    return await axios.delete<APIResponse>(`${url}delete/${id}`).then( x => x.data)
}
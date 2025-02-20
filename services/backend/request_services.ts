import { APIResponse } from "@/types/api_response";
import { RequestType } from "@/types/request";
import { RequestTagsType } from "@/types/request_tags";
import axios from "axios";

const url = process.env.url+'/request/';

export const getRequests = async () =>
{
    return await axios.get<APIResponse>(`${url}`).then(x => x.data)
}

export const getRequestById = async (id:string) =>
{
    return await axios.get<APIResponse>(`${url}${id}`).then(x => x.data)
}

export const getRequestCheck = async (id:string) =>
{
    return await axios.get<APIResponse>(`${url}check/${id}`).then(x => x.data)
}

export const getFilesByRequestId = async (id:string) =>
{   
    return await axios.get<APIResponse>(`${url}files/${id}`).then(x => x.data)
}

export const addRequest = async (request:RequestTagsType) =>
{   
    return await axios.post<APIResponse>(`${url}add`, request).then(x => x.data)
}

export const updateRequest = async (request:RequestType) =>
{
    return await axios.put<APIResponse>(`${url}update`,request).then(x => x.data)
}

export const deleteRequest = async (id:string) =>
{
    return await axios.delete<APIResponse>(`${url}delete/${id}`).then(x => x.data)
}
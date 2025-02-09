import { updateProject } from "@/services/project_services";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler( req: NextApiRequest, res: NextApiResponse)
{
    const project = req.body;

    const result = await updateProject(project)

    res.status(200).json(result);
}

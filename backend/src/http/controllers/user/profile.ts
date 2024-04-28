import { Request, Response } from "express";
import { prismaUserRepository } from "../../../database/prisma-user-repository";

export async function ProfileController(req: Request, res: Response) {
    try {

        const userData = req.user


        const user = await prismaUserRepository.findById(userData.sub.id)

        if (!user) {
            throw new Error("Not have that user")
        }

        res.send({
            auth: true,
            user
        })

    } catch (err: Error | any) {
        res
            .status(400)
            .send({
                err: err.message,
                status: 400
            })
    }
}
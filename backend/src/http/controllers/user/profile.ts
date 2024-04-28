import { Request, Response } from "express";

export async function ProfileController(req: Request, res: Response) {
    try {

        const user = req.user

        res
            .json({ user })

    } catch (err: Error | any) {
        res
            .status(400)
            .send({
                err: err.message,
                status: 400
            })
    }
}
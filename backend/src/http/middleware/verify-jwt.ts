import { NextFunction, Request, Response } from "express";
import * as Jwt from 'jsonwebtoken'

const JWT_PAYLOAD = process.env.JWT_PAYLOAD as string

export const VerifyJwt = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { accessToken } = req.cookies

        if (!accessToken) {
            throw new Error("Don't have token")
        }

        const userData = Jwt.verify(accessToken, JWT_PAYLOAD)

        if (!userData) {
            throw new Error("Don't have a user data");
        }

        req.user = userData

        next()

    } catch (err: Error | any) {
        res
            .status(400)
            .send({
                err: err.message,
                status: 400
            })
    }

}
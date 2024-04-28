import { NextFunction, Request, Response } from "express";
import * as Jwt from 'jsonwebtoken'

const JWT_PAYLOAD = process.env.JWT_PAYLOAD as string

export const VerifyJwt = (req: Request, res: Response, next: NextFunction) => {
    const { access_token } = req.cookies

    const prefix = access_token.split(' ')[0]
    const token = access_token.split(' ')[1]

    if (!prefix || prefix != 'Bearer') {
        throw new Error("An error ocurred on token.")
    }

    if (!token) {
        throw new Error("An error ocurred on token.")
    }

    const _userToken = Jwt.verify(token, JWT_PAYLOAD)

    req.user = _userToken

    next()

}
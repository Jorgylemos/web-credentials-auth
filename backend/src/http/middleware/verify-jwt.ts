import { NextFunction, Request, Response } from "express";
import * as Jwt from 'jsonwebtoken'

const JWT_PAYLOAD = process.env.JWT_PAYLOAD as string

export const VerifyJwt = (req: Request, res: Response, next: NextFunction) => {
    const { accessToken } = req.cookies

    console.log(accessToken)

    // const prefix = accessToken.split(' ')[0]
    // const token = accessToken.split(' ')[1]

    // if (!prefix || prefix != 'Bearer') {
    //     throw new Error("An error ocurred on token.")
    // }

    // if (!token) {
    //     throw new Error("An error ocurred on token.")
    // }

    // const _userToken = Jwt.verify(token, JWT_PAYLOAD)

    // req.user = _userToken

    // next()

}
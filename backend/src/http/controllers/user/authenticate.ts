import bcrypt from 'bcrypt'
import Jwt from 'jsonwebtoken'

import { Request, Response } from "express";
import { prismaUserRepository } from '../../../database/prisma-user-repository';
import { prismaJwtRepository } from '../../../database/prisma-jwt-repository';

const JWT_PAYLOAD = process.env.JWT_PAYLOAD as string

export async function AuthController(req: Request, res: Response) {
    try {
        const { email, password } = req.body

        const email_regex = /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/igm.test(email)

        if (!email_regex) {
            throw new Error("Email have a error.")
        }

        const user = await prismaUserRepository.findByEmail(email)

        if (!user) {
            throw new Error("User doesn't exists")
        }

        const password_is_match = bcrypt.compare(password, user.password)

        if (!password_is_match) {
            throw new Error("Password is wrong")
        }

        const accessToken = Jwt.sign({
            sub: {
                id: user.id,
                email: user.email,
                username: user.username,
                password: undefined
            }

        }, JWT_PAYLOAD, {
            expiresIn: '1h'
        })

        const refresnToken = Jwt.sign({
            sub: {
                id: user.id,
                email: user.email,
                username: user.username,
                password: undefined
            }

        }, JWT_PAYLOAD, {
            expiresIn: '7d'
        })

        await prismaJwtRepository.store(user.id, refresnToken)

        res
            .status(200)
            .cookie('accessToken', accessToken, {
                httpOnly: true,
                sameSite: 'none',
                secure: true,
            })

        res
            .status(200)
            .cookie('refreshToken', refresnToken, {
                httpOnly: true,
                sameSite: 'none',
                secure: true,
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
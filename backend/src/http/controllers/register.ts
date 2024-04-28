import { Request, Response } from "express";
import { prismaUserRepository } from "../../database/prisma-user-repository";
import bcrypt from 'bcrypt'

interface RegisterProps {
    email: string;
    password: string
}

export async function RegisterController(req: Request, res: Response) {
    try {
        const { email, password } = req.body as RegisterProps

        const email_regex = /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/igm.test(email)
        // const password_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&_])[A-Za-z\d$@$!%*?&_]{minlength,maxlength}$/.test(password)

        if (!email_regex) {
            throw new Error("Email have a error.")
        }

        if (!password) {
            throw new Error("Password is wrong")
        }

        const password_hash = await bcrypt.hash(password, 10)

        await prismaUserRepository.create({ email, password: password_hash })

        res
            .status(200)
            .send({
                message: "User created!",
                status: 200
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
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export class PrismaJwtRepository {
    async store(userId: number, refreshToken: string) {
        const token = await prisma.session.create({
            data: {
                token: refreshToken,
                User: {
                    connect: {
                        id: userId
                    }
                }
            }
        })

        return token
    }
}

export const prismaJwtRepository = new PrismaJwtRepository()
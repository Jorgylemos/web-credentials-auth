import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

class PrismaUserRepository {

    async findById(id: number) {
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        })

        return user
    }

    async findByEmail(email: string) {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })

        return user
    }

    async create(data: Prisma.UserCreateInput) {
        const user = await prisma.user.create({
            data
        })

        return user
    }
}

export const prismaUserRepository = new PrismaUserRepository()
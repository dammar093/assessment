import { prisma } from "../lib/prisma.lib.js";
export class UserRepository {
    async create(data) {
        return prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: data.password,
            },
        });
    }
    async findByEmail(email) {
        return prisma.user.findUnique({ where: { email } });
    }
}
//# sourceMappingURL=auth.repository.js.map
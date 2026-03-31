import { prisma } from "../lib/prisma.lib.js";
import { User, UserRole } from "../generated/prisma/client.js";
import { RegisterInput } from "../dto/auth.dto.js";

export class UserRepository {
  async create(
    data: RegisterInput & { password: string },
  ): Promise<{ name: string; email: string; id: string; role: UserRole }> {
    return prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
      },
      select: {
        name: true,
        email: true,
        id: true,
        role: true,
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { email } });
  }

  async findById(id: string): Promise<{ name: string; email: string } | null> {
    return prisma.user.findUnique({
      where: { id },
      select: {
        name: true,
        email: true,
      },
    });
  }
}

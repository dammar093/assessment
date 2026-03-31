import bcrypt from "bcryptjs";
import { prisma } from "../src/lib/prisma.lib";
import { UserRole } from "../src/generated/prisma/enums";

async function main() {
  const hashedPassword = await bcrypt.hash("dammar123", 10);

  const admin = await prisma.user.upsert({
    where: { email: "dammarrana093@gmail.com" },
    update: {},
    create: {
      email: "dammarrana093@gmail.com",
      name: "Dammar Singh Rana",
      password: hashedPassword,
      role: UserRole.ADMIN,
    },
  });

  console.log("Seeding successful:", admin.email);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("Seeding error:", e);
    await prisma.$disconnect();
    process.exit(1);
  });

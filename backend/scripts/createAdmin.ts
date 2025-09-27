import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();
/*
admin@example.com
adminPassword97
*/
async function main() {
    const email = "admin@example.com";
    const password = "adminPassword97";
    const hashedPassword = await bcrypt.hash(password,12);

    const admin = await prisma.user.upsert({
        where: { email },
        update: {},
        create: {
            email,
            password: hashedPassword,
            role: "ADMIN",
        },
    });

    console.log("Admin created:", admin.email);
    console.log("Use this password to log in:", password);
}

main()
.catch((err) => {
    console.error(err);
    process.exit(1);
})
.finally(() => prisma.$disconnect());
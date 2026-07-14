import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.partner.upsert({
    where: { name: "合伙人A" },
    update: {},
    create: { name: "合伙人A", equityRatio: 0.5, note: "示例合伙人" }
  });

  await prisma.partner.upsert({
    where: { name: "合伙人B" },
    update: {},
    create: { name: "合伙人B", equityRatio: 0.5, note: "示例合伙人" }
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });

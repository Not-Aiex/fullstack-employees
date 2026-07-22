import db from "#db/client";
import { createEmployee } from "#db/queries/employees";

await db.connect();
await seedEmployees();
await db.end();
console.log("🌱 Database seeded.");

async function seedEmployees() {
  for (let i = 0; i < 11; i++) {
    const employee = {
      name: "Employee " + i,
      birthday: "2000-01-01",
      salary: i,
    };
    await createEmployee(employee);
  }
}

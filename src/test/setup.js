import dotenv from "dotenv";
dotenv.config();
import { execCmd } from "./execute.cmd";

export const runSetup = async () => {
  const cmd = `mysql -u ${process.env.DATABASE_USERNAME} --password=${process.env.DATABASE_PASSWORD} < ./src/test/fixtures/test_employees.fixture.sql`;

  const FixtureResult = await execCmd(cmd);

  if (FixtureResult) console.log(`MySQL test fixture successfully loaded`);
};

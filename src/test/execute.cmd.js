import { execSync } from "child_process";

export const execCmd = async (cmd) => {
  var result = true;

  await execSync(cmd, (error, stdout, stderr) => {
    if (error) {
      console.log(error.message);
      result = false;
    }

    if (stderr) {
      console.log(stderr);
      result = false;
    }

    if (stdout) {
      console.log(stdout);
    }
  });

  return result;
};

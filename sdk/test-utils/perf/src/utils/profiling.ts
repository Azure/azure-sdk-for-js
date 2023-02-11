import { Session } from "node:inspector";
import * as fs from "fs-extra";

export async function runWithCpuProfile(functionToProfile: () => Promise<void>, filePath: string | undefined) {
  const session = new Session();
  session.connect();
  session.post("Profiler.enable", () => {
    session.post("Profiler.start", async () => {
      // Invoke the logic
      await functionToProfile();
      // some time later...
      session.post("Profiler.stop", (err, { profile }) => {
        // Write profile to disk, upload, etc.
        if (!err) {
          console.log(filePath);
          // ./azure-sdk-for-js/sdk/storage/perf-tests/storage-blob/../../../../JS-profile
          // =>
          // ./azure-sdk-for-js/JS-profile
          // const profileFilepath = `./../../../../profile/${filePath}`;
          if (!filePath) {
            throw Error("filePath is not provided")
          } else {
            fs.ensureDirSync(filePath.substring(0, filePath.lastIndexOf("/") + 1));
            fs.writeFileSync(filePath, JSON.stringify(profile));
            console.log(`...CPUProfile saved to ${filePath}...`);
          }
        } else {
          console.log(err);
        }
      });
    });
  });
}

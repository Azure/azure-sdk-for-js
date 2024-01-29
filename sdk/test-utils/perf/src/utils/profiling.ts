import { Session } from "node:inspector";
import * as fs from "fs-extra";

export async function runWithCpuProfile(
  functionToProfile: () => Promise<void>,
  profileFilePath: string,
) {
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
          fs.ensureDirSync(profileFilePath.substring(0, profileFilePath.lastIndexOf("/") + 1));
          fs.writeFileSync(profileFilePath, JSON.stringify(profile));
          console.log(`...CPUProfile saved to ${profileFilePath}...`);
        } else {
          console.log(err);
        }
      });
    });
  });
}

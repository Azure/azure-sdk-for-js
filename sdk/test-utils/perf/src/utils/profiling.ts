import { Session } from "node:inspector";
import * as fs from "fs-extra";

export async function runWithCpuProfile(
  functionToProfile: () => Promise<void>,
  profileFilePath: string | undefined
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
          profileFilePath =
            profileFilePath ?? `./profile/${getFormattedDate()}-perfProgram.cpuprofile`;
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

const getFormattedDate = () => {
  return new Date().toISOString().replace(/[:\-.]/g, "_");
};


export const monitorFunc = async (func: () => Promise<void>, doProfile: boolean, profileFilePath: undefined | string) => {
  if (doProfile) {
    await runWithCpuProfile(
      func,
      profileFilePath
    );
  } else {
    await func();
  }
}

import { Session } from "node:inspector";
import fs from "fs";

if (process.env.PREFIX_VALUE == undefined) {
  process.env.PREFIX_VALUE = "1";
  console.log(`PREFIX_VALUE: ${process.env.PREFIX_VALUE}`);
} else {
  process.env.PREFIX_VALUE = "2";
  console.log(`PREFIX_VALUE: ${process.env.PREFIX_VALUE}`);
}

export async function runWithCpuProfile(functionToProfile: () => Promise<void>) {
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
          const profileName = `./${process.env.PREFIX_VALUE}-perfProgram.cpuprofile`;
          fs.writeFileSync(profileName, JSON.stringify(profile));
          console.log(`...CPUProfile saved to ${profileName}...`);
        } else {
          console.log(err);
        }
      });
    });
  });
}

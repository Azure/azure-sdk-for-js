import { Session } from "node:inspector";
import fs from "fs";

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
          fs.writeFileSync("./perfProgram.cpuprofile", JSON.stringify(profile));
        } else {
          console.log(err);
        }
      });
    });
  });
}

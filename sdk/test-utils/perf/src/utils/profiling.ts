// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Session } from "node:inspector";
import { mkdirSync, writeFileSync } from "node:fs";

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
          mkdirSync(profileFilePath.substring(0, profileFilePath.lastIndexOf("/") + 1), {
            recursive: true,
          });
          writeFileSync(profileFilePath, JSON.stringify(profile));
          console.log(`...CPUProfile saved to ${profileFilePath}...`);
        } else {
          console.log(err);
        }
      });
    });
  });
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Session } from "node:inspector";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";

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
      session.post("Profiler.stop", async (err, { profile }) => {
        // Write profile to disk, upload, etc.
        if (!err) {
          await mkdir(dirname(profileFilePath), {
            recursive: true,
          });
          await writeFile(profileFilePath, JSON.stringify(profile));
          console.log(`...CPUProfile saved to ${profileFilePath}...`);
        } else {
          console.log(err);
        }
      });
    });
  });
}

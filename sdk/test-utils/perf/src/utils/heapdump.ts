// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import heapdump from "heapdump";
import * as fs from "fs-extra";

export function generateHeapDump(lastMillisecondsElapsed: number) {
  try {
    if (global.gc) { global.gc(); }
  } catch (e) {
    console.log("`Run with --expose-gc flag`");
    process.exit();
  }
  fs.ensureDirSync("./dumps");
  heapdump.writeSnapshot(`./dumps/dump-${Math.floor(lastMillisecondsElapsed / 1000)}.heapsnapshot`);
}

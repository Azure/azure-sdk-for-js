// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import heapdump from "heapdump";
import * as fs from "fs-extra";

export function generateHeapDump(filename: string) {
  try {
    if (global.gc) { global.gc(); }
  } catch (e) {
    console.log("`Run with --expose-gc flag`");
    process.exit();
  }
  fs.ensureDirSync("./dumps");
  heapdump.writeSnapshot(`./dumps/${filename}.heapsnapshot`);
}

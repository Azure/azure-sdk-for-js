// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { generateCerts } from "./certGenerator.mjs";
import { resolve as resolvePath } from "node:path";

async function main(): Promise<void> {
  const certsDirectory = resolvePath(process.cwd(), "certs");
  await generateCerts({ certsDirectory });
  console.log(`Certs created in ${certsDirectory}`);
}

main();

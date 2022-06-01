// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as fs from "fs";

export function getTestcase(filename: string): string {
  console.log(`getTestcase for Node`);
  const data = fs.readFileSync(filename, "utf-8");
  return data;
}

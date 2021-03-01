// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createHash } from "crypto";

export async function digest(str: string): Promise<string> {
  const hash = createHash("sha256");
  hash.update(str, "utf8");
  return hash.digest("hex");
}

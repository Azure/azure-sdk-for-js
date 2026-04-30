// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { computeSha256Hash } from "@azure/core-util";
import stableStringify from "fast-json-stable-stringify";

export async function hashObject(object: unknown): Promise<string> {
  const stringifiedObject = stableStringify(object);
  return computeSha256Hash(stringifiedObject, "hex");
}

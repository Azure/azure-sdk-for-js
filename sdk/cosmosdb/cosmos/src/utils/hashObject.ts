// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { digest } from "#platform/utils/digest";
import stableStringify from "fast-json-stable-stringify";

export async function hashObject(object: unknown): Promise<string> {
  const stringifiedObject = stableStringify(object);
  return digest(stringifiedObject);
}

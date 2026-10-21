// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assert } from "../framework/check.ts";

interface PackResult {
  filename: string;
}

function isPackResult(value: unknown): value is PackResult {
  return (
    typeof value === "object" &&
    value !== null &&
    "filename" in value &&
    typeof value.filename === "string" &&
    value.filename.length > 0
  );
}

export function parsePnpmPackResult(packOutput: string): PackResult {
  const parsed: unknown = JSON.parse(packOutput);
  const result = Array.isArray(parsed) ? parsed[0] : parsed;
  assert(isPackResult(result), "pnpm pack did not return a package filename.", packOutput);
  return result;
}

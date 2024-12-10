// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Buffer } from "buffer";

export default function atob(str: string): string {
  return Buffer.from(str, "base64").toString("binary");
}

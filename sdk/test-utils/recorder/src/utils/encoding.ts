// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { stringToUint8Array, uint8ArrayToString } from "@azure/core-util";

export const encodeBase64 = (data: string) =>
  uint8ArrayToString(stringToUint8Array(data, "utf-8"), "base64");
export const decodeBase64 = (data: string) =>
  uint8ArrayToString(stringToUint8Array(data, "base64"), "utf-8");

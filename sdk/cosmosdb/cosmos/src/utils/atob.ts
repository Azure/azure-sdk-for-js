// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export default function atob(str: string) {
  return Buffer.from(str, "base64").toString("binary");
}

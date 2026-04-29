// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { computeSha256Hash, computeSha256Hmac } from "@azure/core-util";
import { describe, it, assert } from "vitest";

describe("CryptoUtils", function () {
  it("calculates correct hash", async function () {
    const hash = await computeSha256Hash("banana", "base64");
    assert.equal(hash, "tJPUg2Sv5E0RwBZc9HCkFk0eJgmRHvmYvoaNRq3j3k4=");
  });

  it("calculates correct hmac", async function () {
    const hmac = await computeSha256Hmac("pw==", "banana", "base64");
    assert.equal(hmac, "88EC05aAS9iXnaimtNO78JLjiPtfWryQB/5QYEzEsu8=");
  });

  it("hash handles encoding", async function () {
    const hash = await computeSha256Hash("😀", "base64");
    assert.equal(hash, "8EQ6NCxe9UeDoRG1G6Vsk45HTDIyTZDDpgycjjo34tk=");
  });

  it("hmac handles encoding", async function () {
    const hmac = await computeSha256Hmac("pw==", "😀", "base64");
    assert.equal(hmac, "1rudJKjn2Zi+3hRrBG29wIF6pD6YyAeQR1ZcFtXoKAU=");
  });
});

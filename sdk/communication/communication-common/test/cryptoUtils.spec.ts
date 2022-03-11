// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { shaHMAC, shaHash } from "../src/credential/cryptoUtils";
import { assert } from "chai";

describe("CryptoUtils", () => {
  it("calculates correct hash", async () => {
    const hash = await shaHash("banana");
    assert.equal(hash, "tJPUg2Sv5E0RwBZc9HCkFk0eJgmRHvmYvoaNRq3j3k4=");
  });

  it("calculates correct hmac", async () => {
    const hmac = await shaHMAC("pw==", "banana");
    assert.equal(hmac, "88EC05aAS9iXnaimtNO78JLjiPtfWryQB/5QYEzEsu8=");
  });

  it("hash handles encoding", async () => {
    const hash = await shaHash("😀");
    assert.equal(hash, "8EQ6NCxe9UeDoRG1G6Vsk45HTDIyTZDDpgycjjo34tk=");
  });

  it("hmac handles encoding", async () => {
    const hmac = await shaHMAC("pw==", "😀");
    assert.equal(hmac, "1rudJKjn2Zi+3hRrBG29wIF6pD6YyAeQR1ZcFtXoKAU=");
  });
});

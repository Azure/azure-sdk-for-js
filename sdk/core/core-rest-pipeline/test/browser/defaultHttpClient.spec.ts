// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert, describe, it } from "vitest";
import { createDefaultHttpClient } from "../../src/defaultHttpClient";

describe.only("createDefaultHttpClient", () => {
  it("uses Fetch api by default", () => {
    const client = createDefaultHttpClient();
    assert.ok(client.constructor.name === "FetchHttpClient");
  });

  it("uses Fetch api when options specifying fetch", () => {
    const client = createDefaultHttpClient({ api: "fetch" });
    assert.ok(client.constructor.name === "FetchHttpClient");
  });

  it("uses Fetch api when options specifying xhr", () => {
    const client = createDefaultHttpClient({ api: "xhr" });
    assert.ok(client.constructor.name === "XhrHttpClient");
  });
});

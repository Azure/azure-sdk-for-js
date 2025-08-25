// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { getAuthorizationTokenUsingResourceTokens } from "$internal/auth.js";
import { describe, it, assert } from "vitest";

describe("NodeJS CRUD Tests", { timeout: 10000 }, () => {
  it("should find exact match", async () => {
    const token = getAuthorizationTokenUsingResourceTokens(
      {
        foo: "bar",
      },
      "foo",
      "foo",
    );
    assert.strictEqual(token, "bar");
  });

  it("should only allow container tokens", async () => {
    const token = getAuthorizationTokenUsingResourceTokens(
      {
        "dbs/ValidateAuthorization containe8734/colls/ValidateAuthorization containe5344": "token",
      },
      "/dbs/ValidateAuthorization%20containe8734/colls/ValidateAuthorization%20containe5344/docs/coll1doc1",
      "dbs/ValidateAuthorization containe8734/colls/ValidateAuthorization containe5344/docs/coll1doc1",
    );
    assert.strictEqual(token, "token");
  });
});

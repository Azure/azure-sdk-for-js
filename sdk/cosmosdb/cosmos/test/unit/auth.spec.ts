// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getAuthorizationTokenUsingResourceTokens } from "../../src/auth";
import assert from "assert";

describe("NodeJS CRUD Tests", function() {
  this.timeout(process.env.MOCHA_TIMEOUT || 10000);

  it("should find exact match", async function() {
    const token = getAuthorizationTokenUsingResourceTokens(
      {
        foo: "bar"
      },
      "foo",
      "foo"
    );
    assert.strictEqual(token, "bar");
  });

  it("should only allow container tokens", async function() {
    const token = getAuthorizationTokenUsingResourceTokens(
      {
        "dbs/ValidateAuthorization containe8734/colls/ValidateAuthorization containe5344": "token"
      },
      "/dbs/ValidateAuthorization%20containe8734/colls/ValidateAuthorization%20containe5344/docs/coll1doc1",
      "dbs/ValidateAuthorization containe8734/colls/ValidateAuthorization containe5344/docs/coll1doc1"
    );
    assert.strictEqual(token, "token");
  });
});

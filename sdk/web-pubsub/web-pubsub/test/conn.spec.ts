// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/* eslint-disable no-invalid-this */
import { parseConnectionString } from "../src/parseConnectionString";
import { assert } from "chai";

describe("Can parse connection string", function() {
  it("can parse valid connection string", async () => {
    let conn = "Endpoint=http://localhost;AccessKey=ABC;Port=8080;Version=1.0;";
    let parsed = parseConnectionString(conn);
    assert.equal(parsed.credential.key, "ABC");
    assert.equal(parsed.endpoint, "http://localhost:8080/");
    conn = "Endpoint=http://localhost;AccessKey=ABC;";
    parsed = parseConnectionString(conn);
    assert.equal(parsed.credential.key, "ABC");
    assert.equal(parsed.endpoint, "http://localhost/");
  });
  it("can throw with invalid connection string", async () => {
    assert.throws(() => parseConnectionString("Endpoint=http://localhost;"));
    assert.throws(() => parseConnectionString("http://localhost;"));
    assert.throws(() => parseConnectionString("localhost;"));
  });
});

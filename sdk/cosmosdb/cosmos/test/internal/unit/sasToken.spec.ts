// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import assert from "assert";
import { SasToken } from "../../../src/client/SasToken/SasToken";

describe("Session Token", () => {
  var TEST_KEY =
    "C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+4QDU5DE2nQ9nDuVTqobD4b8mGGyPMbIZnqyMsEcaGQy67XIw/Jw==";
  var TEST_EXPECTED_SIMPLE_SASTOKEN =
    "type=sas&ver=1.0&sig=nRJ8Lp6toJT3SVzplvdNud5Z7LnSPxEf2/suT4up0X4=;dXNlcjEKCi9kYnMvZGIxL2NvbGxzL2NvbGwxLwoKMAoxQzIwCjAKNjAKMApGRkZGRkZGRgowCg==";

  var TEST_EXPECTED_SIMPLE_PAYLOAD =
    "user1\n" +
    "\n" +
    "/dbs/db1/colls/coll1/\n" +
    "\n" +
    "0\n" +
    "1C20\n" +
    "0\n" +
    "60\n" +
    "0\n" +
    "FFFFFFFF\n" +
    "0\n";

  it("createSimpleSasToken()", () => {
    let sasTokenProperties = new SasToken().create("user1", "db1", "coll1");
    sasTokenProperties.startTime.setDate(Date.now());
    assert.strictEqual("user1", sasTokenProperties.user);
    assert.strictEqual("", sasTokenProperties.userTag);
    assert.strictEqual("db1", sasTokenProperties.databaseName);
    assert.strictEqual("coll1", sasTokenProperties.containerName);

    let sasTokenValue: String = sasTokenProperties.sasTokenValueUsingHMAC(TEST_KEY);
    assert.strictEqual(TEST_EXPECTED_SIMPLE_SASTOKEN, sasTokenValue);

    let tokenSegments: String[] = sasTokenValue.split("&");
    assert.strictEqual(3, tokenSegments.length);

    let sasTokenParts: String[] = tokenSegments[2].split(";");
    assert.strictEqual(2, sasTokenParts.length);
  });

  var TEST_EXPECTED_EXPIRY_SASTOKEN =
    "type=sas&ver=1.0&sig=pCgZFxV9JQN1i3vzYNTfQldW1No7I+MSgN628TZcJAI=;dXNlcjEKCi9kYnMvZGIxL2NvbGxzL2NvbGwxLwoKNUZFRTY2MDEKNjIxM0I3MDEKMAo2MAowCkZGRkZGRkZGCjAK";
  var TEST_EXPECTED_EXPIRY_PAYLOAD =
    "user1\n" +
    "\n" +
    "/dbs/db1/colls/coll1/\n" +
    "\n" +
    "5FEE6601\n" +
    "6213B701\n" +
    "0\n" +
    "60\n" +
    "0\n" +
    "FFFFFFFF\n" +
    "0\n";

  it("createSasTokenWithExpiryTime()", () => {
    var sasTokenProperties = new SasToken().create("user1", "db1", "coll1");
    sasTokenProperties.startTime.setDate(Date.parse("2021-01-01T00:00:01.00Z"));
    sasTokenProperties.expiryTime.setDate(sasTokenProperties.startTime.getHours() + 10000);

    assert.strictEqual("user1", sasTokenProperties.user);
    assert.strictEqual("", sasTokenProperties.userTag);
    assert.strictEqual("db1", sasTokenProperties.databaseName);
    assert.strictEqual("coll1", sasTokenProperties.containerName);
    assert.strictEqual(1609459201, sasTokenProperties.startTime); //.getEpochSecond();
    assert.strictEqual(1645459201, sasTokenProperties.expiryTime); //.getEpochSecond());

    let sasTokenValue: String = sasTokenProperties.sasTokenValueUsingHMAC(TEST_KEY);
    assert.strictEqual(TEST_EXPECTED_EXPIRY_SASTOKEN, sasTokenValue);

    let tokenSegments: String[] = sasTokenValue.split("&");
    assert.strictEqual(3, tokenSegments.length);

    let sasTokenParts: String[] = tokenSegments[2].split(";");
    assert.strictEqual(2, sasTokenParts.length);
  });
});

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  AzureNamedKeyCredential,
  generateAccountSas,
  generateTableSas,
} from "../../../src/index.js";
import {
  expectedSas1,
  expectedSas2,
  expectedSas3,
  expectedSas4,
  expectedSas5,
  expectedSas6,
  expectedSas7,
  expectedSas8,
  expectedSas9,
} from "../fakeTestSecrets.js";
import { describe, it, assert, vi, beforeEach, afterEach } from "vitest";

describe("SAS generation", function () {
  describe("generateTableSAS", function () {
    beforeEach(async () => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date("2021-12-12"));
    });

    afterEach(async () => {
      vi.useRealTimers();
    });

    it("should generate a SAS token with default values", async () => {
      // Create the table SAS token
      const tableSas = generateTableSas(
        "testTable",
        new AzureNamedKeyCredential("keyName", "keySecret"),
      );

      assert.equal(tableSas, expectedSas1);
    });

    it("should generate a SAS token with start partition and row keys", async () => {
      // Create the table SAS token
      const tableSas = generateTableSas(
        "testTable",
        new AzureNamedKeyCredential("keyName", "keySecret"),
        { startPartitionKey: "P1", startRowKey: "1" },
      );

      assert.equal(tableSas, expectedSas8);
    });

    it("should generate a SAS token with end partition and row keys", async () => {
      // Create the table SAS token
      const tableSas = generateTableSas(
        "testTable",
        new AzureNamedKeyCredential("keyName", "keySecret"),
        { endPartitionKey: "P1", endRowKey: "1" },
      );

      assert.equal(tableSas, expectedSas9);
    });

    it("should generate a SAS token with explicit permissions", async () => {
      // Create the table SAS token
      const tableSas = generateTableSas(
        "testTable",
        new AzureNamedKeyCredential("keyName", "keySecret"),
        {
          permissions: {
            add: true,
            delete: true,
          },
        },
      );

      assert.equal(tableSas, expectedSas2);
    });

    it("should generate a SAS token with explicit expiry", async () => {
      // Create the table SAS token
      const tableSas = generateTableSas(
        "testTable",
        new AzureNamedKeyCredential("keyName", "keySecret"),
        {
          expiresOn: new Date("2022-12-12"),
        },
      );

      assert.equal(tableSas, expectedSas3);
    });

    it("should generate a SAS token with identifier", async () => {
      // Create the table SAS token
      const tableSas = generateTableSas(
        "testTable",
        new AzureNamedKeyCredential("keyName", "keySecret"),
        {
          identifier: "MyAccessPolicy",
          version: "2019-02-02",
        },
      );

      assert.equal(tableSas, expectedSas4);
    });
  });

  describe("generateAccountSAS", function () {
    beforeEach(async () => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date("2021-12-12"));
    });

    afterEach(async () => {
      vi.useRealTimers();
    });

    it("should generate account SAS token with default values", async () => {
      // Create the table SAS token
      const tableSas = generateAccountSas(new AzureNamedKeyCredential("keyName", "keySecret"));

      assert.equal(tableSas, expectedSas5);
    });

    it("should generate a SAS token with explicit permissions", async () => {
      // Create the table SAS token
      const tableSas = generateAccountSas(new AzureNamedKeyCredential("keyName", "keySecret"), {
        permissions: {
          add: true,
          delete: true,
        },
      });

      assert.equal(tableSas, expectedSas6);
    });

    it("should generate a SAS token with explicit expiry", async () => {
      // Create the table SAS token
      const tableSas = generateAccountSas(new AzureNamedKeyCredential("keyName", "keySecret"), {
        expiresOn: new Date("2022-12-12"),
      });

      assert.equal(tableSas, expectedSas7);
    });
  });
});

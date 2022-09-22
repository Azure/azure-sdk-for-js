// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as sinon from "sinon";
import { AzureNamedKeyCredential, generateAccountSas, generateTableSas } from "../../../src";
import {
  expectedSas1,
  expectedSas2,
  expectedSas3,
  expectedSas4,
  expectedSas5,
  expectedSas6,
  expectedSas7,
} from "../fakeTestSecrets";
import { assert } from "chai";

describe("SAS generation", function () {
  describe("generateTableSAS", () => {
    let clock: sinon.SinonFakeTimers;
    beforeEach(() => {
      clock = sinon.useFakeTimers(new Date("2021-12-12"));
    });

    afterEach(() => {
      if (clock) {
        clock.restore();
      }
    });

    it("should generate a SAS token with default values", async () => {
      // Create the table SAS token
      const tableSas = generateTableSas(
        "testTable",
        new AzureNamedKeyCredential("keyName", "keySecret")
      );

      assert.equal(tableSas, expectedSas1);
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
        }
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
        }
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
        }
      );

      assert.equal(tableSas, expectedSas4);
    });
  });

  describe("generateAccountSAS", () => {
    let clock: sinon.SinonFakeTimers;
    beforeEach(() => {
      clock = sinon.useFakeTimers(new Date("2021-12-12"));
    });

    afterEach(() => {
      if (clock) {
        clock.restore();
      }
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

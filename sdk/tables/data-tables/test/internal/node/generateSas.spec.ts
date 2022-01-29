// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as sinon from "sinon";
import { AzureNamedKeyCredential, generateAccountSas, generateTableSas } from "../../../src";
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

      assert.equal(
        tableSas,
        "sv=2019-02-02&se=2021-12-12T01%3A00%3A00Z&sp=r&sig=lZxPmk%2BpMuu2MRXxeTZoBV6m3eobZKuIkYcHLDdDt2Q%3D&tn=testTable"
      );
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

      assert.equal(
        tableSas,
        "sv=2019-02-02&se=2021-12-12T01%3A00%3A00Z&sp=ad&sig=bf2oeXb%2FVL9hzbd5ZWngdNJoR%2BkyDp0vPZz%2FDGJt1d4%3D&tn=testTable"
      );
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

      assert.equal(
        tableSas,
        "sv=2019-02-02&se=2022-12-12T00%3A00%3A00Z&sp=r&sig=Jm1wKNTA0%2FHH8u9S8dSjqdZKtFKYr7whXnxDy3RKsxU%3D&tn=testTable"
      );
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

      assert.equal(
        tableSas,
        "sv=2019-02-02&si=MyAccessPolicy&sig=bXpQx%2FOSDR8oGiqi1QJekrwS5MBf%2Bdi6x%2FClf9QVKgg%3D&tn=testTable"
      );
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

      assert.equal(
        tableSas,
        "sv=2019-02-02&ss=t&srt=sco&se=2021-12-12T01%3A00%3A00Z&sp=rl&sig=Yuhy3%2BSpfj%2BFWmSoxa1GAxtX6IOKvX6qGnHIKn%2FLHD0%3D"
      );
    });

    it("should generate a SAS token with explicit permissions", async () => {
      // Create the table SAS token
      const tableSas = generateAccountSas(new AzureNamedKeyCredential("keyName", "keySecret"), {
        permissions: {
          add: true,
          delete: true,
        },
      });

      assert.equal(
        tableSas,
        "sv=2019-02-02&ss=t&srt=sco&se=2021-12-12T01%3A00%3A00Z&sp=da&sig=TmE8AOQFacynVIVR5ljBYqY3Y3K6olfdDMLl09iRvvs%3D"
      );
    });

    it("should generate a SAS token with explicit expiry", async () => {
      // Create the table SAS token
      const tableSas = generateAccountSas(new AzureNamedKeyCredential("keyName", "keySecret"), {
        expiresOn: new Date("2022-12-12"),
      });

      assert.equal(
        tableSas,
        "sv=2019-02-02&ss=t&srt=sco&se=2022-12-12T00%3A00%3A00Z&sp=rl&sig=y42pmN9E%2FgA2O3nGn25lx%2B%2BqQmhvh0WqFi4%2BkOPitwA%3D"
      );
    });
  });
});

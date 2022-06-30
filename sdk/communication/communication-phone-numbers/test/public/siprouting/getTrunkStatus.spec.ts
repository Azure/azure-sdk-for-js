// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  createRecordedSipRoutingClient,
  createRecordedSipRoutingClientWithToken,
} from "../utils/recordedClient";
import { Context } from "mocha";
import { Recorder } from "@azure-tools/test-recorder";
//import { TrunkStatusClient } from "../../../src";
import { SipRoutingClient } from "../../../src";
import { assert } from "chai";
import { getTrunkStatus } from "../utils/testTrunkStatus";
import { matrix } from "@azure/test-utils";

matrix([[true, false]], async function (useAad) {
  describe(`TrunkStatusClient - get trunk status${useAad ? " [AAD]" : ""}`, function () {
    let recorder: Recorder;
    // let client: TrunkStatusClient;
    let client: SipRoutingClient;

    beforeEach(function (this: Context) {
      ({ client, recorder } = useAad
        ? createRecordedSipRoutingClientWithToken(this)!
        : createRecordedSipRoutingClient(this));
    });

    afterEach(async function (this: Context) {
      if (!this.currentTest?.isPending()) {
        await recorder.stop();
      }
    });

    it("can get status of specified trunk", async function (this: Context) {
      const expectedStatus = getTrunkStatus();
      const status = await client.getTrunkStatus(expectedStatus.fqdn);

      assert.strictEqual(expectedStatus.fqdn, status.fqdn);
      assert.strictEqual(expectedStatus.lastUpdateTime, status.lastUpdateTime);
      assert.strictEqual(expectedStatus.ping, status.ping);
      assert.strictEqual(expectedStatus.tls, status.tls);
      assert.strictEqual(expectedStatus.trunkOverallStatus, status.trunkOverallStatus);
    }).timeout(60000);

    it("errors if trunk not found", async function () {
      const fake = "fake.fqdn.com";
      try {
        await client.getTrunkStatus(fake);
      } catch (error: any) {
        assert.strictEqual(error.code, "InsufficientPermissions");
      }
    });

    it("can list all the trunk statuses", async function () {
      let all = 0;
      const trunkStatuses = await client.getTrunksStatus();

      if (!(trunkStatuses.values === undefined || trunkStatuses.values === null)) {
        for (const trunkStatus of trunkStatuses.values) {
          assert.match(trunkStatus.fqdn, /^([a-zA-Z0-9._-])+$/i);
          all++;
        }
        assert.isTrue(all > 0);
      }
    });
  });
});

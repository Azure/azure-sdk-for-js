// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { Context } from "mocha";

import { SipRoutingClient } from "../../../src";

import { Recorder, isPlaybackMode } from "@azure-tools/test-recorder";
import {
  ActivityStatus,
  PingStatus,
  SipTrunk,
  SipTrunkHealth,
  TlsStatus,
} from "../../../src/models";
import {
  clearSipConfiguration,
  createRecordedClient,
  createRecordedClientWithToken,
  getUniqueFqdn,
  listAllTrunks,
  resetUniqueFqdns,
} from "./utils/recordedClient";
import { matrix } from "@azure/test-utils";

matrix([[true, false]], async function (useAad) {
  describe(`SipRoutingClient - get trunks${useAad ? " [AAD]" : ""}`, function () {
    let client: SipRoutingClient;
    let recorder: Recorder;
    let firstFqdn = "";
    let secondFqdn = "";
    let thirdFqdn = "";
    let fourthFqdn = "";

    before(async function (this: Context) {
      if (!isPlaybackMode()) {
        await clearSipConfiguration();
      }
    });

    beforeEach(async function (this: Context) {
      ({ client, recorder } = useAad
        ? await createRecordedClientWithToken(this, true)
        : await createRecordedClient(this, true));
      firstFqdn = getUniqueFqdn(recorder);
      secondFqdn = getUniqueFqdn(recorder);
      thirdFqdn = getUniqueFqdn(recorder);
      fourthFqdn = getUniqueFqdn(recorder);
    });

    afterEach(async function (this: Context) {
      if (!this.currentTest?.isPending()) {
        await recorder.stop();
      }
      resetUniqueFqdns();
    });

    it("cannot retrieve a not existing trunk", async () => {
      try {
        await client.setTrunks([]);
        await client.getTrunk("not.existing.fqdn");
      } catch (error: any) {
        assert.equal(error.code, "NotFound");
        return;
      }
      assert.fail("NotFound expected.");
    });

    it("can retrieve an existing trunk", async () => {
      await client.setTrunk({
        fqdn: fourthFqdn,
        sipSignalingPort: 4567,
        enabled: true,
      } as SipTrunk);

      const trunk = await client.getTrunk(fourthFqdn);

      assert.isNotNull(trunk);
      assert.equal(trunk?.sipSignalingPort, 4567);
      assert.equal(trunk?.enabled, true);
    });

    it("can retrieve trunks", async () => {
      assert.isArray(await listAllTrunks(client));
    });

    it("can retrieve empty trunks", async () => {
      await client.setTrunks([]);

      const trunks = await listAllTrunks(client);

      assert.isNotNull(trunks);
      assert.isArray(trunks);
      assert.isEmpty(trunks);
    });

    it("can retrieve not empty trunks", async () => {
      const expectedTrunks = [
        { fqdn: firstFqdn, sipSignalingPort: 1239, enabled: true },
        { fqdn: secondFqdn, sipSignalingPort: 2348, enabled: true },
        { fqdn: thirdFqdn, sipSignalingPort: 3457, enabled: true },
      ];
      await client.setTrunks(expectedTrunks);

      const trunks = await listAllTrunks(client);

      assert.isNotNull(trunks);
      assert.isArray(trunks);
      assert.deepEqual(trunks, expectedTrunks);
    });

    it("can retrieve a mocked trunk with health status", async () => {
      const expectedHealth = {
        tls: { status: "unknown" as TlsStatus },
        ping: { status: "unknown" as PingStatus },
        activity: { status: "unknown" as ActivityStatus },
      } as SipTrunkHealth;
      await client.setTrunk({
        fqdn: fourthFqdn,
        sipSignalingPort: 4567,
        enabled: true,
      } as SipTrunk);

      const trunk = await client.getTrunk(fourthFqdn, { includeHealth: true });

      assert.isNotNull(trunk);
      assert.isNotNull(trunk.health);
      assert.deepEqual(trunk.health, expectedHealth);
    });

    it("can retrieve multiple mocked trunks with health statuses", async () => {
      const expectedHealth = {
        tls: { status: "unknown" as TlsStatus },
        ping: { status: "unknown" as PingStatus },
        activity: { status: "unknown" as ActivityStatus },
      } as SipTrunkHealth;
      const expectedTrunks = [
        {
          fqdn: firstFqdn,
          sipSignalingPort: 1239,
          enabled: true,
          health: expectedHealth,
        } as SipTrunk,
        {
          fqdn: secondFqdn,
          sipSignalingPort: 2348,
          enabled: true,
          health: expectedHealth,
        } as SipTrunk,
        {
          fqdn: thirdFqdn,
          sipSignalingPort: 3457,
          enabled: true,
          health: expectedHealth,
        } as SipTrunk,
      ];

      const createdTrunks = [
        { fqdn: firstFqdn, sipSignalingPort: 1239, enabled: true },
        { fqdn: secondFqdn, sipSignalingPort: 2348, enabled: true },
        { fqdn: thirdFqdn, sipSignalingPort: 3457, enabled: true },
      ];

      await client.setTrunks(createdTrunks);

      const trunks = await listAllTrunks(client, true);

      assert.isNotNull(trunks);
      assert.isArray(trunks);
      assert.deepEqual(trunks, expectedTrunks);
    });
  });
});

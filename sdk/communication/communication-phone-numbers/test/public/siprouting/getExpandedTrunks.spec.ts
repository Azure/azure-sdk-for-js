// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { Context } from "mocha";

import { SipRoutingClient } from "../../../src";

import { isPlaybackMode, Recorder } from "@azure-tools/test-recorder";
import { SipTrunk, SipTrunkExpanded } from "../../../src/models";
import {
  clearSipConfiguration,
  createRecordedClient,
  createRecordedClientWithToken,
  getUniqueFqdn,
  resetUniqueFqdns,
} from "./utils/recordedClient";
import { matrix } from "@azure/test-utils";

matrix([[true, false]], async function (useAad) {
  describe(`SipRoutingClient - get trunks with expanded properties${useAad ? " [AAD]" : ""}`, function () {
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
        ? await createRecordedClientWithToken(this)
        : await createRecordedClient(this));
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

    it("can retrieve a mocked trunk with health status", async () => {
        const expectedHealth = { tls: {status: "unknown"}, ping: {status: "unknown"}, overall: {status: "unknown"} };
        await client.setTrunk({ fqdn: fourthFqdn, sipSignalingPort: 4567 } as SipTrunk);

        const trunk = await client.getExpandedTrunk(fourthFqdn);

        assert.isNotNull(trunk);
        assert.isNotNull(trunk.health);
        assert.deepEqual(trunk.health, expectedHealth);
    });

    it("can retrieve multiple mocked trunks with health statuses", async () => {
        const expectedHealth = { tls: {status: "unknown"}, ping: {status: "unknown"}, overall: {status: "unknown"} };
        const expectedTrunks = [
          { fqdn: firstFqdn, sipSignalingPort: 1239, enabled: true, health: expectedHealth } as SipTrunkExpanded,
          { fqdn: secondFqdn, sipSignalingPort: 2348, enabled: true, health: expectedHealth } as SipTrunkExpanded,
          { fqdn: thirdFqdn, sipSignalingPort: 3457, enabled: true, health: expectedHealth } as SipTrunkExpanded,
        ];
    
        const createdTrunks = [
          { fqdn: firstFqdn, sipSignalingPort: 1239 },
          { fqdn: secondFqdn, sipSignalingPort: 2348 },
          { fqdn: thirdFqdn, sipSignalingPort: 3457 },
        ];
    
        await client.setTrunks(createdTrunks);
    
        const trunks = await client.getExpandedTrunks();
    
        assert.isNotNull(trunks);
        assert.isArray(trunks);
        assert.deepEqual(trunks, expectedTrunks);
      });
  });
});

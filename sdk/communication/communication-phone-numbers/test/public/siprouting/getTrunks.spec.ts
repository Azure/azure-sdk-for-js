// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { SipRoutingClient } from "../../../src/index.js";

import type { Recorder } from "@azure-tools/test-recorder";
import { isPlaybackMode } from "@azure-tools/test-recorder";
import type { SipTrunk } from "../../../src/models.js";
import {
  clearSipConfiguration,
  createRecordedClient,
  createRecordedClientWithToken,
  getUniqueFqdn,
  listAllTrunks,
  resetUniqueFqdns,
} from "./utils/recordedClient.js";
import { matrix } from "@azure-tools/test-utils";
import { describe, it, assert, expect, vi, beforeEach, afterEach } from "vitest";

matrix([[true, false]], async function (useAad) {
  describe(`SipRoutingClient - get trunks${useAad ? " [AAD]" : ""}`, function () {
    let client: SipRoutingClient;
    let recorder: Recorder;
    let firstFqdn = "";
    let secondFqdn = "";
    let thirdFqdn = "";
    let fourthFqdn = "";

    before(async function (ctx) {
      if (!isPlaybackMode()) {
        await clearSipConfiguration();
      }
    });

    beforeEach(async function (ctx) {
      ({ client, recorder } = useAad
        ? await createRecordedClientWithToken(this)
        : await createRecordedClient(this));
      firstFqdn = getUniqueFqdn(recorder);
      secondFqdn = getUniqueFqdn(recorder);
      thirdFqdn = getUniqueFqdn(recorder);
      fourthFqdn = getUniqueFqdn(recorder);
    });

    afterEach(async function (ctx) {
      if (!ctx.task.pending) {
        await recorder.stop();
      }
      resetUniqueFqdns();
    });

    it("cannot retrieve a not existing trunk", async () => {
      try {
        await client.getTrunk("not.existing.fqdn");
      } catch (error: any) {
        assert.equal(error.code, "NotFound");
        return;
      }
      assert.fail("NotFound expected.");
    });

    it("can retrieve an existing trunk", async () => {
      await client.setTrunk({ fqdn: fourthFqdn, sipSignalingPort: 4567 } as SipTrunk);

      const trunk = await client.getTrunk(fourthFqdn);

      assert.isNotNull(trunk);
      assert.equal(trunk?.sipSignalingPort, 4567);
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
        { fqdn: firstFqdn, sipSignalingPort: 1239 },
        { fqdn: secondFqdn, sipSignalingPort: 2348 },
        { fqdn: thirdFqdn, sipSignalingPort: 3457 },
      ];
      await client.setTrunks(expectedTrunks);

      const trunks = await listAllTrunks(client);

      assert.isNotNull(trunks);
      assert.isArray(trunks);
      assert.deepEqual(trunks, expectedTrunks);
    });
  });
});

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SipRoutingClient, SipTrunk } from "@azure/communication-phone-numbers";
import type { Recorder } from "@azure-tools/test-recorder";
import { isPlaybackMode } from "@azure-tools/test-recorder";
import {
  clearSipConfiguration,
  createRecordedClient,
  createRecordedClientWithToken,
  getUniqueFqdn,
  listAllTrunks,
  resetUniqueFqdns,
} from "./utils/recordedClient.js";
import { matrix } from "@azure-tools/test-utils-vitest";
import { describe, it, assert, beforeEach, afterEach, beforeAll } from "vitest";

matrix([[true, false]], async (useAad) => {
  describe(`SipRoutingClient - get trunks${useAad ? " [AAD]" : ""}`, () => {
    let client: SipRoutingClient;
    let recorder: Recorder;
    let firstFqdn = "";
    let secondFqdn = "";
    let thirdFqdn = "";
    let fourthFqdn = "";

    beforeAll(async () => {
      if (!isPlaybackMode()) {
        await clearSipConfiguration();
      }
    });

    beforeEach(async (ctx) => {
      ({ client, recorder } = useAad
        ? await createRecordedClientWithToken(ctx)
        : await createRecordedClient(ctx));
      firstFqdn = getUniqueFqdn(recorder);
      secondFqdn = getUniqueFqdn(recorder);
      thirdFqdn = getUniqueFqdn(recorder);
      fourthFqdn = getUniqueFqdn(recorder);
    });

    afterEach(async () => {
      await recorder.stop();
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

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { SipRoutingClient } from "../../../src/index.js";

import type { Recorder } from "@azure-tools/test-recorder";
import { isPlaybackMode } from "@azure-tools/test-recorder";
import { type SipTrunk } from "../../../src/models.js";
import {
  clearSipConfiguration,
  createRecordedClient,
  createRecordedClientWithToken,
  getUniqueFqdn,
  trunksAreEqual,
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

    it("can retrieve not empty trunks", async () => {
      const expectedTrunks: SipTrunk[] = [
        {
          fqdn: firstFqdn,
          sipSignalingPort: 1239,
          directTransfer: false,
          health: undefined,
          enabled: false,
          privacyHeader: "id",
          ipAddressVersion: "ipv4",
        },
        {
          fqdn: secondFqdn,
          sipSignalingPort: 2348,
          directTransfer: true,
          health: undefined,
          enabled: false,
          privacyHeader: "none",
          ipAddressVersion: "ipv6",
        },
        {
          fqdn: thirdFqdn,
          sipSignalingPort: 3457,
          directTransfer: false,
          health: undefined,
          enabled: false,
          privacyHeader: "id",
          ipAddressVersion: "ipv4",
        },
      ];
      const trunks = await client.setTrunks(expectedTrunks);

      assert.isNotNull(trunks);
      assert.isArray(trunks);
      assert.isTrue(trunksAreEqual(trunks, expectedTrunks));
    });
  });
});

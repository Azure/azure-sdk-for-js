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
  describe(`SipRoutingClient - set trunks${useAad ? " [AAD]" : ""}`, () => {
    let client: SipRoutingClient;
    let recorder: Recorder;
    let firstFqdn = "";
    let secondFqdn = "";

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
    });

    afterEach(async () => {
      await recorder.stop();
      resetUniqueFqdns();
    });

    it("can set a new trunk", async () => {
      const trunk: SipTrunk = {
        fqdn: firstFqdn,
        sipSignalingPort: 1231,
        directTransfer: false,
        enabled: false,
        privacyHeader: "id",
        ipAddressVersion: "ipv4",
      };

      const setTrunk = await client.setTrunk(trunk);
      assert.isTrue(trunksAreEqual([setTrunk], [trunk]));
    });

    it("can set an existing trunk", async () => {
      const trunk: SipTrunk = {
        fqdn: firstFqdn,
        sipSignalingPort: 1231,
        directTransfer: false,
        enabled: false,
        privacyHeader: "id",
        ipAddressVersion: "ipv4",
      };
      await client.setTrunk(trunk);

      trunk.sipSignalingPort = 6789;

      const setTrunk = await client.setTrunk(trunk);
      assert.isTrue(trunksAreEqual([setTrunk], [trunk]));
    });

    it("can set multiple new trunks when empty before", async () => {
      await client.setTrunks([]);

      const trunks: SipTrunk[] = [
        {
          fqdn: firstFqdn,
          sipSignalingPort: 8239,
          directTransfer: false,
          enabled: false,
          privacyHeader: "id",
          ipAddressVersion: "ipv4",
        },
        {
          fqdn: secondFqdn,
          sipSignalingPort: 7348,
          directTransfer: false,
          enabled: false,
          privacyHeader: "id",
          ipAddressVersion: "ipv4",
        },
      ];

      const setTrunks = await client.setTrunks(trunks);
      assert.isTrue(trunksAreEqual(setTrunks, trunks));
    });

    it("can set multiple existing trunks", async () => {
      const trunks: SipTrunk[] = [
        {
          fqdn: firstFqdn,
          sipSignalingPort: 8239,
          directTransfer: false,
          enabled: false,
          privacyHeader: "id",
          ipAddressVersion: "ipv4",
        },
        {
          fqdn: secondFqdn,
          sipSignalingPort: 7348,
          directTransfer: false,
          enabled: false,
          privacyHeader: "id",
          ipAddressVersion: "ipv4",
        },
      ];
      await client.setTrunks(trunks);

      trunks[0].sipSignalingPort = 5678;
      trunks[1].sipSignalingPort = 5678;

      const setTrunks = await client.setTrunks(trunks);
      assert.isTrue(trunksAreEqual(setTrunks, trunks));
    });
  });
});

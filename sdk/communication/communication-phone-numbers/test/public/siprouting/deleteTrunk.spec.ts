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
  describe(`SipRoutingClient - delete trunk${useAad ? " [AAD]" : ""}`, () => {
    let client: SipRoutingClient;
    let recorder: Recorder;
    let testFqdn = "";

    beforeAll(async () => {
      if (!isPlaybackMode()) {
        await clearSipConfiguration();
      }
    });

    beforeEach(async (ctx) => {
      ({ client, recorder } = useAad
        ? await createRecordedClientWithToken(ctx)
        : await createRecordedClient(ctx));
      testFqdn = getUniqueFqdn(recorder);
    });

    afterEach(async () => {
      await recorder.stop();
      resetUniqueFqdns();
    });

    it("can delete an existing trunk", async () => {
      const trunk: SipTrunk = {
        fqdn: testFqdn,
        sipSignalingPort: 5678,
      };
      const storedTrunk = await client.setTrunk(trunk);
      assert.deepEqual(storedTrunk, trunk);
      assert.exists((await listAllTrunks(client)).find((value) => value.fqdn === trunk.fqdn));

      await client.deleteTrunk(testFqdn);

      assert.notExists((await listAllTrunks(client)).find((value) => value.fqdn === trunk.fqdn));
    });

    it("cannot delete a not existing trunk but succeeds", async () => {
      await client.setTrunks([]);

      await client.deleteTrunk("notExisting.fqdn.com");

      const storedTrunks = await listAllTrunks(client);
      assert.isNotNull(storedTrunks);
      assert.isArray(storedTrunks);
      assert.isEmpty(storedTrunks);
    });
  });
});

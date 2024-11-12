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
import { matrix } from "@azure-tools/test-utils-vitest";
import { describe, it, assert, expect, vi, beforeEach, afterEach } from "vitest";

matrix([[true, false]], async function (useAad) {
  describe(`SipRoutingClient - delete trunk${useAad ? " [AAD]" : ""}`, function () {
    let client: SipRoutingClient;
    let recorder: Recorder;
    let testFqdn = "";

    before(async function (ctx) {
      if (!isPlaybackMode()) {
        await clearSipConfiguration();
      }
    });

    beforeEach(async function (ctx) {
      ({ client, recorder } = useAad
        ? await createRecordedClientWithToken(this)
        : await createRecordedClient(this));
      testFqdn = getUniqueFqdn(recorder);
    });

    afterEach(async function (ctx) {
      if (!ctx.task.pending) {
        await recorder.stop();
      }
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

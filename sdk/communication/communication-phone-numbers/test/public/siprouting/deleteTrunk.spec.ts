// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { Context } from "mocha";

import { SipRoutingClient } from "../../../src";

import { Recorder, isPlaybackMode } from "@azure-tools/test-recorder";
import { SipTrunk } from "../../../src/models";
import {
  clearSipConfiguration,
  createRecordedClient,
  createRecordedClientWithToken,
  getUniqueFqdn,
  listAllTrunks,
  resetUniqueFqdns,
} from "./utils/recordedClient";
import { matrix } from "@azure-tools/test-utils";

matrix([[true, false]], async function (useAad) {
  describe(`SipRoutingClient - delete trunk${useAad ? " [AAD]" : ""}`, function () {
    let client: SipRoutingClient;
    let recorder: Recorder;
    let testFqdn = "";

    before(async function (this: Context) {
      if (!isPlaybackMode()) {
        await clearSipConfiguration();
      }
    });

    beforeEach(async function (this: Context) {
      ({ client, recorder } = useAad
        ? await createRecordedClientWithToken(this)
        : await createRecordedClient(this));
      testFqdn = getUniqueFqdn(recorder);
    });

    afterEach(async function (this: Context) {
      if (!this.currentTest?.isPending()) {
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

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { Context } from "mocha";

import { SipRoutingClient } from "../../../src";

import { matrix } from "@azure-tools/test-utils";
import { Recorder, isPlaybackMode } from "@azure-tools/test-recorder";
import {
  clearSipConfiguration,
  createRecordedClient,
  createRecordedClientWithToken,
  listAllRoutes,
} from "./utils/recordedClient";

matrix([[true, false]], async function (useAad) {
  describe(`SipRoutingClient - get routes${useAad ? " [AAD]" : ""}`, function () {
    let client: SipRoutingClient;
    let recorder: Recorder;

    before(async function (this: Context) {
      if (!isPlaybackMode()) {
        await clearSipConfiguration();
      }
    });

    beforeEach(async function (this: Context) {
      ({ client, recorder } = useAad
        ? await createRecordedClientWithToken(this)
        : await createRecordedClient(this));
    });

    afterEach(async function (this: Context) {
      if (!this.currentTest?.isPending()) {
        await recorder.stop();
      }
    });

    it("can retrieve routes", async () => {
      assert.isArray(await listAllRoutes(client));
    });

    it("can retrieve empty routes", async () => {
      await client.setRoutes([]);

      const routes = await listAllRoutes(client);

      assert.isNotNull(routes);
      assert.isArray(routes);
      assert.isEmpty(routes);
    });

    it("can retrieve not empty routes", async () => {
      const expectedRoutes = [
        {
          name: "Sanitized",
          description: "myFirstRoute's description",
          numberPattern: "^+[1-9][0-9]{3,23}$",
          trunks: [],
        },
        {
          name: "Sanitized",
          description: "mySecondRoute's description",
          numberPattern: "^+[1-9][0-9]{3,23}$",
          trunks: [],
        },
      ];
      await client.setRoutes(expectedRoutes);

      const routes = await listAllRoutes(client);

      assert.isNotNull(routes);
      assert.isArray(routes);
      assert.deepEqual(routes, expectedRoutes);
    });
  });
});

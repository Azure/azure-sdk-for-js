// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assert } from "chai";
import type { Context } from "mocha";

import type { SipRoutingClient } from "../../../src/index.js";

import { matrix } from "@azure-tools/test-utils";
import type { Recorder } from "@azure-tools/test-recorder";
import { isPlaybackMode } from "@azure-tools/test-recorder";
import {
  clearSipConfiguration,
  createRecordedClient,
  createRecordedClientWithToken,
  listAllRoutes,
} from "./utils/recordedClient.js";

matrix([[true, false]], async function (useAad) {
  describe(`SipRoutingClient - get routes${useAad ? " [AAD]" : ""}`, function () {
    let client: SipRoutingClient;
    let recorder: Recorder;

    before(async function (ctx) {
      if (!isPlaybackMode()) {
        await clearSipConfiguration();
      }
    });

    beforeEach(async function (ctx) {
      ({ client, recorder } = useAad
        ? await createRecordedClientWithToken(this)
        : await createRecordedClient(this));
    });

    afterEach(async function (ctx) {
      if (!ctx.task.pending) {
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
          name: "myFirstRoute",
          description: "myFirstRoute's description",
          numberPattern: "^+[1-9][0-9]{3,23}$",
          trunks: [],
        },
        {
          name: "mySecondRoute",
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

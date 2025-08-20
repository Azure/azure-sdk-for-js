// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SipRoutingClient } from "@azure/communication-phone-numbers";
import { matrix } from "@azure-tools/test-utils-vitest";
import type { Recorder } from "@azure-tools/test-recorder";
import { isPlaybackMode } from "@azure-tools/test-recorder";
import {
  clearSipConfiguration,
  createRecordedClient,
  createRecordedClientWithToken,
  listAllRoutes,
} from "./utils/recordedClient.js";
import { describe, it, assert, beforeEach, afterEach, beforeAll } from "vitest";

matrix([[true, false]], async (useAad) => {
  describe(`SipRoutingClient - get routes${useAad ? " [AAD]" : ""}`, () => {
    let client: SipRoutingClient;
    let recorder: Recorder;

    beforeAll(async () => {
      if (!isPlaybackMode()) {
        await clearSipConfiguration();
      }
    });

    beforeEach(async (ctx) => {
      ({ client, recorder } = useAad
        ? await createRecordedClientWithToken(ctx)
        : await createRecordedClient(ctx));
    });

    afterEach(async () => {
      await recorder.stop();
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

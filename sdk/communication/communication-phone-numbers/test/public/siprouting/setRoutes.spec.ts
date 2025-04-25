// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { SipRoutingClient } from "../../../src/index.js";

import type { Recorder } from "@azure-tools/test-recorder";
import { isPlaybackMode } from "@azure-tools/test-recorder";
import { type SipTrunkRoute } from "../../../src/models.js";
import {
  clearSipConfiguration,
  createRecordedClient,
  createRecordedClientWithToken,
  routesAreEqual,
  resetUniqueFqdns,
} from "./utils/recordedClient.js";
import { matrix } from "@azure-tools/test-utils-vitest";
import { describe, it, assert, beforeEach, afterEach, beforeAll } from "vitest";

matrix([[true, false]], async (useAad) => {
  describe(`SipRoutingClient - set routes${useAad ? " [AAD]" : ""}`, () => {
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
      resetUniqueFqdns();
    });

    it("can set multiple new routes when empty before", async () => {
      await client.setRoutes([]);

      const routes: SipTrunkRoute[] = [
        {
          callerIdOverride: "+1234568790",
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

      const setRoutes = await client.setRoutes(routes);
      assert.isTrue(routesAreEqual(setRoutes, routes));
    });

    it("can set multiple new and existing routes", async () => {
      const routes: SipTrunkRoute[] = [
        {
          name: "myFirstRoute",
          description: "myFirstRoute's description",
          numberPattern: "^+[1-9][0-9]{3,23}$",
          trunks: [],
        },
        {
          callerIdOverride: "+1234568790",
          name: "mySecondRoute",
          description: "mySecondRoute's description",
          numberPattern: "^+[1-9][0-9]{3,23}$",
          trunks: [],
        },
      ];
      await client.setRoutes(routes);
      const expectedRoutes = [...routes];
      expectedRoutes[0].numberPattern = "^.*$";
      expectedRoutes[1].description = "ALTERED mySecondRoute's description";
      expectedRoutes[1].callerIdOverride = "+9876543120";
      expectedRoutes.push({
        name: "myThirdRoute",
        description: "desc",
        numberPattern: "^+[1-9][0-9]{3,23}$",
        trunks: [],
      });

      const setRoutes = await client.setRoutes(expectedRoutes);
      assert.isTrue(routesAreEqual(setRoutes, expectedRoutes));
    });
  });
});

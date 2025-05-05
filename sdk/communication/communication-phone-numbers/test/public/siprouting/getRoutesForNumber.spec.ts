// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SipRoutingClient } from "../../../src/index.js";

import { matrix } from "@azure-tools/test-utils-vitest";
import type { Recorder } from "@azure-tools/test-recorder";
import { isPlaybackMode } from "@azure-tools/test-recorder";
import {
  clearSipConfiguration,
  createRecordedClient,
  createRecordedClientWithToken,
} from "./utils/recordedClient.js";
import { describe, it, assert, beforeEach, afterEach, beforeAll } from "vitest";

matrix([[true, false]], async (useAad) => {
  describe(`SipRoutingClient - get routes for number${useAad ? " [AAD]" : ""}`, () => {
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

    it("can get routes for number", async () => {
      const routes = [
        { name: "route1", numberPattern: "^.123.*" },
        { name: "route2", numberPattern: "^.987.*" },
        { name: "route3", numberPattern: "^.*" },
      ];
      const routesForNumber = await client.getRoutesForNumber("+1234567890", routes);
      assert.isNotNull(routesForNumber);
      assert.isArray(routesForNumber);
      assert.equal(routesForNumber?.length, 2);
    });
  });
});

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { SipRoutingClient } from "../../../src/index.js";

import type { Recorder } from "@azure-tools/test-recorder";
import { isPlaybackMode } from "@azure-tools/test-recorder";
import {
  clearSipConfiguration,
  createRecordedClient,
  createRecordedClientWithToken,
  getAzureTestDomain,
  listAllDomains,
  resetUniqueDomains,
} from "./utils/recordedClient.js";
import { matrix } from "@azure-tools/test-utils-vitest";
import { describe, it, assert, beforeEach, afterEach, beforeAll } from "vitest";

matrix([[true, false]], async (useAad) => {
  describe(`SipRoutingClient - get domains${useAad ? " [AAD]" : ""}`, function () {
    let client: SipRoutingClient;
    let recorder: Recorder;
    let testDomain = "";

    beforeAll(async () => {
      if (!isPlaybackMode()) {
        await clearSipConfiguration();
      }
      testDomain = getAzureTestDomain();
    });

    beforeEach(async (ctx) => {
      ({ client, recorder } = useAad
        ? await createRecordedClientWithToken(ctx)
        : await createRecordedClient(ctx));
    });

    afterEach(async () => {
      await recorder.stop();
      resetUniqueDomains();
    });

    it("can retrieve an existing domain", async () => {
      const domain = await client.getDomain(testDomain);

      assert.isNotNull(domain);
      assert.equal(domain?.enabled, true);
    });

    it("can retrieve domains", async () => {
      const domains = await listAllDomains(client);
      assert.isArray(domains);
    });
  });
});

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import type { SipRoutingClient } from "../../../src/index.js";

import type { Recorder } from "@azure-tools/test-recorder";
import { isPlaybackMode } from "@azure-tools/test-recorder";
import type { SipDomain } from "../../../src/models.js";
import {
  clearSipConfiguration,
  createRecordedClient,
  createRecordedClientWithToken,
  getUniqueDomain,
  resetUniqueDomains,
} from "./utils/recordedClient.js";
import { matrix } from "@azure-tools/test-utils-vitest";
import { describe, it, assert, beforeAll, beforeEach, afterEach } from "vitest";

matrix([[true, false]], async (useAad) => {
  describe(`SipRoutingClient - delete domain${useAad ? " [AAD]" : ""}`, function () {
    let client: SipRoutingClient;
    let recorder: Recorder;
    let firstDomain = "";

    beforeAll(async () => {
      if (!isPlaybackMode()) {
        await clearSipConfiguration();
      }
    });

    beforeEach(async (ctx) => {
      ({ client, recorder } = useAad
        ? await createRecordedClientWithToken(ctx)
        : await createRecordedClient(ctx));
      firstDomain = getUniqueDomain(recorder);
    });

    afterEach(async () => {
      await recorder.stop();
      resetUniqueDomains();
    });

    it("can delete an existing domain", async () => {
      const domain: SipDomain = {
        fqdn: firstDomain,
        enabled: false,
      };

      await client.setDomain(domain);
      await client.deleteDomain(firstDomain);

      try {
        await client.getDomain(firstDomain);
      } catch (error: any) {
        assert.equal(error.code, "NotFound");
        return;
      }
      assert.fail("NotFound expected.");
    });

    it("cannot delete non existing domain but succeeds", async () => {
      await client.deleteDomain("notExisting.fqdn.com");
    });
  });
});

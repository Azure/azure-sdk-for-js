// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import type { SipRoutingClient } from "../../../src/index.js";

import type { Recorder } from "@azure-tools/test-recorder";
import { isPlaybackMode } from "@azure-tools/test-recorder";
import { type SipDomain } from "../../../src/models.js";
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
  describe(`SipRoutingClient - set domains${useAad ? " [AAD]" : ""}`, function () {
    let client: SipRoutingClient;
    let recorder: Recorder;
    let domain1 = "";
    let domain2 = "";
    let domain3 = "";
    let domain4 = "";

    beforeAll(async () => {
      if (!isPlaybackMode()) {
        await clearSipConfiguration();
      }
    });

    beforeEach(async (ctx) => {
      ({ client, recorder } = useAad
        ? await createRecordedClientWithToken(ctx)
        : await createRecordedClient(ctx));
      domain1 = getUniqueDomain(recorder);
      domain2 = getUniqueDomain(recorder);
      domain3 = getUniqueDomain(recorder);
      domain4 = getUniqueDomain(recorder);
    });

    afterEach(async () => {
      await recorder.stop();
      resetUniqueDomains();
    });

    it("can set multiple new domains when empty before", async () => {
      await client.setDomains([]);

      const domains: SipDomain[] = [
        { fqdn: domain1, enabled: false },
        { fqdn: domain2, enabled: false },
      ];

      const setDomains = await client.setDomains(domains);
      assert.deepEqual(setDomains, domains);
    });

    it("can override existing domains", async () => {
      const initialDomains: SipDomain[] = [
        { fqdn: domain1, enabled: false },
        { fqdn: domain2, enabled: false },
      ];
      const setInitialDomains = await client.setDomains(initialDomains);
      assert.deepEqual(setInitialDomains, initialDomains);

      const domains: SipDomain[] = [
        { fqdn: domain3, enabled: false },
        { fqdn: domain4, enabled: false },
      ];
      const setDomains = await client.setDomains(domains);
      assert.deepEqual(setDomains, domains);
    });

    it("cannot set invalid domain uri", async () => {
      const invalidDomain: SipDomain = { fqdn: "-1", enabled: false };
      try {
        await client.setDomain(invalidDomain);
      } catch (error: any) {
        assert.equal(error.code, "UnprocessableConfiguration");

        try {
          await client.getDomain(invalidDomain.fqdn);
        } catch (getError: any) {
          console.log(`${getError} `);
          assert.equal(getError.code, "NotFound");
          return;
        }
        assert.fail("NotFound expected.");
      }
      assert.fail("UnprocessableConfiguration expected.");
    });
  });
});

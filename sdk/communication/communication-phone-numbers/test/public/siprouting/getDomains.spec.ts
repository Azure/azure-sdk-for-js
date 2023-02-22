// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Licensed under the MIT license.

import { assert } from "chai";
import { Context } from "mocha";
import { matrix } from "@azure/test-utils";
import { Recorder, isPlaybackMode } from "@azure-tools/test-recorder";
import { SipDomain, SipRoutingClient } from "../../../src/sipRoutingClient";
import {
  createRecordedClient,
  createRecordedClientWithToken,
  getUniqueDomain,
  resetUniqueDomains,
  clearSipConfiguration,
} from "./utils/recordedClient";

matrix([[true, false]], async function (useAad) {
  describe(`SipRoutingClient - get domains${useAad ? " [AAD]" : ""}`, function () {
    let client: SipRoutingClient;
    let recorder: Recorder;
    let firstDomain = "";
    let secondDomain = "";
    let thirdDomain = "";
    let forthDomain = "";

    // to be removed once API is finished
    before(async function () {
      console.log("SipRoutingClient - get domain will be skiped because of not finished API");

      if (!isPlaybackMode()) {
        await clearSipConfiguration();
      }
    });

    beforeEach(async function (this: Context) {
      ({ client, recorder } = useAad
        ? await createRecordedClientWithToken(this)
        : await createRecordedClient(this));
      firstDomain = getUniqueDomain(recorder);
      secondDomain = getUniqueDomain(recorder);
      thirdDomain = getUniqueDomain(recorder);
      forthDomain = getUniqueDomain(recorder);
    });

    afterEach(async function (this: Context) {
      if (!this.currentTest?.isPending()) {
        await recorder.stop();
      }
      resetUniqueDomains();
    });

    it("cannot retrieve a not existing domain", async () => {
      await client.setDomain({ domainName: firstDomain, enabled: true } as SipDomain);

      const domain = await client.getDomain(firstDomain);

      assert.isNotNull(domain);
      assert.equal(domain?.enabled, true);
    });

    it("can retrieve domains", async () => {
      assert.isArray(await client.getDomains());
    });

    it("can retrieve empty domains", async () => {
      await client.setDomains([]);

      const domains = await client.getDomains();

      assert.isNotNull(domains);
      assert.isArray(domains);
      assert.isEmpty(domains);
    });

    it("can retrieve not empty domains", async () => {
      const expectedDomains = [
        { domainName: secondDomain, enabled: true },
        { domainName: thirdDomain, enabled: true },
        { domainName: forthDomain, enabled: true },
      ];
      await client.setDomains(expectedDomains);

      const domains = await client.getDomains();

      assert.isNotNull(domains);
      assert.isArray(domains);
      assert.deepEqual(domains, expectedDomains);
    });
  });
});

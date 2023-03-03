// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Licensed under the MIT license.

import { assert } from "chai";
import { Context } from "mocha";
import { matrix } from "@azure/test-utils";
import { Recorder, isPlaybackMode } from "@azure-tools/test-recorder";
import { SipDomain, SipRoutingClient } from "../../../src/sipRoutingClient";
import {
  clearSipConfiguration,
  createRecordedClient,
  createRecordedClientWithToken,
  getUniqueDomain,
  listAllDomains,
  resetUniqueDomains,
} from "./utils/recordedClient";

matrix([[true, false]], async function (useAad) {
  describe(`SipRoutingClient - get domains${useAad ? " [AAD]" : ""}`, function () {
    let client: SipRoutingClient;
    let recorder: Recorder;
    let firstDomain = "";
    let secondDomain = "";
    let thirdDomain = "";
    let fourthDomain = "";

    // to be removed once API is finished
    before(async function () {
      console.log("SipRoutingClient - get domain");

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
      fourthDomain = getUniqueDomain(recorder);
    });

    afterEach(async function (this: Context) {
      if (!this.currentTest?.isPending()) {
        await recorder.stop();
      }
      resetUniqueDomains();
    });

    it("cannot retrieve nonexisting domain", async () => {
      try {
        await client.getDomain(fourthDomain);
      } catch (error: any) {
        assert.equal(error.code, "NotFound");
        return;
      }
      assert.fail("NotFound expected.");
    });

    it("can retrieve domains", async () => {
      assert.isArray(await listAllDomains(client));
    });

    it("can retrieve existing domain", async () => {
      await client.setDomain({ domainName: firstDomain, enabled: false } as SipDomain);

      const domain = await client.getDomain(firstDomain);
      if (domain == null) {
        assert.fail("Single domain not found.");
      }

      assert.isNotNull(domain);
      assert.equal(domain?.enabled, false);
    });

    it("can retrieve not empty domains", async () => {
      const expectedDomains = [
        { domainName: secondDomain, enabled: false },
        { domainName: thirdDomain, enabled: false },
      ];
      const initialDomains = await listAllDomains(client);

      await client.setDomain(expectedDomains[0]);
      await client.setDomain(expectedDomains[1]);

      const resultingDmains = await listAllDomains(client);

      assert.isNotNull(resultingDmains);
      assert.isArray(resultingDmains);
      assert.deepEqual(resultingDmains, [...initialDomains, ...expectedDomains]);
    });
  });
});

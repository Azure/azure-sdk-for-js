// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { Context } from "mocha";

import { SipRoutingClient } from "../../../src";

import { Recorder, isPlaybackMode } from "@azure-tools/test-recorder";
import { SipDomain, SipTrunk } from "../../../src/models";
import {
  clearSipConfiguration,
  createRecordedClient,
  createRecordedClientWithToken,
  getUniqueDomain,
  getUniqueFqdn,
  listAllDomains,
  resetUniqueDomains,
  resetUniqueFqdns,
} from "./utils/recordedClient";
import { matrix } from "@azure/test-utils";

matrix([[true, false]], async function (useAad) {
  describe(`SipRoutingClient - delete domain${useAad ? " [AAD]" : ""}`, function () {
    let client: SipRoutingClient;
    let recorder: Recorder;
    let firstDomain = "";
    let secondDomain = "";

    before(async function () {
      console.log("SipRoutingClient - delete domain");

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
    });

    afterEach(async function (this: Context) {
      if (!this.currentTest?.isPending()) {
        await recorder.stop();
      }
      resetUniqueFqdns();
      resetUniqueDomains();
    });

    it("can delete an existing domain", async () => {
      const domain: SipDomain = {
        domainName: firstDomain,
        enabled: false,
      };

      await client.setDomain(domain);
      await client.deleteDomain(firstDomain);
      assert.notExists(
        (await listAllDomains(client)).find((value) => value.domainName === domain.domainName)
      );
    });

    it("cannot delete non existing domain but succeeds", async () => {
      const initialDomains = await listAllDomains(client);
      await client.deleteDomain("notExisting.fqdn.com");
      const resultingDomains = await listAllDomains(client);
      assert.deepEqual(initialDomains, resultingDomains);
    });

    it("cannot delete domain if depended trunks exist", async () => {
      const domainName = secondDomain;
      const domain: SipDomain = {
        domainName: domainName,
        enabled: false,
      };
      const trunk: SipTrunk = {
        fqdn: getUniqueFqdn(recorder, domainName),
        sipSignalingPort: 5678,
        enabled: false,
      };
      await client.setDomain(domain);
      await client.setTrunk(trunk);

      try {
        await client.deleteDomain(domainName);
      } catch (error: any) {
        assert.equal(error.code, "UnprocessableConfiguration");
        const storedDomains = await listAllDomains(client);
        assert.isNotNull(storedDomains);
        assert.isArray(storedDomains);
        assert.isNotEmpty(storedDomains);
        return;
      }
      assert.fail("UnprocessableConfiguration expected.");
    });
  });
});

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { Context } from "mocha";

import { SipRoutingClient } from "../../../src";

import { Recorder, isPlaybackMode } from "@azure-tools/test-recorder";
import { SipDomain, SipTrunk } from "../../../src/models";
import {
  createRecordedClient,
  createRecordedClientWithToken,
  getUniqueDomain,
  resetUniqueDomains,
  clearSipConfiguration,
} from "./utils/recordedClient";
import { matrix } from "@azure/test-utils";

matrix([[true, false]], async function (useAad) {
  describe(`SipRoutingClient - delete domain${useAad ? " [AAD]" : ""}`, function () {
    let client: SipRoutingClient;
    let recorder: Recorder;
    let firstDomain = "";
    let secondDomain = "";

    // to be removed once API is finished
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
      resetUniqueDomains();
    });

    it("can delete an existing domain", async () => {
      const domain: SipDomain = {
        domainName: firstDomain,
        enabled: true,
      };

      await client.setDomain(domain);
      await client.deleteDomain(firstDomain);
      assert.exists(
        (await client.listDomains()).find((value) => value.domainName === domain.domainName)
      );
    });

    it("cannot delete non existing domain but succeeds", async () => {
      await client.setDomains([]);
      const storedDomain = await client.deleteDomain("notExisting.fqdn.com");
      assert.isNotNull(storedDomain);
      assert.isEmpty(storedDomain);
    });

    it("cannot delete domain if depended trunks exist", async () => {
      const domainName = secondDomain;
      const domain: SipDomain = {
        domainName: domainName,
        enabled: true,
      };
      const trunk: SipTrunk = {
        fqdn: generateTrunk(domainName),
        sipSignalingPort: 5678,
        enabled: true,
      };
      await client.setDomain(domain);
      await client.setTrunk(trunk);

      try {
        await client.deleteDomain(domainName);
      } catch (error: any) {
        assert.equal(error.code, "UnprocessableConfiguration");
        const storedDomains = await client.listDomains();
        assert.isNotNull(storedDomains);
        assert.isArray(storedDomains);
        assert.isNotEmpty(storedDomains);
        return;
      }
      assert.fail("UnprocessableConfiguration expected.");
    });
  });
});

function generateTrunk(domain: string): string {
  const length = 12;
  let random = 0;
  do {
    random = Math.floor(Math.random() * 10 ** length);
  } while (random < 10 ** (length - 1));
  return `${random}.${domain}`;
}

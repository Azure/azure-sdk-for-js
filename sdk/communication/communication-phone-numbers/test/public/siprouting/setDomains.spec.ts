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
  listAllTrunks,
  listAllDomains,
} from "./utils/recordedClient";
import { matrix } from "@azure/test-utils";

matrix([[true, false]], async function (useAad) {
  describe(`SipRoutingClient - set domains${useAad ? " [AAD]" : ""}`, function () {
    let client: SipRoutingClient;
    let recorder: Recorder;
    let domain1 = "";
    let domain2 = "";
    let domain3 = "";
    let domain4 = "";
    let domain5 = "";
    let domain6 = "";
    let domain7 = "";
    let domain8 = "";
    let domain9 = "";
    let domain10 = "";
    let domain11 = "";

    // to be removed once API is finished
    before(async function () {
      console.log("SipRoutingClient - set domain");

      if (!isPlaybackMode()) {
        await clearSipConfiguration();
      }
    });

    beforeEach(async function (this: Context) {
      ({ client, recorder } = useAad
        ? await createRecordedClientWithToken(this)
        : await createRecordedClient(this));
      domain1 = getUniqueDomain(recorder);
      domain2 = getUniqueDomain(recorder);
      domain3 = getUniqueDomain(recorder);
      domain4 = getUniqueDomain(recorder);
      domain5 = getUniqueDomain(recorder);
      domain6 = getUniqueDomain(recorder);
      domain7 = getUniqueDomain(recorder);
      domain8 = getUniqueDomain(recorder);
      domain9 = getUniqueDomain(recorder);
      domain10 = getUniqueDomain(recorder);
      domain11 = getUniqueDomain(recorder);
    });

    afterEach(async function (this: Context) {
      if (!this.currentTest?.isPending()) {
        await recorder.stop();
      }
      resetUniqueDomains();
    });

    it("can set a new domain", async () => {
      const domainToSet = domain1;
      const domain: SipDomain = { domainName: domainToSet, enabled: true };

      const setDomain = await client.setDomain(domain);
      assert.deepEqual(setDomain, domain);

      const getDomain = await client.getDomain(domainToSet);
      assert.deepEqual(getDomain, domain);
    });

    it("can set an existing domain", async () => {
      const domainToSet = domain2;
      const domain: SipDomain = { domainName: domainToSet, enabled: true };
      await client.setDomain(domain);

      domain.enabled = false;

      const setDomain = await client.setDomain(domain);
      assert.deepEqual(setDomain, domain);

      const getDomain = await client.getDomain(domainToSet);
      assert.deepEqual(getDomain, domain);
    });

    it("can set multiple new domains when empty before", async () => {
      await client.setDomains([]);

      const domains: SipDomain[] = [
        { domainName: domain3, enabled: true },
        { domainName: domain4, enabled: true },
      ];

      const setDomains = await client.setDomains(domains);
      assert.deepEqual(setDomains, domains);

      const storedDomains = await listAllDomains(client);
      assert.deepEqual(storedDomains, domains);
    });

    it("can set multiple existing domains", async () => {
      const domains: SipDomain[] = [
        { domainName: domain5, enabled: true },
        { domainName: domain6, enabled: true },
      ];
      await client.setDomains(domains);

      domains[0].enabled = false;
      domains[1].enabled = false;

      const setDomains = await client.setDomains(domains);
      assert.deepEqual(setDomains, domains);

      const storedDomains = await listAllDomains(client);
      assert.deepEqual(storedDomains, domains);
    });

    it("can set empty domains when empty before", async () => {
      await client.setDomains([]);

      const storedDomains = await listAllDomains(client);
      assert.isNotNull(storedDomains);
      assert.isArray(storedDomains);
      assert.isEmpty(storedDomains);
    });

    it("can set empty domains when not empty before", async () => {
      const domains: SipDomain[] = [
        { domainName: domain7, enabled: true },
        { domainName: domain8, enabled: true },
      ];
      await client.setDomains(domains);

      await client.setDomains([]);

      const storedDomains = await listAllDomains(client);
      assert.isNotNull(storedDomains);
      assert.isArray(storedDomains);
      assert.isEmpty(storedDomains);
    });

    it("cannot set invalid domain uri", async () => {
      const invalidDomain: SipDomain = { domainName: "-1", enabled: true };
      try {
        await client.setDomain(invalidDomain);
      } catch (error: any) {
        assert.equal(error.code, "UnprocessableConfiguration");

        try {
          await client.getDomain("-1");
        } catch (getError: any) {
          assert.equal(getError.code, "NotFound");
          return;
        }
        assert.fail("NotFound expected.");
      }
      assert.fail("UnprocessableConfiguration expected.");
    });

    it("cannot set trunks without configured domain", async () => {
      await client.setDomains([]);

      const expectedTrunks: SipTrunk[] = [
        { fqdn: domain9, sipSignalingPort: 8239, enabled: true },
        { fqdn: domain10, sipSignalingPort: 7348, enabled: true },
      ];

      try {
        await client.setTrunks(expectedTrunks);
      } catch (error: any) {
        assert.equal(error.code, "UnprocessableConfiguration");
        const storedTrunks = await listAllTrunks(client);
        assert.isNotNull(storedTrunks);
        assert.isArray(storedTrunks);
        assert.isEmpty(storedTrunks);
        return;
      }
      assert.fail("UnprocessableConfiguration expected.");
    });

    it("cannot set trunks without enabled domain", async () => {
      const domainName = domain11;
      const domains: SipDomain[] = [{ domainName: domainName, enabled: false }];
      await client.setDomains(domains);

      const expectedTrunks: SipTrunk[] = [
        { fqdn: generateTrunk(domainName), sipSignalingPort: 8239, enabled: true },
      ];

      try {
        await client.setTrunks(expectedTrunks);
      } catch (error: any) {
        assert.equal(error.code, "UnprocessableConfiguration");
        const storedTrunks = await listAllTrunks(client);
        assert.isNotNull(storedTrunks);
        assert.isArray(storedTrunks);
        assert.isEmpty(storedTrunks);
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

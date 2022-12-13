// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { Context } from "mocha";

import { SipRoutingClient } from "../../../src";

import { Recorder } from "@azure-tools/test-recorder";
import { SipDomain, SipTrunk } from "../../../src/models";
import { createRecordedClient, createRecordedClientWithToken } from "./utils/recordedClient";
import { matrix } from "@azure/test-utils";

matrix([[true, false]], async function (useAad) {
  describe(`SipRoutingClient - set domains${useAad ? " [AAD]" : ""}`, function () {
    let client: SipRoutingClient;
    let recorder: Recorder;

    beforeEach(async function (this: Context) {
      ({ client, recorder } = useAad
        ? await createRecordedClientWithToken(this)
        : await createRecordedClient(this));
    });

    afterEach(async function (this: Context) {
      if (!this.currentTest?.isPending()) {
        await recorder.stop();
      }
    });

    it("can set a new domain", async () => {
      let domainToSet = generateDomain("third");
      const domain: SipDomain = { domainUri: domainToSet, enabled: true };

      const setDomain = await client.setDomain(domain);
      assert.deepEqual(setDomain, domain);

      const getDomain = await client.getDomain(domainToSet);
      assert.deepEqual(getDomain, domain);
    });

    it("can set an existing domain", async () => {
      let domainToSet = generateDomain("forth");
      const domain: SipDomain = { domainUri: domainToSet, enabled: true };
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
        { domainUri: generateDomain("fifth"), enabled: true },
        { domainUri: generateDomain("fifth"), enabled: true},
      ];

      const setDomains = await client.setDomains(domains);
      assert.deepEqual(setDomains, domains);

      const storedDomains = await client.getDomains();
      assert.deepEqual(storedDomains, domains);
    });

    it("can set multiple existing domains", async () => {
      let domain1 = generateDomain("sixth");
      let domain2 = generateDomain("sixth");
      const domains: SipDomain[] = [
        { domainUri: domain1, enabled: true },
        { domainUri: domain2, enabled: true },
      ];
      await client.setDomains(domains);

      domains[0].enabled = false;
      domains[1].enabled = false;

      const setDomains = await client.setDomains(domains);
      assert.deepEqual(setDomains, domains);

      const storedDomains = await client.getDomains();
      assert.deepEqual(storedDomains, domains);
    });

    it("can set empty domains when empty before", async () => {
      await client.setDomains([]);

      const storedDomains = await client.getDomains();
      assert.isNotNull(storedDomains);
      assert.isArray(storedDomains);
      assert.isEmpty(storedDomains);
    });

    it("can set empty domains when not empty before", async () => {
      const domains: SipDomain[] = [
        { domainUri: generateDomain("seventh"), enabled: true },
        { domainUri: generateDomain("seventh"), enabled: true },
      ];
      await client.setDomains(domains);

      await client.setDomains([]);

      const storedDomains = await client.getDomains();
      assert.isNotNull(storedDomains);
      assert.isArray(storedDomains);
      assert.isEmpty(storedDomains);
    });

    it("cannot set invalid domain uri", async () => {
      const invalidDomain: SipDomain = { domainUri: "-1", enabled: true };
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
      let domainUri = generateDomain("eighth");
      await client.setDomains([]);

      const expectedTrunks: SipTrunk[] = [
        { fqdn: generateTrunk(domainUri), sipSignalingPort: 8239, enabled: true },
        { fqdn: generateTrunk(domainUri), sipSignalingPort: 7348, enabled: true },
      ];      

      try {
        await client.setTrunks(expectedTrunks);
      } catch (error: any) {
        assert.equal(error.code, "UnprocessableConfiguration");
        const storedTrunks = await client.getTrunks();
        assert.isNotNull(storedTrunks);
        assert.isArray(storedTrunks);
        assert.isEmpty(storedTrunks);
        return;
      }
      assert.fail("UnprocessableConfiguration expected.");
    });

    it("cannot set trunks without enabled domain", async () => {
      let domainUri = generateDomain("ninth");
      let domains: SipDomain[] = [
        {domainUri: domainUri, enabled: false}
      ];
      await client.setDomains(domains);
      
      const expectedTrunks: SipTrunk[] = [
        { fqdn: generateTrunk(domainUri), sipSignalingPort: 8239, enabled: true },
      ];      

      try {
        await client.setTrunks(expectedTrunks);
      } catch (error: any) {
        assert.equal(error.code, "UnprocessableConfiguration");
        const storedTrunks = await client.getTrunks();
        assert.isNotNull(storedTrunks);
        assert.isArray(storedTrunks);
        assert.isEmpty(storedTrunks);
        return;
      }
      assert.fail("UnprocessableConfiguration expected.");
    });
  });
});

//move to recordedClient when changes from master are merged
function generateDomain(order: string) {
  const length = 12;
  let random = 0;
  do {
    random = Math.floor(Math.random() * 10 ** length);
  } while (random < 10 ** (length - 1));
  return `${order}${random}.com`;
}

function generateTrunk(domain: string) {
  const length = 12;
  let random = 0;
  do {
    random = Math.floor(Math.random() * 10 ** length);
  } while (random < 10 ** (length - 1));
  return `${random}.${domain}.com`;
}

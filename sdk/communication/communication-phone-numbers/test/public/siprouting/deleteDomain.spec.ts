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
  describe(`SipRoutingClient - delete trunk${useAad ? " [AAD]" : ""}`, function () {
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

    it("can delete an existing domain", async () => {
      const domain: SipDomain = {
        domainUri: generateDomain("tenth"),
        enabled: true
      };
      
      const storedDomain = await client.setDomain(domain);
      assert.deepEqual(storedDomain, domain);
      assert.exists((await client.getDomains()).find((value) => value.domainUri === domain.domainUri));
    });

    it("cannot delete non existing domain but succeeds", async () => {
      await client.setDomains([]);
      const domainUri = generateDomain("eleventh");
      
      const storedDomain = await client.deleteDomain(domainUri);
      assert.isNotNull(storedDomain);
      assert.isArray(storedDomain);
      assert.isEmpty(storedDomain);
    });

    it("cannot delete domain if depended trunks exist", async () => {
      let domainUri = generateDomain("twelfth");
      let domain: SipDomain = {
        domainUri: domainUri,
        enabled: true
      }
      const trunk: SipTrunk = {
        fqdn: generateTrunk(domainUri),
        sipSignalingPort: 5678,
        enabled: true
      };
      await client.setDomain(domain);
      await client.setTrunk(trunk);
      
      try {
        await client.deleteDomain(domainUri);
      } catch(error: any) {
        assert.equal(error.code, "UnprocessableConfiguration");
        const storedDomains = await client.getDomains();
        assert.isNotNull(storedDomains);
        assert.isArray(storedDomains);
        assert.isNotEmpty(storedDomains);
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

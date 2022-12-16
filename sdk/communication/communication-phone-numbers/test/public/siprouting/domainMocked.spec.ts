// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Licensed under the MIT license.

import { assert } from "chai";
import { Context } from "mocha";
import { matrix } from "@azure/test-utils";
import { Recorder } from "@azure-tools/test-recorder";
import { SipDomain, SipRoutingClient } from "../../../src/sipRoutingClient";
import { 
  createRecordedClient, 
  createRecordedClientWithToken, 
  getUniqueDomain,
  resetUniqueDomains } from "./utils/recordedClient";

matrix([[true, false]], async function (useAad) {
  describe(`SipRoutingClient - domains mocked tests${useAad ? " [AAD]" : ""}`, function(){
    let client: SipRoutingClient;
    let recorder: Recorder;
    let firstDomain = "";

    beforeEach(async function (this: Context) {
      ({ client, recorder } = useAad
        ? await createRecordedClientWithToken(this, true)
        : await createRecordedClient(this, true));
        firstDomain = getUniqueDomain(recorder);
    });

    afterEach(async function (this: Context) {
      if (!this.currentTest?.isPending()) {
        await recorder.stop();
      }
      resetUniqueDomains();
    });
    
    
    it("get domain successful", async() => {      
      const domain = await client.getDomain("contoso.com");

      assert.isNotNull(domain);
      assert.equal(domain?.domainUri, "contoso.com");
      assert.equal(domain?.enabled, true);
    });

    it("set domain successful", async () => {
      const domainToSet = firstDomain;
      const domain: SipDomain = { domainUri: domainToSet, enabled: true };

      const setDomain = await client.setDomain(domain);
      assert.deepEqual(setDomain, domain);
    });

    it("delete domain successful", async () => {
      const domainUri = "contoso.com";
      try{
        await client.deleteDomain(domainUri);
      } catch(error: any){
        assert.fail("Delete domain");
      }      
    });
  });
});

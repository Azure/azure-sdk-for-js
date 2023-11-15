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
  resetUniqueDomains,
  resetUniqueFqdns,
} from "./utils/recordedClient";
import { matrix } from "@azure/test-utils";

matrix([[true, false]], async function (useAad) {
  describe(`SipRoutingClient - set domains${useAad ? " [AAD]" : ""}`, function () {
    let client: SipRoutingClient;
    let recorder: Recorder;
    let domain1 = "";
    let domain9 = "";
    let domain10 = "";
    let domain11 = "";

    before(async function () {
      console.log("SipRoutingClient - set domain");

      if (!isPlaybackMode()) {
        await clearSipConfiguration();
      }
    });

    beforeEach(async function (this: Context) {
      ({ client, recorder } = useAad
        ? await createRecordedClientWithToken(this, true)
        : await createRecordedClient(this, true));
      domain1 = getUniqueDomain(recorder);
      domain9 = getUniqueDomain(recorder);
      domain10 = getUniqueDomain(recorder);
      domain11 = getUniqueDomain(recorder);
    });

    afterEach(async function (this: Context) {
      if (!this.currentTest?.isPending()) {
        await recorder.stop();
      }
      resetUniqueFqdns();
      resetUniqueDomains();
    });

    it("can set a new domain", async () => {
      const domainToSet = domain1;
      const domain: SipDomain = { domainName: domain1, enabled: false };

      const setDomain = await client.setDomain(domain);
      assert.deepEqual(setDomain, domain);

      const getDomain = await client.getDomain(domainToSet);
      assert.deepEqual(getDomain, domain);
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
      const expectedTrunks: SipTrunk[] = [
        { fqdn: getUniqueFqdn(recorder, domain9), sipSignalingPort: 8239, enabled: false },
        { fqdn: getUniqueFqdn(recorder, domain10), sipSignalingPort: 7348, enabled: false },
      ];

      try {
        await client.setTrunks(expectedTrunks);
      } catch (error: any) {
        assert.equal(error.code, "UnprocessableConfiguration");
        return;
      }
      assert.fail("UnprocessableConfiguration expected.");
    });

    it("cannot set trunks without enabled domain", async () => {
      const nostojic13012023Name = domain11;
      const domain = { domainName: nostojic13012023Name, enabled: false };
      await client.setDomain(domain);

      const expectedTrunks: SipTrunk[] = [
        {
          fqdn: getUniqueFqdn(recorder, nostojic13012023Name),
          sipSignalingPort: 8239,
          enabled: true,
        },
      ];

      try {
        await client.setTrunks(expectedTrunks);
      } catch (error: any) {
        assert.equal(error.code, "UnprocessableConfiguration");
        return;
      }
      assert.fail("UnprocessableConfiguration expected.");
    });
  });
});

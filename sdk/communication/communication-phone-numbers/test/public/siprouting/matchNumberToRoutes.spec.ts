﻿// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { Context } from "mocha";

import { SipRoutingClient } from "../../../src";

import { isPlaybackMode, Recorder } from "@azure-tools/test-recorder";
import {
  clearSipConfiguration,
  createRecordedClient,
  createRecordedClientWithToken,
  getUniqueDomain,
  getUniqueFqdn
} from "./utils/recordedClient";
import { matrix } from "@azure/test-utils";
import { SipRoutingTestRoutesWithNumberOptionalParams } from "../../../src/generated/src/siprouting";

interface IMatchNumberToRoutesTestContext {
  domain: string;
  trunkUs: string;
  trunkNz: string;
}
async function createSipConfiguration(
  client: SipRoutingClient,
  { domain, trunkNz, trunkUs}: IMatchNumberToRoutesTestContext
) {
  await client.setDomain({ domainName: domain, enabled: true });
  await client.setTrunks([
    { fqdn: trunkUs, sipSignalingPort: 6001, enabled: true },
    { fqdn: trunkNz, sipSignalingPort: 6002, enabled: true }
  ]);
  await client.setRoutes([
    { name: "Us route", numberPattern: "^\\+1(\\d{10})$", trunks: [trunkUs]},
    { name: "Nz route", numberPattern: "^\\+6(\\d{10})$", trunks: [trunkNz]}
  ]);
}

const testDomainName = process.env.AZURE_COMMUNICATION_TEST_DOMAIN_NAME;

matrix([[true, false]], async function(useAad) {
  describe(`SipRoutingClient - match number to routes ${useAad ? " [AAD]" : ""}`, function() {
    let client: SipRoutingClient;
    let recorder: Recorder;
    let domain: string;
    let trunkUs: string;
    let trunkNz: string;

    beforeEach(async function(this: Context) {
      ({ client, recorder } = useAad
        ? await createRecordedClientWithToken(this)
        : await createRecordedClient(this));

      domain = testDomainName || getUniqueDomain(recorder);
      trunkUs = getUniqueFqdn(recorder, domain)
      trunkNz = getUniqueFqdn(recorder, domain);

      await createSipConfiguration(client, { domain, trunkNz, trunkUs });
    });

    afterEach(async function(this: Context) {
      if (!this.currentTest?.isPending()) {
        await recorder.stop();
      }

      if (!isPlaybackMode()) {
        await clearSipConfiguration();
      }
    });

    it("should match number to routes", async function() {
      const testDomain = { domainName: domain, enabled: true };
      const configuration = { [testDomain.domainName]: testDomain };
      const matchedRoutes = await client.matchNumberToRoutes("+12345678901", configuration);
      const expected = [{
        name: "Us route",
        numberPattern: "^\\+1(\\d{10})$",
        trunks: [trunkUs],
        description: null
      }];

      assert.isArray(matchedRoutes);
      assert.deepEqual(matchedRoutes, expected);
    });

    it("return empty array when not found", async function() {
      const configuration = { [domain]: { domainName: domain, enabled: true }};
      const matchedRoutes = await client.matchNumberToRoutes(
        "+72345678901",
        configuration as SipRoutingTestRoutesWithNumberOptionalParams
      );

      assert.isArray(matchedRoutes);
      assert.isEmpty(matchedRoutes);
    });
  });
});

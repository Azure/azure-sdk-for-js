// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { assert } from "chai";
import { Context } from "mocha";
import { SipRoutingClient, SipRoutingTestRoutesWithNumberOperationParams } from "../../../src";
import { isPlaybackMode, Recorder } from "@azure-tools/test-recorder";
import {
  clearSipConfiguration,
  createRecordedClient,
  createRecordedClientWithToken,
  getAzureTestDomain,
  getUniqueFqdn,
  resetUniqueFqdns,
} from "./utils/recordedClient";
import { matrix } from "@azure/test-utils";

matrix([[false, true]], async function (useAad) {
  describe(`SipRoutingClient - match number to routes${useAad ? " [AAD]" : ""}`, function () {
    let client: SipRoutingClient;
    let recorder: Recorder;
    let trunkUs: string;
    let trunkNz: string;
    const domain: string = getAzureTestDomain();

    beforeEach(async function (this: Context) {
      ({ client, recorder } = useAad
        ? await createRecordedClientWithToken(this)
        : await createRecordedClient(this));

      resetUniqueFqdns();
      trunkUs = getUniqueFqdn(recorder);
      trunkNz = getUniqueFqdn(recorder);

      await client.setTrunks([
        { fqdn: trunkUs, sipSignalingPort: 6001, enabled: true },
        { fqdn: trunkNz, sipSignalingPort: 6002, enabled: true },
      ]);

      await client.setRoutes([
        {
          name: "Us route",
          numberPattern: "^\\+1(\\d{10})$",
          trunks: [trunkUs],
          description: "us route",
        },
        {
          name: "Nz route",
          numberPattern: "^\\+6(\\d{10})$",
          trunks: [trunkNz],
          description: "nz route",
        },
      ]);
    });

    afterEach(async function (this: Context) {
      if (!this.currentTest?.isPending()) {
        await recorder.stop();
      }

      if (!isPlaybackMode()) {
        await clearSipConfiguration();
      }
      resetUniqueFqdns();
    });

    it("should match number to routes", async function () {
      const matchedRoutes = await client.matchNumberToRoutes("+12345678901", {});
      const expected = [
        {
          name: "Us route",
          numberPattern: "^\\+1(\\d{10})$",
          trunks: [trunkUs],
          description: "us route",
        },
      ];

      assert.isArray(matchedRoutes);
      assert.deepEqual(matchedRoutes, expected);
    });

    it("return empty array when not found", async function () {
      const configuration = { [domain]: { domainName: domain, enabled: true } };
      const matchedRoutes = await client.matchNumberToRoutes(
        "+72345678901",
        configuration as SipRoutingTestRoutesWithNumberOperationParams,
      );

      assert.isArray(matchedRoutes);
      assert.isEmpty(matchedRoutes);
    });

    it("return empty array for empty options", async function () {
      const matchedRoutes = await client.matchNumberToRoutes(
        "+72345678901",
        {} as SipRoutingTestRoutesWithNumberOperationParams,
      );

      assert.isArray(matchedRoutes);
      assert.isEmpty(matchedRoutes);
    });
  });
});

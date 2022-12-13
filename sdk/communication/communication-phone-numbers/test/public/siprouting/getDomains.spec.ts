// Licensed under the MIT license.

import { assert } from "chai";
import { Context } from "mocha";
import { matrix } from "@azure/test-utils";
import { Recorder } from "@azure-tools/test-recorder";
import { SipDomain, SipRoutingClient } from "../../../src/sipRoutingClient";
import { createRecordedClient, createRecordedClientWithToken } from "./utils/recordedClient";

matrix([[true, false]], async function (useAad) {
  describe(`SipRoutingClient - get domains${useAad ? " [AAD]": ""}`, function(){
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
    
    it("cannot retrieve a not existing domain", async() => {
      let domainToSet = generateDomain("first");
      await client.setDomain({ domainUri: domainToSet, enabled: true } as SipDomain);

      const domain = await client.getDomain(domainToSet);

      assert.isNotNull(domain);
      assert.equal(domain?.enabled, true);
    });

    it("can retrieve domains", async () => {
      assert.isArray(await client.getDomains());
    });

    it("can retrieve empty domains", async () => {
      await client.setDomains([]);

      const domains = await client.getDomains();

      assert.isNotNull(domains);
      assert.isArray(domains);
      assert.isEmpty(domains);
    });

    it("can retrieve not empty domains", async () => {
      const expectedDomains = [
        { domainUri: generateDomain("second"), enabled: true },
        { domainUri: generateDomain("second"), enabled: true },
        { domainUri: generateDomain("second"), enabled: true },
      ];
      await client.setDomains(expectedDomains);

      const domains = await client.getDomains();

      assert.isNotNull(domains);
      assert.isArray(domains);
      assert.deepEqual(domains, expectedDomains);
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

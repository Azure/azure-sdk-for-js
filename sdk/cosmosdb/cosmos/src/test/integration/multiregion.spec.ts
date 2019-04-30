import assert from "assert";

import { CosmosClient } from "../../CosmosClient";
import { ConnectionPolicy, DatabaseAccount } from "../../documents";

import { endpoint, masterKey } from "../common/_testConfig";

// This test requires a multi-region write enabled account with at least two regions.
(process.env.TESTS_MULTIREGION ? describe : describe.skip)("Multi-region tests", function() {
  this.timeout(process.env.MOCHA_TIMEOUT || "30000");
  let preferredLocations: string[] = [];
  let dbAccount: DatabaseAccount;

  before(async function() {
    const client = new CosmosClient({ endpoint, auth: { masterKey } });
    ({ body: dbAccount } = await client.getDatabaseAccount());
    // We reverse the order of the preferred locations list to make sure
    // we don't just follow the order we got back from the server
    preferredLocations = dbAccount.readableLocations.map(v => v.name).reverse();
    assert(
      preferredLocations.length > 1,
      "Not a multi-region account. Please add a region before running this test again."
    );
  });

  it("Preferred locations should be honored for readEndpoint", async function() {
    const connectionPolicy = new ConnectionPolicy();
    connectionPolicy.PreferredLocations = preferredLocations;
    const client = new CosmosClient({ endpoint, auth: { masterKey }, connectionPolicy });
    const currentReadEndpoint = await client.getReadEndpoint();
    assert(
      currentReadEndpoint.includes(preferredLocations[0].toLowerCase().replace(/ /g, "")),
      "The readendpoint should be the first preferred location"
    );
  });

  it("Preferred locations should be honored for writeEndpoint", async function() {
    assert(
      dbAccount.enableMultipleWritableLocations,
      "MultipleWriteableLocations must be set on your database account for this test to work"
    );
    const connectionPolicy = new ConnectionPolicy();
    connectionPolicy.PreferredLocations = preferredLocations;
    connectionPolicy.UseMultipleWriteLocations = true;
    const client = new CosmosClient({ endpoint, auth: { masterKey }, connectionPolicy });
    const currentWriteEndpoint = await client.getWriteEndpoint();
    assert(
      currentWriteEndpoint.includes(preferredLocations[0].toLowerCase().replace(/ /g, "")),
      "The writeendpoint should be the first preferred location"
    );
  });
});

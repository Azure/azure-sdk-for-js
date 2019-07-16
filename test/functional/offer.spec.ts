import assert from "assert";
import { Constants, CosmosClient } from "../..";
import { endpoint, masterKey } from "../common/_testConfig";
import { getEntropy, getTestContainer, removeAllDatabases } from "../common/TestHelpers";

const client = new CosmosClient({ endpoint, auth: { masterKey } });

const validateOfferResponseBody = function(offer: any) {
  assert(offer.id, "Id cannot be null");
  assert(offer._rid, "Resource Id (Rid) cannot be null");
  assert(offer._self, "Self Link cannot be null");
  assert(offer.resource, "Resource Link cannot be null");
  assert(offer._self.indexOf(offer.id) !== -1, "Offer id not contained in offer self link.");
};

describe("NodeJS CRUD Tests", function() {
  this.timeout(process.env.MOCHA_TIMEOUT || 10000);

  beforeEach(async function() {
    this.timeout(process.env.MOCHA_TIMEOUT || 10000);
    await removeAllDatabases();
  });

  describe("Validate Offer CRUD", function() {
    it("nativeApi Should do offer read and query operations successfully name based single partition collection", async function() {
      const mbInBytes = 1024 * 1024;
      const offerThroughput = 400;
      const container = await getTestContainer("Validate Offer CRUD");

      const { headers } = await container.read({ populateQuotaInfo: true });

      // Validate the collection size quota
      assert.notEqual(headers[Constants.HttpHeaders.MaxResourceQuota], null);
      assert.notEqual(headers[Constants.HttpHeaders.MaxResourceQuota], "");
      const collectionSize: number = Number(
        (headers[Constants.HttpHeaders.MaxResourceQuota] as string).split(";").reduce((map: any, obj: string) => {
          const items = obj.split("=");
          map[items[0]] = items[1];
          return map;
        }, {})[Constants.Quota.CollectionSize]
      );
      assert.equal(collectionSize, 10 * mbInBytes, "Collection size is unexpected");

      const { result: offers } = await client.offers.readAll().toArray();
      assert.equal(offers.length, 1);
      const expectedOffer = offers[0];
      assert.equal(
        expectedOffer.content.offerThroughput,
        offerThroughput,
        "Expected offerThroughput to be " + offerThroughput
      );
      validateOfferResponseBody(expectedOffer);

      // Read the offer
      const { body: readOffer } = await client.offer(expectedOffer.id).read();
      validateOfferResponseBody(readOffer);
      // Check if the read offer is what we expected.
      assert.equal(expectedOffer.id, readOffer.id);
      assert.equal(expectedOffer._rid, readOffer._rid);
      assert.equal(expectedOffer._self, readOffer._self);
      assert.equal(expectedOffer.resource, readOffer.resource);

      // Query for offer.
      const querySpec = {
        query: "select * FROM root r WHERE r.id=@id",
        parameters: [
          {
            name: "@id",
            value: expectedOffer.id
          }
        ]
      };
      const { result: offers2 } = await client.offers.query(querySpec).toArray();
      assert.equal(offers2.length, 1);
      const oneOffer = offers2[0];
      validateOfferResponseBody(oneOffer);
      // Now delete the collection.
      await container.delete();
      // read offer after deleting collection.
      try {
        await client.offer(expectedOffer.id).read();
        assert.fail("Must throw after delete");
      } catch (err) {
        const notFoundErrorCode = 404;
        assert.equal(err.code, notFoundErrorCode, "response should return error code 404");
      }
    });

    it("nativeApi Should do offer replace operations successfully name based", async function() {
      const container = await getTestContainer("Validate Offer CRUD");
      const { result: offers } = await client.offers.readAll().toArray();
      assert.equal(offers.length, 1);
      const expectedOffer = offers[0];
      validateOfferResponseBody(expectedOffer);
      // Replace the offer.
      const offerToReplace = Object.assign({}, expectedOffer);
      const oldThroughput = offerToReplace.content.offerThroughput;
      offerToReplace.content.offerThroughput = oldThroughput + 100;
      const { body: replacedOffer } = await client.offer(offerToReplace.id).replace(offerToReplace);
      validateOfferResponseBody(replacedOffer);
      // Check if the replaced offer is what we expect.
      assert.equal(replacedOffer.id, offerToReplace.id);
      assert.equal(replacedOffer._rid, offerToReplace._rid);
      assert.equal(replacedOffer._self, offerToReplace._self);
      assert.equal(replacedOffer.resource, offerToReplace.resource);
      assert.equal(replacedOffer.content.offerThroughput, offerToReplace.content.offerThroughput);
      // Replace an offer with a bad id.
      try {
        const offerBadId = Object.assign({}, offerToReplace);
        offerBadId._rid = "NotAllowed";
        await client.offer(offerBadId._self).replace(offerBadId);
        assert.fail("Must throw after replace with bad id");
      } catch (err) {
        const badRequestErrorCode = 400;
        assert.equal(err.code, badRequestErrorCode);
      }
    });
  });
});

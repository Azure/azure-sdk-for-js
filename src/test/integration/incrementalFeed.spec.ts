import * as assert from "assert";
import { FeedOptions } from "../..";
import { Container } from "../../client";
import { getTestContainer, removeAllDatabases } from "../common/TestHelpers";

describe("NodeJS Incremental Feed Tests using 'a_im' and 'IfNoneMatch' options", function() {
  // delete all databases and create sample database
  before(async function() {
    await removeAllDatabases();
  });

  describe("Newly updated documents should be fetched incremetally", function() {
    let container: Container;

    // create container and two documents
    before(async function() {
      container = await getTestContainer("Newly updated documents should be fetched incrementally");
      await container.items.create({ id: "doc1" });
      await container.items.create({ id: "doc2" });
    });

    after(async function() {
      await container.delete();
    });

    it("should fetch updated documents only", async function() {
      let options: FeedOptions = { a_im: "Incremental feed" };
      const query = container.items.readAll(options);

      const { result: document, headers } = await query.current();
      assert(headers.etag, "listDocuments response should have etag header");

      const { result: results } = await query.toArray();
      assert.equal(results.length, 2, "initial number of documents should be equal 2");

      document.name = "xyz";

      const { body: replaced } = await container.item(document.id).replace(document);
      assert.deepEqual(replaced.name, "xyz", "replaced document should be valid");

      options = {
        a_im: "Incremental feed",
        accessCondition: {
          type: "IfNoneMatch",
          condition: headers.etag
        }
      };
      const { result: docs } = await container.items.readAll(options).toArray();
      assert.equal(docs.length, 1, "initial number of documents should be equal 1");
      assert.equal(docs[0].name, "xyz", "fetched document should have 'name: xyz'");
      assert.equal(docs[0].id, document.id, "fetched document should be valid");
    });
  });

  describe("Newly created documents should be fetched incrementally", async function() {
    let container: Container;

    // create container and one document
    before(async function() {
      container = await getTestContainer("Newly updated documents should be fetched incrementally");
      await container.items.create({ id: "doc1" });
    });

    after(async function() {
      await container.delete();
    });

    it("should fetch new documents only", async function() {
      let options: FeedOptions = { a_im: "Incremental feed" };
      let query = container.items.readAll(options);

      let { result, headers } = await query.current();
      assert(headers.etag, "listDocuments response should have etag header");

      const { body: document } = await container.items.create({
        id: "doc2",
        prop: 1
      });

      options = {
        a_im: "Incremental feed",
        accessCondition: {
          type: "IfNoneMatch",
          condition: headers.etag
        }
      };
      query = await container.items.readAll(options);
      ({ result, headers } = await query.current());

      assert.notDeepEqual(result, document, "actual should not match with expected value.");
      delete result._lsn;
      assert.deepEqual(result, document, "actual value doesn't match with expected value.");

      options.accessCondition.condition = headers.etag;

      const { result: results } = await container.items.readAll(options).toArray();
      assert.equal(results.length, 0, "should be nothing new");

      await container.items.create({ id: "doc3" });
      await container.items.create({ id: "doc4" });
      const { result: docs } = await container.items.readAll(options).toArray();
      assert.equal(docs.length, 2, "there should be 2 results");
    });
  });
});

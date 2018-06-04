import * as assert from "assert";
import { Base, CosmosClient, Range } from "../../";
import { FeedOptions } from "../../documentclient";
import testConfig from "./../common/_testConfig";
import { TestHelpers } from "./../common/TestHelpers";

const host = testConfig.host;
const masterKey = testConfig.masterKey;

describe("NodeJS Incremental Feed Tests using 'a_im' and 'IfNoneMatch' options", function () {
    const client = new CosmosClient(host, { masterKey });
    let db: any;

    // delete all databases and create sample database
    before(async function () {
        await TestHelpers.removeAllDatabases(host, masterKey);
        const { result: createdDB } = await client.createDatabase({ id: "sample database" });
        db = createdDB;
    });

    const isNameBased = false;

    const createCollection = async function (): Promise<any> { // any === collection
        const collectionDefinition = {
            id: "sample collection",
        };
        const dbLink = TestHelpers.getDatabaseLink(false, db);
        return client.createCollection(dbLink, collectionDefinition);
    };

    describe("Newly updated documents should be fetched incremetally", function () {
        let collection: any;

        // create collection and two documents
        before(async function () {
            const { result: coll } = await createCollection();
            collection = coll;
            const collLink = TestHelpers.getCollectionLink(isNameBased, db, collection);
            const { result: doc1 } = await client.createDocument(collLink, { id: "doc1" });
            const { result: doc2 } = await client.createDocument(collLink, { id: "doc2" });
        });

        after(async function () {
            await client.deleteCollection(TestHelpers.getCollectionLink(isNameBased, db, collection));
        });

        it("should fetch updated documents only", async function () {
            try {
                let options: FeedOptions = { a_im: "Incremental feed" };
                const query = client.readDocuments(TestHelpers.getCollectionLink(isNameBased, db, collection), options);

                const { result: document, headers } = await query.current();
                assert(headers.etag, "listDocuments response should have etag header");

                const { result: results } = await query.toArray();
                assert.equal(results.length, 2, "initial number of documents should be equal 2");

                const documentLink = TestHelpers.getDocumentLink(isNameBased, db, collection, document);

                document.name = "xyz";
                const { result: replaced } = await client.replaceDocument(documentLink, document);
                assert.deepEqual(replaced.name, "xyz", "replaced document should be valid");

                options = {
                    a_im: "Incremental feed",
                    accessCondition: {
                        type: "IfNoneMatch",
                        condition: headers.etag,
                    },
                };
                const collLink = TestHelpers.getCollectionLink(isNameBased, db, collection);
                const { result: docs } = await client.readDocuments(collLink, options).toArray();
                assert.equal(docs.length, 1, "initial number of documents should be equal 1");
                assert.equal(docs[0].name, "xyz", "fetched document should have 'name: xyz'");
                assert.equal(docs[0].id, document.id, "fetched document should be valid");
            } catch (err) {
                throw err;
            }
        });
    });

    describe("Newly created documents should be fetched incrementally", async function () {
        let collection: any;

        // create collection and one document
        before(async function () {
            const { result: coll } = await createCollection();
            collection = coll;
            const collLink = TestHelpers.getCollectionLink(isNameBased, db, collection);
            const { result: doc1 } = await client.createDocument(collLink, { id: "doc1" });
        });

        after(async function () {
            await client.deleteCollection(TestHelpers.getCollectionLink(isNameBased, db, collection));
        });

        it("should fetch new documents only", async function () {
            let options: FeedOptions = { a_im: "Incremental feed" };
            const collLink = TestHelpers.getCollectionLink(isNameBased, db, collection);
            let query = client.readDocuments(collLink, options);

            let {result, headers} = await query.current();
            assert(headers.etag, "listDocuments response should have etag header");

            const {result: document} = await client.createDocument(collLink, { id: "doc2", prop: 1 });

            options = {
                a_im: "Incremental feed",
                accessCondition: {
                    type: "IfNoneMatch",
                    condition: headers.etag,
                },
            };
            query = await client.readDocuments(collLink, options);
            ({result, headers} = await query.current());

            assert.notDeepEqual(result, document, "actual should not match with expected value.");
            delete result._lsn;
            assert.deepEqual(result, document, "actual value doesn't match with expected value.");

            options.accessCondition.condition = headers.etag;

            const {result: results} = await client.readDocuments(collLink, options).toArray();
            assert.equal(results.length, 0, "should be nothing new");

            await client.createDocument(collLink, { id: "doc3" });
            await client.createDocument(collLink, { id: "doc4" });
            const {result: docs} = await client.readDocuments(collLink, options).toArray();
            assert.equal(docs.length, 2, "there should be 2 results");
        });
    });
});

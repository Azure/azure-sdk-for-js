import * as assert from "assert";
import * as Stream from "stream";
import {
    AzureDocuments, Base, Constants, CosmosClient,
    DocumentBase, HashPartitionResolver, Range,
    RangePartitionResolver, Response, RetryOptions,
} from "../../";
import testConfig from "./../common/_testConfig";
import { TestHelpers } from "./../common/TestHelpers";

// Used for sproc
declare var getContext: any;
// declare var body: (input?: any) => void; // TODO: remove this if it's not necessary

// TODO: should fix long lines
// tslint:disable:max-line-length

const host = testConfig.host;
const masterKey = testConfig.masterKey;

describe("NodeJS CRUD Tests", function () {
    this.timeout(process.env.MOCHA_TIMEOUT || 10000);
    // remove all databases from the endpoint before each test
    beforeEach(async function () {
        this.timeout(10000);
        try {
            await TestHelpers.removeAllDatabases(host, masterKey);
        } catch (err) {
            throw err;
        }
    });
    describe("Validate sproc CRUD", function () {
        const sprocCRUDTest = async function (isNameBased: boolean, isUpsertTest: boolean) {
            try {
                const client = new CosmosClient(host, { masterKey });

                // create database
                const { result: db } = await client.createDatabase({ id: "sample database" });
                // create collection
                const { result: collection } = await client.createCollection(
                    TestHelpers.getDatabaseLink(isNameBased, db), { id: "sample collection" });

                // read sprocs
                const { result: sprocs } = await client.readStoredProcedures(
                    TestHelpers.getCollectionLink(isNameBased, db, collection)).toArray();
                assert.equal(sprocs.constructor, Array, "Value should be an array");

                // create a sproc
                const beforeCreateSprocsCount = sprocs.length;
                const sprocDefinition: any = {
                    id: "sample sproc",
                    body() { const x = 10; },
                };
                const { result: sproc } = await TestHelpers.createOrUpsertStoredProcedure(
                    TestHelpers.getCollectionLink(isNameBased, db, collection),
                    sprocDefinition, undefined, client, isUpsertTest);
                for (const property in sprocDefinition) {
                    if (property !== "serverScript") {
                        assert.equal(sproc[property], sprocDefinition[property], "property " + property + " should match");
                    } else {
                        assert.equal(sproc.body, "function () { const x = 10; }");
                    }
                }

                // read sprocs after creation
                const { result: sprocsAfterCreation } = await client.readStoredProcedures(
                    TestHelpers.getCollectionLink(isNameBased, db, collection)).toArray();
                assert.equal(sprocsAfterCreation.length, beforeCreateSprocsCount + 1, "create should increase the number of sprocs");

                // query sprocs
                const querySpec = {
                    query: "SELECT * FROM root r",
                };
                const { result: queriedSprocs } = await client.queryStoredProcedures(
                    TestHelpers.getCollectionLink(isNameBased, db, collection), querySpec).toArray();
                assert(queriedSprocs.length > 0, "number of sprocs for the query should be > 0");

                // replace sproc
                sproc.body = function () { const x = 20; };
                const { result: replacedSproc } = await TestHelpers.replaceOrUpsertStoredProcedure(
                    TestHelpers.getCollectionLink(isNameBased, db, collection),
                    TestHelpers.getStoredProcedureLink(isNameBased, db, collection, sproc),
                    sproc, undefined, client, isUpsertTest);
                for (const property in sprocDefinition) {
                    if (property !== "serverScript") {
                        assert.equal(replacedSproc[property], sproc[property], "property " + property + " should match");
                    } else {
                        assert.equal(replacedSproc.body, "function () { const x = 20; }");
                    }
                }

                // read sproc
                const { result: sprocAfterReplace } = await client.readStoredProcedure(
                    TestHelpers.getStoredProcedureLink(isNameBased, db, collection, replacedSproc));
                assert.equal(replacedSproc.id, sprocAfterReplace.id);

                // delete sproc
                const { result: res } = await client.deleteStoredProcedure(
                    TestHelpers.getStoredProcedureLink(isNameBased, db, collection, replacedSproc));

                // read sprocs after deletion
                try {
                    const { result: badsproc } = await client.readStoredProcedure(
                        TestHelpers.getStoredProcedureLink(isNameBased, db, collection, replacedSproc));
                    assert.fail("Must fail to read sproc after deletion");
                } catch (err) {
                    const notFoundErrorCode = 404;
                    assert.equal(err.code, notFoundErrorCode, "response should return error code 404");
                }
            } catch (err) {
                throw err;
            }
        };

        it("nativeApi Should do sproc CRUD operations successfully name based", async function () {
            try {
                await sprocCRUDTest(true, false);
            } catch (err) {
                throw err;
            }
        });

        it("nativeApi Should do sproc CRUD operations successfully rid based", async function () {
            try {
                await sprocCRUDTest(false, false);
            } catch (err) {
                throw err;
            }
        });

        it("nativeApi Should do sproc CRUD operations successfully name based with upsert", async function () {
            try {
                await sprocCRUDTest(true, true);
            } catch (err) {
                throw err;
            }
        });

        it("nativeApi Should do sproc CRUD operations successfully rid based with upsert", async function () {
            try {
                await sprocCRUDTest(false, true);
            } catch (err) {
                throw err;
            }
        });
    });

    describe("validate stored procedure functionality", function () {
        const storedProcedureCRUDTest = async function (isNameBased: boolean, isUpsertTest: boolean) {
            try {
                const client = new CosmosClient(host, { masterKey });

                // create database
                const { result: db } = await client.createDatabase({ id: "sample database" });
                // create collection
                const { result: collection } = await client.createCollection(
                    TestHelpers.getDatabaseLink(isNameBased, db), { id: "sample collection" });
                // tslint:disable:no-var-keyword
                // tslint:disable:prefer-const
                // tslint:disable:curly
                // tslint:disable:no-string-throw
                // tslint:disable:object-literal-shorthand
                const sproc1 = {

                    id: "storedProcedure1",
                    body: function () {
                        for (var i = 0; i < 1000; i++) {
                            const item = getContext().getResponse().getBody();
                            if (i > 0 && item !== i - 1) throw "body mismatch";
                            getContext().getResponse().setBody(i);
                        }
                    },
                };

                const sproc2 = {
                    id: "storedProcedure2",
                    body: function () {
                        for (var i = 0; i < 10; i++) getContext().getResponse().appendValue("Body", i);
                    },
                };

                const sproc3 = {
                    id: "storedProcedure3",
                    // TODO: I put any in here, but not sure how this will work...
                    body: function (input: any) {
                        getContext().getResponse().setBody("a" + input.temp);
                    },
                };

                // tslint:enable:no-var-keyword
                // tslint:enable:prefer-const
                // tslint:enable:curly
                // tslint:enable:no-string-throw
                // tslint:enable:object-literal-shorthand

                const { result: retrievedSproc } = await TestHelpers.createOrUpsertStoredProcedure(
                    TestHelpers.getCollectionLink(isNameBased, db, collection), sproc1, undefined, client, isUpsertTest);
                const { result: result } = await client.executeStoredProcedure(
                    TestHelpers.getStoredProcedureLink(isNameBased, db, collection, retrievedSproc));
                assert.equal(result, 999);

                const { result: retrievedSproc2 } = await TestHelpers.createOrUpsertStoredProcedure(
                    TestHelpers.getCollectionLink(isNameBased, db, collection), sproc2, undefined, client, isUpsertTest);
                const { result: result2 } = await client.executeStoredProcedure(
                    TestHelpers.getStoredProcedureLink(isNameBased, db, collection, retrievedSproc2));
                assert.equal(result2, 123456789);

                const { result: retrievedSproc3 } = await TestHelpers.createOrUpsertStoredProcedure(
                    TestHelpers.getCollectionLink(isNameBased, db, collection), sproc3, undefined, client, isUpsertTest);
                const { result: result3 } = await client.executeStoredProcedure(
                    TestHelpers.getStoredProcedureLink(isNameBased, db, collection, retrievedSproc3), [{ temp: "so" }]);
                assert.equal(result3, "aso");
            } catch (err) {
                throw err;
            }
        };

        const executeStoredProcedureWithPartitionKey = async function (isNameBased: boolean) {
            try {
                const client = new CosmosClient(host, { masterKey });
                const { result: db } = await client.createDatabase({ id: "sample database" });
                // create collection
                const partitionKey = "key";

                const collectionDefinition = {
                    id: "coll1",
                    partitionKey: { paths: ["/" + partitionKey], kind: DocumentBase.PartitionKind.Hash },
                };

                const { result: collection } = await client.createCollection(
                    TestHelpers.getDatabaseLink(isNameBased, db), collectionDefinition, { offerThroughput: 12000 });
                // tslint:disable:no-var-keyword
                // tslint:disable:prefer-const
                // tslint:disable:curly
                // tslint:disable:no-string-throw
                // tslint:disable:no-shadowed-variable
                // tslint:disable:object-literal-shorthand
                const querySproc = {
                    id: "querySproc",
                    body: function () {
                        var context = getContext();
                        var collection = context.getCollection();
                        var response = context.getResponse();

                        // query for players
                        var query = "SELECT r.id, r.key, r.prop FROM r";
                        var accept = collection.queryDocuments(collection.getSelfLink(), query, {}, function (err: any, documents: any, responseOptions: any) {
                            if (err) throw new Error("Error" + err.message);
                            response.setBody(documents);
                        });

                        if (!accept) throw "Unable to read player details, abort ";
                    },
                };
                // tslint:enable:no-var-keyword
                // tslint:enable:prefer-const
                // tslint:enable:curly
                // tslint:enable:no-string-throw
                // tslint:enable:no-shadowed-variable
                // tslint:enable:object-literal-shorthand

                const documents = [
                    { id: "document1" },
                    { id: "document2", key: null, prop: 1 },
                    { id: "document3", key: false, prop: 1 },
                    { id: "document4", key: true, prop: 1 },
                    { id: "document5", key: 1, prop: 1 },
                    { id: "document6", key: "A", prop: 1 },
                ];

                const returnedDocuments = await TestHelpers.bulkInsertDocuments(client, isNameBased, db, collection, documents);
                const { result: sproc } = await client.createStoredProcedure(
                    TestHelpers.getCollectionLink(isNameBased, db, collection), querySproc);
                const { result: result } = await client.executeStoredProcedure(
                    TestHelpers.getStoredProcedureLink(isNameBased, db, collection, sproc), [], { partitionKey: null });
                assert(result !== undefined);
                assert.equal(result.length, 1);
                assert.equal(JSON.stringify(result[0]), JSON.stringify(documents[1]));
                const { result: result2 } = await client.executeStoredProcedure(
                    TestHelpers.getStoredProcedureLink(isNameBased, db, collection, sproc), null, { partitionKey: 1 });
                assert(result2 !== undefined);
                assert.equal(result2.length, 1);
                assert.equal(JSON.stringify(result2[0]), JSON.stringify(documents[4]));
            } catch (err) {
                throw err;
            }
        };

        it("nativeApi Should do stored procedure operations successfully name based", async function () {
            try {
                await storedProcedureCRUDTest(true, false);
            } catch (err) {
                throw err;
            }
        });

        it("nativeApi Should do stored procedure operations successfully rid based", async function () {
            try {
                await storedProcedureCRUDTest(false, false);
            } catch (err) {
                throw err;
            }
        });

        it("nativeApi Should do stored procedure operations successfully name based with upsert", async function () {
            try {
                await storedProcedureCRUDTest(true, true);
            } catch (err) {
                throw err;
            }
        });

        it("nativeApi Should do stored procedure operations successfully rid based with upsert", async function () {
            try {
                await storedProcedureCRUDTest(false, true);
            } catch (err) {
                throw err;
            }
        });

        it("nativeApi Should execute stored procedure with partition key successfully name based", async function () {
            try {
                await executeStoredProcedureWithPartitionKey(true);
            } catch (err) {
                throw err;
            }
        });

        it("nativeApi Should execute stored procedure with partition key successfully rid based", async function () {
            try {
                await executeStoredProcedureWithPartitionKey(false);
            } catch (err) {
                throw err;
            }
        });

        it("nativeApi Should enable/disable script logging while executing stored procedure", async function () {
            try {
                const client = new CosmosClient(host, { masterKey });
                const { result: db } = await client.createDatabase({ id: "sample database" });
                // create collection
                const collectionDefinition = { id: "sample collection" };

                const { result: collection } = await client.createCollection(
                    TestHelpers.getDatabaseLink(true, db), collectionDefinition);
                // tslint:disable:no-var-keyword
                // tslint:disable:prefer-const
                // tslint:disable:curly
                // tslint:disable:no-string-throw
                // tslint:disable:no-shadowed-variable
                // tslint:disable:one-line
                // tslint:disable:object-literal-shorthand
                const sproc1 = {
                    id: "storedProcedure",
                    body: function () {
                        const mytext = "x";
                        const myval = 1;
                        try {
                            console.log("The value of %s is %s.", mytext, myval);
                            getContext().getResponse().setBody("Success!");
                        }
                        catch (err) {
                            getContext().getResponse().setBody("inline err: [" + err.number + "] " + err);
                        }
                    },
                };

                // tslint:enable:no-var-keyword
                // tslint:enable:prefer-const
                // tslint:enable:curly
                // tslint:enable:no-string-throw
                // tslint:enable:no-shadowed-variable
                // tslint:enable:one-line
                // tslint:enable:object-literal-shorthand

                const { result: retrievedSproc } = await client.createStoredProcedure(
                    TestHelpers.getCollectionLink(true, db, collection), sproc1);
                const { result: result1, headers: headers1 } = await client.executeStoredProcedure(
                    TestHelpers.getStoredProcedureLink(true, db, collection, retrievedSproc));
                assert.equal(result1, "Success!");
                assert.equal(headers1[Constants.HttpHeaders.ScriptLogResults], undefined);

                let requestOptions = { enableScriptLogging: true };
                const { result: result2, headers: headers2 } = await client.executeStoredProcedure(
                    TestHelpers.getStoredProcedureLink(true, db, collection, retrievedSproc), undefined, requestOptions);
                assert.equal(result2, "Success!");
                assert.equal(headers2[Constants.HttpHeaders.ScriptLogResults], encodeURIComponent("The value of x is 1."));

                requestOptions = { enableScriptLogging: false };
                const { result: result3, headers: headers3 } = await client.executeStoredProcedure(
                    TestHelpers.getStoredProcedureLink(true, db, collection, retrievedSproc), undefined, requestOptions);
                assert.equal(result3, "Success!");
                assert.equal(headers3[Constants.HttpHeaders.ScriptLogResults], undefined);

            } catch (err) {
                throw err;
            }
        });
    });
});

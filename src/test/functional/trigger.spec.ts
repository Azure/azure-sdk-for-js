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

    describe("Validate Trigger CRUD", function () {
        const triggerCRUDTest = async function (isNameBased: boolean, isUpsertTest: boolean) {
            try {
                const client = new CosmosClient(host, { masterKey });

                // create database
                const { result: db } = await client.createDatabase({ id: "sample database" });
                // create collection
                const { result: collection } = await client.createCollection(
                    TestHelpers.getDatabaseLink(isNameBased, db), { id: "sample collection" });

                // read triggers
                const { result: triggers } = await client.readTriggers(
                    TestHelpers.getCollectionLink(isNameBased, db, collection)).toArray();
                assert.equal(triggers.constructor, Array, "Value should be an array");

                // create a trigger
                const beforeCreateTriggersCount = triggers.length;
                // tslint:disable:no-var-keyword
                // tslint:disable:prefer-const
                const triggerDefinition: any = {
                    id: "sample trigger",
                    serverScript() { var x = 10; },
                    triggerType: DocumentBase.TriggerType.Pre,
                    triggerOperation: DocumentBase.TriggerOperation.All,
                };
                // tslint:enable:no-var-keyword
                // tslint:enable:prefer-const

                const { result: trigger } = await TestHelpers.createOrUpsertTrigger(
                    TestHelpers.getCollectionLink(isNameBased, db, collection), triggerDefinition, undefined, client, isUpsertTest);

                for (const property in triggerDefinition) {
                    if (property !== "serverScript") {
                        assert.equal(trigger[property], triggerDefinition[property], "property " + property + " should match");
                    } else {
                        assert.equal(trigger.body, "serverScript() { var x = 10; }");
                    }
                }

                // read triggers after creation
                const { result: triggersAfterCreation } = await client.readTriggers(
                    TestHelpers.getCollectionLink(isNameBased, db, collection)).toArray();
                assert.equal(triggersAfterCreation.length, beforeCreateTriggersCount + 1, "create should increase the number of triggers");

                // query triggers
                const querySpec = {
                    query: "SELECT * FROM root r WHERE r.id=@id",
                    parameters: [
                        {
                            name: "@id",
                            value: triggerDefinition.id,
                        },
                    ],
                };
                const { result: results } = await client.queryTriggers(
                    TestHelpers.getCollectionLink(isNameBased, db, collection), querySpec).toArray();
                assert(results.length > 0, "number of results for the query should be > 0");

                // replace trigger
                trigger.body = function () { const x = 20; };
                const { result: replacedTrigger } = await TestHelpers.replaceOrUpsertTrigger(
                    TestHelpers.getCollectionLink(isNameBased, db, collection),
                    TestHelpers.getTriggerLink(isNameBased, db, collection, trigger),
                    trigger, undefined, client, isUpsertTest);
                for (const property in triggerDefinition) {
                    if (property !== "serverScript") {
                        assert.equal(replacedTrigger[property], trigger[property], "property " + property + " should match");
                    } else {
                        assert.equal(replacedTrigger.body, "function () { const x = 20; }");
                    }
                }

                // read trigger
                const { result: triggerAfterReplace } = await client.readTrigger(
                    TestHelpers.getTriggerLink(isNameBased, db, collection, replacedTrigger));
                assert.equal(replacedTrigger.id, triggerAfterReplace.id);

                // delete trigger
                const { result: res } = await client.deleteTrigger(
                    TestHelpers.getTriggerLink(isNameBased, db, collection, replacedTrigger));

                // read triggers after deletion
                try {
                    const { result: badtrigger } = await client.readTrigger(
                        TestHelpers.getTriggerLink(isNameBased, db, collection, replacedTrigger));
                    assert.fail("Must fail to read after deletion");
                } catch (err) {
                    const notFoundErrorCode = 404;
                    assert.equal(err.code, notFoundErrorCode, "response should return error code 404");
                }
            } catch (err) {
                throw err;
            }
        };

        it("nativeApi Should do trigger CRUD operations successfully name based", async function () {
            try {
                await triggerCRUDTest(true, false);
            } catch (err) {
                throw err;
            }
        });

        it("nativeApi Should do trigger CRUD operations successfully rid based", async function () {
            try {
                await triggerCRUDTest(false, false);
            } catch (err) {
                throw err;
            }
        });

        it("nativeApi Should do trigger CRUD operations successfully name based with upsert", async function () {
            try {
                await triggerCRUDTest(true, true);
            } catch (err) {
                throw err;
            }
        });

        it("nativeApi Should do trigger CRUD operations successfully rid based with upsert", async function () {
            try {
                await triggerCRUDTest(false, true);
            } catch (err) {
                throw err;
            }
        });
    });

    describe("validate trigger functionality", function () {
        const triggers: any = [
            {
                id: "t1",
                // tslint:disable:no-var-keyword
                // tslint:disable:prefer-const
                // tslint:disable:curly
                // tslint:disable:no-string-throw
                // tslint:disable:object-literal-shorthand
                body: function () {
                    var item = getContext().getRequest().getBody();
                    item.id = item.id.toUpperCase() + "t1";
                    getContext().getRequest().setBody(item);
                },
                triggerType: DocumentBase.TriggerType.Pre,
                triggerOperation: DocumentBase.TriggerOperation.All,
            },
            {
                id: "t2",
                body: "function() { }", // trigger already stringified
                triggerType: DocumentBase.TriggerType.Pre,
                triggerOperation: DocumentBase.TriggerOperation.All,
            },
            {
                id: "t3",
                body: function () {
                    const item = getContext().getRequest().getBody();
                    item.id = item.id.toLowerCase() + "t3";
                    getContext().getRequest().setBody(item);
                },
                triggerType: DocumentBase.TriggerType.Pre,
                triggerOperation: DocumentBase.TriggerOperation.All,
            },
            {
                id: "response1",
                body: function () {
                    const prebody = getContext().getRequest().getBody();
                    if (prebody.id !== "TESTING POST TRIGGERt1") throw "name mismatch";
                    const postbody = getContext().getResponse().getBody();
                    if (postbody.id !== "TESTING POST TRIGGERt1") throw "name mismatch";
                },
                triggerType: DocumentBase.TriggerType.Post,
                triggerOperation: DocumentBase.TriggerOperation.All,
            },
            {
                id: "triggerOpType",
                body: "function() { }",
                triggerType: DocumentBase.TriggerType.Post,
                triggerOperation: DocumentBase.TriggerOperation.Delete,
            },
        ];
        // tslint:enable:no-var-keyword
        // tslint:enable:prefer-const
        // tslint:enable:curly
        // tslint:enable:no-string-throw
        // tslint:enable:object-literal-shorthand

        const createTriggers = async function (client: CosmosClient, collection: any, isUpsertTest: boolean) {
            try {
                for (const trigger of triggers) {
                    const { result: createdTrigger } = await TestHelpers.createOrUpsertTrigger(collection._self, trigger, undefined, client, isUpsertTest);
                    for (const property in trigger) {
                        if (trigger.hasOwnProperty(property)) {
                            assert.equal(createdTrigger[property], trigger[property], "property " + property + " should match");
                        }
                    }
                }
            } catch (err) {
                throw err;
            }
        };

        const triggerCRUDTest = async function (isNameBased: boolean, isUpsertTest: boolean) {
            try {
                const client = new CosmosClient(host, { masterKey });

                // create database
                const { result: db } = await client.createDatabase({ id: "sample database" });
                // create collection
                const { result: collection } = await client.createCollection(
                    TestHelpers.getDatabaseLink(isNameBased, db), { id: "sample collection" });
                // create triggers
                await createTriggers(client, collection, isUpsertTest);
                // create document
                const { result: createdTriggers } = await client.readTriggers(
                    TestHelpers.getCollectionLink(isNameBased, db, collection)).toArray();
                const { result: document } = await TestHelpers.createOrUpsertDocument(
                    TestHelpers.getCollectionLink(isNameBased, db, collection), { id: "doc1", key: "value" }, { preTriggerInclude: "t1" }, client, isUpsertTest);
                assert.equal(document.id, "DOC1t1", "name should be capitalized");
                const { result: document2 } = await TestHelpers.createOrUpsertDocument(
                    TestHelpers.getCollectionLink(isNameBased, db, collection), { id: "doc2", key2: "value2" }, { preTriggerInclude: "t2" }, client, isUpsertTest);
                assert.equal(document2.id, "doc2", "name shouldn't change");
                const { result: document3 } = await TestHelpers.createOrUpsertDocument(
                    TestHelpers.getCollectionLink(isNameBased, db, collection), { id: "Doc3", prop: "empty" }, { preTriggerInclude: "t3" }, client, isUpsertTest);
                assert.equal(document3.id, "doc3t3");
                const { result: document4 } = await TestHelpers.createOrUpsertDocument(
                    TestHelpers.getCollectionLink(isNameBased, db, collection), { id: "testing post trigger" }, { postTriggerInclude: "response1", preTriggerInclude: "t1" }, client, isUpsertTest);
                assert.equal(document4.id, "TESTING POST TRIGGERt1");
                const { result: document5, headers } = await TestHelpers.createOrUpsertDocument(
                    TestHelpers.getCollectionLink(isNameBased, db, collection), { id: "responseheaders" }, { preTriggerInclude: "t1" }, client, isUpsertTest);
                assert.equal(document5.id, "RESPONSEHEADERSt1");
                try {
                    const { result: document6 } = await TestHelpers.createOrUpsertDocument(
                        TestHelpers.getCollectionLink(isNameBased, db, collection), { id: "Docoptype" }, { postTriggerInclude: "triggerOpType" }, client, isUpsertTest);
                    assert.fail("Must fail");
                } catch (err) {
                    assert.equal(err.code, 400, "Must throw when using a DELETE trigger on a CREATE operation");
                }
            } catch (err) {
                throw err;
            }
        };

        it("nativeApi Should do trigger operations successfully name based", async function () {
            try {
                await triggerCRUDTest(true, false);
            } catch (err) {
                throw err;
            }
        });

        it("nativeApi Should do trigger operations successfully rid based", async function () {
            try {
                await triggerCRUDTest(false, false);
            } catch (err) {
                throw err;
            }
        });

        it("nativeApi Should do trigger operations successfully name based", async function () {
            try {
                await triggerCRUDTest(true, true);
            } catch (err) {
                throw err;
            }
        });

        it("nativeApi Should do trigger operations successfully rid based", async function () {
            try {
                await triggerCRUDTest(false, true);
            } catch (err) {
                throw err;
            }
        });
    });
});

import * as assert from "assert";
import { CosmosClient, UriFactory } from "../../";
import testConfig from "./../common/_testConfig";
import { TestHelpers } from "./../common/TestHelpers";

const host = testConfig.host;
const masterKey = testConfig.masterKey;

describe("URI Factory Tests", function () {

    const executeExceptionThrowingFunction = function (func: () => void) {
        let isThrown = false;
        try {
            func();
        } catch (err) {
            isThrown = true;
        }
        assert(isThrown, "function did not throw an exception");
    };

    describe("Create Database URI", function () {
        const createDatabaseUriTest = function (dbId: string, expectedUri: string) {
            assert.equal(UriFactory.createDatabaseUri(dbId), expectedUri, "error invalid database URI");
        };

        it("Normal database Id", function () {
            createDatabaseUriTest("database1", "dbs/database1");
        });

        it("Empty database Id", function () {
            executeExceptionThrowingFunction(function () {
                createDatabaseUriTest("", "exception");
            });
        });

        it("Database Id with illegal chars", function () {
            executeExceptionThrowingFunction(function () {
                createDatabaseUriTest("db?1", "exception");
            });
        });
    });

    describe("Create Collection URI", function () {
        const createCollectionUriTest = function (dbId: string, collId: string, expectedUri: string) {
            assert.equal(UriFactory.createDocumentCollectionUri(dbId, collId), expectedUri);
        };

        it("Normal database & collection IDs", function () {
            createCollectionUriTest("db1", "col1", "dbs/db1/colls/col1");
        });

        it("Empty collection Id", function () {
            executeExceptionThrowingFunction(function () {
                createCollectionUriTest("db1", "", "must throw exception");
            });
        });

        it("Collection Id with illegal chars", function () {
            executeExceptionThrowingFunction(function () {
                createCollectionUriTest("db1", "coll?", "exception");
            });
        });
    });

    describe("Create User URI", function () {
        const createUserUriTest = function (dbId: string, userId: string, expectedUri: string) {
            assert.equal(UriFactory.createUserUri(dbId, userId), expectedUri);
        };

        it("Noramal Database Id & User Id", function () {
            createUserUriTest("db1", "user1", "dbs/db1/users/user1");
        });

        it("Empty user Id", function () {
            executeExceptionThrowingFunction(function () {
                createUserUriTest("db1", null, "exception");
            });
        });

        it("User Id with illegal chars", function () {
            executeExceptionThrowingFunction(function () {
                createUserUriTest("db1", "user\\1", "exception");
            });
        });

    });

    describe("Create Document URI", function () {
        const createDocumentUriTest = function (dbId: string, collId: string, docId: string, expectedUri: string) {
            assert.equal(UriFactory.createDocumentUri(dbId, collId, docId), expectedUri);
        };

        it("Normal database Id, collection Id and, document Id", function () {
            createDocumentUriTest("db1", "coll1", "doc1", "dbs/db1/colls/coll1/docs/doc1");
        });

        it("Empty document Id", function () {
            executeExceptionThrowingFunction(function () {
                createDocumentUriTest("db1", "coll1", undefined, "exception");
            });
        });

        it("Document Id with illegal chars", function () {
            executeExceptionThrowingFunction(function () {
                createDocumentUriTest("db1", "coll1", "?doc1", "exception");
            });
        });
    });

    describe("Create Permission URI", function () {
        const createPermissionUriTest = function (dbId: string, userId: string, permId: string, expectedUri: string) {
            assert.equal(UriFactory.createPermissionUri(dbId, userId, permId), expectedUri);
        };

        it("Normal database Id, user Id and, permission Id", function () {
            createPermissionUriTest("db1", "user1", "perm1", "dbs/db1/users/user1/permissions/perm1");
        });

        it("Empty permission Id", function () {
            executeExceptionThrowingFunction(function () {
                createPermissionUriTest("db1", "user1", "   ", "exception");
            });
        });

        it("Permission Id with illegal chars", function () {
            executeExceptionThrowingFunction(function () {
                createPermissionUriTest("db1", "user1", "perm/1", "exception");
            });
        });
    });

    describe("Create StoredProcedure URI", function () {
        const createStoredProcedureUriTest =
            function (dbId: string, collId: string, sprocId: string, expectedUri: string) {
                assert.equal(UriFactory.createStoredProcedureUri(dbId, collId, sprocId), expectedUri);
            };

        it("Normal database Id, collection Id and, storedProcedure Id", function () {
            createStoredProcedureUriTest("db1", "col1", "sproc1", "dbs/db1/colls/col1/sprocs/sproc1");
        });

        it("Empty storedProcedure Id", function () {
            executeExceptionThrowingFunction(function () {
                createStoredProcedureUriTest("db1", "col1", "", "exception");
            });
        });

        it("StoredProcedure Id with illegal chars", function () {
            executeExceptionThrowingFunction(function () {
                createStoredProcedureUriTest("db1", "col1", "\sproc 1", "exception");
            });
        });
    });

    describe("Create Trigger URI", function () {
        const createTriggerUriTest = function (dbId: string, collId: string, trgId: string, expectedUri: string) {
            assert.equal(UriFactory.createTriggerUri(dbId, collId, trgId), expectedUri);
        };

        it("Normal database Id, collection Id and, trigger Id", function () {
            createTriggerUriTest("db1", "col1", "trig1", "dbs/db1/colls/col1/triggers/trig1");
        });

        it("Empty trigger Id", function () {
            executeExceptionThrowingFunction(function () {
                createTriggerUriTest("db1", "col1", null, "exception");
            });
        });

        it("trigger Id with illegals chars", function () {
            executeExceptionThrowingFunction(function () {
                createTriggerUriTest("db1", "col1", "tr?iger", "exception");
            });
        });
    });

    describe("Create User-Defined-Function URI", function () {
        const createUserDefinedFunctionUriTest =
            function (dbId: string, collId: string, udfId: string, expectedUri: string) {
                assert.equal(UriFactory.createUserDefinedFunctionUri(dbId, collId, udfId), expectedUri);
            };

        it("Normal database Id, collection Id and, UDF Id", function () {
            createUserDefinedFunctionUriTest("db1", "col1", "udf1", "dbs/db1/colls/col1/udfs/udf1");
        });

        it("Empty UDF Id", function () {
            executeExceptionThrowingFunction(function () {
                createUserDefinedFunctionUriTest("db1", "col1", undefined, "exception");
            });
        });

        it("UDF Id with illegal chars", function () {
            executeExceptionThrowingFunction(function () {
                createUserDefinedFunctionUriTest("db1", "col1", "u/df1/", "exception");
            });
        });
    });

    describe("Create Conflict URI", function () {
        const createConflictUriTest = function (dbId: string, collId: string, confId: string, expectedUri: string) {
            assert.equal(UriFactory.createConflictUri(dbId, collId, confId), expectedUri);
        };

        it("Normal database Id, collection Id and, conflict Id", function () {
            createConflictUriTest("db1", "col1", "conf1", "dbs/db1/colls/col1/conflicts/conf1");
        });

        it("Empty conflict Id", function () {
            executeExceptionThrowingFunction(function () {
                createConflictUriTest("db1", "col1", "    ", "exception");
            });
        });

        it("Conflict Id with illegal chars", function () {
            executeExceptionThrowingFunction(function () {
                createConflictUriTest("db1", "col1", "\\conf\\1", "exception");
            });
        });
    });

    describe("Create Attachment URI", function () {
        const createAttachmentUriTest =
            function (dbId: string, collId: string, docId: string, atchId: string, expectedUri: string) {
                assert.equal(UriFactory.createAttachmentUri(dbId, collId, docId, atchId), expectedUri);
            };

        it("Normal database Id, collection Id and, document Id, attachmentId", function () {
            createAttachmentUriTest("db1", "coll1", "doc1", "atch1", "dbs/db1/colls/coll1/docs/doc1/attachments/atch1");
        });

        it("Empty attachment Id", function () {
            executeExceptionThrowingFunction(function () {
                createAttachmentUriTest("db1", "coll1", "doc1", null, "exception");
            });
        });

        it("Attachment Id with illegal chars", function () {
            executeExceptionThrowingFunction(function () {
                createAttachmentUriTest("db1", "coll1", "d   ?oc1", "atch?#1", "exception");
            });
        });
    });

    describe("Create PartitionKeyRanges URI", function () {
        const createPartitionKeyRangesUriTest = function (dbId: string, collId: string, expectedUir: string) {
            assert.equal(UriFactory.createPartitionKeyRangesUri(dbId, collId), expectedUir);
        };

        it("Normal database & collection IDs", function () {
            createPartitionKeyRangesUriTest("db1", "col1", "dbs/db1/colls/col1/pkranges");
        });
    });

    describe("Use uriFactory in integration with other methods", function () {
        const testDatabaseId = "uriFactoryTestDb";

        const client = new CosmosClient(host, { masterKey });

        const createDocumentUsingUriFactory =
            async function (databaseId: string, collectionId: string, documentId: string) {
                const { result: database } = await client.createDatabase({ id: databaseId });
                assert.equal(database.id, databaseId, "invalid database Id");

                const databaseUri = UriFactory.createDatabaseUri(databaseId);
                const collectionBody = {
                    id: collectionId,
                    indexingPolicy: { indexingMode: "Lazy" }, // Modes : Lazy, Consistent
                };
                const { result: collection } = await client.createCollection(databaseUri, collectionBody);
                assert.equal(collection.id, collectionBody.id, "invalid collection Id");

                const collectionUri = UriFactory.createDocumentCollectionUri(databaseId, collectionId);
                const documentBody = {
                    id: documentId,
                    context: "something to consume space",
                };
                const { result: document } = await client.createDocument(collectionUri, documentBody);
                assert.equal(document.id, documentId, "invalid document Id");
            };

        afterEach(async function () { await TestHelpers.removeAllDatabases(host, masterKey); });
        beforeEach(async function () { await TestHelpers.removeAllDatabases(host, masterKey); });

        it("check uriFactory generates valid URIs when resource Ids contain unicode", async function () {
            await createDocumentUsingUriFactory(testDatabaseId, "डेटाबेस پایگاه داده 数据库", "doc1");
        });
    });
});

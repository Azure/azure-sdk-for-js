import * as assert from "assert";
import * as sinon from "sinon";
import { Base, Constants, CosmosClient, IHeaders } from "../../";
import { ConsistencyLevel } from "../../documents";
import testConfig from "./../common/_testConfig";
import { TestHelpers } from "./../common/TestHelpers";

const host = testConfig.host;
const masterKey = testConfig.masterKey;

// TODO: there is alot of "any" types for tokens here

describe("Session Token", function () {
    this.timeout(10000);
    const client = new CosmosClient(host, { masterKey }, null, ConsistencyLevel.Session);
    const databaseId = "sessionTestDB";
    const collectionId = "sessionTestColl";
    const collectionLink = "dbs/" + databaseId + "/colls/" + collectionId;

    const databaseBody = { id: databaseId };
    const collectionDefinition = { id: collectionId, partitionKey: { paths: ["/id"], kind: "Hash" } };
    const collectionOptions = { offerThroughput: 10100 };

    const getSpy = sinon.spy(client, "get");
    const postSpy = sinon.spy(client, "post");
    const putSpy = sinon.spy(client, "put");
    const deleteSpy = sinon.spy(client, "delete");

    const getToken = function (tokens: any) {
        const newToken: any = {};
        for (const coll in tokens) {
            if (tokens.hasOwnProperty(coll)) {
                for (const k in tokens[coll]) {
                    if (tokens[coll].hasOwnProperty(k)) {
                        newToken[k] = tokens[coll][k];
                    }
                }
                return newToken;
            }
        }
    };

    const getIndex = function (tokens: any, index1?: any) {
        const keys = Object.keys(tokens);
        if (typeof index1 === "undefined") {
            return keys[0];
        } else {
            return keys[1];
        }
    };

    afterEach(async function () { await TestHelpers.removeAllDatabases(host, masterKey); });
    beforeEach(async function () { await TestHelpers.removeAllDatabases(host, masterKey); });

    it("validate session tokens for sequence of opearations", async function () {
        let index1;
        let index2;

        const { result: database } = await client.createDatabase(databaseBody);

        const { result: createdCollection } =
            await client.createCollection(database._self, collectionDefinition, collectionOptions as any);
        assert.equal(postSpy.lastCall.args[3][Constants.HttpHeaders.SessionToken], undefined);
        // TODO: testing implementation detail by looking at collectionResourceIdToSesssionTokens
        assert.deepEqual(client.sessionContainer.collectionResourceIdToSessionTokens, {});

        const { result: document1 } = await client.createDocument(collectionLink, { id: "1" });
        assert.equal(postSpy.lastCall.args[3][Constants.HttpHeaders.SessionToken], undefined);

        let tokens = getToken(client.sessionContainer.collectionResourceIdToSessionTokens);
        index1 = getIndex(tokens);
        assert.notEqual(tokens[index1], undefined);
        let firstPartitionLSN = tokens[index1];

        const { result: document2 } = await client.createDocument(collectionLink, { id: "2" });
        assert.equal(postSpy.lastCall.args[3][Constants.HttpHeaders.SessionToken],
            client.sessionContainer.getCombinedSessionToken(tokens));

        tokens = getToken(client.sessionContainer.collectionResourceIdToSessionTokens);
        index2 = getIndex(tokens, index1);
        assert.equal(tokens[index1], firstPartitionLSN);
        assert.notEqual(tokens[index2], undefined);
        let secondPartitionLSN = tokens[index2];

        const { result: document12 } = await client.readDocument(document1._self, { partitionKey: "1" });
        assert.equal(getSpy.lastCall.args[2][Constants.HttpHeaders.SessionToken],
            client.sessionContainer.getCombinedSessionToken(tokens));
        tokens = getToken(client.sessionContainer.collectionResourceIdToSessionTokens);
        assert.equal(tokens[index1], firstPartitionLSN);
        assert.equal(tokens[index2], secondPartitionLSN);

        const { result: document13 } =
            await client.upsertDocument(createdCollection._self,
                { id: "1", operation: "upsert" }, { partitionKey: "1" });
        assert.equal(postSpy.lastCall.args[3][Constants.HttpHeaders.SessionToken],
            client.sessionContainer.getCombinedSessionToken(tokens));
        tokens = getToken(client.sessionContainer.collectionResourceIdToSessionTokens);
        assert.equal(tokens[index1], (Number(firstPartitionLSN) + 1).toString());
        assert.equal(tokens[index2], secondPartitionLSN);
        firstPartitionLSN = tokens[index1];

        const { result: document22 } = await client.deleteDocument(document2._self, { partitionKey: "2" });
        assert.equal(deleteSpy.lastCall.args[2][Constants.HttpHeaders.SessionToken],
            client.sessionContainer.getCombinedSessionToken(tokens));
        tokens = getToken(client.sessionContainer.collectionResourceIdToSessionTokens);
        assert.equal(tokens[index1], firstPartitionLSN);
        assert.equal(tokens[index2], (Number(secondPartitionLSN) + 1).toString());
        secondPartitionLSN = tokens[index2];

        const { result: document14 } =
            await client.replaceDocument(document13._self, { id: "1", operation: "replace" }, { partitionKey: "1" });
        assert.equal(putSpy.lastCall.args[3][Constants.HttpHeaders.SessionToken],
            client.sessionContainer.getCombinedSessionToken(tokens));
        tokens = getToken(client.sessionContainer.collectionResourceIdToSessionTokens);
        assert.equal(tokens[index1], (Number(firstPartitionLSN) + 1).toString());
        assert.equal(tokens[index2], secondPartitionLSN);
        firstPartitionLSN = tokens[index1];

        const query = "SELECT * from " + collectionId;
        const queryOptions = { partitionKey: "1" };
        const queryIterator = client.queryDocuments(collectionLink, query, queryOptions);

        const { result } = await queryIterator.toArray();
        assert.equal(postSpy.lastCall.args[3][Constants.HttpHeaders.SessionToken],
            client.sessionContainer.getCombinedSessionToken(tokens));
        tokens = getToken(client.sessionContainer.collectionResourceIdToSessionTokens);
        assert.equal(tokens[index1], firstPartitionLSN);
        assert.equal(tokens[index2], secondPartitionLSN);

        const { result: result2 } = await client.deleteCollection(createdCollection._self);
        assert.equal(deleteSpy.lastCall.args[2][Constants.HttpHeaders.SessionToken],
            client.sessionContainer.getCombinedSessionToken(tokens));
        assert.deepEqual(client.sessionContainer.collectionResourceIdToSessionTokens, {});

        getSpy.restore();
        postSpy.restore();
        deleteSpy.restore();
        putSpy.restore();
    });

    it("validate 'lsn not caught up' error for higher lsn and clearing session token", async function () {
        try {
            const { result: database } = await client.createDatabase(databaseBody);

            const increaseLSN = function (oldTokens: any) {
                for (const coll in oldTokens) {
                    if (oldTokens.hasOwnProperty(coll)) {
                        for (const token in oldTokens[coll]) {
                            if (oldTokens[coll].hasOwnProperty(token)) {
                                const newVal = (Number(oldTokens[coll][token]) + 2000).toString();
                                return token + ":" + newVal;
                            }
                        }
                    }
                }
            };

            const { result: createCollection } =
                await client.createCollection(database._self, collectionDefinition, collectionOptions);
            const { result: document1 } = await client.createDocument(collectionLink, { id: "1" });
            const callbackSpy = sinon.spy(function (pat: string, reqHeaders: IHeaders) {
                const oldTokens = client.sessionContainer.collectionResourceIdToSessionTokens;
                reqHeaders[Constants.HttpHeaders.SessionToken] = increaseLSN(oldTokens);
            });
            const applySessionTokenStub = sinon.stub(client, "applySessionToken").callsFake(callbackSpy);
            try {
                const { result: document11 } =
                    await client.readDocument(collectionLink + "/docs/1", { partitionKey: "1" });
                assert.fail("readDocument must throw");
            } catch (err) {
                assert.equal(err.substatus, 1002, "Substatus should indicate the LSN didn't catchup.");
                assert.equal(callbackSpy.callCount, 1);
                assert.equal(Base._trimSlashes(callbackSpy.lastCall.args[0]), collectionLink + "/docs/1");
                applySessionTokenStub.restore();
            }
            const { result: document12 } = await client.readDocument(collectionLink + "/docs/1", { partitionKey: "1" });
        } catch (err) {
            throw err;
        }
    });

    // tslint:disable-next-line:max-line-length
    it("validate session container update on 'Not found' with 'undefined' status code for non master resource", async function () {
        const client2 = new CosmosClient(host, { masterKey }, null, ConsistencyLevel.Session);
        const { result: database } = await client.createDatabase(databaseBody);

        const { result: createdCollection } =
            await client.createCollection(database._self, collectionDefinition, collectionOptions);

        const { result: createdDocument } = await client.createDocument(createdCollection._self, { id: "1" });
        const requestOptions = { partitionKey: "1" };

        const { result: document2 } = await client2.deleteDocument(createdDocument._self, requestOptions);
        const setSessionTokenSpy = sinon.spy(client.sessionContainer, "setSessionToken");

        try {
            const { result: readDocument } = await client.readDocument(createdDocument._self, requestOptions);
            assert.fail("Must throw");
        } catch (err) {
            assert.equal(err.code, 404, "expecting 404 (Not found)");
            assert.equal(err.substatus, undefined, "expecting substatus code to be undefined");
            assert.equal(setSessionTokenSpy.callCount, 1, "unexpected number of calls to sesSessionToken");
            setSessionTokenSpy.restore();
        }
    });

    it("validate client should not have session token of a collection created by another client", async function () {
        const client2 = new CosmosClient(host, { masterKey }, null, ConsistencyLevel.Session);

        const { result: database } = await client.createDatabase(databaseBody);
        const { result: createdCollection } =
            await client.createCollection(database._self, collectionDefinition, collectionOptions);
        const { result: collection } = await client.readCollection(createdCollection._self);
        const { result: deletedCollection } = await client2.deleteCollection(createdCollection._self);

        const { result: createdCollection2 } =
            await client2.createCollection(database._self, collectionDefinition, collectionOptions);

        const { result: collection2 } = await client2.readCollection(createdCollection2._self);
        assert.equal(client.getSessionToken(collection2._self), "");
        assert.notEqual(client2.getSessionToken(collection2._self), "");
    });
});

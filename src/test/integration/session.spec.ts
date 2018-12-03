import assert from "assert";
import * as sinon from "sinon";
import { Constants, CosmosClient, IHeaders } from "../..";
import { ClientContext } from "../../ClientContext";
import { Helper } from "../../common";
import { ConsistencyLevel, PartitionKind } from "../../documents";
import { RequestHandler } from "../../request";
import { SessionContainer } from "../../session/sessionContainer";
import { VectorSessionToken } from "../../session/VectorSessionToken";
import { endpoint, masterKey } from "../common/_testConfig";
import { getTestDatabase, removeAllDatabases } from "../common/TestHelpers";

// TODO: there is alot of "any" types for tokens here
// TODO: there is alot of leaky document client stuff here that will make removing document client hard

const client = new CosmosClient({
  endpoint,
  auth: { masterKey },
  consistencyLevel: ConsistencyLevel.Session
});

function getCollection2TokenMap(sessionContainer: SessionContainer): Map<string, Map<string, VectorSessionToken>> {
  return (sessionContainer as any).collectionResourceIdToSessionTokens;
}

describe("Session Token", function() {
  this.timeout(process.env.MOCHA_TIMEOUT || 20000);

  const containerId = "sessionTestColl";

  const containerDefinition = {
    id: containerId,
    partitionKey: { paths: ["/id"], kind: PartitionKind.Hash }
  };
  const containerOptions = { offerThroughput: 25100 };

  const clientContext: ClientContext = (client as any).clientContext;
  const requestHandler: RequestHandler = (clientContext as any).requestHandler;
  const sessionContainer: SessionContainer = (clientContext as any).sessionContainer;

  const getSpy = sinon.spy(requestHandler, "get");
  const postSpy = sinon.spy(requestHandler, "post");
  const putSpy = sinon.spy(requestHandler, "put");
  const deleteSpy = sinon.spy(requestHandler, "delete");

  beforeEach(async function() {
    await removeAllDatabases();
  });

  it("validate session tokens for sequence of operations", async function() {
    const database = await getTestDatabase("session test", client);

    const { body: createdContainerDef } = await database.containers.create(containerDefinition, containerOptions);
    const container = database.container(createdContainerDef.id);
    assert.equal(postSpy.lastCall.args[3][Constants.HttpHeaders.SessionToken], undefined);
    // TODO: testing implementation detail by looking at containerResourceIdToSesssionTokens
    let collRid2SessionToken: Map<string, Map<string, VectorSessionToken>> = (sessionContainer as any)
      .collectionResourceIdToSessionTokens;
    assert.equal(collRid2SessionToken.size, 0, "Should have no tokens in container");

    const { body: document1 } = await container.items.create({ id: "1" });
    assert.equal(
      postSpy.lastCall.args[3][Constants.HttpHeaders.SessionToken],
      undefined,
      "Initial create token should be qual"
    );

    collRid2SessionToken = getCollection2TokenMap(sessionContainer);
    assert.equal(collRid2SessionToken.size, 1, "Should only have one container in the sessioncontainer");
    const containerRid = collRid2SessionToken.keys().next().value;
    let containerTokens = collRid2SessionToken.get(containerRid);
    assert.equal(containerTokens.size, 1, "Should only have one partition in container");
    const firstPartition = containerTokens.keys().next().value;
    let firstPartitionToken = containerTokens.get(firstPartition);
    assert.notEqual(firstPartitionToken, "Should have a token for first partition");

    const token = sessionContainer.get({
      isNameBased: true,
      operationType: "create",
      resourceAddress: container.url,
      resourceType: "docs",
      resourceId: "2"
    });
    const { body: document2 } = await container.items.create({ id: "2" });
    assert.equal(postSpy.lastCall.args[3][Constants.HttpHeaders.SessionToken], token, "create token should be equal");

    collRid2SessionToken = getCollection2TokenMap(sessionContainer);
    assert.equal(collRid2SessionToken.size, 1, "Should only have one container in the sessioncontainer");
    containerTokens = collRid2SessionToken.get(containerRid);
    assert.equal(containerTokens.size, 2, "Should have two partitions in container");
    const keysIterator = containerTokens.keys();
    keysIterator.next(); // partition 1
    const secondPartition = keysIterator.next().value;
    assert.equal(
      containerTokens.get(firstPartition).toString(),
      firstPartitionToken.toString(),
      "First partition token should still match after create"
    );
    let secondPartitionToken = containerTokens.get(secondPartition);
    assert(secondPartitionToken, "Should have a LSN for second partition");

    const readToken = sessionContainer.get({
      isNameBased: true,
      operationType: "read",
      resourceAddress: container.url,
      resourceType: "docs",
      resourceId: "1"
    });
    await container.item(document1.id, "1").read();
    assert.equal(getSpy.lastCall.args[2][Constants.HttpHeaders.SessionToken], readToken, "read token should be equal");

    collRid2SessionToken = getCollection2TokenMap(sessionContainer);
    assert.equal(collRid2SessionToken.size, 1, "Should only have one container in the sessioncontainer");
    containerTokens = collRid2SessionToken.get(containerRid);
    assert.equal(containerTokens.size, 2, "Should have two partitions in container");
    assert.equal(
      containerTokens.get(firstPartition).toString(),
      firstPartitionToken.toString(),
      "First partition token should still match after read"
    );
    assert.equal(
      containerTokens.get(secondPartition).toString(),
      secondPartitionToken.toString(),
      "Second partition token should still match after read"
    );

    const upsertToken = sessionContainer.get({
      isNameBased: true,
      operationType: "upsert",
      resourceAddress: container.url,
      resourceType: "docs",
      resourceId: "1"
    });
    const { body: document13 } = await container.items.upsert({ id: "1", operation: "upsert" }, { partitionKey: "1" });
    assert.equal(
      postSpy.lastCall.args[3][Constants.HttpHeaders.SessionToken],
      upsertToken,
      "upsert token should be equal"
    );

    collRid2SessionToken = getCollection2TokenMap(sessionContainer);
    assert.equal(collRid2SessionToken.size, 1, "Should only have one container in the sessioncontainer");
    containerTokens = collRid2SessionToken.get(containerRid);
    assert.equal(containerTokens.size, 2, "Should have two partitions in container");
    // TODO: should validate the LSN only increased by 1...
    assert.notEqual(
      containerTokens.get(firstPartition).toString(),
      firstPartitionToken.toString(),
      "First partition token should no longer match after upsert"
    );
    assert.equal(
      containerTokens.get(secondPartition).toString(),
      secondPartitionToken.toString(),
      "Second partition token should still match after upsert"
    );
    firstPartitionToken = containerTokens.get(firstPartition);

    const deleteToken = sessionContainer.get({
      isNameBased: true,
      operationType: "delete",
      resourceAddress: container.url,
      resourceType: "docs",
      resourceId: "2"
    });
    await container.item(document2.id, "2").delete();
    assert.equal(
      deleteSpy.lastCall.args[2][Constants.HttpHeaders.SessionToken],
      deleteToken,
      "delete token should be equal"
    );

    collRid2SessionToken = getCollection2TokenMap(sessionContainer);
    assert.equal(collRid2SessionToken.size, 1, "Should only have one container in the sessioncontainer");
    containerTokens = collRid2SessionToken.get(containerRid);
    assert.equal(containerTokens.size, 2, "Should have two partitions in container");
    assert.equal(
      containerTokens.get(firstPartition).toString(),
      firstPartitionToken.toString(),
      "First partition token should still match delete"
    );
    // TODO: should validate the LSN only increased by 1...
    assert.notEqual(
      containerTokens.get(secondPartition).toString(),
      secondPartitionToken.toString(),
      "Second partition token should not match after delete"
    );
    secondPartitionToken = containerTokens.get(secondPartition);

    const replaceToken = sessionContainer.get({
      isNameBased: true,
      operationType: "replace",
      resourceAddress: container.url,
      resourceType: "docs",
      resourceId: "1"
    });
    await container.item(document13.id).replace({ id: "1", operation: "replace" }, { partitionKey: "1" });
    assert.equal(
      putSpy.lastCall.args[3][Constants.HttpHeaders.SessionToken],
      replaceToken,
      "replace token should be equal"
    );
    collRid2SessionToken = getCollection2TokenMap(sessionContainer);
    assert.equal(collRid2SessionToken.size, 1, "Should only have one container in the sessioncontainer");
    containerTokens = collRid2SessionToken.get(containerRid);
    assert.equal(containerTokens.size, 2, "Should have two partitions in container");
    // TODO: should validate the LSN only increased by 1...
    assert.notEqual(
      containerTokens.get(firstPartition).toString(),
      firstPartitionToken.toString(),
      "First partition token should no longer match after replace"
    );
    assert.equal(
      containerTokens.get(secondPartition).toString(),
      secondPartitionToken.toString(),
      "Second partition token should still match after replace"
    );
    firstPartitionToken = containerTokens.get(firstPartition);

    const query = "SELECT * from " + containerId;
    const queryOptions = { partitionKey: "1" };
    const queryIterator = container.items.query(query, queryOptions);

    const queryToken = sessionContainer.get({
      isNameBased: true,
      operationType: "query",
      resourceAddress: container.url,
      resourceType: "docs"
    });
    await queryIterator.toArray();
    assert.equal(postSpy.lastCall.args[3][Constants.HttpHeaders.SessionToken], queryToken);

    collRid2SessionToken = getCollection2TokenMap(sessionContainer);
    assert.equal(collRid2SessionToken.size, 1, "Should only have one container in the sessioncontainer");
    containerTokens = collRid2SessionToken.get(containerRid);
    assert.equal(containerTokens.size, 2, "Should have two partitions in container");
    assert.equal(
      containerTokens.get(firstPartition).toString(),
      firstPartitionToken.toString(),
      "First partition token should still match after query"
    );
    assert.equal(
      containerTokens.get(secondPartition).toString(),
      secondPartitionToken.toString(),
      "Second partition token should still match after query"
    );

    const deleteContainerToken = sessionContainer.get({
      isNameBased: true,
      operationType: "delete",
      resourceAddress: container.url,
      resourceType: "container",
      resourceId: container.id
    });
    await container.delete();
    assert.equal(
      deleteSpy.lastCall.args[2][Constants.HttpHeaders.SessionToken],
      deleteContainerToken,
      "delete container token should match"
    );
    collRid2SessionToken = getCollection2TokenMap(sessionContainer);
    assert.equal(collRid2SessionToken.size, 0, "collRid map should be empty on container delete");

    getSpy.restore();
    postSpy.restore();
    deleteSpy.restore();
    putSpy.restore();
  });

  it("validate 'lsn not caught up' error for higher lsn and clearing session token", async function() {
    this.retries(2);
    const database = await getTestDatabase("session test", client);

    const containerLink = "dbs/" + database.id + "/colls/" + containerId;
    const increaseLSN = function(oldTokens: Map<string, Map<string, VectorSessionToken>>) {
      for (const [coll, tokens] of oldTokens.entries()) {
        for (const [pk, token] of tokens.entries()) {
          (token as any).globalLsn = (token as any).globalLsn + 200;
          const newToken = token.merge(token);
          return `0:${newToken.toString()}`;
        }
      }
      throw new Error("No valid token found to increase");
    };

    await database.containers.create(containerDefinition, containerOptions);
    const container = database.container(containerDefinition.id);
    const { headers } = await container.items.create({ id: "1" });
    const callbackSpy = sinon.spy(function(path: string, reqHeaders: IHeaders) {
      const oldTokens = getCollection2TokenMap(sessionContainer);
      reqHeaders[Constants.HttpHeaders.SessionToken] = increaseLSN(oldTokens);
    });
    const applySessionTokenStub = sinon.stub(clientContext as any, "applySessionToken").callsFake(callbackSpy);
    try {
      await container.item("1").read({ partitionKey: "1" });
      assert.fail("readDocument must throw");
    } catch (err) {
      assert.equal(err.substatus, 1002, "Substatus should indicate the LSN didn't catchup.");
      assert.equal(callbackSpy.callCount, 1);
      assert.equal(Helper.trimSlashes(callbackSpy.lastCall.args[0]), containerLink + "/docs/1");
    } finally {
      applySessionTokenStub.restore();
    }
    await container.item("1").read({ partitionKey: "1" });
  });

  // TODO: chrande - looks like this might be broken by going name based?
  // We never had a name based version of this test. Looks like we fail to set the session token
  // because OwnerId is missing on the header. This only happens for name based.
  it.skip("client should not have session token of a container created by another client", async function() {
    const client2 = new CosmosClient({
      endpoint,
      auth: { masterKey },
      consistencyLevel: ConsistencyLevel.Session
    });
    const database = await getTestDatabase("clientshouldnothaveanotherclienttoken");
    await database.containers.create(containerDefinition, containerOptions);
    const container = database.container(containerDefinition.id);
    await container.read();
    await client2
      .database(database.id)
      .container(containerDefinition.id)
      .delete();
    await client2.database(database.id).containers.create(containerDefinition, containerOptions);
    await client2
      .database(database.id)
      .container(containerDefinition.id)
      .read();
    assert.equal((client as any).clientContext.getSessionToken(container.url), ""); // TODO: _self
    assert.notEqual((client2 as any).clientContext.getSessionToken(container.url), "");
  });

  it("validate session container update on 'Not found' with 'undefined' status code for non master resource", async function() {
    const client2 = new CosmosClient({
      endpoint,
      auth: { masterKey },
      consistencyLevel: ConsistencyLevel.Session
    });

    const db = await getTestDatabase("session test", client);

    const { body: createdContainerDef } = await db.containers.create(containerDefinition, containerOptions);
    const createdContainer = db.container(createdContainerDef.id);

    const { body: createdDocument } = await createdContainer.items.create({
      id: "1"
    });
    const requestOptions = { partitionKey: "1" };
    await client2
      .database(db.id)
      .container(createdContainerDef.id)
      .item(createdDocument.id)
      .delete(requestOptions);
    const setSessionTokenSpy = sinon.spy(sessionContainer, "set");

    try {
      await createdContainer.item(createdDocument.id).read(requestOptions);
      assert.fail("Must throw");
    } catch (err) {
      assert.equal(err.code, 404, "expecting 404 (Not found)");
      assert.equal(err.substatus, undefined, "expecting substatus code to be undefined");
      assert.equal(setSessionTokenSpy.callCount, 1, "unexpected number of calls to sesSessionToken");
    } finally {
      setSessionTokenSpy.restore();
    }
  });
});

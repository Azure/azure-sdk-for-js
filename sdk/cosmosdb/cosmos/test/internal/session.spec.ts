// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import assert from "assert";
import * as sinon from "sinon";
import { ClientContext } from "../../src";
import { OperationType, ResourceType, trimSlashes } from "../../src/common";
import { ConsistencyLevel } from "../../src";
import { Constants, CosmosClient } from "../../src";
import { SessionContainer } from "../../src/session/sessionContainer";
import { VectorSessionToken } from "../../src/session/VectorSessionToken";
import { endpoint, masterKey } from "../public/common/_testConfig";
import { getTestDatabase, removeAllDatabases } from "../public/common/TestHelpers";
import * as RequestHandler from "../../src/request/RequestHandler";
import { RequestContext } from "../../src";

// TODO: there is alot of "any" types for tokens here
// TODO: there is alot of leaky document client stuff here that will make removing document client hard

const client = new CosmosClient({
  endpoint,
  key: masterKey,
  consistencyLevel: ConsistencyLevel.Session
});

function getCollection2TokenMap(
  sessionContainer: SessionContainer
): Map<string, Map<string, VectorSessionToken>> {
  return (sessionContainer as any).collectionResourceIdToSessionTokens;
}

describe("Session Token", /** @this */ function() {
  this.timeout(process.env.MOCHA_TIMEOUT || 20000);

  const containerId = "sessionTestColl";

  const containerDefinition = {
    id: containerId,
    partitionKey: { paths: ["/id"] }
  };
  const containerOptions = { offerThroughput: 25100 };

  const clientContext: ClientContext = (client as any).clientContext;
  const sessionContainer: SessionContainer = (clientContext as any).sessionContainer;

  const spy = sinon.spy(RequestHandler, "request");

  beforeEach(async function() {
    await removeAllDatabases();
  });

  it("validate session tokens for sequence of operations", async function() {
    const database = await getTestDatabase("session test", client);

    const { resource: createdContainerDef } = await database.containers.create(
      containerDefinition,
      containerOptions
    );
    const container = database.container(createdContainerDef.id);
    assert.equal(spy.lastCall.args[0].headers[Constants.HttpHeaders.SessionToken], undefined);
    // TODO: testing implementation detail by looking at containerResourceIdToSesssionTokens
    let collRid2SessionToken: Map<
      string,
      Map<string, VectorSessionToken>
    > = (sessionContainer as any).collectionResourceIdToSessionTokens;
    assert.equal(collRid2SessionToken.size, 0, "Should have no tokens in container");

    const { resource: document1 } = await container.items.create({ id: "1" });
    assert.equal(
      spy.lastCall.args[0].headers[Constants.HttpHeaders.SessionToken],
      undefined,
      "Initial create token should be qual"
    );

    collRid2SessionToken = getCollection2TokenMap(sessionContainer);
    assert.equal(
      collRid2SessionToken.size,
      1,
      "Should only have one container in the sessioncontainer"
    );
    const containerRid = collRid2SessionToken.keys().next().value;
    let containerTokens = collRid2SessionToken.get(containerRid);
    assert.equal(containerTokens.size, 1, "Should only have one partition in container");
    const firstPartition = containerTokens.keys().next().value;
    let firstPartitionToken = containerTokens.get(firstPartition);
    assert.notEqual(firstPartitionToken, "Should have a token for first partition");

    const token = sessionContainer.get({
      isNameBased: true,
      operationType: OperationType.Create,
      resourceAddress: container.url,
      resourceType: ResourceType.item,
      resourceId: "2"
    });
    const { resource: document2 } = await container.items.create({ id: "2" });
    assert.equal(
      spy.lastCall.args[0].headers[Constants.HttpHeaders.SessionToken],
      token,
      "create token should be equal"
    );

    collRid2SessionToken = getCollection2TokenMap(sessionContainer);
    assert.equal(
      collRid2SessionToken.size,
      1,
      "Should only have one container in the sessioncontainer"
    );
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
      operationType: OperationType.Read,
      resourceAddress: container.url,
      resourceType: ResourceType.item,
      resourceId: "1"
    });
    await container.item(document1.id, "1").read();
    assert.equal(
      spy.lastCall.args[0].headers[Constants.HttpHeaders.SessionToken],
      readToken,
      "read token should be equal"
    );

    collRid2SessionToken = getCollection2TokenMap(sessionContainer);
    assert.equal(
      collRid2SessionToken.size,
      1,
      "Should only have one container in the sessioncontainer"
    );
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
      operationType: OperationType.Upsert,
      resourceAddress: container.url,
      resourceType: ResourceType.item,
      resourceId: "1"
    });
    const { resource: document13 } = await container.items.upsert({ id: "1", operation: "upsert" });
    assert.equal(
      spy.lastCall.args[0].headers[Constants.HttpHeaders.SessionToken],
      upsertToken,
      "upsert token should be equal"
    );

    collRid2SessionToken = getCollection2TokenMap(sessionContainer);
    assert.equal(
      collRid2SessionToken.size,
      1,
      "Should only have one container in the sessioncontainer"
    );
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
      operationType: OperationType.Delete,
      resourceAddress: container.url,
      resourceType: ResourceType.item,
      resourceId: "2"
    });
    await container.item(document2.id, "2").delete();
    assert.equal(
      spy.lastCall.args[0].headers[Constants.HttpHeaders.SessionToken],
      deleteToken,
      "delete token should be equal"
    );

    collRid2SessionToken = getCollection2TokenMap(sessionContainer);
    assert.equal(
      collRid2SessionToken.size,
      1,
      "Should only have one container in the sessioncontainer"
    );
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
      operationType: OperationType.Replace,
      resourceAddress: container.url,
      resourceType: ResourceType.item,
      resourceId: "1"
    });
    await container.item(document13.id, "1").replace({ id: "1", operation: "replace" });
    assert.equal(
      spy.lastCall.args[0].headers[Constants.HttpHeaders.SessionToken],
      replaceToken,
      "replace token should be equal"
    );
    collRid2SessionToken = getCollection2TokenMap(sessionContainer);
    assert.equal(
      collRid2SessionToken.size,
      1,
      "Should only have one container in the sessioncontainer"
    );
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

    const query = `SELECT * from c WHERE c.id = "1"`;
    const queryIterator = container.items.query(query);

    const queryToken = sessionContainer.get({
      isNameBased: true,
      operationType: OperationType.Query,
      resourceAddress: container.url,
      resourceType: ResourceType.item
    });
    await queryIterator.fetchAll();
    assert.equal(spy.lastCall.args[0].headers[Constants.HttpHeaders.SessionToken], queryToken);

    collRid2SessionToken = getCollection2TokenMap(sessionContainer);
    assert.equal(
      collRid2SessionToken.size,
      1,
      "Should only have one container in the sessioncontainer"
    );
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
      operationType: OperationType.Delete,
      resourceAddress: container.url,
      resourceType: ResourceType.container,
      resourceId: container.id
    });
    await container.delete();
    assert.equal(
      spy.lastCall.args[0].headers[Constants.HttpHeaders.SessionToken],
      deleteContainerToken,
      "delete container token should match"
    );
    collRid2SessionToken = getCollection2TokenMap(sessionContainer);
    assert.equal(collRid2SessionToken.size, 0, "collRid map should be empty on container delete");

    spy.restore();
  });

  it("validate 'lsn not caught up' error for higher lsn and clearing session token", /** @this */ async function() {
    this.retries(2);
    const database = await getTestDatabase("session test", client);

    const containerLink = "dbs/" + database.id + "/colls/" + containerId;
    const increaseLSN = function(oldTokens: Map<string, Map<string, VectorSessionToken>>): string {
      for (const [, tokens] of oldTokens.entries()) {
        for (const [pk, token] of tokens.entries()) {
          (token as any).globalLsn = (token as any).globalLsn + 200;
          const newToken = token.merge(token);
          return `${pk}:${newToken.toString()}`;
        }
      }
      throw new Error("No valid token found to increase");
    };

    await database.containers.create(containerDefinition, containerOptions);
    const container = database.container(containerDefinition.id);
    await container.items.create({ id: "1" });
    const callbackSpy = sinon.spy(function(requestContext: RequestContext) {
      const oldTokens = getCollection2TokenMap(sessionContainer);
      requestContext.headers[Constants.HttpHeaders.SessionToken] = increaseLSN(oldTokens);
    });
    const applySessionTokenStub = sinon
      .stub(clientContext as any, "applySessionToken")
      .callsFake(callbackSpy as any);
    const resp = await container.item("1", "1").read();
    assert.equal(resp.resource, undefined);
    assert.equal(resp.substatus, 1002, "Substatus should indicate the LSN didn't catchup.");
    assert.equal(callbackSpy.callCount, 1);
    assert.equal(trimSlashes(callbackSpy.lastCall.args[0].path), containerLink + "/docs/1");
    applySessionTokenStub.restore();
    await container.item("1", "1").read();
  });

  // TODO: chrande - looks like this might be broken by going name based?
  // We never had a name based version of this test. Looks like we fail to set the session token
  // because OwnerId is missing on the header. This only happens for name based.
  it.skip("client should not have session token of a container created by another client", async function() {
    const client2 = new CosmosClient({
      endpoint,
      key: masterKey,
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
      key: masterKey,
      consistencyLevel: ConsistencyLevel.Session
    });

    const db = await getTestDatabase("session test", client);

    const { resource: createdContainerDef } = await db.containers.create(
      containerDefinition,
      containerOptions
    );
    const createdContainer = db.container(createdContainerDef.id);

    const { resource: createdDocument } = await createdContainer.items.create({
      id: "1"
    });
    await client2
      .database(db.id)
      .container(createdContainerDef.id)
      .item(createdDocument.id, "1")
      .delete();
    const setSessionTokenSpy = sinon.spy(sessionContainer, "set");

    const resp = await createdContainer.item(createdDocument.id, "1").read();
    assert.equal(resp.resource, undefined);
    assert.equal(resp.statusCode, 404, "expecting 404 (Not found)");
    assert.equal(resp.substatus, undefined, "expecting substatus code to be undefined");
    assert.equal(setSessionTokenSpy.callCount, 1, "unexpected number of calls to sesSessionToken");
    setSessionTokenSpy.restore();
  });
});

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import assert from "assert";
import {
  Container,
  CosmosClient,
  Database,
  DatabaseDefinition,
  RequestOptions,
  Response
} from "../../src";
import { ItemDefinition, ItemResponse, PermissionResponse, Resource, User } from "../../src/client";
import { UserResponse } from "../../src/client/User/UserResponse";
import { endpoint, masterKey } from "./_testConfig";
import { DatabaseRequest } from "../../src/client/Database/DatabaseRequest";
import { ContainerRequest } from "../../src/client/Container/ContainerRequest";

const defaultClient = new CosmosClient({ endpoint, key: masterKey });

export function addEntropy(name: string): string {
  return name + getEntropy();
}

export function getEntropy(): string {
  return `${Math.floor(Math.random() * 10000)}`;
}

export async function removeAllDatabases(client: CosmosClient = defaultClient) {
  try {
    const { resources: databases } = await client.databases.readAll().fetchAll();
    const length = databases.length;

    if (length === 0) {
      return;
    }

    await Promise.all(
      databases.map<Promise<Response<DatabaseDefinition>>>(async (database: DatabaseDefinition) =>
        client.database(database.id).delete()
      )
    );
  } catch (err) {
    // TODO: remove console logging for errors and add ts-lint flag back
    console.log("An error occured", err);
    assert.fail(err);
    throw err;
  }
}

export async function getTestDatabase(
  testName: string,
  client: CosmosClient = defaultClient,
  attrs?: Partial<DatabaseRequest>
) {
  const entropy = Math.floor(Math.random() * 10000);
  const id = `${testName.replace(" ", "").substring(0, 30)}${entropy}`;
  await client.databases.create({ id, ...attrs });
  return client.database(id);
}

export async function getTestContainer(
  testName: string,
  client: CosmosClient = defaultClient,
  containerDef?: ContainerRequest,
  options?: RequestOptions
) {
  const db = await getTestDatabase(testName, client);
  const entropy = Math.floor(Math.random() * 10000);
  const id = `${testName.replace(" ", "").substring(0, 30)}${entropy}`;
  await db.containers.create({ ...containerDef, ...{ id } }, options);
  return db.container(id);
}

export async function bulkInsertItems(
  container: Container,
  documents: any[]
): Promise<Array<ItemDefinition & Resource>> {
  return await Promise.all(
    documents.map(async (doc) => {
      const { resource: document } = await container.items.create(doc);
      return document;
    })
  );
}

export async function bulkReadItems(
  container: Container,
  documents: any[],
  partitionKeyProperty: string
) {
  return await Promise.all(
    documents.map(async (document) => {
      const partitionKey = document.hasOwnProperty(partitionKeyProperty)
        ? document[partitionKeyProperty]
        : undefined;

      // TODO: should we block or do all requests in parallel?
      const { resource: doc } = await container.item(document.id, partitionKey).read();
      assert.deepStrictEqual(doc, document);
    })
  );
}

export async function bulkReplaceItems(
  container: Container,
  documents: any[],
  partitionKeyProperty: string
): Promise<any[]> {
  return Promise.all(
    documents.map(async (document) => {
      const partitionKey = document.hasOwnProperty(partitionKeyProperty)
        ? document[partitionKeyProperty]
        : undefined;
      const { resource: doc } = await container.item(document.id, partitionKey).replace(document);
      const { _etag: _1, _ts: _2, ...expectedModifiedDocument } = document;
      const { _etag: _4, _ts: _3, ...actualModifiedDocument } = doc;
      assert.deepStrictEqual(expectedModifiedDocument, actualModifiedDocument);
      return doc;
    })
  );
}

export async function bulkDeleteItems(
  container: Container,
  documents: any[],
  partitionKeyProperty: string
): Promise<void> {
  await Promise.all(
    documents.map(async (document) => {
      const partitionKey = document.hasOwnProperty(partitionKeyProperty)
        ? document[partitionKeyProperty]
        : undefined;

      await container.item(document.id, partitionKey).delete();
    })
  );
}

export async function bulkQueryItemsWithPartitionKey(
  container: Container,
  documents: any[],
  partitionKeyPropertyName: any
): Promise<void> {
  for (const document of documents) {
    try {
      if (!document.hasOwnProperty(partitionKeyPropertyName)) {
        continue;
      }

      const querySpec = {
        query: "SELECT * FROM root r WHERE r." + partitionKeyPropertyName + "=@key",
        parameters: [
          {
            name: "@key",
            value: document[partitionKeyPropertyName]
          }
        ]
      };

      const { resources } = await container.items.query(querySpec).fetchAll();
      assert.equal(resources.length, 1, "Expected exactly 1 document");
      assert.equal(JSON.stringify(resources[0]), JSON.stringify(document));
    } catch (err) {
      throw err;
    }
  }
}

// Item
export async function createOrUpsertItem(
  container: Container,
  body: any,
  options: RequestOptions,
  isUpsertTest: boolean
): Promise<ItemResponse<any>> {
  if (isUpsertTest) {
    return container.items.upsert(body, options);
  } else {
    return container.items.create(body, options);
  }
}

export async function replaceOrUpsertItem(
  container: Container,
  body: any,
  options: RequestOptions,
  isUpsertTest: boolean
): Promise<ItemResponse<any>> {
  if (isUpsertTest) {
    return container.items.upsert(body, options);
  } else {
    return container.item(body.id, undefined).replace(body, options);
  }
}

// User
export function createOrUpsertUser(
  database: Database,
  body: any,
  options: any,
  isUpsertTest: boolean
): Promise<UserResponse> {
  if (isUpsertTest) {
    return database.users.upsert(body, options);
  } else {
    return database.users.create(body, options);
  }
}

export function createOrUpsertPermission(
  user: User,
  body: any,
  options: any,
  isUpsertTest: boolean
): Promise<PermissionResponse> {
  if (isUpsertTest) {
    return user.permissions.upsert(body, options);
  } else {
    return user.permissions.create(body, options);
  }
}

export function replaceOrUpsertPermission(
  user: User,
  body: any,
  options: any,
  isUpsertTest: boolean
): Promise<PermissionResponse> {
  if (isUpsertTest) {
    return user.permissions.upsert(body, options);
  } else {
    return user.permission(body.id).replace(body, options);
  }
}

export function generateDocuments(docSize: number) {
  const docs = [];
  for (let i = 0; i < docSize; i++) {
    const d = {
      id: i.toString(),
      name: "sample document",
      spam: "eggs" + i.toString(),
      cnt: i,
      key: "value",
      spam2: i === 3 ? "eggs" + i.toString() : i,
      spam3: `eggs${i % 3}`,
      boolVar: i % 2 === 0,
      number: 1.1 * i
    };
    docs.push(d);
  }
  return docs;
}

export async function assertThrowsAsync(test: any, error?: any) {
  try {
    await test();
  } catch (e) {
    if (!error || e instanceof error) return "everything is fine";
  }
  throw new assert.AssertionError({
    message: "Missing rejection" + (error ? " with " + error.name : "")
  });
}

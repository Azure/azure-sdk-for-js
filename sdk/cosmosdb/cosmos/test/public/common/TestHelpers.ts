// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import assert from "assert";
import {
  Container,
  CosmosClient,
  Database,
  DatabaseDefinition,
  extractPartitionKey,
  PartitionKey,
  PartitionKeyDefinition,
  PermissionDefinition,
  RequestOptions,
  Response,
  UserDefinition,
} from "../../../src";
import { ItemDefinition, ItemResponse, PermissionResponse, Resource, User } from "../../../src";
import { UserResponse } from "../../../src";
import { endpoint } from "../common/_testConfig";
import { masterKey } from "../common/_fakeTestSecrets";
import { DatabaseRequest } from "../../../src";
import { ContainerRequest } from "../../../src";

const defaultRoutingGatewayPort: string = ":8081";
const defaultComputeGatewayPort: string = ":8903";

export const defaultClient = new CosmosClient({
  endpoint,
  key: masterKey,
  connectionPolicy: { enableBackgroundEndpointRefreshing: false },
});

export const defaultComputeGatewayClient = new CosmosClient({
  endpoint: endpoint.replace(defaultRoutingGatewayPort, defaultComputeGatewayPort),
  key: masterKey,
  connectionPolicy: { enableBackgroundEndpointRefreshing: false },
});

export function addEntropy(name: string): string {
  return name + getEntropy();
}

export function getEntropy(): string {
  return `${Math.floor(Math.random() * 10000)}`;
}

export async function removeAllDatabases(client: CosmosClient = defaultClient): Promise<void> {
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
  } catch (err: any) {
    console.log("An error occured", err);
    assert.fail(err);
    throw err;
  }
}

export async function getTestDatabase(
  testName: string,
  client: CosmosClient = defaultClient,
  attrs?: Partial<DatabaseRequest>
): Promise<Database> {
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
): Promise<Container> {
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
  return Promise.all(
    documents.map(async (doc) => {
      const { resource: document } = await container.items.create(doc);
      return document;
    })
  );
}

export async function bulkReadItems(
  container: Container,
  documents: any[],
  partitionKeyDef: PartitionKeyDefinition
): Promise<void[]> {
  return Promise.all(
    documents.map(async (document) => {
      const partitionKey = extractPartitionKey(document, partitionKeyDef);

      // TODO: should we block or do all requests in parallel?
      const { resource: doc } = await container.item(document.id, partitionKey).read();
      assert.deepStrictEqual(doc, document);
    })
  );
}

export async function bulkReplaceItems(
  container: Container,
  documents: any[],
  partitionKeyDef: PartitionKeyDefinition
): Promise<any[]> {
  return Promise.all(
    documents.map(async (document) => {
      const partitionKey = extractPartitionKey(document, partitionKeyDef);
      const { resource: doc } = await container.item(document.id, partitionKey).replace(document);
      const { _etag: _1, _ts: _2, ...expectedModifiedDocument } = document; // eslint-disable-line @typescript-eslint/no-unused-vars
      const { _etag: _4, _ts: _3, ...actualModifiedDocument } = doc; // eslint-disable-line @typescript-eslint/no-unused-vars
      assert.deepStrictEqual(expectedModifiedDocument, actualModifiedDocument);
      return doc;
    })
  );
}

export async function bulkDeleteItems(
  container: Container,
  documents: any[],
  partitionKeyDef: PartitionKeyDefinition
): Promise<void> {
  await Promise.all(
    documents.map(async (document) => {
      const partitionKey = extractPartitionKey(document, partitionKeyDef);

      await container.item(document.id, partitionKey).delete();
    })
  );
}

export async function bulkQueryItemsWithPartitionKey(
  container: Container,
  documents: any[],
  query: string,
  parameterGenerator: (doc: any) => { name: string; value: any }[]
): Promise<void> {
  for (const document of documents) {
    const parameters = parameterGenerator(document);
    const shouldSkip = parameters.reduce(
      (previous, current) => previous || current["value"] === undefined,
      false
    );
    if (shouldSkip) {
      continue;
    }
    const querySpec = {
      query: query,
      parameters: parameters,
    };

    const { resources } = await container.items.query(querySpec).fetchAll();
    assert.equal(
      resources.length,
      1,
      `Expected exactly 1 document, doc: ${JSON.stringify(
        document
      )}, query: '${query}', parameters: ${JSON.stringify(parameters)}`
    );
    assert.equal(JSON.stringify(resources[0]), JSON.stringify(document));
  }
}

// Item
export async function createOrUpsertItem(
  container: Container,
  body: unknown,
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
  body: unknown,
  options: RequestOptions,
  isUpsertTest: boolean,
  partitionKey?: PartitionKey
): Promise<ItemResponse<any>> {
  if (isUpsertTest) {
    return container.items.upsert(body, options);
  } else {
    const bodyWithId = body as { id: string };
    return container.item(bodyWithId.id, partitionKey).replace(body, options);
  }
}

// User
export function createOrUpsertUser(
  database: Database,
  body: UserDefinition,
  options: RequestOptions,
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
  body: PermissionDefinition,
  options: RequestOptions,
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
  body: PermissionDefinition,
  options: RequestOptions,
  isUpsertTest: boolean
): Promise<PermissionResponse> {
  if (isUpsertTest) {
    return user.permissions.upsert(body, options);
  } else {
    return user.permission(body.id).replace(body, options);
  }
}

export function generateDocuments(docSize: number): {
  id: string;
  name: string;
  spam: string;
  cnt: number;
  key: string;
  spam2: string | number;
  spam3: string;
  boolVar: boolean;
  number: number;
}[] {
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
      number: 1.1 * i,
    };
    docs.push(d);
  }
  return docs;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function assertThrowsAsync(test: () => Promise<any>, error?: any): Promise<string> {
  try {
    await test();
  } catch (e: any) {
    if (!error || e instanceof error) return "everything is fine";
  }
  throw new assert.AssertionError({
    message: "Missing rejection" + (error ? " with " + error.name : ""),
  });
}

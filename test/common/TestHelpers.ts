import assert from "assert";
import { Container, CosmosClient, Database, DatabaseDefinition, Item, RequestOptions, Response } from "../../dist-esm";
import {
  ContainerDefinition,
  ItemDefinition,
  ItemResponse,
  PermissionResponse,
  Resource,
  TriggerResponse,
  User,
  UserDefinedFunctionResponse
} from "../../dist-esm/client";
import { StoredProcedureResponse } from "../../dist-esm/client/StoredProcedure/StoredProcedureResponse";
import { UserResponse } from "../../dist-esm/client/User/UserResponse";
import { endpoint, masterKey } from "./_testConfig";

const defaultClient = new CosmosClient({ endpoint, auth: { masterKey } });

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

    const count = 0;
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

export async function getTestDatabase(testName: string, client: CosmosClient = defaultClient) {
  const entropy = Math.floor(Math.random() * 10000);
  const id = `${testName.replace(" ", "").substring(0, 30)}${entropy}`;
  await client.databases.create({ id });
  return client.database(id);
}

export async function getTestContainer(
  testName: string,
  client: CosmosClient = defaultClient,
  containerDef?: ContainerDefinition,
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
    documents.map(async doc => {
      const { resource: document } = await container.items.create(doc);
      return document;
    })
  );
}

export async function bulkReadItems(container: Container, documents: any[], partitionKey: string) {
  return await Promise.all(
    documents.map(async document => {
      const options =
        partitionKey && document.hasOwnProperty(partitionKey)
          ? { partitionKey: document[partitionKey] }
          : { partitionKey: {} };

      // TODO: should we block or do all requests in parallel?
      const { resource: doc } = await container.item(document.id).read(options);
      assert.deepStrictEqual(doc, document);
    })
  );
}

export async function bulkReplaceItems(container: Container, documents: any[]): Promise<any[]> {
  return Promise.all(
    documents.map(async document => {
      const { resource: doc } = await container.item(document.id).replace(document);
      const { _etag: _1, _ts: _2, ...expectedModifiedDocument } = document;
      const { _etag: _4, _ts: _3, ...actualModifiedDocument } = doc;
      assert.deepStrictEqual(expectedModifiedDocument, actualModifiedDocument);
      return doc;
    })
  );
}

export async function bulkDeleteItems(container: Container, documents: any[], partitionKey: string): Promise<void> {
  await Promise.all(
    documents.map(async document => {
      const options =
        partitionKey && document.hasOwnProperty(partitionKey)
          ? { partitionKey: document[partitionKey] }
          : { partitionKey: {} };

      await container.item(document.id).delete(options);
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
    return container.item(body.id).replace(body, options);
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
export function replaceOrUpsertUser(
  database: Database,
  body: any,
  options: any,
  isUpsertTest: boolean
): Promise<UserResponse> {
  if (isUpsertTest) {
    return database.users.upsert(body, options);
  } else {
    return database.user(body.id).replace(body, options);
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

// Trigger
export function createOrUpsertTrigger(
  container: Container,
  body: any,
  options: any,
  isUpsertTest: boolean
): Promise<TriggerResponse> {
  if (isUpsertTest) {
    return container.scripts.triggers.upsert(body, options);
  } else {
    return container.scripts.triggers.create(body, options);
  }
}
export function replaceOrUpsertTrigger(
  container: Container,
  body: any,
  options: any,
  isUpsertTest: boolean
): Promise<TriggerResponse> {
  if (isUpsertTest) {
    return container.scripts.triggers.upsert(body, options);
  } else {
    return container.scripts.trigger(body.id).replace(body, options);
  }
}

// User Defined Function
export function createOrUpsertUserDefinedFunction(
  container: Container,
  body: any,
  options: any,
  isUpsertTest: boolean
): Promise<UserDefinedFunctionResponse> {
  if (isUpsertTest) {
    return container.scripts.userDefinedFunctions.upsert(body, options);
  } else {
    return container.scripts.userDefinedFunctions.create(body, options);
  }
}
export function replaceOrUpsertUserDefinedFunction(
  container: Container,
  body: any,
  options: any,
  isUpsertTest: boolean
): Promise<UserDefinedFunctionResponse> {
  if (isUpsertTest) {
    return container.scripts.userDefinedFunctions.upsert(body, options);
  } else {
    return container.scripts.userDefinedFunction(body.id).replace(body, options);
  }
}

// Stored Procedure
export function createOrUpsertStoredProcedure(
  container: Container,
  body: any,
  options: any,
  isUpsertTest: boolean
): Promise<StoredProcedureResponse> {
  if (isUpsertTest) {
    return container.scripts.storedProcedures.upsert(body, options);
  } else {
    return container.scripts.storedProcedures.create(body, options);
  }
}
export function replaceOrUpsertStoredProcedure(
  container: Container,
  body: any,
  options: any,
  isUpsertTest: boolean
): Promise<StoredProcedureResponse> {
  if (isUpsertTest) {
    return container.scripts.storedProcedures.upsert(body, options);
  } else {
    return container.scripts.storedProcedure(body.id).replace(body, options);
  }
}

import * as assert from "assert";
import { Container, CosmosClient, Database, DatabaseDefinition, Item, RequestOptions, Response } from "../../";
import { ContainerDefinition, ItemResponse, PermissionDefinition, User, UserDefinition } from "../../client";

/** @hidden */
export class TestHelpers {
  public static async removeAllDatabases(client: CosmosClient) {
    try {
      const { result: databases } = await client.databases.readAll().toArray();
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

  public static async getTestDatabase(client: CosmosClient, testName: string) {
    const entropy = Math.floor(Math.random() * 10000);
    const id = `${testName.replace(" ", "").substring(0, 30)}${entropy}`;
    await client.databases.create({ id });
    return client.database(id);
  }

  public static async getTestContainer(
    client: CosmosClient,
    testName: string,
    containerDef?: ContainerDefinition,
    options?: RequestOptions
  ) {
    const db = await TestHelpers.getTestDatabase(client, testName);
    const entropy = Math.floor(Math.random() * 10000);
    const id = `${testName.replace(" ", "").substring(0, 30)}${entropy}`;
    await db.containers.create({ ...containerDef, ...{ id } }, options);
    return db.container(id);
  }

  public static async bulkInsertItems(container: Container, documents: any[]) {
    const returnedDocuments = [];
    for (const doc of documents) {
      try {
        const { body: document } = await container.items.create(doc);
        returnedDocuments.push(document);
      } catch (err) {
        throw err;
      }
    }
    return returnedDocuments;
  }

  public static async bulkReadItems(container: Container, documents: any[], partitionKey: string) {
    for (const document of documents) {
      try {
        const options =
          partitionKey && document.hasOwnProperty(partitionKey)
            ? { partitionKey: document[partitionKey] }
            : { partitionKey: {} };

        // TODO: should we block or do all requests in parallel?
        const { body: doc } = await container.item(document.id).read(options);

        assert.equal(JSON.stringify(doc), JSON.stringify(document));
      } catch (err) {
        throw err;
      }
    }
  }

  public static async bulkReplaceItems(container: Container, documents: any[]): Promise<any[]> {
    const returnedDocuments: any[] = [];
    for (const document of documents) {
      try {
        const { body: doc } = await container.item(document.id).replace(document);
        const expectedModifiedDocument = JSON.parse(JSON.stringify(document));
        delete expectedModifiedDocument._etag;
        delete expectedModifiedDocument._ts;
        const actualModifiedDocument = JSON.parse(JSON.stringify(doc));
        delete actualModifiedDocument._etag;
        delete actualModifiedDocument._ts;
        assert.equal(JSON.stringify(actualModifiedDocument), JSON.stringify(expectedModifiedDocument));
        returnedDocuments.push(doc);
      } catch (err) {
        throw err;
      }
    }
    return returnedDocuments;
  }

  public static async bulkDeleteItems(
    container: Container,
    documents: any[],
    partitionKeyPropertyName: string
  ): Promise<void> {
    for (const document of documents) {
      try {
        const options =
          partitionKeyPropertyName && document.hasOwnProperty(partitionKeyPropertyName)
            ? { partitionKey: document[partitionKeyPropertyName] }
            : { partitionKey: {} };

        await container.item(document.id).delete(options);
      } catch (err) {
        throw err;
      }
    }
  }

  public static async bulkQueryItemsWithPartitionKey(
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

        const { result: results } = await container.items.query(querySpec).toArray();
        assert.equal(results.length, 1, "Expected exactly 1 document");
        assert.equal(JSON.stringify(results[0]), JSON.stringify(document));
      } catch (err) {
        throw err;
      }
    }
  }

  // Item
  public static async createOrUpsertItem(
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

  public static async replaceOrUpsertItem(
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
  public static createOrUpsertUser(
    database: Database,
    body: any,
    options: any,
    isUpsertTest: boolean
  ): Promise<Response<UserDefinition>> {
    if (isUpsertTest) {
      return database.users.upsert(body, options);
    } else {
      return database.users.create(body, options);
    }
  }
  public static replaceOrUpsertUser(
    database: Database,
    body: any,
    options: any,
    isUpsertTest: boolean
  ): Promise<Response<UserDefinition>> {
    if (isUpsertTest) {
      return database.users.upsert(body, options);
    } else {
      return database.user(body.id).replace(body, options);
    }
  }

  // Permission
  public static createOrUpsertPermission(
    user: User,
    body: any,
    options: any,
    isUpsertTest: boolean
  ): Promise<Response<PermissionDefinition>> {
    if (isUpsertTest) {
      return user.permissions.upsert(body, options);
    } else {
      return user.permissions.create(body, options);
    }
  }

  public static replaceOrUpsertPermission(
    user: User,
    body: any,
    options: any,
    isUpsertTest: boolean
  ): Promise<Response<PermissionDefinition>> {
    if (isUpsertTest) {
      return user.permissions.upsert(body, options);
    } else {
      return user.permission(body.id).replace(body, options);
    }
  }

  // Trigger
  public static createOrUpsertTrigger(
    container: Container,
    body: any,
    options: any,
    isUpsertTest: boolean
  ): Promise<Response<any>> {
    if (isUpsertTest) {
      return container.triggers.upsert(body, options);
    } else {
      return container.triggers.create(body, options);
    }
  }
  public static replaceOrUpsertTrigger(
    container: Container,
    body: any,
    options: any,
    isUpsertTest: boolean
  ): Promise<Response<any>> {
    if (isUpsertTest) {
      return container.triggers.upsert(body, options);
    } else {
      return container.trigger(body.id).replace(body, options);
    }
  }

  // User Defined Function
  public static createOrUpsertUserDefinedFunction(
    container: Container,
    body: any,
    options: any,
    isUpsertTest: boolean
  ): Promise<Response<any>> {
    if (isUpsertTest) {
      return container.userDefinedFunctions.upsert(body, options);
    } else {
      return container.userDefinedFunctions.create(body, options);
    }
  }
  public static replaceOrUpsertUserDefinedFunction(
    container: Container,
    body: any,
    options: any,
    isUpsertTest: boolean
  ): Promise<Response<any>> {
    if (isUpsertTest) {
      return container.userDefinedFunctions.upsert(body, options);
    } else {
      return container.userDefinedFunction(body.id).replace(body, options);
    }
  }

  // Stored Procedure
  public static createOrUpsertStoredProcedure(
    container: Container,
    body: any,
    options: any,
    isUpsertTest: boolean
  ): Promise<Response<any>> {
    if (isUpsertTest) {
      return container.storedProcedures.upsert(body, options);
    } else {
      return container.storedProcedures.create(body, options);
    }
  }
  public static replaceOrUpsertStoredProcedure(
    container: Container,
    body: any,
    options: any,
    isUpsertTest: boolean
  ): Promise<Response<any>> {
    if (isUpsertTest) {
      return container.storedProcedures.upsert(body, options);
    } else {
      return container.storedProcedure(body.id).replace(body, options);
    }
  }
}

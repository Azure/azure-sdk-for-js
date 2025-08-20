// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { TableClient, TableEntityResult, TransactionAction } from "@azure/data-tables";
import { odata } from "@azure/data-tables";
import { isLiveMode } from "../utils/injectables.js";
import { createTableClient } from "./utils/recordedClient.js";
import { isNodeLike } from "@azure/core-util";
import { describe, it, assert, beforeEach, afterAll } from "vitest";

describe.runIf(isLiveMode())("SpecialCharacters", () => {
  let client: TableClient;
  const suffix = isNodeLike ? "Node" : "Browser";
  const tableName = `SpecialCharacterTest${suffix}`;
  const specialCharacters = [
    { char: `'`, name: "single quote" },
    { char: `"`, name: "double quote" },
    { char: `{}`, name: "curly braces" },
    { char: `[]`, name: "square braces" },
    { char: `()`, name: "parenthesis braces" },
    { char: `:`, name: "colon braces" },
    { char: `@`, name: "at" },
    { char: `&`, name: "ampersand" },
    { char: `=`, name: "equals" },
    { char: `+`, name: "plus" },
    { char: `,`, name: "comma" },
    { char: `$`, name: "dollar sing" },
    { char: `-`, name: "dash" },
    { char: `_`, name: "underscore" },
    { char: `<>`, name: "gt and lt" },
    { char: `;`, name: "semi-colon" },
    { char: `~`, name: "tilde" },
    { char: `^`, name: "hat" },
    { char: `!`, name: "bang" },
    { char: `%`, name: "percentage" },
    { char: `*`, name: "star" },
  ];

  describe("Single operations", () => {
    beforeEach(async () => {
      client = await createTableClient(tableName, "TokenCredential");
    });

    specialCharacters.forEach(({ char, name }) => {
      describe(`${name} roundtrip`, () => {
        const partitionKey = `foo${char}`;
        const rowKey = `${char}bar`;
        const value = `test${char}`;

        it("should create entity with single quote in the partitionKey and rowKey", async () => {
          await client.createTable();
          // Delete the entity if it already exists.
          try {
            await client.deleteEntity(partitionKey, rowKey);
          } catch (error) {
            // Ignore error if the entity doesn't exist.
          }
          const entity = await client.createEntity({ partitionKey, rowKey, value });
          assert.isDefined(entity);
        });

        it("should upsert merge entity", async () => {
          const result = await client.upsertEntity({ partitionKey, rowKey, value }, "Merge");
          assert.isDefined(result.etag);
        });

        it("should upsert replace entity", async () => {
          const result = await client.upsertEntity({ partitionKey, rowKey, value }, "Replace");
          assert.isDefined(result.etag);
        });

        it("should update replace entity", async () => {
          const result = await client.updateEntity({ partitionKey, rowKey, value }, "Replace");
          assert.isDefined(result.etag);
        });

        it("should update merge entity", async () => {
          const result = await client.updateEntity({ partitionKey, rowKey, value }, "Merge");
          assert.isDefined(result.etag);
        });

        it("should get entity", async () => {
          const entity = await client.getEntity(partitionKey, rowKey);

          assert.equal(entity.partitionKey, partitionKey);
          assert.equal(entity.rowKey, rowKey);
          assert.equal(entity.value, value);
        });

        it("should filter entity by partition key", async () => {
          const entities = client.listEntities({
            queryOptions: { filter: odata`PartitionKey eq ${partitionKey}` },
          });

          for await (const entity of entities) {
            assert.equal(entity.partitionKey, partitionKey);
            assert.equal(entity.rowKey, rowKey);
            assert.equal(entity.value, value);
          }
        });

        it("should filter entity by row key", async () => {
          const entities = client.listEntities({
            queryOptions: { filter: odata`RowKey eq ${rowKey}` },
          });

          for await (const entity of entities) {
            assert.equal(entity.partitionKey, partitionKey);
            assert.equal(entity.rowKey, rowKey);
            assert.equal(entity.value, value);
          }
        });

        it("should delete entity", async () => {
          const result = await client.deleteEntity(partitionKey, rowKey);
          assert.ok(result);
        });
      });
    });

    afterAll(async () => {
      await client.deleteTable();
    });
  });

  describe("Batch", () => {
    beforeEach(async () => {
      client = await createTableClient(`${tableName}Batch`, "TokenCredential");
    });

    const partitionKey = `foo'`;
    it("should create entity with single quote in the partitionKey and rowKey", async () => {
      await client.createTable();
      const actions: TransactionAction[] = specialCharacters.map(({ char }) => {
        const rowKey = `${char}bar`;
        const value = `test${char}`;
        const action: TransactionAction = ["create", { partitionKey, rowKey, value }];
        return action;
      });
      const result = await client.submitTransaction(actions);
      assert.equal(result.status, 202);
    });

    it("should upsert merge entity with single quote in the partitionKey and rowKey", async () => {
      const actions: TransactionAction[] = specialCharacters.map(({ char }) => {
        const rowKey = `${char}bar`;
        const value = `test${char}`;
        const action: TransactionAction = ["upsert", { partitionKey, rowKey, value }, "Merge"];
        return action;
      });
      const result = await client.submitTransaction(actions);
      assert.equal(result.status, 202);
    });

    it("should upsert replace entity with single quote in the partitionKey and rowKey", async () => {
      const actions: TransactionAction[] = specialCharacters.map(({ char }) => {
        const rowKey = `${char}bar`;
        const value = `test${char}`;
        const action: TransactionAction = ["upsert", { partitionKey, rowKey, value }, "Replace"];
        return action;
      });
      const result = await client.submitTransaction(actions);
      assert.equal(result.status, 202);
    });

    it("should update merge entity with single quote in the partitionKey and rowKey", async () => {
      const actions: TransactionAction[] = specialCharacters.map(({ char }) => {
        const rowKey = `${char}bar`;
        const value = `test${char}`;
        const action: TransactionAction = ["update", { partitionKey, rowKey, value }, "Merge"];
        return action;
      });
      const result = await client.submitTransaction(actions);
      assert.equal(result.status, 202);
    });

    it("should update replace entity with single quote in the partitionKey and rowKey", async () => {
      const actions: TransactionAction[] = specialCharacters.map(({ char }) => {
        const rowKey = `${char}bar`;
        const value = `test${char}`;
        const action: TransactionAction = ["update", { partitionKey, rowKey, value }, "Replace"];
        return action;
      });
      const result = await client.submitTransaction(actions);
      assert.equal(result.status, 202);
    });

    it(`should filter entity by partition key`, async () => {
      const entities = client.listEntities({
        queryOptions: { filter: odata`PartitionKey eq ${partitionKey}` },
      });

      const results = [];

      for await (const entity of entities) {
        results.push(entity);
      }

      assert.lengthOf(results, 21);
    });

    specialCharacters.forEach(({ char, name }) => {
      const rowKey = `${char}bar`;
      const value = `test${char}`;
      it(`should get entity with ${name}`, async () => {
        const entity = await client.getEntity(partitionKey, rowKey);

        assert.equal(entity.partitionKey, partitionKey);
        assert.equal(entity.rowKey, rowKey);
        assert.equal(entity.value, value);
      });

      it(`should filter entity by row key with ${name}`, async () => {
        const entities = client.listEntities({
          queryOptions: { filter: odata`RowKey eq ${rowKey}` },
        });

        const results: TableEntityResult<Record<string, unknown>>[] = [];

        for await (const entity of entities) {
          results.push(entity);
          assert.equal(entity.partitionKey, partitionKey);
          assert.equal(entity.rowKey, rowKey);
          assert.equal(entity.value, value);
        }

        const hasEntity = results.some(
          (e) => e.partitionKey === partitionKey && e.rowKey === rowKey && e.value === value,
        );

        assert.isTrue(
          hasEntity,
          `Couldn't find entity with partitionKey: ${partitionKey} and rowKey: ${rowKey}`,
        );
      });
    });

    it(`should delete in batch`, async () => {
      const actions: TransactionAction[] = specialCharacters.map(({ char }) => {
        const rowKey = `${char}bar`;
        const action: TransactionAction = ["delete", { partitionKey, rowKey }];
        return action;
      });
      const result = await client.submitTransaction(actions);
      assert.equal(result.status, 202);
    });

    afterAll(async () => {
      await client.deleteTable();
    });
  });
});

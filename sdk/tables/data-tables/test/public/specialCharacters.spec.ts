import { odata, TableClient, TableEntityResult, TransactionAction } from "../../src";
import { assert } from "chai";
import { createTableClient, recordedEnvironmentSetup } from "./utils/recordedClient";
import { isNode } from "@azure/test-utils";
import { record, Recorder } from "@azure-tools/test-recorder";

describe("TableClient", () => {
  let client: TableClient;
  let recorder: Recorder;
  const suffix = isNode ? "Node" : "Browser";
  const tableName = `SpecialCharacterTest${suffix}`;
  const specialCharacters = [
    `'`,
    `"`,
    `{}`,
    `[]`,
    `()`,
    `:`,
    `@`,
    `&`,
    `=`,
    `+`,
    `,`,
    `$`,
    `-`,
    `_`,
    `<>`,
    `;`,
    `~`,
    `^`,
    `!`,
    `%`,
    `*`
  ];

  describe("Single operations", () => {
    beforeEach(function() {
      recorder = record(this, recordedEnvironmentSetup);
      client = createTableClient(tableName);
    });

    afterEach(async function() {
      await recorder.stop();
    });

    specialCharacters.forEach((testChar) => {
      describe(`${testChar} roundtrip`, () => {
        const partitionKey = `foo${testChar}`;
        const rowKey = `${testChar}bar`;
        const value = `test${testChar}`;

        it("should create entity with single quote in the partitionKey and rowKey", async () => {
          await client.createTable();
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
            queryOptions: { filter: odata`PartitionKey eq ${partitionKey}` }
          });

          for await (const entity of entities) {
            assert.equal(entity.partitionKey, partitionKey);
            assert.equal(entity.rowKey, rowKey);
            assert.equal(entity.value, value);
          }
        });

        it("should filter entity by row key", async () => {
          const entities = client.listEntities({
            queryOptions: { filter: odata`RowKey eq ${rowKey}` }
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

    after(async () => {
      await client.deleteTable();
    });
  });

  describe("Batch", () => {
    beforeEach(function() {
      recorder = record(this, recordedEnvironmentSetup);
      client = createTableClient(`${tableName}Batch`);
    });

    afterEach(async function() {
      await recorder.stop();
    });
    const partitionKey = `foo'`;
    it("should create entity with single quote in the partitionKey and rowKey", async () => {
      await client.createTable();
      const actions: TransactionAction[] = specialCharacters.map((testChar) => {
        const rowKey = `${testChar}bar`;
        const value = `test${testChar}`;
        const action: TransactionAction = ["create", { partitionKey, rowKey, value }];
        return action;
      });
      const result = await client.submitTransaction(actions);
      assert.equal(result.status, 202);
    });

    it("should upsert merge entity with single quote in the partitionKey and rowKey", async () => {
      const actions: TransactionAction[] = specialCharacters.map((testChar) => {
        const rowKey = `${testChar}bar`;
        const value = `test${testChar}`;
        const action: TransactionAction = ["upsert", { partitionKey, rowKey, value }, "Merge"];
        return action;
      });
      const result = await client.submitTransaction(actions);
      assert.equal(result.status, 202);
    });

    it("should upsert replace entity with single quote in the partitionKey and rowKey", async () => {
      const actions: TransactionAction[] = specialCharacters.map((testChar) => {
        const rowKey = `${testChar}bar`;
        const value = `test${testChar}`;
        const action: TransactionAction = ["upsert", { partitionKey, rowKey, value }, "Replace"];
        return action;
      });
      const result = await client.submitTransaction(actions);
      assert.equal(result.status, 202);
    });

    it("should update merge entity with single quote in the partitionKey and rowKey", async () => {
      const actions: TransactionAction[] = specialCharacters.map((testChar) => {
        const rowKey = `${testChar}bar`;
        const value = `test${testChar}`;
        const action: TransactionAction = ["update", { partitionKey, rowKey, value }, "Merge"];
        return action;
      });
      const result = await client.submitTransaction(actions);
      assert.equal(result.status, 202);
    });

    it("should update replace entity with single quote in the partitionKey and rowKey", async () => {
      const actions: TransactionAction[] = specialCharacters.map((testChar) => {
        const rowKey = `${testChar}bar`;
        const value = `test${testChar}`;
        const action: TransactionAction = ["update", { partitionKey, rowKey, value }, "Replace"];
        return action;
      });
      const result = await client.submitTransaction(actions);
      assert.equal(result.status, 202);
    });

    it(`should filter entity by partition key`, async () => {
      const entities = client.listEntities({
        queryOptions: { filter: odata`PartitionKey eq ${partitionKey}` }
      });

      const results = [];

      for await (const entity of entities) {
        results.push(entity);
      }

      assert.lengthOf(results, 21);
    });

    specialCharacters.forEach((testChar) => {
      const rowKey = `${testChar}bar`;
      const value = `test${testChar}`;
      it(`should get entity with ${testChar}`, async () => {
        const entity = await client.getEntity(partitionKey, rowKey);

        assert.equal(entity.partitionKey, partitionKey);
        assert.equal(entity.rowKey, rowKey);
        assert.equal(entity.value, value);
      });

      it(`should filter entity by row key with ${testChar}`, async () => {
        const entities = client.listEntities({
          queryOptions: { filter: odata`RowKey eq ${rowKey}` }
        });

        const results: TableEntityResult<Record<string, unknown>>[] = [];

        for await (const entity of entities) {
          results.push(entity);
          assert.equal(entity.partitionKey, partitionKey);
          assert.equal(entity.rowKey, rowKey);
          assert.equal(entity.value, value);
        }

        const hasEntity = results.some(
          (e) => e.partitionKey === partitionKey && e.rowKey === rowKey && e.value === value
        );

        assert.isTrue(
          hasEntity,
          `Couldn't find entity with partitionKey: ${partitionKey} and rowKey: ${rowKey}`
        );
      });
    });

    it(`should delete in batch`, async () => {
      const actions: TransactionAction[] = specialCharacters.map((testChar) => {
        const rowKey = `${testChar}bar`;
        const action: TransactionAction = ["delete", { partitionKey, rowKey }];
        return action;
      });
      const result = await client.submitTransaction(actions);
      assert.equal(result.status, 202);
    });
    after(async () => {
      await client.deleteTable();
    });
  });
});

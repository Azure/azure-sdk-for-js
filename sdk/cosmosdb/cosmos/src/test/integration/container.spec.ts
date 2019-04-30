import assert from "assert";
import { Container } from "../../client";

describe("Container", function() {
  describe("extractPartitionKey", function() {
    let partitionKeyDefinition: any; // TODO: any
    const container: Container = new Container({ database: { client: null } } as any, undefined, undefined);

    beforeEach(function() {
      partitionKeyDefinition = undefined;
    });

    describe("With undefined partitionKeyDefinition", function() {
      it("should return undefined", function() {
        const document: any = {};
        const result = container.extractPartitionKey(document, partitionKeyDefinition);
        assert.equal(result, undefined);
      });
    });

    describe("With a defined partitionKeyDefinition", function() {
      beforeEach(function() {
        partitionKeyDefinition = { paths: ["/a/b"] };
      });

      it("should return [{}] when document has no partition key value", function() {
        const document = {};
        const result = container.extractPartitionKey(document, partitionKeyDefinition);
        assert.deepEqual(result, [{}]);
      });

      it("should return [null] when document has a null partition key value", function() {
        const document: any = { a: { b: null } };
        const result = container.extractPartitionKey(document, partitionKeyDefinition);
        assert.deepEqual(result, [null]);
      });

      it("should return [{}] when document has a partially defined partition key value", function() {
        const document = { a: "some value" };
        const result = container.extractPartitionKey(document, partitionKeyDefinition);
        assert.deepEqual(result, [{}]);
      });

      it("should return [value] when document has a valid partition key value", function() {
        const document = { a: { b: "some value" } };
        const result = container.extractPartitionKey(document, partitionKeyDefinition);
        assert.deepEqual(result, ["some value"]);
      });
    });
  });
});

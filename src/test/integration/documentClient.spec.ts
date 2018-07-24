import * as assert from "assert";
import { Constants, CosmosClient, IHeaders } from "../../";
import { endpoint, masterKey } from "./../common/_testConfig";

const client = new CosmosClient({ endpoint, auth: { masterKey } });

// TODO: Should evaluate whether any of these tests are necessary. Are these really public apis?

describe("DocumentClient Tests", function() {
  describe("setIsUpsertHeader", function() {
    it("Should add is-upsert header.", function(done) {
      const headers = client.documentClient.defaultHeaders;
      assert.equal(undefined, headers[Constants.HttpHeaders.IsUpsert]);
      client.documentClient.setIsUpsertHeader(headers);
      assert.equal(true, headers[Constants.HttpHeaders.IsUpsert]);
      done();
    });

    it("Should update is-upsert header.", function(done) {
      const headers: IHeaders = {};
      headers[Constants.HttpHeaders.IsUpsert] = false;
      assert.equal(false, headers[Constants.HttpHeaders.IsUpsert]);
      client.documentClient.setIsUpsertHeader(headers);
      assert.equal(true, headers[Constants.HttpHeaders.IsUpsert]);
      done();
    });

    it("Should throw on undefined headers", function(done) {
      assert.throws(function() {
        client.documentClient.setIsUpsertHeader(undefined);
      }, /The "headers" parameter must not be null or undefined/);
      done();
    });

    it("Should throw on null headers", function(done) {
      assert.throws(function() {
        client.documentClient.setIsUpsertHeader(null);
      }, /The "headers" parameter must not be null or undefined/);
      done();
    });

    it("Should throw on invalid string headers", function(done) {
      assert.throws(
        function() {
          client.documentClient.setIsUpsertHeader("" as any);
        }, // Any type is intentional for test failure
        /The "headers" parameter must be an instance of "Object". Actual type is: "string"./
      );
      done();
    });

    it("Should throw on invalid number headers", function(done) {
      assert.throws(
        function() {
          client.documentClient.setIsUpsertHeader(0 as any);
        }, // Any type is intentional for test failure
        /The "headers" parameter must be an instance of "Object". Actual type is: "number"./
      );
      done();
    });

    it("Should throw on invalid boolean headers", function(done) {
      assert.throws(
        function() {
          client.documentClient.setIsUpsertHeader(false as any);
        }, // Any type is intentional for test failure
        /The "headers" parameter must be an instance of "Object". Actual type is: "boolean"./
      );
      done();
    });
  });

  describe("validateOptionsAndCallback Unit Tests", function() {
    it("no parameters", function(done) {
      const result = client.documentClient.validateOptionsAndCallback(undefined, undefined);

      assert.notEqual(null, result.options);
      assert.equal("object", typeof result.options);

      assert.equal(undefined, result.callback);
      done();
    });

    it("options", function(done) {
      const result = client.documentClient.validateOptionsAndCallback({}, undefined);

      assert.notEqual(null, result.options);
      assert.equal("object", typeof result.options);

      assert.equal(undefined, result.callback);
      done();
    });

    it("callback", function(done) {
      const result = client.documentClient.validateOptionsAndCallback(function() {
        /* no op */
      }, undefined);
      assert.notEqual(null, result.options);
      assert.equal("object", typeof result.options);

      assert.equal("function", typeof result.callback);
      done();
    });

    it("options, callback.", function(done) {
      const result = client.documentClient.validateOptionsAndCallback({}, function() {
        /* no up */
      });
      assert.notEqual(null, result.options);
      assert.equal("object", typeof result.options);

      assert.equal("function", typeof result.callback);
      done();
    });

    it("undefined, callback", function(done) {
      const result = client.documentClient.validateOptionsAndCallback(undefined, function() {
        /* no op */
      });
      assert.notEqual(null, result.options);
      assert.equal("object", typeof result.options);

      assert.equal("function", typeof result.callback);
      done();
    });

    it("null, callback", function(done) {
      const result = client.documentClient.validateOptionsAndCallback(null, function() {
        /* no op */
      });
      assert.equal(null, result.options);
      assert.equal("object", typeof result.options);

      assert.equal("function", typeof result.callback);
      done();
    });

    it("invalid string options", function(done) {
      assert.throws(function() {
        client.documentClient.validateOptionsAndCallback("foo", function() {
          /* no op */
        });
      }, /The "options" parameter must be of type "object". Actual type is: "string"/);
      done();
    });

    it("invalid number options", function(done) {
      assert.throws(function() {
        client.documentClient.validateOptionsAndCallback(0, function() {
          /* no op */
        });
      }, /The "options" parameter must be of type "object". Actual type is: "number"/);
      done();
    });

    it("invalid bool options", function(done) {
      assert.throws(function() {
        client.documentClient.validateOptionsAndCallback(false, function() {
          /* no op */
        });
      }, /The "options" parameter must be of type "object". Actual type is: "boolean"/);
      done();
    });

    it("invalid string callback", function(done) {
      assert.throws(function() {
        client.documentClient.validateOptionsAndCallback({}, "bar");
      }, /The "callback" parameter must be of type "function". Actual type is: "string"/);
      done();
    });

    it("invalid number callback", function(done) {
      assert.throws(function() {
        client.documentClient.validateOptionsAndCallback({}, 0);
      }, /The "callback" parameter must be of type "function". Actual type is: "number"/);
      done();
    });

    it("invalid boolean callback", function(done) {
      assert.throws(function() {
        client.documentClient.validateOptionsAndCallback({}, false);
      }, /The "callback" parameter must be of type "function". Actual type is: "boolean"/);
      done();
    });

    it("invalid options, invalid callback", function(done) {
      assert.throws(function() {
        client.documentClient.validateOptionsAndCallback("foo", "bar");
      }, /The "options" parameter must be of type "object". Actual type is: "string"/);
      done();
    });
  });

  describe("isResourceValid Unit Tests", function() {
    it("id is not string", function(done) {
      const err = {};
      const result = client.documentClient.isResourceValid({ id: 1 }, err);

      assert.equal(result, false);
      assert.deepEqual(err, { message: "Id must be a string." });
      done();
    });
  });

  describe("extractPartitionKey", function() {
    let partitionKeyDefinition: any; // TODO: any

    beforeEach(function() {
      partitionKeyDefinition = undefined;
    });

    describe("With undefined partitionKeyDefinition", function() {
      it("should return undefined", function() {
        const document: any = {};
        const result = client.documentClient.extractPartitionKey(document, partitionKeyDefinition);
        assert.equal(result, undefined);
      });
    });

    describe("With a defined partitionKeyDefinition", function() {
      beforeEach(function() {
        partitionKeyDefinition = { paths: ["/a/b"] };
      });

      it("should return [{}] when document has no partition key value", function() {
        const document = {};
        const result = client.documentClient.extractPartitionKey(document, partitionKeyDefinition);
        assert.deepEqual(result, [{}]);
      });

      it("should return [null] when document has a null partition key value", function() {
        const document: any = { a: { b: null } };
        const result = client.documentClient.extractPartitionKey(document, partitionKeyDefinition);
        assert.deepEqual(result, [null]);
      });

      it("should return [{}] when document has a partially defined partition key value", function() {
        const document = { a: "some value" };
        const result = client.documentClient.extractPartitionKey(document, partitionKeyDefinition);
        assert.deepEqual(result, [{}]);
      });

      it("should return [value] when document has a valid partition key value", function() {
        const document = { a: { b: "some value" } };
        const result = client.documentClient.extractPartitionKey(document, partitionKeyDefinition);
        assert.deepEqual(result, ["some value"]);
      });
    });
  });
});

import assert from "assert";
import { CosmosHeaders } from "../..";
import { Constants, isResourceValid, setIsUpsertHeader } from "../../common";

describe("Helper methods", function() {
  describe("isResourceValid Unit Tests", function() {
    it("id is not string", function(done) {
      const err = {};
      const result = isResourceValid({ id: 1 }, err);

      assert.equal(result, false);
      assert.deepEqual(err, { message: "Id must be a string." });
      done();
    });
  });

  describe("setIsUpsertHeader", function() {
    it("Should add is-upsert header.", function(done) {
      const headers: any = {};
      assert.equal(undefined, headers[Constants.HttpHeaders.IsUpsert]);
      setIsUpsertHeader(headers);
      assert.equal(true, headers[Constants.HttpHeaders.IsUpsert]);
      done();
    });

    it("Should update is-upsert header.", function(done) {
      const headers: CosmosHeaders = {};
      headers[Constants.HttpHeaders.IsUpsert] = false;
      assert.equal(false, headers[Constants.HttpHeaders.IsUpsert]);
      setIsUpsertHeader(headers);
      assert.equal(true, headers[Constants.HttpHeaders.IsUpsert]);
      done();
    });

    it("Should throw on undefined headers", function(done) {
      assert.throws(function() {
        setIsUpsertHeader(undefined);
      }, /The "headers" parameter must not be null or undefined/);
      done();
    });

    it("Should throw on null headers", function(done) {
      assert.throws(function() {
        setIsUpsertHeader(null);
      }, /The "headers" parameter must not be null or undefined/);
      done();
    });
  });
});

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import assert from "assert";

import { AzureKeyCredential } from "../src/azureKeyCredential";
import { isTokenCredential } from "../src/tokenCredential";

describe("AzureKeyCredential", () => {
  it("credential constructor throws on invalid key", () => {
    assert.throws(() => {
      void new AzureKeyCredential("");
    }, /key must be a non-empty string/);
  });
});

describe("isTokenCredential", function() {
  it("should return true for an object that resembles a TokenCredential", () => {
    assert.ok(
      isTokenCredential({
        getToken() {
          return Promise.resolve({
            token: "secret",
            expiresOnTimestamp: 12345
          });
        }
      })
    );
  });

  it("should return false for an object that does not resemble a TokenCredential", () => {
    assert.strictEqual(
      isTokenCredential({
        doStuff() {
          return false;
        }
      }),
      false
    );
  });

  it("should return false for an object that has a non-function field named 'getToken'", () => {
    assert.strictEqual(
      isTokenCredential({
        getToken: true
      }),
      false
    );
  });

  it("should return false for an object that has a 'signRequest' field and getToken that takes no parameters", () => {
    assert.strictEqual(
      isTokenCredential({
        getToken: function() {},
        signRequest: function() {}
      }),
      false
    );
  });

  it("should return true for an object that has a 'signRequest' field and getToken that takes parameters", () => {
    assert.strictEqual(
      isTokenCredential({
        getToken: function(_scope: string) {},
        signRequest: function() {}
      }),
      true
    );
  });
});

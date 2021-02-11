// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import assert from "assert";

import { AzureKeyCredential } from "../src/azureKeyCredential";
import { AzureSASCredential } from "../src/azureSASCredential";
import { isTokenCredential } from "../src/tokenCredential";

describe("AzureKeyCredential", () => {
  it("credential constructor throws on invalid key", () => {
    assert.throws(() => {
      void new AzureKeyCredential("");
    }, /key must be a non-empty string/);
    assert.throws(() => {
      void new AzureKeyCredential((null as unknown) as string);
    }, /key must be a non-empty string/);
    assert.throws(() => {
      void new AzureKeyCredential((undefined as unknown) as string);
    }, /key must be a non-empty string/);
  });

  it("credential correctly updates", () => {
    const credential = new AzureKeyCredential("credential1");
    assert.equal(credential.key, "credential1");
    credential.update("credential2");
    assert.equal(credential.key, "credential2");
  });
});

describe("AzureSASCredential", () => {
  it("credential constructor throws on invalid signature", () => {
    assert.throws(() => {
      void new AzureSASCredential("");
    }, /shared access signature must be a non-empty string/);
    assert.throws(() => {
      void new AzureSASCredential((null as unknown) as string);
    }, /shared access signature must be a non-empty string/);
    assert.throws(() => {
      void new AzureSASCredential((undefined as unknown) as string);
    }, /shared access signature must be a non-empty string/);
  });

  it("credential correctly updates", () => {
    const credential = new AzureSASCredential("credential1");
    assert.equal(credential.signature, "credential1");
    credential.update("credential2");
    assert.equal(credential.signature, "credential2");
  });

  it("throws when upadting with an invalid signature", () => {
    const credential = new AzureSASCredential("credential1");

    assert.throws(() => {
      credential.update("");
    }, /shared access signature must be a non-empty string/);
    assert.throws(() => {
      credential.update((null as unknown) as string);
    }, /shared access signature must be a non-empty string/);
    assert.throws(() => {
      credential.update((undefined as unknown) as string);
    }, /shared access signature must be a non-empty string/);
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
        getToken: function(): number {
          return 1;
        },
        signRequest: function(): number {
          return 1;
        }
      }),
      false
    );
  });

  it("should return true for an object that has a 'signRequest' field and getToken that takes parameters", () => {
    assert.strictEqual(
      isTokenCredential({
        getToken: function(scope: string): string {
          return scope;
        },
        signRequest: function(): number {
          return 1;
        }
      }),
      true
    );
  });
});

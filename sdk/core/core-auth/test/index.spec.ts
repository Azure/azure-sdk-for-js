// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  AzureKeyCredential,
  AzureNamedKeyCredential,
  AzureSASCredential,
  isNamedKeyCredential,
  isSASCredential,
  isTokenCredential,
} from "../src/index";
import { assert } from "chai";

describe("AzureKeyCredential", () => {
  it("credential constructor throws on invalid key", () => {
    assert.throws(() => {
      void new AzureKeyCredential("");
    }, /key must be a non-empty string/);
    assert.throws(() => {
      void new AzureKeyCredential(null as unknown as string);
    }, /key must be a non-empty string/);
    assert.throws(() => {
      void new AzureKeyCredential(undefined as unknown as string);
    }, /key must be a non-empty string/);
  });

  it("credential correctly updates", () => {
    const credential = new AzureKeyCredential("credential1");
    assert.equal(credential.key, "credential1");
    credential.update("credential2");
    assert.equal(credential.key, "credential2");
  });
});

describe("AzureNamedKeyCredential", () => {
  it("credential constructor throws on invalid name or key", () => {
    assert.throws(() => {
      void new AzureNamedKeyCredential("name", "");
    }, /name and key must be non-empty strings/);
    assert.throws(() => {
      void new AzureNamedKeyCredential("name", null as unknown as string);
    }, /name and key must be non-empty strings/);
    assert.throws(() => {
      void new AzureNamedKeyCredential("name", undefined as unknown as string);
    }, /name and key must be non-empty strings/);
    assert.throws(() => {
      void new AzureNamedKeyCredential("", "key");
    }, /name and key must be non-empty strings/);
    assert.throws(() => {
      void new AzureNamedKeyCredential(null as unknown as string, "key");
    }, /name and key must be non-empty strings/);
    assert.throws(() => {
      void new AzureNamedKeyCredential(undefined as unknown as string, "key");
    }, /name and key must be non-empty strings/);
    assert.throws(() => {
      void new AzureNamedKeyCredential("", "");
    }, /name and key must be non-empty strings/);
    assert.throws(() => {
      void new AzureNamedKeyCredential(null as unknown as string, null as unknown as string);
    }, /name and key must be non-empty strings/);
    assert.throws(() => {
      void new AzureNamedKeyCredential(
        undefined as unknown as string,
        undefined as unknown as string
      );
    }, /name and key must be non-empty strings/);
  });

  it("credential correctly updates", () => {
    const credential = new AzureNamedKeyCredential("name1", "credential1");
    assert.equal(credential.name, "name1");
    assert.equal(credential.key, "credential1");
    credential.update("name2", "credential2");
    assert.equal(credential.name, "name2");
    assert.equal(credential.key, "credential2");
  });

  it("credential update throws on invalid name or key", () => {
    const credential = new AzureNamedKeyCredential("name1", "credential1");
    assert.equal(credential.name, "name1");
    assert.equal(credential.key, "credential1");

    // invalid name
    assert.throws(() => {
      credential.update("", "credential2");
    }, /newName and newKey must be non-empty strings/);
    // parameters unchanged
    assert.equal(credential.name, "name1");
    assert.equal(credential.key, "credential1");

    // invalid key
    assert.throws(() => {
      credential.update("name2", "");
    }, /newName and newKey must be non-empty strings/);
    // parameters unchanged
    assert.equal(credential.name, "name1");
    assert.equal(credential.key, "credential1");

    // invalid name and key
    assert.throws(() => {
      credential.update("", "");
    }, /newName and newKey must be non-empty strings/);
    // parameters unchanged
    assert.equal(credential.name, "name1");
    assert.equal(credential.key, "credential1");
  });
});

describe("AzureSASCredential", () => {
  it("credential constructor throws on invalid signature", () => {
    assert.throws(() => {
      void new AzureSASCredential("");
    }, /shared access signature must be a non-empty string/);
    assert.throws(() => {
      void new AzureSASCredential(null as unknown as string);
    }, /shared access signature must be a non-empty string/);
    assert.throws(() => {
      void new AzureSASCredential(undefined as unknown as string);
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
      credential.update(null as unknown as string);
    }, /shared access signature must be a non-empty string/);
    assert.throws(() => {
      credential.update(undefined as unknown as string);
    }, /shared access signature must be a non-empty string/);
  });
});

describe("isTokenCredential", function () {
  it("should return true for an object that resembles a TokenCredential", () => {
    assert.ok(
      isTokenCredential({
        getToken() {
          return Promise.resolve({
            token: "secret",
            expiresOnTimestamp: 12345,
          });
        },
      })
    );
  });

  it("should return false for an object that does not resemble a TokenCredential", () => {
    assert.strictEqual(
      isTokenCredential({
        doStuff() {
          return false;
        },
      }),
      false
    );
  });

  it("should return false for an object that has a non-function field named 'getToken'", () => {
    assert.strictEqual(
      isTokenCredential({
        getToken: true,
      }),
      false
    );
  });

  it("should return false for an object that has a 'signRequest' field and getToken that takes no parameters", () => {
    assert.strictEqual(
      isTokenCredential({
        getToken: function (): number {
          return 1;
        },
        signRequest: function (): number {
          return 1;
        },
      }),
      false
    );
  });

  it("should return true for an object that has a 'signRequest' field and getToken that takes parameters", () => {
    assert.strictEqual(
      isTokenCredential({
        getToken: function (scope: string): string {
          return scope;
        },
        signRequest: function (): number {
          return 1;
        },
      }),
      true
    );
  });
});

describe("isNamedKeyCredential", function () {
  it("should return true for an object that resembles a NamedKeyCredential", () => {
    assert.ok(isNamedKeyCredential({ name: "foo", key: "bar" }));
  });

  it("should return false for an object that does not resemble a NamedKeyCredential", () => {
    assert.strictEqual(isNamedKeyCredential({}), false);
  });
});

describe("isSASCredential", function () {
  it("should return true for an object that resembles a isSASCredential", () => {
    assert.ok(isSASCredential({ signature: "sig" }));
  });

  it("should return false for an object that does not resemble a isSASCredential", () => {
    assert.strictEqual(isSASCredential({}), false);
  });
});

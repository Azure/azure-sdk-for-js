// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assertions } from "../../src/localCryptography/algorithms";
import { JsonWebKey } from "../../src";
import * as chai from "chai";
import { isNode } from "@azure/core-http";
const { assert } = chai;

describe("Local cryptography internal tests", () => {
  if (!isNode) {
    // Local cryptography is only supported in NodeJS
    return;
  }

  describe("assertions", () => {
    describe("keyOps", () => {
      it("can assert if a key has a specific operation", async function() {
        const supportedOperation = "encrypt";
        const jsonWebKey: JsonWebKey = {
          keyOps: [supportedOperation]
        };
        assert.doesNotThrow(() => assertions.keyOps(jsonWebKey, supportedOperation));
      });
      it("throws if a key doesn't have a specific operation", async function() {
        const supportedOperation = "encrypt";
        const jsonWebKey: JsonWebKey = {
          keyOps: [
            /* No supported operation */
          ]
        };
        assert.throws(() => assertions.keyOps(jsonWebKey, supportedOperation));
      });
    });

    describe("rsa", () => {
      it("can assert if a key type is RSA", async function() {
        const jsonWebKey: JsonWebKey = {
          kty: "RSA"
        };
        assert.doesNotThrow(() => assertions.rsa(jsonWebKey));
      });
      it("throws if a key type is not RSA", async function() {
        const jsonWebKey: JsonWebKey = {};
        assert.throws(() => assertions.rsa(jsonWebKey));
      });
    });

    describe("nodeOnly", () => {
      it("passes only if we're in node", async function() {
        if (!isNode) {
          this.skip();
          return;
        }
        assert.doesNotThrow(() => assertions.nodeOnly());
      });
      it("throws if we're not in node", async function() {
        if (isNode) {
          this.skip();
          return;
        }
        assert.throws(() => assertions.nodeOnly());
      });
    });
  });
});

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { validators } from "../../src/localCryptography/algorithms";
import { JsonWebKey, LocalCryptographyClient } from "../../src";
import { assert } from "chai";
import { isNode } from "@azure/core-http";

describe("Local cryptography tests", () => {
  describe("validators", () => {
    describe("keyOps", () => {
      it("can validate if a key has a specific operation", async function() {
        const supportedOperation = "encrypt";
        const jsonWebKey: JsonWebKey = {
          keyOps: [supportedOperation]
        };
        assert.doesNotThrow(() => validators.keyOps(jsonWebKey, supportedOperation));
      });
      it("throws if a key doesn't have a specific operation", async function() {
        const supportedOperation = "encrypt";
        const jsonWebKey: JsonWebKey = {
          keyOps: [
            /* No supported operation */
          ]
        };
        assert.throws(() => validators.keyOps(jsonWebKey, supportedOperation));
      });
    });

    describe("rsa", () => {
      it("can validate if a key type is RSA", async function() {
        const jsonWebKey: JsonWebKey = {
          kty: "RSA"
        };
        assert.doesNotThrow(() => validators.rsa(jsonWebKey));
      });
      it("throws if a key type is not RSA", async function() {
        const jsonWebKey: JsonWebKey = {};
        assert.throws(() => validators.rsa(jsonWebKey));
      });
    });

    describe("nodeOnly", () => {
      it("passes only if we're in node", async function() {
        if (!isNode) {
          this.skip();
          return;
        }
        assert.doesNotThrow(() => validators.nodeOnly());
      });
      it("throws if we're not in node", async function() {
        if (isNode) {
          this.skip();
          return;
        }
        assert.throws(() => validators.nodeOnly());
      });
    });
  });

  describe("client public operations", () => {
    const jsonWebKey: JsonWebKey = {
      kty: "RSA",
      kid: "51300370a8e1ac0a14a59cdd9c881d3f24c01f78",
      n: Buffer.from(
        "w9OLNr_6sIuqr8OO3nPzorbv8tkmXC-m0k0O3W6gdk1QipvJ2pZkRSzD_iIWnEvYV11RuOBSAb7e_nU7mwNnxX6mORyJIEwnHKucBwaHQhuo56uVUjNTsRI6OuLB6REwxLM0ePPQPJNaXncWzt83oYdHU10VPmp5x0Sj-GjTvMpm2Y4I14KnFUXMEvIC-e5lf2P7q6KMXNw3PchEvmO5fVCgXf5-FgzDzEyn0qXrerdui4lGUtzcREPFksPNLNMlqp0XL5Kz1QLLkKDtR3dVjEtViEYJ6extcI-xFEV785hO4Ok36N99ht41EZk8ibrflNnYkJIEXAw_LKkmtxyZKw"
      ),
      e: Buffer.from("AQAB")
    };
    const client = new LocalCryptographyClient(jsonWebKey);

    describe("encrypt", () => {
      it("RSA1_5", async function() {});
      it("RSA_OAEP", async function() {});
    });

    describe("decrypt", () => {
      it("RSA1_5", async function() {});
      it("RSA_OAEP", async function() {});
    });

    describe("wrapKey", () => {
      it("RSA1_5", async function() {});
      it("RSA_OAEP", async function() {});
    });

    describe("unwrapKey", () => {
      it("RSA1_5", async function() {});
      it("RSA_OAEP", async function() {});
    });

    describe("signData", () => {
      const message = Buffer.from("data");
      const signature = Buffer.from("signature");

      it("ES256", async function() {
        const signed = await client.signData("ES256", message);
        const verified = await client.verifyData("ES256", signed.result, signature);
        assert.ok(verified.result);
      });
      it("PS256", async function() {
        const signed = await client.signData("PS256", message);
        const verified = await client.verifyData("PS256", signed.result, signature);
        assert.ok(verified.result);
      });
      it("RS256", async function() {
        const signed = await client.signData("RS256", message);
        const verified = await client.verifyData("RS256", signed.result, signature);
        assert.ok(verified.result);
      });
      it("ES384", async function() {
        const signed = await client.signData("ES384", message);
        const verified = await client.verifyData("ES384", signed.result, signature);
        assert.ok(verified.result);
      });
      it("PS384", async function() {
        const signed = await client.signData("PS384", message);
        const verified = await client.verifyData("PS384", signed.result, signature);
        assert.ok(verified.result);
      });
      it("RS384", async function() {
        const signed = await client.signData("RS384", message);
        const verified = await client.verifyData("RS384", signed.result, signature);
        assert.ok(verified.result);
      });
      it("ES512", async function() {
        const signed = await client.signData("ES512", message);
        const verified = await client.verifyData("ES512", signed.result, signature);
        assert.ok(verified.result);
      });
      it("PS512", async function() {
        const signed = await client.signData("PS512", message);
        const verified = await client.verifyData("PS512", signed.result, signature);
        assert.ok(verified.result);
      });
      it("RS512", async function() {
        const signed = await client.signData("RS512", message);
        const verified = await client.verifyData("RS512", signed.result, signature);
        assert.ok(verified.result);
      });
    });
  });
});

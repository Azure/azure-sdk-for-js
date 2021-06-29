// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { Context } from "mocha";
import { env, Recorder } from "@azure/test-utils-recorder";

import { KeyClient } from "../../src";
import { authenticate } from "../utils/testAuthentication";
import TestClient from "../utils/testClient";
import { CreateOctKeyOptions } from "../../src/keysModels";
import { getServiceVersion, onVersions } from "../utils/utils.common";
import { supportsTracing } from "../../../keyvault-common/test/utils/supportsTracing";

onVersions({ minVer: "7.2" }).describe(
  "Keys client - create, read, update and delete operations for managed HSM",
  () => {
    const keyPrefix = `CRUD${env.KEY_NAME || "KeyName"}`;
    let keySuffix: string;
    let hsmClient: KeyClient;
    let testClient: TestClient;
    let recorder: Recorder;

    beforeEach(async function(this: Context) {
      const authentication = await authenticate(this, getServiceVersion());
      recorder = authentication.recorder;

      if (!authentication.hsmClient) {
        // Managed HSM is not deployed for this run due to service resource restrictions so we skip these tests.
        // This is only necessary while Managed HSM is in preview.
        this.skip();
      }

      hsmClient = authentication.hsmClient;
      keySuffix = authentication.keySuffix;
      testClient = new TestClient(authentication.hsmClient);
    });

    afterEach(async function() {
      await recorder.stop();
    });

    it("can create an OCT key with options", async function(this: Context) {
      const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
      const options: CreateOctKeyOptions = {
        hsm: true
      };
      const result = await hsmClient.createOctKey(keyName, options);
      assert.equal(result.name, keyName, "Unexpected key name in result from createKey().");
      assert.equal(result.keyType, "oct-HSM");
      await testClient.flushKey(keyName);
    });

    onVersions({ minVer: "7.3-preview" }).describe("getRandomBytes", () => {
      it("can return the required number of bytes", async () => {
        const randomBytes = await hsmClient.getRandomBytes(10);
        assert.exists(randomBytes);
        assert.equal(randomBytes!.length, 10);
      });

      it("returns an error when bytes is out of range", async () => {
        await assert.isRejected(hsmClient.getRandomBytes(-1));
        await assert.isRejected(hsmClient.getRandomBytes(0));
        await assert.isRejected(hsmClient.getRandomBytes(129));
      });

      it("supports tracing", async () => {
        await supportsTracing(
          (tracingOptions) => hsmClient.getRandomBytes(128, { tracingOptions }),
          ["Azure.KeyVault.Keys.KeyClient.getRandomBytes"]
        );
      });
    });
  }
);

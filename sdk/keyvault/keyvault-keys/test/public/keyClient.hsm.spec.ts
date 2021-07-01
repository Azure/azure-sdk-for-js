// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { Context } from "mocha";
import { env, Recorder } from "@azure/test-utils-recorder";

import { KeyClient } from "../../src";
import { authenticate } from "../utils/testAuthentication";
import TestClient from "../utils/testClient";
import { CreateOctKeyOptions, KnownKeyExportEncryptionAlgorithm } from "../../src/keysModels";
import { getServiceVersion, onVersions } from "../utils/utils.common";
import { supportsTracing } from "../../../keyvault-common/test/utils/supportsTracing";
import { createRsaKey, stringToUint8Array, uint8ArrayToString } from "../utils/crypto";

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

    onVersions({ minVer: "7.3-preview" }).describe("releaseKey", () => {
      // TODO: attestation using the mock service
      // TODO: should this be a string or a buffer?
      const attestation =
        "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ikx0VEw5ME9BQllkaUVsT3hzWWpLZDdpMEtDYWRIVjhyRW0tMnVtM3pySWMiLCJqa3UiOiJodHRwczovL21hbGVnZXJza3I0LmF6dXJld2Vic2l0ZXMubmV0Ly9rZXlzIn0.eyJpc3MiOiJodHRwczovL21hbGVnZXJza3I0LmF6dXJld2Vic2l0ZXMubmV0LyIsInNkay10ZXN0Ijp0cnVlLCJ4LW1zLWluaXR0aW1lIjp7fSwieC1tcy1ydW50aW1lIjp7ImtleXMiOlt7Imt0eSI6IlJTQSIsImUiOiJBUUFCIiwidXNlIjoiZW5jIiwia2lkIjoiZHVtbXktcmVsZWFzZS1rZXkiLCJuIjoiamFlQ0ZMWVoxS1V2SlppS3lCaHl1N2Y2c0dfOEQtLVpvZWJFM1EzamxSRDhCcmNwc3d0TVBJRmRvN1hfcC1lR2J6dklHRzV6VWhaLTFTWFdwT2d0YkpWeGRuZ05HOWoxbnNpZVpmM3FBM1pEVDU2STRDOFE2alh0T0dablU4SDVVZUpXYTUxeTEybmp4OGVaTV9teF9xZ0dBQ2p1MzFLbEdzVGNDVGlYNXlrajl3M05aNUY3SnJ0Z3ZpT1N2emJ1SjJWT2tOTXFPMmplTUl2ME8xSmNoNkhHdFVDd0l5RHZnV2t6UV9vR29nTUFrRm1yazlaazdmTWJYWnUwMFFWVjAtcHFRMXVnQUZ1THAtNDlXYWJHSlhvQmZ0VWxiRi0yd2owLWJ4TkNvOWVfZmhzNXQ5d1dLZlp2SWpqSHhiZjJCTXhNSUluQnFMb3FvREpiRGVRR1JRIn1dfSwibWFhLWVoZCI6InNkay10ZXN0IiwiaWF0IjoxNjI0OTA5MzA1LCJleHAiOjE2MjU1MTQxMDV9.mcJhNXki0deaTzyO5wg3h9ZI2uJXZxZ7pImPm08UmomeSZZ3Jvr3jYhX1Z-hu_ui-qUCCPsKF-ergTDQb7FcJnhyI0Fm21007UwW-s4q62c2xGMwE3vneYeuyOO7n34HnukVZbypB6LmEnaEZ2ZasT5rLHUV_fe4xrmvJULrhKVUG1QDIIMPMe_CVWrVQ0BAF0ykFGGnn9KXQiZvn-EjJhcp_Zlia1i20NsamN9JuGTejx2kirsLRuEyqs-k-kKLSaQs6Slowgebyc28pRPEoECvhXd6rBLwev1b-nB1EDaHmoFXNZrmsIdOLHITjvfVx1zasJ4SjXSO55UHumMPUQ";

      it.only("can import an exportable key and release it", async () => {
        const keyName = recorder.getUniqueName("importreleasekey");
        const releasePolicy = {
          anyOf: [
            {
              anyOf: [
                {
                  claim: "sdk-test",
                  condition: "equals",
                  value: "true"
                }
              ],
              authority: "https://malegerskr4.azurewebsites.net/"
            }
          ],
          version: "1.0"
        };
        const encodedReleasePolicy = stringToUint8Array(JSON.stringify(releasePolicy));
        const importedKey = await hsmClient.importKey(keyName, createRsaKey(), {
          exportable: true,
          releasePolicy: { data: encodedReleasePolicy }
        });

        assert.exists(importedKey.properties.releasePolicy?.data);
        assert.isNotEmpty(
          JSON.parse(uint8ArrayToString(importedKey.properties.releasePolicy?.data!))
        );
        const releaseResult = await hsmClient.releaseKey(
          keyName,
          importedKey.properties.version!,
          attestation,
          {
            nonce: "nonce",
            algorithm: KnownKeyExportEncryptionAlgorithm.RsaAesKeyWrap256 // TODO: naming?
          }
        );

        assert.exists(releaseResult.value);
        assert.equal(releaseResult.algorithm, KnownKeyExportEncryptionAlgorithm.RsaAesKeyWrap256);
      });

      it("can create an exportable key and release it", async () => {
        const keyName = recorder.getUniqueName("exportkey");
        const releasePolicy = {
          anyOf: [
            {
              anyOf: [
                {
                  claim: "sdk-test",
                  condition: "equals",
                  value: "true"
                }
              ],
              authority: "https://malegerskr4.azurewebsites.net/"
            }
          ],
          version: "1.0"
        };
        const encodedReleasePolicy = stringToUint8Array(JSON.stringify(releasePolicy));
        // TODO: releasePolicy is a JSON blob, should we convert it in convenience layer?
        // TODO: update swagger with version parameter that is missing
        // TODO: non-exportable keys must not have release policy - guard or let the service return a meaningful error?
        const createdKey = await hsmClient.createKey(keyName, "RSA", {
          exportable: true,
          releasePolicy: { data: encodedReleasePolicy },
          keyOps: ["encrypt", "decrypt"]
        });

        // TODO: what's important to test here?
        assert.exists(createdKey.properties.releasePolicy?.data);
        assert.isNotEmpty(
          JSON.parse(uint8ArrayToString(createdKey.properties.releasePolicy!.data!))
        );
        assert.isTrue(createdKey.properties.exportable);
        // TODO: what about nonce and algorithm?
        // TODO: what about an overload that takes the key (since it has a version)?
        const releaseResult = await hsmClient.releaseKey(
          keyName,
          createdKey.properties.version!,
          attestation
        );

        assert.exists(releaseResult.value);
      });
    });
  }
);

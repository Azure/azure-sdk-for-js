// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../src/jsrsasign.d.ts"/>
import * as jsrsasign from "jsrsasign";
import { Recorder, isLiveMode } from "@azure-tools/test-recorder";
import type { EndpointType } from "../utils/recordedClient.js";
import {
  createRecordedAdminClient,
  getIsolatedSigningKey,
  recorderOptions,
} from "../utils/recordedClient.js";
import type { AttestationType } from "../../src/index.js";
import { KnownAttestationType, createAttestationPolicyToken } from "../../src/index.js";
import { createRSAKey, createX509Certificate, generateSha256Hash } from "../utils/cryptoUtils.js";
import { KnownPolicyModification } from "../../src/generated/index.js";
import { verifyAttestationSigningKey } from "../../src/utils/helpers.js";
import { describe, it, assert, expect, beforeEach, afterEach } from "vitest";

describe("PolicyGetSetTests ", () => {
  let recorder: Recorder;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    await recorder.start(recorderOptions);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("#GetPolicy SGX - Aad", async () => {
    await testGetPolicy(KnownAttestationType.SgxEnclave, "AAD");
  });

  it("#GetPolicy SGX - Isolated", async () => {
    await testGetPolicy(KnownAttestationType.SgxEnclave, "Isolated");
  });

  it("#GetPolicy SGX - Shared", async () => {
    await testGetPolicy(KnownAttestationType.SgxEnclave, "Shared");
  });

  it("Set Policy SGX - AAD Unsecured", async () => {
    await testSetPolicy(KnownAttestationType.SgxEnclave, "AAD");
  });

  it("Set Policy failure conditions", async () => {
    const adminClient = createRecordedAdminClient(recorder, "AAD");

    const minimalPolicy = "version=1.0; authorizationrules{=> permit();}; issuancerules{};";

    const [rsaKey, rsapubKey] = createRSAKey();
    const [rsaKey2] = createRSAKey();
    const rsaCertificate = createX509Certificate(rsaKey, rsapubKey, "CertificateName");

    await expect(
      adminClient.setPolicy(KnownAttestationType.SgxEnclave, minimalPolicy, { privateKey: rsaKey }),
    ).rejects.toThrow("privateKey is specified");

    await expect(
      adminClient.setPolicy(KnownAttestationType.SgxEnclave, minimalPolicy, {
        certificate: rsaCertificate,
      }),
    ).rejects.toThrow("privateKey is specified");

    await expect(
      adminClient.setPolicy(KnownAttestationType.SgxEnclave, minimalPolicy, {
        privateKey: rsaKey2,
        certificate: rsaCertificate,
      }),
    ).rejects.toThrow("Key does not match Certificate");

    await expect(
      adminClient.setPolicy(KnownAttestationType.SgxEnclave, minimalPolicy, {
        privateKey: "BogusKey",
        certificate: rsaCertificate,
      }),
    ).rejects.toThrow("not supported argument");

    await adminClient.setPolicy(KnownAttestationType.SgxEnclave, minimalPolicy);

    await adminClient.resetPolicy(KnownAttestationType.SgxEnclave);
  });

  it("Reset Policy failure conditions", async () => {
    const adminClient = createRecordedAdminClient(recorder, "AAD");

    const [rsaKey, rsapubKey] = createRSAKey();
    const [rsaKey2] = createRSAKey();
    const rsaCertificate = createX509Certificate(rsaKey, rsapubKey, "CertificateName");

    await expect(
      adminClient.resetPolicy(KnownAttestationType.SgxEnclave, { privateKey: rsaKey }),
    ).rejects.toThrow("privateKey is specified");

    await expect(
      adminClient.resetPolicy(KnownAttestationType.SgxEnclave, { certificate: rsaCertificate }),
    ).rejects.toThrow("privateKey is specified");

    await expect(
      adminClient.resetPolicy(KnownAttestationType.SgxEnclave, {
        privateKey: "BogusKey",
        certificate: rsaCertificate,
      }),
    ).rejects.toThrow("not supported argument");

    await expect(
      adminClient.resetPolicy(KnownAttestationType.SgxEnclave, {
        privateKey: rsaKey2,
        certificate: rsaCertificate,
      }),
    ).rejects.toThrow("Key does not match Certificate");

    await adminClient.resetPolicy(KnownAttestationType.SgxEnclave);
  });

  it("Set Policy SGX - AAD Secured", async (ctx) => {
    if (!isLiveMode()) ctx.skip(); // "secured APIs cannot match the policy hash because the recorded policy signer won't match the signer in the request"
    const [rsaKey, rsapubKey] = createRSAKey();
    const rsaCertificate = createX509Certificate(rsaKey, rsapubKey, "CertificateName");
    await testSetPolicy(KnownAttestationType.SgxEnclave, "AAD", {
      privateKey: rsaKey,
      certificate: rsaCertificate,
    });
  });

  it("Set Policy SGX - Isolated Secured", async (ctx) => {
    if (!isLiveMode()) ctx.skip(); // "setPolicy APIs require keys and certificates from the environment, which are not available in playback"
    await testSetPolicy(KnownAttestationType.SgxEnclave, "Isolated", getIsolatedSigningKey());
  });

  it("Reset Policy SGX - AAD Unsecured", async () => {
    await testResetPolicy(KnownAttestationType.SgxEnclave, "AAD");
  });

  it("Reset Policy SGX - AAD Secured", async (ctx) => {
    if (!isLiveMode()) ctx.skip(); // "secured APIs cannot match the policy hash because the recorded policy signer won't match the signer in the request"
    const [rsaKey, rsaPubKey] = createRSAKey();
    const rsaCertificate = createX509Certificate(rsaKey, rsaPubKey, "CertificateName");
    const signingKey = verifyAttestationSigningKey(rsaKey, rsaCertificate);
    await testResetPolicy(KnownAttestationType.SgxEnclave, "AAD", signingKey);
  });

  it("Reset Policy SGX - Isolated Secured", async (ctx) => {
    if (!isLiveMode()) ctx.skip(); // "resetPolicy APIs require keys and certificates from the environment, which are not available in playback"
    const signingKeys = getIsolatedSigningKey();
    await testResetPolicy(KnownAttestationType.SgxEnclave, "Isolated", signingKeys);
  });

  async function testGetPolicy(
    attestationType: AttestationType,
    clientLocation: EndpointType,
  ): Promise<void> {
    const adminClient = createRecordedAdminClient(recorder, clientLocation);
    const policyResult = await adminClient.getPolicy(attestationType);
    assert.isTrue(policyResult.body.startsWith("version="));
  }

  async function testSetPolicy(
    attestationType: AttestationType,
    clientLocation: EndpointType,
    signer?: { privateKey: string; certificate: string },
  ): Promise<void> {
    const adminClient = createRecordedAdminClient(recorder, clientLocation);

    const minimalPolicy = "version=1.0; authorizationrules{=> permit();}; issuancerules{};";

    const policyResult = await adminClient.setPolicy(attestationType, minimalPolicy, {
      privateKey: signer?.privateKey,
      certificate: signer?.certificate,
    });

    assert.equal(KnownPolicyModification.Updated, policyResult.body.policyResolution);

    const expectedPolicy = createAttestationPolicyToken(
      minimalPolicy,
      signer?.privateKey,
      signer?.certificate,
    );

    const expectedHash = generateSha256Hash(expectedPolicy.serialize());

    assert.isNotNull(policyResult.body.policyTokenHash);
    if (policyResult.body.policyTokenHash) {
      assert.equal(expectedHash.length, policyResult.body.policyTokenHash.length);
      for (let i: number = 0; i < expectedHash.length; i += 1) {
        assert.equal(expectedHash[i], policyResult.body.policyTokenHash[i]);
      }
    }
    if (signer !== undefined) {
      assert.isDefined(policyResult.body.policySigner);
      assert.isNotNull(policyResult.body.policySigner);

      if (policyResult.body.policySigner) {
        const expectedCert = new jsrsasign.X509();
        expectedCert.readCertPEM(signer.certificate);

        const actualCert = new jsrsasign.X509();
        actualCert.readCertPEM(policyResult.body.policySigner.certificates[0]);

        // The signer in the response should match the signer we set in the request.
        assert.equal(expectedCert.hex, actualCert.hex);
      }
    } else {
      assert.isUndefined(policyResult.body.policySigner);
    }

    const getResult = await adminClient.getPolicy(attestationType);
    assert.equal(minimalPolicy, getResult.body);
  }

  async function testResetPolicy(
    attestationType: AttestationType,
    clientLocation: EndpointType,
    signer?: { privateKey: string; certificate: string },
  ): Promise<void> {
    const adminClient = createRecordedAdminClient(recorder, clientLocation);

    const minimalPolicy = "version=1.0; authorizationrules{=> permit();}; issuancerules{};";

    const policyResult = await adminClient.setPolicy(attestationType, minimalPolicy, {
      privateKey: signer?.privateKey,
      certificate: signer?.certificate,
    });

    assert.equal(KnownPolicyModification.Updated, policyResult.body.policyResolution);

    const resetResult = await adminClient.resetPolicy(attestationType, signer);

    assert.equal(KnownPolicyModification.Removed, resetResult.body.policyResolution);

    // The reset policy should be different from the one we just set.
    const getResult = await adminClient.getPolicy(attestationType);
    assert.notEqual(minimalPolicy, getResult.body);
  }
});

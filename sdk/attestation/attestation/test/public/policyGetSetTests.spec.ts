// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../src/jsrsasign.d.ts"/>
import * as jsrsasign from "jsrsasign";

import { assert, use as chaiUse, expect } from "chai";
import { Context } from "mocha";
import chaiAsPromised from "chai-as-promised";
/* eslint-disable @typescript-eslint/no-invalid-this */

chaiUse(chaiAsPromised);

import { Recorder, isLiveMode } from "@azure-tools/test-recorder";

import {
  EndpointType,
  createRecordedAdminClient,
  getIsolatedSigningKey,
  recorderOptions,
} from "../utils/recordedClient";
import { AttestationType, KnownAttestationType, createAttestationPolicyToken } from "../../src";
import { createRSAKey, createX509Certificate, generateSha256Hash } from "../utils/cryptoUtils";
import { KnownPolicyModification } from "../../src/generated";
import { verifyAttestationSigningKey } from "../../src/utils/helpers";

describe("PolicyGetSetTests ", function () {
  let recorder: Recorder;

  beforeEach(async function (this: Context) {
    recorder = new Recorder(this.currentTest);
    await recorder.start(recorderOptions);
  });

  afterEach(async function () {
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
      adminClient.setPolicy(KnownAttestationType.SgxEnclave, minimalPolicy, { privateKey: rsaKey })
    ).to.be.rejectedWith("privateKey is specified");

    await expect(
      adminClient.setPolicy(KnownAttestationType.SgxEnclave, minimalPolicy, {
        certificate: rsaCertificate,
      })
    ).to.be.rejectedWith("privateKey is specified");

    await expect(
      adminClient.setPolicy(KnownAttestationType.SgxEnclave, minimalPolicy, {
        privateKey: rsaKey2,
        certificate: rsaCertificate,
      })
    ).to.be.rejectedWith("Key does not match Certificate");

    await expect(
      adminClient.setPolicy(KnownAttestationType.SgxEnclave, minimalPolicy, {
        privateKey: "BogusKey",
        certificate: rsaCertificate,
      })
    ).to.be.rejectedWith("not supported argument");

    await adminClient.setPolicy(KnownAttestationType.SgxEnclave, minimalPolicy);

    await adminClient.resetPolicy(KnownAttestationType.SgxEnclave);
  });

  it("Reset Policy failure conditions", async () => {
    const adminClient = createRecordedAdminClient(recorder, "AAD");

    const [rsaKey, rsapubKey] = createRSAKey();
    const [rsaKey2] = createRSAKey();
    const rsaCertificate = createX509Certificate(rsaKey, rsapubKey, "CertificateName");

    await expect(
      adminClient.resetPolicy(KnownAttestationType.SgxEnclave, { privateKey: rsaKey })
    ).to.be.rejectedWith("privateKey is specified");

    await expect(
      adminClient.resetPolicy(KnownAttestationType.SgxEnclave, { certificate: rsaCertificate })
    ).to.be.rejectedWith("privateKey is specified");

    await expect(
      adminClient.resetPolicy(KnownAttestationType.SgxEnclave, {
        privateKey: "BogusKey",
        certificate: rsaCertificate,
      })
    ).to.be.rejectedWith("not supported argument");

    await expect(
      adminClient.resetPolicy(KnownAttestationType.SgxEnclave, {
        privateKey: rsaKey2,
        certificate: rsaCertificate,
      })
    ).to.be.rejectedWith("Key does not match Certificate");

    await adminClient.resetPolicy(KnownAttestationType.SgxEnclave);
  });

  it("Set Policy SGX - AAD Secured", async function () {
    if (!isLiveMode()) this.skip(); // "secured APIs cannot match the policy hash because the recorded policy signer won't match the signer in the request"
    const [rsaKey, rsapubKey] = createRSAKey();
    const rsaCertificate = createX509Certificate(rsaKey, rsapubKey, "CertificateName");
    await testSetPolicy(KnownAttestationType.SgxEnclave, "AAD", {
      privateKey: rsaKey,
      certificate: rsaCertificate,
    });
  });

  it("Set Policy SGX - Isolated Secured", async function () {
    if (!isLiveMode()) this.skip(); // "setPolicy APIs require keys and certificates from the environment, which are not available in playback"
    await testSetPolicy(KnownAttestationType.SgxEnclave, "Isolated", getIsolatedSigningKey());
  });

  it("Reset Policy SGX - AAD Unsecured", async () => {
    await testResetPolicy(KnownAttestationType.SgxEnclave, "AAD");
  });

  it("Reset Policy SGX - AAD Secured", async function () {
    if (!isLiveMode()) this.skip(); // "secured APIs cannot match the policy hash because the recorded policy signer won't match the signer in the request"
    const [rsaKey, rsaPubKey] = createRSAKey();
    const rsaCertificate = createX509Certificate(rsaKey, rsaPubKey, "CertificateName");
    const signingKey = verifyAttestationSigningKey(rsaKey, rsaCertificate);
    await testResetPolicy(KnownAttestationType.SgxEnclave, "AAD", signingKey);
  });

  it("Reset Policy SGX - Isolated Secured", async function () {
    if (!isLiveMode()) this.skip(); // "resetPolicy APIs require keys and certificates from the environment, which are not available in playback"
    const signingKeys = getIsolatedSigningKey();
    await testResetPolicy(KnownAttestationType.SgxEnclave, "Isolated", signingKeys);
  });

  async function testGetPolicy(
    attestationType: AttestationType,
    clientLocation: EndpointType
  ): Promise<void> {
    const adminClient = createRecordedAdminClient(recorder, clientLocation);
    const policyResult = await adminClient.getPolicy(attestationType);
    assert.isTrue(policyResult.body.startsWith("version="));
  }

  async function testSetPolicy(
    attestationType: AttestationType,
    clientLocation: EndpointType,
    signer?: { privateKey: string; certificate: string }
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
      signer?.certificate
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
    signer?: { privateKey: string; certificate: string }
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

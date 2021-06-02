// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert, use as chaiUse } from "chai";
import { Context } from "mocha";
import chaiPromises from "chai-as-promised";
chaiUse(chaiPromises);

import { isPlaybackMode, Recorder } from "@azure/test-utils-recorder";

import { X509 } from "jsrsasign";

import {
  createRecordedAdminClient,
  createRecordedClient,
  createRecorder,
  EndpointType,
  getIsolatedSigningKey } from "../utils/recordedClient";
import { AttestationSigningKey, KnownAttestationType, AttestationToken, StoredAttestationPolicy, AttestationType } from "../../src";
import { verifyAttestationToken } from "../utils/helpers";
import { generateSha256Hash, createRSAKey, createX509Certificate } from "../utils/cryptoUtils";
import { KnownPolicyModification } from "../../src/generated";
import { encodeByteArray } from "../utils/base64url";

describe("PolicyGetSetTests ", function() {
  let recorder: Recorder;

  beforeEach(function(this: Context) {
    recorder = createRecorder(this);
  });

  afterEach(async function() {
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

  it("Set Policy SGX - AAD Unsecured", async() => {
    await testSetPolicy(KnownAttestationType.SgxEnclave, "AAD");
  })

  it("Set Policy SGX - AAD Secured", async() => {
    recorder.skip(undefined, "secured APIs cannot match the policy hash because the recorded policy signer won't match the signer in the request");
    const rsaKey = createRSAKey();
    const rsaCertificate = createX509Certificate(rsaKey, "CertificateName");
    const signingKey = new AttestationSigningKey(rsaKey, rsaCertificate);
    await testSetPolicy(KnownAttestationType.SgxEnclave, "AAD", signingKey);
  })

  it("Set Policy SGX - Isolated Secured", async() => {
    recorder.skip(undefined, "setPolicy APIs require keys and certificates from the environment, which are not available in playback");
    const signingKeys = getIsolatedSigningKey();
    await testSetPolicy(KnownAttestationType.SgxEnclave, "Isolated", signingKeys);
  });

  it("Reset Policy SGX - AAD Unsecured", async() => {
    await testResetPolicy(KnownAttestationType.SgxEnclave, "AAD");
  })

  it("Reset Policy SGX - AAD Secured", async() => {
    recorder.skip(undefined, "secured APIs cannot match the policy hash because the recorded policy signer won't match the signer in the request");
    const rsaKey = createRSAKey();
    const rsaCertificate = createX509Certificate(rsaKey, "CertificateName");
    const signingKey = new AttestationSigningKey(rsaKey, rsaCertificate);
    await testResetPolicy(KnownAttestationType.SgxEnclave, "AAD", signingKey);
  })

  it("Reset Policy SGX - Isolated Secured", async() => {
    recorder.skip(undefined, "resetPolicy APIs require keys and certificates from the environment, which are not available in playback");
    const signingKeys = getIsolatedSigningKey();
    await testResetPolicy(KnownAttestationType.SgxEnclave, "Isolated", signingKeys);
  });



  async function testGetPolicy(attestationType: AttestationType, clientLocation: EndpointType) : Promise<void>{
    const adminClient = createRecordedAdminClient(clientLocation);
    const policyResult = await adminClient.getPolicy(attestationType);
    const result = policyResult.token;
    assert.isTrue(policyResult.value.startsWith("version="));


    assert(policyResult.token, "Expected a token from the service but did not receive one");
    if (result && !isPlaybackMode()) {
      const client = createRecordedClient(clientLocation);
      const signers = await client.getAttestationSigners();
      await verifyAttestationToken(policyResult.token.serialize(), signers, clientLocation);
    }
   }

   async function testSetPolicy(attestationType: AttestationType, clientLocation: EndpointType, signer?: AttestationSigningKey) : Promise<void> {
    const adminClient = createRecordedAdminClient(clientLocation);

    const minimalPolicy = "version=1.0; authorizationrules{=> permit();}; issuancerules{};"

    const policyResult = await adminClient.setPolicy(attestationType, minimalPolicy, signer);

    assert.equal(KnownPolicyModification.Updated, policyResult.value.policyResolution);


    const expectedPolicy = AttestationToken.create(
      { body: new StoredAttestationPolicy(minimalPolicy).serialize(), signer: signer });

    const expectedHash = generateSha256Hash(expectedPolicy.serialize());

    assert.isNotNull(policyResult.value.policyTokenHash);
    if (policyResult.value.policyTokenHash) {
      assert.equal(expectedHash.length, policyResult.value.policyTokenHash.length);
      for (let i: number = 0; i < expectedHash.length ; i += 1) {
        assert.equal(expectedHash[i], policyResult.value.policyTokenHash[i]);
      }
    }
    if (signer !== undefined) {
      assert.isDefined(policyResult.value.policySigner);
      assert.isNotNull(policyResult.value.policySigner);

      if (policyResult.value.policySigner) {
        let pemCert: string;
        pemCert = "-----BEGIN CERTIFICATE-----\r\n";
        pemCert += encodeByteArray(policyResult.value.policySigner.certificates[0]);
        pemCert += "\r\n-----END CERTIFICATE-----\r\n";
 
        const expectedCert = new X509();
        expectedCert.readCertPEM(signer.certificate);

        const actualCert = new X509();
        actualCert.readCertPEM(pemCert);

        // The signer in the response should match the signer we set in the request.
        assert.equal(expectedCert.hex, actualCert.hex);
      }
    }
    else {
      assert.isUndefined(policyResult.value.policySigner);
    }

    const getResult = await adminClient.getPolicy(attestationType);
    assert.equal(minimalPolicy, getResult.value);
   }

   async function testResetPolicy(attestationType: AttestationType, clientLocation: EndpointType, signer?: AttestationSigningKey) : Promise<void> {
    const adminClient = createRecordedAdminClient(clientLocation);

    const minimalPolicy = "version=1.0; authorizationrules{=> permit();}; issuancerules{};"

    const policyResult = await adminClient.setPolicy(attestationType, minimalPolicy, signer);

    assert.equal(KnownPolicyModification.Updated, policyResult.value.policyResolution);

    const resetResult = await adminClient.resetPolicy(attestationType, signer);
    assert.equal(KnownPolicyModification.Removed, resetResult.value.policyResolution);

    // The reset policy should be different from the one we just set.
    const getResult = await adminClient.getPolicy(attestationType);
    assert.notEqual(minimalPolicy, getResult.value);
   }


});

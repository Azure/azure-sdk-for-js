// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates the use of a Attestation Instance to set an attestation policy.
 *
 * FILE: setAttestationPolicy.ts
 *
 * DESCRIPTION:
 *  This sample demonstrates using the attestation administration APIs to manage
 *  attestation policy documents for the various modes of operation of the attestation
 *  service.
 *
 *  Set the following environment variables with your own values before running
 *  the samples:
 *
 *  1) ATTESTATION_AAD_URL - the base URL for an attestation service instance in AAD mode.
 *  2) ATTESTATION_ISOLATED_URL - the base URL for an attestation service instance in Isolated mode.
 *  3) ATTESTATION_ISOLATED_SIGNING_CERTIFICATE - A Base64 encoded DER X.509 certificate which is one of the Isolated
 *      mode signing certificates.
 *  4) ATTESTATION_ISOLATED_SIGNING_KEY - A Base64 encoded DER RSA Private key which
 *      corresponds to the ATTESTATION_ISOLATED_SIGNING_CERTIFICATE.
 *
 * To authorize access to the service, this sample also depends on the following
 * environment variables:
 *  AZURE_TENANT_ID - AAD Tenant ID used to authenticate the user.
 *  AZURE_CLIENT_ID - AAD Client ID used to authenticate the user.
 *  AZURE_CLIENT_SECRET - AAD Secret used to authenticate the client.
 *
 * Note that the shared instances cannot have attestation policies applied to them.
 */

import {
  AttestationAdministrationClient,
  createAttestationPolicyToken,
  KnownAttestationType,
} from "@azure/attestation";
import { DefaultAzureCredential } from "@azure/identity";

// Load environment from a .env file if it exists.
import * as dotenv from "dotenv";
import { writeBanner } from "./utils/helpers";
import { createRSAKey, createX509Certificate, generateSha256Hash } from "./utils/cryptoUtils";

import { X509 } from "jsrsasign";

dotenv.config();

/**
 * Sets the OpenEnclave attestation policy using an Unsecured attestation policy.
 */
async function setOpenEnclaveAttestationPolicyAadUnsecured() {
  writeBanner("Set OpenEnclave Attestation Policy - Unsecured policy");

  // Use the specified attestion URL.
  const endpoint = process.env.ATTESTATION_AAD_URL;
  if (endpoint === undefined) {
    throw new Error("ATTESTATION_AAD_URL must be defined.");
  }

  const client = new AttestationAdministrationClient(endpoint, new DefaultAzureCredential());

  // This attestation policy blocks all non-debug SGX enclaves,
  // and requires that the product ID be 1, the SVN be greater than 0,
  // and that the enclave is signed with the specified signer value.
  //
  // It also issues a claim named "My-MrSigner" whose value matches the MRSIGNER
  // SGX property.
  const newPolicy = `version= 1.0;
   authorizationrules
   {
       [ type=="x-ms-sgx-is-debuggable", value==false ] &&
       [ type=="x-ms-sgx-product-id", value==1 ] &&
       [ type=="x-ms-sgx-svn", value>= 0 ] &&
       [ type=="x-ms-sgx-mrsigner", value=="2c1a44952ae8207135c6c29b75b8c029372ee94b677e15c20bd42340f10d41aa"]
           => permit();
   };
   issuancerules {
       c:[type=="x-ms-sgx-mrsigner"] => issue(type="My-MrSigner", value=c.value);
   };`;

  // Set the new attestation policy. Set the policy as an unsecured policy.
  const setPolicyResult = await client.setPolicy(KnownAttestationType.OpenEnclave, newPolicy);

  // Verify that the attestation service received the new policy.
  console.log("Result of policy modification: ", setPolicyResult.body.policyResolution);

  // And verify that the policy received by the service was the one we sent.
  const expectedPolicy = createAttestationPolicyToken(newPolicy);
  const expectedHash = generateSha256Hash(expectedPolicy.serialize());

  console.log("Expected token hash: ", expectedHash);
  console.log("Actual token hash: ", Uint8Array.from(setPolicyResult.body.policyTokenHash));

  const policy = await client.getPolicy(KnownAttestationType.SgxEnclave);

  console.log("The SGX policy for ", endpoint, " has a value of:", policy.body);

  // Now reset the policy to the default policy.
  const resetPolicyResult = await client.resetPolicy(KnownAttestationType.OpenEnclave);

  console.log("Reset attestation policy. Policy status: ", resetPolicyResult.body.policyResolution);
}

async function setOpenEnclaveAttestationPolicyAadSecured() {
  writeBanner("Set Open Enclave Attestation Policy - Secured policy");

  // Use the specified attestion URL.
  const endpoint = process.env.ATTESTATION_AAD_URL;
  if (endpoint === undefined) {
    throw new Error("ATTESTATION_AAD_URL must be defined.");
  }

  const client = new AttestationAdministrationClient(endpoint, new DefaultAzureCredential());

  const newPolicy = `version= 1.0;
    authorizationrules
    {
        [ type=="x-ms-sgx-is-debuggable", value==false ] &&
        [ type=="x-ms-sgx-product-id", value==1 ] &&
        [ type=="x-ms-sgx-svn", value>= 0 ] &&
        [ type=="x-ms-sgx-mrsigner", value=="2c1a44952ae8207135c6c29b75b8c029372ee94b677e15c20bd42340f10d41aa"]
            => permit();
    };
    issuancerules {
        c:[type=="x-ms-sgx-mrsigner"] => issue(type="My-MrSigner", value=c.value);
    };`;

  // Set the new attestation policy. Set the policy as an secured policy.

  // Start by creating an RSA Key and Certificate (note: normally the key would
  // be stored securely in Key Value or other location. For the purposes of this
  // sample, an ephemeral key and self-signed certificate is sufficient).

  const [privateKey, publicKey] = createRSAKey();
  const certificate = createX509Certificate(privateKey, publicKey, "Test Certificate.");

  const setPolicyResult = await client.setPolicy(KnownAttestationType.OpenEnclave, newPolicy, {
    privateKey: privateKey,
    certificate: certificate,
  });

  // Verify that the attestation service received the new policy.
  console.log("Result of policy modification: ", setPolicyResult.body.policyResolution);

  // And verify that the policy received by the service was the one we sent.
  const expectedPolicy = createAttestationPolicyToken(newPolicy, privateKey, certificate);
  const expectedHash = generateSha256Hash(expectedPolicy.serialize());

  console.log("Expected token hash: ", expectedHash);
  console.log("Actual token hash: ", Uint8Array.from(setPolicyResult.body.policyTokenHash));

  // Also verify that the signer of the certificate recevied by the service was
  // the certificate sent in the request.

  const policySetCertificate = new X509();
  policySetCertificate.readCertPEM(setPolicyResult.body.policySigner?.certificates[0]);
  console.log("Signer subject name: ", policySetCertificate.getSubjectString());

  // Now reset the policy to the default policy. Note that we use an unsecured
  // attestation token - that is because AAD instances do not require a signed
  // policy token.
  const resetPolicyResult = await client.resetPolicy(KnownAttestationType.OpenEnclave);

  console.log("Reset attestation policy. Policy status: ", resetPolicyResult.body.policyResolution);
}

async function setSgxEnclaveAttestationPolicyIsolatedSecured() {
  writeBanner("Set SGX Enclave Attestation Policy - Secured policy");

  // Use the specified attestion URL.
  const endpoint = process.env.ATTESTATION_ISOLATED_URL;
  if (endpoint === undefined) {
    throw new Error("ATTESTATION_ISOLATED_URL must be defined.");
  }
  const base64PrivateKey = process.env.ATTESTATION_ISOLATED_SIGNING_KEY;
  if (base64PrivateKey === undefined) {
    throw new Error("ATTESTATION_ISOLATED_SIGNING_KEY must be provided.");
  }
  const base64Certificate = process.env.ATTESTATION_ISOLATED_SIGNING_CERTIFICATE;
  if (base64Certificate === undefined) {
    throw new Error("ATTESTATION_ISOLATED_SIGNING_CERTIFICATE must be provided.");
  }

  const client = new AttestationAdministrationClient(endpoint, new DefaultAzureCredential());

  const newPolicy = `version= 1.0;
      authorizationrules
      {
          [ type=="x-ms-sgx-is-debuggable", value==false ] &&
          [ type=="x-ms-sgx-product-id", value==1 ] &&
          [ type=="x-ms-sgx-svn", value>= 0 ] &&
          [ type=="x-ms-sgx-mrsigner", value=="2c1a44952ae8207135c6c29b75b8c029372ee94b677e15c20bd42340f10d41aa"]
              => permit();
      };
      issuancerules {
          c:[type=="x-ms-sgx-mrsigner"] => issue(type="My-MrSigner", value=c.value);
      };`;

  // Set the new attestation policy. Set the policy as an secured policy.
  //
  // Because this is an isolated instance, we need to sign policy requests with
  // one of the configured signing certificates/keys.

  const privateKey = pemFromBase64(base64PrivateKey, "PRIVATE KEY");
  const certificate = pemFromBase64(base64Certificate, "CERTIFICATE");

  const setPolicyResult = await client.setPolicy(KnownAttestationType.SgxEnclave, newPolicy, {
    privateKey: privateKey,
    certificate: certificate,
  });

  // Verify that the attestation service received the new policy.
  console.log("Result of policy modification: ", setPolicyResult.body.policyResolution);

  // And verify that the policy received by the service was the one we sent.
  const expectedPolicy = createAttestationPolicyToken(newPolicy, privateKey, certificate);
  const expectedHash = generateSha256Hash(expectedPolicy.serialize());

  console.log("Expected token hash: ", expectedHash);
  console.log("Actual token hash: ", Uint8Array.from(setPolicyResult.body.policyTokenHash));

  // Also verify that the signer of the certificate recevied by the service was
  // the certificate sent in the request.

  const policySetCertificate = new X509();
  policySetCertificate.readCertPEM(setPolicyResult.body.policySigner?.certificates[0]);
  console.log("Signer subject name: ", policySetCertificate.getSubjectString());

  // Now reset the policy to the default policy.
  const resetPolicyResult = await client.resetPolicy(KnownAttestationType.SgxEnclave, {
    privateKey: privateKey,
    certificate: certificate,
  });

  console.log("Reset attestation policy. Policy status: ", resetPolicyResult.body.policyResolution);
}

export type PemType = "CERTIFICATE" | "PRIVATE KEY";

/**
 *
 * @param base64 - Base64 encoded DER object to encode as PEM.
 * @param pemType - PEM object type - typically "CERTIFICATE" |
 */
export function pemFromBase64(base64: string, pemType: PemType): string {
  let pem = "-----BEGIN " + pemType + "-----\n";
  while (base64 !== "") {
    pem += base64.substr(0, 64) + "\n";
    base64 = base64.substr(64);
  }
  pem += "-----END " + pemType + "-----\n";

  return pem;
}

export async function main() {
  await setOpenEnclaveAttestationPolicyAadUnsecured();
  await setOpenEnclaveAttestationPolicyAadSecured();
  await setSgxEnclaveAttestationPolicyIsolatedSecured();
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates the use of a Attestation Instance to retrieve an attestation policy.
 */

import { AttestationClient } from "@azure/attestation";
import { DefaultAzureCredential } from "@azure/identity";

import { X509 } from "jsrsasign";

// Load environment from a .env file if it exists.
import * as dotenv from "dotenv";
import { write_banner } from "./utils/helpers";
dotenv.config();

async function getOpenIdMetadata() {
  write_banner("getOpenIdMetadata")
  const endpoint = process.env.ATTESTATION_AAD_URL ?? "https://sharedwus.wus.attest.azure.net";

  console.log("Retrieve OpenID metadata from: ", endpoint);
  const client = new AttestationClient(new DefaultAzureCredential(), endpoint);

  const defaultOpenIdMetadata = await client.getOpenIdMetadata();

  console.log("OpenID Certificate endpoint: ", defaultOpenIdMetadata.jwks_uri);
}

async function getSigningCertificates() {
  write_banner("getSigningCertificates")
  const endpoint = process.env.ATTESTATION_AAD_URL ?? "https://sharedwus.wus.attest.azure.net";

  console.log("Retrieve attestation signing certificates for: ", endpoint);
  const client = new AttestationClient(new DefaultAzureCredential(), endpoint);

  const attestationSigners = await client.getAttestationSigners();

  console.log(`There are ${attestationSigners.length} signers`);

  attestationSigners.forEach(element => {
    console.log(`  Element Key ID: ${element.keyId};`);
    const cert = new X509();
    cert.readCertPEM(element.certificates[0]);
    console.log(`    Certificate subject: ${cert.subject_name}`);
  });
}


export async function main() {

  await getOpenIdMetadata();
  await getSigningCertificates();

}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

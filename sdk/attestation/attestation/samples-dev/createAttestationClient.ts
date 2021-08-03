// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates the creation of a Attestation Client and Attestation
 * Administration Client.
 *
 * FILE: createAttestationClient.ts
 *
 * DESCRIPTION:
 *  This sample demonstrates creating a new attestation client.
 *
 *  Set the following environment variables with your own values before running
 *  the samples:
 *
 *  1) ATTESTATION_AAD_URL - the base URL for an attestation service instance in AAD mode.
 *
 * To authorize access to the service, this sample also depends on the following
 * environment variables:
 *  AZURE_TENANT_ID - AAD Tenant ID used to authenticate the user.
 *  AZURE_CLIENT_ID - AAD Client ID used to authenticate the user.
 *  AZURE_CLIENT_SECRET - AAD Secret used to authenticate the client.
 */

import { AttestationClient } from "@azure/attestation";
import { DefaultAzureCredential } from "@azure/identity";

import { X509 } from "jsrsasign";

// Load environment from a .env file if it exists.
import * as dotenv from "dotenv";
import { writeBanner } from "./utils/helpers";
dotenv.config();

async function getOpenIdMetadata() {
  writeBanner("getOpenIdMetadata");
  const endpoint = process.env.ATTESTATION_AAD_URL;

  if (!endpoint) {
    throw new Error("ATTESTATION_AAD_URL must be provided.");
  }

  console.log("Retrieve OpenID metadata from: ", endpoint);
  const client = new AttestationClient(endpoint);

  const defaultOpenIdMetadata = await client.getOpenIdMetadata();

  console.log("OpenID Certificate endpoint: ", defaultOpenIdMetadata.jwks_uri);
}

async function getOpenIdMetadataAnonymously() {
  writeBanner("getOpenIdMetadata - Anonymously.");
  const endpoint = process.env.ATTESTATION_AAD_URL;

  if (!endpoint) {
    throw new Error("ATTESTATION_AAD_URL must be provided.");
  }

  console.log("Retrieve OpenID metadata from: ", endpoint);
  const client = new AttestationClient(endpoint);

  const defaultOpenIdMetadata = await client.getOpenIdMetadata();

  console.log("OpenID Certificate endpoint: ", defaultOpenIdMetadata.jwks_uri);
}

async function getSigningCertificates() {
  writeBanner("getSigningCertificates");
  const endpoint = process.env.ATTESTATION_AAD_URL;

  if (!endpoint) {
    throw new Error("ATTESTATION_AAD_URL must be provided.");
  }

  console.log("Retrieve attestation signing certificates for: ", endpoint);
  const client = new AttestationClient(endpoint, new DefaultAzureCredential());

  const attestationSigners = await client.getAttestationSigners();

  console.log(`There are ${attestationSigners.length} signers`);

  // Now print the Key ID and certificate subject for each signer.
  attestationSigners.forEach((element) => {
    console.log(`  Element Key ID: ${element.keyId};`);
    const cert = new X509();
    cert.readCertPEM(element.certificates[0]);
    console.log(`    Certificate subject: ${cert.getSubjectString()}`);
  });
}

export async function main() {
  await getOpenIdMetadata();
  await getOpenIdMetadataAnonymously();
  await getSigningCertificates();
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

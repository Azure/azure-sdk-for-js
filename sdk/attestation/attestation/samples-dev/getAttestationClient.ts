// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// /**
//  * @summary Demonstrates the use of a Attestation Instance to retrieve an attestation policy.
//  */

// import { AttestationAdministrationClient } from "@azure/attestation";
// import { DefaultAzureCredential } from "@azure/identity";

// export async function main() {
//   const endpoint = process.env.ATTESTATION_AAD_URL ?? "<endpoint>";

//   const client = new AttestationAdministrationClient(endpoint, new DefaultAzureCredential());

//   const policy = await client.getPolicy(KnownAttestationType.SgxEnclave);

//   console.log("The setting has a value of:", policy.value);
//   console.log("Details:", policy);
// }

// main().catch((err) => {
//   console.error("The sample encountered an error:", err);
// });

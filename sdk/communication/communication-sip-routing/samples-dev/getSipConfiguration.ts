// // Copyright (c) Microsoft Corporation.
// // Licensed under the MIT License.

// /**
//  * @summary Demonstrates the use of a SipClient to retrieve a SIP configuration.
//  */

// import { SipClient } from "@azure/communication-sip";
// import { DefaultAzureCredential } from "@azure/identity";

// export async function main() {
//   const endpoint = process.env.APPCONFIG_ENDPOINT ?? "<endpoint>";

//   const client = new SipClient(endpoint, new DefaultAzureCredential());

//   const sipConfig = await client.getSipConfiguration();

//   console.log("The setting has a value of:", sipConfig);
// }

// main().catch((err) => {
//   console.error("The sample encountered an error:", err);
// });

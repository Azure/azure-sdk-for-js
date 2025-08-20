// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureKeyCredential } from "@azure/core-auth";
import { RecipientVerificationClient } from "@azure-tools/communication-recipient-verification";
import { DefaultAzureCredential } from "@azure/identity";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("ReadmeSampleCreateClient_ConnectionString", async () => {
    const connectionString = "endpoint=<endpoint>;accessKey=<accessKey>";
    const client = new RecipientVerificationClient(connectionString);
  });

  it("ReadmeSampleCreateClient_KeyCredential", async () => {
    const credential = new AzureKeyCredential("<key-from-resource>");
    const client = new RecipientVerificationClient("<endpoint-from-resource>", credential);
  });

  it("ReadmeSampleCreateClient_DefaultAzureCredential", async () => {
    const credential = new DefaultAzureCredential();
    const client = new RecipientVerificationClient("<endpoint-from-resource>", credential);
  });

  it("ReadmeSampleRequestVerification", async () => {
    const credential = new DefaultAzureCredential();
    const client = new RecipientVerificationClient("<endpoint-from-resource>", credential);
    // @ts-preserve-whitespace
    // body of the request
    const VerificationRequest = {
      identity: "+11234567890",
      channel: "sms",
    };
    // @ts-preserve-whitespace
    // get the verification status
    const status = await client.requestVerification(VerificationRequest);
    console.log(status);
  });

  it("ReadmeSampleVerifyIdentity", async () => {
    const credential = new DefaultAzureCredential();
    const client = new RecipientVerificationClient("<endpoint-from-resource>", credential);
    // @ts-preserve-whitespace
    // id that is used to reference users phone number
    const verificationId = "7e5dd7e1-5203-41ab-960e-65c1eb804fc6";
    // @ts-preserve-whitespace
    // body of the request
    const VerificationRequest = {
      verificationCode: "1234567",
    };
    // @ts-preserve-whitespace
    // verifying your phone number
    const status = await client.verifyIdentity(verificationId, VerificationRequest);
    console.log(status);
  });

  it("ReadmeSampleDeleteVerification", async () => {
    const credential = new DefaultAzureCredential();
    const client = new RecipientVerificationClient("<endpoint-from-resource>", credential);
    // @ts-preserve-whitespace
    // id that is used to reference users phone number
    const verificationId = "4d313ff0-3aeb-477e-8c15-7c9a893e8999";
    // @ts-preserve-whitespace
    // delete verification for a resource
    await client.deleteVerification(verificationId);
  });

  it("ReadmeSampleGetVerifications", async () => {
    const credential = new DefaultAzureCredential();
    const client = new RecipientVerificationClient("<endpoint-from-resource>", credential);
    // @ts-preserve-whitespace
    // get all verifications for a resource
    const verifications = await client.getVerifications();
    // @ts-preserve-whitespace
    // print all verifications
    for await (const verification of verifications) {
      console.log(verification);
    }
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});

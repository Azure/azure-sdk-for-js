// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureKeyCredential, AzureNamedKeyCredential, AzureSASCredential } from "@azure/core-auth";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("ReadmeSampleAzureKeyCredential", () => {
    const credential = new AzureKeyCredential("secret value");
    // @ts-preserve-whitespace
    console.log(credential.key); // prints: "secret value"
    // @ts-preserve-whitespace
    credential.update("other secret value");
    // @ts-preserve-whitespace
    console.log(credential.key); // prints: "other secret value"
  });

  it("ReadmeSampleAzureNamedCredential", () => {
    const credential = new AzureNamedKeyCredential("ManagedPolicy", "secret value");
    // @ts-preserve-whitespace
    console.log(`${credential.name}, ${credential.key}`); // prints: "ManagedPolicy, secret value"
    // @ts-preserve-whitespace
    credential.update("OtherManagedPolicy", "other secret value");
    // @ts-preserve-whitespace
    console.log(`${credential.name}, ${credential.key}`); // prints: "OtherManagedPolicy, other secret value"
  });

  it("ReadmeSampleSASCredential", () => {
    const credential = new AzureSASCredential("signature1");
    // @ts-preserve-whitespace
    console.log(credential.signature); // prints: "signature1"
    // @ts-preserve-whitespace
    credential.update("signature2");
    // @ts-preserve-whitespace
    console.log(credential.signature); // prints: "signature2"
  });
});

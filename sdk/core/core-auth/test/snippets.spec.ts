// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureKeyCredential, AzureNamedKeyCredential, AzureSASCredential } from "@azure/core-auth";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("azure_key_credential", () => {
    const credential = new AzureKeyCredential("secret value");
    // prints: "secret value"
    console.log(credential.key);
    credential.update("other secret value");
    // prints: "other secret value"
    console.log(credential.key);
  });

  it("azure_named_key_credential", () => {
    const credential = new AzureNamedKeyCredential("ManagedPolicy", "secret value");
    // prints: "ManagedPolicy, secret value"
    console.log(`${credential.name}, ${credential.key}`);
    credential.update("OtherManagedPolicy", "other secret value");
    // prints: "OtherManagedPolicy, other secret value"
    console.log(`${credential.name}, ${credential.key}`);
  });

  it("azure_sas_credential", () => {
    const credential = new AzureSASCredential("signature1");
    // prints: "signature1"
    console.log(credential.signature);
    credential.update("signature2");
    // prints: "signature2"
    console.log(credential.signature);
  });
});

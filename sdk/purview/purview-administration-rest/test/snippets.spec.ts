// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PurviewAccount, PurviewMetadataPolicies } from "../src/index.js";
import { DefaultAzureCredential } from "@azure/identity";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("ReadmeSampleCreateClient_Node", async () => {
    const accountClient = PurviewAccount.createClient(
      "https://<my-account-name>.purview.azure.com",
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    const metadataClient = PurviewMetadataPolicies.createClient(
      "https://<my-account-name>.purview.azure.com",
      new DefaultAzureCredential(),
    );
  });

  it("ReadmeSampleGetCollections", async () => {
    const accountClient = PurviewAccount.createClient(
      "https://<my-account-name>.purview.azure.com",
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    const response = await accountClient.path("/collections").get();
    // @ts-preserve-whitespace
    if (PurviewAccount.UnexpectedHelper.isUnexpected(response)) {
      throw response.body.error;
    }
    // @ts-preserve-whitespace
    const paginated = PurviewAccount.PaginateHelper.paginate(accountClient, response);
    for await (const collection of paginated) {
      console.log(
        `Collection name: ${collection.name}\tCollection description: ${collection.description}`,
      );
    }
  });

  it("ReadmeSampleGetMetadataPolicies", async () => {
    const metadataClient = PurviewMetadataPolicies.createClient(
      "https://<my-account-name>.purview.azure.com",
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    const response = await metadataClient.path("/metadataPolicies").get();
    // @ts-preserve-whitespace
    if (PurviewMetadataPolicies.UnexpectedHelper.isUnexpected(response)) {
      throw response.body.error;
    }
    // @ts-preserve-whitespace
    const policies = PurviewMetadataPolicies.PaginateHelper.paginate(metadataClient, response);
    // @ts-preserve-whitespace
    for await (const policy of policies) {
      if (Array.isArray(policy)) {
        console.error("Unexpected array:", policy);
      } else {
        console.log(`Policy name: ${policy.name}`);
      }
    }
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});

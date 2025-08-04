// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import ConfidentialLedger, {
  CreateLedgerEntryParameters,
  LedgerEntry,
  getLedgerIdentity,
  isUnexpected,
} from "../src/index.js";
import { DefaultAzureCredential } from "@azure/identity";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("ReadmeSampleCreateClient_Node", async () => {
    const { ledgerIdentityCertificate } = await getLedgerIdentity(
      "test-ledger-name",
      "https://identity.confidential-ledger.core.azure.com",
    );
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const client = ConfidentialLedger(
      "https://test-ledger-name.confidential-ledger.azure.com",
      ledgerIdentityCertificate,
      credential,
    );
  });

  it("ReadmeSampleCreateClient_Certificate", async () => {
    // Get the signing certificate from the Confidential Ledger Identity Service
    const { ledgerIdentityCertificate } = await getLedgerIdentity(
      "test-ledger-name",
      "https://identity.confidential-ledger.core.azure.com",
    );
    // @ts-preserve-whitespace
    // both cert (certificate key) and key (private key) are in PEM format
    const cert = "<PUBLIC_CERTIFICATE>";
    const key = "<PRIVATE_KEY>";
    // @ts-preserve-whitespace
    // Create the Confidential Ledger Client
    const client = ConfidentialLedger(
      "https://test-ledger-name.confidential-ledger.azure.com",
      ledgerIdentityCertificate,
      {
        tlsOptions: {
          cert,
          key,
        },
      },
    );
  });

  it("ReadmeSamplePostLedgerEntry", async () => {
    const { ledgerIdentityCertificate } = await getLedgerIdentity(
      "test-ledger-name",
      "https://identity.confidential-ledger.core.azure.com",
    );
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const client = ConfidentialLedger(
      "https://test-ledger-name.confidential-ledger.azure.com",
      ledgerIdentityCertificate,
      credential,
    );
    // @ts-preserve-whitespace
    const entry: LedgerEntry = {
      contents: "<content>",
    };
    const ledgerEntry: CreateLedgerEntryParameters = {
      contentType: "application/json",
      body: entry,
    };
    const result = await client.path("/app/transactions").post(ledgerEntry);
  });

  it("ReadmeSamplePostLedgerEntryWithCollectionId", async () => {
    const { ledgerIdentityCertificate } = await getLedgerIdentity(
      "test-ledger-name",
      "https://identity.confidential-ledger.core.azure.com",
    );
    const credential = new DefaultAzureCredential();
    const client = ConfidentialLedger(
      "https://test-ledger-name.confidential-ledger.azure.com",
      ledgerIdentityCertificate,
      credential,
    );
    // Type assertion is used to allow collectionId
    const entry: LedgerEntry = {
      contents: "<content>",
    };
    const ledgerEntry: CreateLedgerEntryParameters = {
      queryParameters: {
        collectionId: "my collection",
      },
      contentType: "application/json",
      body: entry,
    };
    const result = await client.path("/app/transactions").post(ledgerEntry);
  });

  it("ReadmeSamplePostLedgerEntryWithCollectionIdAndTags", async () => {
    const { ledgerIdentityCertificate } = await getLedgerIdentity(
      "test-ledger-name",
      "https://identity.confidential-ledger.core.azure.com",
    );
    const credential = new DefaultAzureCredential();
    const client = ConfidentialLedger(
      "https://test-ledger-name.confidential-ledger.azure.com",
      ledgerIdentityCertificate,
      credential,
    );
    // Type assertion is used to allow collectionId and tags
    const entry: LedgerEntry = {
      contents: "<content>",
    };
    const ledgerEntry: CreateLedgerEntryParameters = {
      queryParameters: {
        tags: "tag1,tag2",
      },
      contentType: "application/json",
      body: entry,
    };
    const result = await client.path("/app/transactions").post(ledgerEntry);
  });

  it("ReadmeSampleGetLedgerEntry", async () => {
    const { ledgerIdentityCertificate } = await getLedgerIdentity(
      "test-ledger-name",
      "https://identity.confidential-ledger.core.azure.com",
    );
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const client = ConfidentialLedger(
      "https://test-ledger-name.confidential-ledger.azure.com",
      ledgerIdentityCertificate,
      credential,
    );
    // @ts-preserve-whitespace
    const transactionId = "<TRANSACTION_ID>";
    const status = await client
      .path("/app/transactions/{transactionId}/status", transactionId)
      .get();
  });

  it("ReadmeSampleGetLedgerEntryWithCollectionIdSample", async () => {
    const { ledgerIdentityCertificate } = await getLedgerIdentity(
      "test-ledger-name",
      "https://identity.confidential-ledger.core.azure.com",
    );
    const credential = new DefaultAzureCredential();
    const client = ConfidentialLedger(
      "https://test-ledger-name.confidential-ledger.azure.com",
      ledgerIdentityCertificate,
      credential,
    );
    const transactionId = "<TRANSACTION_ID>";
    const getLedgerEntryParams = {
      queryParameters: { collectionId: "my-collection" },
    };
    const result = await client
      .path("/app/transactions/{transactionId}", transactionId)
      .get(getLedgerEntryParams);
  });

  it("ReadmeSampleGetLedgerEntryWithCollectionIdAndTagSample", async () => {
    const { ledgerIdentityCertificate } = await getLedgerIdentity(
      "test-ledger-name",
      "https://identity.confidential-ledger.core.azure.com",
    );
    const credential = new DefaultAzureCredential();
    const client = ConfidentialLedger(
      "https://test-ledger-name.confidential-ledger.azure.com",
      ledgerIdentityCertificate,
      credential,
    );
    const transactionId = "<TRANSACTION_ID>";
    const getLedgerEntryParams = {
      queryParameters: { collectionId: "my-collection", tag: "tag1" },
    };
    const result = await client
      .path("/app/transactions/{transactionId}", transactionId)
      .get(getLedgerEntryParams);
  });

  it("ReadmeSampleGetAllLedgerEntries", async () => {
    const { ledgerIdentityCertificate } = await getLedgerIdentity(
      "test-ledger-name",
      "https://identity.confidential-ledger.core.azure.com",
    );
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const client = ConfidentialLedger(
      "https://test-ledger-name.confidential-ledger.azure.com",
      ledgerIdentityCertificate,
      credential,
    );
    // @ts-preserve-whitespace
    const ledgerEntries = await client.path("/app/transactions");
  });

  it("ReadmeSampleGetAllLedgerEntriesWithCollectionIdSample", async () => {
    const { ledgerIdentityCertificate } = await getLedgerIdentity(
      "test-ledger-name",
      "https://identity.confidential-ledger.core.azure.com",
    );
    const credential = new DefaultAzureCredential();
    const client = ConfidentialLedger(
      "https://test-ledger-name.confidential-ledger.azure.com",
      ledgerIdentityCertificate,
      credential,
    );
    const getLedgerEntriesParams = {
      queryParameters: { collectionId: "my-collection" },
    };
    const ledgerEntries = await client.path("/app/transactions").get(getLedgerEntriesParams);
  });

  it("ReadmeSampleGetAllLedgerEntriesWithCollectionIdAndTagSample", async () => {
    const { ledgerIdentityCertificate } = await getLedgerIdentity(
      "test-ledger-name",
      "https://identity.confidential-ledger.core.azure.com",
    );
    const credential = new DefaultAzureCredential();
    const client = ConfidentialLedger(
      "https://test-ledger-name.confidential-ledger.azure.com",
      ledgerIdentityCertificate,
      credential,
    );
    const getLedgerEntriesParams = {
      queryParameters: { collectionId: "my-collection", tag: "tag1" },
    };
    const ledgerEntries = await client.path("/app/transactions").get(getLedgerEntriesParams);
  });

  it("ReadmeSampleGetAllCollections", async () => {
    const { ledgerIdentityCertificate } = await getLedgerIdentity(
      "test-ledger-name",
      "https://identity.confidential-ledger.core.azure.com",
    );
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const client = ConfidentialLedger(
      "https://test-ledger-name.confidential-ledger.azure.com",
      ledgerIdentityCertificate,
      credential,
    );
    // @ts-preserve-whitespace
    const result = await client.path("/app/collections").get();
  });

  it("ReadmeSampleGetTransactionsForCollection", async () => {
    const { ledgerIdentityCertificate } = await getLedgerIdentity(
      "test-ledger-name",
      "https://identity.confidential-ledger.core.azure.com",
    );
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const client = ConfidentialLedger(
      "https://test-ledger-name.confidential-ledger.azure.com",
      ledgerIdentityCertificate,
      credential,
    );
    // @ts-preserve-whitespace
    const getLedgerEntriesParams = { queryParameters: { collectionId: "my collection" } };
    const ledgerEntries = await client.path("/app/transactions").get(getLedgerEntriesParams);
  });

  it("ReadmeSampleListEnclaveQuotes", async () => {
    const { ledgerIdentityCertificate } = await getLedgerIdentity(
      "test-ledger-name",
      "https://identity.confidential-ledger.core.azure.com",
    );
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const client = ConfidentialLedger(
      "https://test-ledger-name.confidential-ledger.azure.com",
      ledgerIdentityCertificate,
      credential,
    );
    // @ts-preserve-whitespace
    // Get enclave quotes
    const enclaveQuotes = await client.path("/app/enclaveQuotes").get();
    // @ts-preserve-whitespace
    // Check for non-success response
    if (isUnexpected(enclaveQuotes)) {
      throw enclaveQuotes;
    }
    // @ts-preserve-whitespace
    // Log all the enclave quotes' nodeId
    Object.keys(enclaveQuotes.body.enclaveQuotes).forEach((key) => {
      console.log(enclaveQuotes.body.enclaveQuotes[key].nodeId);
    });
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});

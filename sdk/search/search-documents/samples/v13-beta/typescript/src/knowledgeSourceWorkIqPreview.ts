// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Preview sample for a `workIQ` knowledge source configured with a
 * customer-owned Microsoft Entra application.
 *
 * Lifecycle: create KS → read back → attach to KB → retrieve (with
 * a delegated user token) → teardown.
 *
 * Prerequisites:
 *   - Enable a managed identity on the Search service.
 *   - Configure a federated credential on the customer-owned Entra app for
 *     that Search managed identity. Do not use an app secret here.
 *   - Set `WORKIQ_APPLICATION_ID` and `WORKIQ_FEDERATED_CREDENTIAL_ID`.
 *   - `WORKIQ_TENANT_ID` is optional; when omitted, the service uses the
 *     Search service tenant.
 *   - `WORK_IQ_USER_ASSERTION` is the delegated user assertion used only for
 *     Work IQ on-behalf-of authentication.
 *   - `SEARCH_QUERY_SOURCE_AUTHORIZATION` is optional and independently
 *     controls Search document-level authorization.
 *
 * Creating the knowledge source proves only that the configuration is valid.
 * It does not prove that federation or token exchange succeeds; only a live
 * retrieve with a real user assertion can prove that.
 */

import { DefaultAzureCredential } from "@azure/identity";
import type { KnowledgeBase, WorkIQKnowledgeSource } from "@azure/search-documents";
import { KnowledgeRetrievalClient, SearchIndexClient } from "@azure/search-documents";

import * as dotenv from "dotenv";
dotenv.config();

const endpoint = process.env.ENDPOINT || "";
const applicationId = process.env.WORKIQ_APPLICATION_ID || "";
const federatedCredentialId = process.env.WORKIQ_FEDERATED_CREDENTIAL_ID || "";
const tenantId = process.env.WORKIQ_TENANT_ID || undefined;
const workIQUserAssertion = process.env.WORK_IQ_USER_ASSERTION || "";
const searchAuthorization = process.env.SEARCH_QUERY_SOURCE_AUTHORIZATION || undefined;

const KNOWLEDGE_SOURCE_NAME = "example-knowledge-source-workiq-preview-sample";
const KNOWLEDGE_BASE_NAME = "example-kb-for-workiq-ks-preview-sample";

async function main(): Promise<void> {
  console.log(`Running Knowledge Source Work IQ Preview Sample....`);
  if (!endpoint || !applicationId || !federatedCredentialId) {
    console.log(
      "Set ENDPOINT, WORKIQ_APPLICATION_ID, and WORKIQ_FEDERATED_CREDENTIAL_ID before running.",
    );
    return;
  }

  const credential = new DefaultAzureCredential();
  const client = new SearchIndexClient(endpoint, credential);

  const workIQ: WorkIQKnowledgeSource = {
    name: KNOWLEDGE_SOURCE_NAME,
    kind: "workIQ",
    description: "Retrieves Work IQ signals scoped to the calling user.",
    workIQParameters: {
      entraAppAuthentication: {
        applicationId,
        federatedCredentialId,
        tenantId,
      },
    },
  };

  try {
    // 1. Create / read back.
    const created = await client.createKnowledgeSource(workIQ);
    console.log(`Created ${created.kind} knowledge source: ${created.name}`);
    const fetched = await client.getKnowledgeSource(KNOWLEDGE_SOURCE_NAME);
    console.log(`Read back: ${fetched.name}`);

    // 2. Attach to KB.
    const knowledgeBase: KnowledgeBase = {
      name: KNOWLEDGE_BASE_NAME,
      description: "Knowledge base wired to a Work IQ knowledge source.",
      knowledgeSources: [{ name: KNOWLEDGE_SOURCE_NAME }],
    };
    await client.createKnowledgeBase(knowledgeBase);
    console.log(`Attached ${KNOWLEDGE_SOURCE_NAME} to ${KNOWLEDGE_BASE_NAME}`);

    // 3. Retrieve. Work IQ needs a delegated user token.
    if (!workIQUserAssertion) {
      console.log(
        "Skipping retrieve: set WORK_IQ_USER_ASSERTION to a delegated Work IQ user assertion. " +
          "CRUD alone does not prove federation or token exchange.",
      );
      return;
    }
    const retrievalClient = new KnowledgeRetrievalClient(endpoint, KNOWLEDGE_BASE_NAME, credential);
    const response = await retrievalClient.retrieve(
      {
        intents: [{ type: "semantic", search: "What did I work on this week?" }],
        includeActivity: true,
      },
      {
        querySourceAuthorization: searchAuthorization,
        queryWorkIQSourceAuthorization: workIQUserAssertion,
      },
    );
    console.log(`Retrieve activity records: ${response.activity?.length ?? 0}`);
    console.log(
      `Work IQ references: ${(response.references ?? []).filter((ref) => ref.type === "workIQ").length}`,
    );
  } finally {
    await client.deleteKnowledgeBase(KNOWLEDGE_BASE_NAME).catch(() => {});
    await client.deleteKnowledgeSource(KNOWLEDGE_SOURCE_NAME).catch(() => {});
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

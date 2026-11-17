// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Ingest OneLake folder/lakehouse permissions and compare retrieval under
 * allowed and denied user identities. This requires a real, preconfigured Fabric ACL fixture.
 *
 * Set ENDPOINT, FABRIC_WORKSPACE_ID, ONELAKE_LAKEHOUSE_ID, ONELAKE_TARGET_PATH,
 * ONELAKE_ALLOWED_USER_TOKEN, ONELAKE_DENIED_USER_TOKEN, and ONELAKE_TEST_QUERY.
 * The query must uniquely identify a document in that folder: the first user can
 * read it, the second has no access to ANY document in the selected folder.
 * Tokens must be valid delegated user tokens accepted by OneLake security integration.
 * Search's identity needs the documented Fabric ingestion permissions and connectivity.
 *
 * Search administration uses DefaultAzureCredential or AZURE_SEARCH_API_KEY, separately
 * from the user tokens. The sample never enables elevated read. It reads existing Fabric
 * content but creates/removes only its own Search knowledge source and knowledge base.
 */

const assert = require("node:assert/strict");
const { randomUUID } = require("node:crypto");
const { delay } = require("@azure/core-util");
const { DefaultAzureCredential } = require("@azure/identity");
const { AzureKeyCredential, SearchIndexClient } = require("@azure/search-documents");
require("dotenv/config");

async function main() {
  const endpoint = process.env.ENDPOINT;
  const fabricWorkspaceId = process.env.FABRIC_WORKSPACE_ID;
  const lakehouseId = process.env.ONELAKE_LAKEHOUSE_ID;
  const targetPath = process.env.ONELAKE_TARGET_PATH;
  const allowedToken = process.env.ONELAKE_ALLOWED_USER_TOKEN;
  const deniedToken = process.env.ONELAKE_DENIED_USER_TOKEN;
  const query = process.env.ONELAKE_TEST_QUERY;
  assert(
    endpoint &&
      fabricWorkspaceId &&
      lakehouseId &&
      targetPath &&
      allowedToken &&
      deniedToken &&
      query,
    "Set the OneLake settings, two user tokens, and a fixture-specific query.",
  );
  assert.notEqual(allowedToken, deniedToken, "Use distinct allowed and denied users.");
  const credential = process.env.AZURE_SEARCH_API_KEY
    ? new AzureKeyCredential(process.env.AZURE_SEARCH_API_KEY)
    : new DefaultAzureCredential();
  const client = new SearchIndexClient(endpoint, credential, {
    serviceVersion: "2026-11-01-preview",
  });
  const sourceName = `sample-onelake-${randomUUID()}`;
  const baseName = `kb-${sourceName}`;
  const cleanup = [];
  try {
    await client.createKnowledgeSource({
      name: sourceName,
      kind: "indexedOneLake",
      indexedOneLakeParameters: {
        fabricWorkspaceId,
        lakehouseId,
        targetPath,
        ingestionParameters: {
          contentExtractionMode: "minimal",
          ingestionPermissionOptions: ["oneLakeParentFolders", "oneLakeLakehouseId"],
        },
      },
    });
    cleanup.push(() => client.deleteKnowledgeSource(sourceName));
    for (let attempt = 0; ; attempt++) {
      const status = await client.getKnowledgeSourceStatus(sourceName);
      const last = status.lastSynchronizationState;
      if (last?.endTime) {
        assert.equal(
          last.itemsUpdatesFailed,
          0,
          "OneLake ingestion failed; inspect source status.",
        );
        assert(
          last.itemsUpdatesProcessed && last.itemsUpdatesProcessed > 0,
          "The fixture must contain documents.",
        );
        break;
      }
      assert(attempt < 60, "Timed out waiting for OneLake ingestion.");
      await delay(10_000);
    }
    await client.createKnowledgeBase({
      name: baseName,
      knowledgeSources: [{ name: sourceName }],
      retrievalReasoningEffort: { kind: "minimal" },
      outputMode: "extractiveData",
    });
    cleanup.push(() => client.deleteKnowledgeBase(baseName));
    const retrieval = client.getKnowledgeRetrievalClient(baseName);
    const request = {
      intents: [{ type: "semantic", search: query }],
      includeActivity: true,
    };
    const allowed = await retrieval.retrieve(request, { querySourceAuthorization: allowedToken });
    assert(allowed.references?.length, "The allowed user must retrieve the fixture document.");
    assert(
      !allowed.activity?.some((activity) => activity.error),
      "Allowed-user retrieval must not fail silently.",
    );
    const denied = await retrieval.retrieve(request, { querySourceAuthorization: deniedToken });
    assert(
      !denied.activity?.some((activity) => activity.error),
      "An upstream error is not proof of ACL enforcement.",
    );
    assert.equal(
      denied.references?.length ?? 0,
      0,
      "The denied user must not retrieve any fixture documents.",
    );
    console.log("OneLake permission filtering verified for the two configured users.");
  } finally {
    for (const remove of cleanup.reverse()) {
      await remove().catch((error) => {
        console.error(
          "Owned-resource cleanup failed:",
          error instanceof Error ? error.message : "Unknown error",
        );
        process.exitCode = 1;
      });
    }
  }
}

main().catch((error) => {
  console.error("Sample failed:", error instanceof Error ? error.message : "Unknown error");
  process.exitCode = 1;
});

module.exports = { main };

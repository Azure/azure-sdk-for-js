// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { env, Recorder } from "@azure-tools/test-recorder";
import { delay } from "@azure/core-util";
import { afterEach, assert, beforeEach, describe, it } from "vitest";
import type { KnowledgeBase, KnowledgeSource, SearchIndexClient } from "../../../../src/index.js";
import { defaultServiceVersion } from "../../../../src/serviceUtils.js";
import type { Hotel } from "../../utils/interfaces.js";
import { createClients } from "../../utils/recordedClient.js";
import { createRandomIndexName, createIndex, WAIT_TIME } from "../../utils/setup.js";

describe("SearchIndexClient (Preview)", { timeout: 20_000 }, () => {
  describe("Knowledge features", () => {
    let recorder: Recorder;
    let indexClient: SearchIndexClient;
    let TEST_INDEX_NAME: string;
    let knowledgeBase: KnowledgeBase;
    let knowledgeSource: KnowledgeSource;

    beforeEach(async (ctx) => {
      recorder = new Recorder(ctx);
      TEST_INDEX_NAME = createRandomIndexName();
      ({ indexClient, indexName: TEST_INDEX_NAME } = await createClients<Hotel>(
        defaultServiceVersion,
        recorder,
        TEST_INDEX_NAME,
      ));
      knowledgeSource = {
        kind: "searchIndex",
        name: `search-ks-${TEST_INDEX_NAME}`,
        searchIndexParameters: {
          searchIndexName: TEST_INDEX_NAME,
          searchFields: [{ name: "hotelName" }, { name: "description" }],
          semanticConfigurationName: "semantic-configuration",
        },
      };
      knowledgeBase = {
        name: `knowledge-base-${TEST_INDEX_NAME}`,
        knowledgeSources: [{ name: knowledgeSource.name }],
      } as any;

      await createIndex(indexClient, TEST_INDEX_NAME, defaultServiceVersion);
      await delay(WAIT_TIME);
    });

    afterEach(async () => {
      await indexClient.deleteIndex(TEST_INDEX_NAME);
      await delay(WAIT_TIME);
      await recorder?.stop();
    });
    describe("#indexes", () => {
      it("gets index statistics summary", async () => {
        let stats;
        for await (const elem of indexClient.listIndexStatsSummary()) {
          if (elem.name === TEST_INDEX_NAME) {
            stats = elem;
          }
        }

        assert.deepEqual(stats, {
          name: TEST_INDEX_NAME,
          documentCount: 0,
          storageSize: 0,
          vectorIndexSize: 0,
        });
      });
    });

    // TODO: KnowledgeBase models property is optional in the service but there's a mismatch with the SDK.
    // Currently casting it as any to make the tests pass. Need to fix this in the SDK.
    describe("#knowledgeBase", () => {
      beforeEach(async () => {
        await indexClient.createKnowledgeSource(knowledgeSource);
        await indexClient.createKnowledgeBase(knowledgeBase);
        await delay(WAIT_TIME);
      });

      afterEach(async () => {
        await indexClient.deleteKnowledgeBase(knowledgeBase.name).catch(() => {});
        await indexClient.deleteKnowledgeSource(knowledgeSource.name).catch(() => {});
      });

      it("creates knowledge base with correct properties", async () => {
        const createdBase = await indexClient.getKnowledgeBase(knowledgeBase.name);
        assert.equal(createdBase.name, knowledgeBase.name);
        assert.exists(createdBase.knowledgeSources);
        assert.isTrue(createdBase.knowledgeSources!.length > 0);
        assert.equal(createdBase.knowledgeSources![0].name, knowledgeSource.name);
      });

      it("updates knowledge base", async () => {
        const updatedBase = await indexClient.createOrUpdateKnowledgeBase(knowledgeBase.name, {
          name: knowledgeBase.name,
          description: "updated knowledge base description",
          knowledgeSources: [{ name: knowledgeSource.name }],
        } as any);
        assert.equal(updatedBase.description, "updated knowledge base description");

        const fetchedBase = await indexClient.getKnowledgeBase(knowledgeBase.name);
        assert.equal(fetchedBase.description, "updated knowledge base description");
      });

      it("gets knowledge base", async () => {
        const fetchedBase = await indexClient.getKnowledgeBase(knowledgeBase.name);
        assert.equal(fetchedBase.name, knowledgeBase.name);
        assert.exists(fetchedBase.knowledgeSources);
        assert.equal(fetchedBase.knowledgeSources![0].name, knowledgeSource.name);
      });

      it("lists knowledge bases", async () => {
        const knowledgeBases: string[] = [];
        for await (const kb of indexClient.listKnowledgeBases()) {
          knowledgeBases.push(kb.name!);
        }
        assert.isTrue(knowledgeBases.includes(knowledgeBase.name));
      });

      it("deletes knowledge base", async () => {
        await indexClient.deleteKnowledgeBase(knowledgeBase.name);
        let deleted = false;
        try {
          await indexClient.getKnowledgeBase(knowledgeBase.name);
        } catch {
          deleted = true;
        }
        assert.isTrue(deleted);
      });
    });

    describe("#knowledgeSource", () => {
      beforeEach(async () => {
        await indexClient.createKnowledgeSource(knowledgeSource);
        await delay(WAIT_TIME);
      });

      afterEach(async () => {
        await indexClient.deleteKnowledgeSource(knowledgeSource.name).catch(() => {});
      });

      it("creates knowledge source with correct properties", async () => {
        const createdSource = await indexClient.getKnowledgeSource(knowledgeSource.name);
        assert.equal(createdSource.name, knowledgeSource.name);
        assert.equal(createdSource.kind, "searchIndex");
      });

      it("updates knowledge source", async () => {
        await indexClient.createOrUpdateKnowledgeSource({
          kind: "searchIndex",
          name: knowledgeSource.name,
          description: "updated knowledge source description",
          searchIndexParameters: {
            searchIndexName: TEST_INDEX_NAME,
          },
        });

        const fetchedSource = await indexClient.getKnowledgeSource(knowledgeSource.name);
        assert.equal(fetchedSource.description, "updated knowledge source description");
      });

      it("gets knowledge source", async () => {
        const fetchedSource = await indexClient.getKnowledgeSource(knowledgeSource.name);
        assert.equal(fetchedSource.name, knowledgeSource.name);
        assert.equal(fetchedSource.kind, "searchIndex");
      });

      it("lists knowledge sources", async () => {
        const knowledgeSources: string[] = [];
        for await (const ks of indexClient.listKnowledgeSources()) {
          knowledgeSources.push(ks.name!);
        }
        assert.isTrue(knowledgeSources.includes(knowledgeSource.name));
      });

      it("deletes knowledge source", async () => {
        await indexClient.deleteKnowledgeSource(knowledgeSource.name);
        let deleted = false;
        try {
          await indexClient.getKnowledgeSource(knowledgeSource.name);
        } catch {
          deleted = true;
        }
        assert.isTrue(deleted);
      });
    });

    describe("#fileKnowledgeSource", { timeout: 120_000 }, () => {
      let fileKnowledgeSourceName: string;
      // Minimal valid one-page PDF that says "Hello World from Azure Search File Knowledge Source test".
      const fileContents = Buffer.from(
        "JVBERi0xLjQKJeLjz9MKMSAwIG9iago8PCAvVHlwZSAvQ2F0YWxvZyAvUGFnZXMgMiAwIFIgPj4KZW5kb2JqCjIgMCBvYmoKPDwgL1R5cGUgL1BhZ2VzIC9LaWRzIFszIDAgUl0gL0NvdW50IDEgPj4KZW5kb2JqCjMgMCBvYmoKPDwgL1R5cGUgL1BhZ2UgL1BhcmVudCAyIDAgUiAvUmVzb3VyY2VzIDw8IC9Gb250IDw8IC9GMSA0IDAgUiA+PiA+PiAvTWVkaWFCb3ggWzAgMCA2MTIgNzkyXSAvQ29udGVudHMgNSAwIFIgPj4KZW5kb2JqCjQgMCBvYmoKPDwgL1R5cGUgL0ZvbnQgL1N1YnR5cGUgL1R5cGUxIC9CYXNlRm9udCAvSGVsdmV0aWNhID4+CmVuZG9iago1IDAgb2JqCjw8IC9MZW5ndGggODkgPj4Kc3RyZWFtCkJUIC9GMSAyNCBUZiAxMDAgNzAwIFRkIChIZWxsbyBXb3JsZCBmcm9tIEF6dXJlIFNlYXJjaCBGaWxlIEtub3dsZWRnZSBTb3VyY2UgdGVzdCkgVGogRVQKZW5kc3RyZWFtCmVuZG9iagp4cmVmCjAgNgowMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMDAwMTUgMDAwMDAgbiAKMDAwMDAwMDA2NCAwMDAwMCBuIAowMDAwMDAwMTIxIDAwMDAwIG4gCjAwMDAwMDAyNDcgMDAwMDAgbiAKMDAwMDAwMDMxNyAwMDAwMCBuIAp0cmFpbGVyCjw8IC9TaXplIDYgL1Jvb3QgMSAwIFIgPj4Kc3RhcnR4cmVmCjQ1NQolJUVPRgo=",
        "base64",
      );
      const fileName = "sample.pdf";
      const contentDisposition = `attachment; filename="${fileName}"`;

      beforeEach(async () => {
        fileKnowledgeSourceName = `file-ks-${TEST_INDEX_NAME}`;
        const fileKnowledgeSource: KnowledgeSource = {
          kind: "file",
          name: fileKnowledgeSourceName,
          description: "File knowledge source for tests",
          fileParameters: {
            ingestionParameters: {
              embeddingModel: {
                kind: "azureOpenAI",
                azureOpenAIParameters: {
                  deploymentId: env.AZURE_OPENAI_EMBEDDING_DEPLOYMENT_NAME,
                  resourceUrl: env.AZURE_OPENAI_ENDPOINT,
                  modelName: env.AZURE_OPENAI_EMBEDDING_DEPLOYMENT_NAME,
                },
              },
            },
          },
        };
        await indexClient.createKnowledgeSource(fileKnowledgeSource);
        await delay(WAIT_TIME);
      });

      afterEach(async () => {
        // Best-effort cleanup of any remaining files before deleting the source.
        try {
          for await (const file of indexClient.listKnowledgeSourceFiles(fileKnowledgeSourceName)) {
            if (file.fileId) {
              await indexClient
                .deleteKnowledgeSourceFile(fileKnowledgeSourceName, file.fileId)
                .catch(() => {});
            }
          }
        } catch {
          // ignore listing errors during cleanup
        }
        await indexClient.deleteKnowledgeSource(fileKnowledgeSourceName).catch(() => {});
      });

      it("creates File knowledge source with correct properties", async () => {
        const createdSource = await indexClient.getKnowledgeSource(fileKnowledgeSourceName);
        assert.equal(createdSource.name, fileKnowledgeSourceName);
        assert.equal(createdSource.kind, "file");
      });

      it("uploads a file to the File knowledge source", async () => {
        const uploaded = await indexClient.uploadKnowledgeSourceFile(
          fileKnowledgeSourceName,
          fileContents,
          contentDisposition,
        );
        assert.exists(uploaded);
        assert.exists(uploaded.fileId);
        assert.equal(uploaded.fileName, fileName);
        assert.equal(uploaded.fileSizeBytes, fileContents.byteLength);
      });

      it("lists files in the File knowledge source", async () => {
        const uploaded = await indexClient.uploadKnowledgeSourceFile(
          fileKnowledgeSourceName,
          fileContents,
          contentDisposition,
        );

        const fileIds: string[] = [];
        for await (const file of indexClient.listKnowledgeSourceFiles(fileKnowledgeSourceName)) {
          if (file.fileId) {
            fileIds.push(file.fileId);
          }
        }
        assert.isTrue(fileIds.includes(uploaded.fileId!));
      });

      it("deletes a file from the File knowledge source", async () => {
        const uploaded = await indexClient.uploadKnowledgeSourceFile(
          fileKnowledgeSourceName,
          fileContents,
          contentDisposition,
        );
        await indexClient.deleteKnowledgeSourceFile(fileKnowledgeSourceName, uploaded.fileId!);

        const remaining: string[] = [];
        for await (const file of indexClient.listKnowledgeSourceFiles(fileKnowledgeSourceName)) {
          if (file.fileId) {
            remaining.push(file.fileId);
          }
        }
        assert.isFalse(remaining.includes(uploaded.fileId!));
      });
    });
  });
});

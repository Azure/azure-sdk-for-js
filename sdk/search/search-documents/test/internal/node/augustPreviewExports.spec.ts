// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assert, describe, expectTypeOf, it } from "vitest";
import {
  KnownAzureOpenAIModelName,
  KnownKnowledgeBaseActivityRecordType,
  KnownKnowledgeBaseReferenceType,
  KnownKnowledgeBaseRetrievalStatusCode,
  KnownKnowledgeSourceNetworkAccessMode,
  KnownKnowledgeSourceResultsProcessing,
} from "../../../src/index.js";
import type {
  FileKnowledgeSourceParameters,
  ImageServingStatistics,
  IndexedSqlKnowledgeSourceParameters,
  KnowledgeBaseActivityRecord,
  KnowledgeBaseAzureBlobActivityRecord,
  KnowledgeBaseAzureBlobActivityArguments,
  KnowledgeBaseFileActivityRecord,
  KnowledgeBaseFileActivityArguments,
  KnowledgeBaseIndexedOneLakeActivityRecord,
  KnowledgeBaseIndexedOneLakeActivityArguments,
  KnowledgeBaseIndexedSharePointActivityRecord,
  KnowledgeBaseIndexedSharePointActivityArguments,
  KnowledgeBaseIndexedSqlActivityRecord,
  KnowledgeBaseIndexedSqlActivityArguments,
  KnowledgeBaseMcpServerActivityRecord,
  KnowledgeBaseMcpServerActivityArguments,
  KnowledgeBaseQueryHintProcessing,
  KnowledgeBaseReference,
  KnowledgeBaseRemoteSharePointActivityRecord,
  KnowledgeBaseRemoteSharePointActivityArguments,
  KnowledgeBaseSearchIndexActivityRecord,
  KnowledgeBaseSearchIndexActivityArguments,
  KnowledgeBaseWebActivityRecord,
  KnowledgeBaseWebActivityArguments,
  KnowledgeBaseWorkIQActivityRecord,
  KnowledgeBaseWorkIQActivityArguments,
  ListIndexStatsSummaryOptions,
  McpServerOutputParsingSplitParameters,
  ResourceListingOptions,
  RetrieveOptions,
  ServedImage,
  ServiceLimits,
} from "../../../src/index.js";

// Keep concrete union members nameable through the package root.
type ActivityMembers =
  | KnowledgeBaseSearchIndexActivityRecord
  | KnowledgeBaseAzureBlobActivityRecord
  | KnowledgeBaseIndexedSharePointActivityRecord
  | KnowledgeBaseIndexedOneLakeActivityRecord
  | KnowledgeBaseWebActivityRecord
  | KnowledgeBaseRemoteSharePointActivityRecord
  | KnowledgeBaseWorkIQActivityRecord
  | KnowledgeBaseMcpServerActivityRecord
  | KnowledgeBaseFileActivityRecord
  | KnowledgeBaseIndexedSqlActivityRecord;

type ActivityArguments =
  | KnowledgeBaseSearchIndexActivityArguments
  | KnowledgeBaseAzureBlobActivityArguments
  | KnowledgeBaseIndexedSharePointActivityArguments
  | KnowledgeBaseIndexedOneLakeActivityArguments
  | KnowledgeBaseWebActivityArguments
  | KnowledgeBaseRemoteSharePointActivityArguments
  | KnowledgeBaseWorkIQActivityArguments
  | KnowledgeBaseMcpServerActivityArguments
  | KnowledgeBaseFileActivityArguments
  | KnowledgeBaseIndexedSqlActivityArguments;

describe("August preview root exports", () => {
  it("exports known enum values", () => {
    assert.equal(KnownAzureOpenAIModelName.Gpt56Sol, "gpt-5.6-sol");
    assert.equal(KnownAzureOpenAIModelName.Gpt56Terra, "gpt-5.6-terra");
    assert.equal(KnownAzureOpenAIModelName.Gpt56Luna, "gpt-5.6-luna");
    assert.equal(KnownKnowledgeSourceNetworkAccessMode.Private, "private");
    assert.equal(KnownKnowledgeSourceResultsProcessing.None, "none");
    assert.equal(KnownKnowledgeBaseRetrievalStatusCode.PartialContent, 206);
    assert.equal(KnownKnowledgeBaseActivityRecordType.SearchIndex, "searchIndex");
    assert.equal(KnownKnowledgeBaseReferenceType.File, "file");
  });

  it("keeps new model families nameable from the root", () => {
    expectTypeOf<ActivityMembers>().toMatchTypeOf<KnowledgeBaseActivityRecord>();
    expectTypeOf<ActivityArguments>().not.toBeNever();
    expectTypeOf<KnowledgeBaseSearchIndexActivityRecord["queryHintProcessing"]>().toEqualTypeOf<
      KnowledgeBaseQueryHintProcessing | undefined
    >();
    expectTypeOf<ImageServingStatistics["servedImages"]>().toEqualTypeOf<
      ServedImage[] | undefined
    >();
    expectTypeOf<KnowledgeBaseReference>().not.toBeNever();
    expectTypeOf<FileKnowledgeSourceParameters["createdResources"]>().toEqualTypeOf<
      Record<string, string> | undefined
    >();
    expectTypeOf<IndexedSqlKnowledgeSourceParameters["ingestionParameters"]>().not.toBeNever();
    expectTypeOf<McpServerOutputParsingSplitParameters["textSplitMode"]>().not.toBeNever();
  });

  it("exposes August option and service limit properties", () => {
    const listing: ResourceListingOptions = {
      search: "prod",
      pageSize: 1,
      searchType: "prefix",
    };
    const indexStats: ListIndexStatsSummaryOptions = listing;
    const retrieve: RetrieveOptions = {
      querySourceAuthorization: "search-token",
      queryWorkIQSourceAuthorization: "work-iq-token",
    };
    const limits: ServiceLimits = { maxVectorIndexSizePerIndexInBytes: 1024 };

    assert.equal(indexStats.pageSize, 1);
    assert.equal(retrieve.queryWorkIQSourceAuthorization, "work-iq-token");
    assert.equal(limits.maxVectorIndexSizePerIndexInBytes, 1024);
  });
});

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assert, describe, expectTypeOf, it } from "vitest";
import {
  KnownAzureOpenAIModelName,
  KnownContentUnderstandingSkillChunkingMethod,
  KnownKnowledgeBaseActivityRecordType,
  KnownKnowledgeBaseRetrievalStatusCode,
  KnownKnowledgeSourceNetworkAccessMode,
  KnownKnowledgeRetrievalReasoningEffortKind,
  KnownIndexedSharePointContainerName,
  KnownVectorFilterMode,
  KnownVectorQueryKind,
} from "../../../src/index.js";
import type {
  FileKnowledgeSourceParameters,
  KnowledgeBase,
  KnowledgeSourceFileCapacity,
  KnowledgeSourceStatus,
  IndexingParametersConfiguration,
  SearchIndexKnowledgeSource,
  VectorFilterMode,
  VectorQueryKind,
  VectorSearchVectorizer,
  SearchOptions,
  SimpleField,
  BaseVectorQuery,
} from "../../../src/index.js";

describe("GA root exports", () => {
  it("exports supported enum values", () => {
    assert.equal(KnownAzureOpenAIModelName.Gpt54Mini, "gpt-5.4-mini");
    assert.equal(KnownAzureOpenAIModelName.Gpt54, "gpt-5.4");
    assert.equal(KnownAzureOpenAIModelName.Gpt55, "gpt-5.5");
    assert.equal(KnownAzureOpenAIModelName.Gpt56Sol, "gpt-5.6-sol");
    assert.equal(KnownAzureOpenAIModelName.Gpt56Terra, "gpt-5.6-terra");
    assert.equal(KnownAzureOpenAIModelName.Gpt56Luna, "gpt-5.6-luna");
    assert.equal(KnownContentUnderstandingSkillChunkingMethod.FixedSize, "fixedSize");
    assert.equal(KnownContentUnderstandingSkillChunkingMethod.Semantic, "semantic");
    assert.equal(KnownKnowledgeSourceNetworkAccessMode.Private, "private");
    assert.equal(KnownKnowledgeBaseRetrievalStatusCode.PartialContent, 206);
    assert.equal(KnownKnowledgeBaseActivityRecordType.SearchIndex, "searchIndex");
    assert.equal(KnownIndexedSharePointContainerName.AllSiteLists, "allSiteLists");
    assert.equal(KnownIndexedSharePointContainerName.AllSitePages, "allSitePages");
    assert.equal(KnownIndexedSharePointContainerName.AllSiteContent, "allSiteContent");
  });

  it("preserves GA vector unions alongside preview known values", () => {
    assert.includeMembers(Object.values(KnownVectorQueryKind), ["vector", "text"]);
    assert.includeMembers(Object.values(KnownVectorFilterMode), ["postFilter", "preFilter"]);
    expectTypeOf<VectorQueryKind>().toEqualTypeOf<"vector" | "text">();
    expectTypeOf<VectorFilterMode>().toEqualTypeOf<"postFilter" | "preFilter">();
    expectTypeOf<BaseVectorQuery<object>["kind"]>().toEqualTypeOf<"vector" | "text">();
    expectTypeOf<VectorSearchVectorizer["kind"]>().toEqualTypeOf<"azureOpenAI" | "customWebApi">();
  });

  it("retains GA reasoning modes alongside preview additions", () => {
    assert.includeMembers(Object.values(KnownKnowledgeRetrievalReasoningEffortKind), [
      "minimal",
      "low",
      "medium",
    ]);
  });

  it("keeps GA knowledge models nameable from the root", () => {
    expectTypeOf<KnowledgeSourceStatus["fileCapacity"]>().toEqualTypeOf<
      KnowledgeSourceFileCapacity | undefined
    >();
    expectTypeOf<SearchOptions<object>["moreLikeThis"]>().toEqualTypeOf<string | undefined>();
    expectTypeOf<SimpleField["organizationAccessExpiration"]>().toEqualTypeOf<
      boolean | undefined
    >();
    expectTypeOf<IndexingParametersConfiguration["refreshAllAcls"]>().toEqualTypeOf<
      boolean | undefined
    >();
    expectTypeOf<KnowledgeBase["knowledgeSources"]>().not.toBeNever();
    expectTypeOf<
      SearchIndexKnowledgeSource["searchIndexParameters"]["searchIndexName"]
    >().toBeString();
    expectTypeOf<FileKnowledgeSourceParameters["createdResources"]>().toEqualTypeOf<
      Record<string, string> | undefined
    >();
  });
});

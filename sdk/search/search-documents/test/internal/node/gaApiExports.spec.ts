// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assert, describe, expectTypeOf, it } from "vitest";
import {
  KnownAzureOpenAIModelName,
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
} from "../../../src/index.js";

describe("GA root exports", () => {
  it("exports supported enum values", () => {
    assert.equal(KnownAzureOpenAIModelName.Gpt54Mini, "gpt-5.4-mini");
    assert.equal(KnownAzureOpenAIModelName.Gpt54, "gpt-5.4");
    assert.equal(KnownAzureOpenAIModelName.Gpt55, "gpt-5.5");
    assert.equal(KnownAzureOpenAIModelName.Gpt56Sol, "gpt-5.6-sol");
    assert.equal(KnownAzureOpenAIModelName.Gpt56Terra, "gpt-5.6-terra");
    assert.equal(KnownAzureOpenAIModelName.Gpt56Luna, "gpt-5.6-luna");
    assert.equal(KnownKnowledgeSourceNetworkAccessMode.Private, "private");
    assert.equal(KnownKnowledgeBaseRetrievalStatusCode.PartialContent, 206);
    assert.equal(KnownKnowledgeBaseActivityRecordType.SearchIndex, "searchIndex");
    assert.equal(KnownIndexedSharePointContainerName.AllSiteLists, "allSiteLists");
    assert.equal(KnownIndexedSharePointContainerName.AllSitePages, "allSitePages");
    assert.equal(KnownIndexedSharePointContainerName.AllSiteContent, "allSiteContent");
  });

  it("limits vector APIs to the GA specification", () => {
    assert.sameMembers(Object.values(KnownVectorQueryKind), ["vector", "text"]);
    assert.sameMembers(Object.values(KnownVectorFilterMode), ["postFilter", "preFilter"]);
    expectTypeOf<VectorQueryKind>().toEqualTypeOf<"vector" | "text">();
    expectTypeOf<VectorFilterMode>().toEqualTypeOf<"postFilter" | "preFilter">();
    expectTypeOf<VectorSearchVectorizer["kind"]>().toEqualTypeOf<"azureOpenAI" | "customWebApi">();
  });

  it("exposes only supported GA reasoning modes and model properties", () => {
    assert.sameMembers(Object.values(KnownKnowledgeRetrievalReasoningEffortKind), [
      "minimal",
      "low",
      "medium",
    ]);
    expectTypeOf<keyof KnowledgeBase>().extract<"tags">().toEqualTypeOf<never>();
    expectTypeOf<keyof SimpleField>()
      .extract<"sensitivityLabelName" | "sourceDocumentId">()
      .toEqualTypeOf<never>();
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

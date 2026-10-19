// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assert, describe, expectTypeOf, it } from "vitest";
import {
  KnownAzureOpenAIModelName,
  KnownKnowledgeBaseActivityRecordType,
  KnownKnowledgeBaseRetrievalStatusCode,
  KnownKnowledgeSourceNetworkAccessMode,
  KnownVectorFilterMode,
  KnownVectorQueryKind,
} from "../../../src/index.js";
import type {
  FileKnowledgeSourceParameters,
  KnowledgeBase,
  SearchIndexKnowledgeSource,
  VectorFilterMode,
  VectorQueryKind,
  VectorSearchVectorizer,
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
  });

  it("limits vector APIs to the GA specification", () => {
    assert.sameMembers(Object.values(KnownVectorQueryKind), ["vector", "text"]);
    assert.sameMembers(Object.values(KnownVectorFilterMode), ["postFilter", "preFilter"]);
    expectTypeOf<VectorQueryKind>().toEqualTypeOf<"vector" | "text">();
    expectTypeOf<VectorFilterMode>().toEqualTypeOf<"postFilter" | "preFilter">();
    expectTypeOf<VectorSearchVectorizer["kind"]>().toEqualTypeOf<"azureOpenAI" | "customWebApi">();
  });

  it("keeps GA knowledge models nameable from the root", () => {
    expectTypeOf<KnowledgeBase["knowledgeSources"]>().not.toBeNever();
    expectTypeOf<
      SearchIndexKnowledgeSource["searchIndexParameters"]["searchIndexName"]
    >().toBeString();
    expectTypeOf<FileKnowledgeSourceParameters["createdResources"]>().toEqualTypeOf<
      Record<string, string> | undefined
    >();
  });
});

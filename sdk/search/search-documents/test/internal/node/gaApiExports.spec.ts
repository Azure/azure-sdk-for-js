// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assert, describe, expectTypeOf, it } from "vitest";
import {
  KnownAzureOpenAIModelName,
  KnownKnowledgeBaseActivityRecordType,
  KnownKnowledgeBaseRetrievalStatusCode,
  KnownKnowledgeSourceNetworkAccessMode,
} from "../../../src/index.js";
import type {
  FileKnowledgeSourceParameters,
  KnowledgeBase,
  SearchIndexKnowledgeSource,
} from "../../../src/index.js";

describe("GA root exports", () => {
  it("exports supported enum values", () => {
    assert.equal(KnownAzureOpenAIModelName.Gpt54Mini, "gpt-5.4-mini");
    assert.equal(KnownKnowledgeSourceNetworkAccessMode.Private, "private");
    assert.equal(KnownKnowledgeBaseRetrievalStatusCode.PartialContent, 206);
    assert.equal(KnownKnowledgeBaseActivityRecordType.SearchIndex, "searchIndex");
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

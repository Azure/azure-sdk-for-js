// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  SearchResult as GeneratedSearchResult,
  SuggestDocumentsResult as GeneratedSuggestDocumentsResult,
  IndexAction,
  IndexActionType,
  FacetResult as GeneratedFacetResult,
} from "./models/azure/search/documents/index.js";
import type {
  KnowledgeBase as GeneratedKnowledgeBase,
  SearchIndexerSkillset as GeneratedSearchIndexerSkillset,
  SearchIndexerSkillUnion,
} from "./models/azure/search/documents/indexes/index.js";
import type { SearchResult, SuggestDocumentsResult, SuggestResult } from "./indexModels.js";
import type { KnowledgeBase } from "./knowledgeBaseModels.js";
import type { FacetResult, SearchIndexerSkill, SearchIndexerSkillset } from "./serviceModels.js";
import type { PagedAsyncIterableIterator } from "./static-helpers/pagingHelpers.js";

export const defaultServiceVersion = "2025-11-01-Preview";

const knownSkills: Record<`${SearchIndexerSkillUnion["odatatype"]}`, true> = {
  "#Microsoft.Skills.Custom.ChatCompletionSkill": true,
  "#Microsoft.Skills.Custom.WebApiSkill": true,
  "#Microsoft.Skills.Text.AzureOpenAIEmbeddingSkill": true,
  "#Microsoft.Skills.Text.CustomEntityLookupSkill": true,
  "#Microsoft.Skills.Text.EntityRecognitionSkill": true,
  "#Microsoft.Skills.Text.KeyPhraseExtractionSkill": true,
  "#Microsoft.Skills.Text.LanguageDetectionSkill": true,
  "#Microsoft.Skills.Text.MergeSkill": true,
  "#Microsoft.Skills.Text.PIIDetectionSkill": true,
  "#Microsoft.Skills.Text.SentimentSkill": true,
  "#Microsoft.Skills.Text.SplitSkill": true,
  "#Microsoft.Skills.Text.TranslationSkill": true,
  "#Microsoft.Skills.Text.V3.EntityLinkingSkill": true,
  "#Microsoft.Skills.Text.V3.EntityRecognitionSkill": true,
  "#Microsoft.Skills.Text.V3.SentimentSkill": true,
  "#Microsoft.Skills.Util.ConditionalSkill": true,
  "#Microsoft.Skills.Util.DocumentExtractionSkill": true,
  "#Microsoft.Skills.Util.ShaperSkill": true,
  "#Microsoft.Skills.Vision.ImageAnalysisSkill": true,
  "#Microsoft.Skills.Vision.OcrSkill": true,
  "#Microsoft.Skills.Custom.AmlSkill": true,
  "#Microsoft.Skills.Vision.VectorizeSkill": true,
  "#Microsoft.Skills.Util.DocumentIntelligenceLayoutSkill": true,
  "#Microsoft.Skills.Util.ContentUnderstandingSkill": true,
};

export function convertSkillsToPublic(skills: SearchIndexerSkillUnion[]): SearchIndexerSkill[] {
  if (!skills) {
    return skills;
  }

  // This validation has already GAed
  return skills.filter((skill): skill is SearchIndexerSkill => knownSkills[skill.odatatype]);
}

export function generatedSearchResultToPublicSearchResult<TModel extends object>(
  results: GeneratedSearchResult[],
): SearchResult<TModel>[] {
  const returnValues: SearchResult<TModel>[] = results.map<SearchResult<TModel>>((result) => {
    const {
      score,
      highlights,
      rerankerScore,
      rerankerBoostedScore,
      captions,
      documentDebugInfo,
      additionalProperties,
    } = result;
    const obj = {
      score,
      highlights,
      rerankerScore,
      rerankerBoostedScore,
      captions,
      documentDebugInfo,
      // The generated code puts document fields in additionalProperties
      document: additionalProperties ?? {},
    };
    return obj as SearchResult<TModel>;
  });
  return returnValues;
}

export function generatedSuggestDocumentsResultToPublicSuggestDocumentsResult<
  TModel extends object,
>(searchDocumentsResult: GeneratedSuggestDocumentsResult): SuggestDocumentsResult<TModel> {
  const results = searchDocumentsResult.results.map<SuggestResult<TModel>>((element) => {
    const { text, additionalProperties } = element;

    const obj = {
      text,
      // The generated code puts document fields in additionalProperties
      document: additionalProperties ?? {},
    };

    return obj as SuggestResult<TModel>;
  });

  const result: SuggestDocumentsResult<TModel> = {
    results: results,
    coverage: searchDocumentsResult.coverage,
  };

  return result;
}

export function generatedSkillsetToPublicSkillset(
  generatedSkillset: GeneratedSearchIndexerSkillset,
): SearchIndexerSkillset {
  // Most properties are direct passthrough, only skills need filtering
  return {
    ...generatedSkillset,
    skills: convertSkillsToPublic(generatedSkillset.skills),
  };
}

export function getRandomIntegerInclusive(min: number, max: number): number {
  // Make sure inputs are integers.
  min = Math.ceil(min);
  max = Math.floor(max);
  // Pick a random offset from zero to the size of the range.
  // Since Math.random() can never return 1, we have to make the range one larger
  // in order to be inclusive of the maximum value after we take the floor.
  const offset = Math.floor(Math.random() * (max - min + 1));
  return offset + min;
}

export function convertKnowledgeBaseToPublic(
  knowledgeBase: GeneratedKnowledgeBase | undefined,
): KnowledgeBase {
  if (!knowledgeBase) {
    throw new Error("Knowledge base is undefined");
  }
  // Ensure models is always an array (public type requires it)
  return {
    ...knowledgeBase,
    models: knowledgeBase.models ?? [],
  };
}

export function mapPagedAsyncIterable<T, U>(
  iter: PagedAsyncIterableIterator<T>,
  mapper: (x: T) => U,
): PagedAsyncIterableIterator<U> {
  return {
    async next() {
      const result = await iter.next();

      return {
        ...result,
        value: result.value && mapper(result.value),
      };
    },
    [Symbol.asyncIterator]() {
      return this;
    },
    async *byPage(settings) {
      const iteratorByPage = iter.byPage(settings);
      for await (const page of iteratorByPage) {
        yield page.map(mapper);
      }
    },
  };
}

/**
 * Converts public IndexDocumentsAction format to generated IndexAction format.
 * The public API uses `__actionType` with document properties spread at the root,
 * while the generated API expects `actionType` with document properties in `additionalProperties`.
 * @internal
 */
export function convertPublicActionsToGeneratedActions<
  TModel extends { actionType: IndexActionType },
>(actions: Array<TModel>): IndexAction[] {
  return actions.map((action) => {
    const { actionType, ...documentProperties } = action;
    return {
      actionType: actionType,
      additionalProperties: documentProperties as Record<string, unknown>,
    };
  });
}

// Passthrough functions for FacetResult, QueryAnswerResult, and QueryCaptionResult
// These now simply pass through the generated types without spreading additionalProperties.
// Dynamic properties should be accessed via `.additionalProperties` object.

/**
 * Converts a generated FacetResult to a public FacetResult.
 * @internal
 */
export function convertGeneratedFacetResultToPublic(
  facetResult: GeneratedFacetResult,
): FacetResult {
  const { facets, ...rest } = facetResult;
  return {
    ...rest,
    // Recursively convert nested facets
    facets: convertGeneratedFacetsToPublic(facets),
  };
}

/**
 * Converts a record of FacetResult arrays from generated to public format.
 * @internal
 */
export function convertGeneratedFacetsToPublic(
  facets: Record<string, GeneratedFacetResult[]> | undefined,
): Record<string, FacetResult[]> | undefined {
  if (!facets) {
    return facets;
  }
  const result: Record<string, FacetResult[]> = {};
  for (const [key, value] of Object.entries(facets)) {
    result[key] = value.map(convertGeneratedFacetResultToPublic);
  }
  return result;
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { buildCsvCollection } from "../static-helpers/serialization/build-csv-collection.js";
import type { SearchIndexResponse } from "./azure/search/documents/indexes/models.js";
import { searchIndexResponseArrayDeserializer } from "./azure/search/documents/indexes/models.js";
import { QueryType } from "./azure/search/documents/models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** A node in the scoring explanation tree. Each node represents a component of the overall relevance score with an optional breakdown into sub-components. */
export interface ScoreExplanation {
  /** The numeric score contribution of this component. */
  value: number;
  /** A human-readable description of what this score component represents. */
  description: string;
  /** The category of this score component, indicating what type of scoring factor it represents. */
  kind?: ScoreComponentKind;
  /** The child explanations that make up this component's score. Present when the score can be decomposed into finer-grained factors. */
  details?: ScoreExplanation[];
}

export function scoreExplanationDeserializer(item: any): ScoreExplanation {
  return {
    value: item["value"],
    description: item["description"],
    kind: item["kind"],
    details: !item["details"]
      ? item["details"]
      : scoreExplanationArrayDeserializer(item["details"]),
  };
}

/** The category of a score component in a scoring explanation tree. */
export enum KnownScoreComponentKind {
  /** Term frequency: how often the term appears in the document field. */
  TermFrequency = "tf",
  /** Inverse document frequency: a measure of how rare the term is across all documents. */
  InverseDocumentFrequency = "idf",
  /** Field normalization: adjusts the score based on the length of the field. */
  FieldNorm = "fieldNorm",
  /** Boost: a scoring multiplier applied by a scoring profile or field boost. */
  Boost = "boost",
  /** Similarity: the overall similarity score computed by the ranking algorithm. */
  Similarity = "similarity",
  /** Coordination: accounts for how many of the query terms were found in the document. */
  Coordination = "coordination",
  /** Custom: a score component from a custom scoring function or scoring profile. */
  Custom = "custom",
}

/**
 * The category of a score component in a scoring explanation tree. \
 * {@link KnownScoreComponentKind} can be used interchangeably with ScoreComponentKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **tf**: Term frequency: how often the term appears in the document field. \
 * **idf**: Inverse document frequency: a measure of how rare the term is across all documents. \
 * **fieldNorm**: Field normalization: adjusts the score based on the length of the field. \
 * **boost**: Boost: a scoring multiplier applied by a scoring profile or field boost. \
 * **similarity**: Similarity: the overall similarity score computed by the ranking algorithm. \
 * **coordination**: Coordination: accounts for how many of the query terms were found in the document. \
 * **custom**: Custom: a score component from a custom scoring function or scoring profile.
 */
export type ScoreComponentKind = string;

export function scoreExplanationArrayDeserializer(result: Array<ScoreExplanation>): any[] {
  return result.map((item) => {
    return scoreExplanationDeserializer(item);
  });
}

/** The request payload for the search explain operation. Contains the search query context and the document to explain scoring for. */
export interface ExplainRequest {
  /** The search query text to explain scoring for. Use "*" to explain the base score without a text query. */
  search: string;
  /** The key of the document to explain scoring for. */
  documentKey: string;
  /** The level of detail to include in the scoring explanation. Default is 'simple'. */
  verbosity?: ExplainVerbosity;
  /** An OData expression that filters the documents considered during explanation. */
  filter?: string;
  /** The name of a scoring profile to evaluate for the document. */
  scoringProfile?: string;
  /** The list of parameter values to be used in scoring functions (for example, referencePointParameter) using the format name-values. */
  scoringParameters?: string[];
  /** A value that specifies the syntax of the search query. The default is 'simple'. Use 'full' if your query uses the Lucene query syntax. */
  queryType?: QueryType;
  /** The comma-separated list of field names to which to scope the full-text search. */
  searchFields?: string[];
}

export function explainRequestSerializer(item: ExplainRequest): any {
  return {
    search: item["search"],
    documentKey: item["documentKey"],
    verbosity: item["verbosity"],
    filter: item["filter"],
    scoringProfile: item["scoringProfile"],
    scoringParameters: !item["scoringParameters"]
      ? item["scoringParameters"]
      : item["scoringParameters"].map((p: any) => {
          return p;
        }),
    queryType: item["queryType"],
    searchFields: !item["searchFields"]
      ? item["searchFields"]
      : buildCsvCollection(
          item["searchFields"].map((p: any) => {
            return p;
          }),
        ),
  };
}

/** The level of detail for scoring explanations returned by the explain operation. */
export enum KnownExplainVerbosity {
  /** Returns a minimal explanation containing only the final score and top-level component scores. */
  Simple = "simple",
  /** Returns a moderately detailed explanation including intermediate scoring steps and field-level contributions. */
  Detailed = "detailed",
  /** Returns the most comprehensive explanation including all scoring components down to individual term statistics. */
  Full = "full",
}

/**
 * The level of detail for scoring explanations returned by the explain operation. \
 * {@link KnownExplainVerbosity} can be used interchangeably with ExplainVerbosity,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **simple**: Returns a minimal explanation containing only the final score and top-level component scores. \
 * **detailed**: Returns a moderately detailed explanation including intermediate scoring steps and field-level contributions. \
 * **full**: Returns the most comprehensive explanation including all scoring components down to individual term statistics.
 */
export type ExplainVerbosity = string;

/** The result of an explain operation, containing the scoring breakdown for a specific document. */
export interface ExplainDocumentsResult {
  /** The key of the document that was explained. */
  readonly documentKey: string;
  /** The overall relevance score of the document for the given query. */
  readonly score: number;
  /** The detailed scoring explanation tree showing how the relevance score was computed. */
  readonly explanation: ScoreExplanation;
  /** The list of fields that matched the search query in this document. */
  readonly matchedFields?: string[];
}

export function explainDocumentsResultDeserializer(item: any): ExplainDocumentsResult {
  return {
    documentKey: item["documentKey"],
    score: item["score"],
    explanation: scoreExplanationDeserializer(item["explanation"]),
    matchedFields: !item["matchedFields"]
      ? item["matchedFields"]
      : item["matchedFields"].map((p: any) => {
          return p;
        }),
  };
}

/** Response from a List Indexes request. If successful, it includes the full definitions of all indexes. */
export interface _ListIndexesSelectedResult {
  /** The indexes in the Search service. */
  readonly value: SearchIndexResponse[];
}

export function _listIndexesSelectedResultDeserializer(item: any): _ListIndexesSelectedResult {
  return {
    value: searchIndexResponseArrayDeserializer(item["value"]),
  };
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2025-11-01-preview API version. */
  V20251101Preview = "2025-11-01-preview",
  /** The 2026-05-01-preview API version. */
  V20260501Preview = "2026-05-01-preview",
}

export type GetDocumentCountResponse = { body: number };

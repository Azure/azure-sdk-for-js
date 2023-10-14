// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable no-unused-expressions */
/* eslint-disable no-constant-condition */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  KnownSemanticErrorMode,
  KnownSemanticErrorReason,
  KnownSemanticSearchResultsType,
  KnownVectorFilterMode,
  KnownVectorQueryKind,
} from "../../../src/generated/data";

import {
  KnownBlobIndexerDataToExtract,
  KnownBlobIndexerImageAction,
  KnownBlobIndexerParsingMode,
  KnownBlobIndexerPDFTextRotationAlgorithm,
  KnownCustomEntityLookupSkillLanguage,
  KnownEntityCategory,
  KnownEntityRecognitionSkillLanguage,
  KnownImageAnalysisSkillLanguage,
  KnownImageDetail,
  KnownIndexerExecutionEnvironment,
  KnownKeyPhraseExtractionSkillLanguage,
  KnownOcrSkillLanguage,
  KnownPIIDetectionSkillMaskingMode,
  KnownRegexFlags,
  KnownSearchFieldDataType,
  KnownSearchIndexerDataSourceType,
  KnownSentimentSkillLanguage,
  KnownSplitSkillLanguage,
  KnownTextSplitMode,
  KnownTextTranslationSkillLanguage,
  KnownVectorSearchAlgorithmKind,
  KnownVectorSearchAlgorithmMetric,
  KnownVisualFeature,
} from "../../../src/generated/service";

import {
  SemanticErrorMode,
  SemanticErrorReason,
  SemanticSearchResultsType,
  VectorFilterMode,
  VectorQueryKind,
  BlobIndexerDataToExtract,
  BlobIndexerImageAction,
  BlobIndexerParsingMode,
  BlobIndexerPDFTextRotationAlgorithm,
  CustomEntityLookupSkillLanguage,
  EntityCategory,
  EntityRecognitionSkillLanguage,
  ImageAnalysisSkillLanguage,
  ImageDetail,
  IndexerExecutionEnvironment,
  KeyPhraseExtractionSkillLanguage,
  OcrSkillLanguage,
  PIIDetectionSkillMaskingMode,
  RegexFlags,
  SearchFieldDataType,
  SearchIndexerDataSourceType,
  SentimentSkillLanguage,
  SplitSkillLanguage,
  TextSplitMode,
  TextTranslationSkillLanguage,
  VectorSearchAlgorithmKind,
  VectorSearchAlgorithmMetric,
  VisualFeature,
} from "../../../src/index";

type IsIdentical<T1, T2> = (<T>() => T extends T1 ? true : false) extends <T>() => T extends T2
  ? true
  : false
  ? any
  : never;

type ExpectSemanticErrorMode = `${KnownSemanticErrorMode}`;
type ExpectSemanticErrorReason = `${KnownSemanticErrorReason}`;
type ExpectSemanticSearchResultsType = `${KnownSemanticSearchResultsType}`;
type ExpectVectorFilterMode = `${KnownVectorFilterMode}`;
type ExpectVectorQueryKind = `${KnownVectorQueryKind}`;
type ExpectBlobIndexerDataToExtract = `${KnownBlobIndexerDataToExtract}`;
type ExpectBlobIndexerImageAction = `${KnownBlobIndexerImageAction}`;
type ExpectBlobIndexerParsingMode = `${KnownBlobIndexerParsingMode}`;
type ExpectBlobIndexerPDFTextRotationAlgorithm = `${KnownBlobIndexerPDFTextRotationAlgorithm}`;
type ExpectCustomEntityLookupSkillLanguage = `${KnownCustomEntityLookupSkillLanguage}`;
type ExpectEntityCategory = `${KnownEntityCategory}`;
type ExpectEntityRecognitionSkillLanguage = `${KnownEntityRecognitionSkillLanguage}`;
type ExpectImageAnalysisSkillLanguage = `${KnownImageAnalysisSkillLanguage}`;
type ExpectImageDetail = `${KnownImageDetail}`;
type ExpectIndexerExecutionEnvironment = `${KnownIndexerExecutionEnvironment}`;
type ExpectKeyPhraseExtractionSkillLanguage = `${KnownKeyPhraseExtractionSkillLanguage}`;
type ExpectOcrSkillLanguage = `${KnownOcrSkillLanguage}`;
type ExpectPIIDetectionSkillMaskingMode = `${KnownPIIDetectionSkillMaskingMode}`;
type ExpectRegexFlags = `${KnownRegexFlags}`;
type ExpectSearchFieldDataType = Exclude<
  `${KnownSearchFieldDataType}` | `Collection(${KnownSearchFieldDataType})`,
  "Edm.ComplexType" | "Collection(Edm.ComplexType)" | "Edm.Single"
>;
type ExpectSearchIndexerDataSourceType = `${KnownSearchIndexerDataSourceType}`;
type ExpectSentimentSkillLanguage = `${KnownSentimentSkillLanguage}`;
type ExpectSplitSkillLanguage = `${KnownSplitSkillLanguage}`;
type ExpectTextSplitMode = `${KnownTextSplitMode}`;
type ExpectTextTranslationSkillLanguage = `${KnownTextTranslationSkillLanguage}`;
type ExpectVectorSearchAlgorithmKind = `${KnownVectorSearchAlgorithmKind}`;
type ExpectVectorSearchAlgorithmMetric = `${KnownVectorSearchAlgorithmMetric}`;
type ExpectVisualFeature = `${KnownVisualFeature}`;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
function fun() {
  const a: IsIdentical<ExpectSemanticErrorMode, SemanticErrorMode> = "pass";
  const b: IsIdentical<ExpectSemanticErrorReason, SemanticErrorReason> = "pass";
  const c: IsIdentical<ExpectSemanticSearchResultsType, SemanticSearchResultsType> = "pass";
  const d: IsIdentical<ExpectVectorFilterMode, VectorFilterMode> = "pass";
  const e: IsIdentical<ExpectVectorQueryKind, VectorQueryKind> = "pass";
  const f: IsIdentical<ExpectBlobIndexerDataToExtract, BlobIndexerDataToExtract> = "pass";
  const g: IsIdentical<ExpectBlobIndexerImageAction, BlobIndexerImageAction> = "pass";
  const h: IsIdentical<ExpectBlobIndexerParsingMode, BlobIndexerParsingMode> = "pass";
  const i: IsIdentical<
    ExpectBlobIndexerPDFTextRotationAlgorithm,
    BlobIndexerPDFTextRotationAlgorithm
  > = "pass";
  const j: IsIdentical<ExpectCustomEntityLookupSkillLanguage, CustomEntityLookupSkillLanguage> =
    "pass";
  const k: IsIdentical<ExpectEntityCategory, EntityCategory> = "pass";
  const l: IsIdentical<ExpectEntityRecognitionSkillLanguage, EntityRecognitionSkillLanguage> =
    "pass";
  const m: IsIdentical<ExpectImageAnalysisSkillLanguage, ImageAnalysisSkillLanguage> = "pass";
  const n: IsIdentical<ExpectImageDetail, ImageDetail> = "pass";
  const o: IsIdentical<ExpectIndexerExecutionEnvironment, IndexerExecutionEnvironment> = "pass";
  const p: IsIdentical<ExpectKeyPhraseExtractionSkillLanguage, KeyPhraseExtractionSkillLanguage> =
    "pass";
  const q: IsIdentical<ExpectOcrSkillLanguage, OcrSkillLanguage> = "pass";
  const r: IsIdentical<ExpectPIIDetectionSkillMaskingMode, PIIDetectionSkillMaskingMode> = "pass";
  const s: IsIdentical<ExpectRegexFlags, RegexFlags> = "pass";
  const t: IsIdentical<ExpectSearchFieldDataType, SearchFieldDataType> = "pass";
  const u: IsIdentical<ExpectSearchIndexerDataSourceType, SearchIndexerDataSourceType> = "pass";
  const v: IsIdentical<ExpectSentimentSkillLanguage, SentimentSkillLanguage> = "pass";
  const w: IsIdentical<ExpectSplitSkillLanguage, SplitSkillLanguage> = "pass";
  const x: IsIdentical<ExpectTextSplitMode, TextSplitMode> = "pass";
  const y: IsIdentical<ExpectTextTranslationSkillLanguage, TextTranslationSkillLanguage> = "pass";
  const z: IsIdentical<ExpectVectorSearchAlgorithmKind, VectorSearchAlgorithmKind> = "pass";
  const ba: IsIdentical<ExpectVectorSearchAlgorithmMetric, VectorSearchAlgorithmMetric> = "pass";
  const bb: IsIdentical<ExpectVisualFeature, VisualFeature> = "pass";

  return [a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, ba, bb];
}

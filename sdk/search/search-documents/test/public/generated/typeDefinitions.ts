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
  KnownBlobIndexerPDFTextRotationAlgorithm,
  KnownBlobIndexerParsingMode,
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
  KnownVectorSearchVectorizerKind,
  KnownVisualFeature,
} from "../../../src/generated/service";

import {
  BlobIndexerDataToExtract,
  BlobIndexerImageAction,
  BlobIndexerPDFTextRotationAlgorithm,
  BlobIndexerParsingMode,
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
  SemanticErrorMode,
  SemanticErrorReason,
  SemanticSearchResultsType,
  SentimentSkillLanguage,
  SplitSkillLanguage,
  TextSplitMode,
  TextTranslationSkillLanguage,
  VectorFilterMode,
  VectorQueryKind,
  VectorSearchAlgorithmKind,
  VectorSearchAlgorithmMetric,
  VectorSearchVectorizerKind,
  VisualFeature,
} from "../../../src/index";

type IsIdentical<T1, T2> =
  (<T>() => T extends T1 ? true : false) extends <T>() => T extends T2 ? true : false ? any : never;

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
  | "Edm.ComplexType"
  | "Collection(Edm.ComplexType)"
  | "Edm.Single"
  | "Edm.Half"
  | "Edm.Int16"
  | "Edm.SByte"
  | "Edm.Byte"
>;
type ExpectSearchIndexerDataSourceType = `${KnownSearchIndexerDataSourceType}`;
type ExpectSemanticErrorMode = `${KnownSemanticErrorMode}`;
type ExpectSemanticErrorReason = `${KnownSemanticErrorReason}`;
type ExpectSemanticSearchResultsType = `${KnownSemanticSearchResultsType}`;
type ExpectSentimentSkillLanguage = `${KnownSentimentSkillLanguage}`;
type ExpectSplitSkillLanguage = `${KnownSplitSkillLanguage}`;
type ExpectTextSplitMode = `${KnownTextSplitMode}`;
type ExpectTextTranslationSkillLanguage = `${KnownTextTranslationSkillLanguage}`;
type ExpectVectorFilterMode = `${KnownVectorFilterMode}`;
type ExpectVectorQueryKind = `${KnownVectorQueryKind}`;
type ExpectVectorSearchAlgorithmKind = `${KnownVectorSearchAlgorithmKind}`;
type ExpectVectorSearchAlgorithmMetric = `${KnownVectorSearchAlgorithmMetric}`;
type ExpectVectorSearchVectorizerKind = `${KnownVectorSearchVectorizerKind}`;
type ExpectVisualFeature = `${KnownVisualFeature}`;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
function fun() {
  const a: IsIdentical<ExpectBlobIndexerDataToExtract, BlobIndexerDataToExtract> = "pass";
  const b: IsIdentical<ExpectBlobIndexerImageAction, BlobIndexerImageAction> = "pass";
  const c: IsIdentical<ExpectBlobIndexerParsingMode, BlobIndexerParsingMode> = "pass";
  const d: IsIdentical<
    ExpectBlobIndexerPDFTextRotationAlgorithm,
    BlobIndexerPDFTextRotationAlgorithm
  > = "pass";
  const e: IsIdentical<ExpectCustomEntityLookupSkillLanguage, CustomEntityLookupSkillLanguage> =
    "pass";
  const f: IsIdentical<ExpectEntityCategory, EntityCategory> = "pass";
  const g: IsIdentical<ExpectEntityRecognitionSkillLanguage, EntityRecognitionSkillLanguage> =
    "pass";
  const h: IsIdentical<ExpectImageAnalysisSkillLanguage, ImageAnalysisSkillLanguage> = "pass";
  const i: IsIdentical<ExpectImageDetail, ImageDetail> = "pass";
  const j: IsIdentical<ExpectIndexerExecutionEnvironment, IndexerExecutionEnvironment> = "pass";
  const k: IsIdentical<ExpectKeyPhraseExtractionSkillLanguage, KeyPhraseExtractionSkillLanguage> =
    "pass";
  const l: IsIdentical<ExpectOcrSkillLanguage, OcrSkillLanguage> = "pass";
  const m: IsIdentical<ExpectPIIDetectionSkillMaskingMode, PIIDetectionSkillMaskingMode> = "pass";
  const n: IsIdentical<ExpectRegexFlags, RegexFlags> = "pass";
  const o: IsIdentical<ExpectSearchFieldDataType, SearchFieldDataType> = "pass";
  const p: IsIdentical<ExpectSearchIndexerDataSourceType, SearchIndexerDataSourceType> = "pass";
  const q: IsIdentical<ExpectSemanticErrorMode, SemanticErrorMode> = "pass";
  const r: IsIdentical<ExpectSemanticErrorReason, SemanticErrorReason> = "pass";
  const s: IsIdentical<ExpectSemanticSearchResultsType, SemanticSearchResultsType> = "pass";
  const t: IsIdentical<ExpectSentimentSkillLanguage, SentimentSkillLanguage> = "pass";
  const u: IsIdentical<ExpectSplitSkillLanguage, SplitSkillLanguage> = "pass";
  const v: IsIdentical<ExpectTextSplitMode, TextSplitMode> = "pass";
  const w: IsIdentical<ExpectTextTranslationSkillLanguage, TextTranslationSkillLanguage> = "pass";
  const x: IsIdentical<ExpectVectorFilterMode, VectorFilterMode> = "pass";
  const y: IsIdentical<ExpectVectorQueryKind, VectorQueryKind> = "pass";
  const z: IsIdentical<ExpectVectorSearchAlgorithmKind, VectorSearchAlgorithmKind> = "pass";
  const aa: IsIdentical<ExpectVectorSearchAlgorithmMetric, VectorSearchAlgorithmMetric> = "pass";
  const ab: IsIdentical<ExpectVectorSearchVectorizerKind, VectorSearchVectorizerKind> = "pass";
  const ac: IsIdentical<ExpectVisualFeature, VisualFeature> = "pass";
  return [a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, aa, ab, ac];
}

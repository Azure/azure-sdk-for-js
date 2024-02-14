// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable no-unused-expressions */
/* eslint-disable no-constant-condition */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { KnownVectorFilterMode, KnownVectorQueryKind } from "../../../src/generated/data";

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

type IsIdentical<T1, T2> =
  (<T>() => T extends T1 ? true : false) extends <T>() => T extends T2 ? true : false ? any : never;

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
  const a: IsIdentical<ExpectVisualFeature, VisualFeature> = "pass";
  const b: IsIdentical<ExpectVectorFilterMode, VectorFilterMode> = "pass";
  const c: IsIdentical<ExpectVectorQueryKind, VectorQueryKind> = "pass";
  const d: IsIdentical<ExpectBlobIndexerDataToExtract, BlobIndexerDataToExtract> = "pass";
  const e: IsIdentical<ExpectBlobIndexerImageAction, BlobIndexerImageAction> = "pass";
  const f: IsIdentical<ExpectBlobIndexerParsingMode, BlobIndexerParsingMode> = "pass";
  const g: IsIdentical<
    ExpectBlobIndexerPDFTextRotationAlgorithm,
    BlobIndexerPDFTextRotationAlgorithm
  > = "pass";
  const h: IsIdentical<ExpectCustomEntityLookupSkillLanguage, CustomEntityLookupSkillLanguage> =
    "pass";
  const i: IsIdentical<ExpectEntityCategory, EntityCategory> = "pass";
  const j: IsIdentical<ExpectEntityRecognitionSkillLanguage, EntityRecognitionSkillLanguage> =
    "pass";
  const k: IsIdentical<ExpectImageAnalysisSkillLanguage, ImageAnalysisSkillLanguage> = "pass";
  const l: IsIdentical<ExpectImageDetail, ImageDetail> = "pass";
  const m: IsIdentical<ExpectIndexerExecutionEnvironment, IndexerExecutionEnvironment> = "pass";
  const n: IsIdentical<ExpectKeyPhraseExtractionSkillLanguage, KeyPhraseExtractionSkillLanguage> =
    "pass";
  const o: IsIdentical<ExpectOcrSkillLanguage, OcrSkillLanguage> = "pass";
  const p: IsIdentical<ExpectPIIDetectionSkillMaskingMode, PIIDetectionSkillMaskingMode> = "pass";
  const q: IsIdentical<ExpectRegexFlags, RegexFlags> = "pass";
  const r: IsIdentical<ExpectSearchFieldDataType, SearchFieldDataType> = "pass";
  const s: IsIdentical<ExpectSearchIndexerDataSourceType, SearchIndexerDataSourceType> = "pass";
  const t: IsIdentical<ExpectSentimentSkillLanguage, SentimentSkillLanguage> = "pass";
  const u: IsIdentical<ExpectSplitSkillLanguage, SplitSkillLanguage> = "pass";
  const v: IsIdentical<ExpectTextSplitMode, TextSplitMode> = "pass";
  const w: IsIdentical<ExpectTextTranslationSkillLanguage, TextTranslationSkillLanguage> = "pass";
  const x: IsIdentical<ExpectVectorSearchAlgorithmKind, VectorSearchAlgorithmKind> = "pass";
  const y: IsIdentical<ExpectVectorSearchAlgorithmMetric, VectorSearchAlgorithmMetric> = "pass";

  return [a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y];
}

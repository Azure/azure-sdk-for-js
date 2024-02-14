// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable no-unused-expressions */
/* eslint-disable no-constant-condition */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  KnownCharFilterName,
  KnownIndexProjectionMode,
  KnownLexicalAnalyzerName,
  KnownLexicalTokenizerName,
  KnownSearchFieldDataType,
  KnownTokenFilterName,
  KnownVectorSearchAlgorithmKind,
  KnownVectorSearchAlgorithmMetric,
  KnownVectorSearchVectorizerKind,
} from "../../src/generated/service";

import {
  KnownQueryDebugMode,
  KnownSemanticFieldState,
  KnownVectorFilterMode,
  KnownVectorQueryKind,
} from "../../src/generated/data";

import {
  ComplexDataType,
  IndexProjectionMode,
  KnownAnalyzerNames,
  KnownCharFilterNames,
  KnownTokenFilterNames,
  KnownTokenizerNames,
  QueryDebugMode,
  SearchFieldDataType,
  SemanticFieldState,
  VectorFilterMode,
  VectorQueryKind,
  VectorSearchAlgorithmKind,
  VectorSearchAlgorithmMetric,
  VectorSearchVectorizerKind,
} from "../../src/index";

type IsIdentical<T1, T2> =
  (<T>() => T extends T1 ? true : false) extends <T>() => T extends T2 ? true : false ? any : never;

type ExpectSearchFieldDataType = Exclude<
  `${KnownSearchFieldDataType}` | `Collection(${KnownSearchFieldDataType})`,
  ComplexDataType | "Edm.Single"
>;
type ExpectQueryDebugMode = `${KnownQueryDebugMode}`;
type ExpectSemanticFieldState = `${KnownSemanticFieldState}`;
type ExpectVectorSearchAlgorithmMetric = `${KnownVectorSearchAlgorithmMetric}`;
type ExpectVectorSearchAlgorithmKind = `${KnownVectorSearchAlgorithmKind}`;
type ExpectIndexProjectionMode = `${KnownIndexProjectionMode}`;
type ExpectVectorSearchVectorizerKind = `${KnownVectorSearchVectorizerKind}`;
type ExpectVectorQueryKind = `${KnownVectorQueryKind}`;
type ExpectVectorFilterMode = `${KnownVectorFilterMode}`;
type ExpectKnownCharFilterNames = `${KnownCharFilterName}`;
type ExpectKnownAnalyzerNames = `${KnownLexicalAnalyzerName}`;
type ExpectKnownTokenizerNames = `${KnownLexicalTokenizerName}`;
type ExpectKnownTokenFilterNames = `${KnownTokenFilterName}`;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
function fun() {
  const a: IsIdentical<ExpectSearchFieldDataType, SearchFieldDataType> = "pass";
  const b: IsIdentical<ExpectQueryDebugMode, QueryDebugMode> = "pass";
  const c: IsIdentical<ExpectSemanticFieldState, SemanticFieldState> = "pass";
  const d: IsIdentical<ExpectVectorSearchAlgorithmMetric, VectorSearchAlgorithmMetric> = "pass";
  const e: IsIdentical<ExpectVectorSearchAlgorithmKind, VectorSearchAlgorithmKind> = "pass";
  const f: IsIdentical<ExpectIndexProjectionMode, IndexProjectionMode> = "pass";
  const g: IsIdentical<ExpectVectorSearchVectorizerKind, VectorSearchVectorizerKind> = "pass";
  const h: IsIdentical<ExpectVectorQueryKind, VectorQueryKind> = "pass";
  const i: IsIdentical<ExpectVectorFilterMode, VectorFilterMode> = "pass";
  const j: IsIdentical<ExpectKnownCharFilterNames, `${KnownCharFilterNames}`> = "pass";
  const k: IsIdentical<ExpectKnownAnalyzerNames, `${KnownAnalyzerNames}`> = "pass";
  const l: IsIdentical<ExpectKnownTokenizerNames, `${KnownTokenizerNames}`> = "pass";
  const m: IsIdentical<ExpectKnownTokenFilterNames, `${KnownTokenFilterNames}`> = "pass";

  return [a, b, c, d, e, f, g, h, i, j, k, l, m];
}

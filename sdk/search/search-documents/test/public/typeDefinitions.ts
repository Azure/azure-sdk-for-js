// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable no-unused-expressions */
/* eslint-disable no-constant-condition */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  KnownSearchFieldDataType,
  KnownVectorSearchAlgorithmMetric,
  KnownVectorSearchAlgorithmKind,
  KnownIndexProjectionMode,
  KnownVectorSearchVectorizerKind,
} from "../../src/generated/service";
import {
  KnownSemanticPartialResponseReason,
  KnownSemanticPartialResponseType,
  KnownQueryDebugMode,
  KnownSemanticErrorHandling,
  KnownSemanticFieldState,
  KnownVectorQueryKind,
  KnownVectorFilterMode,
} from "../../src/generated/data";
import {
  ComplexDataType,
  SearchFieldDataType,
  SemanticPartialResponseReason,
  SemanticPartialResponseType,
  QueryDebugMode,
  SemanticErrorHandlingMode,
  SemanticFieldState,
  VectorSearchAlgorithmMetric,
  VectorSearchAlgorithmKind,
  IndexProjectionMode,
  VectorSearchVectorizerKind,
  VectorQueryKind,
  VectorFilterMode,
} from "../../src/index";

type IsIdentical<T1, T2> = (<T>() => T extends T1 ? true : false) extends <T>() => T extends T2
  ? true
  : false
  ? any
  : never;

type ExpectSearchFieldDataType = Exclude<
  `${KnownSearchFieldDataType}` | `Collection(${KnownSearchFieldDataType})`,
  ComplexDataType | "Edm.Single"
>;
type ExpectSemanticPartialResponseReason = `${KnownSemanticPartialResponseReason}`;
type ExpectSemanticPartialResponseType = `${KnownSemanticPartialResponseType}`;
type ExpectQueryDebugMode = `${KnownQueryDebugMode}`;
type ExpectSemanticErrorHandlingMode = `${KnownSemanticErrorHandling}`;
type ExpectSemanticFieldState = `${KnownSemanticFieldState}`;
type ExpectVectorSearchAlgorithmMetric = `${KnownVectorSearchAlgorithmMetric}`;
type ExpectVectorSearchAlgorithmKind = `${KnownVectorSearchAlgorithmKind}`;
type ExpectIndexProjectionMode = `${KnownIndexProjectionMode}`;
type ExpectVectorSearchVectorizerKind = `${KnownVectorSearchVectorizerKind}`;
type ExpectVectorQueryKind = `${KnownVectorQueryKind}`;
type ExpectVectorFilterMode = `${KnownVectorFilterMode}`;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
function fun() {
  const a: IsIdentical<ExpectSearchFieldDataType, SearchFieldDataType> = "pass";
  const b: IsIdentical<ExpectSemanticPartialResponseReason, SemanticPartialResponseReason> = "pass";
  const c: IsIdentical<ExpectSemanticPartialResponseType, SemanticPartialResponseType> = "pass";
  const d: IsIdentical<ExpectQueryDebugMode, QueryDebugMode> = "pass";
  const e: IsIdentical<ExpectSemanticErrorHandlingMode, SemanticErrorHandlingMode> = "pass";
  const f: IsIdentical<ExpectSemanticFieldState, SemanticFieldState> = "pass";
  const g: IsIdentical<ExpectVectorSearchAlgorithmMetric, VectorSearchAlgorithmMetric> = "pass";
  const h: IsIdentical<ExpectVectorSearchAlgorithmKind, VectorSearchAlgorithmKind> = "pass";
  const i: IsIdentical<ExpectIndexProjectionMode, IndexProjectionMode> = "pass";
  const j: IsIdentical<ExpectVectorSearchVectorizerKind, VectorSearchVectorizerKind> = "pass";
  const k: IsIdentical<ExpectVectorQueryKind, VectorQueryKind> = "pass";
  const l: IsIdentical<ExpectVectorFilterMode, VectorFilterMode> = "pass";

  return [a, b, c, d, e, f, g, h, i, j, k, l];
}

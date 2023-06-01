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
} from "../../src/generated/service";
import {
  KnownSemanticPartialResponseReason,
  KnownSemanticPartialResponseType,
  KnownQueryDebugMode,
  KnownSemanticErrorHandling,
  KnownQueryResultDocumentSemanticFieldState,
} from "../../src/generated/data";
import {
  ComplexDataType,
  SearchFieldDataType,
  SemanticPartialResponseReason,
  SemanticPartialResponseType,
  QueryDebugMode,
  SemanticErrorHandling,
  QueryResultDocumentSemanticFieldState,
  VectorSearchAlgorithmMetric,
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
type ExpectSemanticErrorHandling = `${KnownSemanticErrorHandling}`;
type ExpectQueryResultDocumentSemanticFieldState = `${KnownQueryResultDocumentSemanticFieldState}`;
type ExpectVectorSearchAlgorithmMetric = `${KnownVectorSearchAlgorithmMetric}`;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
function fun() {
  const a: IsIdentical<ExpectSearchFieldDataType, SearchFieldDataType> = "pass";
  const b: IsIdentical<ExpectSemanticPartialResponseReason, SemanticPartialResponseReason> = "pass";
  const c: IsIdentical<ExpectSemanticPartialResponseType, SemanticPartialResponseType> = "pass";
  const d: IsIdentical<ExpectQueryDebugMode, QueryDebugMode> = "pass";
  const e: IsIdentical<ExpectSemanticErrorHandling, SemanticErrorHandling> = "pass";
  const f: IsIdentical<
    ExpectQueryResultDocumentSemanticFieldState,
    QueryResultDocumentSemanticFieldState
  > = "pass";
  const g: IsIdentical<ExpectVectorSearchAlgorithmMetric, VectorSearchAlgorithmMetric> = "pass";
}

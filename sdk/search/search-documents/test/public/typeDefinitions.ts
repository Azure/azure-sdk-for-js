// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/* eslint-disable no-unused-expressions */
/* eslint-disable no-constant-condition */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  KnownCharFilterName,
  KnownLexicalAnalyzerName,
  KnownLexicalTokenizerName,
  KnownTokenFilterName,
  KnownVectorSearchAlgorithmKind,
  KnownVectorSearchAlgorithmMetric,
} from "../../src/generated/service";

import { KnownVectorFilterMode } from "../../src/generated/data";

import {
  KnownAnalyzerNames,
  KnownCharFilterNames,
  KnownTokenFilterNames,
  KnownTokenizerNames,
  VectorFilterMode,
  VectorSearchAlgorithmKind,
  VectorSearchAlgorithmMetric,
} from "../../src/index";

type IsIdentical<T1, T2> =
  (<T>() => T extends T1 ? true : false) extends <T>() => T extends T2 ? true : false ? any : never;

type ExpectVectorSearchAlgorithmMetric = `${KnownVectorSearchAlgorithmMetric}`;
type ExpectVectorSearchAlgorithmKind = `${KnownVectorSearchAlgorithmKind}`;
type ExpectVectorFilterMode = `${KnownVectorFilterMode}`;
type ExpectKnownCharFilterNames = `${KnownCharFilterName}`;
type ExpectKnownAnalyzerNames = `${KnownLexicalAnalyzerName}`;
type ExpectKnownTokenizerNames = `${KnownLexicalTokenizerName}`;
type ExpectKnownTokenFilterNames = `${KnownTokenFilterName}`;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
function fun() {
  const a: IsIdentical<ExpectVectorSearchAlgorithmMetric, VectorSearchAlgorithmMetric> = "pass";
  const b: IsIdentical<ExpectVectorSearchAlgorithmKind, VectorSearchAlgorithmKind> = "pass";
  const c: IsIdentical<ExpectVectorFilterMode, VectorFilterMode> = "pass";
  const d: IsIdentical<ExpectKnownCharFilterNames, `${KnownCharFilterNames}`> = "pass";
  const e: IsIdentical<ExpectKnownAnalyzerNames, `${KnownAnalyzerNames}`> = "pass";
  const f: IsIdentical<ExpectKnownTokenizerNames, `${KnownTokenizerNames}`> = "pass";
  const g: IsIdentical<ExpectKnownTokenFilterNames, `${KnownTokenFilterNames}`> = "pass";

  return [a, b, c, d, e, f, g];
}

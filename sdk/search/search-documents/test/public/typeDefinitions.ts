// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

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
} from "../../src/generated/service";

import {
  KnownCharFilterNames,
  KnownAnalyzerNames,
  KnownTokenizerNames,
  KnownTokenFilterNames,
} from "../../src/index";

type IsIdentical<T1, T2> = (<T>() => T extends T1 ? true : false) extends <T>() => T extends T2
  ? true
  : false
  ? any
  : never;

type ExpectKnownCharFilterNames = `${KnownCharFilterName}`;
type ExpectKnownAnalyzerNames = `${KnownLexicalAnalyzerName}`;
type ExpectKnownTokenizerNames = `${KnownLexicalTokenizerName}`;
type ExpectKnownTokenFilterNames = `${KnownTokenFilterName}`;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
function fun() {
  const a: IsIdentical<ExpectKnownCharFilterNames, `${KnownCharFilterNames}`> = "pass";
  const b: IsIdentical<ExpectKnownAnalyzerNames, `${KnownAnalyzerNames}`> = "pass";
  const c: IsIdentical<ExpectKnownTokenizerNames, `${KnownTokenizerNames}`> = "pass";
  const d: IsIdentical<ExpectKnownTokenFilterNames, `${KnownTokenFilterNames}`> = "pass";

  return [a, b, c, d];
}

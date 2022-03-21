// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TsAccess, TsLibrary } from "../../../../src/codeGenerator";
import { testCaseType } from "./common/testCaseType";

const tsClassTestCases: Array<(outputDir: string) => testCaseType> = [
  function createSimpleClass(outputDir: string): testCaseType {
    const tsLibrary = new TsLibrary(outputDir);
    tsLibrary.class({ name: "testClass", exports: true });
    return { name: "minimal class", codeGenerator: tsLibrary, fileName: "tsClass_1.txt" };
  },

  function createClassWithConstructorAndFields(outputDir: string): testCaseType {
    const tsLibrary = new TsLibrary(outputDir);
    tsLibrary
      .class({ name: "testClassWithConstructor", exports: true })
      .field({ name: "stringField", type: "string" })
      .field({ name: "boolField", type: "boolean", access: TsAccess.Protected })
      .field({ name: "_numberField", type: "number", access: TsAccess.Private, readonly: true })
      .ctor.parameter({ name: "stringParameter", type: "string" })
      .parameter({ name: "numberParameter", type: "number" })
      .body.line("this.stringField = stringParameter;")
      .line("this._numberField = numberParameter;")
      .line("this.boolField = false;");

    return {
      name: "class with constructor and fields",
      codeGenerator: tsLibrary,
      fileName: "tsClass_2.txt"
    };
  },

  function createOverlappingImportsClass(outputDir: string): testCaseType {
    const tsLibrary = new TsLibrary(outputDir);
    tsLibrary
      .class({ name: "testClass", exports: true })
      .import(`import * as test from "foo";`)
      .import(`import * as test from "foo";`)
      .import(`import * as test from "foo";`)
      .import(`import * as test from "foo";`);
    return {
      name: "overlapping imports class",
      codeGenerator: tsLibrary,
      fileName: "tsClass_3.txt"
    };
  }
];

export const tsClassCase = { unitUnderTest: "TsClass", testCases: tsClassTestCases };

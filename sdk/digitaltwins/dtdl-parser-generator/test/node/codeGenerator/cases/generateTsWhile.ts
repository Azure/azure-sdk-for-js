// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TsAccess, TsLibrary } from "../../../../src/codeGenerator";
import { testCaseType } from "./common/testCaseType";

const tsWhileTestCases: Array<(outputDir: string) => testCaseType> = [
  function createClassWithWhileLoop(outputDir: string): testCaseType {
    const tsLibrary = new TsLibrary(outputDir);
    const tsClass = tsLibrary.class({ name: "testClass", exports: true });
    tsClass.field({ name: "_foo", type: "number", access: TsAccess.Private });
    tsClass.ctor.parameter({ name: "foo", type: "number" }).body.line("this._foo = foo;");
    const whileMethod = tsClass
      .method({ name: "whileMethod" })
      .parameter({ name: "_input", type: "any" }).body;
    whileMethod.while("this._foo < 5").line("this._foo++;");
    whileMethod.line("console.log(this._foo);");

    return { name: "while loop", codeGenerator: tsLibrary, fileName: "tsWhile.txt" };
  }
];

export const tsWhileCase = { unitUnderTest: "TsWhile", testCases: tsWhileTestCases };

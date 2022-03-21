// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TsAccess, TsLibrary } from "../../../../src/codeGenerator";
import { testCaseType } from "./common/testCaseType";

const tsForTestCases: Array<(outputDir: string) => testCaseType> = [
  function createSimpleForLoop(outputDir: string): testCaseType {
    const tsLibrary = new TsLibrary(outputDir);
    const tsClass = tsLibrary.class({ name: "testClass", exports: true });
    tsClass.field({ name: "_foo", type: "number", access: TsAccess.Private });
    tsClass.ctor.parameter({ name: "foo", type: "number" }).body.line("this._foo = foo;");
    const forMethod = tsClass
      .method({ name: "forMethod" })
      .parameter({ name: "input", type: "any" }).body;
    forMethod
      .for("let i = input; i < this._foo; i++")
      .line("console.log(`outputting the value ${i}`);");
    forMethod.line("console.log(`For loop has completed ${this._foo}`);");

    return { name: "for loop block", codeGenerator: tsLibrary, fileName: "tsFor.txt" };
  }
];

export const tsForCase = { unitUnderTest: "TsFor", testCases: tsForTestCases };

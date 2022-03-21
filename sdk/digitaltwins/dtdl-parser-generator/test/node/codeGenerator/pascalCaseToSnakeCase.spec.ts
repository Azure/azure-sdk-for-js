// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable no-undef */
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { expect } from "chai";
import { pascalToSnake } from "../../../src/codeGenerator";

describe("pascalToSnake", function() {
  const testCases: { input: string; output: string }[] = [
    { input: "TEST", output: "test" },
    { input: "EntityInfo", output: "entity_info" },
    { input: "CodeGenerator", output: "code_generator" },
    { input: "TsInterfaceException", output: "ts_interface_exception" },
    { input: "TryMe", output: "try_me" }
  ];

  testCases.forEach((testCase) => {
    it(`reformats ${testCase.input} to ${testCase.output}`, function() {
      const output = pascalToSnake(testCase.input);
      expect(output).to.equal(testCase.output);
    });
  });
});

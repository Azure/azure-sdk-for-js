// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable no-undef */
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as helper from "./helperToProcessExpectedFiles";
import { expect } from "chai";
import fs from "fs";
import sinon from "sinon";
import { tsClassCase } from "./cases/generateTsClass";
import { tsForCase } from "./cases/generateTsFor";
import { tsTryCatchFinallyCase } from "./cases/generateTsTryCatchFinally";
import { tsWhileCase } from "./cases/generateTsWhile";

const codeGeneratorTestCaseUnits = [tsClassCase, tsForCase, tsTryCatchFinallyCase, tsWhileCase];

/**
 * Code Generator Tests
 *
 * @remarks
 * This may look like a complicated block of code. It's a bit abstracted. The reason for this is so that we
 * can create individual generation samples modelled as 'cases' that we store in the 'cases' folder of this
 * directory.
 *
 * The cases are bundled up into objects with information on what the case demonstrates, and a filename of a
 * file in the expected folder. The expected folder contains formatted typescript files that model what the
 * output of each test case should be.
 *
 * 'helper_process_case_file.ts' contains a function for removing the whitespace around the expected codeblocks
 * and providing them in a format that we can easily compare to the code generated during each test.
 *
 * The outer loop on goes through each tested unit of the Code Generator codebase that we
 * test here. We're doing integration tests, so some files are implicitly rather than explicitly tested using
 * the current testing structure. For example it will go through the TsClass tests, the TsFor tests, etc...
 *
 * The inner loop will go through each scenario tested on the unit under test. In most situations this loop
 * will only run once, since only one test scenario has been implemented. But in the case of TsClass for
 * instance, there are multiple scenarios we want to test on TsClass, so we have multiple tests performed.
 */
describe("Code Generator", function() {
  afterEach(function() {
    sinon.restore();
  });
  codeGeneratorTestCaseUnits.forEach((testCase) => {
    describe(`${testCase.unitUnderTest}`, function() {
      testCase.testCases.forEach((generationScenario) => {
        const generatedScenario = generationScenario("./");
        it(`writes a ${generatedScenario.name}`, function() {
          const fakeFile: string[] = [];
          const fakeWrite = function(input: string): void {
            fakeFile.push(input);
          };
          const fakeEnd = sinon.stub();
          const fakeStreamWriter = { write: fakeWrite, end: fakeEnd };
          sinon.stub(fs, "createWriteStream").callsFake((): any => {
            return fakeStreamWriter;
          });
          generatedScenario.codeGenerator.generateFiles();
          const actual = fakeFile.join("").split(/\r\n/);
          const expected = helper.processExpectedOutputFile(generatedScenario.fileName);
          expect(actual).to.deep.equal(expected);
        });
      });
    });
  });
});

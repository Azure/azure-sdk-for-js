// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable no-undef */
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as fs from "fs";
import { ResultFormatter } from "../../src/parser/resultFormatter";
import { expect } from "chai";

const testCaseFolder = "test/phrases/";
const caseFileExtension = ".json";

interface ResultFormatterTestCase {
  description: boolean;
  phrase: string;
  install: { [key: string]: string };
  expect: string;
}

function getTestName(filename: string): string {
  return filename.substring(0, filename.length - caseFileExtension.length);
}

function getTestDescription(filename: string): string {
  return (
    "Test" +
    getTestName(filename).replace(/[A-Z]/g, function(c) {
      return " " + c.toLowerCase();
    })
  );
}

describe("Tests of ResultFormatter class", function() {
  fs.readdir(testCaseFolder, (err: NodeJS.ErrnoException | null, filenames: string[]) => {
    if (err) {
      throw err;
    }
    filenames.forEach((filename: string) => {
      fs.readFile(
        testCaseFolder + filename,
        (readFileErr: NodeJS.ErrnoException | null, data: Buffer) => {
          if (readFileErr) {
            throw readFileErr;
          }

          const testCases: ResultFormatterTestCase[] = JSON.parse(data.toString());

          describe(getTestDescription(filename), function() {
            for (const testCase of testCases) {
              it(`formats ${testCase.description}`, function() {
                const resultFormatter = new ResultFormatter(testCase.phrase);
                for (const installKey in testCase.install) {
                  // eslint-disable-line guard-for-in
                  resultFormatter.install(installKey, testCase.install[installKey]);
                }
                expect(resultFormatter.toString()).to.equal(testCase.expect);
              });
            }
          });
        }
      );
    });
  });
});

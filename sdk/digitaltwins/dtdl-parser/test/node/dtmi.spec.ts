// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable no-undef */
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as fs from "fs";
import { DTMI } from "../../src/parser/dtmi";
import { expect } from "chai";

const testCaseFolder = "test/dtmis/";
const caseFileExtension = ".json";

interface DtmiTestCaseExpectation {
  MajorVersion?: number;
  MinorVersion?: number;
  CompleteVersion?: number;
  Versionless?: string;
  Labels?: string[];
  IsReserved?: boolean;
  Fragment?: string;
}

interface DtmiTestCase {
  valid: boolean;
  idText: string;
  expect?: DtmiTestCaseExpectation;
}

function getTestName(filename: string): string {
  return filename.substring(0, filename.length - caseFileExtension.length);
}

function getTestDescription(filename: string, valid: boolean): string {
  return (
    "will " +
    (valid ? "succeed" : "throw") +
    " when" +
    getTestName(filename)
      .replace(/[A-Z]/g, function(c) {
        return " " + c.toLowerCase();
      })
      .replace("dtmi", "DTMI")
  );
}

function testForSuccess(idText: string, expectation: DtmiTestCaseExpectation): void {
  const dtmi = new DTMI(idText);

  if (Object.prototype.hasOwnProperty.call(expectation, "MajorVersion")) {
    it("major version", function() {
      expect(dtmi.majorVersion).to.equal(expectation.MajorVersion);
    });
  }

  if (Object.prototype.hasOwnProperty.call(expectation, "MinorVersion")) {
    it("minor version", function() {
      expect(dtmi.minorVersion).to.equal(expectation.MinorVersion);
    });
  }

  if (Object.prototype.hasOwnProperty.call(expectation, "CompleteVersion")) {
    it("complete version", function() {
      expect(dtmi.completeVersion).to.equal(expectation.CompleteVersion);
    });
  }

  if (Object.prototype.hasOwnProperty.call(expectation, "Versionless")) {
    it("versionless", function() {
      expect(dtmi.versionless).to.equal(expectation.Versionless);
    });
  }

  if (Object.prototype.hasOwnProperty.call(expectation, "Labels")) {
    it("labels", function() {
      expect(dtmi.labels).to.deep.equal(expectation.Labels);
    });
  }

  if (Object.prototype.hasOwnProperty.call(expectation, "IsReserved")) {
    it("isReserved", function() {
      expect(dtmi.isReserved).to.equal(expectation.IsReserved);
    });
  }

  if (Object.prototype.hasOwnProperty.call(expectation, "Fragment")) {
    it("fragment", function() {
      expect(dtmi.fragment).to.equal(expectation.Fragment);
    });
  }
}

function testForThrow(idText: string): void {
  it("throw", function() {
    expect(function() {
      new DTMI(idText);
    }).to.throw();
  });
}

describe("Tests of DTMI class", function() {
  const filenames = fs.readdirSync(testCaseFolder, "utf-8");
  for (const filename of filenames) {
    const data = fs.readFileSync(testCaseFolder + filename, "utf-8");
    const testCase: DtmiTestCase = JSON.parse(data.toString());
    describe(getTestDescription(filename, testCase.valid), function() {
      if (testCase.valid) {
        testForSuccess(testCase.idText, testCase.expect as DtmiTestCaseExpectation);
      } else {
        testForThrow(testCase.idText);
      }
    });
  }
});

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable sort-imports */
/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */

import { expect, use as useChai } from "chai";
import { createParser, ModelParser } from "../src/index";
import { ModelParsingOption } from "../src/parser/enum/modelParsingOption";
// import {ParsingErrorImpl} from '../../../src/parser/parsingErrorImpl';
import chaiAsPromised from "chai-as-promised";
// eslint-disable-next-line sort-imports
import { InDTMI, ParsingError } from "../src/parser";
import { Context } from "mocha";
import { getTestcase } from "../src/utils/getTestcase";
import { getFilenames } from "../src/utils/getFilenames";
import { isNode } from "@azure/core-util";
import { logger } from "../src/utils/logger";
import { setLogLevel } from "@azure/logger";
setLogLevel("info");
useChai(chaiAsPromised);

const testCaseFolder = "test/cases/";
const caseFileExtension = ".json";

interface ResolutionInfo {
  request: string[]; // list of DTMIs
  response?: any[]; // list of DTDLs
}

interface ElementInfo {
  id: string;
  type: string;
  properties?: { [index: string]: any };
  supplementalTypes?: string[];
  supplementalProperties?: { [index: string]: any };
  undefinedTypes?: string[];
  undefinedProperties?: { [index: string]: any };
}

interface ValidExpectation {
  elementCount?: number;
  elements?: ElementInfo[];
}

interface ErrorInfo {
  ValidationID: string;
  PrimaryID?: string;
  SecondaryID?: string;
  Property?: string;
  Value: string;
}

interface InvalidExpectation {
  parsingErrors?: ErrorInfo[];
  unresolvedIdentifiers?: string[];
}

interface ModelTestCase {
  valid: boolean;
  options: string[];
  maxDtdlVersion?: number;
  input: any[];
  resolution?: ResolutionInfo[];
  expect: ValidExpectation | InvalidExpectation;
}

class ModelsRepositoryClientMock {
  private _resolutionInfos: ResolutionInfo[];

  constructor(resolutionInfos: ResolutionInfo[]) {
    this._resolutionInfos = resolutionInfos;
    this.resolutionCount = 0;
  }

  resolutionCount: number;

  getModels(dtmis: string | string[]): Promise<{ [dtmi: string]: unknown }> {
    expect(this.resolutionCount).to.be.lessThan(
      this._resolutionInfos.length,
      "resolution count exceeded expectation"
    );

    const resolutionInfo = this._resolutionInfos[this.resolutionCount];

    expect(dtmis).to.have.members(
      resolutionInfo.request,
      "list of identifiers to resolve does not match expectation"
    );

    this.resolutionCount++;

    if (
      Object.prototype.hasOwnProperty.call(resolutionInfo, "response") &&
      resolutionInfo.response !== null
    ) {
      const result: { [dtmi: string]: unknown } = {};
      for (const element of resolutionInfo.response as any[]) {
        result[element["@id"]] = element;
      }
      return Promise.resolve(result);
    } else {
      return Promise.reject("No resolutionInfo response information");
    }
  }
}

function getTestName(filename: string): string {
  return filename.substring(0, filename.length - caseFileExtension.length);
}

function getTestDescription(filename: string, valid: boolean): string {
  return "will " + (valid ? "succeed" : "throw") + " on " + getTestName(filename);
}

async function testForSuccess(
  modelParser: ModelParser,
  input: string[],
  expectation: ValidExpectation
): Promise<void> {
  logger.info(`modelParser parsing model...`);
  const model = await modelParser.parse(input);
  logger.info(`done.`);

  if (Object.prototype.hasOwnProperty.call(expectation, "elementCount")) {
    expect(
      Object.entries(model).length,
      "count of model elements does not match expected value"
    ).to.equal(expectation.elementCount);
  }

  if (Object.prototype.hasOwnProperty.call(expectation, "elements")) {
    for (const expectedElement of expectation.elements as ElementInfo[]) {
      expect(
        Object.prototype.hasOwnProperty.call(model, expectedElement.id),
        "model does not contain element with ID " + expectedElement.id
      ).to.be.true;

      const element = model[expectedElement.id];

      // TODO: check that element type matches expectedElement.type

      if (Object.prototype.hasOwnProperty.call(expectedElement, "properties")) {
        for (const property in expectedElement.properties) {
          // eslint-disable-line guard-for-in
          expect(element, "element " + expectedElement.id).to.have.property(property);

          // TODO: the following test is not correct for object properties
          if (element !== undefined) {
            // TODO Other cases of assertions for failing tests
            const actualValues = (element as { [x: string]: any })[property];
            // logger.info(actualValues);
            if (actualValues !== undefined) {
              if (
                typeof actualValues === "string" ||
                typeof actualValues === "boolean" ||
                typeof actualValues === "number"
              ) {
                expect(
                  actualValues,
                  "element " + expectedElement.id + " property " + property
                ).to.deep.equal(expectedElement.properties[property]);
              } else if (Object.prototype.hasOwnProperty.call(actualValues, "id")) {
                expect(
                  actualValues.id,
                  "element " + expectedElement.id + " property " + property
                ).to.deep.equal(expectedElement.properties[property]);
              } else if (actualValues instanceof InDTMI) {
                expect(
                  actualValues.value,
                  "element " + expectedElement.id + " property " + property
                ).to.deep.equal(expectedElement.properties[property]);
              } else if (Array.isArray(actualValues)) {
                for (let counter: number = 1; counter < actualValues.length; counter++) {
                  const actualValue = actualValues[counter];
                  const expectedValue = expectedElement.properties[property][counter];
                  if (Object.prototype.hasOwnProperty.call(actualValue, "id")) {
                    // just an object
                    expect(
                      actualValue.id,
                      "element " + expectedElement.id + " property " + property
                    ).to.deep.equal(expectedValue);
                  } else {
                    expect(
                      actualValue,
                      "element " + expectedElement.id + " property " + property
                    ).to.deep.equal(expectedValue);
                  }
                }
              } else {
                const actualKeys = Object.keys(actualValues);
                const expectedkeys = Object.keys(expectedElement.properties[property]);
                if (actualKeys.length >= 1) {
                  // plural or single dictionary
                  expect(actualValues).to.have.deep.keys(expectedkeys);
                  Object.entries(expectedElement.properties[property]).forEach(
                    ([expectedKey, expectedValue]) => {
                      const actualValue = actualValues[expectedKey];
                      if (Object.prototype.hasOwnProperty.call(actualValue, "id")) {
                        // just an object
                        expect(
                          actualValue.id,
                          "element " + expectedElement.id + " property " + property
                        ).to.deep.equal(expectedValue);
                      } else {
                        expect(
                          actualValue,
                          "element " + expectedElement.id + " property " + property
                        ).to.deep.equal(expectedValue);
                      }
                    }
                  );
                }
              }
            }
          }
        }
        logger.info(`testForSuccess completed.`);
      }

      if (Object.prototype.hasOwnProperty.call(expectedElement, "supplementalTypes")) {
        if (element !== undefined) {
          const actualValues = element.supplementalTypes.map((info: { type: any }) => info.type);
          expect(actualValues).to.have.deep.equals(expectedElement.supplementalTypes);
        }
      }

      if (Object.prototype.hasOwnProperty.call(expectedElement, "supplementalProperties")) {
        for (const expectedKey in expectedElement.supplementalProperties) {
          // eslint-disable-line no-unused-vars
          // TODO: check that element's supplemental property collection includes supplementalProperty with value expectedElement.supplementalProperties[supplementalProperty]
          if (element !== undefined) {
            const expectedSupplementalProperty =
              expectedElement.supplementalProperties[expectedKey];
            const actualSupplementalProperty = element.supplementalProperties[expectedKey];
            if (Object.prototype.hasOwnProperty.call(actualSupplementalProperty, "id")) {
              expect(actualSupplementalProperty.id).to.deep.equal(expectedSupplementalProperty);
            } else {
              expect(actualSupplementalProperty).to.deep.equal(expectedSupplementalProperty);
            }
          }
        }
      }

      if (Object.prototype.hasOwnProperty.call(expectedElement, "undefinedTypes")) {
        if (element !== undefined) {
          expect(expectedElement.undefinedTypes as string[]).to.deep.equals(
            element.undefinedTypes as string[]
          );
        }
      }

      if (Object.prototype.hasOwnProperty.call(expectedElement, "undefinedProperties")) {
        if (element !== undefined) {
          expect(expectedElement.undefinedProperties as { [name: string]: any }).to.deep.equals(
            element.undefinedProperties as { [name: string]: any }
          );
        }
      }
    }
  }
}

function getMatchingError(parsingErrors: ParsingError[], errorInfo: ErrorInfo): ParsingError {
  for (const parsingError of parsingErrors) {
    if (
      parsingError.validationId === errorInfo.ValidationID &&
      (!errorInfo.PrimaryID || parsingError.primaryId === errorInfo.PrimaryID)
    ) {
      return parsingError;
    }
  }
  throw new Error(
    "failed to receive expected error with ValidationID=" +
      errorInfo.ValidationID +
      (errorInfo.PrimaryID ? " and PrimaryID=" + errorInfo.PrimaryID : "")
  );
}

async function testForThrow(
  modelParser: ModelParser,
  input: string[],
  expectation: InvalidExpectation
): Promise<void> {
  return expect(
    modelParser.parse(input),
    "ModelParser.parseAsync() did not throw"
  ).to.be.rejected.then((error: any): void => {
    if (Object.prototype.hasOwnProperty.call(expectation, "parsingErrors")) {
      expect(error, "thrown exception is not a ParsingException").to.have.property("errors");

      for (const expectedError of expectation.parsingErrors as ErrorInfo[]) {
        const actualError = getMatchingError(error.errors, expectedError);

        if (Object.prototype.hasOwnProperty.call(expectedError, "PrimaryID")) {
          expect(actualError).to.have.property("primaryId", expectedError.PrimaryID ?? "");
        }

        if (Object.prototype.hasOwnProperty.call(expectedError, "SecondaryID")) {
          if (Array.isArray(expectedError.SecondaryID)) {
            // TODO Order is different here. Expected contains actual. C# already has this implemented like this.
            expect(expectedError.SecondaryID).to.include.members(
              [actualError.secondaryId],
              "Actual secondary id is absent"
            );
          } else {
            expect(actualError).to.have.property("secondaryId", expectedError.SecondaryID ?? "");
          }
        }

        if (Object.prototype.hasOwnProperty.call(expectedError, "Property")) {
          expect(actualError).to.have.property("property", expectedError.Property ?? "");
        }

        if (Object.prototype.hasOwnProperty.call(expectedError, "Value")) {
          expect(actualError).to.have.property("value", expectedError.Value ?? "");
        }

        if (Object.prototype.hasOwnProperty.call(expectedError, "ValidationID")) {
          expect(actualError).to.have.property("validationId", expectedError.ValidationID ?? "");
        }
      }
    } else if (Object.prototype.hasOwnProperty.call(expectation, "unresolvedIdentifiers")) {
      expect(error, "thrown exception is not a ResolutionError").to.have.property(
        "undefinedIdentifiers"
      );
      expect(error.undefinedIdentifiers).to.have.members(
        expectation.unresolvedIdentifiers as string[],
        "undefined identifiers did not match expectation"
      );
    }

    return undefined;
  });
}

function shouldRunTest(expectation: InvalidExpectation): boolean {
  if (!Object.prototype.hasOwnProperty.call(expectation, "parsingErrors")) {
    return false;
  }

  const parsingErrors = expectation.parsingErrors as ErrorInfo[];

  return (
    parsingErrors.length === 1 &&
    parsingErrors[0].PrimaryID === null &&
    [
      "dtmi:dtdl:parsingError:notJsonObject",
      "dtmi:dtdl:parsingError:graphDisallowed",
      "dtmi:dtdl:parsingError:missingTopLevelId",
      "dtmi:dtdl:parsingError:missingContext",
      "dtmi:dtdl:parsingError:emptyContext",
      "dtmi:dtdl:parsingError:missingDtdlContext",
      "dtmi:dtdl:parsingError:disallowedLocalContext",
      "dtmi:dtdl:parsingError:disallowedContextVersion",
      "dtmi:dtdl:parsingError:invalidContextElement",
      "dtmi:dtdl:parsingError:localTermEmpty",
      "dtmi:dtdl:parsingError:localTermSchemePrefix",
      "dtmi:dtdl:parsingError:localTermInvalid",
      "dtmi:dtdl:parsingError:localDefinitionNotString",
      "dtmi:dtdl:parsingError:localDefinitionNotDtmiScheme",
      "dtmi:dtdl:parsingError:localDefinitionNotDtmi"
    ].includes(parsingErrors[0].ValidationID)
  );
}

describe("Tests of ModelParser", function() {
  logger.info(`testCaseFolder: ${testCaseFolder}`);
  const filenames = getFilenames(testCaseFolder);
  for (const filename of filenames) {
    logger.info(`filename: ${filename}`);
    logger.info(`isNode: ${isNode}`);
    const data = isNode ? getTestcase(testCaseFolder + filename) : getTestcase(filename);
    logger.info(`data: ${data}`);
    const testCase: ModelTestCase = JSON.parse(data.toString());
    logger.info(`testCase: ${testCase}`);
    const testName = getTestName(filename);
    logger.info(`testName: ${testName}`);
    const testDescription = getTestDescription(filename, testCase.valid);
    logger.info(`testDescription: ${testDescription}`);
    describe(testName, function() {
      it(testDescription, async function() {
        const resolverClosure = testCase.resolution
          ? new ModelsRepositoryClientMock(testCase.resolution)
          : null;

        const modelParserOptions = testCase.options.reduce(
          (option: ModelParsingOption, optionString: string) => {
            return option | ModelParsingOption[optionString as keyof typeof ModelParsingOption];
          },
          ModelParsingOption.None
        );
        const modelParser = createParser(modelParserOptions);
        if (resolverClosure) {
          modelParser.getModels = resolverClosure.getModels.bind(resolverClosure);
        }

        if (Object.prototype.hasOwnProperty.call(testCase, "maxDtdlVersion")) {
          modelParser.maxDtdlVersion = testCase.maxDtdlVersion;
        }

        const input: string[] = [];
        for (const element of testCase.input) {
          input.push(JSON.stringify(element));
        }

        if (testCase.valid) {
          if (
            testCase.options.includes("ParseIgnoresElementsWithAutoIDsAndDuplicateNames") ||
            testCase.options.includes("ResolveIgnoresElementsWithAutoIDsAndDuplicateNames") ||
            testCase.options.includes("ParseAllowsIdReferenceSyntax") ||
            testCase.options.includes("ResolveAllowsIdReferenceSyntax")
          ) {
            // these are all being skipped because they will not be implemented in JS.
            // eslint-disable-next-line
            this.skip();
          }
          // this.skip();
          logger.info(`running testForSuccess...`);
          await testForSuccess(modelParser, input, testCase.expect as ValidExpectation);
          logger.info(`done.`);
        } else {
          const expectation = testCase.expect as InvalidExpectation;
          // TODO Dtmi Resolver is not implemented which is a delegate in C#
          // if (testCase.resolution !== undefined && testCase.resolution.length > 0) {
          //   this.skip();
          // }
          if (!shouldRunTest(expectation)) {
            // this.skip();
          }
          logger.info(`running testForThrow...`);
          await testForThrow(modelParser, input, expectation);
          logger.info(`done.`);
        }

        if (Object.prototype.hasOwnProperty.call(testCase, "resolution")) {
          expect(resolverClosure?.resolutionCount).to.equal(
            testCase.resolution?.length,
            "resolution count did not match expectation"
          );
        }
      });
    });
  }
});

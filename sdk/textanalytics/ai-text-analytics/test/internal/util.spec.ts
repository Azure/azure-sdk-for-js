// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { parseActionError } from "../../src/analyzeActionsResult";
import { sortResponseIdObjects } from "../../src/util";

describe("util.sortByPreviousOrder", () => {
  it("should sort outputs correctly", () => {
    const input = [{ id: "1" }, { id: "2" }, { id: "3" }];
    const output = [{ id: "3" }, { id: "1" }, { id: "2" }];
    const result = sortResponseIdObjects(input, output);
    assert.deepEqual(result, input);
  });
});

describe("AnalyzeActionsResult.parseActionError", () => {
  it("parses entityRecognitionTasks pointer", () => {
    const pointer = "#/tasks/entityRecognitionTasks/2";
    const result = parseActionError({ message: "", target: pointer, code: "" });
    assert.deepEqual(result, {
      code: "",
      message: "",
      type: "RecognizeCategorizedEntities",
      index: 2,
    });
  });

  it("parses entityRecognitionPiiTasks pointer", () => {
    const pointer = "#/tasks/entityRecognitionPiiTasks/2";
    const result = parseActionError({ message: "", target: pointer, code: "" });
    assert.deepEqual(result, { code: "", message: "", type: "RecognizePiiEntities", index: 2 });
  });

  it("parses keyPhraseExtractionTasks pointer", () => {
    const pointer = "#/tasks/keyPhraseExtractionTasks/2";
    const result = parseActionError({ message: "", target: pointer, code: "" });
    assert.deepEqual(result, { code: "", message: "", type: "ExtractKeyPhrases", index: 2 });
  });
});

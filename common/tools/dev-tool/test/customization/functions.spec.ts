// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, beforeEach } from "vitest";
import { Project, SourceFile, FunctionDeclaration } from "ts-morph";
import { augmentFunction } from "../../src/util/customization/functions";

describe("Functions", () => {
  let project: Project;
  let originalFile: SourceFile;
  let customFile: SourceFile;
  let originalFunction: FunctionDeclaration | undefined;
  let customFunction: FunctionDeclaration;

  beforeEach(() => {
    project = new Project({ useInMemoryFileSystem: true });
    originalFile = project.createSourceFile("original.ts", "");
    customFile = project.createSourceFile("custom.ts", "");
    originalFunction = undefined;
    customFunction = customFile.addFunction({
      name: "myFunction",
      parameters: [{ name: "param", type: "string" }],
    });
  });

  it("should add custom functions to the original file", () => {
    augmentFunction(customFunction, originalFunction, originalFile);

    assert.isDefined(originalFile.getFunction("myFunction"));
  });

  it("should replace existing functions with custom functions", () => {
    originalFunction = originalFile.addFunction({
      name: "myFunction",
      parameters: [{ name: "param", type: "boolean" }],
    });

    augmentFunction(customFunction, originalFunction, originalFile);

    assert.equal(
      originalFile.getFunction("myFunction")?.getParameter("param")?.getType().getText(),
      "string",
    );
  });

  it("should convert existing functions to private functions", () => {
    originalFunction = originalFile.addFunction({
      name: "myFunction",
      parameters: [{ name: "param", type: "boolean" }],
    });

    customFunction.addStatements(["_myFunction(Boolean(param));", "console.log('custom');"]);

    augmentFunction(customFunction, originalFunction, originalFile);

    assert.isDefined(originalFile.getFunction("myFunction"));
    assert.isDefined(originalFile.getFunction("_myFunction"));
    assert.include(originalFile.getFunction("myFunction")?.getText(), "_myFunction");
  });
});

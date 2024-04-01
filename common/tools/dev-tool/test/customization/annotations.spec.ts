// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { describe, it, assert, beforeEach } from "vitest";
import { Project, SourceFile } from "ts-morph";
import { getAnnotation } from "../../src/util/customization/helpers/annotations";

describe("Annotations", () => {
  let project: Project;
  let file: SourceFile;

  beforeEach(() => {
    project = new Project({ useInMemoryFileSystem: true });
    file = project.createSourceFile("file.ts", "");
  });

  describe("when annotations are present", () => {
    describe("without parameter", () => {
      it("should find it in Declarations", () => {
        const functionDeclaration = file.addFunction({
          leadingTrivia: "/* @azsdk-remove */",
          name: "myFunction",
          parameters: [{ name: "param", type: "string" }],
        });

        const annotation = getAnnotation(functionDeclaration);
        assert.deepEqual(annotation, { type: "remove", param: undefined });
      });

      it("should find it in Properties", () => {
        const interfaceDeclaration = file.addInterface({
          name: "myInterface",
          properties: [
            {
              leadingTrivia: "/* @azsdk-remove */",
              name: "myProperty",
              type: "string",
            },
          ],
        });
        const propertyDeclaration = interfaceDeclaration.getProperty("myProperty")!;

        const annotation = getAnnotation(propertyDeclaration);
        assert.deepEqual(annotation, { type: "remove", param: undefined });
      });

      it("should find it in CallSignatures", () => {
        const interfaceDeclaration = file.addInterface({
          name: "myInterface",
          callSignatures: [
            {
              leadingTrivia: "/* @azsdk-remove */",
              returnType: "string",
            },
          ],
        });
        const callSignatureDeclaration = interfaceDeclaration.getCallSignatures()[0];

        const annotation = getAnnotation(callSignatureDeclaration);
        assert.deepEqual(annotation, { type: "remove", param: undefined });
      });
    });

    describe("with parameter", () => {
      it("should find it in Declarations", () => {
        const functionDeclaration = file.addFunction({
          leadingTrivia: "/* @azsdk-rename(myNewFunction) */",
          name: "myFunction",
          parameters: [{ name: "param", type: "string" }],
        });

        const annotation = getAnnotation(functionDeclaration);
        assert.deepEqual(annotation, { type: "rename", param: "myNewFunction" });
      });

      it("should find it in Properties", () => {
        const interfaceDeclaration = file.addInterface({
          name: "myInterface",
          properties: [
            {
              leadingTrivia: "/* @azsdk-rename(myNewProperty) */",
              name: "myProperty",
              type: "string",
            },
          ],
        });
        const propertyDeclaration = interfaceDeclaration.getProperty("myProperty")!;

        const annotation = getAnnotation(propertyDeclaration);
        assert.deepEqual(annotation, { type: "rename", param: "myNewProperty" });
      });
    });
  });

  describe("when annotations are not present", () => {
    it("should not find any in Declarations", () => {
      const functionDeclaration = file.addFunction({
        name: "myFunction",
        parameters: [{ name: "param", type: "string" }],
      });

      const annotation = getAnnotation(functionDeclaration);
      assert.isUndefined(annotation);
    });

    it("should not find any in Properties", () => {
      const interfaceDeclaration = file.addInterface({
        name: "myInterface",
        properties: [
          {
            name: "myProperty",
            type: "string",
          },
        ],
      });
      const propertyDeclaration = interfaceDeclaration.getProperty("myProperty")!;

      const annotation = getAnnotation(propertyDeclaration);
      assert.isUndefined(annotation);
    });

    it("should not find any in CallSignatures", () => {
      const interfaceDeclaration = file.addInterface({
        name: "myInterface",
        callSignatures: [
          {
            returnType: "string",
          },
        ],
      });
      const callSignatureDeclaration = interfaceDeclaration.getCallSignatures()[0];

      const annotation = getAnnotation(callSignatureDeclaration);
      assert.isUndefined(annotation);
    });
  });
});

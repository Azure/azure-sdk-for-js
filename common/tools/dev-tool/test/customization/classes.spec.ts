// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { describe, it, assert, beforeEach, afterEach } from "vitest";
import {
  Project,
  SourceFile,
  ClassDeclaration,
  MethodDeclaration,
  ConstructorDeclaration,
} from "ts-morph";
import {
  AUGMENT_CLASS_TOKEN,
  augmentClass,
  augmentConstructor,
  augmentMethod,
} from "../../src/util/customization/classes";

describe("Classes", () => {
  let project: Project;
  let originalFile: SourceFile;
  let customFile: SourceFile;
  let originalClass: ClassDeclaration | undefined;
  let customClass: ClassDeclaration;

  beforeEach(() => {
    project = new Project({ useInMemoryFileSystem: true });

    originalFile = project.createSourceFile(
      "original.ts",
      `
/**
 * Original docs
 */
class MyClass {}
`,
    );
    customFile = project.createSourceFile(
      "custom.ts",
      `
/**
 * Custom docs
 */
class MyClass {}
`,
    );

    originalClass = originalFile.getClassOrThrow("MyClass");
    customClass = customFile.getClassOrThrow("MyClass");
  });

  afterEach(() => {
    project.removeSourceFile(originalFile);
    project.removeSourceFile(customFile);
  });

  describe("augmentClass", () => {
    beforeEach(() => {
      originalClass?.remove();
      customClass = customFile.addClass({
        name: "MyClass",
      });
    });

    it("should add a new class to the source file", () => {
      augmentClass(undefined, customClass, originalFile);
      assert.isDefined(originalFile.getClass("MyClass"));
    });

    it("should add properties only present in the custom class", () => {
      originalClass = originalFile.addClass({ name: "MyClass" });
      customClass.addProperty({ name: "myProperty", type: "string" });
      augmentClass(originalClass, customClass, originalFile);
      assert.equal(
        originalFile.getClass("MyClass")?.getProperty("myProperty")?.getType().getText(),
        "string",
      );
    });

    it("should not add the class augmentation property", () => {
      originalClass = originalFile.addClass({ name: "MyClass" });
      customClass.addProperty({ name: "myProperty", type: "string" });
      customClass.addProperty({ name: AUGMENT_CLASS_TOKEN, type: "string" });
      augmentClass(originalClass, customClass, originalFile);
      assert.isUndefined(originalFile.getClass("MyClass")?.getProperty(AUGMENT_CLASS_TOKEN));
      assert.equal(
        originalFile.getClass("MyClass")?.getProperty("myProperty")?.getType().getText(),
        "string",
      );
    });
    it("should replace the original property with the custom property", () => {
      originalClass = originalFile.addClass({ name: "MyClass" });
      originalClass.addProperty({ name: "myProperty", type: "number" });
      customClass.addProperty({ name: "myProperty", type: "string" });
      augmentClass(originalClass, customClass, originalFile);
      assert.equal(
        originalFile.getClass("MyClass")?.getProperty("myProperty")?.getType().getText(),
        "string",
      );
    });
  });

  describe("augmentMethod", () => {
    let originalMethod: MethodDeclaration | undefined;
    let customMethod: MethodDeclaration | undefined;

    beforeEach(() => {
      project = new Project({ useInMemoryFileSystem: true });
      originalFile = project.createSourceFile("original.ts", "");
      customFile = project.createSourceFile("custom.ts", "");
      originalClass = originalFile.addClass({
        name: "MyClass",
      });
      customClass = customFile.addClass({
        name: "MyClass",
      });
    });

    it("should add a new method to the original class", () => {
      customMethod = customClass.addMethod({
        name: "myMethod",
        returnType: "void",
      });
      augmentMethod(originalMethod, customMethod, originalClass!);

      assert.isDefined(originalFile.getClass("MyClass")?.getMethod("myMethod"));
    });

    it("should augment an existing method in the original class", () => {
      originalMethod = originalClass?.addMethod({
        name: "myMethod",
        returnType: "string",
      });

      customMethod = customClass.addMethod({
        name: "myMethod",
        returnType: "number",
      });

      augmentMethod(originalMethod, customMethod, originalClass!);

      assert.equal(
        originalFile.getClass("MyClass")?.getMethod("myMethod")?.getReturnType().getText(),
        "number",
      );
    });

    it("should replace an existing method in the original class", () => {
      originalMethod = originalClass!.addMethod({
        name: "myMethod",
        returnType: "string",
      });

      customMethod = customClass.addMethod({
        name: "myMethod",
        returnType: "number",
      });

      augmentMethod(originalMethod, customMethod, originalClass!);

      assert.equal(
        originalFile.getClass("MyClass")?.getMethod("myMethod")?.getReturnType().getText(),
        "number",
      );
    });

    it("should augment existing method with the original one", () => {
      originalMethod = originalClass!.addMethod({
        name: "myMethod",
        returnType: "number",
        docs: ["Original docs"],
        statements: ["console.log('original');", "return 1;"],
      });

      customClass.addProperty({ name: AUGMENT_CLASS_TOKEN, type: "_MyClass" });
      customMethod = customClass.addMethod({
        name: "myMethod",
        returnType: "number",
        docs: ["Customized docs"],
        statements: [
          "const originalNumber = this.___.myMethod();",
          "console.log('custom')",
          "return originalNumber;",
        ],
      });

      augmentMethod(originalMethod, customMethod, originalClass!);
      const methodBody = originalFile
        .getClass("MyClass")
        ?.getMethod("myMethod")
        ?.getBody()
        ?.getText();

      const privateMethodBody = originalFile
        .getClass("MyClass")
        ?.getMethod("_myMethod")
        ?.getBody()
        ?.getText();

      const methodDocs = originalFile
        .getClass("MyClass")
        ?.getMethod("myMethod")
        ?.getJsDocs()
        ?.map((x) => x.getDescription());

      assert.include(methodBody, "return originalNumber;");
      assert.notInclude(methodBody, "return 1;");

      assert.lengthOf(methodDocs!, 1);
      assert.equal(methodDocs?.[0], "Customized docs");

      assert.notInclude(privateMethodBody, "return originalNumber;");
      assert.include(privateMethodBody, "return 1;");

      assert.isUndefined(originalFile.getClass("MyClass")?.getProperty(AUGMENT_CLASS_TOKEN));
    });
  });

  describe("augmentConstructor", () => {
    let customConstructor: ConstructorDeclaration | undefined;

    beforeEach(() => {
      project = new Project({ useInMemoryFileSystem: true });
      originalFile = project.createSourceFile("original.ts", "");
      customFile = project.createSourceFile("custom.ts", "");
      originalClass = originalFile.addClass({
        name: "MyClass",
      });
      customClass = customFile.addClass({
        name: "MyClass",
      });
    });

    it("should add a new constructor to the original class", () => {
      customConstructor = customClass.addConstructor({
        parameters: [{ name: "foo", type: "string" }],
      });
      augmentConstructor(customConstructor, originalClass!);
      const constructorDeclarations = originalFile.getClass("MyClass")?.getConstructors()
      assert.isDefined(constructorDeclarations);
      if (constructorDeclarations) assert.lengthOf(constructorDeclarations, 1);
    });

    it("should replace the original constructor with the custom constructor", () => {
      originalClass?.addConstructor({
        parameters: [{ name: "bar", type: "never" }],
      });
      customConstructor = customClass.addConstructor({
        parameters: [{ name: "foo", type: "string" }],
      });
      augmentConstructor(customConstructor, originalClass!);

      const constructorDeclarations = originalFile.getClass("MyClass")?.getConstructors()
      assert.isDefined(constructorDeclarations);
      if (!constructorDeclarations) assert.fail("constructorDeclarations is undefined")
      assert.lengthOf(constructorDeclarations, 1);
      assert.isDefined(constructorDeclarations[0].getParameter("foo"));
      assert.isUndefined(
        constructorDeclarations[0].getParameter("bar"),
      );
    });

    it("should augment constructor with original constructor", () => {
      originalClass?.addConstructor({
        parameters: [
          { name: "baseUrl", type: "string" },
          { name: "config", type: "Record<string, unknown>" },
        ],
        docs: ["Original docs"],
        statements: ["console.log('original');", "console.log(baseUrl);", "console.log(config);"],
      });
      customConstructor = customClass.addConstructor({
        parameters: [
          { name: "endpoint", type: "string" },
          { name: "options", type: "Record<string, unknown>" },
        ],
        docs: ["Customized docs"],
        statements: [
          "console.log(endpoint);",
          "console.log(options);",
          "console.log('custom');",
          "// @azsdk-constructor",
          "const ___baseUrl: string = endpoint;",
          "let ___config: Record<string, unknown> = options;",
          "// @azsdk-constructor-end",
          "console.log('finish custom');",
        ],
      });

      augmentConstructor(customConstructor, originalClass!);

      const constructorDeclarations = originalFile.getClass("MyClass")?.getConstructors()
      if (!constructorDeclarations) assert.fail("constructorDeclarations is undefined")
      assert.lengthOf(constructorDeclarations, 1);
      assert.equal(constructorDeclarations[0].getJsDocs().length, 1);
      assert.equal(
        constructorDeclarations[0].getJsDocs()[0].getDescription(),
        "Customized docs",
      );
      assert.isDefined(
        constructorDeclarations[0].getParameter("endpoint"),
      );
      assert.isUndefined(
        constructorDeclarations[0].getParameter("baseUrl"),
      );
      assert.include(
        constructorDeclarations[0].getText(),
        "console.log('custom');",
      );
      assert.include(
        constructorDeclarations[0].getText(),
        "console.log('original');",
      );
      assert.notInclude(
        constructorDeclarations[0].getText(),
        "// @azsdk-constructor-end",
      );
      assert.include(
        constructorDeclarations[0].getText(),
        "console.log('finish custom');",
      );
    });
  });
});

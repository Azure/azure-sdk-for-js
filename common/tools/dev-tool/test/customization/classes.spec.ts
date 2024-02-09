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
import { expect } from "chai";

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
      expect(originalFile.getClass("MyClass")).to.not.be.undefined;
    });

    it("should add properties only present in the custom class", () => {
      originalClass = originalFile.addClass({ name: "MyClass" });
      customClass.addProperty({ name: "myProperty", type: "string" });
      augmentClass(originalClass, customClass, originalFile);
      expect(
        originalFile.getClass("MyClass")?.getProperty("myProperty")?.getType().getText(),
      ).to.equal("string");
    });

    it("should not add the class augmentation property", () => {
      originalClass = originalFile.addClass({ name: "MyClass" });
      customClass.addProperty({ name: "myProperty", type: "string" });
      customClass.addProperty({ name: AUGMENT_CLASS_TOKEN, type: "string" });
      augmentClass(originalClass, customClass, originalFile);
      expect(originalFile.getClass("MyClass")?.getProperty(AUGMENT_CLASS_TOKEN)).to.be.undefined;
      expect(
        originalFile.getClass("MyClass")?.getProperty("myProperty")?.getType().getText(),
      ).to.equal("string");
    });
    it("should replace the original property with the custom property", () => {
      originalClass = originalFile.addClass({ name: "MyClass" });
      originalClass.addProperty({ name: "myProperty", type: "number" });
      customClass.addProperty({ name: "myProperty", type: "string" });
      augmentClass(originalClass, customClass, originalFile);
      expect(
        originalFile.getClass("MyClass")?.getProperty("myProperty")?.getType().getText(),
      ).to.equal("string");
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

      expect(originalFile.getClass("MyClass")?.getMethod("myMethod")).to.not.be.undefined;
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

      expect(
        originalFile.getClass("MyClass")?.getMethod("myMethod")?.getReturnType().getText(),
      ).to.equal("number");
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

      expect(
        originalFile.getClass("MyClass")?.getMethod("myMethod")?.getReturnType().getText(),
      ).to.equal("number");
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

      expect(methodBody).to.contain("return originalNumber;");
      expect(methodBody).to.not.contain("return 1;");

      expect(methodDocs).to.have.lengthOf(1);
      expect(methodDocs?.[0]).to.equal("Customized docs");

      expect(privateMethodBody).to.not.contain("return originalNumber;");
      expect(privateMethodBody).to.contain("return 1;");

      expect(originalFile.getClass("MyClass")?.getProperty(AUGMENT_CLASS_TOKEN)).to.be.undefined;
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

      expect(originalFile.getClass("MyClass")?.getConstructors().length).to.equal(1);
    });

    it("should replace the original constructor with the custom constructor", () => {
      originalClass?.addConstructor({
        parameters: [{ name: "bar", type: "never" }],
      });
      customConstructor = customClass.addConstructor({
        parameters: [{ name: "foo", type: "string" }],
      });
      augmentConstructor(customConstructor, originalClass!);

      expect(originalFile.getClass("MyClass")?.getConstructors().length).to.equal(1);
      expect(originalFile.getClass("MyClass")?.getConstructors()[0].getParameter("foo")).to.not.be
        .undefined;
      expect(originalFile.getClass("MyClass")?.getConstructors()[0].getParameter("bar")).to.be
        .undefined;
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

      expect(originalFile.getClass("MyClass")?.getConstructors().length).to.equal(1);
      expect(originalFile.getClass("MyClass")?.getConstructors()[0].getJsDocs().length).to.equal(1);
      expect(
        originalFile.getClass("MyClass")?.getConstructors()[0].getJsDocs()[0].getDescription(),
      ).to.equal("Customized docs");
      expect(originalFile.getClass("MyClass")?.getConstructors()[0].getParameter("endpoint")).to.not
        .be.undefined;
      expect(originalFile.getClass("MyClass")?.getConstructors()[0].getParameter("baseUrl")).to.be;
      expect(originalFile.getClass("MyClass")?.getConstructors()[0].getText()).to.include(
        "console.log('custom');",
      );
      expect(originalFile.getClass("MyClass")?.getConstructors()[0].getText()).to.include(
        "console.log('original');",
      );
      expect(originalFile.getClass("MyClass")?.getConstructors()[0].getText()).to.not.include(
        "// @azsdk-constructor-end",
      );
      expect(originalFile.getClass("MyClass")?.getConstructors()[0].getText()).to.include(
        "console.log('finish custom');",
      );
    });
  });
});

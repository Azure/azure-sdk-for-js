import { ImportDeclaration, Project } from "ts-morph";
import { augmentImports } from "../../src/util/customization/imports";
import { expect } from "chai";
import { resetCustomizationState, setCustomizationState } from "../../src/util/customization/state";

describe("Imports", () => {
  it("should remove self imports", () => {
    const project = new Project({ useInMemoryFileSystem: true });
    const originalFile = project.createSourceFile("generated/file.ts", "");
    const customFile = project.createSourceFile("customized/file.ts", "");
    customFile.addImportDeclaration({
      moduleSpecifier: "../generated/file.js",
      namedImports: ["Foo"],
    });
    const imports = new Map<string, ImportDeclaration>();
    for (const originalImport of originalFile.getImportDeclarations()) {
      imports.set(originalImport.getModuleSpecifierValue(), originalImport);
    }
    augmentImports(imports, customFile.getImportDeclarations(), originalFile);

    const augmentedImports = originalFile.getImportDeclarations();
    expect(augmentedImports).to.have.lengthOf(0);
  });

  it("should remove self imports on Windows", () => {
    const project = new Project({ useInMemoryFileSystem: true });
    const originalFile = project.createSourceFile("C:/generated/file.ts", "");
    const customFile = project.createSourceFile("C:/customized/file.ts", "");
    customFile.addImportDeclaration({
      moduleSpecifier: "../generated/file.js",
      namedImports: ["Foo"],
    });
    const imports = new Map<string, ImportDeclaration>();
    for (const originalImport of originalFile.getImportDeclarations()) {
      imports.set(originalImport.getModuleSpecifierValue(), originalImport);
    }
    augmentImports(imports, customFile.getImportDeclarations(), originalFile);

    const augmentedImports = originalFile.getImportDeclarations();
    expect(augmentedImports).to.have.lengthOf(0);
  });

  it("should rewrite relative imports to the source directory", () => {
    const project = new Project({ useInMemoryFileSystem: true });
    const originalFile = project.createSourceFile("/generated/file.ts", "");
    const customFile = project.createSourceFile("/customized/file.ts", "");
    customFile.addImportDeclaration({
      moduleSpecifier: "../generated/anotherFile.js",
      namedImports: ["Foo"],
    });
    customFile.addImportDeclaration({
      moduleSpecifier: "../rest/file.js",
      namedImports: ["Bar"],
    });
    const imports = new Map<string, ImportDeclaration>();
    for (const originalImport of originalFile.getImportDeclarations()) {
      imports.set(originalImport.getModuleSpecifierValue(), originalImport);
    }
    const customDir = "/customized";
    const originalDir = "/generated";
    const outDir = "/src";
    setCustomizationState({ customDir, originalDir, outDir });
    augmentImports(imports, customFile.getImportDeclarations(), originalFile);
    resetCustomizationState();

    const augmentedImports = originalFile.getImportDeclarations();
    expect(augmentedImports).to.have.lengthOf(2);
    const rewrittenImportSpecifier = augmentedImports[0].getModuleSpecifierValue();
    expect(rewrittenImportSpecifier).to.equal("./anotherFile.js");
    const rewrittenImportSpecifier2 = augmentedImports[1].getModuleSpecifierValue();
    expect(rewrittenImportSpecifier2).to.equal("../rest/file.js");
  });

  it("rewrite relative imports to the source directory on Windows", () => {
    const project = new Project({ useInMemoryFileSystem: true });
    const originalFile = project.createSourceFile("C:/generated/file.ts", "");
    const customFile = project.createSourceFile("C:/customized/file.ts", "");
    customFile.addImportDeclaration({
      moduleSpecifier: "../generated/anotherFile.js",
      namedImports: ["Foo"],
    });
    customFile.addImportDeclaration({
      moduleSpecifier: "../rest/file.js",
      namedImports: ["Bar"],
    });
    const imports = new Map<string, ImportDeclaration>();
    for (const originalImport of originalFile.getImportDeclarations()) {
      imports.set(originalImport.getModuleSpecifierValue(), originalImport);
    }
    const customDir = "C:\\customized";
    const originalDir = "C:\\generated";
    const outDir = "C:\\src";
    setCustomizationState({ customDir, originalDir, outDir });
    augmentImports(imports, customFile.getImportDeclarations(), originalFile);
    resetCustomizationState();

    const augmentedImports = originalFile.getImportDeclarations();
    expect(augmentedImports).to.have.lengthOf(2);
    const rewrittenImportSpecifier = augmentedImports[0].getModuleSpecifierValue();
    expect(rewrittenImportSpecifier).to.equal("./anotherFile.js");
    const rewrittenImportSpecifier2 = augmentedImports[1].getModuleSpecifierValue();
    expect(rewrittenImportSpecifier2).to.equal("../rest/file.js");
  });

  it("should rewrite relative imports to the source directory when nested", () => {
    const project = new Project({ useInMemoryFileSystem: true });
    const originalFile = project.createSourceFile("/generated/src/sub/file.ts", "");
    const customFile = project.createSourceFile("/customized/src/sub/file.ts", "");
    customFile.addImportDeclaration({
      moduleSpecifier: "../../../generated/src/anotherFile.js",
      namedImports: ["Foo"],
    });
    const imports = new Map<string, ImportDeclaration>();
    for (const originalImport of originalFile.getImportDeclarations()) {
      imports.set(originalImport.getModuleSpecifierValue(), originalImport);
    }
    const customDir = "/customized/src";
    const originalDir = "/generated/src";
    const outDir = "/output/src";
    setCustomizationState({ customDir, originalDir, outDir });
    augmentImports(imports, customFile.getImportDeclarations(), originalFile);
    resetCustomizationState();

    const augmentedImports = originalFile.getImportDeclarations();
    expect(augmentedImports).to.have.lengthOf(1);
    const rewrittenImportSpecifier = augmentedImports[0].getModuleSpecifierValue();
    expect(rewrittenImportSpecifier).to.equal("../anotherFile.js");
  });

  it("should rewrite relative imports to new files from customization", () => {
    const project = new Project({ useInMemoryFileSystem: true });
    const originalFile = project.createSourceFile("/generated/src/sub/file.ts", "");
    const customFile = project.createSourceFile("/customized/src/sub/file.ts", "");
    customFile.addImportDeclaration({
      // this doesn't work if the module is specified as
      // "../../../customized/src/anotherFile.js"
      moduleSpecifier: "../anotherFile.js",
      namedImports: ["Foo"],
    });
    const imports = new Map<string, ImportDeclaration>();
    for (const originalImport of originalFile.getImportDeclarations()) {
      imports.set(originalImport.getModuleSpecifierValue(), originalImport);
    }
    const customDir = "/customized/src";
    const originalDir = "/generated/src";
    const outDir = "/output/src";
    setCustomizationState({ customDir, originalDir, outDir });
    augmentImports(imports, customFile.getImportDeclarations(), originalFile);
    resetCustomizationState();

    const augmentedImports = originalFile.getImportDeclarations();
    expect(augmentedImports).to.have.lengthOf(1);
    const rewrittenImportSpecifier = augmentedImports[0].getModuleSpecifierValue();
    expect(rewrittenImportSpecifier).to.equal("../anotherFile.js");
  });
});

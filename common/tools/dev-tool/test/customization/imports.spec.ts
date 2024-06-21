// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { describe, it, assert, beforeEach, afterEach } from "vitest";
import { ImportDeclaration, Project } from "ts-morph";
import { augmentImports } from "../../src/util/customization/imports";
import { resetCustomizationState, setCustomizationState } from "../../src/util/customization/state";

describe("Imports", () => {
  let project: Project;

  beforeEach(() => {
    project = new Project({ useInMemoryFileSystem: true });
  });
  afterEach(() => {
    resetCustomizationState();
  });

  it("should remove self imports", () => {
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
    assert.equal(augmentedImports.length, 0);
  });

  it("should remove self imports on Windows", () => {
    setCustomizationState({
      customDir: "C:\\customized\\",
      originalDir: "C:\\generated\\",
      outDir: "C:\\src",
    });
    const originalFile = project.createSourceFile("C:\\generated\\file.ts", "");
    const customFile = project.createSourceFile("C:\\customized\\file.ts", "");
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
    assert.equal(augmentedImports.length, 0);
  });

  it("should rewrite relative imports to the source directory", () => {
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
    assert.lengthOf(augmentedImports, 2);
    const rewrittenImportSpecifier = augmentedImports[0].getModuleSpecifierValue();
    assert.equal(rewrittenImportSpecifier, "./anotherFile.js");
    const rewrittenImportSpecifier2 = augmentedImports[1].getModuleSpecifierValue();
    assert.equal(rewrittenImportSpecifier2, "../rest/file.js");
  });

  it("rewrite relative imports to the source directory on Windows", () => {
    const project = new Project({ useInMemoryFileSystem: true });
    const originalFile = project.createSourceFile("C:\\generated\\file.ts", "");
    const customFile = project.createSourceFile("C:\\customized\\file.ts", "");
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
    assert.lengthOf(augmentedImports, 2);
    const rewrittenImportSpecifier = augmentedImports[0].getModuleSpecifierValue();
    assert.equal(rewrittenImportSpecifier, "./anotherFile.js");
    const rewrittenImportSpecifier2 = augmentedImports[1].getModuleSpecifierValue();
    assert.equal(rewrittenImportSpecifier2, "../rest/file.js");
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
    assert.lengthOf(augmentedImports, 1);
    const rewrittenImportSpecifier = augmentedImports[0].getModuleSpecifierValue();
    assert.equal(rewrittenImportSpecifier, "../anotherFile.js");
  });

  it("should rewrite relative imports to new files from customization", () => {
    const project = new Project({ useInMemoryFileSystem: true });
    const originalFile = project.createSourceFile("/generated/src/sub/file.ts", "");
    const customFile = project.createSourceFile("/customized/src/sub/file.ts", "");
    customFile.addImportDeclaration({
      moduleSpecifier: "../../../customized/src/anotherFile.js",
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
    assert.lengthOf(augmentedImports, 1);
    const rewrittenImportSpecifier = augmentedImports[0].getModuleSpecifierValue();
    assert.equal(rewrittenImportSpecifier, "../anotherFile.js");
  });
});

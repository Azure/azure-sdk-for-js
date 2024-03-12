// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { describe, it, assert, beforeEach } from "vitest";
import { Project, SourceFile } from "ts-morph";
import { augmentExports } from "../../src/util/customization/exports";

describe("Exports", () => {
  let project: Project;
  let originalFile: SourceFile;
  let customFile: SourceFile;

  beforeEach(() => {
    project = new Project({ useInMemoryFileSystem: true });
    originalFile = project.createSourceFile("original.ts", "");
    customFile = project.createSourceFile("custom.ts", "");
    customFile.addExportDeclaration({
      moduleSpecifier: "./module",
      namedExports: [{ name: "Foo" }],
    });
  });

  it("should add custom exports to the original file", () => {
    augmentExports(customFile, originalFile);

    assert.equal(originalFile.getExportDeclarations().length, 1);

    const exportDeclaration = originalFile.getExportDeclarations()[0];
    assert.equal(exportDeclaration.getModuleSpecifier()?.getLiteralValue(), "./module");

    const namedExports = exportDeclaration.getNamedExports();
    assert.lengthOf(namedExports, 1);
    assert.equal(namedExports[0].getName(), "Foo");
  });

  it("should add named exports to the existing module export if it exists", () => {
    originalFile.addExportDeclaration({
      moduleSpecifier: "./module",
      namedExports: [{ name: "Bar" }],
    });

    augmentExports(customFile, originalFile);

    assert.equal(originalFile.getExportDeclarations().length, 1);

    const exportDeclaration = originalFile.getExportDeclarations()[0];
    assert.equal(exportDeclaration.getModuleSpecifier()?.getLiteralValue(), "./module");

    const namedExports = exportDeclaration.getNamedExports();
    assert.lengthOf(namedExports, 2);
    const namedExportNames = namedExports.map((e) => e.getName());
    assert.includeMembers(namedExportNames, ["Foo", "Bar"]);
  });
});

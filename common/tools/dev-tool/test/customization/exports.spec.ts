import { Project, SourceFile } from "ts-morph";
import { augmentExports } from "../../src/util/customization/exports";
import { expect } from "chai";

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

    expect(originalFile.getExportDeclarations()).to.have.lengthOf(1);

    const exportDeclaration = originalFile.getExportDeclarations()[0];
    expect(exportDeclaration.getModuleSpecifier()?.getLiteralValue()).to.equal("./module");

    const namedExports = exportDeclaration.getNamedExports();
    expect(namedExports).to.have.lengthOf(1);
    expect(namedExports[0].getName()).to.equal("Foo");
  });

  it("should add named exports to the existing module export if it exists", () => {
    originalFile.addExportDeclaration({
      moduleSpecifier: "./module",
      namedExports: [{ name: "Bar" }],
    });

    augmentExports(customFile, originalFile);

    expect(originalFile.getExportDeclarations()).to.have.lengthOf(1);

    const exportDeclaration = originalFile.getExportDeclarations()[0];
    expect(exportDeclaration.getModuleSpecifier()?.getLiteralValue()).to.equal("./module");

    const namedExports = exportDeclaration.getNamedExports();
    expect(namedExports).to.have.lengthOf(2);
    expect(namedExports.map((e) => e.getName())).contains("Foo");
    expect(namedExports.map((e) => e.getName())).contains("Bar");
  });
});

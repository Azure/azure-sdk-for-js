import { Project, SourceFile, TypeAliasDeclaration } from "ts-morph";
import { augmentTypeAliases } from "../../src/util/customization/aliases";
import { expect } from "chai";

describe("Customization", () => {
  let project: Project;
  let originalFile: SourceFile;
  let originalAliases: Map<string, TypeAliasDeclaration>;
  let customAliases: TypeAliasDeclaration[];

  beforeEach(() => {
    project = new Project();
    originalFile = project.createSourceFile("original.ts", "");
    originalAliases = new Map<string, TypeAliasDeclaration>();
    customAliases = [];
  });

  describe("augmentTypeAliases", () => {
    it("should add custom aliases to the original file", () => {
      const customAlias = originalFile.addTypeAlias({
        name: "CustomAlias",
        type: "string",
      });
      customAliases.push(customAlias);

      augmentTypeAliases(originalAliases, customAliases, originalFile);

      expect(originalFile.getTypeAlias("CustomAlias")).not.to.be.undefined;
    });

    it("should replace existing aliases with custom aliases", () => {
      const originalAlias = originalFile.addTypeAlias({
        name: "OriginalAlias",
        type: "string",
      });
      originalAliases.set("OriginalAlias", originalAlias);

      const customAlias = originalFile.addTypeAlias({
        name: "OriginalAlias",
        type: "number",
      });
      customAliases.push(customAlias);

      augmentTypeAliases(originalAliases, customAliases, originalFile);

      expect(originalFile.getTypeAlias("OriginalAlias")?.getText()).to.equal(
        "type OriginalAlias = number;",
      );
    });
  });
});

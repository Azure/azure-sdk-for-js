import { Project, SourceFile, InterfaceDeclaration } from "ts-morph";
import { expect } from "chai";
import { augmentInterface, augmentInterfaces } from "../../src/util/customization/interfaces";
import { getOriginalDeclarationsMap } from "../../src/util/customization/customize";

describe("Interfaces", () => {
  let project: Project;
  let originalFile: SourceFile;
  let customFile: SourceFile;
  let originalInterface: InterfaceDeclaration | undefined;
  let customInterface: InterfaceDeclaration;

  beforeEach(() => {
    project = new Project({ useInMemoryFileSystem: true });
    originalFile = project.createSourceFile("original.ts", "");
    customFile = project.createSourceFile("custom.ts", "");
    originalInterface = undefined;
    customInterface = customFile.addInterface({
      name: "myInterface",
      properties: [{ name: "foo", type: "string" }],
    });
  });

  it("should add custom interface to the original file", () => {
    augmentInterface(customInterface, originalInterface, originalFile);

    expect(originalFile.getInterface("myInterface")).not.to.be.undefined;
  });

  it("should replace existing properties with custom properties", () => {
    originalInterface = originalFile.addInterface({
      name: "myInterface",
      properties: [{ name: "bar", type: "number" }],
    });

    augmentInterface(customInterface, originalInterface, originalFile);

    expect(originalFile.getInterface("myInterface")).not.to.be.undefined;
    expect(originalFile.getInterface("myInterface")?.getProperties()).to.have.lengthOf(2);
    expect(originalFile.getInterface("myInterface")?.getProperty("foo")).to.not.be.undefined;
    expect(
      originalFile.getInterface("myInterface")?.getProperty("foo")?.getType().getText()
    ).to.equal("string");

    expect(originalFile.getInterface("myInterface")?.getProperty("bar")).to.not.be.undefined;
    expect(
      originalFile.getInterface("myInterface")?.getProperty("bar")?.getType().getText()
    ).to.equal("number");
  });

  it("should remove property marked with @azsdk-remove", () => {
    originalInterface = originalFile.addInterface({
      name: "myInterface",
      properties: [
        { name: "bar", type: "number" },
        { name: "baz", type: "boolean" },
      ],
    });

    customInterface.addProperty({ name: "bar", type: "number", docs: ["@azsdk-remove"] });

    augmentInterface(customInterface, originalInterface, originalFile);

    expect(originalFile.getInterface("myInterface")).not.to.be.undefined;
    expect(originalFile.getInterface("myInterface")?.getProperties()).to.have.lengthOf(2);
    expect(originalFile.getInterface("myInterface")?.getProperty("foo")).to.not.be.undefined;
    expect(originalFile.getInterface("myInterface")?.getProperty("baz")).to.not.be.undefined;

    expect(originalFile.getInterface("myInterface")?.getProperty("bar")).to.be.undefined;
    expect(
      originalFile.getInterface("myInterface")?.getProperty("foo")?.getType().getText()
    ).to.equal("string");

    expect(
      originalFile.getInterface("myInterface")?.getProperty("baz")?.getType().getText()
    ).to.equal("boolean");
  });

  it("should rename an interface marked with @azsdk-rename", () => {
    originalFile.addInterface({
      name: "Dog",
      properties: [{ name: "name", type: "string" }],
    });
    originalFile.addInterface({
      name: "Human",
      properties: [{ name: "pets", type: "Dog[]" }],
    })
    customFile.addInterface({
      name: "Pet",
      docs: ["@azsdk-rename(Dog)"],
    });

    const originalMap = getOriginalDeclarationsMap(originalFile);

    augmentInterfaces(originalMap.interfaces, customFile.getInterfaces(), originalFile);

    expect(originalFile.getInterface("Dog")).to.be.undefined;
    expect(originalFile.getInterface("Pet")).not.to.be.undefined;
    expect(originalFile.getInterface("Human")?.getProperty("pets")?.getType().getText()).to.equal("Pet[]");
  });
});

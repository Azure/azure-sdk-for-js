// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, beforeEach } from "vitest";
import { Project, SourceFile, InterfaceDeclaration } from "ts-morph";
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

    assert.isDefined(originalFile.getInterface("myInterface"));
  });

  it("should replace existing properties with custom properties", () => {
    originalInterface = originalFile.addInterface({
      name: "myInterface",
      properties: [{ name: "bar", type: "number" }],
    });

    augmentInterface(customInterface, originalInterface, originalFile);

    assert.isDefined(originalFile.getInterface("myInterface"));
    const props = originalFile.getInterface("myInterface")?.getProperties();
    if (!props) assert.fail("myInterface#getProperties() is undefined");
    assert.lengthOf(props, 2);
    assert.isDefined(originalFile.getInterface("myInterface")?.getProperty("foo"));
    assert.equal(
      originalFile.getInterface("myInterface")?.getProperty("foo")?.getType().getText(),
      "string",
    );

    assert.isDefined(originalFile.getInterface("myInterface")?.getProperty("bar"));
    assert.equal(
      originalFile.getInterface("myInterface")?.getProperty("bar")?.getType().getText(),
      "number",
    );
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

    assert.isDefined(originalFile.getInterface("myInterface"));
    const props = originalFile.getInterface("myInterface")?.getProperties();
    if (!props) assert.fail("myInterface#getProperties() is undefined");
    assert.lengthOf(props, 2);
    assert.isDefined(originalFile.getInterface("myInterface")?.getProperty("foo"));
    assert.isDefined(originalFile.getInterface("myInterface")?.getProperty("baz"));

    assert.isUndefined(originalFile.getInterface("myInterface")?.getProperty("bar"));
    assert.equal(
      originalFile.getInterface("myInterface")?.getProperty("foo")?.getType().getText(),
      "string",
    );

    assert.equal(
      originalFile.getInterface("myInterface")?.getProperty("baz")?.getType().getText(),
      "boolean",
    );
  });

  it("should rename an interface marked with @azsdk-rename", () => {
    originalFile.addInterface({
      name: "Dog",
      properties: [{ name: "name", type: "string" }],
    });
    originalFile.addInterface({
      name: "Human",
      properties: [{ name: "pets", type: "Dog[]" }],
    });
    customFile.addInterface({
      name: "Pet",
      docs: ["@azsdk-rename(Dog)"],
    });

    const originalMap = getOriginalDeclarationsMap(originalFile);

    augmentInterfaces(originalMap.interfaces, customFile.getInterfaces(), originalFile);

    assert.isUndefined(originalFile.getInterface("Dog"));
    assert.isDefined(originalFile.getInterface("Pet"));
    assert.equal(
      originalFile.getInterface("Human")?.getProperty("pets")?.getType().getText(),
      "Pet[]",
    );
  });
});

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable sort-imports */
/* eslint-disable no-undef */
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { expect } from "chai";
import sinon from "sinon";
import { TsLibrary } from "../../../src/codeGenerator";
import { MaterialClassGenerator } from "../../../src/parserGenerator/materialClassGenerator";
import { instantiationParams1, instantiationParams2 } from "./materialClassInit";

let materialClassGen: MaterialClassGenerator;
let tsLibrary: TsLibrary;

describe("Material Class Generator Tests", function() {
  afterEach(function() {
    sinon.restore();
  });

  describe("generate datastructure for material class generator", function() {
    beforeEach(function() {
      materialClassGen = new MaterialClassGenerator(instantiationParams1);
    });
    it("creates material generator with type name", function() {
      expect(materialClassGen).to.have.property("_typeName", "ArrayInfo");
    });
    it("creates material generator class with base name", function() {
      expect(materialClassGen).to.have.property("_baseTypeName", "EntityInfo");
    });
    it("creates material generator class with base kind enum", function() {
      expect(materialClassGen).to.have.property("_baseKindEnum", "EntityKinds");
    });
    it("creates material generator class with type kind enum", function() {
      expect(materialClassGen).to.have.property("_typeKindEnum", "ArrayKinds");
    });
    it("creates material generator class with kind property", function() {
      expect(materialClassGen).to.have.property("_kindProperty", "entityKind");
    });
    it("creates material generator class with abstract", function() {
      expect(materialClassGen).to.have.property("_isAbstract", false);
    });
    it("creates material generator class with partition", function() {
      expect(materialClassGen).to.have.property("_isPartition", false);
    });
    it("creates material generator class with collection of material properties", function() {
      expect(materialClassGen).to.have.property("_properties");
    });
  });
  describe("generate material class with a parent", function() {
    beforeEach(function() {
      materialClassGen = new MaterialClassGenerator(instantiationParams1);
      tsLibrary = new TsLibrary("./");
    });
    it("creates material class with class name", function() {
      const materialClass = materialClassGen._addMaterialClass(tsLibrary);
      expect(materialClass.name).equals("ArrayInfoImpl");
    });
    it("creates material class with a parent class", function() {
      const materialClass = materialClassGen._addMaterialClass(tsLibrary);
      expect(materialClass.inheritance).to.have.lengthOf(1);
      const poppedInheritance = materialClass.inheritance?.pop();
      expect(poppedInheritance?.name[0]).equals("ArrayInfo");
      expect(poppedInheritance?.name[1]).equals("TypeChecker");
      // expect(inheritNames[0]).to.include.members(['ArrayInfo', 'TypeChecker']);
    });
    it("creates material class with fields", function() {
      const materialClass = materialClassGen._addMaterialClass(tsLibrary);
      // At least because 'AllowedVersions', 'ValueConstraints' and 'InstanceProperties' fields are also generated.
      expect(materialClass.fields).to.have.lengthOf.least(25);
      expect(materialClass.fields[8].name).equals("elementSchema?");
      expect(materialClass.fields[8].type).equals("SchemaInfo");
    });
    it("creates material class with constructor", function() {
      const materialClass = materialClassGen._addMaterialClass(tsLibrary);
      expect(materialClass.tsConstructor?.name).equals("constructor");
      expect(materialClass.tsConstructor?.parameters).to.have.lengthOf(5);
      expect(materialClass.tsConstructor?.parameters[0].name).equals("dtdlVersion");
      expect(materialClass.tsConstructor?.parameters[0].type).equals("number");
      expect(materialClass.tsConstructor?.parameters[1].name).equals("id");
      expect(materialClass.tsConstructor?.parameters[1].type).equals("string");
      expect(materialClass.tsConstructor?.parameters[2].name).equals("childOf");
      expect(materialClass.tsConstructor?.parameters[2].type).equals("string|undefined");
      expect(materialClass.tsConstructor?.parameters[3].name).equals("definedIn");
      expect(materialClass.tsConstructor?.parameters[3].type).equals("string|undefined");
      expect(materialClass.tsConstructor?.parameters[4].name).equals("entityKind");
      expect(materialClass.tsConstructor?.parameters[4].type).equals("ArrayKinds");
    });
  });
  describe("generate material class which is base without a parent", function() {
    beforeEach(function() {
      materialClassGen = new MaterialClassGenerator(instantiationParams2);
      tsLibrary = new TsLibrary("./");
    });
    it("creates material class with class name", function() {
      const materialClass = materialClassGen._addMaterialClass(tsLibrary);
      expect(materialClass.name).equals("EntityInfoImpl");
    });
    it("creates material class with a parent class", function() {
      const materialClass = materialClassGen._addMaterialClass(tsLibrary);
      expect(materialClass.inheritance).to.have.lengthOf(1);
      const poppedInheritance = materialClass.inheritance?.pop();
      expect(poppedInheritance?.name[0]).equals("EntityInfo");
      expect(poppedInheritance?.name[1]).equals("TypeChecker");
    });
    it("creates material class with fields including source object and undefined types", function() {
      const expectedFieldNamesToTypes = {
        dtdlVersion: "number",
        id: "string",
        childOf: "string|undefined",
        definedIn: "string|undefined",
        entityKind: "EntityKinds",
        "comment?": "string",
        "description?": "LanguageStringType",
        "displayName?": "LanguageStringType",
        "languageVersion?": "number",
        supplementalTypeIds: "string[]",
        supplementalProperties: "string[]",
        supplementalTypes: "string[]",
        undefinedTypes: "string[]",
        undefinedProperties: "{[name: string]: any}",
        sourceObject: "any",
        isPartition: "boolean",
        _versionlessTypes: "string[]",
        _concreteKinds: "{[x: number]: EntityKinds[]}",
        _badTypeActionFormat: "{[x: number]: string}",
        _badTypeCauseFormat: "{[x: number]: string}"
      };
      const materialClass = materialClassGen._addMaterialClass(tsLibrary);
      expect(materialClass.fields).to.have.lengthOf(20); // base class will have source object and undefined types and properties and versionlessTypes
      const actualFieldNames = materialClass.fields.map((field) => field.name);
      console.log(actualFieldNames);
      expect(actualFieldNames).to.include.members(Object.keys(expectedFieldNamesToTypes));
      const actualFieldTypes = materialClass.fields.map((field) => field.type);
      expect(actualFieldTypes).to.include.members(Object.values(expectedFieldNamesToTypes));
    });
    it("creates material class with constructor", function() {
      const materialClass = materialClassGen._addMaterialClass(tsLibrary);
      expect(materialClass.tsConstructor?.name).equals("constructor");
      expect(materialClass.tsConstructor?.parameters).to.have.lengthOf(5);
      expect(materialClass.tsConstructor?.parameters[0].name).equals("dtdlVersion");
      expect(materialClass.tsConstructor?.parameters[0].type).equals("number");
      expect(materialClass.tsConstructor?.parameters[1].name).equals("id");
      expect(materialClass.tsConstructor?.parameters[1].type).equals("string");
      expect(materialClass.tsConstructor?.parameters[2].name).equals("childOf");
      expect(materialClass.tsConstructor?.parameters[2].type).equals("string|undefined");
      expect(materialClass.tsConstructor?.parameters[3].name).equals("definedIn");
      expect(materialClass.tsConstructor?.parameters[3].type).equals("string|undefined");
      expect(materialClass.tsConstructor?.parameters[4].name).equals("entityKind");
      expect(materialClass.tsConstructor?.parameters[4].type).equals("EntityKinds");
    });
  });
});

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable sort-imports */
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { NameFormatter } from "./nameFormatter";
import { TypeGenerator } from "./typeGenerator";
import { MaterialProperty } from "./obverseGenerator/materialProperty";
import {
  TsLibrary,
  TsAccess,
  TsDeclarationType,
  TsClass,
  TsScope,
  TsInheritanceType
} from "../codeGenerator";
import { ConcreteSubclass } from "./obverseGenerator/concreteSubclass";
import { MaterialClassParser } from "./obverseGenerator/materialClassParser";
import {
  Context,
  IdentifierRestriction,
  MaterialClassDigest,
  MaterialPropertyDigest
} from "./metamodelDigest";
import { ExtensibleMaterialClass } from "./obverseGenerator/extensibleMaterialClass";
import { MaterialPropertyFactory } from "./obverseGenerator/materialPropertyFactory";
import { InternalProperty } from "./obverseGenerator/internalProperty";
import { MaterialClassAugmentor } from "./obverseGenerator/materialClassAugmentor";
import { PropertyKind } from "./obverseGenerator/propertyKind";
import { MaterialClassPartitioner } from "./obverseGenerator/materialClassPartitioner";
import { ParserGeneratorValues } from "./parserGeneratorValues";
import { DescendantControl } from "./obverseGenerator/descendantControl";
import { MaterialClassValidator } from "./obverseGenerator/materialClassValidator";
import { TypeKindValuesHelper } from "./typeKindValuesHelper";

export type TypeVersionToConcreteSubclasses = { [dtdlVersion: number]: ConcreteSubclass[] };
export type TypeVersionToExtensibleMaterialClasses = {
  [dtdlVersion: number]: ExtensibleMaterialClass[];
};
export type TypeVersionToExtensibleMaterialSubTypes = { [dtdlVersion: number]: string[] };

export interface MaterialClassGeneratorInstantiation {
  rawTypeName: string;
  rawBaseType: string;
  materialClassDigest: MaterialClassDigest;
  contexts: { [contextId: string]: Context };
  identifierDefinitions: IdentifierRestriction;
  descendantControls: DescendantControl[];
  extensibleMaterialClasses: TypeVersionToExtensibleMaterialClasses;
}
/**
 * A type generator which represents a material class later to be consumed by the model parser.
 */
export class MaterialClassGenerator implements TypeGenerator {
  // The name of the type.
  private _rawTypeName: string;
  // The name of the interface associated with the obverse class eg 'ArrayInfo'.
  private _typeName: string;
  // The name of the implementation associated with the obverse class eg 'ArrayInfoImpl'.
  private _typeImplName: string;
  // The name of the parent interface eg 'EntityInfo'.
  private _parentTypeName: string | undefined;
  // The name of the parent implementation eg 'EntityInfoImpl'.
  private _parentTypeImplName: string | undefined;
  // The name of the base enum like EntityKinds
  private _baseKindEnum: string;
  // The name of the type enum like SchemaKinds
  private _typeKindEnum: string;
  // The name of the property.
  private _kindProperty: string;
  // The name of base type.
  private _rawBaseType: string;
  // The name of the base class.
  private _baseTypeName: string;
  // A MaterialClassDigest object containing digested information about the material class.
  private _materialClassDigest: MaterialClassDigest;
  // A object that maps from a context ID to a Context, which is a dictionary of term definitions.
  private _dtdlContexts: { [contextId: string]: Context };
  // A object that maps from class name to a dictionary that maps from DTDL version to a object that restricts the identifiers for the class.
  private _identifierDefinitions: IdentifierRestriction;
  // Defined by the materialClassDigest
  private _isAbstract: boolean;
  // Defined by the materialClassDigest
  private _isPartition: boolean;
  // A list of material properties.
  private _properties: MaterialProperty[];
  // A object that maps from dtdlVersion to a list of ConcreteSubclass objects.
  private _concreteSubclassesMap: TypeVersionToConcreteSubclasses;
  // A object that maps from dtdlVersion to a list of ExtensibleMaterialClass objects.
  private _extensibleMaterialClassesMap: TypeVersionToExtensibleMaterialClasses;
  // A object that maps from dtdlVersion to a list of ExtensibleMaterialSubType strings.
  private _extensibleMaterialSubtypes: TypeVersionToExtensibleMaterialSubTypes;
  private _typeIds: string[];
  private _descendantControls: DescendantControl[];

  constructor({
    rawTypeName,
    rawBaseType,
    materialClassDigest,
    contexts,
    identifierDefinitions,
    descendantControls,
    extensibleMaterialClasses
  }: MaterialClassGeneratorInstantiation) {
    this._rawTypeName = rawTypeName;
    this._typeName = NameFormatter.formatNameAsInterface(rawTypeName);
    this._typeImplName = NameFormatter.formatNameAsImplementation(rawTypeName);
    this._parentTypeName =
      materialClassDigest.parentClass === null
        ? undefined
        : NameFormatter.formatNameAsInterface(materialClassDigest.parentClass);
    this._parentTypeImplName =
      materialClassDigest.parentClass === null
        ? undefined
        : NameFormatter.formatNameAsImplementation(materialClassDigest.parentClass);
    this._rawBaseType = rawBaseType;
    this._baseTypeName = NameFormatter.formatNameAsInterface(rawBaseType);
    this._materialClassDigest = materialClassDigest;
    this._dtdlContexts = contexts;
    this._identifierDefinitions = identifierDefinitions;
    this._baseKindEnum = NameFormatter.formatNameForEnumDisjunction(rawBaseType);
    this._typeKindEnum = NameFormatter.formatNameForEnumDisjunction(rawTypeName);
    this._kindProperty = NameFormatter.formatNameAsEnumProperty(rawBaseType);
    this._isAbstract = materialClassDigest.abstract ?? false;
    this._isPartition = materialClassDigest.partition ?? false;
    this._properties = this._addProperties();
    this._concreteSubclassesMap = {};
    this._extensibleMaterialClassesMap = extensibleMaterialClasses;
    this._extensibleMaterialSubtypes = {};
    this._typeIds = materialClassDigest.typeIds;
    this._descendantControls = descendantControls;

    this._addConcreteSubclasses();
    this._addSubTypes();
  }

  private _addSubTypes(): void {
    for (const dtdlVersion of this._materialClassDigest.dtdlVersions) {
      let extensibleMaterialSubtypes: string[] = [];
      if (dtdlVersion in this._materialClassDigest.extensibleMaterialSubclasses) {
        extensibleMaterialSubtypes = this._materialClassDigest.extensibleMaterialSubclasses[
          dtdlVersion
        ];
      }
      this._extensibleMaterialSubtypes[dtdlVersion] = extensibleMaterialSubtypes;
    }
  }

  private _addProperties(): MaterialProperty[] {
    const allMaterialProperties: MaterialProperty[] = [];
    const versionProp = new InternalProperty(
      "number",
      "dtdlVersion",
      TsAccess.Public,
      "",
      "Gets the DTDL version in which this element is defined.",
      true
    );
    const idProp = new InternalProperty(
      "string",
      "id",
      TsAccess.Public,
      "",
      "Gets the value of the '@id' property of the DTDL element that corresponds to this object.",
      true
    );
    const childOfProp = new InternalProperty(
      "string|undefined",
      "childOf",
      TsAccess.Public,
      "",
      "Gets the value of the '@id' property of the parent DTDL element in which this element is defined.",
      true
    );
    const definedInProp = new InternalProperty(
      "string|undefined",
      "definedIn",
      TsAccess.Public,
      "",
      "Gets the value of the '@id' property of the partition DTDL element in which this element is defined.",
      true
    );

    const typeKindValuesOred = Array.from(this._addConcreteTypeKinds()).join("|"); // should look like this 'array'|'map'|'enum'|'object';
    const typeKindParameter = NameFormatter.formatNameAsEnumParameter(this._rawBaseType); // entityKind
    const typeKindProp = new InternalProperty(
      `${this._typeKindEnum}`,
      `${typeKindParameter}`,
      TsAccess.Public,
      `${typeKindValuesOred}`,
      `Gets the kind of ${this._baseTypeName}.`,
      true
    );
    allMaterialProperties.push(versionProp);
    allMaterialProperties.push(idProp);
    allMaterialProperties.push(childOfProp);
    allMaterialProperties.push(definedInProp);
    allMaterialProperties.push(typeKindProp);

    Object.entries(this._materialClassDigest.properties).forEach(([key, value]) => {
      const property = MaterialPropertyFactory.create(
        this._materialClassDigest.dtdlVersions,
        key,
        value as MaterialPropertyDigest,
        this._dtdlContexts,
        this._baseTypeName
      );
      if (property !== undefined) {
        allMaterialProperties.push(property);
      }
    });
    return allMaterialProperties;
  }

  private _addConcreteSubclasses(): void {
    for (const dtdlVersion of this._materialClassDigest.dtdlVersions) {
      const concreteSubclasses: ConcreteSubclass[] = [];
      if (dtdlVersion in this._materialClassDigest.concreteSubclasses) {
        const subclassesNames: string[] = this._materialClassDigest.concreteSubclasses[dtdlVersion];
        subclassesNames.forEach((element: string) => {
          const concreteSubclass = new ConcreteSubclass(
            dtdlVersion,
            element,
            this._baseKindEnum,
            this._dtdlContexts,
            this._identifierDefinitions
          );
          concreteSubclasses.push(concreteSubclass);
        });
        this._concreteSubclassesMap[dtdlVersion] = concreteSubclasses;
      }
    }
  }

  private _addConcreteTypeKinds(): Set<string> {
    return TypeKindValuesHelper.generateConcreteTypesKindValues(
      this._rawBaseType,
      this._rawTypeName,
      this._materialClassDigest
    );
  }

  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  public generateType(parserLibrary: TsLibrary): void {
    this._addMaterialClass(parserLibrary);
  }

  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  public _addMaterialClass(parserLibrary: TsLibrary): TsClass {
    const obverseInterface = parserLibrary.interface({
      name: this._typeName,
      exports: true,
      thingToExtend: this._parentTypeName
    });
    if (this._parentTypeName !== undefined) {
      obverseInterface.import(`import {${this._parentTypeName}} from './internal';`);
    }

    const inheritanceNames: TsInheritanceType[] = [];
    inheritanceNames.push({
      name: [this._typeName, "TypeChecker"],
      type: TsDeclarationType.Interface
    });

    const obverseClass = parserLibrary.class({
      name: this._typeImplName,
      exports: true,
      abstract: this._isAbstract,
      inheritance: inheritanceNames
    });

    obverseClass.import(`import {TypeChecker} from '../parser/type/typeChecker';`);
    obverseClass.import(`import {${this._typeName}} from './internal';`);
    obverseClass.import(`import {${this._typeKindEnum}} from './internal';`);
    obverseClass.import(`import {${this._baseKindEnum}} from './internal';`);

    const internalPropNames: string[] = [];
    if (this._properties) {
      this._properties.forEach((prop) => {
        const internalPropName = prop.addConstructorParam(obverseClass, obverseClass.ctor);
        if (internalPropName !== undefined) {
          internalPropNames.push(internalPropName);
        }
      });
    }

    const ctorScope: TsScope = obverseClass.ctor.body;
    if (this._properties) {
      this._properties.forEach((prop) => {
        prop.generateConstructorCode(obverseClass, ctorScope);
        prop.addMembers(
          this._materialClassDigest.dtdlVersions,
          obverseClass,
          obverseInterface,
          !this._isAbstract
        );
        prop.addImports(obverseInterface);
      });
    }
    MaterialClassAugmentor.generateConstructorCode(
      ctorScope,
      this._isAbstract,
      this._parentTypeName === undefined
    );
    MaterialClassPartitioner.generateConstructorCode(ctorScope, this._isPartition);
    MaterialClassParser.generateConstructorCode(ctorScope, this._parentTypeName === undefined);
    const anyObjectProperties = this._properties.some(
      (prop) => prop.propertyKind === PropertyKind.Object
    );
    MaterialClassAugmentor.addMembers(
      obverseClass,
      obverseInterface,
      this._typeName,
      this._isAbstract,
      this._parentTypeName === undefined,
      anyObjectProperties
    );
    MaterialClassParser.addMembers(
      this._materialClassDigest.dtdlVersions,
      obverseClass,
      obverseInterface,
      this._rawTypeName,
      this._typeName,
      this._baseKindEnum,
      this._kindProperty,
      this._parentTypeName === undefined,
      this._isAbstract,
      this._isPartition,
      this._concreteSubclassesMap,
      this._extensibleMaterialClassesMap,
      this._extensibleMaterialSubtypes,
      this._properties
    );
    MaterialClassValidator.addMembers(
      this._materialClassDigest.dtdlVersions,
      obverseClass,
      obverseInterface,
      this._kindProperty,
      this._parentTypeName === undefined,
      this._isAbstract,
      this._materialClassDigest.instance,
      this._materialClassDigest.properties
    );
    MaterialClassPartitioner.addMembers(
      obverseClass,
      obverseInterface,
      this._typeName,
      this._isPartition,
      this._parentTypeName === undefined
    );

    this._generateVersionlessTypes(obverseClass);
    this.generateApplyTransformationMethods(obverseClass);
    this.generateCheckRestrictionsMethods(obverseClass, !this._isAbstract); // isAbstract is the opposite of isAugmentable in C#.
    this._generateConcreteKinds(obverseClass);
    this._generateBadTypeFormatStrings(obverseClass);

    this._generateTrySetObjectPropertyMethod(obverseClass);

    for (const descendantControl of this._descendantControls) {
      descendantControl.addMembers(
        obverseClass,
        this._rawTypeName,
        this._parentTypeName === undefined,
        this._isAbstract,
        this._properties
      );
    }

    return obverseClass;
  }

  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  generateApplyTransformationMethods(obverseClass: TsClass): void {
    if (this._parentTypeName === undefined) {
      const baseClassMethod = obverseClass.method({
        name: "applyTransformations",
        returnType: "void"
      });
      baseClassMethod.parameter({ name: "model", type: "Model" });
      baseClassMethod.parameter({ name: "parsingErrors", type: "ParsingError[]" });
    } else if (!this._isAbstract) {
      const concreteClassMethod = obverseClass.method({
        name: "applyTransformations",
        returnType: "void"
      });
      concreteClassMethod.parameter({ name: "model", type: "Model" });
      concreteClassMethod.parameter({ name: "parsingErrors", type: "ParsingError[]" });

      if (this._materialClassDigest.dtdlVersions) {
        for (const dtdlVersion of this._materialClassDigest.dtdlVersions) {
          concreteClassMethod.body
            .if(`this.${ParserGeneratorValues.DtdlVersionPropertyName} === ${dtdlVersion}`)
            .line(`this.applyTransformationsV${dtdlVersion}(model, parsingErrors);`)
            .line("");
        }
      }
    }

    for (const dtdlVersion of this._materialClassDigest.dtdlVersions) {
      const versionSpecificClassMethod = obverseClass.method({
        name: `applyTransformationsV${dtdlVersion}`
      });
      versionSpecificClassMethod.parameter({ name: "model", type: "Model" });
      versionSpecificClassMethod.parameter({ name: "parsingErrors", type: "ParsingError[]" });

      for (const descendantControl of this._descendantControls) {
        descendantControl.addTransformation(
          versionSpecificClassMethod.body,
          dtdlVersion,
          this._rawTypeName,
          this._properties
        );
      }
    }
  }

  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  generateCheckRestrictionsMethods(obverseClass: TsClass, classIsAugmentable: boolean): void {
    if (this._parentTypeName === undefined) {
      const baseClassMethod = obverseClass.method({
        name: "checkRestrictions",
        returnType: "void"
      });
      baseClassMethod.parameter({ name: "parsingErrors", type: "ParsingError[]" });
      // eslint-disable-next-line no-unused-expressions
      baseClassMethod.body;
    } else if (!this._isAbstract) {
      const concreteClassMethod = obverseClass.method({
        name: "checkRestrictions",
        returnType: "void"
      });
      concreteClassMethod.parameter({ name: "parsingErrors", type: "ParsingError[]" });
      // eslint-disable-next-line no-unused-expressions
      concreteClassMethod.body;

      if (this._materialClassDigest.dtdlVersions) {
        for (const dtdlVersion of this._materialClassDigest.dtdlVersions) {
          concreteClassMethod.body
            .if(`this.${ParserGeneratorValues.DtdlVersionPropertyName} === ${dtdlVersion}`)
            .line(`this.checkRestrictionsV${dtdlVersion}(parsingErrors);`)
            .line("");
        }
      }
    }

    for (const dtdlVersion of this._materialClassDigest.dtdlVersions) {
      const versionSpecificClassMethod = obverseClass.method({
        name: `checkRestrictionsV${dtdlVersion}`
      });
      versionSpecificClassMethod.parameter({ name: "parsingErrors", type: "ParsingError[]" });
      // eslint-disable-next-line no-unused-expressions
      versionSpecificClassMethod.body;

      for (const materialProperty of this._properties) {
        materialProperty.addRestrictions(
          versionSpecificClassMethod.body,
          dtdlVersion,
          this._typeName,
          classIsAugmentable
        );
      }
      for (const descendantControl of this._descendantControls) {
        descendantControl.addRestriction(
          versionSpecificClassMethod.body,
          dtdlVersion,
          this._rawTypeName
        );
      }
    }
  }

  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  private _generateTrySetObjectPropertyMethod(obverseClass: TsClass): void {
    const trySetObjectPropertyMethod = obverseClass
      .method({
        name: "trySetObjectProperty",
        returnType: "boolean",
        abstract: false,
        isStatic: false
      })
      .parameter({ name: "propertyName", type: "string" })
      .parameter({ name: "value", type: "any" })
      .parameter({ name: "key", type: "string|undefined" });

    trySetObjectPropertyMethod.body.line("switch (propertyName) {");

    this._properties.forEach((prop) => {
      if (this._typeName !== this._baseTypeName) {
        obverseClass.import(`import {${this._baseTypeName}} from './internal';`);
      }
      prop.addCaseToTrySetObjectPropertySwitch(trySetObjectPropertyMethod.body, "value", "key");
    });

    trySetObjectPropertyMethod.body
      .line("default:")
      .line("break;")
      .line(`}`);

    MaterialClassAugmentor.addTrySetObjectProperties(
      trySetObjectPropertyMethod.body,
      "propertyName",
      "value",
      "key",
      this._isAbstract
    );

    trySetObjectPropertyMethod.body.line("return false;");
  }

  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  private _generateVersionlessTypes(obverseClass: TsClass): void {
    obverseClass.field({
      name: "_versionlessTypes",
      access: TsAccess.Protected,
      isStatic: true,
      type: "Set<string>"
    });
    obverseClass.staticCtor.body.multiLine("this._versionlessTypes = new Set<string>()");
    for (const typeId of this._typeIds) {
      obverseClass.staticCtor.body.line(`.add('${typeId}')`);
    }
  }

  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  private _generateConcreteKinds(obverseClass: TsClass): void {
    obverseClass.field({
      name: "_concreteKinds",
      access: TsAccess.Protected,
      isStatic: true,
      type: `{[x: number]: ${this._typeKindEnum}[]}`
    });
    obverseClass.staticCtor.body.line("this._concreteKinds = {};");
    for (const version of this._materialClassDigest.dtdlVersions) {
      obverseClass.staticCtor.body.line(`this._concreteKinds[${version}] = [];`);
      if (Object.prototype.hasOwnProperty.call(this._concreteSubclassesMap, version)) {
        const subclasses = this._concreteSubclassesMap[version];
        for (const subclass of subclasses) {
          subclass.addEnumValue(obverseClass.staticCtor.body, `this._concreteKinds[${version}]`);
        }
      }
    }
  }

  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  private _generateBadTypeFormatStrings(obverseClass: TsClass): void {
    obverseClass.field({
      name: "_badTypeActionFormat",
      access: TsAccess.Protected,
      isStatic: true,
      type: `{[x: number]: string}`
    });
    obverseClass.field({
      name: "_badTypeCauseFormat",
      access: TsAccess.Protected,
      isStatic: true,
      type: `{[x: number]: string}`
    });
    obverseClass.staticCtor.body.line("this._badTypeActionFormat = {};");
    obverseClass.staticCtor.body.line("this._badTypeCauseFormat = {};");
    Object.entries(this._materialClassDigest.badTypeActionFormat).forEach(([key, value]) => {
      obverseClass.staticCtor.body.line(`this._badTypeActionFormat[${key}] = \`${value}\``);
    });
    Object.entries(this._materialClassDigest.badTypeCauseFormat).forEach(([k, v]) => {
      obverseClass.staticCtor.body.line(`this._badTypeCauseFormat[${k}] = \`${v}\``);
    });
  }
}

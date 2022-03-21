// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
/* eslint-disable sort-imports */
import { TsAccess, TsClass, TsInterface, TsScope } from "../../codeGenerator";
import {
  TypeVersionToConcreteSubclasses,
  TypeVersionToExtensibleMaterialClasses,
  TypeVersionToExtensibleMaterialSubTypes
} from "../materialClassGenerator";
import { ConcreteSubclass } from "./concreteSubclass";
import { ExtensibleMaterialClass } from "./extensibleMaterialClass";
import { MaterialClassAugmentor } from "./materialClassAugmentor";
import { MaterialProperty } from "./materialProperty";
import { PropertyKind } from "./propertyKind";

export class MaterialClassParser {
  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  public static generateConstructorCode(ctorScope: TsScope, _classIsBase: boolean): void {
    ctorScope.line(`this.undefinedTypes = [];`);
    ctorScope.line(`this.undefinedProperties = {};`);
    // if (classIsBase) {
    //   ctorScope.line(`this._undefinedTypes = [];`);
    //   ctorScope.line(`this._undefinedProperties = {};`);
    // }
  }

  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  public static addMembers(
    dtdlVersions: number[],
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    obverseClass: TsClass,
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    obverseInterface: TsInterface,
    rawTypeName: string,
    typeName: string,
    kindEnum: string,
    kindProperty: string,
    classIsBase: boolean,
    classIsAbstract: boolean,
    classIsPartition: boolean,
    dtdlVersionToConcreteSubclasses: TypeVersionToConcreteSubclasses,
    dtdlVersionToExtensibleClasses: TypeVersionToExtensibleMaterialClasses,
    dtdlVersionExtensibleMaterialSubtypes: TypeVersionToExtensibleMaterialSubTypes,
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    properties: MaterialProperty[]
  ): void {
    this._generateUndefinedTypeAndPropertiesProperties(obverseClass, obverseInterface, classIsBase);
    this._generateDoesHaveTypeMethod(obverseClass, classIsAbstract);
    this._generateSourceObjectProperty(obverseClass, classIsBase);
    this._generateAddConstraintMethod(obverseClass, classIsAbstract, properties);
    this._generateAddInstancePropertyMethod(obverseClass, classIsAbstract, properties);
    this._generateParseObjectMethod(
      dtdlVersions,
      obverseClass,
      rawTypeName,
      typeName,
      classIsBase,
      classIsAbstract
    );
    this._generateParseTypeArrayMethod(
      dtdlVersions,
      obverseClass,
      typeName,
      kindEnum,
      kindProperty,
      classIsBase
    );
    this._generateDoesPropertyDictContainKeyMethod(obverseClass, classIsBase, properties);

    for (const dtdlVersion of dtdlVersions) {
      this._generateTryParseTypeStringMethod(
        dtdlVersion,
        obverseClass,
        typeName,
        kindEnum,
        dtdlVersionToConcreteSubclasses[dtdlVersion],
        dtdlVersionToExtensibleClasses[dtdlVersion],
        dtdlVersionExtensibleMaterialSubtypes[dtdlVersion]
      );
      this._generateParsePropertiesMethod(
        dtdlVersion,
        obverseClass,
        typeName,
        classIsBase,
        classIsAbstract,
        classIsPartition,
        properties
      );
    }

    this._generateParseTokenMethod(obverseClass, typeName, classIsBase, classIsAbstract);
    this._generateParseIdStringMethod(obverseClass, typeName, classIsBase, classIsAbstract);
  }

  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  private static _generateDoesHaveTypeMethod(
    obverseClass: TsClass,
    classIsAbstract: boolean
  ): void {
    const method = obverseClass
      .method({ name: "doesHaveType", returnType: "boolean", abstract: false, isStatic: false })
      .parameter({ name: "typeId", type: "string" });

    const returnLine = method.body.line(
      `return ${obverseClass.name}._versionlessTypes.has(new InDTMI(typeId).versionless)`
    );
    MaterialClassAugmentor.addTypeCheckLine(returnLine, !classIsAbstract);
    returnLine.line(";");
  }

  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  private static _generateUndefinedTypeAndPropertiesProperties(
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    obverseClass: TsClass,
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    obverseInterface: TsInterface,
    classIsBase: boolean
  ): void {
    const fName = "undefinedTypes";
    const fType = "string[]";
    obverseClass.field({ name: `${fName}`, access: TsAccess.Public, type: `${fType}` });
    const fNameProps = "undefinedProperties";
    const fTypeProps = "{[name: string]: any}";
    obverseClass.field({ name: `${fNameProps}`, access: TsAccess.Public, type: `${fTypeProps}` });

    if (classIsBase) {
      obverseInterface.field({ name: `${fName}`, type: `${fType}` });
      obverseInterface.field({ name: `${fNameProps}`, type: `${fTypeProps}` });
    }
  }

  private static _generateParseObjectMethod(
    dtdlVersions: number[],
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    obverseClass: TsClass,
    rawTypeName: string,
    typeName: string,
    _classIsBase: boolean,
    _classIsAbstract: boolean
  ): void {
    const typeNameImpl = typeName + "Impl";
    obverseClass.import(`import {IdValidator} from './internal';`);
    obverseClass.import(`import {ParsingError, createParsingError} from '../parser/parsingError';`);
    obverseClass.import(`import {AggregateContext} from './internal';`);
    obverseClass.import(`import {InDTMI} from '../parser/internalDtmi';`);
    obverseClass.import(`import {Reference, referenceInit} from '../common/reference';`);
    obverseClass.import(`import {Model} from './internal';`);
    obverseClass.import(`import {ParsedObjectPropertyInfo} from './internal'`);
    obverseClass.import(
      `import {ElementPropertyConstraint, ValueParser, ValueConstraint} from '../parser';`
    );

    const parseObjMethod = obverseClass
      .method({ name: "parseObject", returnType: "any", abstract: false, isStatic: true })
      .parameter({ name: "model", type: "Model" })
      .parameter({ name: "objectPropertyInfoList", type: "ParsedObjectPropertyInfo[]" })
      .parameter({ name: "elementPropertyConstraints", type: "ElementPropertyConstraint[]" })
      .parameter({ name: "valueConstraints", type: "ValueConstraint[]" })
      .parameter({ name: "aggregateContext", type: "AggregateContext" })
      .parameter({ name: "parsingErrors", type: "ParsingError[]" })
      .parameter({ name: "object", type: "{[index: string]: any}" })
      .parameter({ name: "parentId", type: "string|undefined" })
      .parameter({ name: "definedIn", type: "string|undefined" })
      .parameter({ name: "propName", type: "string|undefined" })
      .parameter({ name: "dtmiSeg", type: "string|undefined" })
      .parameter({ name: "keyProp", type: "string|undefined" })
      .parameter({ name: "idRequired", type: "boolean" })
      .parameter({ name: "typeRequired", type: "boolean" })
      .parameter({ name: "allowIdReferenceSyntax", type: "boolean" })
      .parameter({ name: "allowedVersions", type: "Set<number>" });

    parseObjMethod.body
      .line(`// This is a method to parse the object read from DTDL into a type of ${typeName}`)
      .line(
        `const childAggregateContext = aggregateContext.getChildContext(object, parsingErrors);`
      );
    parseObjMethod.body
      .if(
        `Object.keys(object).length === 1 && Object.prototype.hasOwnProperty.call(object, '@id') && typeof object['@id'] === 'string'`
      )
      .if(`allowIdReferenceSyntax && parentId !== undefined`)
      .line(
        `this.parseIdString(objectPropertyInfoList, elementPropertyConstraints, valueConstraints, childAggregateContext, parsingErrors, object['@id'], parentId, propName, keyProp, allowedVersions);`
      )
      .line("return;")
      .else()
      .line("parsingErrors.push(createParsingError(")
      .line(`'dtmi:dtdl:parsingError:idReference',`)
      .line("{")
      .line(
        `cause: \`{primaryId:p} property '{property}' has an inline definition containing nothing but an '@id' property.\`,`
      )
      .line(
        `action: \`Replace the inline definition with a string value of '{secondaryId}', or provide a complete inline definition for property '{property}'.\`,`
      )
      .line(`primaryId: parentId,`)
      .line(`property: propName,`)
      .line(`secondaryId: object['@id'],`)
      .line(`}));`)
      .line("return;");
    parseObjMethod.body
      .if(
        `allowedVersions !== undefined && allowedVersions.size !== 0 && !allowedVersions.has(childAggregateContext.dtdlVersion)`
      )
      .line("parsingErrors.push(createParsingError(")
      .line(`'dtmi:dtdl:parsingError:disallowedVersionDefinition',`)
      .line("{")
      .line(
        "cause: `{primaryId:p} property '{property}' has a value that specifies DTDL context version ${childAggregateContext.dtdlVersion}, which is not allowed for this property.`,"
      )
      .line(
        "action: `Change the DTDL context version of property '{property}' to one of the following: ${Array.from(allowedVersions.values()).join(' ,')}.`,"
      )
      .line(`primaryId: parentId,`)
      .line(`property: propName,`)
      .line(`}));`);
    parseObjMethod.body
      .line("const typeToken = object['@type'];")
      .line(`let typeTokenArr : any[] = [];`)
      .line(
        "const elementId = IdValidator.parseIdProperty(object, parentId !== undefined? parentId:'', propName, dtmiSeg, idRequired, parsingErrors, childAggregateContext.dtdlVersion);"
      )
      .if(`elementId === undefined || elementId === null`)
      .line("return;");
    const autogennedIfScope = parseObjMethod.body
      .if(`Object.prototype.hasOwnProperty.call(model.dict, elementId)`)
      .line(`const elementDtmi = InDTMI.createDtmi(elementId);`);
    autogennedIfScope
      .if(`!elementDtmi?.isReserved`)
      .line("parsingErrors.push(createParsingError(")
      .line(`'dtmi:dtdl:parsingError:duplicateDefinition',`)
      .line("{")
      .line("cause: `{primaryId:p} has more than one definition.`,")
      .line(
        "action: `Remove all but one JSON object containing '@id' property with value {primaryId}, or change the '@id' values so there are no duplicates.`,"
      )
      .line(`primaryId: elementId,`)
      .line(`}));`)
      .elseIf(`dtmiSeg !== undefined`)
      .line("parsingErrors.push(createParsingError(")
      .line(`'dtmi:dtdl:parsingError:nonUniquePropertyValue',`)
      .line("{")
      .line(
        "cause: `{primaryId:p} property ${propName} contains more than one element whose property '{dtmiSeg}' has value ${dtmiSeg}`,"
      )
      .line(
        "action: `Change the value of property ${dtmiSeg} to a string value that is unique across all values of ${propName}.`,"
      )
      .line(`primaryId: parentId,`)
      .line(`property: propName,`)
      .line(`value: dtmiSeg`)
      .line(`}));`);
    autogennedIfScope.line(`return;`);
    parseObjMethod.body
      .if(`typeRequired && typeToken === undefined`)
      .line("parsingErrors.push(createParsingError(")
      .line(`'dtmi:dtdl:parsingError:badType',`)
      .line("{")
      .line("cause: this._badTypeCauseFormat[childAggregateContext.dtdlVersion],")
      .line("action: this._badTypeActionFormat[childAggregateContext.dtdlVersion],")
      .line(`primaryId: parentId,`)
      .line(`property: propName,`)
      .line(`secondaryId: elementId`)
      .line(`}));`)
      .line(`return;`);
    parseObjMethod.body
      .if(`typeToken === undefined`)
      .line(`typeTokenArr = ['${rawTypeName}'];`)
      .elseIf(`!Array.isArray(typeToken)`)
      .line(`typeTokenArr = [typeToken];`)
      .else()
      .line("typeTokenArr = typeToken;");

    parseObjMethod.body
      .line(
        `const elementInfo = this.parseTypeArray(typeTokenArr, elementId, parentId, definedIn, propName, childAggregateContext, parsingErrors);`
      )
      .if("elementInfo === undefined")
      .line(`return;`);

    parseObjMethod.body.line(`(elementInfo as ${typeNameImpl}).sourceObject = object;`);

    const switchScope = parseObjMethod.body.scope("switch (childAggregateContext.dtdlVersion)");
    for (const dtdlVersion of dtdlVersions) {
      const switchCase = switchScope.scope(`case ${dtdlVersion}:`);
      switchCase
        .line(
          `(elementInfo as ${typeNameImpl})?.parsePropertiesV${dtdlVersion}(model, objectPropertyInfoList, elementPropertyConstraints, childAggregateContext, parsingErrors, object, definedIn, allowIdReferenceSyntax);`
        )
        .line(`break;`);
    }
    parseObjMethod.body
      .line(`model.dict[elementId] = elementInfo;`)
      .if("parentId !== undefined")
      .line(
        "const objectPropertyInfo: ParsedObjectPropertyInfo = {elementId: parentId, propertyName: propName || '', referencedElementId: elementId, keyProperty: keyProp, expectedKinds: [], allowedVersions: new Set<number>(), badTypeCauseFormat: undefined, badTypeActionFormat: undefined};"
      )
      .line("objectPropertyInfoList.push(objectPropertyInfo);")
      .if("valueConstraints !== undefined && elementPropertyConstraints !== undefined")
      .for("const vc of valueConstraints")
      .line(
        "const elementPropertyConstraint = {parentId: parentId, propertyName: propName, elementId: elementId, valueConstraint: vc,};"
      )
      .line("elementPropertyConstraints.push(elementPropertyConstraint);");
  }

  private static _generateParseTypeArrayMethod(
    dtdlVersions: number[],
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    tsClass: TsClass,
    typeName: string,
    kindEnum: string,
    _kindProperty: string,
    _classIsBase: boolean
  ): void {
    const typeNameImpl = typeName + "Impl";
    const parseTypeArrayMethod = tsClass
      .method({
        name: "parseTypeArray",
        returnType: `${typeName}|undefined`,
        abstract: false,
        isStatic: true
      })
      .parameter({ name: "tokenArr", type: "any[]" })
      .parameter({ name: "elementId", type: "string" })
      .parameter({ name: "parentId", type: "string|undefined" })
      .parameter({ name: "definedIn", type: "string|undefined" })
      .parameter({ name: "propName", type: "string|undefined" })
      .parameter({ name: "aggregateContext", type: "AggregateContext" })
      .parameter({ name: "parsingErrors", type: "ParsingError[]" });

    parseTypeArrayMethod.body
      .line(`const materialKinds : ${kindEnum}[] = [];`)
      .line(`const elementInfo : Reference<${typeName}> = referenceInit();`)
      .line(`let anyFailures = false;`)
      .line(`const supplementalTypeIds : string[] = [];`)
      .line(`const undefinedTypes : string[] = [];`);

    const forloop = parseTypeArrayMethod.body.for(`const element of tokenArr`);
    forloop
      .if(`typeof element !== 'string'`)
      .line("parsingErrors.push(createParsingError(")
      .line(`'dtmi:dtdl:parsingError:badType',`)
      .line("{")
      .line(`cause: this._badTypeCauseFormat[aggregateContext.dtdlVersion],`)
      .line(`action: this._badTypeActionFormat[aggregateContext.dtdlVersion],`)
      .line(`primaryId: parentId,`)
      .line(`property: propName,`)
      .line(`secondaryId: elementId,`)
      .line(`value: element`)
      .line(`}));`)
      .line("return undefined;");
    if (dtdlVersions.length > 0) {
      const nestedSwitch = forloop.scope(`switch (aggregateContext.dtdlVersion)`);

      for (const dtdlVersion of dtdlVersions) {
        const switchCase = nestedSwitch.scope(`case ${dtdlVersion}:`);
        switchCase
          .if(
            `!this.tryParseTypeStringV${dtdlVersion}(element.toString(), elementId, parentId, definedIn, propName, materialKinds, supplementalTypeIds, elementInfo, undefinedTypes, aggregateContext, parsingErrors)`
          )
          .line(`anyFailures = true;`);
        switchCase.line(`break;`);
      }
    }

    parseTypeArrayMethod.body.if(`anyFailures`).line(`return undefined;`);

    parseTypeArrayMethod.body
      .if(`elementInfo.ref === undefined`)
      .line("parsingErrors.push(createParsingError(")
      .line(`'dtmi:dtdl:parsingError:badType',`)
      .line("{")
      .line(`cause: this._badTypeCauseFormat[aggregateContext.dtdlVersion],`)
      .line(`action: this._badTypeActionFormat[aggregateContext.dtdlVersion],`)
      .line(`primaryId: parentId,`)
      .line(`property: propName,`)
      .line(`secondaryId: elementId,`)
      .line(`}));`)
      .line("return undefined;");

    parseTypeArrayMethod.body
      .if(`materialKinds.length > 1`)
      .line("parsingErrors.push(createParsingError(")
      .line(`'dtmi:dtdl:parsingError:multipleMaterialTypes',`)
      .line("{")
      .line(
        "cause: `{primaryId:p} has @type that specifies multiple material types: ${materialKinds.join(' ,')}`,"
      )
      .line("action: `Remove excess @type values so that only one material type remains.`,")
      .line(`primaryId: elementId,`)
      .line(`}));`)
      .line("return undefined;");

    parseTypeArrayMethod.body.line(`elementInfo.ref.undefinedTypes = undefinedTypes;`);

    tsClass.import(`import {ModelParserImpl} from './internal';`);
    parseTypeArrayMethod.body
      .for(`const supplementalTypeId of supplementalTypeIds`)
      .line(
        `const supplementalTypeInfo = ModelParserImpl.retrieveSupplementalTypeCollection().supplementalTypes.get(supplementalTypeId);`
      )
      .if(`elementInfo.ref !== undefined && elementInfo.ref.entityKind !== undefined`)
      .if(
        `!(supplementalTypeInfo as SupplementalTypeInfoImpl)?.allowedCotypeKinds.includes(elementInfo.ref.entityKind)`
      )
      .line("parsingErrors.push(createParsingError(")
      .line(`'dtmi:dtdl:parsingError:invalidCotype',`)
      .line("{")
      .line(
        `cause: \`{primaryId:p} has @type {value} that can only be applied to elements of @type \${(supplementalTypeInfo as SupplementalTypeInfoImpl)?.allowedCotypeKinds.join(' or ')} + '.'\`,`
      )
      .line(`action: \`Remove @type '{value}' from element.\`,`)
      .line(`primaryId: elementId,`)
      .line(`value: AggregateContext.getTermOrUri(supplementalTypeId)`)
      .line(`}));`)
      .elseIf(
        `!(supplementalTypeInfo as SupplementalTypeInfoImpl)?.allowedCotypeVersions.includes(elementInfo.ref.dtdlVersion)`
      )
      .line("parsingErrors.push(createParsingError(")
      .line(`'dtmi:dtdl:parsingError:invalidCotypeVersion',`)
      .line("{")
      .line(
        `cause: \`{primaryId:p} has @type {value} that can only be applied to elements defined in DTDL version \${(supplementalTypeInfo as SupplementalTypeInfoImpl)?.allowedCotypeVersions.join(' or ')} + '.'\`,`
      )
      .line(`action: \`Remove @type '{value}' from element.\`,`)
      .line(`primaryId: elementId,`)
      .line(`value: AggregateContext.getTermOrUri(supplementalTypeId)`)
      .line(`}));`)
      .else()
      .line(
        `(elementInfo.ref as ${typeNameImpl}).addType(supplementalTypeId, supplementalTypeInfo);`
      );

    parseTypeArrayMethod.body.line(`return elementInfo.ref;`).line("// this ends the method.");
  }

  private static _generateDoesPropertyDictContainKeyMethod(
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    obverseClass: TsClass,
    _classIsBase: boolean,
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    properties: MaterialProperty[]
  ): void {
    const method = obverseClass.method({
      name: "doesPropertyDictContainKey",
      returnType: "boolean"
    });
    method
      .parameter({ name: "propertyName", type: "string" })
      .parameter({ name: "key", type: "string | undefined" });
    const switchScope = method.body.line(`switch (propertyName) {`);

    properties.forEach((prop) => {
      prop.addCaseToDictionaryKeySwitch(switchScope);
    });

    switchScope.line(`default:`);
    switchScope.line("return false");

    method.body.line(`}`);
  }

  private static _generateTryParseTypeStringMethod(
    dtdlVersion: number,
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    tsClass: TsClass,
    typeName: string,
    kindEnum: string,
    concreteSubclasses: ConcreteSubclass[],
    extensibleMaterialClasses: ExtensibleMaterialClass[],
    extensibleMaterialSubtypes: string[]
  ): void {
    const methodName = "tryParseTypeStringV" + dtdlVersion;
    const tryParseTypeStringMethod = tsClass
      .method({ name: methodName, returnType: "boolean", abstract: false, isStatic: true })
      .parameter({ name: "typestring", type: "string" })
      .parameter({ name: "elementId", type: "string" })
      .parameter({ name: "parentId", type: "string|undefined" })
      .parameter({ name: "definedIn", type: "string|undefined" })
      .parameter({ name: "propName", type: "string|undefined" })
      .parameter({ name: "materialKinds", type: `${kindEnum}[]` })
      .parameter({ name: "supplementalTypeIds", type: `string[]` })
      .parameter({ name: "elementInfo", type: `Reference<${typeName}>` })
      .parameter({ name: "undefinedTypes", type: "string[]" })
      .parameter({ name: "aggregateContext", type: "AggregateContext" })
      .parameter({ name: "parsingErrors", type: "ParsingError[]" });

    tryParseTypeStringMethod.body.line(`switch (typestring) {`);

    concreteSubclasses.forEach((subclass) => {
      if (tsClass.name !== subclass.className) {
        tsClass.import(`import {${subclass.className}} from './internal';`);
      }
      subclass.addCaseToParseTypeStringSwitch(
        tryParseTypeStringMethod.body,
        "elementInfo.ref",
        "elementId",
        "parentId",
        "definedIn"
      );
    });

    tryParseTypeStringMethod.body.line(`}`);

    tsClass.import(`import {MaterialTypeNameCollection} from '././internal';`);
    tryParseTypeStringMethod.body
      .if("MaterialTypeNameCollection.isMaterialType(typestring)")
      .line("parsingErrors.push(createParsingError(")
      .line(`'dtmi:dtdl:parsingError:badType',`)
      .line("{")
      .line(`cause: this._badTypeCauseFormat[${dtdlVersion}],`)
      .line(`action: this._badTypeActionFormat[${dtdlVersion}],`)
      .line(`primaryId: parentId,`)
      .line(`property: propName,`)
      .line(`secondaryId: elementId,`)
      .line(`value: typestring`)
      .line(`}));`);

    tryParseTypeStringMethod.body.line(
      "const supplementalTypeId = aggregateContext.createDtmi(typestring);"
    );
    const supplementalTypeIdDefinedIfScope = tryParseTypeStringMethod.body.if(
      "supplementalTypeId === undefined"
    );
    supplementalTypeIdDefinedIfScope
      .if("undefinedTypes === undefined")
      .line("undefinedTypes = [];");
    supplementalTypeIdDefinedIfScope.line("undefinedTypes.push(typestring);").line("return true");

    tryParseTypeStringMethod.body
      .line(
        "const mapOfInDTMIToSupplementalTypeInfo = ModelParserImpl.retrieveSupplementalTypeCollection().supplementalTypes;"
      )
      .if(
        "supplementalTypeId !== undefined && !mapOfInDTMIToSupplementalTypeInfo.has(supplementalTypeId.value)"
      )
      .line("parsingErrors.push(createParsingError(")
      .line(`'dtmi:dtdl:parsingError:badType',`)
      .line("{")
      .line(`cause: this._badTypeCauseFormat[${dtdlVersion}],`)
      .line(`action: this._badTypeActionFormat[${dtdlVersion}],`)
      .line(`primaryId: parentId,`)
      .line(`property: propName,`)
      .line(`secondaryId: elementId,`)
      .line(`value: typestring`)
      .line(`}));`)
      .line("return false;");

    tsClass.import(`import {ModelParserImpl} from './internal';`);
    const supplementalTypeIdDefinedIfScopeOuter = tryParseTypeStringMethod.body
      .if("supplementalTypeId !== undefined")
      .line(
        "const supplementalTypeInfo = mapOfInDTMIToSupplementalTypeInfo.get(supplementalTypeId.value);"
      );
    supplementalTypeIdDefinedIfScopeOuter
      .if("supplementalTypeInfo?.isAbstract")
      .line("parsingErrors.push(createParsingError(")
      .line(`'dtmi:dtdl:parsingError:abstractSupplementalType',`)
      .line("{")
      .line(
        `cause: \`{primaryId:p} has @type that specifies supplemental type {value} that is abstract.\`,`
      )
      .line(`action: \`Remove @type {value} or replace with a concrete subtype of {value}.\`,`)
      .line(`primaryId: elementId,`)
      .line(`property: '@type',`)
      .line(`value: AggregateContext.getTermOrUri(supplementalTypeId.value)`)
      .line(`}));`);

    if (extensibleMaterialClasses !== undefined && extensibleMaterialClasses.length > 0) {
      const switchOnExtensionKind = supplementalTypeIdDefinedIfScopeOuter.scope(
        "switch ((supplementalTypeInfo as SupplementalTypeInfoImpl)?.extensionKind)"
      );
      tsClass.import(`import {ExtensionKind} from './internal';`);
      extensibleMaterialClasses.forEach((extensibleMaterialClass) => {
        extensibleMaterialClass.addCaseToParseTypeStringSwitch(
          tsClass,
          switchOnExtensionKind,
          extensibleMaterialSubtypes,
          "parentId",
          "definedIn"
        );
      });
    }
    supplementalTypeIdDefinedIfScopeOuter
      .line("supplementalTypeIds.push(supplementalTypeId.value);")
      .line("return true;");

    tryParseTypeStringMethod.body.line("return true");
  }

  private static _generateParsePropertiesMethod(
    dtdlVersion: number,
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    obverseClass: TsClass,
    _typeName: string,
    _classIsBase: boolean,
    classIsAbstract: boolean,
    classIsPartition: boolean,
    materialProperties: MaterialProperty[]
  ): void {
    // TODO : Remove parser generator values after pattern regex is written
    // obverseClass.import(`import {ParserGeneratorValues} from '../src/parserGenerator/parserGeneratorValues';`);
    const methodName = "parsePropertiesV" + dtdlVersion;
    // TODO Static false is not doing anything
    const parsePropertiesMethod = obverseClass
      .method({ name: methodName, returnType: "void", abstract: false, isStatic: false })
      .parameter({ name: "model", type: "Model" })
      .parameter({ name: "objectPropertyInfoList", type: "ParsedObjectPropertyInfo[]" })
      .parameter({ name: "elementPropertyConstraints", type: "ElementPropertyConstraint[]" })
      .parameter({ name: "aggregateContext", type: "AggregateContext" })
      .parameter({ name: "parsingErrors", type: "ParsingError[]" })
      .parameter({ name: "object", type: "{[index: string]: any}" })
      .parameter({ name: "definedIn", type: "string|undefined" })
      .parameter({ name: "allowIdReferenceSyntax", type: "boolean" });

    materialProperties.forEach((property) => {
      property.setValue(dtdlVersion, parsePropertiesMethod.body, "this");
      parsePropertiesMethod.body.line("");
      property.initMissingPropertyVariable(dtdlVersion, parsePropertiesMethod.body);
    });
    const forScope = parsePropertiesMethod.body.for("const propKey in object");
    if (materialProperties.some((prop) => prop.hasCountRestriction(dtdlVersion))) {
      forScope.line(`let valueCount : number;`);
    }
    forScope.line("const propValue = object[propKey];");
    forScope
      .if("propValue === undefined || propValue === null")
      .line("parsingErrors.push(createParsingError(")
      .line(`'dtmi:dtdl:parsingError:propertyValueNull',`)
      .line("{")
      .line(
        `cause: \`{primaryId:p} property '{property}' has value null, which is not allowed in DTDL models.\`,`
      )
      .line(
        `action: \`Change the value of '{property}' to a value that is legal for this property.\`,`
      )
      .line(`primaryId: this.id,`)
      .line(`property: propKey,`)
      .line(`}));`)
      .line("continue;");
    forScope.if(`propKey[0] === '@'`).line("continue;");
    const switchScope = forScope.scope("switch (propKey)");
    materialProperties.forEach((property) => {
      property.addCaseToParseSwitch(
        dtdlVersion,
        obverseClass,
        switchScope,
        !classIsAbstract,
        classIsPartition,
        "valueCount",
        "definedIn"
      );
    });

    MaterialClassAugmentor.addTryParseSupplementalProperty(forScope, !classIsAbstract);

    forScope
      .if(`this.undefinedTypes !== undefined && this.undefinedTypes.length > 0`)
      .line(`this.undefinedProperties[propKey] = propValue;`)
      .else()
      .line("parsingErrors.push(")
      .line(`createParsingError('dtmi:dtdl:parsingError:noTypeThatAllows',`)
      .line(`{`)
      .line(`cause: \`{primaryId:p} does not have a @type that allows property \${propKey}.\`,`)
      .line(`action: \`Remove property \${propKey} or correct if misspelled.\`,`)
      .line(`primaryId: this.id,`)
      .line(`property: propKey,`)
      .line(`}));`);

    materialProperties.forEach((property) => {
      property.addCheckForRequiredProperty(dtdlVersion, parsePropertiesMethod.body);
    });

    MaterialClassAugmentor.addChecksForRequiredProperties(
      parsePropertiesMethod.body,
      !classIsAbstract
    );
  }

  private static _generateParseTokenMethod(
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    obverseClass: TsClass,
    _typeName: string,
    _classIsBase: boolean,
    _classIsAbstract: boolean
  ): void {
    const methodName = "parseToken";
    const parseTokenMethod = obverseClass
      .method({ name: methodName, returnType: "number", abstract: false, isStatic: true })
      .parameter({ name: "model", type: "Model" })
      .parameter({ name: "objectPropertyInfoList", type: "ParsedObjectPropertyInfo[]" })
      .parameter({ name: "elementPropertyConstraints", type: "ElementPropertyConstraint[]" })
      .parameter({ name: "valueConstraints", type: "ValueConstraint[]" })
      .parameter({ name: "aggregateContext", type: "AggregateContext" })
      .parameter({ name: "parsingErrors", type: "ParsingError[]" })
      .parameter({ name: "token", type: "any" })
      .parameter({ name: "parentId", type: "string|undefined" })
      .parameter({ name: "definedIn", type: "string|undefined" })
      .parameter({ name: "propName", type: "string|undefined" })
      .parameter({ name: "dtmiSeg", type: "string|undefined" })
      .parameter({ name: "keyProp", type: "string|undefined" })
      .parameter({ name: "idRequired", type: "boolean" })
      .parameter({ name: "typeRequired", type: "boolean" })
      .parameter({ name: "allowIdReferenceSyntax", type: "boolean" })
      .parameter({ name: "allowedVersions", type: "Set<number>" }); // TODO Set ??

    parseTokenMethod.body.line("let valueCount = 0;");

    const typeTokenIfScope = parseTokenMethod.body.if(`typeof token === 'string'`);
    typeTokenIfScope
      .if("parentId !== undefined")
      .line(
        `this.parseIdString(objectPropertyInfoList, elementPropertyConstraints, valueConstraints , aggregateContext, parsingErrors, token.toString(), parentId, propName, keyProp, allowedVersions);`
      )
      .line("valueCount++;");

    // const _isArrayElseIfScope = typeTokenIfScope
    //   .elseIf("Array.isArray(token)")
    //   .for("const elementToken of token")
    //   .line(
    //     "valueCount += this.parseToken(model, objectPropertyInfoList, elementPropertyConstraints, valueConstraints, aggregateContext, parsingErrors, elementToken, parentId, definedIn, propName, dtmiSeg, keyProp, idRequired, typeRequired, allowIdReferenceSyntax, allowedVersions);"
    //   );

    typeTokenIfScope
      .elseIf(`typeof token === 'object'`)
      .line(
        "this.parseObject(model, objectPropertyInfoList, elementPropertyConstraints, valueConstraints, aggregateContext, parsingErrors, token, parentId, definedIn, propName, dtmiSeg, keyProp, idRequired, typeRequired, allowIdReferenceSyntax, allowedVersions);"
      )
      .line("valueCount++;")
      .else()
      .line("parsingErrors.push(")
      .line(`createParsingError('dtmi:dtdl:parsingError:badDtmiOrTerm',`)
      .line(`{`)
      .line(
        `cause: \`{primaryId:p} property '{property}' has value '{value}' that is not a DTMI or a DTDL term.\`,`
      )
      .line(
        `action: \`Replace the value of property '{property}, with a valid DTMI or a term defined by DTDL -- see https://github.com/Azure/opendigitaltwins-dtdl/tree/master/DTDL.\`,`
      )
      .line(`primaryId: parentId,`)
      .line(`property: propName,`)
      .line(`value: token.toString(),`)
      .line(`}));`);

    parseTokenMethod.body.line("return valueCount;");
  }

  private static _generateAddConstraintMethod(
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    obverseClass: TsClass,
    classIsAbstract: boolean,
    properties: MaterialProperty[]
  ): void {
    if (!classIsAbstract && properties.some((prop) => prop.propertyKind === PropertyKind.Object)) {
      const method = obverseClass
        .method({ name: "addConstraint", returnType: "void", abstract: false, isStatic: false })
        .parameter({ name: "propertyName", type: "string" })
        .parameter({ name: "valueConstraint", type: "ValueConstraint" });

      method.body.line(`switch (propertyName) {`);

      properties.forEach((prop) => {
        prop.addCaseForValueConstraintSwitch(method.body, "valueConstraint");
      });

      method.body.line(`}`);
    }
  }

  private static _generateAddInstancePropertyMethod(
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    obverseClass: TsClass,
    classIsAbstract: boolean,
    properties: MaterialProperty[]
  ): void {
    if (!classIsAbstract && properties.some((prop) => prop.propertyKind === PropertyKind.Object)) {
      const method = obverseClass
        .method({
          name: "addInstanceProperty",
          returnType: "void",
          abstract: false,
          isStatic: false
        })
        .parameter({ name: "propertyName", type: "string" })
        .parameter({ name: "instancePropertyName", type: "string" });

      method.body.line(`switch (propertyName) {`);

      properties.forEach((prop) => {
        prop.addCaseForInstancePropertySwitch(method.body, "instancePropertyName");
      });

      method.body.line(`}`);
    }
  }

  private static _generateSourceObjectProperty(obverseClass: TsClass, _classIsBase: boolean): void {
    const fName = "sourceObject";
    const fType = "any";
    // TODO: Since this is public and accessible from model parser should this go to interface as well?
    obverseClass.field({ name: `${fName}`, access: TsAccess.Public, type: `${fType}` });
  }

  private static _generateParseIdStringMethod(
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    obverseClass: TsClass,
    _typeName: string,
    _classIsBase: boolean,
    _classIsAbstract: boolean
  ): void {
    const method = obverseClass
      .method({ name: "parseIdString", returnType: "void", abstract: false, isStatic: true })
      .parameter({ name: "objectPropertyInfoList", type: "ParsedObjectPropertyInfo[]" })
      .parameter({ name: "elementPropertyConstraints", type: "ElementPropertyConstraint[]" })
      .parameter({ name: "valueConstraints", type: "ValueConstraint[]" })
      .parameter({ name: "aggregateContext", type: "AggregateContext" })
      .parameter({ name: "parsingErrors", type: "ParsingError[]" })
      .parameter({ name: "idString", type: "string" })
      .parameter({ name: "parentId", type: "string" })
      .parameter({ name: "propName", type: "string|undefined" })
      .parameter({ name: "keyProp", type: "string|undefined" })
      .parameter({ name: "allowedVersions", type: "Set<number>" });

    method.body.line("const elementId = aggregateContext.createDtmi(idString);");
    const ifScope = method.body.if(`elementId !== undefined`);
    ifScope
      .line(
        "const objectPropertyInfo = {elementId: parentId, propertyName: propName ?? '', referencedElementId: elementId.value, keyProperty: keyProp, expectedKinds: this._concreteKinds[aggregateContext.dtdlVersion], allowedVersions: allowedVersions, badTypeCauseFormat: this._badTypeCauseFormat[aggregateContext.dtdlVersion], badTypeActionFormat: this._badTypeActionFormat[aggregateContext.dtdlVersion]};"
      )
      .line("objectPropertyInfoList.push(objectPropertyInfo);")
      .if("valueConstraints !== null && elementPropertyConstraints !== null")
      .for("const vc of valueConstraints")
      .line(
        "const elementPropertyConstraint = {parentId: parentId, propertyName: propName ?? '', elementId: elementId.value, valueConstraint: vc};"
      )
      .line("elementPropertyConstraints.push(elementPropertyConstraint);");
    ifScope
      .else()
      .line("parsingErrors.push(")
      .line(`createParsingError('dtmi:dtdl:parsingError:badDtmiOrTerm',`)
      .line(`{`)
      .line(
        `cause: \`{primaryId:p} property '{property}' has value '{value}' that is not a DTMI or a DTDL term.\`,`
      )
      .line(
        `action: \`Replace the value of property '{property}, with a valid DTMI or a term defined by DTDL -- see https://github.com/Azure/opendigitaltwins-dtdl/tree/master/DTDL.\`,`
      )
      .line(`primaryId: parentId,`)
      .line(`property: propName,`)
      .line(`value: idString,`)
      .line(`}));`);
  }
}

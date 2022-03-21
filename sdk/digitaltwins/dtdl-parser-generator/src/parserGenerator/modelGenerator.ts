// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/* eslint-disable valid-jsdoc */

import { TsClass, TsLibrary } from "../codeGenerator";
import { NameFormatter } from "./nameFormatter";
import { ParserGeneratorValues } from "./parserGeneratorValues";
import { TypeGenerator } from "./typeGenerator";

// TODO: When PartitionRestriction is implemented, replace this with an import
type PartitionRestriction = any;
// import {PartitionRestriction} from './partition_restriction';

export class ModelGenerator implements TypeGenerator {
  private _baseEnumName: string;
  private _baseEnumPropertyName: string;
  private _baseClassImplName: string;
  private readonly _partitionClasses: string[];
  private readonly _partitionRestrictions?: { [x: number]: PartitionRestriction };
  private readonly _refKind = "reference";

  constructor(
    baseName: string,
    partitionClasses: string[],
    partitionRestrictions?: { [x: number]: PartitionRestriction }
  ) {
    this._baseEnumName = NameFormatter.formatNameForEnumDisjunction(baseName);
    this._baseEnumPropertyName = NameFormatter.formatNameAsEnumParameter(baseName);
    this._baseClassImplName = NameFormatter.formatNameAsImplementation(baseName);
    this._partitionClasses = partitionClasses;
    this._partitionRestrictions = partitionRestrictions;
  }

  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  generateType(parserLibrary: TsLibrary): void {
    this.generateCode(parserLibrary);
  }

  /**
   * NOTE: This is generating a "Partial Class". Therefore the code generated will merge in code blocks from
   * parserPartial/model.ts, as well as handwritten auxiliary code
   */
  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  generateCode(parserLibrary: TsLibrary): void {
    const referenceClassName = NameFormatter.formatNameAsImplementation(
      ParserGeneratorValues.referenceObverseName
    );

    const modelClass: TsClass = parserLibrary.class({ name: "Model", exports: true });
    modelClass.docString.line("A DTDL model.");
    // TODO: Should be replaced with inline of topoffile from model.ts
    modelClass
      .import(`import {ParsingError, createParsingError, InDTMI} from '../parser';`)
      .import(
        `import {ParsedObjectPropertyInfo, ${referenceClassName}, ModelDict, SupplementalTypeInfo, ${this._baseEnumName}, ${this._baseClassImplName}} from './internal';`
      );

    modelClass.field({ name: "dict", type: "ModelDict" });

    this._generateModelConstructor(modelClass);
    this._generateIsPartitionMethod(modelClass);
    this._generateAddTypeMethod(modelClass);
    this._generateDoesPropertyDictContainKeyMethod(modelClass);
    this._generateTrySetObjectPropertyMethod(modelClass, referenceClassName);
    this._generateIsKindInSetMethod(modelClass);
    this._generateGetKindStringMethod(modelClass);

    this._generateCheckRestrictions(modelClass);
    this._generateApplyTransformations(modelClass);

    // Inline Partial Class methods
    modelClass.inline("./src/parserPartial/model.ts", "method-block");
  }

  // TODO: This is going to be necessary if PartitionRestrictions are necessary.
  // private _generateModelStaticConstructor(modelClass: TsClass) {
  //   const staticConstructor = modelClass.staticCtor;
  //   staticConstructor.body;
  //   // TODO: This _partitionRestrictions is currently in the planning phase for v3 and might not be implemented.
  //   // If it makes it to DTDL v3, then we need to implement partition type collection fully as model partition collection.
  //   // For now though this code remains but it really doesn't do much.
  //   if (this._partitionRestrictions !== undefined) {
  //     for (const [key, value] of Object.entries(this._partitionRestrictions)) {
  //       if (value.maxBytes !== undefined) {
  //         staticConstructor.body.line(`partitionMaxBytes[${key}] = ${value.maxBytes}`);
  //       } else {
  //         // Hardcoded based on Model.g.cs
  //         staticConstructor.body.line(`partitionMaxBytes[3] = 1048576`);
  //       }
  //     }
  //   }
  // }

  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  private _generateModelConstructor(modelClass: TsClass): void {
    const constructor = modelClass.ctor;
    constructor.body.inline("./src/parserPartial/model.ts", "constructor");
  }

  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  private _generateIsPartitionMethod(modelClass: TsClass): void {
    const isPartitionMethod = modelClass.method({ name: "isPartition", returnType: "boolean" });
    isPartitionMethod.parameter({ name: "elementId", type: "string" });
    isPartitionMethod.body.line(
      `return (this.dict[elementId] as ${this._baseClassImplName})?.${ParserGeneratorValues.IsPartitionMethodName} || false;`
    );
  }

  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  private _generateAddTypeMethod(modelClass: TsClass): void {
    const addTypeMethod = modelClass.method({ name: "addType", returnType: "void" });
    // TODO: correct? originally: setPartitionInfoMethod.Param("JToken", "partitionJToken", "<c>JToken</c> containing the partition JSON.");
    addTypeMethod
      .parameter({ name: "elementId", type: "string" })
      .parameter({ name: "supplementalTypeId", type: "any" })
      .parameter({ name: "supplementalType", type: "SupplementalTypeInfo" });
    addTypeMethod.body.line(
      `(this.dict[elementId] as ${this._baseClassImplName})?.addType(supplementalTypeId, supplementalType);`
    );
  }

  // TODO: This will be necessary after we fully implement real partitioning. For now we can comment out.
  // private _generateSetPartitionInfoMethod(modelClass: TsClass) {
  //   const setPartitionInfoMethod = modelClass.method({name: 'setPartitionInfo', returnType: 'void'});
  //   setPartitionInfoMethod
  //     .parameter({name: 'elementId', type: 'string'})
  //     .parameter({name: 'partitionToken', type: 'any'})
  //     .parameter({name: 'parsingErrors', type: 'ParsingError[]'}); // JToken
  //   setPartitionInfoMethod.body
  //     .line('const partitionJsonText = partitionToken.toString();')
  //     .line(`const dtdlVersion = this.dict[\`$\{elementId}\`]?.dtdlVersion`)
  //     .line(`const partitionMaxBytes = dtdlVersion ? Model._parititionMaxBytes[dtdlVersion] : undefined;`)
  //     .if(`partitionMaxBytes && partitionJsonText.length > partitionMaxBytes`)
  //       .multiLine('parsingErrors.push(createParsingError(')
  //         .line('"dtmi:dtdl:parsingError:partitionTooLarge",')
  //         .line('{')
  //         .line(`cause: \`JSON text of $\{elementId} is $\{partitionJsonText.Length} bytes in length, but the largest permissible size is {partitionMaxBytes} bytes.\`,`)
  //         .line(`action: \`Refactor model so that the size of each ${this._partitionClasses.join(' or ')} is no gretaer than {partitionMaxBytes} bytes.\`,`)
  //         .line(`primaryId: elementId}));`);
  //   setPartitionInfoMethod.body
  //     .line(`this.dict[elementId]?.setPartitionInfo(partitionToken);`);
  // }

  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  private _generateDoesPropertyDictContainKeyMethod(modelClass: TsClass): void {
    const doesPropertyDictContainKeyMethod = modelClass.method({
      name: "doesPropertyDictContainKey",
      returnType: "boolean"
    });
    doesPropertyDictContainKeyMethod
      .parameter({ name: "elementId", type: "string" })
      .parameter({ name: "propertyName", type: "string" })
      .parameter({ name: "key", type: "string", optional: true });
    doesPropertyDictContainKeyMethod.body.line(
      `return (this.dict[elementId] as ${this._baseClassImplName})?.doesPropertyDictContainKey(propertyName, key) || false;`
    );
  }

  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  private _generateTrySetObjectPropertyMethod(
    modelClass: TsClass,
    referenceClassName: string
  ): void {
    const trySetObjectPropertyMethod = modelClass.method({
      name: "trySetObjectProperty",
      returnType: "boolean"
    });
    trySetObjectPropertyMethod
      .parameter({ name: "elementId", type: "string" })
      .parameter({ name: "propertyName", type: "string" })
      .parameter({ name: "referencedElementId", type: "string" })
      .parameter({ name: "key", type: "string", optional: true });
    trySetObjectPropertyMethod.body
      .line(
        `const obj = Object.keys(this.dict).includes(referencedElementId) ? this.dict[referencedElementId] : new ${referenceClassName}(0, referencedElementId, undefined, undefined, 'reference');`
      )
      .line(
        `return (this.dict[elementId] as ${this._baseClassImplName})?.trySetObjectProperty(propertyName, obj, key) || false;`
      );
  }

  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  private _generateIsKindInSetMethod(modelClass: TsClass): void {
    const isKindInSetMethod = modelClass.method({ name: "isKindInSet", returnType: "boolean" });
    isKindInSetMethod
      .parameter({ name: "elementId", type: "string" })
      .parameter({ name: "kindSet", type: `${this._baseEnumName}[]` });
    isKindInSetMethod.body
      .if(`this.dict[elementId]?.entityKind !== undefined`)
      .line(
        `return kindSet.includes(this.dict[elementId]?.${this._baseEnumPropertyName} as ${this._baseEnumName});`
      );
    isKindInSetMethod.body.line("return false;");
  }

  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  private _generateGetKindStringMethod(modelClass: TsClass): void {
    const getKindStringMethod = modelClass.method({ name: "getKindString", returnType: "string" });
    getKindStringMethod.parameter({ name: "elementId", type: "string" });
    // TODO This weird fix is for an error that happens due to static loading of standard elements
    // which calls the constructor of BooleanInfo and says Cannot set property '2' of undefined
    // which means Cannot set BOOLEAN of undefined. And hence all entityKind field, param in constructor, getter
    // has been made to accept undefined.
    getKindStringMethod.body
      .line("const element = this.dict[elementId];")
      // .line('return element !== undefined ? EntityKind[element.entityKind].substring(0, 1) + EntityKind[element.entityKind].substring(1).toLowerCase() : \'\';') // TODO This is going to return in uppercase. So the test case has been changed to do so.
      // .line(`return this.dict[elementId]?.${this._baseEnumPropertyName}?.toString() || '';`);
      // getKindStringMethod.body.line(`return this.dict[elementId]?.${this._baseEnumPropertyName}.toString() || '';`);
      .line(
        `return element !== undefined ? element.entityKind.substring(0, 1).toUpperCase() + element.entityKind.substring(1) : '';`
      );
  }

  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  private _generateCheckRestrictions(modelClass: TsClass): void {
    const checkRestrictionsMethod = modelClass.method({
      name: "checkRestrictions",
      returnType: "void"
    });
    checkRestrictionsMethod.parameter({ name: "parsingErrors", type: "ParsingError[]" });
    // eslint-disable-next-line no-unused-expressions
    checkRestrictionsMethod.body; // TODO: IMPLEMENT ALL OF THESE
    // .line(`throw new Error('Method not implemented.');`);
  }

  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  private _generateApplyTransformations(modelClass: TsClass): void {
    const applyTransformationsMethod = modelClass.method({
      name: "applyTransformations",
      returnType: "void"
    });
    applyTransformationsMethod.parameter({ name: "parsingErrors", type: "ParsingError[]" });
    // eslint-disable-next-line no-unused-expressions
    applyTransformationsMethod.body;
    // .line(`throw new Error('Method not implemented.');`);
  }
}

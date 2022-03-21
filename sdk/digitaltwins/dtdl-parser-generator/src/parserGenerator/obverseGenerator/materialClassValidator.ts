// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable no-unused-vars */
/* eslint-disable sort-imports */
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TsAccess, TsClass, TsInterface, TsScope } from "../../codeGenerator";
import {
  InstanceConditionDigest,
  InstanceValidationDigest,
  MaterialPropertyDigest
} from "../metamodelDigest";
import { NameFormatter } from "../nameFormatter";
import { ParserGeneratorValues } from "../parserGeneratorValues";

export class MaterialClassValidator {
  public static addMembers(
    dtdlVersions: number[],
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    obverseClass: TsClass,
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    obverseInterface: TsInterface,
    kindProperty: string,
    classIsBase: boolean,
    classIsAbstract: boolean,
    instanceValidationDigest: InstanceValidationDigest | undefined,
    propertyDigests: { [x: string]: MaterialPropertyDigest }
  ): void {
    this.generateValidateInstanceStringMethod(
      obverseClass,
      obverseInterface,
      classIsBase,
      classIsAbstract
    );
    this.generateValidateInstanceElementMethod(
      obverseClass,
      kindProperty,
      classIsBase,
      classIsAbstract,
      instanceValidationDigest?.criteriaText
    );
    this.generateValidateInstanceInternalMethod(
      dtdlVersions,
      obverseClass,
      classIsBase,
      classIsAbstract,
      instanceValidationDigest?.criteriaText
    );

    for (const dtdlVersion of dtdlVersions) {
      this.generateValidateInstanceVersionMethod(
        dtdlVersion,
        obverseClass,
        classIsAbstract,
        instanceValidationDigest,
        propertyDigests
      );
    }
  }

  static generateValidateInstanceStringMethod(
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    obverseClass: TsClass,
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    obverseInterface: TsInterface,
    classIsBase: boolean,
    classIsAbstract: boolean
  ): void {
    if (classIsBase) {
      obverseInterface
        .method({
          name: `${ParserGeneratorValues.ValidateInstanceMethodName}`,
          returnType: "boolean"
        })
        .parameter({ name: "instanceText", type: "string" });
    }
    const method = obverseClass
      .method({
        name: `${ParserGeneratorValues.ValidateInstanceMethodName}`,
        returnType: "boolean",
        abstract: false,
        isStatic: false,
        access: TsAccess.Public
      })
      .parameter({ name: "instanceText", type: "string" });
    if (classIsAbstract) {
      // TODO FOR NEW Is this even correct? to throw error from abstract classes ? Will this be okay to do something like this on the other validate methods ?
      method.body.line(`throw new Error('cannot validate anything in an abstract class');`);
    } else {
      method.body.line(`const instanceElt = JSON.parse(instanceText);`);
      method.body.line(
        `return this.${ParserGeneratorValues.ValidateInstanceMethodName}Element(instanceElt);`
      );
    }
  }

  static generateValidateInstanceElementMethod(
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    obverseClass: TsClass,
    kindProperty: string,
    classIsBase: boolean,
    classIsAbstract: boolean,
    criteriaText: unknown
  ): void {
    const method = obverseClass
      .method({
        name: `${ParserGeneratorValues.ValidateInstanceMethodName}Element`,
        returnType: "boolean",
        abstract: false,
        isStatic: false,
        access: TsAccess.Public
      })
      .parameter({ name: "instanceElt", type: "unknown" });
    if (classIsBase) {
      method.body.line(`throw new Error(this.${kindProperty}?.toString());`); // TODO Only normal error is fine?
    } else if (!classIsAbstract && criteriaText !== undefined) {
      method.body.line(
        `return this.${ParserGeneratorValues.ValidateInstanceMethodName}Internal(instanceElt, undefined);`
      );
    } else if (!classIsAbstract) {
      method.body.line("return false");
    } else {
      method.body.line(`throw new Error('cannot validate anything in an abstract class');`);
    }
  }

  static generateValidateInstanceInternalMethod(
    dtdlVersions: number[],
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    obverseClass: TsClass,
    classIsBase: boolean,
    classIsAbstract: boolean,
    criteriaText: unknown
  ): void {
    const method = obverseClass
      .method({
        name: `${ParserGeneratorValues.ValidateInstanceMethodName}Internal`,
        returnType: "boolean",
        abstract: false,
        isStatic: false,
        access: TsAccess.Public
      })
      .parameter({ name: "instanceElt", type: "unknown" })
      .parameter({ name: "instanceName", type: "string|undefined" });
    if (classIsBase) {
      method.body.line(`return false;`);
    } else if (!classIsAbstract && criteriaText !== undefined) {
      if (dtdlVersions !== undefined && dtdlVersions.length > 0) {
        const switchScope = method.body.scope(`switch (this.dtdlVersion)`);
        for (const dtdlVersion of dtdlVersions) {
          const switchCase = switchScope.scope(`case ${dtdlVersion}:`);
          switchCase.line(
            `return this.${ParserGeneratorValues.ValidateInstanceMethodName}V${dtdlVersion}(instanceElt, instanceName);`
          );
        }
      }
      method.body.line(`return false;`);
    } else if (!classIsAbstract) {
      method.body.line("return false");
    } else {
      method.body.line(`throw new Error('cannot validate anything in an abstract class');`);
    }
  }

  static generateValidateInstanceVersionMethod(
    dtdlVersion: number,
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    obverseClass: TsClass,
    classIsAbstract: boolean,
    instanceValidationDigest: InstanceValidationDigest | undefined,
    propertyDigests: { [x: string]: MaterialPropertyDigest }
  ): void {
    const method = obverseClass
      .method({
        name: `${ParserGeneratorValues.ValidateInstanceMethodName}V${dtdlVersion}`,
        returnType: "boolean",
        abstract: false,
        isStatic: false,
        access: TsAccess.Public
      })
      .parameter({ name: "instanceElt", type: "unknown" })
      .parameter({ name: "instanceName", type: "string|undefined" });
    if (!classIsAbstract && instanceValidationDigest?.criteriaText !== undefined) {
      const elementConditionDigest = instanceValidationDigest[dtdlVersion]
        .element as InstanceConditionDigest;
      const childConditionDigest = instanceValidationDigest[dtdlVersion]
        .eachChild as InstanceConditionDigest;

      this.addValidationChecks(
        dtdlVersion,
        obverseClass,
        method.body,
        elementConditionDigest,
        propertyDigests,
        "instanceElt",
        "instanceName",
        "element"
      );
      if (elementConditionDigest.jsonType === "object") {
        const forObjectScope = method.body.for("const [key, value] of Object.entries(instanceElt)");
        this.addValidationChecks(
          dtdlVersion,
          obverseClass,
          forObjectScope,
          childConditionDigest,
          propertyDigests,
          "value",
          "key",
          "child"
        );
      } else if (elementConditionDigest.jsonType === "array") {
        const forArrayScope = method.body.for("const child of instanceElt");
        this.addValidationChecks(
          dtdlVersion,
          obverseClass,
          forArrayScope,
          childConditionDigest,
          propertyDigests,
          "child",
          "undefined",
          "child"
        );
      }
      method.body.line("return true;");
    } else if (!classIsAbstract) {
      // TODO FOR NEW Is this even correct? to throw error from abstract classes ? Will this be okay to do something like this on the other validate methods ?
      method.body.line("return false");
    } else {
      method.body.line(`throw new Error('cannot validate anything in an abstract class');`);
    }
  }

  static addValidationChecks(
    dtdlVersion: number,
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    obverseClass: TsClass,
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    scope: TsScope,
    instanceConditionDigest: InstanceConditionDigest,
    propertyDigests: { [x: string]: MaterialPropertyDigest },
    eltVar: string,
    nameVar: string,
    level: string
  ): void {
    if (instanceConditionDigest.jsonType !== undefined) {
      this.addJsonTypeCheck(scope, instanceConditionDigest.jsonType, eltVar);
    }
    if (instanceConditionDigest.datatype !== undefined) {
      this.addDataTypeCheck(scope, instanceConditionDigest.datatype, eltVar);
    }
    if (instanceConditionDigest.instanceProperty !== undefined) {
      instanceConditionDigest.instanceProperty.forEach((instanceProp) =>
        this.addInstancePropertyCheck(scope, instanceProp, propertyDigests, eltVar, nameVar)
      );
    }
    if (instanceConditionDigest.pattern !== undefined) {
      this.addPatternCheck(
        dtdlVersion,
        obverseClass,
        scope,
        instanceConditionDigest.pattern,
        eltVar,
        `${level}Value`
      );
    }
    if (instanceConditionDigest.namePattern !== undefined) {
      this.addPatternCheck(
        dtdlVersion,
        obverseClass,
        scope,
        instanceConditionDigest.namePattern,
        nameVar,
        `${level}Name`
      );
    }
    if (instanceConditionDigest.hasValue !== undefined) {
      obverseClass.import(`import {LiteralValidator} from '../parser/literalValidator';`);
      scope
        .if(`!LiteralValidator.hasValue(${eltVar}, this.${instanceConditionDigest.hasValue})`)
        .line("return false");
    }
    if (instanceConditionDigest.nameHasValue !== undefined) {
      scope.if(`${nameVar} !== this.${instanceConditionDigest.nameHasValue}`).line("return false");
    }
  }

  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  static addJsonTypeCheck(scope: TsScope, jsonType: string, eltVar: string): void {
    switch (
      jsonType // Json types are same as TS/JS types. So string/number/object can go to default.
    ) {
      // TODO Does boolean needs extra data type check ? That is the only reason the switch case extra.
      case "boolean":
        scope.if(`typeof ${eltVar} !== 'boolean'`).line(`return false`);
        scope // TODO if datatype needs to be added.
          .if(`${eltVar} !== true && ${eltVar} !== false`)
          .line(`return false`);
        break;
      case "array":
        scope.if(`!Array.isArray(${eltVar})`).line(`return false`);
        break;
      default:
        scope.if(`typeof ${eltVar} !== '${jsonType}'`).line(`return false`);
        break;
    }
  }

  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  static addDataTypeCheck(scope: TsScope, datatype: string, eltVar: string): void {
    switch (datatype) {
      case "int":
        scope
          .if(`!Number.isInteger(${eltVar}) || ${eltVar} < -2147483648 || ${eltVar} > 2147483647`)
          .line(`return false;`);
        break;
      case "long":
        scope
          .if(
            `!Number.isInteger(${eltVar}) || (${eltVar} >= -2147483648 && ${eltVar} <= 2147483647)`
          )
          .line(`return false;`);
        break;
      case "float":
        scope // TODO Is <= or  >= needed ? Am not still checking for precisions.
          .if(`Number.isInteger(${eltVar}) || ${eltVar} < -3.4e38 && ${eltVar} > 3.4e38`)
          .line(`return false;`);
        break;
      case "double":
        scope // TODO Is <= or  >= needed ? Am not still checking for precisions.
          .if(`Number.isInteger(${eltVar}) || ${eltVar} < -1.7e308 && ${eltVar} > 1.7e308`)
          .line(`return false;`);
        break;
      case "date":
      case "dateTime":
      case "time":
        scope.if(`isNaN(Date.parse(${eltVar}.toString()))`).line(`return false;`);
        break;
    }
  }

  static addInstancePropertyCheck(
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    scope: TsScope,
    instanceProp: string,
    propertyDigests: { [x: string]: MaterialPropertyDigest },
    eltVar: string,
    nameVar: string
  ): void {
    const instancePropType = propertyDigests[instanceProp]._.class;
    if (!propertyDigests[instanceProp]._.plural) {
      // TODO NEW CODE this should never be undefined.
      if (instancePropType) {
        scope
          .if(
            `!(this.${instanceProp} as ${NameFormatter.formatNameAsImplementation(
              instancePropType
            )})?.${ParserGeneratorValues.ValidateInstanceMethodName}Internal(${eltVar}, ${nameVar})`
          )
          .line(`return false;`);
      }
    } else if (!propertyDigests[instanceProp]._.dictionaryKey) {
      if (instancePropType) {
        // TODO NEW CODE this should never be undefined.
        scope
          .if(
            `!this.${instanceProp}?.some((val) => (val as ${NameFormatter.formatNameAsImplementation(
              instancePropType
            )}).${ParserGeneratorValues.ValidateInstanceMethodName}Internal(${eltVar}, ${nameVar}))`
          )
          .line(`return false;`);
      }
    } else {
      scope
        .if(
          `!this.${instanceProp}?.some((kvp) => kvp.value.${ParserGeneratorValues.ValidateInstanceMethodName}Internal(${eltVar}, ${nameVar}))`
        )
        .line(`return false;`);
    }
  }

  static addPatternCheck(
    dtdlVersion: number,
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    obverseClass: TsClass,
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    scope: TsScope,
    pattern: string,
    eltVar: string,
    prefix: string
  ): void {
    const fieldname = `_${prefix}InstanceRegexPatternV${dtdlVersion}`;
    const uselessEscapeRemoved = pattern.replace("\\-", "-"); // only minus is causing issues for now.
    obverseClass.field({
      name: `_${prefix}InstanceRegexPatternV${dtdlVersion}`,
      access: TsAccess.Private,
      isStatic: false,
      type: "RegExp",
      value: `/${uselessEscapeRemoved}/`
    });
    scope.if(`!this.${fieldname}.test(${eltVar}.toString())`).line(`return false;`);
  }
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TsAccess, TsClass, TsFunction, TsIf, TsScope } from "../../codeGenerator";
import { DescendantControl } from "./descendantControl";
import { MaterialProperty } from "./materialProperty";
import { NameFormatter } from "../nameFormatter";
import { ParserGeneratorValues } from "../parserGeneratorValues";
import { PropertyKind } from "./propertyKind";

export class DescendantControlMaxCount implements DescendantControl {
  private _dtdlVersion: number;
  private _rootClass: string;
  private _propertyNames: string[];
  private _isNarrow: boolean;
  private _maxCount: number;
  private _coreName: string;
  private _methodName: string;
  private _propertiesDesc: string;

  constructor(
    dtdlVersion: number,
    rootClass: string,
    propertyNames: string[],
    isNarrow: boolean,
    maxCount: number
  ) {
    this._dtdlVersion = dtdlVersion;
    this._rootClass = rootClass;
    this._propertyNames = propertyNames;
    this._isNarrow = isNarrow;
    this._maxCount = maxCount;

    const propertyNameDisjunction = this._propertyNames
      .map((p) => NameFormatter.formatNameAsProperty(p))
      .join("Or");
    this._coreName = `${propertyNameDisjunction}${this._isNarrow ? "Narrow" : ""}`;
    this._methodName = `getCountOf${this._coreName}`;
    this._propertiesDesc = this._propertyNames.map((p) => `'${p}'`).join(" or ");
  }

  appliesToType(typeName: string): boolean {
    return this._rootClass === typeName;
  }

  addMembers(
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    obverseClass: TsClass,
    _typeName: string,
    classIsBase: boolean,
    classIsAbstract: boolean,
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    materialProperties: MaterialProperty[]
  ): void {
    if (obverseClass.hasMethod(this._methodName)) {
      return;
    }

    if (classIsBase) {
      const baseClassMethod: TsFunction = obverseClass.method({
        name: this._methodName,
        returnType: "number",
        abstract: true
      });
      baseClassMethod.summary(
        `Get the count of all descendant ${this._propertyNames.join(" or ")} properties.`
      );
      baseClassMethod.parameter({
        name: "parsingErrors",
        type: "ParsingError[]",
        description: `A list of ParsingErrors to which any parsing errors are added.`
      });
    } else if (!classIsAbstract) {
      obverseClass.import(`import {TraversalStatus} from '../parser';`);
      const statusFieldName: string = `_countOf${this._coreName}Status`;
      obverseClass.field({
        name: statusFieldName,
        type: "TraversalStatus",
        access: TsAccess.Protected
      });
      obverseClass.ctor.body.line(`this.${statusFieldName} = TraversalStatus.NotStarted`);
      const valueFieldName: string = `_countOf${this._coreName}Value`;
      obverseClass.field({
        name: valueFieldName,
        type: "number",
        access: TsAccess.Protected,
        value: 0
      });
      obverseClass.ctor.body.line(`this.${valueFieldName} = 0`);

      const concreteClassMethod: TsFunction = obverseClass.method({
        name: this._methodName,
        returnType: "number"
      });
      concreteClassMethod.parameter({ name: "parsingErrors", type: "ParsingError[]" });

      concreteClassMethod.body
        .if(`this.${statusFieldName} === TraversalStatus.Complete`)
        .line(`return this.${valueFieldName};`);

      const ifInProgress: TsIf = concreteClassMethod.body.if(
        `this.${statusFieldName} === TraversalStatus.InProgress`
      );
      ifInProgress
        .line("parsingErrors.push(createParsingError(")
        .line(`'dtmi:dtdl:parsingError:recursiveStructure',`)
        .line("{")
        .line(`cause: \`{primaryId:n} is at the root of a hierarchy that includes itself.\`,`)
        .line(
          `action: \`Change the value of one or more ${this._propertiesDesc} properties in the hierarchy to remeve the recursion.\`,`
        )
        .line(`primaryId: this.${ParserGeneratorValues.IdentifierName},`)
        .line(`}));`);

      ifInProgress.line(`return 0;`);

      concreteClassMethod.body.line(`this.${statusFieldName} = TraversalStatus.InProgress;`);

      for (const materialProperty of materialProperties) {
        const isRelevantProperty: boolean = this._propertyNames.includes(
          materialProperty.propertyName
        );
        const conditionalIncrement: string = isRelevantProperty ? ` + 1` : "";

        if (
          materialProperty.propertyKind === PropertyKind.Object &&
          (isRelevantProperty || !this._isNarrow)
        ) {
          const varName: { ref: string } = { ref: "item" };
          materialProperty
            .iterate(concreteClassMethod.body, varName)
            .line(
              `this.${valueFieldName} += ${varName.ref}.${this._methodName}(parsingErrors)${conditionalIncrement};`
            );
        }
      }

      concreteClassMethod.body.line(`this.${statusFieldName} = TraversalStatus.Complete;`);
      concreteClassMethod.body.line(`return this.${valueFieldName};`);
    } else {
      const abstractClassMethod: TsFunction = obverseClass.method({
        name: this._methodName,
        returnType: "number"
      });
      abstractClassMethod.parameter({ name: "parsingErrors", type: "ParsingError[]" });
      abstractClassMethod.body.line(`throw new Error('Can not execute on an abstract class'); `);
    }
  }

  addRestriction(
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    checkRestrictionsMethodBody: TsScope,
    dtdlVersion: number,
    typeName: string
  ): void {
    if (this._dtdlVersion === dtdlVersion && this._rootClass === typeName) {
      checkRestrictionsMethodBody
        .line(`const num${this._coreName}Values: number = this.${this._methodName}(parsingErrors);`)
        .if(`num${this._coreName}Values > ${this._maxCount}`)
        .multiLine(`parsingErrors.push(createParsingError(`)
        .line(`'dtmi:dtdl:parsingError:excessiveCount',`)
        .line(`{`)
        .line(
          `cause: \`{primaryId:n} is at the root of a hierarchy that contains \${num${this._coreName}Values} ${this._propertiesDesc} properties, but the allowed maximum count is ${this._maxCount}.\`,`
        )
        .line(
          `action: \`Remove one or more ${this._propertiesDesc} property values to reduce the total count.\`,`
        )
        .line(`primaryId: this.${ParserGeneratorValues.IdentifierName},`)
        .line(`}));`);
    }
  }

  addTransformation(
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    _applyTransformationsMethodBody: TsScope,
    _dtdlVersion: number,
    _typeName: string,
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    _materialProperties: MaterialProperty[]
  ): void {
    /* empty */
  }
}

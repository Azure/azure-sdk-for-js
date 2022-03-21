// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TsAccess, TsClass, TsScope } from "../../codeGenerator";
import { DescendantControl } from "./descendantControl";
import { MaterialProperty } from "./materialProperty";
import { NameFormatter } from "../nameFormatter";
import { ParserGeneratorValues } from "../parserGeneratorValues";
import { PropertyKind } from "./propertyKind";

export class DescendantControlExcludeType implements DescendantControl {
  private _dtdlVersion: number;
  private _rootClass: string;
  private _propertyNames: string[];
  private _isNarrow: boolean;
  private _excludeType: string;
  private _kindProperty: string;
  private _excludeKind: string;
  private _coreName: string;
  private _methodName: string;

  constructor(
    dtdlVersion: number,
    rootClass: string,
    propertyNames: string[],
    isNarrow: boolean,
    excludeType: string,
    _kindEnum: string,
    kindProperty: string
  ) {
    this._dtdlVersion = dtdlVersion;
    this._rootClass = rootClass;
    this._propertyNames = propertyNames;
    this._isNarrow = isNarrow;
    this._excludeType = excludeType;
    this._kindProperty = kindProperty;
    this._excludeKind = `'${NameFormatter.formatNameAsKindString(excludeType)}'`;
    const propertyNameDisjunction = this._propertyNames
      .map((p) => NameFormatter.formatNameAsProperty(p))
      .join("Or");
    this._coreName = `${propertyNameDisjunction}${this._excludeType}${
      this._isNarrow ? "Narrow" : ""
    }`;
    this._methodName = `tryGetDescendant${this._coreName}`;
  }

  appliesToType(typeName: string): boolean {
    return this._rootClass === typeName;
  }

  addMembers(
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    obverseClass: TsClass,
    _typeName: string,
    _classIsBase: boolean,
    _classIsAbstract: boolean,
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    materialProperties: MaterialProperty[]
  ): void {
    if (obverseClass.hasMethod(this._methodName)) {
      return;
    }

    const checkedForFieldName = `_checkedForDescendant${this._coreName}`;
    obverseClass.field({ name: checkedForFieldName, type: "boolean", access: TsAccess.Protected });
    obverseClass.ctor.body.line(`this.${checkedForFieldName} = false;`);
    const idOfFieldName = `_idOfDescendant${this._coreName}`;
    obverseClass.field({
      name: idOfFieldName,
      type: `${ParserGeneratorValues.IdentifierType} | undefined`,
      access: TsAccess.Protected
    });
    obverseClass.ctor.body.line(`this.${idOfFieldName} = undefined;`);

    const concreteClassMethod = obverseClass.method({
      name: this._methodName,
      returnType: "boolean"
    });
    concreteClassMethod.parameter({
      name: "elementId",
      type: `Reference<${ParserGeneratorValues.IdentifierType}>`
    });

    concreteClassMethod.body
      .if(`this.${checkedForFieldName}`)
      .line(`elementId.ref = this.${idOfFieldName}`)
      .line(`return this.${idOfFieldName} !== undefined`);

    concreteClassMethod.body.line(`this.${checkedForFieldName} = true;`);
    concreteClassMethod.body.line(``);

    for (const materialProperty of materialProperties) {
      const isRelevantProperty: boolean = this._propertyNames.includes(
        materialProperty.propertyName
      );

      if (
        materialProperty.propertyKind === PropertyKind.Object &&
        (isRelevantProperty || !this._isNarrow)
      ) {
        const varName: { ref: string } = { ref: "item" };
        const iterationScope: TsScope = materialProperty.iterate(concreteClassMethod.body, varName);

        if (isRelevantProperty) {
          iterationScope
            .if(`${varName.ref}.${this._kindProperty} === ${this._excludeKind}`)
            .line(
              `elementId.ref = new InDTMI(${varName.ref}.${ParserGeneratorValues.IdentifierName});`
            )
            .line(`this.${idOfFieldName} = elementId.ref;`)
            .line(`return true;`);
        }

        iterationScope
          .if(`${varName.ref}.${this._methodName}(elementId)`)
          .line(`this.${idOfFieldName} = elementId.ref;`)
          .line("return true;");
      }
    }

    concreteClassMethod.body.line(`elementId.ref = undefined;`);
    concreteClassMethod.body.line(`return false;`);
    // }
  }

  addRestriction(
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    checkRestrictionsMethodBody: TsScope,
    dtdlVersion: number,
    typeName: string
  ): void {
    if (this._dtdlVersion === dtdlVersion && this._rootClass === typeName) {
      const propertiesDesc: string = this._propertyNames.map((p) => `'${p}'`).join(" or ");
      const elementIdName: string = `excluded${this._excludeType}ElementId`;

      // TODO: Validate that this generates the correct type of output, since in C# they use out variables.
      checkRestrictionsMethodBody.line(
        `const ${elementIdName}: Reference<${ParserGeneratorValues.IdentifierType}> = {ref: undefined};`
      );
      checkRestrictionsMethodBody.line(`this.${this._methodName}(${elementIdName})`);
      checkRestrictionsMethodBody
        .if(`${elementIdName}.ref !== undefined`)
        .line("parsingErrors.push(createParsingError(")
        .line(`'dtmi:dtdl:parsingError:excludedType',`)
        .line("{")
        .line(
          `cause: \`{primaryId:n} contains ${this._excludeType}{secondaryId:e}, which is not allowed in ${propertiesDesc} properties under elements of type {typeName}.\`,`
        )
        .line(
          `action: \`Remove the elements of type ${this._excludeType} from ${propertiesDesc} properties under the element of type ${typeName}.\`,`
        )
        .line(`primaryId: this.${ParserGeneratorValues.IdentifierName},`)
        .line(`secondaryId: ${elementIdName}.ref.value,`)
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

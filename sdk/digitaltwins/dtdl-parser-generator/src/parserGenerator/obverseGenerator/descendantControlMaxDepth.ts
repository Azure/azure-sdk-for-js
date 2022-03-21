// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TsClass, TsFunction, TsIf, TsScope } from "../../codeGenerator";
import { DescendantControl } from "./descendantControl";
import { MaterialProperty } from "./materialProperty";
import { NameFormatter } from "../nameFormatter";
import { ParserGeneratorValues } from "../parserGeneratorValues";
import { PropertyKind } from "./propertyKind";

export class DescendantControlMaxDepth implements DescendantControl {
  private _dtdlVersion: number;
  private _rootClass: string;
  private _propertyNames: string[];
  private _isNarrow: boolean;
  private _maxDepth: number;
  private _methodName: string;
  private _propertiesDesc: string;
  private _elementIdName: string;

  constructor(
    dtdlVersion: number,
    rootClass: string,
    propertyNames: string[],
    isNarrow: boolean,
    maxDepth: number
  ) {
    this._dtdlVersion = dtdlVersion;
    this._rootClass = rootClass;
    this._propertyNames = propertyNames;
    this._isNarrow = isNarrow;
    this._maxDepth = maxDepth;

    const propertyNameDisjunction = this._propertyNames
      .map((p) => NameFormatter.formatNameAsProperty(p))
      .join("Or");
    this._methodName = `checkDepthOf${propertyNameDisjunction}${this._isNarrow ? "Narrow" : ""}`;
    this._propertiesDesc = this._propertyNames.map((p) => `'${p}'`).join(" or ");
    this._elementIdName = `tooDeep${propertyNameDisjunction}ElementId`;
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

    const method: TsFunction = obverseClass.method({
      name: this._methodName,
      returnType: "boolean"
    });
    method.summary(
      `Check the nesting depth of all descendant ${this._propertyNames.join(" or ")} properties.`
    );
    method.parameter({
      name: "depth",
      type: "number",
      description: `The depth from the root to this element.`
    });
    method.parameter({
      name: `depthLimit`,
      type: "number",
      description: `The allowed limit on the depth.`
    });
    method.parameter({
      name: "tooDeepElementId",
      type: `Reference<${ParserGeneratorValues.IdentifierType}>`,
      description: `An out parameter for the ID of the first element that exceeds the depth.`
    }); // TODO: This is an out parameter... needs to be adjusted.
    method.parameter({
      name: "parsingErrors",
      type: "ParsingError[]",
      description: "A ParsingError list to which any parsing errors are added."
    });

    for (const materialProperty of materialProperties) {
      if (
        materialProperty.propertyKind === PropertyKind.Object &&
        this._propertyNames.includes(materialProperty.propertyName)
      ) {
        materialProperty
          .checkPresence(method.body)
          .if(`depth === depthLimit`)
          .line(
            `tooDeepElementId.ref = InDTMI.createDtmi(this.${ParserGeneratorValues.IdentifierName});`
          )
          .line(`return false;`);
      }
    }

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
        const iterationScope: TsScope = materialProperty.iterate(method.body, varName);

        const ifTooDeep: TsIf = iterationScope.if(
          `!${varName.ref}.${this._methodName}(depth${conditionalIncrement}, depthLimit, tooDeepElementId, parsingErrors)`
        );

        const ifTooDeepElementIsThis: TsIf = ifTooDeep.if(
          `tooDeepElementId.ref?.value === this.${ParserGeneratorValues.IdentifierName}`
        );

        ifTooDeepElementIsThis
          .line("parsingErrors.push(createParsingError(")
          .line(`'dtmi:dtdl:parsingError:recursiveStructure',`)
          .line("{")
          .line(
            `cause: \`{primaryId:n} is at the root of a ${
              this._isNarrow ? `chain of ${this._propertiesDesc} properties` : `hierarchy`
            } that includes itself.\`,`
          )
          .line(
            `action: \`Change the value of one or more ${this._propertiesDesc} properties in the hierarchy to remeve the recursion.\`,`
          )
          .line(`primaryId: this.${ParserGeneratorValues.IdentifierName},`)
          .line(`}));`);

        ifTooDeepElementIsThis.line(`tooDeepElementId.ref = undefined;`);

        ifTooDeep.line(`return false;`);
      }
    }

    method.body.line(`tooDeepElementId.ref = undefined;`);
    method.body.line(`return true;`);
  }

  addRestriction(
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    checkRestrictionsMethodBody: TsScope,
    dtdlVersion: number,
    typeName: string
  ): void {
    if (this._dtdlVersion === dtdlVersion && this._rootClass === typeName) {
      checkRestrictionsMethodBody.line(
        `const ${this._elementIdName}: Reference<${ParserGeneratorValues.IdentifierType}> = {ref: undefined};`
      );
      checkRestrictionsMethodBody
        .if(
          `!this.${this._methodName}(0, ${this._maxDepth}, ${this._elementIdName}, parsingErrors) && ${this._elementIdName} !== undefined`
        )
        .multiLine(`parsingErrors.push(createParsingError(`)
        .line(`'dtmi:dtdl:parsingError:excessiveDepth',`)
        .line(`{`)
        .line(
          `cause: \`{primaryId:n} is at the root of a ${
            this._isNarrow ? `chain of ` + this._propertiesDesc + ` properties` : `hierarchy`
          } that exceeds ${this._maxDepth} levels -- {secondaryId:n} is at level ${this._maxDepth +
            1}.\`,`
        )
        .line(
          `action: \`Change the value of one or more ${this._propertiesDesc} properties in the hierarchy to reduce the nesting depth.\`,`
        )
        .line(`primaryId: this.${ParserGeneratorValues.IdentifierName},`)
        .line(`secondaryId: ${this._elementIdName}.ref?.value,`)
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

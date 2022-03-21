// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable no-unused-vars */
/* eslint-disable sort-imports */
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TsScope, TsClass } from "../../codeGenerator";
import { ParserGeneratorValues } from "../parserGeneratorValues";
import { PropertyRepresentation } from "./propertyRepresentation";
import { UntypedLiteralProperty } from "./untypedLiteralProperty";

export class SingularUntypedLiteralProperty extends UntypedLiteralProperty {
  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  public iterate(outerScope: TsScope, varName: { ref: string }): TsScope {
    varName.ref = `this.${this.propertyName}`;

    if (this.propertyDigest._.optional) {
      return outerScope.if(`this.${this.propertyName} !== undefined`);
    } else {
      return outerScope;
    }
  }

  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  public checkPresence(outerScope: TsScope): TsScope {
    if (this.propertyDigest._.optional) {
      return outerScope.if(`this.${this.propertyName} !== undefined`);
    } else {
      return outerScope;
    }
  }

  public get propertyRepresentation(): PropertyRepresentation {
    return this.optional ? PropertyRepresentation.NullableItem : PropertyRepresentation.Item;
  }

  public get propertyType(): string {
    return "any";
  }

  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  public generateConstructorCode(_obverseClass: TsClass, _ctorScope: TsScope): void {
    // NOTE for Node : any SINGULAR NON-LITERAL types should not be initialized inside a Constructor.
  }

  public addCaseToParseSwitch(
    dtdlVersion: number,
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    _obverseClass: TsClass,
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    switchScope: TsScope,
    _classIsAugmentable: boolean,
    _classIsPartition: boolean,
    _valueCountVar: string,
    _definedInVar: string
  ): void {
    if (
      Object.prototype.hasOwnProperty.call(this.propertyDigest, dtdlVersion) &&
      this.propertyDigest[dtdlVersion].allowed
    ) {
      // const _maxLenStr = this.propertyDigest[dtdlVersion].maxLength?.toString();
      // const _patternStr = this.propertyDigest[dtdlVersion].pattern
      //   ? `this.${this.propertyDigest}PropertyRegexPatternV${dtdlVersion}`
      //   : undefined;
      // const _defaultLangStr = this.propertyDigest[dtdlVersion].defaultLanguage;
      // // TODO These may be used in the new values parser.
      // const _minInclusiveStr = this.propertyDigest[dtdlVersion].minInclusive?.toString();
      // const _maxInclusiveStr = this.propertyDigest[dtdlVersion].maxInclusive?.toString();

      switchScope
        .line(`case '${this.propertyName}':`)
        .line(`case '${this.propertyNameUris[dtdlVersion]}':`);
      if (!this.plural && !this.optional) {
        switchScope.line(`${this.missingPropertyVariable} = false;`);
      }

      switchScope
        .line("// eslint-disable-next-line no-case-declarations")
        .line(
          `const ${this.propertyName}ValueAndType = ValueParser.parseSingularLiteralToken(this.${ParserGeneratorValues.IdentifierName}, '${this.propertyName}', propValue, parsingErrors);`
        )
        .line(`this.${this.propertyName} = ${this.propertyName}ValueAndType.value`)
        .line(`this.${this.datatypeField} = ${this.propertyName}ValueAndType.typeFragment`)
        .line("continue;");
    }
  }
}

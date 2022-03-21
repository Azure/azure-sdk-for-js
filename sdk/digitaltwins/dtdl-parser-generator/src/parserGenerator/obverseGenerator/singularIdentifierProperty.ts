// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable no-unused-vars */
/* eslint-disable sort-imports */
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TsClass, TsScope } from "../../codeGenerator";
import { ParserGeneratorValues } from "../parserGeneratorValues";
import { IdentifierProperty } from "./identifierProperty";
import { PropertyRepresentation } from "./propertyRepresentation";

export class SingularIdentifierProperty extends IdentifierProperty {
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
  public get propertyType(): string | undefined {
    return "string";
  }
  // public get propertyImplType(): string | undefined {
  //   throw new Error('Method not implemented.');
  // }

  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  public generateConstructorCode(_obverseClass: TsClass, _ctorScope: TsScope): void {
    // NOTE for Node : any SINGULAR IDENTIFIER types are never initialized inside a Constructor.
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
      const maxLenStr = this.propertyDigest[dtdlVersion].maxLength?.toString();
      const patternStr = this.propertyDigest[dtdlVersion].pattern
        ? `this.${this.propertyName}PropertyRegexPatternV${dtdlVersion}`
        : undefined;

      switchScope
        .line(`case '${this.propertyName}':`)
        .line(`case '${this.propertyNameUris[dtdlVersion]}':`);
      if (!this.optional) {
        switchScope.line(`${this.missingPropertyVariable} = false;`);
      }

      switchScope
        .line("// eslint-disable-next-line no-case-declarations")
        .line(
          `const strInDtmiVal = ValueParser.parseSingularIdentifierToken(this.${ParserGeneratorValues.IdentifierName}, '${this.propertyName}', propValue, ${maxLenStr}, ${patternStr}, parsingErrors);`
        )
        // TODO The value returned from the parse method is a simple string. Have to convert to InDTMI
        .line(`this.${this.propertyName} = strInDtmiVal`);
      switchScope.line("continue;");
    }
  }

  public addCaseToTrySetObjectPropertySwitch(
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    switchScope: TsScope,
    valueVar: string,
    _keyVar: string
  ): void {
    switchScope.line(`case '${this.propertyName}':`);
    Object.values(this.propertyNameUris).forEach((strVal) => switchScope.line(`case '${strVal}':`));
    switchScope.line(`this.${this.propertyName} = ${valueVar}.dtmi;`).line("return true");
  }
}

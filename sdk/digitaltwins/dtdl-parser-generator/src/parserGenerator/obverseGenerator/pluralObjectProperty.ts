// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable no-unused-vars */
/* eslint-disable sort-imports */
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TsClass, TsInterface, TsScope } from "../../codeGenerator";
import { ObjectProperty } from "./objectProperty";
import { PropertyRepresentation } from "./propertyRepresentation";
// example is property extends in material class interface
export class PluralObjectProperty extends ObjectProperty {
  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  public iterate(outerScope: TsScope, varName: { ref: string }): TsScope {
    const forScope = outerScope.for(`const ${varName.ref} of this.${this.propertyName} || []`);
    // TODO FOR NEW Change varName
    varName.ref = `(${varName.ref} as ${this.implementationName})`;
    return forScope;
  }

  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  public checkPresence(outerScope: TsScope): TsScope {
    return outerScope.if(
      `this.${this.propertyName} !== undefined && this.${this.propertyName}.length !== 0`
    );
  }

  public get propertyRepresentation(): PropertyRepresentation {
    return PropertyRepresentation.List;
  }

  public get propertyType(): string | undefined {
    if (this.interfaceName !== undefined) {
      return `${this.interfaceName}[]`;
    } else return undefined;
  }

  public get propertyImplType(): string | undefined {
    if (this.implementationName !== undefined) {
      return `${this.implementationName}[]`;
    } else return undefined;
  }

  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  public generateConstructorCode(obverseClass: TsClass, ctorScope: TsScope): void {
    if (obverseClass.name !== this.implementationName) {
      obverseClass.import(`import {${this.implementationName}} from './internal';`);
    }
    obverseClass.import(`import {${this.interfaceName}} from './internal';`);
    ctorScope.line(`this.${this.propertyName} = [];`);
  }

  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  public addImports(obverseInterface: TsInterface): void {
    if (obverseInterface.name !== this.interfaceName) {
      obverseInterface.import(`import {${this.interfaceName}} from './internal';`);
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
    switchScope
      .if(`this.${this.propertyName} !== undefined`)
      .line(`this.${this.propertyName}.push(${valueVar} as ${this.implementationName});`)
      .line("return true");
    switchScope.line("break;");
  }
}

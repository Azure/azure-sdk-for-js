// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { NameFormatter } from "./nameFormatter";
import { TsScope } from "../codeGenerator";

export class SupplementalCotype {
  private _kindValue: string;

  constructor(cotype: string, _kindEnum: string) {
    this._kindValue = `'${NameFormatter.formatNameAsKindString(cotype)}'`;
  }

  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  addCotype(scope: TsScope, infoVariableName: string): void {
    scope.line(`${infoVariableName}.addCotype(${this._kindValue})`);
  }
}

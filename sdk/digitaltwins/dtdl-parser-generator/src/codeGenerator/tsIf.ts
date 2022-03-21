// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TsElse, TsElseIf, TsScope } from "./internal";

export class TsIf extends TsScope {
  private _nestingScope: TsScope;

  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  constructor(text: string, nestingScope: TsScope) {
    super(`if (${text})`);
    this._nestingScope = nestingScope;
  }

  elseIf(text: string): TsElseIf {
    const tsElseIf = new TsElseIf(text, this._nestingScope);

    this._nestingScope.statement(tsElseIf);
    return tsElseIf;
  }

  else(): TsElse {
    const tsElse = new TsElse();
    this._nestingScope.statement(tsElse);
    return tsElse;
  }

  line(text: string): this {
    super.line(text);
    return this;
  }
}

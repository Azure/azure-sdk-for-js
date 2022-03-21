// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TsFinally, TsScope } from "./internal";

export class TsCatch extends TsScope {
  private _nestingScope: TsScope;

  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  constructor(err: string, nestingScope: TsScope) {
    super(` catch (${err})`, true);

    this._nestingScope = nestingScope;
  }

  finally(): TsFinally {
    const tsFinally = new TsFinally();
    this._nestingScope.statement(tsFinally);
    return tsFinally;
  }

  line(text: string): this {
    super.line(text);
    return this;
  }
}

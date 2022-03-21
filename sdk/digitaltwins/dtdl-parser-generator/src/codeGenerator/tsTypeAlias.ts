// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CodeWriter, TsDeclarationType, TsTypeAliasParams } from "./internal";
import { TsDeclaration } from "./tsDeclaration";

export class TsTypeAlias extends TsDeclaration {
  private _typeAlias: string;

  constructor({ name, typeToBeAliased, exports = false }: TsTypeAliasParams) {
    super({ name: name, type: TsDeclarationType.TypeAlias, exports: exports });
    this._typeAlias = typeToBeAliased;
  }

  private get _decoratedName(): string {
    if (this._exports) {
      return `export type ${this.name}`;
    } else {
      return `type ${this.name}`;
    }
  }

  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  generateCode(codeWriter: CodeWriter): void {
    super.generateCode(codeWriter);
    codeWriter.writeLine(`${this._decoratedName} = ${this._typeAlias}`);
  }
}

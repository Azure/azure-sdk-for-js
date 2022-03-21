// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  CodeWriter,
  TsDeclarationParams,
  TsDeclarationType,
  TsImport,
  TsMultiLine,
  TsMultiLineDocString
} from "./internal";

export class TsDeclaration {
  name: string;
  protected _type: TsDeclarationType;
  protected _exports: boolean;
  private _declarationHeader?: TsMultiLine;
  private _importStatements?: TsImport;
  private _docString?: TsMultiLineDocString;
  private _prefixCode?: TsMultiLine;

  constructor({ name, type, exports = false }: TsDeclarationParams) {
    this.name = name;
    this._type = type;
    this._exports = exports;
  }

  get header(): TsMultiLine {
    if (this._declarationHeader === undefined) {
      const tsMultiLine = new TsMultiLine();
      this._declarationHeader = tsMultiLine;
      return tsMultiLine;
    } else {
      return this._declarationHeader;
    }
  }

  get prefixCode(): TsMultiLine {
    if (this._prefixCode === undefined) {
      const tsMultiLine = new TsMultiLine();
      this._prefixCode = tsMultiLine;
      return tsMultiLine;
    } else {
      return this._prefixCode;
    }
  }

  get docString(): TsMultiLineDocString {
    if (this._docString === undefined) {
      const tsMultiLine = new TsMultiLineDocString();
      this._docString = tsMultiLine;
      return tsMultiLine;
    } else {
      return this._docString;
    }
  }

  import(text: string): TsDeclaration {
    if (this._importStatements === undefined) {
      this._importStatements = new TsImport();
    }
    this._importStatements.addTsImport(text);
    return this;
  }

  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  generateCode(codeWriter: CodeWriter): void {
    if (this._declarationHeader !== undefined) {
      this._declarationHeader.generateCode(codeWriter);
    }

    if (this._importStatements !== undefined) {
      this._importStatements.generateCode(codeWriter);
    }

    if (this._prefixCode !== undefined) {
      this._prefixCode.generateCode(codeWriter);
    }

    if (this._docString !== undefined) {
      this._docString.generateCode(codeWriter);
    }
  }
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CodeWriter, TsEnumParams } from "./internal";

export class TsEnum {
  name: string;
  private _exports?: boolean;
  private _members: { name: string; value?: string }[];

  constructor({ name, exports }: TsEnumParams) {
    this.name = name;
    this._exports = exports;

    this._members = [];
  }

  enum(input: { name: string; value?: string }): TsEnum {
    const tsEnumMember = { name: input.name, value: input.value };
    this._members.push(tsEnumMember);
    return this;
  }

  private get _decoratedName(): string {
    const text: string[] = [];
    if (this._exports) {
      text.push("export");
    }
    text.push(`enum ${this.name}`);
    return text.join(" ");
  }

  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  generateCode(codeWriter: CodeWriter): void {
    codeWriter.writeLine(`${this._decoratedName} `);
    codeWriter.openScope();
    this._members.forEach((enumMember) => {
      if (enumMember.value !== undefined) {
        codeWriter.writeLine(`${enumMember.name} = ${enumMember.value},`);
      } else {
        codeWriter.writeLine(`${enumMember.name},`);
      }
    });
    codeWriter.closeScope();
  }
}

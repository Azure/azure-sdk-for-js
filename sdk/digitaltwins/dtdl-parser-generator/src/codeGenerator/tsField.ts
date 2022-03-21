// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CodeWriter, TsAccess, TsFieldParams } from "./internal";

/**
 * A field declaration in Typescript.
 */
export class TsField {
  name: string;
  type: string;
  access?: TsAccess;
  readonly?: boolean;
  isStatic?: boolean;
  value?: string;
  optional?: boolean;
  summary?: string;

  constructor({ name, type, access, readonly, isStatic, summary, value, optional }: TsFieldParams) {
    this.name = name;
    this.type = type;
    this.access = access;
    this.readonly = readonly;
    this.isStatic = isStatic;
    this.summary = summary;
    this.value = value;
    this.optional = optional;
  }

  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  generateCode(codeWriter: CodeWriter): void {
    let prefix = this.access ? `${this.access} ` : ""; // js field
    prefix = prefix.concat(this.isStatic ? `static ` : "");
    prefix = prefix.concat(this.readonly ? `readonly ` : "");
    const postfix = this.value ? ` = ${this.value}` : "";
    const punctuation = this.optional ? "?:" : ":";
    if (this.summary) {
      codeWriter.writeLine(`// ${this.summary}`);
    }
    codeWriter.writeLine(`${prefix}${this.name}${punctuation} ${this.type}${postfix};`);
  }
}

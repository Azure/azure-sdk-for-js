// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CodeWriter, TsParameterParams } from "./internal";

// TODO: Add ts_destructured_parameter.ts for creating parameters that are just
// destructured Objects.
export class TsParameter {
  private _name: string;
  private _type?: string;
  private _description?: string;
  private _initializer?: string;
  private _optional?: boolean;

  constructor({ name, type, description, initializer, optional }: TsParameterParams) {
    this._name = name;
    this._type = type;
    this._description = description;
    this._initializer = initializer;
    this._optional = optional;
  }

  toString(): string {
    const suffix = this._initializer ? ` = ${this._initializer}` : "";
    if (this._type !== undefined && this._type !== "") {
      return `${this._name}${this._chooseOptionalPunctuator()} ${this._type}${suffix}`;
    } else {
      return `${this._name}${suffix}`;
    }
  }

  get name(): string {
    return this._name;
  }

  get type(): string | undefined {
    return this._type;
  }

  get description(): string | undefined {
    return this._description;
  }

  private _chooseOptionalPunctuator(): "?:" | ":" {
    if (this._optional) {
      return "?:";
    }
    return ":";
  }

  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  generateCode(codeWriter: CodeWriter): void {
    const suffix = this._initializer ? ` = ${this._initializer}` : "";
    const punctuation = this._chooseOptionalPunctuator();
    codeWriter.writeLine(`${this._name}${punctuation} ${this._type}${suffix}`);
  }
}

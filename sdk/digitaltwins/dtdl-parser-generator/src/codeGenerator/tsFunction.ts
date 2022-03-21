// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  CodeWriter,
  TsAccess,
  TsFunctionParams,
  TsFunctionType,
  TsImport,
  TsMultiLineDocString,
  TsParameter,
  TsParameterParams,
  TsScope,
  TsStatement
} from "./internal";

// Functions are the fundamental building block of any application in JavaScript.
// They’re how you build up layers of abstraction, mimicking classes, information hiding, and modules.
// In TypeScript, while there are classes, namespaces, and modules, functions still play the key role in describing how to do things.
// TypeScript also adds some new capabilities to the standard JavaScript functions to make them easier to work with.

// this defines a TsFunction, which is different than a TsFunction since a TsFunction is defined on a class.
export class TsFunction implements TsStatement {
  private _name: string;
  private _returnType?: string;
  private _parameters: TsParameter[];
  private _isAbstract?: boolean;
  private _access?: TsAccess;
  private _body?: TsScope;
  private _functionType?: TsFunctionType;
  private _exports?: boolean;
  private _static?: boolean;
  private _summaryLines?: TsMultiLineDocString;
  private _importStatements?: TsImport;

  constructor({
    name,
    returnType,
    functionType,
    abstract,
    access,
    exports,
    isStatic
  }: TsFunctionParams) {
    this._name = name;
    this._returnType = returnType;
    this._functionType = functionType;
    this._isAbstract = abstract;
    this._access = access;
    this._exports = exports;
    this._static = isStatic;

    this._parameters = [];
  }

  get name(): string {
    return this._name;
  }

  get funcName(): string {
    return this._name;
  }

  get returnType(): string | undefined {
    return this._returnType;
  }

  get functionType(): TsFunctionType | undefined {
    return this._functionType;
  }

  get isAbstract(): boolean | undefined {
    return this._isAbstract;
  }

  get access(): TsAccess | undefined {
    return this._access;
  }

  get exports(): boolean | undefined {
    return this._exports;
  }

  get parameters(): TsParameter[] {
    return this._parameters;
  }

  get summaryLines(): TsMultiLineDocString | undefined {
    return this._summaryLines;
  }

  get body(): TsScope {
    if (this._body === undefined) {
      const tsScope = new TsScope();
      this._body = tsScope;
      return tsScope;
    }
    return this._body;
  }

  get isStatic(): boolean | undefined {
    return this._static;
  }

  import(text: string): this {
    if (this._importStatements === undefined) {
      this._importStatements = new TsImport();
    }
    this._importStatements.addTsImport(text);
    return this;
  }

  summary(text: string): this {
    if (this._summaryLines === undefined) {
      this._summaryLines = new TsMultiLineDocString();
    }
    this._summaryLines.line(text);
    return this;
  }

  parameter({ name, type, description, initializer, optional }: TsParameterParams): TsFunction {
    const tsParameter = new TsParameter({ name, type, initializer, description, optional });
    this._parameters.push(tsParameter);
    return this;
  }

  private get _decoratedName(): string {
    const text: string[] = [];
    if (this._exports) {
      text.push("export");
    }
    if (this._access !== undefined) {
      text.push(this._access);
    }
    if (this._static !== undefined && this._static === true) {
      text.push("static");
    }
    if (this._isAbstract) {
      text.push("abstract");
    }
    if (this._functionType !== undefined) {
      switch (this._functionType) {
        case TsFunctionType.Function:
          text.push("function");
          break;
        case TsFunctionType.Method:
          break;
        case TsFunctionType.Getter:
          text.push("get");
          break;
        case TsFunctionType.Setter:
          text.push("set");
          break;
      }
    } else {
      text.push(TsFunctionType.Function);
    }

    text.push(this._name);
    return text.join(" ");
  }

  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  generateCode(codeWriter: CodeWriter): void {
    if (this._importStatements !== undefined) {
      this._importStatements.generateCode(codeWriter);
    }
    const betweenTheParentheses = this._parameters.map((x) => x.toString()).join(", ");
    const postfix: string = this._returnType ? `: ${this._returnType}` : "";
    const declarationLine = `${this._decoratedName}(${betweenTheParentheses})${postfix} `;
    if (this._summaryLines) {
      this._summaryLines.generateCode(codeWriter);
    }
    if (this._body) {
      codeWriter.writeLine(declarationLine, true);
      this._body.generateCode(codeWriter);
    } else {
      codeWriter.writeLine(`${declarationLine};`);
    }
  }
}

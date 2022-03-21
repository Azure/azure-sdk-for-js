// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  CodeWriter,
  TsDeclaration,
  TsDeclarationType,
  TsField,
  TsFieldParams,
  TsFunction,
  TsFunctionType,
  TsInterfaceParams
} from "./internal";
import { TsInline } from "./tsInline";

export class TsInterface extends TsDeclaration {
  private _thingToExtend?: string;
  private _fields: TsField[];
  private _inlines: TsInline[];
  private _methods: TsFunction[];

  constructor({ name, exports, thingToExtend }: TsInterfaceParams) {
    super({ name: name, type: TsDeclarationType.Interface, exports: exports });
    this._thingToExtend = thingToExtend;

    this._fields = [];
    this._inlines = [];
    this._methods = [];
  }

  get extends(): string | undefined {
    return this._thingToExtend;
  }

  field(input: TsFieldParams): TsInterface {
    const tsField = new TsField(input);
    this._fields.push(tsField);
    return this;
  }

  method({ name, returnType }: { name: string; returnType?: string }): TsFunction {
    const tsMethod = new TsFunction({
      name: name,
      returnType: returnType,
      functionType: TsFunctionType.Method
    });
    this._methods.push(tsMethod);
    return tsMethod;
  }

  inline(filepath: string, identifier: string): void {
    this._inlines.push(new TsInline(filepath, identifier));
  }

  private get _decoratedName(): string {
    const text: string[] = [];
    if (this._exports) {
      text.push("export");
    }

    text.push(`interface ${this.name}`);

    if (this._thingToExtend !== undefined && this._thingToExtend !== "") {
      text.push(`extends ${this._thingToExtend}`);
    }
    return text.join(" ");
  }

  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  generateCode(codeWriter: CodeWriter): void {
    super.generateCode(codeWriter);
    codeWriter.writeLine(`${this._decoratedName} `);
    codeWriter.openScope();
    this._fields.forEach((tsField) => {
      tsField.generateCode(codeWriter);
    });

    if (this._methods.length !== 0) {
      this._methods.forEach((tsMethod) => {
        tsMethod.generateCode(codeWriter);
        codeWriter.break();
      });
    }

    if (this._inlines.length !== 0) {
      this._inlines.forEach((inlineBlock) => {
        inlineBlock.generateCode(codeWriter);
        codeWriter.break();
      });
    }
    codeWriter.closeScope();
  }
}

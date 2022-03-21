// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  CodeWriter,
  TsAccess,
  TsClassParams,
  TsConstructor,
  TsDeclaration,
  TsDeclarationType,
  TsField,
  TsFieldParams,
  TsFunction,
  TsFunctionType,
  TsInheritanceType,
  TsInline,
  TsMultiLine
} from "./internal";

/**
 * Implements Class Code Generation
 */
export class TsClass extends TsDeclaration {
  private _isAbstract?: boolean;
  private _constructor?: TsConstructor;
  private _staticConstructor?: TsConstructor;
  inheritance?: TsInheritanceType[];
  fields: TsField[];
  private _methods: TsFunction[];
  private _getters: TsFunction[];
  private _setters: TsFunction[];
  private _inlines: TsInline[];
  private _suffixCode?: TsMultiLine;

  constructor({ name, exports, abstract, inheritance }: TsClassParams) {
    super({ name, type: TsDeclarationType.Class, exports: exports });
    this._isAbstract = abstract;
    this.inheritance = inheritance;

    this.fields = [];
    this._methods = [];
    this._getters = [];
    this._setters = [];
    this._inlines = [];
  }

  get ctor(): TsConstructor {
    if (this._constructor === undefined) {
      const tsConstructor = new TsConstructor(false);
      this._constructor = tsConstructor;
    }
    return this._constructor;
  }

  get staticCtor(): TsConstructor {
    if (this._staticConstructor === undefined) {
      const tsConstructor = new TsConstructor(true);
      this._staticConstructor = tsConstructor;
    }
    return this._staticConstructor;
  }

  field(input: TsFieldParams): TsClass {
    const tsField = new TsField(input);
    this.fields.push(tsField);
    return this;
  }

  method({
    name,
    returnType,
    abstract,
    access,
    isStatic
  }: {
    name: string;
    returnType?: string;
    abstract?: boolean;
    access?: TsAccess;
    isStatic?: boolean;
  }): TsFunction {
    const tsMethod = new TsFunction({
      name: name,
      returnType: returnType,
      functionType: TsFunctionType.Method,
      abstract: abstract,
      isStatic: isStatic,
      access: access
    });
    if (!abstract) {
      // eslint-disable-next-line no-unused-expressions
      tsMethod.body;
    }
    this._methods.push(tsMethod);
    return tsMethod;
  }

  hasMethod(methodName: string): boolean {
    return this._methods.some((m) => m.name === methodName);
  }

  hasField(fieldName: string): boolean {
    return this.fields.some((f) => f.name === fieldName);
  }

  getter({
    name,
    returnType,
    access
  }: {
    name: string;
    returnType?: string;
    access?: TsAccess;
  }): TsFunction {
    const tsGetter = new TsFunction({
      name: name,
      returnType: returnType,
      functionType: TsFunctionType.Getter,
      access: access
    });
    this._getters.push(tsGetter);
    return tsGetter;
  }

  setter({
    name,
    returnType,
    access
  }: {
    name: string;
    returnType?: string;
    access?: TsAccess;
  }): TsFunction {
    const tsSetter = new TsFunction({
      name: name,
      returnType: returnType,
      functionType: TsFunctionType.Setter,
      access: access
    });
    this._setters.push(tsSetter);
    return tsSetter;
  }

  inline(filepath: string, identifier: string): void {
    this._inlines.push(new TsInline(filepath, identifier));
  }

  get suffixCode(): TsMultiLine {
    if (this._suffixCode === undefined) {
      this._suffixCode = new TsMultiLine();
    }
    return this._suffixCode;
  }

  private get _decoratedName(): string {
    const text: string[] = [];
    if (this._exports) {
      text.push("export");
    }
    if (this._isAbstract) {
      text.push("abstract");
    }

    text.push(this._type);
    text.push(this.name);

    if (this.inheritance !== undefined) {
      this.inheritance.forEach((inheritance) => {
        if (inheritance.type === TsDeclarationType.Class) {
          if (Array.isArray(inheritance.name)) {
            throw new Error("Multiple inheritance is only for interfaces in Typescript");
          } else {
            const inheritanceStatement = `extends ${inheritance.name}`;
            text.push(inheritanceStatement);
          }
        }
        if (inheritance.type === TsDeclarationType.Interface) {
          if (Array.isArray(inheritance.name)) {
            const inheritanceStatement = `implements ${inheritance.name.join(", ")}`;
            text.push(inheritanceStatement);
          } else {
            const inheritanceStatement = `implements ${inheritance.name}`;
            text.push(inheritanceStatement);
          }
        }
      });
    }
    return text.join(" ");
  }

  get tsConstructor(): TsConstructor | undefined {
    return this._constructor;
  }

  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  generateCode(codeWriter: CodeWriter): void {
    super.generateCode(codeWriter);

    codeWriter.writeLine(`${this._decoratedName} `, true);
    codeWriter.openScope();
    codeWriter.break();

    if (this.fields.length !== 0) {
      this.fields.forEach((field) => {
        field.generateCode(codeWriter);
      });
      codeWriter.break();
    }

    if (this._constructor !== undefined) {
      this._constructor.generateCode(codeWriter);
      codeWriter.break();
    }

    if (this._staticConstructor !== undefined) {
      this._staticConstructor.generateCode(codeWriter);
      codeWriter.break();
    }

    if (this._getters.length !== 0) {
      this._getters.forEach((tsGetter) => {
        tsGetter.generateCode(codeWriter);
        codeWriter.break();
      });
    }

    if (this._setters.length !== 0) {
      this._setters.forEach((tsSetter) => {
        tsSetter.generateCode(codeWriter);
        codeWriter.break();
      });
    }

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

    if (this._staticConstructor !== undefined) {
      codeWriter.writeLine(`${this.name}.initialize();`);
    }

    if (this._suffixCode !== undefined) {
      this._suffixCode.generateCode(codeWriter);
    }
  }
}

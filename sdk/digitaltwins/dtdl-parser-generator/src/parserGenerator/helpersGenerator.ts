// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/* eslint-disable sort-imports */

import { TsClass, TsLibrary } from "../codeGenerator";
import { NameFormatter } from "./nameFormatter";
import { ParserGeneratorValues } from "./parserGeneratorValues";
import { TypeGenerator } from "./typeGenerator";

export class HelpersGenerator implements TypeGenerator {
  private readonly _baseClassName: string;

  constructor(baseName: string) {
    this._baseClassName = NameFormatter.formatNameAsInterface(baseName);
  }

  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  generateType(parserLibrary: TsLibrary): void {
    this.generateCode(parserLibrary);
  }

  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  generateCode(parserLibrary: TsLibrary): void {
    const helpersClass = parserLibrary.class({ name: "Helpers", exports: true });
    helpersClass.docString.line("A static class that holds various helper functions.");
    helpersClass.import(`import {${this._baseClassName}} from './internal';`);
    helpersClass.import(`import {LanguageStringType} from '../parser';`);
    this._generateAreListsIdEqualMethod(helpersClass);
    this._generateAreListsIdOrLiteralEqualMethod(helpersClass);
    this._generateAreDictionariesIdEqualMethod(helpersClass);
    this._generateAreDictionariesIdOrLiteralEqualMethod(helpersClass);

    helpersClass.inline("./src/parserPartial/helpers.ts", "methods");
  }

  private _generateAreListsIdEqualMethod(helpersClass: TsClass): void {
    // Checks the equality of two lists by comparing their identifier values.
    const method = helpersClass.method({
      name: "areListsIdEqual",
      returnType: "boolean",
      isStatic: true
    });
    method
      .parameter({ name: "list1", type: `${this._baseClassName}[]` })
      .parameter({ name: "list2", type: `${this._baseClassName}[]` });

    method.body.if("list1.length !== list2.length").line("return false;");
    method.body
      .for("let i=0; i<list1.length; i++")
      .if(
        `list1[i].${ParserGeneratorValues.IdentifierName} !== list2[i].${ParserGeneratorValues.IdentifierName}`
      )
      .line("return false;");

    method.body.line("return true;");
  }

  private _generateAreListsIdOrLiteralEqualMethod(helpersClass: TsClass): void {
    const method = helpersClass.method({
      name: "areListsIdOrLiteralEqual",
      returnType: "boolean",
      isStatic: true
    });
    method
      .parameter({ name: "list1", type: `${this._baseClassName}[]` })
      .parameter({ name: "list2", type: `${this._baseClassName}[]` });

    method.body.if("list1.length !== list2.length").line("return false;");

    const ifNoTUndefined = method.body
      .for("let i=0; i<list1.length; i++")
      .if(
        `list1[i].${ParserGeneratorValues.IdentifierName} !== undefined && list2[i].${ParserGeneratorValues.IdentifierName} !== undefined`
      );
    ifNoTUndefined
      .if(
        `list1[i].${ParserGeneratorValues.IdentifierName} !== list2[i].${ParserGeneratorValues.IdentifierName}`
      )
      .line("return false;");
    ifNoTUndefined
      .else()
      .line("const string1 = JSON.stringify(list1[i]);")
      .line("const string2 = JSON.stringify(list2[i]);")
      .if("string1 !== string2")
      .line("return false;");

    method.body.line("return true;");
  }

  private _generateAreDictionariesIdEqualMethod(helpersClass: TsClass): void {
    const method = helpersClass.method({
      name: "areDictionariesIdEqual",
      returnType: "boolean",
      isStatic: true
    });
    method
      .parameter({ name: "dict1", type: `{[name:string]: ${this._baseClassName}}` })
      .parameter({ name: "dict2", type: `{[name:string]: ${this._baseClassName}}` });

    method.body.if("Object.keys(dict1).length !== Object.keys(dict2).length").line("return false;");
    method.body.line("const dict1Keys = Object.keys(dict1)");

    method.body
      .for("const [key, value] of Object.entries(dict1)")
      .if(
        `dict2[key] === undefined || dict2[key].${ParserGeneratorValues.IdentifierName} !== value.${ParserGeneratorValues.IdentifierName}`
      )
      .line("return false;");

    method.body.line("return true;");
  }

  private _generateAreDictionariesIdOrLiteralEqualMethod(helpersClass: TsClass): void {
    const method = helpersClass.method({
      name: "areDictionariesIdOrLiteralEqual",
      returnType: "boolean",
      isStatic: true
    });
    method
      .parameter({ name: "dict1", type: `{[name:string]: any}` })
      .parameter({ name: "dict2", type: `{[name:string]: any}` });

    method.body.if("Object.keys(dict1).length !== Object.keys(dict2).length").line("return false;");

    method.body
      .for("const [key, value] of Object.entries(dict1)")
      .line("const val2 = dict2[key]")
      .if("!val2")
      .line("return false;")
      .elseIf(
        `!value.${ParserGeneratorValues.IdentifierName} || !val2.${ParserGeneratorValues.IdentifierName} || value.${ParserGeneratorValues.IdentifierName} !== val2.${ParserGeneratorValues.IdentifierName} || value !== val2`
      )
      .line("return false;");

    method.body.line("return true;");
  }
}

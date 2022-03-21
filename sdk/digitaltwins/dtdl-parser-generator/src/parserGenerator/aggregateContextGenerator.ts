// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TsAccess, TsClass, TsLibrary, TsScope } from "../codeGenerator";
import { ParserGeneratorValues } from "./parserGeneratorValues";
import { TypeGenerator } from "./typeGenerator";

export class AggregateContextGenerator implements TypeGenerator {
  private readonly _contexts: { [x: string]: any };
  private readonly _dtdlVersionsAllowingLocalTerms: number[];
  private readonly _affiliateContextsImplicitDtdlVersions: { [x: string]: number };

  constructor(
    contexts: { [x: string]: any },
    dtdlVersionAllowingLocalTerms: number[],
    affiliateContextsImplicitDtdlVersions: { [x: string]: number }
  ) {
    this._contexts = contexts;
    this._dtdlVersionsAllowingLocalTerms = dtdlVersionAllowingLocalTerms;
    this._affiliateContextsImplicitDtdlVersions = affiliateContextsImplicitDtdlVersions;
  }

  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  generateType(parserLibrary: TsLibrary): void {
    this.generateCode(parserLibrary);
  }

  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  generateCode(parserLibrary: TsLibrary): void {
    const contextClass = parserLibrary.class({ name: "AggregateContext", exports: true });
    contextClass.import(
      `import {ContextHistory, InDTMI, ParsingError, createParsingError, ParsingException, VersionedContext} from '../parser';`
    );
    contextClass.import(`import {IdValidator} from './internal'`);
    contextClass.header.line("/* eslint-disable camelcase */");
    contextClass.docString.line(
      "Class for parsing and storing information from JSON-LD context blocks."
    );
    contextClass.prefixCode
      .line(`type TermDict = {[term: string]: InDTMI};`)
      .line(`type PrefixDict = {[prefix: string]: string};`);
    this._generateFields(contextClass);
    this._generateStaticConstructor(contextClass);
    this._generateInlineMethods(contextClass);
  }

  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  private _generateFields(contextClass: TsClass): void {
    contextClass
      .field({
        name: "_dtdlVersionsAllowingLocalTerms",
        type: "number[]",
        access: TsAccess.Private,
        isStatic: true,
        value: "[0]"
      })
      .field({
        name: "_affiliateContextsImplicitDtdlVersions",
        type: `{[x:string]: number}`,
        isStatic: true,
        value: "{}"
      });
    contextClass.inline("./src/parserPartial/aggregateContext.ts", "fields");
  }

  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  private _generateInlineMethods(contextClass: TsClass): void {
    contextClass.inline("./src/parserPartial/aggregateContext.ts", "methods");
  }

  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  private _generateStaticConstructor(contextClass: TsClass): void {
    for (const [key, value] of Object.entries(this._affiliateContextsImplicitDtdlVersions)) {
      contextClass.staticCtor.body.line(
        `this._affiliateContextsImplicitDtdlVersions['${key}'] = ${value};`
      );
    }

    contextClass.staticCtor.body.line("");

    contextClass.staticCtor.body
      .line(`this._dtdlContextHistory = AggregateContext._getDtdlContextHistory();`)
      .line("AggregateContext._affiliateContextHistories = {};");

    const dtdlContextMethod = contextClass.method({
      name: "_getDtdlContextHistory",
      returnType: `ContextHistory`,
      access: TsAccess.Private,
      isStatic: true
    });
    dtdlContextMethod.body.line(`const versionedContexts: VersionedContext[] = [];`);

    let affiliateCount: number = 0;
    const affiliateIndices: { [x: string]: number } = {};
    const affiliateContextMethods: { [x: number]: any } = {};
    for (const [contextSpecifier, termDefinitions] of Object.entries(this._contexts)) {
      if (contextSpecifier.startsWith(ParserGeneratorValues.DtdlContextPrefix)) {
        this._addContextVersion(dtdlContextMethod.body, contextSpecifier, termDefinitions);
      } else {
        const affiliateName = contextSpecifier.substring(0, contextSpecifier.indexOf(";"));
        let affiliateIndex: number = affiliateIndices[affiliateName];
        if (affiliateIndex === undefined) {
          affiliateIndex = affiliateCount++;
          affiliateIndices[affiliateName] = affiliateIndex;

          const affiliateContextMethod = contextClass.method({
            name: `_getAffiliate${affiliateIndex}ContextHistory`,
            returnType: `ContextHistory`,
            access: TsAccess.Private,
            isStatic: true
          });
          affiliateContextMethod.body.line(`const versionedContexts: VersionedContext[] = [];`);
          affiliateContextMethods[affiliateIndex] = affiliateContextMethod;
        }

        this._addContextVersion(
          affiliateContextMethods[affiliateIndex].body,
          contextSpecifier,
          termDefinitions
        );
      }
    }

    dtdlContextMethod.body.line(`return new ContextHistory(versionedContexts);`);

    for (const value of Object.values(affiliateContextMethods)) {
      value.body.line(`return new ContextHistory(versionedContexts);`);
    }

    for (const [key, value] of Object.entries(affiliateIndices)) {
      contextClass.staticCtor.body.line(
        `AggregateContext._affiliateContextHistories['${key}'] = AggregateContext._getAffiliate${value}ContextHistory();`
      );
    }
  }

  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  private _addContextVersion(
    contextMethodBody: TsScope,
    contextSpecifier: string,
    termDefinitions: { [x: string]: string }
  ): void {
    const versionString = contextSpecifier.substring(contextSpecifier.indexOf(";") + 1);
    const dotIx = versionString.indexOf(".");
    const majorVersion = Number.parseInt(versionString);
    const minorVersion = dotIx < 0 ? 0 : Number.parseInt(versionString.substring(dotIx + 1));

    const contextVar = `context${majorVersion}_${minorVersion}`;

    contextMethodBody.line(
      `const ${contextVar} = new VersionedContext(${majorVersion}, ${minorVersion});`
    );

    for (const [key, value] of Object.entries(termDefinitions)) {
      contextMethodBody.line(
        `${contextVar}.addDefinition('${key}', new ${ParserGeneratorValues.IdentifierType}('${value}'));`
      );
    }

    contextMethodBody.line(`versionedContexts.push(${contextVar});`);
  }
}

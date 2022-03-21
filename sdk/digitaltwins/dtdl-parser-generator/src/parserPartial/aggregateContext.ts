// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable sort-imports */
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ParsingError, createParsingError } from "../parser";
import {
  ContextHistory,
  IdValidator,
  InDTMI,
  ParsingException,
  VersionedContext
} from "../parser/internal";

type TermDict = { [term: string]: InDTMI };
type PrefixDict = { [prefix: string]: string };

export class AggregateContext {
  private static _dtdlVersionsAllowingLocalTerms: any;

  // codegen-outline-begin fields
  private static readonly _contextKeyword: string = "@context";
  private static readonly _dtdlContextPrefix: string = "dtmi:dtdl:context;";
  private static _termRegex: RegExp = /^[A-Za-z0-9\\-\\._~!\\$&'\\(\\)\\*\\+,;=][@A-Za-z0-9\\-\\._~!\\$&'\\(\\)\\*\\+,;=]*$/;

  private static _dtdlContextHistory: ContextHistory;
  private static _affiliateContextHistories: { [affiliateName: string]: ContextHistory };

  private readonly _rejectUndefinedExtensions: boolean;
  private readonly _rejectNonDtmiContexts: boolean;
  private readonly _maxDtdlVersion?: number;

  private _activeDtdlContext?: VersionedContext;
  private _activeAffiliateContexts: { [affiliateName: string]: VersionedContext };

  private _localTermDefinitions: TermDict;
  private _localPrefixDefinitions: PrefixDict;
  // codegen-outline-end
  static _affiliateContextsImplicitDtdlVersions: any;

  // codegen-outline-begin methods
  constructor(
    rejectUndefinedExtensions: boolean,
    rejectNonDtmiContexts: boolean,
    maxDtdlVersion?: number
  ) {
    this._rejectUndefinedExtensions = rejectUndefinedExtensions;
    this._rejectNonDtmiContexts = rejectNonDtmiContexts;
    this._maxDtdlVersion = maxDtdlVersion;
    this._activeAffiliateContexts = {};
    this._localTermDefinitions = {};
    this._localPrefixDefinitions = {};
  }

  get dtdlVersion(): number {
    return this._activeDtdlContext === undefined ? 0 : this._activeDtdlContext.majorVersion;
  }

  public static getTermOrUri(uriString: string): string {
    let term: string | undefined;

    term = AggregateContext._dtdlContextHistory.getTerm(uriString);
    if (term !== undefined) {
      return term;
    }

    for (const affiliateName in AggregateContext._affiliateContextHistories) {
      // eslint-disable-line guard-for-in
      term = AggregateContext._affiliateContextHistories[affiliateName].getTerm(uriString);
      if (term !== undefined) {
        return term;
      }
    }

    return uriString;
  }

  public static isIdentifierInContext(uriString: string): boolean {
    if (AggregateContext._dtdlContextHistory.isIdentifierInContext(uriString)) {
      return true;
    }

    for (const affiliateName in AggregateContext._affiliateContextHistories) {
      if (
        AggregateContext._affiliateContextHistories[affiliateName].isIdentifierInContext(uriString)
      ) {
        return true;
      }
    }

    return false;
  }

  public getChildContext(
    obj: { [index: string]: any },
    parsingErrors: ParsingError[]
  ): AggregateContext {
    if (!Object.prototype.hasOwnProperty.call(obj, AggregateContext._contextKeyword)) {
      if (this._activeDtdlContext === undefined) {
        parsingErrors.push(
          createParsingError("dtmi:dtdl:parsingError:missingContext", {
            cause: `No @context specifier in top-level JSON object.`,
            action: `Add a '@context' property whose value is a valid DTDL context specifier, such as 'dtmi:dtdl:context;2'.`
          })
        );
        throw new ParsingException(parsingErrors);
      }

      return this;
    }

    const contextToken = obj[AggregateContext._contextKeyword];

    if (Array.isArray(contextToken)) {
      return this._getChildContextFromContextArray(contextToken, parsingErrors);
    } else if (typeof contextToken === "string" || typeof contextToken === "object") {
      return this._getChildContextFromContextArray([contextToken], parsingErrors);
    } else {
      parsingErrors.push(
        createParsingError("dtmi:dtdl:parsingError:invalidContext", {
          cause: `Model contains @context value that is not a JSON string, object, or array of strings and objects.`,
          action: `Remove all @context values other than JSON strings, objects, and arrays of strings and objects.`
        })
      );
      throw new ParsingException(parsingErrors);
    }
  }

  public createDtmi(uriOrTerm: string): InDTMI | undefined {
    let dtmi: InDTMI | undefined;

    if (this._activeDtdlContext === undefined) {
      return undefined;
    }

    if (uriOrTerm.startsWith("dtmi:")) {
      if (IdValidator.isIdReferenceValid(uriOrTerm, this._activeDtdlContext.majorVersion)) {
        return new InDTMI(uriOrTerm);
      } else {
        return undefined;
      }
    }

    dtmi = this._activeDtdlContext.getDtmi(uriOrTerm);
    if (dtmi !== undefined) {
      return dtmi;
    }

    if (Object.prototype.hasOwnProperty.call(this._localTermDefinitions, uriOrTerm)) {
      return this._localTermDefinitions[uriOrTerm];
    }

    const colonPos = uriOrTerm.indexOf(":");
    if (colonPos >= 0) {
      const prefix = uriOrTerm.substring(0, colonPos);
      if (!Object.prototype.hasOwnProperty.call(this._localPrefixDefinitions, prefix)) {
        return undefined;
      }

      const conjunction = `${this._localPrefixDefinitions[prefix]}${uriOrTerm.substring(
        colonPos + 1
      )}`;
      if (IdValidator.isIdReferenceValid(conjunction, this._activeDtdlContext.majorVersion)) {
        return new InDTMI(conjunction);
      } else {
        return undefined;
      }
    }

    for (const affiliateName in this._activeAffiliateContexts) {
      // eslint-disable-line guard-for-in
      dtmi = this._activeAffiliateContexts[affiliateName].getDtmi(uriOrTerm);
      if (dtmi !== undefined) {
        return dtmi;
      }
    }

    return undefined;
  }

  private _getChildContextFromContextArray(
    contextArray: any[],
    parsingErrors: ParsingError[]
  ): AggregateContext {
    if (contextArray.length === 0) {
      if (this._activeDtdlContext === undefined) {
        parsingErrors.push(
          createParsingError("dtmi:dtdl:parsingError:emptyContext", {
            cause: `Empty @context specifier in top-level JSON object.`,
            action: `To the top-level '@context' property, add a string whose value is a valid DTDL context specifier, such as 'dtmi:dtdl:context;2'.`
          })
        );
        throw new ParsingException(parsingErrors);
      }

      return this;
    }

    let childDtdlContext = this._activeDtdlContext;
    let startIndex = 0;

    const prefaceAffiliateContexts: { [affiliateName: string]: VersionedContext } = {};
    while (
      startIndex < contextArray.length &&
      typeof contextArray[startIndex] === "string" &&
      Object.prototype.hasOwnProperty.call(
        AggregateContext._affiliateContextsImplicitDtdlVersions,
        contextArray[startIndex]
      )
    ) {
      const affiliate = this._getAffiliateContextFromContextToken(
        contextArray[startIndex],
        AggregateContext._affiliateContextsImplicitDtdlVersions[contextArray[startIndex]],
        parsingErrors
      );
      if (affiliate !== undefined) {
        prefaceAffiliateContexts[affiliate.name] = affiliate.context;
      }

      ++startIndex;
    }

    while (
      startIndex < contextArray.length &&
      typeof contextArray[startIndex] === "string" &&
      contextArray[startIndex].startsWith(AggregateContext._dtdlContextPrefix)
    ) {
      childDtdlContext = this._getDtdlContextFromContextString(
        contextArray[startIndex],
        parsingErrors
      );
      ++startIndex;
    }

    if (childDtdlContext === undefined) {
      parsingErrors.push(
        createParsingError("dtmi:dtdl:parsingError:missingDtdlContext", {
          cause: `@context specifier in top-level JSON object does not include a DTDL context specifier as its string value or as the first entry of its array value.`,
          action: `Set the first value of the '@context' property to a valid DTDL context specifier, such as 'dtmi:dtdl:context;2'.`
        })
      );
      throw new ParsingException(parsingErrors);
    }

    let childTermDefinitions = this._localTermDefinitions;
    let childPrefixDefinitions = this._localPrefixDefinitions;
    let endIndex = contextArray.length - 1;
    if (typeof contextArray[endIndex] === "object") {
      if (
        !AggregateContext._dtdlVersionsAllowingLocalTerms.includes(childDtdlContext.majorVersion)
      ) {
        parsingErrors.push(
          createParsingError("dtmi:dtdl:parsingError:disallowedLocalContext", {
            cause: `@context value contains local context definitions, which are not allowed in DTDL version ${childDtdlContext.majorVersion}.`,
            action: `Remove the local context object, or try specifiying a different version of DTDL.`
          })
        );
        throw new ParsingException(parsingErrors);
      }

      ({
        childTermDefinitions,
        childPrefixDefinitions
      } = this._getChildDefinitionsfromContextObject(
        contextArray[endIndex],
        childDtdlContext.majorVersion,
        parsingErrors
      ));
      --endIndex;
    }

    let childAffiliateContexts = this._activeAffiliateContexts;
    if (startIndex <= endIndex || prefaceAffiliateContexts !== {}) {
      childAffiliateContexts = { ...this._activeAffiliateContexts };

      for (const affiliateName in prefaceAffiliateContexts) {
        // eslint-disable-line guard-for-in
        childAffiliateContexts[affiliateName] = prefaceAffiliateContexts[affiliateName];
      }

      for (let index = startIndex; index <= endIndex; ++index) {
        const affiliate = this._getAffiliateContextFromContextToken(
          contextArray[index],
          childDtdlContext.majorVersion,
          parsingErrors
        );
        if (affiliate !== undefined) {
          childAffiliateContexts[affiliate.name] = affiliate.context;
        }
      }
    }

    const childAggregateContext = new AggregateContext(
      this._rejectUndefinedExtensions,
      this._rejectNonDtmiContexts,
      this._maxDtdlVersion
    );
    childAggregateContext._activeDtdlContext = childDtdlContext;
    childAggregateContext._activeAffiliateContexts = childAffiliateContexts;
    childAggregateContext._localTermDefinitions = childTermDefinitions;
    childAggregateContext._localPrefixDefinitions = childPrefixDefinitions;

    return childAggregateContext;
  }

  private _getDtdlContextFromContextString(
    contextString: string,
    parsingErrors: ParsingError[]
  ): VersionedContext {
    const dtdlContextDtmi = InDTMI.createDtmi(contextString);
    if (dtdlContextDtmi === undefined || dtdlContextDtmi.fragment !== "") {
      parsingErrors.push(
        createParsingError("dtmi:dtdl:parsingError:invalidContextSpecifier", {
          cause: `Model contains @context specifier '${contextString}' that is not a legal DTMI.`,
          action: `Replace the @context specifier with a string that conforms to the DTMI syntax -- see https://github.com/Azure/digital-twin-model-identifier.`
        })
      );
      throw new ParsingException(parsingErrors);
    }

    if (dtdlContextDtmi.majorVersion === 0) {
      parsingErrors.push(
        createParsingError("dtmi:dtdl:parsingError:missingContextVersion", {
          cause: `Model contains @context specifier '${contextString}', which is invalid because it lacks a version number.`,
          action: `Modify @context specifier so that DTDL version number follows ';'.`
        })
      );
      throw new ParsingException(parsingErrors);
    }

    const versionedContext = AggregateContext._dtdlContextHistory.getMatchingContext(
      dtdlContextDtmi.majorVersion,
      dtdlContextDtmi.minorVersion
    );
    if (versionedContext === undefined) {
      parsingErrors.push(
        createParsingError("dtmi:dtdl:parsingError:unrecognizedContextVersion", {
          cause: `Model contains @context specifier '${contextString}', which specifies a DTDL version that is not recognized.`,
          action: `Modify @context specifier to indicate one of the following DTDL versions: ${AggregateContext._dtdlContextHistory.availableVersions}.`
        })
      );
      throw new ParsingException(parsingErrors);
    }

    if (this._maxDtdlVersion !== undefined && dtdlContextDtmi.majorVersion > this._maxDtdlVersion) {
      parsingErrors.push(
        createParsingError("dtmi:dtdl:parsingError:disallowedContextVersion", {
          cause: `Model contains @context specifier '${contextString}', which specifies a DTDL version that exceeds the configured max version of ${this._maxDtdlVersion}.`,
          action: `Modify @context specifier to indicate a DTDL major version no greater than ${this._maxDtdlVersion}.`
        })
      );
      throw new ParsingException(parsingErrors);
    }

    if (!IdValidator.isIdReferenceValid(contextString, dtdlContextDtmi.majorVersion)) {
      parsingErrors.push(
        createParsingError("dtmi:dtdl:parsingError:invalidContextSpecifierForVersion", {
          cause: `Model contains @context specifier '${contextString}', which is not a valid DTMI for DTDL version ${dtdlContextDtmi.majorVersion}.`,
          action: `Change @context specifier to a valid DTMI for DTDL version ${dtdlContextDtmi.majorVersion} -- see https://github.com/Azure/digital-twin-model-identifier.`
        })
      );
      throw new ParsingException(parsingErrors);
    }

    return versionedContext;
  }

  private _getAffiliateContextFromContextToken(
    contextToken: any,
    dtdlVersion: number,
    parsingErrors: ParsingError[]
  ): { name: string; context: VersionedContext } | undefined {
    if (typeof contextToken !== "string") {
      if (typeof contextToken === "object") {
        parsingErrors.push(
          createParsingError("dtmi:dtdl:parsingError:localContextNotLast", {
            cause: `@context array contains a local context object that is not the last element in the array.`,
            action: `Merge all local context definitions into a single object and locate it at the end of the @context array.`
          })
        );
        throw new ParsingException(parsingErrors);
      } else {
        parsingErrors.push(
          createParsingError("dtmi:dtdl:parsingError:invalidContextElement", {
            cause: `Model contains @context array with an element that is not a JSON string or object.`,
            action: `Remove all @context array elements other than JSON strings and objects.`
          })
        );
        throw new ParsingException(parsingErrors);
      }
    }

    if (contextToken.startsWith(AggregateContext._dtdlContextPrefix)) {
      parsingErrors.push(
        createParsingError("dtmi:dtdl:parsingError:dtdlContextFollowsAffiliate", {
          cause: `@context array contains DTDL context specifier '${contextToken}' after an affiliate context specifier.`,
          action: `Rearrange context specifiers so that all DTDL context specifiers are at the beginning of @context array.`
        })
      );
      throw new ParsingException(parsingErrors);
    }

    if (!contextToken.startsWith(`dtmi:`)) {
      if (this._rejectNonDtmiContexts) {
        parsingErrors.push(
          createParsingError("dtmi:dtdl:parsingError:nonDtmiContextSpecifier", {
            cause: `Model contains @context specifier '${contextToken}', which is not a DTMI.`,
            action: `Remove '${contextToken}' @context specifier.`
          })
        );
        throw new ParsingException(parsingErrors);
      }

      return undefined;
    }

    const affiliateContextDtmi = InDTMI.createDtmi(contextToken);
    if (affiliateContextDtmi === undefined || affiliateContextDtmi.fragment !== "") {
      parsingErrors.push(
        createParsingError("dtmi:dtdl:parsingError:invalidContextSpecifier", {
          cause: `Model contains @context specifier '${contextToken}' that is not a legal DTMI.`,
          action: `Replace the @context specifier with a string that conforms to the DTMI syntax -- see https://github.com/Azure/digital-twin-model-identifier.`
        })
      );
      throw new ParsingException(parsingErrors);
    }

    if (!IdValidator.isIdReferenceValid(contextToken, dtdlVersion)) {
      parsingErrors.push(
        createParsingError("dtmi:dtdl:parsingError:invalidContextSpecifierForVersion", {
          cause: `Model contains @context specifier '${contextToken}', which is not a valid DTMI for DTDL version {dtdlVersion}.`,
          action: `Change @context specifier to a valid DTMI for DTDL version ${dtdlVersion} -- see https://github.com/Azure/digital-twin-model-identifier.`
        })
      );
      throw new ParsingException(parsingErrors);
    }

    if (affiliateContextDtmi.majorVersion === 0) {
      parsingErrors.push(
        createParsingError("dtmi:dtdl:parsingError:missingContextVersion", {
          cause: `Model contains @context specifier '${contextToken}', which is invalid because it lacks a version number.`,
          action: `Modify @context specifier so that extension version number follows ';'.`
        })
      );
      throw new ParsingException(parsingErrors);
    }

    if (
      !Object.prototype.hasOwnProperty.call(
        AggregateContext._affiliateContextHistories,
        affiliateContextDtmi.versionless
      )
    ) {
      if (this._rejectUndefinedExtensions) {
        parsingErrors.push(
          createParsingError("dtmi:dtdl:parsingError:unresolvableContextSpecifier", {
            cause: `Model contains @context specifier '${contextToken}', which is unrecognized.`,
            action: `Remove '${contextToken}' @context specifier.`
          })
        );
        throw new ParsingException(parsingErrors);
      }

      return undefined;
    }

    const affiliateContextHistory =
      AggregateContext._affiliateContextHistories[affiliateContextDtmi.versionless];
    const affiliateContext = affiliateContextHistory.getMatchingContext(
      affiliateContextDtmi.majorVersion,
      affiliateContextDtmi.minorVersion
    );
    if (affiliateContext === undefined) {
      if (this._rejectUndefinedExtensions) {
        parsingErrors.push(
          createParsingError("dtmi:dtdl:parsingError:unresolvableContextVersion", {
            cause: `Model contains @context specifier '${contextToken}', which specifies a context version that is not recognized.`,
            action: `Modify @context specifier to indicate one of the following versions: ${affiliateContextHistory.availableVersions}.`
          })
        );
        throw new ParsingException(parsingErrors);
      }

      return undefined;
    }

    return { name: affiliateContextDtmi.versionless, context: affiliateContext };
  }

  private _getChildDefinitionsfromContextObject(
    contextObj: { [term: string]: string },
    dtdlVersion: number,
    parsingErrors: ParsingError[]
  ): { childTermDefinitions: TermDict; childPrefixDefinitions: PrefixDict } {
    const termDefinitions = { ...this._localTermDefinitions };
    const prefixDefinitions = { ...this._localPrefixDefinitions };

    for (const term in contextObj) {
      // eslint-disable-line guard-for-in
      if (term === "") {
        parsingErrors.push(
          createParsingError("dtmi:dtdl:parsingError:localTermEmpty", {
            cause: `@context defines local term that is an empty string.`,
            action: `Use a non-empty string of characters for the term.`
          })
        );
        throw new ParsingException(parsingErrors);
      }

      if (term === `dtmi`) {
        parsingErrors.push(
          createParsingError("dtmi:dtdl:parsingError:localTermSchemePrefix", {
            cause: `@context contains a local definition for term 'dtmi' which is reserved as the scheme prefix for DTDL identifiers.`,
            action: `Use a different term other than 'dtmi'.`
          })
        );
        throw new ParsingException(parsingErrors);
      }

      if (!AggregateContext._termRegex.test(term)) {
        parsingErrors.push(
          createParsingError("dtmi:dtdl:parsingError:localTermInvalid", {
            cause: `@context defines local term '${term}' that contains invalid characters.`,
            action: `Use a different term that does not begin with '@' and that contains only letters, digits, and the characters '@', '-', '.', '_', '~', '!', '$', '&', ''', '(', ')', '*', '+', ',', ';', '='.`
          })
        );
        throw new ParsingException(parsingErrors);
      }

      if (AggregateContext._dtdlContextHistory.isTermInContext(term)) {
        parsingErrors.push(
          createParsingError("dtmi:dtdl:parsingError:localTermReserved", {
            cause: `@context contains a local definition for term '${term}' that is defined by the DTDL context.`,
            action: `Use a different term that is not a DTDL keyword.`
          })
        );
        throw new ParsingException(parsingErrors);
      }

      delete termDefinitions[term];
      delete prefixDefinitions[term];

      const definition = contextObj[term];

      if (definition === null) {
        continue;
      } else if (typeof definition !== "string") {
        parsingErrors.push(
          createParsingError("dtmi:dtdl:parsingError:localDefinitionNotString", {
            cause: `@context contains a local definition for term '${term}' that is not a JSON string.`,
            action: `Change the value of term '${term}' to a JSON string representing a valid DTMI or DTMI prefix.`
          })
        );
        throw new ParsingException(parsingErrors);
      }

      if (!definition.startsWith(`dtmi:`)) {
        parsingErrors.push(
          createParsingError("dtmi:dtdl:parsingError:localDefinitionNotDtmiScheme", {
            cause: `@context contains a local definition for term '${term}' whose value '${definition}' is not a DTMI or DTMI prefix.`,
            action: `Change the value of term '${term}' to a JSON string representing a valid DTMI or DTMI prefix.`
          })
        );
        throw new ParsingException(parsingErrors);
      }

      if (definition.endsWith(`:`)) {
        prefixDefinitions[term] = definition;
      } else {
        if (!IdValidator.isIdReferenceValid(definition, dtdlVersion)) {
          parsingErrors.push(
            createParsingError("dtmi:dtdl:parsingError:localDefinitionNotDtmi", {
              cause: `@context contains a local definition for term '${term}' whose value '${definition}' is not a valid DTMI or DTMI prefix for DTDL version {dtdlVersion}.`,
              action: `Change the value of term '${term}' to a JSON string representing a valid DTMI or DTMI prefix -- see https://github.com/Azure/digital-twin-model-identifier.`
            })
          );
          throw new ParsingException(parsingErrors);
        }

        termDefinitions[term] = new InDTMI(definition);
      }
    }

    return { childTermDefinitions: termDefinitions, childPrefixDefinitions: prefixDefinitions };
  }
  // codegen-outline-ends
}

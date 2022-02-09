// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ParsingError, createParsingError } from "./internal";

export class ValueParser {
  public static parseSingularStringToken(
    elementId: string,
    propertyName: string,
    token: any,
    maxLength: number | undefined,
    pattern: RegExp | undefined,
    parsingErrors: ParsingError[]
  ): string | undefined {
    let value: string | undefined;

    if (token === undefined) {
      parsingErrors.push(
        createParsingError("dtmi:dtdl:parsingError:stringNoValue", {
          cause: `{primaryId:p} property '${propertyName}' has no value.`,
          action: `Provide a string value for '${propertyName}'.`,
          primaryId: elementId,
          property: propertyName
        })
      );
    } else if (Array.isArray(token)) {
      if (token.length === 0) {
        parsingErrors.push(
          createParsingError("dtmi:dtdl:parsingError:stringNoValue", {
            cause: `{primaryId:p} property '${propertyName}' has no value.`,
            action: `Provide a string value for '${propertyName}'.`,
            primaryId: elementId,
            property: propertyName
          })
        );
      } else if (token.length > 1) {
        parsingErrors.push(
          createParsingError("dtmi:dtdl:parsingError:stringMultipleValues", {
            cause: `{primaryId:p} property '${propertyName}' has multiple values but only one value is allowed.`,
            action: `Remove all but one of the values of '${propertyName}'.`,
            primaryId: elementId,
            property: propertyName
          })
        );
      } else {
        value = this._getStringFromToken(elementId, propertyName, token[0], parsingErrors);
      }
    } else {
      value = this._getStringFromToken(elementId, propertyName, token, parsingErrors);
    }

    if (value !== undefined && maxLength !== undefined && value.length > maxLength) {
      parsingErrors.push(
        createParsingError("dtmi:dtdl:parsingError:stringTooLong", {
          cause: `{primaryId:p} property '${propertyName}' has value '${value}', which is too long -- length limit is ${maxLength}.`,
          action: `Select a shorter value for '${propertyName}' or trim current value to fewer than ${maxLength} characters.`,
          primaryId: elementId,
          property: propertyName,
          value: value
        })
      );
    }

    if (value !== undefined && pattern !== undefined && !pattern.test(value)) {
      parsingErrors.push(
        createParsingError("dtmi:dtdl:parsingError:stringInvalid", {
          cause: `{primaryId:p} property '${propertyName}' has value '${value}', which is invalid.`,
          action: `Modify the value of '${propertyName}' to make it match the regular expression '${pattern.source}'.`,
          primaryId: elementId,
          property: propertyName,
          value: value
        })
      );
    }

    return value;
  }

  public static parseSingularIntegerToken(
    elementId: string,
    propertyName: string,
    token: any,
    minInclusive: number | undefined,
    maxInclusive: number | undefined,
    parsingErrors: ParsingError[]
  ): number {
    let value: number | undefined;

    if (token === undefined) {
      parsingErrors.push(
        createParsingError("dtmi:dtdl:parsingError:integerNoValue", {
          cause: `{primaryId:p} property '${propertyName}' has no value.`,
          action: `Provide an integer value for '${propertyName}'.`,
          primaryId: elementId,
          property: propertyName
        })
      );
    } else if (Array.isArray(token)) {
      if (token.length === 0) {
        parsingErrors.push(
          createParsingError("dtmi:dtdl:parsingError:integerNoValue", {
            cause: `{primaryId:p} property '${propertyName}' has no value.`,
            action: `Provide an integer value for '${propertyName}'.`,
            primaryId: elementId,
            property: propertyName
          })
        );
      } else if (token.length > 1) {
        parsingErrors.push(
          createParsingError("dtmi:dtdl:parsingError:integerMultipleValues", {
            cause: `{primaryId:p} property '${propertyName}' has multiple values but only one value is allowed.`,
            action: `Remove all but one of the values of '${propertyName}'.`,
            primaryId: elementId,
            property: propertyName
          })
        );
      } else {
        value = this._getIntegerFromToken(elementId, propertyName, token[0], parsingErrors);
      }
    } else {
      value = this._getIntegerFromToken(elementId, propertyName, token, parsingErrors);
    }

    if (
      value !== undefined &&
      minInclusive !== undefined &&
      maxInclusive !== undefined &&
      minInclusive === maxInclusive &&
      value !== minInclusive
    ) {
      parsingErrors.push(
        createParsingError("dtmi:dtdl:parsingError:valueNotExact", {
          cause: `{primaryId:p} property '${propertyName}' has value ${value} but the only allowed value is ${minInclusive}.`,
          action: `Change the value of '${propertyName}' to ${minInclusive}.`,
          primaryId: elementId,
          property: propertyName,
          value: value.toString()
        })
      );
    } else if (value !== undefined && minInclusive !== undefined && value < minInclusive) {
      parsingErrors.push(
        createParsingError("dtmi:dtdl:parsingError:valueBelowMin", {
          cause: `{primaryId:p} property '${propertyName}' has value ${value}, which is less than the allowed minimum of ${minInclusive}.`,
          action:
            maxInclusive !== undefined
              ? `Increase the value of '${propertyName}' to a value between ${minInclusive} and ${maxInclusive} inclusive.`
              : `Increase the value of '${propertyName}' to a value greater than or equal to ${minInclusive}.`,
          primaryId: elementId,
          property: propertyName,
          value: value.toString()
        })
      );
    } else if (value !== undefined && maxInclusive !== undefined && value > maxInclusive) {
      parsingErrors.push(
        createParsingError("dtmi:dtdl:parsingError:valueAboveMax", {
          cause: `{primaryId:p} property '${propertyName}' has value ${value}, which is greater than the allowed maximum of ${maxInclusive}.`,
          action:
            minInclusive !== undefined
              ? `Reduce the value of '${propertyName}' to a value between ${maxInclusive} and ${maxInclusive} inclusive.`
              : `Reduce the value of '${propertyName}' to a value less than or equal to ${maxInclusive}.`,
          primaryId: elementId,
          property: propertyName,
          value: value.toString()
        })
      );
    }

    return value ?? 0;
  }

  public static parseSingularBooleanToken(
    elementId: string,
    propertyName: string,
    token: any,
    parsingErrors: ParsingError[]
  ): boolean {
    if (token === undefined) {
      parsingErrors.push(
        createParsingError("dtmi:dtdl:parsingError:booleanNoValue", {
          cause: `{primaryId:p} property '${propertyName}' has no value.`,
          action: `Provide an integer value for '${propertyName}'.`,
          primaryId: elementId,
          property: propertyName
        })
      );
      return false;
    }

    if (Array.isArray(token)) {
      if (token.length === 0) {
        parsingErrors.push(
          createParsingError("dtmi:dtdl:parsingError:booleanNoValue", {
            cause: `{primaryId:p} property '${propertyName}' has no value.`,
            action: `Provide a boolean value for '${propertyName}'.`,
            primaryId: elementId,
            property: propertyName
          })
        );
        return false;
      }

      if (token.length > 1) {
        parsingErrors.push(
          createParsingError("dtmi:dtdl:parsingError:booleanMultipleValues", {
            cause: `{primaryId:p} property '${propertyName}' has multiple values but only one value is allowed.`,
            action: `Remove all but one of the values of '${propertyName}'.`,
            primaryId: elementId,
            property: propertyName
          })
        );
        return false;
      }

      return this._getBooleanFromToken(elementId, propertyName, token[0], parsingErrors);
    }

    return this._getBooleanFromToken(elementId, propertyName, token, parsingErrors);
  }

  public static parseLangStringToken(
    elementId: string,
    propertyName: string,
    token: any,
    defaultLang: string,
    maxLength: number | undefined,
    pattern: RegExp | undefined,
    parsingErrors: ParsingError[]
  ): { [index: string]: string } {
    let dict: { [index: string]: string };

    if (token === undefined) {
      parsingErrors.push(
        createParsingError("dtmi:dtdl:parsingError:langStringNoValue", {
          cause: `{primaryId:p} property '${propertyName}' has no value.`,
          action: `Either remove property '${propertyName}' or provide a value that is a string, a JSON-LD language map, or a JSON array of language-tagged strings.`,
          primaryId: elementId,
          property: propertyName
        })
      );
      return {};
    } else if (typeof token === "string") {
      dict = { [defaultLang]: token };
    } else if (Array.isArray(token)) {
      dict = ValueParser._getDictionaryFromLanguageTaggedStringArray(
        elementId,
        propertyName,
        token,
        parsingErrors
      );
    } else if (typeof token === "object") {
      dict = ValueParser._getDictionaryFromLanguageMap(
        elementId,
        propertyName,
        token,
        parsingErrors
      );
    } else {
      parsingErrors.push(
        createParsingError("dtmi:dtdl:parsingError:langStringNotLangString", {
          cause: `{primaryId:p} property '${propertyName}' has value that is not valid for a language-tagged string property.`,
          action: `Provide a value for '{propertyName}' that is a string, a JSON-LD language map, or a JSON array of language-tagged strings.`,
          primaryId: elementId,
          property: propertyName,
          value: JSON.stringify(token)
        })
      );
      return {};
    }

    if (maxLength !== undefined) {
      for (const langCode in dict) {
        if (dict[langCode].length > maxLength) {
          parsingErrors.push(
            createParsingError("dtmi:dtdl:parsingError:langStringValueTooLong", {
              cause: `{primaryId:p} property '${propertyName}' has value '${dict[langCode]}', which is too long -- length limit is ${maxLength}.`,
              action: `Select a shorter value for '${propertyName}' or trim current value to fewer than ${maxLength} characters.`,
              primaryId: elementId,
              property: propertyName,
              value: dict[langCode]
            })
          );
        }
      }
    }

    if (pattern !== undefined) {
      for (const langCode in dict) {
        if (!pattern.test(dict[langCode])) {
          parsingErrors.push(
            createParsingError("dtmi:dtdl:parsingError:langStringValueInvalid", {
              cause: `{primaryId:p} property '${propertyName}' has value '${dict[langCode]}', which is invalid.`,
              action: `Modify the value of '${propertyName}' to make it match the regular expression '${pattern.source}'.`,
              primaryId: elementId,
              property: propertyName,
              value: dict[langCode]
            })
          );
        }
      }
    }

    return dict;
  }

  public static parseSingularLiteralToken(
    elementId: string,
    propertyName: string,
    token: any,
    parsingErrors: ParsingError[]
  ): { value: any; typeFragment: string } {
    let value: any;
    let typeFragment: string = "";

    if (token === undefined) {
      parsingErrors.push(
        createParsingError("dtmi:dtdl:parsingError:literalNoValue", {
          cause: `{primaryId:p} property '${propertyName}' has no value.`,
          action: `Provide a literal value for '${propertyName}'.`,
          primaryId: elementId,
          property: propertyName
        })
      );
    } else if (Array.isArray(token)) {
      if (token.length === 0) {
        parsingErrors.push(
          createParsingError("dtmi:dtdl:parsingError:literalNoValue", {
            cause: `{primaryId:p} property '${propertyName}' has no value.`,
            action: `Provide a litaral value for '${propertyName}'.`,
            primaryId: elementId,
            property: propertyName
          })
        );
      } else if (token.length > 1) {
        parsingErrors.push(
          createParsingError("dtmi:dtdl:parsingError:literalMultipleValues", {
            cause: `{primaryId:p} property '${propertyName}' has multiple values but only one value is allowed.`,
            action: `Remove all but one of the values of '${propertyName}'.`,
            primaryId: elementId,
            property: propertyName
          })
        );
      } else if (typeof token[0] === "string") {
        value = token[0];
        typeFragment = "#string";
      } else if (typeof token[0] === "number" && Number.isInteger(token[0])) {
        value = token[0];
        typeFragment = "#integer";
      } else if (typeof token[0] === "boolean") {
        value = token[0];
        typeFragment = "#boolean";
      } else {
        parsingErrors.push(
          createParsingError("dtmi:dtdl:parsingError:literalNotValid", {
            cause: `{primaryId:p} property '${propertyName}' has value ${JSON.stringify(
              token[0]
            )}, which is not a JSON string, integer, or boolean.`,
            action: `Change the value of '${propertyName}' to a JSON string, integer, or boolean.`,
            primaryId: elementId,
            property: propertyName,
            value: JSON.stringify(token[0])
          })
        );
      }
    } else if (typeof token === "string") {
      value = token;
      typeFragment = "#string";
    } else if (typeof token === "number" && Number.isInteger(token)) {
      value = token;
      typeFragment = "#integer";
    } else if (typeof token === "boolean") {
      value = token;
      typeFragment = "#boolean";
    } else {
      parsingErrors.push(
        createParsingError("dtmi:dtdl:parsingError:literalNotValid", {
          cause: `{primaryId:p} property '${propertyName}' has value ${JSON.stringify(
            token
          )}, which is not a JSON string, integer, or boolean.`,
          action: `Change the value of '${propertyName}' to a JSON string, integer, or boolean.`,
          primaryId: elementId,
          property: propertyName,
          value: JSON.stringify(token)
        })
      );
    }

    return { value: value, typeFragment: typeFragment };
  }

  public static parseSingularIdentifierToken(
    elementId: string,
    propertyName: string,
    token: any,
    maxLength: number | undefined,
    pattern: RegExp | undefined,
    parsingErrors: ParsingError[]
  ): string | undefined {
    let value: string;

    if (token === undefined) {
      parsingErrors.push(
        createParsingError("dtmi:dtdl:parsingError:identifierNoValue", {
          cause: `{primaryId:p} property '${propertyName}' has no value.`,
          action: `Provide a string value for '${propertyName}' that is a valid DTMI.`,
          primaryId: elementId,
          property: propertyName
        })
      );
      return undefined;
    }

    if (Array.isArray(token)) {
      if (token.length === 0) {
        parsingErrors.push(
          createParsingError("dtmi:dtdl:parsingError:identifierNoValue", {
            cause: `{primaryId:p} property '${propertyName}' has no value.`,
            action: `Provide a string value for '${propertyName}' that is a valid DTMI.`,
            primaryId: elementId,
            property: propertyName
          })
        );
        return undefined;
      }

      if (token.length > 1) {
        parsingErrors.push(
          createParsingError("dtmi:dtdl:parsingError:identifierMultipleValues", {
            cause: `{primaryId:p} property '${propertyName}' has multiple values but only one value is allowed.`,
            action: `Remove all but one of the values of '${propertyName}'.`,
            primaryId: elementId,
            property: propertyName
          })
        );
        return undefined;
      }

      if (typeof token[0] !== "string") {
        parsingErrors.push(
          createParsingError("dtmi:dtdl:parsingError:identifierNotString", {
            cause: `{primaryId:p} property '${propertyName}' has value ${JSON.stringify(
              token[0]
            )}, which is not a JSON string.`,
            action: `Change the value of '${propertyName}' to a JSON string that is a valid DTMI.`,
            primaryId: elementId,
            property: propertyName,
            value: JSON.stringify(token[0])
          })
        );
        return undefined;
      }

      value = token[0];
    } else if (typeof token !== "string") {
      parsingErrors.push(
        createParsingError("dtmi:dtdl:parsingError:identifierNotString", {
          cause: `{primaryId:p} property '${propertyName}' has value ${JSON.stringify(
            token
          )}, which is not a JSON string.`,
          action: `Change the value of '${propertyName}' to a JSON string that is a valid DTMI.`,
          primaryId: elementId,
          property: propertyName,
          value: JSON.stringify(token)
        })
      );
      return undefined;
    } else {
      value = token;
    }

    if (maxLength !== undefined && value.length > maxLength) {
      parsingErrors.push(
        createParsingError("dtmi:dtdl:parsingError:identifierTooLong", {
          cause: `{primaryId:p} property '${propertyName}' has value '${value}', which is too long -- length limit is ${maxLength}.`,
          action: `Select a shorter value for '${propertyName}' or trim current value to fewer than ${maxLength} characters.`,
          primaryId: elementId,
          property: propertyName,
          value: value
        })
      );
      return undefined;
    }

    if (pattern !== undefined && !pattern.test(value)) {
      parsingErrors.push(
        createParsingError("dtmi:dtdl:parsingError:identifierInvalid", {
          cause: `{primaryId:p} property '${propertyName}' has value '${value}', which is not a valid DTMI.`,
          action: `Modify the value of '${propertyName}' to make it match the legal syntaxt for a DTMI.`,
          primaryId: elementId,
          property: propertyName,
          value: value
        })
      );
    }

    return value;
  }

  private static _getStringFromToken(
    elementId: string,
    propertyName: string,
    token: any,
    parsingErrors: ParsingError[]
  ): string | undefined {
    if (typeof token === "object") {
      if (!Object.prototype.hasOwnProperty.call(token, "@value")) {
        parsingErrors.push(
          createParsingError("dtmi:dtdl:parsingError:stringObjectNoValue", {
            cause: `{primaryId:p} property '${propertyName}' has value that is a JSON object with no '@value' property.`,
            action: `Add an '@value' property with a string value to the object, or replace the object with a JSON string.`,
            primaryId: elementId,
            property: propertyName,
            value: JSON.stringify(token)
          })
        );
        return undefined;
      }

      const valToken = token["@value"];
      if (typeof valToken !== "string") {
        parsingErrors.push(
          createParsingError("dtmi:dtdl:parsingError:stringValueNotString", {
            cause: `{primaryId:p} property '${propertyName}' has value that is a JSON object whose '@value' is ${JSON.stringify(
              valToken
            )}, which is not a JSON string.`,
            action: `Change the value of the '@value' property of '${propertyName}' to a JSON string.`,
            primaryId: elementId,
            property: propertyName,
            value: JSON.stringify(valToken)
          })
        );
        return undefined;
      }

      return valToken;
    }

    if (typeof token !== "string") {
      parsingErrors.push(
        createParsingError("dtmi:dtdl:parsingError:stringNotString", {
          cause: `{primaryId:p} property '${propertyName}' has value ${JSON.stringify(
            token
          )}, which is not a JSON string.`,
          action: `Change the value of '${propertyName}' to a JSON string.`,
          primaryId: elementId,
          property: propertyName,
          value: JSON.stringify(token)
        })
      );
      return undefined;
    }

    return token;
  }

  private static _getIntegerFromToken(
    elementId: string,
    propertyName: string,
    token: any,
    parsingErrors: ParsingError[]
  ): number | undefined {
    if (typeof token === "object") {
      if (!Object.prototype.hasOwnProperty.call(token, "@value")) {
        parsingErrors.push(
          createParsingError("dtmi:dtdl:parsingError:integerObjectNoValue", {
            cause: `{primaryId:p} property '${propertyName}' has value that is a JSON object with no '@value' property.`,
            action: `Add an '@value' property with an integer value to the object, or replace the object with a JSON integer.`,
            primaryId: elementId,
            property: propertyName,
            value: JSON.stringify(token)
          })
        );
        return undefined;
      }

      const valToken = token["@value"];
      if (typeof valToken !== "number" || !Number.isInteger(valToken)) {
        parsingErrors.push(
          createParsingError("dtmi:dtdl:parsingError:integerValueNotInteger", {
            cause: `{primaryId:p} property '${propertyName}' has value that is a JSON object whose '@value' is ${JSON.stringify(
              valToken
            )}, which is not a JSON integer.`,
            action: `Change the value of the '@value' property of '${propertyName}' to a JSON integer.`,
            primaryId: elementId,
            property: propertyName,
            value: JSON.stringify(valToken)
          })
        );
        return undefined;
      }

      return valToken;
    }

    if (typeof token !== "number" || !Number.isInteger(token)) {
      parsingErrors.push(
        createParsingError("dtmi:dtdl:parsingError:integerNotInteger", {
          cause: `{primaryId:p} property '${propertyName}' has value ${token.toString()}, which is not a JSON integer.`,
          action: `Change the value of '${propertyName}' to a JSON integer.`,
          primaryId: elementId,
          property: propertyName,
          value: token.toString()
        })
      );
      return undefined;
    }

    return token;
  }

  private static _getBooleanFromToken(
    elementId: string,
    propertyName: string,
    token: any,
    parsingErrors: ParsingError[]
  ): boolean {
    if (typeof token === "object") {
      if (!Object.prototype.hasOwnProperty.call(token, "@value")) {
        parsingErrors.push(
          createParsingError("dtmi:dtdl:parsingError:booleanObjectNoValue", {
            cause: `{primaryId:p} property '${propertyName}' has value that is a JSON object with no '@value' property.`,
            action: `Add an '@value' property with a boolean value to the object, or replace the object with a JSON boolean.`,
            primaryId: elementId,
            property: propertyName,
            value: JSON.stringify(token)
          })
        );
        return false;
      }

      const valToken = token["@value"];
      if (typeof valToken !== "boolean") {
        parsingErrors.push(
          createParsingError("dtmi:dtdl:parsingError:booleanValueNotBoolean", {
            cause: `{primaryId:p} property '${propertyName}' has value that is a JSON object whose '@value' is ${JSON.stringify(
              valToken
            )}, which is not a JSON boolean.`,
            action: `Change the value of the '@value' property of '${propertyName}' to one of the JSON boolean values true or false.`,
            primaryId: elementId,
            property: propertyName,
            value: JSON.stringify(valToken)
          })
        );
        return false;
      }

      return valToken;
    }

    if (typeof token !== "boolean") {
      parsingErrors.push(
        createParsingError("dtmi:dtdl:parsingError:booleanNotBoolean", {
          cause: `{primaryId:p} property '${propertyName}' has value ${token.toString()}, which is not a JSON boolean.`,
          action: `Change the value of '${propertyName}' to one of the JSON boolean values true or false.`,
          primaryId: elementId,
          property: propertyName,
          value: token.toString()
        })
      );
      return false;
    }

    return token;
  }

  private static _getDictionaryFromLanguageTaggedStringArray(
    elementId: string,
    propertyName: string,
    array: any[],
    parsingErrors: ParsingError[]
  ): { [index: string]: string } {
    const dict: { [index: string]: string } = {};

    for (const element of array) {
      if (typeof element !== "object") {
        parsingErrors.push(
          createParsingError("dtmi:dtdl:parsingError:langStringElementNotObject", {
            cause: `{primaryId:p} property '${propertyName}' array has element '${element.toString()}', which is not a JSON object.`,
            action: `Change all elements in '${propertyName}' array to JSON objects.`,
            primaryId: elementId,
            property: propertyName,
            value: element.toString()
          })
        );
      } else {
        let langCode = "";
        let langValue = "";

        if (!Object.prototype.hasOwnProperty.call(element, "@language")) {
          parsingErrors.push(
            createParsingError("dtmi:dtdl:parsingError:langStringElementNoCode", {
              cause: `{primaryId:p} property '${propertyName}' array has element '${JSON.stringify(
                element
              )}', which does not contain a '@language' property.`,
              action: `Add a '@language' property whose string value is a valid ISO 639 language code -- see https://www.iso.org/iso-639-language-codes.html.`,
              primaryId: elementId,
              property: propertyName
            })
          );
        } else {
          const codeToken = element["@language"];
          if (typeof codeToken !== "string") {
            parsingErrors.push(
              createParsingError("dtmi:dtdl:parsingError:langStringElementCodeNotString", {
                cause: `{primaryId:p} property '${propertyName}' array has element with language code '${JSON.stringify(
                  codeToken
                )}', which is not a JSON string.`,
                action: `Change the value of '${propertyName}' array element property '@language' to a JSON string that is a valid ISO 639 language code -- see https://www.iso.org/iso-639-language-codes.html.`,
                primaryId: elementId,
                property: propertyName,
                value: JSON.stringify(codeToken)
              })
            );
          } else {
            langCode = codeToken;

            if (!this._isValidLanguageCode(langCode)) {
              parsingErrors.push(
                createParsingError("dtmi:dtdl:parsingError:langStringElementInvalidCode", {
                  cause: `{primaryId:p} property '${propertyName}' array has element with language code '${langCode}', which is invalid -- a language code must be a lowercase string of 2 to 4 characters.`,
                  action: `Change the language code '${langCode}' in to a valid ISO 639 language code -- see https://www.iso.org/iso-639-language-codes.html.`,
                  primaryId: elementId,
                  property: propertyName,
                  value: langCode
                })
              );
            }

            if (Object.prototype.hasOwnProperty.call(dict, langCode)) {
              parsingErrors.push(
                createParsingError("dtmi:dtdl:parsingError:langStringElementCodeNotUnique", {
                  cause: `{primaryId:p} property '${propertyName}' is array in which language code '${langCode}' is duplicated.`,
                  action: `Remove redundant instances of language code '${langCode}' from '${propertyName}' array.`,
                  primaryId: elementId,
                  property: propertyName,
                  value: langCode
                })
              );
            }
          }
        }

        if (!Object.prototype.hasOwnProperty.call(element, "@value")) {
          parsingErrors.push(
            createParsingError("dtmi:dtdl:parsingError:langStringElementNoValue", {
              cause: `{primaryId:p} property '${propertyName}' array has element '${JSON.stringify(
                element
              )}', which does not contain a '@value' property.`,
              action: `Ensure every object in property '${propertyName}' array has a '@value' property that is a string.`,
              primaryId: elementId,
              property: propertyName
            })
          );
        } else {
          const valueToken = element["@value"];
          if (typeof valueToken !== "string") {
            parsingErrors.push(
              createParsingError("dtmi:dtdl:parsingError:langStringElementValueNotString", {
                cause: `{primaryId:p} property '${propertyName}' array has element with '@value' value '${JSON.stringify(
                  valueToken
                )}', which is not a JSON string.`,
                action: `Change the value of '${propertyName}' array element property '@value' to a JSON string.`,
                primaryId: elementId,
                property: propertyName,
                value: JSON.stringify(valueToken)
              })
            );
          } else {
            langValue = valueToken;
          }
        }

        if (langCode !== "" && langValue !== "") {
          dict[langCode] = langValue;
        }
      }
    }

    return dict;
  }

  private static _getDictionaryFromLanguageMap(
    elementId: string,
    propertyName: string,
    obj: { [index: string]: any },
    parsingErrors: ParsingError[]
  ): { [index: string]: string } {
    const dict: { [index: string]: string } = {};

    for (const langCode in obj) {
      // eslint-disable-line guard-for-in
      let assignOk = true;

      if (!this._isValidLanguageCode(langCode)) {
        parsingErrors.push(
          createParsingError("dtmi:dtdl:parsingError:langStringInvalidCode", {
            cause: `{primaryId:p} property '${propertyName}' has language code '${langCode}', which is invalid -- a language code must be a lowercase string of 2 to 4 characters.`,
            action: `Change the language code '${langCode}' in to a valid ISO 639 language code -- see https://www.iso.org/iso-639-language-codes.html.`,
            primaryId: elementId,
            property: propertyName,
            value: langCode
          })
        );
        assignOk = false;
      }

      const langValue = obj[langCode];

      if (typeof langValue !== "string") {
        parsingErrors.push(
          createParsingError("dtmi:dtdl:parsingError:langStringValueNotString", {
            cause: `{primaryId:p} property '${propertyName}' with language code '${langCode}' has value ${JSON.stringify(
              langValue
            )}, which is not a JSON string.`,
            action: `Change the value of '${propertyName}' with language code '${langCode}' to a JSON string.`,
            primaryId: elementId,
            property: propertyName,
            value: JSON.stringify(langValue)
          })
        );
        assignOk = false;
      }

      if (assignOk) {
        dict[langCode] = langValue;
      }
    }

    return dict;
  }

  private static _isValidLanguageCode(langCode: string): boolean {
    return /^[a-z]{2,4}(-[A-Z][a-z]{3})?(-([A-Z]{2}|[0-9]{3}))?$/.test(langCode);
  }
}

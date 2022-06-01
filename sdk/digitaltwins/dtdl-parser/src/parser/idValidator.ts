// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/* eslint-disable valid-jsdoc */
/* eslint-disable guard-for-in */
/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
/* eslint-disable sort-imports */

import { InDTMI, ParsingError, createParsingError, ParsingException } from "./internal";
/**
 * A static class for determining whether a string is a valid identifier.
 **/
export class IdValidator {
  static idDefinitionMaxLengths: Map<Number, Number> = new Map();
  static idDefinitionRegexPatterns: Map<Number, RegExp> = new Map();
  static idReferenceMaxLengths: Map<Number, Number> = new Map();
  static idReferenceRegexPatterns: Map<Number, RegExp> = new Map();

  static initialize() {
    IdValidator.idDefinitionMaxLengths.set(2, 2048);
    IdValidator.idDefinitionRegexPatterns.set(
      2,
      /^dtmi:[A-Za-z](?:[A-Za-z0-9_]*[A-Za-z0-9])?(?::[A-Za-z](?:[A-Za-z0-9_]*[A-Za-z0-9])?)*;[1-9][0-9]{0,8}$/
    );
    IdValidator.idDefinitionMaxLengths.set(3, 2048);
    IdValidator.idDefinitionRegexPatterns.set(
      3,
      /^dtmi:[A-Za-z](?:[A-Za-z0-9_]*[A-Za-z0-9])?(?::[A-Za-z](?:[A-Za-z0-9_]*[A-Za-z0-9])?)*(?:;[1-9][0-9]{0,8}(?:\.[1-9][0-9]{0,5})?)?(?:#(?:[A-Za-z](?:[A-Za-z0-9_]*[A-Za-z0-9])?)?)?$/
    );

    IdValidator.idReferenceMaxLengths.set(2, 2048);
    IdValidator.idReferenceRegexPatterns.set(
      2,
      /^dtmi:[A-Za-z](?:[A-Za-z0-9_]*[A-Za-z0-9])?(?::[A-Za-z](?:[A-Za-z0-9_]*[A-Za-z0-9])?)*;[1-9][0-9]{0,8}$/
    );
    IdValidator.idReferenceMaxLengths.set(3, 2048);
    IdValidator.idReferenceRegexPatterns.set(
      3,
      /^dtmi:[A-Za-z](?:[A-Za-z0-9_]*[A-Za-z0-9])?(?::[A-Za-z](?:[A-Za-z0-9_]*[A-Za-z0-9])?)*(?:;[1-9][0-9]{0,8}(?:\.[1-9][0-9]{0,5})?)?$/
    );
  }

  // codegen-outline-begin constants
  static GLOBAL_ID_PATTERN_3 = new RegExp(
    "^dtmi:[A-Za-z](?:[A-Za-z0-9_]*[A-Za-z0-9])?(?::[A-Za-z](?:[A-Za-z0-9_]*[A-Za-z0-9])?)*(?:;[1-9][0-9]{0,8}(?:\\.[1-9][0-9]{0,5})?)?(?:#(?:[A-Za-z](?:[A-Za-z0-9_]*[A-Za-z0-9])?)?)?$"
  );
  static GLOBAL_ID_PATTERN_2 = new RegExp(
    "^dtmi:[A-Za-z](?:[A-Za-z0-9_]*[A-Za-z0-9])?(?::[A-Za-z](?:[A-Za-z0-9_]*[A-Za-z0-9])?)*;[1-9][0-9]{0,8}$"
  );
  static MAX_LENGTH = 2048;
  // codegen-outline-end

  // codegen-outline-begin methods
  public static isIdReferenceValid(idString: string, dtdlVersion: number): boolean {
    const regex = IdValidator.idReferenceRegexPatterns.get(dtdlVersion);
    if (regex && !regex.test(idString)) {
      return false;
    }
    const length = IdValidator.idReferenceMaxLengths.get(dtdlVersion);
    if (length && idString.length > length) {
      return false;
    }
    return true;
  }

  public static parseIdProperty(
    obj: any,
    parentId: string | undefined,
    propName: string | undefined,
    dtmiSeg: string | undefined,
    idRequired: boolean,
    parsingErrors: ParsingError[],
    dtdlVersion: number
  ): string {
    let idString = "";
    const idToken = obj["@id"];
    if (idToken) {
      if (typeof idToken !== "string") {
        parsingErrors.push(
          createParsingError("dtmi:dtdl:parsingError:invalidId", {
            cause: `Identifier ${idToken} is invalid.`,
            action:
              "Replace the identifier with a string that conforms to the DTMI syntax -- see https://github.com/Azure/digital-twin-model-identifier.",
            value: idToken
          })
        );
        throw new ParsingException(parsingErrors);
      }
      const length = IdValidator.idDefinitionMaxLengths.get(dtdlVersion);
      if (length && idToken.length > length) {
        parsingErrors.push(
          createParsingError("dtmi:dtdl:parsingError:idTooLong", {
            cause: `Identifier ${idToken} is too long -- length limit is ${length}.`,
            action: `Select a shorter value for the identifier or trim current value to fewer than  ${length} characters.`,
            value: idToken
          })
        );
        throw new ParsingException(parsingErrors);
      }
      const regex = IdValidator.idDefinitionRegexPatterns.get(dtdlVersion);
      if (regex && !regex.test(idToken)) {
        parsingErrors.push(
          createParsingError("dtmi:dtdl:parsingError:invalidId", {
            cause: `Identifier ${idToken} is invalid.`,
            action:
              "Replace the identifier with a string that conforms to the DTMI syntax-- see https://github.com/Azure/digital-twin-model-identifier.",
            value: idToken
          })
        );
        throw new ParsingException(parsingErrors);
      }
      idString = idToken;
    } else {
      if (idRequired) {
        parsingErrors.push(
          createParsingError("dtmi:dtdl:parsingError:missingRequiredId", {
            cause: `{primaryId:p} property ${propName} requires an identifer but none provided.`,
            action:
              'Add an "@id" property whose value is string that conforms to the DTMI syntax-- see https://github.com/Azure/digital-twin-model-identifier.',
            primaryId: parentId,
            property: propName
          })
        );
        throw new ParsingException(parsingErrors);
      }
      let secondSeg = "";
      if (dtmiSeg) {
        const segToken = obj[dtmiSeg];
        if (!segToken || typeof segToken !== "string") {
          parsingErrors.push(
            createParsingError("dtmi:dtdl:parsingError:missingRequiredProperty", {
              cause: `{primaryId:p} property ${propName} requires property ${dtmiSeg} to be specified but it is not.`,
              action: `Add a ${dtmiSeg} property with a string value that is unique across all values of ${propName}.`,
              primaryId: parentId,
              property: propName,
              value: dtmiSeg
            })
          );
          throw new ParsingException(parsingErrors);
        }
        secondSeg = ":__" + segToken;
      }
      if (parentId !== undefined) {
        const delimeterPos = parentId.lastIndexOf(";");
        if (delimeterPos < 0) {
          idString = parentId + ":_" + propName + secondSeg;
        } else {
          idString =
            parentId.substring(0, delimeterPos) +
            ":_" +
            propName +
            secondSeg +
            parentId.substring(delimeterPos);
        }
      }
    }
    return idString;
  }
  // codegen-outline-end
}

IdValidator.initialize();

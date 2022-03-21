// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ParsingError, ParsingException, createParsingError } from "../parser/internal";

// TODO Definition should be codegenned from metamodel digest
// TODO Create result formatter for all the primaryId:p

// TODO The creations of the map should go come from metamodel digest

export class IdValidator {
  // codegen-outline-begin constants
  static GLOBAL_ID_PATTERN_3 = new RegExp(
    "^dtmi:[A-Za-z](?:[A-Za-z0-9_]*[A-Za-z0-9])?(?::[A-Za-z](?:[A-Za-z0-9_]*[A-Za-z0-9])?)*(?:;[1-9][0-9]{0,8}(?:\\.[1-9][0-9]{0,5})?)?(?:#(?:[A-Za-z](?:[A-Za-z0-9_]*[A-Za-z0-9])?)?)?$"
  );
  static GLOBAL_ID_PATTERN_2 = new RegExp(
    "^dtmi:[A-Za-z](?:[A-Za-z0-9_]*[A-Za-z0-9])?(?::[A-Za-z](?:[A-Za-z0-9_]*[A-Za-z0-9])?)*;[1-9][0-9]{0,8}$"
  );
  static MAX_LENGTH = 2048;
  // codegen-outline-end

  static idDefinitionMaxLengths = new Map<number, number>();
  // idDefinitionMaxLengths.set(2, MAX_LENGTH);
  // idDefinitionMaxLengths.set(3, MAX_LENGTH);

  static idReferenceMaxLengths = new Map<number, number>();
  // idReferenceMaxLengths.set(2, MAX_LENGTH);
  // idReferenceMaxLengths.set(3, MAX_LENGTH);

  static idDefinitionRegexPatterns = new Map<number, RegExp>();
  // idDefinitionRegexPatterns.set(2, GLOBAL_ID_PATTERN_2);
  // idDefinitionRegexPatterns.set(3, GLOBAL_ID_PATTERN_3);

  static idReferenceRegexPatterns = new Map<number, RegExp>();
  // idReferenceRegexPatterns.set(2, GLOBAL_ID_PATTERN_2);
  // idReferenceRegexPatterns.set(3, GLOBAL_ID_PATTERN_3);

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
    obj: unknown,
    parentId: string | undefined,
    propName: string | undefined,
    dtmiSeg: string | undefined,
    idRequired: boolean,
    parsingErrors: ParsingError[],
    dtdlVersion: number
  ): string {
    let idString = "";
    const idToken = (obj as { [x: string]: unknown })["@id"];
    if (idToken) {
      if (typeof idToken !== "string") {
        parsingErrors.push(
          createParsingError("dtmi:dtdl:parsingError:invalidId", {
            cause: `Identifier ${idToken} is invalid.`,
            action:
              "Replace the identifier with a string that conforms to the DTMI syntax -- see https://github.com/Azure/digital-twin-model-identifier.",
            value: idToken as string | undefined
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
        const segToken = (obj as { [x: string]: unknown })[dtmiSeg];
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

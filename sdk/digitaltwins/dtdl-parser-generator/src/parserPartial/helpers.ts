// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/* eslint-disable valid-jsdoc */

import { LanguageStringType } from "../parser/type/langstringType";

export class Helpers {
  // codegen-outline-begin methods
  static areDictionariesLiteralEqual(
    dict1: LanguageStringType,
    dict2: LanguageStringType
  ): boolean {
    if (Object.keys(dict1).length !== Object.keys(dict2).length) {
      return false;
    }
    for (const [key, value] of Object.entries(dict1)) {
      if (dict2[key] === undefined || dict2[key] !== value) {
        return false;
      }
    }
    return true;
  }

  static getDataTypeString(_datatype: unknown): string {
    throw new Error("getDataTypeString is unnecessary in Typescript.");
  }

  static getJsonTextFromToken(_token: unknown): string {
    throw new Error("getJsonTextFromToken is unnecessary in Typescript.");
  }
  // codegen-outline-end
}

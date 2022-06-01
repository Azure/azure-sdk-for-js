// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/* eslint-disable valid-jsdoc */
/* eslint-disable guard-for-in */
/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
/* eslint-disable sort-imports */

import { EntityInfo } from "./internal";
import { LanguageStringType } from "./internal";
/**
 * A static class that holds various helper functions.
 **/
export class Helpers {
  static areListsIdEqual(list1: EntityInfo[], list2: EntityInfo[]): boolean {
    if (list1.length !== list2.length) {
      return false;
    }

    for (let i = 0; i < list1.length; i++) {
      if (list1[i].id !== list2[i].id) {
        return false;
      }
    }

    return true;
  }

  static areListsIdOrLiteralEqual(list1: EntityInfo[], list2: EntityInfo[]): boolean {
    if (list1.length !== list2.length) {
      return false;
    }

    for (let i = 0; i < list1.length; i++) {
      if (list1[i].id !== undefined && list2[i].id !== undefined) {
        if (list1[i].id !== list2[i].id) {
          return false;
        }
      } else {
        const string1 = JSON.stringify(list1[i]);
        const string2 = JSON.stringify(list2[i]);
        if (string1 !== string2) {
          return false;
        }
      }
    }

    return true;
  }

  static areDictioanriesIdEqual(
    dict1: { [name: string]: EntityInfo },
    dict2: { [name: string]: EntityInfo }
  ): boolean {
    if (Object.keys(dict1).length !== Object.keys(dict2).length) {
      return false;
    }

    const dict1Keys = Object.keys(dict1);
    for (const [key, value] of Object.entries(dict1)) {
      if (dict2[key] === undefined || dict2[key].id !== value.id) {
        return false;
      }
    }

    return true;
  }

  static areDictionariesIdOrLiteralEqual(
    dict1: { [name: string]: any },
    dict2: { [name: string]: any }
  ): boolean {
    if (Object.keys(dict1).length !== Object.keys(dict2).length) {
      return false;
    }

    for (const [key, value] of Object.entries(dict1)) {
      const val2 = dict2[key];
      if (!val2) {
        return false;
      } else if (!value.id || !val2.id || value.id !== val2.id || value !== val2) {
        return false;
      }
    }

    return true;
  }

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

  static getDataTypeString(datatype: any): string {
    throw new Error("getDataTypeString is unnecessary in Typescript.");
  }

  static getJsonTextFromToken(token: any): string {
    throw new Error("getJsonTextFromToken is unnecessary in Typescript.");
  }
  // codegen-outline-end
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { InDTMI } from "./internal";
import { logger } from "../utils/logger";

/* eslint-disable no-unused-vars */
enum Expansion {
  Nominative = ":n",
  Possessive = ":p",
  Relative = ":r",
  Elective = ":e"
}
/* eslint-enable no-unused-vars */

type ExpansionType = keyof typeof Expansion; // This yields the set of strings that match the enum instances.

export class ResultFormatter {
  private _formatString: string;
  private _formattedResult: string;

  constructor(formatString: string) {
    this._formatString = formatString;
    this._formattedResult = formatString;
  }

  public install(key: string, value: string) {
    const undecoratedKey = "{" + key + "}";
    if (this._formatString.includes(undecoratedKey)) {
      this._formattedResult = this._formattedResult.replace(undecoratedKey, value);
      return;
    }

    for (const expansionTypeKey in Expansion) {
      // eslint-disable-line guard-for-in
      const expansionType = expansionTypeKey as ExpansionType;
      const decoratedKey = "{" + key + Expansion[expansionType] + "}";
      if (this._formatString.includes(decoratedKey)) {
        this._formattedResult = this._formattedResult.replace(
          decoratedKey,
          this._expandValue(value, expansionType)
        );
        return;
      }
    }
  }

  public toString(): string {
    return this._formattedResult;
  }

  private _expandValue(value: string, expansionType: ExpansionType): string {
    if (typeof value !== "string") {
      logger.info("VALUE NOT STRING");
    }
    if (value.startsWith("_:")) {
      return this._getBasicExpansion(value, expansionType, "");
    }

    if (!value.startsWith("dtmi:")) {
      return this._getBasicExpansion(value, expansionType, ` '${value}'`);
    }

    const dtmi = InDTMI.createDtmi(value);
    if (dtmi === undefined) {
      return this._getBasicExpansion(value, expansionType, ` '${value}'`);
    }

    if (!dtmi.labels[dtmi.labels.length - 1].startsWith("_")) {
      return this._getBasicExpansion(value, expansionType, " " + value);
    }

    switch (expansionType) {
      case "Nominative":
        return this._buildNominativePhrase(dtmi, dtmi.labels.length);
      case "Possessive":
        if (dtmi.labels[dtmi.labels.length - 1].startsWith("__")) {
          return (
            this._buildNominativePhrase(dtmi, dtmi.labels.length - 2) +
            ` has '${dtmi.labels[dtmi.labels.length - 2].substr(1)}' value with name '${dtmi.labels[
              dtmi.labels.length - 1
            ].substr(2)}' whose`
          );
        } else {
          return (
            this._buildNominativePhrase(dtmi, dtmi.labels.length - 1) +
            ` has '${dtmi.labels[dtmi.labels.length - 1].substr(1)}' value whose`
          );
        }
      case "Relative":
        if (dtmi.labels[dtmi.labels.length - 1].startsWith("__")) {
          return ` with name '${dtmi.labels[dtmi.labels.length - 1].substr(2)}'`;
        } else {
          return "";
        }
      case "Elective":
        return "";
    }
  }

  private _getBasicExpansion(
    value: string,
    expansionType: ExpansionType,
    defaultValue: string
  ): string {
    switch (expansionType) {
      case "Nominative":
        return value;
      case "Possessive":
        return value + `'s`;
      default:
        return defaultValue;
    }
  }

  private _buildNominativePhrase(dtmi: InDTMI, labelCount: number): string {
    if (dtmi.labels[labelCount - 1].startsWith("__")) {
      return (
        this._buildNominativePhrase(dtmi, labelCount - 2) +
        ` has '${dtmi.labels[labelCount - 2].substr(1)}' value with name '${dtmi.labels[
          labelCount - 1
        ].substr(2)}' which`
      );
    } else if (dtmi.labels[labelCount - 1].startsWith("_")) {
      return (
        this._buildNominativePhrase(dtmi, labelCount - 1) +
        ` has '${dtmi.labels[labelCount - 1].substr(1)}' value which`
      );
    } else {
      let ancestorId = "dtmi";
      for (let i = 0; i < labelCount; ++i) {
        ancestorId += ":" + dtmi.labels[i];
      }
      if (dtmi.majorVersion > 0) {
        ancestorId += ";" + dtmi.majorVersion;
        if (dtmi.minorVersion > 0) {
          ancestorId += ";" + dtmi.minorVersion;
        }
      }
      return ancestorId;
    }
  }
}

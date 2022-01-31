// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { InDTMI } from "./internal";

type TermDict = { [term: string]: InDTMI };
type ReverseTermDict = { [dtmiValue: string]: string };

export class VersionedContext {
  private _termDict: TermDict;
  private _reverseTermDict: ReverseTermDict;
  private _majorVersion: number;
  private _minorVersion: number;

  constructor(majorVersion: number, minorVersion: number) {
    this._termDict = {};
    this._reverseTermDict = {};
    this._majorVersion = majorVersion;
    this._minorVersion = minorVersion;
  }

  get majorVersion() {
    return this._majorVersion;
  }

  get minorVersion() {
    return this._minorVersion;
  }

  public addDefinition(term: string, dtmi: InDTMI) {
    this._termDict[term] = dtmi;
    this._reverseTermDict[dtmi.value] = term;
  }

  public getDtmi(term: string): InDTMI | undefined {
    if (Object.prototype.hasOwnProperty.call(this._termDict, term)) {
      return this._termDict[term];
    } else {
      return undefined;
    }
  }

  public getTerm(uriString: string): string | undefined {
    if (Object.prototype.hasOwnProperty.call(this._reverseTermDict, uriString)) {
      return this._reverseTermDict[uriString];
    } else {
      return undefined;
    }
  }

  public isTermInContext(term: string): boolean {
    return Object.prototype.hasOwnProperty.call(this._termDict, term);
  }

  public isIdentifierInContext(uriString: string): boolean {
    return Object.prototype.hasOwnProperty.call(this._reverseTermDict, uriString);
  }
}

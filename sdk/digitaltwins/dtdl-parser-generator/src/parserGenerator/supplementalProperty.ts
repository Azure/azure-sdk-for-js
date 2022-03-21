// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { SupplementalPropertyDigest } from "./metamodelDigest";
import { TsScope } from "../codeGenerator";

export class SupplementalProperty {
  private _propertyName: string;
  private _typeUri: string;
  private _maxCount: string;
  private _minCount: string;
  private _isPlural: string;
  private _isOptional: string;
  private _dictionaryKey: string;
  private _instanceProperty: string;

  constructor(propertyName: string, supplementalPropertyDigest: SupplementalPropertyDigest) {
    this._propertyName = propertyName;
    this._typeUri = supplementalPropertyDigest.type || "undefined";
    this._maxCount =
      supplementalPropertyDigest.maxCount !== undefined
        ? supplementalPropertyDigest.maxCount.toString()
        : "undefined";
    this._minCount =
      supplementalPropertyDigest.minCount !== undefined
        ? supplementalPropertyDigest.minCount.toString()
        : "undefined";
    this._isPlural = `${supplementalPropertyDigest.plural}`;
    this._isOptional = `${supplementalPropertyDigest.optional}`;
    this._dictionaryKey = `${
      supplementalPropertyDigest.dictionaryKey !== undefined
        ? `"${supplementalPropertyDigest.dictionaryKey}"`
        : "undefined"
    }`;
    this._instanceProperty = `${
      supplementalPropertyDigest.instanceProperty !== undefined
        ? `"${supplementalPropertyDigest.instanceProperty}"`
        : "undefined"
    }`;
  }

  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  addProperty(scope: TsScope, infoVariableName: string): void {
    const typeUriString = this._typeUri !== undefined ? `'${this._typeUri}'` : "undefined";

    scope.line(`${infoVariableName}.addProperty("${this._propertyName}", 
      ${typeUriString}, 
      ${this._isPlural}, 
      ${this._isOptional}, 
      ${this._maxCount}, 
      ${this._minCount}, 
      ${this._dictionaryKey}, 
      ${this._instanceProperty});`);
  }
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

const SEPARATORS = new RegExp(":|;");
const DTMI_REGEX = new RegExp(
  "^dtmi:(?:_+[A-Za-z0-9]|[A-Za-z])(?:[A-Za-z0-9_]*[A-Za-z0-9])?(?::(?:_+[A-Za-z0-9]|[A-Za-z])(?:[A-Za-z0-9_]*[A-Za-z0-9])?)*(?:;[1-9][0-9]{0,8}(?:\\.[1-9][0-9]{0,5})?)?(?:#(?:(?:_+[A-Za-z0-9]|[A-Za-z])(?:[A-Za-z0-9_]*[A-Za-z0-9])?)?)?$"
);
const DTMIPREFIX = "dtmi:";

export class InDTMI {
  private _value: string = "";
  private _autogenned: boolean = false;
  private _majorVersion: number = -1;
  private _minorVersion: number = -1;
  private _completeVersion: number = -1;
  private _versionless: string = "";
  private _labels: String[];
  private _isReserved: boolean = false;
  private _absolutePath: string = "";
  private _fragment: string = "";

  static createDtmi(value: string): InDTMI | undefined {
    if (DTMI_REGEX.test(value)) {
      return new InDTMI(value);
    } else {
      return undefined;
    }
  }

  constructor(value: string) {
    this._value = value;
    const semicolonSeparator = this._value.lastIndexOf(";");
    const hashSeparator = this._value.indexOf("#");
    this._fragment = hashSeparator < 0 ? "" : this._value.substring(hashSeparator);
    if (semicolonSeparator < 0) {
      this._majorVersion = 0;
      this._minorVersion = 0;
      this._completeVersion = 0.0;
      this._versionless = this._value;
    } else {
      const dotSeparator = this._value.indexOf(".");
      const verEndIx = hashSeparator < 0 ? this._value.length : hashSeparator;
      const majorEndIx = dotSeparator < 0 ? verEndIx : dotSeparator;
      this._majorVersion = Number(this._value.substring(semicolonSeparator + 1, majorEndIx));
      this._minorVersion =
        dotSeparator < 0 ? 0 : Number(this._value.substring(dotSeparator + 1, verEndIx));
      this._completeVersion = this._majorVersion + this._minorVersion * 0.000001;
      this._versionless = this._value.substring(0, semicolonSeparator) + this._fragment;
    }
    if (this._value.includes(":_") || this._fragment.startsWith("#_")) {
      this._isReserved = true;
    }
    if (this._fragment) {
      this._absolutePath = this._value.substring(DTMIPREFIX.length, hashSeparator);
    } else {
      this._absolutePath = this._value.substring(DTMIPREFIX.length);
    }
    this._labels = this._absolutePath.split(SEPARATORS);
    if (this._absolutePath.includes(";")) {
      this._labels.pop();
    }
  }

  get value() {
    return this._value;
  }

  get autogenned() {
    return this._autogenned;
  }

  get majorVersion() {
    return this._majorVersion;
  }

  get minorVersion() {
    return this._minorVersion;
  }

  get completeVersion() {
    return this._completeVersion;
  }

  get versionless() {
    return this._versionless;
  }

  get labels() {
    return this._labels;
  }

  get isReserved() {
    return this._isReserved;
  }

  get absolutePath() {
    return this._absolutePath;
  }

  get fragment() {
    return this._fragment;
  }
}

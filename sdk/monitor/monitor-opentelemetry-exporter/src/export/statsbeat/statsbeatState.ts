// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
class statsBeat {
  _STATSBEAT_FAILURE_COUNT_THRESHOLD = 3;

  _initialFailureCount: number = 0;
  _initialSuccess: boolean = false;
  _shutdown: boolean = false;

  // Returns false if the number of failures for this StatsBeat excede the failure threshold.
  public isEnabled() {
    return this._initialFailureCount >= this._STATSBEAT_FAILURE_COUNT_THRESHOLD;
  }

  public incrementFailureCount() {
    this._initialFailureCount += 1;
  }

  public getFailureCount() {
    return this._initialFailureCount;
  }

  public setInitialSuccess(success: boolean) {
    this._initialSuccess = success;
  }

  public getInitialSuccess() {
    return this._initialSuccess;
  }

  public isShutdown() {
    return this.isShutdown;
  }
}

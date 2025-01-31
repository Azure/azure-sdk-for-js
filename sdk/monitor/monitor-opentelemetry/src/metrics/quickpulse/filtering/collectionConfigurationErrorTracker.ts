// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CollectionConfigurationError } from "../../../generated/index.js";

export class CollectionConfigurationErrorTracker {
  /**
   * This list represents the errors that are found when the response from a ping or post is initially parsed.
   * The errors in this list are expected to stay the same across multiple post requests of the same configuration
   * id, and so will only be changed when a new configuration gets parsed.
   */
  private validationTimeErrors: CollectionConfigurationError[] = [];
  /**
   * This list represents errors that can't be caught while parsing the response - such as validation errors that would occur when
   * analyzing customDimensions present in incoming spans/logs, or when creating a projection. These errors aren't expected to be the
   * same across post requests of the same configuration id and so is expected to be regenerated for every post request.
   */
  private runTimeErrors: CollectionConfigurationError[] = [];

  constructor() {
    this.validationTimeErrors = [];
    this.runTimeErrors = [];
  }

  public addValidationError(error: CollectionConfigurationError): void {
    this.validationTimeErrors.push(error);
  }

  public addRunTimeError(error: CollectionConfigurationError): void {
    this.runTimeErrors.push(error);
  }

  public getErrors(): CollectionConfigurationError[] {
    return this.validationTimeErrors.concat(this.runTimeErrors);
  }

  public clearRunTimeErrors(): void {
    this.runTimeErrors = [];
  }

  public clearValidationTimeErrors(): void {
    this.validationTimeErrors = [];
  }
}

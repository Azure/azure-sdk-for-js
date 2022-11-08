// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export class IngestionPropertiesValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "IngestionPropertiesValidationError";
  }
}

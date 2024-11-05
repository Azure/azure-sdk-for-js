// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export class TelemetryTypeError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TelemetryTypeError";
  }
}

export class UnexpectedFilterCreateError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UnexpectedFilterCreateError";
  }
}

export class DuplicateMetricIdError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DuplicateMetricIdError";
  }
}

export class MetricFailureToCreateError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "MetricFailureToCreateError";
  }
}

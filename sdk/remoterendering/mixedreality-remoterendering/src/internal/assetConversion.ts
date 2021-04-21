// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  Conversion,
  AssetConversionSettings,
  AssetConversionOutput,
  RemoteRenderingServiceError,
  AssetConversionStatus
} from "../generated/models/index";

/** The properties of the conversion. */
export interface AssetConversion {
  /** The ID of the conversion supplied when the conversion was created. */
  conversionId: string;
  /** Conversion settings describe the origin of input files and destination of output files. */
  settings: AssetConversionSettings;
  /**
   * Information about the output of a successful conversion. Only present when the status of the conversion is 'Succeeded'.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly output?: AssetConversionOutput;
  /** The error object containing details about the conversion failure. */
  error?: RemoteRenderingServiceError;
  /** The status of the conversion. Terminal states are 'Cancelled', 'Failed', and 'Succeeded'. */
  status: AssetConversionStatus;
  /** The time when the conversion was created. Date and time in ISO 8601 format. */
  createdOn: Date;
}

export function assetConversionFromConversion(conversion: Conversion): AssetConversion {
  return {
    ...conversion,
    error: conversion.error ? conversion.error : undefined
  };
}

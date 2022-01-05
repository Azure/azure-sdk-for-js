// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  Conversion,
  AssetConversionSettings,
  AssetConversionOutput,
  KnownAssetConversionStatus,
} from "../generated/models/index";
import {
  RemoteRenderingServiceError,
  createRemoteRenderingServiceError,
} from "../remoteRenderingServiceError";

/** Properties available for an AssetConversion in any state. */
export interface AssetConversionBase {
  /** The ID of the conversion supplied when the conversion was created. */
  conversionId: string;
  /** Conversion settings describe the origin of input files and destination of output files. */
  settings: AssetConversionSettings;
  /** The time when the conversion was created. Date and time in ISO 8601 format. */
  createdOn: Date;
}

/** The conversion was created but hasn't started. */
export interface NonStartedAssetConversion extends AssetConversionBase {
  /** The conversion was created but hasn't started. */
  status: "NotStarted";
}

/** The conversion is running. */
export interface RunningAssetConversion extends AssetConversionBase {
  /** The conversion is running. */
  status: "Running";
}

/** The conversion has succeeded. */
export interface SucceededAssetConversion extends AssetConversionBase {
  /** The conversion has succeeded. This is a terminal state. */
  status: "Succeeded";
  /**
   * Information about the output of a successful conversion.
   */
  readonly output: AssetConversionOutput;
}

/** The conversion has failed. Check the 'error' field for more details. */
export interface FailedAssetConversion extends AssetConversionBase {
  /** The conversion has failed. Check the 'error' field for more details. This is a terminal state. */
  status: "Failed";
  /** The error object containing details about the conversion failure. */
  error: RemoteRenderingServiceError;
}

/** The conversion was cancelled. */
export interface CancelledAssetConversion extends AssetConversionBase {
  /** The conversion was cancelled. This is a terminal state. */
  status: "Cancelled";
}

/** A type representing the various states of a conversion. This is a tagged union with "status" as its discriminant property. */
export type AssetConversion =
  | NonStartedAssetConversion
  | RunningAssetConversion
  | SucceededAssetConversion
  | FailedAssetConversion
  | CancelledAssetConversion;

/**
 * Build an AssetConversion object from the conversion object returned by the service.
 * @internal
 */
export function assetConversionFromConversion(conversion: Conversion): AssetConversion {
  const baseProperties: AssetConversionBase = {
    conversionId: conversion.conversionId,
    settings: conversion.settings,
    createdOn: conversion.createdOn,
  };
  switch (conversion.status) {
    case KnownAssetConversionStatus.NotStarted:
      return {
        status: "NotStarted",
        ...baseProperties,
      };
    case KnownAssetConversionStatus.Running:
      return {
        status: "Running",
        ...baseProperties,
      };
    case KnownAssetConversionStatus.Succeeded:
      return {
        status: "Succeeded",
        ...baseProperties,
        output: conversion.output!,
      };
    case KnownAssetConversionStatus.Cancelled:
      return {
        status: "Cancelled",
        ...baseProperties,
      };
    case KnownAssetConversionStatus.Failed:
      return {
        status: "Failed",
        ...baseProperties,
        error: createRemoteRenderingServiceError(conversion.error!),
      };
    default:
      throw new Error("Unrecognized AssetConversionStatus returned by the service");
  }
}

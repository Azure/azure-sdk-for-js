// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** Calculation request. */
export interface EmissionCalculationRequest {
  /** Time stamp. */
  timeStamp?: Date | string;
  /** Calculation model id to be used. Use listCalculationModels API to get the list of all calculation models and choose the appropriate model based on the usecase. */
  calculationModelId: string;
  /**
   * Assessment report version to be used in the calculation. If no arVersion is specified in the payload, AR4 version is the default version
   *
   * Possible values: "Custom", "AR4", "AR5", "AR6"
   */
  arVersion?: ArVersions;
  /** List of activities on which the calculation is to be performed. */
  activities: Array<EmissionActivity>;
}

/** Activity. */
export interface EmissionActivity {
  /** Activity ID. */
  id: string;
  /** Activity data. */
  activityData: Record<string, unknown>;
}

/** Alias for ArVersions */
export type ArVersions = string;

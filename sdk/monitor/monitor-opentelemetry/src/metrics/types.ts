// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export interface IStandardMetricBaseDimensions {
  metricId?: string;
  cloudRoleInstance?: string;
  cloudRoleName?: string;
  IsAutocollected?: string;
}

export interface IMetricRequestDimensions extends IStandardMetricBaseDimensions {
  requestSuccess?: string;
  requestResultCode?: string;
}

export interface IMetricDependencyDimensions extends IStandardMetricBaseDimensions {
  dependencyType?: string;
  dependencyTarget?: string;
  dependencySuccess?: string;
  dependencyResultCode?: string;
}

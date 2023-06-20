// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export interface StandardMetricBaseDimensions {
  metricId?: string;
  cloudRoleInstance?: string;
  cloudRoleName?: string;
  IsAutocollected?: string;
}

export interface MetricRequestDimensions extends StandardMetricBaseDimensions {
  requestSuccess?: string;
  requestResultCode?: string;
}

export interface MetricDependencyDimensions extends StandardMetricBaseDimensions {
  dependencyType?: string;
  dependencyTarget?: string;
  dependencySuccess?: string;
  dependencyResultCode?: string;
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { MetricsListOptionalParams } from "../generated/metrics/src";
import { MetricDefinitionsListOptionalParams } from "../generated/metricsdefinitions/src";
import { MetricNamespacesListOptionalParams } from "../generated/metricsnamespaces/src";

export type QueryMetricsOptions = MetricsListOptionalParams;
export type GetMetricDefinitionsOptions = MetricDefinitionsListOptionalParams;
export type GetMetricNamespaces = MetricNamespacesListOptionalParams;

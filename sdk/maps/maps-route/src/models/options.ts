// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CommonClientOptions, OperationOptions } from "@azure/core-client";

/**
 * Client options used to configure the Maps Route Client
 */
export type MapsRouteClientOptions = CommonClientOptions;

/**
 * Options for retrieving route directions
 */
export interface GetRouteDirectionsOptions extends OperationOptions {}

/** Options for retrieving route directions with additional parameters */
export interface GetRouteDirectionsWithAdditionalParametersOptions extends OperationOptions {}

/** Options for retrieving route range */
export interface GetRouteRangeOptions extends OperationOptions {}

/** Options for requesting route directions in batch */
export interface RequestRouteDirectionsBatchOptions extends OperationOptions {}

/** Options for requesting route directions in batch (long-running) */
export interface RequestRouteDirectionsBatchOptions extends OperationOptions {}

/** Options for retrieving batch route direction results */
export interface GetRouteDirectionsBatchOptions extends OperationOptions {}

/** Options for requesting route matrix */
export interface RequestRouteMatrixOptions extends OperationOptions {}

/** Options for request route matrix (long-running) */
export interface RequestRouteMatrixOptions extends OperationOptions {}

/** Options for retrieving route matrix results */
export interface GetRouteMatrixOptions extends OperationOptions {}

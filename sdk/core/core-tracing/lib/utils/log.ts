// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import debug from "debug";

/**
 * @ignore
 * Log statements for errors that the application is unlikely to recover from.
 */
export const error = debug("azure:core-tracing:error");

/**
 * @ignore
 * Log statements for warnings when a function fails to perform its intended task.
 */
export const warning = debug("azure:core-tracing:warning");

/**
 * @ignore
 * Log statements for info when a function operates normally.
 */
export const info = debug("azure:core-tracing:info");

/**
 * @ignore
 * Log statements for verbose for troubleshooting scenarios.
 */
export const verbose = debug("azure:core-tracing:verbose");

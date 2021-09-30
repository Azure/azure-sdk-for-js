// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Either dependency resolution is disabled, and the client will get only the model linked to the dtmi,
 * or it is enabled, and the client will attempt to get the expanded JSON format from the endpoint,
 * and in the event of failure (or the repository metadata not supporting the feature)
 * will fallback on the standard (enabled) dependency resolution.
 */
export type dependencyResolutionType = "disabled" | "enabled";

// Copyright (c) Microsoft.
// Licensed under the MIT license.

/**
 * @name dependencyResolutionType
 * 
 * @description
 * either dependency resolution is disabled, and only the client will get only the model linked to the dtmi,
 * it is enabled, and the client will resolve all dependency models linked to the dtmi within the endpoint,
 * or it is set to tryFromExpanded, where the client will attempt to get the expanded JSON format from the endpoint,
 * and in the event of failure will fallback on the standard enabled dependency resolution.
 */
export type dependencyResolutionType = "disabled" | "enabled" | "tryFromExpanded" | undefined;

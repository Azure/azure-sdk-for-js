// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * General-purpose type aliases used across the core package.
 *
 * Keep this file dependency-free so it can be imported from any layer
 * (AST, proxy, resource, shape) without introducing cycles.
 */

/** A single member access segment: an object property name or an array index. */
export type PropertySegment = string | number;

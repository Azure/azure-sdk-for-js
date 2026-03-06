// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { QueryPage } from "./QueryPage.js";

/**
 * A composable transform function that processes a stream of QueryPages.
 * Replaces EndpointComponent classes with a functional composition primitive.
 *
 * Takes an AsyncGenerator of QueryPage and returns an AsyncGenerator of QueryPage.
 * Transforms are composed left-to-right via {@link composeTransforms}.
 *
 * @example
 * ```typescript
 * const myTransform: PipelineTransform = async function* (source) {
 *   for await (const page of source) {
 *     yield { ...page, items: page.items.filter(predicate) };
 *   }
 * };
 * ```
 * @internal
 */
export type PipelineTransform = (
  source: AsyncGenerator<QueryPage, void, undefined>,
) => AsyncGenerator<QueryPage, void, undefined>;

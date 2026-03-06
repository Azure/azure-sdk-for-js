// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PipelineTransform } from "../PipelineTransform.js";

/**
 * Composes multiple PipelineTransform functions into a single transform.
 * Transforms are applied left-to-right: the output of one becomes the input of the next.
 * @internal
 */
export function composeTransforms(...transforms: PipelineTransform[]): PipelineTransform {
  return (source) => transforms.reduce((stream, transform) => transform(stream), source);
}

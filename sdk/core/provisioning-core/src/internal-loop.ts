// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * We are hiding these loop APIs from the public npm surface temporarily, so move
 * the related APIs to this internal module. TODO: move them back to index.ts after
 * we are ready to expose them publicly again.
 *
 * Workspace-only loop APIs used to preserve coverage while loop authoring is
 * not part of the published npm surface.
 *
 * This module must not be added to `package.json#exports`.
 */
export {
  createLoopedResource,
  Loop,
  LoopedResource,
  type LoopContext,
  type LoopOptions,
} from "./constructs/resource/resource.js";
export { isLoopedResource, isLoopedResourceOf } from "./constructs/resource/resource-utils.js";
export { addLoopedResource, getLoopedResources } from "./constructs/stack.js";

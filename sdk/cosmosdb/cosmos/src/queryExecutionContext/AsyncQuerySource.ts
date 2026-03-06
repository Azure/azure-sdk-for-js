// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { QueryPage } from "./QueryPage.js";

/**
 * Type alias for the internal execution primitive.
 * An AsyncGenerator that yields QueryPage objects.
 *
 * Used as the return type of `ExecutionContext.pages()` and as
 * the input/output type of {@link PipelineTransform} functions.
 * @internal
 */
export type AsyncQuerySource = AsyncGenerator<QueryPage, void, undefined>;

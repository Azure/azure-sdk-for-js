// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { FormDataMap } from "./interfaces.js";

/**
 * Browser and React Native runtimes handle FormData natively,
 * so no conversion from FormData to FormDataMap is needed.
 *
 * @internal
 */
export function convertBodyToFormDataMap(_body: unknown): FormDataMap | undefined {
  return undefined;
}

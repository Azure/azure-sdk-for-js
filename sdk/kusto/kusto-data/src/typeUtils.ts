// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export type KeyOfType<T, V> = keyof {
  [P in keyof T as T[P] extends V ? P : never]: unknown;
};

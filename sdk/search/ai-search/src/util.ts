// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export type SomeRequired<T, K extends keyof T> = {
  [P in K]-?: T[P];
};

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Shim for Omit added in TypeScript 3.5
export type VerboseOmit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

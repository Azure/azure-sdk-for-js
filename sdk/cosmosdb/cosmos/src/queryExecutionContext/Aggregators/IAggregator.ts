/** @hidden */
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
export interface IAggregator<T> {
  aggregate: (other: T) => void;
  getResult: () => number;
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/** @hidden */
export interface IAggregator {
  aggregate: (other: any) => void;
  getResult: () => number;
}

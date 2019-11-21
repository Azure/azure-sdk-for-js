// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

// d.ts shims provide types for things we use internally but are not part
// of this package's surface area.

interface AbortSignal {
  readonly aborted: boolean;
  addEventListener(
    type: "abort",
    listener: (this: AbortSignal, ev: any) => any,
    options?: any
  ): void;
  removeEventListener(
    type: "abort",
    listener: (this: AbortSignal, ev: any) => any,
    options?: any
  ): void;
}

interface RequestInit {}

interface RequestInfo {}

interface Response {}

interface Headers {}

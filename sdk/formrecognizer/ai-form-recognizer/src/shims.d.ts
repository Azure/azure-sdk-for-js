// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint  @typescript-eslint/no-empty-interface: 0 */

// d.ts shims provide types for things we use internally but are not part
// of this package's surface area.

interface RequestInit {}

interface RequestInfo {}

interface Response {}

interface Headers {}

interface FileReader {
  onloadend: ((this: FileReader, ev: any) => any) | null;
  readonly result: string | ArrayBuffer | null;
  readAsArrayBuffer(blob: Blob): void;
}

declare var FileReader: {
  prototype: FileReader;
  new (): FileReader;
  readonly DONE: number;
  readonly EMPTY: number;
  readonly LOADING: number;
};

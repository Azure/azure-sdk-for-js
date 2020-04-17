// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint  @typescript-eslint/no-empty-interface: 0 */

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

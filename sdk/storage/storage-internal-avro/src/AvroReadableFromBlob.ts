// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AvroReadable, AvroReadableReadOptions } from "./AvroReadable";
import { AbortError } from "@azure/abort-controller";

const ABORT_ERROR = new AbortError("Reading from the avro blob was aborted.");

export class AvroReadableFromBlob extends AvroReadable {
  private _position: number;
  private _blob: Blob;

  constructor(blob: Blob) {
    super();
    this._blob = blob;
    this._position = 0;
  }

  public get position(): number {
    return this._position;
  }

  public async read(size: number, options: AvroReadableReadOptions = {}): Promise<Uint8Array> {
    size = Math.min(size, this._blob.size - this._position);
    if (size <= 0) {
      return new Uint8Array();
    }

    const fileReader = new FileReader();
    return new Promise<Uint8Array>((resolve, reject) => {

      function cleanUp(): void {
        if (options.abortSignal) {
          options.abortSignal!.removeEventListener("abort", abortHandler);
        }
      }

      function abortHandler(): void {
        fileReader.abort();
        cleanUp();
        reject(ABORT_ERROR);
      }

      if (options.abortSignal) {
        options.abortSignal.addEventListener("abort", abortHandler);
      }

      fileReader.onloadend = (ev: any) => {
        cleanUp();
        resolve(new Uint8Array(ev.target!.result));
      };

      fileReader.onerror = () => {
        cleanUp();
        reject();
      };

      fileReader.readAsArrayBuffer(this._blob.slice(this._position, (this._position += size)));
    });
  }
}

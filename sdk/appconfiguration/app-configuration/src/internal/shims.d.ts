// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// d.ts shims provide types for things we use internally but are not part
// of @azure/app-configuration's surface area.

interface Window {
  readonly crypto: Crypto;
}

declare let window: Window;

declare var TextEncoder: {
  prototype: TextEncoder;
  new (): TextEncoder;
};

interface TextEncoder {
  encode(input?: string): Uint8Array;
}

interface SubtleCrypto {
  digest(
    algorithm: string,
    data:
      | Int8Array
      | Int16Array
      | Int32Array
      | Uint8Array
      | Uint16Array
      | Uint32Array
      | Uint8ClampedArray
      | Float32Array
      | Float64Array
      | DataView
      | ArrayBuffer
  ): PromiseLike<ArrayBuffer>;
  importKey(
    format: "raw",
    keyData: Uint8Array,
    algorithm: HmacImportParams,
    extractable: boolean,
    keyUsages: string[]
  ): PromiseLike<CryptoKey>;
  sign(
    algorithm: "HMAC",
    key: CryptoKey,
    data:
      | Int8Array
      | Int16Array
      | Int32Array
      | Uint8Array
      | Uint16Array
      | Uint32Array
      | Uint8ClampedArray
      | Float32Array
      | Float64Array
      | DataView
      | ArrayBuffer
  ): PromiseLike<ArrayBuffer>;
}

interface HmacImportParams {
  name: "HMAC";
  hash: "SHA-256";
}

interface CryptoKey {}

interface Crypto {
  readonly subtle: SubtleCrypto;
}

declare var Crypto: {
  prototype: Crypto;
  new (): Crypto;
};

declare function atob(data: string): string;
declare function btoa(data: string): string;

interface ArrayBufferTypes {
  ArrayBuffer: ArrayBuffer;
}

interface ArrayBufferConstructor {
  readonly prototype: ArrayBuffer;
  new (byteLength: number): ArrayBuffer;
  isView(arg: any): arg is ArrayBufferView;
}
declare var ArrayBuffer: ArrayBufferConstructor;

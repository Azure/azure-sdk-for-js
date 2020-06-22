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

interface StringConstructor {
  new (value?: any): String;
  fromCharCode(...codes: number[]): string;
}

/**
 * Allows manipulation and formatting of text strings and determination and location of substrings within strings.
 */
declare var String: StringConstructor;

interface Uint8Array {
  [Symbol.iterator](): IterableIterator<number>;
}

interface Uint8ArrayConstructor {
  new (elements: Iterable<number>): Uint8Array;

  /**
   * Creates an array from an array-like or iterable object.
   * @param arrayLike An array-like or iterable object to convert to an array.
   * @param mapfn A mapping function to call on every element of the array.
   * @param thisArg Value of 'this' used to invoke the mapfn.
   */
  from(
    arrayLike: Iterable<number>,
    mapfn?: (v: number, k: number) => number,
    thisArg?: any
  ): Uint8Array;
}

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

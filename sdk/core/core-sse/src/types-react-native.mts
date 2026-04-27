// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Stubs for web APIs that are available at runtime in React Native
// but not provided by TypeScript's type system without DOM lib.
declare global {
  interface ReadableStream<R = any> {
    cancel(reason?: any): Promise<void>;
    getReader(): ReadableStreamDefaultReader<R>;
    tee(): [ReadableStream<R>, ReadableStream<R>];
  }
  // eslint-disable-next-line no-var
  var ReadableStream: {
    prototype: ReadableStream;
    new <R = any>(underlyingSource?: any, strategy?: any): ReadableStream<R>;
  };
  interface ReadableStreamDefaultReader<R = any> {
    read(): Promise<ReadableStreamReadValueResult<R> | ReadableStreamReadDoneResult<R>>;
    cancel(reason?: any): Promise<void>;
    releaseLock(): void;
  }
  interface ReadableStreamReadValueResult<T> {
    done: false;
    value: T;
  }
  interface ReadableStreamReadDoneResult<T> {
    done: true;
    value: T | undefined;
  }
  interface ReadableStreamDefaultController<R = any> {
    enqueue(chunk: R): void;
    close(): void;
  }
  interface TextDecoder {
    decode(input?: ArrayBufferView | ArrayBuffer, options?: any): string;
  }
  // eslint-disable-next-line no-var
  var TextDecoder: {
    prototype: TextDecoder;
    new (label?: string, options?: any): TextDecoder;
  };
}

/**
 * An alias for Node.js's `http.IncomingMessage` type. Defined as `never` on
 * browser and React Native platforms where Node.js HTTP is not available.
 */
export type NodeIncomingMessage = never;

/**
 * `NodeJSReadableStream` is not available in the browser or React Native.
 */
export type NodeJSReadableStream = never;

/**
 * No-op in browser/React Native — Node streams are not available.
 */
export function cancelNodeStream(_stream: never): void {
  // unreachable
}

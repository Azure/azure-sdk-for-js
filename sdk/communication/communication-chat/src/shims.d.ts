// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// d.ts shims provide types for things we use internally but are not part
// of this package's surface area.

// Shim for DOM's navigator's product status
// interface Navigator {
//     readonly product: string;
// }
// declare let navigator: Navigator;

// interface Blob {
//   /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Blob/size) */
//   readonly size: number;
//   /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Blob/type) */
//   readonly type: string;
//   /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Blob/arrayBuffer) */
//   arrayBuffer(): Promise<ArrayBuffer>;
//   /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Blob/slice) */
//   slice(start?: number, end?: number, contentType?: string): Blob;
//   /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Blob/stream) */
//   stream(): ReadableStream<Uint8Array>;
//   /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Blob/text) */
//   text(): Promise<string>;
// }

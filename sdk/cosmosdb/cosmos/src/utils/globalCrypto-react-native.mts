// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// isomorphic-webcrypto provides a Web Crypto API polyfill for React Native.
// Custom type declarations in src/isomorphic-webcrypto.d.ts fix the
// broken types shipped with the package (TS2309).
import globalCrypto from "isomorphic-webcrypto";
export { globalCrypto };

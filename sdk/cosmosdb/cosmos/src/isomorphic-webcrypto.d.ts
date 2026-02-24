// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Custom type declaration to fix the broken types shipped with isomorphic-webcrypto.
// The original index.d.ts has both `export =` and `export default` which causes TS2309.
declare module "isomorphic-webcrypto" {
  interface WebCrypto extends Crypto {
    ensureSecure(): Promise<void>;
  }
  const crypto: WebCrypto;
  export default crypto;
}

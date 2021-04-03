// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CryptographyProvider, LocalCryptographyUnsupportedError } from "./models";

/**
 * The browser replacement of the AesCryptographyProvider. Since we do not
 * support local cryptography in the browser this replacement always returns false
 * for `supportsAlgorithm` and `supportsOperation` so that these methods should
 * never be called.
 */
export class AesCryptographyProvider implements CryptographyProvider {
  encrypt(): never {
    throw new LocalCryptographyUnsupportedError(
      "AES Local cryptography is not supported in the browser."
    );
  }
  decrypt(): never {
    throw new LocalCryptographyUnsupportedError(
      "AES Local cryptography is not supported in the browser."
    );
  }

  /**
   * Browser RSA provider does not support any algorithms or operations.
   */
  isSupported(): boolean {
    return false;
  }

  wrapKey(): never {
    throw new LocalCryptographyUnsupportedError(
      "AES Local cryptography is not supported in the browser."
    );
  }

  unwrapKey(): never {
    throw new LocalCryptographyUnsupportedError(
      "AES Local cryptography is not supported in the browser."
    );
  }

  sign(): never {
    throw new LocalCryptographyUnsupportedError(
      "AES Local cryptography is not supported in the browser."
    );
  }

  signData(): never {
    throw new LocalCryptographyUnsupportedError(
      "AES Local cryptography is not supported in the browser."
    );
  }

  verify(): never {
    throw new LocalCryptographyUnsupportedError(
      "AES Local cryptography is not supported in the browser."
    );
  }

  verifyData(): never {
    throw new LocalCryptographyUnsupportedError(
      "AES Local cryptography is not supported in the browser."
    );
  }
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CryptographyProvider, LocalCryptographyUnsupportedError } from "./models";

/**
 * The browser replacement of the RsaCryptographyProvider. Since we do not
 * support local cryptography in the browser this replacement always returns false
 * for `supportsAlgorithm` and `supportsOperation` so that these methods should
 * never be called.
 */
export class RsaCryptographyProvider implements CryptographyProvider {
  encrypt(): never {
    throw new LocalCryptographyUnsupportedError(
      "RSA Local cryptography is not supported in the browser."
    );
  }
  decrypt(): never {
    throw new LocalCryptographyUnsupportedError(
      "RSA Local cryptography is not supported in the browser."
    );
  }

  /**
   * Browser RSA Provider does not support any algorithms.
   */
  supportsAlgorithm(): boolean {
    return false;
  }

  /**
   * Browser RSA Provider does not support any operations.
   */
  supportsOperation(): boolean {
    return false;
  }

  wrapKey(): never {
    throw new LocalCryptographyUnsupportedError(
      "RSA Local cryptography is not supported in the browser."
    );
  }

  unwrapKey(): never {
    throw new LocalCryptographyUnsupportedError(
      "RSA Local cryptography is not supported in the browser."
    );
  }

  sign(): never {
    throw new LocalCryptographyUnsupportedError(
      "RSA Local cryptography is not supported in the browser."
    );
  }

  signData(): never {
    throw new LocalCryptographyUnsupportedError(
      "RSA Local cryptography is not supported in the browser."
    );
  }

  verify(): never {
    throw new LocalCryptographyUnsupportedError(
      "RSA Local cryptography is not supported in the browser."
    );
  }

  verifyData(): never {
    throw new LocalCryptographyUnsupportedError(
      "RSA Local cryptography is not supported in the browser."
    );
  }
}

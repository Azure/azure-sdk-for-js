// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { isObjectWithProperties } from "./typeGuards";

/**
 * Represents a certificate credential for authentication.
 */
export interface CertificateCredential {
  /**
   * Certificate used to authenticate
   */
  cert: string;
  /**
   * Certificate key
   */
  certKey: string;
}

/**
 * Tests an object to determine whether it implements CertificateCredential.
 *
 * @param credential - The assumed CertificateCredential to be tested.
 */
export function isCertificateCredential(credential: unknown): credential is CertificateCredential {
  return (
    isObjectWithProperties(credential, ["certKey", "cert"]) &&
    typeof credential.cert === "string" &&
    typeof credential.certKey === "string"
  );
}

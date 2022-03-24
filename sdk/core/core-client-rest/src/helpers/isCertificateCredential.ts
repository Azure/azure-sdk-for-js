// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { isObjectWithProperties } from "../typeGuards";
import { CertificateCredential } from "./clientCertificatePolicy";

/**
 * Tests an object to determine whether it implements CertificateCredential.
 *
 * @param credential - The assumed CertificateCredential to be tested.
 */
export function isCertificateCredential(credential: unknown): credential is CertificateCredential {
  return (
    isObjectWithProperties(credential, ["certKey", "cert"]) ||
    isObjectWithProperties(credential, ["pfx"])
  );
}

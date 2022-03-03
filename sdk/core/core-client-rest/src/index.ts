// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Azure Rest Core Client library for JavaScript
 * @packageDocumentation
 */

export {
  CertificateCredential,
  getClientCertificatePolicy,
} from "./helpers/clientCertificatePolicy";
export { isCertificateCredential } from "./helpers/isCertificateCredential";
export { createRestError } from "./restError";
export * from "./getClient";
export * from "./common";

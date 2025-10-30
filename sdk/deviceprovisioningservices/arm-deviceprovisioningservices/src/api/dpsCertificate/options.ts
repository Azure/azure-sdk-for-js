// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CertificatePurpose } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface DpsCertificateVerifyCertificateOptionalParams extends OperationOptions {
  /** Common Name for the certificate. */
  certificateName?: string;
  /** Raw data of certificate. */
  certificateRawBytes?: Uint8Array;
  /** Indicates if the certificate has been verified by owner of the private key. */
  certificateIsVerified?: boolean;
  /** Describe the purpose of the certificate. */
  certificatePurpose?: CertificatePurpose;
  /** Time the certificate is created. */
  certificateCreated?: Date;
  /** Certificate last updated time. */
  certificateLastUpdated?: Date;
  /** Indicates if the certificate contains private key. */
  certificateHasPrivateKey?: boolean;
  /** Random number generated to indicate Proof of Possession. */
  certificateNonce?: string;
}

/** Optional parameters. */
export interface DpsCertificateGenerateVerificationCodeOptionalParams extends OperationOptions {
  /** Common Name for the certificate. */
  certificateName?: string;
  /** Raw data of certificate. */
  certificateRawBytes?: Uint8Array;
  /** Indicates if the certificate has been verified by owner of the private key. */
  certificateIsVerified?: boolean;
  /** Description mentioning the purpose of the certificate. */
  certificatePurpose?: CertificatePurpose;
  /** Time the certificate is created. */
  certificateCreated?: Date;
  /** Certificate last updated time. */
  certificateLastUpdated?: Date;
  /** Indicates if the certificate contains private key. */
  certificateHasPrivateKey?: boolean;
  /** Random number generated to indicate Proof of Possession. */
  certificateNonce?: string;
}

/** Optional parameters. */
export interface DpsCertificateListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DpsCertificateDeleteOptionalParams extends OperationOptions {
  /** This is optional, and it is the Common Name of the certificate. */
  certificateName?: string;
  /** Raw data within the certificate. */
  certificateRawBytes?: Uint8Array;
  /** Indicates if certificate has been verified by owner of the private key. */
  certificateIsVerified?: boolean;
  /** A description that mentions the purpose of the certificate. */
  certificatePurpose?: CertificatePurpose;
  /** Time the certificate is created. */
  certificateCreated?: Date;
  /** Certificate last updated time. */
  certificateLastUpdated?: Date;
  /** Indicates if the certificate contains a private key. */
  certificateHasPrivateKey?: boolean;
  /** Random number generated to indicate Proof of Possession. */
  certificateNonce?: string;
}

/** Optional parameters. */
export interface DpsCertificateCreateOrUpdateOptionalParams extends OperationOptions {
  /** ETag of the certificate. This is required to update an existing certificate, and ignored while creating a brand new certificate. */
  ifMatch?: string;
}

/** Optional parameters. */
export interface DpsCertificateGetOptionalParams extends OperationOptions {
  /** ETag of the certificate. */
  ifMatch?: string;
}

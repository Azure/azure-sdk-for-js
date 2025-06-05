// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  GetSigningStatusParameters,
  GetSignRootCertificateParameters,
  ListExtendedKeyUsagesParameters,
  SignParameters,
} from "./parameters.js";
import type {
  GetSigningStatus200Response,
  GetSigningStatusDefaultResponse,
  GetSignRootCertificate200Response,
  GetSignRootCertificateDefaultResponse,
  ListExtendedKeyUsages200Response,
  ListExtendedKeyUsagesDefaultResponse,
  Sign202Response,
  SignDefaultResponse,
} from "./responses.js";
import type { Client, StreamableMethod } from "@azure-rest/core-client";

export interface GetSigningStatus {
  /** This status operation requires that a Sign request has been submitted and the operationId is known. */
  get(
    options?: GetSigningStatusParameters,
  ): StreamableMethod<GetSigningStatus200Response | GetSigningStatusDefaultResponse>;
}

export interface GetSignRootCertificate {
  /** The root certificate is generated as part of the initial account creation and it is used to sign the bits for the profile provided. */
  get(
    options?: GetSignRootCertificateParameters,
  ): StreamableMethod<GetSignRootCertificate200Response | GetSignRootCertificateDefaultResponse>;
}

export interface ListExtendedKeyUsages {
  /** The list of extended key usages are used to determine the purpose of the certificate usage as part of the signing operation. */
  get(
    options?: ListExtendedKeyUsagesParameters,
  ): StreamableMethod<ListExtendedKeyUsages200Response | ListExtendedKeyUsagesDefaultResponse>;
}

export interface Sign {
  /** Submit a sign operation under the created account and profile name provided. */
  post(options: SignParameters): StreamableMethod<Sign202Response | SignDefaultResponse>;
}

export interface Routes {
  /** Resource for '/codesigningaccounts/\{accountName\}/certificateprofiles/\{certificateProfile\}/sign/\{operationId\}' has methods for the following verbs: get */
  (
    path: "/codesigningaccounts/{accountName}/certificateprofiles/{certificateProfile}/sign/{operationId}",
    accountName: string,
    certificateProfile: string,
    operationId: string,
  ): GetSigningStatus;
  /** Resource for '/codesigningaccounts/\{accountName\}/certificateprofiles/\{certificateProfile\}/sign/rootcert' has methods for the following verbs: get */
  (
    path: "/codesigningaccounts/{accountName}/certificateprofiles/{certificateProfile}/sign/rootcert",
    accountName: string,
    certificateProfile: string,
  ): GetSignRootCertificate;
  /** Resource for '/codesigningaccounts/\{accountName\}/certificateprofiles/\{certificateProfile\}/sign/eku' has methods for the following verbs: get */
  (
    path: "/codesigningaccounts/{accountName}/certificateprofiles/{certificateProfile}/sign/eku",
    accountName: string,
    certificateProfile: string,
  ): ListExtendedKeyUsages;
  /** Resource for '/codesigningaccounts/\{accountName\}/certificateprofiles/\{certificateProfile\}:sign' has methods for the following verbs: post */
  (
    path: "/codesigningaccounts/{accountName}/certificateprofiles/{certificateProfile}:sign",
    accountName: string,
    certificateProfile: string,
  ): Sign;
}

export type TrustedSigningClient = Client & {
  path: Routes;
};

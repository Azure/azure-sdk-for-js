// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  GetCodeSigningStatusParameters,
  GetSignRootCertificateParameters,
  ListSignEkusParameters,
  SignParameters,
} from "./parameters";
import {
  GetCodeSigningStatus200Response,
  GetCodeSigningStatusDefaultResponse,
  GetSignRootCertificate200Response,
  GetSignRootCertificateDefaultResponse,
  ListSignEkus200Response,
  ListSignEkusDefaultResponse,
  Sign202Response,
  SignDefaultResponse,
} from "./responses";
import { Client, StreamableMethod } from "@azure-rest/core-client";

export interface GetCodeSigningStatus {
  /** This status operation requires that a Sign request has been submitted and the operationId is known. */
  get(
    options?: GetCodeSigningStatusParameters
  ): StreamableMethod<
    GetCodeSigningStatus200Response | GetCodeSigningStatusDefaultResponse
  >;
}

export interface GetSignRootCertificate {
  /** The root certificate is generated as part of the initial account creation and it is used to sign the bits for the profile provided. */
  get(
    options?: GetSignRootCertificateParameters
  ): StreamableMethod<
    GetSignRootCertificate200Response | GetSignRootCertificateDefaultResponse
  >;
}

export interface ListSignEkus {
  /** The list of extended key usages are used to determine the purpose of the certificate usage as part of the codesigning operation. */
  get(
    options?: ListSignEkusParameters
  ): StreamableMethod<ListSignEkus200Response | ListSignEkusDefaultResponse>;
}

export interface Sign {
  /** Submit a codesign operation under the created codesign account and profile name provided. */
  post(
    options?: SignParameters
  ): StreamableMethod<Sign202Response | SignDefaultResponse>;
}

export interface Routes {
  /** Resource for '/codesigningaccounts/\{codeSigningAccountName\}/certificateprofiles/\{certificateProfileName\}/sign/\{operationId\}' has methods for the following verbs: get */
  (
    path: "/codesigningaccounts/{codeSigningAccountName}/certificateprofiles/{certificateProfileName}/sign/{operationId}",
    operationId: string,
    codeSigningAccountName: string,
    certificateProfileName: string
  ): GetCodeSigningStatus;
  /** Resource for '/codesigningaccounts/\{codeSigningAccountName\}/certificateprofiles/\{certificateProfileName\}/sign/rootcert' has methods for the following verbs: get */
  (
    path: "/codesigningaccounts/{codeSigningAccountName}/certificateprofiles/{certificateProfileName}/sign/rootcert",
    codeSigningAccountName: string,
    certificateProfileName: string
  ): GetSignRootCertificate;
  /** Resource for '/codesigningaccounts/\{codeSigningAccountName\}/certificateprofiles/\{certificateProfileName\}/sign/eku' has methods for the following verbs: get */
  (
    path: "/codesigningaccounts/{codeSigningAccountName}/certificateprofiles/{certificateProfileName}/sign/eku",
    codeSigningAccountName: string,
    certificateProfileName: string
  ): ListSignEkus;
  /** Resource for '/codesigningaccounts/\{codeSigningAccountName\}/certificateprofiles/\{certificateProfileName\}:sign' has methods for the following verbs: post */
  (
    path: "/codesigningaccounts/{codeSigningAccountName}/certificateprofiles/{certificateProfileName}:sign",
    codeSigningAccountName: string,
    certificateProfileName: string
  ): Sign;
}

export type CodeSigningClient = Client & {
  path: Routes;
};

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RequestParameters } from "@azure-rest/core-client";
import { CodeSigningSubmissionOptions } from "./models";

export type GetCodeSigningStatusParameters = RequestParameters;
export type GetSignRootCertificateParameters = RequestParameters;
export type ListSignEkusParameters = RequestParameters;

export interface SignBodyParam {
  body?: CodeSigningSubmissionOptions;
}

export type SignParameters = SignBodyParam & RequestParameters;

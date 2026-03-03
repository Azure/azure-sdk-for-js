// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CertificateRegistrationManagementContext } from "../../api/certificateRegistrationManagementContext.js";
import {
  listAppServiceCertificateOrderDetectorResponse,
  getAppServiceCertificateOrderDetectorResponse,
} from "../../api/certificateOrdersDiagnostics/operations.js";
import type {
  CertificateOrdersDiagnosticsListAppServiceCertificateOrderDetectorResponseOptionalParams,
  CertificateOrdersDiagnosticsGetAppServiceCertificateOrderDetectorResponseOptionalParams,
} from "../../api/certificateOrdersDiagnostics/options.js";
import type { DetectorResponse } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a CertificateOrdersDiagnostics operations. */
export interface CertificateOrdersDiagnosticsOperations {
  /** Description for Microsoft.CertificateRegistration to get the list of detectors for this RP. */
  listAppServiceCertificateOrderDetectorResponse: (
    resourceGroupName: string,
    certificateOrderName: string,
    options?: CertificateOrdersDiagnosticsListAppServiceCertificateOrderDetectorResponseOptionalParams,
  ) => PagedAsyncIterableIterator<DetectorResponse>;
  /** Description for Microsoft.CertificateRegistration call to get a detector response from App Lens. */
  getAppServiceCertificateOrderDetectorResponse: (
    resourceGroupName: string,
    certificateOrderName: string,
    detectorName: string,
    options?: CertificateOrdersDiagnosticsGetAppServiceCertificateOrderDetectorResponseOptionalParams,
  ) => Promise<DetectorResponse>;
}

function _getCertificateOrdersDiagnostics(context: CertificateRegistrationManagementContext) {
  return {
    listAppServiceCertificateOrderDetectorResponse: (
      resourceGroupName: string,
      certificateOrderName: string,
      options?: CertificateOrdersDiagnosticsListAppServiceCertificateOrderDetectorResponseOptionalParams,
    ) =>
      listAppServiceCertificateOrderDetectorResponse(
        context,
        resourceGroupName,
        certificateOrderName,
        options,
      ),
    getAppServiceCertificateOrderDetectorResponse: (
      resourceGroupName: string,
      certificateOrderName: string,
      detectorName: string,
      options?: CertificateOrdersDiagnosticsGetAppServiceCertificateOrderDetectorResponseOptionalParams,
    ) =>
      getAppServiceCertificateOrderDetectorResponse(
        context,
        resourceGroupName,
        certificateOrderName,
        detectorName,
        options,
      ),
  };
}

export function _getCertificateOrdersDiagnosticsOperations(
  context: CertificateRegistrationManagementContext,
): CertificateOrdersDiagnosticsOperations {
  return {
    ..._getCertificateOrdersDiagnostics(context),
  };
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  CertificateRegistrationManagementContext,
  CertificateRegistrationManagementClientOptionalParams,
  createCertificateRegistrationManagement,
} from "./api/index.js";
import {
  AppServiceCertificateOrdersOperations,
  _getAppServiceCertificateOrdersOperations,
} from "./classic/appServiceCertificateOrders/index.js";
import {
  CertificateOrdersDiagnosticsOperations,
  _getCertificateOrdersDiagnosticsOperations,
} from "./classic/certificateOrdersDiagnostics/index.js";
import {
  CertificateRegistrationProviderOperations,
  _getCertificateRegistrationProviderOperations,
} from "./classic/certificateRegistrationProvider/index.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { CertificateRegistrationManagementClientOptionalParams } from "./api/certificateRegistrationManagementContext.js";

export class CertificateRegistrationManagementClient {
  private _client: CertificateRegistrationManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    credential: TokenCredential,
    options?: CertificateRegistrationManagementClientOptionalParams,
  );
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options?: CertificateRegistrationManagementClientOptionalParams,
  );
  constructor(
    credential: TokenCredential,
    subscriptionIdOrOptions?: string | CertificateRegistrationManagementClientOptionalParams,
    options?: CertificateRegistrationManagementClientOptionalParams,
  ) {
    let subscriptionId: string | undefined;

    if (typeof subscriptionIdOrOptions === "string") {
      subscriptionId = subscriptionIdOrOptions;
    } else if (typeof subscriptionIdOrOptions === "object") {
      options = subscriptionIdOrOptions;
    }

    options = options ?? {};
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createCertificateRegistrationManagement(credential, subscriptionId ?? "", {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.certificateRegistrationProvider = _getCertificateRegistrationProviderOperations(
      this._client,
    );
    this.certificateOrdersDiagnostics = _getCertificateOrdersDiagnosticsOperations(this._client);
    this.appServiceCertificateOrders = _getAppServiceCertificateOrdersOperations(this._client);
  }

  /** The operation groups for certificateRegistrationProvider */
  public readonly certificateRegistrationProvider: CertificateRegistrationProviderOperations;
  /** The operation groups for certificateOrdersDiagnostics */
  public readonly certificateOrdersDiagnostics: CertificateOrdersDiagnosticsOperations;
  /** The operation groups for appServiceCertificateOrders */
  public readonly appServiceCertificateOrders: AppServiceCertificateOrdersOperations;
}

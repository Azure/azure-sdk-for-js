// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  CommunicationServiceManagementContext,
  CommunicationServiceManagementClientOptionalParams,
  createCommunicationServiceManagement,
} from "./api/index.js";
import {
  CommunicationServicesOperations,
  _getCommunicationServicesOperations,
} from "./classic/communicationServices/index.js";
import { DomainsOperations, _getDomainsOperations } from "./classic/domains/index.js";
import {
  EmailServicesOperations,
  _getEmailServicesOperations,
} from "./classic/emailServices/index.js";
import { OperationsOperations, _getOperationsOperations } from "./classic/operations/index.js";
import {
  SenderUsernamesOperations,
  _getSenderUsernamesOperations,
} from "./classic/senderUsernames/index.js";
import {
  SmtpUsernamesOperations,
  _getSmtpUsernamesOperations,
} from "./classic/smtpUsernames/index.js";
import {
  SuppressionListAddressesOperations,
  _getSuppressionListAddressesOperations,
} from "./classic/suppressionListAddresses/index.js";
import {
  SuppressionListsOperations,
  _getSuppressionListsOperations,
} from "./classic/suppressionLists/index.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { CommunicationServiceManagementClientOptionalParams } from "./api/communicationServiceManagementContext.js";

export class CommunicationServiceManagementClient {
  private _client: CommunicationServiceManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** REST API for Email Services/Domains/SuppressionLists */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: CommunicationServiceManagementClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createCommunicationServiceManagement(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.suppressionListAddresses = _getSuppressionListAddressesOperations(this._client);
    this.suppressionLists = _getSuppressionListsOperations(this._client);
    this.smtpUsernames = _getSmtpUsernamesOperations(this._client);
    this.senderUsernames = _getSenderUsernamesOperations(this._client);
    this.emailServices = _getEmailServicesOperations(this._client);
    this.domains = _getDomainsOperations(this._client);
    this.communicationServices = _getCommunicationServicesOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for suppressionListAddresses */
  public readonly suppressionListAddresses: SuppressionListAddressesOperations;
  /** The operation groups for suppressionLists */
  public readonly suppressionLists: SuppressionListsOperations;
  /** The operation groups for smtpUsernames */
  public readonly smtpUsernames: SmtpUsernamesOperations;
  /** The operation groups for senderUsernames */
  public readonly senderUsernames: SenderUsernamesOperations;
  /** The operation groups for emailServices */
  public readonly emailServices: EmailServicesOperations;
  /** The operation groups for domains */
  public readonly domains: DomainsOperations;
  /** The operation groups for communicationServices */
  public readonly communicationServices: CommunicationServicesOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}

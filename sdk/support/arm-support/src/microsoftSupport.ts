// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  MicrosoftSupportContext,
  MicrosoftSupportOptionalParams,
  createMicrosoftSupport,
} from "./api/index.js";
import {
  ChatTranscriptsOperations,
  _getChatTranscriptsOperations,
} from "./classic/chatTranscripts/index.js";
import {
  ChatTranscriptsNoSubscriptionOperations,
  _getChatTranscriptsNoSubscriptionOperations,
} from "./classic/chatTranscriptsNoSubscription/index.js";
import {
  ClassifyProblemsOperations,
  _getClassifyProblemsOperations,
} from "./classic/classifyProblems/index.js";
import {
  ClassifyProblemsNoSubscriptionOperations,
  _getClassifyProblemsNoSubscriptionOperations,
} from "./classic/classifyProblemsNoSubscription/index.js";
import {
  ClassifyServicesOperations,
  _getClassifyServicesOperations,
} from "./classic/classifyServices/index.js";
import {
  ClassifyServicesNoSubscriptionOperations,
  _getClassifyServicesNoSubscriptionOperations,
} from "./classic/classifyServicesNoSubscription/index.js";
import {
  CommunicationsOperations,
  _getCommunicationsOperations,
} from "./classic/communications/index.js";
import {
  CommunicationsNoSubscriptionOperations,
  _getCommunicationsNoSubscriptionOperations,
} from "./classic/communicationsNoSubscription/index.js";
import {
  FileWorkspacesOperations,
  _getFileWorkspacesOperations,
} from "./classic/fileWorkspaces/index.js";
import {
  FileWorkspacesNoSubscriptionOperations,
  _getFileWorkspacesNoSubscriptionOperations,
} from "./classic/fileWorkspacesNoSubscription/index.js";
import { FilesOperations, _getFilesOperations } from "./classic/files/index.js";
import {
  FilesNoSubscriptionOperations,
  _getFilesNoSubscriptionOperations,
} from "./classic/filesNoSubscription/index.js";
import { OperationsOperations, _getOperationsOperations } from "./classic/operations/index.js";
import {
  ProblemClassificationsOperations,
  _getProblemClassificationsOperations,
} from "./classic/problemClassifications/index.js";
import { ServicesOperations, _getServicesOperations } from "./classic/services/index.js";
import {
  SupportTicketsOperations,
  _getSupportTicketsOperations,
} from "./classic/supportTickets/index.js";
import {
  SupportTicketsNoSubscriptionOperations,
  _getSupportTicketsNoSubscriptionOperations,
} from "./classic/supportTicketsNoSubscription/index.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { MicrosoftSupportOptionalParams } from "./api/microsoftSupportContext.js";

export class MicrosoftSupport {
  private _client: MicrosoftSupportContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(credential: TokenCredential, options?: MicrosoftSupportOptionalParams);
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options?: MicrosoftSupportOptionalParams,
  );
  /** Microsoft Azure Support Resource Provider. */
  constructor(
    credential: TokenCredential,
    subscriptionIdOrOptions?: string | MicrosoftSupportOptionalParams,
    options?: MicrosoftSupportOptionalParams,
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
    this._client = createMicrosoftSupport(credential, subscriptionId ?? "", {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.filesNoSubscription = _getFilesNoSubscriptionOperations(this._client);
    this.files = _getFilesOperations(this._client);
    this.fileWorkspacesNoSubscription = _getFileWorkspacesNoSubscriptionOperations(this._client);
    this.fileWorkspaces = _getFileWorkspacesOperations(this._client);
    this.chatTranscriptsNoSubscription = _getChatTranscriptsNoSubscriptionOperations(this._client);
    this.chatTranscripts = _getChatTranscriptsOperations(this._client);
    this.supportTicketsNoSubscription = _getSupportTicketsNoSubscriptionOperations(this._client);
    this.communicationsNoSubscription = _getCommunicationsNoSubscriptionOperations(this._client);
    this.supportTickets = _getSupportTicketsOperations(this._client);
    this.communications = _getCommunicationsOperations(this._client);
    this.problemClassifications = _getProblemClassificationsOperations(this._client);
    this.classifyProblemsNoSubscription = _getClassifyProblemsNoSubscriptionOperations(
      this._client,
    );
    this.classifyProblems = _getClassifyProblemsOperations(this._client);
    this.classifyServicesNoSubscription = _getClassifyServicesNoSubscriptionOperations(
      this._client,
    );
    this.classifyServices = _getClassifyServicesOperations(this._client);
    this.services = _getServicesOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for filesNoSubscription */
  public readonly filesNoSubscription: FilesNoSubscriptionOperations;
  /** The operation groups for files */
  public readonly files: FilesOperations;
  /** The operation groups for fileWorkspacesNoSubscription */
  public readonly fileWorkspacesNoSubscription: FileWorkspacesNoSubscriptionOperations;
  /** The operation groups for fileWorkspaces */
  public readonly fileWorkspaces: FileWorkspacesOperations;
  /** The operation groups for chatTranscriptsNoSubscription */
  public readonly chatTranscriptsNoSubscription: ChatTranscriptsNoSubscriptionOperations;
  /** The operation groups for chatTranscripts */
  public readonly chatTranscripts: ChatTranscriptsOperations;
  /** The operation groups for supportTicketsNoSubscription */
  public readonly supportTicketsNoSubscription: SupportTicketsNoSubscriptionOperations;
  /** The operation groups for communicationsNoSubscription */
  public readonly communicationsNoSubscription: CommunicationsNoSubscriptionOperations;
  /** The operation groups for supportTickets */
  public readonly supportTickets: SupportTicketsOperations;
  /** The operation groups for communications */
  public readonly communications: CommunicationsOperations;
  /** The operation groups for problemClassifications */
  public readonly problemClassifications: ProblemClassificationsOperations;
  /** The operation groups for classifyProblemsNoSubscription */
  public readonly classifyProblemsNoSubscription: ClassifyProblemsNoSubscriptionOperations;
  /** The operation groups for classifyProblems */
  public readonly classifyProblems: ClassifyProblemsOperations;
  /** The operation groups for classifyServicesNoSubscription */
  public readonly classifyServicesNoSubscription: ClassifyServicesNoSubscriptionOperations;
  /** The operation groups for classifyServices */
  public readonly classifyServices: ClassifyServicesOperations;
  /** The operation groups for services */
  public readonly services: ServicesOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  NotificationMessagesContext,
  NotificationMessagesClientOptionalParams,
  createNotificationMessages,
} from "./api/index.js";
import {
  NotificationContentUnion,
  SendMessageResult,
  ReadReceiptContent,
  DownloadMediaResponse,
} from "../models/models.js";
import { sendReadReceipt, downloadMedia, send } from "./api/operations.js";
import {
  SendReadReceiptOptionalParams,
  DownloadMediaOptionalParams,
  SendOptionalParams,
} from "./api/options.js";
import { KeyCredential, TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { NotificationMessagesClientOptionalParams } from "./api/notificationMessagesContext.js";

export class NotificationMessagesClient {
  private _client: NotificationMessagesContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    endpointParam: string,
    credential: TokenCredential | KeyCredential,
    options: NotificationMessagesClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createNotificationMessages(endpointParam, credential, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
  }

  /** Sends a read receipt update from Business to User. */
  sendReadReceipt(
    readReceiptContent: ReadReceiptContent,
    options: SendReadReceiptOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return sendReadReceipt(this._client, readReceiptContent, options);
  }

  /** Download the Media payload from a User to Business message. */
  downloadMedia(
    id: string,
    options: DownloadMediaOptionalParams = { requestOptions: {} },
  ): Promise<DownloadMediaResponse> {
    return downloadMedia(this._client, id, options);
  }

  /** Sends a notification message from Business to User. */
  send(
    body: NotificationContentUnion,
    options: SendOptionalParams = { requestOptions: {} },
  ): Promise<SendMessageResult> {
    return send(this._client, body, options);
  }
}

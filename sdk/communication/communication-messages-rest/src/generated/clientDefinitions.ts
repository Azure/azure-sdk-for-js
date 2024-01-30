// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  DownloadMediaParameters,
  SendParameters,
  ListTemplatesParameters,
} from "./parameters";
import {
  DownloadMedia200Response,
  DownloadMediaDefaultResponse,
  Send202Response,
  SendDefaultResponse,
  ListTemplates200Response,
  ListTemplatesDefaultResponse,
} from "./responses";
import { Client, StreamableMethod } from "@azure-rest/core-client";

export interface DownloadMedia {
  /** Download the Media payload from a User to Business message. */
  get(
    options?: DownloadMediaParameters,
  ): StreamableMethod<DownloadMedia200Response | DownloadMediaDefaultResponse>;
}

export interface Send {
  /** Sends a notification message from Business to User. */
  post(
    options?: SendParameters,
  ): StreamableMethod<Send202Response | SendDefaultResponse>;
}

export interface ListTemplates {
  /** List all templates for given ACS channel */
  get(
    options?: ListTemplatesParameters,
  ): StreamableMethod<ListTemplates200Response | ListTemplatesDefaultResponse>;
}

export interface Routes {
  /** Resource for '/messages/streams/\{id\}' has methods for the following verbs: get */
  (path: "/messages/streams/{id}", id: string): DownloadMedia;
  /** Resource for '/messages/notifications:send' has methods for the following verbs: post */
  (path: "/messages/notifications:send"): Send;
  /** Resource for '/messages/channels/\{channelId\}/templates' has methods for the following verbs: get */
  (
    path: "/messages/channels/{channelId}/templates",
    channelId: string,
  ): ListTemplates;
}

export type AzureCommunicationMessagesServiceClient = Client & {
  path: Routes;
};

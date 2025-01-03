// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  GetMediaParameters,
  SendParameters,
  ListTemplatesParameters,
} from "./parameters.js";
import {
  GetMedia200Response,
  GetMediaDefaultResponse,
  Send202Response,
  SendDefaultResponse,
  ListTemplates200Response,
  ListTemplatesDefaultResponse,
} from "./responses.js";
import { Client, StreamableMethod } from "@azure-rest/core-client";

export interface GetMedia {
  /** Download the Media payload from a User to Business message. */
  get(
    options?: GetMediaParameters,
  ): StreamableMethod<GetMedia200Response | GetMediaDefaultResponse>;
}

export interface Send {
  /** Sends a notification message from Business to User. */
  post(
    options: SendParameters,
  ): StreamableMethod<Send202Response | SendDefaultResponse>;
}

export interface ListTemplates {
  /** List all templates for given Azure Communication Services channel */
  get(
    options?: ListTemplatesParameters,
  ): StreamableMethod<ListTemplates200Response | ListTemplatesDefaultResponse>;
}

export interface Routes {
  /** Resource for '/messages/streams/\{id\}' has methods for the following verbs: get */
  (path: "/messages/streams/{id}", id: string): GetMedia;
  /** Resource for '/messages/notifications:send' has methods for the following verbs: post */
  (path: "/messages/notifications:send"): Send;
  /** Resource for '/messages/channels/\{channelId\}/templates' has methods for the following verbs: get */
  (
    path: "/messages/channels/{channelId}/templates",
    channelId: string,
  ): ListTemplates;
}

export type MessagesServiceClient = Client & {
  path: Routes;
};

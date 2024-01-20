// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptions } from "@azure-rest/core-client";

/**
 * Options to customize the a chat completion creation.
 */
export interface CompletionOptions extends OperationOptions {
  /**
   * Field that allows the chat app to store and retrieve data, the structure of such data is dependant on the backend
   * being used. The client must send back the data in this field unchanged in subsequent requests, until the chat app
   * sends a new one. The data in this field can be used to implement stateful services, such as remembering previous
   * conversations or user preferences.
   */
  sessionState?: any;
  /**
   * Context allows the chat app to receive extra parameters from the client, such as temperature, functions, or
   * customer_info. These parameters are specific to the chat app and not understood by the generic clients.
   */
  context?: Record<string, any>;
}

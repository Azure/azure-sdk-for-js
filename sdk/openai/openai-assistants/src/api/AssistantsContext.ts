// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * THIS IS AN AUTO-GENERATED FILE - DO NOT EDIT!
 *
 * Any changes you make here may be lost.
 *
 * If you need to make changes, please do so in the original source file, \{project-root\}/sources/custom
 */

import { TokenCredential, KeyCredential } from "@azure/core-auth";
import { ClientOptions } from "@azure-rest/core-client";
import { AssistantsContext } from "../rest/index.js";
import getClient from "../rest/index.js";

/** The details used to create a assistant client **/
export interface AssistantsClientOptions extends ClientOptions {}

export { AssistantsContext } from "../rest/index.js";

/** Azure OpenAI APIs for Assistants. */
export function createAssistants(
  endpoint: string,
  credential: KeyCredential | TokenCredential,
  options: AssistantsClientOptions = {},
): AssistantsContext {
  const clientContext = getClient(endpoint, credential, options);
  return clientContext;
}

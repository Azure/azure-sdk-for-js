// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ClientOptions } from "@azure-rest/core-client";
import { TokenCredential } from "@azure/core-auth";
import { AzureDevCenterClient } from "./generated/clientDefinitions";
import getClientInternal from "./generated/azureDevCenter";

/**
 * Initialize a new instance of the class AzureDevCenterClient class.
 * @param tenantId type: string The tenant to operate on.
 * @param devCenter type: string The DevCenter to operate on.
 * @param devCenterDnsSuffix type: string The DNS suffix used as the base for all devcenter requests.
 * @param credentials type: TokenCredential
 */
export default function createClient(
  tenantId: string,
  devCenter: string,
  credentials: TokenCredential,
  devCenterDnsSuffix: string = "devcenter.azure.com",
  options: ClientOptions = {}
): AzureDevCenterClient {
  return getClientInternal(tenantId, devCenter, devCenterDnsSuffix, credentials, options);
}

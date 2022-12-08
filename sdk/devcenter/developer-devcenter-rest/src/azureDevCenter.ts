// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ClientOptions } from "@azure-rest/core-client";
import { TokenCredential } from "@azure/core-auth";
import { AzureDevCenterClient } from "./generated/clientDefinitions";
import getClientInternal from "./generated/azureDevCenter";

const defaultDevCenterDnsSuffix = "devcenter.azure.com";

/**
 * Initialize a new instance of the class AzureDevCenterClient class.
 * @param tenantId type: string The tenant to operate on.
 * @param devCenter type: string The DevCenter to operate on.
 * @param credentials type: TokenCredential
 * @param options type: ClientOptions
 */
export default function createClient(
  tenantId: string,
  devCenter: string,
  credentials: TokenCredential,
  options?: ClientOptions
): AzureDevCenterClient;

/**
 * Initialize a new instance of the class AzureDevCenterClient class.
 * @param tenantId type: string The tenant to operate on.
 * @param devCenter type: string The DevCenter to operate on.
 * @param credentials type: TokenCredential
 * @param devCenterDnsSuffix type: string The DNS suffix used as the base for all devcenter requests.
 * @param options type: ClientOptions
 */
export default function createClient(
  tenantId: string,
  devCenter: string,
  credentials: TokenCredential,
  devCenterDnsSuffix?: string,
  options?: ClientOptions
): AzureDevCenterClient;

/**
 * Initialize a new instance of the class AzureDevCenterClient class.
 * @param tenantId type: string The tenant to operate on.
 * @param devCenter type: string The DevCenter to operate on.
 * @param credentials type: TokenCredential
 * @param devCenterDnsSuffixOrOptions type: string | ClientOptions Either the DNS suffix used as the base for all devcenter requests or client options.
 * @param options type: ClientOptions
 */
export default function createClient(
  tenantId: string,
  devCenter: string,
  credentials: TokenCredential,
  devCenterDnsSuffixOrOptions: string | ClientOptions = defaultDevCenterDnsSuffix,
  options?: ClientOptions
): AzureDevCenterClient {
  const devCenterDnsSuffix =
    typeof devCenterDnsSuffixOrOptions === "string"
      ? devCenterDnsSuffixOrOptions
      : defaultDevCenterDnsSuffix;
  const internalOptions =
    typeof devCenterDnsSuffixOrOptions === "string" ? options : devCenterDnsSuffixOrOptions;

  return getClientInternal(tenantId, devCenter, devCenterDnsSuffix, credentials, internalOptions);
}

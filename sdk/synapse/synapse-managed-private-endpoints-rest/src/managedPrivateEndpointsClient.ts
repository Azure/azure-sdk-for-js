// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  GetParameters,
  CreateParameters,
  DeleteParameters,
  ListParameters
} from "./parameters";
import {
  Get200Response,
  Create200Response,
  Delete202Response,
  Delete204Response,
  List200Response
} from "./responses";
import { getClient, ClientOptions, Client } from "@azure-rest/core-client";
import { TokenCredential } from "@azure/core-auth";

export interface Get {
  /** Get Managed Private Endpoints */
  get(options?: GetParameters): Promise<Get200Response>;
  /** Create Managed Private Endpoints */
  put(options: CreateParameters): Promise<Create200Response>;
  /** Delete Managed Private Endpoints */
  delete(
    options?: DeleteParameters
  ): Promise<Delete202Response | Delete204Response>;
}

export interface List {
  /** List Managed Private Endpoints */
  get(options?: ListParameters): Promise<List200Response>;
}

export interface Routes {
  /** Resource for '/managedVirtualNetworks/\{managedVirtualNetworkName\}/managedPrivateEndpoints/\{managedPrivateEndpointName\}' has methods for the following verbs: get, put, delete */
  (
    path: "/managedVirtualNetworks/{managedVirtualNetworkName}/managedPrivateEndpoints/{managedPrivateEndpointName}",
    managedVirtualNetworkName: string,
    managedPrivateEndpointName: string
  ): Get;
  /** Resource for '/managedVirtualNetworks/\{managedVirtualNetworkName\}/managedPrivateEndpoints' has methods for the following verbs: get */
  (
    path: "/managedVirtualNetworks/{managedVirtualNetworkName}/managedPrivateEndpoints",
    managedVirtualNetworkName: string
  ): List;
}

export type ManagedPrivateEndpointsClientRestClient = Client & {
  path: Routes;
};

export default function ManagedPrivateEndpointsClient(
  endpoint: string,
  credentials: TokenCredential,
  options: ClientOptions = {}
): ManagedPrivateEndpointsClientRestClient {
  const baseUrl = options.baseUrl ?? `${endpoint}`;
  options.apiVersion = options.apiVersion ?? "2019-06-01-preview";
  options = {
    ...options,
    credentials: {
      scopes: ["https://dev.azuresynapse.net/.default"]
    }
  };

  return getClient(
    baseUrl,
    credentials,
    options
  ) as ManagedPrivateEndpointsClientRestClient;
}

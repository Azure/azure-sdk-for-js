// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  GetTransparencyConfigCborParameters,
  GetPublicKeysParameters,
  CreateEntryParameters,
  GetOperationParameters,
  GetEntryParameters,
  GetEntryStatementParameters,
} from "./parameters.js";
import type {
  GetTransparencyConfigCbor200Response,
  GetTransparencyConfigCbor500Response,
  GetTransparencyConfigCbor503Response,
  GetPublicKeys200Response,
  GetPublicKeys400Response,
  GetPublicKeys404Response,
  GetPublicKeys429Response,
  GetPublicKeys500Response,
  GetPublicKeys503Response,
  CreateEntry201Response,
  CreateEntry202Response,
  CreateEntry400Response,
  CreateEntry404Response,
  CreateEntry429Response,
  CreateEntry500Response,
  CreateEntry503Response,
  GetOperation200Response,
  GetOperation202Response,
  GetOperation400Response,
  GetOperation404Response,
  GetOperation429Response,
  GetOperation500Response,
  GetOperation503Response,
  GetEntry200Response,
  GetEntry400Response,
  GetEntry404Response,
  GetEntry429Response,
  GetEntry500Response,
  GetEntry503Response,
  GetEntryStatement200Response,
  GetEntryStatement400Response,
  GetEntryStatement404Response,
  GetEntryStatement429Response,
  GetEntryStatement500Response,
  GetEntryStatement503Response,
} from "./responses.js";
import type { Client, StreamableMethod } from "@azure-rest/core-client";

export interface GetTransparencyConfigCbor {
  /** Get the transparency service configuration, mandatory in IETF SCITT draft */
  get(
    options: GetTransparencyConfigCborParameters,
  ): StreamableMethod<
    | GetTransparencyConfigCbor200Response
    | GetTransparencyConfigCbor500Response
    | GetTransparencyConfigCbor503Response
  >;
}

export interface GetPublicKeys {
  /** Get the public keys used by the service to sign receipts, mentioned in IETF SCITT draft as part of jwks_uri implementation */
  get(
    options?: GetPublicKeysParameters,
  ): StreamableMethod<
    | GetPublicKeys200Response
    | GetPublicKeys400Response
    | GetPublicKeys404Response
    | GetPublicKeys429Response
    | GetPublicKeys500Response
    | GetPublicKeys503Response
  >;
}

export interface CreateEntry {
  /** Post an entry to be registered on the CodeTransparency instance, mandatory in IETF SCITT draft */
  post(
    options: CreateEntryParameters,
  ): StreamableMethod<
    | CreateEntry201Response
    | CreateEntry202Response
    | CreateEntry400Response
    | CreateEntry404Response
    | CreateEntry429Response
    | CreateEntry500Response
    | CreateEntry503Response
  >;
}

export interface GetOperation {
  /** Get status of the long running registration operation, mandatory in IETF SCITT draft */
  get(
    options: GetOperationParameters,
  ): StreamableMethod<
    | GetOperation200Response
    | GetOperation202Response
    | GetOperation400Response
    | GetOperation404Response
    | GetOperation429Response
    | GetOperation500Response
    | GetOperation503Response
  >;
}

export interface GetEntry {
  /** Get receipt */
  get(
    options: GetEntryParameters,
  ): StreamableMethod<
    | GetEntry200Response
    | GetEntry400Response
    | GetEntry404Response
    | GetEntry429Response
    | GetEntry500Response
    | GetEntry503Response
  >;
}

export interface GetEntryStatement {
  /** Get the transparent statement consisting of the signed statement and the receipt embedded in the header */
  get(
    options: GetEntryStatementParameters,
  ): StreamableMethod<
    | GetEntryStatement200Response
    | GetEntryStatement400Response
    | GetEntryStatement404Response
    | GetEntryStatement429Response
    | GetEntryStatement500Response
    | GetEntryStatement503Response
  >;
}

export interface Routes {
  /** Resource for '/.well-known/transparency-configuration' has methods for the following verbs: get */
  (path: "/.well-known/transparency-configuration"): GetTransparencyConfigCbor;
  /** Resource for '/jwks' has methods for the following verbs: get */
  (path: "/jwks"): GetPublicKeys;
  /** Resource for '/entries' has methods for the following verbs: post */
  (path: "/entries"): CreateEntry;
  /** Resource for '/operations/\{operationId\}' has methods for the following verbs: get */
  (path: "/operations/{operationId}", operationId: string): GetOperation;
  /** Resource for '/entries/\{entryId\}' has methods for the following verbs: get */
  (path: "/entries/{entryId}", entryId: string): GetEntry;
  /** Resource for '/entries/\{entryId\}/statement' has methods for the following verbs: get */
  (path: "/entries/{entryId}/statement", entryId: string): GetEntryStatement;
}

export type CodeTransparencyClient = Client & {
  path: Routes;
};

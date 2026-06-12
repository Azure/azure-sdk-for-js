// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  GetTransparencyConfigCborParameters,
  GetPublicKeysParameters,
  ListScittKeysParameters,
  GetScittKeyParameters,
  CreateEntryV09Parameters,
  GetOperationV09Parameters,
  GetEntryV09Parameters,
  GetEntryStatementV09Parameters,
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
  ListScittKeys200Response,
  ListScittKeys400Response,
  ListScittKeys401Response,
  ListScittKeys404Response,
  ListScittKeys429Response,
  ListScittKeys500Response,
  ListScittKeys503Response,
  GetScittKey200Response,
  GetScittKey400Response,
  GetScittKey401Response,
  GetScittKey404Response,
  GetScittKey429Response,
  GetScittKey500Response,
  GetScittKey503Response,
  CreateEntryV09201Response,
  CreateEntryV09303Response,
  CreateEntryV09400Response,
  CreateEntryV09401Response,
  CreateEntryV09404Response,
  CreateEntryV09429Response,
  CreateEntryV09500Response,
  CreateEntryV09503Response,
  GetOperationV09200Response,
  GetOperationV09202Response,
  GetOperationV09400Response,
  GetOperationV09401Response,
  GetOperationV09404Response,
  GetOperationV09429Response,
  GetOperationV09500Response,
  GetOperationV09503Response,
  GetEntryV09200Response,
  GetEntryV09302Response,
  GetEntryV09400Response,
  GetEntryV09401Response,
  GetEntryV09404Response,
  GetEntryV09429Response,
  GetEntryV09500Response,
  GetEntryV09503Response,
  GetEntryStatementV09200Response,
  GetEntryStatementV09400Response,
  GetEntryStatementV09401Response,
  GetEntryStatementV09404Response,
  GetEntryStatementV09429Response,
  GetEntryStatementV09500Response,
  GetEntryStatementV09503Response,
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

export interface ListScittKeys {
  /** List all service keys in COSE_Key_Set format, per Section 2.1 of draft-ietf-scitt-scrapi-09 */
  get(
    options: ListScittKeysParameters,
  ): StreamableMethod<
    | ListScittKeys200Response
    | ListScittKeys400Response
    | ListScittKeys401Response
    | ListScittKeys404Response
    | ListScittKeys429Response
    | ListScittKeys500Response
    | ListScittKeys503Response
  >;
}

export interface GetScittKey {
  /** Get a single service key by kid, per Section 2.2 of draft-ietf-scitt-scrapi-09 */
  get(
    options: GetScittKeyParameters,
  ): StreamableMethod<
    | GetScittKey200Response
    | GetScittKey400Response
    | GetScittKey401Response
    | GetScittKey404Response
    | GetScittKey429Response
    | GetScittKey500Response
    | GetScittKey503Response
  >;
}

export interface CreateEntryV09 {
  /** Post an entry to be registered on the CodeTransparency instance, mandatory in IETF SCITT draft */
  post(
    options: CreateEntryV09Parameters,
  ): StreamableMethod<
    | CreateEntryV09201Response
    | CreateEntryV09303Response
    | CreateEntryV09400Response
    | CreateEntryV09401Response
    | CreateEntryV09404Response
    | CreateEntryV09429Response
    | CreateEntryV09500Response
    | CreateEntryV09503Response
  >;
}

export interface GetOperationV09 {
  /** Get status of the long running registration operation. Deprecated in SCRAPI v09 but retained unchanged for backward compatibility; clients should poll /entries/{entryId} directly. */
  get(
    options: GetOperationV09Parameters,
  ): StreamableMethod<
    | GetOperationV09200Response
    | GetOperationV09202Response
    | GetOperationV09400Response
    | GetOperationV09401Response
    | GetOperationV09404Response
    | GetOperationV09429Response
    | GetOperationV09500Response
    | GetOperationV09503Response
  >;
}

export interface GetEntryV09 {
  /** Get receipt */
  get(
    options: GetEntryV09Parameters,
  ): StreamableMethod<
    | GetEntryV09200Response
    | GetEntryV09302Response
    | GetEntryV09400Response
    | GetEntryV09401Response
    | GetEntryV09404Response
    | GetEntryV09429Response
    | GetEntryV09500Response
    | GetEntryV09503Response
  >;
}

export interface GetEntryStatementV09 {
  /** Get the transparent statement consisting of the signed statement and the receipt embedded in the header */
  get(
    options: GetEntryStatementV09Parameters,
  ): StreamableMethod<
    | GetEntryStatementV09200Response
    | GetEntryStatementV09400Response
    | GetEntryStatementV09401Response
    | GetEntryStatementV09404Response
    | GetEntryStatementV09429Response
    | GetEntryStatementV09500Response
    | GetEntryStatementV09503Response
  >;
}

export interface Routes {
  /** Resource for '/.well-known/transparency-configuration' has methods for the following verbs: get */
  (path: "/.well-known/transparency-configuration"): GetTransparencyConfigCbor;
  /** Resource for '/jwks' has methods for the following verbs: get */
  (path: "/jwks"): GetPublicKeys;
  /** Resource for '/.well-known/scitt-keys' has methods for the following verbs: get */
  (path: "/.well-known/scitt-keys"): ListScittKeys;
  /** Resource for '/.well-known/scitt-keys/\{kid\}' has methods for the following verbs: get */
  (path: "/.well-known/scitt-keys/{kid}", kid: string): GetScittKey;
  /** Resource for '/entries' has methods for the following verbs: post */
  (path: "/entries"): CreateEntryV09;
  /** Resource for '/operations/\{operationId\}' has methods for the following verbs: get */
  (path: "/operations/{operationId}", operationId: string): GetOperationV09;
  /** Resource for '/entries/\{entryId\}' has methods for the following verbs: get */
  (path: "/entries/{entryId}", entryId: string): GetEntryV09;
  /** Resource for '/entries/\{entryId\}/statement' has methods for the following verbs: get */
  (path: "/entries/{entryId}/statement", entryId: string): GetEntryStatementV09;
}

export type CodeTransparencyClient = Client & {
  path: Routes;
};

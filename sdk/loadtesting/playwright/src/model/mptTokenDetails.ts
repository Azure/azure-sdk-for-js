// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export class MPTTokenDetails {
  // accountId
  aid: string | undefined;
  // userId
  oid: string | undefined;
  // tokenId
  id: string | undefined;
  // userName
  userName: string | undefined;
}

export enum TokenType {
  MPT,
  ENTRA,
}

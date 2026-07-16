// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface DeleteUserOptionalParams extends OperationOptions {
  /** The request should only proceed if an entity matches this string. */
  ifMatch?: string;
  /** The request should only proceed if no entity matches this string. */
  ifNoneMatch?: string;
}

/** Optional parameters. */
export interface CreateOrReplaceUserOptionalParams extends OperationOptions {
  /** The request should only proceed if an entity matches this string. */
  ifMatch?: string;
  /** The request should only proceed if no entity matches this string. */
  ifNoneMatch?: string;
}

/** Optional parameters. */
export interface GetUserOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DeleteRoomMemberOptionalParams extends OperationOptions {
  /** The request should only proceed if an entity matches this string. */
  ifMatch?: string;
  /** The request should only proceed if no entity matches this string. */
  ifNoneMatch?: string;
}

/** Optional parameters. */
export interface CreateOrReplaceRoomMemberOptionalParams extends OperationOptions {
  /** The request should only proceed if an entity matches this string. */
  ifMatch?: string;
  /** The request should only proceed if no entity matches this string. */
  ifNoneMatch?: string;
}

/** Optional parameters. */
export interface ListRoomMembersOptionalParams extends OperationOptions {
  /** The maximum number of result items per page. */
  maxpagesize?: number;
  /** Continuation token for pagination. */
  continuationToken?: string;
}

/** Optional parameters. */
export interface DeleteRoomOptionalParams extends OperationOptions {
  /** The request should only proceed if an entity matches this string. */
  ifMatch?: string;
  /** The request should only proceed if no entity matches this string. */
  ifNoneMatch?: string;
}

/** Optional parameters. */
export interface GetRoomOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CreateOrReplaceRoomOptionalParams extends OperationOptions {
  /** The request should only proceed if an entity matches this string. */
  ifMatch?: string;
  /** The request should only proceed if no entity matches this string. */
  ifNoneMatch?: string;
}

/** Optional parameters. */
export interface DeleteRoleOptionalParams extends OperationOptions {
  /** The request should only proceed if an entity matches this string. */
  ifMatch?: string;
  /** The request should only proceed if no entity matches this string. */
  ifNoneMatch?: string;
}

/** Optional parameters. */
export interface CreateOrReplaceRoleOptionalParams extends OperationOptions {
  /** The request should only proceed if an entity matches this string. */
  ifMatch?: string;
  /** The request should only proceed if no entity matches this string. */
  ifNoneMatch?: string;
}

/** Optional parameters. */
export interface GetRoleOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ListRolesOptionalParams extends OperationOptions {
  /** The maximum number of result items per page. */
  maxpagesize?: number;
  /** Continuation token for pagination. */
  continuationToken?: string;
}

/** Optional parameters. */
export interface UpdateMessageOptionalParams extends OperationOptions {
  /** The request should only proceed if an entity matches this string. */
  ifMatch?: string;
  /** The request should only proceed if no entity matches this string. */
  ifNoneMatch?: string;
}

/** Optional parameters. */
export interface DeleteMessageOptionalParams extends OperationOptions {
  /** The request should only proceed if an entity matches this string. */
  ifMatch?: string;
  /** The request should only proceed if no entity matches this string. */
  ifNoneMatch?: string;
}

/** Optional parameters. */
export interface ListMessagesOptionalParams extends OperationOptions {
  /** Latest message ID (exclusive) for pagination. */
  latestMessageId?: string;
  /** Earliest message ID (exclusive) for pagination. */
  earliestMessageId?: string;
  /** The maximum number of result items per page. */
  maxpagesize?: number;
}

/** Optional parameters. */
export interface GetConversationOptionalParams extends OperationOptions {}

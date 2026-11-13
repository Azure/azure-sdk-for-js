// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface GenerateClientTokenOptionalParams extends OperationOptions {
  /** User identifier for the client connection. */
  userId?: string;
  /** Roles granted to the client connection. */
  role?: string[];
  /** Lifetime of the generated token, in minutes. */
  minutesToExpire?: number;
}

/** Optional parameters. */
export interface ListRoomsForUserOptionalParams extends OperationOptions {
  /** The maximum number of result items per page. */
  maxPageSize?: number;
  /** Continuation token for pagination. */
  continuationToken?: string;
}

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
export interface ListUsersOptionalParams extends OperationOptions {
  /** The maximum number of result items per page. */
  maxPageSize?: number;
  /** Continuation token for pagination. */
  continuationToken?: string;
}

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
  maxPageSize?: number;
  /** Continuation token for pagination. */
  continuationToken?: string;
}

/** Optional parameters. */
export interface DeleteTopicOptionalParams extends OperationOptions {
  /** The request should only proceed if an entity matches this string. */
  ifMatch?: string;
  /** The request should only proceed if no entity matches this string. */
  ifNoneMatch?: string;
}

/** Optional parameters. */
export interface UpdateTopicOptionalParams extends OperationOptions {
  /** The request should only proceed if an entity matches this string. */
  ifMatch?: string;
  /** The request should only proceed if no entity matches this string. */
  ifNoneMatch?: string;
}

/** Optional parameters. */
export interface GetTopicOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CreateOrReplaceTopicOptionalParams extends OperationOptions {
  /** The request should only proceed if an entity matches this string. */
  ifMatch?: string;
  /** The request should only proceed if no entity matches this string. */
  ifNoneMatch?: string;
}

/** Optional parameters. */
export interface ListTopicsOptionalParams extends OperationOptions {
  /** The maximum number of result items per page. */
  maxPageSize?: number;
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
export interface ListRoomsOptionalParams extends OperationOptions {
  /** The maximum number of result items per page. */
  maxPageSize?: number;
  /** Continuation token for pagination. */
  continuationToken?: string;
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
  maxPageSize?: number;
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
  maxPageSize?: number;
}

/** Optional parameters. */
export interface GetConversationOptionalParams extends OperationOptions {}

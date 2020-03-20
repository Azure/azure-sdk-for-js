import * as coreHttp from "@azure/core-http";

/** Optional parameters. */
export interface WebPubSubApiBroadcast$binaryOptionalParams
  extends coreHttp.OperationOptions {
  /** Target hub name, which should start with alphabetic characters and only contain alpha-numeric characters or underscore. When it is not set, it uses the default hub */
  hub?: string;
  /** Excluded connection Ids */
  excluded?: string[];
}

/** Optional parameters. */
export interface WebPubSubApiBroadcast$textOptionalParams
  extends coreHttp.OperationOptions {
  /** Target hub name, which should start with alphabetic characters and only contain alpha-numeric characters or underscore. When it is not set, it uses the default hub */
  hub?: string;
  /** Excluded connection Ids */
  excluded?: string[];
}

/** Optional parameters. */
export interface WebPubSubApiSendToUser$binaryOptionalParams
  extends coreHttp.OperationOptions {
  /** Target hub name, which should start with alphabetic characters and only contain alpha-numeric characters or underscore. When it is not set, it uses the default hub */
  hub?: string;
}

/** Optional parameters. */
export interface WebPubSubApiSendToUser$textOptionalParams
  extends coreHttp.OperationOptions {
  /** Target hub name, which should start with alphabetic characters and only contain alpha-numeric characters or underscore. When it is not set, it uses the default hub */
  hub?: string;
}

/** Optional parameters. */
export interface WebPubSubApiSendToConnection$binaryOptionalParams
  extends coreHttp.OperationOptions {
  /** Target hub name, which should start with alphabetic characters and only contain alpha-numeric characters or underscore. When it is not set, it uses the default hub */
  hub?: string;
}

/** Optional parameters. */
export interface WebPubSubApiSendToConnection$textOptionalParams
  extends coreHttp.OperationOptions {
  /** Target hub name, which should start with alphabetic characters and only contain alpha-numeric characters or underscore. When it is not set, it uses the default hub */
  hub?: string;
}

/** Optional parameters. */
export interface WebPubSubApiGroupBroadcast$binaryOptionalParams
  extends coreHttp.OperationOptions {
  /** Target hub name, which should start with alphabetic characters and only contain alpha-numeric characters or underscore. When it is not set, it uses the default hub */
  hub?: string;
  /** Excluded connection Ids */
  excluded?: string[];
}

/** Optional parameters. */
export interface WebPubSubApiGroupBroadcast$textOptionalParams
  extends coreHttp.OperationOptions {
  /** Target hub name, which should start with alphabetic characters and only contain alpha-numeric characters or underscore. When it is not set, it uses the default hub */
  hub?: string;
  /** Excluded connection Ids */
  excluded?: string[];
}

/** Optional parameters. */
export interface WebPubSubApiCheckConnectionExistenceOptionalParams
  extends coreHttp.OperationOptions {
  /** Target hub name, which should start with alphabetic characters and only contain alpha-numeric characters or underscore. When it is not set, it uses the default hub */
  hub?: string;
}

/** Optional parameters. */
export interface WebPubSubApiCloseClientConnectionOptionalParams
  extends coreHttp.OperationOptions {
  /** Target hub name, which should start with alphabetic characters and only contain alpha-numeric characters or underscore. When it is not set, it uses the default hub */
  hub?: string;
  /** The reason closing the client connection */
  reason?: string;
}

/** Optional parameters. */
export interface WebPubSubApiCheckGroupExistenceOptionalParams
  extends coreHttp.OperationOptions {
  /** Target hub name, which should start with alphabetic characters and only contain alpha-numeric characters or underscore. When it is not set, it uses the default hub */
  hub?: string;
}

/** Optional parameters. */
export interface WebPubSubApiCheckUserExistenceOptionalParams
  extends coreHttp.OperationOptions {
  /** Target hub name, which should start with alphabetic characters and only contain alpha-numeric characters or underscore. When it is not set, it uses the default hub */
  hub?: string;
}

/** Optional parameters. */
export interface WebPubSubApiAddConnectionToGroupOptionalParams
  extends coreHttp.OperationOptions {
  /** Target hub name, which should start with alphabetic characters and only contain alpha-numeric characters or underscore. When it is not set, it uses the default hub */
  hub?: string;
}

/** Optional parameters. */
export interface WebPubSubApiRemoveConnectionFromGroupOptionalParams
  extends coreHttp.OperationOptions {
  /** Target hub name, which should start with alphabetic characters and only contain alpha-numeric characters or underscore. When it is not set, it uses the default hub */
  hub?: string;
}

/** Optional parameters. */
export interface WebPubSubApiCheckUserExistenceInGroupOptionalParams
  extends coreHttp.OperationOptions {
  /** Target hub name, which should start with alphabetic characters and only contain alpha-numeric characters or underscore. When it is not set, it uses the default hub */
  hub?: string;
}

/** Optional parameters. */
export interface WebPubSubApiAddUserToGroupOptionalParams
  extends coreHttp.OperationOptions {
  /** Target hub name, which should start with alphabetic characters and only contain alpha-numeric characters or underscore. When it is not set, it uses the default hub */
  hub?: string;
  /** Specifies the seconds that the user exists in the group. If not set, the user lives in the group forever. */
  ttl?: number;
}

/** Optional parameters. */
export interface WebPubSubApiRemoveUserFromGroupOptionalParams
  extends coreHttp.OperationOptions {
  /** Target hub name, which should start with alphabetic characters and only contain alpha-numeric characters or underscore. When it is not set, it uses the default hub */
  hub?: string;
}

/** Optional parameters. */
export interface WebPubSubApiRemoveUserFromAllGroupsOptionalParams
  extends coreHttp.OperationOptions {
  /** Target hub name, which should start with alphabetic characters and only contain alpha-numeric characters or underscore. When it is not set, it uses the default hub */
  hub?: string;
}

/** Optional parameters. */
export interface AzureWebPubSubServiceRestAPIOptionalParams
  extends coreHttp.ServiceClientOptions {
  /** Api Version */
  apiVersion?: string;
  /** Overrides client endpoint. */
  endpoint?: string;
}

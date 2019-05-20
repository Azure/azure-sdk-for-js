const isNode = !!process && !!process.version && !!process.versions && !!process.versions.node;

export enum Constants {
  SERVICEBUS_CONNECTION_STRING = "SERVICEBUS_CONNECTION_STRING",
  QUEUE_NAME = "QUEUE_NAME",
  QUEUE_NAME_NO_PARTITION = "QUEUE_NAME_NO_PARTITION",
  QUEUE_NAME_SESSION = "QUEUE_NAME_SESSION",
  QUEUE_NAME_NO_PARTITION_SESSION = "QUEUE_NAME_NO_PARTITION_SESSION",
  TOPIC_NAME = "TOPIC_NAME",
  TOPIC_NAME_NO_PARTITION = "TOPIC_NAME_NO_PARTITION",
  TOPIC_NAME_SESSION = "TOPIC_NAME_SESSION",
  TOPIC_NAME_NO_PARTITION_SESSION = "TOPIC_NAME_NO_PARTITION_SESSION",
  SUBSCRIPTION_NAME = "SUBSCRIPTION_NAME",
  SUBSCRIPTION_NAME_NO_PARTITION = "SUBSCRIPTION_NAME_NO_PARTITION",
  SUBSCRIPTION_NAME_SESSION = "SUBSCRIPTION_NAME_SESSION",
  SUBSCRIPTION_NAME_NO_PARTITION_SESSION = "SUBSCRIPTION_NAME_NO_PARTITION_SESSION",
  TOPIC_FILTER_NAME = "TOPIC_FILTER_NAME",
  TOPIC_FILTER_SUBSCRIPTION_NAME = "TOPIC_FILTER_SUBSCRIPTION_NAME",
  TOPIC_FILTER_DEFAULT_SUBSCRIPTION_NAME = "TOPIC_FILTER_DEFAULT_SUBSCRIPTION_NAME",
  AAD_CLIENT_ID = "AAD_CLIENT_ID",
  AAD_CLIENT_SECRET = "AAD_CLIENT_SECRET",
  AAD_TENANT_ID = "AAD_TENANT_ID",
  RESOURCE_GROUP = "RESOURCE_GROUP",
  AZURE_SUBSCRIPTION_ID = "AZURE_SUBSCRIPTION_ID",
  CLEAN_NAMESPACE = "CLEAN_NAMESPACE"
}

export enum ErrorCode {
  MISSING_ENV_VAR = "MISSING_ENV_VAR"
}

const ErrorMessage = {
  [ErrorCode.MISSING_ENV_VAR]: (envVar: any) =>
    `Define ${envVar} in your environment before running integration tests.`
};

function getError(errorCode: ErrorCode, options: any[]): Error {
  let errorMessage;

  switch (errorCode) {
    case ErrorCode.MISSING_ENV_VAR:
      errorMessage = ErrorMessage[ErrorCode.MISSING_ENV_VAR](options[0]);
      break;
    default:
      throw new Error("Invalid error code");
  }
  return new Error(errorMessage);
}

export function getEnvVars(): { [key in Constants]: string } {
  // AAD related

  // @ts-ignore
  let AAD_CLIENT_ID = isNode ? process.env.AAD_CLIENT_ID : window.__env__[Constants.AAD_CLIENT_ID];
  if (!AAD_CLIENT_ID) {
    throw getError(ErrorCode.MISSING_ENV_VAR, [Constants.AAD_CLIENT_ID]);
  }

  let AAD_CLIENT_SECRET = isNode
    ? process.env.AAD_CLIENT_SECRET 
    // @ts-ignore
    : window.__env__[Constants.AAD_CLIENT_SECRET];
  if (!AAD_CLIENT_SECRET) {
    throw getError(ErrorCode.MISSING_ENV_VAR, [Constants.AAD_CLIENT_SECRET]);
  }


  let AAD_TENANT_ID = isNode
    ? process.env.AAD_TENANT_ID 
    // @ts-ignore
    : window.__env__[Constants.AAD_TENANT_ID];
  if (!AAD_TENANT_ID) {
    throw getError(ErrorCode.MISSING_ENV_VAR, [Constants.AAD_TENANT_ID]);
  }

  let AZURE_SUBSCRIPTION_ID = isNode
    ? process.env.AZURE_SUBSCRIPTION_ID 
    // @ts-ignore
    : window.__env__[Constants.AZURE_SUBSCRIPTION_ID];
  if (!AZURE_SUBSCRIPTION_ID) {
    throw getError(ErrorCode.MISSING_ENV_VAR, [Constants.AZURE_SUBSCRIPTION_ID]);
  }

  let RESOURCE_GROUP = isNode
    ? process.env.RESOURCE_GROUP 
    // @ts-ignore
    : window.__env__[Constants.RESOURCE_GROUP];
  if (!RESOURCE_GROUP) {
    throw getError(ErrorCode.MISSING_ENV_VAR, [Constants.RESOURCE_GROUP]);
  }

  

  // Entity related

  let SERVICEBUS_CONNECTION_STRING = isNode
    ? process.env.SERVICEBUS_CONNECTION_STRING 
    // @ts-ignore
    : window.__env__[Constants.SERVICEBUS_CONNECTION_STRING];
  if (!SERVICEBUS_CONNECTION_STRING) {
    throw getError(ErrorCode.MISSING_ENV_VAR, [Constants.SERVICEBUS_CONNECTION_STRING]);
  }

  let CLEAN_NAMESPACE = isNode
    ? process.env.CLEAN_NAMESPACE 
    // @ts-ignore
    : window.__env__[Constants.CLEAN_NAMESPACE];
 
  let TOPIC_FILTER_NAME = isNode
    ? process.env.TOPIC_FILTER_NAME 
    // @ts-ignore
    : window.__env__[Constants.TOPIC_FILTER_NAME];
 
  let TOPIC_FILTER_SUBSCRIPTION_NAME = isNode
    ? process.env.TOPIC_FILTER_SUBSCRIPTION_NAME 
    // @ts-ignore
    : window.__env__[Constants.TOPIC_FILTER_SUBSCRIPTION_NAME];
 
  let TOPIC_FILTER_DEFAULT_SUBSCRIPTION_NAME = isNode
    ? process.env.TOPIC_FILTER_DEFAULT_SUBSCRIPTION_NAME 
    // @ts-ignore
    : window.__env__[Constants.TOPIC_FILTER_DEFAULT_SUBSCRIPTION_NAME];
 
  let QUEUE_NAME = isNode
    ? process.env.QUEUE_NAME 
    // @ts-ignore
    : window.__env__[Constants.QUEUE_NAME];
 
  let TOPIC_NAME = isNode
    ? process.env.TOPIC_NAME 
    // @ts-ignore
    : window.__env__[Constants.TOPIC_NAME];
 
  let SUBSCRIPTION_NAME = isNode
    ? process.env.SUBSCRIPTION_NAME 
    // @ts-ignore
    : window.__env__[Constants.SUBSCRIPTION_NAME];
 
  let QUEUE_NAME_NO_PARTITION = isNode
    ? process.env.QUEUE_NAME_NO_PARTITION 
    // @ts-ignore
    : window.__env__[Constants.QUEUE_NAME_NO_PARTITION];
 
  let QUEUE_NAME_SESSION = isNode
    ? process.env.QUEUE_NAME_SESSION 
    // @ts-ignore
    : window.__env__[Constants.QUEUE_NAME_SESSION];
 
  let QUEUE_NAME_NO_PARTITION_SESSION = isNode
    ? process.env.QUEUE_NAME_NO_PARTITION_SESSION 
    // @ts-ignore
    : window.__env__[Constants.QUEUE_NAME_NO_PARTITION_SESSION];
 
  let TOPIC_NAME_NO_PARTITION = isNode
    ? process.env.TOPIC_NAME_NO_PARTITION 
    // @ts-ignore
    : window.__env__[Constants.TOPIC_NAME_NO_PARTITION];
 
  let TOPIC_NAME_SESSION = isNode
    ? process.env.TOPIC_NAME_SESSION 
    // @ts-ignore
    : window.__env__[Constants.TOPIC_NAME_SESSION];

  let TOPIC_NAME_NO_PARTITION_SESSION = isNode
    ? process.env.TOPIC_NAME_NO_PARTITION_SESSION 
    // @ts-ignore
    : window.__env__[Constants.TOPIC_NAME_NO_PARTITION_SESSION];
 
  let SUBSCRIPTION_NAME_NO_PARTITION = isNode
    ? process.env.SUBSCRIPTION_NAME_NO_PARTITION 
    // @ts-ignore
    : window.__env__[Constants.SUBSCRIPTION_NAME_NO_PARTITION];
 
  let SUBSCRIPTION_NAME_SESSION = isNode
    ? process.env.SUBSCRIPTION_NAME_SESSION 
    // @ts-ignore
    : window.__env__[Constants.SUBSCRIPTION_NAME_SESSION];
 
  let SUBSCRIPTION_NAME_NO_PARTITION_SESSION = isNode
    ? process.env.SUBSCRIPTION_NAME_NO_PARTITION_SESSION 
    // @ts-ignore
    : window.__env__[Constants.SUBSCRIPTION_NAME_NO_PARTITION_SESSION];
 

  return {
    [Constants.SERVICEBUS_CONNECTION_STRING]: SERVICEBUS_CONNECTION_STRING,
    [Constants.QUEUE_NAME]: QUEUE_NAME || "partitioned-queue",
    [Constants.QUEUE_NAME_NO_PARTITION]: QUEUE_NAME_NO_PARTITION || "unpartitioned-queue",
    [Constants.QUEUE_NAME_SESSION]: QUEUE_NAME_SESSION || "partitioned-queue-sessions",
    [Constants.QUEUE_NAME_NO_PARTITION_SESSION]:
      QUEUE_NAME_NO_PARTITION_SESSION || "unpartitioned-queue-sessions",
    [Constants.TOPIC_NAME]: TOPIC_NAME || "partitioned-topic",
    [Constants.TOPIC_NAME_NO_PARTITION]: TOPIC_NAME_NO_PARTITION || "unpartitioned-topic",
    [Constants.TOPIC_NAME_SESSION]: TOPIC_NAME_SESSION || "partitioned-topic-sessions",
    [Constants.TOPIC_NAME_NO_PARTITION_SESSION]:
      TOPIC_NAME_NO_PARTITION_SESSION || "unpartitioned-topic-sessions",
    [Constants.SUBSCRIPTION_NAME]: SUBSCRIPTION_NAME || "partitioned-topic-subscription",
    [Constants.SUBSCRIPTION_NAME_NO_PARTITION]:
      SUBSCRIPTION_NAME_NO_PARTITION || "unpartitioned-topic-subscription",
    [Constants.SUBSCRIPTION_NAME_SESSION]:
      SUBSCRIPTION_NAME_SESSION || "partitioned-topic-sessions-subscription",
    [Constants.SUBSCRIPTION_NAME_NO_PARTITION_SESSION]:
      SUBSCRIPTION_NAME_NO_PARTITION_SESSION || "unpartitioned-topic-sessions-subscription",
    [Constants.TOPIC_FILTER_NAME]: TOPIC_FILTER_NAME || "topic-filter",
    [Constants.TOPIC_FILTER_SUBSCRIPTION_NAME]:
      TOPIC_FILTER_SUBSCRIPTION_NAME || "topic-filter-subscription",
    [Constants.TOPIC_FILTER_DEFAULT_SUBSCRIPTION_NAME]:
      TOPIC_FILTER_DEFAULT_SUBSCRIPTION_NAME || "topic-filter-default-subscription",
    [Constants.AAD_CLIENT_ID]: AAD_CLIENT_ID,
    [Constants.AAD_CLIENT_SECRET]: AAD_CLIENT_SECRET,
    [Constants.AAD_TENANT_ID]: AAD_TENANT_ID,
    [Constants.RESOURCE_GROUP]: RESOURCE_GROUP,
    [Constants.AZURE_SUBSCRIPTION_ID]: AZURE_SUBSCRIPTION_ID,
    [Constants.CLEAN_NAMESPACE]: CLEAN_NAMESPACE || false
  };
}

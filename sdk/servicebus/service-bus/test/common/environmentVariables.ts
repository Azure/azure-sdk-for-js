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

  let AAD_CLIENT_ID;
  if (
    (isNode && !process.env.AAD_CLIENT_ID) ||
    // @ts-ignore
    (!isNode && !window.__env__[Constants.AAD_CLIENT_ID])
  ) {
    throw getError(ErrorCode.MISSING_ENV_VAR, [Constants.AAD_CLIENT_ID]);
  } else {
    if (isNode) {
      AAD_CLIENT_ID = process.env.AAD_CLIENT_ID;
    } else {
      // @ts-ignore
      AAD_CLIENT_ID = window.__env__[Constants.AAD_CLIENT_ID];
    }
  }

  let AAD_CLIENT_SECRET;
  if (
    (isNode && !process.env.AAD_CLIENT_SECRET) ||
    // @ts-ignore
    (!isNode && !window.__env__[Constants.AAD_CLIENT_SECRET])
  ) {
    throw getError(ErrorCode.MISSING_ENV_VAR, [Constants.AAD_CLIENT_SECRET]);
  } else {
    if (isNode) {
      AAD_CLIENT_SECRET = process.env.AAD_CLIENT_SECRET;
    } else {
      // @ts-ignore
      AAD_CLIENT_SECRET = window.__env__[Constants.AAD_CLIENT_SECRET];
    }
  }

  let AAD_TENANT_ID;
  if (
    (isNode && !process.env.AAD_TENANT_ID) ||
    // @ts-ignore
    (!isNode && !window.__env__[Constants.AAD_TENANT_ID])
  ) {
    throw getError(ErrorCode.MISSING_ENV_VAR, [Constants.AAD_TENANT_ID]);
  } else {
    if (isNode) {
      AAD_TENANT_ID = process.env.AAD_TENANT_ID;
    } else {
      // @ts-ignore
      AAD_TENANT_ID = window.__env__[Constants.AAD_TENANT_ID];
    }
  }

  let AZURE_SUBSCRIPTION_ID;
  if (
    (isNode && !process.env.AZURE_SUBSCRIPTION_ID) ||
    // @ts-ignore
    (!isNode && !window.__env__[Constants.AZURE_SUBSCRIPTION_ID])
  ) {
    throw getError(ErrorCode.MISSING_ENV_VAR, [Constants.AZURE_SUBSCRIPTION_ID]);
  } else {
    if (isNode) {
      AZURE_SUBSCRIPTION_ID = process.env.AZURE_SUBSCRIPTION_ID;
    } else {
      // @ts-ignore
      AZURE_SUBSCRIPTION_ID = window.__env__[Constants.AZURE_SUBSCRIPTION_ID];
    }
  }

  let RESOURCE_GROUP;
  if (
    (isNode && !process.env.RESOURCE_GROUP) ||
    // @ts-ignore
    (!isNode && !window.__env__[Constants.RESOURCE_GROUP])
  ) {
    throw getError(ErrorCode.MISSING_ENV_VAR, [Constants.RESOURCE_GROUP]);
  } else {
    if (isNode) {
      RESOURCE_GROUP = process.env.RESOURCE_GROUP;
    } else {
      // @ts-ignore
      RESOURCE_GROUP = window.__env__[Constants.RESOURCE_GROUP];
    }
  }

  let SERVICEBUS_CONNECTION_STRING;
  if (
    (isNode && !process.env.SERVICEBUS_CONNECTION_STRING) ||
    // @ts-ignore
    (!isNode && !window.__env__[Constants.SERVICEBUS_CONNECTION_STRING])
  ) {
    throw getError(ErrorCode.MISSING_ENV_VAR, [Constants.SERVICEBUS_CONNECTION_STRING]);
  } else {
    if (isNode) {
      SERVICEBUS_CONNECTION_STRING = process.env.SERVICEBUS_CONNECTION_STRING;
    } else {
      // @ts-ignore
      SERVICEBUS_CONNECTION_STRING = window.__env__[Constants.SERVICEBUS_CONNECTION_STRING];
    }
  }

  // Entity related

  let TOPIC_FILTER_NAME;
  if (
    (isNode && process.env.TOPIC_FILTER_NAME) ||
    // @ts-ignore
    (!isNode && window.__env__[Constants.TOPIC_FILTER_NAME])
  ) {
    if (isNode) {
      TOPIC_FILTER_NAME = process.env.TOPIC_FILTER_NAME;
    } else {
      // @ts-ignore
      TOPIC_FILTER_NAME = window.__env__[Constants.TOPIC_FILTER_NAME];
    }
  }

  let TOPIC_FILTER_SUBSCRIPTION_NAME;
  if (
    (isNode && process.env.TOPIC_FILTER_SUBSCRIPTION_NAME) ||
    // @ts-ignore
    (!isNode && window.__env__[Constants.TOPIC_FILTER_SUBSCRIPTION_NAME])
  ) {
    if (isNode) {
      TOPIC_FILTER_SUBSCRIPTION_NAME = process.env.TOPIC_FILTER_SUBSCRIPTION_NAME;
    } else {
      // @ts-ignore
      TOPIC_FILTER_SUBSCRIPTION_NAME = window.__env__[Constants.TOPIC_FILTER_SUBSCRIPTION_NAME];
    }
  }

  let TOPIC_FILTER_DEFAULT_SUBSCRIPTION_NAME;
  if (
    (isNode && process.env.TOPIC_FILTER_DEFAULT_SUBSCRIPTION_NAME) ||
    // @ts-ignore
    (!isNode && window.__env__[Constants.TOPIC_FILTER_DEFAULT_SUBSCRIPTION_NAME])
  ) {
    if (isNode) {
      TOPIC_FILTER_DEFAULT_SUBSCRIPTION_NAME = process.env.TOPIC_FILTER_DEFAULT_SUBSCRIPTION_NAME;
    } else {
      TOPIC_FILTER_DEFAULT_SUBSCRIPTION_NAME =
        // @ts-ignore
        window.__env__[Constants.TOPIC_FILTER_DEFAULT_SUBSCRIPTION_NAME];
    }
  }

  let QUEUE_NAME;
  if (
    (isNode && process.env.QUEUE_NAME) ||
    // @ts-ignore
    (!isNode && window.__env__[Constants.QUEUE_NAME])
  ) {
    if (isNode) {
      QUEUE_NAME = process.env.QUEUE_NAME;
    } else {
      // @ts-ignore
      QUEUE_NAME = window.__env__[Constants.QUEUE_NAME];
    }
  }

  let TOPIC_NAME;
  if (
    (isNode && process.env.TOPIC_NAME) ||
    // @ts-ignore
    (!isNode && window.__env__[Constants.TOPIC_NAME])
  ) {
    if (isNode) {
      TOPIC_NAME = process.env.TOPIC_NAME;
    } else {
      // @ts-ignore
      TOPIC_NAME = window.__env__[Constants.TOPIC_NAME];
    }
  }

  let SUBSCRIPTION_NAME;
  if (
    (isNode && process.env.SUBSCRIPTION_NAME) ||
    // @ts-ignore
    (!isNode && window.__env__[Constants.SUBSCRIPTION_NAME])
  ) {
    if (isNode) {
      SUBSCRIPTION_NAME = process.env.SUBSCRIPTION_NAME;
    } else {
      // @ts-ignore
      SUBSCRIPTION_NAME = window.__env__[Constants.SUBSCRIPTION_NAME];
    }
  }

  let QUEUE_NAME_NO_PARTITION;
  if (
    (isNode && process.env.QUEUE_NAME_NO_PARTITION) ||
    // @ts-ignore
    (!isNode && window.__env__[Constants.QUEUE_NAME_NO_PARTITION])
  ) {
    if (isNode) {
      QUEUE_NAME_NO_PARTITION = process.env.QUEUE_NAME_NO_PARTITION;
    } else {
      // @ts-ignore
      QUEUE_NAME_NO_PARTITION = window.__env__[Constants.QUEUE_NAME_NO_PARTITION];
    }
  }

  let QUEUE_NAME_SESSION;
  if (
    (isNode && process.env.QUEUE_NAME_SESSION) ||
    // @ts-ignore
    (!isNode && window.__env__[Constants.QUEUE_NAME_SESSION])
  ) {
    if (isNode) {
      QUEUE_NAME_SESSION = process.env.QUEUE_NAME_SESSION;
    } else {
      // @ts-ignore
      QUEUE_NAME_SESSION = window.__env__[Constants.QUEUE_NAME_SESSION];
    }
  }

  let QUEUE_NAME_NO_PARTITION_SESSION;
  if (
    (isNode && process.env.QUEUE_NAME_NO_PARTITION_SESSION) ||
    // @ts-ignore
    (!isNode && window.__env__[Constants.QUEUE_NAME_NO_PARTITION_SESSION])
  ) {
    if (isNode) {
      QUEUE_NAME_NO_PARTITION_SESSION = process.env.QUEUE_NAME_NO_PARTITION_SESSION;
    } else {
      // @ts-ignore
      QUEUE_NAME_NO_PARTITION_SESSION = window.__env__[Constants.QUEUE_NAME_NO_PARTITION_SESSION];
    }
  }

  let TOPIC_NAME_NO_PARTITION;
  if (
    (isNode && process.env.TOPIC_NAME_NO_PARTITION) ||
    // @ts-ignore
    (!isNode && window.__env__[Constants.TOPIC_NAME_NO_PARTITION])
  ) {
    if (isNode) {
      TOPIC_NAME_NO_PARTITION = process.env.TOPIC_NAME_NO_PARTITION;
    } else {
      // @ts-ignore
      TOPIC_NAME_NO_PARTITION = window.__env__[Constants.TOPIC_NAME_NO_PARTITION];
    }
  }

  let CLEAN_NAMESPACE;
  if (
    (isNode && process.env.CLEAN_NAMESPACE) ||
    // @ts-ignore
    (!isNode && window.__env__[Constants.CLEAN_NAMESPACE])
  ) {
    if (isNode) {
      CLEAN_NAMESPACE = process.env.CLEAN_NAMESPACE;
    } else {
      // @ts-ignore
      CLEAN_NAMESPACE = window.__env__[Constants.CLEAN_NAMESPACE];
    }
  }

  let TOPIC_NAME_SESSION;
  if (
    (isNode && process.env.TOPIC_NAME_SESSION) ||
    // @ts-ignore
    (!isNode && window.__env__[Constants.TOPIC_NAME_SESSION])
  ) {
    if (isNode) {
      TOPIC_NAME_SESSION = process.env.TOPIC_NAME_SESSION;
    } else {
      // @ts-ignore
      TOPIC_NAME_SESSION = window.__env__[Constants.TOPIC_NAME_SESSION];
    }
  }

  let TOPIC_NAME_NO_PARTITION_SESSION;
  if (
    (isNode && process.env.TOPIC_NAME_NO_PARTITION_SESSION) ||
    // @ts-ignore
    (!isNode && window.__env__[Constants.TOPIC_NAME_NO_PARTITION_SESSION])
  ) {
    if (isNode) {
      TOPIC_NAME_NO_PARTITION_SESSION = process.env.TOPIC_NAME_NO_PARTITION_SESSION;
    } else {
      // @ts-ignore
      TOPIC_NAME_NO_PARTITION_SESSION = window.__env__[Constants.TOPIC_NAME_NO_PARTITION_SESSION];
    }
  }

  let SUBSCRIPTION_NAME_NO_PARTITION;
  if (
    (isNode && process.env.SUBSCRIPTION_NAME_NO_PARTITION) ||
    // @ts-ignore
    (!isNode && window.__env__[Constants.SUBSCRIPTION_NAME_NO_PARTITION])
  ) {
    if (isNode) {
      SUBSCRIPTION_NAME_NO_PARTITION = process.env.SUBSCRIPTION_NAME_NO_PARTITION;
    } else {
      // @ts-ignore
      SUBSCRIPTION_NAME_NO_PARTITION = window.__env__[Constants.SUBSCRIPTION_NAME_NO_PARTITION];
    }
  }

  let SUBSCRIPTION_NAME_SESSION;
  if (
    (isNode && process.env.SUBSCRIPTION_NAME_SESSION) ||
    // @ts-ignore
    (!isNode && window.__env__[Constants.SUBSCRIPTION_NAME_SESSION])
  ) {
    if (isNode) {
      SUBSCRIPTION_NAME_SESSION = process.env.SUBSCRIPTION_NAME_SESSION;
    } else {
      // @ts-ignore
      SUBSCRIPTION_NAME_SESSION = window.__env__[Constants.SUBSCRIPTION_NAME_SESSION];
    }
  }

  let SUBSCRIPTION_NAME_NO_PARTITION_SESSION;
  if (
    (isNode && process.env.SUBSCRIPTION_NAME_NO_PARTITION_SESSION) ||
    // @ts-ignore
    (!isNode && window.__env__[Constants.SUBSCRIPTION_NAME_NO_PARTITION_SESSION])
  ) {
    if (isNode) {
      SUBSCRIPTION_NAME_NO_PARTITION_SESSION = process.env.SUBSCRIPTION_NAME_NO_PARTITION_SESSION;
    } else {
      SUBSCRIPTION_NAME_NO_PARTITION_SESSION =
        // @ts-ignore
        window.__env__[Constants.SUBSCRIPTION_NAME_NO_PARTITION_SESSION];
    }
  }

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

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

function _getMissingEnvironmentVariableError(envVar: any): Error {
  return new Error(`Define ${envVar} in your environment before running integration tests.`);
}

function getEnv(name: string): string | undefined {
  // @ts-ignore
  const envValue = isNode ? process.env[name] : window.__env__[name];

  if (!envValue) {
    const mandatoryEnvVars = [Constants.SERVICEBUS_CONNECTION_STRING.valueOf()];

    const aadRelatedEnvVars = [
      Constants.AAD_CLIENT_ID.valueOf(),
      Constants.AAD_CLIENT_SECRET.valueOf(),
      Constants.AAD_TENANT_ID.valueOf(),
      Constants.AZURE_SUBSCRIPTION_ID.valueOf(),
      Constants.RESOURCE_GROUP.valueOf()
    ];

    // Throw error only if mandatory env variable is missing
    // Or, if CLEAN_NAMESPACE is enabled and AAD related details are not provided
    if (
      mandatoryEnvVars.indexOf(name) > -1 ||
      (aadRelatedEnvVars.indexOf(name) > -1 && getEnv(Constants.CLEAN_NAMESPACE))
    ) {
      throw _getMissingEnvironmentVariableError(name);
    }
  }
  return envValue;
}

export function getEnvVars(): { [key in Constants]: any } {
  return {
    [Constants.SERVICEBUS_CONNECTION_STRING]: getEnv(Constants.SERVICEBUS_CONNECTION_STRING),
    [Constants.QUEUE_NAME]: getEnv(Constants.QUEUE_NAME) || "partitioned-queue",
    [Constants.QUEUE_NAME_NO_PARTITION]:
      getEnv(Constants.QUEUE_NAME_NO_PARTITION) || "unpartitioned-queue",
    [Constants.QUEUE_NAME_SESSION]:
      getEnv(Constants.QUEUE_NAME_SESSION) || "partitioned-queue-sessions",
    [Constants.QUEUE_NAME_NO_PARTITION_SESSION]:
      getEnv(Constants.QUEUE_NAME_NO_PARTITION_SESSION) || "unpartitioned-queue-sessions",
    [Constants.TOPIC_NAME]: getEnv(Constants.TOPIC_NAME) || "partitioned-topic",
    [Constants.TOPIC_NAME_NO_PARTITION]:
      getEnv(Constants.TOPIC_NAME_NO_PARTITION) || "unpartitioned-topic",
    [Constants.TOPIC_NAME_SESSION]:
      getEnv(Constants.TOPIC_NAME_SESSION) || "partitioned-topic-sessions",
    [Constants.TOPIC_NAME_NO_PARTITION_SESSION]:
      getEnv(Constants.TOPIC_NAME_NO_PARTITION_SESSION) || "unpartitioned-topic-sessions",
    [Constants.SUBSCRIPTION_NAME]:
      getEnv(Constants.SUBSCRIPTION_NAME) || "partitioned-topic-subscription",
    [Constants.SUBSCRIPTION_NAME_NO_PARTITION]:
      getEnv(Constants.SUBSCRIPTION_NAME_NO_PARTITION) || "unpartitioned-topic-subscription",
    [Constants.SUBSCRIPTION_NAME_SESSION]:
      getEnv(Constants.SUBSCRIPTION_NAME_SESSION) || "partitioned-topic-sessions-subscription",
    [Constants.SUBSCRIPTION_NAME_NO_PARTITION_SESSION]:
      getEnv(Constants.SUBSCRIPTION_NAME_NO_PARTITION_SESSION) ||
      "unpartitioned-topic-sessions-subscription",
    [Constants.TOPIC_FILTER_NAME]: getEnv(Constants.TOPIC_FILTER_NAME) || "topic-filter",
    [Constants.TOPIC_FILTER_SUBSCRIPTION_NAME]:
      getEnv(Constants.TOPIC_FILTER_SUBSCRIPTION_NAME) || "topic-filter-subscription",
    [Constants.TOPIC_FILTER_DEFAULT_SUBSCRIPTION_NAME]:
      getEnv(Constants.TOPIC_FILTER_DEFAULT_SUBSCRIPTION_NAME) ||
      "topic-filter-default-subscription",
    [Constants.AAD_CLIENT_ID]: getEnv(Constants.AAD_CLIENT_ID),
    [Constants.AAD_CLIENT_SECRET]: getEnv(Constants.AAD_CLIENT_SECRET),
    [Constants.AAD_TENANT_ID]: getEnv(Constants.AAD_TENANT_ID),
    [Constants.RESOURCE_GROUP]: getEnv(Constants.RESOURCE_GROUP),
    [Constants.AZURE_SUBSCRIPTION_ID]: getEnv(Constants.AZURE_SUBSCRIPTION_ID),
    [Constants.CLEAN_NAMESPACE]: getEnv(Constants.CLEAN_NAMESPACE) || false
  };
}

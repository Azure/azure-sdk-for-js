export const isNode =
  !!process && !!process.version && !!process.versions && !!process.versions.node;

export enum EnvVarKeys {
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

const mandatoryEnvVars = [EnvVarKeys.SERVICEBUS_CONNECTION_STRING];

const aadRelatedEnvVars = [
  EnvVarKeys.AAD_CLIENT_ID,
  EnvVarKeys.AAD_CLIENT_SECRET,
  EnvVarKeys.AAD_TENANT_ID,
  EnvVarKeys.AZURE_SUBSCRIPTION_ID,
  EnvVarKeys.RESOURCE_GROUP
];

function throwMissingEnvironmentVariablesError(envVars: EnvVarKeys[]): void {
  envVars.forEach(function(key: string) {
    const name = key.valueOf();
    if (!getEnvVarValue(name)) {
      throw new Error(`Define ${name} in your environment before running integration tests.`);
    }
  });
}

function getEnvVarValue(name: string, forBrowser?: boolean): string | undefined {
  if (forBrowser) {
    name = name + "_BROWSER";
  }

  let result;
  if (isNode) {
    result = process.env[name];
  } else {
    // @ts-ignore
    result = window.__env__[name];
  }

  if (result) {
    return result;
  }

  // If no values are supplied for entity related env variables,
  // the default values to use are computed and returned as follows
  switch (name) {
    case EnvVarKeys.QUEUE_NAME:
      result = "partitioned-queue";
      break;
    case EnvVarKeys.QUEUE_NAME_NO_PARTITION:
      result = "unpartitioned-queue";
      break;
    case EnvVarKeys.QUEUE_NAME_SESSION:
      result = "partitioned-queue-sessions";
      break;
    case EnvVarKeys.QUEUE_NAME_NO_PARTITION_SESSION:
      result = "unpartitioned-queue-sessions";
      break;
    case EnvVarKeys.TOPIC_NAME:
      result = "partitioned-topic";
      break;
    case EnvVarKeys.TOPIC_NAME_NO_PARTITION:
      result = "unpartitioned-topic";
      break;
    case EnvVarKeys.TOPIC_NAME_SESSION:
      result = "partitioned-topic-sessions";
      break;
    case EnvVarKeys.TOPIC_NAME_NO_PARTITION_SESSION:
      result = "unpartitioned-topic-sessions";
      break;
    case EnvVarKeys.SUBSCRIPTION_NAME:
      result = "partitioned-topic-subscription";
      break;
    case EnvVarKeys.SUBSCRIPTION_NAME_NO_PARTITION:
      result = "unpartitioned-topic-subscription";
      break;
    case EnvVarKeys.SUBSCRIPTION_NAME_SESSION:
      result = "partitioned-topic-sessions-subscription";
      break;
    case EnvVarKeys.SUBSCRIPTION_NAME_NO_PARTITION_SESSION:
      result = "unpartitioned-topic-sessions-subscription";
      break;
    case EnvVarKeys.TOPIC_FILTER_NAME:
      result = "topic-filter";
      break;
    case EnvVarKeys.TOPIC_FILTER_SUBSCRIPTION_NAME:
      result = "topic-filter-subscription";
      break;
    case EnvVarKeys.TOPIC_FILTER_DEFAULT_SUBSCRIPTION_NAME:
      result = "topic-filter-default-subscription";
      break;
  }

  if (result && forBrowser) {
    result += "-browser";
  }

  return result;
}

export function getEnvVars(forBrowser?: boolean): { [key in EnvVarKeys]: any } {
  // Throw error only if mandatory env variable is missing
  // Or, if CLEAN_NAMESPACE is enabled and AAD related details are not provided
  throwMissingEnvironmentVariablesError(mandatoryEnvVars);

  if (getEnvVarValue(EnvVarKeys.CLEAN_NAMESPACE) === "true") {
    throwMissingEnvironmentVariablesError(aadRelatedEnvVars);
  }

  return {
    [EnvVarKeys.SERVICEBUS_CONNECTION_STRING]: getEnvVarValue(
      EnvVarKeys.SERVICEBUS_CONNECTION_STRING,
      forBrowser
    ),
    [EnvVarKeys.QUEUE_NAME]: getEnvVarValue(EnvVarKeys.QUEUE_NAME, forBrowser),
    [EnvVarKeys.QUEUE_NAME_NO_PARTITION]: getEnvVarValue(
      EnvVarKeys.QUEUE_NAME_NO_PARTITION,
      forBrowser
    ),
    [EnvVarKeys.QUEUE_NAME_SESSION]: getEnvVarValue(EnvVarKeys.QUEUE_NAME_SESSION, forBrowser),
    [EnvVarKeys.QUEUE_NAME_NO_PARTITION_SESSION]: getEnvVarValue(
      EnvVarKeys.QUEUE_NAME_NO_PARTITION_SESSION,
      forBrowser
    ),
    [EnvVarKeys.TOPIC_NAME]: getEnvVarValue(EnvVarKeys.TOPIC_NAME, forBrowser),
    [EnvVarKeys.TOPIC_NAME_NO_PARTITION]: getEnvVarValue(
      EnvVarKeys.TOPIC_NAME_NO_PARTITION,
      forBrowser
    ),
    [EnvVarKeys.TOPIC_NAME_SESSION]: getEnvVarValue(EnvVarKeys.TOPIC_NAME_SESSION, forBrowser),
    [EnvVarKeys.TOPIC_NAME_NO_PARTITION_SESSION]: getEnvVarValue(
      EnvVarKeys.TOPIC_NAME_NO_PARTITION_SESSION,
      forBrowser
    ),
    [EnvVarKeys.SUBSCRIPTION_NAME]: getEnvVarValue(EnvVarKeys.SUBSCRIPTION_NAME, forBrowser),
    [EnvVarKeys.SUBSCRIPTION_NAME_NO_PARTITION]: getEnvVarValue(
      EnvVarKeys.SUBSCRIPTION_NAME_NO_PARTITION,
      forBrowser
    ),
    [EnvVarKeys.SUBSCRIPTION_NAME_SESSION]: getEnvVarValue(
      EnvVarKeys.SUBSCRIPTION_NAME_SESSION,
      forBrowser
    ),
    [EnvVarKeys.SUBSCRIPTION_NAME_NO_PARTITION_SESSION]: getEnvVarValue(
      EnvVarKeys.SUBSCRIPTION_NAME_NO_PARTITION_SESSION,
      forBrowser
    ),
    [EnvVarKeys.TOPIC_FILTER_NAME]: getEnvVarValue(EnvVarKeys.TOPIC_FILTER_NAME, forBrowser),
    [EnvVarKeys.TOPIC_FILTER_SUBSCRIPTION_NAME]: getEnvVarValue(
      EnvVarKeys.TOPIC_FILTER_SUBSCRIPTION_NAME,
      forBrowser
    ),
    [EnvVarKeys.TOPIC_FILTER_DEFAULT_SUBSCRIPTION_NAME]: getEnvVarValue(
      EnvVarKeys.TOPIC_FILTER_DEFAULT_SUBSCRIPTION_NAME,
      forBrowser
    ),
    [EnvVarKeys.AAD_CLIENT_ID]: getEnvVarValue(EnvVarKeys.AAD_CLIENT_ID),
    [EnvVarKeys.AAD_CLIENT_SECRET]: getEnvVarValue(EnvVarKeys.AAD_CLIENT_SECRET),
    [EnvVarKeys.AAD_TENANT_ID]: getEnvVarValue(EnvVarKeys.AAD_TENANT_ID),
    [EnvVarKeys.RESOURCE_GROUP]: getEnvVarValue(EnvVarKeys.RESOURCE_GROUP),
    [EnvVarKeys.AZURE_SUBSCRIPTION_ID]: getEnvVarValue(EnvVarKeys.AZURE_SUBSCRIPTION_ID),
    [EnvVarKeys.CLEAN_NAMESPACE]: getEnvVarValue(EnvVarKeys.CLEAN_NAMESPACE) || false
  };
}
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
  CLEAN_NAMESPACE = "CLEAN_NAMESPACE",
  MANAGEMENT_QUEUE_1 = "MANAGEMENT_QUEUE_1",
  MANAGEMENT_TOPIC_1 = "MANAGEMENT_TOPIC_1",
  MANAGEMENT_SUBSCRIPTION_1 = "MANAGEMENT_SUBSCRIPTION_1",
  MANAGEMENT_RULE_1 = "MANAGEMENT_RULE_1",
  MANAGEMENT_TOPIC_2 = "MANAGEMENT_TOPIC_2",
  MANAGEMENT_SUBSCRIPTION_2 = "MANAGEMENT_SUBSCRIPTION_2",
  MANAGEMENT_TOPIC_3 = "MANAGEMENT_TOPIC_3",
  MANAGEMENT_SUBSCRIPTION_3 = "MANAGEMENT_SUBSCRIPTION_3",
  MANAGEMENT_NEW_ENTITY_1 = "MANAGEMENT_NEW_ENTITY_1",
  MANAGEMENT_NEW_ENTITY_2 = "MANAGEMENT_NEW_ENTITY_2"
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

const defaultValueMap: any = {
  QUEUE_NAME: "partitioned-queue",
  QUEUE_NAME_NO_PARTITION: "unpartitioned-queue",
  QUEUE_NAME_SESSION: "partitioned-queue-sessions",
  QUEUE_NAME_NO_PARTITION_SESSION: "unpartitioned-queue-sessions",
  TOPIC_NAME: "partitioned-topic",
  TOPIC_NAME_NO_PARTITION: "unpartitioned-topic",
  TOPIC_NAME_SESSION: "partitioned-topic-sessions",
  TOPIC_NAME_NO_PARTITION_SESSION: "unpartitioned-topic-sessions",
  SUBSCRIPTION_NAME: "partitioned-topic-subscription",
  SUBSCRIPTION_NAME_NO_PARTITION: "unpartitioned-topic-subscription",
  SUBSCRIPTION_NAME_SESSION: "partitioned-topic-sessions-subscription",
  SUBSCRIPTION_NAME_NO_PARTITION_SESSION: "unpartitioned-topic-sessions-subscription",
  TOPIC_FILTER_NAME: "topic-filter",
  TOPIC_FILTER_SUBSCRIPTION_NAME: "topic-filter-subscription",
  TOPIC_FILTER_DEFAULT_SUBSCRIPTION_NAME: "topic-filter-default-subscription",
  MANAGEMENT_QUEUE_1: "management-queue-1",
  MANAGEMENT_TOPIC_1: "management-topic-1",
  MANAGEMENT_SUBSCRIPTION_1: "management-subscription-1",
  MANAGEMENT_RULE_1: "management-rule-1",
  MANAGEMENT_TOPIC_2: "management-topic-2",
  MANAGEMENT_SUBSCRIPTION_2: "management-subscription-2",
  MANAGEMENT_TOPIC_3: "management-topic-3",
  MANAGEMENT_SUBSCRIPTION_3: "management-subscription-3",
  MANAGEMENT_NEW_ENTITY_1: "management-new-entity-1",
  MANAGEMENT_NEW_ENTITY_2: "management-new-entity-2"
};

function getEnvVarValue(name: string, forBrowser?: boolean): string | undefined {
  let result;
  if (isNode) {
    result = process.env[name];
  } else {
    const nameForBrowser = forBrowser ? name + "_BROWSER" : name;
    // @ts-ignore
    result = window.__env__[nameForBrowser];
  }

  if (result) {
    return result;
  }

  // If no values are supplied for entity related env variables,
  // the default values are retrieved using the `defaultValueMap`.
  let defaultValue = defaultValueMap[name];

  if (defaultValue && forBrowser) {
    defaultValue += "-browser";
  }
  return defaultValue;
}

export function getEnvVars(): { [key in EnvVarKeys]: any } {
  const forBrowser = !isNode;

  // Throw error only if mandatory env variable is missing
  // Or, if CLEAN_NAMESPACE is enabled and AAD related details are not provided
  throwMissingEnvironmentVariablesError(mandatoryEnvVars);

  if (getEnvVarValue(EnvVarKeys.CLEAN_NAMESPACE) === "true") {
    throwMissingEnvironmentVariablesError(aadRelatedEnvVars);
  }

  const result = {
    [EnvVarKeys.SERVICEBUS_CONNECTION_STRING]: getEnvVarValue(
      EnvVarKeys.SERVICEBUS_CONNECTION_STRING
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
    [EnvVarKeys.CLEAN_NAMESPACE]: getEnvVarValue(EnvVarKeys.CLEAN_NAMESPACE) || false,
    [EnvVarKeys.MANAGEMENT_QUEUE_1]: getEnvVarValue(EnvVarKeys.MANAGEMENT_QUEUE_1, forBrowser),
    [EnvVarKeys.MANAGEMENT_TOPIC_1]: getEnvVarValue(EnvVarKeys.MANAGEMENT_TOPIC_1, forBrowser),
    [EnvVarKeys.MANAGEMENT_SUBSCRIPTION_1]: getEnvVarValue(
      EnvVarKeys.MANAGEMENT_SUBSCRIPTION_1,
      forBrowser
    ),
    [EnvVarKeys.MANAGEMENT_RULE_1]: getEnvVarValue(EnvVarKeys.MANAGEMENT_RULE_1, forBrowser),
    [EnvVarKeys.MANAGEMENT_TOPIC_2]: getEnvVarValue(EnvVarKeys.MANAGEMENT_TOPIC_2, forBrowser),
    [EnvVarKeys.MANAGEMENT_SUBSCRIPTION_2]: getEnvVarValue(
      EnvVarKeys.MANAGEMENT_SUBSCRIPTION_2,
      forBrowser
    ),
    [EnvVarKeys.MANAGEMENT_TOPIC_3]: getEnvVarValue(EnvVarKeys.MANAGEMENT_TOPIC_3, forBrowser),
    [EnvVarKeys.MANAGEMENT_SUBSCRIPTION_3]: getEnvVarValue(
      EnvVarKeys.MANAGEMENT_SUBSCRIPTION_3,
      forBrowser
    ),
    [EnvVarKeys.MANAGEMENT_NEW_ENTITY_1]: getEnvVarValue(
      EnvVarKeys.MANAGEMENT_NEW_ENTITY_1,
      forBrowser
    ),
    [EnvVarKeys.MANAGEMENT_NEW_ENTITY_2]: getEnvVarValue(
      EnvVarKeys.MANAGEMENT_NEW_ENTITY_2,
      forBrowser
    )
  };

  return result;
}

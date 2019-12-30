// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

export const isNode =
  !!process && !!process.version && !!process.versions && !!process.versions.node;

/**
 * Enum to abstract away string values used for the Environment Variable key names.
 * These are the entity name related keys to be configured for Node platform and
 * get suffixed with `-BROWSER` in context of browser platform.
 * This is done in order to allow for browser and node tests to be
 * run in parallel by using independent entities.
 */
export enum EnvVarKeys {
  SERVICEBUS_CONNECTION_STRING = "SERVICEBUS_CONNECTION_STRING",
  AAD_CLIENT_ID = "AAD_CLIENT_ID",
  AAD_CLIENT_SECRET = "AAD_CLIENT_SECRET",
  AAD_TENANT_ID = "AAD_TENANT_ID",
  RESOURCE_GROUP = "RESOURCE_GROUP",
  AZURE_SUBSCRIPTION_ID = "AZURE_SUBSCRIPTION_ID",
  CLEAN_NAMESPACE = "CLEAN_NAMESPACE",

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
  MANAGEMENT_QUEUE_1 = "MANAGEMENT_QUEUE_1",
  MANAGEMENT_TOPIC_1 = "MANAGEMENT_TOPIC_1",
  MANAGEMENT_SUBSCRIPTION_1 = "MANAGEMENT_SUBSCRIPTION_1",
  MANAGEMENT_RULE_1 = "MANAGEMENT_RULE_1",
  MANAGEMENT_TOPIC_2 = "MANAGEMENT_TOPIC_2",
  MANAGEMENT_SUBSCRIPTION_2 = "MANAGEMENT_SUBSCRIPTION_2",
  MANAGEMENT_TOPIC_3 = "MANAGEMENT_TOPIC_3",
  MANAGEMENT_NEW_ENTITY_1 = "MANAGEMENT_NEW_ENTITY_1",
  MANAGEMENT_NEW_ENTITY_2 = "MANAGEMENT_NEW_ENTITY_2"
}

/**
 * Environment variables that are mandatory.
 */
const mandatoryEnvVars = [EnvVarKeys.SERVICEBUS_CONNECTION_STRING];

/**
 * Environment variables that are related to AAD. If `CLEAN_NAMESPACE`
 * is set to `true`, then these are treated as mandatory as well.
 */
const aadRelatedEnvVars = [
  EnvVarKeys.AAD_CLIENT_ID,
  EnvVarKeys.AAD_CLIENT_SECRET,
  EnvVarKeys.AAD_TENANT_ID,
  EnvVarKeys.AZURE_SUBSCRIPTION_ID,
  EnvVarKeys.RESOURCE_GROUP
];

/**
 * Environment variables that are common for Node and Browser platforms.
 */
const commonEnvVars = [EnvVarKeys.SERVICEBUS_CONNECTION_STRING, EnvVarKeys.CLEAN_NAMESPACE].concat(
  aadRelatedEnvVars
);

/**
 * Utility to help throw an error if any of environment variables from
 * given array are not configured in the system.
 * @param envVars
 */
function throwMissingEnvironmentVariablesError(envVars: EnvVarKeys[]): void {
  envVars.forEach(function(key: EnvVarKeys) {
    if (!getEnvVarValue(key)) {
      throw new Error(`Define ${key} in your environment before running integration tests.`);
    }
  });
}

/**
 * Reference to object holding default values for entity names.
 * These are the default values used in Node platform and get suffixed
 * with `-browser` for browser platform.
 */
const defaultValueMap: any = {
  [EnvVarKeys.QUEUE_NAME]: "partitioned-queue",
  [EnvVarKeys.QUEUE_NAME_NO_PARTITION]: "unpartitioned-queue",
  [EnvVarKeys.QUEUE_NAME_SESSION]: "partitioned-queue-sessions",
  [EnvVarKeys.QUEUE_NAME_NO_PARTITION_SESSION]: "unpartitioned-queue-sessions",
  [EnvVarKeys.TOPIC_NAME]: "partitioned-topic",
  [EnvVarKeys.TOPIC_NAME_NO_PARTITION]: "unpartitioned-topic",
  [EnvVarKeys.TOPIC_NAME_SESSION]: "partitioned-topic-sessions",
  [EnvVarKeys.TOPIC_NAME_NO_PARTITION_SESSION]: "unpartitioned-topic-sessions",
  [EnvVarKeys.SUBSCRIPTION_NAME]: "partitioned-topic-subscription",
  [EnvVarKeys.SUBSCRIPTION_NAME_NO_PARTITION]: "unpartitioned-topic-subscription",
  [EnvVarKeys.SUBSCRIPTION_NAME_SESSION]: "partitioned-topic-sessions-subscription",
  [EnvVarKeys.SUBSCRIPTION_NAME_NO_PARTITION_SESSION]: "unpartitioned-topic-sessions-subscription",
  [EnvVarKeys.TOPIC_FILTER_NAME]: "topic-filter",
  [EnvVarKeys.TOPIC_FILTER_SUBSCRIPTION_NAME]: "topic-filter-subscription",
  [EnvVarKeys.TOPIC_FILTER_DEFAULT_SUBSCRIPTION_NAME]: "topic-filter-default-subscription",
  [EnvVarKeys.MANAGEMENT_QUEUE_1]: "management-queue-1",
  [EnvVarKeys.MANAGEMENT_TOPIC_1]: "management-topic-1",
  [EnvVarKeys.MANAGEMENT_SUBSCRIPTION_1]: "management-subscription-1",
  [EnvVarKeys.MANAGEMENT_RULE_1]: "management-rule-1",
  [EnvVarKeys.MANAGEMENT_TOPIC_2]: "management-topic-2",
  [EnvVarKeys.MANAGEMENT_SUBSCRIPTION_2]: "management-subscription-2",
  [EnvVarKeys.MANAGEMENT_TOPIC_3]: "management-topic-3",
  [EnvVarKeys.MANAGEMENT_NEW_ENTITY_1]: "management-new-entity-1",
  [EnvVarKeys.MANAGEMENT_NEW_ENTITY_2]: "management-new-entity-2"
};

/**
 * Utility to retrieve the environment variable value based
 * on targetted platform and type.
 *
 * All entity name related environment variables are suffixed with
 * `-BROWSER` for browser platform counterparts.
 * For example, for `QUEUE_NAME` environment variable, the value configured for
 * `QUEUE_NAME` environment variable is returned for Node platform,
 * and value for `QUEUE_NAME_BROWSER` environment variable is returned for browser platform.
 * If no values have been configured for these, default values are
 * computed and returned by this utility.
 *
 * All other environment variables do not have any default values and must be
 * configured in the environemnt.
 * These are covered by `commonEnvVars` array and are common between
 * Node and browser platforms implying that they have single, same name entries.
 * For example, for `SERVICEBUS_CONNECTION_STRING` environment variable, only the one
 * `SERVICEBUS_CONNECTION_STRING` environment variable is configured and same value
 * is used for both Node and browser test runs.
 *
 * @param name
 * @param forBrowser
 */
function getEnvVarValue(name: EnvVarKeys, forBrowser?: boolean): string | undefined {
  let result;
  if (isNode) {
    result = process.env[name];
  } else {
    let nameForBrowser;

    if (commonEnvVars.indexOf(name) > 0) {
      nameForBrowser = name;
    } else {
      nameForBrowser = forBrowser ? name + "_BROWSER" : name;
    }
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

// Reference to cached envVars that is unique per test run.
let envVars: any;

/**
 * Utility to return cached map of environment variables,
 * or create and return one from configured values if not existing.
 */
export function getEnvVars(): { [key in EnvVarKeys]: any } {
  if (envVars != undefined) {
    return envVars;
  }

  const forBrowser = !isNode;

  // Throw error only if mandatory env variable is missing
  // Or, if CLEAN_NAMESPACE is enabled and AAD related details are not provided
  throwMissingEnvironmentVariablesError(mandatoryEnvVars);

  if (getEnvVarValue(EnvVarKeys.CLEAN_NAMESPACE) === "true") {
    throwMissingEnvironmentVariablesError(aadRelatedEnvVars);
  }

  envVars = {
    [EnvVarKeys.SERVICEBUS_CONNECTION_STRING]: getEnvVarValue(
      EnvVarKeys.SERVICEBUS_CONNECTION_STRING
    ),
    [EnvVarKeys.AAD_CLIENT_ID]: getEnvVarValue(EnvVarKeys.AAD_CLIENT_ID),
    [EnvVarKeys.AAD_CLIENT_SECRET]: getEnvVarValue(EnvVarKeys.AAD_CLIENT_SECRET),
    [EnvVarKeys.AAD_TENANT_ID]: getEnvVarValue(EnvVarKeys.AAD_TENANT_ID),
    [EnvVarKeys.RESOURCE_GROUP]: getEnvVarValue(EnvVarKeys.RESOURCE_GROUP),
    [EnvVarKeys.AZURE_SUBSCRIPTION_ID]: getEnvVarValue(EnvVarKeys.AZURE_SUBSCRIPTION_ID),
    [EnvVarKeys.CLEAN_NAMESPACE]: getEnvVarValue(EnvVarKeys.CLEAN_NAMESPACE) || false,

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
    [EnvVarKeys.MANAGEMENT_NEW_ENTITY_1]: getEnvVarValue(
      EnvVarKeys.MANAGEMENT_NEW_ENTITY_1,
      forBrowser
    ),
    [EnvVarKeys.MANAGEMENT_NEW_ENTITY_2]: getEnvVarValue(
      EnvVarKeys.MANAGEMENT_NEW_ENTITY_2,
      forBrowser
    )
  };

  return envVars;
}

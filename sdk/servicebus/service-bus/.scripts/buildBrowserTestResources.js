console.log("Creating browser resources...");

const msRestNodeAuth = require("@azure/ms-rest-nodeauth");

const ServiceBusManagementClient = require("@azure/arm-servicebus").ServiceBusManagementClient;

const dotenv = require("dotenv");
dotenv.config();

const defaultLockDuration = "PT30S"; // 30 seconds in ISO 8601 FORMAT - equivalent to "P0Y0M0DT0H0M30S"

EnvVarKeys = {
  SERVICEBUS_CONNECTION_STRING: "SERVICEBUS_CONNECTION_STRING",
  QUEUE_NAME: "QUEUE_NAME_BROWSER",
  QUEUE_NAME_NO_PARTITION: "QUEUE_NAME_NO_PARTITION_BROWSER",
  QUEUE_NAME_SESSION: "QUEUE_NAME_SESSION_BROWSER",
  QUEUE_NAME_NO_PARTITION_SESSION: "QUEUE_NAME_NO_PARTITION_SESSION_BROWSER",
  TOPIC_NAME: "TOPIC_NAME_BROWSER",
  TOPIC_NAME_NO_PARTITION: "TOPIC_NAME_NO_PARTITION_BROWSER",
  TOPIC_NAME_SESSION: "TOPIC_NAME_SESSION_BROWSER",
  TOPIC_NAME_NO_PARTITION_SESSION: "TOPIC_NAME_NO_PARTITION_SESSION_BROWSER",
  SUBSCRIPTION_NAME: "SUBSCRIPTION_NAME_BROWSER",
  SUBSCRIPTION_NAME_NO_PARTITION: "SUBSCRIPTION_NAME_NO_PARTITION_BROWSER",
  SUBSCRIPTION_NAME_SESSION: "SUBSCRIPTION_NAME_SESSION_BROWSER",
  SUBSCRIPTION_NAME_NO_PARTITION_SESSION: "SUBSCRIPTION_NAME_NO_PARTITION_SESSION_BROWSER",
  TOPIC_FILTER_NAME: "TOPIC_FILTER_NAME_BROWSER",
  TOPIC_FILTER_SUBSCRIPTION_NAME: "TOPIC_FILTER_SUBSCRIPTION_NAME_BROWSER",
  TOPIC_FILTER_DEFAULT_SUBSCRIPTION_NAME: "TOPIC_FILTER_DEFAULT_SUBSCRIPTION_NAME_BROWSER",
  AAD_CLIENT_ID: "AAD_CLIENT_ID",
  AAD_CLIENT_SECRET: "AAD_CLIENT_SECRET",
  AAD_TENANT_ID: "AAD_TENANT_ID",
  RESOURCE_GROUP: "RESOURCE_GROUP",
  AZURE_SUBSCRIPTION_ID: "AZURE_SUBSCRIPTION_ID",
  CLEAN_NAMESPACE: "CLEAN_NAMESPACE"
};

const mandatoryEnvVars = [EnvVarKeys.SERVICEBUS_CONNECTION_STRING];

const aadRelatedEnvVars = [
  EnvVarKeys.AAD_CLIENT_ID,
  EnvVarKeys.AAD_CLIENT_SECRET,
  EnvVarKeys.AAD_TENANT_ID,
  EnvVarKeys.AZURE_SUBSCRIPTION_ID,
  EnvVarKeys.RESOURCE_GROUP
];

const env = getEnvVars();

buildResources()
  .then(() => {
    console.log("DONE Creating browser resources.");
  })
  .catch((err) => {
    console.log("Error occured!!");
    throw err;
  });

async function buildResources() {
  await recreateQueue(env[EnvVarKeys.QUEUE_NAME], {
    lockDuration: defaultLockDuration,
    enablePartitioning: true,
    enableBatchedOperations: true
  });

  await recreateTopic(env[EnvVarKeys.TOPIC_NAME], {
    enablePartitioning: true,
    enableBatchedOperations: true
  });
  await recreateSubscription(env[EnvVarKeys.TOPIC_NAME], env[EnvVarKeys.SUBSCRIPTION_NAME], {
    lockDuration: defaultLockDuration,
    enableBatchedOperations: true
  });

  await recreateQueue(env[EnvVarKeys.QUEUE_NAME_NO_PARTITION], {
    lockDuration: defaultLockDuration,
    enableBatchedOperations: true
  });

  await recreateTopic(env[EnvVarKeys.TOPIC_NAME_NO_PARTITION], {
    enableBatchedOperations: true
  });
  await recreateSubscription(
    env[EnvVarKeys.TOPIC_NAME_NO_PARTITION],
    env[EnvVarKeys.SUBSCRIPTION_NAME_NO_PARTITION],
    {
      lockDuration: defaultLockDuration,
      enableBatchedOperations: true
    }
  );

  await recreateQueue(env[EnvVarKeys.QUEUE_NAME_SESSION], {
    lockDuration: defaultLockDuration,
    enablePartitioning: true,
    enableBatchedOperations: true,
    requiresSession: true
  });

  await recreateTopic(env[EnvVarKeys.TOPIC_NAME_SESSION], {
    enablePartitioning: true,
    enableBatchedOperations: true
  });
  await recreateSubscription(
    env[EnvVarKeys.TOPIC_NAME_SESSION],
    env[EnvVarKeys.SUBSCRIPTION_NAME_SESSION],
    {
      lockDuration: defaultLockDuration,
      enableBatchedOperations: true,
      requiresSession: true
    }
  );

  await recreateQueue(env[EnvVarKeys.QUEUE_NAME_NO_PARTITION_SESSION], {
    lockDuration: defaultLockDuration,
    enableBatchedOperations: true,
    requiresSession: true
  });

  await recreateTopic(env[EnvVarKeys.TOPIC_NAME_NO_PARTITION_SESSION], {
    enableBatchedOperations: true
  });
  await recreateSubscription(
    env[EnvVarKeys.TOPIC_NAME_NO_PARTITION_SESSION],
    env[EnvVarKeys.SUBSCRIPTION_NAME_NO_PARTITION_SESSION],
    {
      lockDuration: defaultLockDuration,
      enableBatchedOperations: true,
      requiresSession: true
    }
  );

  await recreateTopic(env[EnvVarKeys.TOPIC_FILTER_NAME], {
    enableBatchedOperations: true
  });
  await recreateSubscription(
    env[EnvVarKeys.TOPIC_FILTER_NAME],
    env[EnvVarKeys.TOPIC_FILTER_DEFAULT_SUBSCRIPTION_NAME],
    {
      lockDuration: defaultLockDuration,
      enableBatchedOperations: true
    }
  );

  await recreateSubscription(
    env[EnvVarKeys.TOPIC_FILTER_NAME],
    env[EnvVarKeys.TOPIC_FILTER_SUBSCRIPTION_NAME],
    {
      lockDuration: defaultLockDuration,
      enableBatchedOperations: true
    }
  );

  async function recreateQueue(queueName, parameters) {
    await msRestNodeAuth
      .loginWithServicePrincipalSecret(
        env[EnvVarKeys.AAD_CLIENT_ID],
        env[EnvVarKeys.AAD_CLIENT_SECRET],
        env[EnvVarKeys.AAD_TENANT_ID]
      )
      .then(async (creds) => {
        const client = await new ServiceBusManagementClient(
          creds,
          env[EnvVarKeys.AZURE_SUBSCRIPTION_ID]
        );
        await client.queues.deleteMethod(
          env[EnvVarKeys.RESOURCE_GROUP],
          getNamespace(env[EnvVarKeys.SERVICEBUS_CONNECTION_STRING]),
          queueName,
          function(error) {
            if (error) throw error.message;
          }
        );
        await client.queues.createOrUpdate(
          env[EnvVarKeys.RESOURCE_GROUP],
          getNamespace(env[EnvVarKeys.SERVICEBUS_CONNECTION_STRING]),
          queueName,
          parameters,
          function(error) {
            if (error) throw error.message;
          }
        );
      });
  }

  async function recreateTopic(topicName, parameters) {
    await msRestNodeAuth
      .loginWithServicePrincipalSecret(
        env[EnvVarKeys.AAD_CLIENT_ID],
        env[EnvVarKeys.AAD_CLIENT_SECRET],
        env[EnvVarKeys.AAD_TENANT_ID]
      )
      .then(async (creds) => {
        const client = await new ServiceBusManagementClient(
          creds,
          env[EnvVarKeys.AZURE_SUBSCRIPTION_ID]
        );
        await client.topics.deleteMethod(
          env[EnvVarKeys.RESOURCE_GROUP],
          getNamespace(env[EnvVarKeys.SERVICEBUS_CONNECTION_STRING]),
          topicName,
          function(error) {
            if (error) throw error.message;
          }
        );
        await client.topics.createOrUpdate(
          env[EnvVarKeys.RESOURCE_GROUP],
          getNamespace(env[EnvVarKeys.SERVICEBUS_CONNECTION_STRING]),
          topicName,
          parameters,
          function(error) {
            if (error) throw error.message;
          }
        );
      });
  }

  async function recreateSubscription(topicName, subscriptionName, parameters) {
    await msRestNodeAuth
      .loginWithServicePrincipalSecret(
        env[EnvVarKeys.AAD_CLIENT_ID],
        env[EnvVarKeys.AAD_CLIENT_SECRET],
        env[EnvVarKeys.AAD_TENANT_ID]
      )
      .then(async (creds) => {
        const client = await new ServiceBusManagementClient(
          creds,
          env[EnvVarKeys.AZURE_SUBSCRIPTION_ID]
        );
        /*
        Unlike Queues/Topics, there is no need to delete the subscription because
        `recreateTopic` is called before `recreateSubscription` which would
        delete the topic and the subscriptions before creating a new topic.
      */
        await client.subscriptions.createOrUpdate(
          env[EnvVarKeys.RESOURCE_GROUP],
          getNamespace(env[EnvVarKeys.SERVICEBUS_CONNECTION_STRING]),
          topicName,
          subscriptionName,
          parameters,
          function(error) {
            if (error) throw error.message;
          }
        );
      });
  }
}

/**
 * Utility function to get namespace string from given connection string
 * @param serviceBusConnectionString
 */
function getNamespace(serviceBusConnectionString) {
  return (serviceBusConnectionString.match("Endpoint=sb://(.*).servicebus.windows.net") || "")[1];
}

function throwMissingEnvironmentVariablesError(envVars) {
  envVars.forEach(function(key) {
    const name = key.valueOf();
    if (!process.env[name]) {
      throw new Error(`Define ${name} in your environment before running integration tests.`);
    }
  });
}

function getEnvVars() {
  // Throw error only if mandatory env variable is missing
  // Or, if CLEAN_NAMESPACE is enabled and AAD related details are not provided
  throwMissingEnvironmentVariablesError(mandatoryEnvVars);

  if (process.env[EnvVarKeys.CLEAN_NAMESPACE] === "true") {
    throwMissingEnvironmentVariablesError(aadRelatedEnvVars);
  }

  return {
    [EnvVarKeys.SERVICEBUS_CONNECTION_STRING]: process.env[EnvVarKeys.SERVICEBUS_CONNECTION_STRING],
    [EnvVarKeys.QUEUE_NAME]: process.env[EnvVarKeys.QUEUE_NAME] || "partitioned-queue-browser",
    [EnvVarKeys.QUEUE_NAME_NO_PARTITION]:
      process.env[EnvVarKeys.QUEUE_NAME_NO_PARTITION] || "unpartitioned-queue-browser",
    [EnvVarKeys.QUEUE_NAME_SESSION]:
      process.env[EnvVarKeys.QUEUE_NAME_SESSION] || "partitioned-queue-sessions-browser",
    [EnvVarKeys.QUEUE_NAME_NO_PARTITION_SESSION]:
      process.env[EnvVarKeys.QUEUE_NAME_NO_PARTITION_SESSION] ||
      "unpartitioned-queue-sessions-browser",
    [EnvVarKeys.TOPIC_NAME]: process.env[EnvVarKeys.TOPIC_NAME] || "partitioned-topic-browser",
    [EnvVarKeys.TOPIC_NAME_NO_PARTITION]:
      process.env[EnvVarKeys.TOPIC_NAME_NO_PARTITION] || "unpartitioned-topic-browser",
    [EnvVarKeys.TOPIC_NAME_SESSION]:
      process.env[EnvVarKeys.TOPIC_NAME_SESSION] || "partitioned-topic-sessions-browser",
    [EnvVarKeys.TOPIC_NAME_NO_PARTITION_SESSION]:
      process.env[EnvVarKeys.TOPIC_NAME_NO_PARTITION_SESSION] ||
      "unpartitioned-topic-sessions-browser",
    [EnvVarKeys.SUBSCRIPTION_NAME]:
      process.env[EnvVarKeys.SUBSCRIPTION_NAME] || "partitioned-topic-subscription-browser",
    [EnvVarKeys.SUBSCRIPTION_NAME_NO_PARTITION]:
      process.env[EnvVarKeys.SUBSCRIPTION_NAME_NO_PARTITION] ||
      "unpartitioned-topic-subscription-browser",
    [EnvVarKeys.SUBSCRIPTION_NAME_SESSION]:
      process.env[EnvVarKeys.SUBSCRIPTION_NAME_SESSION] ||
      "partitioned-topic-sessions-subscription-browser",
    [EnvVarKeys.SUBSCRIPTION_NAME_NO_PARTITION_SESSION]:
      process.env[EnvVarKeys.SUBSCRIPTION_NAME_NO_PARTITION_SESSION] ||
      "unpartitioned-topic-sessions-subscription-browser",
    [EnvVarKeys.TOPIC_FILTER_NAME]:
      process.env[EnvVarKeys.TOPIC_FILTER_NAME] || "topic-filter-browser",
    [EnvVarKeys.TOPIC_FILTER_SUBSCRIPTION_NAME]:
      process.env[EnvVarKeys.TOPIC_FILTER_SUBSCRIPTION_NAME] || "topic-filter-subscription-browser",
    [EnvVarKeys.TOPIC_FILTER_DEFAULT_SUBSCRIPTION_NAME]:
      process.env[EnvVarKeys.TOPIC_FILTER_DEFAULT_SUBSCRIPTION_NAME] ||
      "topic-filter-default-subscription-browser",
    [EnvVarKeys.AAD_CLIENT_ID]: process.env[EnvVarKeys.AAD_CLIENT_ID],
    [EnvVarKeys.AAD_CLIENT_SECRET]: process.env[EnvVarKeys.AAD_CLIENT_SECRET],
    [EnvVarKeys.AAD_TENANT_ID]: process.env[EnvVarKeys.AAD_TENANT_ID],
    [EnvVarKeys.RESOURCE_GROUP]: process.env[EnvVarKeys.RESOURCE_GROUP],
    [EnvVarKeys.AZURE_SUBSCRIPTION_ID]: process.env[EnvVarKeys.AZURE_SUBSCRIPTION_ID],
    [EnvVarKeys.CLEAN_NAMESPACE]: process.env[EnvVarKeys.CLEAN_NAMESPACE] || false
  };
}

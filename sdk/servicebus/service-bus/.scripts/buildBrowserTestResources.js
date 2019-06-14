console.log("Creating browser resources...");

const msRestNodeAuth = require("@azure/ms-rest-nodeauth");

const ServiceBusManagementClient = require("@azure/arm-servicebus").ServiceBusManagementClient;

const dotenv = require("dotenv");
dotenv.config();

const defaultLockDuration = "PT30S"; // 30 seconds in ISO 8601 FORMAT - equivalent to "P0Y0M0DT0H0M30S"

EnvVarKeys = {
  SERVICEBUS_CONNECTION_STRING: "SERVICEBUS_CONNECTION_STRING",
  QUEUE_NAME: "QUEUE_NAME",
  QUEUE_NAME_NO_PARTITION: "QUEUE_NAME_NO_PARTITION",
  QUEUE_NAME_SESSION: "QUEUE_NAME_SESSION",
  QUEUE_NAME_NO_PARTITION_SESSION: "QUEUE_NAME_NO_PARTITION_SESSION",
  TOPIC_NAME: "TOPIC_NAME",
  TOPIC_NAME_NO_PARTITION: "TOPIC_NAME_NO_PARTITION",
  TOPIC_NAME_SESSION: "TOPIC_NAME_SESSION",
  TOPIC_NAME_NO_PARTITION_SESSION: "TOPIC_NAME_NO_PARTITION_SESSION",
  SUBSCRIPTION_NAME: "SUBSCRIPTION_NAME",
  SUBSCRIPTION_NAME_NO_PARTITION: "SUBSCRIPTION_NAME_NO_PARTITION",
  SUBSCRIPTION_NAME_SESSION: "SUBSCRIPTION_NAME_SESSION",
  SUBSCRIPTION_NAME_NO_PARTITION_SESSION: "SUBSCRIPTION_NAME_NO_PARTITION_SESSION",
  TOPIC_FILTER_NAME: "TOPIC_FILTER_NAME",
  TOPIC_FILTER_SUBSCRIPTION_NAME: "TOPIC_FILTER_SUBSCRIPTION_NAME",
  TOPIC_FILTER_DEFAULT_SUBSCRIPTION_NAME: "TOPIC_FILTER_DEFAULT_SUBSCRIPTION_NAME",
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

const env = getEnvVars(true);

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
    if (!getEnvVarValue(name)) {
      throw new Error(`Define ${name} in your environment before running integration tests.`);
    }
  });
}

function getEnvVarValue(name, forBrowser) {
  if (forBrowser) {
    name = name + "_BROWSER";
  }
  return process.env[name];
}

function getEnvVars(forBrowser) {
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
    [EnvVarKeys.QUEUE_NAME]:
      getEnvVarValue(EnvVarKeys.QUEUE_NAME, forBrowser) || forBrowser
        ? "partitioned-queue-browser"
        : "partitioned-queue",
    [EnvVarKeys.QUEUE_NAME_NO_PARTITION]:
      getEnvVarValue(EnvVarKeys.QUEUE_NAME_NO_PARTITION, forBrowser) || forBrowser
        ? "unpartitioned-queue-browser"
        : "unpartitioned-queue",
    [EnvVarKeys.QUEUE_NAME_SESSION]:
      getEnvVarValue(EnvVarKeys.QUEUE_NAME_SESSION, forBrowser) || forBrowser
        ? "partitioned-queue-sessions-browser"
        : "partitioned-queue-sessions",
    [EnvVarKeys.QUEUE_NAME_NO_PARTITION_SESSION]:
      getEnvVarValue(EnvVarKeys.QUEUE_NAME_NO_PARTITION_SESSION, forBrowser) || forBrowser
        ? "unpartitioned-queue-sessions-browser"
        : "unpartitioned-queue-sessions",
    [EnvVarKeys.TOPIC_NAME]:
      getEnvVarValue(EnvVarKeys.TOPIC_NAME, forBrowser) || forBrowser
        ? "partitioned-topic-browser"
        : "partitioned-topic",
    [EnvVarKeys.TOPIC_NAME_NO_PARTITION]:
      getEnvVarValue(EnvVarKeys.TOPIC_NAME_NO_PARTITION, forBrowser) || forBrowser
        ? "unpartitioned-topic-browser"
        : "unpartitioned-topic",
    [EnvVarKeys.TOPIC_NAME_SESSION]:
      getEnvVarValue(EnvVarKeys.TOPIC_NAME_SESSION, forBrowser) || forBrowser
        ? "partitioned-topic-sessions-browser"
        : "partitioned-topic-sessions",
    [EnvVarKeys.TOPIC_NAME_NO_PARTITION_SESSION]:
      getEnvVarValue(EnvVarKeys.TOPIC_NAME_NO_PARTITION_SESSION, forBrowser) || forBrowser
        ? "unpartitioned-topic-sessions-browser"
        : "unpartitioned-topic-sessions",
    [EnvVarKeys.SUBSCRIPTION_NAME]:
      getEnvVarValue(EnvVarKeys.SUBSCRIPTION_NAME, forBrowser) || forBrowser
        ? "partitioned-topic-subscription-browser"
        : "partitioned-topic-subscription",
    [EnvVarKeys.SUBSCRIPTION_NAME_NO_PARTITION]:
      getEnvVarValue(EnvVarKeys.SUBSCRIPTION_NAME_NO_PARTITION, forBrowser) || forBrowser
        ? "unpartitioned-topic-subscription-browser"
        : "unpartitioned-topic-subscription",
    [EnvVarKeys.SUBSCRIPTION_NAME_SESSION]:
      getEnvVarValue(EnvVarKeys.SUBSCRIPTION_NAME_SESSION, forBrowser) || forBrowser
        ? "partitioned-topic-sessions-subscription-browser"
        : "partitioned-topic-sessions-subscription",
    [EnvVarKeys.SUBSCRIPTION_NAME_NO_PARTITION_SESSION]:
      getEnvVarValue(EnvVarKeys.SUBSCRIPTION_NAME_NO_PARTITION_SESSION, forBrowser) || forBrowser
        ? "unpartitioned-topic-sessions-subscription-browser"
        : "unpartitioned-topic-sessions-subscription",
    [EnvVarKeys.TOPIC_FILTER_NAME]:
      getEnvVarValue(EnvVarKeys.TOPIC_FILTER_NAME, forBrowser) || forBrowser
        ? "topic-filter-browser"
        : "topic-filter",
    [EnvVarKeys.TOPIC_FILTER_SUBSCRIPTION_NAME]:
      getEnvVarValue(EnvVarKeys.TOPIC_FILTER_SUBSCRIPTION_NAME, forBrowser) || forBrowser
        ? "topic-filter-subscription-browser"
        : "topic-filter-subscription",
    [EnvVarKeys.TOPIC_FILTER_DEFAULT_SUBSCRIPTION_NAME]:
      getEnvVarValue(EnvVarKeys.TOPIC_FILTER_DEFAULT_SUBSCRIPTION_NAME, forBrowser) || forBrowser
        ? "topic-filter-default-subscription-browser"
        : "topic-filter-default-subscription",
    [EnvVarKeys.AAD_CLIENT_ID]: getEnvVarValue(EnvVarKeys.AAD_CLIENT_ID),
    [EnvVarKeys.AAD_CLIENT_SECRET]: getEnvVarValue(EnvVarKeys.AAD_CLIENT_SECRET),
    [EnvVarKeys.AAD_TENANT_ID]: getEnvVarValue(EnvVarKeys.AAD_TENANT_ID),
    [EnvVarKeys.RESOURCE_GROUP]: getEnvVarValue(EnvVarKeys.RESOURCE_GROUP),
    [EnvVarKeys.AZURE_SUBSCRIPTION_ID]: getEnvVarValue(
      EnvVarKeys.AZURE_SUBSCRIPTION_ID,
      forBrowser
    ),
    [EnvVarKeys.CLEAN_NAMESPACE]: getEnvVarValue(EnvVarKeys.CLEAN_NAMESPACE) || false
  };
}

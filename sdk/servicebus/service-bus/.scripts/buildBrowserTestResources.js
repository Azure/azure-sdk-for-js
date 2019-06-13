import { recreateQueue, recreateTopic, recreateSubscription } from "../test/utils/aadUtils";
import { getEnvVars } from "../test/utils/envVarUtils";

buildBrowserTestResources();

function buildBrowserTestResources() {
  const env = getEnvVars(true);

  const defaultLockDuration = "PT30S"; // 30 seconds in ISO 8601 FORMAT - equivalent to "P0Y0M0DT0H0M30S"

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
}

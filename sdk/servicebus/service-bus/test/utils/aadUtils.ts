import * as msRestNodeAuth from "@azure/ms-rest-nodeauth";
import { ServiceBusManagementClient } from "@azure/arm-servicebus";
import { SBQueue, SBTopic, SBSubscription } from "@azure/arm-servicebus/esm/models";
import { EnvVarKeys, getEnvVars } from "./envVarUtils";

const _loginWithServicePrincipalSecret = msRestNodeAuth.loginWithServicePrincipalSecret;

export const loginWithServicePrincipalSecret = _loginWithServicePrincipalSecret;

export async function recreateQueue(queueName: string, parameters: SBQueue): Promise<void> {
  const env = getEnvVars();
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
        function(error: any): void {
          if (error) throw error.message;
        }
      );
      await client.queues.createOrUpdate(
        env[EnvVarKeys.RESOURCE_GROUP],
        getNamespace(env[EnvVarKeys.SERVICEBUS_CONNECTION_STRING]),
        queueName,
        parameters,
        function(error: any): void {
          if (error) throw error.message;
        }
      );
    });
}

export async function recreateTopic(topicName: string, parameters: SBTopic): Promise<void> {
  const env = getEnvVars();
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
        function(error: any): void {
          if (error) throw error.message;
        }
      );
      await client.topics.createOrUpdate(
        env[EnvVarKeys.RESOURCE_GROUP],
        getNamespace(env[EnvVarKeys.SERVICEBUS_CONNECTION_STRING]),
        topicName,
        parameters,
        function(error: any): void {
          if (error) throw error.message;
        }
      );
    });
}

export async function recreateSubscription(
  topicName: string,
  subscriptionName: string,
  parameters: SBSubscription
): Promise<void> {
  const env = getEnvVars();
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
        function(error: any): void {
          if (error) throw error.message;
        }
      );
    });
}

/**
 * Utility function to get namespace string from given connection string
 * @param serviceBusConnectionString
 */
export function getNamespace(serviceBusConnectionString: string): string {
  return (serviceBusConnectionString.match("Endpoint=sb://(.*).servicebus.windows.net") || "")[1];
}

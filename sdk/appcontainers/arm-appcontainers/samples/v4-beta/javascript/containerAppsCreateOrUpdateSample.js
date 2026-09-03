// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update a Container App.
 *
 * @summary create or update a Container App.
 * x-ms-original-file: 2025-10-02-preview/ContainerApps_CreateOrUpdate.json
 */
async function createOrUpdateContainerApp() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.containerApps.createOrUpdate("rg", "testcontainerApp0", {
    identity: {
      type: "SystemAssigned,UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/34adfa4f-cedf-4dc0-ba29-b6d1a69ab345/resourcegroups/rg/providers/Microsoft.ManagedIdentity/userAssignedIdentities/myidentity":
          {},
      },
    },
    location: "East US",
    configuration: {
      dapr: {
        appHealth: {
          path: "/health",
          enabled: true,
          probeIntervalSeconds: 3,
          probeTimeoutMilliseconds: 1000,
          threshold: 3,
        },
        appPort: 3000,
        appProtocol: "http",
        enableApiLogging: true,
        enabled: true,
        httpMaxRequestSize: 10,
        httpReadBufferSize: 30,
        logLevel: "debug",
        maxConcurrency: 10,
      },
      identitySettings: [
        {
          identity:
            "/subscriptions/34adfa4f-cedf-4dc0-ba29-b6d1a69ab345/resourcegroups/rg/providers/Microsoft.ManagedIdentity/userAssignedIdentities/myidentity",
          lifecycle: "All",
        },
        { identity: "system", lifecycle: "Init" },
      ],
      ingress: {
        additionalPortMappings: [
          { external: true, targetPort: 1234 },
          { exposedPort: 3456, external: false, targetPort: 2345 },
        ],
        clientCertificateMode: "accept",
        corsPolicy: {
          allowCredentials: true,
          allowedHeaders: ["HEADER1", "HEADER2"],
          allowedMethods: ["GET", "POST"],
          allowedOrigins: ["https://a.test.com", "https://b.test.com"],
          exposeHeaders: ["HEADER3", "HEADER4"],
          maxAge: 1234,
        },
        customDomains: [
          {
            name: "www.my-name.com",
            bindingType: "SniEnabled",
            certificateId:
              "/subscriptions/34adfa4f-cedf-4dc0-ba29-b6d1a69ab345/resourceGroups/rg/providers/Microsoft.App/managedEnvironments/demokube/certificates/my-certificate-for-my-name-dot-com",
          },
          {
            name: "www.my-other-name.com",
            bindingType: "SniEnabled",
            certificateId:
              "/subscriptions/34adfa4f-cedf-4dc0-ba29-b6d1a69ab345/resourceGroups/rg/providers/Microsoft.App/managedEnvironments/demokube/certificates/my-certificate-for-my-other-name-dot-com",
          },
        ],
        external: true,
        ipSecurityRestrictions: [
          {
            name: "Allow work IP A subnet",
            description: "Allowing all IP's within the subnet below to access containerapp",
            action: "Allow",
            ipAddressRange: "192.168.1.1/32",
          },
          {
            name: "Allow work IP B subnet",
            description: "Allowing all IP's within the subnet below to access containerapp",
            action: "Allow",
            ipAddressRange: "192.168.1.1/8",
          },
        ],
        stickySessions: { affinity: "sticky" },
        targetPort: 3000,
        traffic: [{ label: "production", revisionName: "testcontainerApp0-ab1234", weight: 100 }],
      },
      maxInactiveRevisions: 10,
      revisionTransitionThreshold: 100,
      runtime: {
        dotnet: { autoConfigureDataProtection: true },
        java: {
          enableMetrics: true,
          javaAgent: {
            enabled: true,
            logging: { loggerSettings: [{ level: "debug", logger: "org.springframework.boot" }] },
          },
        },
      },
      service: { type: "redis" },
    },
    environmentId:
      "/subscriptions/34adfa4f-cedf-4dc0-ba29-b6d1a69ab345/resourceGroups/rg/providers/Microsoft.App/managedEnvironments/demokube",
    template: {
      containers: [
        {
          name: "testcontainerApp0",
          image: "repo/testcontainerApp0:v1",
          probes: [
            {
              type: "Liveness",
              httpGet: {
                path: "/health",
                httpHeaders: [{ name: "Custom-Header", value: "Awesome" }],
                port: 8080,
              },
              initialDelaySeconds: 3,
              periodSeconds: 3,
            },
          ],
          volumeMounts: [
            { mountPath: "/mnt/path1", subPath: "subPath1", volumeName: "azurefile" },
            { mountPath: "/mnt/path2", subPath: "subPath2", volumeName: "nfsazurefile" },
          ],
        },
      ],
      initContainers: [
        {
          name: "testinitcontainerApp0",
          args: ["-c", "while true; do echo hello; sleep 10;done"],
          command: ["/bin/sh"],
          image: "repo/testcontainerApp0:v4",
          resources: { cpu: 0.2, gpu: 1, memory: "100Mi" },
        },
      ],
      scale: {
        cooldownPeriod: 350,
        maxReplicas: 5,
        minReplicas: 1,
        pollingInterval: 35,
        rules: [
          {
            name: "httpscalingrule",
            custom: { type: "http", metadata: { concurrentRequests: "50" } },
          },
          {
            name: "servicebus",
            custom: {
              type: "azure-servicebus",
              identity:
                "/subscriptions/34adfa4f-cedf-4dc0-ba29-b6d1a69ab345/resourcegroups/rg/providers/Microsoft.ManagedIdentity/userAssignedIdentities/myidentity",
              metadata: { messageCount: "5", namespace: "mynamespace", queueName: "myqueue" },
            },
          },
          {
            name: "azure-queue",
            azureQueue: {
              accountName: "account1",
              identity: "system",
              queueLength: 1,
              queueName: "queue1",
            },
          },
        ],
      },
      serviceBinds: [
        {
          name: "redisService",
          clientType: "dotnet",
          customizedKeys: { DesiredKey: "defaultKey" },
          serviceId:
            "/subscriptions/34adfa4f-cedf-4dc0-ba29-b6d1a69ab345/resourceGroups/rg/providers/Microsoft.App/containerApps/redisService",
        },
      ],
      volumes: [
        { name: "azurefile", storageName: "storage", storageType: "AzureFile" },
        { name: "nfsazurefile", storageName: "nfsStorage", storageType: "NfsAzureFile" },
      ],
    },
    workloadProfileName: "My-GP-01",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create or update a Container App.
 *
 * @summary create or update a Container App.
 * x-ms-original-file: 2025-10-02-preview/ContainerApps_CreateOrUpdate_ConnectedEnvironment.json
 */
async function createOrUpdateAppOnAConnectedEnvironment() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.containerApps.createOrUpdate("rg", "testcontainerApp0", {
    extendedLocation: {
      name: "/subscriptions/34adfa4f-cedf-4dc0-ba29-b6d1a69ab345/resourceGroups/rg/providers/Microsoft.ExtendedLocation/customLocations/testcustomlocation",
      type: "CustomLocation",
    },
    location: "East US",
    configuration: {
      dapr: {
        appPort: 3000,
        appProtocol: "http",
        enableApiLogging: true,
        enabled: true,
        httpMaxRequestSize: 10,
        httpReadBufferSize: 30,
        logLevel: "debug",
      },
      ingress: {
        additionalPortMappings: [
          { external: true, targetPort: 1234 },
          { exposedPort: 3456, external: false, targetPort: 2345 },
        ],
        clientCertificateMode: "accept",
        corsPolicy: {
          allowCredentials: true,
          allowedHeaders: ["HEADER1", "HEADER2"],
          allowedMethods: ["GET", "POST"],
          allowedOrigins: ["https://a.test.com", "https://b.test.com"],
          exposeHeaders: ["HEADER3", "HEADER4"],
          maxAge: 1234,
        },
        customDomains: [
          {
            name: "www.my-name.com",
            bindingType: "SniEnabled",
            certificateId:
              "/subscriptions/34adfa4f-cedf-4dc0-ba29-b6d1a69ab345/resourceGroups/rg/providers/Microsoft.App/connectedEnvironments/demokube/certificates/my-certificate-for-my-name-dot-com",
          },
          {
            name: "www.my-other-name.com",
            bindingType: "SniEnabled",
            certificateId:
              "/subscriptions/34adfa4f-cedf-4dc0-ba29-b6d1a69ab345/resourceGroups/rg/providers/Microsoft.App/connectedEnvironments/demokube/certificates/my-certificate-for-my-other-name-dot-com",
          },
        ],
        external: true,
        ipSecurityRestrictions: [
          {
            name: "Allow work IP A subnet",
            description: "Allowing all IP's within the subnet below to access containerapp",
            action: "Allow",
            ipAddressRange: "192.168.1.1/32",
          },
          {
            name: "Allow work IP B subnet",
            description: "Allowing all IP's within the subnet below to access containerapp",
            action: "Allow",
            ipAddressRange: "192.168.1.1/8",
          },
        ],
        stickySessions: { affinity: "sticky" },
        targetPort: 3000,
        traffic: [{ label: "production", revisionName: "testcontainerApp0-ab1234", weight: 100 }],
      },
      maxInactiveRevisions: 10,
      revisionTransitionThreshold: 100,
      runtime: {
        dotnet: { autoConfigureDataProtection: true },
        java: {
          enableMetrics: true,
          javaAgent: {
            enabled: true,
            logging: { loggerSettings: [{ level: "debug", logger: "org.springframework.boot" }] },
          },
        },
      },
    },
    environmentId:
      "/subscriptions/34adfa4f-cedf-4dc0-ba29-b6d1a69ab345/resourceGroups/rg/providers/Microsoft.App/connectedEnvironments/demokube",
    template: {
      containers: [
        {
          name: "testcontainerApp0",
          image: "repo/testcontainerApp0:v1",
          probes: [
            {
              type: "Liveness",
              httpGet: {
                path: "/health",
                httpHeaders: [{ name: "Custom-Header", value: "Awesome" }],
                port: 8080,
              },
              initialDelaySeconds: 3,
              periodSeconds: 3,
            },
          ],
        },
      ],
      initContainers: [
        {
          name: "testinitcontainerApp0",
          args: ["-c", "while true; do echo hello; sleep 10;done"],
          command: ["/bin/sh"],
          image: "repo/testcontainerApp0:v4",
          resources: { cpu: 0.2, memory: "100Mi" },
        },
      ],
      scale: {
        cooldownPeriod: 350,
        maxReplicas: 5,
        minReplicas: 1,
        pollingInterval: 35,
        rules: [
          {
            name: "httpscalingrule",
            custom: { type: "http", metadata: { concurrentRequests: "50" } },
          },
        ],
      },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create or update a Container App.
 *
 * @summary create or update a Container App.
 * x-ms-original-file: 2025-10-02-preview/ContainerApps_Kind_FunctionApp_CreateOrUpdate.json
 */
async function createOrUpdateFunctionAppKind() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.containerApps.createOrUpdate("rg", "testcontainerAppFunctionKind", {
    kind: "functionapp",
    location: "East Us",
    managedBy:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg/providers/Microsoft.Web/sites/testcontainerAppFunctionKind",
    configuration: {
      activeRevisionsMode: "Single",
      ingress: { allowInsecure: false, external: true, targetPort: 80 },
    },
    managedEnvironmentId:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg/providers/Microsoft.App/managedEnvironments/testmanagedenv3",
    template: {
      containers: [
        {
          name: "function-app-container",
          env: [
            {
              name: "AzureWebJobsStorage",
              value:
                "DefaultEndpointsProtocol=https;AccountName=mystorageaccount;AccountKey=mykey;EndpointSuffix=core.windows.net",
            },
            { name: "FUNCTIONS_WORKER_RUNTIME", value: "dotnet" },
            { name: "WEBSITES_ENABLE_APP_SERVICE_STORAGE", value: "false" },
          ],
          image: "mcr.microsoft.com/azure-functions/dotnet:4",
          resources: { cpu: 0.5, memory: "1.0Gi" },
        },
      ],
      scale: { cooldownPeriod: 300, maxReplicas: 10, minReplicas: 0, pollingInterval: 30 },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create or update a Container App.
 *
 * @summary create or update a Container App.
 * x-ms-original-file: 2025-10-02-preview/ContainerApps_Kind_WorkflowApp_CreateOrUpdate.json
 */
async function createOrUpdateWorkflowAppKind() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.containerApps.createOrUpdate("rg", "testcontainerAppKind", {
    kind: "workflowapp",
    location: "East Us",
    managedBy:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg/providers/Microsoft.Web/sites/testcontainerAppKind",
    configuration: {
      activeRevisionsMode: "Single",
      ingress: { allowInsecure: false, external: true, targetPort: 443 },
    },
    managedEnvironmentId:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg/providers/Microsoft.App/managedEnvironments/testmanagedenv3",
    template: {
      containers: [
        {
          name: "logicapps-container",
          image: "default/logicapps-base:latest",
          resources: { cpu: 1, memory: "2.0Gi" },
        },
      ],
      scale: { cooldownPeriod: 350, maxReplicas: 30, minReplicas: 1, pollingInterval: 35 },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create or update a Container App.
 *
 * @summary create or update a Container App.
 * x-ms-original-file: 2025-10-02-preview/ContainerApps_ManagedBy_CreateOrUpdate.json
 */
async function createOrUpdateManagedByApp() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.containerApps.createOrUpdate("rg", "testcontainerAppManagedBy", {
    location: "East US",
    managedBy:
      "/subscriptions/34adfa4f-cedf-4dc0-ba29-b6d1a69ab345/resourceGroups/rg/providers/Microsoft.AppPlatform/Spring/springapp",
    configuration: {
      ingress: {
        exposedPort: 4000,
        external: true,
        targetPort: 3000,
        traffic: [{ revisionName: "testcontainerAppManagedBy-ab1234", weight: 100 }],
        transport: "tcp",
      },
    },
    environmentId:
      "/subscriptions/34adfa4f-cedf-4dc0-ba29-b6d1a69ab345/resourceGroups/rg/providers/Microsoft.App/managedEnvironments/demokube",
    template: {
      containers: [
        {
          name: "testcontainerAppManagedBy",
          image: "repo/testcontainerAppManagedBy:v1",
          probes: [
            {
              type: "Liveness",
              initialDelaySeconds: 3,
              periodSeconds: 3,
              tcpSocket: { port: 8080 },
            },
          ],
        },
      ],
      scale: {
        cooldownPeriod: 350,
        maxReplicas: 5,
        minReplicas: 1,
        pollingInterval: 35,
        rules: [{ name: "tcpscalingrule", tcp: { metadata: { concurrentConnections: "50" } } }],
      },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create or update a Container App.
 *
 * @summary create or update a Container App.
 * x-ms-original-file: 2025-10-02-preview/ContainerApps_SourceToCloudApp_CreateOrUpdate.json
 */
async function createOrUpdateSourceToCloudApp() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.containerApps.createOrUpdate("rg", "testcontainerApp0", {
    location: "East US",
    configuration: {
      dapr: {
        appPort: 3000,
        appProtocol: "http",
        enableApiLogging: true,
        enabled: true,
        httpMaxRequestSize: 10,
        httpReadBufferSize: 30,
        logLevel: "debug",
      },
      ingress: {
        additionalPortMappings: [
          { external: true, targetPort: 1234 },
          { exposedPort: 3456, external: false, targetPort: 2345 },
        ],
        clientCertificateMode: "accept",
        corsPolicy: {
          allowCredentials: true,
          allowedHeaders: ["HEADER1", "HEADER2"],
          allowedMethods: ["GET", "POST"],
          allowedOrigins: ["https://a.test.com", "https://b.test.com"],
          exposeHeaders: ["HEADER3", "HEADER4"],
          maxAge: 1234,
        },
        customDomains: [
          {
            name: "www.my-name.com",
            bindingType: "SniEnabled",
            certificateId:
              "/subscriptions/34adfa4f-cedf-4dc0-ba29-b6d1a69ab345/resourceGroups/rg/providers/Microsoft.App/managedEnvironments/demokube/certificates/my-certificate-for-my-name-dot-com",
          },
          {
            name: "www.my-other-name.com",
            bindingType: "SniEnabled",
            certificateId:
              "/subscriptions/34adfa4f-cedf-4dc0-ba29-b6d1a69ab345/resourceGroups/rg/providers/Microsoft.App/managedEnvironments/demokube/certificates/my-certificate-for-my-other-name-dot-com",
          },
        ],
        external: true,
        ipSecurityRestrictions: [
          {
            name: "Allow work IP A subnet",
            description: "Allowing all IP's within the subnet below to access containerapp",
            action: "Allow",
            ipAddressRange: "192.168.1.1/32",
          },
          {
            name: "Allow work IP B subnet",
            description: "Allowing all IP's within the subnet below to access containerapp",
            action: "Allow",
            ipAddressRange: "192.168.1.1/8",
          },
        ],
        stickySessions: { affinity: "sticky" },
        targetPort: 3000,
        traffic: [{ label: "production", revisionName: "testcontainerApp0-ab1234", weight: 100 }],
      },
      maxInactiveRevisions: 10,
      revisionTransitionThreshold: 100,
      service: { type: "redis" },
    },
    environmentId:
      "/subscriptions/34adfa4f-cedf-4dc0-ba29-b6d1a69ab345/resourceGroups/rg/providers/Microsoft.App/managedEnvironments/demokube",
    patchingConfiguration: { patchingMode: "Automatic" },
    template: {
      containers: [
        {
          name: "testcontainerApp0",
          image: "",
          imageType: "CloudBuild",
          probes: [
            {
              type: "Liveness",
              httpGet: {
                path: "/health",
                httpHeaders: [{ name: "Custom-Header", value: "Awesome" }],
                port: 8080,
              },
              initialDelaySeconds: 3,
              periodSeconds: 3,
            },
          ],
          volumeMounts: [
            { mountPath: "/mnt/path1", subPath: "subPath1", volumeName: "azurefile" },
            { mountPath: "/mnt/path2", subPath: "subPath2", volumeName: "nfsazurefile" },
          ],
        },
      ],
      initContainers: [
        {
          name: "testinitcontainerApp0",
          args: ["-c", "while true; do echo hello; sleep 10;done"],
          command: ["/bin/sh"],
          image: "repo/testcontainerApp0:v4",
          resources: { cpu: 0.2, memory: "100Mi" },
        },
      ],
      scale: {
        cooldownPeriod: 350,
        maxReplicas: 5,
        minReplicas: 1,
        pollingInterval: 35,
        rules: [
          {
            name: "httpscalingrule",
            custom: { type: "http", metadata: { concurrentRequests: "50" } },
          },
        ],
      },
      serviceBinds: [
        {
          name: "redisService",
          clientType: "dotnet",
          customizedKeys: { DesiredKey: "defaultKey" },
          serviceId:
            "/subscriptions/34adfa4f-cedf-4dc0-ba29-b6d1a69ab345/resourceGroups/rg/providers/Microsoft.App/containerApps/redisService",
        },
      ],
      volumes: [
        { name: "azurefile", storageName: "storage", storageType: "AzureFile" },
        { name: "nfsazurefile", storageName: "nfsStorage", storageType: "NfsAzureFile" },
      ],
    },
    workloadProfileName: "My-GP-01",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create or update a Container App.
 *
 * @summary create or update a Container App.
 * x-ms-original-file: 2025-10-02-preview/ContainerApps_TcpApp_CreateOrUpdate.json
 */
async function createOrUpdateTcpApp() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.containerApps.createOrUpdate("rg", "testcontainerAppTcp", {
    location: "East US",
    configuration: {
      ingress: {
        exposedPort: 4000,
        external: true,
        targetPort: 3000,
        traffic: [{ revisionName: "testcontainerAppTcp-ab1234", weight: 100 }],
        transport: "tcp",
      },
    },
    environmentId:
      "/subscriptions/34adfa4f-cedf-4dc0-ba29-b6d1a69ab345/resourceGroups/rg/providers/Microsoft.App/managedEnvironments/demokube",
    template: {
      containers: [
        {
          name: "testcontainerAppTcp",
          image: "repo/testcontainerAppTcp:v1",
          probes: [
            {
              type: "Liveness",
              initialDelaySeconds: 3,
              periodSeconds: 3,
              tcpSocket: { port: 8080 },
            },
          ],
        },
      ],
      scale: {
        cooldownPeriod: 350,
        maxReplicas: 5,
        minReplicas: 1,
        pollingInterval: 35,
        rules: [{ name: "tcpscalingrule", tcp: { metadata: { concurrentConnections: "50" } } }],
      },
    },
  });
  console.log(result);
}

async function main() {
  await createOrUpdateContainerApp();
  await createOrUpdateAppOnAConnectedEnvironment();
  await createOrUpdateFunctionAppKind();
  await createOrUpdateWorkflowAppKind();
  await createOrUpdateManagedByApp();
  await createOrUpdateSourceToCloudApp();
  await createOrUpdateTcpApp();
}

main().catch(console.error);

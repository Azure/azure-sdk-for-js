## Azure Cache for Redis: Microsoft Entra ID with node-redis client library

### Table of contents

- [Prerequisites](#prerequisites)
- [Authenticate with Microsoft Entra ID - Hello World](#authenticate-with-azure-ad-node-redis-hello-world)
- [Authenticate with Microsoft Entra ID - Handle Reauthentication](#authenticate-with-azure-ad-handle-reauthentication)
- [Authenticate with Microsoft Entra ID - Using Token Cache](#authenticate-with-azure-ad-using-token-cache)
- [Troubleshooting](#troubleshooting)

#### Prerequisites

- Configuration of Role and Role Assignments is required before using the sample code in this document.
- **Dependency Requirements:**
    Add the following dependencies to *package.json*:

    ```
    "dependencies": {
      "@azure/identity": "^3.2.2",
      "redis": "^4.6.6",
      }
    ```
- Familiarity with the [node-redis](https://github.com/redis/node-redis) and [Azure Identity for JavaScript](https://learn.microsoft.com/javascript/api/overview/azure/identity-readme?view=azure-node-latest) client libraries is assumed.

#### Samples Guidance

* [Authenticate with Microsoft Entra ID - Hello World](#authenticate-with-azure-ad-hello-world):
   This sample is recommended for users getting started to use Microsoft Entra authentication with Azure Cache for Redis.
* [Authenticate with Microsoft Entra ID - Handle Reauthentication](#authenticate-with-azure-ad-handle-reauthentication):
   This sample is recommended to users looking to build long-running applications and would like to handle reauthenticating with Microsoft Entra ID upon token expiry.
* [Authenticate with Microsoft Entra ID - Using Token Cache](#authenticate-with-azure-ad-using-token-cache):
  This sample is recommended to users looking to build long-running applications that would like to handle reauthenticating with a token cache. The token cache stores and proactively refreshes the Microsoft Entra access token 2 minutes before expiry and ensures a non-expired token is available for use when the cache is accessed.

#### Authenticate with Microsoft Entra ID: Hello World

This sample is intended to assist in authenticating a hosted Azure Cache for Redis instance with Microsoft Entra ID via the node-redis client library. It focuses on displaying the logic required to fetch a Microsoft Entra access token and to use it as password when setting up the node-redis instance.

##### Migration guidance

When migrating your existing application code to authenticate with Microsoft Entra ID, replace the password input with the Microsoft Entra token. Azure Redis Cache name, service principal username, Microsoft Entra token, and use of SSL are required while connecting with the cache. The username will depend on whether you're using service principal, managed identity, or Microsoft username. In case of service principal, the name of the app registration should be used as the username. In case of system-assigned managed identity, the username should be the name of the resource on which the system-assigned managed identity is enabled. In case of user-assigned managed identity, the name should be the username.

Integrate the logic in your application code to fetch a Microsoft Entra access token via the Azure Identity library, as shown below. Replace it with the password configuring/retrieving logic in your application code.

```ts
import { createClient } from "redis";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  // Construct a Token Credential from Identity library, e.g. ClientSecretCredential / ClientCertificateCredential / ManagedIdentityCredential, etc.
  const credential = new DefaultAzureCredential();
  const redisScope = "https://redis.azure.com/.default";

  // Fetch a Microsoft Entra token to be used for authentication. This token will be used as the password.
  let accessToken = await credential.getToken(redisScope);
  console.log("access Token", accessToken);

  // Create redis client and connect to the Azure Cache for Redis over the TLS port using the access token as password.
  const client = createClient({
    username: process.env.REDIS_SERVICE_PRINCIPAL_NAME,
    password: accessToken.token,
    url: `redis://${process.env.REDIS_HOSTNAME}:6380`,
    pingInterval: 100000,
    socket: { 
      tls: true,
      keepAlive: 0 
    },
  });

  client.on("error", (err) => console.log("Redis Client Error", err));
  await client.connect();
  // Set a value against your key in the Azure Redis Cache.
  await client.set("Az:key", "value1312");
  // Get value of your key in the Azure Redis Cache.
  console.log("value-", await client.get("Az:key"));
}

main().catch((err) => {
  console.log("error code: ", err.code);
  console.log("error message: ", err.message);
  console.log("error stack: ", err.stack);
});
```

##### Supported Token Credentials for Microsoft Entra Authentication

**Note:** The samples in this doc use the Azure Identity library's `DefaultAzureCredential` to fetch Microsoft Entra access token. The samples also use a Service Principal name as the username. The other supported `TokenCredential` implementations that can be used from [Azure Identity for JavaScript](https://learn.microsoft.com/javascript/api/overview/azure/identity-readme?view=azure-node-latest) are as follows:

* [Client Certificate Credential](https://docs.microsoft.com/javascript/api/@azure/identity/clientcertificatecredential?view=azure-node-latest)
* [Client Secret Credential](https://docs.microsoft.com/javascript/api/@azure/identity/clientsecretcredential?view=azure-node-latest)
* [Managed Identity Credential](https://docs.microsoft.com/javascript/api/@azure/identity/managedidentitycredential?view=azure-node-latest)
* [Username Password Credential](https://docs.microsoft.com/javascript/api/@azure/identity/usernamepasswordcredential?view=azure-node-latest)
* [Azure CLI Credential](https://docs.microsoft.com/javascript/api/@azure/identity/azureclicredential?view=azure-node-latest)
* [Interactive Browser Credential](https://docs.microsoft.com/javascript/api/@azure/identity/interactivebrowsercredential?view=azure-node-latest)
* [Device Code Credential](https://docs.microsoft.com/javascript/api/@azure/identity/devicecodecredential?view=azure-node-latest)

#### Authenticate with Microsoft Entra ID: Handle Reauthentication

This sample is intended to assist in authenticating a hosted Azure Cache for Redis instance with Microsoft Entra ID via the node-redis client library. It focuses on displaying the logic required to fetch a Microsoft Entra access token and to use it as password when setting up the node-redis instance. It further shows how to recreate and authenticate the node-redis instance when its connection is broken in error/exception scenarios.

##### Migration guidance

When migrating your existing application code to authenticate with Microsoft Entra ID, replace the password input with the Microsoft Entra token. Integrate the logic in your application code to fetch a Microsoft Entra access token via the Identity library, as shown below. Replace the password configuring/retrieving logic in your application code.

```ts
import { createClient } from "redis";
import { DefaultAzureCredential, TokenCredential } from "@azure/identity";
import * as dotenv from "dotenv";
dotenv.config();

async function returnPassword(credential: TokenCredential) {
    const redisScope = "https://redis.azure.com/.default";

    // Fetch a Microsoft Entra token to be used for authentication. This token will be used as the password.
    return credential.getToken(redisScope);
}

async function main() {
  // Construct a Token Credential from Azure Identity library
  const credential = new DefaultAzureCredential();
  let accessToken = await returnPassword(credential);
  // Create node-redis client and connect to the Azure Cache for Redis over the TLS port using the access token as password.
  let redisClient = createClient({
    username: process.env.REDIS_SERVICE_PRINCIPAL_NAME,
    password: accessToken.token,
    url: `redis://${process.env.REDIS_HOSTNAME}:6380`,
    pingInterval: 100000,
    socket: {
      tls: true,
      keepAlive:0
    },
  });
  await redisClient.connect();

  for (let i = 0; i < 3; i++) {
    try {
      // Set a value against your key in the Azure Redis Cache.
      await redisClient.set("Az:mykey", "value123"); 
      // Fetch value of your key in the Azure Redis Cache.
      console.log("redis key:", await redisClient.get("Az:mykey"));
      break;
    } catch (e) {
      console.log("error during redis get", e.toString());
      if ((accessToken.expiresOnTimestamp <= Date.now())|| (redis.status === "end" || "close") ) {
        await redis.disconnect();
        accessToken = await returnPassword(credential);
        redisClient = createClient({
          username: process.env.REDIS_SERVICE_PRINCIPAL_NAME,
          password: accessToken.token,
          url: `redis://${process.env.REDIS_HOSTNAME}:6380`,
          pingInterval: 100000,
          socket: {
            tls: true,
            keepAlive: 0
          },
        });
      }
    }
  }
}

main().catch((err) => {
  console.log("error code: ", err.code);
  console.log("error message: ", err.message);
  console.log("error stack: ", err.stack);
});
```

#### Authenticate with Microsoft Entra ID: Using Token Cache

This sample is intended to assist in authenticating a hosted Azure Cache for Redis instance with Microsoft Entra ID via node-redis client library. It focuses on displaying the logic required to fetch a Microsoft Entra access token using a token cache and to use it as password when setting up the node-redis instance. It also shows how to recreate and authenticate the node-redis instance using the cached access token when the client's connection is broken in error/exception scenarios. The token cache stores and proactively refreshes the Microsoft Entra access token 2 minutes before expiry and ensures a non-expired token is available for use when the cache is accessed.

##### Migration Guidance

When migrating your existing your application code to authenticate with Microsoft Entra ID, replace the password input with the Microsoft Entra token.
Integrate the logic in your application code to fetch a Microsoft Entra access token via the Azure Identity library. Store the token in a token cache, as shown below. Replace the token with the password configuring/retrieving logic in your application code.

```ts
import { createClient } from "redis";
import { DefaultAzureCredential, TokenCredential, AccessToken } from "@azure/identity";
import * as dotenv from "dotenv";
dotenv.config();

async function returnPassword(credential: TokenCredential) {
    const redisScope = "https://redis.azure.com/.default";

    // Fetch a Microsoft Entra token to be used for authentication. This token will be used as the password.
    return credential.getToken(redisScope);
}
function randomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function main() {
  // Construct a Token Credential from Azure Identity library, e.g. ClientSecretCredential / ClientCertificateCredential / ManagedIdentityCredential, etc.
  const credential = new DefaultAzureCredential();
  let accessTokenCache: AccessToken | undefined = undefined;
  let id;
  let redisClient;

  async function updateToken() {
    accessTokenCache = await returnPassword(credential);
    let randomTimestamp = randomNumber(120000,300000);
    id = setTimeout(updateToken, ((accessTokenCache.expiresOnTimestamp- randomTimestamp)) - Date.now());
    if(redisClient){
        console.log("Auth called...");
        await redisClient.auth({username: process.env.REDIS_SERVICE_PRINCIPAL_NAME,
            password: accessToken.token});
    }
  }

  await updateToken();
  let accessToken: AccessToken | undefined = {...accessTokenCache};
  // Create node-redis client and connect to the Azure Cache for Redis over the TLS port using the access token as password.
  redisClient = createClient({
    username: process.env.REDIS_SERVICE_PRINCIPAL_NAME,
    password: accessToken.token,
    url: `redis://${process.env.REDIS_HOSTNAME}:6380`,
    pingInterval: 100000,
    socket: {
      tls: true,
      keepAlive:0
    },
  });
  await redisClient.connect(); 

  for (let i = 0; i < 3; i++) {
    try {
      // Set a value against your key in the Azure Redis Cache.
      await redisClient.set("Az:mykey", "value123");
      // Fetch value of your key in the Azure Redis Cache.
      console.log("redis key:", await redisClient.get("Az:mykey"));
      break;
    } catch (e) {
      console.log("error during redis get", e.toString());
     if ((accessToken.expiresOnTimestamp <= Date.now())) {
      await redisClient.disconnect();
      accessToken = {...accessTokenCache};
      redisClient = createClient({
          username: process.env.REDIS_SERVICE_PRINCIPAL_NAME,
          password: accessToken.token,
          url: `redis://${process.env.REDIS_HOSTNAME}:6380`,
          pingInterval: 100000,
          socket: {
            tls: true,
          },
        });
      }
    }
  }
  clearTimeout(id);
}

main().catch((err) => {
  console.log("error code: ", err.code);
  console.log("error message: ", err.message);
  console.log("error stack: ", err.stack);
});
```

#### Troubleshooting
##### Invalid Username Password Pair Error

In this error scenario, the username provided and the access token used as password are not compatible. To mitigate this error, navigate to your Azure Cache for Redis resource in the Azure portal. Confirm that:

* In **Data Access Configuration**, you've assigned the required role to your user/service principal identity.
* Under the **Authentication** -> **Microsoft Entra Authentication** category, the **Enable Microsoft Entra Authentication** box is selected. If not, select it and select the **Save** button.

##### Permissions not granted / NOPERM Error

In this error scenario, the authentication was successful, but your registered user/service principal is not granted the RBAC permission to perform the action. To mitigate this error, navigate to your Azure Cache for Redis resource in the Azure portal. Confirm that:

* In **Data Access Configuration**, you've assigned the appropriate role (Owner, Contributor, Reader) to your user/service principal identity.
* In the event you are using a custom role, ensure the permissions granted under your custom role include the one required for your target action.

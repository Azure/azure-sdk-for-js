## Azure Cache for Redis: Azure AD with node-redis client library
Configuration of Role and Role Assignments is required before using the sample code.
### Table of contents

- [node-redis library](#node-redis-library)
    - [Dependency Requirements](#dependency-requirements-node-redis)
    - [Authenticate with Azure AD - Hello World](#authenticate-with-azure-ad-node-redis-hello-world)
    - [Authenticate with Azure AD - Handle Reauthentication](#authenticate-with-azure-ad-handle-reauthentication)

### node-redis library

#### Dependency requirements: node-redis

Add the following dependencies to *package.json*:

```
"dependencies": {
    "@azure/identity": "^2.0.4",
    "redis": "^4.1.0",
```

#### Authenticate with Azure AD: node-redis

This sample is intended to assist in authenticating with Azure AD via the node-redis client library. It focuses on displaying the logic required to fetch an Azure AD access token and to use it as password when setting up the node-redis instance.

Familiarity with the node-redis and Azure Identity client libraries is assumed. If you're new to the Azure Identity library for Javascript, see the docs for [Azure Identity](https://docs.microsoft.com/javascript/api/overview/azure/identity-readme?view=azure-node-latest) and [node-redis](https://github.com/redis/node-redis) rather than this guide.

##### Migration guidance

When migrating your existing application code, replace the password input with the Azure AD token. Integrate the logic in your application code to fetch an Azure AD access token via the Azure Identity library, as shown below. Replace it with the password configuring/retrieving logic in your application code. Azure Redis Cache name, Service Principal Username, AAD Token and using SSL are required while connecting with the cache.

**Note:** The below sample uses `ClientSecretCredential` from the [Azure Identity](https://docs.microsoft.com/javascript/api/overview/azure/identity-readme?view=azure-node-latest) library. The credential can be replaced with any of the other Azure Identity library `TokenCredential` implementations.

```ts
import { createClient } from "redis";
import { ClientSecretCredential } from "@azure/identity";
import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  // Construct a Token Credential from Identity library, e.g. ClientSecretCredential / ClientCertificateCredential / ManagedIdentityCredential, etc.
  const credential = new ClientSecretCredential(
    process.env.AZURE_TENANT_ID,
    process.env.AZURE_CLIENT_ID,
    process.env.AZURE_CLIENT_SECRET
  );

  // The scope will be changed for AAD Public Preview
  const redisScope = "https://*.cacheinfra.windows.net:10225/appid/.default"

  // Fetch an AAD token to be used for authentication. This token will be used as the password.
  let accessToken = await credential.getToken(redisScope);
  console.log("access Token", accessToken);

  // Create redis client and connect to the Azure Cache for Redis over the TLS port using the access token as password.
  const client = createClient({
    username: process.env.REDIS_SERVICE_PRINCIPAL_NAME,
    password: accessToken.token,
    url: `redis://${process.env.REDIS_HOSTNAME}:6380`,
    socket: { tls: true },
  });

  client.on("error", (err) => console.log("Redis Client Error", err));
  await client.connect();
  // Set a value against your key in the Azure Redis Cache.
  await client.set("Az:key", "value1312");
  // Get value of your key in the Azure Redis Cache.
  console.log("value-", await client.get("Az:key"));
  // Close the client connection
  client.disconnect();
}

main().catch((err) => {
  console.log("error code: ", err.code);
  console.log("error message: ", err.message);
  console.log("error stack: ", err.stack);
});
```

#### Authenticate with Azure AD: Handle Reauthentication

This sample is intended to assist in authenticating with Azure AD via the node-redis client library. It focuses on displaying the logic required to fetch an Azure AD access token and to use it as password when setting up the node-redis instance. It further shows how to recreate and authenticate the node-redis instance when its connection is broken in error/exception scenarios.

Familiarity with the node-redis and Azure Identity client libraries is assumed. If you're new to the Azure Identity library for JavaScript, see the docs for [Azure Identity](https://docs.microsoft.com/javascript/api/overview/azure/identity-readme?view=azure-node-latest) and [node-redis](https://github.com/redis/node-redis) rather than this guide.

##### Migration guidance

When migrating your existing application code, replace the password input with the Azure AD token. Integrate the logic in your application code to fetch an Azure AD access token via the Identity library, as shown below. Replace the password configuring/retrieving logic in your application code.

**Note:** The below sample uses `ClientCertificateCredential` from the [Azure Identity](https://docs.microsoft.com/javascript/api/overview/azure/identity-readme?view=azure-node-latest) library, the credential can be replaced with any of the other Azure Identity library `TokenCredential` implementations.

```ts
import { createClient } from "redis";
import { ClientSecretCredential, TokenCredential } from "@azure/identity";
import * as dotenv from "dotenv";
dotenv.config();

async function returnPassword(credential: TokenCredential) {
  try {
    // The scope will be changed for AAD Public Preview
    const redisScope = "https://*.cacheinfra.windows.net:10225/appid/.default"

    // Fetch an Azure AD token to be used for authentication. This token will be used as the password.
    return credential.getToken(redisScope);
  } catch (e) {
    throw e;
  }
}

async function main() {
  // Construct a Token Credential from Azure Identity library, e.g. ClientSecretCredential / ClientCertificateCredential / ManagedIdentityCredential, etc.
  const credential = new ClientSecretCredential(
    process.env.AZURE_TENANT_ID,
    process.env.AZURE_CLIENT_ID,
    process.env.AZURE_CLIENT_SECRET
  );
  let accessTokenObject = await returnPassword(credential);
  // Create node-redis client and connect to the Azure Cache for Redis over the TLS port using the access token as password.
  let redisClient = createClient({
    username: process.env.REDIS_SERVICE_PRINCIPAL_NAME,
    password: accessTokenObject.token,
    url: `redis://${process.env.REDIS_HOSTNAME}:6380`,
    socket: {
      tls: true,
    },
  });
  await redisClient.connect();
  for (let i = 0; i < 3; i++) {
    try {
      // Set a value against your key in the Azure Redis Cache.
      await redisClient.set("Az:mykey", "value123"); // Returns a promise which resolves to "OK" when the command succeeds.
      // Fetch value of your key in the Azure Redis Cache.
      console.log("redis key:", await redisClient.get("Az:mykey"));
      // Close the Node-redis Client Connection
      redisClient.disconnect();
      break;
    } catch (e) {
      console.log("error during redis get", e.toString());
      if (accessTokenObject.expiresOnTimestamp <= Date.now()) {
        accessTokenObject = await returnPassword(credential);
        redisClient = createClient({
          username: process.env.REDIS_SERVICE_PRINCIPAL_NAME,
          password: accessTokenObject.token,
          url: `redis://${process.env.REDIS_HOSTNAME}:6380`,
          socket: {
            tls: true,
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

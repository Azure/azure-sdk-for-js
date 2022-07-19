## Azure Cache for Redis: Azure AD with ioredis client library
Configuration of Role and Role Assignments is required before using the sample code. 
### Table of contents

- [ioredis library](#ioredis-library)
    - [Dependency requirements](#dependency-requirements-ioredis)
    - [Authenticate with Azure AD - Hello World](#authenticate-with-azure-ad-ioredis-hello-world)
    - [Authenticate with Azure AD - Handle Reauthentication](#authenticate-with-azure-ad-handle-reauthentication)

### ioredis library

#### Dependency requirements: ioredis

Add the following dependencies to *package.json*:

```
"dependencies": {
  "@azure/identity":"^2.0.4",
  "ioredis": "^5.0.4",
```

#### Authenticate with Azure AD

This sample is intended to assist in authenticating with Azure AD via the ioredis client library. It focuses on displaying the logic required to fetch an Azure AD access token and to use it as the password when setting up the ioredis instance.

Familiarity with the [ioredis](https://github.com/luin/ioredis) and [Azure Identity for JavaScript](https://docs.microsoft.com/javascript/api/overview/azure/identity-readme?view=azure-node-latest) client libraries is assumed.

##### Migration Guidance

When migrating your existing your application code, replace the password input with Azure AD token.
Integrate the logic in your application code to fetch an Azure AD access token via the Azure Identity library, as shown below. Replace it with the password configuring/retrieving logic in your application code.

**Note:** The below sample uses `ClientSecretCredential` from the [Azure Identity](https://docs.microsoft.com/javascript/api/overview/azure/identity-readme?view=azure-node-latest) library. The credential can be replaced with any of the other Azure Identity library `TokenCredential` implementations.


```ts
import Redis from "ioredis";
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
  
  // Fetch an Azure AD token to be used for authentication. This token will be used as the password.
  let accessToken = await credential.getToken(
    redisScope
  );

  // Create ioredis client and connect to the Azure Cache for Redis over the TLS port using the access token as password.
  const redis = new Redis({
    username: process.env.REDIS_SERVICE_PRINCIPAL_NAME,
    password: accessToken.token,
    tls: {
      host: process.env.REDIS_HOSTNAME,
      port: 6380,
    },
  });

  // Set a value against your key in the Azure Redis Cache.
  await redis.set("Az:mykey", "value123"); // Returns a promise which resolves to "OK" when the command succeeds.
  // Fetch value of your key in the Azure Redis Cache.
  console.log("redis key:", await redis.get("Az:mykey"));
  // Close the ioredis client connection
  redis.disconnect();
}
main().catch((err) => {
  console.log("error code: ", err.code);
  console.log("error message: ", err.message);
  console.log("error stack: ", err.stack);
});
```

#### Authenticate with Azure AD: Handle Reauthentication

This sample is intended to assist in authenticating with Azure AD via ioredis. It focuses on displaying the logic required to fetch an Azure AD access token and to use it as the password when setting up the ioredis instance. It further shows how to recreate and authenticate the ioredis instance when its connection is broken in error/exception scenarios.

##### Migration Guidance
When migrating your existing your application code, replace the password input with Azure AD token.
Integrate the logic in your application code to fetch an Azure AD access token via the Azure Identity library, as shown below. Replace the password configuring/retrieving logic in your application code.

**Note:** The below sample uses `ClientSecretCredential` from our [Azure Identity](https://docs.microsoft.com/javascript/api/overview/azure/identity-readme?view=azure-node-latest) library. The credential can be replaced with any of the other Azure Identity library `TokenCredential` implementations.

```ts
import Redis from "ioredis";
import { ClientSecretCredential, TokenCredential } from "@azure/identity";
import * as dotenv from "dotenv";
dotenv.config();

async function returnPassword(credential: TokenCredential) {
  try {
    // The scope will be changed for AAD Public Preview
    const redisScope = "https://*.cacheinfra.windows.net:10225/appid/.default"

    // Fetch an AAD token to be used for authentication. This token will be used as the password.
    let accessToken = await credential.getToken(redisScope);
    return accessToken;
  } catch (e) {
    throw e;
  }
}

async function main() {
  // Construct a Token Credential from Identity library, e.g. ClientSecretCredential / ClientCertificateCredential / ManagedIdentityCredential, etc.
  const credential = new ClientSecretCredential(
    process.env.AZURE_TENANT_ID,
    process.env.AZURE_CLIENT_ID,
    process.env.AZURE_CLIENT_SECRET
  );
  let accessTokenObject = await returnPassword(credential);
  // Create ioredis client and connect to the Azure Cache for Redis over the TLS port using the access token as password.
  let redis = new Redis({
    username: process.env.REDIS_SERVICE_PRINCIPAL_NAME,
    password: accessTokenObject.token,
    tls: {
      host: process.env.REDIS_HOSTNAME,
      port: 6380,
    },
  });

  for (let i = 0; i < 3; i++) {
    try {
      // Set a value against your key in the Azure Redis Cache.
      await redis.set("Az:mykey", "value123"); // Returns a promise which resolves to "OK" when the command succeeds.
      // Fetch value of your key in the Azure Redis Cache.
      console.log("redis key:", await redis.get("Az:mykey"));
      // Close the Ioredis Client Connection
      redis.disconnect();
      break;
    } catch (e) {
      console.log("error during redis get", e.toString());
      if (accessTokenObject.expiresOnTimestamp <= Date.now()) {
        accessTokenObject = await returnPassword(credential);
        redis = new Redis({
          username: process.env.REDIS_SERVICE_PRINCIPAL_NAME,
          password: accessTokenObject.token,
          tls: {
            host: process.env.REDIS_HOSTNAME,
            port: 6380,
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

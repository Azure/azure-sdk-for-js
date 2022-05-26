## Azure Cache For Redis AAD With IO-Redis Client Library

### Table of contents

- [Ioredis Library](#ioredis-library)
    - [Dependency Requirements](#dependency-requirements-ioredis)
    - [Authenticate with AAD - Hello World](#authenticate-with-aad-ioredis-hello-world)
    - [Authenticate with AAD - Handle Re-Authentication](#authenticate-with-aad-handle-re-authentication)
    - [Authenticate with AAD - Azure ioredis Wrapper](#authenticate-with-aad-azure-ioredis-wrapper)

### Ioredis Library

#### Dependency Requirements Ioredis
```
    "@azure/identity":"^2.0.4",
    "ioredis": "^5.0.4"
```


#### Authenticate with AAD ioredis Hello World
This sample is intended to assist in authenticating with AAD via ioredis client library. It focuses on displaying the logic required to fetch an AAD Access token and to use it as password when setting up the ioredis instance.

Familiarity with the Ioredis and Azure Identity client libraries is assumed. If you're new to the Azure Identity library for Javascript, see the docs for [Azure Identity](https://docs.microsoft.com/javascript/api/overview/azure/identity-readme?view=azure-node-latest) and [ioredis](https://github.com/luin/ioredis) rather than this guide.

##### Migration Guidance
When migrating your existing your application code, you need to replace the password input with Azure Active Directory Token.
Integrate the logic in your application code to fetch an AAD Access Token via Identity SDK as shown below and replace it with the password configuring/retrieving logic in your application code.

**Note:** The below sample uses `ClientSecretCredential` from our [Azure Identity](https://docs.microsoft.com/javascript/api/overview/azure/identity-readme?view=azure-node-latest) SDK, the credential can be replaced with any of the other `TokenCredential` implementations offered by our [Azure Identity](https://docs.microsoft.com/javascript/api/overview/azure/identity-readme?view=azure-node-latest) SDK.


```ts
import Redis from "ioredis";
import * as dotenv from "dotenv";
import {ClientSecretCredential} from "@azure/identity";
dotenv.config();


async function main(){
// Construct a Token Credential from Identity SDK, e.g. ClientSecretCredential / Client CertificateCredential / ManagedIdentityCredential etc.
const credential = new ClientSecretCredential(process.env.AZURE_TENANT_ID, process.env.AZURE_CLIENT_ID,process.env.AZURE_CLIENT_SECRET);
try{

  // Fetch an AAD token to be used for authentication. This token will be used as the password.
  let accessToken = await credential.getToken("https://*.cacheinfra.windows.net:10225/appid/.default");

// Option 1:Create Ioredis client and connect to the Azure Cache for Redis over the non-TLS port using the access token as password.
//   const redis = new Redis({
//     port:6379,
//     host: process.env.REDIS_HOSTNAME,
//     username:process.env.REDIS_SERVICE_PRINCIPAL_NAME,
//     password: accessToken.token
//   });

// Option 2: Create Ioredis client and connect to the Azure Cache for Redis over the TLS port using the access token as password.
  const redis = new Redis({
    username:process.env.REDIS_SERVICE_PRINCIPAL_NAME,
    password: accessToken.token,
    tls:{
      host: process.env.REDIS_HOSTNAME,
      port: 6380
    }
  });

try{
 // Set a value against your key in the Azure Redis Cache.
  await redis.set("Az:mykey", "value123"); // Returns a promise which resolves to "OK" when the command succeeds.
 }             
 catch(e){
   console.log("error while redis set");
   console.log(e);
 }
// Fetch value of your key in the Azure Redis Cache.
console.log("redis key:", await redis.get("Az:mykey"));
// Close the Ioredis Client Connection
redis.disconnect();
}
catch(e){
  console.log("error during get token -");
  console.log(e);
}

}
main().catch((err) => {
  console.log("error code: ", err.code);
  console.log("error message: ", err.message);
  console.log("error stack: ", err.stack);
});

```

#### Authenticate with AAD Handle Re Authentication
This sample is intended to assist in authenticating with AAD via Ioredis client library. It focuses on displaying the logic required to fetch an AAD Access token and to use it as password when setting up the Ioredis instance. It further shows how to recreate and authenticate the Ioredis instance when its connection is broken in Error/Exception scenarios.

Familiarity with the Ioredis and Azure Identity client libraries is assumed. If you're new to the Azure Identity library for Javascript, see the docs for [Azure Identity](https://docs.microsoft.com/javascript/api/overview/azure/identity-readme?view=azure-node-latest) and [ioredis](https://github.com/luin/ioredis) rather than this guide.


##### Migration Guidance
When migrating your existing your application code, you need to replace the password input with Azure Active Directory Token.
Integrate the logic in your application code to fetch an AAD Access Token via Identity SDK as shown below and replace the password configuring/retrieving logic in your application code.

**Note:** The below sample uses `ClientSecretCredential` from our [Azure Identity](https://docs.microsoft.com/javascript/api/overview/azure/identity-readme?view=azure-node-latest) SDK, the credential can be replaced with any of the other `TokenCredential` implementations offered by our [Azure Identity]((https://docs.microsoft.com/javascript/api/overview/azure/identity-readme?view=azure-node-latest) SDK.

```ts
import Redis from "ioredis";
import * as dotenv from "dotenv";
import {ClientSecretCredential, TokenCredential} from "@azure/identity";
dotenv.config();

async function returnPassword(credential: TokenCredential) {  
    try{
        // Fetch an AAD token to be used for authentication. This token will be used as the password.
        let accessToken = await credential.getToken("https://*.cacheinfra.windows.net:10225/appid/.default");
        return accessToken;
    }
    catch(e){
        throw("error during getToken -",e);
    }
}

async function main(){
    // Construct a Token Credential from Identity SDK, e.g. ClientSecretCredential / Client CertificateCredential / ManagedIdentityCredential etc.
    const credential = new ClientSecretCredential(process.env.AZURE_TENANT_ID, process.env.AZURE_CLIENT_ID,process.env.AZURE_CLIENT_SECRET);

    // Create Ioredis client and connect to the Azure Cache for Redis over the TLS port using the access token as password.
    const redis = new Redis({
        username:process.env.REDIS_SERVICE_PRINCIPAL_NAME,
        password: (await returnPassword(credential)).token,
        tls:{
                host: process.env.REDIS_HOSTNAME,
                port: 6380
            }
    });

    for(let i = 0; i < 3;i++){
        try{
            // Set a value against your key in the Azure Redis Cache.
            await redis.set("Az:mykey", "value123"); // Returns a promise which resolves to "OK" when the command succeeds.
            // Fetch value of your key in the Azure Redis Cache.
            console.log("redis key:", await redis.get("Az:mykey"));
            // Close the Ioredis Client Connection
            redis.disconnect();
            break;
        }
        catch(e){
            console.log("error during redis get",e.toString());
            if((await returnPassword(credential)).expiresOnTimestamp <= Date.now()){
                redis = new Redis({
                    username:process.env.REDIS_SERVICE_PRINCIPAL_NAME,
                    password: (await returnPassword(credential)).token,
                    tls:{
                            host: process.env.REDIS_HOSTNAME,
                            port: 6380
                        }
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
#### Authenticate with AAD Azure Ioredis Wrapper
This sample is intended to assist in the migration from Ioredis to `AzureIoredisClient`. It focuses on side-by-side comparisons for similar operations between the two libraries.

Familiarity with the Ioredis and Azure Identity client libraries is assumed. If you're new to the Azure Identity library for Javascript, see the docs for [Azure Identity](https://docs.microsoft.com/javascript/api/overview/azure/identity-readme?view=azure-node-latest) and [ioredis](https://github.com/luin/ioredis) rather than this guide.
##### Migration benefits

A natural question to ask when considering whether or not to adopt a new version or library is what the benefits of doing so would be. Ioredis by itself doesn't support Azure AD authentication with token generation, failure retries, broken connection handling, and cache reauthentication. Using `AzureIoredisClient` will improve developer productivity and code maintainability.

##### Client instantiation

In ioredis, you create a `Redis` object via a public constructor. The constructor accepts the cache host name, port number, username and password. For example:

```ts
import Redis from "ioredis";
import * as dotenv from "dotenv";
dotenv.config();

let redis = new Redis({
    tls:{
        host: process.env.REDIS_HOSTNAME, 
        port: 6380
        },
     username:"default", 
     password: process.env.REDIS_KEY });

await redis.set("Az:key","value");

redis.disconnect();

```
With `AzureIoredisClient`, client instances can be created using AAD token:

- Cache host name
- Port number to connect to
- Username set on the cache
- Optional retry options to configure retry
- Token credential object that's used to generate a token

See the following example of setting up the Azure Ioredis client.

<!--![image](https://user-images.githubusercontent.com/5430778/166531908-3ed78774-3672-4bf8-a6cf-9c6ef6c0bdff.png)-->

See the following example of setting up the Azure Ioredis client.

**Note:** The below sample uses `ClientSecretCredential` from our [Azure Identity](https://docs.microsoft.com/javascript/api/overview/azure/identity-readme?view=azure-node-latest) SDK, the credential can be replaced with any of the other `TokenCredential` implementations offered by our [Azure Identity](https://docs.microsoft.com/javascript/api/overview/azure/identity-readme?view=azure-node-latest) SDK.

```ts
async function main(){
    // Construct a Token Credential from Identity SDK, e.g. ClientSecretCredential / Client CertificateCredential / ManagedIdentityCredential etc.
    const credential = new ClientSecretCredential(process.env.AZURE_TENANT_ID, process.env.AZURE_CLIENT_ID,process.env.AZURE_CLIENT_SECRET);
    
    const redisClient = new AzureIoredisClient(<host_name>,<port_no>,<username>,credential,<options>);
    
    await redisClient.set("Az:key","value");
    redisClient.disconnect();
}
```
## Azure Cache For Redis AAD With Node-Redis Client Library

### Table of contents

- [Node-redis Library](#node-redis-library)
    - [Dependency Requirements](#dependency-requirements-node-redis)
    - [Authenticate with AAD - Hello World](#authenticate-with-aad-node-redis-hello-world)
    - [Authenticate with AAD - Handle Re-Authentication](#authenticate-with-aad-handle-re-authentication)

### Node-redis Library

#### Dependency Requirements Node-redis
```
    "@azure/identity":"^2.0.4",
    "redis": "^4.1.0"
```


#### Authenticate with AAD node-redis Hello World
This sample is intended to assist in authenticating with AAD via node-redis client library. It focuses on displaying the logic required to fetch an AAD Access token and to use it as password when setting up the node-redis instance.

Familiarity with the Node-redis and Azure Identity client libraries is assumed. If you're new to the Azure Identity library for Javascript, see the docs for [Azure Identity](https://docs.microsoft.com/javascript/api/overview/azure/identity-readme?view=azure-node-latest) and [node-redis](https://github.com/redis/node-redis) rather than this guide.

##### Migration Guidance
When migrating your existing your application code, you need to replace the password input with Azure Active Directory Token.
Integrate the logic in your application code to fetch an AAD Access Token via Identity SDK as shown below and replace it with the password configuring/retrieving logic in your application code.

**Note:** The below sample uses `ClientCertificateCredential` from our [Azure Identity](https://docs.microsoft.com/javascript/api/overview/azure/identity-readme?view=azure-node-latest) SDK, the credential can be replaced with any of the other `TokenCredential` implementations offered by our [Azure Identity](https://docs.microsoft.com/javascript/api/overview/azure/identity-readme?view=azure-node-latest) SDK.


```ts
import { createClient } from 'redis';
import * as dotenv from "dotenv";
import {ClientCertificateCredential} from "@azure/identity";
dotenv.config();

async function main(){
// Construct a Token Credential from Identity SDK, e.g. ClientSecretCredential / Client CertificateCredential / ManagedIdentityCredential etc.
    const credential = new ClientCertificateCredential(process.env.AZURE_TENANT_ID, process.env.AZURE_CLIENT_ID,process.env.CLIENT_CERTIFICATE_PATH)
    try{
        // Fetch an AAD token to be used for authentication. This token will be used as the password.
        let accessToken = await credential.getToken("https://*.cacheinfra.windows.net:10225/appid/.default")
        console.log("access Token",accessToken);

        //Option 1 - Create redis client and connect to the Azure Cache for Redis over the TLS port using the access token as password.
        const client = createClient({
            username: process.env.REDIS_SERVICE_PRINCIPAL_NAME, 
            password: accessToken.token, 
            url: `redis://${process.env.REDIS_SERVICE_PRINCIPAL_NAME}:${accessToken.token}@${process.env.REDIS_HOSTNAME}:6380`
            socket:{tls:true} })
        /*
        //Option 2 - Create redis client and connect to the Azure Cache for Redis over the non-TLS port using the access token as password.
        const client = createClient({
            username: process.env.REDIS_SERVICE_PRINCIPAL_NAME, 
            password: accessToken.token, 
            url: `redis://${process.env.REDIS_SERVICE_PRINCIPAL_NAME}:${accessToken.token}@${process.env.REDIS_HOSTNAME}:6379` })
        */

        client.on('error', (err) => console.log('Redis Client Error', err));
        await client.connect();
        // Set a value against your key in the Azure Redis Cache.
        await client.set('Az:key', 'value');
        // Get value of your key in the Azure Redis Cache.
        console.log("value", await client.get('key'));
        // Close the client connection
        client.disconnect();
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
This sample is intended to assist in authenticating with AAD via Node-redis client library. It focuses on displaying the logic required to fetch an AAD Access token and to use it as password when setting up the Node-redis instance. It further shows how to recreate and authenticate the Node-redis instance when its connection is broken in Error/Exception scenarios.

Familiarity with the Node-redis and Azure Identity client libraries is assumed. If you're new to the Azure Identity library for Javascript, see the docs for [Azure Identity](https://docs.microsoft.com/javascript/api/overview/azure/identity-readme?view=azure-node-latest) and [node-redis](https://github.com/redis/node-redis) rather than this guide.

##### Migration Guidance
When migrating your existing your application code, you need to replace the password input with Azure Active Directory Token.
Integrate the logic in your application code to fetch an AAD Access Token via Identity SDK as shown below and replace the password configuring/retrieving logic in your application code.

**Note:** The below sample uses `ClientCertificateCredential` from our [Azure Identity](https://docs.microsoft.com/javascript/api/overview/azure/identity-readme?view=azure-node-latest) SDK, the credential can be replaced with any of the other `TokenCredential` implementations offered by our [Azure Identity]((https://docs.microsoft.com/javascript/api/overview/azure/identity-readme?view=azure-node-latest) SDK.

```ts
import Redis from "node-redis";
import * as dotenv from "dotenv";
import {ClientCertificateCredential, TokenCredential} from "@azure/identity";
dotenv.config();

async function returnPassword(credential: TokenCredential) {  
    try{
        // Fetch an Azure AD token to be used for authentication. This token will be used as the password.
        let accessToken = await credential.getToken("https://*.cacheinfra.windows.net:10225/appid/.default");
        return accessToken;
    }
    catch(e){
        throw("error during getToken -",e);
    }
}

async function main(){
    // Construct a Token Credential from Azure Identity library, e.g. ClientSecretCredential / ClientCertificateCredential / ManagedIdentityCredential, etc.
    const credential = new ClientCertificateCredential(process.env.AZURE_TENANT_ID, process.env.AZURE_CLIENT_ID,process.env.CLIENT_CERTIFICATE_PATH);

    // Create Node-redis client and connect to the Azure Cache for Redis over the TLS port using the access token as password.
    let redisClient = createClient({
                username: process.env.REDIS_SERVICE_PRINCIPAL_NAME, 
                password: (await returnPassword(credential)).token, 
                url: `redis://${process.env.REDIS_SERVICE_PRINCIPAL_NAME}:${accessToken.token}@${process.env.REDIS_HOSTNAME}:6380`
                socket:{
                    tls:true
                }
            });

    for(let i = 0; i < 3;i++){
        try{
            // Set a value against your key in the Azure Redis Cache.
            await redisClient.set("Az:mykey", "value123"); // Returns a promise which resolves to "OK" when the command succeeds.
            // Fetch value of your key in the Azure Redis Cache.
            console.log("redis key:", await redisClient.get("Az:mykey"));
            // Close the Node-redis Client Connection
            redisClient.disconnect();
            break;
        }
        catch(e){
            console.log("error during redis get",e.toString());
            if((await returnPassword(credential)).expiresOnTimestamp <= Date.now()){
                const redisClient = createClient({
                    username: process.env.REDIS_SERVICE_PRINCIPAL_NAME, 
                    password: (await returnPassword(credential)).token, 
                    url: `redis://${process.env.REDIS_SERVICE_PRINCIPAL_NAME}:${accessToken.token}@${process.env.REDIS_HOSTNAME}:6380`
                    socket:{
                        tls:true
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
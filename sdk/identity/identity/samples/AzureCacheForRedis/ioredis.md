## Azure Cache For Redis AAD With IO-Redis Client Library

### Table of contents

- [Ioredis Library](#ioredis-library)
    - [Dependency Requirements](#dependency-requirements-ioredis)
    - [Authenticate with AAD - Hello World](#authenticate-with-aad-ioredis-hello-world)
    - [Authenticate with AAD - Handle Re-Authentication](#authenticate-with-aad-handle-re-authentication)
    - [Authenticate with AAD - Azure ioredis Wrapper](#authenticate-with-aad-azure-ioredis-wrapper)

### Jedis Library

#### Dependency Requirements Jedis
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

**Note:** The below sample uses `ClientSecretCredential` from our [Azure Identity](https://docs.microsoft.com/azure/developer/java/sdk/identity) SDK, the credential can be replaced with any of the other `TokenCredential` implementations offered by our [Azure Identity](https://docs.microsoft.com/azure/developer/java/sdk/identity) SDK.

```java
    public static void main(String[] args) {

        //Construct a Token Credential from Identity SDK, e.g. ClientSecretCredential / Client CertificateCredential / ManagedIdentityCredential etc.
        ClientCertificateCredential clientCertificateCredential = new ClientCertificateCredentialBuilder()
                .clientId("YOUR-CLIENT-ID")
                .pfxCertificate("YOUR-CERTIFICATE-PATH", "CERTIFICATE-PASSWORD")
                .tenantId("YOUR-TENANT-ID")
                .build();

        // Fetch an AAD token to be used for authentication. This token will be used as the password.
        TokenRequestContext trc = new TokenRequestContext().addScopes("https://*.cacheinfra.windows.net:10225/appid/.default");
        AccessToken accessToken = getAccessToken(clientCertificateCredential, trc);

        // SSL connection is required for non 6379 ports.
        boolean useSsl = true;
        String cacheHostname = "YOUR_HOST_NAME.redis.cache.windows.net";

        // Create Jedis client and connect to the Azure Cache for Redis over the TLS/SSL port using the access token as password.
        Jedis jedis = createJedisClient(cacheHostname, 6380, "USERNAME", accessToken, useSsl);

        try {
            // Set a value against your key in the Azure Redis Cache.
            jedis.set("Az:key", "testValue");
            System.out.println(jedis.get("Az:key"));
        } catch (JedisException e) {
            // Handle The Exception as required in your application.
            e.printStackTrace();

            // Check if the client is broken, if it is then close and recreate it to create a new healthy connection.
            if (jedis.isBroken() || accessToken.isExpired()) {
                jedis.close();
                jedis = createJedisClient(cacheHostname, 6380,"USERNAME", getAccessToken(clientCertificateCredential, trc), useSsl);
            }
        }

        // Close the Jedis Client
        jedis.close();
    }

    private static Jedis createJedisClient(String cacheHostname, int port, String username, AccessToken accessToken, boolean useSsl) {
        return new Jedis(cacheHostname, port, DefaultJedisClientConfig.builder()
                .password(accessToken.getToken())
                .user(username)
                .ssl(useSsl)
                .build());
    }

    private static AccessToken getAccessToken(TokenCredential tokenCredential, TokenRequestContext trc) {
        return tokenCredential.getToken(trc).block();
    }
```

#### Authenticate with AAD Azure Jedis Wrapper
This sample is intended to assist in the migration from Jedis to `AzureJedisClientBuilder`. It focuses on side-by-side comparisons for similar operations between the two libraries.

Familiarity with the Jedis and Azure Identity client libraries is assumed. If you're new to the Azure Identity library for Java, see the docs for [Azure Identity](https://docs.microsoft.com/azure/developer/java/sdk/identity) and [Jedis](https://www.javadoc.io/doc/redis.clients/jedis/latest/index.html) rather than this guide.

##### Migration benefits

A natural question to ask when considering whether or not to adopt a new version or library is what the benefits of doing so would be. Jedis by itself doesn't support Azure AD authentication with token generation, failure retries, broken connection handling, and cache reauthentication. Using `AzureJedisClient` will improve developer productivity and code maintainability.

##### Client instantiation

In Jedis, you create a `Jedis` object via a public constructor. The constructor accepts the cache host name and port number. It authenticates using the access keys. For example:

```java
import redis.clients.jedis.Jedis;

Jedis jedis = new Jedis("<host name>", <port number>);
jedis.auth("<username>", "<token>");
jedis.set("key", "value");
jedis.close();
```

With `AzureJedisClient`, client instances are created via builders. The builder accepts the:

- Cache host name
- Port number to connect to
- Username set on the cache
- Optional retry options to configure retry
- Token credential object that's used to generate a token

See the following example of setting up the Azure Jedis client.

![image](https://user-images.githubusercontent.com/5430778/166531908-3ed78774-3672-4bf8-a6cf-9c6ef6c0bdff.png)

See the following example of setting up the Azure Jedis client.

**Note:** The below sample uses `ClientCertificateCredential` from our [Azure Identity](https://docs.microsoft.com/azure/developer/java/sdk/identity) SDK, the credential can be replaced with any of the other `TokenCredential` implementations offered by our [Azure Identity](https://docs.microsoft.com/azure/developer/java/sdk/identity) SDK.

```java
public static void main(String[] args) throws IOException {

        ClientCertificateCredential clientCertificateCredential = new ClientCertificateCredentialBuilder()
            .clientId("<clientId>")
            .pfxCertificate("<Cert-File-Path>", "<Cert-Password-if-Applicable>")
            .tenantId("<tenantId>")
            .build();

        Jedis jedisClient = new AzureJedisClientBuilder()
            .cacheHostName("<cache host name>")
            .port(<port number>)
            .username("<username>")
            .credential(clientCertificateCredential)
            .build();

        jedisClient.set("Az:key", "sample");
        jedisClient.close();
}
```
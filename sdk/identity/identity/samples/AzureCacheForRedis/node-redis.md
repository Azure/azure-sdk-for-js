import { createClient } from "redis";
import { DefaultAzureCredential, TokenCredential, AccessToken } from "@azure/identity";
import * as dotenv from "dotenv";
dotenv.config();

async function returnPassword(credential: TokenCredential) {
    // The current scope is for public preview and may change for GA release.
    const redisScope = "acca5fbb-b7e4-4009-81f1-37e38fd66d78/.default"

    // Fetch an Azure AD token to be used for authentication. This token will be used as the password.
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
        console.log("Auth called...")
        await redisClient.auth({username: process.env.REDIS_SERVICE_PRINCIPAL_NAME,
            password: accessToken.token})
    }
  }
  
  await updateToken();
  let accessToken: AccessToken | undefined = {...accessTokenCache};
  // Create node-redis client and connect to the Azure Cache for Redis over the TLS port using the access token as password.
  redisClient = createClient({
    username: process.env.REDIS_SERVICE_PRINCIPAL_NAME,
    password: accessToken.token,
    url: `redis://${process.env.REDIS_HOSTNAME}:6380`,
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
          socket: {
            tls: true,
            keepAlive: 0
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
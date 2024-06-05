const { AzurePipelinesCredential } = require("@azure/identity");
const { SecretClient } = require("@azure/keyvault-secrets");

async function main(systemAccessToken){
  console.log("systemaccesstoken =",systemAccessToken)
    const clientId = "CLIENT_ID";
    const tenantId = "TENANT_ID";
    const serviceConnectionId = "SERVICE_CONNECTION_ID";
    const systemAccessToken = process.env.SYSTEM_ACCESSTOKEN;
    const credential = new AzurePipelinesCredential(
      tenantId,
      clientId,
      serviceConnectionId,
      systemAccessToken
    );  
  const client = new SecretClient("https://KEYVAULT_NAME.vault.azure.net/", credential);
  const secretValue = await client.getSecret("secretKey");
  console.log("the value of secret is", secretValue);
}
main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
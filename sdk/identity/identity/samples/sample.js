const { AzurePipelinesCredential } = require("@azure/identity");
const { SecretClient } = require("@azure/keyvault-secrets");

async function main(){
    const clientId = "7960e60e-aabb-47e7-9ac5-7145dd8157a4";
    const tenantId = "72f988bf-86f1-41af-91ab-2d7cd011db47";
    const serviceConnectionId = "59b37403-61d1-4653-bcd2-0e9f58d68f32";
    //const systemAccessToken = process.env.SYSTEM_ACCESSTOKEN;
    const credential = new AzurePipelinesCredential(
      tenantId,
      clientId,
      serviceConnectionId
    );  
  const client = new SecretClient("https://azuresdk-testsecrets2.vault.azure.net/", credential);
  const secretValue = await client.getSecret("secretKey");
  console.log("the value of secret is", secretValue);
}
main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
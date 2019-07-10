import { EnvironmentCredential } from "@azure/identity";
import { SecretsClient } from "@azure/keyvault-secrets";

export class KeyVaultSecrets{
    private static client : SecretsClient;
    private static secretName : string;
    private static secretValue : string;
    
    static async Run() {
        console.log();
        console.log("------------------------");
        console.log("Key Vault - Secrets\nIdentity - Credential");
        console.log("------------------------");
        console.log("1) Set a secret");
        console.log("2) Get that secret");
        console.log("3) Delete that secret (Clean up the resource)");
        console.log();
        
        // EnvironmentCredential expects the following three environment variables:
        // * AZURE_TENANT_ID: The tenant ID in Azure Active Directory
        // * AZURE_CLIENT_ID: The application (client) ID registered in the AAD tenant
        // * AZURE_CLIENT_SECRET: The client secret for the registered application
        const credential = new EnvironmentCredential();
        const url = process.env["AZURE_PROJECT_URL"];

        KeyVaultSecrets.client = new SecretsClient(url,credential);

        KeyVaultSecrets.secretName = "MySecretName";
        KeyVaultSecrets.secretValue = "MySecretValue";

        await KeyVaultSecrets.setSecret();
        await KeyVaultSecrets.getSecret();
        await KeyVaultSecrets.deleteSecret();
    }

    private static async setSecret(){
        console.log("\tSetting a secret...");
        const result = await KeyVaultSecrets.client.setSecret(KeyVaultSecrets.secretName, KeyVaultSecrets.secretValue);
        console.log("\t\tSecret = (" + result.name +","+ result.value + ")");
        console.log("\t\tdone");
    }

    private static async getSecret(){
        console.log("\tGetting that secret...");
        const result = await KeyVaultSecrets.client.getSecret(KeyVaultSecrets.secretName);

        if((result.name !== KeyVaultSecrets.secretName)||(result.value !== KeyVaultSecrets.secretValue)){
            throw "Error, a secret was obtained but is not the one that was setted before";
        }

        console.log("\t\tdone");
    }

    private static async deleteSecret(){
        console.log("\tDeleting that secret...");
        await KeyVaultSecrets.client.deleteSecret(KeyVaultSecrets.secretName);
        console.log("\t\tdone");
    }

} 
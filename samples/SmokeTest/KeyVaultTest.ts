import { EnvironmentCredential } from "@azure/identity";
import { SecretsClient } from "@azure/keyvault-secrets";

export class KeyVaultSecrets{
    service = "Key Vault - Secrets\nIdentity - Credential";
    description = 
                "1) Set a secret\n"+
                "2) Get that secret\n"+
                "3) Delete that secret (Clean up the resource)\n";

    private client : SecretsClient;
    private secretName : string;
    private secretValue : string;

    constructor(){
        const credential = new EnvironmentCredential();
        const url = process.env["AZURE_PROJECT_URL"];

        this.secretName = "MySecretName";
        this.secretValue = "MySecretValue";

        this.client = new SecretsClient(url,credential);
    }
    
    async Run() {
        await this.setSecret();
        await this.getSecret();
        await this.deleteSecret();
    }

    private async setSecret(){
        console.log("\tSetting a secret...");
        const result = await this.client.setSecret(this.secretName, this.secretValue);
        console.log("\t\tSecret = (" + result.name +","+ result.value + ")");
        console.log("\t\tdone");
    }

    private async getSecret(){
        console.log("\tGetting that secret...");
        const result = await this.client.getSecret(this.secretName);

        if((result.name !== this.secretName)||(result.value !== this.secretValue)){
            throw "Error, a secret was obtained but is not the one that was setted before";
        }

        console.log("\t\tdone");
    }

    private async deleteSecret(){
        console.log("\tDeleting that secret...");
        await this.client.deleteSecret(this.secretName);
        console.log("\t\tdone");
    }

} 
import * as child_process from "child_process";

export interface CredentialClient {
  getAzureCliAccessToken(resource: string): Promise<any>;
}

export class AzureCliCredentialClient implements CredentialClient {
  public getAzureCliAccessToken(resource: string) {
    return new Promise((resolve, reject) => {
      try {
        child_process.exec(
          `az account get-access-token --output json --resource ${resource}`,
          (error, stdout, stderr) => {
            resolve({ stdout: stdout, stderr: stderr });
          }
        );
      } catch (err) {
        reject(err);
      }
    });
  }
}

export interface AzureCliCredentialOptions {
  azureCliCredentialClient?: CredentialClient;
}

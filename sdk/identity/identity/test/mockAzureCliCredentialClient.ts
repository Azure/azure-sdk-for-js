import {
  CredentialClient,
  AzureCliCredentialOptions
} from "../src/client/AzureCliCredentialClient";

interface MockCredentialClient {
  stdout: string;
  stderr: string;
}

export class MockAzureCliCredentialClientOptions implements AzureCliCredentialOptions {
  azureCliCredentialClient?: CredentialClient;
  constructor(mockClient: MockAzureCliCredentialClient) {
    this.azureCliCredentialClient = mockClient;
  }
}

export class MockAzureCliCredentialClient implements CredentialClient {
  private stdout;
  private stderr;

  constructor(options?: MockCredentialClient) {
    this.stdout = options.stdout;
    this.stderr = options.stderr;
  }

  public getAzureCliAccessToken(resource: string) {
    return new Promise((resolve) => {
      resolve({ stdout: this.stdout, stderr: this.stderr });
    });
  }
}

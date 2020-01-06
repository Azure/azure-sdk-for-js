import { CredentialClient, CliCredentialOptions } from "../src/client/CliCredentialClient";

interface MockCredentialClient {
  stdout: string,
  stderr: string
}

export class MockCliCredentialClientOptions implements CliCredentialOptions {
  cliCredentialClient?: CredentialClient;
  constructor(mockClient: MockCliCredentialClient) {
    this.cliCredentialClient = mockClient;
  }
}

export class MockCliCredentialClient implements CredentialClient {
  private stdout;
  private stderr;

  constructor(options?: MockCredentialClient) {
    this.stdout = options.stdout;
    this.stderr = options.stderr;
  }

  public createProcess(extendCommand: string) {
    return new Promise((resolve) => {
      resolve({ stdout: this.stdout, stderr: this.stderr });
    })
  }
}


import { CliCredentialClient } from "../src/client/CliCredentialClient";

export interface MockCliCredentialClientOptions {
  stdout: string;
  stderr: string;
}

export class MockCliCredentialClient extends CliCredentialClient {
  private stdout;
  private stderr;

  constructor(options?: MockCliCredentialClientOptions) {
    super();
    this.stdout = options.stdout;
    this.stderr = options.stderr;
  }

  public createProcess(extendCommand: string) {
    return new Promise((resolve) => {
      resolve({ stdout: this.stdout, stderr: this.stderr });
    })
  }
}

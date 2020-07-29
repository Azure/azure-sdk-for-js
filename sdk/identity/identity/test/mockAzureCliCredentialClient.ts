// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AzureCliCredential } from "../src/credentials/azureCliCredential";

interface MockCredentialClient {
  stdout: string;
  stderr: string;
}

export class MockAzureCliCredentialClient extends AzureCliCredential {
  private stdout: string;
  private stderr: string;

  constructor(options: MockCredentialClient) {
    super();
    this.stdout = options.stdout;
    this.stderr = options.stderr;
  }

  /**
   * Replace the work of getting the access token with a mocked method
   * that will used mocked data instead of the output from the real `az`
   * command.
   * @param resource The resources to use when accessing token
   */
  protected getAzureCliAccessToken(_resource: string): Promise<{ stdout: string; stderr: string }> {
    return new Promise((resolve) => {
      resolve({ stdout: this.stdout, stderr: this.stderr });
    });
  }
}

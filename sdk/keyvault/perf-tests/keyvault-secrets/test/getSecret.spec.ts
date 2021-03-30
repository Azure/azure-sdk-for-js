import { SecretTest } from "./secretTest";

export class GetSecretTest extends SecretTest {
  public options = {};

  async runAsync(): Promise<void> {
    await this.secretClient.getSecret(SecretTest.secretName);
  }
}

import { SecretTest } from "./secretTest";
import { v4 as uuid } from "uuid";

export class GetSecretTest extends SecretTest {
  static secretName = `s-${uuid()}`;

  public options = {};

  async globalSetup() {
    await this.secretClient.setSecret(GetSecretTest.secretName, "value");
  }

  async runAsync(): Promise<void> {
    await this.secretClient.getSecret(GetSecretTest.secretName);
  }

  async globalCleanup() {
    await this.deleteAndPurgeSecrets(GetSecretTest.secretName);
  }
}

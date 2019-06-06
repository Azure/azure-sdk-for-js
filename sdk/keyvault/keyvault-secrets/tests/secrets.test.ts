import * as assert from "assert";
import { expect } from "chai";
import {
  getKeyvaultName,
  getCredentialWithServicePrincipalSecret,
  getUniqueName
} from "./utils/utils.common";
import { SecretsClient } from "../src";
import * as msRestNodeAuth from "@azure/ms-rest-nodeauth";

describe("Secret client", () => {
  const clientId = process.env["AAD_CLIENT_ID"] || "";
  const clientSecret = process.env["AAD_CLIENT_SECRET"] || "";
  const tenantId = process.env["AAD_TENANT_ID"] || "";
  const vaultName = process.env["KEYVAULT_NAME"] || "<keyvault-name>";

  let client: SecretsClient;
  let version: string;

  before(async () => {
    try {
      const url = `https://${vaultName}.vault.azure.net`;

      const credential = await msRestNodeAuth.loginWithServicePrincipalSecret(
        clientId,
        clientSecret,
        tenantId,
        {
          tokenAudience: "https://vault.azure.net"
        }
      );

      client = new SecretsClient(url, credential);
      version = "";
    } catch (e) {
      console.error("00001", e, e.stack);
    }
  });

  it("can add a secret", async () => {
    const secretName = getUniqueName("secret");
    const secretValue = getUniqueName("value");
    after(async () => {
      try {
        await client.deleteSecret(secretName);
      } catch (e) {
        console.error("00002 after", e, e.stack);
      }
    });
    try {
      const result = await client.setSecret(secretName, secretValue);

      assert.equal(
        result.name,
        secretName,
        "Unexpected secret name in result from setSecret()."
      );
      assert.equal(
        result.value,
        secretValue,
        "Unexpected secret value in result from setSecret()."
      );
    } catch (e) {
      console.error("00002", e, e.stack);
    }
  });

  it("can retrieve the latest version of a secret value", async () => {
    const secretName = getUniqueName("secret");
    const secretValue = getUniqueName("value");
    after(async () => {
      try {
        await client.deleteSecret(secretName);
      } catch (e) {
        console.error("00003 after", e, e.stack);
      }
    });
    try {
      await client.setSecret(secretName, secretValue);

      const result = await client.getSecret(secretName);

      assert.equal(
        result.name,
        secretName,
        "Unexpected secret name in result from setSecret()."
      );
      assert.equal(
        result.value,
        secretValue,
        "Unexpected secret value in result from setSecret()."
      );
    } catch (e) {
      console.error("00003", e, e.stack);
    }
  });

  it("can set a secret with attributes", async () => {
    const secretName = getUniqueName("secret");
    const secretValue = getUniqueName("value");
    const expiryDate = new Date("3000-01-01");
    after(async () => {
      try {
        await client.deleteSecret(secretName);
      } catch (e) {
        console.error("00004 after", e, e.stack);
      }
    });
    try {
      await client.setSecret(secretName, secretValue, { expires: expiryDate });

      const updated = await client.getSecret(secretName);

      // TODO: Investigate. The service seems to change the milliseconds part of the expiry date.
      // For now just compare year, month, and date in assertion.
      assert.ok(
        updated.expires!.getUTCFullYear() === expiryDate.getUTCFullYear() &&
          updated.expires!.getUTCMonth() === expiryDate.getUTCMonth() &&
          updated.expires!.getUTCDate() === expiryDate.getUTCDate(),
        "Expect attribute 'expires' to be updated."
      );
    } catch (e) {
      console.error("00004", e, e.stack);
    }
  });

  it("can update a secret", async () => {
    const secretName = getUniqueName("secret");
    const secretValue = getUniqueName("value");
    const expiryDate = new Date("3000-01-01");
    after(async () => {
      try {
        await client.deleteSecret(secretName);
      } catch (e) {
        console.error("00005 after", e, e.stack);
      }
    });
    try {
      await client.setSecret(secretName, secretValue);

      await client.updateSecretAttributes(secretName, version, {
        expires: expiryDate
      });

      const updated = await client.getSecret(secretName);

      // TODO: Investigate. The service seems to change the milliseconds part of the expiry date.
      // For now just compare year, month, and date in assertion.
      assert.ok(
        updated.expires!.getUTCFullYear() === expiryDate.getUTCFullYear() &&
          updated.expires!.getUTCMonth() === expiryDate.getUTCMonth() &&
          updated.expires!.getUTCDate() === expiryDate.getUTCDate(),
        "Expect attribute 'expires' to be updated."
      );
    } catch (e) {
      console.error("00005", e, e.stack);
    }
  });

  it("can delete a secret", async () => {
    const secretName = getUniqueName("secret");
    const secretValue1 = getUniqueName("value");
    await client.setSecret(secretName, secretValue1);

    await client.deleteSecret(secretName);

    try {
      await client.getSecret(secretName);
      throw Error("Expecting an error but not catching one.");
    } catch (e) {
      if (e.statusCode === 404) {
        assert.equal(e.message, `Secret not found: ${secretName}`);
      } else {
        throw e;
      }
    }
  });

  it("can retrieve all versions of a secret", async () => {
    const secretName = getUniqueName("secret");
    const secretValue1 = getUniqueName("value");
    const secretValue2 = getUniqueName("value");
    const secretValue3 = getUniqueName("value");
    after(async () => {
      try {
        await client.deleteSecret(secretName);
      } catch (e) {
        console.error("00007 after", e, e.stack);
      }
    });
    try {
      const secretValues = [secretValue1, secretValue2, secretValue3];
      interface versionValuePair {
        version: string;
        value: string;
      }
      let versions: versionValuePair[] = [];
      for (const v of secretValues) {
        const response = await client.setSecret(secretName, v);
        versions.push({ version: response.version!, value: response.value! });
      }

      let results: versionValuePair[] = [];
      for await (const item of client.getSecretVersions(secretName)) {
        const version = item.version!;
        const secret = await client.getSecret(secretName, { version: version });
        results.push({ version: item.version!, value: secret.value! });
      }

      const comp = (a: versionValuePair, b: versionValuePair) =>
        (a.version + a.value).localeCompare(b.version + b.value);
      results.sort(comp);
      versions.sort(comp);

      expect(results).to.deep.equal(versions);
    } catch (e) {
      console.error("00007", e, e.stack);
    }
  });
});

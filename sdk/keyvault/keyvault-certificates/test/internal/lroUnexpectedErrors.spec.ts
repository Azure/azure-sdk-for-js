// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { RestError } from "@azure/core-rest-pipeline";
import { DeleteCertificatePoller } from "../../src/lro/delete/poller.js";
import { RecoverDeletedCertificatePoller } from "../../src/lro/recover/poller.js";
import type { KeyVaultClient } from "../../src/keyVaultClient.js";
import { describe, it, assert } from "vitest";

describe("The LROs properly throw on unexpected errors", () => {
  const vaultUrl = `https://keyvaultname.vault.azure.net`;

  describe("delete LRO", () => {
    it("403 doesn't throw", async () => {
      const code = 403;
      const client: any = {
        async deleteCertificate(): Promise<any> {
          return {
            id: "https://keyvaultname.vault.azure.net/version/name/version",
            recoveryId: "something",
          };
        },
        async getDeletedCertificate(): Promise<any> {
          throw new RestError(`${code}`, { statusCode: code });
        },
      };
      const poller = new DeleteCertificatePoller({
        vaultUrl,
        certificateName: "name",
        client,
      });

      await poller.pollUntilDone();

      assert.isTrue(poller.getOperationState().isCompleted);
    });

    it("404 doesn't throw", async () => {
      const code = 404;
      const client: any = {
        async deleteCertificate(): Promise<any> {
          return {
            id: "https://keyvaultname.vault.azure.net/version/name/version",
            recoveryId: "something",
          };
        },
        async getDeletedCertificate(): Promise<any> {
          throw new RestError(`${code}`, { statusCode: code });
        },
      };
      const poller = new DeleteCertificatePoller({
        vaultUrl,
        certificateName: "name",
        client,
      });

      await poller.poll();
      await poller.poll();

      assert.isUndefined(poller.getOperationState().isCompleted);
    });

    it("Errors other than 403 and 404 throw", async () => {
      const codes = [401, 402, 405, 500];
      for (const code of codes) {
        const client: any = {
          async deleteCertificate(): Promise<any> {
            return {
              id: "https://keyvaultname.vault.azure.net/version/name/version",
              recoveryId: "something",
            };
          },
          async getDeletedCertificate(): Promise<any> {
            throw new RestError(`${code}`, { statusCode: code });
          },
        };
        const poller = new DeleteCertificatePoller({
          vaultUrl,
          certificateName: "name",
          client,
        });

        let error: Error | null = null;
        try {
          await poller.pollUntilDone();
        } catch (e: any) {
          error = e;
        }

        assert.equal((error as any).statusCode, code);
      }
    });
  });

  describe("recover LRO", () => {
    it("403 doesn't throw", async () => {
      const code = 403;

      const fooClient: Partial<KeyVaultClient> = {
        async recoverDeletedCertificate(_a) {
          return {
            id: "https://keyvaultname.vault.azure.net/version/name/version",
          };
        },

        async getCertificate() {
          throw new RestError(`${code}`, { statusCode: code });
        },
      };

      const poller = new RecoverDeletedCertificatePoller({
        vaultUrl,
        certificateName: "name",
        client: fooClient as any,
      });

      await poller.pollUntilDone();

      assert.isTrue(poller.getOperationState().isCompleted);
    });

    it("404 doesn't throw", async () => {
      const code = 404;

      const fooClient: Partial<KeyVaultClient> = {
        async recoverDeletedCertificate(_a) {
          return {
            id: "https://keyvaultname.vault.azure.net/version/name/version",
          };
        },

        async getCertificate(): Promise<any> {
          throw new RestError(`${code}`, { statusCode: code });
        },
      };

      const poller = new RecoverDeletedCertificatePoller({
        vaultUrl,
        certificateName: "name",
        client: fooClient as any,
      });

      await poller.poll();
      await poller.poll();

      assert.isUndefined(poller.getOperationState().isCompleted);
    });

    it("Errors other than 403 and 404 throw", async () => {
      const codes = [401, 402, 405, 500];
      for (const code of codes) {
        const fooClient: Partial<KeyVaultClient> = {
          async recoverDeletedCertificate(_a) {
            return {
              id: "https://keyvaultname.vault.azure.net/version/name/version",
            };
          },

          async getCertificate(): Promise<any> {
            throw new RestError(`${code}`, { statusCode: code });
          },
        };

        const poller = new RecoverDeletedCertificatePoller({
          vaultUrl,
          certificateName: "name",
          client: fooClient as any,
        });

        let error: Error | null = null;

        try {
          await poller.pollUntilDone();
        } catch (e: any) {
          error = e;
        }

        assert.equal((error as any).statusCode, code);
      }
    });
  });
});

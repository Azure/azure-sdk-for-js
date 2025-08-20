// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { RestError } from "@azure/core-rest-pipeline";
import { DeleteKeyPoller } from "$internal/lro/delete/poller.js";
import { RecoverDeletedKeyPoller } from "$internal/lro/recover/poller.js";
import { describe, it, assert } from "vitest";

describe("The LROs properly throw on unexpected errors", () => {
  describe("delete LRO", () => {
    it("403 doesn't throw", async () => {
      const code = 403;
      const client: any = {
        async deleteKey(): Promise<any> {
          return {
            key: {
              kid: "https://keyVaultName.vault.azure.net/version/name/version",
            },
            recoveryId: "something",
          };
        },
        async getDeletedKey(): Promise<any> {
          throw new RestError(`${code}`, { statusCode: code });
        },
      };
      const poller = new DeleteKeyPoller({
        name: "name",
        client,
      });

      await poller.pollUntilDone();

      assert.isTrue(poller.getOperationState().isCompleted);
    });

    it("404 doesn't throw", async () => {
      const code = 404;
      const client: any = {
        async deleteKey(): Promise<any> {
          return {
            key: {
              kid: "https://keyVaultName.vault.azure.net/version/name/version",
            },
            recoveryId: "something",
          };
        },
        async getDeletedKey(): Promise<any> {
          throw new RestError(`${code}`, { statusCode: code });
        },
      };
      const poller = new DeleteKeyPoller({
        name: "name",
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
          async deleteKey(): Promise<any> {
            return {
              key: {
                kid: "https://keyVaultName.vault.azure.net/version/name/version",
              },
              recoveryId: "something",
            };
          },
          async getDeletedKey(): Promise<any> {
            throw new RestError(`${code}`, { statusCode: code });
          },
        };
        const poller = new DeleteKeyPoller({
          name: "name",
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
      const client: any = {
        async recoverDeletedKey(): Promise<any> {
          return {
            key: {
              kid: "https://keyVaultName.vault.azure.net/version/name/version",
            },
            recoveryId: "something",
          };
        },
        async getKey(): Promise<any> {
          throw new RestError(`${code}`, { statusCode: code });
        },
      };
      const poller = new RecoverDeletedKeyPoller({
        name: "name",
        client,
      });

      await poller.pollUntilDone();

      assert.isTrue(poller.getOperationState().isCompleted);
    });

    it("404 doesn't throw", async () => {
      const code = 404;
      const client: any = {
        async recoverDeletedKey(): Promise<any> {
          return {
            key: {
              kid: "https://keyVaultName.vault.azure.net/version/name/version",
            },
            recoveryId: "something",
          };
        },
        async getKey(): Promise<any> {
          throw new RestError(`${code}`, { statusCode: code });
        },
      };
      const poller = new RecoverDeletedKeyPoller({
        name: "name",
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
          async recoverDeletedKey(): Promise<any> {
            return {
              key: {
                kid: "https://keyVaultName.vault.azure.net/version/name/version",
              },
              recoveryId: "something",
            };
          },
          async getKey(): Promise<any> {
            throw new RestError(`${code}`, { statusCode: code });
          },
        };
        const poller = new RecoverDeletedKeyPoller({
          name: "name",
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
});

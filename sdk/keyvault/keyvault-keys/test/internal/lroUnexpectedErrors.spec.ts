// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "@azure/test-utils";
import { RestError } from "@azure/core-http";
import { DeleteKeyPoller } from "../../src/lro/delete/poller";
import { RecoverDeletedKeyPoller } from "../../src/lro/recover/poller";

describe("The LROs properly throw on unexpected errors", () => {
  const vaultUrl = `https://keyVaultName.vault.azure.net`;

  describe("delete LRO", () => {
    it("403 doesn't throw", async function () {
      const code = 403;
      const client: any = {
        async deleteKey(): Promise<any> {
          return {
            key: {
              kid: "/version/name/version",
            },
            recoveryId: "something",
          };
        },
        async getDeletedKey(): Promise<any> {
          throw new RestError(`${code}`, undefined, code);
        },
      };
      const poller = new DeleteKeyPoller({
        vaultUrl,
        name: "name",
        client,
      });

      await poller.pollUntilDone();

      assert.isTrue(poller.getOperationState().isCompleted);
    });

    it("404 doesn't throw", async function () {
      const code = 404;
      const client: any = {
        async deleteKey(): Promise<any> {
          return {
            key: {
              kid: "/version/name/version",
            },
            recoveryId: "something",
          };
        },
        async getDeletedKey(): Promise<any> {
          throw new RestError(`${code}`, undefined, code);
        },
      };
      const poller = new DeleteKeyPoller({
        vaultUrl,
        name: "name",
        client,
      });

      await poller.poll();
      await poller.poll();

      assert.isUndefined(poller.getOperationState().isCompleted);
    });

    it("Errors other than 403 and 404 throw", async function () {
      const codes = [401, 402, 405, 500];
      for (const code of codes) {
        const client: any = {
          async deleteKey(): Promise<any> {
            return {
              key: {
                kid: "/version/name/version",
              },
              recoveryId: "something",
            };
          },
          async getDeletedKey(): Promise<any> {
            throw new RestError(`${code}`, undefined, code);
          },
        };
        const poller = new DeleteKeyPoller({
          vaultUrl,
          name: "name",
          client,
        });

        let error: Error | null = null;
        try {
          await poller.pollUntilDone();
        } catch (e) {
          error = e;
        }

        assert.equal((error as any).statusCode, code);
      }
    });
  });

  describe("recover LRO", () => {
    it("403 doesn't throw", async function () {
      const code = 403;
      const client: any = {
        async recoverDeletedKey(): Promise<any> {
          return {
            key: {
              kid: "/version/name/version",
            },
            recoveryId: "something",
          };
        },
        async getKey(): Promise<any> {
          throw new RestError(`${code}`, undefined, code);
        },
      };
      const poller = new RecoverDeletedKeyPoller({
        vaultUrl,
        name: "name",
        client,
      });

      await poller.pollUntilDone();

      assert.isTrue(poller.getOperationState().isCompleted);
    });

    it("404 doesn't throw", async function () {
      const code = 404;
      const client: any = {
        async recoverDeletedKey(): Promise<any> {
          return {
            key: {
              kid: "/version/name/version",
            },
            recoveryId: "something",
          };
        },
        async getKey(): Promise<any> {
          throw new RestError(`${code}`, undefined, code);
        },
      };
      const poller = new RecoverDeletedKeyPoller({
        vaultUrl,
        name: "name",
        client,
      });

      await poller.poll();
      await poller.poll();

      assert.isUndefined(poller.getOperationState().isCompleted);
    });

    it("Errors other than 403 and 404 throw", async function () {
      const codes = [401, 402, 405, 500];
      for (const code of codes) {
        const client: any = {
          async recoverDeletedKey(): Promise<any> {
            return {
              key: {
                kid: "/version/name/version",
              },
              recoveryId: "something",
            };
          },
          async getKey(): Promise<any> {
            throw new RestError(`${code}`, undefined, code);
          },
        };
        const poller = new RecoverDeletedKeyPoller({
          vaultUrl,
          name: "name",
          client,
        });

        let error: Error | null = null;
        try {
          await poller.pollUntilDone();
        } catch (e) {
          error = e;
        }

        assert.equal((error as any).statusCode, code);
      }
    });
  });
});

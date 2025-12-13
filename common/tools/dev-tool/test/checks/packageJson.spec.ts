// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, beforeAll } from "vitest";
import { noWorkspaceSpecifiersInDependencies } from "../../src/checks/packageJson";
import { ProjectInfo } from "../../src/util/resolveProject";
import { silenceLogger } from "../util";
import { CheckFailedError } from "../../src/framework/check";

describe("packageJson checks", () => {
  beforeAll(silenceLogger);

  describe("noWorkspaceSpecifiersInDependencies", () => {
    it("should pass for non-private package with no workspace specifiers in dependencies", async () => {
      const mockProject: ProjectInfo = {
        name: "test-package",
        path: "/test/path",
        version: "1.0.0",
        packageJson: {
          name: "test-package",
          version: "1.0.0",
          description: "test",
          types: "index.d.ts",
          files: [],
          scripts: {},
          repository: "github:Azure/azure-sdk-for-js",
          author: "Microsoft Corporation",
          license: "MIT",
          bugs: { url: "https://github.com/Azure/azure-sdk-for-js/issues" },
          homepage: "https://github.com/Azure/azure-sdk-for-js",
          sideEffects: false,
          private: false,
          dependencies: {
            "@azure/core-auth": "^1.0.0",
            "@azure/core-lro": "^2.0.0",
          },
          devDependencies: {
            "@azure/dev-tool": "workspace:^",
          },
        },
      };

      // Should not throw
      await noWorkspaceSpecifiersInDependencies.check!({
        fix: false,
        project: mockProject,
        verbose: false,
      });
    });

    it("should pass for private package with workspace specifiers in dependencies", async () => {
      const mockProject: ProjectInfo = {
        name: "test-private-package",
        path: "/test/path",
        version: "1.0.0",
        packageJson: {
          name: "test-private-package",
          version: "1.0.0",
          description: "test",
          types: "index.d.ts",
          files: [],
          scripts: {},
          repository: "github:Azure/azure-sdk-for-js",
          author: "Microsoft Corporation",
          license: "MIT",
          bugs: { url: "https://github.com/Azure/azure-sdk-for-js/issues" },
          homepage: "https://github.com/Azure/azure-sdk-for-js",
          sideEffects: false,
          private: true,
          dependencies: {
            "@azure/core-auth": "workspace:^",
          },
          devDependencies: {},
        },
      };

      // Should not throw for private packages
      await noWorkspaceSpecifiersInDependencies.check!({
        fix: false,
        project: mockProject,
        verbose: false,
      });
    });

    it("should fail for non-private package with workspace specifiers in dependencies", async () => {
      const mockProject: ProjectInfo = {
        name: "test-package",
        path: "/test/path",
        version: "1.0.0",
        packageJson: {
          name: "test-package",
          version: "1.0.0",
          description: "test",
          types: "index.d.ts",
          files: [],
          scripts: {},
          repository: "github:Azure/azure-sdk-for-js",
          author: "Microsoft Corporation",
          license: "MIT",
          bugs: { url: "https://github.com/Azure/azure-sdk-for-js/issues" },
          homepage: "https://github.com/Azure/azure-sdk-for-js",
          sideEffects: false,
          private: false,
          dependencies: {
            "@azure/core-auth": "workspace:^",
            "@azure/core-lro": "workspace:~",
            "@azure/logger": "^1.0.0",
          },
          devDependencies: {
            "@azure/dev-tool": "workspace:^",
          },
        },
      };

      let errorCaught = false;
      try {
        await noWorkspaceSpecifiersInDependencies.check!({
          fix: false,
          project: mockProject,
          verbose: false,
        });
      } catch (error) {
        errorCaught = true;
        assert.instanceOf(error, CheckFailedError);
        const checkError = error as CheckFailedError;
        assert.include(
          checkError.message,
          "package.json dependencies must not use workspace: specifiers",
        );
        assert.include(checkError.detail!, "@azure/core-auth: workspace:^");
        assert.include(checkError.detail!, "@azure/core-lro: workspace:~");
        assert.notInclude(checkError.detail!, "@azure/logger");
      }

      assert.isTrue(errorCaught, "Expected check to throw");
    });

    it("should pass for non-private package with no dependencies field", async () => {
      const mockProject: ProjectInfo = {
        name: "test-package",
        path: "/test/path",
        version: "1.0.0",
        packageJson: {
          name: "test-package",
          version: "1.0.0",
          description: "test",
          types: "index.d.ts",
          files: [],
          scripts: {},
          repository: "github:Azure/azure-sdk-for-js",
          author: "Microsoft Corporation",
          license: "MIT",
          bugs: { url: "https://github.com/Azure/azure-sdk-for-js/issues" },
          homepage: "https://github.com/Azure/azure-sdk-for-js",
          sideEffects: false,
          private: false,
          dependencies: {},
          devDependencies: {},
        },
      };

      // Should not throw
      await noWorkspaceSpecifiersInDependencies.check!({
        fix: false,
        project: mockProject,
        verbose: false,
      });
    });

    it("should allow workspace specifiers in devDependencies but not dependencies", async () => {
      const mockProject: ProjectInfo = {
        name: "test-package",
        path: "/test/path",
        version: "1.0.0",
        packageJson: {
          name: "test-package",
          version: "1.0.0",
          description: "test",
          types: "index.d.ts",
          files: [],
          scripts: {},
          repository: "github:Azure/azure-sdk-for-js",
          author: "Microsoft Corporation",
          license: "MIT",
          bugs: { url: "https://github.com/Azure/azure-sdk-for-js/issues" },
          homepage: "https://github.com/Azure/azure-sdk-for-js",
          sideEffects: false,
          private: false,
          dependencies: {
            "@azure/core-auth": "^1.0.0",
          },
          devDependencies: {
            "@azure/dev-tool": "workspace:^",
            "@azure/eslint-plugin-azure-sdk": "workspace:^",
            "@azure-tools/test-recorder": "workspace:^",
          },
        },
      };

      // Should not throw - workspace in devDependencies is OK
      await noWorkspaceSpecifiersInDependencies.check!({
        fix: false,
        project: mockProject,
        verbose: false,
      });
    });
  });
});

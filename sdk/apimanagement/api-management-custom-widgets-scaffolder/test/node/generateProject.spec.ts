// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TECHNOLOGIES, WidgetConfig, displayNameToName } from "../../src/scaffolding.js";
import { describe, it, assert, vi, beforeEach, afterEach } from "vitest";

vi.mock("node:fs/promises", async () => {
  const actual = await vi.importActual("node:fs/promises");
  return {
    ...actual,
    mkdir: vi.fn(),
    writeFile: vi.fn(),
  };
});

import * as promises from "fs/promises";
import { generateProject } from "../../src/index.js";

const widgetConfig: Omit<WidgetConfig, "technology"> = {
  displayName: "Contoso App",
};
const deployConfig = {
  apiVersion: "1",
  managementApiEndpoint: "foo.com",
  resourceId:
    "/subscriptions/c6a33fd3-e442-48a4-b82d-bcc4ad8a71d7/resourceGroups/mibudz-test/providers/Microsoft.ApiManagement/service/contoso",
};

TECHNOLOGIES.forEach((technology) => {
  describe("Custom widget scaffolder - " + technology, () => {
    let writtenFiles: { name: string; content: string }[] = [];

    beforeEach(() => {
      vi.mocked(promises.writeFile).mockImplementation(async (name, content) => {
        const stringName = name as string;
        const contentString = content as string;
        writtenFiles.push({ name: stringName, content: contentString });
      });
    });

    afterEach(() => {
      vi.resetAllMocks();
      writtenFiles = [];
    });

    it("should generate project", async () => {
      await generateProject({ ...widgetConfig, technology }, deployConfig);

      assert.isAbove(writtenFiles.length, 0);

      const indexFile = writtenFiles.find((file) => file.name.includes("index.html"))?.content;
      if (!indexFile) {
        assert.fail("index.html file not found");
      }

      const widgetFolderName = writtenFiles.find((file) =>
        file.name.includes("package.json"),
      )?.content;
      if (!widgetFolderName) {
        assert.fail("package.json file not found");
      }

      assert.include(indexFile, widgetConfig.displayName);
      assert.include(widgetFolderName, displayNameToName(widgetConfig.displayName));

      Object.entries(deployConfig).forEach(([key, value]) => {
        const deployJsFile = writtenFiles.find((file) => file.name.includes("deploy.js"))?.content;
        if (!deployJsFile) {
          assert.fail("package.json file not found");
        }

        assert.include(deployJsFile, `"${key}": "${value}"`);
      });
    });
  });
});

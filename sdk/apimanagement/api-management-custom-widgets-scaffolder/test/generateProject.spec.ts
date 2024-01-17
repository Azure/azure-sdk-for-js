// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TECHNOLOGIES, WidgetConfig, displayNameToName } from "../src/scaffolding";

import { assert } from "chai";
import { generateProject } from "../src";
import { promises } from "fs";
import sinon from "sinon";

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
    let sandbox: sinon.SinonSandbox;
    let writeFileSpy: sinon.SinonStub;
    const writtenFiles: { name: string; content: string }[] = [];

    beforeEach(() => {
      sandbox = sinon.createSandbox();
      writeFileSpy = sandbox.stub(promises, "writeFile");
      sandbox.stub(promises, "mkdir");
    });

    afterEach(() => {
      sandbox.restore();
    });

    it("should generate project", async () => {
      writeFileSpy.callsFake((name, content) => {
        writtenFiles.push({ name, content });
      });
      await generateProject({ ...widgetConfig, technology }, deployConfig);

      assert.ok(writtenFiles.length);
    });

    it("Generated project should contain provided name", () => {
      assert.include(
        writtenFiles.find((file) => file.name.includes("index.html"))?.content,
        widgetConfig.displayName,
      );
      assert.include(
        writtenFiles.find((file) => file.name.includes("package.json"))?.content,
        displayNameToName(widgetConfig.displayName),
      );
    });

    it("Generated project should contain provided deployConfig", () => {
      Object.entries(deployConfig).forEach(([key, value]) => {
        assert.include(
          writtenFiles.find((file) => file.name.includes("deploy.js"))?.content,
          `"${key}": "${value}"`,
        );
      });
    });
  });
});

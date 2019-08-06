import * as helper from "./helper";
import * as assert from "assert";

before(() => {
  return helper.interactiveLogin();
});

describe("apps.test.ts", () => {
  it("lists applications", () => {
    let app_name = "New Luis App Name"
    return helper.addApp(app_name).then(appId => {
      return helper.listApps().then(list => {
        assert.notEqual(list.length, 0);

        // To-Do: assert the list has an app with "New Luis App Name"
      });
    });
  });
});
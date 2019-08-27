import { LUISRuntimeClient } from "../src/lUISRuntimeClient";
import { CognitiveServicesCredentials } from "@azure/ms-rest-azure-js";

export class BaseTest {
  static GlobalAppId = "0894d430-8f00-4bcd-8153-45e06a1feca1";
  static GlobalVersionId = "0.1";
  static GlobalAppIdError = "86226c53-b7a6-416f-876b-226b2b5ab07d";
  static GlobalNoneId = "73ca6bdd-e7fa-420e-b5b7-22fe281e3a64";
  static AuthoringKey = "b15ebe3a1ec446a08f8021fe6f95f0f6";
  static EmptyId = "00000000-0000-0000-0000-000000000000";
  static OwenerEmail = "a-ahabu@microsoft.com";

  static async useClientFor(test) {
    let client = new LUISRuntimeClient(
      new CognitiveServicesCredentials(this.AuthoringKey),
      "https://westus.api.cognitive.microsoft.com"
    );
    await test(client);
  }

  static doesListContain(list: any[], key: string, value: any) {
    let found = false;
    for (var item of list) {
      if (item[key] == value) {
        found = true;
      }
    }
    return found;
  }
}

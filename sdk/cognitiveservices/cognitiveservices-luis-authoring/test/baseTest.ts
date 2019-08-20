import { CognitiveServicesCredentials } from "@azure/ms-rest-azure-js";
import { LUISAuthoringClient } from "../src/lUISAuthoringClient";

export class BaseTest {
    static GlobalAppId = "e7f5f63a-efec-4215-815c-d0ed28106c0c";
    static GlobalVersionId = "0.1";
    static GlobalAppIdError = "86226c53-b7a6-416f-876b-226b2b5ab07d";
    static GlobalNoneId = "ed986e25-d092-412e-8a2b-9efefa3ee549";
    static AuthoringKey = "b15ebe3a1ec446a08f8021fe6f95f0f6";
    static EmptyId = "00000000-0000-0000-0000-000000000000";
    static OwenerEmail = "a-ahabu@microsoft.com";

    static async useClientFor(test) {
        let client = new LUISAuthoringClient(
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
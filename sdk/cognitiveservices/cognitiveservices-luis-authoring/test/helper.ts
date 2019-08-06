import * as msRestNodeAuth from "@azure/ms-rest-nodeauth";
import { LUISAuthoringClient } from "../src/lUISAuthoringClient";

var global_client: LUISAuthoringClient;
var subscription = "b15ebe3a1ec446a08f8021fe6f95f0f6";

export function interactiveLogin() {
    return msRestNodeAuth.interactiveLogin().then((credentials: any) => {
        const client = new LUISAuthoringClient(
            "https://westus.api.cognitive.microsoft.com/luis/api/v2.0/apps/",
            credentials
        );
        global_client = client;
    });
}

export function addApp(app_name) {
    return global_client.apps.add(
        {
            name: app_name,
            description: "New LUIS App",
            culture: "en-us",
            domain: "Comics",
            usageScenario: "IoT"
        },
        {
            customHeaders: {
                "Ocp-Apim-Subscription-Key": subscription
            }
        }
    );
}


export function listApps() {
    return global_client.apps.list({
        customHeaders: {
            "Ocp-Apim-Subscription-Key": subscription
        }
    });
}

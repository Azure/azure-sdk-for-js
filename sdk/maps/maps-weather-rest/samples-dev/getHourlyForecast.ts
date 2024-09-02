// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DefaultAzureCredential } from "@azure/identity";
import MapsWeather from "../src/mapsWeather";

/**
 * @summary Get hourly weather forecast.
 */
async function main(): Promise<void> {
    const credential = new DefaultAzureCredential();
    const mapsClientId = process.env.MAPS_RESOURCE_CLIENT_ID || "";
    const client = MapsWeather(credential, mapsClientId);

    const response = await client.path("/weather/forecast/hourly/{format}", "json").get({
        queryParameters: {
            query: [47.641268, -122.125679],
            duration: 24,
            unit: "metric"
        },
    });

    if (!response) throw new Error("Failed to get weather data");

    console.log(response.body);
}

main().catch((err) => {
    console.error("The sample encountered an error:", err);
});

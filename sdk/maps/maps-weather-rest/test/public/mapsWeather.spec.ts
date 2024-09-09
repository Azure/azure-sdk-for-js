// -------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for
// license information.
// --------------------------------------------------------------------------
import { env, Recorder } from "@azure-tools/test-recorder";
import { Context } from "mocha";
import MapsWeather, { MapsWeatherClient } from "../../src";
import { AzureKeyCredential } from "@azure/core-auth";
import { assert } from "chai";

describe("MapsWeatherClient Tests", function () {
  let recorder: Recorder;
  let client: MapsWeatherClient;

  beforeEach(async function (this: Context) {
    recorder = new Recorder(this.currentTest);
    await recorder.start({
      envSetupForPlayback: {
        MAPS_RESOURCE_CLIENT_ID: "azure_maps_client_id",
      },
    });
    client = MapsWeather(new AzureKeyCredential(env["AZURE_SUBSCRIPTION_KEY"] as string));
  });

  afterEach(async function () {
    await recorder.stop();
  });


  it("Get Minute Forecast", async function () {
    const result = await client
        .path("/weather/forecast/minute/{format}", "json")
        .get({ queryParameters: { query: [47.641268, -122.125679] } });
    assert.isNotEmpty(result.body);
  });

  it("Get Quarter-Day Forecast", async function () {
    const result = await client
        .path("/weather/forecast/quarterDay/{format}", "json")
        .get({ queryParameters: { query: [47.641268, -122.125679] } });
    assert.isNotEmpty(result.body);
  });

  it("Get Current Conditions", async function () {
    const result = await client
        .path("/weather/currentConditions/{format}", "json")
        .get({ queryParameters: { query: [47.641268, -122.125679] } });
    assert.isNotEmpty(result.body);
  });

  it("Get Daily Forecast", async function () {
    const result = await client
        .path("/weather/forecast/daily/{format}", "json")
        .get({ queryParameters: { query: [47.641268, -122.125679] } });
    assert.isNotEmpty(result.body);
  });

  it("Get Weather Along Route", async function () {
    const result = await client
        .path("/weather/route/{format}", "json")
        .get({
          queryParameters: {
            query: "47.641268,-122.125679,0:47.641268,-122.125679,2",
          },
        });
    assert.isNotEmpty(result.body);
  });

  it("Get Severe Weather Alerts", async function () {
    const result = await client
        .path("/weather/severe/alerts/{format}", "json")
        .get({ queryParameters: { query: [47.641268, -122.125679] } });
    assert.isNotEmpty(result.body);
  });

  it("Get Daily Indices", async function () {
    const result = await client
        .path("/weather/indices/daily/{format}", "json")
        .get({ queryParameters: { query: [47.641268, -122.125679] } });
    assert.isNotEmpty(result.body);
  });

  it("Get Tropical Storm Active", async function () {
    const result = await client
        .path("/weather/tropical/storms/active/{format}", "json")
        .get({});
    assert.isNotEmpty(result.body);
  });

  it("Search Tropical Storm", async function () {
    const result = await client
        .path("/weather/tropical/storms/{format}", "json")
        .get({ queryParameters: { year: 2022, basinId: "NP" } });
    assert.isNotEmpty(result.body);
  });

  it("Get Tropical Storm Forecast", async function () {
    const result = await client
        .path("/weather/tropical/storms/forecasts/{format}", "json")
        .get({ queryParameters: { year: 2022, basinId: "NP", govId: 2 } });
    assert.isNotEmpty(result.body);
  });

  it("Get Tropical Storm Locations", async function () {
    const result = await client
        .path("/weather/tropical/storms/locations/{format}", "json")
        .get({ queryParameters: { year: 2022, basinId: "NP", govId: 2 } });
    assert.isNotEmpty(result.body);
  });

  it("Get Current Air Quality", async function () {
    const result = await client
        .path("/weather/airQuality/current/{format}", "json")
        .get({ queryParameters: { query: [47.641268, -122.125679] } });
    assert.isNotEmpty(result.body);
  });

  it("Get Air Quality Daily Forecasts", async function () {
    const result = await client
        .path("/weather/airQuality/forecasts/daily/{format}", "json")
        .get({ queryParameters: { query: [47.641268, -122.125679] } });
    assert.isNotEmpty(result.body);
  });

  it("Get Air Quality Hourly Forecasts", async function () {
    const result = await client
        .path("/weather/airQuality/forecasts/hourly/{format}", "json")
        .get({ queryParameters: { query: [47.641268, -122.125679] } });
    assert.isNotEmpty(result.body);
  });

  it("Get Daily Historical Actuals", async function () {
    const result = await client
        .path("/weather/historical/actuals/daily/{format}", "json")
        .get({
          queryParameters: {
            query: [47.641268, -122.125679],
            startDate: "2023-01-01",
            endDate: "2023-01-31",
          },
        });
    assert.isNotEmpty(result.body);
  });

  it("Get Daily Historical Records", async function () {
    const result = await client
        .path("/weather/historical/records/daily/{format}", "json")
        .get({
          queryParameters: {
            query: [47.641268, -122.125679],
            startDate: "2023-01-01",
            endDate: "2023-01-31",
          },
        });
    assert.isNotEmpty(result.body);
  });

  it("Get Daily Historical Normals", async function () {
    const result = await client
        .path("/weather/historical/normals/daily/{format}", "json")
        .get({
          queryParameters: {
            query: [47.641268, -122.125679],
            startDate: "2023-01-01",
            endDate: "2023-01-31",
          },
        });
    assert.isNotEmpty(result.body);
  });
});

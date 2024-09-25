// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  WeatherGetHourlyForecast200Response,
  WeatherGetHourlyForecastDefaultResponse,
  WeatherGetMinuteForecast200Response,
  WeatherGetMinuteForecastDefaultResponse,
  WeatherGetQuarterDayForecast200Response,
  WeatherGetQuarterDayForecastDefaultResponse,
  WeatherGetCurrentConditions200Response,
  WeatherGetCurrentConditionsDefaultResponse,
  WeatherGetDailyForecast200Response,
  WeatherGetDailyForecastDefaultResponse,
  WeatherGetWeatherAlongRoute200Response,
  WeatherGetWeatherAlongRouteDefaultResponse,
  WeatherGetSevereWeatherAlerts200Response,
  WeatherGetSevereWeatherAlertsDefaultResponse,
  WeatherGetDailyIndices200Response,
  WeatherGetDailyIndicesDefaultResponse,
  WeatherGetTropicalStormActive200Response,
  WeatherGetTropicalStormActiveDefaultResponse,
  WeatherSearchTropicalStorm200Response,
  WeatherSearchTropicalStormDefaultResponse,
  WeatherGetTropicalStormForecast200Response,
  WeatherGetTropicalStormForecastDefaultResponse,
  WeatherGetTropicalStormLocations200Response,
  WeatherGetTropicalStormLocationsDefaultResponse,
  WeatherGetCurrentAirQuality200Response,
  WeatherGetCurrentAirQualityDefaultResponse,
  WeatherGetAirQualityDailyForecasts200Response,
  WeatherGetAirQualityDailyForecastsDefaultResponse,
  WeatherGetAirQualityHourlyForecasts200Response,
  WeatherGetAirQualityHourlyForecastsDefaultResponse,
  WeatherGetDailyHistoricalActuals200Response,
  WeatherGetDailyHistoricalActualsDefaultResponse,
  WeatherGetDailyHistoricalRecords200Response,
  WeatherGetDailyHistoricalRecordsDefaultResponse,
  WeatherGetDailyHistoricalNormals200Response,
  WeatherGetDailyHistoricalNormalsDefaultResponse
} from "./responses";

const responseMap: Record<string, string[]> = {
  "GET /weather/forecast/hourly/{format}": ["200"],
  "GET /weather/forecast/minute/{format}": ["200"],
  "GET /weather/forecast/quarterDay/{format}": ["200"],
  "GET /weather/currentConditions/{format}": ["200"],
  "GET /weather/forecast/daily/{format}": ["200"],
  "GET /weather/route/{format}": ["200"],
  "GET /weather/severe/alerts/{format}": ["200"],
  "GET /weather/indices/daily/{format}": ["200"],
  "GET /weather/tropical/storms/active/{format}": ["200"],
  "GET /weather/tropical/storms/{format}": ["200"],
  "GET /weather/tropical/storms/forecasts/{format}": ["200"],
  "GET /weather/tropical/storms/locations/{format}": ["200"],
  "GET /weather/airQuality/current/{format}": ["200"],
  "GET /weather/airQuality/forecasts/daily/{format}": ["200"],
  "GET /weather/airQuality/forecasts/hourly/{format}": ["200"],
  "GET /weather/historical/actuals/daily/{format}": ["200"],
  "GET /weather/historical/records/daily/{format}": ["200"],
  "GET /weather/historical/normals/daily/{format}": ["200"]
};

export function isUnexpected(
  response:
    | WeatherGetHourlyForecast200Response
    | WeatherGetHourlyForecastDefaultResponse
): response is WeatherGetHourlyForecastDefaultResponse;
export function isUnexpected(
  response:
    | WeatherGetMinuteForecast200Response
    | WeatherGetMinuteForecastDefaultResponse
): response is WeatherGetMinuteForecastDefaultResponse;
export function isUnexpected(
  response:
    | WeatherGetQuarterDayForecast200Response
    | WeatherGetQuarterDayForecastDefaultResponse
): response is WeatherGetQuarterDayForecastDefaultResponse;
export function isUnexpected(
  response:
    | WeatherGetCurrentConditions200Response
    | WeatherGetCurrentConditionsDefaultResponse
): response is WeatherGetCurrentConditionsDefaultResponse;
export function isUnexpected(
  response:
    | WeatherGetDailyForecast200Response
    | WeatherGetDailyForecastDefaultResponse
): response is WeatherGetDailyForecastDefaultResponse;
export function isUnexpected(
  response:
    | WeatherGetWeatherAlongRoute200Response
    | WeatherGetWeatherAlongRouteDefaultResponse
): response is WeatherGetWeatherAlongRouteDefaultResponse;
export function isUnexpected(
  response:
    | WeatherGetSevereWeatherAlerts200Response
    | WeatherGetSevereWeatherAlertsDefaultResponse
): response is WeatherGetSevereWeatherAlertsDefaultResponse;
export function isUnexpected(
  response:
    | WeatherGetDailyIndices200Response
    | WeatherGetDailyIndicesDefaultResponse
): response is WeatherGetDailyIndicesDefaultResponse;
export function isUnexpected(
  response:
    | WeatherGetTropicalStormActive200Response
    | WeatherGetTropicalStormActiveDefaultResponse
): response is WeatherGetTropicalStormActiveDefaultResponse;
export function isUnexpected(
  response:
    | WeatherSearchTropicalStorm200Response
    | WeatherSearchTropicalStormDefaultResponse
): response is WeatherSearchTropicalStormDefaultResponse;
export function isUnexpected(
  response:
    | WeatherGetTropicalStormForecast200Response
    | WeatherGetTropicalStormForecastDefaultResponse
): response is WeatherGetTropicalStormForecastDefaultResponse;
export function isUnexpected(
  response:
    | WeatherGetTropicalStormLocations200Response
    | WeatherGetTropicalStormLocationsDefaultResponse
): response is WeatherGetTropicalStormLocationsDefaultResponse;
export function isUnexpected(
  response:
    | WeatherGetCurrentAirQuality200Response
    | WeatherGetCurrentAirQualityDefaultResponse
): response is WeatherGetCurrentAirQualityDefaultResponse;
export function isUnexpected(
  response:
    | WeatherGetAirQualityDailyForecasts200Response
    | WeatherGetAirQualityDailyForecastsDefaultResponse
): response is WeatherGetAirQualityDailyForecastsDefaultResponse;
export function isUnexpected(
  response:
    | WeatherGetAirQualityHourlyForecasts200Response
    | WeatherGetAirQualityHourlyForecastsDefaultResponse
): response is WeatherGetAirQualityHourlyForecastsDefaultResponse;
export function isUnexpected(
  response:
    | WeatherGetDailyHistoricalActuals200Response
    | WeatherGetDailyHistoricalActualsDefaultResponse
): response is WeatherGetDailyHistoricalActualsDefaultResponse;
export function isUnexpected(
  response:
    | WeatherGetDailyHistoricalRecords200Response
    | WeatherGetDailyHistoricalRecordsDefaultResponse
): response is WeatherGetDailyHistoricalRecordsDefaultResponse;
export function isUnexpected(
  response:
    | WeatherGetDailyHistoricalNormals200Response
    | WeatherGetDailyHistoricalNormalsDefaultResponse
): response is WeatherGetDailyHistoricalNormalsDefaultResponse;
export function isUnexpected(
  response:
    | WeatherGetHourlyForecast200Response
    | WeatherGetHourlyForecastDefaultResponse
    | WeatherGetMinuteForecast200Response
    | WeatherGetMinuteForecastDefaultResponse
    | WeatherGetQuarterDayForecast200Response
    | WeatherGetQuarterDayForecastDefaultResponse
    | WeatherGetCurrentConditions200Response
    | WeatherGetCurrentConditionsDefaultResponse
    | WeatherGetDailyForecast200Response
    | WeatherGetDailyForecastDefaultResponse
    | WeatherGetWeatherAlongRoute200Response
    | WeatherGetWeatherAlongRouteDefaultResponse
    | WeatherGetSevereWeatherAlerts200Response
    | WeatherGetSevereWeatherAlertsDefaultResponse
    | WeatherGetDailyIndices200Response
    | WeatherGetDailyIndicesDefaultResponse
    | WeatherGetTropicalStormActive200Response
    | WeatherGetTropicalStormActiveDefaultResponse
    | WeatherSearchTropicalStorm200Response
    | WeatherSearchTropicalStormDefaultResponse
    | WeatherGetTropicalStormForecast200Response
    | WeatherGetTropicalStormForecastDefaultResponse
    | WeatherGetTropicalStormLocations200Response
    | WeatherGetTropicalStormLocationsDefaultResponse
    | WeatherGetCurrentAirQuality200Response
    | WeatherGetCurrentAirQualityDefaultResponse
    | WeatherGetAirQualityDailyForecasts200Response
    | WeatherGetAirQualityDailyForecastsDefaultResponse
    | WeatherGetAirQualityHourlyForecasts200Response
    | WeatherGetAirQualityHourlyForecastsDefaultResponse
    | WeatherGetDailyHistoricalActuals200Response
    | WeatherGetDailyHistoricalActualsDefaultResponse
    | WeatherGetDailyHistoricalRecords200Response
    | WeatherGetDailyHistoricalRecordsDefaultResponse
    | WeatherGetDailyHistoricalNormals200Response
    | WeatherGetDailyHistoricalNormalsDefaultResponse
): response is
  | WeatherGetHourlyForecastDefaultResponse
  | WeatherGetMinuteForecastDefaultResponse
  | WeatherGetQuarterDayForecastDefaultResponse
  | WeatherGetCurrentConditionsDefaultResponse
  | WeatherGetDailyForecastDefaultResponse
  | WeatherGetWeatherAlongRouteDefaultResponse
  | WeatherGetSevereWeatherAlertsDefaultResponse
  | WeatherGetDailyIndicesDefaultResponse
  | WeatherGetTropicalStormActiveDefaultResponse
  | WeatherSearchTropicalStormDefaultResponse
  | WeatherGetTropicalStormForecastDefaultResponse
  | WeatherGetTropicalStormLocationsDefaultResponse
  | WeatherGetCurrentAirQualityDefaultResponse
  | WeatherGetAirQualityDailyForecastsDefaultResponse
  | WeatherGetAirQualityHourlyForecastsDefaultResponse
  | WeatherGetDailyHistoricalActualsDefaultResponse
  | WeatherGetDailyHistoricalRecordsDefaultResponse
  | WeatherGetDailyHistoricalNormalsDefaultResponse {
  const lroOriginal = response.headers["x-ms-original-url"];
  const url = new URL(lroOriginal ?? response.request.url);
  const method = response.request.method;
  let pathDetails = responseMap[`${method} ${url.pathname}`];
  if (!pathDetails) {
    pathDetails = geParametrizedPathSuccess(method, url.pathname);
  }
  return !pathDetails.includes(response.status);
}

function geParametrizedPathSuccess(method: string, path: string): string[] {
  const pathParts = path.split("/");

  // Iterate the responseMap to find a match
  for (const [key, value] of Object.entries(responseMap)) {
    // Extracting the path from the map key which is in format
    // GET /path/foo
    if (!key.startsWith(method)) {
      continue;
    }
    const candidatePath = getPathFromMapKey(key);
    // Get each part of the url path
    const candidateParts = candidatePath.split("/");

    // If the candidate and actual paths don't match in size
    // we move on to the next candidate path
    if (
      candidateParts.length === pathParts.length &&
      hasParametrizedPath(key)
    ) {
      // track if we have found a match to return the values found.
      let found = true;
      for (let i = 0; i < candidateParts.length; i++) {
        if (
          candidateParts[i]?.startsWith("{") &&
          candidateParts[i]?.endsWith("}")
        ) {
          // If the current part of the candidate is a "template" part
          // it is a match with the actual path part on hand
          // skip as the parameterized part can match anything
          continue;
        }

        // If the candidate part is not a template and
        // the parts don't match mark the candidate as not found
        // to move on with the next candidate path.
        if (candidateParts[i] !== pathParts[i]) {
          found = false;
          break;
        }
      }

      // We finished evaluating the current candidate parts
      // if all parts matched we return the success values form
      // the path mapping.
      if (found) {
        return value;
      }
    }
  }

  // No match was found, return an empty array.
  return [];
}

function hasParametrizedPath(path: string): boolean {
  return path.includes("/{");
}

function getPathFromMapKey(mapKey: string): string {
  const pathStart = mapKey.indexOf("/");
  return mapKey.slice(pathStart);
}

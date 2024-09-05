# Azure Maps Weather client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for Azure Maps Weather in various scenarios.

| **File Name**                                     | **Description**                                                    |
| ------------------------------------------------- | ------------------------------------------------------------------ |
| [getAirQualityDailyForecasts.ts][getairqualitydaily] | How to get daily air quality forecasts for up to 7 days.           |
| [getAirQualityHourlyForecasts.ts][getairqualityhourly] | How to get hourly air quality forecasts for up to 96 hours.        |
| [getCurrentAirQuality.ts][getcurrentairquality]    | How to get current air quality information for a specific location.|
| [getCurrentConditions.ts][getcurrentconditions]    | How to get current weather conditions for a specific location.     |
| [getDailyForecast.ts][getdailyforecast]            | How to get daily weather forecasts for up to 45 days.              |
| [getDailyHistoricalActuals.ts][getdailyhistoricalactuals] | How to get daily historical weather data.                          |
| [getDailyHistoricalNormals.ts][getdailyhistoricalnormals] | How to get daily historical weather normals.                       |
| [getDailyHistoricalRecords.ts][getdailyhistoricalrecords] | How to get daily historical weather records.                       |
| [getDailyIndices.ts][getdailyindices]              | How to get daily indices for planning activities based on weather. |
| [getHourlyForecast.ts][gethourlyforecast]          | How to get hourly weather forecasts for up to 10 days.             |
| [getMinuteForecast.ts][getminuteforecast]          | How to get minute-by-minute forecasts for the next 120 minutes.    |
| [getQuarterDayForecast.ts][getquarterdayforecast]  | How to get quarter-day weather forecasts for up to 15 days.        |
| [getSevereWeatherAlerts.ts][getsevereweatheralerts]| How to retrieve severe weather alerts for a specific location.     |
| [getTropicalStormActive.ts][gettropicalstormactive]| How to retrieve information about active tropical storms globally. |
| [getTropicalStormForecast.ts][gettropicalstormforecast] | How to get forecasts for a specific tropical storm.               |
| [getTropicalStormLocations.ts][gettropicalstormlocations] | How to retrieve locations for tropical storms by year or ID.       |
| [getTropicalStormSearch.ts][gettropicalstormsearch] | How to search for tropical storms by year, basin, or government ID.|
| [getWeatherAlongRoute.ts][getweatheralongroute]    | How to get weather forecasts along a travel route.                 |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).

Before running the samples in Node, they must be compiled to JavaScript using the TypeScript compiler. For more information on TypeScript, see the [TypeScript documentation][typescript]. Install the TypeScript compiler using:

```bash
npm install -g typescript
```

You need [an Azure subscription][freesub] and the following Azure resources to run these sample programs:

- [Azure Maps Resource][createinstance_azuremapsresource]

Samples retrieve credentials to access the service endpoint from environment variables. Alternatively, edit the source code to include the appropriate credentials. See each individual sample for details on which environment variables/credentials it requires to function.

Adapting the samples to run in the browser may require some additional consideration. For details, please see the [package README][package].

## Setup

To run the samples using the published version of the package:

1. Install the dependencies using `npm`:

```bash
npm install
```

2. Compile the samples:

```bash
npm run build
```

3. Edit the file `sample.env`, adding the correct credentials to access the Azure service and run the samples. Then rename the file from `sample.env` to just `.env`. The sample programs will read this file automatically.

4. Run whichever samples you like (note that some samples may require additional setup, see the table above):

```bash
node dist/getAirQualityDailyForecasts.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env MAPS_RESOURCE_CLIENT_ID="<maps resource client id>" node dist/getAirQualityDailyForecasts.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[getairqualitydaily]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-weather-rest/samples/v1-beta/typescript/src/getAirQualityDailyForecasts.ts
[getairqualityhourly]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-weather-rest/samples/v1-beta/typescript/src/getAirQualityHourlyForecasts.ts
[getcurrentairquality]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-weather-rest/samples/v1-beta/typescript/src/getCurrentAirQuality.ts
[getcurrentconditions]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-weather-rest/samples/v1-beta/typescript/src/getCurrentConditions.ts
[getdailyforecast]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-weather-rest/samples/v1-beta/typescript/src/getDailyForecast.ts
[getdailyhistoricalactuals]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-weather-rest/samples/v1-beta/typescript/src/getDailyHistoricalActuals.ts
[getdailyhistoricalnormals]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-weather-rest/samples/v1-beta/typescript/src/getDailyHistoricalNormals.ts
[getdailyhistoricalrecords]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-weather-rest/samples/v1-beta/typescript/src/getDailyHistoricalRecords.ts
[getdailyindices]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-weather-rest/samples/v1-beta/typescript/src/getDailyIndices.ts
[gethourlyforecast]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-weather-rest/samples/v1-beta/typescript/src/getHourlyForecast.ts
[getminuteforecast]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-weather-rest/samples/v1-beta/typescript/src/getMinuteForecast.ts
[getquarterdayforecast]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-weather-rest/samples/v1-beta/typescript/src/getQuarterDayForecast.ts
[getsevereweatheralerts]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-weather-rest/samples/v1-beta/typescript/src/getSevereWeatherAlerts.ts
[gettropicalstormactive]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-weather-rest/samples/v1-beta/typescript/src/getTropicalStormActive.ts
[gettropicalstormforecast]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-weather-rest/samples/v1-beta/typescript/src/getTropicalStormForecast.ts
[gettropicalstormlocations]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-weather-rest/samples/v1-beta/typescript/src/getTropicalStormLocations.ts
[gettropicalstormsearch]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-weather-rest/samples/v1-beta/typescript/src/getTropicalStormSearch.ts
[getweatheralongroute]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-weather-rest/samples/v1-beta/typescript/src/getWeatherAlongRoute.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure-rest/maps-weather
[freesub]: https://azure.microsoft.com/free/
[createinstance_azuremapsresource]: https://docs.microsoft.com/azure/azure-maps/how-to-create-template
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/maps/maps-weather-rest/README.md
[typescript]: https://www.typescriptlang.org/docs
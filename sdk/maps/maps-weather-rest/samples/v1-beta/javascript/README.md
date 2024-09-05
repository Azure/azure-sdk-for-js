# Azure Maps Weather client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for Azure Maps Weather in some common scenarios.

| **File Name**                                             | **Description**                                                    |
|-----------------------------------------------------------|--------------------------------------------------------------------|
| [getAirQualityDailyForecasts.js][getairqualitydaily]      | How to get daily air quality forecasts for up to 7 days.           |
| [getAirQualityHourlyForecasts.js][getairqualityhourly]    | How to get hourly air quality forecasts for up to 96 hours.        |
| [getCurrentAirQuality.js][getcurrentairquality]           | How to get current air quality information for a specific location. |
| [getCurrentConditions.js][getcurrentconditions]           | How to get current weather conditions for a specific location.     |
| [getDailyForecast.js][getdailyforecast]                   | How to get daily weather forecasts for up to 45 days.              |
| [getDailyHistoricalActuals.js][getdailyhistoricalactuals] | How to get daily historical weather data.                          |
| [getDailyHistoricalNormals.js][getdailyhistoricalnormals] | How to get daily historical weather normals.                       |
| [getDailyHistoricalRecords.js][getdailyhistoricalrecords] | How to get daily historical weather records.                       |
| [getDailyIndices.js][getdailyindices]                     | How to get daily indices for planning activities based on weather. |
| [getHourlyForecast.js][gethourlyforecast]                 | How to get hourly weather forecasts for up to 10 days.             |
| [getMinuteForecast.js][getminuteforecast]                 | How to get minute-by-minute forecasts for the next 120 minutes.    |
| [getQuarterDayForecast.js][getquarterdayforecast]         | How to get quarter-day weather forecasts for up to 15 days.        |
| [getSevereWeatherAlerts.js][getsevereweatheralerts]       | How to retrieve severe weather alerts for a specific location.     |
| [getTropicalStormActive.js][gettropicalstormactive]       | How to retrieve information about active tropical storms globally. |
| [getTropicalStormForecast.js][gettropicalstormforecast]   | How to get forecasts for a specific tropical storm.                |
| [getTropicalStormLocations.js][gettropicalstormlocations] | How to retrieve locations for tropical storms by year or ID.       |
| [getTropicalStormSearch.js][gettropicalstormsearch]       | How to search for tropical storms by year, basin, or government ID. |
| [getWeatherAlongRoute.js][getweatheralongroute]           | How to get weather forecasts along a travel route.                 |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).

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

2. Edit the file `sample.env`, adding the correct credentials to access the Azure service and run the samples. Then rename the file from `sample.env` to just `.env`. The sample programs will read this file automatically.

3. Run whichever samples you like (note that some samples may require additional setup, see the table above):

```bash
node getAirQualityDailyForecasts.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env MAPS_RESOURCE_CLIENT_ID="<maps resource client id>" node getAirQualityDailyForecasts.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[getairqualitydaily]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-weather-rest/samples/v1-beta/javascript/getAirQualityDailyForecasts.js
[getairqualityhourly]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-weather-rest/samples/v1-beta/javascript/getAirQualityHourlyForecasts.js
[getcurrentairquality]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-weather-rest/samples/v1-beta/javascript/getCurrentAirQuality.js
[getcurrentconditions]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-weather-rest/samples/v1-beta/javascript/getCurrentConditions.js
[getdailyforecast]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-weather-rest/samples/v1-beta/javascript/getDailyForecast.js
[getdailyhistoricalactuals]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-weather-rest/samples/v1-beta/javascript/getDailyHistoricalActuals.js
[getdailyhistoricalnormals]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-weather-rest/samples/v1-beta/javascript/getDailyHistoricalNormals.js
[getdailyhistoricalrecords]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-weather-rest/samples/v1-beta/javascript/getDailyHistoricalRecords.js
[getdailyindices]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-weather-rest/samples/v1-beta/javascript/getDailyIndices.js
[gethourlyforecast]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-weather-rest/samples/v1-beta/javascript/getHourlyForecast.js
[getminuteforecast]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-weather-rest/samples/v1-beta/javascript/getMinuteForecast.js
[getquarterdayforecast]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-weather-rest/samples/v1-beta/javascript/getQuarterDayForecast.js
[getsevereweatheralerts]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-weather-rest/samples/v1-beta/javascript/getSevereWeatherAlerts.js
[gettropicalstormactive]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-weather-rest/samples/v1-beta/javascript/getTropicalStormActive.js
[gettropicalstormforecast]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-weather-rest/samples/v1-beta/javascript/getTropicalStormForecast.js
[gettropicalstormlocations]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-weather-rest/samples/v1-beta/javascript/getTropicalStormLocations.js
[gettropicalstormsearch]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-weather-rest/samples/v1-beta/javascript/getTropicalStormSearch.js
[getweatheralongroute]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-weather-rest/samples/v1-beta/javascript/getWeatherAlongRoute.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure-rest/maps-weather
[freesub]: https://azure.microsoft.com/free/
[createinstance_azuremapsresource]: https://docs.microsoft.com/azure/azure-maps/how-to-create-template
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/maps/maps-weather-rest/README.md
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { HttpResponse } from "@azure-rest/core-client";
import {
  HourlyForecastResultOutput,
  ErrorResponseOutput,
  MinuteForecastResultOutput,
  QuarterDayForecastResultOutput,
  CurrentConditionsResultOutput,
  DailyForecastResultOutput,
  WeatherAlongRouteResultOutput,
  SevereWeatherAlertsResultOutput,
  DailyIndicesResultOutput,
  ActiveStormResultOutput,
  StormSearchResultOutput,
  StormForecastResultOutput,
  StormLocationsResultOutput,
  AirQualityResultOutput,
  DailyAirQualityForecastResultOutput,
  DailyHistoricalActualsResultOutput,
  DailyHistoricalRecordsResultOutput,
  DailyHistoricalNormalsResultOutput
} from "./outputModels";

/**
 *
 * The `Get Hourly Forecast` API is an HTTP `GET` that Request detailed weather forecast by the hour for the next 1, 12, 24 (1 day), 72 (3 days), 120 (5 days), and 240 hours (10 days) for the given the given coordinate location.  The API returns details such as temperature, humidity, wind, precipitation, and ultraviolet (UV) index. For more information, see [Request hourly weather forecast data](/azure/azure-maps/how-to-request-weather-data#request-hourly-weather-forecast-data).
 *
 * If you are using the Gen1 S0 pricing tier, you can request hourly forecast for the next 1, 12, 24 hours (1 day), and 72 hours (3 days). If you are using Gen1 S1 or Gen2 pricing tier, you can also request hourly forecast for the next 120 (5 days) and 240 hours (10 days).
 */
export interface WeatherGetHourlyForecast200Response extends HttpResponse {
  status: "200";
  body: HourlyForecastResultOutput;
}

/**
 *
 * The `Get Hourly Forecast` API is an HTTP `GET` that Request detailed weather forecast by the hour for the next 1, 12, 24 (1 day), 72 (3 days), 120 (5 days), and 240 hours (10 days) for the given the given coordinate location.  The API returns details such as temperature, humidity, wind, precipitation, and ultraviolet (UV) index. For more information, see [Request hourly weather forecast data](/azure/azure-maps/how-to-request-weather-data#request-hourly-weather-forecast-data).
 *
 * If you are using the Gen1 S0 pricing tier, you can request hourly forecast for the next 1, 12, 24 hours (1 day), and 72 hours (3 days). If you are using Gen1 S1 or Gen2 pricing tier, you can also request hourly forecast for the next 120 (5 days) and 240 hours (10 days).
 */
export interface WeatherGetHourlyForecastDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/**
 *
 * The `Get Minute Forecast` API is an HTTP `GET` request that returns minute-by-minute forecasts for a given location for the next 120 minutes.  Users can request weather forecasts in intervals of 1, 5 and 15 minutes.  The response will include details such as the type of precipitation (including rain, snow, or a mixture of both), start time, and precipitation intensity value (dBZ). For more information, see [Request minute-by-minute weather forecast data](/azure/azure-maps/how-to-request-weather-data#request-minute-by-minute-weather-forecast-data).
 */
export interface WeatherGetMinuteForecast200Response extends HttpResponse {
  status: "200";
  body: MinuteForecastResultOutput;
}

/**
 *
 * The `Get Minute Forecast` API is an HTTP `GET` request that returns minute-by-minute forecasts for a given location for the next 120 minutes.  Users can request weather forecasts in intervals of 1, 5 and 15 minutes.  The response will include details such as the type of precipitation (including rain, snow, or a mixture of both), start time, and precipitation intensity value (dBZ). For more information, see [Request minute-by-minute weather forecast data](/azure/azure-maps/how-to-request-weather-data#request-minute-by-minute-weather-forecast-data).
 */
export interface WeatherGetMinuteForecastDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/**
 *
 * The `Get Quarter-Day Forecast` API is an HTTP `GET` request that returns a detailed weather forecast by quarter-day for the next 1, 5, 10, or 15 days for a given location. Response data is presented by quarters of the day - morning, afternoon, evening, and overnight. Details such as temperature, humidity, wind, precipitation, and UV index are returned.
 */
export interface WeatherGetQuarterDayForecast200Response extends HttpResponse {
  status: "200";
  body: QuarterDayForecastResultOutput;
}

/**
 *
 * The `Get Quarter-Day Forecast` API is an HTTP `GET` request that returns a detailed weather forecast by quarter-day for the next 1, 5, 10, or 15 days for a given location. Response data is presented by quarters of the day - morning, afternoon, evening, and overnight. Details such as temperature, humidity, wind, precipitation, and UV index are returned.
 */
export interface WeatherGetQuarterDayForecastDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/**
 *
 * The `Get Current Conditions` API is an HTTP `GET` request that returns detailed current weather conditions such as precipitation, temperature and wind for a given coordinate location. Also, observations from the past 6 or 24 hours for a particular location can be retrieved. The basic information returned with The response includes details such as observation date and time, brief description of the weather conditions, weather icon, precipitation indicator flags, and temperature. Additional details such as RealFeel™ Temperature and UV index are also returned. For more information, see [Request real-time weather data](/azure/azure-maps/how-to-request-weather-data#request-real-time-weather-data)
 */
export interface WeatherGetCurrentConditions200Response extends HttpResponse {
  status: "200";
  body: CurrentConditionsResultOutput;
}

/**
 *
 * The `Get Current Conditions` API is an HTTP `GET` request that returns detailed current weather conditions such as precipitation, temperature and wind for a given coordinate location. Also, observations from the past 6 or 24 hours for a particular location can be retrieved. The basic information returned with The response includes details such as observation date and time, brief description of the weather conditions, weather icon, precipitation indicator flags, and temperature. Additional details such as RealFeel™ Temperature and UV index are also returned. For more information, see [Request real-time weather data](/azure/azure-maps/how-to-request-weather-data#request-real-time-weather-data)
 */
export interface WeatherGetCurrentConditionsDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/**
 *
 * The `Get Daily Forecast` API is an HTTP `GET` request that returns detailed weather forecast such as temperature and wind by day for the next 1, 5, 10, 15, 25, or 45 days for a given coordinate location.  The response includes details such as temperature, wind, precipitation, air quality, and UV index. For more information, see [Request daily weather forecast data](/azure/azure-maps/how-to-request-weather-data#request-daily-weather-forecast-data).
 *
 *  If you are using the Gen1 S0 pricing tier, you can request daily forecast for the next 1, 5, 10, and 15 days. If you are using Gen1 S1 or Gen2 pricing tier, you can also request daily forecast for the next 25 days, and 45 days.
 */
export interface WeatherGetDailyForecast200Response extends HttpResponse {
  status: "200";
  body: DailyForecastResultOutput;
}

/**
 *
 * The `Get Daily Forecast` API is an HTTP `GET` request that returns detailed weather forecast such as temperature and wind by day for the next 1, 5, 10, 15, 25, or 45 days for a given coordinate location.  The response includes details such as temperature, wind, precipitation, air quality, and UV index. For more information, see [Request daily weather forecast data](/azure/azure-maps/how-to-request-weather-data#request-daily-weather-forecast-data).
 *
 *  If you are using the Gen1 S0 pricing tier, you can request daily forecast for the next 1, 5, 10, and 15 days. If you are using Gen1 S1 or Gen2 pricing tier, you can also request daily forecast for the next 25 days, and 45 days.
 */
export interface WeatherGetDailyForecastDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/**
 *
 * The `Get Weather Along Route` API is an HTTP `GET` request that returns hyper local (one kilometer or less), up-to-the-minute weather nowcasts, weather hazard assessments, and notifications along a route described as a sequence of waypoints.
 *  This includes a list of weather hazards affecting the waypoint or route, and the aggregated hazard index for each waypoint might be used to paint each portion of a route according to how safe it is for the driver. When submitting the waypoints, it is recommended to stay within, or close to, the distance that can be traveled within 120-mins or shortly after. Data is updated every five minutes.
 *
 *  The service supplements Azure Maps [Route Service](https://docs.microsoft.com/rest/api/maps/route) that allows you to first request a route between an origin and a destination and use that as an input for Weather Along Route endpoint.
 *
 *  In addition, the service supports scenarios to generate weather notifications for waypoints that experience an increase in intensity of a weather hazard. For example, if the vehicle is expected to begin experiencing heavy rain as it reaches a waypoint, a weather notification for heavy rain will be generated for that waypoint allowing the end product to display a heavy rain notification before the driver reaches that waypoint.
 *  The trigger for when to display the notification for a waypoint could be based, for example, on a [geofence](https://docs.microsoft.com/azure/azure-maps/tutorial-iot-hub-maps), or selectable distance to the waypoint.
 *
 *  The API covers all regions of the planet except latitudes above Greenland and Antarctica.
 */
export interface WeatherGetWeatherAlongRoute200Response extends HttpResponse {
  status: "200";
  body: WeatherAlongRouteResultOutput;
}

/**
 *
 * The `Get Weather Along Route` API is an HTTP `GET` request that returns hyper local (one kilometer or less), up-to-the-minute weather nowcasts, weather hazard assessments, and notifications along a route described as a sequence of waypoints.
 *  This includes a list of weather hazards affecting the waypoint or route, and the aggregated hazard index for each waypoint might be used to paint each portion of a route according to how safe it is for the driver. When submitting the waypoints, it is recommended to stay within, or close to, the distance that can be traveled within 120-mins or shortly after. Data is updated every five minutes.
 *
 *  The service supplements Azure Maps [Route Service](https://docs.microsoft.com/rest/api/maps/route) that allows you to first request a route between an origin and a destination and use that as an input for Weather Along Route endpoint.
 *
 *  In addition, the service supports scenarios to generate weather notifications for waypoints that experience an increase in intensity of a weather hazard. For example, if the vehicle is expected to begin experiencing heavy rain as it reaches a waypoint, a weather notification for heavy rain will be generated for that waypoint allowing the end product to display a heavy rain notification before the driver reaches that waypoint.
 *  The trigger for when to display the notification for a waypoint could be based, for example, on a [geofence](https://docs.microsoft.com/azure/azure-maps/tutorial-iot-hub-maps), or selectable distance to the waypoint.
 *
 *  The API covers all regions of the planet except latitudes above Greenland and Antarctica.
 */
export interface WeatherGetWeatherAlongRouteDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/**
 *
 * Severe weather phenomenon can significantly impact our everyday life and business operations. For example, severe weather conditions such as tropical storms, high winds or flooding can close roads and force logistics companies to reroute their fleet causing delays in reaching destinations and breaking the cold chain of refrigerated food products.
 *
 *  The `Get Severe Weather Alerts` API is an HTTP `GET` request that returns the severe weather alerts that are available worldwide from both official Government Meteorological Agencies and leading global to regional weather alert providers. The service can return details such as alert type, category, level and detailed description about the active severe alerts for the requested location, like hurricanes, thunderstorms, lightning, heat waves or forest fires. For more information, see [Request severe weather alerts](/azure-maps/how-to-request-weather-data#request-severe-weather-alerts)
 */
export interface WeatherGetSevereWeatherAlerts200Response extends HttpResponse {
  status: "200";
  body: SevereWeatherAlertsResultOutput;
}

/**
 *
 * Severe weather phenomenon can significantly impact our everyday life and business operations. For example, severe weather conditions such as tropical storms, high winds or flooding can close roads and force logistics companies to reroute their fleet causing delays in reaching destinations and breaking the cold chain of refrigerated food products.
 *
 *  The `Get Severe Weather Alerts` API is an HTTP `GET` request that returns the severe weather alerts that are available worldwide from both official Government Meteorological Agencies and leading global to regional weather alert providers. The service can return details such as alert type, category, level and detailed description about the active severe alerts for the requested location, like hurricanes, thunderstorms, lightning, heat waves or forest fires. For more information, see [Request severe weather alerts](/azure-maps/how-to-request-weather-data#request-severe-weather-alerts)
 */
export interface WeatherGetSevereWeatherAlertsDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/**
 *
 * The `Get Daily Indices` API is an HTTP `GET` request returns index values that provide guidance to help when planning future activities. For example, a health mobile application can notify users that today is good weather for running or for other outdoors activities like playing golf or flying a kite. Retail stores can optimize their digital marketing campaigns based on predicted index values. The service returns in daily indices values for current and next 5, 10 and 15 days starting from current day.
 */
export interface WeatherGetDailyIndices200Response extends HttpResponse {
  status: "200";
  body: DailyIndicesResultOutput;
}

/**
 *
 * The `Get Daily Indices` API is an HTTP `GET` request returns index values that provide guidance to help when planning future activities. For example, a health mobile application can notify users that today is good weather for running or for other outdoors activities like playing golf or flying a kite. Retail stores can optimize their digital marketing campaigns based on predicted index values. The service returns in daily indices values for current and next 5, 10 and 15 days starting from current day.
 */
export interface WeatherGetDailyIndicesDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/**
 *
 * The `Get Tropical Storm Active` API is an HTTP `GET` request that returns a list of all government-issued active tropical storms. Information about the tropical storms includes, government ID, basin ID, year of origin, name and if it is subtropical.
 */
export interface WeatherGetTropicalStormActive200Response extends HttpResponse {
  status: "200";
  body: ActiveStormResultOutput;
}

/**
 *
 * The `Get Tropical Storm Active` API is an HTTP `GET` request that returns a list of all government-issued active tropical storms. Information about the tropical storms includes, government ID, basin ID, year of origin, name and if it is subtropical.
 */
export interface WeatherGetTropicalStormActiveDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/**
 *
 * The `Get Tropical Storm Search` API is an HTTP `GET` request that returns a list of government-issued tropical storms by year, basin ID, and government ID. Information about the tropical storms includes, government ID, basin ID, status, year, name and if it is subtropical.
 */
export interface WeatherSearchTropicalStorm200Response extends HttpResponse {
  status: "200";
  body: StormSearchResultOutput;
}

/**
 *
 * The `Get Tropical Storm Search` API is an HTTP `GET` request that returns a list of government-issued tropical storms by year, basin ID, and government ID. Information about the tropical storms includes, government ID, basin ID, status, year, name and if it is subtropical.
 */
export interface WeatherSearchTropicalStormDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/**
 *
 * The `Get Tropical Storm Forecasts` API is an HTTP `GET` request that returns individual government-issued tropical storm forecasts. Information about the forecasted tropical storms includes, location, status, date the forecast was created, window, wind speed and wind radii.
 */
export interface WeatherGetTropicalStormForecast200Response
  extends HttpResponse {
  status: "200";
  body: StormForecastResultOutput;
}

/**
 *
 * The `Get Tropical Storm Forecasts` API is an HTTP `GET` request that returns individual government-issued tropical storm forecasts. Information about the forecasted tropical storms includes, location, status, date the forecast was created, window, wind speed and wind radii.
 */
export interface WeatherGetTropicalStormForecastDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/**
 *
 * The `Get Tropical Storm Locations` API is an HTTP `GET` request that returns the location of individual government-issued tropical storms. Information about the tropical storms includes, location coordinates, geometry, basin ID, date, wind details and wind radii.
 */
export interface WeatherGetTropicalStormLocations200Response
  extends HttpResponse {
  status: "200";
  body: StormLocationsResultOutput;
}

/**
 *
 * The `Get Tropical Storm Locations` API is an HTTP `GET` request that returns the location of individual government-issued tropical storms. Information about the tropical storms includes, location coordinates, geometry, basin ID, date, wind details and wind radii.
 */
export interface WeatherGetTropicalStormLocationsDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/**
 *
 * The `Get Current Air Quality` API is an HTTP `GET` request that returns detailed information about the concentration of pollutants and overall status for current air quality, including pollution levels, air quality index values, the dominant pollutant, and a brief statement summarizing risk level and suggested precautions.
 */
export interface WeatherGetCurrentAirQuality200Response extends HttpResponse {
  status: "200";
  body: AirQualityResultOutput;
}

/**
 *
 * The `Get Current Air Quality` API is an HTTP `GET` request that returns detailed information about the concentration of pollutants and overall status for current air quality, including pollution levels, air quality index values, the dominant pollutant, and a brief statement summarizing risk level and suggested precautions.
 */
export interface WeatherGetCurrentAirQualityDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/**
 *
 * The `Get Air Quality Daily Forecasts` API is an HTTP `GET` request that returns detailed information about the concentration of pollutants and overall status of forecasted daily air quality. The service can provide forecasted daily air quality information for the upcoming 1 to 7 days, including pollution levels, air quality index values, the dominant pollutant, and a brief statement summarizing risk level and suggested precautions.
 */
export interface WeatherGetAirQualityDailyForecasts200Response
  extends HttpResponse {
  status: "200";
  body: DailyAirQualityForecastResultOutput;
}

/**
 *
 * The `Get Air Quality Daily Forecasts` API is an HTTP `GET` request that returns detailed information about the concentration of pollutants and overall status of forecasted daily air quality. The service can provide forecasted daily air quality information for the upcoming 1 to 7 days, including pollution levels, air quality index values, the dominant pollutant, and a brief statement summarizing risk level and suggested precautions.
 */
export interface WeatherGetAirQualityDailyForecastsDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/**
 *
 * The `Get Air Quality Hourly Forecasts` API is an HTTP `GET` request that returns detailed information about the concentration of pollutants and overall status for forecasted upcoming hourly air quality. The service can provide forecasted hourly air quality information for the upcoming time spans of 1, 12, 24, 48, 72, and 96 hours, including pollution levels, air quality index values, the dominant pollutant, and a brief statement summarizing risk level and suggested precautions.
 */
export interface WeatherGetAirQualityHourlyForecasts200Response
  extends HttpResponse {
  status: "200";
  body: AirQualityResultOutput;
}

/**
 *
 * The `Get Air Quality Hourly Forecasts` API is an HTTP `GET` request that returns detailed information about the concentration of pollutants and overall status for forecasted upcoming hourly air quality. The service can provide forecasted hourly air quality information for the upcoming time spans of 1, 12, 24, 48, 72, and 96 hours, including pollution levels, air quality index values, the dominant pollutant, and a brief statement summarizing risk level and suggested precautions.
 */
export interface WeatherGetAirQualityHourlyForecastsDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/**
 *
 * The `Get Daily Historical Actuals` API is an HTTP `GET` request that returns climatology data such as past daily actual observed temperatures, precipitation, snowfall, snow depth and cooling/heating degree day information, for the day at a given coordinate location. The data is requested for a specified date range, up to 31 days in a single API request. Generally, historical data may be available as far back as the last 5 to 40+ years, depending on the location.
 */
export interface WeatherGetDailyHistoricalActuals200Response
  extends HttpResponse {
  status: "200";
  body: DailyHistoricalActualsResultOutput;
}

/**
 *
 * The `Get Daily Historical Actuals` API is an HTTP `GET` request that returns climatology data such as past daily actual observed temperatures, precipitation, snowfall, snow depth and cooling/heating degree day information, for the day at a given coordinate location. The data is requested for a specified date range, up to 31 days in a single API request. Generally, historical data may be available as far back as the last 5 to 40+ years, depending on the location.
 */
export interface WeatherGetDailyHistoricalActualsDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/**
 *
 * The `Get Daily Historical Records` API is an HTTP `GET` request that returns climatology data such as past daily record temperatures, precipitation and snowfall at a given coordinate location. Availability of records data will vary by location. Generally, historical data may be available as far back as the last 5 to 40+ years, depending on the location.
 */
export interface WeatherGetDailyHistoricalRecords200Response
  extends HttpResponse {
  status: "200";
  body: DailyHistoricalRecordsResultOutput;
}

/**
 *
 * The `Get Daily Historical Records` API is an HTTP `GET` request that returns climatology data such as past daily record temperatures, precipitation and snowfall at a given coordinate location. Availability of records data will vary by location. Generally, historical data may be available as far back as the last 5 to 40+ years, depending on the location.
 */
export interface WeatherGetDailyHistoricalRecordsDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/**
 *
 * The `Get Daily Historical Normals` API is an HTTP `GET` request that returns climatology data such as past daily normal temperatures, precipitation and cooling/heating degree day information for the day at a given coordinate location. The historical normals are a 30-year average for temperatures and precipitation for a specific location. As is standard practice in climatology, the 30-year average covers years 1991-2020, this data will be used for one decade and then will reset in the year 2030. Generally, historical data may be available as far back as the last 5 to 40+ years, depending on the location.
 */
export interface WeatherGetDailyHistoricalNormals200Response
  extends HttpResponse {
  status: "200";
  body: DailyHistoricalNormalsResultOutput;
}

/**
 *
 * The `Get Daily Historical Normals` API is an HTTP `GET` request that returns climatology data such as past daily normal temperatures, precipitation and cooling/heating degree day information for the day at a given coordinate location. The historical normals are a 30-year average for temperatures and precipitation for a specific location. As is standard practice in climatology, the 30-year average covers years 1991-2020, this data will be used for one decade and then will reset in the year 2030. Generally, historical data may be available as far back as the last 5 to 40+ years, depending on the location.
 */
export interface WeatherGetDailyHistoricalNormalsDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

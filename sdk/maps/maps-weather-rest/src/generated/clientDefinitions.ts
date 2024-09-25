// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  WeatherGetHourlyForecastParameters,
  WeatherGetMinuteForecastParameters,
  WeatherGetQuarterDayForecastParameters,
  WeatherGetCurrentConditionsParameters,
  WeatherGetDailyForecastParameters,
  WeatherGetWeatherAlongRouteParameters,
  WeatherGetSevereWeatherAlertsParameters,
  WeatherGetDailyIndicesParameters,
  WeatherGetTropicalStormActiveParameters,
  WeatherSearchTropicalStormParameters,
  WeatherGetTropicalStormForecastParameters,
  WeatherGetTropicalStormLocationsParameters,
  WeatherGetCurrentAirQualityParameters,
  WeatherGetAirQualityDailyForecastsParameters,
  WeatherGetAirQualityHourlyForecastsParameters,
  WeatherGetDailyHistoricalActualsParameters,
  WeatherGetDailyHistoricalRecordsParameters,
  WeatherGetDailyHistoricalNormalsParameters
} from "./parameters";
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
import { Client, StreamableMethod } from "@azure-rest/core-client";

export interface GetHourlyForecast {
  /**
   *
   * The `Get Hourly Forecast` API is an HTTP `GET` that Request detailed weather forecast by the hour for the next 1, 12, 24 (1 day), 72 (3 days), 120 (5 days), and 240 hours (10 days) for the given the given coordinate location.  The API returns details such as temperature, humidity, wind, precipitation, and ultraviolet (UV) index. For more information, see [Request hourly weather forecast data](/azure/azure-maps/how-to-request-weather-data#request-hourly-weather-forecast-data).
   *
   * If you are using the Gen1 S0 pricing tier, you can request hourly forecast for the next 1, 12, 24 hours (1 day), and 72 hours (3 days). If you are using Gen1 S1 or Gen2 pricing tier, you can also request hourly forecast for the next 120 (5 days) and 240 hours (10 days).
   */
  get(
    options: WeatherGetHourlyForecastParameters
  ): StreamableMethod<
    | WeatherGetHourlyForecast200Response
    | WeatherGetHourlyForecastDefaultResponse
  >;
}

export interface GetMinuteForecast {
  /**
   *
   * The `Get Minute Forecast` API is an HTTP `GET` request that returns minute-by-minute forecasts for a given location for the next 120 minutes.  Users can request weather forecasts in intervals of 1, 5 and 15 minutes.  The response will include details such as the type of precipitation (including rain, snow, or a mixture of both), start time, and precipitation intensity value (dBZ). For more information, see [Request minute-by-minute weather forecast data](/azure/azure-maps/how-to-request-weather-data#request-minute-by-minute-weather-forecast-data).
   */
  get(
    options: WeatherGetMinuteForecastParameters
  ): StreamableMethod<
    | WeatherGetMinuteForecast200Response
    | WeatherGetMinuteForecastDefaultResponse
  >;
}

export interface GetQuarterDayForecast {
  /**
   *
   * The `Get Quarter-Day Forecast` API is an HTTP `GET` request that returns a detailed weather forecast by quarter-day for the next 1, 5, 10, or 15 days for a given location. Response data is presented by quarters of the day - morning, afternoon, evening, and overnight. Details such as temperature, humidity, wind, precipitation, and UV index are returned.
   */
  get(
    options: WeatherGetQuarterDayForecastParameters
  ): StreamableMethod<
    | WeatherGetQuarterDayForecast200Response
    | WeatherGetQuarterDayForecastDefaultResponse
  >;
}

export interface GetCurrentConditions {
  /**
   *
   * The `Get Current Conditions` API is an HTTP `GET` request that returns detailed current weather conditions such as precipitation, temperature and wind for a given coordinate location. Also, observations from the past 6 or 24 hours for a particular location can be retrieved. The basic information returned with The response includes details such as observation date and time, brief description of the weather conditions, weather icon, precipitation indicator flags, and temperature. Additional details such as RealFeel™ Temperature and UV index are also returned. For more information, see [Request real-time weather data](/azure/azure-maps/how-to-request-weather-data#request-real-time-weather-data)
   */
  get(
    options: WeatherGetCurrentConditionsParameters
  ): StreamableMethod<
    | WeatherGetCurrentConditions200Response
    | WeatherGetCurrentConditionsDefaultResponse
  >;
}

export interface GetDailyForecast {
  /**
   *
   * The `Get Daily Forecast` API is an HTTP `GET` request that returns detailed weather forecast such as temperature and wind by day for the next 1, 5, 10, 15, 25, or 45 days for a given coordinate location.  The response includes details such as temperature, wind, precipitation, air quality, and UV index. For more information, see [Request daily weather forecast data](/azure/azure-maps/how-to-request-weather-data#request-daily-weather-forecast-data).
   *
   *  If you are using the Gen1 S0 pricing tier, you can request daily forecast for the next 1, 5, 10, and 15 days. If you are using Gen1 S1 or Gen2 pricing tier, you can also request daily forecast for the next 25 days, and 45 days.
   */
  get(
    options: WeatherGetDailyForecastParameters
  ): StreamableMethod<
    WeatherGetDailyForecast200Response | WeatherGetDailyForecastDefaultResponse
  >;
}

export interface GetWeatherAlongRoute {
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
  get(
    options: WeatherGetWeatherAlongRouteParameters
  ): StreamableMethod<
    | WeatherGetWeatherAlongRoute200Response
    | WeatherGetWeatherAlongRouteDefaultResponse
  >;
}

export interface GetSevereWeatherAlerts {
  /**
   *
   * Severe weather phenomenon can significantly impact our everyday life and business operations. For example, severe weather conditions such as tropical storms, high winds or flooding can close roads and force logistics companies to reroute their fleet causing delays in reaching destinations and breaking the cold chain of refrigerated food products.
   *
   *  The `Get Severe Weather Alerts` API is an HTTP `GET` request that returns the severe weather alerts that are available worldwide from both official Government Meteorological Agencies and leading global to regional weather alert providers. The service can return details such as alert type, category, level and detailed description about the active severe alerts for the requested location, like hurricanes, thunderstorms, lightning, heat waves or forest fires. For more information, see [Request severe weather alerts](/azure-maps/how-to-request-weather-data#request-severe-weather-alerts)
   */
  get(
    options: WeatherGetSevereWeatherAlertsParameters
  ): StreamableMethod<
    | WeatherGetSevereWeatherAlerts200Response
    | WeatherGetSevereWeatherAlertsDefaultResponse
  >;
}

export interface GetDailyIndices {
  /**
   *
   * The `Get Daily Indices` API is an HTTP `GET` request returns index values that provide guidance to help when planning future activities. For example, a health mobile application can notify users that today is good weather for running or for other outdoors activities like playing golf or flying a kite. Retail stores can optimize their digital marketing campaigns based on predicted index values. The service returns in daily indices values for current and next 5, 10 and 15 days starting from current day.
   */
  get(
    options: WeatherGetDailyIndicesParameters
  ): StreamableMethod<
    WeatherGetDailyIndices200Response | WeatherGetDailyIndicesDefaultResponse
  >;
}

export interface GetTropicalStormActive {
  /**
   *
   * The `Get Tropical Storm Active` API is an HTTP `GET` request that returns a list of all government-issued active tropical storms. Information about the tropical storms includes, government ID, basin ID, year of origin, name and if it is subtropical.
   */
  get(
    options?: WeatherGetTropicalStormActiveParameters
  ): StreamableMethod<
    | WeatherGetTropicalStormActive200Response
    | WeatherGetTropicalStormActiveDefaultResponse
  >;
}

export interface SearchTropicalStorm {
  /**
   *
   * The `Get Tropical Storm Search` API is an HTTP `GET` request that returns a list of government-issued tropical storms by year, basin ID, and government ID. Information about the tropical storms includes, government ID, basin ID, status, year, name and if it is subtropical.
   */
  get(
    options: WeatherSearchTropicalStormParameters
  ): StreamableMethod<
    | WeatherSearchTropicalStorm200Response
    | WeatherSearchTropicalStormDefaultResponse
  >;
}

export interface GetTropicalStormForecast {
  /**
   *
   * The `Get Tropical Storm Forecasts` API is an HTTP `GET` request that returns individual government-issued tropical storm forecasts. Information about the forecasted tropical storms includes, location, status, date the forecast was created, window, wind speed and wind radii.
   */
  get(
    options: WeatherGetTropicalStormForecastParameters
  ): StreamableMethod<
    | WeatherGetTropicalStormForecast200Response
    | WeatherGetTropicalStormForecastDefaultResponse
  >;
}

export interface GetTropicalStormLocations {
  /**
   *
   * The `Get Tropical Storm Locations` API is an HTTP `GET` request that returns the location of individual government-issued tropical storms. Information about the tropical storms includes, location coordinates, geometry, basin ID, date, wind details and wind radii.
   */
  get(
    options: WeatherGetTropicalStormLocationsParameters
  ): StreamableMethod<
    | WeatherGetTropicalStormLocations200Response
    | WeatherGetTropicalStormLocationsDefaultResponse
  >;
}

export interface GetCurrentAirQuality {
  /**
   *
   * The `Get Current Air Quality` API is an HTTP `GET` request that returns detailed information about the concentration of pollutants and overall status for current air quality, including pollution levels, air quality index values, the dominant pollutant, and a brief statement summarizing risk level and suggested precautions.
   */
  get(
    options: WeatherGetCurrentAirQualityParameters
  ): StreamableMethod<
    | WeatherGetCurrentAirQuality200Response
    | WeatherGetCurrentAirQualityDefaultResponse
  >;
}

export interface GetAirQualityDailyForecasts {
  /**
   *
   * The `Get Air Quality Daily Forecasts` API is an HTTP `GET` request that returns detailed information about the concentration of pollutants and overall status of forecasted daily air quality. The service can provide forecasted daily air quality information for the upcoming 1 to 7 days, including pollution levels, air quality index values, the dominant pollutant, and a brief statement summarizing risk level and suggested precautions.
   */
  get(
    options: WeatherGetAirQualityDailyForecastsParameters
  ): StreamableMethod<
    | WeatherGetAirQualityDailyForecasts200Response
    | WeatherGetAirQualityDailyForecastsDefaultResponse
  >;
}

export interface GetAirQualityHourlyForecasts {
  /**
   *
   * The `Get Air Quality Hourly Forecasts` API is an HTTP `GET` request that returns detailed information about the concentration of pollutants and overall status for forecasted upcoming hourly air quality. The service can provide forecasted hourly air quality information for the upcoming time spans of 1, 12, 24, 48, 72, and 96 hours, including pollution levels, air quality index values, the dominant pollutant, and a brief statement summarizing risk level and suggested precautions.
   */
  get(
    options: WeatherGetAirQualityHourlyForecastsParameters
  ): StreamableMethod<
    | WeatherGetAirQualityHourlyForecasts200Response
    | WeatherGetAirQualityHourlyForecastsDefaultResponse
  >;
}

export interface GetDailyHistoricalActuals {
  /**
   *
   * The `Get Daily Historical Actuals` API is an HTTP `GET` request that returns climatology data such as past daily actual observed temperatures, precipitation, snowfall, snow depth and cooling/heating degree day information, for the day at a given coordinate location. The data is requested for a specified date range, up to 31 days in a single API request. Generally, historical data may be available as far back as the last 5 to 40+ years, depending on the location.
   */
  get(
    options: WeatherGetDailyHistoricalActualsParameters
  ): StreamableMethod<
    | WeatherGetDailyHistoricalActuals200Response
    | WeatherGetDailyHistoricalActualsDefaultResponse
  >;
}

export interface GetDailyHistoricalRecords {
  /**
   *
   * The `Get Daily Historical Records` API is an HTTP `GET` request that returns climatology data such as past daily record temperatures, precipitation and snowfall at a given coordinate location. Availability of records data will vary by location. Generally, historical data may be available as far back as the last 5 to 40+ years, depending on the location.
   */
  get(
    options: WeatherGetDailyHistoricalRecordsParameters
  ): StreamableMethod<
    | WeatherGetDailyHistoricalRecords200Response
    | WeatherGetDailyHistoricalRecordsDefaultResponse
  >;
}

export interface GetDailyHistoricalNormals {
  /**
   *
   * The `Get Daily Historical Normals` API is an HTTP `GET` request that returns climatology data such as past daily normal temperatures, precipitation and cooling/heating degree day information for the day at a given coordinate location. The historical normals are a 30-year average for temperatures and precipitation for a specific location. As is standard practice in climatology, the 30-year average covers years 1991-2020, this data will be used for one decade and then will reset in the year 2030. Generally, historical data may be available as far back as the last 5 to 40+ years, depending on the location.
   */
  get(
    options: WeatherGetDailyHistoricalNormalsParameters
  ): StreamableMethod<
    | WeatherGetDailyHistoricalNormals200Response
    | WeatherGetDailyHistoricalNormalsDefaultResponse
  >;
}

export interface Routes {
  /** Resource for '/weather/forecast/hourly/\{format\}' has methods for the following verbs: get */
  (
    path: "/weather/forecast/hourly/{format}",
    format: "json"
  ): GetHourlyForecast;
  /** Resource for '/weather/forecast/minute/\{format\}' has methods for the following verbs: get */
  (
    path: "/weather/forecast/minute/{format}",
    format: "json"
  ): GetMinuteForecast;
  /** Resource for '/weather/forecast/quarterDay/\{format\}' has methods for the following verbs: get */
  (
    path: "/weather/forecast/quarterDay/{format}",
    format: "json"
  ): GetQuarterDayForecast;
  /** Resource for '/weather/currentConditions/\{format\}' has methods for the following verbs: get */
  (
    path: "/weather/currentConditions/{format}",
    format: "json"
  ): GetCurrentConditions;
  /** Resource for '/weather/forecast/daily/\{format\}' has methods for the following verbs: get */
  (path: "/weather/forecast/daily/{format}", format: "json"): GetDailyForecast;
  /** Resource for '/weather/route/\{format\}' has methods for the following verbs: get */
  (path: "/weather/route/{format}", format: "json"): GetWeatherAlongRoute;
  /** Resource for '/weather/severe/alerts/\{format\}' has methods for the following verbs: get */
  (
    path: "/weather/severe/alerts/{format}",
    format: "json"
  ): GetSevereWeatherAlerts;
  /** Resource for '/weather/indices/daily/\{format\}' has methods for the following verbs: get */
  (path: "/weather/indices/daily/{format}", format: "json"): GetDailyIndices;
  /** Resource for '/weather/tropical/storms/active/\{format\}' has methods for the following verbs: get */
  (
    path: "/weather/tropical/storms/active/{format}",
    format: "json"
  ): GetTropicalStormActive;
  /** Resource for '/weather/tropical/storms/\{format\}' has methods for the following verbs: get */
  (
    path: "/weather/tropical/storms/{format}",
    format: "json"
  ): SearchTropicalStorm;
  /** Resource for '/weather/tropical/storms/forecasts/\{format\}' has methods for the following verbs: get */
  (
    path: "/weather/tropical/storms/forecasts/{format}",
    format: "json"
  ): GetTropicalStormForecast;
  /** Resource for '/weather/tropical/storms/locations/\{format\}' has methods for the following verbs: get */
  (
    path: "/weather/tropical/storms/locations/{format}",
    format: "json"
  ): GetTropicalStormLocations;
  /** Resource for '/weather/airQuality/current/\{format\}' has methods for the following verbs: get */
  (
    path: "/weather/airQuality/current/{format}",
    format: "json"
  ): GetCurrentAirQuality;
  /** Resource for '/weather/airQuality/forecasts/daily/\{format\}' has methods for the following verbs: get */
  (
    path: "/weather/airQuality/forecasts/daily/{format}",
    format: "json"
  ): GetAirQualityDailyForecasts;
  /** Resource for '/weather/airQuality/forecasts/hourly/\{format\}' has methods for the following verbs: get */
  (
    path: "/weather/airQuality/forecasts/hourly/{format}",
    format: "json"
  ): GetAirQualityHourlyForecasts;
  /** Resource for '/weather/historical/actuals/daily/\{format\}' has methods for the following verbs: get */
  (
    path: "/weather/historical/actuals/daily/{format}",
    format: "json"
  ): GetDailyHistoricalActuals;
  /** Resource for '/weather/historical/records/daily/\{format\}' has methods for the following verbs: get */
  (
    path: "/weather/historical/records/daily/{format}",
    format: "json"
  ): GetDailyHistoricalRecords;
  /** Resource for '/weather/historical/normals/daily/\{format\}' has methods for the following verbs: get */
  (
    path: "/weather/historical/normals/daily/{format}",
    format: "json"
  ): GetDailyHistoricalNormals;
}

export type MapsWeatherClient = Client & {
  path: Routes;
};

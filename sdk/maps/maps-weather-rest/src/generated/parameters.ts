// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RequestParameters } from "@azure-rest/core-client";

export interface WeatherGetHourlyForecastQueryParamProperties {
  /**
   * The applicable query specified as a comma separated string composed by latitude followed by longitude e.g. "47.641268,-122.125679".
   *
   * Weather information is generally available for locations on land, bodies of water surrounded by land, and areas of the ocean that are within approximately 50 nautical miles of a coastline.
   */
  query: Array<number>;
  /** Specifies to return the data in either metric units or imperial units. Default value is metric. */
  unit?: "metric" | "imperial";
  /**
   * Time frame of the returned weather forecast. By default, the forecast data for next hour will be returned. Available values are
   *   * `1` - Return forecast data for the next hour. Default value.
   *   * `12` - Return hourly forecast for next 12 hours.
   *   * `24` - Return hourly forecast for next 24 hours.
   *   * `72` - Return hourly forecast for next 72 hours (3 days).
   *   * `120` - Return hourly forecast for next 120 hours (5 days). Only available in S1 SKU.
   *   * `240` - Return hourly forecast for next 240 hours (10 days). Only available in S1 SKU.
   */
  duration?: number;
  /**
   * Language in which search results should be returned. Should be one of supported IETF language tags, case insensitive. When data in specified language is not available for a specific field, default language is used.
   *
   * Please refer to [Supported Languages](https://docs.microsoft.com/azure/azure-maps/supported-languages) for details.
   */
  language?: string;
}

export interface WeatherGetHourlyForecastQueryParam {
  queryParameters: WeatherGetHourlyForecastQueryParamProperties;
}

export type WeatherGetHourlyForecastParameters = WeatherGetHourlyForecastQueryParam &
  RequestParameters;

export interface WeatherGetMinuteForecastQueryParamProperties {
  /**
   * The applicable query specified as a comma separated string composed by latitude followed by longitude e.g. "47.641268,-122.125679".
   *
   * Weather information is generally available for locations on land, bodies of water surrounded by land, and areas of the ocean that are within approximately 50 nautical miles of a coastline.
   */
  query: Array<number>;
  /**
   * Specifies time interval in minutes for the returned weather forecast. Supported values are
   *   * `1` -  Retrieve forecast for 1-minute intervals. Returned by default.
   *   * `5` - Retrieve forecasts for 5-minute intervals.
   *   * `15` - Retrieve forecasts for 15-minute intervals.
   */
  interval?: number;
  /**
   * Language in which search results should be returned. Should be one of supported IETF language tags, case insensitive. When data in specified language is not available for a specific field, default language is used.
   *
   * Please refer to [Supported Languages](https://docs.microsoft.com/azure/azure-maps/supported-languages) for details.
   */
  language?: string;
}

export interface WeatherGetMinuteForecastQueryParam {
  queryParameters: WeatherGetMinuteForecastQueryParamProperties;
}

export type WeatherGetMinuteForecastParameters = WeatherGetMinuteForecastQueryParam &
  RequestParameters;

export interface WeatherGetQuarterDayForecastQueryParamProperties {
  /**
   * The applicable query specified as a comma separated string composed by latitude followed by longitude e.g. "47.641268,-122.125679".
   *
   * Weather information is generally available for locations on land, bodies of water surrounded by land, and areas of the ocean that are within approximately 50 nautical miles of a coastline.
   */
  query: Array<number>;
  /** Specifies to return the data in either metric units or imperial units. Default value is metric. */
  unit?: "metric" | "imperial";
  /**
   * Specifies for how many days the quester-day forecast responses are returned. Supported values are:
   *   * `1` - Return forecast data for the next day. Returned by default.
   *   * `5` - Return forecast data for the next 5 days.
   *   * `10` - Return forecast data for next 10 days.
   *   * `15` - Return forecast data for the next 15 days.
   */
  duration?: number;
  /**
   * Language in which search results should be returned. Should be one of supported IETF language tags, case insensitive. When data in specified language is not available for a specific field, default language is used.
   *
   * Please refer to [Supported Languages](https://docs.microsoft.com/azure/azure-maps/supported-languages) for details.
   */
  language?: string;
}

export interface WeatherGetQuarterDayForecastQueryParam {
  queryParameters: WeatherGetQuarterDayForecastQueryParamProperties;
}

export type WeatherGetQuarterDayForecastParameters = WeatherGetQuarterDayForecastQueryParam &
  RequestParameters;

export interface WeatherGetCurrentConditionsQueryParamProperties {
  /**
   * The applicable query specified as a comma separated string composed by latitude followed by longitude e.g. "47.641268,-122.125679".
   *
   * Weather information is generally available for locations on land, bodies of water surrounded by land, and areas of the ocean that are within approximately 50 nautical miles of a coastline.
   */
  query: Array<number>;
  /** Specifies to return the data in either metric units or imperial units. Default value is metric. */
  unit?: "metric" | "imperial";
  /**
   * Return full details for the current conditions. Available values are
   *   * `true` - Returns full details. By default all details are returned.
   *   * `false` - Returns a truncated version of the current condition data, which includes observation date time, weather phrase, icon code, precipitation indicator flag, and temperature.
   */
  details?: string;
  /**
   * Time frame of the returned weather conditions. By default, the most current weather conditions will be returned. Default value is 0. Supported values are:
   *    * `0` - Return the most current weather conditions.
   *    * `6` - Return weather conditions from past 6 hours.
   *    * `24` - Return weather conditions from past 24 hours.
   */
  duration?: number;
  /**
   * Language in which search results should be returned. Should be one of supported IETF language tags, case insensitive. When data in specified language is not available for a specific field, default language is used.
   *
   * Please refer to [Supported Languages](https://docs.microsoft.com/azure/azure-maps/supported-languages) for details.
   */
  language?: string;
}

export interface WeatherGetCurrentConditionsQueryParam {
  queryParameters: WeatherGetCurrentConditionsQueryParamProperties;
}

export type WeatherGetCurrentConditionsParameters = WeatherGetCurrentConditionsQueryParam &
  RequestParameters;

export interface WeatherGetDailyForecastQueryParamProperties {
  /**
   * The applicable query specified as a comma separated string composed by latitude followed by longitude e.g. "47.641268,-122.125679".
   *
   * Weather information is generally available for locations on land, bodies of water surrounded by land, and areas of the ocean that are within approximately 50 nautical miles of a coastline.
   */
  query: Array<number>;
  /** Specifies to return the data in either metric units or imperial units. Default value is metric. */
  unit?: "metric" | "imperial";
  /**
   * Specifies for how many days the daily forecast responses are returned. Available values are
   *   * `1` - Return forecast data for the next day. Returned by default.
   *   * `5` - Return forecast data for the next 5 days.
   *   * `10` - Return forecast data for the next 10 days.
   *   * `25` - Return forecast data for the next 25 days. Only available in S1 SKU.
   *   * `45` - Return forecast data for the next 45 days. Only available in S1 SKU.
   */
  duration?: number;
  /**
   * Language in which search results should be returned. Should be one of supported IETF language tags, case insensitive. When data in specified language is not available for a specific field, default language is used.
   *
   * Please refer to [Supported Languages](https://docs.microsoft.com/azure/azure-maps/supported-languages) for details.
   */
  language?: string;
}

export interface WeatherGetDailyForecastQueryParam {
  queryParameters: WeatherGetDailyForecastQueryParamProperties;
}

export type WeatherGetDailyForecastParameters = WeatherGetDailyForecastQueryParam &
  RequestParameters;

export interface WeatherGetWeatherAlongRouteQueryParamProperties {
  /**
   * Coordinates through which the route is calculated, separated by colon (:) and entered in chronological order. A minimum of two waypoints is required. A single API call may contain up to 60 waypoints.
   * A waypoint indicates location, ETA, and optional heading: latitude,longitude,ETA,heading, where
   *   * `Latitude` - Latitude coordinate in decimal degrees.
   *   * `Longitude` - Longitude coordinate in decimal degrees.
   *   * `ETA (estimated time of arrival)` - The number of minutes from the present time that it will take for the vehicle to reach the waypoint. Allowed range is from 0.0 to 120.0 minutes.
   *   * `Heading` - An optional value indicating the vehicle heading as it passes the waypoint. Expressed in clockwise degrees relative to true north. This is issued to calculate sun glare as a driving hazard. Allowed range is from 0.0 to 360.0 degrees. If not provided, a heading will automatically be derived based on the position of neighboring waypoints.
   *
   * It is recommended to stay within, or close to, the distance that can be traveled within 120-mins or shortly after. This way a more accurate assessment can be provided for the trip and prevent isolated events not being captured between waypoints.  Information can and should be updated along the route (especially for trips greater than 2 hours) to continuously pull new waypoints moving forward, but also to ensure that forecast information for content such as precipitation type and intensity is accurate as storms develop and dissipate over time.
   */
  query: string;
  /**
   * Language in which search results should be returned. Should be one of supported IETF language tags, case insensitive. When data in specified language is not available for a specific field, default language is used.
   *
   * Please refer to [Supported Languages](https://docs.microsoft.com/azure/azure-maps/supported-languages) for details.
   */
  language?: string;
}

export interface WeatherGetWeatherAlongRouteQueryParam {
  queryParameters: WeatherGetWeatherAlongRouteQueryParamProperties;
}

export type WeatherGetWeatherAlongRouteParameters = WeatherGetWeatherAlongRouteQueryParam &
  RequestParameters;

export interface WeatherGetSevereWeatherAlertsQueryParamProperties {
  /**
   * The applicable query specified as a comma separated string composed by latitude followed by longitude e.g. "47.641268,-122.125679".
   *
   * Weather information is generally available for locations on land, bodies of water surrounded by land, and areas of the ocean that are within approximately 50 nautical miles of a coastline.
   */
  query: Array<number>;
  /**
   * Language in which search results should be returned. Should be one of supported IETF language tags, case insensitive. When data in specified language is not available for a specific field, default language is used.
   *
   * Please refer to [Supported Languages](https://docs.microsoft.com/azure/azure-maps/supported-languages) for details.
   */
  language?: string;
  /**
   * Return full details for the severe weather alerts. Available values are
   *   * `true` - Returns full details. By default all details are returned.
   *   * `false` - Returns a truncated version of the alerts data, which excludes the area-specific full description of alert details (`alertDetails`).
   */
  details?: string;
}

export interface WeatherGetSevereWeatherAlertsQueryParam {
  queryParameters: WeatherGetSevereWeatherAlertsQueryParamProperties;
}

export type WeatherGetSevereWeatherAlertsParameters = WeatherGetSevereWeatherAlertsQueryParam &
  RequestParameters;

export interface WeatherGetDailyIndicesQueryParamProperties {
  /**
   * The applicable query specified as a comma separated string composed by latitude followed by longitude e.g. "47.641268,-122.125679".
   *
   * Weather information is generally available for locations on land, bodies of water surrounded by land, and areas of the ocean that are within approximately 50 nautical miles of a coastline.
   */
  query: Array<number>;
  /**
   * Language in which search results should be returned. Should be one of supported IETF language tags, case insensitive. When data in specified language is not available for a specific field, default language is used.
   *
   * Please refer to [Supported Languages](https://docs.microsoft.com/azure/azure-maps/supported-languages) for details.
   */
  language?: string;
  /**
   * Specifies for how many days the daily indices are returned. By default, the indices data for the current day will be returned. When requesting future indices data, the current day is included in the response as day 1. Available values are
   *   * `1` - Return daily index data for the current day. Default value.
   *   * `5` - Return 5 days of daily index data starting from the current day.
   *   * `10` - Return 10 days of daily index data starting from the current day.
   *   * `15` - Return 15 days of daily index data starting from the current day.
   */
  duration?: number;
  /** Numeric index identifier that can be used for restricting returned results to the corresponding index type. Cannot be paired with `indexGroupId`. Please refer to [Weather services in Azure Maps](/azure/azure-maps/weather-services-concepts#index-ids-and-index-groups-ids) for details and to see the supported indices. */
  indexId?: number;
  /** Numeric index group identifier that can be used for restricting returned results to the corresponding subset of indices (index group). Cannot be paired with `indexId`. Please refer to [Weather services in Azure Maps](/azure/azure-maps/weather-services-concepts#index-ids-and-index-groups-ids) for details and to see the supported index groups. */
  indexGroupId?: number;
}

export interface WeatherGetDailyIndicesQueryParam {
  queryParameters: WeatherGetDailyIndicesQueryParamProperties;
}

export type WeatherGetDailyIndicesParameters = WeatherGetDailyIndicesQueryParam &
  RequestParameters;
export type WeatherGetTropicalStormActiveParameters = RequestParameters;

export interface WeatherSearchTropicalStormQueryParamProperties {
  /** Year of the cyclone(s) */
  year: number;
  /** Basin identifier */
  basinId?: "AL" | "EP" | "SI" | "NI" | "CP" | "NP" | "SP";
  /** Government storm Id */
  govId?: number;
}

export interface WeatherSearchTropicalStormQueryParam {
  queryParameters: WeatherSearchTropicalStormQueryParamProperties;
}

export type WeatherSearchTropicalStormParameters = WeatherSearchTropicalStormQueryParam &
  RequestParameters;

export interface WeatherGetTropicalStormForecastQueryParamProperties {
  /** Year of the cyclone(s) */
  year: number;
  /** Basin identifier */
  basinId: "AL" | "EP" | "SI" | "NI" | "CP" | "NP" | "SP";
  /** Government storm Id */
  govId: number;
  /** Specifies to return the data in either metric units or imperial units. Default value is metric. */
  unit?: "metric" | "imperial";
  /** When true, wind radii summary data is included in the response */
  details?: boolean;
  /** When true, wind radii summary data and geoJSON details are included in the response */
  radiiGeometry?: boolean;
  /** When true, window geometry data (geoJSON) is included in the response */
  windowGeometry?: boolean;
}

export interface WeatherGetTropicalStormForecastQueryParam {
  queryParameters: WeatherGetTropicalStormForecastQueryParamProperties;
}

export type WeatherGetTropicalStormForecastParameters = WeatherGetTropicalStormForecastQueryParam &
  RequestParameters;

export interface WeatherGetTropicalStormLocationsQueryParamProperties {
  /** Year of the cyclone(s) */
  year: number;
  /** Basin identifier */
  basinId: "AL" | "EP" | "SI" | "NI" | "CP" | "NP" | "SP";
  /** Government storm Id */
  govId: number;
  /** When true, wind radii summary data is included in the response */
  details?: boolean;
  /** When true, wind radii summary data and geoJSON details are included in the response */
  radiiGeometry?: boolean;
  /** Specifies to return the data in either metric units or imperial units. Default value is metric. */
  unit?: "metric" | "imperial";
  /** When true, return the current storm location */
  current?: boolean;
}

export interface WeatherGetTropicalStormLocationsQueryParam {
  queryParameters: WeatherGetTropicalStormLocationsQueryParamProperties;
}

export type WeatherGetTropicalStormLocationsParameters = WeatherGetTropicalStormLocationsQueryParam &
  RequestParameters;

export interface WeatherGetCurrentAirQualityQueryParamProperties {
  /**
   * Language in which search results should be returned. Should be one of supported IETF language tags, case insensitive. When data in specified language is not available for a specific field, default language is used.
   *
   * Please refer to [Supported Languages](https://docs.microsoft.com/azure/azure-maps/supported-languages) for details.
   */
  language?: string;
  /**
   * The applicable query specified as a comma separated string composed by latitude followed by longitude e.g. "47.641268,-122.125679".
   *
   * Weather information is generally available for locations on land, bodies of water surrounded by land, and areas of the ocean that are within approximately 50 nautical miles of a coastline.
   */
  query: Array<number>;
  /** Boolean value that returns detailed information about each pollutant. By default is True. */
  pollutants?: boolean;
}

export interface WeatherGetCurrentAirQualityQueryParam {
  queryParameters: WeatherGetCurrentAirQualityQueryParamProperties;
}

export type WeatherGetCurrentAirQualityParameters = WeatherGetCurrentAirQualityQueryParam &
  RequestParameters;

export interface WeatherGetAirQualityDailyForecastsQueryParamProperties {
  /**
   * Language in which search results should be returned. Should be one of supported IETF language tags, case insensitive. When data in specified language is not available for a specific field, default language is used.
   *
   * Please refer to [Supported Languages](https://docs.microsoft.com/azure/azure-maps/supported-languages) for details.
   */
  language?: string;
  /**
   * The applicable query specified as a comma separated string composed by latitude followed by longitude e.g. "47.641268,-122.125679".
   *
   * Weather information is generally available for locations on land, bodies of water surrounded by land, and areas of the ocean that are within approximately 50 nautical miles of a coastline.
   */
  query: Array<number>;
  /** Specifies for how many days from now we would like to know about the air quality. Available values are 1, 2, 3, 4, 5, 6, and 7. Default value is 1. */
  duration?: "1" | "2" | "3" | "4" | "5" | "6" | "7";
}

export interface WeatherGetAirQualityDailyForecastsQueryParam {
  queryParameters: WeatherGetAirQualityDailyForecastsQueryParamProperties;
}

export type WeatherGetAirQualityDailyForecastsParameters = WeatherGetAirQualityDailyForecastsQueryParam &
  RequestParameters;

export interface WeatherGetAirQualityHourlyForecastsQueryParamProperties {
  /**
   * Language in which search results should be returned. Should be one of supported IETF language tags, case insensitive. When data in specified language is not available for a specific field, default language is used.
   *
   * Please refer to [Supported Languages](https://docs.microsoft.com/azure/azure-maps/supported-languages) for details.
   */
  language?: string;
  /**
   * The applicable query specified as a comma separated string composed by latitude followed by longitude e.g. "47.641268,-122.125679".
   *
   * Weather information is generally available for locations on land, bodies of water surrounded by land, and areas of the ocean that are within approximately 50 nautical miles of a coastline.
   */
  query: Array<number>;
  /** Specifies for how many hours from now we would like to know about the air quality. Available values are 1, 12, 24, 48, 72, 96. Default value is 1 hour. */
  duration?: "1" | "12" | "24" | "48" | "72" | "96";
  /** Boolean value that returns detailed information about each pollutant. By default is True. */
  pollutants?: boolean;
}

export interface WeatherGetAirQualityHourlyForecastsQueryParam {
  queryParameters: WeatherGetAirQualityHourlyForecastsQueryParamProperties;
}

export type WeatherGetAirQualityHourlyForecastsParameters = WeatherGetAirQualityHourlyForecastsQueryParam &
  RequestParameters;

export interface WeatherGetDailyHistoricalActualsQueryParamProperties {
  /**
   * The applicable query specified as a comma separated string composed by latitude followed by longitude e.g. "47.641268,-122.125679".
   *
   * Weather information is generally available for locations on land, bodies of water surrounded by land, and areas of the ocean that are within approximately 50 nautical miles of a coastline.
   */
  query: Array<number>;
  /** Start date in ISO 8601 format, for example, 2019-10-27. The date range supported is 1 to 31 calendar days, so be sure to specify a startDate and endDate that does not exceed a maximum of 31 days (i.e.: startDate=2012-01-01&endDate=2012-01-31). */
  startDate: Date | string;
  /** End date in ISO 8601 format, for example, 2019-10-28. The date range supported is 1 to 31 calendar days, so be sure to specify a startDate and endDate that does not exceed a maximum of 31 days (i.e.: startDate=2012-01-01&endDate=2012-01-31). */
  endDate: Date | string;
  /** Specifies to return the data in either metric units or imperial units. Default value is metric. */
  unit?: "metric" | "imperial";
}

export interface WeatherGetDailyHistoricalActualsQueryParam {
  queryParameters: WeatherGetDailyHistoricalActualsQueryParamProperties;
}

export type WeatherGetDailyHistoricalActualsParameters = WeatherGetDailyHistoricalActualsQueryParam &
  RequestParameters;

export interface WeatherGetDailyHistoricalRecordsQueryParamProperties {
  /**
   * The applicable query specified as a comma separated string composed by latitude followed by longitude e.g. "47.641268,-122.125679".
   *
   * Weather information is generally available for locations on land, bodies of water surrounded by land, and areas of the ocean that are within approximately 50 nautical miles of a coastline.
   */
  query: Array<number>;
  /** Start date in ISO 8601 format, for example, 2019-10-27. The date range supported is 1 to 31 calendar days, so be sure to specify a startDate and endDate that does not exceed a maximum of 31 days (i.e.: startDate=2012-01-01&endDate=2012-01-31). */
  startDate: Date | string;
  /** End date in ISO 8601 format, for example, 2019-10-28. The date range supported is 1 to 31 calendar days, so be sure to specify a startDate and endDate that does not exceed a maximum of 31 days (i.e.: startDate=2012-01-01&endDate=2012-01-31). */
  endDate: Date | string;
  /** Specifies to return the data in either metric units or imperial units. Default value is metric. */
  unit?: "metric" | "imperial";
}

export interface WeatherGetDailyHistoricalRecordsQueryParam {
  queryParameters: WeatherGetDailyHistoricalRecordsQueryParamProperties;
}

export type WeatherGetDailyHistoricalRecordsParameters = WeatherGetDailyHistoricalRecordsQueryParam &
  RequestParameters;

export interface WeatherGetDailyHistoricalNormalsQueryParamProperties {
  /**
   * The applicable query specified as a comma separated string composed by latitude followed by longitude e.g. "47.641268,-122.125679".
   *
   * Weather information is generally available for locations on land, bodies of water surrounded by land, and areas of the ocean that are within approximately 50 nautical miles of a coastline.
   */
  query: Array<number>;
  /** Start date in ISO 8601 format, for example, 2019-10-27. The date range supported is 1 to 31 calendar days, so be sure to specify a startDate and endDate that does not exceed a maximum of 31 days (i.e.: startDate=2012-01-01&endDate=2012-01-31). */
  startDate: Date | string;
  /** End date in ISO 8601 format, for example, 2019-10-28. The date range supported is 1 to 31 calendar days, so be sure to specify a startDate and endDate that does not exceed a maximum of 31 days (i.e.: startDate=2012-01-01&endDate=2012-01-31). */
  endDate: Date | string;
  /** Specifies to return the data in either metric units or imperial units. Default value is metric. */
  unit?: "metric" | "imperial";
}

export interface WeatherGetDailyHistoricalNormalsQueryParam {
  queryParameters: WeatherGetDailyHistoricalNormalsQueryParamProperties;
}

export type WeatherGetDailyHistoricalNormalsParameters = WeatherGetDailyHistoricalNormalsQueryParam &
  RequestParameters;

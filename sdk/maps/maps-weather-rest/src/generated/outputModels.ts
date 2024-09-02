// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export interface HourlyForecastResultOutput {
  /** Forecast data for each returned hour. */
  forecasts?: Array<HourlyForecastOutput>;
}

export interface HourlyForecastOutput {
  /** Date and time of the forecast in ISO 8601 format, for example, 2019-10-27T19:39:57-08:00. */
  date?: string;
  /** Numeric value representing an image that displays the `iconPhrase`. Please refer to [Weather services in Azure Maps](/azure/azure-maps/weather-services-concepts#weather-icons) for details. */
  iconCode?:
    | "1"
    | "2"
    | "3"
    | "4"
    | "5"
    | "6"
    | "7"
    | "8"
    | "11"
    | "12"
    | "13"
    | "14"
    | "15"
    | "16"
    | "17"
    | "18"
    | "19"
    | "20"
    | "21"
    | "22"
    | "23"
    | "24"
    | "25"
    | "26"
    | "29"
    | "30"
    | "31"
    | "32"
    | "33"
    | "34"
    | "35"
    | "36"
    | "37"
    | "38"
    | "39"
    | "40"
    | "41"
    | "42"
    | "43"
    | "44";
  /** Phrase description of the weather icon. */
  iconPhrase?: string;
  /** Indicates the presence or absence of precipitation. True indicates the presence of precipitation, false indicates the absence of precipitation. */
  hasPrecipitation?: boolean;
  /** Specifies whether or not it is daylight. True indicates day light. */
  isDaylight?: boolean;
  /** Temperature being returned. */
  temperature?: WeatherValueOutput;
  /** RealFeel™ Temperature being returned. Describes what the temperature really feels like in the shade. */
  realFeelTemperature?: WeatherValueOutput;
  /** The temperature to which air may be cooled by evaporating water into it at constant pressure until it reaches saturation. */
  wetBulbTemperature?: WeatherValueOutput;
  /** The dewpoint temperature in specified unit. The dewpoint temperature is the temperature that the air must be cooled to in order to reach saturation. */
  dewPoint?: WeatherValueOutput;
  /** Wind details being returned including speed and direction. */
  wind?: WindDetailsOutput;
  /** Wind gust. Wind gust is a sudden, brief increase in speed of the wind. */
  windGust?: WindDetailsOutput;
  /** Relative humidity is the amount of water vapor present in air expressed as a percentage of the amount needed for saturation at the same temperature. */
  relativeHumidity?: number;
  /** Visibility in specified unit. A measure of the distance at which an object or light can be clearly discerned. */
  visibility?: WeatherValueOutput;
  /** Cloud ceiling in specified unit. The ceiling is a measurement of the height of the base of the lowest clouds. */
  ceiling?: WeatherValueOutput;
  /**
   * Measure of the strength of the ultraviolet radiation from the sun. Supported values are:
   *   * `0-2` - Low danger from the sun's UV rays or the average person.
   *   * `3-5` - Moderate risk of harm from unprotected sun exposure.
   *   * `6-7` - High risk of harm from unprotected sun exposure.
   *   * `8-10` - Very high risk of harm from unprotected sun exposure.
   *   * `11+` - Extreme risk of harm from unprotected sun exposure.
   */
  uvIndex?: number;
  /** Phrase associated with the `uvIndex`. */
  uvIndexPhrase?: string;
  /** Percent representing the probability of precipitation. For example, '20'. */
  precipitationProbability?: number;
  /** Percent representing the probability of rain. For example, '50'. */
  rainProbability?: number;
  /** Percent representing the probability of snow. For example, '50'. */
  snowProbability?: number;
  /** Percent representing the probability of snow. For example, '5'. */
  iceProbability?: number;
  /** Total liquid equivalent of precipitation during the forecast period. */
  totalLiquid?: WeatherValueOutput;
  /** Rain */
  rain?: WeatherValueOutput;
  /** Snow */
  snow?: WeatherValueOutput;
  /** Ice */
  ice?: WeatherValueOutput;
  /** Percent representing cloud cover. */
  cloudCover?: number;
}

/** Specific value of a given unit related to weather. */
export interface WeatherValueOutput {
  /** Rounded value. */
  value?: number;
  /** Type of unit for the returned value. */
  unit?: string;
  /** Numeric ID value associated with the type of unit being displayed. Can be used for unit translation. Please refer to [Weather services in Azure Maps](/azure/azure-maps/weather-services-concepts#unittype) for details. */
  unitType?:
    | "0"
    | "1"
    | "2"
    | "3"
    | "4"
    | "5"
    | "6"
    | "7"
    | "8"
    | "9"
    | "10"
    | "11"
    | "12"
    | "13"
    | "14"
    | "15"
    | "16"
    | "17"
    | "18"
    | "19"
    | "20"
    | "21"
    | "22"
    | "31";
}

/** Wind details being returned including speed and direction. */
export interface WindDetailsOutput {
  /** Wind direction */
  direction?: WindDirectionOutput;
  /** Speed of the wind in specified unit. */
  speed?: WeatherValueOutput;
}

/** Wind direction */
export interface WindDirectionOutput {
  /** Wind direction in Azimuth degrees,  starting at true North and continuing in clockwise direction. North is 0 degrees, east is 90 degrees, south is 180 degrees, west is 270 degrees. Possible values 0-359. */
  degrees?: number;
  /** Direction abbreviation in the specified language. */
  localizedDescription?: string;
}

/** Common error response for all Azure Resource Manager APIs to return error details for failed operations. (This also follows the OData error response format.). */
export interface ErrorResponseOutput {
  /** The error object. */
  error?: ErrorDetailOutput;
}

/** The error detail. */
export interface ErrorDetailOutput {
  /** The error code. */
  code?: string;
  /** The error message. */
  message?: string;
  /** The error target. */
  target?: string;
  /** The error details. */
  details?: Array<ErrorDetailOutput>;
  /** The error additional info. */
  additionalInfo?: Array<ErrorAdditionalInfoOutput>;
}

/** The resource management error additional info. */
export interface ErrorAdditionalInfoOutput {
  /** The additional info type. */
  type?: string;
  /** The additional info. */
  info?: Record<string, unknown>;
}

export interface MinuteForecastResultOutput {
  /** Phrase summaries for the entire forecast period. */
  summary?: MinuteForecastSummaryOutput;
  /** Summary information for each interval in the forecast. The Summaries breaks down each potential interval where precipitation starts and stops. */
  intervalSummaries?: Array<IntervalSummaryOutput>;
  /** Forecast data for each interval in the forecast. */
  intervals?: Array<ForecastIntervalOutput>;
}

/** Phrase summaries for the entire forecast period. */
export interface MinuteForecastSummaryOutput {
  /** Summary phrase for the next 60 minutes. Phrase length is approximately 60 characters. */
  briefPhrase60?: string;
  /** Short summary phrase for the next 120 minutes. Phrase length is approximately 25 characters. */
  shortPhrase?: string;
  /** Summary phrase for the next 120 minutes. Phrase length is approximately 60 characters. */
  briefPhrase?: string;
  /** Long summary phrase for the next 120 minutes. Phrase length is 60+ characters. */
  longPhrase?: string;
  /** Numeric value representing an image that displays the `iconPhrase`. Please refer to [Weather services in Azure Maps](/azure/azure-maps/weather-services-concepts#weather-icons) for details. */
  iconCode?:
    | "1"
    | "2"
    | "3"
    | "4"
    | "5"
    | "6"
    | "7"
    | "8"
    | "11"
    | "12"
    | "13"
    | "14"
    | "15"
    | "16"
    | "17"
    | "18"
    | "19"
    | "20"
    | "21"
    | "22"
    | "23"
    | "24"
    | "25"
    | "26"
    | "29"
    | "30"
    | "31"
    | "32"
    | "33"
    | "34"
    | "35"
    | "36"
    | "37"
    | "38"
    | "39"
    | "40"
    | "41"
    | "42"
    | "43"
    | "44";
}

export interface IntervalSummaryOutput {
  /** The first minute to which the summary applies. */
  startMinute?: number;
  /** The last minute to which the summary applies. */
  endMinute?: number;
  /** The number of minutes for which the summary applies. */
  totalMinutes?: number;
  /** Short summary phrase. Phrase length is approximately 25 characters. */
  shortPhrase?: string;
  /** Brief summary phrase. Phrase length is approximately 60 characters. */
  briefPhrase?: string;
  /** Long summary phrase. Phrase length is 60+ characters. */
  longPhrase?: string;
  /** Numeric value representing an image that displays the `iconPhrase`. Please refer to [Weather services in Azure Maps](/azure/azure-maps/weather-services-concepts#weather-icons) for details. */
  iconCode?:
    | "1"
    | "2"
    | "3"
    | "4"
    | "5"
    | "6"
    | "7"
    | "8"
    | "11"
    | "12"
    | "13"
    | "14"
    | "15"
    | "16"
    | "17"
    | "18"
    | "19"
    | "20"
    | "21"
    | "22"
    | "23"
    | "24"
    | "25"
    | "26"
    | "29"
    | "30"
    | "31"
    | "32"
    | "33"
    | "34"
    | "35"
    | "36"
    | "37"
    | "38"
    | "39"
    | "40"
    | "41"
    | "42"
    | "43"
    | "44";
}

export interface ForecastIntervalOutput {
  /** The date and time for the start of the interval in ISO 8601 format, for example, 2019-10-27T19:39:57-08:00. */
  startTime?: string;
  /** The first minute for the interval. */
  minute?: number;
  /** A unit that represents forecasted precipitation intensity. */
  dbz?: number;
  /** A short phrase describing precipitation condition for the interval. */
  shortPhrase?: string;
  /** Key that specifies the threshold value. Along with precipitationType, can be used to determine the simplifiedColor. If dbz is zero, not present in the response. */
  threshold?: string;
  /** The full spectrum color that maps to the dBZ (decibel relative to Z). If dbz is zero, color is not present in the response. */
  color?: ColorValueOutput;
  /** The band color that maps to the precipitation type and threshold. If dbz is zero, not present in the response. */
  simplifiedColor?: ColorValueOutput;
  /** Specifies the type of precipitation ("Rain" "Snow" "Ice" or "Mix"). If dbz is zero, precipitationType is not present in the response. */
  precipitationType?: "Rain" | "Snow" | "Ice" | "Mix";
  /** Numeric value representing an image that displays the `iconPhrase`. Please refer to [Weather services in Azure Maps](/azure/azure-maps/weather-services-concepts#weather-icons) for details. */
  iconCode?:
    | "1"
    | "2"
    | "3"
    | "4"
    | "5"
    | "6"
    | "7"
    | "8"
    | "11"
    | "12"
    | "13"
    | "14"
    | "15"
    | "16"
    | "17"
    | "18"
    | "19"
    | "20"
    | "21"
    | "22"
    | "23"
    | "24"
    | "25"
    | "26"
    | "29"
    | "30"
    | "31"
    | "32"
    | "33"
    | "34"
    | "35"
    | "36"
    | "37"
    | "38"
    | "39"
    | "40"
    | "41"
    | "42"
    | "43"
    | "44";
  /** Percent representing cloud cover. */
  cloudCover?: number;
}

export interface ColorValueOutput {
  /** Red component of the RGB value. */
  red?: number;
  /** Green component of the RGB value. */
  green?: number;
  /** Blue component of the RGB value */
  blue?: number;
  /** Hexadecimal color value. */
  hex?: string;
}

export interface QuarterDayForecastResultOutput {
  /** Forecast data for each quarter in the response. */
  forecasts?: Array<QuarterDayForecastOutput>;
}

export interface QuarterDayForecastOutput {
  /** Date of the forecast as example, 2019-10-27T00:00:00 */
  date?: string;
  /** Date and time of the beginning of the forecast quarter displayed in ISO 8601 format, for example, 2019-10-27T19:39:57-08:00. */
  effectiveDate?: string;
  /** Quarter of the day. */
  quarter?: "0" | "1" | "2" | "3";
  /** Numeric value representing an image that displays the `iconPhrase`. Please refer to [Weather services in Azure Maps](/azure/azure-maps/weather-services-concepts#weather-icons) for details. */
  iconCode?:
    | "1"
    | "2"
    | "3"
    | "4"
    | "5"
    | "6"
    | "7"
    | "8"
    | "11"
    | "12"
    | "13"
    | "14"
    | "15"
    | "16"
    | "17"
    | "18"
    | "19"
    | "20"
    | "21"
    | "22"
    | "23"
    | "24"
    | "25"
    | "26"
    | "29"
    | "30"
    | "31"
    | "32"
    | "33"
    | "34"
    | "35"
    | "36"
    | "37"
    | "38"
    | "39"
    | "40"
    | "41"
    | "42"
    | "43"
    | "44";
  /** Phrase description of the icon. Displayed in specified language. For example, 'Sunny'. */
  iconPhrase?: string;
  /** Short summary phrase summary for quarter. */
  phrase?: string;
  /** Temperature values for the quarter. */
  temperature?: WeatherValueRangeOutput;
  /** RealFeel™ Temperature values for the quarter. */
  realFeelTemperature?: WeatherValueRangeOutput;
  /** The dewpoint temperature in specified unit. The dewpoint temperature is the temperature that the air must be cooled to in order to reach saturation. */
  dewPoint?: WeatherValueOutput;
  /** Relative humidity is the amount of water vapor present in air expressed as a percentage of the amount needed for saturation at the same temperature. */
  relativeHumidity?: number;
  /** Wind details being returned including speed and direction. */
  wind?: WindDetailsOutput;
  /** Wind gust. Wind gust is a sudden, brief increase in speed of the wind. */
  windGust?: WindDetailsOutput;
  /** Visibility in specified unit. A measure of the distance at which an object or light can be clearly discerned. */
  visibility?: WeatherValueOutput;
  /** Percent representing cloud cover. */
  cloudCover?: number;
  /** Indicates the presence or absence of precipitation. True indicates the presence of precipitation, false indicates the absence of precipitation. */
  hasPrecipitation?: boolean;
  /** Specifies the type of precipitation ("Rain" "Snow" "Ice" or "Mix"). If dbz is zero, precipitationType is not present in the response. */
  precipitationType?: "Rain" | "Snow" | "Ice" | "Mix";
  /** Description of the intensity. */
  precipitationIntensity?: string;
  /** Percent representing the probability of precipitation. For example, '20'. */
  precipitationProbability?: number;
  /** Percent representing the probability of a thunderstorm. For example, '10'. */
  thunderstormProbability?: number;
  /** Total liquid equivalent of precipitation during the forecast period. */
  totalLiquid?: WeatherValueOutput;
  /** Rain */
  rain?: WeatherValueOutput;
  /** Snow */
  snow?: WeatherValueOutput;
  /** Ice */
  ice?: WeatherValueOutput;
}

/** Returned temperature values. */
export interface WeatherValueRangeOutput {
  /** Minimum temperature for the time period. */
  minimum?: WeatherValueOutput;
  /** Maximum temperature for the time period */
  maximum?: WeatherValueOutput;
}

export interface CurrentConditionsResultOutput {
  /** Detailed current weather conditions. */
  results?: Array<CurrentConditionsOutput>;
}

export interface CurrentConditionsOutput {
  /** Date and time of the current observation displayed in ISO 8601 format, for example, 2019-10-27T19:39:57-08:00. */
  dateTime?: string;
  /** Phrase description of the current weather condition.  Displayed in specified language. */
  phrase?: string;
  /** Numeric value representing an image that displays the `iconPhrase`. Please refer to [Weather services in Azure Maps](/azure/azure-maps/weather-services-concepts#weather-icons) for details. */
  iconCode?:
    | "1"
    | "2"
    | "3"
    | "4"
    | "5"
    | "6"
    | "7"
    | "8"
    | "11"
    | "12"
    | "13"
    | "14"
    | "15"
    | "16"
    | "17"
    | "18"
    | "19"
    | "20"
    | "21"
    | "22"
    | "23"
    | "24"
    | "25"
    | "26"
    | "29"
    | "30"
    | "31"
    | "32"
    | "33"
    | "34"
    | "35"
    | "36"
    | "37"
    | "38"
    | "39"
    | "40"
    | "41"
    | "42"
    | "43"
    | "44";
  /** Indicates the presence or absence of precipitation. True indicates the presence of precipitation, false indicates the absence of precipitation. */
  hasPrecipitation?: boolean;
  /** Indicates the time of the day. True indicates 'day',', false indicates 'night. */
  isDayTime?: boolean;
  /** Temperature being returned. */
  temperature?: WeatherValueOutput;
  /** RealFeel™ Temperature being returned. */
  realFeelTemperature?: WeatherValueOutput;
  /** RealFeel™ Temperature being returned. Describes what the temperature really feels like in the shade. */
  realFeelTemperatureShade?: WeatherValueOutput;
  /** Relative humidity is the amount of water vapor present in air expressed as a percentage of the amount needed for saturation at the same temperature. */
  relativeHumidity?: number;
  /** The dewpoint temperature in specified unit. The dewpoint temperature is the temperature that the air must be cooled to in order to reach saturation. */
  dewPoint?: WeatherValueOutput;
  /** Wind details being returned including speed and direction. */
  wind?: WindDetailsOutput;
  /** Wind gust. Wind gust is a sudden, brief increase in speed of the wind. */
  windGust?: WindDetailsOutput;
  /**
   * Measure of the strength of the ultraviolet radiation from the sun. Supported values are:
   *   * `0-2` - Low danger from the sun's UV rays or the average person.
   *   * `3-5` - Moderate risk of harm from unprotected sun exposure.
   *   * `6-7` - High risk of harm from unprotected sun exposure.
   *   * `8-10` - Very high risk of harm from unprotected sun exposure.
   *   * `11+` - Extreme risk of harm from unprotected sun exposure.
   */
  uvIndex?: number;
  /** Phrase associated with the `uvIndex`. */
  uvIndexPhrase?: string;
  /** Visibility in specified unit. A measure of the distance at which an object or light can be clearly discerned. */
  visibility?: WeatherValueOutput;
  /**
   * Cause of limited visibility.
   *
   * Possible values:
   *
   * - _A = heavy thunderstorm/hail_
   * - _BD = blowing dust_
   * - _BN = blowing sand_
   * - _BS = blowing snow_
   * - _D = dust_
   * - _F = fog_
   * - _GF = ground fog_
   * - _HZ = haze_
   * - _I = ice_
   * - _IC = ice crystals_
   * - _IF = ice fog_
   * - _IP = ice pellets_
   * - _IPW = ice pellets shower_
   * - _K = smoke_
   * - _L = drizzle_
   * - _R = rain_
   * - _RS = rain/snow_
   * - _RW = rain shower_
   * - _S = snow_
   * - _SG = snow granules_
   * - _SP = snow pellets_
   * - _SW = snow shower_
   * - _T = thunderstorm_
   * - _UP = undefined precipitation_
   * - _ZL = freezing drizzle_
   * - _ZR = freezing rain_
   * - _+ = heavy_
   * - _- = light_
   */
  obstructionsToVisibility?: string;
  /** Percent representing cloud cover. */
  cloudCover?: number;
  /** Cloud ceiling in specified unit. The ceiling is a measurement of the height of the base of the lowest clouds. */
  ceiling?: WeatherValueOutput;
  /** Atmospheric pressure in specified unit. */
  pressure?: WeatherValueOutput;
  /** Atmospheric pressure change. */
  pressureTendency?: PressureTendencyOutput;
  /** Departure from the temperature observed 24 hours ago in specified unit. */
  pastTwentyFourHourTemperatureDeparture?: WeatherValueOutput;
  /** Perceived outdoor temperature caused by the combination of air temperature, relative humidity, and wind speed in specified unit. */
  apparentTemperature?: WeatherValueOutput;
  /** Perceived air temperature on exposed skin due to wind. */
  windChillTemperature?: WeatherValueOutput;
  /** The temperature to which air may be cooled by evaporating water into it at constant pressure until it reaches saturation. */
  wetBulbTemperature?: WeatherValueOutput;
  /** Summary of precipitation amounts over the past 24 hours. */
  precipitationSummary?: PrecipitationSummaryOutput;
  /** Summary of temperature fluctuations over the past 6, 12, and 24 hours. */
  temperatureSummary?: TemperatureSummaryOutput;
}

export interface PressureTendencyOutput {
  /** Description of the pressure tendency in specified language */
  localizedDescription?: string;
  /** Pressure tendency code regardless of language. One of F=Falling, S=Steady, R=Rising. */
  code?: string;
}

export interface PrecipitationSummaryOutput {
  /** The amount of precipitation (liquid equivalent) that has fallen in the past hour. */
  pastHour?: WeatherValueOutput;
  /** The amount of precipitation (liquid equivalent) that has fallen in the past three hours. */
  pastThreeHours?: WeatherValueOutput;
  /** The amount of precipitation (liquid equivalent) that has fallen in the past six hours. Contains Metric and Imperial Values. */
  pastSixHours?: WeatherValueOutput;
  /** The amount of precipitation (liquid equivalent) that has fallen in the past nine hours. */
  pastNineHours?: WeatherValueOutput;
  /** The amount of precipitation (liquid equivalent) that has fallen in the past 12 hours. */
  pastTwelveHours?: WeatherValueOutput;
  /** The amount of precipitation (liquid equivalent) that has fallen in the past 18 hours. */
  pastEighteenHours?: WeatherValueOutput;
  /** The amount of precipitation (liquid equivalent) that has fallen in the past 24 hours. */
  pastTwentyFourHours?: WeatherValueOutput;
}

export interface TemperatureSummaryOutput {
  /** Summary of temperature fluctuations over the past 6 hours. */
  pastSixHours?: PastHoursTemperatureOutput;
  /** Summary of temperature fluctuations over the past 12 hours. */
  pastTwelveHours?: PastHoursTemperatureOutput;
  /** Summary of temperature fluctuations over the past 24 hours. */
  pastTwentyFourHours?: PastHoursTemperatureOutput;
}

/** Summary of temperature fluctuations over the number of past hours. */
export interface PastHoursTemperatureOutput {
  /** minimum */
  minimum?: WeatherValueOutput;
  /** maximum */
  maximum?: WeatherValueOutput;
}

export interface DailyForecastResultOutput {
  /** Summary for the main conditions for the requested time period. Notice that summary can cover only part of the time period. */
  summary?: DailyForecastSummaryOutput;
  /** Forecast data for each requested day. */
  forecasts?: Array<DailyForecastOutput>;
}

/** Summary for the main conditions for the requested time period. Notice that summary can cover only part of the time period. */
export interface DailyForecastSummaryOutput {
  /** Date and time that the summary is in effect, displayed in ISO 8601 format, for example, 2019-10-27T19:39:57-08:00. */
  startDate?: string;
  /** Date and time that the summary period ends, displayed in ISO 8601 format, for example, 2019-10-27T19:39:57-08:00. */
  endDate?: string;
  /** severity */
  severity?: number;
  /** Summary phrase of the daily forecast.  Displayed in specified language. */
  phrase?: string;
  /** one or 2 word(s) to summarize the phrase. */
  category?: string;
}

export interface DailyForecastOutput {
  /** Date and time of the current observation displayed in ISO 8601 format, for example, 2019-10-27T19:39:57-08:00. */
  date?: string;
  /** Temperature values for the day. */
  temperature?: WeatherValueRangeOutput;
  /** RealFeel™ Temperature being returned. */
  realFeelTemperature?: WeatherValueRangeOutput;
  /** RealFeel™ Temperature being returned. Describes what the temperature really feels like in the shade. */
  realFeelTemperatureShade?: WeatherValueRangeOutput;
  /** Hours of sun. */
  hoursOfSun?: number;
  /** Summary for mean temperature of Heating Degree Day or Cooling Degree Day information */
  degreeDaySummary?: DegreeDaySummaryOutput;
  /** Air quality */
  airAndPollen?: Array<AirAndPollenOutput>;
  /** Day forecast detail */
  day?: DailyForecastDetailOutput;
  /** Night forecast detail */
  night?: DailyForecastDetailOutput;
  /** Source(s) of the forecast data. */
  sources?: Array<string>;
}

export interface DegreeDaySummaryOutput {
  /** Number of degrees that the mean temperature is below 65 degrees F/ 18 degree C. */
  heating?: WeatherValueOutput;
  /** Number of degrees that the mean temperature is above 65 degrees F/ 18 degree C. */
  cooling?: WeatherValueOutput;
}

export interface AirAndPollenOutput {
  /** Name of the pollen or pollutant. For example, grass, mold, weed, air quality, tree and UV index. */
  name?: string;
  /** Value of the given type above. Values associated with mold, grass, weed and tree are in units of parts per cubic meter. Both air quality and UV are indices, so they are unitless. */
  value?: number;
  /** Category of the air quality or pollution type. For example, low, high, good, moderate, unhealthy, hazardous. */
  category?: string;
  /** Value associated with the air quality or pollution category. These values range from 1 to 6. 1 implying good conditions, 6 implying hazardous conditions. */
  categoryValue?: number;
  /** Only exists for air quality. Examples include ozone and particle pollution. */
  type?: string;
}

export interface DailyForecastDetailOutput {
  /** Numeric value representing an image that displays the `iconPhrase`. Please refer to [Weather services in Azure Maps](/azure/azure-maps/weather-services-concepts#weather-icons) for details. */
  iconCode?:
    | "1"
    | "2"
    | "3"
    | "4"
    | "5"
    | "6"
    | "7"
    | "8"
    | "11"
    | "12"
    | "13"
    | "14"
    | "15"
    | "16"
    | "17"
    | "18"
    | "19"
    | "20"
    | "21"
    | "22"
    | "23"
    | "24"
    | "25"
    | "26"
    | "29"
    | "30"
    | "31"
    | "32"
    | "33"
    | "34"
    | "35"
    | "36"
    | "37"
    | "38"
    | "39"
    | "40"
    | "41"
    | "42"
    | "43"
    | "44";
  /** Phrase description of the icon. Displayed in specified language. For example, 'Sunny'. */
  iconPhrase?: string;
  /** Local weather data provider information. */
  localSource?: LocalSourceOutput;
  /** Indicates the presence or absence of precipitation. True indicates the presence of precipitation, false indicates the absence of precipitation. */
  hasPrecipitation?: boolean;
  /** Specifies the type of precipitation ("Rain" "Snow" "Ice" or "Mix"). If dbz is zero, precipitationType is not present in the response. */
  precipitationType?: "Rain" | "Snow" | "Ice" | "Mix";
  /** Description of the intensity. */
  precipitationIntensity?: string;
  /** Phrase description of the forecast in specified language. Azure Maps attempts to keep this phrase under 30 characters in length, but some languages/weather events may result in a longer phrase length, exceeding 30 characters. */
  shortPhrase?: string;
  /** Phrase description of the forecast in specified language. Azure Maps attempts to keep this phrase under 100 characters in length, but some languages/weather events may result in a longer phrase length, exceeding 100 characters. */
  longPhrase?: string;
  /** Percent representing the probability of precipitation. For example, '20'. */
  precipitationProbability?: number;
  /** Percent representing the probability of a thunderstorm. For example, '80'. */
  thunderstormProbability?: number;
  /** Percent representing the probability of rain. For example, '40'. */
  rainProbability?: number;
  /** Percent representing the probability of snow. For example, '30'. */
  snowProbability?: number;
  /** Percent representing the probability of ice. For example, '30'. */
  iceProbability?: number;
  /** Wind details being returned including speed and direction. */
  wind?: WindDetailsOutput;
  /** Wind gust. Wind gust is a sudden, brief increase in speed of the wind. */
  windGust?: WindDetailsOutput;
  /** Total liquid equivalent of precipitation during the forecast period. */
  totalLiquid?: WeatherValueOutput;
  /** Rain */
  rain?: WeatherValueOutput;
  /** Snow */
  snow?: WeatherValueOutput;
  /** Ice */
  ice?: WeatherValueOutput;
  /** Hours of precipitation */
  hoursOfPrecipitation?: number;
  /** Hours of rain. */
  hoursOfRain?: number;
  /** Hours of snow. */
  hoursOfSnow?: number;
  /** Hours of ice. */
  hoursOfIce?: number;
  /** Percent representing cloud cover. */
  cloudCover?: number;
}

/** Local weather data provider information. */
export interface LocalSourceOutput {
  /** Numeric identifier, unique to the local data provider. */
  id?: number;
  /** Name of the local data provider. Name is displayed in the language specified by language code in URL, if available. Otherwise, Name is displayed in English or the language in which the name was provided. */
  name?: string;
  /** Weather code provided by the local data provider. This weather code allows the forecast to be matched to icons provided by the local data provider instead of Azure Maps icons. */
  weatherCode?: string;
}

/** This object is returned from a successful Weather Along Route. */
export interface WeatherAlongRouteResultOutput {
  /** Short summary of the weather along the route. */
  summary?: WeatherAlongRouteSummaryOutput;
  /** Data for each waypoint returned in the same order as specified in the request. */
  waypoints?: Array<WaypointForecastOutput>;
}

/** Short summary of the weather along the route. */
export interface WeatherAlongRouteSummaryOutput {
  /** Numeric value representing an image that displays the `iconPhrase`. Please refer to [Weather services in Azure Maps](/azure/azure-maps/weather-services-concepts#weather-icons) for details. */
  iconCode?:
    | "1"
    | "2"
    | "3"
    | "4"
    | "5"
    | "6"
    | "7"
    | "8"
    | "11"
    | "12"
    | "13"
    | "14"
    | "15"
    | "16"
    | "17"
    | "18"
    | "19"
    | "20"
    | "21"
    | "22"
    | "23"
    | "24"
    | "25"
    | "26"
    | "29"
    | "30"
    | "31"
    | "32"
    | "33"
    | "34"
    | "35"
    | "36"
    | "37"
    | "38"
    | "39"
    | "40"
    | "41"
    | "42"
    | "43"
    | "44";
  /** Description of the weather hazard affecting the trip. */
  hazards?: WeatherHazardsOutput;
}

/** Description of the weather hazard affecting the trip. */
export interface WeatherHazardsOutput {
  /**
   * A severity/hazard index.
   *   * `0` - No hazard.
   *   * `1` - Be informed, be aware.
   *   * `2` - Pay attention, be prepared.
   *   * `3` - Take action.
   *   * `4` - Life threatening, emergency.
   */
  maxHazardIndex?: "0" | "1" | "2" | "3" | "4";
  /** Details of the weather hazards affecting the trip. */
  hazardDetails?: Array<HazardDetailOutput>;
}

export interface HazardDetailOutput {
  /**
   * A severity/hazard index.
   *   * `0` - No hazard.
   *   * `1` - Be informed, be aware.
   *   * `2` - Pay attention, be prepared.
   *   * `3` - Take action.
   *   * `4` - Life threatening, emergency.
   */
  hazardIndex?: "0" | "1" | "2" | "3" | "4";
  /** A unique identifier (non-displayable) for each type of hazard: LightRain, ModerateRain, HeavyRain, LightMix, ModerateMix, HeavyMix, LightSnow, ModerateSnow, HeavySnow, LightIce, ModerateIce, HeavyIce, Hail, LargeHail, SunGlare, SunGlareHigh, Lightning, SevereLightning, WindModerate, WindHigh, WindExtreme, FloodWarning, FlashFloodWarning, TornadoWarning, TsunamiWarning, SevereThunderstormWarning. */
  hazardCode?: string;
  /** A displayable short phrase describing the forecasted conditions and precipitation intensity/type. */
  shortPhrase?: string;
}

export interface WaypointForecastOutput {
  /** Numeric value representing an image that displays the `iconPhrase`. Please refer to [Weather services in Azure Maps](/azure/azure-maps/weather-services-concepts#weather-icons) for details. */
  iconCode?:
    | "1"
    | "2"
    | "3"
    | "4"
    | "5"
    | "6"
    | "7"
    | "8"
    | "11"
    | "12"
    | "13"
    | "14"
    | "15"
    | "16"
    | "17"
    | "18"
    | "19"
    | "20"
    | "21"
    | "22"
    | "23"
    | "24"
    | "25"
    | "26"
    | "29"
    | "30"
    | "31"
    | "32"
    | "33"
    | "34"
    | "35"
    | "36"
    | "37"
    | "38"
    | "39"
    | "40"
    | "41"
    | "42"
    | "43"
    | "44";
  /** A displayable short phrase describing the forecasted conditions and precipitation intensity/type. */
  shortPhrase?: string;
  /** Indicates the time of the day. True indicates 'day',', false indicates 'night. */
  isDayTime?: boolean;
  /** Percent representing cloud cover. */
  cloudCover?: number;
  /** Specific value of a given unit related to weather. */
  temperature?: WeatherValueOutput;
  /** Wind details being returned including speed and direction. */
  wind?: WindDetailsOutput;
  /** Wind details being returned including speed and direction. */
  windGust?: WindDetailsOutput;
  /** Precipitation forecast of the weather along the route. */
  precipitation?: WeatherAlongRoutePrecipitationOutput;
  /** Estimation of thunderstorm intensity on an open scale. A value of 0 means there is no thunderstorm; values of 1 and higher mean there is a thunderstorm in increasing intensity. */
  lightningCount?: number;
  /** A rating that indicates how blinding the sun is for the driver. */
  sunGlare?: SunGlareOutput;
  /** Description of the weather hazard affecting the trip. */
  hazards?: WeatherHazardsOutput;
  /** List of weather hazard notifications. */
  notifications?: Array<WeatherNotificationOutput>;
}

/** Precipitation forecast of the weather along the route. */
export interface WeatherAlongRoutePrecipitationOutput {
  /** The forecasted precipitation intensity in dBZ (decibels relative to Z) from 0.0 to 100.0. */
  dbz?: number;
  /** Precipitation type. If precipitation should occur, the type that it will be: "RAIN," "HAIL," "SNOW," "ICE," or "MIX." */
  type?: string;
}

/** A rating that indicates how blinding the sun is for the driver. */
export interface SunGlareOutput {
  /** If the vehicle heading value is not provided for a waypoint, then the service will calculate a heading based upon the location of neighboring waypoints if provided. */
  calculatedVehicleHeading?: number;
  /** An index from 0 to 100 indicating sun glare intensity for a driver. A value of 50 and above can be considered a hazard for some drivers and a value of 100 signifies the driver is driving straight into the sun and atmospheric conditions are clear allowing for the full intensity of the sun to blind the driver. */
  glareIndex?: number;
}

export interface WeatherNotificationOutput {
  /** A type of notification generated to warn drivers of the onset of a hazard, or increase in intensity of a hazard. */
  type?: string;
  /**
   * A severity/hazard index.
   *   * `0` - No hazard.
   *   * `1` - Be informed, be aware.
   *   * `2` - Pay attention, be prepared.
   *   * `3` - Take action.
   *   * `4` - Life threatening, emergency.
   */
  hazardIndex?: "0" | "1" | "2" | "3" | "4";
  /** A unique identifier (non-displayable) for each type of hazard: LightRain, ModerateRain, HeavyRain, LightMix, ModerateMix, HeavyMix, LightSnow, ModerateSnow, HeavySnow, LightIce, ModerateIce, HeavyIce, Hail, LargeHail, SunGlare, SunGlareHigh, Lightning, SevereLightning, WindModerate, WindHigh, WindExtreme, FloodWarning, FlashFloodWarning, TornadoWarning, TsunamiWarning, SevereThunderstormWarning. */
  hazardCode?: string;
  /** A displayable short phrase describing the forecasted conditions and precipitation intensity/type. */
  shortPhrase?: string;
}

/** This object is returned from a successful Get Severe Weather Alerts call. */
export interface SevereWeatherAlertsResultOutput {
  /** A list of all severe weather alerts for the queried location. */
  results?: Array<SevereWeatherAlertOutput>;
}

/** Information about a severe weather alert. */
export interface SevereWeatherAlertOutput {
  /** 2-character ISO 3166-1 Alpha-2 country code, for example, "US". */
  countryCode?: string;
  /** A unique numerical identifier for a weather alert. */
  alertId?: number;
  /** Description of the alert. */
  description?: SevereWeatherAlertDescriptionOutput;
  /** Category of the alert. */
  category?: string;
  /** Number signifying the importance or ranking order of the given alert within the country/region it has originated. A lower number signifies a higher priority. For example, 1 is the highest priority. The number varies by country/region and can change over time as each country/region evolves their alert systems. */
  priority?: number;
  /** Classification of the alert. This field is not available for all countries and therefore not always returned. */
  class?: string;
  /** Severity level of the alert. This field is not available for all countries and therefore not always returned. */
  level?: string;
  /** The provider of the alert information. By default the source is returned in English (en-US). The alerts are from official Government Meteorological Agencies and leading global weather alert providers. */
  source?: string;
  /** A numerical identifier associated with the source provider name of the alert data. */
  sourceId?: number;
  /** A disclaimer regarding the source of the alert information. This field is not always available. For example, disclaimer may include details about the delays or potential issues related to the alarm. */
  disclaimer?: string;
  /** Information about the alert specific to the affected area(s). */
  alertAreas?: Array<AlertDetailsOutput>;
}

/** Description of a severe weather alert. */
export interface SevereWeatherAlertDescriptionOutput {
  /** Description of the alert in the specified language. By default English (en-US) is returned if the language parameter is not specified in the request. */
  localized?: string;
  /** Description of the alert in English (en-US). */
  english?: string;
}

/** Information about a severe weather alert issued within an affected area(s). If multiple alerts are active for the same location, the alerts will be returned in order of `priority` within the API response, with the highest priority alert being returned at the top of the response. */
export interface AlertDetailsOutput {
  /** The name of an area which is affected by the alert. The location that was requested falls under the alert area. */
  name?: string;
  /** Text summarizing the alert in the returned area. */
  summary?: string;
  /** The start date and time of the alert in ISO 8601 format, for example, 2019-10-27T19:39:57-08:00. If the alert crosses multiple time zones the returned time in the response is the local time to the requested coordinate location. */
  startTime?: string;
  /** The end date and time of the alert in ISO 8601 format, for example, 2019-10-27T19:39:57-08:00. If the alert crosses multiple time zones the returned time in the response is the local time to the requested coordinate location. */
  endTime?: string;
  /** The latest status of the alert in the current area. */
  latestStatus?: LatestStatusOutput;
  /** Full details associated with the alert. Returned if `details`=True. This field is always returned in the language(s) of choice by the issuing provider and Azure Maps only returns what is created by the provider. Please note, some countries/regions may offer their native language and English. Language parameter won’t apply to this field. */
  alertDetails?: string;
  /** Language of the `alertDetails`. This field  helps to point out that the language of the `alertDetails` may differ from the requested language parameter. Returned if `details`=True. Language code has been derived from the ISO 639-1 Alpha-2 codes. */
  alertDetailsLanguageCode?: string;
}

/** The latest status on the alert in the current area. */
export interface LatestStatusOutput {
  /** The latest status keyword for the alert, in the specified language. By default, returned in English (en-US). */
  localized?: string;
  /** Latest status keyword for the alert, in English (en-US). */
  english?:
    | "New"
    | "Extend"
    | "Cancel"
    | "Correct"
    | "Expire"
    | "Upgrade"
    | "Continue"
    | "Update";
}

/** This object is returned from a successful Get Daily Indices call. */
export interface DailyIndicesResultOutput {
  /** A list of all daily indices for the queried location. */
  results?: Array<DailyIndexOutput>;
}

/** Information about a daily index. */
export interface DailyIndexOutput {
  /** Name of the index, for example, "Construction", "Outdoor Activity", "Flight Delays". */
  indexName?: string;
  /** Numeric ID used to identify the specific index. Please refer to [Weather services in Azure Maps](/azure/azure-maps/weather-services-concepts#daily-index-range-sets) for details and to see the supported index IDs. For example, the index ID can support UI visualization scenarios. */
  indexId?: number;
  /** Date and time of the current observation displayed in ISO 8601 format, for example, 2019-10-27T19:39:57-08:00. */
  dateTime?: string;
  /** Index value. Ranges from 0.0 to 10.0. Please refer to [Weather services in Azure Maps](/azure/azure-maps/weather-services-concepts#daily-index-range-sets) for details and to see the supported ranges. */
  value?: number;
  /** Textual description for `categoryValue` corresponding to the level that the index value falls under, for example "Very Good". */
  category?: string;
  /** Level that the index value falls under, represented by an integer. This value can be 1 through 5 and should be used in combination with the `ascending` flag because it can differ among indices. For example, the following values apply for Mosquito Activity: Low=1, Moderate=2, High=3, Very High=4, and Extreme=5. */
  categoryValue?: number;
  /** Describes the direction of the `value` and `categoryValue`. For example, when set to `true`, the poorest index value is 0 and the best index value is 10. When set to `true`, the poorest index value is 10 and the best index value is 0. */
  ascending?: boolean;
  /** A textual explanation that can be used for display purposes to summarize the index value and category. For example, when the index value for Flight Delays is very good, the description will be "Conditions are excellent for flying!". */
  description?: string;
}

/** All government-issued active storms */
export interface ActiveStormResultOutput {
  /** All government-issued active storms */
  results?: Array<ActiveStormOutput>;
  /** The is the link to the next page of the features returned. If it's the last page, no this field. */
  nextLink?: string;
}

/** Government-issued active storm */
export interface ActiveStormOutput {
  /** Year of origination */
  year?: string;
  /** Basin identifier (AL, EP, SI, NI, CP, NP, SP) */
  basinId?: "AL" | "EP" | "SI" | "NI" | "CP" | "NP" | "SP";
  /** The name of the depression. */
  name?: string;
  /** True if the depression has been updated recently. */
  isActive?: boolean;
  /** True when the depression is classified as a subtropical cyclone. */
  isSubtropical?: boolean;
  /** Government storm ID. This will match the depression number. */
  govId?: number;
}

/** Search government-issued storms */
export interface StormSearchResultOutput {
  /** Search government-issued storms */
  results?: Array<StormSearchResultItemOutput>;
  /** The is the link to the next page of the features returned. If it's the last page, no this field. */
  nextLink?: string;
}

/** Government-issued active storm event */
export interface StormSearchResultItemOutput {
  /** Year of origination */
  year?: string;
  /** Basin identifier (AL, EP, SI, NI, CP, NP, SP) */
  basinId?: "AL" | "EP" | "SI" | "NI" | "CP" | "NP" | "SP";
  /** The name of the depression. */
  name?: string;
  /** True if the depression has been updated recently. */
  isActive?: boolean;
  /** True if the storm name has been permanently retired in the source basin. */
  isRetired?: boolean;
  /** True when the depression is classified as a subtropical cyclone. */
  isSubtropical?: boolean;
  /** Government storm ID. This will match the depression number. */
  govId?: number;
}

/** The list of Government-issued forecasts */
export interface StormForecastResultOutput {
  /** The list of Government-issued forecasts */
  results?: Array<StormForecastOutput>;
  /** The is the link to the next page of the features returned. If it's the last page, no this field. */
  nextLink?: string;
}

/** Government-issued storm forecast */
export interface StormForecastOutput {
  /** Datetime the forecast is valid, displayed in ISO8601 format. */
  dateTime?: string;
  /** Datetime the forecast was created, displayed in ISO8601 format. */
  initializedDateTime?: string;
  /** Coordinates of the storm */
  location?: LatLongPairOutput;
  /** Maximum wind gust speed associated with the storm. May be NULL. */
  maxWindGust?: WeatherValueOutput;
  /** Maximum sustained wind speed associated with the storm. May be NULL. */
  sustainedWind?: WeatherValueOutput;
  /** Possible status values include:<ul><li>Cyclonic storm</li><li>Deep depression</li><li>Depression</li><li>Extremely severe cyclonic storm</li><li>Hurricane category (1-5)</li><li>Intense tropical cyclone</li><li>Moderate tropical storm</li><li>Post-tropical cyclone</li><li>Potential tropical cyclone</li><li>Severe cyclonic storm</li><li>Severe tropical storm</li><li>Subtropical</li><li>Super cyclonic storm</li><li>Tropical cyclone</li><li>Tropical cyclone category (1-5)</li><li>Tropical depression</li><li>Tropical disturbance</li><li>Tropical storm</li><li>Typhoon</li><li>Very intense tropical cyclone</li><li>Very severe cyclonic storm</li><li>Very strong typhoon</li><li>Violent typhoon</li></ul> */
  status?: string;
  /** Contains information about the forecast window for the storm during the specified time period (not the entire cone). If windowGeometry=true in the request, this object will include geoJSON details for window geometry. */
  window?: WeatherWindowOutput;
  /** Displayed when details=true or radiiGeometry=true in the request. */
  windRadiiSummary?: Array<StormWindRadiiSummaryOutput>;
}

/** A location represented as a latitude and longitude. */
export interface LatLongPairOutput {
  /** Latitude property */
  latitude?: number;
  /** Longitude property */
  longitude?: number;
}

/** Forecast window for the storm */
export interface WeatherWindowOutput {
  /** Location of the point on the left side of the window at the time of the timeframe. */
  left?: LatLongPairOutput;
  /** Location of the point on the right side of the window at the end of the timeframe. */
  right?: LatLongPairOutput;
  /** DateTime of the beginning of the window of movement, displayed in ISO8601 format. */
  beginDateTime?: string;
  /** DateTime of the end of the window of movement, displayed in ISO8601 format. */
  endDateTime?: string;
  /** Storm status at the beginning of the window. */
  beginStatus?: string;
  /** Storm status at the end of the window. */
  endStatus?: string;
  /** Displayed when windowGeometry=true in request. GeoJSON object containing coordinates describing the window of movement during the specified timeframe. */
  geometry?: GeoJsonGeometryOutput;
}

/** A valid `GeoJSON` geometry object. The type must be one of the seven valid GeoJSON geometry types - Point, MultiPoint, LineString, MultiLineString, Polygon, MultiPolygon and GeometryCollection. Please refer to [RFC 7946](https://tools.ietf.org/html/rfc7946#section-3.1) for details. */
export interface GeoJsonGeometryOutputParent extends GeoJsonObjectOutputParent {
  type:
    | "GeoJsonGeometry"
    | "Point"
    | "MultiPoint"
    | "LineString"
    | "MultiLineString"
    | "Polygon"
    | "MultiPolygon"
    | "GeometryCollection";
}

/** A valid `GeoJSON` object. Please refer to [RFC 7946](https://tools.ietf.org/html/rfc7946#section-3) for details. */
export interface GeoJsonObjectOutputParent {
  type:
    | "GeoJsonObject"
    | "GeoJsonGeometry"
    | "Point"
    | "MultiPoint"
    | "LineString"
    | "MultiLineString"
    | "Polygon"
    | "MultiPolygon"
    | "GeometryCollection"
    | "Feature"
    | "FeatureCollection";
}

/** Displayed when details=true or radiiGeometry=true in the request. */
export interface StormWindRadiiSummaryOutput {
  /** DateTime for which the wind radii summary data is valid, displayed in ISO8601 format. */
  dateTime?: string;
  /** Wind speed associated with the radiusSectorData. */
  windSpeed?: WeatherValueOutput;
  /** Contains the information needed to plot wind radius quadrants. Bearing 0–90 = NE quadrant; 90–180 = SE quadrant; 180–270 = SW quadrant; 270–360 = NW quadrant. */
  radiusSectorData?: Array<RadiusSectorOutput>;
  /** GeoJSON object. Displayed when radiiGeometry=true in request. Describes the outline of the wind radius quadrants. */
  radiiGeometry?: GeoJsonGeometryOutput;
}

/** Bearing 0–90 = NE quadrant; 90–180 = SE quadrant; 180–270 = SW quadrant; 270–360 = NW quadrant. */
export interface RadiusSectorOutput {
  /** Bearing, in degrees, of the beginning of the quadrant. */
  beginBearing?: number;
  /** Bearing, in degrees, of the end of the quadrant. */
  endBearing?: number;
  /** The radius of the quadrant, in nautical miles. */
  range?: number;
}

/** Locations for an individual government-issued storm */
export interface StormLocationsResultOutput {
  /** Locations for an individual government-issued storm */
  results?: Array<StormLocationOutput>;
  /** The is the link to the next page of the features returned. If it's the last page, no this field. */
  nextLink?: string;
}

/** Location for an individual Government-issued storm */
export interface StormLocationOutput {
  /** Datetime the forecast is valid, displayed in ISO8601 format. */
  dateTime?: string;
  /** Coordinates of the storm */
  location?: LatLongPairOutput;
  /** Maximum wind gust speed associated with the storm. May be NULL. */
  maxWindGust?: WeatherValueOutput;
  /** Maximum sustained wind speed associated with the storm. May be NULL. */
  sustainedWind?: WeatherValueOutput;
  /** Minimum pressure associated with the storm. May be NULL. */
  minimumPressure?: WeatherValueOutput;
  /** The storm movement information. */
  movement?: WindDetailsOutput;
  /** Storm status, in English. */
  status?: string;
  /** True when the depression is classified as a subtropical cyclone. */
  isSubtropical?: boolean;
  /** True when storm may develop into a Tropical System. */
  hasTropicalPotential?: boolean;
  /** True when the storm is weakening away, and will no longer become a tropical system. */
  isPostTropical?: boolean;
  /** Displayed when details=true or radiiGeometry=true in the request. */
  windRadiiSummary?: Array<StormWindRadiiSummaryOutput>;
}

/** This object is returned from a successful Get Air Quality call. */
export interface AirQualityResultOutput {
  /** A list of all air quality results for the queried location. */
  results?: Array<AirQualityOutput>;
  /** The is the link to the next page of the features returned. If it's the last page, no this field. */
  nextLink?: string;
}

/** Information about the air quality in a specific location at a specific time. */
export interface AirQualityOutput {
  /** Date and time of the current observation displayed in ISO 8601 format, for example, 2019-10-27T19:39:57-08:00. */
  dateTime?: string;
  /** Air quality rating on a scale set by local regulating bodies. Scales can vary widely based on location. See [Wikipedia](https://en.wikipedia.org/wiki/Air_quality_index) for more information. */
  index?: number;
  /** Internationally normalized air quality rating on a scale from 0 to 300 and up, with higher numbers representing worse air quality. */
  globalIndex?: number;
  /** The pollutant with the highest concentration. */
  dominantPollutant?:
    | "Carbon Monoxide"
    | "Nitrogen Dioxide"
    | "Ozone"
    | "Particulate Matter 2.5"
    | "Particulate Matter 10"
    | "Sulfur Dioxide";
  /** One-word description of the air quality in the requested language. For example, "Excellent". */
  category?: string;
  /** A unique color corresponding to the category of this air quality result. */
  categoryColor?: string;
  /** A textual explanation of this air quality result in the requested language. */
  description?: string;
  /** Information about individual pollutants. */
  pollutants?: Array<PollutantOutput>;
}

/** Detailed information about an individual pollutant. Not returned if `pollutants`=false. */
export interface PollutantOutput {
  /** Type of pollutant. Please note that more may be added at any time. */
  type?: "CO" | "NO2" | "O3" | "PM2.5" | "PM10" | "SO2";
  /** The name of the pollutant in English. */
  name?: string;
  /** Air quality rating on a scale set by local regulating bodies. Scales can vary widely based on location. See [Wikipedia](https://en.wikipedia.org/wiki/Air_quality_index) for more information. */
  index?: number;
  /** Internationally normalized air quality rating on a scale from 0 to 300 and up, with higher numbers representing worse air quality. */
  globalIndex?: number;
  /** An object containing the number of pollutant particles per volume of air. */
  concentration?: WeatherValueOutput;
}

/** This object is returned from a successful Get Daily Air Quality Forecast call. */
export interface DailyAirQualityForecastResultOutput {
  /** A list of all daily air quality forecasts for the queried location. */
  results?: Array<DailyAirQualityOutput>;
  /** The is the link to the next page of the features returned. If it's the last page, no this field. */
  nextLink?: string;
}

/** Information about the air quality in a specific location at a specific time. */
export interface DailyAirQualityOutput {
  /** Date and time of the current observation displayed in ISO 8601 format, for example, 2019-10-27T19:39:57-08:00. */
  dateTime?: string;
  /** Air quality rating on a scale set by local regulating bodies. Scales can vary widely based on location. See [Wikipedia](https://en.wikipedia.org/wiki/Air_quality_index) for more information. */
  index?: number;
  /** Internationally normalized air quality rating on a scale from 0 to 300 and up, with higher numbers representing worse air quality. */
  globalIndex?: number;
  /** The pollutant with the highest concentration. */
  dominantPollutant?:
    | "Carbon Monoxide"
    | "Nitrogen Dioxide"
    | "Ozone"
    | "Particulate Matter 2.5"
    | "Particulate Matter 10"
    | "Sulfur Dioxide";
  /** One-word description of the air quality in the requested language. For example, "Excellent". */
  category?: string;
  /** A unique color corresponding to the category of this air quality result. */
  categoryColor?: string;
  /** A textual explanation of this air quality result in the requested language. */
  description?: string;
}

export interface DailyHistoricalActualsResultOutput {
  /** Historical actuals for each requested day. */
  results?: Array<DailyHistoricalActualsOutput>;
  /** The is the link to the next page of the features returned. If it's the last page, no this field. */
  nextLink?: string;
}

export interface DailyHistoricalActualsOutput {
  /** Date and time of the current observation displayed in ISO 8601 format, for example, 2019-10-27T19:39:57-08:00. */
  date?: string;
  /** Temperature values. */
  temperature?: WeatherValueMaxMinAvgOutput;
  /** Summary of heating or cooling degree day information. Degree days are measures of how cold or warm a location is. A degree day compares the mean (the average of the high and low) outdoor temperatures recorded for a location to a standard temperature of 65 degrees F/ 18 degree C. */
  degreeDaySummary?: DegreeDaySummaryOutput;
  /** The amount of precipitation (liquid equivalent) that has fallen. */
  precipitation?: WeatherValueOutput;
  /** The amount of snow that has fallen. */
  snowfall?: WeatherValueOutput;
  /** Snow depth. */
  snowDepth?: WeatherValueOutput;
}

/** Returned temperature values. */
export interface WeatherValueMaxMinAvgOutput {
  /** Maximum temperature for the time period. */
  maximum?: WeatherValueOutput;
  /** Minimum temperature for the time period. */
  minimum?: WeatherValueOutput;
  /** Average temperature for the time period. */
  average?: WeatherValueOutput;
}

export interface DailyHistoricalRecordsResultOutput {
  /** Historical records for each requested day. */
  results?: Array<DailyHistoricalRecordsOutput>;
  /** The is the link to the next page of the features returned. If it's the last page, no this field. */
  nextLink?: string;
}

export interface DailyHistoricalRecordsOutput {
  /** Date and time of the current observation displayed in ISO 8601 format, for example, 2019-10-27T19:39:57-08:00. */
  date?: string;
  /** Temperature value. */
  temperature?: WeatherValueYearMaxMinAvgOutput;
  /** Maximum amount of precipitation (liquid equivalent) that has fallen. */
  precipitation?: WeatherValueYearMaxOutput;
  /** Maximum snowfall. */
  snowfall?: WeatherValueYearMaxOutput;
}

/** Returned temperature values. */
export interface WeatherValueYearMaxMinAvgOutput {
  /** Maximum temperature for the time period. */
  maximum?: WeatherValueYearOutput;
  /** Minimum temperature for the time period. */
  minimum?: WeatherValueYearOutput;
  /** Average temperature for the time period. */
  average?: WeatherValueOutput;
}

export interface WeatherValueYearOutput {
  /** Rounded value. */
  value?: number;
  /** Type of unit for the returned value. */
  unit?: string;
  /** Numeric ID value associated with the type of unit being displayed. Can be used for unit translation. Please refer to [Weather services in Azure Maps](/azure/azure-maps/weather-services-concepts#daily-index-range-sets) for details. */
  unitType?: number;
  /** Year the value occurred. */
  year?: number;
}

/** Returned temperature values. */
export interface WeatherValueYearMaxOutput {
  /** Maximum temperature for the time period. */
  maximum?: WeatherValueYearOutput;
}

export interface DailyHistoricalNormalsResultOutput {
  /** Historical normals for each requested day. */
  results?: Array<DailyHistoricalNormalsOutput>;
  /** The is the link to the next page of the features returned. If it's the last page, no this field. */
  nextLink?: string;
}

export interface DailyHistoricalNormalsOutput {
  /** Date and time of the current observation displayed in ISO 8601 format, for example, 2019-10-27T19:39:57-08:00. */
  date?: string;
  /** Temperature values. */
  temperature?: WeatherValueMaxMinAvgOutput;
  /** Summary of heating or cooling degree day information */
  degreeDaySummary?: DegreeDaySummaryOutput;
  /** The amount of precipitation (liquid equivalent) that has fallen. */
  precipitation?: WeatherValueOutput;
}

/** A valid `GeoJSON Point` geometry type. Please refer to [RFC 7946](https://tools.ietf.org/html/rfc7946#section-3.1.2) for details. */
export interface GeoJsonPointOutput
  extends GeoJsonGeometryOutputParent,
    GeoJsonPointDataOutput {
  type: "Point";
}

/** Data contained by a `GeoJson Point`. */
export interface GeoJsonPointDataOutput {
  /** A `Position` is an array of numbers with two or more elements. The first two elements are _longitude_ and _latitude_, precisely in that order. _Altitude/Elevation_ is an optional third element. Please refer to [RFC 7946](https://tools.ietf.org/html/rfc7946#section-3.1.1) for details. */
  coordinates: Array<number>;
}

/** A valid `GeoJSON MultiPoint` geometry type. Please refer to [RFC 7946](https://tools.ietf.org/html/rfc7946#section-3.1.3) for details. */
export interface GeoJsonMultiPointOutput
  extends GeoJsonGeometryOutputParent,
    GeoJsonMultiPointDataOutput {
  type: "MultiPoint";
}

/** Data contained by a `GeoJson MultiPoint`. */
export interface GeoJsonMultiPointDataOutput {
  /** Coordinates for the `GeoJson MultiPoint` geometry. */
  coordinates: Array<Array<number>>;
}

/** A valid `GeoJSON LineString` geometry type. Please refer to [RFC 7946](https://tools.ietf.org/html/rfc7946#section-3.1.4) for details. */
export interface GeoJsonLineStringOutput
  extends GeoJsonGeometryOutputParent,
    GeoJsonLineStringDataOutput {
  type: "LineString";
}

export interface GeoJsonLineStringDataOutput {
  /** Coordinates for the `GeoJson LineString` geometry. */
  coordinates: Array<Array<number>>;
}

/** A valid `GeoJSON MultiLineString` geometry type. Please refer to [RFC 7946](https://tools.ietf.org/html/rfc7946#section-3.1.5) for details. */
export interface GeoJsonMultiLineStringOutput
  extends GeoJsonGeometryOutputParent,
    GeoJsonMultiLineStringDataOutput {
  type: "MultiLineString";
}

export interface GeoJsonMultiLineStringDataOutput {
  /** Coordinates for the `GeoJson MultiLineString` geometry. */
  coordinates: Array<Array<Array<number>>>;
}

/** A valid `GeoJSON Polygon` geometry type. Please refer to [RFC 7946](https://tools.ietf.org/html/rfc7946#section-3.1.6) for details. */
export interface GeoJsonPolygonOutput
  extends GeoJsonGeometryOutputParent,
    GeoJsonPolygonDataOutput {
  type: "Polygon";
}

export interface GeoJsonPolygonDataOutput {
  /** Coordinates for the `GeoJson Polygon` geometry type. */
  coordinates: Array<Array<Array<number>>>;
}

/** A valid `GeoJSON MultiPolygon` object type. Please refer to [RFC 7946](https://tools.ietf.org/html/rfc7946#section-3.1.7) for details. */
export interface GeoJsonMultiPolygonOutput
  extends GeoJsonGeometryOutputParent,
    GeoJsonMultiPolygonDataOutput {
  type: "MultiPolygon";
}

export interface GeoJsonMultiPolygonDataOutput {
  /** Contains a list of valid `GeoJSON Polygon` objects. **Note** that coordinates in GeoJSON are in x, y order (longitude, latitude). */
  coordinates: Array<Array<Array<Array<number>>>>;
}

/** A valid `GeoJSON GeometryCollection` object type. Please refer to [RFC 7946](https://tools.ietf.org/html/rfc7946#section-3.1.8) for details. */
export interface GeoJsonGeometryCollectionOutput
  extends GeoJsonGeometryOutputParent,
    GeoJsonGeometryCollectionDataOutput {
  type: "GeometryCollection";
}

export interface GeoJsonGeometryCollectionDataOutput {
  /** Contains a list of valid `GeoJSON` geometry objects. **Note** that coordinates in GeoJSON are in x, y order (longitude, latitude). */
  geometries: Array<GeoJsonGeometryOutput>;
}

/** A valid `GeoJSON Feature` object type. Please refer to [RFC 7946](https://tools.ietf.org/html/rfc7946#section-3.2) for details. */
export interface GeoJsonFeatureOutput
  extends GeoJsonObjectOutputParent,
    GeoJsonFeatureDataOutput {
  type: "Feature";
}

export interface GeoJsonFeatureDataOutput {
  /** A valid `GeoJSON` geometry object. The type must be one of the seven valid GeoJSON geometry types - Point, MultiPoint, LineString, MultiLineString, Polygon, MultiPolygon and GeometryCollection. Please refer to [RFC 7946](https://tools.ietf.org/html/rfc7946#section-3.1) for details. */
  geometry: GeoJsonGeometryOutput;
  /** Properties can contain any additional metadata about the `Feature`. Value can be any JSON object or a JSON null value */
  properties?: Record<string, unknown>;
  /** Identifier for the feature. */
  id?: string;
  /** The type of the feature. The value depends on the data model the current feature is part of. Some data models may have an empty value. */
  featureType?: string;
}

/** A valid `GeoJSON FeatureCollection` object type. Please refer to [RFC 7946](https://tools.ietf.org/html/rfc7946#section-3.3) for details. */
export interface GeoJsonFeatureCollectionOutput
  extends GeoJsonObjectOutputParent,
    GeoJsonFeatureCollectionDataOutput {
  type: "FeatureCollection";
}

export interface GeoJsonFeatureCollectionDataOutput {
  /** Contains a list of valid `GeoJSON Feature` objects. */
  features: Array<GeoJsonFeatureOutput>;
}

/** A valid `GeoJSON` geometry object. The type must be one of the seven valid GeoJSON geometry types - Point, MultiPoint, LineString, MultiLineString, Polygon, MultiPolygon and GeometryCollection. Please refer to [RFC 7946](https://tools.ietf.org/html/rfc7946#section-3.1) for details. */
export type GeoJsonGeometryOutput =
  | GeoJsonGeometryOutputParent
  | GeoJsonPointOutput
  | GeoJsonMultiPointOutput
  | GeoJsonLineStringOutput
  | GeoJsonMultiLineStringOutput
  | GeoJsonPolygonOutput
  | GeoJsonMultiPolygonOutput
  | GeoJsonGeometryCollectionOutput;
/** A valid `GeoJSON` object. Please refer to [RFC 7946](https://tools.ietf.org/html/rfc7946#section-3) for details. */
export type GeoJsonObjectOutput =
  | GeoJsonGeometryOutput
  | GeoJsonPointOutput
  | GeoJsonMultiPointOutput
  | GeoJsonLineStringOutput
  | GeoJsonMultiLineStringOutput
  | GeoJsonPolygonOutput
  | GeoJsonMultiPolygonOutput
  | GeoJsonGeometryCollectionOutput
  | GeoJsonFeatureOutput
  | GeoJsonFeatureCollectionOutput;

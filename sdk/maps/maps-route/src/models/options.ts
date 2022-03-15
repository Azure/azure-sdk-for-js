// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CommonClientOptions, OperationOptions } from "@azure/core-client";
import {
  AlternativeRouteType,
  ComputeTravelTime,
  InclineLevel,
  Report,
  RouteAvoidType,
  RouteInstructionsType,
  RouteRepresentationForBestOrder,
  RouteType,
  SectionType,
  TravelMode,
  VehicleEngineType,
  VehicleLoadType,
  WindingnessLevel,
} from "src/generated";
import { GeoJsonMultiPoint, LatLon } from "@azure/maps-common";

/**
 * Client options used to configure the Maps Route Client
 */
export type MapsRouteClientOptions = CommonClientOptions;

/**
 * Base options for route operations
 */
export interface RouteBaseOptions {
  /** The date and time of departure from the origin point. */
  departAt?: Date;
  /** Weight per axle of the vehicle in kg. A value of 0 means that weight restrictions per axle are not considered. */
  vehicleAxleWeight?: number;
  /** Length of the vehicle in meters. A value of 0 means that length restrictions are not considered. */
  vehicleLength?: number;
  /** Height of the vehicle in meters. A value of 0 means that height restrictions are not considered. */
  vehicleHeight?: number;
  /** Width of the vehicle in meters. A value of 0 means that width restrictions are not considered. */
  vehicleWidth?: number;
  /**
   * Maximum speed of the vehicle in km/hour.
   * The max speed in the vehicle profile is used to check whether a vehicle is allowed on motorways.
   *
   * A value of 0 means that an appropriate value for the vehicle will be determined and applied during route planning.
   *
   * A non-zero value may be overridden during route planning.
   * For example, when the current traffic flow is 60 km/hour:
   *   If the vehicle maximum speed is set to 50 km/hour, the routing engine will consider 60 km/hour as this is the current situation.
   *   If the maximum speed of the vehicle is provided as 80 km/hour, then routing engine will again use 60 km/hour.
   */
  vehicleMaxSpeed?: number;
  /** Weight of the vehicle in kilograms. */
  vehicleWeight?: number;
  /** Level of turns for thrilling route. This parameter can only be used in conjunction with `routeType`=thrilling. */
  windingness?: WindingnessLevel;
  /** Degree of hilliness for thrilling route. This parameter can only be used in conjunction with `routeType`=thrilling. */
  inclineLevel?: InclineLevel;
  /** The mode of travel for the requested route. If not defined, default is 'car'.
   *
   * Note that the requested travelMode may not be available for the entire route.
   * Where the requested travelMode is not available for a particular section, the travelMode element of the response for that section will be "other".
   *
   */
  travelMode?: TravelMode;
  /** Specifies something that the route calculation should try to avoid when determining the route. */
  avoid?: RouteAvoidType[];
  /**
   * Possible values:
   *   * true - Do consider all available traffic information during routing
   *   * false - Ignore current traffic data during routing. Note that although the current traffic data is ignored
   *   during routing, the effect of historic traffic on effective road speeds is still incorporated.
   */
  useTrafficData?: boolean;
  /** The type of route requested. */
  routeType?: RouteType;
  /**
   * Types of cargo that may be classified as hazardous materials and restricted from some roads.
   * This parameter is currently only considered for travelMode=truck.
   */
  vehicleLoadType?: VehicleLoadType;
  /** Whether the vehicle is used for commercial purposes. Commercial vehicles may not be allowed to drive on some roads. */
  isCommercialVehicle?: boolean;
  /** Engine type of the vehicle. When a detailed Consumption Model is specified, it must be consistent with the value of **vehicleEngineType**. */
  vehicleEngineType?: VehicleEngineType;
  // [TODO] Check content
  /**
   *
   * Specifies the speed-dependent component of consumption.
   *
   * Provided as an unordered list of colon-delimited speed & consumption-rate pairs. The list defines points on a consumption curve. Consumption rates for speeds not in the list are found as follows:
   *
   *  * by linear interpolation, if the given speed lies in between two speeds in the list
   *
   *  * by linear extrapolation otherwise, assuming a constant (ΔConsumption/ΔSpeed) determined by the nearest two points in the list
   *
   * The list must contain between 1 and 25 points (inclusive), and may not contain duplicate points for the same speed. If it only contains a single point, then the consumption rate of that point is used without further processing.
   *
   * Consumption specified for the largest speed must be greater than or equal to that of the penultimate largest speed. This ensures that extrapolation does not lead to negative consumption rates.
   *
   * Similarly, consumption values specified for the two smallest speeds in the list cannot lead to a negative consumption rate for any smaller speed.
   *
   * The valid range for the consumption values(expressed in l/100km) is between 0.01 and 100000.0.
   *
   * Sensible Values : 50,6.3:130,11.5
   *
   * **Note** : This parameter is required for **The Combustion Consumption Model**.
   */
  constantSpeedConsumptionInLitersPerHundredKm?: string;
  /** Specifies the current supply of fuel in liters. */
  currentFuelInLiters?: number;
  /**
   * Specifies the amount of fuel consumed for sustaining auxiliary systems of the vehicle, in liters per hour.
   *
   * It can be used to specify consumption due to devices and systems such as AC systems, radio, heating, etc.
   *
   * Sensible Values : 0.2
   */
  auxiliaryPowerInLitersPerHour?: number;
  // [TODO] Check content
  /**
   * Specifies the amount of chemical energy stored in one liter of fuel in megajoules (MJ).
   * It is used in conjunction with the ***Efficiency** parameters for conversions between saved or consumed energy and fuel.
   * For example, energy density is 34.2 MJ/l for gasoline, and 35.8 MJ/l for Diesel fuel.
   *
   * This parameter is required if any ***Efficiency** parameter is set.
   *
   * Sensible Values : 34.2
   */
  fuelEnergyDensityInMegajoulesPerLiter?: number;
  /**
   * Specifies the efficiency of converting chemical energy stored in fuel to kinetic energy when the vehicle accelerates.
   *
   * Must be paired with **decelerationEfficiency**.
   *
   * The range of values allowed are 0.0 to 1/**decelerationEfficiency**.
   *
   * Sensible Values : for **Combustion Model** : 0.33, for **Electric Model** : 0.66
   */
  accelerationEfficiency?: number;
  /**
   * Specifies the efficiency of converting kinetic energy to saved (not consumed) fuel when the vehicle decelerates.
   *
   * Must be paired with **accelerationEfficiency**.
   *
   * The range of values allowed are 0.0 to 1/**accelerationEfficiency**.
   *
   * Sensible Values : for **Combustion Model** : 0.83, for **Electric Model** : 0.91
   */
  decelerationEfficiency?: number;
  /**
   * Specifies the efficiency of converting chemical energy stored in fuel to potential energy when the vehicle gains elevation _(i.e. PotentialEnergyGained/ChemicalEnergyConsumed).
   *
   * Must be paired with **downhillEfficiency**.
   *
   * The range of values allowed are 0.0 to 1/**downhillEfficiency**.
   *
   * Sensible Values : for **Combustion Model** : 0.27, for **Electric Model** : 0.74
   */
  uphillEfficiency?: number;
  /**
   * Specifies the efficiency of converting potential energy to saved (not consumed) fuel when the vehicle loses elevation.
   *
   * Must be paired with **uphillEfficiency**.
   *
   * The range of values allowed are 0.0 to 1/**uphillEfficiency**.
   *
   * Sensible Values : for **Combustion Model** : 0.51, for **Electric Model** : 0.73
   */
  downhillEfficiency?: number;
  // [TODO]
  /**
   * Specifies the speed-dependent component of consumption.
   *
   * Provided as an unordered list of speed/consumption-rate pairs. The list defines points on a consumption curve. Consumption rates for speeds not in the list are found as follows:
   *
   * * by linear interpolation, if the given speed lies in between two speeds in the list
   *
   * * by linear extrapolation otherwise, assuming a constant (ΔConsumption/ΔSpeed) determined by the nearest two points in the list
   *
   * The list must contain between 1 and 25 points (inclusive), and may not contain duplicate points for the same speed. If it only contains a single point, then the consumption rate of that point is used without further processing.
   *
   * Consumption specified for the largest speed must be greater than or equal to that of the penultimate largest speed. This ensures that extrapolation does not lead to negative consumption rates.
   *
   * Similarly, consumption values specified for the two smallest speeds in the list cannot lead to a negative consumption rate for any smaller  speed.
   *
   * The valid range for the consumption values(expressed in kWh/100km) is between 0.01 and 100000.0.
   *
   * Sensible Values : 50,8.2:130,21.3
   *
   * This parameter is required for **Electric consumption model**.
   */
  constantSpeedConsumptionInKwHPerHundredKm?: string;
  /**
   * Specifies the current electric energy supply in kilowatt hours (kWh).
   *
   * This parameter co-exists with **maxChargeInKwHS** parameter.
   *
   * The range of values allowed are 0.0 to **maxChargeInKwH**.
   *
   * Sensible Values : 43
   */
  currentChargeInKwH?: number;
  /**
   * Specifies the maximum electric energy supply in kilowatt hours (kWh) that may be stored in the vehicle's battery.
   *
   * This parameter co-exists with **currentChargeInKwH** parameter.
   *
   * Minimum value has to be greater than or equal to **currentChargeInKwH**.
   *
   * Sensible Values : 85
   */
  maxChargeInKwH?: number;
  /**
   * Specifies the amount of power consumed for sustaining auxiliary systems, in kilowatts (kW).
   *
   * It can be used to specify consumption due to devices and systems such as AC systems, radio, heating, etc.
   *
   * Sensible Values : 1.7
   */
  auxiliaryPowerInKw?: number;
}

/**
 * Options for retrieving route directions
 */
export interface RouteDirectionsOptions extends RouteBaseOptions {
  /** Specifies whether to return additional travel times using different types of traffic information (none, historic, live) as well as the default best-estimate travel time. */
  computeTravelTime?: ComputeTravelTime;
  /**
   * Specifies which of the section types is reported in the route response.
   *
   * For example if sectionType = pedestrian the sections which are suited for pedestrians only are returned.
   * The default sectionType refers to the travelMode input. By default travelMode is set to car
   */
  filterSectionType?: SectionType;
  /** The date and time of arrival at the destination point.*/
  arriveAt?: Date;
  /** Number of desired alternative routes to be calculated. Default: 0, minimum: 0 and maximum: 5 */
  maxAlternatives?: number;
  /** Controls the optimality, with respect to the given planning criteria, of the calculated alternatives compared to the reference route. */
  alternativeType?: AlternativeRouteType;
  /**
   * All alternative routes returned will follow the reference route from the origin point of the calculateRoute request for at least this number of meters.
   * Can only be used when reconstructing a route. The minDeviationDistance parameter cannot be used in conjunction with arriveAt.
   */
  minDeviationDistance?: number;
  /**
   * All alternative routes returned will follow the reference route from the origin point of the calculateRoute request for at least this number of seconds.
   * Can only be used when reconstructing a route. The minDeviationTime parameter cannot be used in conjunction with arriveAt.
   *
   * Default value is 0.
   */
  minDeviationTime?: number;
  // [TODO] content check
  /** If specified, guidance instructions will be returned. Note that the instructionsType parameter cannot be used in conjunction with routeRepresentation=none */
  instructionsType?: RouteInstructionsType;
  /**
   * The language parameter determines the language of the guidance messages.
   * Proper nouns (the names of streets, plazas, etc.) are returned in the specified language, or if that is not available,
   * they are returned in an available language that is close to it.
   *
   * Allowed values are (a subset of) the IETF language tags.
   * The currently supported languages are listed in the [Supported languages section](https://docs.microsoft.com/azure/azure-maps/supported-languages).
   *
   * Default value: en-GB
   */
  language?: string;
  /**
   * Re-order the route waypoints using a fast heuristic algorithm to reduce the route length. Yields best results when used in conjunction with routeType _shortest_.
   *
   * Notice that origin and destination are excluded from the optimized waypoint indices.
   * To include origin and destination in the response, please increase all the indices by 1 to account for the origin,
   * and then add the destination as the final index.
   *
   * Possible values are true or false.
   *
   * True computes a better order if possible, but is not allowed to be used in conjunction with maxAlternatives value greater than 0 or in conjunction with circle waypoints.
   * False will use the locations in the given order and not allowed to be used in conjunction with routeRepresentation _none_.
   */
  computeBestWaypointOrder?: boolean;
  /** Specifies the representation of the set of routes provided as response. This parameter value can only be used in conjunction with computeBestOrder=true. */
  routeRepresentationForBestOrder?: RouteRepresentationForBestOrder;
  /**
   * The directional heading of the vehicle in degrees starting at true North and continuing in clockwise direction.
   * North is 0 degrees, east is 90 degrees, south is 180 degrees, west is 270 degrees. Possible values 0-359
   */
  vehicleHeading?: number;
  /** Specifies which data should be reported for diagnosis purposes. */
  report?: Report;
}

/**
 * RequireOnlyOne helps create a type where only one of the properties of an interface (can be any property) is required to exist.
 */
export type RequireOnlyOne<T> = {
  [K in keyof T]-?: Required<Pick<T, K>> & Partial<Record<Exclude<keyof T, K>, undefined>>;
}[keyof T];

/**
 * Budget for the route range request. One and only one budget must be provided.
 */
export type RouteRangeBudget = RequireOnlyOne<{
  /**
   * Fuel budget in liters that determines maximal range which can be travelled using the specified Combustion Consumption Model.
   * When fuelBudgetInLiters is used, it is mandatory to specify a detailed Combustion Consumption Model.
   *
   * Exactly one budget (fuelBudgetInLiters, energyBudgetInKwH, timeBudgetInSec, or distanceBudgetInMeters) must be used.
   */
  fuelBudgetInLiters?: number;
  /**
   * Electric energy budget in kilowatt hours (kWh) that determines maximal range which can be travelled using the specified Electric Consumption Model.
   * When energyBudgetInkWh is used, it is mandatory to specify a detailed Electric Consumption Model.
   *
   * Exactly one budget (fuelBudgetInLiters, energyBudgetInKwH, timeBudgetInSec, or distanceBudgetInMeters) must be used.
   */
  energyBudgetInKwH?: number;
  /**
   * Time budget in seconds that determines maximal range which can be travelled using driving time.
   * The Consumption Model will only affect the range when routeType is eco.
   *
   * Exactly one budget (fuelBudgetInLiters, energyBudgetInKwH, timeBudgetInSec, or distanceBudgetInMeters) must be used.
   */
  timeBudgetInSec?: number;
  /**
   * Distance budget in meters that determines maximal range which can be travelled using driving distance.
   * The Consumption Model will only affect the range when routeType is eco.
   *
   * Exactly one budget (fuelBudgetInLiters, energyBudgetInKwH, timeBudgetInSec, or distanceBudgetInMeters) must be used.
   */
  distanceBudgetInMeters?: number;
}>;

/** Options for retrieving route range */
export type RouteRangeOptions = RouteBaseOptions & OperationOptions;

/**
 * Options for batch operation poller
 */
export interface BatchPollerOptions {
  /**
   * Time between each polling in milliseconds.
   */
  updateIntervalInMs?: number;
  /**
   * A serialized poller, used to resume an existing operation
   */
  resumeFrom?: string;
}

/** Options for requesting route matrix */
export interface RouteMatrixOptions extends OperationOptions {
  /** Specifies whether to return additional travel times using different types of traffic information (none, historic, live) as well as the default best-estimate travel time. */
  computeTravelTime?: ComputeTravelTime;
  /**
   * Specifies which of the section types is reported in the route response.
   *
   * For example if sectionType = pedestrian the sections which are suited for pedestrians only are returned.
   * The default sectionType refers to the travelMode input. By default travelMode is set to car
   */
  filterSectionType?: SectionType;
  /** The date and time of arrival at the destination point.*/
  arriveAt?: Date;
  /** The date and time of departure from the origin point. */
  departAt?: Date;
  /** Weight per axle of the vehicle in kg. A value of 0 means that weight restrictions per axle are not considered. */
  vehicleAxleWeight?: number;
  /** Length of the vehicle in meters. A value of 0 means that length restrictions are not considered. */
  vehicleLength?: number;
  /** Height of the vehicle in meters. A value of 0 means that height restrictions are not considered. */
  vehicleHeight?: number;
  /** Width of the vehicle in meters. A value of 0 means that width restrictions are not considered. */
  vehicleWidth?: number;
  /**
   * Maximum speed of the vehicle in km/hour.
   * The max speed in the vehicle profile is used to check whether a vehicle is allowed on motorways.
   *
   * A value of 0 means that an appropriate value for the vehicle will be determined and applied during route planning.
   *
   * A non-zero value may be overridden during route planning.
   * For example, when the current traffic flow is 60 km/hour:
   *   If the vehicle maximum speed is set to 50 km/hour, the routing engine will consider 60 km/hour as this is the current situation.
   *   If the maximum speed of the vehicle is provided as 80 km/hour, then routing engine will again use 60 km/hour.
   */
  vehicleMaxSpeed?: number;
  /** Weight of the vehicle in kilograms. */
  vehicleWeight?: number;
  /** Level of turns for thrilling route. This parameter can only be used in conjunction with `routeType`=thrilling. */
  windingness?: WindingnessLevel;
  /** Degree of hilliness for thrilling route. This parameter can only be used in conjunction with `routeType`=thrilling. */
  inclineLevel?: InclineLevel;
  /** The mode of travel for the requested route. If not defined, default is 'car'.
   *
   * Note that the requested travelMode may not be available for the entire route.
   * Where the requested travelMode is not available for a particular section, the travelMode element of the response for that section will be "other".
   *
   */
  travelMode?: TravelMode;
  /** Specifies something that the route calculation should try to avoid when determining the route. */
  avoid?: RouteAvoidType[];
  /**
   * Possible values:
   *   * true - Do consider all available traffic information during routing
   *   * false - Ignore current traffic data during routing. Note that although the current traffic data is ignored
   *   during routing, the effect of historic traffic on effective road speeds is still incorporated.
   */
  useTrafficData?: boolean;
  /** The type of route requested. */
  routeType?: RouteType;
  /**
   * Types of cargo that may be classified as hazardous materials and restricted from some roads.
   * This parameter is currently only considered for travelMode=truck.
   */
  vehicleLoadType?: VehicleLoadType;
}

/** Options for requesting route directions in batch */
export interface RouteDirectionsBatchOptions extends OperationOptions {}

/**
 * Request object containing parameters for making route directions calls
 */
export interface RouteDirectionsRequest {
  routePoints: LatLon[];
  options?: RouteDirectionsOptions;
}

/** Route matrix query object which contains a set of origin and destination locations */
export interface RouteMatrixQuery {
  /** A set of origin locations represented by a GeoJsonMultiPoint object. At least one origin is required. */
  origins: GeoJsonMultiPoint;
  /** A set of destination locations represented by a GeoJsonMultiPoint object. At least one destination is required. */
  destinations: GeoJsonMultiPoint;
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** This object is returned from a successful Route Matrix call. For ex, if 2 origins and 3 destinations are provided, there are going to 2 arrays with 3 elements in each. Each element's content depends on the options provided in the query. */
export interface RouteMatrixResultOutput {
  /** Format Version property */
  formatVersion?: string;
  /** Results as a 2 dimensional array of route summaries. */
  matrix: Array<Array<RouteMatrixOutput>>;
  /** Summary object */
  summary: RouteMatrixSummaryOutput;
}

/** Matrix result object */
export interface RouteMatrixOutput {
  /** StatusCode property for the current cell in the input matrix. */
  statusCode: number;
  /** Response object of the current cell in the input matrix. */
  response?: RouteMatrixResultResponseOutput;
}

/** Response object of the current cell in the input matrix. */
export interface RouteMatrixResultResponseOutput {
  /** Summary object */
  routeSummary?: RouteSummaryOutput;
}

/** Summary object */
export interface RouteSummaryOutput {
  /** Length In Meters property */
  lengthInMeters: number;
  /** Estimated travel time in seconds property that includes the delay due to real-time traffic. Note that even when traffic=false travelTimeInSeconds still includes the delay due to traffic. If DepartAt is in the future, travel time is calculated using time-dependent historic traffic data. */
  travelTimeInSeconds: number;
  /** Estimated delay in seconds caused by the real-time incident(s) according to traffic information. For routes planned with departure time in the future, delays is always 0. To return additional travel times using different types of traffic information, parameter computeTravelTimeFor=all needs to be added. */
  trafficDelayInSeconds: number;
  /** The estimated departure time for the route or leg. */
  departureTime: string;
  /** The estimated arrival time for the route or leg. */
  arrivalTime: string;
}

/** Summary object */
export interface RouteMatrixSummaryOutput {
  /** Number of successful routes in the response. */
  successfulRoutes: number;
  /** Total number of routes requested. Number of cells in the input matrix. */
  totalRoutes: number;
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
}

/** This object is returned from a successful Route Directions call */
export interface RouteDirectionsOutput {
  /** Format Version property */
  formatVersion?: string;
  /** Routes array */
  routes: Array<RouteOutput>;
  /**
   * Optimized sequence of waypoints. It shows the index from the user provided waypoint sequence for the original and optimized list. For instance, a response:
   *
   * ```
   * <optimizedWaypoints>
   * <waypoint providedIndex="0" optimizedIndex="1"/>
   * <waypoint providedIndex="1" optimizedIndex="2"/>
   * <waypoint providedIndex="2" optimizedIndex="0"/>
   * </optimizedWaypoints>
   * ```
   *
   * means that the original sequence is [0, 1, 2] and optimized sequence is [1, 2, 0]. Since the index starts by 0 the original is "first, second, third" while the optimized is "second, third, first".
   */
  optimizedWaypoints?: Array<RouteOptimizedWaypointOutput>;
  /** Reports the effective settings used in the current call. */
  report?: RouteReportOutput;
}

export interface RouteOutput {
  /** Summary object */
  summary: RouteSummaryOutput;
  /** Legs array */
  legs: Array<RouteLegOutput>;
  /** Sections array */
  sections?: Array<RouteSectionOutput>;
  /** Contains guidance related elements. This field is present only when guidance was requested and is available. */
  guidance?: RouteGuidanceOutput;
}

/** A description of a part of a route, comprised of a list of points. Each additional waypoint provided in the request will result in an additional leg in the returned route. */
export interface RouteLegOutput {
  /** Summary object */
  summary: RouteSummaryOutput;
  /** Points array */
  points: Array<LatLongPairOutput>;
}

/** A location represented as a latitude and longitude. */
export interface LatLongPairOutput {
  /** Latitude property */
  latitude: number;
  /** Longitude property */
  longitude: number;
}

/** Route sections contain additional information about parts of a route. Each section contains at least the elements `startPointIndex`, `endPointIndex`, and `sectionType`. */
export interface RouteSectionOutput {
  /** Index of the first point (offset 0) in the route this section applies to. */
  startPointIndex: number;
  /** Index of the last point (offset 0) in the route this section applies to. */
  endPointIndex: number;
  /** Section types of the reported route response */
  sectionType:
    | "CAR_TRAIN"
    | "COUNTRY"
    | "FERRY"
    | "MOTORWAY"
    | "PEDESTRIAN"
    | "TOLL_ROAD"
    | "TOLL_VIGNETTE"
    | "TRAFFIC"
    | "TRAVEL_MODE"
    | "TUNNEL"
    | "CARPOOL"
    | "URBAN";
  /** Travel mode for the calculated route. The value will be set to `other` if the requested mode of transport is not possible in this section */
  travelMode?:
    | "car"
    | "truck"
    | "taxi"
    | "bus"
    | "van"
    | "motorcycle"
    | "bicycle"
    | "pedestrian"
    | "other";
  /** Type of the incident. Can currently be JAM, ROAD_WORK, ROAD_CLOSURE, or OTHER. See "tec" for detailed information. */
  simpleCategory?: "JAM" | "ROAD_WORK" | "ROAD_CLOSURE" | "OTHER";
  /** Effective speed of the incident in km/h, averaged over its entire length. */
  effectiveSpeedInKmh?: number;
  /** Delay in seconds caused by the incident. */
  delayInSeconds?: number;
  /** The magnitude of delay caused by the incident. These values correspond to the values of the response field ty of the [Get Traffic Incident Detail API](https://docs.microsoft.com/rest/api/maps/traffic/gettrafficincidentdetail). */
  magnitudeOfDelay?: "0" | "1" | "2" | "3" | "4";
  /** Details of the traffic event, using definitions in the [TPEG2-TEC](https://www.iso.org/standard/63116.html) standard. Can contain effectCode and causes elements. */
  tec?: RouteSectionTecOutput;
}

/** Details of the traffic event, using definitions in the [TPEG2-TEC](https://www.iso.org/standard/63116.html) standard. Can contain effectCode and causes elements. */
export interface RouteSectionTecOutput {
  /** The effect on the traffic flow. Contains a value in the tec001:EffectCode table, as defined in the [TPEG2-TEC](https://www.iso.org/standard/63116.html) standard. Can be used to color-code traffic events according to severity. */
  effectCode?: number;
  /** Causes array */
  causes?: Array<RouteSectionTecCauseOutput>;
}

/** The cause of the traffic event. Can contain mainCauseCode and subCauseCode elements. Can be used to define iconography and descriptions. */
export interface RouteSectionTecCauseOutput {
  /** The main cause of the traffic event. Contains a value in the tec002:CauseCode table, as defined in the [TPEG2-TEC](https://www.iso.org/standard/63116.html) standard. */
  mainCauseCode?: number;
  /** The subcause of the traffic event. Contains a value in the sub cause table defined by the mainCauseCode, as defined in the [TPEG2-TEC](https://www.iso.org/standard/63116.html) standard. */
  subCauseCode?: number;
}

/** Contains guidance related elements. This field is present only when guidance was requested and is available. */
export interface RouteGuidanceOutput {
  /** A list of instructions describing maneuvers. */
  instructions: Array<RouteInstructionOutput>;
  /** Groups a sequence of instruction elements which are related to each other. */
  instructionGroups: Array<RouteInstructionGroupOutput>;
}

/** A set of attributes describing a maneuver, e.g. 'Turn right', 'Keep left', 'Take the ferry', 'Take the motorway', 'Arrive'. */
export interface RouteInstructionOutput {
  /** Distance from the start of the route to the point of the instruction. */
  routeOffsetInMeters?: number;
  /** Estimated travel time up to the point corresponding to routeOffsetInMeters. */
  travelTimeInSeconds?: number;
  /** A location represented as a latitude and longitude. */
  point?: LatLongPairOutput;
  /** The index of the point in the list of polyline "points" corresponding to the point of the instruction. */
  pointIndex?: number;
  /** Type of the instruction, e.g., turn or change of road form. */
  instructionType?:
    | "TURN"
    | "ROAD_CHANGE"
    | "LOCATION_DEPARTURE"
    | "LOCATION_ARRIVAL"
    | "DIRECTION_INFO"
    | "LOCATION_WAYPOINT";
  /** The road number(s) of the next significant road segment(s) after the maneuver, or of the road(s) to be followed. Example: ["E34", "N205"] */
  roadNumbers?: Array<string>;
  /** The number(s) of a highway exit taken by the current maneuver. If an exit has multiple exit numbers, they will be separated by "," and possibly aggregated by "-", e.g., "10, 13-15". */
  exitNumber?: string;
  /** Street name of the next significant road segment after the maneuver, or of the street that should be followed. */
  street?: string;
  /** The text on a signpost which is most relevant to the maneuver, or to the direction that should be followed. */
  signpostText?: string;
  /** 3-character [ISO 3166-1](https://www.iso.org/iso-3166-country-codes.html) alpha-3 country code. E.g. USA. */
  countryCode?: string;
  /** A subdivision (e.g., state) of the country, represented by the second part of an [ISO 3166-2](https://www.iso.org/standard/63546.html) code. This is only available for some countries like the US, Canada, and Mexico. */
  stateCode?: string;
  /** The type of the junction where the maneuver takes place. For larger roundabouts, two separate instructions are generated for entering and leaving the roundabout. */
  junctionType?: "REGULAR" | "ROUNDABOUT" | "BIFURCATION";
  /**
   * Indicates the direction of an instruction. If junctionType indicates a turn instruction:
   *
   *   * 180 = U-turn
   *   * [-179, -1] = Left turn
   *   * 0 = Straight on (a '0 degree' turn)
   *   * [1, 179] = Right turn
   *
   * If junctionType indicates a bifurcation instruction:
   *
   *   * <0 - keep left
   *   * \>0 - keep right
   */
  turnAngleInDecimalDegrees?: number;
  /** This indicates which exit to take at a roundabout. */
  roundaboutExitNumber?: string;
  /** It is possible to optionally combine the instruction with the next one. This can be used to build messages like "Turn left and then turn right". */
  possibleCombineWithNext?: boolean;
  /** Indicates left-hand vs. right-hand side driving at the point of the maneuver. */
  drivingSide?: "LEFT" | "RIGHT";
  /** A code identifying the maneuver. */
  maneuver?:
    | "ARRIVE"
    | "ARRIVE_LEFT"
    | "ARRIVE_RIGHT"
    | "DEPART"
    | "STRAIGHT"
    | "KEEP_RIGHT"
    | "BEAR_RIGHT"
    | "TURN_RIGHT"
    | "SHARP_RIGHT"
    | "KEEP_LEFT"
    | "BEAR_LEFT"
    | "TURN_LEFT"
    | "SHARP_LEFT"
    | "MAKE_UTURN"
    | "ENTER_MOTORWAY"
    | "ENTER_FREEWAY"
    | "ENTER_HIGHWAY"
    | "TAKE_EXIT"
    | "MOTORWAY_EXIT_LEFT"
    | "MOTORWAY_EXIT_RIGHT"
    | "TAKE_FERRY"
    | "ROUNDABOUT_CROSS"
    | "ROUNDABOUT_RIGHT"
    | "ROUNDABOUT_LEFT"
    | "ROUNDABOUT_BACK"
    | "TRY_MAKE_UTURN"
    | "FOLLOW"
    | "SWITCH_PARALLEL_ROAD"
    | "SWITCH_MAIN_ROAD"
    | "ENTRANCE_RAMP"
    | "WAYPOINT_LEFT"
    | "WAYPOINT_RIGHT"
    | "WAYPOINT_REACHED";
  /** A human-readable message for the maneuver. */
  message?: string;
  /**
   * A human-readable message for the maneuver combined with the message from the next instruction. Sometimes it is possible to combine two successive instructions into a single instruction making it easier to follow. When this is the case the possibleCombineWithNext flag will be true. For example:
   *
   * ```
   * 10. Turn left onto Einsteinweg/A10/E22 towards Ring Amsterdam
   * 11. Follow Einsteinweg/A10/E22 towards Ring Amsterdam
   * ```
   *
   * The possibleCombineWithNext flag on instruction 10 is true. This indicates to the clients of coded guidance that it can be combined with instruction 11. The instructions will be combined automatically for clients requesting human-readable guidance. The combinedMessage field contains the combined message:
   *
   * ```
   * Turn left onto Einsteinweg/A10/E22 towards Ring Amsterdam
   * then follow Einsteinweg/A10/E22 towards Ring Amsterdam.
   * ```
   */
  combinedMessage?: string;
}

/** Groups a sequence of instruction elements which are related to each other. The sequence range is constrained with firstInstructionIndex and lastInstructionIndex. When human-readable text messages are requested for guidance (instructionType=text or tagged), then the instructionGroup has a summary message returned when available. */
export interface RouteInstructionGroupOutput {
  /** Index of the first instruction in the instructions and belonging to this group. */
  firstInstructionIndex?: number;
  /** Index of the last instruction in the instructions and belonging to this group. */
  lastInstructionIndex?: number;
  /** Length of the group. */
  groupLengthInMeters?: number;
  /** Summary message when human-readable text messages are requested for guidance (instructionType=text or tagged). */
  groupMessage?: string;
}

/** Optimized way point object. */
export interface RouteOptimizedWaypointOutput {
  /** Way point index provided by the user. */
  providedIndex: number;
  /** Optimized way point index from the system. */
  optimizedIndex: number;
}

/** Reports the effective settings used in the current call. */
export interface RouteReportOutput {
  /** Effective parameters or data used when calling this Route API. */
  effectiveSettings: Array<EffectiveSettingOutput>;
}

/** Effective parameter or data used when calling this Route API. */
export interface EffectiveSettingOutput {
  /** Name of the parameter used. */
  key: string;
  /** Value of the parameter used. */
  value: string;
}

/** This object is returned from a successful Route Reachable Range call */
export interface RouteRangeResultOutput {
  /** Format Version property */
  formatVersion?: string;
  /** Reachable Range */
  reachableRange: RouteRangeOutput;
  /** Reports the effective settings used in the current call. */
  report?: RouteReportOutput;
}

/** Reachable Range */
export interface RouteRangeOutput {
  /** Center point of the reachable range */
  center: LatLongPairOutput;
  /** Polygon boundary of the reachable range represented as a list of points. */
  boundary: Array<LatLongPairOutput>;
}

/** This object is returned from a successful Route Directions Batch service call. */
export interface RouteDirectionsBatchResultOutput extends BatchResultOutput {
  /** Array containing the batch results. */
  batchItems: Array<RouteDirectionsBatchItemOutput>;
}

/** An item returned from Route Directions Batch service call. */
export interface RouteDirectionsBatchItemOutput extends BatchResultItemOutput {
  /** The result of the query. RouteDirections if the query completed successfully, ErrorResponse otherwise. */
  response: RouteDirectionsBatchItemResponseOutput;
}

/** The result of the query. RouteDirections if the query completed successfully, ErrorResponse otherwise. */
export interface RouteDirectionsBatchItemResponseOutput
  extends RouteDirectionsOutput,
    ErrorResponseOutput {}

/** An item returned from Batch API. Extend with 'response' property. */
export interface BatchResultItemOutput {
  /** HTTP request status code. */
  statusCode: number;
}

/** This object is returned from a successful Batch service call. Extend with 'batchItems' property. */
export interface BatchResultOutput {
  /** Summary of the results for the batch request */
  summary: BatchResultSummaryOutput;
}

/** Summary of the results for the batch request */
export interface BatchResultSummaryOutput {
  /** Number of successful requests in the batch */
  successfulRequests: number;
  /** Total number of requests in the batch */
  totalRequests: number;
}

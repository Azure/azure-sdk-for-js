// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  DrivingSide,
  ErrorResponse,
  GuidanceInstructionType,
  GuidanceManeuver,
  JunctionType,
  RouteInstructionGroup,
  RouteLegSummary,
  RouteOptimizedWaypoint,
  RouteReport,
  RouteSection,
  RouteSummary,
} from "src/generated/models";
import { LatLon } from "@azure/maps-common";

/** This object is returned from a successful Route Reachable Range call */
export interface RouteRangeResult {
  /**
   * Format Version property
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly formatVersion?: string;
  /** Reachable Range */
  reachableRange?: RouteRange;
  /** Reports the effective settings used in the current call. */
  report?: RouteReport;
}

/** Reachable Range */
export interface RouteRange {
  /** Center point of the reachable range */
  center?: LatLon;
  /**
   * Polygon boundary of the reachable range represented as a list of points.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly boundary?: LatLon[];
}

/** This object is returned from a successful Route Directions call */
export interface RouteDirections {
  /**
   * Format Version property
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly formatVersion?: string;
  /**
   * Routes array
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly routes?: Route[];
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
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly optimizedWaypoints?: RouteOptimizedWaypoint[];
  /** Reports the effective settings used in the current call. */
  report?: RouteReport;
}

export interface Route {
  /**
   * Summary object
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly summary: RouteSummary;
  /**
   * Legs array
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly legs: RouteLeg[];
  /**
   * Sections array
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly sections: RouteSection[];
  /**
   * Contains guidance related elements. This field is present only when guidance was requested and is available.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly guidance?: RouteGuidance;
}

/** A description of a part of a route, comprised of a list of points. Each additional waypoint provided in the request will result in an additional leg in the returned route. */
export interface RouteLeg {
  /**
   * Summary object for route section.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly summary: RouteLegSummary;
  /**
   * Points array
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly points: LatLon[];
}

/** Contains guidance related elements. This field is present only when guidance was requested and is available. */
export interface RouteGuidance {
  /**
   * A list of instructions describing maneuvers.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly instructions: RouteInstruction[];
  /**
   * Groups a sequence of instruction elements which are related to each other.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly instructionGroups: RouteInstructionGroup[];
}

/** A set of attributes describing a maneuver, e.g. 'Turn right', 'Keep left', 'Take the ferry', 'Take the motorway', 'Arrive'. */
export interface RouteInstruction {
  /**
   * Distance from the start of the route to the point of the instruction.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly routeOffsetInMeters?: number;
  /**
   * Estimated travel time up to the point corresponding to routeOffsetInMeters.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly travelTimeInSeconds?: number;
  /** A location represented as a latitude and longitude. */
  point?: LatLon;
  /**
   * The index of the point in the list of polyline "points" corresponding to the point of the instruction.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly pointIndex?: number;
  /** Type of the instruction, e.g., turn or change of road form. */
  instructionType?: GuidanceInstructionType;
  /**
   * The road number(s) of the next significant road segment(s) after the maneuver, or of the road(s) to be followed. Example: ["E34", "N205"]
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly roadNumbers?: string[];
  /**
   * The number(s) of a highway exit taken by the current maneuver. If an exit has multiple exit numbers, they will be separated by "," and possibly aggregated by "-", e.g., "10, 13-15".
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly exitNumber?: string;
  /**
   * Street name of the next significant road segment after the maneuver, or of the street that should be followed.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly street?: string;
  /**
   * The text on a signpost which is most relevant to the maneuver, or to the direction that should be followed.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly signpostText?: string;
  /**
   * 3-character [ISO 3166-1](https://www.iso.org/iso-3166-country-codes.html) alpha-3 country code. E.g. USA.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly countryCode?: string;
  /**
   * A subdivision (e.g., state) of the country, represented by the second part of an [ISO 3166-2](https://www.iso.org/standard/63546.html) code. This is only available for some countries like the US, Canada, and Mexico.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly stateCode?: string;
  /**
   * The type of the junction where the maneuver takes place. For larger roundabouts, two separate instructions are generated for entering and leaving the roundabout.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly junctionType?: JunctionType;
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
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly turnAngleInDegrees?: number;
  /**
   * This indicates which exit to take at a roundabout.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly roundaboutExitNumber?: string;
  /**
   * It is possible to optionally combine the instruction with the next one. This can be used to build messages like "Turn left and then turn right".
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly possibleCombineWithNext?: boolean;
  /**
   * Indicates left-hand vs. right-hand side driving at the point of the maneuver.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly drivingSide?: DrivingSide;
  /**
   * A code identifying the maneuver.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly maneuver?: GuidanceManeuver;
  /**
   * A human-readable message for the maneuver.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly message?: string;
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
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly combinedMessage?: string;
}

/** This object is returned from a successful Batch service call. */
export interface BatchResult<TResult> {
  /** Number of successful requests in the batch */
  readonly successfulRequests?: number;
  /** Total number of requests in the batch */
  readonly totalRequests?: number;
  /** Array containing the batch results. */
  readonly batchItems?: BatchItem<TResult>[];
}

/** An item returned from Batch service call. */
export interface BatchItem<TResult> {
  /** HTTP request status code. */
  readonly statusCode?: number;
  /** The result of the query. TResult if the query completed successfully, ErrorResponse otherwise. */
  readonly response?: TResult & ErrorResponse;
}

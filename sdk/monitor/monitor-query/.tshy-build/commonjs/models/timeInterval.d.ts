/**
 * Time Interval type for specifying timespan for querying logs and metrics.
 * A time interval is the intervening time between two time points.
 * The amount of intervening time is expressed by a duration The two time points (start and end) are expressed by either a combined date and time representation
 * or just a date representation.There are four ways to express a time interval:
 * - duration
 * - start time, end time
 * - start time, duration
 * - duration, end time
 *
 * The duration is an ISO8601 duration value in the format P[n]Y[n]M[n]DT[n]H[n]M[n]S
 * where  P is the duration designator (for period) placed at the start of the duration representation.
 *   Y is the year designator that follows the value for the number of years.
 *   M is the month designator that follows the value for the number of months.
 *   W is the week designator that follows the value for the number of weeks.
 *   D is the day designator that follows the value for the number of days.
 *   T is the time designator that precedes the time components of the representation.
 *   H is the hour designator that follows the value for the number of hours.
 *   M is the minute designator that follows the value for the number of minutes.
 *   S is the second designator that follows the value for the number of seconds.
 */
export type QueryTimeInterval = {
    /**
     * Start time for time interval
     */
    startTime: Date;
    /**
     * End time for time interval
     */
    endTime: Date;
} | {
    /**
     * Start time for time interval
     */
    startTime: Date;
    /**
     * The duration from the start time. {@link Durations} helper contains aliases for some common ISO8601 durations.
     * The duration is an ISO8601 duration value in the format P[n]Y[n]M[n]DT[n]H[n]M[n]S
     * where  P is the duration designator (for period) placed at the start of the duration representation.
     *   Y is the year designator that follows the value for the number of years.
     *   M is the month designator that follows the value for the number of months.
     *   W is the week designator that follows the value for the number of weeks.
     *   D is the day designator that follows the value for the number of days.
     *   T is the time designator that precedes the time components of the representation.
     *   H is the hour designator that follows the value for the number of hours.
     *   M is the minute designator that follows the value for the number of minutes.
     *   S is the second designator that follows the value for the number of seconds.
     */
    duration: string;
} | {
    /**
     * The duration until the end time. {@link Durations} helper contains aliases for some common ISO8601 durations.
     * The duration is an ISO8601 duration value in the format P[n]Y[n]M[n]DT[n]H[n]M[n]S
     * where  P is the duration designator (for period) placed at the start of the duration representation.
     *   Y is the year designator that follows the value for the number of years.
     *   M is the month designator that follows the value for the number of months.
     *   W is the week designator that follows the value for the number of weeks.
     *   D is the day designator that follows the value for the number of days.
     *   T is the time designator that precedes the time components of the representation.
     *   H is the hour designator that follows the value for the number of hours.
     *   M is the minute designator that follows the value for the number of minutes.
     *   S is the second designator that follows the value for the number of seconds.
     */
    duration: string;
    /**
     * end time for interval
     */
    endTime: Date;
} | {
    /**
     * The duration of a time span that ends at the time the operation is processed, e.g. events from the last 5 hours.
     * {@link Durations} helper contains aliases for some common ISO8601 durations.
     * The duration is an ISO8601 time period value in the format P[n]Y[n]M[n]DT[n]H[n]M[n]S
     * where  P is the duration designator (for period) placed at the start of the duration representation.
     *   Y is the year designator that follows the value for the number of years.
     *   M is the month designator that follows the value for the number of months.
     *   W is the week designator that follows the value for the number of weeks.
     *   D is the day designator that follows the value for the number of days.
     *   T is the time designator that precedes the time components of the representation.
     *   H is the hour designator that follows the value for the number of hours.
     *   M is the minute designator that follows the value for the number of minutes.
     *   S is the second designator that follows the value for the number of seconds.
     */
    duration: string;
};
//# sourceMappingURL=timeInterval.d.ts.map
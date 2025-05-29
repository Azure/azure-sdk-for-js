/**
 * Represents a time interval.
 *
 * @param days                 - Number of days.
 * @param hours                - Number of hours.
 * @param minutes              - Number of minutes.
 * @param seconds              - Number of seconds.
 * @param milliseconds         - Number of milliseconds.
 * @hidden
 */
export declare class TimeSpan {
    protected _ticks: number;
    constructor(days: number, hours: number, minutes: number, seconds: number, milliseconds: number);
    /**
     * Returns a new TimeSpan object whose value is the sum of the specified TimeSpan object and this instance.
     * @param ts - The time interval to add.
     */
    add(ts: TimeSpan): TimeSpan;
    /**
     * Returns a new TimeSpan object whose value is the difference of the specified TimeSpan object and this instance.
     * @param ts - The time interval to subtract.
     */
    subtract(ts: TimeSpan): TimeSpan;
    /**
     * Compares this instance to a specified object and returns an integer that indicates whether this
     * instance is shorter than, equal to, or longer than the specified object.
     * @param value - The time interval to add.
     */
    compareTo(value: TimeSpan): 1 | -1 | 0;
    /**
     * Returns a new TimeSpan object whose value is the absolute value of the current TimeSpan object.
     */
    duration(): TimeSpan;
    /**
     * Returns a value indicating whether this instance is equal to a specified object.
     * @param value - The time interval to check for equality.
     */
    equals(value: TimeSpan): boolean;
    /**
     * Returns a new TimeSpan object whose value is the negated value of this instance.
     * @param value - The time interval to check for equality.
     */
    negate(): TimeSpan;
    days(): number;
    hours(): number;
    milliseconds(): number;
    seconds(): number;
    ticks(): number;
    totalDays(): number;
    totalHours(): number;
    totalMilliseconds(): number;
    totalMinutes(): number;
    totalSeconds(): number;
    static fromTicks(value: number): TimeSpan;
    static readonly zero: TimeSpan;
    static readonly maxValue: TimeSpan;
    static readonly minValue: TimeSpan;
    static isTimeSpan(timespan: TimeSpan): number;
    static additionDoesOverflow(a: number, b: number): boolean;
    static subtractionDoesUnderflow(a: number, b: number): boolean;
    static compare(t1: TimeSpan, t2: TimeSpan): 1 | 0 | -1;
    static interval(value: number, scale: number): TimeSpan;
    static fromMilliseconds(value: number): TimeSpan;
    static fromSeconds(value: number): TimeSpan;
    static fromMinutes(value: number): TimeSpan;
    static fromHours(value: number): TimeSpan;
    static fromDays(value: number): TimeSpan;
}
//# sourceMappingURL=timeSpan.d.ts.map
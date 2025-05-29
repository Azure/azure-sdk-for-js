// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
// Ported this implementation to javascript:
// https://referencesource.microsoft.com/#mscorlib/system/timespan.cs,83e476c1ae112117
/** @hidden */
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const ticksPerMillisecond = 10000;
/** @hidden */
const millisecondsPerTick = 1.0 / ticksPerMillisecond;
/** @hidden */
const ticksPerSecond = ticksPerMillisecond * 1000; // 10,000,000
/** @hidden */
const secondsPerTick = 1.0 / ticksPerSecond; // 0.0001
/** @hidden */
const ticksPerMinute = ticksPerSecond * 60; // 600,000,000
/** @hidden */
const minutesPerTick = 1.0 / ticksPerMinute; // 1.6666666666667e-9
/** @hidden */
const ticksPerHour = ticksPerMinute * 60; // 36,000,000,000
/** @hidden */
const hoursPerTick = 1.0 / ticksPerHour; // 2.77777777777777778e-11
/** @hidden */
const ticksPerDay = ticksPerHour * 24; // 864,000,000,000
/** @hidden */
const daysPerTick = 1.0 / ticksPerDay; // 1.1574074074074074074e-12
/** @hidden */
const millisPerSecond = 1000;
/** @hidden */
const millisPerMinute = millisPerSecond * 60; //     60,000
/** @hidden */
const millisPerHour = millisPerMinute * 60; //  3,600,000
/** @hidden */
const millisPerDay = millisPerHour * 24; // 86,400,000
/** @hidden */
const maxMilliSeconds = Number.MAX_SAFE_INTEGER / ticksPerMillisecond;
/** @hidden */
const minMilliSeconds = Number.MIN_SAFE_INTEGER / ticksPerMillisecond;
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
export class TimeSpan {
    constructor(days, hours, minutes, seconds, milliseconds) {
        // Constructor
        if (!Number.isInteger(days)) {
            throw new Error("days is not an integer");
        }
        if (!Number.isInteger(hours)) {
            throw new Error("hours is not an integer");
        }
        if (!Number.isInteger(minutes)) {
            throw new Error("minutes is not an integer");
        }
        if (!Number.isInteger(seconds)) {
            throw new Error("seconds is not an integer");
        }
        if (!Number.isInteger(milliseconds)) {
            throw new Error("milliseconds is not an integer");
        }
        const totalMilliSeconds = (days * 3600 * 24 + hours * 3600 + minutes * 60 + seconds) * 1000 + milliseconds;
        if (totalMilliSeconds > maxMilliSeconds || totalMilliSeconds < minMilliSeconds) {
            throw new Error("Total number of milliseconds was either too large or too small");
        }
        this._ticks = totalMilliSeconds * ticksPerMillisecond;
    }
    /**
     * Returns a new TimeSpan object whose value is the sum of the specified TimeSpan object and this instance.
     * @param ts - The time interval to add.
     */
    add(ts) {
        if (TimeSpan.additionDoesOverflow(this._ticks, ts._ticks)) {
            throw new Error("Adding the two timestamps causes an overflow.");
        }
        const results = this._ticks + ts._ticks;
        return TimeSpan.fromTicks(results);
    }
    /**
     * Returns a new TimeSpan object whose value is the difference of the specified TimeSpan object and this instance.
     * @param ts - The time interval to subtract.
     */
    subtract(ts) {
        if (TimeSpan.subtractionDoesUnderflow(this._ticks, ts._ticks)) {
            throw new Error("Subtracting the two timestamps causes an underflow.");
        }
        const results = this._ticks - ts._ticks;
        return TimeSpan.fromTicks(results);
    }
    /**
     * Compares this instance to a specified object and returns an integer that indicates whether this
     * instance is shorter than, equal to, or longer than the specified object.
     * @param value - The time interval to add.
     */
    compareTo(value) {
        if (value == null) {
            return 1;
        }
        if (!TimeSpan.isTimeSpan(value)) {
            throw new Error("Argument must be a TimeSpan object");
        }
        return TimeSpan.compare(this, value);
    }
    /**
     * Returns a new TimeSpan object whose value is the absolute value of the current TimeSpan object.
     */
    duration() {
        return TimeSpan.fromTicks(this._ticks >= 0 ? this._ticks : -this._ticks);
    }
    /**
     * Returns a value indicating whether this instance is equal to a specified object.
     * @param value - The time interval to check for equality.
     */
    equals(value) {
        if (TimeSpan.isTimeSpan(value)) {
            return this._ticks === value._ticks;
        }
        return false;
    }
    /**
     * Returns a new TimeSpan object whose value is the negated value of this instance.
     * @param value - The time interval to check for equality.
     */
    negate() {
        return TimeSpan.fromTicks(-this._ticks);
    }
    days() {
        return Math.floor(this._ticks / ticksPerDay);
    }
    hours() {
        return Math.floor(this._ticks / ticksPerHour);
    }
    milliseconds() {
        return Math.floor(this._ticks / ticksPerMillisecond);
    }
    seconds() {
        return Math.floor(this._ticks / ticksPerSecond);
    }
    ticks() {
        return this._ticks;
    }
    totalDays() {
        return this._ticks * daysPerTick;
    }
    totalHours() {
        return this._ticks * hoursPerTick;
    }
    totalMilliseconds() {
        return this._ticks * millisecondsPerTick;
    }
    totalMinutes() {
        return this._ticks * minutesPerTick;
    }
    totalSeconds() {
        return this._ticks * secondsPerTick;
    }
    static fromTicks(value) {
        const timeSpan = new TimeSpan(0, 0, 0, 0, 0);
        timeSpan._ticks = value;
        return timeSpan;
    }
    static isTimeSpan(timespan) {
        return timespan._ticks;
    }
    static additionDoesOverflow(a, b) {
        const c = a + b;
        return a !== c - b || b !== c - a;
    }
    static subtractionDoesUnderflow(a, b) {
        const c = a - b;
        return a !== c + b || b !== a - c;
    }
    static compare(t1, t2) {
        if (t1._ticks > t2._ticks) {
            return 1;
        }
        if (t1._ticks < t2._ticks) {
            return -1;
        }
        return 0;
    }
    static interval(value, scale) {
        if (isNaN(value)) {
            throw new Error("value must be a number");
        }
        const milliseconds = value * scale;
        if (milliseconds > maxMilliSeconds || milliseconds < minMilliSeconds) {
            throw new Error("timespan too long");
        }
        return TimeSpan.fromTicks(Math.floor(milliseconds * ticksPerMillisecond));
    }
    static fromMilliseconds(value) {
        return TimeSpan.interval(value, 1);
    }
    static fromSeconds(value) {
        return TimeSpan.interval(value, millisPerSecond);
    }
    static fromMinutes(value) {
        return TimeSpan.interval(value, millisPerMinute);
    }
    static fromHours(value) {
        return TimeSpan.interval(value, millisPerHour);
    }
    static fromDays(value) {
        return TimeSpan.interval(value, millisPerDay);
    }
}
TimeSpan.zero = new TimeSpan(0, 0, 0, 0, 0);
TimeSpan.maxValue = TimeSpan.fromTicks(Number.MAX_SAFE_INTEGER);
TimeSpan.minValue = TimeSpan.fromTicks(Number.MIN_SAFE_INTEGER);
//# sourceMappingURL=timeSpan.js.map
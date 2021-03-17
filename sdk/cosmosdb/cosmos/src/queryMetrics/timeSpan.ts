// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Ported this implementation to javascript:
// https://referencesource.microsoft.com/#mscorlib/system/timespan.cs,83e476c1ae112117
/** @hidden */
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
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
  protected _ticks: number;
  constructor(days: number, hours: number, minutes: number, seconds: number, milliseconds: number) {
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

    const totalMilliSeconds =
      (days * 3600 * 24 + hours * 3600 + minutes * 60 + seconds) * 1000 + milliseconds;
    if (totalMilliSeconds > maxMilliSeconds || totalMilliSeconds < minMilliSeconds) {
      throw new Error("Total number of milliseconds was either too large or too small");
    }

    this._ticks = totalMilliSeconds * ticksPerMillisecond;
  }

  /**
   * Returns a new TimeSpan object whose value is the sum of the specified TimeSpan object and this instance.
   * @param ts - The time interval to add.
   */
  public add(ts: TimeSpan): TimeSpan {
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
  public subtract(ts: TimeSpan): TimeSpan {
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
  public compareTo(value: TimeSpan): 1 | -1 | 0 {
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
  public duration(): TimeSpan {
    return TimeSpan.fromTicks(this._ticks >= 0 ? this._ticks : -this._ticks);
  }

  /**
   * Returns a value indicating whether this instance is equal to a specified object.
   * @param value - The time interval to check for equality.
   */
  public equals(value: TimeSpan): boolean {
    if (TimeSpan.isTimeSpan(value)) {
      return this._ticks === value._ticks;
    }

    return false;
  }

  /**
   * Returns a new TimeSpan object whose value is the negated value of this instance.
   * @param value - The time interval to check for equality.
   */
  public negate(): TimeSpan {
    return TimeSpan.fromTicks(-this._ticks);
  }

  public days(): number {
    return Math.floor(this._ticks / ticksPerDay);
  }

  public hours(): number {
    return Math.floor(this._ticks / ticksPerHour);
  }

  public milliseconds(): number {
    return Math.floor(this._ticks / ticksPerMillisecond);
  }

  public seconds(): number {
    return Math.floor(this._ticks / ticksPerSecond);
  }

  public ticks(): number {
    return this._ticks;
  }

  public totalDays(): number {
    return this._ticks * daysPerTick;
  }
  public totalHours(): number {
    return this._ticks * hoursPerTick;
  }

  public totalMilliseconds(): number {
    return this._ticks * millisecondsPerTick;
  }

  public totalMinutes(): number {
    return this._ticks * minutesPerTick;
  }

  public totalSeconds(): number {
    return this._ticks * secondsPerTick;
  }

  public static fromTicks(value: number): TimeSpan {
    const timeSpan = new TimeSpan(0, 0, 0, 0, 0);
    timeSpan._ticks = value;
    return timeSpan;
  }

  public static readonly zero = new TimeSpan(0, 0, 0, 0, 0);
  public static readonly maxValue = TimeSpan.fromTicks(Number.MAX_SAFE_INTEGER);
  public static readonly minValue = TimeSpan.fromTicks(Number.MIN_SAFE_INTEGER);

  public static isTimeSpan(timespan: TimeSpan): number {
    return timespan._ticks;
  }

  public static additionDoesOverflow(a: number, b: number): boolean {
    const c = a + b;
    return a !== c - b || b !== c - a;
  }

  public static subtractionDoesUnderflow(a: number, b: number): boolean {
    const c = a - b;
    return a !== c + b || b !== a - c;
  }

  public static compare(t1: TimeSpan, t2: TimeSpan): 1 | 0 | -1 {
    if (t1._ticks > t2._ticks) {
      return 1;
    }
    if (t1._ticks < t2._ticks) {
      return -1;
    }
    return 0;
  }

  public static interval(value: number, scale: number): TimeSpan {
    if (isNaN(value)) {
      throw new Error("value must be a number");
    }

    const milliseconds = value * scale;
    if (milliseconds > maxMilliSeconds || milliseconds < minMilliSeconds) {
      throw new Error("timespan too long");
    }

    return TimeSpan.fromTicks(Math.floor(milliseconds * ticksPerMillisecond));
  }

  public static fromMilliseconds(value: number): TimeSpan {
    return TimeSpan.interval(value, 1);
  }

  public static fromSeconds(value: number): TimeSpan {
    return TimeSpan.interval(value, millisPerSecond);
  }

  public static fromMinutes(value: number): TimeSpan {
    return TimeSpan.interval(value, millisPerMinute);
  }

  public static fromHours(value: number): TimeSpan {
    return TimeSpan.interval(value, millisPerHour);
  }

  public static fromDays(value: number): TimeSpan {
    return TimeSpan.interval(value, millisPerDay);
  }
}

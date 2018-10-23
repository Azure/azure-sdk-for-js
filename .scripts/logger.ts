/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 */

import * as colors from "colors";
import { Argv } from "./commandLine";

export enum LoggingLevel {
    All = 0,
    Trace = 0,
    Debug = 1,
    Info = 2,
    Warn = 3,
    Error = 4
}

colors.setTheme({
    positive: "green",
    negative: "red",
    debug: "bgCyan",
    info: "bgGreen"
});

declare global {
    interface String {
        positive: string;
        negative: string;
        debug: string;
        info: string;
    }
}

export class Logger {
    private _cache: string[];
    _loggingLevel: LoggingLevel;

    constructor(loggingLevel: string) {
        const lowerCaseLevel = loggingLevel.toLowerCase();
        const capitalizedLevel = lowerCaseLevel.charAt(0).toUpperCase() + lowerCaseLevel.slice(1);
        this._loggingLevel = LoggingLevel[capitalizedLevel];
        this._cache = [];
    }

    log(text?: string): void {
        console.log(text || "");
        this._capture(text);
    }

    clearCapturedText(): void {
        this._cache = [];
    }

    getCapturedText(): string {
        return this._cache.join("\n");
    }

    private _capture(text?: string): void {
        this._cache.push(text);
    }

    logInfo(text?: string) {
        this.log(text.info);
    }

    logRed(text?: string): void {
        this.log(text.red);
    }

    logGreen(text?: string): void {
        this.log(text.green);
    }

    logError(text?: string): void {
        this.log(text.bgRed);
    }

    logWarn(text?: string): void {
        if (this._loggingLevel <= LoggingLevel.Warn) {
            this.log(text.bgYellow.black);
        }
    }

    logDebug(text?: string): void {
        if (this._loggingLevel <= LoggingLevel.Debug) {
            this.log(text);
        }
    }

    logWithDebugDetails(text?: string, details?: string): void {
        const greyDetails = `(${details})`.grey;
        const textToLog = (this._loggingLevel <= LoggingLevel.Debug) ? `${text} ${greyDetails}` : (text);
        this.log(textToLog);
    }

    logTrace(text?: string) {
        if (this._loggingLevel <= LoggingLevel.Trace) {
            this.log(text.gray);
        }
    }

    logWithPath(path: string, message: string): void {
        console.log(`[${path}]> ${message}`);
    }

    static get() {
        return new Logger(Argv.Global.loggingLevel);
    }
}

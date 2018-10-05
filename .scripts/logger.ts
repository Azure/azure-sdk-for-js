/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 */

import * as colors from "colors";
import { CommandLineOptions, getCommandLineOptions } from "./commandLine";

export enum Color {
    Red,
    Green
}

colors.setTheme({
    positive: "green",
    negative: "red",
    debug: "bgCyan",
});

declare global {
    interface String {
        positive: string;
        negative: string;
        debug: string;
    }
}

export class Logger {
    private _colorsMap = {
        [Color.Red]: colors.red,
        [Color.Green]: colors.green
    }

    constructor(private _options: CommandLineOptions) {
    }

    log(text: string, color?: Color): void {
        if (color !== undefined) {
            const coloredText = this._colorsMap[color](text);
            console.log(coloredText);
        } else {
            console.log(text);
        }
    }

    logRed(text: string): void {
        this.log(text, Color.Red)
    }

    logGreen(text: string): void {
        this.log(text, Color.Green)
    }

    logVerbose(text: string, color?: Color): void {
        if (this._options.verbose) {
            this.log(text, color);
        }
    }

    logWithPath(path: string, message: string): void {
        console.log(`[${path}]> ${message}`);
    }
}

export const logger = new Logger(getCommandLineOptions());

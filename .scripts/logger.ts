/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 */

import { CommandLineOptions } from "./commandLineOptions";

 export class Logger {
    constructor(private _options: CommandLineOptions) {
    }

    log(text: string): void {
        console.log(text);
     }

     logVerbose(text: string): void {
         if (this._options.verbose) {
             console.log(text);
         }
     }

     logDebug(text: string): void {
         if (this._options.debug) {
             console.log(text);
         }
     }
 }
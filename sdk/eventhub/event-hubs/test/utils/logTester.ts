// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import debugModule from "debug";

export class LogTester {
  private _attachedLoggers: { logger: debugModule.Debugger, wasEnabled: boolean, previousLogFunction: (message: string) => void }[];
  private _previousEnabledLoggers: string = "";

  constructor(private _expectedMessages: string[], loggers: debugModule.Debugger[]) {
    this._attachedLoggers = [];

    for (const logger of loggers) {
      this.attach(logger);
    }   

    this._previousEnabledLoggers = debugModule.disable();
    debugModule.enable(loggers.map(logger => logger.namespace).join(","));
  }

  assert() {
    this.close();

    if (this._expectedMessages.length > 0) {
      throw new Error(`Messages without a match:\n${this._expectedMessages.join('\n')}`)
    }
  }

  private check(message: string) {
    for (let i = 0; i < this._expectedMessages.length; ++i) {
      if (message.indexOf(this._expectedMessages[i]) >= 0) {
        this._expectedMessages.splice(i, 1);
        break;
      }
    }
  }

  private close() {
    for (const logger of this._attachedLoggers) {
      logger.logger.enabled = logger.wasEnabled;
      logger.logger.log = logger.previousLogFunction;
    }

    debugModule.enable(this._previousEnabledLoggers);
    debugModule.disable();
  }

  private attach(logger: debugModule.Debugger) {
    this._attachedLoggers.push({
      logger,
      wasEnabled: logger.enabled,
      previousLogFunction: logger.log
    });    

    // install our check instead
    logger.enabled = true;
    logger.log = (message) => this.check(message);
  }
}
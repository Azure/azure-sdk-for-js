// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export class ProtocolError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ProtocolError';
  }
}

export class TypeError extends ProtocolError {
  constructor(message: string) {
    super(message);
    this.name = 'TypeError';
  }
}

export class ConnectionError extends Error {
  condition: string;
  description: string;
  connection: any;

  constructor(message: string, condition: string, connection: any) {
    super(message);
    this.name = 'ConnectionError';
    this.condition = condition;
    this.description = message;
    // consider making this not enumerable so it doesn't show up in JSON.stringify
    this.connection = connection;
  }

  toJSON(): { type: string; code: string; message: string } {
    return {
      type: this.name,
      code: this.condition,
      message: this.description
    };
  }
}

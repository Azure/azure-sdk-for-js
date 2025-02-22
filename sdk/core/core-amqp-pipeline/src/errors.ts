// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export class ProtocolError extends Error {
  name: string;

  constructor(message: string) {
    super(message);
    this.name = 'ProtocolError';
    Object.setPrototypeOf(this, ProtocolError.prototype);
  }
}

export class TypeError extends ProtocolError {
  constructor(message: string) {
    super(message);
    this.name = 'TypeError';
    Object.setPrototypeOf(this, TypeError.prototype);
  }
}

export class ConnectionError extends Error {
  name: string;
  condition: string;
  description: string;
  private readonly connection: any;

  constructor(message: string, condition: string, connection: any) {
    super(message);
    this.name = 'ConnectionError';
    this.condition = condition;
    this.description = message;
    this.connection = connection;
    Object.setPrototypeOf(this, ConnectionError.prototype);
  }

  toJSON(): { type: string; code: string; message: string } {
    return {
      type: this.name,
      code: this.condition,
      message: this.description
    };
  }
}

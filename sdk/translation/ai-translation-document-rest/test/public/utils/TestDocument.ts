// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

class TestDocument {
  private name: string;
  private content: string;

  constructor(name: string, content: string) {
    this.name = name;
    this.content = content;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public getContent(): string {
    return this.content;
  }

  public setContent(content: string): void {
    this.content = content;
  }
}
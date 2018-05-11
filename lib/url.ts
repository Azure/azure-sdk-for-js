// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

export interface URLQuery {
  [queryParameterName: string]: string;
}

/**
 * A class that handles creating, modifying, and parsing URLs.
 */
export class URLBuilder {
  private _scheme: string | undefined;
  private _host: string | undefined;
  private _port: string | undefined;
  private _path: string | undefined;
  private _query: URLQuery = {};

  /**
   * Set the scheme/protocol for this URL. If the provided scheme contains other parts of a URL
   * (such as a host, port, path, or query), those parts will be added to this URL as well.
   */
  public setScheme(scheme: string): void {
    if (!scheme) {
      this._scheme = undefined;
    } else {
      this.set(scheme, URLTokenizerState.SCHEME);
    }
  }

  /**
   * Get the scheme that has been set in this URL.
   */
  public getScheme(): string | undefined {
    return this._scheme;
  }

  /**
   * Set the host for this URL. If the provided host contains other parts of a URL (such as a
   * port, path, or query), those parts will be added to this URL as well.
   */
  public setHost(host: string): void {
    if (!host) {
      this._host = undefined;
    } else {
      this.set(host, URLTokenizerState.SCHEME_OR_HOST);
    }
  }

  /**
   * Get the host that has been set in this URL.
   */
  public getHost(): string | undefined {
    return this._host;
  }

  /**
   * Set the port for this URL. If the provided port contains other parts of a URL (such as a
   * path or query), those parts will be added to this URL as well.
   */
  public setPort(port: number | string | undefined): void {
    if (port == undefined || port === "") {
      this._port = undefined;
    } else {
      this.set(port.toString(), URLTokenizerState.PORT);
    }
  }

  /**
   * Get the port that has been set in this URL.
   */
  public getPort(): string | undefined {
    return this._port;
  }

  /**
   * Set the path for this URL. If the provided path contains a query, then it will be added to
   * this URL as well.
   */
  public setPath(path: string | undefined): void {
    if (!path) {
      this._path = undefined;
    } else {
      if (path.indexOf("://") !== -1) {
        this.set(path, URLTokenizerState.SCHEME);
      } else {
        this.set(path, URLTokenizerState.PATH);
      }
    }
  }

  /**
   * Get the path that has been set in this URL.
   */
  public getPath(): string | undefined {
    return this._path;
  }

  /**
   * Set the query parameter in this URL with the provided queryParameterName to be the provided
   * queryParameterEncodedValue.
   */
  public setQueryParameter(queryParameterName: string, queryParameterEncodedValue: string): void {
    if (queryParameterName) {
      this._query[queryParameterName] = queryParameterEncodedValue;
    }
  }

  /**
   * Set the query in this URL.
   */
  public setQuery(query: string | URLQuery | undefined): void {
    if (!query) {
      this._query = {};
    } else if (typeof query !== "string") {
      this._query = query;
    } else {
      this.set(query, URLTokenizerState.QUERY);
    }
  }

  /**
   * Set the parts of this URL by parsing the provided text using the provided startState.
   */
  private set(text: string, startState: URLTokenizerState): void {
    const tokenizer = new URLTokenizer(text, startState);

    while (tokenizer.next()) {
      const token: URLToken | undefined = tokenizer.current();
      if (token) {
        switch (token.type) {
          case URLTokenType.SCHEME:
            this._scheme = token.text || undefined;
            break;

          case URLTokenType.HOST:
            this._host = token.text || undefined;
            break;

          case URLTokenType.PORT:
            this._port = token.text || undefined;
            break;

          case URLTokenType.PATH:
            const tokenPath: string | undefined = token.text || undefined;
            if (!this._path || this._path === "/" || tokenPath !== "/") {
              this._path = tokenPath;
            }
            break;

          case URLTokenType.QUERY:
            let queryString: string | undefined = token.text;
            if (queryString) {
              if (queryString.startsWith("?")) {
                queryString = queryString.substring(1);
              }

              for (const queryParameterString of queryString.split("&")) {
                const queryParameterParts: string[] = queryParameterString.split("=");
                if (queryParameterParts.length === 2) {
                  this.setQueryParameter(queryParameterParts[0], queryParameterParts[1]);
                } else {
                  throw new Error("Malformed query parameter: " + queryParameterString);
                }
              }
            }
            break;

          default:
            throw new Error(`Unrecognized URLTokenType: ${token.type}`);
        }
      }
    }
  }

  public toString(): string {
    let result = "";

    if (this._scheme) {
      result += `${this._scheme}://`;
    }

    if (this._host) {
      result += this._host;
    }

    if (this._port) {
      result += `:${this._port}`;
    }

    if (this._path) {
      if (!this._path.startsWith("/")) {
        result += "/";
      }
      result += this._path;
    }

    if (this._query) {
      let queryString = "";
      for (const queryParameterName in this._query) {
        if (queryString) {
          queryString += "&";
        }
        queryString += `${queryParameterName}=${this._query[queryParameterName]}`;
      }
      if (queryString) {
        result += `?${queryString}`;
      }
    }

    return result;
  }

  public static parse(text: string): URLBuilder {
    const result = new URLBuilder();
    result.set(text, URLTokenizerState.SCHEME_OR_HOST);
    return result;
  }
}

export const enum URLTokenizerState {
  SCHEME,
  SCHEME_OR_HOST,
  HOST,
  PORT,
  PATH,
  QUERY,
  DONE,
}

export const enum URLTokenType {
  SCHEME,
  HOST,
  PORT,
  PATH,
  QUERY
}

export class URLToken {
  public constructor(public readonly text: string, public readonly type: URLTokenType) {
  }

  public static scheme(text: string): URLToken {
    return new URLToken(text, URLTokenType.SCHEME);
  }

  public static host(text: string): URLToken {
    return new URLToken(text, URLTokenType.HOST);
  }

  public static port(text: string): URLToken {
    return new URLToken(text, URLTokenType.PORT);
  }

  public static path(text: string): URLToken {
    return new URLToken(text, URLTokenType.PATH);
  }

  public static query(text: string): URLToken {
    return new URLToken(text, URLTokenType.QUERY);
  }
}

/**
 * Get whether or not the provided character (single character string) is an alphanumeric (letter or
 * digit) character.
 */
export function isAlphaNumericCharacter(character: string): boolean {
  const characterCode: number = character.charCodeAt(0);
  return (48 /* '0' */ <= characterCode && characterCode <= 57 /* '9' */) ||
    (65 /* 'A' */ <= characterCode && characterCode <= 90 /* 'Z' */) ||
    (97 /* 'a' */ <= characterCode && characterCode <= 122 /* 'z' */);
}

/**
 * A class that tokenizes URL strings.
 */
export class URLTokenizer {
  private readonly _textLength: number;
  private _currentState: URLTokenizerState;
  private _currentIndex: number;
  private _currentToken: URLToken | undefined;

  public constructor(private readonly _text: string, state?: URLTokenizerState) {
    this._textLength = _text ? _text.length : 0;
    this._currentState = state != undefined ? state : URLTokenizerState.SCHEME_OR_HOST;
    this._currentIndex = 0;
  }

  /**
   * Whether or not this URLTokenizer has a current character.
   */
  private hasCurrentCharacter(): boolean {
    return this._currentIndex < this._textLength;
  }

  /**
   * Get the character in the text string at the current index.
   */
  private getCurrentCharacter(): string {
    return this._text[this._currentIndex];
  }

  /**
   * Advance to the character in text that is "step" characters ahead. If no step value is provided,
   * then step will default to 1.
   */
  private nextCharacter(step?: number): void {
    if (this.hasCurrentCharacter) {
      if (!step) {
        step = 1;
      }
      this._currentIndex += step;
    }
  }

  /**
   * Starting with the current character, peek "charactersToPeek" number of characters ahead in this
   * Tokenizer's stream of characters.
   */
  private peekCharacters(charactersToPeek: number): string {
    let endIndex: number = this._currentIndex + charactersToPeek;
    if (this._textLength < endIndex) {
      endIndex = this._textLength;
    }
    return this._text.substring(this._currentIndex, endIndex);
  }

  /**
   * Read characters from this Tokenizer until the end of the stream or until the provided condition
   * is false when provided the current character.
   */
  private readWhile(condition: (character: string) => boolean): string {
    let result = "";

    while (this.hasCurrentCharacter()) {
      const currentCharacter: string = this.getCurrentCharacter();
      if (!condition(currentCharacter)) {
        break;
      } else {
        result += currentCharacter;
        this.nextCharacter();
      }
    }

    return result;
  }

  /**
   * Read characters from this Tokenizer until a non-alphanumeric character or the end of the
   * character stream is reached.
   */
  private readWhileLetterOrDigit(): string {
    return this.readWhile((character: string) => isAlphaNumericCharacter(character));
  }

  /**
   * Read characters from this Tokenizer until one of the provided terminating characters is read or
   * the end of the character stream is reached.
   */
  private readUntilCharacter(...terminatingCharacters: string[]): string {
    return this.readWhile((character: string) => terminatingCharacters.indexOf(character) === -1);
  }

  /**
   * Read the remaining characters from this Tokenizer's character stream.
   */
  private readRemaining(): string {
    let result = "";
    if (this._currentIndex < this._textLength) {
      result = this._text.substring(this._currentIndex);
      this._currentIndex = this._textLength;
    }
    return result;
  }

  /**
   * Get the current URLToken this URLTokenizer is pointing at, or undefined if the URLTokenizer
   * hasn't started or has finished tokenizing.
   */
  public current(): URLToken | undefined {
    return this._currentToken;
  }

  /**
   * Advance to the next URLToken and return whether or not a URLToken was found.
   */
  public next(): boolean {
    if (!this.hasCurrentCharacter()) {
      this._currentToken = undefined;
    } else {
      switch (this._currentState) {
        case URLTokenizerState.SCHEME:
          this.nextScheme();
          break;

        case URLTokenizerState.SCHEME_OR_HOST:
          this.nextSchemeOrHost();
          break;

        case URLTokenizerState.HOST:
          this.nextHost();
          break;

        case URLTokenizerState.PORT:
          this.nextPort();
          break;

        case URLTokenizerState.PATH:
          this.nextPath();
          break;

        case URLTokenizerState.QUERY:
          this.nextQuery();
          break;

        default:
          throw new Error(`Unrecognized URLTokenizerState: ${this._currentState}`);
      }
    }
    return !!this._currentToken;
  }

  private nextScheme(): void {
    const scheme: string = this.readWhileLetterOrDigit();
    this._currentToken = URLToken.scheme(scheme);
    if (!this.hasCurrentCharacter()) {
      this._currentState = URLTokenizerState.DONE;
    } else {
      this._currentState = URLTokenizerState.HOST;
    }
  }

  private nextSchemeOrHost(): void {
    const schemeOrHost: string = this.readUntilCharacter(":", "/", "?");
    if (!this.hasCurrentCharacter()) {
      this._currentToken = URLToken.host(schemeOrHost);
      this._currentState = URLTokenizerState.DONE;
    } else if (this.getCurrentCharacter() === ":") {
      if (this.peekCharacters(3) === "://") {
        this._currentToken = URLToken.scheme(schemeOrHost);
        this._currentState = URLTokenizerState.HOST;
      } else {
        this._currentToken = URLToken.host(schemeOrHost);
        this._currentState = URLTokenizerState.PORT;
      }
    } else {
      this._currentToken = URLToken.host(schemeOrHost);
      if (this.getCurrentCharacter() === "/") {
        this._currentState = URLTokenizerState.PATH;
      } else {
        this._currentState = URLTokenizerState.QUERY;
      }
    }
  }

  private nextHost(): void {
    if (this.peekCharacters(3) === "://") {
      this.nextCharacter(3);
    }

    const host: string = this.readUntilCharacter(":", "/", "?");
    this._currentToken = URLToken.host(host);

    if (!this.hasCurrentCharacter()) {
      this._currentState = URLTokenizerState.DONE;
    } else if (this.getCurrentCharacter() === ":") {
      this._currentState = URLTokenizerState.PORT;
    } else if (this.getCurrentCharacter() === "/") {
      this._currentState = URLTokenizerState.PATH;
    } else {
      this._currentState = URLTokenizerState.QUERY;
    }
  }

  private nextPort(): void {
    if (this.getCurrentCharacter() === ":") {
      this.nextCharacter();
    }

    const port: string = this.readUntilCharacter("/", "?");
    this._currentToken = URLToken.port(port);

    if (!this.hasCurrentCharacter()) {
      this._currentState = URLTokenizerState.DONE;
    } else if (this.getCurrentCharacter() === "/") {
      this._currentState = URLTokenizerState.PATH;
    } else {
      this._currentState = URLTokenizerState.QUERY;
    }
  }

  private nextPath(): void {
    const path: string = this.readUntilCharacter("?");
    this._currentToken = URLToken.path(path);

    if (!this.hasCurrentCharacter()) {
      this._currentState = URLTokenizerState.DONE;
    } else {
      this._currentState = URLTokenizerState.QUERY;
    }
  }

  private nextQuery(): void {
    if (this.getCurrentCharacter() === "?") {
      this.nextCharacter();
    }

    const query: string = this.readRemaining();
    this._currentToken = URLToken.query(query);
    this._currentState = URLTokenizerState.DONE;
  }
}
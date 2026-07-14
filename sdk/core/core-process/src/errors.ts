// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const processErrorBrand = Symbol.for("@azure/core-process.ProcessError");

/**
 * Structured details for a {@link ProcessError}.
 */
export interface ProcessErrorOptions {
  /**
   * The underlying error that caused this process error.
   */
  cause?: unknown;

  /**
   * The operating-system error code or process exit code.
   */
  code?: string | number | null;

  /**
   * The signal that terminated the process.
   */
  signal?: NodeJS.Signals | null;

  /**
   * Whether the process was killed.
   */
  killed?: boolean;

  /**
   * Captured standard output.
   */
  stdout?: string | Buffer;

  /**
   * Captured standard error.
   */
  stderr?: string | Buffer;
}

/**
 * An error raised while resolving or executing a process.
 *
 * The captured output is non-enumerable so ordinary logging and serialization
 * do not expose it accidentally.
 */
export class ProcessError extends Error {
  /**
   * The operating-system error code or process exit code.
   */
  public readonly code: string | number | null;

  /**
   * The signal that terminated the process.
   */
  public readonly signal: NodeJS.Signals | null;

  /**
   * Whether the process was killed.
   */
  public readonly killed: boolean;

  /**
   * Captured standard output, when available.
   */
  public readonly stdout!: string | Buffer | undefined;

  /**
   * Captured standard error, when available.
   */
  public readonly stderr!: string | Buffer | undefined;

  /**
   * Creates a process error.
   *
   * @param message - A message that does not contain command arguments or output.
   * @param options - Structured process failure details.
   */
  public constructor(message: string, options: ProcessErrorOptions = {}) {
    super(message, { cause: options.cause });
    this.name = "ProcessError";
    this.code = options.code ?? null;
    this.signal = options.signal ?? null;
    this.killed = options.killed ?? false;

    Object.defineProperties(this, {
      [processErrorBrand]: {
        configurable: false,
        enumerable: false,
        value: true,
        writable: false,
      },
      stdout: {
        configurable: false,
        enumerable: false,
        value: options.stdout,
        writable: false,
      },
      stderr: {
        configurable: false,
        enumerable: false,
        value: options.stderr,
        writable: false,
      },
    });
  }
}

/**
 * Checks whether an unknown value is a {@link ProcessError}.
 *
 * @param error - The value to check.
 * @returns Whether the value is a process error.
 */
export function isProcessError(error: unknown): error is ProcessError {
  if (error instanceof ProcessError) {
    return true;
  }
  if (typeof error !== "object" || error === null) {
    return false;
  }

  const candidate = error as {
    [processErrorBrand]?: unknown;
    code?: unknown;
    killed?: unknown;
    name?: unknown;
    signal?: unknown;
  };
  return (
    candidate[processErrorBrand] === true &&
    candidate.name === "ProcessError" &&
    (typeof candidate.code === "string" ||
      typeof candidate.code === "number" ||
      candidate.code === null) &&
    typeof candidate.killed === "boolean" &&
    (typeof candidate.signal === "string" || candidate.signal === null)
  );
}

/**
 * Wraps a child-process failure in a sanitized {@link ProcessError}.
 *
 * @param error - The original child-process error.
 * @param stdout - Captured standard output.
 * @param stderr - Captured standard error.
 * @returns A sanitized process error that preserves the original error as its cause.
 */
export function createExecutionError(
  error: Error & {
    code?: string | number | null;
    signal?: NodeJS.Signals | null;
    killed?: boolean;
  },
  stdout?: string | Buffer,
  stderr?: string | Buffer,
): ProcessError {
  const code = error.code ?? null;
  const message =
    typeof code === "number"
      ? `The process exited with code ${code}.`
      : code
        ? `The process could not be completed (${code}).`
        : "The process could not be completed.";

  return new ProcessError(message, {
    cause: error,
    code,
    signal: error.signal,
    killed: error.killed,
    stdout,
    stderr,
  });
}

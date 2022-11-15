import { spawn } from "child_process";
import { PassThrough, Readable, Writable } from "stream";
import { Printer } from "./printer";

export interface IoConfig {
  in?: Readable;
  out?: Writable;
  err?: Writable;
}

export function printerToIoConfig(printer: Printer): IoConfig {
  const out = new PassThrough();
  const err = new PassThrough();

  out.on("data", (data) => printer(data));
  err.on("data", (data) => printer.info(data));

  return {
    out,
    err,
  };
}

/**
 * A simplified, promisified `exec` function.
 *
 * @param name - the name/path of the executable
 * @param args - the arguments to pass to the executable
 * @param timeoutMilliseconds - a timeout value in milliseconds; if this value is less than or equal to zero, then no
 *                              timeout is configured
 * @param printer - an optional logger to print IO to, this will cause stdio pipes to be established
 * @returns the exit code of the program, or -1 if the code was null
 */
export function exec(
  name: string,
  args: readonly string[],
  timeoutMilliseconds: number = 0,
  ioconfig?: IoConfig
): Promise<number> {
  return new Promise((resolve, reject) => {
    const command = spawn(name, args, {
      stdio: ioconfig && "pipe",
    });

    const timer =
      timeoutMilliseconds > 0
        ? setTimeout(() => {
            command.kill();

            reject(`child process ${name} timed out`);
          }, timeoutMilliseconds)
        : null;

    command.on("exit", (code) => {
      timer && clearTimeout(timer);
      resolve(code ?? -1);
    });
    command.on("error", reject);

    ioconfig?.in?.pipe(command.stdin);
    ioconfig?.out && command.stdout.pipe(ioconfig.out);
    ioconfig?.err && command.stderr.pipe(ioconfig.err);
  });
}

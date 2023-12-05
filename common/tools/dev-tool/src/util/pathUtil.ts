import path from "path";

function toPosixWrapper<T extends (...args: any[]) => any>(f: T): T {
  type P = Parameters<T>;
  type R = ReturnType<T>;
  const wrapped = (...args: P): R => {
    const newArgs = args.map((arg: any) =>
      typeof arg === "string" ? arg.replace(/\\/g, "/") : arg,
    );
    const fixedOutput: R = f(...newArgs);

    if (typeof fixedOutput === "string") {
      return fixedOutput.replace(/\\/g, "/");
    }

    if (typeof fixedOutput === "object") {
      // node path doesn't need this to be recursive
      Object.keys(fixedOutput).forEach(([key, value]) => {
        if (typeof value === "string") {
          // TODO: why does this cast need to be here
          (fixedOutput as any)[key] = value.replace(/\\/g, "/");
        }
      });
    }

    return fixedOutput;
  };
  // TODO: why does this cast need to be here
  return wrapped as T;
}

const posixPath: path.PlatformPath = { ...path };
(Object.keys(path) as Array<keyof path.PlatformPath>).forEach((key) => {
  const value = posixPath[key];
  if (typeof value === "function") {
    const wrapped: typeof value = toPosixWrapper(value);
    (posixPath[key] as typeof value) = wrapped;
  }
});

export default posixPath;

import debugLib from "debug";

/** @hidden */
const cosmosLevelFilter = process.env.COSMOS_LOG_LEVEL || "warn|error";

/** @hidden */
const cosmosDebug = debugLib("cosmos");

/** @hidden */
type logLevel = "silly" | "debug" | "info" | "warn" | "error";

/** @hidden */
const levelLogger = (namespaceLogger: debugLib.Debugger, level: logLevel) => {
  return (message: string | { [key: string]: any }) => {
    if (cosmosLevelFilter.includes(level)) {
      namespaceLogger("[" + new Date().toISOString() + "][" + level + "]: %o", message);
    }
  };
};

/** @hidden */
export const logger = (namespace: string) => {
  const namespaceLogger = cosmosDebug.extend(namespace);
  return {
    silly: levelLogger(namespaceLogger, "silly"),
    debug: levelLogger(namespaceLogger, "debug"),
    info: levelLogger(namespaceLogger, "info"),
    warn: levelLogger(namespaceLogger, "warn"),
    error: levelLogger(namespaceLogger, "error")
  };
};

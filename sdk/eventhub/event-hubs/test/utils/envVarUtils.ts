import * as dotenv from "dotenv";
dotenv.config();

export const isNode = !!process && !!process.version && !!process.versions && !!process.versions.node;

export enum EnvVarKeys {
  EVENTHUB_CONNECTION_STRING = "EVENTHUB_CONNECTION_STRING",
  EVENTHUB_NAME = "EVENTHUB_NAME",
  IOTHUB_CONNECTION_STRING = "IOTHUB_CONNECTION_STRING"
}

const mandatoryEnvVars = [EnvVarKeys.EVENTHUB_CONNECTION_STRING];

function throwMissingEnvironmentVariablesError(envVars: EnvVarKeys[]): void {
  envVars.forEach(function(key: string) {
    const name = key.valueOf();
    if (!getEnvVarValue(name)) {
      throw new Error(`Define ${name} in your environment before running integration tests.`);
    }
  });
}

function getEnvVarValue(name: string): string | undefined {
  if (isNode) {
    return process.env[name];
  } else {
    // @ts-ignore
    return window.__env__[name];
  }
}

export function getEnvVars(): { [key in EnvVarKeys]: any } {
  // Throw error only if mandatory env variable is missing
  throwMissingEnvironmentVariablesError(mandatoryEnvVars);

  return {
    [EnvVarKeys.EVENTHUB_CONNECTION_STRING]: getEnvVarValue(EnvVarKeys.EVENTHUB_CONNECTION_STRING),
    [EnvVarKeys.EVENTHUB_NAME]: getEnvVarValue(EnvVarKeys.EVENTHUB_NAME) || "partitioned-queue",
    [EnvVarKeys.IOTHUB_CONNECTION_STRING]: getEnvVarValue(EnvVarKeys.IOTHUB_CONNECTION_STRING)
  };
}

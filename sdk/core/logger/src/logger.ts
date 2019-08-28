import debug from 'debug';

const registeredLoggers = new Set<AzureDebugger>();
let azureLogLevel: AzureLogLevel | undefined = (process.env.AZURE_LOG_LEVEL as AzureLogLevel) || null;
export const AzureLogger = debug('azure') as AzureDebugger;
AzureLogger.log = (...args) => { debug.log(...args) };

export type AzureLogLevel = 'verbose' | 'info' | 'warning' | 'error';

type AzureDebugger = debug.Debugger & { level: number };


if (process.env.AZURE_LOG_LEVEL) {
    setLogLevel(process.env.AZURE_LOG_LEVEL as any);
}

export function setLogLevel(level?: AzureLogLevel) {
    azureLogLevel = level;

    const enabledNamespaces = [];
    for (const logger of registeredLoggers) {
        if (shouldEnable(logger)) {
            enabledNamespaces.push(logger.namespace);
        }
    }

    debug.enable(enabledNamespaces.join(','));
}

export function getLogLevel() {
    return azureLogLevel;
}

const levelMap = {
    'verbose': 400,
    'info': 300,
    'warning': 200,
    'error': 100
}

export interface AzureLogger {
    error: debug.Debugger;
    warning: debug.Debugger;
    info: debug.Debugger;
    verbose: debug.Debugger;
}

export function createClientLogger(namespace: string): AzureLogger {
    const clientRootLogger = createLogger(AzureLogger, namespace);
    return {
        error: createLogger(clientRootLogger, 'error'),
        warning: createLogger(clientRootLogger, 'warning'),
        info: createLogger(clientRootLogger, 'info'),
        verbose: createLogger(clientRootLogger, 'verbose')
    }
}

function createLogger(parent: AzureDebugger, levelOrNamespace: string) {
    const logger: AzureDebugger = parent.extend(levelOrNamespace) as any;
    if (levelOrNamespace !== undefined) {
        logger.level = levelMap[levelOrNamespace as AzureLogLevel];
    }

    if (parent) {
        logger.log = (...args) => {
            parent.log(...args);
        }
    }

    if(shouldEnable(logger)) {
        const enabled = debug.disable();
        debug.enable(enabled + ',' + logger.namespace);
    }

    registeredLoggers.add(logger);

    return logger;
}

function shouldEnable(logger: AzureDebugger) {
    if (azureLogLevel && logger.level <= levelMap[azureLogLevel]) {
        return true;
    } else {
        return false;
    }
}
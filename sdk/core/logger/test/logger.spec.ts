import * as Logger from "../src/logger";
import * as assert from "assert";

const testLogger = Logger.createClientLogger('test');

describe('AzureLogger', function () {
  it('is not enabled', () => {
    Logger.setLogLevel('verbose');
    assert.ok(!Logger.AzureLogger.enabled);
  });
});

describe('setLogLevel', () => {
  it('enables all relevant loggers for verbose setting', () => {
    Logger.setLogLevel('verbose');
    assert.ok(testLogger.verbose.enabled);
    assert.ok(testLogger.info.enabled);
    assert.ok(testLogger.warning.enabled);
    assert.ok(testLogger.error.enabled);
  });

  it('enables all relevant loggers for info setting', () => {
    Logger.setLogLevel('info');
    assert.ok(!testLogger.verbose.enabled);
    assert.ok(testLogger.info.enabled);
    assert.ok(testLogger.warning.enabled);
    assert.ok(testLogger.error.enabled);
  });

  it('enables all relevant loggers for warning setting', () => {
    Logger.setLogLevel('warning');
    assert.ok(!testLogger.verbose.enabled);
    assert.ok(!testLogger.info.enabled);
    assert.ok(testLogger.warning.enabled);
    assert.ok(testLogger.error.enabled);
  });

  it('enables all relevant loggers for warning setting', () => {
    Logger.setLogLevel('error');
    assert.ok(!testLogger.verbose.enabled);
    assert.ok(!testLogger.info.enabled);
    assert.ok(!testLogger.warning.enabled);
    assert.ok(testLogger.error.enabled);
  });
});

describe('ClientLoggers', () => {
  it('logs to parent loggers', () => {
    Logger.setLogLevel('verbose');

    const oldLog = Logger.AzureLogger.log.bind(Logger.AzureLogger);
    let called = false;

    Logger.AzureLogger.log = (...args) => {
      called = true;
    }

    testLogger.info('hello');
    assert.ok(called);

    Logger.AzureLogger.log = oldLog;
  });
});
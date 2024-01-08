import * as assert from "assert";
import * as http from "http";
import * as sinon from "sinon";
import { BrowserSdkLoader } from "../../../../src/browserSdkLoader/browserSdkLoader";
import * as BrowserSdkLoaderHelper from "../../../../src/browserSdkLoader/browserSdkLoaderHelper";
import {
  AzureMonitorOpenTelemetryOptions,
  shutdownAzureMonitor,
  useAzureMonitor,
} from "../../../../src/index";
import { isLinux, isWindows } from "../../../../src/utils/common";

describe("#BrowserSdkLoader", () => {
  let sandbox: sinon.SinonSandbox;
  let originalEnv: NodeJS.ProcessEnv;

  afterEach(() => {
    process.env = originalEnv;
    shutdownAzureMonitor();
    sandbox.restore();
  });

  beforeEach(() => {
    originalEnv = process.env;
    sandbox = sinon.createSandbox();
  });

  it("should initialize the browser sdk loader", () => {
    const config: AzureMonitorOpenTelemetryOptions = {
      azureMonitorExporterOptions: {
        connectionString: "InstrumentationKey=00000000-0000-0000-0000-000000000000",
      },
      browserSdkLoaderOptions: {
        enabled: true,
        connectionString: "InstrumentationKey=00000000-0000-0000-0000-000000000000",
      },
    };
    useAzureMonitor(config);
    assert.strictEqual(BrowserSdkLoader.getInstance().isInitialized(), true);
  });

  it("injection should be triggered only in HTML responses", () => {
    const config: AzureMonitorOpenTelemetryOptions = {
      azureMonitorExporterOptions: {
        connectionString: "InstrumentationKey=00000000-0000-0000-0000-000000000000",
      },
      browserSdkLoaderOptions: {
        enabled: true,
        connectionString: "InstrumentationKey=00000000-0000-0000-0000-000000000000",
      },
    };
    useAzureMonitor(config);
    let browserSdkLoader = BrowserSdkLoader.getInstance();

    let _headers: any = {};
    let response: http.ServerResponse = <any>{
      setHeader: (header: string, value: string) => {
        _headers[header] = value;
      },
      getHeader: (header: string) => {
        return _headers[header];
      },
    };
    response.statusCode = 300;
    let validHtml = "<html><head></head><body></body></html>";
    assert.equal(browserSdkLoader.ValidateInjection(response, validHtml), false); // status code is not 200
    response.statusCode = 200;
    assert.equal(browserSdkLoader.ValidateInjection(response, validHtml), false); // No html header
    response.setHeader("Content-Type", "text/html");
    assert.equal(browserSdkLoader.ValidateInjection(response, validHtml), true); // Valid
    assert.equal(browserSdkLoader.ValidateInjection(response, "test"), false); // No html text
    assert.equal(browserSdkLoader.ValidateInjection(response, "<html><body></body></html>"), false); // No head element
    response.setHeader("Content-Type", "text/plain");
    assert.equal(browserSdkLoader.ValidateInjection(response, validHtml), false); // No HTML content type
    response.setHeader("Content-Type", "text/html");
    let validBuffer = Buffer.from(validHtml);
    assert.equal(browserSdkLoader.ValidateInjection(response, validBuffer), true); // Valid Buffer
    assert.equal(browserSdkLoader.ValidateInjection(response, Buffer.from("test")), false); // not valid Buffer
  });

  it("should load the browser SDK loader", () => {
    const config: AzureMonitorOpenTelemetryOptions = {
      azureMonitorExporterOptions: {
        connectionString: "InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3333",
      },
      browserSdkLoaderOptions: {
        enabled: true,
        connectionString: "InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3333",
      },
    };
    useAzureMonitor(config);
    let browserSdkLoader = BrowserSdkLoader.getInstance();

    let _headers: any = {};

    let response: http.ServerResponse = <any>{
      setHeader: (header: string, value: string) => {
        _headers[header] = value;
      },
      getHeader: (header: string) => {
        return _headers[header];
      },
      removeHeader: (header: string) => {
        _headers[header] = undefined;
      },
    };
    response.setHeader("Content-Type", "text/html");
    response.statusCode = 200;
    let validHtml = "<html><head></head><body></body></html>";
    assert.equal(browserSdkLoader.ValidateInjection(response, validHtml), true);
    let newHtml = browserSdkLoader.InjectSdkLoader(response, validHtml).toString();
    assert.ok(newHtml.indexOf("https://js.monitor.azure.com/scripts/b/ai.2.min.js") >= 0);
    assert.ok(newHtml.indexOf("<html><head>") == 0);
    assert.ok(newHtml.indexOf('instrumentationKey: "1aa11111-bbbb-1ccc-8ddd-eeeeffff3333"') >= 0);
  });

  it("injection of browser SDK should overwrite content length ", () => {
    const config: AzureMonitorOpenTelemetryOptions = {
      azureMonitorExporterOptions: {
        connectionString: "InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3333",
      },
      browserSdkLoaderOptions: {
        enabled: true,
        connectionString: "InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3333",
      },
    };
    useAzureMonitor(config);
    let browserSdkLoader = BrowserSdkLoader.getInstance();
    let _headers: any = {};
    let response: http.ServerResponse = <any>{
      setHeader: (header: string, value: string) => {
        _headers[header] = value;
      },
      getHeader: (header: string) => {
        return _headers[header];
      },
      removeHeader: (header: string) => {
        _headers[header] = undefined;
      },
    };
    response.setHeader("Content-Type", "text/html");
    response.setHeader("Content-Length", 39);
    let validHtml = "<html><head></head><body></body></html>";
    let newHtml = browserSdkLoader.InjectSdkLoader(response, validHtml).toString();
    assert.ok(newHtml.length > 4000);
    assert.ok(Number(response.getHeader("Content-Length")) > 4000); // Content length updated
  });

  it("browser SDK loader should use provided snippet src url ", () => {
    const config: AzureMonitorOpenTelemetryOptions = {
      azureMonitorExporterOptions: {
        connectionString: "InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3333",
      },
      browserSdkLoaderOptions: {
        enabled: true,
        connectionString: "InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3333",
        src: "WebInstrumentationTestSourceURL",
      },
    };
    useAzureMonitor(config);
    let browserSdkLoader = BrowserSdkLoader.getInstance();
    let _headers: any = {};
    let response: http.ServerResponse = <any>{
      setHeader: (header: string, value: string) => {
        _headers[header] = value;
      },
      getHeader: (header: string) => {
        return _headers[header];
      },
      removeHeader: (header: string) => {
        _headers[header] = undefined;
      },
    };
    response.setHeader("Content-Type", "text/html");
    response.statusCode = 200;
    let validHtml = "<html><head></head><body></body></html>";
    assert.equal(browserSdkLoader.ValidateInjection(response, validHtml), true);
    let newHtml = browserSdkLoader.InjectSdkLoader(response, validHtml).toString();
    assert.ok(newHtml.indexOf("https://js.monitor.azure.com/scripts/b/ai.2.min.js") < 0);
    assert.ok(newHtml.indexOf("WebInstrumentationTestSourceURL") >= 0);
    assert.ok(newHtml.indexOf("<html><head>") == 0);
    assert.ok(newHtml.indexOf('instrumentationKey: "1aa11111-bbbb-1ccc-8ddd-eeeeffff3333"') >= 0);
  });

  it("browser SDK loader should use provided config ", () => {
    const config: AzureMonitorOpenTelemetryOptions = {
      azureMonitorExporterOptions: {
        connectionString: "InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3333",
      },
      browserSdkLoaderOptions: {
        enabled: true,
        connectionString: "InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3333",
        src: "WebInstrumentationTestSourceURL",
        config: {
          src: "WebInstrumentationTestSourceURL",
          name: "WebInstrumentationTestName",
          ld: 1000,
          cfg: "{ config: test }",
        },
      },
    };
    useAzureMonitor(config);
    let browserSdkLoader = BrowserSdkLoader.getInstance();

    let _headers: any = {};
    let response: http.ServerResponse = <any>{
      setHeader: (header: string, value: string) => {
        _headers[header] = value;
      },
      getHeader: (header: string) => {
        return _headers[header];
      },
      removeHeader: (header: string) => {
        _headers[header] = undefined;
      },
    };
    response.setHeader("Content-Type", "text/html");
    response.statusCode = 200;
    let validHtml = "<html><head></head><body></body></html>";
    assert.equal(browserSdkLoader.ValidateInjection(response, validHtml), true);
    let newHtml = browserSdkLoader.InjectSdkLoader(response, validHtml);
    let osType: string = "u";
    if (isWindows()) {
      osType = "w";
    } else if (isLinux()) {
      osType = "l";
    }
    let expectedStr = `    instrumentationKey: "1aa11111-bbbb-1ccc-8ddd-eeeeffff3333",\r\n src: "WebInstrumentationTestSourceURL",\r\n name: "WebInstrumentationTestName",\r\n cfg: "{ config: test }",\r\n disableIkeyDeprecationMessage: true,\r\n sdkExtension: "u${osType}d_n_`;
    assert.ok(newHtml.indexOf("https://js.monitor.azure.com/scripts/b/ai.2.min.js") < 0);
    assert.ok(newHtml.indexOf("WebInstrumentationTestSourceURL") >= 0);
    assert.ok(newHtml.indexOf("<html><head>") == 0);
    assert.ok(newHtml.indexOf(expectedStr) >= 0, expectedStr);
  });

  it("browser SDK loader injection to buffer", () => {
    const config: AzureMonitorOpenTelemetryOptions = {
      azureMonitorExporterOptions: {
        connectionString: "InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3333",
      },
      browserSdkLoaderOptions: {
        enabled: true,
        connectionString: "InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3333",
      },
    };
    useAzureMonitor(config);
    let browserSdkLoader = BrowserSdkLoader.getInstance();

    let _headers: any = {};
    let response: http.ServerResponse = <any>{
      setHeader: (header: string, value: string) => {
        _headers[header] = value;
      },
      getHeader: (header: string) => {
        return _headers[header];
      },
      removeHeader: (header: string) => {
        _headers[header] = undefined;
      },
    };
    response.setHeader("Content-Type", "text/html");
    response.statusCode = 200;
    let validHtml = "<html><head></head><body></body></html>";
    let validBuffer = Buffer.from(validHtml);
    assert.equal(browserSdkLoader.ValidateInjection(response, validBuffer), true);
    let newHtml = browserSdkLoader.InjectSdkLoader(response, validBuffer).toString();
    assert.ok(newHtml.indexOf("https://js.monitor.azure.com/scripts/b/ai.2.min.js") >= 0);
    assert.ok(newHtml.indexOf("<html><head>") == 0);
    assert.ok(newHtml.indexOf('instrumentationKey: "1aa11111-bbbb-1ccc-8ddd-eeeeffff3333"') >= 0);
  });

  it("injection of browser SDK should overwrite content length using buffer ", () => {
    const config: AzureMonitorOpenTelemetryOptions = {
      azureMonitorExporterOptions: {
        connectionString: "InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3333",
      },
      browserSdkLoaderOptions: {
        enabled: true,
        connectionString: "InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3333",
      },
    };
    useAzureMonitor(config);
    let browserSdkLoader = BrowserSdkLoader.getInstance();

    let _headers: any = {};
    let response: http.ServerResponse = <any>{
      setHeader: (header: string, value: string) => {
        _headers[header] = value;
      },
      getHeader: (header: string) => {
        return _headers[header];
      },
      removeHeader: (header: string) => {
        _headers[header] = undefined;
      },
    };
    let validHtml =
      "<html><head></head><body>ZKrIVPWptS13MH4my8kbkjWHF5BoNUIfvzfvt6LSE3qg1GoMOZ9bgNJcdcUXDc3l3jyCP9WIK2Z002rqBCn24cfwYjXLmq6kOO6SVFIFhQqNUwrmpA5" +
      "vumrQRAHtkqJWWV91I1NS2VjwYpmCytH8rg6qAScR0Qoy0UFXQGd0QO1hkqwH2jzEApklsDqCgMavANBoqKfg715afWySfKba9YG6S5iIIIySsBeg1vlM3" +
      "7fvNKTeA7wHHK8IOkbWlTM70yFn1flvJKOlbsabIgnO48atkizsyS0ITZKudpYzcALY3simblbi0I3DIwUjfW46FHyXYTfvfmNo9cbOyVZsJQrJshp2zck</body></html>";
    let validBuffer = Buffer.from(validHtml);
    let originalBufferSize = validBuffer.length;
    response.setHeader("Content-Type", "text/html");
    response.setHeader("Content-Length", originalBufferSize);
    let newHtml = browserSdkLoader.InjectSdkLoader(response, validBuffer);
    let isValidBufferEncode = BrowserSdkLoaderHelper.isBufferType(validBuffer, "utf8");
    assert.ok(isValidBufferEncode);

    assert.ok(newHtml.length > originalBufferSize);
    assert.ok(Number(response.getHeader("Content-Length")) > originalBufferSize); // Content length updated
  });

  it("injection should use correct connection string from config", () => {
    const config: AzureMonitorOpenTelemetryOptions = {
      azureMonitorExporterOptions: {
        connectionString: "InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3333",
      },
      browserSdkLoaderOptions: {
        enabled: true,
        connectionString: "InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3333",
      },
    };
    useAzureMonitor(config);
    let browserSdkLoader = BrowserSdkLoader.getInstance();

    assert.equal(browserSdkLoader["_isIkeyValid"], true, "ikey should be set to valid");
    let _headers: any = {};
    let response: http.ServerResponse = <any>{
      setHeader: (header: string, value: string) => {
        _headers[header] = value;
      },
      getHeader: (header: string) => {
        return _headers[header];
      },
      removeHeader: (header: string) => {
        _headers[header] = undefined;
      },
    };
    response.setHeader("Content-Type", "text/html");
    response.statusCode = 200;
    let validHtml = "<html><head></head><body></body></html>";
    assert.equal(browserSdkLoader.ValidateInjection(response, validHtml), true);
    let newHtml = browserSdkLoader.InjectSdkLoader(response, validHtml).toString();
    assert.ok(newHtml.indexOf("https://js.monitor.azure.com/scripts/b/ai.2.min.js") >= 0, newHtml);
    assert.ok(newHtml.indexOf("<html><head>") == 0);
    assert.ok(newHtml.indexOf('instrumentationKey: "1aa11111-bbbb-1ccc-8ddd-eeeeffff3333"') >= 0);
  });

  it("injection should throw errors when ikey from config is not valid", () => {
    const infoStub = sandbox.stub(console, "info");
    const config: AzureMonitorOpenTelemetryOptions = {
      azureMonitorExporterOptions: {
        connectionString: "InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3333",
      },
      browserSdkLoaderOptions: {
        enabled: true,
        connectionString:
          "InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3330ffafffw;IngestionEndpoint=https://centralus-0.in.applicationinsights.azure.com/",
      },
    };
    useAzureMonitor(config);
    const browserSdkLoader = BrowserSdkLoader.getInstance();

    assert.equal(browserSdkLoader["_isIkeyValid"], false, "ikey should be set to invalid");
    assert.ok(infoStub.calledOn, "invalid key warning was raised");
  });
});

import * as assert from "assert";
import * as http from "http";
import * as sinon from "sinon";
import * as os from "os";
import { WebSnippet } from "../../../../src/webSnippet/webSnippet";
import * as SnippetInjectionHelper from "../../../../src/webSnippet/snippetInjectionHelper";
import { shutdownAzureMonitor, useAzureMonitor } from "../../../../src/index";

describe("#WebSnippet", () => {
  var sandbox: sinon.SinonSandbox;
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

  it("should initialize the web snippet", () => {
    let config = {
      azureMonitorExporterOptions: {
        connectionString: "InstrumentationKey=00000000-0000-0000-0000-000000000000",
      },
      enableWebInstrumentation: true,
      webInstrumentationConnectionString: "InstrumentationKey=00000000-0000-0000-0000-000000000000",
    };
    useAzureMonitor(config);
    assert.strictEqual(WebSnippet.getInstance().isInitialized(), true);
  });

  it("injection should be triggered only in HTML responses", () => {
    let config = {
      azureMonitorExporterOptions: {
        connectionString: "InstrumentationKey=00000000-0000-0000-0000-000000000000",
      },
      enableWebInstrumentation: true,
      webInstrumentationConnectionString: "InstrumentationKey=00000000-0000-0000-0000-000000000000",
    };
    useAzureMonitor(config);
    let webSnippet = WebSnippet.getInstance();

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
    assert.equal(webSnippet.ValidateInjection(response, validHtml), false); // status code is not 200
    response.statusCode = 200;
    assert.equal(webSnippet.ValidateInjection(response, validHtml), false); // No html header
    response.setHeader("Content-Type", "text/html");
    assert.equal(webSnippet.ValidateInjection(response, validHtml), true); // Valid
    assert.equal(webSnippet.ValidateInjection(response, "test"), false); // No html text
    assert.equal(webSnippet.ValidateInjection(response, "<html><body></body></html>"), false); // No head element
    response.setHeader("Content-Type", "text/plain");
    assert.equal(webSnippet.ValidateInjection(response, validHtml), false); // No HTML content type
    response.setHeader("Content-Type", "text/html");
    let validBuffer = Buffer.from(validHtml);
    assert.equal(webSnippet.ValidateInjection(response, validBuffer), true); // Valid Buffer
    assert.equal(webSnippet.ValidateInjection(response, Buffer.from("test")), false); // not valid Buffer
  });

  it("should inject the web snippet", () => {
    let config = {
      azureMonitorExporterOptions: {
        connectionString: "InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3333",
      },
      enableWebInstrumentation: true,
      webInstrumentationConnectionString: "InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3333",
    };
    useAzureMonitor(config);
    let webSnippet = WebSnippet.getInstance();

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
    assert.equal(webSnippet.ValidateInjection(response, validHtml), true);
    let newHtml = webSnippet.InjectWebSnippet(response, validHtml).toString();
    assert.ok(newHtml.indexOf("https://js.monitor.azure.com/scripts/b/ai.2.min.js") >= 0);
    assert.ok(newHtml.indexOf("<html><head>") == 0);
    assert.ok(newHtml.indexOf('instrumentationKey: "1aa11111-bbbb-1ccc-8ddd-eeeeffff3333"') >= 0);
  });

  it("injection web snippet should overwrite content length ", () => {
    let config = {
      azureMonitorExporterOptions: {
        connectionString: "InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3333",
      },
      enableWebInstrumentation: true,
      webInstrumentationConnectionString: "InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3333",
    };
    useAzureMonitor(config);
    let webSnippet = WebSnippet.getInstance();
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
    let newHtml = webSnippet.InjectWebSnippet(response, validHtml).toString();
    assert.ok(newHtml.length > 4000);
    assert.ok(Number(response.getHeader("Content-Length")) > 4000); // Content length updated
  });

  it("snippet should use provided snippet src url ", () => {
    let config = {
      azureMonitorExporterOptions: {
        connectionString: "InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3333",
      },
      enableWebInstrumentation: true,
      webInstrumentationConnectionString: "InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3333",
      webInstrumentationSrc: "WebInstrumentationTestSourceURL",
    };
    useAzureMonitor(config);
    let webSnippet = WebSnippet.getInstance();
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
    assert.equal(webSnippet.ValidateInjection(response, validHtml), true);
    let newHtml = webSnippet.InjectWebSnippet(response, validHtml).toString();
    assert.ok(newHtml.indexOf("https://js.monitor.azure.com/scripts/b/ai.2.min.js") < 0);
    assert.ok(newHtml.indexOf("WebInstrumentationTestSourceURL") >= 0);
    assert.ok(newHtml.indexOf("<html><head>") == 0);
    assert.ok(newHtml.indexOf('instrumentationKey: "1aa11111-bbbb-1ccc-8ddd-eeeeffff3333"') >= 0);
  });

  it("snippet should use provided config ", () => {
    let config = {
      azureMonitorExporterOptions: {
        connectionString: "InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3333",
      },
      enableWebInstrumentation: true,
      webInstrumentationConnectionString: "InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3333",
      webInstrumentationSrc: "WebInstrumentationTestSourceURL",
      webInstrumentationConfig: [
        { name: "key1", value: "key1" },
        { name: "key2", value: true },
      ],
    };
    useAzureMonitor(config);
    let webSnippet = WebSnippet.getInstance();

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
    assert.equal(webSnippet.ValidateInjection(response, validHtml), true);
    let newHtml = webSnippet.InjectWebSnippet(response, validHtml);
    let osType = os.type() === "Windows_NT" ? "w" : "l";
    let expectedStr = `    instrumentationKey: "1aa11111-bbbb-1ccc-8ddd-eeeeffff3333",\r\n key1: "key1",\r\n key2: true,\r\n disableIkeyDeprecationMessage: true,\r\n sdkExtension: "u${osType}d_n_`;
    assert.ok(newHtml.indexOf("https://js.monitor.azure.com/scripts/b/ai.2.min.js") < 0);
    assert.ok(newHtml.indexOf("WebInstrumentationTestSourceURL") >= 0);
    assert.ok(newHtml.indexOf("<html><head>") == 0);
    assert.ok(newHtml.indexOf(expectedStr) >= 0, expectedStr);
  });

  it("web snippet injection to buffer", () => {
    let config = {
      azureMonitorExporterOptions: {
        connectionString: "InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3333",
      },
      enableWebInstrumentation: true,
      webInstrumentationConnectionString: "InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3333",
    };
    useAzureMonitor(config);
    let webSnippet = WebSnippet.getInstance();

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
    assert.equal(webSnippet.ValidateInjection(response, validBuffer), true);
    let newHtml = webSnippet.InjectWebSnippet(response, validBuffer).toString();
    assert.ok(newHtml.indexOf("https://js.monitor.azure.com/scripts/b/ai.2.min.js") >= 0);
    assert.ok(newHtml.indexOf("<html><head>") == 0);
    assert.ok(newHtml.indexOf('instrumentationKey: "1aa11111-bbbb-1ccc-8ddd-eeeeffff3333"') >= 0);
  });

  it("injection web snippet should overwrite content length using buffer ", () => {
    let config = {
      azureMonitorExporterOptions: {
        connectionString: "InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3333",
      },
      enableWebInstrumentation: true,
      webInstrumentationConnectionString: "InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3333",
    };
    useAzureMonitor(config);
    let webSnippet = WebSnippet.getInstance();

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
    let newHtml = webSnippet.InjectWebSnippet(response, validBuffer);
    let isValidBufferEncode = SnippetInjectionHelper.isBufferType(validBuffer, "utf8");
    assert.ok(isValidBufferEncode);

    assert.ok(newHtml.length > originalBufferSize);
    assert.ok(Number(response.getHeader("Content-Length")) > originalBufferSize); // Content length updated
  });

  it("injection should use correct connection string from config", () => {
    let config = {
      azureMonitorExporterOptions: {
        connectionString: "InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3333",
      },
      enableWebInstrumentation: true,
      webInstrumentationConnectionString:
        "InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3330;IngestionEndpoint=https://centralus-0.in.applicationinsights.azure.com/",
    };
    useAzureMonitor(config);
    let webSnippet = WebSnippet.getInstance();

    assert.equal(webSnippet["_isIkeyValid"], true, "ikey should be set to valid");
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
    assert.equal(webSnippet.ValidateInjection(response, validHtml), true);
    let newHtml = webSnippet.InjectWebSnippet(response, validHtml).toString();
    assert.ok(newHtml.indexOf("https://js.monitor.azure.com/scripts/b/ai.2.min.js") >= 0);
    assert.ok(newHtml.indexOf("<html><head>") == 0);
    assert.ok(newHtml.indexOf('instrumentationKey: "1aa11111-bbbb-1ccc-8ddd-eeeeffff3330"') >= 0);
  });

  it("injection should throw errors when ikey from config is not valid", () => {
    var infoStub = sandbox.stub(console, "info");
    let config = {
      azureMonitorExporterOptions: {
        connectionString: "InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3333",
      },
      enableWebInstrumentation: true,
      webInstrumentationConnectionString:
        "InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeff;IngestionEndpoint=https://centralus-0.in.applicationinsights.azure.com/",
    };
    useAzureMonitor(config);
    let webSnippet = WebSnippet.getInstance();

    assert.equal(webSnippet["_isIkeyValid"], false, "ikey should be set to invalid");
    assert.ok(infoStub.calledOn, "invalid key warning was raised");
  });
});

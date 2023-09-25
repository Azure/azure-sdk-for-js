import { Resource } from "@opentelemetry/resources";
import fs from "fs";
import path from "path";
import { ResourceMetrics, MeterProvider, PeriodicExportingMetricReaderOptions, PeriodicExportingMetricReader } from "@opentelemetry/sdk-metrics";
import { resourceMetricsToEnvelope } from "../../src/utils/metricUtils";
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions";
import { AzureMonitorMetricExporter } from "../../src/export/metric";
import { AzureMonitorExporterOptions } from "../../src/config";
import { TelemetryItem as Envelope, KnownContextTagKeys, RemoteDependencyData, RequestData } from "../../src/generated";
import assert from "assert";
import { Tags } from "../../src/types";
import { Context, getInstance } from "../../src/platform";

const context = getInstance();
const packageJsonPath = path.resolve(__dirname, "../../../", "./package.json");
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

let testMetrics: ResourceMetrics;
class TestExporter extends AzureMonitorMetricExporter {
    constructor(options: AzureMonitorExporterOptions = {}) {
        super(options);
    }
    async export(
        metrics: ResourceMetrics,
    ): Promise<void> {
        testMetrics = metrics;
    }
}

function assertEnvelope(
    envelope: Envelope,
    name: string,
    sampleRate: number,
    baseType: string,
    expectedTags: Tags,
    expectedBaseData: Partial<RequestData | RemoteDependencyData>,
    expectedTime?: Date
): void {
    assert.strictEqual(Context.sdkVersion, packageJson.version);
    assert.ok(envelope);
    assert.strictEqual(envelope.name, name);
    assert.strictEqual(envelope.sampleRate, sampleRate);
    assert.deepStrictEqual(envelope.data?.baseType, baseType);

    assert.strictEqual(envelope.instrumentationKey, "ikey");
    assert.ok(envelope.time);
    assert.ok(envelope.version);
    assert.ok(envelope.data);

    if (expectedTime) {
        assert.deepStrictEqual(envelope.time, expectedTime);
    }

    const expectedServiceTags: Tags = {
        [KnownContextTagKeys.AiCloudRole]: "testServiceNamespace.testServiceName",
        [KnownContextTagKeys.AiCloudRoleInstance]: "testServiceInstanceID",
    };
    assert.deepStrictEqual(envelope.tags, {
        ...context.tags,
        ...expectedServiceTags,
        ...expectedTags,
    });
    assert.deepStrictEqual(envelope.data?.baseData?.metrics[0], expectedBaseData);
};

describe("metricUtil.ts", () => {
    describe("#resourceMetricsToEnvelope", () => {
        it("should create a metric envelope", async () => {
            const expectedTags: Tags = {
                'ai.device.osVersion': 'Windows_NT 10.0.22621',
                'ai.internal.sdkVersion': 'testPrefix_node16:otel1.17.0:dst_testDistroVersion',
                'ai.cloud.role': 'basic-service',
                'ai.cloud.roleInstance': 'jackson-msft'
            };
            const expectedBaseData: Partial<RequestData> = {
                name: "counter",
                value: 1,
                dataPointType: "Aggregation",
                count: 1,
            };
            const provider = new MeterProvider({
            resource: new Resource({
                [SemanticResourceAttributes.SERVICE_NAME]: "basic-service",
            }),
            });
            const exporter = new TestExporter({ connectionString: "InstrumentationKey=00000000-0000-0000-0000-000000000000" });
            const metricReaderOptions: PeriodicExportingMetricReaderOptions = {
            exporter: exporter,
            };
            const metricReader = new PeriodicExportingMetricReader(metricReaderOptions);
            provider.addMetricReader(metricReader);
            const meter = provider.getMeter("example-meter-node");
            // Create Counter instrument with the meter
            let counter = meter.createCounter("counter");
            counter.add(1);
            provider.forceFlush();
            await new Promise((resolve) => setTimeout(resolve, 800));
            const envelope = resourceMetricsToEnvelope(
                testMetrics,
                "ikey"
            );

            console.log("HEYO LES GET THIS ENVELOPE: ", envelope[0].data?.baseData?.metrics[0]);
            
            assertEnvelope(
                envelope[0],
                "Microsoft.ApplicationInsights.Metric",
                100,
                "MetricData",
                expectedTags,
                expectedBaseData
            );
        });
    });
});
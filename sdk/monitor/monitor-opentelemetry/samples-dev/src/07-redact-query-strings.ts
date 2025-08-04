/**
 * Redact Query Strings Example
 *
 * This example demonstrates how to redact URL query strings from telemetry data
 * to protect sensitive information like SAS tokens.
 */

/**
 * Custom span processor that redacts query strings from HTTP attributes
 */
import { Span, Context } from "@opentelemetry/api";
class RedactQueryStringProcessor {
  forceFlush() {
    return Promise.resolve();
  }

  onStart(span: Span, parentContext: Context) {
    // No action needed on span start
    return;
  }

  shutdown() {
    return Promise.resolve();
  }

  onEnd(span: Span) {
    // Import semantic conventions inside the method
    const {
      SEMATTRS_HTTP_ROUTE,
      SEMATTRS_HTTP_TARGET,
      SEMATTRS_HTTP_URL,
    } = require("@opentelemetry/semantic-conventions");

    // Find the index of the query string separator '?' in each HTTP attribute
    const httpRouteIndex = String(span.attributes[SEMATTRS_HTTP_ROUTE] || "").indexOf("?");
    const httpUrlIndex = String(span.attributes[SEMATTRS_HTTP_URL] || "").indexOf("?");
    const httpTargetIndex = String(span.attributes[SEMATTRS_HTTP_TARGET] || "").indexOf("?");

    // Remove query strings by keeping only the part before '?'
    if (httpRouteIndex !== -1) {
      span.attributes[SEMATTRS_HTTP_ROUTE] = String(span.attributes[SEMATTRS_HTTP_ROUTE]).substring(
        0,
        httpRouteIndex,
      );
    }
    if (httpUrlIndex !== -1) {
      span.attributes[SEMATTRS_HTTP_URL] = String(span.attributes[SEMATTRS_HTTP_URL]).substring(
        0,
        httpUrlIndex,
      );
    }
    if (httpTargetIndex !== -1) {
      span.attributes[SEMATTRS_HTTP_TARGET] = String(
        span.attributes[SEMATTRS_HTTP_TARGET],
      ).substring(0, httpTargetIndex);
    }
  }
}

export class RedactQueryStringExample {
  static async run() {
    // Import dependencies inside the method for easier copying to documentation
    const { useAzureMonitor } = await import("@azure/monitor-opentelemetry");

    try {
      // Configure Azure Monitor with query string redaction
      const options = {
        azureMonitorExporterOptions: {
          connectionString:
            process.env.APPLICATIONINSIGHTS_CONNECTION_STRING || "<your connection string>",
        },
        spanProcessors: [new RedactQueryStringProcessor()],
      };

      // Enable Azure Monitor integration with query string redaction
      useAzureMonitor(options);

      console.log("Azure Monitor configured with query string redaction:");
      console.log("   Query strings will be removed from telemetry");
      console.log("   Protects sensitive information (SAS tokens, API keys, etc.)");
      console.log("   HTTP attributes affected:");
      console.log("      - http.route");
      console.log("      - http.url");
      console.log("      - http.target");

      // Demonstrate the redaction
      console.log("\nDemonstrating query string redaction...");

      // Simulate URLs that would have query strings redacted
      const exampleUrls = [
        "/api/data?token=secret123&userId=456",
        "/storage/blob?sv=2020-08-04&ss=b&srt=sco&sp=rwdlacup&se=...",
        "/search?q=sensitive+data&apikey=abc123",
        "/upload?signature=xyz789&timestamp=1234567890",
      ];

      console.log("\nExample URLs before redaction:");
      exampleUrls.forEach((url, index) => {
        console.log(`   ${index + 1}. ${url}`);
      });

      console.log("\nAfter redaction, telemetry would show:");
      exampleUrls.forEach((url, index) => {
        const redacted = url.split("?")[0];
        console.log(`   ${index + 1}. ${redacted}`);
      });

      console.log("\nQuery strings successfully redacted from telemetry");
      console.log("Sensitive information is now protected");

      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error("Error configuring Azure Monitor:", error);
    }
  }

  static showRedactionInfo() {
    console.log("\nQuery String Redaction Information:");
    console.log("Why redact query strings?");
    console.log("   - Protect sensitive information (SAS tokens, API keys)");
    console.log("   - Comply with data privacy requirements");
    console.log("   - Prevent accidental exposure in logs and telemetry");
    console.log("\nWhat gets redacted:");
    console.log('   - Everything after "?" in URLs');
    console.log("   - Affects http.route, http.url, and http.target attributes");
    console.log("   - Applied during span processing");
    console.log("\nImplementation:");
    console.log("   - Custom SpanProcessor implementation");
    console.log("   - Processes spans when they end");
    console.log("   - Modifies attributes before export");
    console.log("\nCommon use cases:");
    console.log("   - Azure Storage with SAS tokens");
    console.log("   - APIs with authentication tokens");
    console.log("   - Search queries with sensitive terms");
    console.log("   - Any URL parameters containing secrets");
  }
}

// Usage instructions
if (require.main === module) {
  RedactQueryStringExample.showRedactionInfo();
}

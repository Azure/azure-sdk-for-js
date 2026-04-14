// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using Microsoft.SdkChat.Models;
using Microsoft.SdkChat.Services;
using Xunit;

namespace Microsoft.SdkChat.Tests.RealWorldSdkStructures;

/// <summary>
/// Tests based on real-world Go SDK repository structures from top GitHub repos.
/// Each test represents a distinct, deduped pattern found in popular Go SDKs.
/// </summary>
[Collection("SdkInfoCache")]
public class GoSdkStructuresTests : SdkStructureTestBase
{
    // Pattern 1: Flat module - *.go at root
    // Examples: go-openai, stripe-go
    [Fact]
    public void Pattern01_FlatModuleAtRoot()
    {
        CreateFile("go.mod");
        CreateFile("client.go");
        CreateFile("chat.go");
        CreateFile("completion.go");
        var examples = CreatePath("examples");
        CreateFile(examples, "chat.go");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Go, info.Language);
        Assert.Equal(_testRoot, info.SourceFolder);
        Assert.Equal(examples, info.SamplesFolder);
    }

    // Pattern 2: pkg folder structure
    // Examples: Go SDK packages
    [Fact]
    public void Pattern02_PkgFolder()
    {
        CreateFile("go.mod");
        var pkg = CreatePath("pkg");
        CreateFile(pkg, "client.go");
        CreateFile(pkg, "container.go");
        var examples = CreatePath("examples");
        CreateFile(examples, "example_test.go");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Go, info.Language);
        Assert.Equal(pkg, info.SourceFolder);
        Assert.Equal(examples, info.SamplesFolder);
    }

    // Pattern 3: internal folder
    // Examples: Many Go SDKs with private implementation
    [Fact]
    public void Pattern03_InternalFolder()
    {
        CreateFile("go.mod");
        CreateFile("client.go");
        var internal_ = CreatePath("internal");
        CreateFile(internal_, "http.go");
        CreateFile(internal_, "transport.go");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Go, info.Language);
        // Should prefer root with source files
        Assert.Equal(_testRoot, info.SourceFolder);
    }

    // Pattern 4: cmd folder for examples
    // Examples: Some CLI-style SDKs
    [Fact]
    public void Pattern04_CmdFolder()
    {
        CreateFile("go.mod");
        CreateFile("client.go");
        var cmd = CreatePath("cmd", "example");
        CreateFile(cmd, "main.go");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Go, info.Language);
        Assert.Equal(_testRoot, info.SourceFolder);
    }

    // Pattern 5: pkg/subpackage structure
    // Examples: Anthropic-go style
    [Fact]
    public void Pattern05_PkgSubpackage()
    {
        CreateFile("go.mod");
        var pkg = CreatePath("pkg", "anthropic");
        CreateFile(pkg, "client.go");
        CreateFile(pkg, "messages.go");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Go, info.Language);
        Assert.Equal(pkg, info.SourceFolder);
    }

    // Pattern 6: Root with versioned subfolders
    // Examples: Some API versioned SDKs
    [Fact]
    public void Pattern06_VersionedSubfolders()
    {
        CreateFile("go.mod");
        CreateFile("client.go");
        var v1 = CreatePath("v1");
        CreateFile(v1, "client.go");
        var v2 = CreatePath("v2");
        CreateFile(v2, "client.go");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Go, info.Language);
        // Should prefer root
        Assert.Equal(_testRoot, info.SourceFolder);
    }

    // Pattern 7: Flat with internal and examples
    // Examples: twilio-go
    [Fact]
    public void Pattern07_FlatWithInternalAndExamples()
    {
        CreateFile("go.mod");
        CreateFile("client.go");
        CreateFile("rest_api.go");
        var internal_ = CreatePath("internal");
        CreateFile(internal_, "helper.go");
        var examples = CreatePath("examples");
        CreateFile(examples, "send_message.go");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Go, info.Language);
        Assert.Equal(_testRoot, info.SourceFolder);
        Assert.Equal(examples, info.SamplesFolder);
    }

    // Pattern 8: service subfolder pattern
    // Examples: AWS SDK v2 service packages
    [Fact]
    public void Pattern08_ServiceSubfolder()
    {
        CreateFile("go.mod");
        CreateFile("api_client.go");
        CreateFile("api_op_GetObject.go");
        var examples = CreatePath("examples");
        CreateFile(examples, "example_test.go");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Go, info.Language);
        Assert.Equal(_testRoot, info.SourceFolder);
        Assert.Equal(examples, info.SamplesFolder);
    }

    // Pattern 9: pkg with nested subpackages
    // Examples: Google Cloud Go
    [Fact]
    public void Pattern09_PkgNestedSubpackages()
    {
        CreateFile("go.mod");
        var storage = CreatePath("storage");
        CreateFile(storage, "client.go");
        CreateFile(storage, "bucket.go");
        var internal_ = CreatePath(storage, "internal");
        CreateFile(internal_, "connection.go");
        var examples = CreatePath(storage, "examples");
        CreateFile(examples, "example_test.go");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Go, info.Language);
        // Should prefer storage with most files
        Assert.Contains("storage", info.SourceFolder);
    }

    // Pattern 10: Root with testdata folder
    // Examples: Many Go SDKs
    [Fact]
    public void Pattern10_RootWithTestdata()
    {
        CreateFile("go.mod");
        CreateFile("client.go");
        CreateFile("models.go");
        var testdata = CreatePath("testdata");
        CreateFile(testdata, "fixtures.json");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Go, info.Language);
        Assert.Equal(_testRoot, info.SourceFolder);
    }

    // Pattern 11: api subfolder
    // Examples: API client libraries
    [Fact]
    public void Pattern11_ApiSubfolder()
    {
        CreateFile("go.mod");
        var api = CreatePath("api");
        CreateFile(api, "client.go");
        CreateFile(api, "types.go");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Go, info.Language);
    }

    // Pattern 12: Root with types subfolder
    // Examples: Type-heavy SDKs
    [Fact]
    public void Pattern12_TypesSubfolder()
    {
        CreateFile("go.mod");
        CreateFile("client.go");
        var types = CreatePath("types");
        CreateFile(types, "models.go");
        CreateFile(types, "request.go");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Go, info.Language);
        Assert.Equal(_testRoot, info.SourceFolder);
    }

    // Pattern 13: Root with errors subfolder
    // Examples: Error-rich SDKs
    [Fact]
    public void Pattern13_ErrorsSubfolder()
    {
        CreateFile("go.mod");
        CreateFile("client.go");
        var errors = CreatePath("errors");
        CreateFile(errors, "api_error.go");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Go, info.Language);
        Assert.Equal(_testRoot, info.SourceFolder);
    }

    // Pattern 14: Root with config subfolder
    // Examples: Configuration SDKs
    [Fact]
    public void Pattern14_ConfigSubfolder()
    {
        CreateFile("go.mod");
        CreateFile("client.go");
        var config = CreatePath("config");
        CreateFile(config, "options.go");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Go, info.Language);
        Assert.Equal(_testRoot, info.SourceFolder);
    }

    // Pattern 15: Root with auth subfolder
    // Examples: Auth SDKs
    [Fact]
    public void Pattern15_AuthSubfolder()
    {
        CreateFile("go.mod");
        CreateFile("client.go");
        var auth = CreatePath("auth");
        CreateFile(auth, "oauth.go");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Go, info.Language);
        Assert.Equal(_testRoot, info.SourceFolder);
    }

    // Pattern 16: Root with http subfolder
    // Examples: HTTP client SDKs
    [Fact]
    public void Pattern16_HttpSubfolder()
    {
        CreateFile("go.mod");
        CreateFile("client.go");
        var http = CreatePath("http");
        CreateFile(http, "transport.go");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Go, info.Language);
        Assert.Equal(_testRoot, info.SourceFolder);
    }

    // Pattern 17: Root with middleware subfolder
    // Examples: Middleware SDKs
    [Fact]
    public void Pattern17_MiddlewareSubfolder()
    {
        CreateFile("go.mod");
        CreateFile("client.go");
        var middleware = CreatePath("middleware");
        CreateFile(middleware, "retry.go");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Go, info.Language);
        Assert.Equal(_testRoot, info.SourceFolder);
    }

    // Pattern 18: Root with retry subfolder
    // Examples: Retry logic SDKs
    [Fact]
    public void Pattern18_RetrySubfolder()
    {
        CreateFile("go.mod");
        CreateFile("client.go");
        var retry = CreatePath("retry");
        CreateFile(retry, "exponential.go");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Go, info.Language);
        Assert.Equal(_testRoot, info.SourceFolder);
    }

    // Pattern 19: Root with pagination subfolder
    // Examples: Paginated API SDKs
    [Fact]
    public void Pattern19_PaginationSubfolder()
    {
        CreateFile("go.mod");
        CreateFile("client.go");
        var pagination = CreatePath("pagination");
        CreateFile(pagination, "iterator.go");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Go, info.Language);
        Assert.Equal(_testRoot, info.SourceFolder);
    }

    // Pattern 20: Root with transport subfolder
    // Examples: Transport layer SDKs
    [Fact]
    public void Pattern20_TransportSubfolder()
    {
        CreateFile("go.mod");
        CreateFile("client.go");
        var transport = CreatePath("transport");
        CreateFile(transport, "grpc.go");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Go, info.Language);
        Assert.Equal(_testRoot, info.SourceFolder);
    }

    // Pattern 21: Root with options subfolder
    // Examples: Functional options SDKs
    [Fact]
    public void Pattern21_OptionsSubfolder()
    {
        CreateFile("go.mod");
        CreateFile("client.go");
        var options = CreatePath("options");
        CreateFile(options, "client.go");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Go, info.Language);
        Assert.Equal(_testRoot, info.SourceFolder);
    }

    // Pattern 22: Root with logging subfolder
    // Examples: Logging SDKs
    [Fact]
    public void Pattern22_LoggingSubfolder()
    {
        CreateFile("go.mod");
        CreateFile("client.go");
        var logging = CreatePath("logging");
        CreateFile(logging, "logger.go");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Go, info.Language);
        Assert.Equal(_testRoot, info.SourceFolder);
    }

    // Pattern 23: Root with metrics subfolder
    // Examples: Metrics SDKs
    [Fact]
    public void Pattern23_MetricsSubfolder()
    {
        CreateFile("go.mod");
        CreateFile("client.go");
        var metrics = CreatePath("metrics");
        CreateFile(metrics, "counter.go");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Go, info.Language);
        Assert.Equal(_testRoot, info.SourceFolder);
    }

    // Pattern 24: Root with tracing subfolder
    // Examples: Tracing SDKs
    [Fact]
    public void Pattern24_TracingSubfolder()
    {
        CreateFile("go.mod");
        CreateFile("client.go");
        var tracing = CreatePath("tracing");
        CreateFile(tracing, "span.go");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Go, info.Language);
        Assert.Equal(_testRoot, info.SourceFolder);
    }

    // Pattern 25: Root with serialization subfolder
    // Examples: Serialization SDKs
    [Fact]
    public void Pattern25_SerializationSubfolder()
    {
        CreateFile("go.mod");
        CreateFile("client.go");
        var serialization = CreatePath("serialization");
        CreateFile(serialization, "json.go");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Go, info.Language);
        Assert.Equal(_testRoot, info.SourceFolder);
    }

    // Pattern 26: Root with validation subfolder
    // Examples: Validation SDKs
    [Fact]
    public void Pattern26_ValidationSubfolder()
    {
        CreateFile("go.mod");
        CreateFile("client.go");
        var validation = CreatePath("validation");
        CreateFile(validation, "schema.go");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Go, info.Language);
        Assert.Equal(_testRoot, info.SourceFolder);
    }

    // Pattern 27: Root with runtime subfolder
    // Examples: Runtime SDKs
    [Fact]
    public void Pattern27_RuntimeSubfolder()
    {
        CreateFile("go.mod");
        CreateFile("client.go");
        var runtime = CreatePath("runtime");
        CreateFile(runtime, "context.go");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Go, info.Language);
        Assert.Equal(_testRoot, info.SourceFolder);
    }

    // Pattern 28: Root with codec subfolder
    // Examples: Codec SDKs
    [Fact]
    public void Pattern28_CodecSubfolder()
    {
        CreateFile("go.mod");
        CreateFile("client.go");
        var codec = CreatePath("codec");
        CreateFile(codec, "proto.go");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Go, info.Language);
        Assert.Equal(_testRoot, info.SourceFolder);
    }

    // Pattern 29: Root with pool subfolder
    // Examples: Connection pool SDKs
    [Fact]
    public void Pattern29_PoolSubfolder()
    {
        CreateFile("go.mod");
        CreateFile("client.go");
        var pool = CreatePath("pool");
        CreateFile(pool, "connection.go");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Go, info.Language);
        Assert.Equal(_testRoot, info.SourceFolder);
    }

    // Pattern 30: Root with cache subfolder
    // Examples: Caching SDKs
    [Fact]
    public void Pattern30_CacheSubfolder()
    {
        CreateFile("go.mod");
        CreateFile("client.go");
        var cache = CreatePath("cache");
        CreateFile(cache, "lru.go");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Go, info.Language);
        Assert.Equal(_testRoot, info.SourceFolder);
    }

    // Pattern 31: Root with streaming subfolder
    // Examples: Streaming SDKs
    [Fact]
    public void Pattern31_StreamingSubfolder()
    {
        CreateFile("go.mod");
        CreateFile("client.go");
        var streaming = CreatePath("streaming");
        CreateFile(streaming, "reader.go");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Go, info.Language);
        Assert.Equal(_testRoot, info.SourceFolder);
    }

    // Pattern 32: Root with webhook subfolder
    // Examples: Webhook SDKs
    [Fact]
    public void Pattern32_WebhookSubfolder()
    {
        CreateFile("go.mod");
        CreateFile("client.go");
        var webhook = CreatePath("webhook");
        CreateFile(webhook, "signature.go");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Go, info.Language);
        Assert.Equal(_testRoot, info.SourceFolder);
    }

    // Pattern 33: Root with event subfolder
    // Examples: Event SDKs
    [Fact]
    public void Pattern33_EventSubfolder()
    {
        CreateFile("go.mod");
        CreateFile("client.go");
        var event_ = CreatePath("event");
        CreateFile(event_, "emitter.go");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Go, info.Language);
        Assert.Equal(_testRoot, info.SourceFolder);
    }

    // Pattern 34: Root with request subfolder
    // Examples: Request builder SDKs
    [Fact]
    public void Pattern34_RequestSubfolder()
    {
        CreateFile("go.mod");
        CreateFile("client.go");
        var request = CreatePath("request");
        CreateFile(request, "builder.go");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Go, info.Language);
        Assert.Equal(_testRoot, info.SourceFolder);
    }

    // Pattern 35: Root with response subfolder
    // Examples: Response handler SDKs
    [Fact]
    public void Pattern35_ResponseSubfolder()
    {
        CreateFile("go.mod");
        CreateFile("client.go");
        var response = CreatePath("response");
        CreateFile(response, "parser.go");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Go, info.Language);
        Assert.Equal(_testRoot, info.SourceFolder);
    }

    // Pattern 36: go/src layout (multi-language repos)
    // Examples: Multi-language SDKs
    [Fact]
    public void Pattern36_GoSrcLayout()
    {
        var goSrc = CreatePath("go");
        CreateFile(goSrc, "go.mod");
        CreateFile(goSrc, "client.go");
        CreateFile(goSrc, "types.go");

        var info = SdkInfo.Scan(goSrc);

        Assert.Equal(SdkLanguage.Go, info.Language);
        Assert.Equal(goSrc, info.SourceFolder);
    }

    // Pattern 37: Root with client subfolder
    // Examples: Multi-client SDKs
    [Fact]
    public void Pattern37_ClientSubfolder()
    {
        CreateFile("go.mod");
        CreateFile("sdk.go");
        var client = CreatePath("client");
        CreateFile(client, "rest.go");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Go, info.Language);
        Assert.Equal(_testRoot, info.SourceFolder);
    }

    // Pattern 38: Root with service subfolder
    // Examples: Service-based SDKs
    [Fact]
    public void Pattern38_ServiceSubfolder()
    {
        CreateFile("go.mod");
        CreateFile("sdk.go");
        var service = CreatePath("service");
        CreateFile(service, "s3.go");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Go, info.Language);
        Assert.Equal(_testRoot, info.SourceFolder);
    }

    // Pattern 39: Root with resource subfolder
    // Examples: Resource-based SDKs
    [Fact]
    public void Pattern39_ResourceSubfolder()
    {
        CreateFile("go.mod");
        CreateFile("sdk.go");
        var resource = CreatePath("resource");
        CreateFile(resource, "user.go");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Go, info.Language);
        Assert.Equal(_testRoot, info.SourceFolder);
    }

    // Pattern 40: Root with operation subfolder
    // Examples: Operation-based SDKs
    [Fact]
    public void Pattern40_OperationSubfolder()
    {
        CreateFile("go.mod");
        CreateFile("sdk.go");
        var operation = CreatePath("operation");
        CreateFile(operation, "create.go");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Go, info.Language);
        Assert.Equal(_testRoot, info.SourceFolder);
    }

    // Pattern 41: Root with model subfolder
    // Examples: Model-heavy SDKs
    [Fact]
    public void Pattern41_ModelSubfolder()
    {
        CreateFile("go.mod");
        CreateFile("sdk.go");
        var model = CreatePath("model");
        CreateFile(model, "entity.go");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Go, info.Language);
        Assert.Equal(_testRoot, info.SourceFolder);
    }

    // Pattern 42: Root with handler subfolder
    // Examples: Handler-based SDKs
    [Fact]
    public void Pattern42_HandlerSubfolder()
    {
        CreateFile("go.mod");
        CreateFile("sdk.go");
        var handler = CreatePath("handler");
        CreateFile(handler, "webhook.go");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Go, info.Language);
        Assert.Equal(_testRoot, info.SourceFolder);
    }

    // Pattern 43: Root with adapter subfolder
    // Examples: Adapter pattern SDKs
    [Fact]
    public void Pattern43_AdapterSubfolder()
    {
        CreateFile("go.mod");
        CreateFile("sdk.go");
        var adapter = CreatePath("adapter");
        CreateFile(adapter, "http.go");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Go, info.Language);
        Assert.Equal(_testRoot, info.SourceFolder);
    }

    // Pattern 44: Root with protocol subfolder
    // Examples: Protocol SDKs
    [Fact]
    public void Pattern44_ProtocolSubfolder()
    {
        CreateFile("go.mod");
        CreateFile("sdk.go");
        var protocol = CreatePath("protocol");
        CreateFile(protocol, "grpc.go");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Go, info.Language);
        Assert.Equal(_testRoot, info.SourceFolder);
    }

    // Pattern 45: Root with encoding subfolder
    // Examples: Encoding SDKs
    [Fact]
    public void Pattern45_EncodingSubfolder()
    {
        CreateFile("go.mod");
        CreateFile("sdk.go");
        var encoding = CreatePath("encoding");
        CreateFile(encoding, "base64.go");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Go, info.Language);
        Assert.Equal(_testRoot, info.SourceFolder);
    }

    // Pattern 46: Root with crypto subfolder
    // Examples: Crypto SDKs
    [Fact]
    public void Pattern46_CryptoSubfolder()
    {
        CreateFile("go.mod");
        CreateFile("sdk.go");
        var crypto = CreatePath("crypto");
        CreateFile(crypto, "hash.go");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Go, info.Language);
        Assert.Equal(_testRoot, info.SourceFolder);
    }

    // Pattern 47: Root with policy subfolder
    // Examples: Policy SDKs
    [Fact]
    public void Pattern47_PolicySubfolder()
    {
        CreateFile("go.mod");
        CreateFile("sdk.go");
        var policy = CreatePath("policy");
        CreateFile(policy, "retry.go");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Go, info.Language);
        Assert.Equal(_testRoot, info.SourceFolder);
    }

    // Pattern 48: Root with credential subfolder
    // Examples: Credential SDKs
    [Fact]
    public void Pattern48_CredentialSubfolder()
    {
        CreateFile("go.mod");
        CreateFile("sdk.go");
        var credential = CreatePath("credential");
        CreateFile(credential, "token.go");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Go, info.Language);
        Assert.Equal(_testRoot, info.SourceFolder);
    }

    // Pattern 49: Root with identity subfolder
    // Examples: Identity SDKs
    [Fact]
    public void Pattern49_IdentitySubfolder()
    {
        CreateFile("go.mod");
        CreateFile("sdk.go");
        var identity = CreatePath("identity");
        CreateFile(identity, "oauth.go");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Go, info.Language);
        Assert.Equal(_testRoot, info.SourceFolder);
    }

    // Pattern 50: Root with context subfolder
    // Examples: Context-heavy SDKs
    [Fact]
    public void Pattern50_ContextSubfolder()
    {
        CreateFile("go.mod");
        CreateFile("sdk.go");
        var context = CreatePath("context");
        CreateFile(context, "request.go");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Go, info.Language);
        Assert.Equal(_testRoot, info.SourceFolder);
    }
}

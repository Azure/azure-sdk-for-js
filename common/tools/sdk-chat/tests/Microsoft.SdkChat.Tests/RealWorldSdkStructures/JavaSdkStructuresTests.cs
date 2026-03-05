// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using Microsoft.SdkChat.Models;
using Microsoft.SdkChat.Services;
using Xunit;

namespace Microsoft.SdkChat.Tests.RealWorldSdkStructures;

/// <summary>
/// Tests based on real-world Java SDK repository structures from top GitHub repos.
/// Each test represents a distinct, deduped pattern found in popular Java SDKs.
/// </summary>
[Collection("SdkInfoCache")]
public class JavaSdkStructuresTests : SdkStructureTestBase
{
    // Pattern 1: Maven standard layout - src/main/java
    // Examples: stripe-java, twilio-java
    [Fact]
    public void Pattern01_MavenStandardLayout()
    {
        CreateFile("pom.xml");
        var src = CreatePath("src", "main", "java", "com", "example");
        CreateFile(src, "Client.java");
        CreateFile(src, "Service.java");
        var examples = CreatePath("examples");
        CreateFile(examples, "Example.java");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Java, info.Language);
        Assert.Contains("main/java", info.SourceFolder.Replace("\\", "/", StringComparison.Ordinal));
        Assert.Equal(examples, info.SamplesFolder);
    }

    // Pattern 2: Gradle with build.gradle
    // Examples: Many modern Java SDKs
    [Fact]
    public void Pattern02_GradleStandardLayout()
    {
        CreateFile("build.gradle");
        var src = CreatePath("src", "main", "java", "com", "example");
        CreateFile(src, "Client.java");
        CreateFile(src, "Models.java");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Java, info.Language);
        Assert.Contains("main/java", info.SourceFolder.Replace("\\", "/", StringComparison.Ordinal));
    }

    // Pattern 3: Gradle Kotlin DSL (build.gradle.kts)
    // Examples: openai-java
    [Fact]
    public void Pattern03_GradleKotlinDsl()
    {
        CreateFile("build.gradle.kts");
        CreateFile("settings.gradle.kts");
        var src = CreatePath("src", "main", "java", "com", "openai");
        CreateFile(src, "OpenAIClient.java");
        CreateFile(src, "ChatCompletion.java");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Java, info.Language);
        Assert.Contains("main/java", info.SourceFolder.Replace("\\", "/", StringComparison.Ordinal));
    }

    // Pattern 4: src/main/java with nested package
    // Examples: AWS SDK, SDK
    [Fact]
    public void Pattern04_NestedPackageStructure()
    {
        CreateFile("pom.xml");
        var src = CreatePath("src", "main", "java", "software", "amazon", "awssdk", "s3");
        CreateFile(src, "S3Client.java");
        CreateFile(src, "S3AsyncClient.java");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Java, info.Language);
        Assert.Contains("main/java", info.SourceFolder.Replace("\\", "/", StringComparison.Ordinal));
    }

    // Pattern 5: With samples folder at root
    // Examples: google-cloud-java packages
    [Fact]
    public void Pattern05_SamplesFolderAtRoot()
    {
        CreateFile("pom.xml");
        var src = CreatePath("src", "main", "java", "com", "google", "cloud");
        CreateFile(src, "Storage.java");
        CreateFile(src, "Bucket.java");
        var samples = CreatePath("samples");
        CreateFile(samples, "QuickStart.java");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Java, info.Language);
        Assert.Equal(samples, info.SamplesFolder);
    }

    // Pattern 6: With demo folder
    // Examples: Some SDKs use demo instead of samples
    [Fact]
    public void Pattern06_DemoFolder()
    {
        CreateFile("build.gradle");
        var src = CreatePath("src", "main", "java", "com", "example");
        CreateFile(src, "Client.java");
        var demo = CreatePath("demo");
        CreateFile(demo, "Demo.java");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Java, info.Language);
        Assert.Equal(demo, info.SamplesFolder);
    }

    // Pattern 7: With examples folder
    // Examples: Many Java SDKs
    [Fact]
    public void Pattern07_ExamplesFolder()
    {
        CreateFile("pom.xml");
        var src = CreatePath("src", "main", "java", "com", "example");
        CreateFile(src, "Client.java");
        var examples = CreatePath("examples");
        CreateFile(examples, "BasicUsage.java");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Java, info.Language);
        Assert.Equal(examples, info.SamplesFolder);
    }

    // Pattern 8: api package subfolder
    // Examples: REST API SDKs
    [Fact]
    public void Pattern08_ApiPackageSubfolder()
    {
        CreateFile("pom.xml");
        var src = CreatePath("src", "main", "java", "com", "example");
        CreateFile(src, "Client.java");
        var api = CreatePath(src, "api");
        CreateFile(api, "UserApi.java");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Java, info.Language);
    }

    // Pattern 9: model package subfolder
    // Examples: Model-heavy SDKs
    [Fact]
    public void Pattern09_ModelPackageSubfolder()
    {
        CreateFile("build.gradle");
        var src = CreatePath("src", "main", "java", "com", "example");
        CreateFile(src, "Client.java");
        var model = CreatePath(src, "model");
        CreateFile(model, "User.java");
        CreateFile(model, "Response.java");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Java, info.Language);
    }

    // Pattern 10: service package subfolder
    // Examples: Service-based SDKs
    [Fact]
    public void Pattern10_ServicePackageSubfolder()
    {
        CreateFile("pom.xml");
        var src = CreatePath("src", "main", "java", "com", "example");
        CreateFile(src, "Client.java");
        var service = CreatePath(src, "service");
        CreateFile(service, "UserService.java");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Java, info.Language);
    }

    // Pattern 11: rest package subfolder
    // Examples: REST client SDKs
    [Fact]
    public void Pattern11_RestPackageSubfolder()
    {
        CreateFile("build.gradle");
        var src = CreatePath("src", "main", "java", "com", "example");
        CreateFile(src, "Client.java");
        var rest = CreatePath(src, "rest");
        CreateFile(rest, "RestClient.java");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Java, info.Language);
    }

    // Pattern 12: http package subfolder
    // Examples: HTTP client SDKs
    [Fact]
    public void Pattern12_HttpPackageSubfolder()
    {
        CreateFile("pom.xml");
        var src = CreatePath("src", "main", "java", "com", "example");
        CreateFile(src, "Client.java");
        var http = CreatePath(src, "http");
        CreateFile(http, "HttpClient.java");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Java, info.Language);
    }

    // Pattern 13: auth package subfolder
    // Examples: Auth SDKs
    [Fact]
    public void Pattern13_AuthPackageSubfolder()
    {
        CreateFile("build.gradle");
        var src = CreatePath("src", "main", "java", "com", "example");
        CreateFile(src, "Client.java");
        var auth = CreatePath(src, "auth");
        CreateFile(auth, "OAuth.java");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Java, info.Language);
    }

    // Pattern 14: exception package subfolder
    // Examples: Exception-heavy SDKs
    [Fact]
    public void Pattern14_ExceptionPackageSubfolder()
    {
        CreateFile("pom.xml");
        var src = CreatePath("src", "main", "java", "com", "example");
        CreateFile(src, "Client.java");
        var exception = CreatePath(src, "exception");
        CreateFile(exception, "ApiException.java");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Java, info.Language);
    }

    // Pattern 15: util package subfolder
    // Examples: Utility-heavy SDKs
    [Fact]
    public void Pattern15_UtilPackageSubfolder()
    {
        CreateFile("build.gradle");
        var src = CreatePath("src", "main", "java", "com", "example");
        CreateFile(src, "Client.java");
        var util = CreatePath(src, "util");
        CreateFile(util, "JsonHelper.java");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Java, info.Language);
    }

    // Pattern 16: config package subfolder
    // Examples: Configuration SDKs
    [Fact]
    public void Pattern16_ConfigPackageSubfolder()
    {
        CreateFile("pom.xml");
        var src = CreatePath("src", "main", "java", "com", "example");
        CreateFile(src, "Client.java");
        var config = CreatePath(src, "config");
        CreateFile(config, "Options.java");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Java, info.Language);
    }

    // Pattern 17: resource package subfolder
    // Examples: Resource-based SDKs
    [Fact]
    public void Pattern17_ResourcePackageSubfolder()
    {
        CreateFile("build.gradle");
        var src = CreatePath("src", "main", "java", "com", "example");
        CreateFile(src, "Client.java");
        var resource = CreatePath(src, "resource");
        CreateFile(resource, "UserResource.java");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Java, info.Language);
    }

    // Pattern 18: request package subfolder
    // Examples: Request builder SDKs
    [Fact]
    public void Pattern18_RequestPackageSubfolder()
    {
        CreateFile("pom.xml");
        var src = CreatePath("src", "main", "java", "com", "example");
        CreateFile(src, "Client.java");
        var request = CreatePath(src, "request");
        CreateFile(request, "CreateRequest.java");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Java, info.Language);
    }

    // Pattern 19: response package subfolder
    // Examples: Response handler SDKs
    [Fact]
    public void Pattern19_ResponsePackageSubfolder()
    {
        CreateFile("build.gradle");
        var src = CreatePath("src", "main", "java", "com", "example");
        CreateFile(src, "Client.java");
        var response = CreatePath(src, "response");
        CreateFile(response, "ApiResponse.java");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Java, info.Language);
    }

    // Pattern 20: param package subfolder
    // Examples: Parameter SDKs
    [Fact]
    public void Pattern20_ParamPackageSubfolder()
    {
        CreateFile("pom.xml");
        var src = CreatePath("src", "main", "java", "com", "example");
        CreateFile(src, "Client.java");
        var param = CreatePath(src, "param");
        CreateFile(param, "QueryParams.java");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Java, info.Language);
    }

    // Pattern 21: callback package subfolder
    // Examples: Async callback SDKs
    [Fact]
    public void Pattern21_CallbackPackageSubfolder()
    {
        CreateFile("build.gradle");
        var src = CreatePath("src", "main", "java", "com", "example");
        CreateFile(src, "Client.java");
        var callback = CreatePath(src, "callback");
        CreateFile(callback, "ResponseCallback.java");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Java, info.Language);
    }

    // Pattern 22: event package subfolder
    // Examples: Event-driven SDKs
    [Fact]
    public void Pattern22_EventPackageSubfolder()
    {
        CreateFile("pom.xml");
        var src = CreatePath("src", "main", "java", "com", "example");
        CreateFile(src, "Client.java");
        var event_ = CreatePath(src, "event");
        CreateFile(event_, "WebhookEvent.java");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Java, info.Language);
    }

    // Pattern 23: handler package subfolder
    // Examples: Handler-based SDKs
    [Fact]
    public void Pattern23_HandlerPackageSubfolder()
    {
        CreateFile("build.gradle");
        var src = CreatePath("src", "main", "java", "com", "example");
        CreateFile(src, "Client.java");
        var handler = CreatePath(src, "handler");
        CreateFile(handler, "ResponseHandler.java");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Java, info.Language);
    }

    // Pattern 24: interceptor package subfolder
    // Examples: Interceptor SDKs
    [Fact]
    public void Pattern24_InterceptorPackageSubfolder()
    {
        CreateFile("pom.xml");
        var src = CreatePath("src", "main", "java", "com", "example");
        CreateFile(src, "Client.java");
        var interceptor = CreatePath(src, "interceptor");
        CreateFile(interceptor, "LoggingInterceptor.java");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Java, info.Language);
    }

    // Pattern 25: adapter package subfolder
    // Examples: Adapter pattern SDKs
    [Fact]
    public void Pattern25_AdapterPackageSubfolder()
    {
        CreateFile("build.gradle");
        var src = CreatePath("src", "main", "java", "com", "example");
        CreateFile(src, "Client.java");
        var adapter = CreatePath(src, "adapter");
        CreateFile(adapter, "JsonAdapter.java");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Java, info.Language);
    }

    // Pattern 26: converter package subfolder
    // Examples: Converter SDKs
    [Fact]
    public void Pattern26_ConverterPackageSubfolder()
    {
        CreateFile("pom.xml");
        var src = CreatePath("src", "main", "java", "com", "example");
        CreateFile(src, "Client.java");
        var converter = CreatePath(src, "converter");
        CreateFile(converter, "ResponseConverter.java");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Java, info.Language);
    }

    // Pattern 27: serializer package subfolder
    // Examples: Serialization SDKs
    [Fact]
    public void Pattern27_SerializerPackageSubfolder()
    {
        CreateFile("build.gradle");
        var src = CreatePath("src", "main", "java", "com", "example");
        CreateFile(src, "Client.java");
        var serializer = CreatePath(src, "serializer");
        CreateFile(serializer, "JsonSerializer.java");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Java, info.Language);
    }

    // Pattern 28: dto package subfolder
    // Examples: DTO-based SDKs
    [Fact]
    public void Pattern28_DtoPackageSubfolder()
    {
        CreateFile("pom.xml");
        var src = CreatePath("src", "main", "java", "com", "example");
        CreateFile(src, "Client.java");
        var dto = CreatePath(src, "dto");
        CreateFile(dto, "UserDto.java");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Java, info.Language);
    }

    // Pattern 29: entity package subfolder
    // Examples: Entity-based SDKs
    [Fact]
    public void Pattern29_EntityPackageSubfolder()
    {
        CreateFile("build.gradle");
        var src = CreatePath("src", "main", "java", "com", "example");
        CreateFile(src, "Client.java");
        var entity = CreatePath(src, "entity");
        CreateFile(entity, "User.java");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Java, info.Language);
    }

    // Pattern 30: domain package subfolder
    // Examples: Domain-driven SDKs
    [Fact]
    public void Pattern30_DomainPackageSubfolder()
    {
        CreateFile("pom.xml");
        var src = CreatePath("src", "main", "java", "com", "example");
        CreateFile(src, "Client.java");
        var domain = CreatePath(src, "domain");
        CreateFile(domain, "Account.java");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Java, info.Language);
    }

    // Pattern 31: core package subfolder
    // Examples: Core functionality SDKs
    [Fact]
    public void Pattern31_CorePackageSubfolder()
    {
        CreateFile("build.gradle");
        var src = CreatePath("src", "main", "java", "com", "example");
        CreateFile(src, "Client.java");
        var core = CreatePath(src, "core");
        CreateFile(core, "CoreClient.java");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Java, info.Language);
    }

    // Pattern 32: internal package subfolder
    // Examples: Internal implementation
    [Fact]
    public void Pattern32_InternalPackageSubfolder()
    {
        CreateFile("pom.xml");
        var src = CreatePath("src", "main", "java", "com", "example");
        CreateFile(src, "Client.java");
        var internal_ = CreatePath(src, "internal");
        CreateFile(internal_, "HttpTransport.java");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Java, info.Language);
    }

    // Pattern 33: retry package subfolder
    // Examples: Retry logic SDKs
    [Fact]
    public void Pattern33_RetryPackageSubfolder()
    {
        CreateFile("build.gradle");
        var src = CreatePath("src", "main", "java", "com", "example");
        CreateFile(src, "Client.java");
        var retry = CreatePath(src, "retry");
        CreateFile(retry, "ExponentialBackoff.java");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Java, info.Language);
    }

    // Pattern 34: pagination package subfolder
    // Examples: Paginated API SDKs
    [Fact]
    public void Pattern34_PaginationPackageSubfolder()
    {
        CreateFile("pom.xml");
        var src = CreatePath("src", "main", "java", "com", "example");
        CreateFile(src, "Client.java");
        var pagination = CreatePath(src, "pagination");
        CreateFile(pagination, "PageIterator.java");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Java, info.Language);
    }

    // Pattern 35: builder package subfolder
    // Examples: Builder pattern SDKs
    [Fact]
    public void Pattern35_BuilderPackageSubfolder()
    {
        CreateFile("build.gradle");
        var src = CreatePath("src", "main", "java", "com", "example");
        CreateFile(src, "Client.java");
        var builder = CreatePath(src, "builder");
        CreateFile(builder, "RequestBuilder.java");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Java, info.Language);
    }

    // Pattern 36: java/src layout (multi-language repos)
    // Examples: Multi-language SDKs
    [Fact]
    public void Pattern36_JavaSrcLayout()
    {
        var javaSrc = CreatePath("java");
        CreateFile(javaSrc, "pom.xml");
        var src = CreatePath(javaSrc, "src", "main", "java", "com", "example");
        CreateFile(src, "Client.java");

        var info = SdkInfo.Scan(javaSrc);

        Assert.Equal(SdkLanguage.Java, info.Language);
    }

    // Pattern 37: validation package subfolder
    // Examples: Validation SDKs
    [Fact]
    public void Pattern37_ValidationPackageSubfolder()
    {
        CreateFile("pom.xml");
        var src = CreatePath("src", "main", "java", "com", "example");
        CreateFile(src, "Client.java");
        var validation = CreatePath(src, "validation");
        CreateFile(validation, "Validator.java");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Java, info.Language);
    }

    // Pattern 38: logging package subfolder
    // Examples: Logging SDKs
    [Fact]
    public void Pattern38_LoggingPackageSubfolder()
    {
        CreateFile("build.gradle");
        var src = CreatePath("src", "main", "java", "com", "example");
        CreateFile(src, "Client.java");
        var logging = CreatePath(src, "logging");
        CreateFile(logging, "Logger.java");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Java, info.Language);
    }

    // Pattern 39: metrics package subfolder
    // Examples: Metrics SDKs
    [Fact]
    public void Pattern39_MetricsPackageSubfolder()
    {
        CreateFile("pom.xml");
        var src = CreatePath("src", "main", "java", "com", "example");
        CreateFile(src, "Client.java");
        var metrics = CreatePath(src, "metrics");
        CreateFile(metrics, "Counter.java");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Java, info.Language);
    }

    // Pattern 40: tracing package subfolder
    // Examples: Tracing SDKs
    [Fact]
    public void Pattern40_TracingPackageSubfolder()
    {
        CreateFile("build.gradle");
        var src = CreatePath("src", "main", "java", "com", "example");
        CreateFile(src, "Client.java");
        var tracing = CreatePath(src, "tracing");
        CreateFile(tracing, "Span.java");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Java, info.Language);
    }

    // Pattern 41: streaming package subfolder
    // Examples: Streaming SDKs
    [Fact]
    public void Pattern41_StreamingPackageSubfolder()
    {
        CreateFile("pom.xml");
        var src = CreatePath("src", "main", "java", "com", "example");
        CreateFile(src, "Client.java");
        var streaming = CreatePath(src, "streaming");
        CreateFile(streaming, "EventStream.java");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Java, info.Language);
    }

    // Pattern 42: async package subfolder
    // Examples: Async SDKs
    [Fact]
    public void Pattern42_AsyncPackageSubfolder()
    {
        CreateFile("build.gradle");
        var src = CreatePath("src", "main", "java", "com", "example");
        CreateFile(src, "Client.java");
        var async_ = CreatePath(src, "async");
        CreateFile(async_, "AsyncClient.java");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Java, info.Language);
    }

    // Pattern 43: sync package subfolder
    // Examples: Sync SDKs
    [Fact]
    public void Pattern43_SyncPackageSubfolder()
    {
        CreateFile("pom.xml");
        var src = CreatePath("src", "main", "java", "com", "example");
        CreateFile(src, "Client.java");
        var sync = CreatePath(src, "sync");
        CreateFile(sync, "SyncClient.java");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Java, info.Language);
    }

    // Pattern 44: client package subfolder
    // Examples: Client-focused SDKs
    [Fact]
    public void Pattern44_ClientPackageSubfolder()
    {
        CreateFile("build.gradle");
        var src = CreatePath("src", "main", "java", "com", "example");
        CreateFile(src, "SDK.java");
        var client = CreatePath(src, "client");
        CreateFile(client, "RestClient.java");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Java, info.Language);
    }

    // Pattern 45: transport package subfolder
    // Examples: Transport layer SDKs
    [Fact]
    public void Pattern45_TransportPackageSubfolder()
    {
        CreateFile("pom.xml");
        var src = CreatePath("src", "main", "java", "com", "example");
        CreateFile(src, "Client.java");
        var transport = CreatePath(src, "transport");
        CreateFile(transport, "HttpTransport.java");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Java, info.Language);
    }

    // Pattern 46: credential package subfolder
    // Examples: Credential SDKs
    [Fact]
    public void Pattern46_CredentialPackageSubfolder()
    {
        CreateFile("build.gradle");
        var src = CreatePath("src", "main", "java", "com", "example");
        CreateFile(src, "Client.java");
        var credential = CreatePath(src, "credential");
        CreateFile(credential, "TokenCredential.java");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Java, info.Language);
    }

    // Pattern 47: policy package subfolder
    // Examples: Policy SDKs
    [Fact]
    public void Pattern47_PolicyPackageSubfolder()
    {
        CreateFile("pom.xml");
        var src = CreatePath("src", "main", "java", "com", "example");
        CreateFile(src, "Client.java");
        var policy = CreatePath(src, "policy");
        CreateFile(policy, "RetryPolicy.java");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Java, info.Language);
    }

    // Pattern 48: identity package subfolder
    // Examples: Identity SDKs
    [Fact]
    public void Pattern48_IdentityPackageSubfolder()
    {
        CreateFile("build.gradle");
        var src = CreatePath("src", "main", "java", "com", "example");
        CreateFile(src, "Client.java");
        var identity = CreatePath(src, "identity");
        CreateFile(identity, "OAuthIdentity.java");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Java, info.Language);
    }

    // Pattern 49: webhook package subfolder
    // Examples: Webhook SDKs
    [Fact]
    public void Pattern49_WebhookPackageSubfolder()
    {
        CreateFile("pom.xml");
        var src = CreatePath("src", "main", "java", "com", "example");
        CreateFile(src, "Client.java");
        var webhook = CreatePath(src, "webhook");
        CreateFile(webhook, "Signature.java");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Java, info.Language);
    }

    // Pattern 50: operation package subfolder
    // Examples: Operation-based SDKs
    [Fact]
    public void Pattern50_OperationPackageSubfolder()
    {
        CreateFile("build.gradle");
        var src = CreatePath("src", "main", "java", "com", "example");
        CreateFile(src, "Client.java");
        var operation = CreatePath(src, "operation");
        CreateFile(operation, "CreateOperation.java");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Java, info.Language);
    }
}

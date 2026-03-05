// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using Microsoft.SdkChat.Models;
using Microsoft.SdkChat.Services;
using Xunit;

namespace Microsoft.SdkChat.Tests.RealWorldSdkStructures;

/// <summary>
/// Tests based on real-world Python SDK repository structures from top GitHub repos.
/// Each test represents a distinct, deduped pattern found in popular Python SDKs.
/// </summary>
[Collection("SdkInfoCache")]
public class PythonSdkStructuresTests : SdkStructureTestBase
{
    // Pattern 1: Package folder at root with __init__.py
    // Examples: openai-python, anthropic-sdk-python
    [Fact]
    public void Pattern01_RootPackageFolder()
    {
        CreateFile("pyproject.toml");
        var pkg = CreatePath("openai");
        CreateFile(pkg, "__init__.py");
        CreateFile(pkg, "client.py");
        CreateFile(pkg, "_client.py");
        var examples = CreatePath("examples");
        CreateFile(examples, "chat.py");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Python, info.Language);
        Assert.Equal(pkg, info.SourceFolder);
        Assert.Equal(examples, info.SamplesFolder);
    }

    // Pattern 2: src/packagename layout (PEP 517 style)
    // Examples: anthropic-sdk-python, httpx
    [Fact]
    public void Pattern02_SrcPackageLayout()
    {
        CreateFile("pyproject.toml");
        var pkg = CreatePath("src", "anthropic");
        CreateFile(pkg, "__init__.py");
        CreateFile(pkg, "_client.py");
        var examples = CreatePath("examples");
        CreateFile(examples, "streaming.py");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Python, info.Language);
        Assert.Equal(pkg, info.SourceFolder);
        Assert.Equal(examples, info.SamplesFolder);
    }

    // Pattern 3: Namespaced package (google/cloud/storage)
    // Examples: google-cloud-python, example-sdk-for-python
    [Fact]
    public void Pattern03_NamespacedPackage()
    {
        CreateFile("setup.py");
        var pkg = CreatePath("google", "cloud", "storage");
        CreateFile(pkg, "__init__.py");
        CreateFile(pkg, "client.py");
        CreateFile(pkg, "bucket.py");
        var samples = CreatePath("samples");
        CreateFile(samples, "quickstart.py");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Python, info.Language);
        Assert.Equal(pkg, info.SourceFolder);
        Assert.Equal(samples, info.SamplesFolder);
    }

    // Pattern 4: Namespaced package
    // Examples: acme-storage-blob
    [Fact]
    public void Pattern04_NamespacedPackage()
    {
        CreateFile("setup.py");
        var pkg = CreatePath("acme", "storage", "blob");
        CreateFile(pkg, "__init__.py");
        CreateFile(pkg, "_blob_client.py");
        CreateFile(pkg, "_container_client.py");
        var samples = CreatePath("samples");
        CreateFile(samples, "blob_samples_hello_world.py");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Python, info.Language);
        Assert.Equal(pkg, info.SourceFolder);
        Assert.Equal(samples, info.SamplesFolder);
    }

    // Pattern 5: Single package at root with setup.py
    // Examples: boto3, requests
    [Fact]
    public void Pattern05_RootPackageWithSetupPy()
    {
        CreateFile("setup.py");
        var pkg = CreatePath("boto3");
        CreateFile(pkg, "__init__.py");
        CreateFile(pkg, "session.py");
        CreateFile(pkg, "resources.py");
        var examples = CreatePath("examples");
        CreateFile(examples, "s3_example.py");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Python, info.Language);
        Assert.Equal(pkg, info.SourceFolder);
        Assert.Equal(examples, info.SamplesFolder);
    }

    // Pattern 6: src/requests layout (popular pattern)
    // Examples: requests, httpx
    [Fact]
    public void Pattern06_SrcRequestsLayout()
    {
        CreateFile("pyproject.toml");
        var pkg = CreatePath("src", "requests");
        CreateFile(pkg, "__init__.py");
        CreateFile(pkg, "api.py");
        CreateFile(pkg, "sessions.py");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Python, info.Language);
        Assert.Equal(pkg, info.SourceFolder);
    }

    // Pattern 7: Package with api_resources subfolder
    // Examples: stripe-python
    [Fact]
    public void Pattern07_ApiResourcesSubfolder()
    {
        CreateFile("setup.py");
        var pkg = CreatePath("stripe");
        CreateFile(pkg, "__init__.py");
        CreateFile(pkg, "_stripe_client.py");
        var apiResources = CreatePath(pkg, "api_resources");
        CreateFile(apiResources, "__init__.py");
        CreateFile(apiResources, "customer.py");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Python, info.Language);
        Assert.Equal(pkg, info.SourceFolder);
    }

    // Pattern 8: Package with types subfolder
    // Examples: openai-python
    [Fact]
    public void Pattern08_TypesSubfolder()
    {
        CreateFile("pyproject.toml");
        var pkg = CreatePath("openai");
        CreateFile(pkg, "__init__.py");
        CreateFile(pkg, "client.py");
        var types = CreatePath(pkg, "types");
        CreateFile(types, "__init__.py");
        CreateFile(types, "chat_completion.py");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Python, info.Language);
        Assert.Equal(pkg, info.SourceFolder);
    }

    // Pattern 9: Package at root with examples folder
    // Examples: tweepy
    [Fact]
    public void Pattern09_RootPackageWithExamples()
    {
        CreateFile("setup.py");
        var pkg = CreatePath("tweepy");
        CreateFile(pkg, "__init__.py");
        CreateFile(pkg, "client.py");
        CreateFile(pkg, "streaming.py");
        var examples = CreatePath("examples");
        CreateFile(examples, "timeline.py");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Python, info.Language);
        Assert.Equal(pkg, info.SourceFolder);
        Assert.Equal(examples, info.SamplesFolder);
    }

    // Pattern 10: Package with _internal subfolder
    // Examples: Many private implementation patterns
    [Fact]
    public void Pattern10_InternalSubfolder()
    {
        CreateFile("pyproject.toml");
        var pkg = CreatePath("sdk");
        CreateFile(pkg, "__init__.py");
        CreateFile(pkg, "client.py");
        var internal_ = CreatePath(pkg, "_internal");
        CreateFile(internal_, "__init__.py");
        CreateFile(internal_, "http.py");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Python, info.Language);
        Assert.Equal(pkg, info.SourceFolder);
    }

    // Pattern 11: Package with models subfolder
    // Examples: pydantic-based SDKs
    [Fact]
    public void Pattern11_ModelsSubfolder()
    {
        CreateFile("pyproject.toml");
        var pkg = CreatePath("sdk");
        CreateFile(pkg, "__init__.py");
        CreateFile(pkg, "client.py");
        var models = CreatePath(pkg, "models");
        CreateFile(models, "__init__.py");
        CreateFile(models, "response.py");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Python, info.Language);
        Assert.Equal(pkg, info.SourceFolder);
    }

    // Pattern 12: AWS SDK style with service folders
    // Examples: aws-sdk packages
    [Fact]
    public void Pattern12_AwsServiceFolder()
    {
        CreateFile("setup.py");
        var pkg = CreatePath("myaws");
        CreateFile(pkg, "__init__.py");
        var s3 = CreatePath(pkg, "s3");
        CreateFile(s3, "__init__.py");
        CreateFile(s3, "client.py");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Python, info.Language);
        Assert.Equal(pkg, info.SourceFolder);
    }

    // Pattern 13: Package with utils subfolder
    // Examples: Many utility-heavy SDKs
    [Fact]
    public void Pattern13_UtilsSubfolder()
    {
        CreateFile("pyproject.toml");
        var pkg = CreatePath("sdk");
        CreateFile(pkg, "__init__.py");
        CreateFile(pkg, "client.py");
        var utils = CreatePath(pkg, "utils");
        CreateFile(utils, "__init__.py");
        CreateFile(utils, "helpers.py");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Python, info.Language);
        Assert.Equal(pkg, info.SourceFolder);
    }

    // Pattern 14: Package with resources subfolder
    // Examples: REST API clients
    [Fact]
    public void Pattern14_ResourcesSubfolder()
    {
        CreateFile("setup.py");
        var pkg = CreatePath("sdk");
        CreateFile(pkg, "__init__.py");
        CreateFile(pkg, "client.py");
        var resources = CreatePath(pkg, "resources");
        CreateFile(resources, "__init__.py");
        CreateFile(resources, "user.py");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Python, info.Language);
        Assert.Equal(pkg, info.SourceFolder);
    }

    // Pattern 15: lib/packagename layout
    // Examples: Some older projects
    [Fact]
    public void Pattern15_LibPackageLayout()
    {
        CreateFile("setup.py");
        var pkg = CreatePath("lib", "sdk");
        CreateFile(pkg, "__init__.py");
        CreateFile(pkg, "client.py");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Python, info.Language);
        Assert.Equal(pkg, info.SourceFolder);
    }

    // Pattern 16: Package with async subfolder
    // Examples: Async-first SDKs
    [Fact]
    public void Pattern16_AsyncSubfolder()
    {
        CreateFile("pyproject.toml");
        var pkg = CreatePath("sdk");
        CreateFile(pkg, "__init__.py");
        CreateFile(pkg, "client.py");
        var async_ = CreatePath(pkg, "_async");
        CreateFile(async_, "__init__.py");
        CreateFile(async_, "client.py");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Python, info.Language);
        Assert.Equal(pkg, info.SourceFolder);
    }

    // Pattern 17: Package with sync subfolder
    // Examples: Sync/async dual SDKs
    [Fact]
    public void Pattern17_SyncSubfolder()
    {
        CreateFile("pyproject.toml");
        var pkg = CreatePath("sdk");
        CreateFile(pkg, "__init__.py");
        var sync = CreatePath(pkg, "_sync");
        CreateFile(sync, "__init__.py");
        CreateFile(sync, "client.py");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Python, info.Language);
        Assert.Equal(pkg, info.SourceFolder);
    }

    // Pattern 18: Package with generated subfolder
    // Examples: Auto-generated SDKs
    [Fact]
    public void Pattern18_GeneratedSubfolder()
    {
        CreateFile("setup.py");
        var pkg = CreatePath("sdk");
        CreateFile(pkg, "__init__.py");
        var generated = CreatePath(pkg, "_generated");
        CreateFile(generated, "__init__.py");
        CreateFile(generated, "client.py");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Python, info.Language);
        Assert.Equal(pkg, info.SourceFolder);
    }

    // Pattern 19: Package with operations subfolder
    // Examples: Operation-based SDKs
    [Fact]
    public void Pattern19_OperationsSubfolder()
    {
        CreateFile("pyproject.toml");
        var pkg = CreatePath("sdk");
        CreateFile(pkg, "__init__.py");
        CreateFile(pkg, "client.py");
        var operations = CreatePath(pkg, "operations");
        CreateFile(operations, "__init__.py");
        CreateFile(operations, "create.py");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Python, info.Language);
        Assert.Equal(pkg, info.SourceFolder);
    }

    // Pattern 20: Package with exceptions subfolder
    // Examples: Exception-rich SDKs
    [Fact]
    public void Pattern20_ExceptionsSubfolder()
    {
        CreateFile("setup.py");
        var pkg = CreatePath("sdk");
        CreateFile(pkg, "__init__.py");
        CreateFile(pkg, "client.py");
        var exceptions = CreatePath(pkg, "exceptions");
        CreateFile(exceptions, "__init__.py");
        CreateFile(exceptions, "api_error.py");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Python, info.Language);
        Assert.Equal(pkg, info.SourceFolder);
    }

    // Pattern 21: Package with auth subfolder
    // Examples: Auth-focused SDKs
    [Fact]
    public void Pattern21_AuthSubfolder()
    {
        CreateFile("pyproject.toml");
        var pkg = CreatePath("sdk");
        CreateFile(pkg, "__init__.py");
        CreateFile(pkg, "client.py");
        var auth = CreatePath(pkg, "auth");
        CreateFile(auth, "__init__.py");
        CreateFile(auth, "oauth.py");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Python, info.Language);
        Assert.Equal(pkg, info.SourceFolder);
    }

    // Pattern 22: Package with api subfolder
    // Examples: API-focused SDKs
    [Fact]
    public void Pattern22_ApiSubfolder()
    {
        CreateFile("setup.py");
        var pkg = CreatePath("sdk");
        CreateFile(pkg, "__init__.py");
        var api = CreatePath(pkg, "api");
        CreateFile(api, "__init__.py");
        CreateFile(api, "client.py");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Python, info.Language);
        Assert.Equal(pkg, info.SourceFolder);
    }

    // Pattern 23: Package with core subfolder
    // Examples: Core functionality SDKs
    [Fact]
    public void Pattern23_CoreSubfolder()
    {
        CreateFile("pyproject.toml");
        var pkg = CreatePath("sdk");
        CreateFile(pkg, "__init__.py");
        var core = CreatePath(pkg, "core");
        CreateFile(core, "__init__.py");
        CreateFile(core, "client.py");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Python, info.Language);
        Assert.Equal(pkg, info.SourceFolder);
    }

    // Pattern 24: Package with http subfolder
    // Examples: HTTP client SDKs
    [Fact]
    public void Pattern24_HttpSubfolder()
    {
        CreateFile("setup.py");
        var pkg = CreatePath("sdk");
        CreateFile(pkg, "__init__.py");
        var http = CreatePath(pkg, "_http");
        CreateFile(http, "__init__.py");
        CreateFile(http, "transport.py");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Python, info.Language);
        Assert.Equal(pkg, info.SourceFolder);
    }

    // Pattern 25: Package with schemas subfolder
    // Examples: Schema-heavy SDKs
    [Fact]
    public void Pattern25_SchemasSubfolder()
    {
        CreateFile("pyproject.toml");
        var pkg = CreatePath("sdk");
        CreateFile(pkg, "__init__.py");
        CreateFile(pkg, "client.py");
        var schemas = CreatePath(pkg, "schemas");
        CreateFile(schemas, "__init__.py");
        CreateFile(schemas, "request.py");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Python, info.Language);
        Assert.Equal(pkg, info.SourceFolder);
    }

    // Pattern 26: Package with v1, v2 versioned subfolders
    // Examples: Versioned API SDKs
    [Fact]
    public void Pattern26_VersionedSubfolders()
    {
        CreateFile("setup.py");
        var pkg = CreatePath("sdk");
        CreateFile(pkg, "__init__.py");
        var v1 = CreatePath(pkg, "v1");
        CreateFile(v1, "__init__.py");
        CreateFile(v1, "client.py");
        var v2 = CreatePath(pkg, "v2");
        CreateFile(v2, "__init__.py");
        CreateFile(v2, "client.py");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Python, info.Language);
        Assert.Equal(pkg, info.SourceFolder);
    }

    // Pattern 27: Package with services subfolder
    // Examples: Service-based SDKs
    [Fact]
    public void Pattern27_ServicesSubfolder()
    {
        CreateFile("pyproject.toml");
        var pkg = CreatePath("sdk");
        CreateFile(pkg, "__init__.py");
        var services = CreatePath(pkg, "services");
        CreateFile(services, "__init__.py");
        CreateFile(services, "storage.py");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Python, info.Language);
        Assert.Equal(pkg, info.SourceFolder);
    }

    // Pattern 28: Package with ext subfolder
    // Examples: Extension-based SDKs
    [Fact]
    public void Pattern28_ExtSubfolder()
    {
        CreateFile("setup.py");
        var pkg = CreatePath("sdk");
        CreateFile(pkg, "__init__.py");
        CreateFile(pkg, "client.py");
        var ext = CreatePath(pkg, "ext");
        CreateFile(ext, "__init__.py");
        CreateFile(ext, "extensions.py");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Python, info.Language);
        Assert.Equal(pkg, info.SourceFolder);
    }

    // Pattern 29: Package with adapters subfolder
    // Examples: Adapter pattern SDKs
    [Fact]
    public void Pattern29_AdaptersSubfolder()
    {
        CreateFile("pyproject.toml");
        var pkg = CreatePath("sdk");
        CreateFile(pkg, "__init__.py");
        CreateFile(pkg, "client.py");
        var adapters = CreatePath(pkg, "adapters");
        CreateFile(adapters, "__init__.py");
        CreateFile(adapters, "http.py");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Python, info.Language);
        Assert.Equal(pkg, info.SourceFolder);
    }

    // Pattern 30: Package with mixins subfolder
    // Examples: Mixin-based SDKs
    [Fact]
    public void Pattern30_MixinsSubfolder()
    {
        CreateFile("setup.py");
        var pkg = CreatePath("sdk");
        CreateFile(pkg, "__init__.py");
        CreateFile(pkg, "client.py");
        var mixins = CreatePath(pkg, "_mixins");
        CreateFile(mixins, "__init__.py");
        CreateFile(mixins, "pagination.py");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Python, info.Language);
        Assert.Equal(pkg, info.SourceFolder);
    }

    // Pattern 31: Package with compat subfolder
    // Examples: Compatibility layer SDKs
    [Fact]
    public void Pattern31_CompatSubfolder()
    {
        CreateFile("pyproject.toml");
        var pkg = CreatePath("sdk");
        CreateFile(pkg, "__init__.py");
        CreateFile(pkg, "client.py");
        var compat = CreatePath(pkg, "_compat");
        CreateFile(compat, "__init__.py");
        CreateFile(compat, "py2.py");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Python, info.Language);
        Assert.Equal(pkg, info.SourceFolder);
    }

    // Pattern 32: Package with protocol subfolder
    // Examples: Protocol-based SDKs
    [Fact]
    public void Pattern32_ProtocolSubfolder()
    {
        CreateFile("setup.py");
        var pkg = CreatePath("sdk");
        CreateFile(pkg, "__init__.py");
        CreateFile(pkg, "client.py");
        var protocol = CreatePath(pkg, "protocol");
        CreateFile(protocol, "__init__.py");
        CreateFile(protocol, "rest.py");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Python, info.Language);
        Assert.Equal(pkg, info.SourceFolder);
    }

    // Pattern 33: Package with vendored subfolder
    // Examples: Vendored dependencies
    [Fact]
    public void Pattern33_VendoredSubfolder()
    {
        CreateFile("pyproject.toml");
        var pkg = CreatePath("sdk");
        CreateFile(pkg, "__init__.py");
        CreateFile(pkg, "client.py");
        var vendored = CreatePath(pkg, "_vendor");
        CreateFile(vendored, "__init__.py");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Python, info.Language);
        Assert.Equal(pkg, info.SourceFolder);
    }

    // Pattern 34: Package with pagination subfolder
    // Examples: Paginated API SDKs
    [Fact]
    public void Pattern34_PaginationSubfolder()
    {
        CreateFile("setup.py");
        var pkg = CreatePath("sdk");
        CreateFile(pkg, "__init__.py");
        CreateFile(pkg, "client.py");
        var pagination = CreatePath(pkg, "pagination");
        CreateFile(pagination, "__init__.py");
        CreateFile(pagination, "iterator.py");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Python, info.Language);
        Assert.Equal(pkg, info.SourceFolder);
    }

    // Pattern 35: Package with retry subfolder
    // Examples: Retry-logic SDKs
    [Fact]
    public void Pattern35_RetrySubfolder()
    {
        CreateFile("pyproject.toml");
        var pkg = CreatePath("sdk");
        CreateFile(pkg, "__init__.py");
        CreateFile(pkg, "client.py");
        var retry = CreatePath(pkg, "_retry");
        CreateFile(retry, "__init__.py");
        CreateFile(retry, "exponential.py");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Python, info.Language);
        Assert.Equal(pkg, info.SourceFolder);
    }

    // Pattern 36: python/src layout
    // Examples: Multi-language repos
    [Fact]
    public void Pattern36_PythonSrcLayout()
    {
        var pythonSrc = CreatePath("python", "src");
        CreateFile(pythonSrc, "setup.py");
        var pkg = CreatePath(pythonSrc, "sdk");
        CreateFile(pkg, "__init__.py");
        CreateFile(pkg, "client.py");

        var info = SdkInfo.Scan(pythonSrc);

        Assert.Equal(SdkLanguage.Python, info.Language);
        Assert.Equal(pkg, info.SourceFolder);
    }

    // Pattern 37: Package with streaming subfolder
    // Examples: Streaming SDKs
    [Fact]
    public void Pattern37_StreamingSubfolder()
    {
        CreateFile("setup.py");
        var pkg = CreatePath("sdk");
        CreateFile(pkg, "__init__.py");
        CreateFile(pkg, "client.py");
        var streaming = CreatePath(pkg, "streaming");
        CreateFile(streaming, "__init__.py");
        CreateFile(streaming, "events.py");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Python, info.Language);
        Assert.Equal(pkg, info.SourceFolder);
    }

    // Pattern 38: Package with webhooks subfolder
    // Examples: Webhook SDKs
    [Fact]
    public void Pattern38_WebhooksSubfolder()
    {
        CreateFile("pyproject.toml");
        var pkg = CreatePath("sdk");
        CreateFile(pkg, "__init__.py");
        CreateFile(pkg, "client.py");
        var webhooks = CreatePath(pkg, "webhooks");
        CreateFile(webhooks, "__init__.py");
        CreateFile(webhooks, "signature.py");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Python, info.Language);
        Assert.Equal(pkg, info.SourceFolder);
    }

    // Pattern 39: Package with serializers subfolder
    // Examples: Serialization SDKs
    [Fact]
    public void Pattern39_SerializersSubfolder()
    {
        CreateFile("setup.py");
        var pkg = CreatePath("sdk");
        CreateFile(pkg, "__init__.py");
        CreateFile(pkg, "client.py");
        var serializers = CreatePath(pkg, "serializers");
        CreateFile(serializers, "__init__.py");
        CreateFile(serializers, "json.py");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Python, info.Language);
        Assert.Equal(pkg, info.SourceFolder);
    }

    // Pattern 40: Package with managers subfolder
    // Examples: Manager pattern SDKs
    [Fact]
    public void Pattern40_ManagersSubfolder()
    {
        CreateFile("pyproject.toml");
        var pkg = CreatePath("sdk");
        CreateFile(pkg, "__init__.py");
        CreateFile(pkg, "client.py");
        var managers = CreatePath(pkg, "managers");
        CreateFile(managers, "__init__.py");
        CreateFile(managers, "resource.py");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Python, info.Language);
        Assert.Equal(pkg, info.SourceFolder);
    }

    // Pattern 41: Package with handlers subfolder
    // Examples: Handler pattern SDKs
    [Fact]
    public void Pattern41_HandlersSubfolder()
    {
        CreateFile("setup.py");
        var pkg = CreatePath("sdk");
        CreateFile(pkg, "__init__.py");
        CreateFile(pkg, "client.py");
        var handlers = CreatePath(pkg, "handlers");
        CreateFile(handlers, "__init__.py");
        CreateFile(handlers, "response.py");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Python, info.Language);
        Assert.Equal(pkg, info.SourceFolder);
    }

    // Pattern 42: Package with validators subfolder
    // Examples: Validation-heavy SDKs
    [Fact]
    public void Pattern42_ValidatorsSubfolder()
    {
        CreateFile("pyproject.toml");
        var pkg = CreatePath("sdk");
        CreateFile(pkg, "__init__.py");
        CreateFile(pkg, "client.py");
        var validators = CreatePath(pkg, "validators");
        CreateFile(validators, "__init__.py");
        CreateFile(validators, "schema.py");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Python, info.Language);
        Assert.Equal(pkg, info.SourceFolder);
    }

    // Pattern 43: Package with parsers subfolder
    // Examples: Parser-based SDKs
    [Fact]
    public void Pattern43_ParsersSubfolder()
    {
        CreateFile("setup.py");
        var pkg = CreatePath("sdk");
        CreateFile(pkg, "__init__.py");
        CreateFile(pkg, "client.py");
        var parsers = CreatePath(pkg, "parsers");
        CreateFile(parsers, "__init__.py");
        CreateFile(parsers, "json.py");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Python, info.Language);
        Assert.Equal(pkg, info.SourceFolder);
    }

    // Pattern 44: Package with encoders subfolder
    // Examples: Encoding SDKs
    [Fact]
    public void Pattern44_EncodersSubfolder()
    {
        CreateFile("pyproject.toml");
        var pkg = CreatePath("sdk");
        CreateFile(pkg, "__init__.py");
        CreateFile(pkg, "client.py");
        var encoders = CreatePath(pkg, "encoders");
        CreateFile(encoders, "__init__.py");
        CreateFile(encoders, "base64.py");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Python, info.Language);
        Assert.Equal(pkg, info.SourceFolder);
    }

    // Pattern 45: Package with transport subfolder
    // Examples: Transport layer SDKs
    [Fact]
    public void Pattern45_TransportSubfolder()
    {
        CreateFile("setup.py");
        var pkg = CreatePath("sdk");
        CreateFile(pkg, "__init__.py");
        CreateFile(pkg, "client.py");
        var transport = CreatePath(pkg, "transport");
        CreateFile(transport, "__init__.py");
        CreateFile(transport, "aiohttp.py");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Python, info.Language);
        Assert.Equal(pkg, info.SourceFolder);
    }

    // Pattern 46: Package with config subfolder
    // Examples: Configuration-heavy SDKs
    [Fact]
    public void Pattern46_ConfigSubfolder()
    {
        CreateFile("pyproject.toml");
        var pkg = CreatePath("sdk");
        CreateFile(pkg, "__init__.py");
        CreateFile(pkg, "client.py");
        var config = CreatePath(pkg, "config");
        CreateFile(config, "__init__.py");
        CreateFile(config, "settings.py");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Python, info.Language);
        Assert.Equal(pkg, info.SourceFolder);
    }

    // Pattern 47: Package with middleware subfolder
    // Examples: Middleware-based SDKs
    [Fact]
    public void Pattern47_MiddlewareSubfolder()
    {
        CreateFile("setup.py");
        var pkg = CreatePath("sdk");
        CreateFile(pkg, "__init__.py");
        CreateFile(pkg, "client.py");
        var middleware = CreatePath(pkg, "middleware");
        CreateFile(middleware, "__init__.py");
        CreateFile(middleware, "logging.py");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Python, info.Language);
        Assert.Equal(pkg, info.SourceFolder);
    }

    // Pattern 48: Package with cache subfolder
    // Examples: Caching SDKs
    [Fact]
    public void Pattern48_CacheSubfolder()
    {
        CreateFile("pyproject.toml");
        var pkg = CreatePath("sdk");
        CreateFile(pkg, "__init__.py");
        CreateFile(pkg, "client.py");
        var cache = CreatePath(pkg, "cache");
        CreateFile(cache, "__init__.py");
        CreateFile(cache, "memory.py");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Python, info.Language);
        Assert.Equal(pkg, info.SourceFolder);
    }

    // Pattern 49: Package with policies subfolder
    // Examples: Policy-based SDKs
    [Fact]
    public void Pattern49_PoliciesSubfolder()
    {
        CreateFile("setup.py");
        var pkg = CreatePath("sdk");
        CreateFile(pkg, "__init__.py");
        CreateFile(pkg, "client.py");
        var policies = CreatePath(pkg, "policies");
        CreateFile(policies, "__init__.py");
        CreateFile(policies, "retry.py");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Python, info.Language);
        Assert.Equal(pkg, info.SourceFolder);
    }

    // Pattern 50: Package with credentials subfolder
    // Examples: Credential-focused SDKs
    [Fact]
    public void Pattern50_CredentialsSubfolder()
    {
        CreateFile("pyproject.toml");
        var pkg = CreatePath("sdk");
        CreateFile(pkg, "__init__.py");
        CreateFile(pkg, "client.py");
        var credentials = CreatePath(pkg, "credentials");
        CreateFile(credentials, "__init__.py");
        CreateFile(credentials, "token.py");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.Python, info.Language);
        Assert.Equal(pkg, info.SourceFolder);
    }
}

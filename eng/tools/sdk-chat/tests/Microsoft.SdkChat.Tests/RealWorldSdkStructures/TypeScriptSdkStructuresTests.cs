// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using Microsoft.SdkChat.Models;
using Microsoft.SdkChat.Services;
using Xunit;

namespace Microsoft.SdkChat.Tests.RealWorldSdkStructures;

/// <summary>
/// Tests based on real-world TypeScript/JavaScript SDK repository structures from top GitHub repos.
/// Each test represents a distinct, deduped pattern found in popular TypeScript/JavaScript SDKs.
/// </summary>
[Collection("SdkInfoCache")]
public class TypeScriptSdkStructuresTests : SdkStructureTestBase
{
    // Pattern 1: src/*.ts with tsconfig.json
    // Examples: openai-node, anthropic-sdk-typescript
    [Fact]
    public void Pattern01_SrcFolderWithTsConfig()
    {
        CreateFile("package.json");
        CreateFile("tsconfig.json");
        var src = CreatePath("src");
        CreateFile(src, "index.ts");
        CreateFile(src, "client.ts");
        var examples = CreatePath("examples");
        CreateFile(examples, "chat.ts");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.TypeScript, info.Language);
        Assert.Equal(src, info.SourceFolder);
        Assert.Equal(examples, info.SamplesFolder);
    }

    // Pattern 2: lib/*.ts (library folder)
    // Examples: stripe-node
    [Fact]
    public void Pattern02_LibFolder()
    {
        CreateFile("package.json");
        CreateFile("tsconfig.json");
        var lib = CreatePath("lib");
        CreateFile(lib, "stripe.ts");
        CreateFile(lib, "index.ts");
        var examples = CreatePath("examples");
        CreateFile(examples, "webhook.ts");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.TypeScript, info.Language);
        Assert.Equal(lib, info.SourceFolder);
        Assert.Equal(examples, info.SamplesFolder);
    }

    // Pattern 3: src/resources subfolder
    // Examples: openai-node
    [Fact]
    public void Pattern03_ResourcesSubfolder()
    {
        CreateFile("package.json");
        CreateFile("tsconfig.json");
        var src = CreatePath("src");
        CreateFile(src, "index.ts");
        var resources = CreatePath(src, "resources");
        CreateFile(resources, "chat.ts");
        CreateFile(resources, "completions.ts");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.TypeScript, info.Language);
        Assert.Equal(src, info.SourceFolder);
    }

    // Pattern 4: JavaScript without tsconfig (pure JS)
    // Examples: twilio-node (older versions)
    [Fact]
    public void Pattern04_PureJavaScript()
    {
        CreateFile("package.json");
        var lib = CreatePath("lib");
        CreateFile(lib, "twilio.js");
        CreateFile(lib, "index.js");
        var examples = CreatePath("examples");
        CreateFile(examples, "send_sms.js");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.JavaScript, info.Language);
        Assert.Equal(lib, info.SourceFolder);
        Assert.Equal(examples, info.SamplesFolder);
    }

    // Pattern 5: src with plugins subfolder
    // Examples: octokit.js
    [Fact]
    public void Pattern05_PluginsSubfolder()
    {
        CreateFile("package.json");
        CreateFile("tsconfig.json");
        var src = CreatePath("src");
        CreateFile(src, "index.ts");
        CreateFile(src, "octokit.ts");
        var plugins = CreatePath(src, "plugins");
        CreateFile(plugins, "pagination.ts");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.TypeScript, info.Language);
        Assert.Equal(src, info.SourceFolder);
    }

    // Pattern 6: src with types subfolder
    // Examples: Many TypeScript SDKs
    [Fact]
    public void Pattern06_TypesSubfolder()
    {
        CreateFile("package.json");
        CreateFile("tsconfig.json");
        var src = CreatePath("src");
        CreateFile(src, "index.ts");
        var types = CreatePath(src, "types");
        CreateFile(types, "index.ts");
        CreateFile(types, "chat.ts");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.TypeScript, info.Language);
        Assert.Equal(src, info.SourceFolder);
    }

    // Pattern 7: src with api subfolder
    // Examples: API client SDKs
    [Fact]
    public void Pattern07_ApiSubfolder()
    {
        CreateFile("package.json");
        CreateFile("tsconfig.json");
        var src = CreatePath("src");
        CreateFile(src, "index.ts");
        var api = CreatePath(src, "api");
        CreateFile(api, "client.ts");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.TypeScript, info.Language);
        Assert.Equal(src, info.SourceFolder);
    }

    // Pattern 8: src with utils subfolder
    // Examples: Many utility SDKs
    [Fact]
    public void Pattern08_UtilsSubfolder()
    {
        CreateFile("package.json");
        CreateFile("tsconfig.json");
        var src = CreatePath("src");
        CreateFile(src, "index.ts");
        CreateFile(src, "client.ts");
        var utils = CreatePath(src, "utils");
        CreateFile(utils, "helpers.ts");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.TypeScript, info.Language);
        Assert.Equal(src, info.SourceFolder);
    }

    // Pattern 9: src with models subfolder
    // Examples: Model-heavy SDKs
    [Fact]
    public void Pattern09_ModelsSubfolder()
    {
        CreateFile("package.json");
        CreateFile("tsconfig.json");
        var src = CreatePath("src");
        CreateFile(src, "index.ts");
        var models = CreatePath(src, "models");
        CreateFile(models, "response.ts");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.TypeScript, info.Language);
        Assert.Equal(src, info.SourceFolder);
    }

    // Pattern 10: src with services subfolder
    // Examples: Service-based SDKs
    [Fact]
    public void Pattern10_ServicesSubfolder()
    {
        CreateFile("package.json");
        CreateFile("tsconfig.json");
        var src = CreatePath("src");
        CreateFile(src, "index.ts");
        var services = CreatePath(src, "services");
        CreateFile(services, "storage.ts");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.TypeScript, info.Language);
        Assert.Equal(src, info.SourceFolder);
    }

    // Pattern 11: src with commands subfolder
    // Examples: AWS SDK v3 style
    [Fact]
    public void Pattern11_CommandsSubfolder()
    {
        CreateFile("package.json");
        CreateFile("tsconfig.json");
        var src = CreatePath("src");
        CreateFile(src, "index.ts");
        CreateFile(src, "S3Client.ts");
        var commands = CreatePath(src, "commands");
        CreateFile(commands, "GetObjectCommand.ts");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.TypeScript, info.Language);
        Assert.Equal(src, info.SourceFolder);
    }

    // Pattern 12: src with lib subfolder (nested)
    // Examples: Some complex SDKs
    [Fact]
    public void Pattern12_SrcLibSubfolder()
    {
        CreateFile("package.json");
        CreateFile("tsconfig.json");
        var src = CreatePath("src");
        CreateFile(src, "index.ts");
        var lib = CreatePath(src, "lib");
        CreateFile(lib, "core.ts");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.TypeScript, info.Language);
        Assert.Equal(src, info.SourceFolder);
    }

    // Pattern 13: src with _internal subfolder
    // Examples: Private implementation
    [Fact]
    public void Pattern13_InternalSubfolder()
    {
        CreateFile("package.json");
        CreateFile("tsconfig.json");
        var src = CreatePath("src");
        CreateFile(src, "index.ts");
        var internal_ = CreatePath(src, "_internal");
        CreateFile(internal_, "http.ts");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.TypeScript, info.Language);
        Assert.Equal(src, info.SourceFolder);
    }

    // Pattern 14: src with core subfolder
    // Examples: Core functionality SDKs
    [Fact]
    public void Pattern14_CoreSubfolder()
    {
        CreateFile("package.json");
        CreateFile("tsconfig.json");
        var src = CreatePath("src");
        CreateFile(src, "index.ts");
        var core = CreatePath(src, "core");
        CreateFile(core, "client.ts");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.TypeScript, info.Language);
        Assert.Equal(src, info.SourceFolder);
    }

    // Pattern 15: src with errors subfolder
    // Examples: Error-handling SDKs
    [Fact]
    public void Pattern15_ErrorsSubfolder()
    {
        CreateFile("package.json");
        CreateFile("tsconfig.json");
        var src = CreatePath("src");
        CreateFile(src, "index.ts");
        var errors = CreatePath(src, "errors");
        CreateFile(errors, "ApiError.ts");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.TypeScript, info.Language);
        Assert.Equal(src, info.SourceFolder);
    }

    // Pattern 16: src with streams subfolder
    // Examples: Streaming SDKs (Vercel AI)
    [Fact]
    public void Pattern16_StreamsSubfolder()
    {
        CreateFile("package.json");
        CreateFile("tsconfig.json");
        var src = CreatePath("src");
        CreateFile(src, "index.ts");
        var streams = CreatePath(src, "streams");
        CreateFile(streams, "index.ts");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.TypeScript, info.Language);
        Assert.Equal(src, info.SourceFolder);
    }

    // Pattern 17: src with http subfolder
    // Examples: HTTP client SDKs
    [Fact]
    public void Pattern17_HttpSubfolder()
    {
        CreateFile("package.json");
        CreateFile("tsconfig.json");
        var src = CreatePath("src");
        CreateFile(src, "index.ts");
        var http = CreatePath(src, "http");
        CreateFile(http, "client.ts");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.TypeScript, info.Language);
        Assert.Equal(src, info.SourceFolder);
    }

    // Pattern 18: src with auth subfolder
    // Examples: Auth-focused SDKs
    [Fact]
    public void Pattern18_AuthSubfolder()
    {
        CreateFile("package.json");
        CreateFile("tsconfig.json");
        var src = CreatePath("src");
        CreateFile(src, "index.ts");
        var auth = CreatePath(src, "auth");
        CreateFile(auth, "oauth.ts");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.TypeScript, info.Language);
        Assert.Equal(src, info.SourceFolder);
    }

    // Pattern 19: src with runtime subfolder
    // Examples: Runtime SDKs
    [Fact]
    public void Pattern19_RuntimeSubfolder()
    {
        CreateFile("package.json");
        CreateFile("tsconfig.json");
        var src = CreatePath("src");
        CreateFile(src, "index.ts");
        var runtime = CreatePath(src, "runtime");
        CreateFile(runtime, "node.ts");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.TypeScript, info.Language);
        Assert.Equal(src, info.SourceFolder);
    }

    // Pattern 20: src with generated subfolder
    // Examples: Auto-generated SDKs
    [Fact]
    public void Pattern20_GeneratedSubfolder()
    {
        CreateFile("package.json");
        CreateFile("tsconfig.json");
        var src = CreatePath("src");
        CreateFile(src, "index.ts");
        var generated = CreatePath(src, "generated");
        CreateFile(generated, "client.ts");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.TypeScript, info.Language);
        Assert.Equal(src, info.SourceFolder);
    }

    // Pattern 21: src with interfaces subfolder
    // Examples: Interface-heavy SDKs
    [Fact]
    public void Pattern21_InterfacesSubfolder()
    {
        CreateFile("package.json");
        CreateFile("tsconfig.json");
        var src = CreatePath("src");
        CreateFile(src, "index.ts");
        var interfaces = CreatePath(src, "interfaces");
        CreateFile(interfaces, "client.ts");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.TypeScript, info.Language);
        Assert.Equal(src, info.SourceFolder);
    }

    // Pattern 22: src with constants subfolder
    // Examples: Constant-heavy SDKs
    [Fact]
    public void Pattern22_ConstantsSubfolder()
    {
        CreateFile("package.json");
        CreateFile("tsconfig.json");
        var src = CreatePath("src");
        CreateFile(src, "index.ts");
        var constants = CreatePath(src, "constants");
        CreateFile(constants, "endpoints.ts");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.TypeScript, info.Language);
        Assert.Equal(src, info.SourceFolder);
    }

    // Pattern 23: src with middleware subfolder
    // Examples: Middleware-based SDKs
    [Fact]
    public void Pattern23_MiddlewareSubfolder()
    {
        CreateFile("package.json");
        CreateFile("tsconfig.json");
        var src = CreatePath("src");
        CreateFile(src, "index.ts");
        var middleware = CreatePath(src, "middleware");
        CreateFile(middleware, "retry.ts");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.TypeScript, info.Language);
        Assert.Equal(src, info.SourceFolder);
    }

    // Pattern 24: src with hooks subfolder
    // Examples: React-based SDKs
    [Fact]
    public void Pattern24_HooksSubfolder()
    {
        CreateFile("package.json");
        CreateFile("tsconfig.json");
        var src = CreatePath("src");
        CreateFile(src, "index.ts");
        var hooks = CreatePath(src, "hooks");
        CreateFile(hooks, "useClient.ts");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.TypeScript, info.Language);
        Assert.Equal(src, info.SourceFolder);
    }

    // Pattern 25: src with pagination subfolder
    // Examples: Paginated API SDKs
    [Fact]
    public void Pattern25_PaginationSubfolder()
    {
        CreateFile("package.json");
        CreateFile("tsconfig.json");
        var src = CreatePath("src");
        CreateFile(src, "index.ts");
        var pagination = CreatePath(src, "pagination");
        CreateFile(pagination, "iterator.ts");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.TypeScript, info.Language);
        Assert.Equal(src, info.SourceFolder);
    }

    // Pattern 26: src with serializers subfolder
    // Examples: Serialization SDKs
    [Fact]
    public void Pattern26_SerializersSubfolder()
    {
        CreateFile("package.json");
        CreateFile("tsconfig.json");
        var src = CreatePath("src");
        CreateFile(src, "index.ts");
        var serializers = CreatePath(src, "serializers");
        CreateFile(serializers, "json.ts");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.TypeScript, info.Language);
        Assert.Equal(src, info.SourceFolder);
    }

    // Pattern 27: src with transformers subfolder
    // Examples: Transformer SDKs
    [Fact]
    public void Pattern27_TransformersSubfolder()
    {
        CreateFile("package.json");
        CreateFile("tsconfig.json");
        var src = CreatePath("src");
        CreateFile(src, "index.ts");
        var transformers = CreatePath(src, "transformers");
        CreateFile(transformers, "response.ts");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.TypeScript, info.Language);
        Assert.Equal(src, info.SourceFolder);
    }

    // Pattern 28: src with adapters subfolder
    // Examples: Adapter pattern SDKs
    [Fact]
    public void Pattern28_AdaptersSubfolder()
    {
        CreateFile("package.json");
        CreateFile("tsconfig.json");
        var src = CreatePath("src");
        CreateFile(src, "index.ts");
        var adapters = CreatePath(src, "adapters");
        CreateFile(adapters, "fetch.ts");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.TypeScript, info.Language);
        Assert.Equal(src, info.SourceFolder);
    }

    // Pattern 29: src with schema subfolder
    // Examples: Schema validation SDKs
    [Fact]
    public void Pattern29_SchemaSubfolder()
    {
        CreateFile("package.json");
        CreateFile("tsconfig.json");
        var src = CreatePath("src");
        CreateFile(src, "index.ts");
        var schema = CreatePath(src, "schema");
        CreateFile(schema, "request.ts");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.TypeScript, info.Language);
        Assert.Equal(src, info.SourceFolder);
    }

    // Pattern 30: src with protocols subfolder
    // Examples: Protocol SDKs
    [Fact]
    public void Pattern30_ProtocolsSubfolder()
    {
        CreateFile("package.json");
        CreateFile("tsconfig.json");
        var src = CreatePath("src");
        CreateFile(src, "index.ts");
        var protocols = CreatePath(src, "protocols");
        CreateFile(protocols, "rest.ts");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.TypeScript, info.Language);
        Assert.Equal(src, info.SourceFolder);
    }

    // Pattern 31: src with handlers subfolder
    // Examples: Handler-based SDKs
    [Fact]
    public void Pattern31_HandlersSubfolder()
    {
        CreateFile("package.json");
        CreateFile("tsconfig.json");
        var src = CreatePath("src");
        CreateFile(src, "index.ts");
        var handlers = CreatePath(src, "handlers");
        CreateFile(handlers, "webhook.ts");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.TypeScript, info.Language);
        Assert.Equal(src, info.SourceFolder);
    }

    // Pattern 32: src with config subfolder
    // Examples: Configuration SDKs
    [Fact]
    public void Pattern32_ConfigSubfolder()
    {
        CreateFile("package.json");
        CreateFile("tsconfig.json");
        var src = CreatePath("src");
        CreateFile(src, "index.ts");
        var config = CreatePath(src, "config");
        CreateFile(config, "defaults.ts");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.TypeScript, info.Language);
        Assert.Equal(src, info.SourceFolder);
    }

    // Pattern 33: src with clients subfolder
    // Examples: Multi-client SDKs
    [Fact]
    public void Pattern33_ClientsSubfolder()
    {
        CreateFile("package.json");
        CreateFile("tsconfig.json");
        var src = CreatePath("src");
        CreateFile(src, "index.ts");
        var clients = CreatePath(src, "clients");
        CreateFile(clients, "rest.ts");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.TypeScript, info.Language);
        Assert.Equal(src, info.SourceFolder);
    }

    // Pattern 34: src with helpers subfolder
    // Examples: Helper-heavy SDKs
    [Fact]
    public void Pattern34_HelpersSubfolder()
    {
        CreateFile("package.json");
        CreateFile("tsconfig.json");
        var src = CreatePath("src");
        CreateFile(src, "index.ts");
        var helpers = CreatePath(src, "helpers");
        CreateFile(helpers, "url.ts");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.TypeScript, info.Language);
        Assert.Equal(src, info.SourceFolder);
    }

    // Pattern 35: src with builders subfolder
    // Examples: Builder pattern SDKs
    [Fact]
    public void Pattern35_BuildersSubfolder()
    {
        CreateFile("package.json");
        CreateFile("tsconfig.json");
        var src = CreatePath("src");
        CreateFile(src, "index.ts");
        var builders = CreatePath(src, "builders");
        CreateFile(builders, "request.ts");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.TypeScript, info.Language);
        Assert.Equal(src, info.SourceFolder);
    }

    // Pattern 36: typescript/src layout
    // Examples: Multi-language repos
    [Fact]
    public void Pattern36_TypeScriptSrcLayout()
    {
        var tsSrc = CreatePath("typescript", "src");
        CreateFile(tsSrc, "package.json");
        CreateFile(tsSrc, "tsconfig.json");
        var src = CreatePath(tsSrc, "src");
        CreateFile(src, "index.ts");
        CreateFile(src, "client.ts");

        var info = SdkInfo.Scan(tsSrc);

        Assert.Equal(SdkLanguage.TypeScript, info.Language);
        Assert.Equal(src, info.SourceFolder);
    }

    // Pattern 37: src with events subfolder
    // Examples: Event-driven SDKs
    [Fact]
    public void Pattern37_EventsSubfolder()
    {
        CreateFile("package.json");
        CreateFile("tsconfig.json");
        var src = CreatePath("src");
        CreateFile(src, "index.ts");
        var events = CreatePath(src, "events");
        CreateFile(events, "emitter.ts");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.TypeScript, info.Language);
        Assert.Equal(src, info.SourceFolder);
    }

    // Pattern 38: src with webhooks subfolder
    // Examples: Webhook SDKs
    [Fact]
    public void Pattern38_WebhooksSubfolder()
    {
        CreateFile("package.json");
        CreateFile("tsconfig.json");
        var src = CreatePath("src");
        CreateFile(src, "index.ts");
        var webhooks = CreatePath(src, "webhooks");
        CreateFile(webhooks, "signature.ts");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.TypeScript, info.Language);
        Assert.Equal(src, info.SourceFolder);
    }

    // Pattern 39: src with retry subfolder
    // Examples: Retry logic SDKs
    [Fact]
    public void Pattern39_RetrySubfolder()
    {
        CreateFile("package.json");
        CreateFile("tsconfig.json");
        var src = CreatePath("src");
        CreateFile(src, "index.ts");
        var retry = CreatePath(src, "retry");
        CreateFile(retry, "exponential.ts");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.TypeScript, info.Language);
        Assert.Equal(src, info.SourceFolder);
    }

    // Pattern 40: src with cache subfolder
    // Examples: Caching SDKs
    [Fact]
    public void Pattern40_CacheSubfolder()
    {
        CreateFile("package.json");
        CreateFile("tsconfig.json");
        var src = CreatePath("src");
        CreateFile(src, "index.ts");
        var cache = CreatePath(src, "cache");
        CreateFile(cache, "memory.ts");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.TypeScript, info.Language);
        Assert.Equal(src, info.SourceFolder);
    }

    // Pattern 41: src with logger subfolder
    // Examples: Logging SDKs
    [Fact]
    public void Pattern41_LoggerSubfolder()
    {
        CreateFile("package.json");
        CreateFile("tsconfig.json");
        var src = CreatePath("src");
        CreateFile(src, "index.ts");
        var logger = CreatePath(src, "logger");
        CreateFile(logger, "console.ts");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.TypeScript, info.Language);
        Assert.Equal(src, info.SourceFolder);
    }

    // Pattern 42: src with polyfills subfolder
    // Examples: Polyfill SDKs
    [Fact]
    public void Pattern42_PolyfillsSubfolder()
    {
        CreateFile("package.json");
        CreateFile("tsconfig.json");
        var src = CreatePath("src");
        CreateFile(src, "index.ts");
        var polyfills = CreatePath(src, "polyfills");
        CreateFile(polyfills, "fetch.ts");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.TypeScript, info.Language);
        Assert.Equal(src, info.SourceFolder);
    }

    // Pattern 43: src with vendor subfolder
    // Examples: Vendored dependencies
    [Fact]
    public void Pattern43_VendorSubfolder()
    {
        CreateFile("package.json");
        CreateFile("tsconfig.json");
        var src = CreatePath("src");
        CreateFile(src, "index.ts");
        var vendor = CreatePath(src, "vendor");
        CreateFile(vendor, "lib.ts");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.TypeScript, info.Language);
        Assert.Equal(src, info.SourceFolder);
    }

    // Pattern 44: src with codegen subfolder
    // Examples: Code generation SDKs
    [Fact]
    public void Pattern44_CodegenSubfolder()
    {
        CreateFile("package.json");
        CreateFile("tsconfig.json");
        var src = CreatePath("src");
        CreateFile(src, "index.ts");
        var codegen = CreatePath(src, "codegen");
        CreateFile(codegen, "client.ts");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.TypeScript, info.Language);
        Assert.Equal(src, info.SourceFolder);
    }

    // Pattern 45: src with validators subfolder
    // Examples: Validation SDKs
    [Fact]
    public void Pattern45_ValidatorsSubfolder()
    {
        CreateFile("package.json");
        CreateFile("tsconfig.json");
        var src = CreatePath("src");
        CreateFile(src, "index.ts");
        var validators = CreatePath(src, "validators");
        CreateFile(validators, "schema.ts");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.TypeScript, info.Language);
        Assert.Equal(src, info.SourceFolder);
    }

    // Pattern 46: src with parsers subfolder
    // Examples: Parser SDKs
    [Fact]
    public void Pattern46_ParsersSubfolder()
    {
        CreateFile("package.json");
        CreateFile("tsconfig.json");
        var src = CreatePath("src");
        CreateFile(src, "index.ts");
        var parsers = CreatePath(src, "parsers");
        CreateFile(parsers, "json.ts");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.TypeScript, info.Language);
        Assert.Equal(src, info.SourceFolder);
    }

    // Pattern 47: src with formatters subfolder
    // Examples: Formatter SDKs
    [Fact]
    public void Pattern47_FormattersSubfolder()
    {
        CreateFile("package.json");
        CreateFile("tsconfig.json");
        var src = CreatePath("src");
        CreateFile(src, "index.ts");
        var formatters = CreatePath(src, "formatters");
        CreateFile(formatters, "date.ts");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.TypeScript, info.Language);
        Assert.Equal(src, info.SourceFolder);
    }

    // Pattern 48: src with crypto subfolder
    // Examples: Crypto SDKs
    [Fact]
    public void Pattern48_CryptoSubfolder()
    {
        CreateFile("package.json");
        CreateFile("tsconfig.json");
        var src = CreatePath("src");
        CreateFile(src, "index.ts");
        var crypto = CreatePath(src, "crypto");
        CreateFile(crypto, "hash.ts");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.TypeScript, info.Language);
        Assert.Equal(src, info.SourceFolder);
    }

    // Pattern 49: src with encoders subfolder
    // Examples: Encoding SDKs
    [Fact]
    public void Pattern49_EncodersSubfolder()
    {
        CreateFile("package.json");
        CreateFile("tsconfig.json");
        var src = CreatePath("src");
        CreateFile(src, "index.ts");
        var encoders = CreatePath(src, "encoders");
        CreateFile(encoders, "base64.ts");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.TypeScript, info.Language);
        Assert.Equal(src, info.SourceFolder);
    }

    // Pattern 50: src with transport subfolder
    // Examples: Transport layer SDKs
    [Fact]
    public void Pattern50_TransportSubfolder()
    {
        CreateFile("package.json");
        CreateFile("tsconfig.json");
        var src = CreatePath("src");
        CreateFile(src, "index.ts");
        var transport = CreatePath(src, "transport");
        CreateFile(transport, "websocket.ts");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.TypeScript, info.Language);
        Assert.Equal(src, info.SourceFolder);
    }
}

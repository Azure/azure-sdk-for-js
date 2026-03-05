// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using Microsoft.SdkChat.Models;
using Microsoft.SdkChat.Services;
using Xunit;

namespace Microsoft.SdkChat.Tests.RealWorldSdkStructures;

/// <summary>
/// Tests based on real-world .NET SDK repository structures from top GitHub repos.
/// Each test represents a distinct, deduped pattern found in popular .NET SDKs.
/// </summary>
[Collection("SdkInfoCache")]
public class DotNetSdkStructuresTests : SdkStructureTestBase
{
    // Pattern 1: src/{ProjectName}/{ProjectName}.csproj with source files
    // Examples: Example.Storage.Blobs, Example.Identity
    [Fact]
    public void Pattern01_SrcProjectFolder_WithCsproj()
    {
        var src = CreatePath("src", "Example.Storage.Blobs");
        CreateFile(src, "Example.Storage.Blobs.csproj");
        CreateFile(src, "BlobClient.cs");
        CreateFile(src, "BlobContainerClient.cs");
        var samples = CreatePath("samples");
        CreateFile(samples, "Sample01_HelloWorld.cs");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.DotNet, info.Language);
        Assert.Contains("Example.Storage.Blobs", info.SourceFolder);
        Assert.Equal(samples, info.SamplesFolder);
    }

    // Pattern 2: src/{ProjectName}.csproj at src root, files in Generated subfolder
    // Examples: openai-dotnet
    [Fact]
    public void Pattern02_SrcWithCsproj_GeneratedSubfolder()
    {
        var src = CreatePath("src");
        CreateFile(src, "OpenAI.csproj");
        var generated = CreatePath(src, "Generated");
        CreateFile(generated, "OpenAIClient.cs");
        CreateFile(generated, "ChatCompletion.cs");
        var examples = CreatePath("examples");
        CreateFile(examples, "ChatExample.cs");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.DotNet, info.Language);
        Assert.Equal(src, info.SourceFolder);
        Assert.Equal(examples, info.SamplesFolder);
    }

    // Pattern 3: src/Namespace.Project/Namespace.Project.csproj
    // Examples: Stripe.net
    [Fact]
    public void Pattern03_SrcNamespacedProject()
    {
        var src = CreatePath("src", "Stripe.net");
        CreateFile(src, "Stripe.net.csproj");
        CreateFile(src, "StripeClient.cs");
        CreateFile(src, "StripeConfiguration.cs");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.DotNet, info.Language);
        Assert.Contains("Stripe.net", info.SourceFolder);
    }

    // Pattern 4: src/ProjectName/ProjectName.csproj with nested Rest folder
    // Examples: twilio-csharp
    [Fact]
    public void Pattern04_SrcWithNestedServices()
    {
        var src = CreatePath("src", "Twilio");
        CreateFile(src, "Twilio.csproj");
        CreateFile(src, "TwilioClient.cs");
        var rest = CreatePath(src, "Rest", "Api", "V2010");
        CreateFile(rest, "AccountResource.cs");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.DotNet, info.Language);
        Assert.Contains("Twilio", info.SourceFolder);
    }

    // Pattern 5: ProjectName/ProjectName.csproj at root level
    // Examples: octokit.net, Polly
    [Fact]
    public void Pattern05_RootProjectFolder()
    {
        var project = CreatePath("Octokit");
        CreateFile(project, "Octokit.csproj");
        CreateFile(project, "GitHubClient.cs");
        CreateFile(project, "ApiConnection.cs");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.DotNet, info.Language);
        Assert.Contains("Octokit", info.SourceFolder);
    }

    // Pattern 6: src/ProjectName/*.cs with .sln at root
    // Examples: RestSharp
    [Fact]
    public void Pattern06_SlnAtRoot_SrcProject()
    {
        CreateFile("RestSharp.sln");
        var src = CreatePath("src", "RestSharp");
        CreateFile(src, "RestSharp.csproj");
        CreateFile(src, "RestClient.cs");
        CreateFile(src, "RestRequest.cs");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.DotNet, info.Language);
        Assert.Contains("RestSharp", info.SourceFolder);
    }

    // Pattern 7: src/*.csproj with snippets folder
    // Examples: google-cloud-dotnet packages
    [Fact]
    public void Pattern07_SrcCsproj_SnippetsFolder()
    {
        var src = CreatePath("src");
        CreateFile(src, "Google.Cloud.Storage.V1.csproj");
        CreateFile(src, "StorageClient.cs");
        var snippets = CreatePath("snippets");
        CreateFile(snippets, "StorageSnippets.cs");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.DotNet, info.Language);
        Assert.Equal(src, info.SourceFolder);
    }

    // Pattern 8: Single .csproj at root with samples
    // Examples: Humanizer, smaller SDKs
    [Fact]
    public void Pattern08_CsprojAtRoot()
    {
        CreateFile("Humanizer.csproj");
        CreateFile("StringExtensions.cs");
        CreateFile("DateTimeExtensions.cs");
        var samples = CreatePath("samples");
        CreateFile(samples, "Demo.cs");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.DotNet, info.Language);
        Assert.Equal(_testRoot, info.SourceFolder);
        Assert.Equal(samples, info.SamplesFolder);
    }

    // Pattern 9: source/ProjectName/*.cs
    // Examples: NLog, Serilog
    [Fact]
    public void Pattern09_SourceFolder()
    {
        var source = CreatePath("source", "Serilog");
        CreateFile(source, "Serilog.csproj");
        CreateFile(source, "Log.cs");
        CreateFile(source, "LoggerConfiguration.cs");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.DotNet, info.Language);
        Assert.Contains("Serilog", info.SourceFolder);
    }

    // Pattern 10: src/*.csproj with demo folder
    // Examples: SignalR clients
    [Fact]
    public void Pattern10_DemoFolder()
    {
        var src = CreatePath("src");
        CreateFile(src, "SignalR.Client.csproj");
        CreateFile(src, "HubConnection.cs");
        var demo = CreatePath("demo");
        CreateFile(demo, "ChatDemo.cs");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.DotNet, info.Language);
        Assert.Equal(src, info.SourceFolder);
        Assert.Equal(demo, info.SamplesFolder);
    }

    // Pattern 11: src/Company.Product/*.csproj
    // Examples: Microsoft.Extensions.*
    [Fact]
    public void Pattern11_CompanyProductNaming()
    {
        var src = CreatePath("src", "Microsoft.Extensions.Logging");
        CreateFile(src, "Microsoft.Extensions.Logging.csproj");
        CreateFile(src, "Logger.cs");
        CreateFile(src, "LoggerFactory.cs");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.DotNet, info.Language);
        Assert.Contains("Microsoft.Extensions.Logging", info.SourceFolder);
    }

    // Pattern 12: src/*.csproj with quickstarts folder
    // Examples: Cognitive Services SDKs
    [Fact]
    public void Pattern12_QuickstartsFolder()
    {
        var src = CreatePath("src");
        CreateFile(src, "Example.AI.TextAnalytics.csproj");
        CreateFile(src, "TextAnalyticsClient.cs");
        var quickstarts = CreatePath("quickstarts");
        CreateFile(quickstarts, "AnalyzeText.cs");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.DotNet, info.Language);
        Assert.Equal(src, info.SourceFolder);
        Assert.Equal(quickstarts, info.SamplesFolder);
    }

    // Pattern 13: src/*.csproj with docs/samples
    // Examples: Well-documented SDKs
    [Fact]
    public void Pattern13_DocsSamples()
    {
        var src = CreatePath("src");
        CreateFile(src, "SDK.csproj");
        CreateFile(src, "Client.cs");
        var docsSamples = CreatePath("docs", "samples");
        CreateFile(docsSamples, "GettingStarted.cs");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.DotNet, info.Language);
        Assert.Equal(src, info.SourceFolder);
    }

    // Pattern 14: src/ProjectName with Models subfolder
    // Examples: Entity Framework, model-heavy SDKs
    [Fact]
    public void Pattern14_ModelsSubfolder()
    {
        var src = CreatePath("src", "EFCore");
        CreateFile(src, "EFCore.csproj");
        CreateFile(src, "DbContext.cs");
        var models = CreatePath(src, "Models");
        CreateFile(models, "Entity.cs");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.DotNet, info.Language);
        Assert.Contains("EFCore", info.SourceFolder);
    }

    // Pattern 15: lib/ProjectName/*.cs
    // Examples: Some older .NET projects
    [Fact]
    public void Pattern15_LibFolder()
    {
        var lib = CreatePath("lib", "MySDK");
        CreateFile(lib, "MySDK.csproj");
        CreateFile(lib, "Client.cs");
        CreateFile(lib, "Models.cs");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.DotNet, info.Language);
        Assert.Contains("MySDK", info.SourceFolder);
    }

    // Pattern 16: src/ProjectName.Client/*.csproj
    // Examples: Client suffix naming
    [Fact]
    public void Pattern16_ClientSuffixNaming()
    {
        var client = CreatePath("src", "Redis.Client");
        CreateFile(client, "Redis.Client.csproj");
        CreateFile(client, "RedisClient.cs");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.DotNet, info.Language);
        Assert.Contains("Redis.Client", info.SourceFolder);
    }

    // Pattern 17: src/ProjectName.SDK/*.csproj
    // Examples: SDK suffix naming
    [Fact]
    public void Pattern17_SdkSuffixNaming()
    {
        var sdk = CreatePath("src", "Auth0.SDK");
        CreateFile(sdk, "Auth0.SDK.csproj");
        CreateFile(sdk, "AuthenticationClient.cs");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.DotNet, info.Language);
        Assert.Contains("Auth0.SDK", info.SourceFolder);
    }

    // Pattern 18: src/ProjectName.Api/*.csproj
    // Examples: API-focused naming
    [Fact]
    public void Pattern18_ApiSuffixNaming()
    {
        var api = CreatePath("src", "Graph.Api");
        CreateFile(api, "Graph.Api.csproj");
        CreateFile(api, "GraphClient.cs");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.DotNet, info.Language);
        Assert.Contains("Graph.Api", info.SourceFolder);
    }

    // Pattern 19: src/ProjectName with Extensions subfolder
    // Examples: Extensible SDKs
    [Fact]
    public void Pattern19_ExtensionsSubfolder()
    {
        var src = CreatePath("src", "SDK");
        CreateFile(src, "SDK.csproj");
        CreateFile(src, "Client.cs");
        var ext = CreatePath(src, "Extensions");
        CreateFile(ext, "ServiceCollectionExtensions.cs");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.DotNet, info.Language);
        Assert.Contains("SDK", info.SourceFolder);
    }

    // Pattern 20: csharp/src/*.csproj (language subfolder)
    // Examples: gRPC language-specific folders
    [Fact]
    public void Pattern20_LanguageSubfolder()
    {
        var csharpSrc = CreatePath("csharp", "src");
        CreateFile(csharpSrc, "Grpc.Core.csproj");
        CreateFile(csharpSrc, "Channel.cs");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.DotNet, info.Language);
        Assert.Equal(csharpSrc, info.SourceFolder);
    }

    // Pattern 21: dotnet/src/*.csproj
    // Examples: Multi-language SDKs
    [Fact]
    public void Pattern21_DotnetSubfolder()
    {
        var dotnetSrc = CreatePath("dotnet", "src");
        CreateFile(dotnetSrc, "SDK.csproj");
        CreateFile(dotnetSrc, "Client.cs");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.DotNet, info.Language);
        Assert.Equal(dotnetSrc, info.SourceFolder);
    }

    // Pattern 22: src/ProjectName/ProjectName.csproj with tests/samples
    // Examples: Moq
    [Fact]
    public void Pattern22_TestsSamplesFolder()
    {
        var src = CreatePath("src", "Moq");
        CreateFile(src, "Moq.csproj");
        CreateFile(src, "Mock.cs");
        var testsSamples = CreatePath("tests", "samples");
        CreateFile(testsSamples, "BasicMocking.cs");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.DotNet, info.Language);
        Assert.Contains("Moq", info.SourceFolder);
    }

    // Pattern 23: src/Impl/*.cs with interface files
    // Examples: Some abstraction-heavy SDKs
    [Fact]
    public void Pattern23_ImplFolder()
    {
        var src = CreatePath("src", "SDK");
        CreateFile(src, "SDK.csproj");
        CreateFile(src, "IClient.cs");
        var impl = CreatePath(src, "Impl");
        CreateFile(impl, "Client.cs");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.DotNet, info.Language);
        Assert.Contains("SDK", info.SourceFolder);
    }

    // Pattern 24: shared/src/*.csproj
    // Examples: Shared libraries
    [Fact]
    public void Pattern24_SharedSrcFolder()
    {
        var shared = CreatePath("shared", "src");
        CreateFile(shared, "SharedLib.csproj");
        CreateFile(shared, "Utilities.cs");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.DotNet, info.Language);
        Assert.Equal(shared, info.SourceFolder);
    }

    // Pattern 25: api/src/*.csproj
    // Examples: API client libraries
    [Fact]
    public void Pattern25_ApiSrcFolder()
    {
        var apiSrc = CreatePath("api", "src");
        CreateFile(apiSrc, "ApiClient.csproj");
        CreateFile(apiSrc, "HttpClient.cs");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.DotNet, info.Language);
        Assert.Equal(apiSrc, info.SourceFolder);
    }

    // Pattern 26: client/src/*.csproj
    // Examples: Client libraries
    [Fact]
    public void Pattern26_ClientSrcFolder()
    {
        var clientSrc = CreatePath("client", "src");
        CreateFile(clientSrc, "Client.csproj");
        CreateFile(clientSrc, "ServiceClient.cs");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.DotNet, info.Language);
        Assert.Equal(clientSrc, info.SourceFolder);
    }

    // Pattern 27: src/Common/*.cs shared with main project
    // Examples: SDKs with shared code
    [Fact]
    public void Pattern27_CommonFolder()
    {
        var src = CreatePath("src", "SDK");
        CreateFile(src, "SDK.csproj");
        CreateFile(src, "Client.cs");
        var common = CreatePath(src, "Common");
        CreateFile(common, "Helpers.cs");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.DotNet, info.Language);
        Assert.Contains("SDK", info.SourceFolder);
    }

    // Pattern 28: src/ProjectName.Runtime/*.csproj
    // Examples: Runtime libraries
    [Fact]
    public void Pattern28_RuntimeSuffix()
    {
        var runtime = CreatePath("src", "SDK.Runtime");
        CreateFile(runtime, "SDK.Runtime.csproj");
        CreateFile(runtime, "RuntimeClient.cs");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.DotNet, info.Language);
        Assert.Contains("SDK.Runtime", info.SourceFolder);
    }

    // Pattern 29: pkg/src/*.csproj
    // Examples: Package-focused layout
    [Fact]
    public void Pattern29_PkgSrcFolder()
    {
        var pkg = CreatePath("pkg", "src");
        CreateFile(pkg, "Package.csproj");
        CreateFile(pkg, "PackageClient.cs");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.DotNet, info.Language);
        Assert.Equal(pkg, info.SourceFolder);
    }

    // Pattern 30: core/src/*.csproj
    // Examples: Core library layout
    [Fact]
    public void Pattern30_CoreSrcFolder()
    {
        var coreSrc = CreatePath("core", "src");
        CreateFile(coreSrc, "Core.csproj");
        CreateFile(coreSrc, "CoreClient.cs");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.DotNet, info.Language);
        Assert.Equal(coreSrc, info.SourceFolder);
    }

    // Pattern 31: src/*.csproj with Utilities subfolder
    // Examples: Utility-heavy SDKs
    [Fact]
    public void Pattern31_UtilitiesSubfolder()
    {
        var src = CreatePath("src", "SDK");
        CreateFile(src, "SDK.csproj");
        CreateFile(src, "Client.cs");
        var utils = CreatePath(src, "Utilities");
        CreateFile(utils, "HttpHelper.cs");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.DotNet, info.Language);
        Assert.Contains("SDK", info.SourceFolder);
    }

    // Pattern 32: library/src/*.csproj
    // Examples: Library-named folders
    [Fact]
    public void Pattern32_LibrarySrcFolder()
    {
        var libSrc = CreatePath("library", "src");
        CreateFile(libSrc, "Library.csproj");
        CreateFile(libSrc, "LibraryClient.cs");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.DotNet, info.Language);
        Assert.Equal(libSrc, info.SourceFolder);
    }

    // Pattern 33: src/ProjectName.Abstractions/*.csproj
    // Examples: Abstraction packages
    [Fact]
    public void Pattern33_AbstractionsSuffix()
    {
        var abstractions = CreatePath("src", "SDK.Abstractions");
        CreateFile(abstractions, "SDK.Abstractions.csproj");
        CreateFile(abstractions, "IClient.cs");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.DotNet, info.Language);
        Assert.Contains("SDK.Abstractions", info.SourceFolder);
    }

    // Pattern 34: module/src/*.csproj
    // Examples: Module-based architecture
    [Fact]
    public void Pattern34_ModuleSrcFolder()
    {
        var moduleSrc = CreatePath("module", "src");
        CreateFile(moduleSrc, "Module.csproj");
        CreateFile(moduleSrc, "ModuleClient.cs");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.DotNet, info.Language);
        Assert.Equal(moduleSrc, info.SourceFolder);
    }

    // Pattern 35: src/ProjectName.Http/*.csproj
    // Examples: HTTP-focused SDKs
    [Fact]
    public void Pattern35_HttpSuffix()
    {
        var http = CreatePath("src", "SDK.Http");
        CreateFile(http, "SDK.Http.csproj");
        CreateFile(http, "HttpClientWrapper.cs");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.DotNet, info.Language);
        Assert.Contains("SDK.Http", info.SourceFolder);
    }

    // Pattern 36: framework/src/*.csproj
    // Examples: Framework libraries
    [Fact]
    public void Pattern36_FrameworkSrcFolder()
    {
        var fwSrc = CreatePath("framework", "src");
        CreateFile(fwSrc, "Framework.csproj");
        CreateFile(fwSrc, "FrameworkClient.cs");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.DotNet, info.Language);
        Assert.Equal(fwSrc, info.SourceFolder);
    }

    // Pattern 37: src/ProjectName.Core/*.csproj
    // Examples: Core suffix packages
    [Fact]
    public void Pattern37_CoreSuffix()
    {
        var core = CreatePath("src", "SDK.Core");
        CreateFile(core, "SDK.Core.csproj");
        CreateFile(core, "CoreClient.cs");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.DotNet, info.Language);
        Assert.Contains("SDK.Core", info.SourceFolder);
    }

    // Pattern 38: sdk/src/*.csproj
    // Examples: SDK subfolders
    [Fact]
    public void Pattern38_SdkSrcFolder()
    {
        var sdkSrc = CreatePath("sdk", "src");
        CreateFile(sdkSrc, "SDK.csproj");
        CreateFile(sdkSrc, "Client.cs");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.DotNet, info.Language);
        Assert.Equal(sdkSrc, info.SourceFolder);
    }

    // Pattern 39: src/ProjectName/src/*.cs (nested src)
    // Examples: Generated SDKs
    [Fact]
    public void Pattern39_NestedSrc()
    {
        var innerSrc = CreatePath("src", "SDK", "src");
        CreateFile(innerSrc, "SDK.csproj");
        CreateFile(innerSrc, "Client.cs");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.DotNet, info.Language);
    }

    // Pattern 40: net/src/*.csproj
    // Examples: Platform-specific SDKs
    [Fact]
    public void Pattern40_NetSubfolder()
    {
        var netSrc = CreatePath("net", "src");
        CreateFile(netSrc, "Platform.csproj");
        CreateFile(netSrc, "PlatformClient.cs");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.DotNet, info.Language);
        Assert.Equal(netSrc, info.SourceFolder);
    }

    // Pattern 41: src/ProjectName.Services/*.csproj
    // Examples: Service-based SDKs
    [Fact]
    public void Pattern41_ServicesSuffix()
    {
        var services = CreatePath("src", "SDK.Services");
        CreateFile(services, "SDK.Services.csproj");
        CreateFile(services, "ServiceClient.cs");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.DotNet, info.Language);
        Assert.Contains("SDK.Services", info.SourceFolder);
    }

    // Pattern 42: src/ProjectName with Handlers subfolder
    // Examples: Handler-based patterns
    [Fact]
    public void Pattern42_HandlersSubfolder()
    {
        var src = CreatePath("src", "SDK");
        CreateFile(src, "SDK.csproj");
        CreateFile(src, "Client.cs");
        var handlers = CreatePath(src, "Handlers");
        CreateFile(handlers, "MessageHandler.cs");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.DotNet, info.Language);
        Assert.Contains("SDK", info.SourceFolder);
    }

    // Pattern 43: src/ProjectName.Contracts/*.csproj
    // Examples: Contract/interface packages
    [Fact]
    public void Pattern43_ContractsSuffix()
    {
        var contracts = CreatePath("src", "SDK.Contracts");
        CreateFile(contracts, "SDK.Contracts.csproj");
        CreateFile(contracts, "IService.cs");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.DotNet, info.Language);
        Assert.Contains("SDK.Contracts", info.SourceFolder);
    }

    // Pattern 44: runtime/src/*.csproj
    // Examples: Runtime-focused projects
    [Fact]
    public void Pattern44_RuntimeSrcFolder()
    {
        var runtimeSrc = CreatePath("runtime", "src");
        CreateFile(runtimeSrc, "Runtime.csproj");
        CreateFile(runtimeSrc, "RuntimeClient.cs");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.DotNet, info.Language);
        Assert.Equal(runtimeSrc, info.SourceFolder);
    }

    // Pattern 45: src/ProjectName with Serialization subfolder
    // Examples: Serialization-heavy SDKs
    [Fact]
    public void Pattern45_SerializationSubfolder()
    {
        var src = CreatePath("src", "SDK");
        CreateFile(src, "SDK.csproj");
        CreateFile(src, "Client.cs");
        var serialization = CreatePath(src, "Serialization");
        CreateFile(serialization, "JsonConverter.cs");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.DotNet, info.Language);
        Assert.Contains("SDK", info.SourceFolder);
    }

    // Pattern 46: src/ProjectName.Json/*.csproj
    // Examples: JSON-focused packages
    [Fact]
    public void Pattern46_JsonSuffix()
    {
        var json = CreatePath("src", "SDK.Json");
        CreateFile(json, "SDK.Json.csproj");
        CreateFile(json, "JsonSerializer.cs");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.DotNet, info.Language);
        Assert.Contains("SDK.Json", info.SourceFolder);
    }

    // Pattern 47: connector/src/*.csproj
    // Examples: Connector SDKs
    [Fact]
    public void Pattern47_ConnectorSrcFolder()
    {
        var connectorSrc = CreatePath("connector", "src");
        CreateFile(connectorSrc, "Connector.csproj");
        CreateFile(connectorSrc, "ConnectorClient.cs");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.DotNet, info.Language);
        Assert.Equal(connectorSrc, info.SourceFolder);
    }

    // Pattern 48: src/ProjectName.Auth/*.csproj
    // Examples: Authentication-focused SDKs
    [Fact]
    public void Pattern48_AuthSuffix()
    {
        var auth = CreatePath("src", "SDK.Auth");
        CreateFile(auth, "SDK.Auth.csproj");
        CreateFile(auth, "AuthClient.cs");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.DotNet, info.Language);
        Assert.Contains("SDK.Auth", info.SourceFolder);
    }

    // Pattern 49: integration/src/*.csproj
    // Examples: Integration libraries
    [Fact]
    public void Pattern49_IntegrationSrcFolder()
    {
        var integrationSrc = CreatePath("integration", "src");
        CreateFile(integrationSrc, "Integration.csproj");
        CreateFile(integrationSrc, "IntegrationClient.cs");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.DotNet, info.Language);
        Assert.Equal(integrationSrc, info.SourceFolder);
    }

    // Pattern 50: src/ProjectName.Logging/*.csproj
    // Examples: Logging-focused SDKs
    [Fact]
    public void Pattern50_LoggingSuffix()
    {
        var logging = CreatePath("src", "SDK.Logging");
        CreateFile(logging, "SDK.Logging.csproj");
        CreateFile(logging, "LoggingClient.cs");

        var info = SdkInfo.Scan(_testRoot);

        Assert.Equal(SdkLanguage.DotNet, info.Language);
        Assert.Contains("SDK.Logging", info.SourceFolder);
    }
}

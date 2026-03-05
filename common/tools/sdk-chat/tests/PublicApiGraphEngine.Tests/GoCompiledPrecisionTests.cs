// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using PublicApiGraphEngine.Go;
using Xunit;

namespace PublicApiGraphEngine.Tests;

/// <summary>
/// Tests that REQUIRE compiled analysis to pass.
/// These document the gap between source-only parsing and compiled-artifact
/// analysis for Go's external dependency type resolution and method promotion.
///
/// The Go source parser (go/parser) is purely syntactic — it creates AST nodes
/// for external type references like httputil.RoundTripper but cannot:
/// 1. Classify them as interface vs struct (all go into Types[], not Structs/Interfaces)
/// 2. Enumerate promoted methods from embedded external types
/// 3. Determine interface satisfaction through structural typing
///
/// A compiled engine loading the package's export data would resolve all of these.
/// </summary>
public class GoCompiledPrecisionTests : IClassFixture<GoCompiledFixture>
{
    private readonly GoCompiledFixture _fixture;

    public GoCompiledPrecisionTests(GoCompiledFixture fixture)
    {
        _fixture = fixture;
    }

    private ApiIndex GetApi()
    {
        if (_fixture.SkipReason != null) Assert.Skip(_fixture.SkipReason);
        return _fixture.Api!;
    }

    /// <summary>
    /// The Go engine uses go/parser which is purely syntactic. When it encounters
    /// httputil.RoundTripper, httputil.TransportConfig, and httputil.Handler, it records
    /// the type references but has no way to classify them. All external types are placed
    /// in the dependency's Types[] (unclassified).
    ///
    /// A compiled engine would load the package's export data and correctly classify
    /// RoundTripper and Handler as interfaces, and TransportConfig as a struct.
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void CompiledEnrichment_Classifies_ExternalDependencyTypes()
    {
        var api = GetApi();

        var dep = api.Dependencies?.FirstOrDefault(d =>
            d.Package.Contains("httputil", StringComparison.OrdinalIgnoreCase));
        Assert.NotNull(dep);

        Assert.NotNull(dep.Interfaces);
        Assert.NotNull(dep.Structs);

        Assert.Contains(dep.Interfaces, i => i.Name == "RoundTripper");
        Assert.Contains(dep.Interfaces, i => i.Name == "Handler");
        Assert.Contains(dep.Structs, s => s.Name == "TransportConfig");
    }

    /// <summary>
    /// ServiceTransport embeds httputil.RoundTripper. In Go, embedding promotes
    /// the embedded type's methods to the outer struct. The source parser cannot
    /// enumerate RoundTripper's methods (it doesn't have the package source),
    /// so ServiceTransport appears to have no methods.
    ///
    /// A compiled engine loading httputil's export data would see RoundTripper's
    /// method set and promote those methods to ServiceTransport.
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void CompiledEnrichment_Enumerates_PromotedMethods_FromExternalEmbed()
    {
        var api = GetApi();
        var structs = api.Packages?.SelectMany(p => p.Structs ?? []).ToList();

        var transport = structs?.FirstOrDefault(s => s.Name == "ServiceTransport");
        Assert.NotNull(transport);

        // The struct records the embedded type
        Assert.NotNull(transport.Embeds);
        Assert.Contains(transport.Embeds, e =>
            e.Contains("RoundTripper", StringComparison.Ordinal));

        // Promoted methods from embedded external interfaces are materialized.
        var nonConstructorMethods = (transport.Methods ?? [])
            .Where(m => !m.Name.StartsWith("New", StringComparison.Ordinal))
            .ToList();
        Assert.NotEmpty(nonConstructorMethods);
        Assert.Contains(nonConstructorMethods, m => m.Name == "RoundTrip");
    }

    /// <summary>
    /// Client embeds *http.Client, which promotes all of http.Client's exported
    /// methods (Do, Get, Head, Post, PostForm, CloseIdleConnections) to Client.
    /// The source parser records the embedding but cannot enumerate the promoted
    /// methods because it doesn't type-check or load the net/http package.
    ///
    /// A compiled engine using go/types would resolve the full method set
    /// including promoted methods from the embedded stdlib type.
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void CompiledEnrichment_Resolves_PromotedMethods_FromStdlibEmbed()
    {
        var api = GetApi();
        var structs = api.Packages?.SelectMany(p => p.Structs ?? []).ToList();

        var client = structs?.FirstOrDefault(s => s.Name == "Client");
        Assert.NotNull(client);

        // Client has locally-defined methods
        var methods = client.Methods?.Select(m => m.Name).ToList() ?? [];
        Assert.Contains("GetResource", methods);
        Assert.Contains("ListResources", methods);

        // With go/types enrichment, embedded stdlib methods are materialized
        // into this struct's method list.
        Assert.Contains("Do", methods);
    }
}

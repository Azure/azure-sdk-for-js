// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using PublicApiGraphEngine.Java;
using Xunit;

namespace PublicApiGraphEngine.Tests;

/// <summary>
/// Tests that REQUIRE compiled analysis to pass.
/// These document the gap between source-only parsing and compiled-artifact
/// analysis for Java's external dependency type resolution.
///
/// The Java source parser (JavaParser) resolves type references via import
/// statements and can classify types seen in implements clauses as interfaces
/// and types seen in extends clauses as classes. Types that appear only in
/// parameter/return positions are left unresolved in the Types[] bucket.
/// Runtime metadata enrichment now classifies loadable external types and
/// exposes key kind metadata (interface/abstract/final/class).
///
/// A compiled engine using reflection or ASM on the dependency JARs would
/// resolve all of these.
/// </summary>
public class JavaCompiledPrecisionTests : IClassFixture<JavaCompiledFixture>
{
    private readonly JavaCompiledFixture _fixture;

    public JavaCompiledPrecisionTests(JavaCompiledFixture fixture)
    {
        _fixture = fixture;
    }

    private ApiIndex GetApi()
    {
        if (_fixture.SkipReason != null) Assert.Skip(_fixture.SkipReason);
        return _fixture.Api!;
    }

    /// <summary>
    /// HttpRequest and HttpResponse appear only as method parameter/return types.
    /// The Java source parser classifies types in implements clauses as interfaces,
    /// but types in parameter/return positions have no syntactic hint — the parser
    /// leaves them unresolved in the Types[] bucket.
    ///
    /// In the external package, HttpRequest and HttpResponse are interfaces
    /// (following Java's common HTTP abstraction pattern). A compiled engine
    /// using reflection would correctly classify them.
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void RuntimeMetadata_Resolves_ExternalParameterTypes()
    {
        var api = GetApi();

        var dep = api.Dependencies?.FirstOrDefault(d =>
            d.Package.Contains("java.net.http", StringComparison.OrdinalIgnoreCase));
        Assert.NotNull(dep);

        Assert.NotNull(dep.Classes);
        Assert.NotNull(dep.Interfaces);

        Assert.Contains(dep.Classes, t => t.Name == "HttpRequest");
        Assert.Contains(dep.Interfaces, t => t.Name == "HttpResponse");
    }

    /// <summary>
    /// ExtendedClient extends HttpClient from the external package.
    /// The source parser tracks the dependency and correctly puts HttpClient
    /// in Classes[] (since it appears in an extends clause), but creates a
    /// minimal entry without kind details or member information.
    ///
    /// A compiled engine using reflection or ASM would determine:
    /// - HttpClient is an abstract class (with abstract methods to override)
    /// - Its public method set (inherited by ExtendedClient)
    /// - Its generic type parameters and bounds (if any)
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public void RuntimeMetadata_Resolves_ExternalSuperclassDetails()
    {
        var api = GetApi();

        var dep = api.Dependencies?.FirstOrDefault(d =>
            d.Package.Contains("java.net.http", StringComparison.OrdinalIgnoreCase));
        Assert.NotNull(dep);

        // HttpClient should be tracked in the dependency
        Assert.NotNull(dep.Classes);
        var httpClient = dep.Classes.FirstOrDefault(c => c.Name == "HttpClient");
        Assert.NotNull(httpClient);

        // External superclass type is detected and kind metadata is resolved.
        Assert.NotNull(httpClient.Name);
        Assert.Equal("HttpClient", httpClient.Name);
        Assert.Equal("abstract", httpClient.Kind);
    }
}

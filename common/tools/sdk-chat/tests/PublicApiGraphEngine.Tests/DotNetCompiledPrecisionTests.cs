// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using PublicApiGraphEngine.DotNet;
using PublicApiGraphEngine.Contracts;
using Xunit;

namespace PublicApiGraphEngine.Tests;

/// <summary>
/// Tests that REQUIRE compiled-artifact analysis to pass.
/// These document the accuracy gap that compiled DLL engine will close.
/// When the compiled engine is implemented, update these to use it.
/// </summary>
public class DotNetCompiledPrecisionTests
{
    private static readonly string FixturePath =
        Path.Combine(AppContext.BaseDirectory, "TestFixtures", "CompiledMode", "DotNet");

    private readonly CSharpPublicApiGraphEngine _sourceEngine = new();

    [Fact]
    [Trait("Category", "CompiledOnly")]
    public async Task CompiledMode_DotNetProjectInput_ExtractsPublicTypes()
    {
        var csprojPath = Path.Combine(FixturePath, "TestPackage.csproj");
        Assert.True(File.Exists(csprojPath), $"Fixture csproj not found: {csprojPath}");

        var buildSucceeded = await BuildFixtureAsync(csprojPath);
        if (!buildSucceeded)
        {
            Assert.Skip("dotnet build failed for compiled fixture.");
        }

        var api = await _sourceEngine.GraphAsync(new EngineInput.DotNetProject(csprojPath));

        var types = api.Namespaces.SelectMany(n => n.Types).ToList();
        Assert.NotEmpty(types);
        Assert.Contains(types, t => t.Name == "JsonServiceClient");
        Assert.Contains(api.Diagnostics, d => d.Id == "ENGINE_INPUT" && d.Text.Contains("Using compiled artifacts", StringComparison.Ordinal));
    }

    /// <summary>
    /// JsonElement is a struct (System.ValueType) from System.Text.Json.
    /// The source engine cannot determine whether an external type is a struct vs class
    /// without loading the containing assembly's metadata. It can only see the type NAME
    /// in the source code.
    ///
    /// A compiled engine reads the TypeDef/TypeRef table and knows the exact
    /// type kind (struct, class, interface, enum, delegate).
    /// </summary>
    [Fact]
    [Trait("Category", "CompiledOnly")]
    public async Task SourceParser_CannotDetermine_ExternalTypeKind()
    {
        var api = await _sourceEngine.GraphAsync(FixturePath);
        var types = api.Namespaces.SelectMany(n => n.Types).ToList();

        var client = types.FirstOrDefault(t => t.Name == "JsonServiceClient");
        Assert.NotNull(client);

        var parseMethod = client.Members?.FirstOrDefault(m => m.Name == "ParseToElement");
        Assert.NotNull(parseMethod);
        Assert.NotNull(parseMethod.Signature);
        Assert.Contains("JsonElement", parseMethod.Signature);

        Assert.NotNull(api.Dependencies);
        var stjDep = api.Dependencies.FirstOrDefault(d =>
            d.Package.Contains("System.Text.Json", StringComparison.OrdinalIgnoreCase));
        Assert.NotNull(stjDep);
        Assert.NotNull(stjDep.Types);
        var jsonElementType = stjDep.Types.FirstOrDefault(t => t.Name == "JsonElement");
        Assert.NotNull(jsonElementType);
        Assert.Equal("struct", jsonElementType.Kind);
    }

    private static async Task<bool> BuildFixtureAsync(string csprojPath)
    {
        var psi = new System.Diagnostics.ProcessStartInfo
        {
            FileName = "dotnet",
            ArgumentList = { "build", csprojPath, "-nologo" },
            RedirectStandardOutput = true,
            RedirectStandardError = true,
            UseShellExecute = false,
            CreateNoWindow = true,
        };

        using var process = System.Diagnostics.Process.Start(psi);
        if (process is null)
        {
            return false;
        }

        await process.WaitForExitAsync();
        return process.ExitCode == 0;
    }
}

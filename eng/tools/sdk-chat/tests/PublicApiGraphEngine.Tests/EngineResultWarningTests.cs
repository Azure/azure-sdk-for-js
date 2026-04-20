// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using PublicApiGraphEngine.Contracts;
using PublicApiGraphEngine.Go;
using Xunit;

namespace PublicApiGraphEngine.Tests;

/// <summary>
/// Tests for EngineResult diagnostic propagation in IPublicApiGraphEngine implementations.
/// Validates that stderr output from external engines is surfaced as structured diagnostics.
/// </summary>
public class EngineResultWarningTests
{
    [Fact]
    public void CreateSuccess_WithDiagnostics_PreservesDiagnosticsList()
    {
        var index = new ApiIndex { Package = "test" };
        var diagnostics = new List<ApiDiagnostic>
        {
            new() { Id = "SDKWARN", Text = "deprecation warning: foo", Level = DiagnosticLevel.Warning },
            new() { Id = "SDKINFO", Text = "info: bar", Level = DiagnosticLevel.Info },
        };
        var result = EngineResult<ApiIndex>.CreateSuccess(index, diagnostics);

        Assert.True(result.IsSuccess);
        Assert.Equal(index, result.GetValueOrThrow());
        Assert.Equal(2, result.Diagnostics.Count);
        Assert.Contains(result.Diagnostics, d => d.Text == "deprecation warning: foo");
        Assert.Contains(result.Diagnostics, d => d.Text == "info: bar");
    }

    [Fact]
    public void CreateSuccess_WithNullDiagnostics_DefaultsToEmpty()
    {
        var index = new ApiIndex { Package = "test" };
        var result = EngineResult<ApiIndex>.CreateSuccess(index, null);

        Assert.True(result.IsSuccess);
        Assert.Empty(result.Diagnostics);
    }

    [Fact]
    public void CreateSuccess_WithoutDiagnostics_DefaultsToEmpty()
    {
        var index = new ApiIndex { Package = "test" };
        var result = EngineResult<ApiIndex>.CreateSuccess(index);

        Assert.True(result.IsSuccess);
        Assert.Empty(result.Diagnostics);
    }

    [Fact]
    public void CreateFailure_HasNoDiagnosticsByDefault()
    {
        var result = EngineResult<ApiIndex>.CreateFailure("error");

        Assert.False(result.IsSuccess);
        Assert.Empty(result.Diagnostics);
    }

    [Fact]
    public void ToBase_PreservesDiagnostics()
    {
        var index = new ApiIndex { Package = "test" };
        var diagnostics = new List<ApiDiagnostic>
        {
            new() { Id = "SDKWARN", Text = "warning 1", Level = DiagnosticLevel.Warning },
        };
        var result = EngineResult<ApiIndex>.CreateSuccess(index, diagnostics);

        var baseResult = result.ToBase();

        Assert.True(baseResult.IsSuccess);
        Assert.Single(baseResult.Diagnostics);
        Assert.Equal("warning 1", baseResult.Diagnostics[0].Text);
    }

    [Fact]
    public void ParseStderrWarnings_EmptyString_ReturnsEmpty()
    {
        var warnings = ParseStderrHelper("");
        Assert.Empty(warnings);
    }

    [Fact]
    public void ParseStderrWarnings_NullString_ReturnsEmpty()
    {
        var warnings = ParseStderrHelper(null);
        Assert.Empty(warnings);
    }

    [Fact]
    public void ParseStderrWarnings_MultiLine_SplitsIntoWarnings()
    {
        var stderr = "WARNING: deprecated API used\nINFO: fallback mode active\n";
        var warnings = ParseStderrHelper(stderr);

        Assert.Equal(2, warnings.Count);
        Assert.Equal("WARNING: deprecated API used", warnings[0]);
        Assert.Equal("INFO: fallback mode active", warnings[1]);
    }

    [Fact]
    public void TryParseStructuredDiagnostic_ValidJson_ReturnsDiagnostic()
    {
        var line = """{"code":"SELF_CONTAINMENT","message":"2 type(s) dangling","severity":"warning"}""";
        var diag = PublicApiGraphEngine.TypeScript.TypeScriptPublicApiGraphEngine.TryParseStructuredDiagnostic(line);

        Assert.NotNull(diag);
        Assert.Equal("SELF_CONTAINMENT", diag.Id);
        Assert.Equal("2 type(s) dangling", diag.Text);
        Assert.Equal(DiagnosticLevel.Warning, diag.Level);
        Assert.Null(diag.TargetType);
    }

    [Fact]
    public void TryParseStructuredDiagnostic_WithTarget_MapsToTargetType()
    {
        var line = """{"code":"UNRESOLVED_DEPENDENCY","target":"@azure/core","message":"not installed","severity":"warning"}""";
        var diag = PublicApiGraphEngine.TypeScript.TypeScriptPublicApiGraphEngine.TryParseStructuredDiagnostic(line);

        Assert.NotNull(diag);
        Assert.Equal("UNRESOLVED_DEPENDENCY", diag.Id);
        Assert.Equal("@azure/core", diag.TargetType);
        Assert.Equal("not installed", diag.Text);
    }

    [Fact]
    public void TryParseStructuredDiagnostic_SeverityInfo_MapsToInfo()
    {
        var line = """{"code":"SDK001","message":"note","severity":"info"}""";
        var diag = PublicApiGraphEngine.TypeScript.TypeScriptPublicApiGraphEngine.TryParseStructuredDiagnostic(line);

        Assert.NotNull(diag);
        Assert.Equal(DiagnosticLevel.Info, diag.Level);
    }

    [Fact]
    public void TryParseStructuredDiagnostic_SeverityError_MapsToError()
    {
        var line = """{"code":"SDK002","message":"fatal","severity":"error"}""";
        var diag = PublicApiGraphEngine.TypeScript.TypeScriptPublicApiGraphEngine.TryParseStructuredDiagnostic(line);

        Assert.NotNull(diag);
        Assert.Equal(DiagnosticLevel.Error, diag.Level);
    }

    [Fact]
    public void TryParseStructuredDiagnostic_PlainText_ReturnsNull()
    {
        var diag = PublicApiGraphEngine.TypeScript.TypeScriptPublicApiGraphEngine.TryParseStructuredDiagnostic("Some plain warning text");
        Assert.Null(diag);
    }

    [Fact]
    public void TryParseStructuredDiagnostic_InvalidJson_ReturnsNull()
    {
        var diag = PublicApiGraphEngine.TypeScript.TypeScriptPublicApiGraphEngine.TryParseStructuredDiagnostic("{bad json");
        Assert.Null(diag);
    }

    [Fact]
    public void TryParseStructuredDiagnostic_MissingCode_ReturnsNull()
    {
        var line = """{"message":"text","severity":"warning"}""";
        var diag = PublicApiGraphEngine.TypeScript.TypeScriptPublicApiGraphEngine.TryParseStructuredDiagnostic(line);
        Assert.Null(diag);
    }

    [Fact]
    public void TryParseStructuredDiagnostic_EmptyString_ReturnsNull()
    {
        var diag = PublicApiGraphEngine.TypeScript.TypeScriptPublicApiGraphEngine.TryParseStructuredDiagnostic("");
        Assert.Null(diag);
    }

    [Fact]
    public void ParseStderrWarnings_TrimsWhitespace()
    {
        var stderr = "  warning: spaces  \n  info: tabs  \n";
        var warnings = ParseStderrHelper(stderr);

        Assert.Equal(2, warnings.Count);
        Assert.Equal("warning: spaces", warnings[0]);
        Assert.Equal("info: tabs", warnings[1]);
    }

    [Fact]
    public void ParseStderrWarnings_SkipsEmptyLines()
    {
        var stderr = "warning: first\n\n\nwarning: second\n";
        var warnings = ParseStderrHelper(stderr);

        Assert.Equal(2, warnings.Count);
    }

    /// <summary>
    /// Helper that mirrors the ParseStderrWarnings logic used in engines.
    /// </summary>
    private static IReadOnlyList<string> ParseStderrHelper(string? stderr)
        => string.IsNullOrWhiteSpace(stderr)
            ? []
            : stderr.Split('\n', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);
}

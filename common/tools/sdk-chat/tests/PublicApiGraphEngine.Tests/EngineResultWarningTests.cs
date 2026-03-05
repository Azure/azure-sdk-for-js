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

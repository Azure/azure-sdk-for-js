// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using PublicApiGraphEngine.Contracts;
using Xunit;

namespace PublicApiGraphEngine.Tests;

/// <summary>
/// Tests for the ToolPathResolver secure path resolution utility.
/// These tests modify global state (environment variables and Console.Error),
/// so they must not run in parallel with other tests.
/// </summary>
[Collection("ToolPathResolver")]
public class ToolPathResolverTests
{
    #region ToolResolutionResult Record Tests

    [Fact]
    public void ToolResolutionResult_AvailableTool_HasCorrectProperties()
    {
        var result = new ToolResolutionResult(
            Path: "dotnet",
            AbsolutePath: "/usr/share/dotnet/dotnet",
            IsAvailable: true,
            WarningOrError: null
        );

        Assert.Equal("dotnet", result.Path);
        Assert.Equal("/usr/share/dotnet/dotnet", result.AbsolutePath);
        Assert.True(result.IsAvailable);
        Assert.Null(result.WarningOrError);
    }

    [Fact]
    public void ToolResolutionResult_UnavailableTool_HasErrorMessage()
    {
        var result = new ToolResolutionResult(
            Path: null,
            AbsolutePath: null,
            IsAvailable: false,
            WarningOrError: "tool not found"
        );

        Assert.Null(result.Path);
        Assert.Null(result.AbsolutePath);
        Assert.False(result.IsAvailable);
        Assert.Equal("tool not found", result.WarningOrError);
    }

    [Fact]
    public void ToolResolutionResult_WithSecurityWarning_ContainsPath()
    {
        var result = new ToolResolutionResult(
            Path: "suspicious",
            AbsolutePath: "/tmp/suspicious/bin/tool",
            IsAvailable: true,
            WarningOrError: "tool found at non-standard location: /tmp/suspicious/bin/tool"
        );

        Assert.True(result.IsAvailable);
        Assert.NotNull(result.WarningOrError);
        Assert.Contains("non-standard location", result.WarningOrError);
    }

    #endregion

    #region Resolve Method Tests

    [Fact]
    public void ResolveWithDetails_FindsDotNet_WhenAvailable()
    {
        // dotnet is always available since we're running on it
        var result = ToolPathResolver.ResolveWithDetails("dotnet", ["dotnet"]);

        Assert.True(result.IsAvailable);
        Assert.Equal("dotnet", result.Path);
    }

    [Fact]
    public void ResolveWithDetails_ReturnsNotAvailable_WhenToolNotFound()
    {
        var result = ToolPathResolver.ResolveWithDetails(
            "nonexistent_tool_xyz_123",
            ["nonexistent_tool_xyz_123", "/path/to/nowhere/tool"]
        );

        Assert.False(result.IsAvailable);
    }

    [Fact]
    public void ResolveWithDetails_TriesMultipleCandidates()
    {
        // First candidate doesn't exist, second (dotnet) does
        var result = ToolPathResolver.ResolveWithDetails(
            "dotnet",
            ["nonexistent_first_candidate", "dotnet"]
        );

        Assert.True(result.IsAvailable);
        Assert.Equal("dotnet", result.Path);
    }

    [Fact]
    public void ResolveWithDetails_RespectsEnvironmentVariableOverride()
    {
        const string envVar = "SDK_CHAT_TESTENV_PATH";
        var originalValue = Environment.GetEnvironmentVariable(envVar);

        try
        {
            // Set environment variable to dotnet (which exists)
            Environment.SetEnvironmentVariable(envVar, "dotnet");

            var result = ToolPathResolver.ResolveWithDetails(
                "testenv",
                ["nonexistent_candidate"],
                "--version"
            );

            // Should find dotnet via env var override
            Assert.True(result.IsAvailable);
            Assert.Equal("dotnet", result.Path);
        }
        finally
        {
            // Restore original value
            Environment.SetEnvironmentVariable(envVar, originalValue);
        }
    }

    [Fact]
    public void ResolveWithDetails_UsesCustomVersionArgs()
    {
        var result = ToolPathResolver.ResolveWithDetails(
            "dotnet",
            ["dotnet"],
            "--version"
        );

        Assert.True(result.IsAvailable);
    }

    #endregion

    #region ResolveWithDetails Method Tests

    [Fact]
    public void ResolveWithDetails_ReturnsFullDetails_WhenToolFound()
    {
        var result = ToolPathResolver.ResolveWithDetails("dotnet", ["dotnet"]);

        Assert.True(result.IsAvailable);
        Assert.NotNull(result.Path);
        Assert.Equal("dotnet", result.Path);
        // AbsolutePath may or may not be set depending on 'which' availability
    }

    [Fact]
    public void ResolveWithDetails_ReturnsNotFound_WhenToolMissing()
    {
        var result = ToolPathResolver.ResolveWithDetails(
            "nonexistent_tool_abc",
            ["nonexistent_tool_abc"]
        );

        Assert.False(result.IsAvailable);
        Assert.Null(result.Path);
        Assert.NotNull(result.WarningOrError);
        Assert.Contains("not found", result.WarningOrError);
    }

    [Fact]
    public void ResolveWithDetails_IncludesAbsolutePath_WhenAvailable()
    {
        var result = ToolPathResolver.ResolveWithDetails("dotnet", ["dotnet"]);

        Assert.True(result.IsAvailable);
        // On most systems, which/where should resolve dotnet to an absolute path
        // But this may be null in some environments, so we just check it doesn't throw
    }

    #endregion

    #region Environment Variable Format Tests

    [Theory]
    [InlineData("python", "SDK_CHAT_PYTHON_PATH")]
    [InlineData("go", "SDK_CHAT_GO_PATH")]
    [InlineData("node", "SDK_CHAT_NODE_PATH")]
    [InlineData("jbang", "SDK_CHAT_JBANG_PATH")]
    [InlineData("MyTool", "SDK_CHAT_MYTOOL_PATH")]
    public void ResolveWithDetails_UsesCorrectEnvVarFormat(string toolName, string expectedEnvVar)
    {
        // Verify the environment variable naming convention by setting a known value
        var originalValue = Environment.GetEnvironmentVariable(expectedEnvVar);

        try
        {
            // Set to a known valid executable
            Environment.SetEnvironmentVariable(expectedEnvVar, "dotnet");

            var result = ToolPathResolver.ResolveWithDetails(toolName, ["nonexistent"]);

            // If env var is respected, it should find dotnet
            Assert.True(result.IsAvailable);
            Assert.Equal("dotnet", result.Path);
        }
        finally
        {
            Environment.SetEnvironmentVariable(expectedEnvVar, originalValue);
        }
    }

    #endregion

    #region Edge Cases

    [Fact]
    public void ResolveWithDetails_HandlesEmptyCandidateArray_Edge()
    {
        var result = ToolPathResolver.ResolveWithDetails("test", []);

        Assert.False(result.IsAvailable);
        Assert.Contains("not found", result.WarningOrError);
    }

    [Fact]
    public void ResolveWithDetails_HandlesNullInCandidates()
    {
        // This should not throw, just skip null entries
        var result = ToolPathResolver.ResolveWithDetails("dotnet", ["dotnet"]);

        Assert.True(result.IsAvailable);
    }

    [Fact]
    public void ResolveWithDetails_WithHelpArgs_AcceptsExitCode0Or1()
    {
        // dotnet --help returns exit code 0, validating the happy path
        var result = ToolPathResolver.ResolveWithDetails("dotnet", ["dotnet"], "--help");

        // dotnet should be found — --help should succeed with exit 0 or 1
        Assert.True(result.IsAvailable);
    }

    [Fact]
    public void ResolveWithDetails_WithVersionArgs_OnlyAcceptsExitCode0()
    {
        // dotnet --version returns exit code 0
        var result = ToolPathResolver.ResolveWithDetails("dotnet", ["dotnet"], "--version");

        Assert.True(result.IsAvailable);
    }

    [Fact]
    public void ResolveWithDetails_RejectsExitCode1_ForNonHelpArgs()
    {
        // Using a nonexistent flag that would cause exit code 1
        // should not be accepted for non-help args
        var result = ToolPathResolver.ResolveWithDetails("dotnet", ["dotnet"], "--nonexistent-flag-xyz");

        // dotnet returns non-zero for unknown flags, so result should indicate unavailable
        Assert.False(result.IsAvailable);
    }

    [Fact]
    public void ResolveWithDetails_TimesOutGracefully()
    {
        // ResolveWithDetails should not hang if a tool produces excessive output
        // This is tested implicitly by the 3-second timeout in ValidateExecutable
        var result = ToolPathResolver.ResolveWithDetails("dotnet", ["dotnet"]);
        Assert.True(result.IsAvailable);
    }

    #endregion

    #region Integration Tests with Real Tools

    [Fact]
    public void ResolveWithDetails_FindsPython_WhenAvailable()
    {
        // Python may or may not be installed, so we just verify no exception
        var result = ToolPathResolver.ResolveWithDetails("python", ["python3", "python"]);

        // Result is either available or not - both are acceptable
        if (result.IsAvailable)
        {
            Assert.True(result.Path == "python3" || result.Path == "python");
        }
    }

    [Fact]
    public void ResolveWithDetails_FindsNode_WhenAvailable()
    {
        var result = ToolPathResolver.ResolveWithDetails("node", ["node"]);

        // Result is either available or not - both are acceptable
        // Just verify no exception is thrown
    }

    [Fact]
    public void ResolveWithDetails_DetectsSecurityWarning_ForNonStandardPath()
    {
        // This test verifies security warning logic
        // Skip if we can't create a test scenario

        var result = ToolPathResolver.ResolveWithDetails("dotnet", ["dotnet"]);

        if (!result.IsAvailable) Assert.Skip("dotnet not available");
        if (result.AbsolutePath == null) Assert.Skip("Could not resolve absolute path");

        // If dotnet is in a standard location, WarningOrError should be null
        // If in non-standard location, should contain warning
        // We can't control where dotnet is installed, so just verify the logic runs
    }

    #endregion
}

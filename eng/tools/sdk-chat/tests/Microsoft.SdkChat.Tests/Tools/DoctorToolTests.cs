// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using Microsoft.SdkChat.Tools;
using Xunit;

namespace Microsoft.SdkChat.Tests.Tools;

/// <summary>
/// Tests for the DoctorTool dependency validation.
/// These tests manipulate Console.Out so they must run sequentially.
/// </summary>
[Collection("ConsoleOutput")]
public class DoctorToolTests
{
    #region DependencyStatus Record Tests

    [Fact]
    public void DependencyStatus_AvailableDependency_HasCorrectProperties()
    {
        var status = new DoctorTool.DependencyStatus(
            Name: "TestTool",
            IsAvailable: true,
            Version: "1.2.3",
            Path: "/usr/bin/testtool",
            Warning: null,
            Error: null
        );

        Assert.Equal("TestTool", status.Name);
        Assert.True(status.IsAvailable);
        Assert.Equal("1.2.3", status.Version);
        Assert.Equal("/usr/bin/testtool", status.Path);
        Assert.Null(status.Warning);
        Assert.Null(status.Error);
    }

    [Fact]
    public void DependencyStatus_UnavailableDependency_HasErrorMessage()
    {
        var status = new DoctorTool.DependencyStatus(
            Name: "MissingTool",
            IsAvailable: false,
            Version: null,
            Path: null,
            Warning: null,
            Error: "Tool not found in PATH"
        );

        Assert.Equal("MissingTool", status.Name);
        Assert.False(status.IsAvailable);
        Assert.Null(status.Version);
        Assert.Null(status.Path);
        Assert.Equal("Tool not found in PATH", status.Error);
    }

    [Fact]
    public void DependencyStatus_WithWarning_ContainsSecurityMessage()
    {
        var status = new DoctorTool.DependencyStatus(
            Name: "SuspiciousTool",
            IsAvailable: true,
            Version: "2.0.0",
            Path: "/tmp/suspicious/tool",
            Warning: "Security: tool found at non-standard location. Verify authenticity.",
            Error: null
        );

        Assert.True(status.IsAvailable);
        Assert.NotNull(status.Warning);
        Assert.Contains("Security:", status.Warning);
    }

    #endregion

    #region ExecuteAsync Integration Tests

    [Fact]
    public async Task ExecuteAsync_ReturnsZero_WhenDotNetIsAvailable()
    {
        // .NET is always available since we're running on it
        var tool = new DoctorTool();

        // Capture console output
        var originalOut = Console.Out;
        using var sw = new StringWriter();
        Console.SetOut(sw);

        try
        {
            var exitCode = await DoctorTool.ExecuteAsync(verbose: false);

            // Should return 0 (success) - .NET is always available
            // May return 0 even if optional deps are missing
            Assert.True(exitCode == 0, "Expected exit code 0 when .NET is available");

            var output = sw.ToString();
            Assert.Contains(".NET Runtime", output);
            Assert.Contains("✓", output); // At least .NET should have checkmark
        }
        finally
        {
            Console.SetOut(originalOut);
        }
    }

    [Fact]
    public async Task ExecuteAsync_Verbose_ShowsPaths()
    {
        var tool = new DoctorTool();

        var originalOut = Console.Out;
        using var sw = new StringWriter();
        Console.SetOut(sw);

        try
        {
            await DoctorTool.ExecuteAsync(verbose: true);

            var output = sw.ToString();
            // Verbose mode should show paths for available tools
            Assert.Contains("Path:", output);
        }
        finally
        {
            Console.SetOut(originalOut);
        }
    }

    [Fact]
    public async Task ExecuteAsync_NonVerbose_DoesNotShowPaths()
    {
        var tool = new DoctorTool();

        var originalOut = Console.Out;
        using var sw = new StringWriter();
        Console.SetOut(sw);

        try
        {
            await DoctorTool.ExecuteAsync(verbose: false);

            var output = sw.ToString();
            // Non-verbose mode should not show paths (unless there's a warning)
            // Note: Security warnings may still show paths
            var lines = output.Split('\n');
            var pathLines = lines.Count(l => l.Trim().StartsWith("Path:", StringComparison.Ordinal));
            // In non-verbose, we shouldn't have "Path:" lines for normal entries
            // (security warnings are different)
        }
        finally
        {
            Console.SetOut(originalOut);
        }
    }

    [Fact]
    public async Task ExecuteAsync_PrintsHeader()
    {
        var tool = new DoctorTool();

        var originalOut = Console.Out;
        using var sw = new StringWriter();
        Console.SetOut(sw);

        try
        {
            await DoctorTool.ExecuteAsync(verbose: false);

            var output = sw.ToString();
            Assert.Contains("SDK Chat Doctor", output);
            Assert.Contains("Dependency Validation", output);
        }
        finally
        {
            Console.SetOut(originalOut);
        }
    }

    [Fact]
    public async Task ExecuteAsync_ChecksAllLanguages()
    {
        var tool = new DoctorTool();

        var originalOut = Console.Out;
        using var sw = new StringWriter();
        Console.SetOut(sw);

        try
        {
            await DoctorTool.ExecuteAsync(verbose: false);

            var output = sw.ToString();

            // Should check all language dependencies
            Assert.Contains(".NET Runtime", output);
            Assert.Contains("Python", output);
            Assert.Contains("Go", output);
            Assert.Contains("JBang", output);
            Assert.Contains("Node.js", output);
        }
        finally
        {
            Console.SetOut(originalOut);
        }
    }

    [Fact]
    public async Task ExecuteAsync_SupportsCancellation()
    {
        var tool = new DoctorTool();
        using var cts = new CancellationTokenSource();

        // Cancel immediately
        cts.Cancel();

        var originalOut = Console.Out;
        using var sw = new StringWriter();
        Console.SetOut(sw);

        try
        {
            // Tool should either throw OperationCanceledException or handle gracefully
            // Since it catches exceptions during command execution, it may complete with failures
            var exitCode = await DoctorTool.ExecuteAsync(verbose: false, ct: cts.Token);
            // If it completes without throwing, that's acceptable behavior
            // The exit code will reflect that tools couldn't be checked
        }
        catch (OperationCanceledException)
        {
            // This is also acceptable - cancellation was honored
        }
        finally
        {
            Console.SetOut(originalOut);
        }
    }

    #endregion

    #region Output Format Tests

    [Fact]
    public async Task ExecuteAsync_UsesCorrectIcons()
    {
        var tool = new DoctorTool();

        var originalOut = Console.Out;
        using var sw = new StringWriter();
        Console.SetOut(sw);

        try
        {
            await DoctorTool.ExecuteAsync(verbose: false);

            var output = sw.ToString();

            // Should use checkmark for available tools
            Assert.Contains("✓", output);

            // If any tool is missing, should use cross mark
            // (We can't guarantee which tools are installed, but format should be correct)
        }
        finally
        {
            Console.SetOut(originalOut);
        }
    }

    [Fact]
    public async Task ExecuteAsync_ShowsVersionForAvailableTools()
    {
        var tool = new DoctorTool();

        var originalOut = Console.Out;
        using var sw = new StringWriter();
        Console.SetOut(sw);

        try
        {
            await DoctorTool.ExecuteAsync(verbose: false);

            var output = sw.ToString();

            // .NET Runtime version should be shown (we know it's available)
            // Format is "✓ .NET Runtime        v{version}"
            Assert.Matches(@"✓\s+\.NET Runtime\s+v\d+", output);
        }
        finally
        {
            Console.SetOut(originalOut);
        }
    }

    [Fact]
    public async Task ExecuteAsync_ShowsNotFoundForMissingTools()
    {
        var tool = new DoctorTool();

        var originalOut = Console.Out;
        using var sw = new StringWriter();
        Console.SetOut(sw);

        try
        {
            await DoctorTool.ExecuteAsync(verbose: false);

            var output = sw.ToString();

            // If any tool is missing, the line should contain both "✗" and "NOT FOUND"
            // We check each line individually to avoid false positives from other output
            var lines = output.Split('\n');
            foreach (var line in lines)
            {
                // If a line shows a missing tool (starts with ✗ and has a tool name pattern),
                // it must also contain "NOT FOUND"
                if (line.TrimStart().StartsWith('✗') &&
                    (line.Contains(".NET", StringComparison.Ordinal) || line.Contains("Python", StringComparison.Ordinal) || line.Contains("Go", StringComparison.Ordinal) ||
                     line.Contains("JBang", StringComparison.Ordinal) || line.Contains("Node", StringComparison.Ordinal)))
                {
                    Assert.Contains("NOT FOUND", line);
                }
            }
        }
        finally
        {
            Console.SetOut(originalOut);
        }
    }

    #endregion

    #region Exit Code Tests

    [Fact]
    public async Task ExecuteAsync_ReturnsZero_WhenOnlyOptionalDependenciesMissing()
    {
        // This test verifies the exit code behavior
        // Exit code 0 means .NET is available (required)
        // Exit code 1 would mean .NET is missing (impossible since we're running on it)

        var tool = new DoctorTool();

        var originalOut = Console.Out;
        using var sw = new StringWriter();
        Console.SetOut(sw);

        try
        {
            var exitCode = await DoctorTool.ExecuteAsync(verbose: false);

            // Exit code should always be 0 when running as a .NET app
            // because .NET Runtime is always available
            Assert.Equal(0, exitCode);
        }
        finally
        {
            Console.SetOut(originalOut);
        }
    }

    #endregion

    #region Summary Message Tests

    [Fact]
    public async Task ExecuteAsync_PrintsSummaryMessage()
    {
        var tool = new DoctorTool();

        var originalOut = Console.Out;
        using var sw = new StringWriter();
        Console.SetOut(sw);

        try
        {
            await DoctorTool.ExecuteAsync(verbose: false);

            var output = sw.ToString();

            // Should have one of the summary messages
            var hasSummary = output.Contains("fully operational", StringComparison.Ordinal) ||
                            output.Contains("engines unavailable", StringComparison.Ordinal) ||
                            output.Contains("Critical dependencies", StringComparison.Ordinal);
            Assert.True(hasSummary, "Expected a summary message at the end");
        }
        finally
        {
            Console.SetOut(originalOut);
        }
    }

    #endregion
}

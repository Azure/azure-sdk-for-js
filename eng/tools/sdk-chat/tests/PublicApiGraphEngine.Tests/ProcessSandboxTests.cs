// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using PublicApiGraphEngine.Contracts;
using Xunit;

namespace PublicApiGraphEngine.Tests;

/// <summary>
/// Tests for <see cref="ProcessSandbox"/> cancellation, timeout, and truncation behavior.
/// </summary>
public class ProcessSandboxTests
{
    [Fact]
    public async Task ExecuteAsync_UserCancellation_PropagatesOperationCanceledException()
    {
        // Arrange: cancel immediately
        using var cts = new CancellationTokenSource();
        cts.Cancel();

        // Act & Assert: user cancellation must propagate as OperationCanceledException,
        // not be swallowed into a ProcessResult.Failed.
        await Assert.ThrowsAnyAsync<OperationCanceledException>(async () =>
        {
            await ProcessSandbox.ExecuteAsync(
                "sleep", ["10"],
                workingDirectory: Path.GetTempPath(),
                cancellationToken: cts.Token);
        });
    }

    [Fact]
    public async Task ExecuteAsync_Timeout_ReturnsTimedOutResult()
    {
        var result = await ProcessSandbox.ExecuteAsync(
            "sleep", ["60"],
            workingDirectory: Path.GetTempPath(),
            timeout: TimeSpan.FromMilliseconds(200));

        Assert.True(result.TimedOut, "Process should have timed out");
        Assert.NotEqual(0, result.ExitCode);
    }

    #region Truncation Detection

    [Fact]
    public void IsOutputTruncated_NullInput_ReturnsFalse()
    {
        Assert.False(ProcessSandbox.IsOutputTruncated(null));
    }

    [Fact]
    public void IsOutputTruncated_EmptyInput_ReturnsFalse()
    {
        Assert.False(ProcessSandbox.IsOutputTruncated(""));
    }

    [Fact]
    public void IsOutputTruncated_NormalOutput_ReturnsFalse()
    {
        Assert.False(ProcessSandbox.IsOutputTruncated("{\"modules\":[]}"));
    }

    [Fact]
    public void IsOutputTruncated_TruncatedOutput_ReturnsTrue()
    {
        var truncated = "{\"partial\":\"data\n[OUTPUT TRUNCATED - exceeded 10M char limit]";
        Assert.True(ProcessSandbox.IsOutputTruncated(truncated));
    }

    [Fact]
    public void IsOutputTruncated_MarkerInMiddle_ReturnsTrue()
    {
        // Edge case: marker could appear anywhere in the output
        var output = "some data [OUTPUT TRUNCATED - exceeded 5M char limit] more data";
        Assert.True(ProcessSandbox.IsOutputTruncated(output));
    }

    [Fact]
    public void ProcessResult_OutputTruncated_NormalOutput_ReturnsFalse()
    {
        var result = new ProcessResult(0, "{\"ok\":true}", "");
        Assert.False(result.OutputTruncated);
    }

    [Fact]
    public void ProcessResult_OutputTruncated_TruncatedOutput_ReturnsTrue()
    {
        var result = new ProcessResult(0, "{\"data\":\n[OUTPUT TRUNCATED - exceeded 10M char limit]", "");
        Assert.True(result.OutputTruncated);
    }

    [Fact]
    public void ProcessResult_OutputTruncated_FailedProcess_StillDetects()
    {
        var result = ProcessResult.Failed(1, "[OUTPUT TRUNCATED - exceeded 10M char limit]", "error");
        Assert.True(result.OutputTruncated);
    }

    [Fact]
    public async Task ExecuteAsync_StdinData_IsWrittenToProcess()
    {
        // Use 'cat' to echo stdin data back to stdout
        var result = await ProcessSandbox.ExecuteAsync(
            "cat", [],
            workingDirectory: Path.GetTempPath(),
            stdinData: "hello from stdin");

        Assert.True(result.Success);
        Assert.Equal("hello from stdin", result.StandardOutput);
    }

    [Fact]
    public async Task ExecuteAsync_NullStdinData_ClosesStdinImmediately()
    {
        // cat with no stdin should exit cleanly with empty output
        var result = await ProcessSandbox.ExecuteAsync(
            "cat", [],
            workingDirectory: Path.GetTempPath(),
            stdinData: null);

        Assert.True(result.Success);
        Assert.Equal("", result.StandardOutput);
    }

    #endregion
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using PublicApiGraphEngine.Contracts;
using Xunit;

namespace PublicApiGraphEngine.Tests;

/// <summary>
/// Tests for EngineTimeout configuration.
/// These tests modify environment variables, so they must not run in parallel.
/// </summary>
[Collection("EngineTimeout")]
public class EngineTimeoutTests : IDisposable
{
    private readonly string? _originalValue;

    public EngineTimeoutTests()
    {
        // Save original value
        _originalValue = Environment.GetEnvironmentVariable(EngineTimeout.EnvVarName);
        // Reset cache before each test
        EngineTimeout.Reset();
    }

    public void Dispose()
    {
        // Restore original value
        if (_originalValue != null)
        {
            Environment.SetEnvironmentVariable(EngineTimeout.EnvVarName, _originalValue);
        }
        else
        {
            Environment.SetEnvironmentVariable(EngineTimeout.EnvVarName, null);
        }
        // Reset cache after test
        EngineTimeout.Reset();
    }

    [Fact]
    public void DefaultTimeout_Is300Seconds()
    {
        // Clear any existing env var
        Environment.SetEnvironmentVariable(EngineTimeout.EnvVarName, null);
        EngineTimeout.Reset();

        Assert.Equal(TimeSpan.FromSeconds(300), EngineTimeout.Value);
    }

    [Fact]
    public void DefaultSeconds_Constant_Is300()
    {
        Assert.Equal(300, EngineTimeout.DefaultSeconds);
    }

    [Fact]
    public void EnvVarName_IsCorrect()
    {
        Assert.Equal("SDK_CHAT_ENGINE_TIMEOUT", EngineTimeout.EnvVarName);
    }

    [Theory]
    [InlineData("60", 60)]
    [InlineData("120", 120)]
    [InlineData("600", 600)]
    [InlineData("1", 1)]
    [InlineData("3600", 3600)]
    public void Value_ReadsFromEnvironmentVariable(string envValue, int expectedSeconds)
    {
        Environment.SetEnvironmentVariable(EngineTimeout.EnvVarName, envValue);
        EngineTimeout.Reset();

        Assert.Equal(TimeSpan.FromSeconds(expectedSeconds), EngineTimeout.Value);
    }

    [Theory]
    [InlineData("")]
    [InlineData("   ")]
    [InlineData("abc")]
    [InlineData("not-a-number")]
    [InlineData("-1")]
    [InlineData("0")]
    [InlineData("-100")]
    public void Value_FallsBackToDefault_WhenEnvVarInvalid(string invalidValue)
    {
        Environment.SetEnvironmentVariable(EngineTimeout.EnvVarName, invalidValue);
        EngineTimeout.Reset();

        Assert.Equal(TimeSpan.FromSeconds(EngineTimeout.DefaultSeconds), EngineTimeout.Value);
    }

    [Fact]
    public void Value_IsCached_OnSubsequentCalls()
    {
        Environment.SetEnvironmentVariable(EngineTimeout.EnvVarName, "120");
        EngineTimeout.Reset();

        var first = EngineTimeout.Value;

        // Change env var after first read
        Environment.SetEnvironmentVariable(EngineTimeout.EnvVarName, "999");

        var second = EngineTimeout.Value;

        // Should still be cached value
        Assert.Equal(first, second);
        Assert.Equal(TimeSpan.FromSeconds(120), second);
    }

    [Fact]
    public void Reset_ClearsCache_AllowsNewValueToBeRead()
    {
        Environment.SetEnvironmentVariable(EngineTimeout.EnvVarName, "100");
        EngineTimeout.Reset();
        var first = EngineTimeout.Value;

        Environment.SetEnvironmentVariable(EngineTimeout.EnvVarName, "200");
        EngineTimeout.Reset();
        var second = EngineTimeout.Value;

        Assert.Equal(TimeSpan.FromSeconds(100), first);
        Assert.Equal(TimeSpan.FromSeconds(200), second);
    }

    [Fact]
    public void Value_HandlesNullEnvironmentVariable()
    {
        Environment.SetEnvironmentVariable(EngineTimeout.EnvVarName, null);
        EngineTimeout.Reset();

        Assert.Equal(TimeSpan.FromSeconds(300), EngineTimeout.Value);
    }

    [Fact]
    public void Value_HandlesLargeValues()
    {
        // 1 hour
        Environment.SetEnvironmentVariable(EngineTimeout.EnvVarName, "3600");
        EngineTimeout.Reset();

        Assert.Equal(TimeSpan.FromHours(1), EngineTimeout.Value);
    }

    [Fact]
    public void Value_HandlesWhitespaceAroundNumber()
    {
        // int.TryParse handles leading/trailing whitespace
        Environment.SetEnvironmentVariable(EngineTimeout.EnvVarName, " 180 ");
        EngineTimeout.Reset();

        Assert.Equal(TimeSpan.FromSeconds(180), EngineTimeout.Value);
    }
}

/// <summary>
/// Collection definition for EngineTimeout tests.
/// Ensures tests don't run in parallel due to shared environment variable state.
/// </summary>
[CollectionDefinition("EngineTimeout")]
public class EngineTimeoutCollection : ICollectionFixture<EngineTimeoutFixture>
{
}

/// <summary>
/// Fixture for EngineTimeout tests - ensures clean state.
/// </summary>
public class EngineTimeoutFixture : IDisposable
{
    public void Dispose()
    {
        EngineTimeout.Reset();
    }
}

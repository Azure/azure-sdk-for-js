// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using PublicApiGraphEngine.Contracts;
using Xunit;

namespace PublicApiGraphEngine.Tests;

/// <summary>
/// Tests for DockerSandbox per-language image configuration.
/// These tests modify environment variables so they must not run in parallel.
/// </summary>
[Collection("DockerSandbox")]
public class DockerSandboxTests : IDisposable
{
    private readonly string? _originalPythonEnv;
    private readonly string? _originalGoEnv;
    private readonly string? _originalAllowAnyRegistry;

    public DockerSandboxTests()
    {
        _originalPythonEnv = Environment.GetEnvironmentVariable($"{DockerSandbox.ImageEnvVarPrefix}PYTHON");
        _originalGoEnv = Environment.GetEnvironmentVariable($"{DockerSandbox.ImageEnvVarPrefix}GO");
        _originalAllowAnyRegistry = Environment.GetEnvironmentVariable("SDK_CHAT_DOCKER_ALLOW_ANY_REGISTRY");
    }

    public void Dispose()
    {
        Environment.SetEnvironmentVariable($"{DockerSandbox.ImageEnvVarPrefix}PYTHON", _originalPythonEnv);
        Environment.SetEnvironmentVariable($"{DockerSandbox.ImageEnvVarPrefix}GO", _originalGoEnv);
        Environment.SetEnvironmentVariable("SDK_CHAT_DOCKER_ALLOW_ANY_REGISTRY", _originalAllowAnyRegistry);
    }

    #region Constants

    [Fact]
    public void ImageEnvVarPrefix_IsExpectedName()
    {
        Assert.Equal("SDK_CHAT_DOCKER_IMAGE_", DockerSandbox.ImageEnvVarPrefix);
    }

    #endregion

    #region GetImageName

    [Fact]
    public void GetImageName_ReturnsDefault_WhenEnvVarNotSet()
    {
        Environment.SetEnvironmentVariable($"{DockerSandbox.ImageEnvVarPrefix}PYTHON", null);

        Assert.Equal("public-api-graph-engine-python:latest", DockerSandbox.GetImageName("python"));
    }

    [Fact]
    public void GetImageName_ReturnsDefault_WhenEnvVarIsEmpty()
    {
        Environment.SetEnvironmentVariable($"{DockerSandbox.ImageEnvVarPrefix}GO", "");

        Assert.Equal("public-api-graph-engine-go:latest", DockerSandbox.GetImageName("go"));
    }

    [Fact]
    public void GetImageName_ReturnsOverride_WhenEnvVarIsSet()
    {
        Environment.SetEnvironmentVariable($"{DockerSandbox.ImageEnvVarPrefix}PYTHON", "mcr.microsoft.com/python-engine:v2");

        Assert.Equal("mcr.microsoft.com/python-engine:v2", DockerSandbox.GetImageName("python"));
    }

    [Theory]
    [InlineData("python", "public-api-graph-engine-python:latest")]
    [InlineData("go", "public-api-graph-engine-go:latest")]
    [InlineData("java", "public-api-graph-engine-java:latest")]
    [InlineData("typescript", "public-api-graph-engine-typescript:latest")]
    public void GetImageName_ReturnsCorrectDefault_PerLanguage(string language, string expected)
    {
        // Clear any env overrides
        Environment.SetEnvironmentVariable($"{DockerSandbox.ImageEnvVarPrefix}{language.ToUpperInvariant()}", null);

        Assert.Equal(expected, DockerSandbox.GetImageName(language));
    }

    [Fact]
    public void GetImageName_NormalizesLanguageCase()
    {
        Environment.SetEnvironmentVariable($"{DockerSandbox.ImageEnvVarPrefix}PYTHON", null);

        Assert.Equal("public-api-graph-engine-python:latest", DockerSandbox.GetImageName("Python"));
        Assert.Equal("public-api-graph-engine-python:latest", DockerSandbox.GetImageName("PYTHON"));
    }

    #endregion

    #region Image Source Validation

    [Theory]
    [InlineData("mcr.microsoft.com/sdk-chat/python:latest")]
    [InlineData("ghcr.io/microsoft/python-engine:v1")]
    [InlineData("ghcr.io/microsoft/public-api-graph-engine:latest")]
    [InlineData("public-api-graph-engine-python:latest")]
    public void ValidateImageSource_Allows_TrustedRegistries(string image)
    {
        Environment.SetEnvironmentVariable("SDK_CHAT_DOCKER_ALLOW_ANY_REGISTRY", null);

        // Should not throw
        DockerSandbox.ValidateImageSource(image);
    }

    [Theory]
    [InlineData("evil-registry.io/miner:latest")]
    [InlineData("docker.io/attacker/backdoor:v1")]
    [InlineData("my-registry/python-engine:v2")]
    public void ValidateImageSource_Rejects_UntrustedRegistries(string image)
    {
        Environment.SetEnvironmentVariable("SDK_CHAT_DOCKER_ALLOW_ANY_REGISTRY", null);

        var ex = Assert.Throws<InvalidOperationException>(() => DockerSandbox.ValidateImageSource(image));
        Assert.Contains("Untrusted Docker image source", ex.Message);
    }

    [Fact]
    public void ValidateImageSource_Allows_UntrustedWhenBypassed()
    {
        Environment.SetEnvironmentVariable("SDK_CHAT_DOCKER_ALLOW_ANY_REGISTRY", "true");

        // Should not throw even with untrusted registry
        DockerSandbox.ValidateImageSource("evil-registry.io/miner:latest");
    }

    [Fact]
    public void ValidateImageSource_BypassEmitsTraceWarning()
    {
        Environment.SetEnvironmentVariable("SDK_CHAT_DOCKER_ALLOW_ANY_REGISTRY", "true");

        // Capture trace output to verify warning is emitted
        using var traceListener = new TestTraceListener();
        System.Diagnostics.Trace.Listeners.Add(traceListener);
        try
        {
            DockerSandbox.ValidateImageSource("evil-registry.io/miner:latest");

            Assert.True(traceListener.Warnings.Count > 0, "Expected at least one trace warning when bypass is active");
            Assert.Contains(traceListener.Warnings, w =>
                w.Contains("SDK_CHAT_DOCKER_ALLOW_ANY_REGISTRY") &&
                w.Contains("evil-registry.io/miner:latest"));
        }
        finally
        {
            System.Diagnostics.Trace.Listeners.Remove(traceListener);
        }
    }

    [Fact]
    public void ValidateImageSource_NoWarning_WhenBypassNotActive()
    {
        Environment.SetEnvironmentVariable("SDK_CHAT_DOCKER_ALLOW_ANY_REGISTRY", null);

        using var traceListener = new TestTraceListener();
        System.Diagnostics.Trace.Listeners.Add(traceListener);
        try
        {
            // Trusted image — should not emit bypass warning
            DockerSandbox.ValidateImageSource("mcr.microsoft.com/sdk-chat/python:latest");

            Assert.DoesNotContain(traceListener.Warnings, w =>
                w.Contains("SDK_CHAT_DOCKER_ALLOW_ANY_REGISTRY"));
        }
        finally
        {
            System.Diagnostics.Trace.Listeners.Remove(traceListener);
        }
    }

    [Fact]
    public void GetImageName_Rejects_UntrustedOverride()
    {
        Environment.SetEnvironmentVariable("SDK_CHAT_DOCKER_ALLOW_ANY_REGISTRY", null);
        Environment.SetEnvironmentVariable($"{DockerSandbox.ImageEnvVarPrefix}PYTHON", "evil.io/miner:latest");

        Assert.Throws<InvalidOperationException>(() => DockerSandbox.GetImageName("python"));
    }

    #endregion
}

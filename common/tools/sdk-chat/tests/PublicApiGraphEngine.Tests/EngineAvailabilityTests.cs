// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using PublicApiGraphEngine.Contracts;
using Xunit;

namespace PublicApiGraphEngine.Tests;

/// <summary>
/// Tests for EngineAvailability and EngineAvailabilityResult.
/// These tests modify global static state (cache, environment variables)
/// so they must not run in parallel with other tests.
/// </summary>
[Collection("EngineAvailability")]
public class EngineAvailabilityTests : IDisposable
{
    public EngineAvailabilityTests()
    {
        EngineAvailability.ClearCache();
    }

    public void Dispose()
    {
        EngineAvailability.ClearCache();
    }

    #region EngineMode Enum

    [Fact]
    public void EngineMode_HasExpectedValues()
    {
        Assert.Equal(0, (int)EngineMode.Unavailable);
        Assert.Equal(1, (int)EngineMode.NativeBinary);
        Assert.Equal(2, (int)EngineMode.RuntimeInterpreter);
        Assert.Equal(3, (int)EngineMode.Docker);
    }

    #endregion

    #region EngineAvailabilityResult Factory Methods

    [Fact]
    public void Unavailable_SetsCorrectProperties()
    {
        var result = EngineAvailabilityResult.Unavailable("not found");

        Assert.False(result.IsAvailable);
        Assert.Equal(EngineMode.Unavailable, result.Mode);
        Assert.Null(result.ExecutablePath);
        Assert.Equal("not found", result.UnavailableReason);
        Assert.Null(result.Warning);
        Assert.Null(result.DockerImageName);
    }

    [Fact]
    public void NativeBinary_SetsCorrectProperties()
    {
        var result = EngineAvailabilityResult.NativeBinary("/app/go_engine");

        Assert.True(result.IsAvailable);
        Assert.Equal(EngineMode.NativeBinary, result.Mode);
        Assert.Equal("/app/go_engine", result.ExecutablePath);
        Assert.Null(result.UnavailableReason);
        Assert.Null(result.Warning);
        Assert.Null(result.DockerImageName);
    }

    [Fact]
    public void NativeBinary_WithWarning_SetsWarning()
    {
        var result = EngineAvailabilityResult.NativeBinary("/app/go_engine", "using fallback");

        Assert.True(result.IsAvailable);
        Assert.Equal(EngineMode.NativeBinary, result.Mode);
        Assert.Equal("/app/go_engine", result.ExecutablePath);
        Assert.Equal("using fallback", result.Warning);
    }

    [Fact]
    public void RuntimeInterpreter_SetsCorrectProperties()
    {
        var result = EngineAvailabilityResult.RuntimeInterpreter("/usr/bin/python3");

        Assert.True(result.IsAvailable);
        Assert.Equal(EngineMode.RuntimeInterpreter, result.Mode);
        Assert.Equal("/usr/bin/python3", result.ExecutablePath);
        Assert.Null(result.UnavailableReason);
        Assert.Null(result.Warning);
        Assert.Null(result.DockerImageName);
    }

    [Fact]
    public void RuntimeInterpreter_WithWarning_SetsWarning()
    {
        var result = EngineAvailabilityResult.RuntimeInterpreter("/usr/bin/python3", "old version");

        Assert.True(result.IsAvailable);
        Assert.Equal(EngineMode.RuntimeInterpreter, result.Mode);
        Assert.Equal("old version", result.Warning);
    }

    [Fact]
    public void Docker_SetsCorrectProperties()
    {
        var result = EngineAvailabilityResult.Docker("public-api-graph-engine-go:latest");

        Assert.True(result.IsAvailable);
        Assert.Equal(EngineMode.Docker, result.Mode);
        Assert.Null(result.ExecutablePath);
        Assert.Null(result.UnavailableReason);
        Assert.Null(result.Warning);
        Assert.Equal("public-api-graph-engine-go:latest", result.DockerImageName);
    }

    [Fact]
    public void Docker_WithCustomImage_UsesProvidedImage()
    {
        var result = EngineAvailabilityResult.Docker("myregistry/python-engine:v2");

        Assert.Equal("myregistry/python-engine:v2", result.DockerImageName);
    }

    #endregion

    #region EngineAvailabilityResult Record Equality

    [Fact]
    public void Result_RecordEquality_Works()
    {
        var a = EngineAvailabilityResult.Docker("public-api-graph-engine-go:latest");
        var b = EngineAvailabilityResult.Docker("public-api-graph-engine-go:latest");

        Assert.Equal(a, b);
    }

    [Fact]
    public void Result_RecordEquality_DifferentMode_NotEqual()
    {
        var a = EngineAvailabilityResult.NativeBinary("/app/go_engine");
        var b = EngineAvailabilityResult.RuntimeInterpreter("/app/go_engine");

        Assert.NotEqual(a, b);
    }

    #endregion

    #region Check Caching Behavior

    [Fact]
    public void Check_CachesResult_OnSecondCall()
    {
        // Use a made-up language/tool that definitely doesn't exist
        var result1 = EngineAvailability.Check(
            "nonexistent_test_lang",
            "nonexistent_test_binary",
            "nonexistent_test_runtime",
            []);

        var result2 = EngineAvailability.Check(
            "nonexistent_test_lang",
            "nonexistent_test_binary",
            "nonexistent_test_runtime",
            []);

        // Should get same reference (cached)
        Assert.Same(result1, result2);
    }

    [Fact]
    public void Check_ForceRecheck_BypassesCache()
    {
        var result1 = EngineAvailability.Check(
            "nonexistent_force_test",
            "nonexistent_binary",
            "nonexistent_runtime",
            []);

        var result2 = EngineAvailability.Check(
            "nonexistent_force_test",
            "nonexistent_binary",
            "nonexistent_runtime",
            [],
            forceRecheck: true);

        // Both should have the same mode (both fallthrough to Docker or both unavailable)
        Assert.Equal(result1.Mode, result2.Mode);
    }

    #endregion

    #region Check Fallback Behavior

    [Fact]
    public void Check_WithNonexistentNativeAndRuntime_FallsToDockerOrUnavailable()
    {
        var result = EngineAvailability.Check(
            "test_lang",
            "definitely_not_a_real_binary_xyz",
            "definitely_not_a_real_runtime_xyz",
            ["/nonexistent/path"]);

        // With Docker available, falls through to Docker mode; otherwise unavailable
        if (result.IsAvailable)
        {
            Assert.Equal(EngineMode.Docker, result.Mode);
            Assert.NotNull(result.DockerImageName);
            Assert.Null(result.UnavailableReason);
        }
        else
        {
            Assert.Equal(EngineMode.Unavailable, result.Mode);
            Assert.NotNull(result.UnavailableReason);
            Assert.Contains("test_lang", result.UnavailableReason);
        }
    }

    [Fact]
    public void Check_DockerFallback_UsesPerLanguageImage()
    {
        var result = EngineAvailability.Check(
            "go",
            "my_custom_engine_name",
            "nonexistent_go_runtime_xyz",
            []);

        if (result.Mode == EngineMode.Docker)
        {
            // Image should be the per-language default
            Assert.Equal("public-api-graph-engine-go:latest", result.DockerImageName);
        }
    }

    [Fact]
    public void Check_UnavailableResult_IncludesHelpfulMessage()
    {
        // Temporarily set Docker image to something that doesn't exist
        // to force unavailable state through all 3 tiers
        var envVar = $"{DockerSandbox.ImageEnvVarPrefix}PYTHON";
        var origImage = Environment.GetEnvironmentVariable(envVar);
        var origBypass = Environment.GetEnvironmentVariable("SDK_CHAT_DOCKER_ALLOW_ANY_REGISTRY");
        Environment.SetEnvironmentVariable("SDK_CHAT_DOCKER_ALLOW_ANY_REGISTRY", "true");
        Environment.SetEnvironmentVariable(envVar, "nonexistent_image_for_test:v999");
        EngineAvailability.ClearCache();

        try
        {
            var result = EngineAvailability.Check(
                "python",
                "nonexistent_python_engine",
                "nonexistent_python_runtime",
                []);

            // Even if Docker CLI exists, the image won't exist, so it should be unavailable
            // unless a real python runtime is found
            if (!result.IsAvailable)
            {
                Assert.Contains("nonexistent_python_runtime", result.UnavailableReason);
                Assert.Contains("python.org", result.UnavailableReason);
            }
        }
        finally
        {
            Environment.SetEnvironmentVariable(envVar, origImage);
            Environment.SetEnvironmentVariable("SDK_CHAT_DOCKER_ALLOW_ANY_REGISTRY", origBypass);
            EngineAvailability.ClearCache();
        }
    }

    #endregion
}

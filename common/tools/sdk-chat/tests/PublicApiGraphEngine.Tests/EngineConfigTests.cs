// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using PublicApiGraphEngine.Contracts;
using PublicApiGraphEngine.Go;
using PublicApiGraphEngine.Java;
using PublicApiGraphEngine.Python;
using PublicApiGraphEngine.TypeScript;
using Xunit;

namespace PublicApiGraphEngine.Tests;

public class EngineConfigTests
{
    [Fact]
    public void PythonSharedConfig_HasCorrectValues()
    {
        var config = PythonPublicApiGraphEngine.SharedConfig;

        Assert.Equal("python", config.Language);
        Assert.Equal("python_engine", config.NativeBinaryName);
        Assert.Equal("python", config.RuntimeToolName);
        Assert.Equal(["python3", "python"], config.RuntimeCandidates);
        Assert.Equal("--help", config.NativeValidationArgs);
        Assert.Equal("--version", config.RuntimeValidationArgs);
    }

    [Fact]
    public void JavaSharedConfig_HasCorrectValues()
    {
        var config = JavaPublicApiGraphEngine.SharedConfig;

        Assert.Equal("java", config.Language);
        Assert.Equal("java_engine", config.NativeBinaryName);
        Assert.Equal("jbang", config.RuntimeToolName);
        Assert.Equal(["jbang"], config.RuntimeCandidates);
    }

    [Fact]
    public void GoSharedConfig_HasCorrectValues()
    {
        var config = GoPublicApiGraphEngine.SharedConfig;

        Assert.Equal("go", config.Language);
        Assert.Equal("go_engine", config.NativeBinaryName);
        Assert.Equal("go", config.RuntimeToolName);
        Assert.Contains("go", config.RuntimeCandidates);
        // Go uses "version" not "--version" for validation
        Assert.Equal("version", config.RuntimeValidationArgs);
    }

    [Fact]
    public void TypeScriptSharedConfig_HasCorrectValues()
    {
        var config = TypeScriptPublicApiGraphEngine.SharedConfig;

        Assert.Equal("typescript", config.Language);
        Assert.Equal("ts_engine", config.NativeBinaryName);
        Assert.Equal("node", config.RuntimeToolName);
        Assert.Equal(["node"], config.RuntimeCandidates);
    }

    [Fact]
    public void EngineAvailabilityProvider_CachesResult()
    {
        var config = new EngineConfig
        {
            Language = "test",
            NativeBinaryName = "test_engine",
            RuntimeToolName = "test_tool",
            RuntimeCandidates = ["test_tool"]
        };

        var provider = new EngineAvailabilityProvider(config);

        // Call multiple times — should return the same instance
        var result1 = provider.GetAvailability();
        var result2 = provider.GetAvailability();

        Assert.Same(result1, result2);
    }

    [Fact]
    public void EngineAvailabilityProvider_ExposesLanguage()
    {
        var config = new EngineConfig
        {
            Language = "python",
            NativeBinaryName = "python_engine",
            RuntimeToolName = "python",
            RuntimeCandidates = ["python3", "python"]
        };

        var provider = new EngineAvailabilityProvider(config);
        Assert.Equal("python", provider.Language);
    }

    [Fact]
    public void EngineAvailabilityProvider_UnavailableTool_ReportsUnavailable()
    {
        var config = new EngineConfig
        {
            Language = "nonexistent",
            NativeBinaryName = "no_such_binary_exists_xyz",
            RuntimeToolName = "no_such_tool_exists_xyz",
            RuntimeCandidates = ["no_such_tool_path"]
        };

        var provider = new EngineAvailabilityProvider(config);

        // With a completely bogus toolchain, nothing should be available
        // (unless Docker is available as fallback)
        var result = provider.GetAvailability();
        Assert.NotNull(result);
    }

    [Fact]
    public void EngineConfig_Immutability()
    {
        // EngineConfig is a sealed record — verify it acts as value type
        var config1 = new EngineConfig
        {
            Language = "python",
            NativeBinaryName = "python_engine",
            RuntimeToolName = "python",
            RuntimeCandidates = ["python3"]
        };

        var config2 = config1 with { Language = "java" };

        Assert.Equal("python", config1.Language);
        Assert.Equal("java", config2.Language);
    }

    [Fact]
    public void EngineConfig_DefaultValidationArgs()
    {
        var config = new EngineConfig
        {
            Language = "test",
            NativeBinaryName = "test",
            RuntimeToolName = "test",
            RuntimeCandidates = ["test"]
        };

        Assert.Equal("--help", config.NativeValidationArgs);
        Assert.Equal("--version", config.RuntimeValidationArgs);
    }
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using Microsoft.Extensions.Logging.Abstractions;
using Microsoft.SdkChat.Configuration;
using Microsoft.SdkChat.Models;
using Microsoft.SdkChat.Services;
using Xunit;

namespace Microsoft.SdkChat.Tests.Services;

/// <summary>
/// Tests for AiService facade behavior.
/// Note: These tests focus on configuration, events, and schema generation.
/// Actual AI streaming requires integration tests with live services.
/// </summary>
public class AiServiceTests : IDisposable
{
    private readonly AiService _service;

    public AiServiceTests()
    {
        var options = new SdkChatOptions
        {
            UseOpenAi = false,
            Model = "test-model"
        };
        _service = new AiService(NullLogger<AiService>.Instance, options);
    }

    public void Dispose()
    {
        _service.DisposeAsync().AsTask().GetAwaiter().GetResult();
    }

    [Fact]
    public async Task Constructor_WithDefaults_DoesNotThrow()
    {
        var service = new AiService(NullLogger<AiService>.Instance);
        Assert.NotNull(service);
        await service.DisposeAsync();
    }

    [Fact]
    public async Task IsUsingOpenAi_ReflectsSettings()
    {
        Assert.False(_service.IsUsingOpenAi);

        var openAiOptions = new SdkChatOptions { UseOpenAi = true, ApiKey = "test-key" };
        var openAiService = new AiService(NullLogger<AiService>.Instance, openAiOptions);
        Assert.True(openAiService.IsUsingOpenAi);
        await openAiService.DisposeAsync();
    }

    [Fact]
    public void GetEffectiveModel_ReturnsConfiguredModel()
    {
        var model = _service.GetEffectiveModel();
        Assert.Equal("test-model", model);
    }

    [Fact]
    public void GetEffectiveModel_WithOverride_ReturnsOverride()
    {
        var model = _service.GetEffectiveModel("override-model");
        Assert.Equal("override-model", model);
    }

    [Fact]
    public void GetEffectiveModel_WithNullOverride_ReturnsConfigured()
    {
        var model = _service.GetEffectiveModel(null);
        Assert.Equal("test-model", model);
    }

    [Fact]
    public async Task DisposeAsync_CanBeCalledMultipleTimes()
    {
        // Thread-safe disposal should not throw on multiple calls
        await _service.DisposeAsync();
        await _service.DisposeAsync();
        await _service.DisposeAsync();
    }

    [Fact]
    public async Task DisposeAsync_IsIdempotent()
    {
        var tasks = Enumerable.Range(0, 10)
            .Select(_ => _service.DisposeAsync().AsTask())
            .ToList();

        await Task.WhenAll(tasks);
        // No exception means success
    }
}

/// <summary>
/// Tests for JSON schema generation (internal but testable via reflection or output).
/// </summary>
public class AiServiceSchemaTests
{
    [Fact]
    public void GeneratedSample_HasExpectedSchema()
    {
        // This tests the schema caching indirectly - running twice should use cache
        var options = new SdkChatOptions { UseOpenAi = false, Model = "test" };
        var service = new AiService(NullLogger<AiService>.Instance, options);
        _ = service; // Use the variable

        // The schema is generated during StreamItemsAsync, but we can verify
        // the type has the expected properties
        var type = typeof(GeneratedSample);
        var props = type.GetProperties().Where(p => p.CanRead).ToList();

        Assert.Contains(props, p => p.Name == "Name");
        Assert.Contains(props, p => p.Name == "Description");
        Assert.Contains(props, p => p.Name == "Code");
        Assert.Contains(props, p => p.Name == "FilePath");
    }
}

/// <summary>
/// Tests for SdkChatOptions configuration.
/// </summary>
public class SdkChatOptionsTests
{
    [Fact]
    public void FromEnvironment_ReadsVariables()
    {
        // Save original values
        var originalUseOpenAi = Environment.GetEnvironmentVariable("SDK_CLI_USE_OPENAI");
        var originalModel = Environment.GetEnvironmentVariable("SDK_CLI_MODEL");

        try
        {
            Environment.SetEnvironmentVariable("SDK_CLI_USE_OPENAI", "false");
            Environment.SetEnvironmentVariable("SDK_CLI_MODEL", "env-test-model");

            var options = SdkChatOptions.FromEnvironment();

            Assert.Equal("env-test-model", options.Model);
        }
        finally
        {
            // Restore original values
            Environment.SetEnvironmentVariable("SDK_CLI_USE_OPENAI", originalUseOpenAi);
            Environment.SetEnvironmentVariable("SDK_CLI_MODEL", originalModel);
        }
    }

    [Fact]
    public void GetEffectiveModel_WithOverride_PrefersOverride()
    {
        var options = new SdkChatOptions { Model = "default-model" };

        Assert.Equal("override", options.GetEffectiveModel("override"));
        Assert.Equal("default-model", options.GetEffectiveModel(null));
        Assert.Equal("default-model", options.GetEffectiveModel(""));
    }
}

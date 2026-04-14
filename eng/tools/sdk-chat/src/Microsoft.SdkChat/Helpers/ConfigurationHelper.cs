// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.Text.Json;
using Microsoft.SdkChat.Models;

namespace Microsoft.SdkChat.Helpers;

public class ConfigurationHelper
{
    private const string ConfigFileName = "sdk-chat-config.json";

    public static async Task<SdkChatConfig?> TryLoadConfigAsync(string packagePath, CancellationToken cancellationToken = default)
    {
        var configPath = Path.Combine(packagePath, ConfigFileName);

        if (!File.Exists(configPath))
            return null;

        var json = await File.ReadAllTextAsync(configPath, cancellationToken);
        // AOT-safe deserialization using source-generated context
        return JsonSerializer.Deserialize(json, SdkChatJsonContext.Default.SdkChatConfig);
    }

    public static async Task<SdkChatConfig> LoadConfigAsync(string packagePath, CancellationToken cancellationToken = default)
    {
        return await TryLoadConfigAsync(packagePath, cancellationToken) ?? new SdkChatConfig();
    }
}

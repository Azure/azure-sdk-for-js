// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using AgentClientProtocol.Sdk;
using AgentClientProtocol.Sdk.Stream;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.SdkChat.Configuration;
using Microsoft.SdkChat.Helpers;
using Microsoft.SdkChat.Services;

namespace Microsoft.SdkChat.Acp;

/// <summary>
/// Entry point that hosts the SampleGeneratorAgent over stdio using ACP protocol.
/// </summary>
public static class SampleGeneratorAgentHost
{
    public static async Task RunAsync(string logLevel, bool useOpenAi = false)
    {
        var services = ConfigureServices(logLevel, useOpenAi);
        var logger = services.GetRequiredService<ILogger<SampleGeneratorAgent>>();

        // Create the agent
        var options = services.GetRequiredService<SdkChatOptions>();
        var agent = new SampleGeneratorAgent(services, logger, options.MaxAcpSessions);

        // Create stdio transport using ACP SDK
        var reader = new StreamReader(Console.OpenStandardInput());
        var writer = new StreamWriter(Console.OpenStandardOutput()) { AutoFlush = true };
        var stream = new NdJsonStream(reader, writer);

        // Create agent-side connection and run
        var connection = new AgentSideConnection(agent, stream);
        agent.SetConnection(connection);

        logger.LogDebug("ACP agent starting on stdio");

        await connection.RunAsync();

        logger.LogDebug("ACP agent exited");
    }

    private static IServiceProvider ConfigureServices(string logLevel, bool useOpenAi)
    {
        var services = new ServiceCollection();

        var level = logLevel.ToLowerInvariant() switch
        {
            "debug" => LogLevel.Debug,
            "warning" => LogLevel.Warning,
            "error" => LogLevel.Error,
            _ => LogLevel.Information
        };

        services.AddLogging(b => b.AddConsole().SetMinimumLevel(level));
        var options = SdkChatOptions.FromEnvironment();
        if (useOpenAi) options.UseOpenAi = true;
        services.AddSingleton(options);
        services.AddSingleton<FileHelper>();
        services.AddSingleton<IPackageInfoService, PackageInfoService>();

        return services.BuildServiceProvider();
    }
}

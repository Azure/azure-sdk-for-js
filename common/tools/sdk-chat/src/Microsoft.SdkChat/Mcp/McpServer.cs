// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.Diagnostics.CodeAnalysis;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.SdkChat.Configuration;
using Microsoft.SdkChat.Helpers;
using Microsoft.SdkChat.Services;

namespace Microsoft.SdkChat.Mcp;

/// <summary>
/// MCP server implementation for AI agent integration.
/// Exposes sdk-chat tools to VS Code Copilot, Claude Desktop, etc.
/// </summary>
public static class McpServer
{
    /// <summary>
    /// Supported transport types for the MCP server.
    /// </summary>
    private static readonly HashSet<string> SupportedTransports = new(StringComparer.OrdinalIgnoreCase)
    {
        "stdio",
        "http"
    };

    [UnconditionalSuppressMessage("AOT", "IL2026:RequiresUnreferencedCode",
        Justification = "WithTools<T> is AOT-safe, but analyzer can't verify it")]
    [UnconditionalSuppressMessage("AOT", "IL3050:RequiresDynamicCode",
        Justification = "WithTools<T> is AOT-safe, but analyzer can't verify it")]
    public static async Task RunAsync(string transport, int port, string bind, string logLevel, bool useOpenAi = false, CancellationToken cancellationToken = default)
    {
        if (!SupportedTransports.Contains(transport))
        {
            throw new NotSupportedException(
                $"Transport '{transport}' is not supported. Supported transports: {string.Join(", ", SupportedTransports)}.");
        }

        if (transport.Equals("http", StringComparison.OrdinalIgnoreCase))
        {
            var builder = WebApplication.CreateBuilder();
            ConfigureLoggingAndServices(builder.Logging, builder.Services, logLevel, useOpenAi);

            // Use explicit tool registration for Native AOT compatibility
            builder.Services.AddMcpServer(options =>
            {
                options.ServerInfo = new() { Name = "sdk-chat", Version = "1.0.0" };
            })
            .WithHttpTransport()
            .WithTools<SourceMcpTools>()
            .WithTools<SamplesMcpTools>()
            .WithTools<ApiMcpTools>()
            .WithResources<SdkResources>();

            var app = builder.Build();

            // Configure endpoint - bind to the address specified by --bind.
            // Defaults to 127.0.0.1 (loopback) for security. Docker users should
            // pass --bind 0.0.0.0 to accept connections from outside the container.
            app.Urls.Clear();
            app.Urls.Add($"http://{bind}:{port}");

            app.MapMcp();
            await app.RunAsync(cancellationToken);
        }
        else // stdio transport
        {
            var builder = Host.CreateApplicationBuilder();
            ConfigureLoggingAndServices(builder.Logging, builder.Services, logLevel, useOpenAi);

            // Use explicit tool registration for Native AOT compatibility
            builder.Services.AddMcpServer(options =>
            {
                options.ServerInfo = new() { Name = "sdk-chat", Version = "1.0.0" };
            })
            .WithStdioServerTransport()
            .WithTools<SourceMcpTools>()
            .WithTools<SamplesMcpTools>()
            .WithTools<ApiMcpTools>()
            .WithResources<SdkResources>();

            var host = builder.Build();
            await host.RunAsync(cancellationToken);
        }
    }

    [UnconditionalSuppressMessage("AOT", "IL2026:RequiresUnreferencedCode",
        Justification = "ValidationContext uses reflection for DisplayNameAttribute; SdkChatOptions is a known type")]
    private static void ConfigureLoggingAndServices(ILoggingBuilder logging, IServiceCollection services, string logLevel, bool useOpenAi)
    {
        logging.AddConsole(options => options.LogToStandardErrorThreshold = LogLevel.Trace)
               .SetMinimumLevel(ParseLogLevel(logLevel));

        var options = SdkChatOptions.FromEnvironment();
        if (useOpenAi) options.UseOpenAi = true;

        var validationResults = options.Validate(new System.ComponentModel.DataAnnotations.ValidationContext(options) { DisplayName = nameof(SdkChatOptions) });
        var errors = validationResults.ToList();
        if (errors.Count > 0)
        {
            throw new InvalidOperationException(
                $"Configuration validation failed: {string.Join("; ", errors.Select(e => e.ErrorMessage))}");
        }

        services.AddSingleton(options);

        services.AddSingleton<ProcessSandboxService>();
        services.AddSingleton<AiDebugLogger>();
        services.AddSingleton<AiService>();
        services.AddSingleton<IAiService>(sp => sp.GetRequiredService<AiService>());
        services.AddSingleton<FileHelper>();
        services.AddSingleton<IPackageInfoService, PackageInfoService>();
    }

    private static LogLevel ParseLogLevel(string level) => level.ToLowerInvariant() switch
    {
        "debug" => LogLevel.Debug,
        "warning" => LogLevel.Warning,
        "error" => LogLevel.Error,
        _ => LogLevel.Information
    };
}

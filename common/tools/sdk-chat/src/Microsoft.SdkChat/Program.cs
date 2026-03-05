// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.CommandLine;
using Microsoft.SdkChat.Commands;
using Microsoft.SdkChat.Telemetry;

namespace Microsoft.SdkChat;

public static class Program
{
    public static async Task<int> Main(string[] args)
    {
        TelemetryConfiguration.Initialize();

        try
        {
            var rootCommand = new RootCommand("SDK Chat - Sample generation and SDK utilities")
            {
                new McpCommand(),
                new AcpCommand(),
                new PackageCommand(),
                new DoctorCommand()
            };

            return await rootCommand.Parse(args).InvokeAsync();
        }
        finally
        {
            TelemetryConfiguration.Shutdown();
        }
    }
}

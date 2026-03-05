// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.CommandLine;
using Microsoft.SdkChat.Helpers;
using Microsoft.SdkChat.Mcp;

namespace Microsoft.SdkChat.Commands;

public class McpCommand : Command
{
    public McpCommand() : base("mcp", "Start MCP server for AI agent integration")
    {
        var transport = new Option<string>("--transport") { Description = "Transport type (stdio, http)", DefaultValueFactory = _ => "stdio" };
        var port = new Option<int>("--port") { Description = "Port for Streamable HTTP transport", DefaultValueFactory = _ => 8080 };
        var bind = new Option<string>("--bind") { Description = "Bind address for HTTP transport (default: 127.0.0.1)", DefaultValueFactory = _ => "127.0.0.1" };
        var logLevel = new Option<string>("--log-level") { Description = "Log level", DefaultValueFactory = _ => "info" };
        var useOpenAi = new Option<bool>("--use-openai") { Description = "Use OpenAI-compatible API (requires OPENAI_API_KEY)" };
        var loadDotEnv = new Option<bool>("--load-dotenv") { Description = "Load .env file" };

        Add(transport);
        Add(port);
        Add(bind);
        Add(logLevel);
        Add(useOpenAi);
        Add(loadDotEnv);

        this.SetAction(async (ctx, ct) =>
        {
            if (ctx.GetValue(loadDotEnv)) DotEnv.TryLoadDefault();

            await McpServer.RunAsync(
                ctx.GetValue(transport)!,
                ctx.GetValue(port),
                ctx.GetValue(bind)!,
                ctx.GetValue(logLevel)!,
                ctx.GetValue(useOpenAi),
                ct
            );
        });
    }
}

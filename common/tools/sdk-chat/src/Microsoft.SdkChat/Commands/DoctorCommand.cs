// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.CommandLine;
using Microsoft.SdkChat.Tools;

namespace Microsoft.SdkChat.Commands;

public class DoctorCommand : Command
{
    public DoctorCommand() : base("doctor", "Validate external dependencies")
    {
        var verbose = new Option<bool>("--verbose", "-v") { Description = "Show detailed path information" };
        Add(verbose);

        this.SetAction(async (ctx, ct) =>
        {
            var isVerbose = ctx.GetValue(verbose);
            Environment.ExitCode = await DoctorTool.ExecuteAsync(isVerbose, ct);
        });
    }
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.CommandLine;

namespace Microsoft.SdkChat.Commands;

public class PackageCommand : Command
{
    public PackageCommand() : base("package", "SDK package operations")
    {
        Add(new SourceEntityCommand());
        Add(new SamplesEntityCommand());
        Add(new ApiEntityCommand());
    }
}

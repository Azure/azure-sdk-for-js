// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

namespace PublicApiGraphEngine.Contracts;

public enum DiagnosticLevel
{
    Info = 1,
    Warning = 2,
    Error = 3,
}

public sealed record ApiDiagnostic
{
    public required string Id { get; init; }
    public required string Text { get; init; }
    public required DiagnosticLevel Level { get; init; }
    public string? TargetType { get; init; }
    public string? TargetMember { get; init; }
    public string? HelpLink { get; init; }
}

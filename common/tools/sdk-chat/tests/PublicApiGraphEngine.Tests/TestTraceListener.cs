// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.Diagnostics;

namespace PublicApiGraphEngine.Tests;

/// <summary>
/// A <see cref="TraceListener"/> that captures warning messages for test assertions.
/// </summary>
internal sealed class TestTraceListener : TraceListener, IDisposable
{
    private readonly List<string> _warnings = [];

    public IReadOnlyList<string> Warnings => _warnings;

    public override void Write(string? message) { }

    public override void WriteLine(string? message) { }

    public override void TraceEvent(TraceEventCache? eventCache, string source, TraceEventType eventType, int id, string? message)
    {
        if (eventType == TraceEventType.Warning && message is not null)
        {
            _warnings.Add(message);
        }
    }

    public override void TraceEvent(TraceEventCache? eventCache, string source, TraceEventType eventType, int id, string? format, params object?[]? args)
    {
        if (eventType == TraceEventType.Warning && format is not null)
        {
            _warnings.Add(args is { Length: > 0 } ? string.Format(format, args) : format);
        }
    }
}

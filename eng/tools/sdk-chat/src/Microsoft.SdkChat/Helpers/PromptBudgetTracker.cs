// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

namespace Microsoft.SdkChat.Helpers;

/// <summary>Thread-safe character budget tracker for streaming prompts.</summary>
public sealed class PromptBudgetTracker
{
    private readonly int _total;
    private readonly int _reserved;
    private int _consumed;
    private readonly Lock _lock = new();

    public PromptBudgetTracker(int totalBudget, int reserved = 0)
    {
        ArgumentOutOfRangeException.ThrowIfNegativeOrZero(totalBudget);
        ArgumentOutOfRangeException.ThrowIfNegative(reserved);
        if (reserved >= totalBudget)
            throw new ArgumentException("Reserve must be less than total budget", nameof(reserved));

        _total = totalBudget;
        _reserved = reserved;
    }

    public int TotalBudget => _total;
    public int AvailableBudget => _total - _reserved;
    public int Consumed { get { lock (_lock) return _consumed; } }
    public int Remaining { get { lock (_lock) return Math.Max(0, AvailableBudget - _consumed); } }
    public bool IsExhausted { get { lock (_lock) return _consumed >= AvailableBudget; } }

    public int TryConsume(int chars)
    {
        if (chars <= 0) return 0;
        lock (_lock)
        {
            var remaining = AvailableBudget - _consumed;
            if (remaining <= 0) return 0;
            var actual = Math.Min(chars, remaining);
            _consumed += actual;
            return actual;
        }
    }

    public bool WouldFit(int chars)
    {
        if (chars <= 0) return true;
        lock (_lock) return chars <= AvailableBudget - _consumed;
    }

    public bool WouldFitWithBuffer(int chars, int buffer)
    {
        if (chars <= 0) return true;
        lock (_lock) return chars + buffer <= AvailableBudget - _consumed;
    }

    public string ConsumeWithTruncation(string content, out bool wasTruncated)
    {
        if (string.IsNullOrEmpty(content))
        {
            wasTruncated = false;
            return content;
        }

        lock (_lock)
        {
            var remaining = AvailableBudget - _consumed;
            if (remaining <= 0)
            {
                wasTruncated = true;
                return string.Empty;
            }

            if (content.Length <= remaining)
            {
                _consumed += content.Length;
                wasTruncated = false;
                return content;
            }

            _consumed += remaining;
            wasTruncated = true;
            return content[..remaining];
        }
    }

    public string GetSummary()
    {
        lock (_lock)
        {
            var pct = AvailableBudget > 0 ? 100.0 * _consumed / AvailableBudget : 100.0;
            return $"{_consumed:N0}/{AvailableBudget:N0} chars ({pct:F1}% used)";
        }
    }
}

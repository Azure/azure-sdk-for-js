// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using Microsoft.SdkChat.Helpers;
using Xunit;

namespace Microsoft.SdkChat.Tests.Helpers;

public class PromptBudgetTrackerTests
{
    [Fact]
    public void Constructor_ValidInputs_CreateTracker()
    {
        var tracker = new PromptBudgetTracker(1000, 100);

        Assert.Equal(1000, tracker.TotalBudget);
        Assert.Equal(900, tracker.AvailableBudget);
        Assert.Equal(900, tracker.Remaining);
        Assert.Equal(0, tracker.Consumed);
        Assert.False(tracker.IsExhausted);
    }

    [Fact]
    public void Constructor_ZeroBudget_Throws()
    {
        Assert.Throws<ArgumentOutOfRangeException>(() => new PromptBudgetTracker(0));
    }

    [Fact]
    public void Constructor_NegativeReserve_Throws()
    {
        Assert.Throws<ArgumentOutOfRangeException>(() => new PromptBudgetTracker(1000, -1));
    }

    [Fact]
    public void Constructor_ReserveExceedsBudget_Throws()
    {
        Assert.Throws<ArgumentException>(() => new PromptBudgetTracker(100, 100));
        Assert.Throws<ArgumentException>(() => new PromptBudgetTracker(100, 150));
    }

    [Fact]
    public void TryConsume_UnderBudget_ConsumesAll()
    {
        var tracker = new PromptBudgetTracker(1000);

        var consumed = tracker.TryConsume(500);

        Assert.Equal(500, consumed);
        Assert.Equal(500, tracker.Consumed);
        Assert.Equal(500, tracker.Remaining);
    }

    [Fact]
    public void TryConsume_ExactlyBudget_ExhaustsTracker()
    {
        var tracker = new PromptBudgetTracker(1000);

        var consumed = tracker.TryConsume(1000);

        Assert.Equal(1000, consumed);
        Assert.True(tracker.IsExhausted);
        Assert.Equal(0, tracker.Remaining);
    }

    [Fact]
    public void TryConsume_OverBudget_ReturnsPartial()
    {
        var tracker = new PromptBudgetTracker(1000);

        var consumed = tracker.TryConsume(1500);

        Assert.Equal(1000, consumed);
        Assert.True(tracker.IsExhausted);
        Assert.Equal(0, tracker.Remaining);
    }

    [Fact]
    public void TryConsume_MultipleCalls_TracksCumulatively()
    {
        var tracker = new PromptBudgetTracker(1000);

        tracker.TryConsume(300);
        tracker.TryConsume(400);
        var third = tracker.TryConsume(500);

        Assert.Equal(300, third); // Only 300 remaining
        Assert.True(tracker.IsExhausted);
    }

    [Fact]
    public void TryConsume_AfterExhausted_ReturnsZero()
    {
        var tracker = new PromptBudgetTracker(100);
        tracker.TryConsume(100);

        var consumed = tracker.TryConsume(50);

        Assert.Equal(0, consumed);
    }

    [Fact]
    public void TryConsume_ZeroOrNegative_ReturnsZero()
    {
        var tracker = new PromptBudgetTracker(1000);

        Assert.Equal(0, tracker.TryConsume(0));
        Assert.Equal(0, tracker.TryConsume(-10));
        Assert.Equal(0, tracker.Consumed);
    }

    [Fact]
    public void WouldFit_UnderBudget_ReturnsTrue()
    {
        var tracker = new PromptBudgetTracker(1000);
        tracker.TryConsume(500);

        Assert.True(tracker.WouldFit(499));
        Assert.True(tracker.WouldFit(500));
    }

    [Fact]
    public void WouldFit_OverBudget_ReturnsFalse()
    {
        var tracker = new PromptBudgetTracker(1000);
        tracker.TryConsume(500);

        Assert.False(tracker.WouldFit(501));
    }

    [Fact]
    public void WouldFitWithBuffer_ConsidersBuffer()
    {
        var tracker = new PromptBudgetTracker(1000);
        tracker.TryConsume(800);

        // 200 remaining, 100 buffer
        Assert.True(tracker.WouldFitWithBuffer(100, 100));
        Assert.False(tracker.WouldFitWithBuffer(101, 100));
    }

    [Fact]
    public void ConsumeWithTruncation_UnderBudget_ReturnsFullContent()
    {
        var tracker = new PromptBudgetTracker(1000);

        var result = tracker.ConsumeWithTruncation("Hello World", out var wasTruncated);

        Assert.Equal("Hello World", result);
        Assert.False(wasTruncated);
        Assert.Equal(11, tracker.Consumed);
    }

    [Fact]
    public void ConsumeWithTruncation_OverBudget_TruncatesContent()
    {
        var tracker = new PromptBudgetTracker(10);

        var result = tracker.ConsumeWithTruncation("Hello World - this is a long string", out var wasTruncated);

        Assert.Equal("Hello Worl", result);
        Assert.True(wasTruncated);
        Assert.Equal(10, tracker.Consumed);
    }

    [Fact]
    public void ConsumeWithTruncation_EmptyContent_ReturnsEmpty()
    {
        var tracker = new PromptBudgetTracker(1000);

        var result = tracker.ConsumeWithTruncation("", out var wasTruncated);

        Assert.Equal("", result);
        Assert.False(wasTruncated);
        Assert.Equal(0, tracker.Consumed);
    }

    [Fact]
    public void ConsumeWithTruncation_NullContent_ReturnsNull()
    {
        var tracker = new PromptBudgetTracker(1000);

        var result = tracker.ConsumeWithTruncation(null!, out var wasTruncated);

        Assert.Null(result);
        Assert.False(wasTruncated);
    }

    [Fact]
    public void ConsumeWithTruncation_Exhausted_ReturnsEmpty()
    {
        var tracker = new PromptBudgetTracker(100);
        tracker.TryConsume(100);

        var result = tracker.ConsumeWithTruncation("Some content", out var wasTruncated);

        Assert.Equal("", result);
        Assert.True(wasTruncated);
    }

    [Fact]
    public void GetSummary_ReturnsFormattedString()
    {
        var tracker = new PromptBudgetTracker(1000, 100);
        tracker.TryConsume(450);

        var summary = tracker.GetSummary();

        Assert.Contains("450", summary);
        Assert.Contains("900", summary);
        Assert.Contains("50.0%", summary);
    }

    [Fact]
    public void Reserve_ReducesAvailableBudget()
    {
        var tracker = new PromptBudgetTracker(1000, 200);

        Assert.Equal(800, tracker.AvailableBudget);
        Assert.Equal(800, tracker.Remaining);

        tracker.TryConsume(800);
        Assert.True(tracker.IsExhausted);
    }

    [Fact]
    public void ThreadSafety_ConcurrentConsumption_DoesNotExceedBudget()
    {
        var tracker = new PromptBudgetTracker(10000);
        var totalConsumed = 0;
        var iterations = 100;

        Parallel.For(0, iterations, _ =>
        {
            var consumed = tracker.TryConsume(200);
            Interlocked.Add(ref totalConsumed, consumed);
        });

        // Total consumed should equal budget (10000), not exceed it
        Assert.Equal(10000, totalConsumed);
        Assert.Equal(10000, tracker.Consumed);
        Assert.True(tracker.IsExhausted);
    }
}

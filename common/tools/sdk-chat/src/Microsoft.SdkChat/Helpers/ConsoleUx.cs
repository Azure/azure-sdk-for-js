// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

namespace Microsoft.SdkChat.Helpers;

/// <summary>Console UX: spinners, colors, progress.</summary>
public static class ConsoleUx
{
    private static readonly string[] SpinnerFrames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
    private static readonly Lock _lock = new();

    private static bool _supportsAnsi = !Console.IsOutputRedirected &&
        Environment.GetEnvironmentVariable("NO_COLOR") == null;

    public static string Dim(string text) => _supportsAnsi ? $"\x1b[90m{text}\x1b[0m" : text;
    public static string Green(string text) => _supportsAnsi ? $"\x1b[32m{text}\x1b[0m" : text;
    public static string Yellow(string text) => _supportsAnsi ? $"\x1b[33m{text}\x1b[0m" : text;
    public static string Cyan(string text) => _supportsAnsi ? $"\x1b[36m{text}\x1b[0m" : text;
    public static string Bold(string text) => _supportsAnsi ? $"\x1b[1m{text}\x1b[0m" : text;
    public static string Red(string text) => _supportsAnsi ? $"\x1b[31m{text}\x1b[0m" : text;

    public static async Task<T> SpinnerAsync<T>(string message, Func<Task<T>> action, CancellationToken ct = default)
    {
        var stopwatch = System.Diagnostics.Stopwatch.StartNew();

        if (!_supportsAnsi)
        {
            Console.WriteLine($"  {message}");
            try
            {
                var result = await action();
                stopwatch.Stop();
                Console.WriteLine($"  {Green("✓")} {message}{Dim($" ({FormatDuration(stopwatch.Elapsed)})")}");
                return result;
            }
            catch
            {
                stopwatch.Stop();
                Console.WriteLine($"  {Red("✗")} {message}{Dim($" ({FormatDuration(stopwatch.Elapsed)})")}");
                throw;
            }
        }

        var spinnerCts = CancellationTokenSource.CreateLinkedTokenSource(ct);
        var spinnerTask = RunSpinnerAsync(message, spinnerCts.Token);

        try
        {
            var result = await action();
            stopwatch.Stop();
            await spinnerCts.CancelAsync();
            await spinnerTask;
            ClearLine();
            Console.WriteLine($"  {Green("✓")} {message}{Dim($" ({FormatDuration(stopwatch.Elapsed)})")}");
            return result;
        }
        catch
        {
            stopwatch.Stop();
            await spinnerCts.CancelAsync();
            await spinnerTask;
            ClearLine();
            Console.WriteLine($"  {Red("✗")} {message}{Dim($" ({FormatDuration(stopwatch.Elapsed)})")}");
            throw;
        }
    }

    public static async Task SpinnerAsync(string message, Func<Task> action, CancellationToken ct = default)
    {
        await SpinnerAsync(message, async () => { await action(); return 0; }, ct);
    }

    public static StreamingProgress StartStreaming(string message)
    {
        return new StreamingProgress(message, _supportsAnsi);
    }

    public static void Success(string message) => Console.WriteLine($"  {Green("✓")} {message}");

    public static void Error(string message) => Console.WriteLine($"  {Red("✗")} {message}");

    public static void Info(string message) => Console.WriteLine($"  {Dim(message)}");

    public static void Header(string message) => Console.WriteLine($"\n{Bold(message)}");

    public static void TreeItem(string text, bool isLast = false)
    {
        var prefix = isLast ? "└" : "├";
        Console.WriteLine($"    {Dim(prefix)} {text}");
    }

    /// <summary>
    /// Writes a numbered item during streaming.
    /// </summary>
    public static void NumberedItem(int number, string text)
    {
        Console.WriteLine($"    {Dim($"[{number}]")} {Green("✓")} {text}");
    }

    private static async Task RunSpinnerAsync(string message, CancellationToken ct)
    {
        var frame = 0;
        try
        {
            while (!ct.IsCancellationRequested)
            {
                lock (_lock)
                {
                    ClearLine();
                    Console.Write($"  {Cyan(SpinnerFrames[frame])} {message}");
                }
                frame = (frame + 1) % SpinnerFrames.Length;
                await Task.Delay(80, ct);
            }
        }
        catch (OperationCanceledException) { }
    }

    private static void ClearLine()
    {
        if (_supportsAnsi)
        {
            Console.Write("\r\x1b[K");
        }
        else
        {
            Console.Write($"\r{new string(' ', Console.WindowWidth - 1)}\r");
        }
    }

    private static string FormatDuration(TimeSpan duration)
    {
        if (duration < TimeSpan.Zero) return "0ms";
        if (duration < TimeSpan.FromSeconds(1)) return $"{duration.TotalMilliseconds:F0}ms";
        return $"{duration.TotalSeconds:F1}s";
    }

    public class StreamingProgress : IDisposable, IAsyncDisposable
    {
        private readonly string _message;
        private readonly bool _supportsAnsi;
        private readonly CancellationTokenSource _cts = new();
        private readonly Task _spinnerTask;
        private int _count;
        private string? _lastQueuedItem;
        private readonly System.Collections.Concurrent.ConcurrentQueue<string> _pendingItems = new();

        internal StreamingProgress(string message, bool supportsAnsi)
        {
            _message = message;
            _supportsAnsi = supportsAnsi;

            if (_supportsAnsi)
            {
                _spinnerTask = RunAsync();
            }
            else
            {
                Console.WriteLine($"  {message}");
                _spinnerTask = Task.CompletedTask;
            }
        }

        /// <summary>
        /// Updates the progress with a new item.
        /// </summary>
        public void Update(string item)
        {
            Interlocked.Increment(ref _count);

            // Queue the item for printing. This avoids losing updates when the operation
            // completes before the next spinner tick, and also allows printing in
            // non-ANSI mode.
            if (!string.Equals(item, _lastQueuedItem, StringComparison.Ordinal))
            {
                _lastQueuedItem = item;
                _pendingItems.Enqueue(item);
            }
        }

        /// <summary>
        /// Gets the current count.
        /// </summary>
        public int Count => _count;

        private async Task RunAsync()
        {
            var frame = 0;
            try
            {
                while (!_cts.IsCancellationRequested)
                {
                    var countStr = _count > 0 ? $" ({_count})" : "";

                    lock (_lock)
                    {
                        while (_pendingItems.TryDequeue(out var nextItem))
                        {
                            ClearLine();
                            Console.WriteLine($"    {Dim("→")} {nextItem}");
                        }

                        ClearLine();
                        Console.Write($"  {Cyan(SpinnerFrames[frame])} {_message}{Dim(countStr)}");
                    }
                    frame = (frame + 1) % SpinnerFrames.Length;
                    await Task.Delay(80, _cts.Token);
                }
            }
            catch (OperationCanceledException) { }
        }

        /// <summary>
        /// Completes the progress with success (async).
        /// </summary>
        public async ValueTask CompleteAsync(string? summary = null)
        {
            await _cts.CancelAsync();
            try { await _spinnerTask.WaitAsync(TimeSpan.FromMilliseconds(100)); } catch { }

            FinishWithSuccess(summary);
        }

        /// <summary>
        /// Completes the progress with success (sync - for event handlers).
        /// Uses fire-and-forget cancellation, safe for console UI.
        /// </summary>
        public void Complete(string? summary = null)
        {
            // Fire-and-forget the async cancellation - safe for UI operations
            _ = _cts.CancelAsync();
            // Give the spinner a moment to stop, but don't block
            Thread.Sleep(10);

            FinishWithSuccess(summary);
        }

        private void FinishWithSuccess(string? summary)
        {
            if (_supportsAnsi) ClearLine();

            lock (_lock)
            {
                while (_pendingItems.TryDequeue(out var nextItem))
                {
                    Console.WriteLine($"    {Dim("→")} {nextItem}");
                }
            }

            var text = summary ?? $"{_message} ({_count})";
            Console.WriteLine($"  {Green("✓")} {text}");
        }

        /// <summary>
        /// Completes the progress with failure (async).
        /// </summary>
        public async ValueTask FailAsync(string? message = null)
        {
            await _cts.CancelAsync();
            try { await _spinnerTask.WaitAsync(TimeSpan.FromMilliseconds(100)); } catch { }

            FinishWithFailure(message);
        }

        /// <summary>
        /// Completes the progress with failure (sync - for event handlers).
        /// Uses fire-and-forget cancellation, safe for console UI.
        /// </summary>
        public void Fail(string? message = null)
        {
            // Fire-and-forget the async cancellation - safe for UI operations
            _ = _cts.CancelAsync();
            // Give the spinner a moment to stop, but don't block
            Thread.Sleep(10);

            FinishWithFailure(message);
        }

        private void FinishWithFailure(string? message)
        {
            if (_supportsAnsi) ClearLine();

            lock (_lock)
            {
                while (_pendingItems.TryDequeue(out var nextItem))
                {
                    Console.WriteLine($"    {Dim("→")} {nextItem}");
                }
            }
            Console.WriteLine($"  {Red("✗")} {message ?? _message}");
        }

        /// <summary>
        /// Disposes the progress (sync - for event handlers).
        /// </summary>
        public void Dispose()
        {
            GC.SuppressFinalize(this);
            _ = _cts.CancelAsync();
            _cts.Dispose();
        }

        public async ValueTask DisposeAsync()
        {
            GC.SuppressFinalize(this);
            await _cts.CancelAsync();
            _cts.Dispose();
        }
    }
}

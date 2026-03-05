// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.Text;

namespace PublicApiGraphEngine.Contracts;

/// <summary>
/// Shared scaffolding for coverage-aware formatting.
/// All five language formatters emit identical covered/uncovered summaries,
/// differing only in the comment prefix (<c>#</c> for Python, <c>//</c> for the rest).
/// This helper eliminates that duplication.
/// </summary>
public static class CoverageFormatter
{
    /// <summary>
    /// Appends the "ALREADY COVERED" summary section and builds the uncovered-by-client dictionary.
    /// Returns <c>null</c> if all operations are covered (and appends the "all covered" message).
    /// </summary>
    /// <param name="sb">The <see cref="StringBuilder"/> to append to.</param>
    /// <param name="coverage">The usage coverage index.</param>
    /// <param name="commentPrefix">Language comment prefix, e.g. <c>//</c> or <c>#</c>.</param>
    /// <returns>
    /// A dictionary mapping client type names to their uncovered operation names,
    /// or <c>null</c> if there are no uncovered operations.
    /// </returns>
    public static Dictionary<string, HashSet<string>>? AppendCoverageSummary(
        StringBuilder sb,
        UsageIndex coverage,
        string commentPrefix = "//")
    {
        // Section 1: Compact summary of what's already covered
        // Manual dictionary-based grouping avoids LINQ GroupBy/Distinct/ToList allocations
        var coveredByClient = new Dictionary<string, List<string>>();
        foreach (var op in coverage.CoveredOperations)
        {
            if (!coveredByClient.TryGetValue(op.ClientType, out var ops))
            {
                ops = [];
                coveredByClient[op.ClientType] = ops;
            }
            if (!ops.Contains(op.Operation))
                ops.Add(op.Operation);
        }

        if (coveredByClient.Count > 0)
        {
            var totalCovered = coverage.CoveredOperations.Count;
            sb.AppendLine($"{commentPrefix} ALREADY COVERED ({totalCovered} calls across {coverage.FileCount} files) - DO NOT DUPLICATE:");
            foreach (var (client, ops) in coveredByClient.OrderBy(kv => kv.Key))
            {
                sb.AppendLine($"{commentPrefix}   {client}: {string.Join(", ", ops.Take(10))}{(ops.Count > 10 ? $" (+{ops.Count - 10} more)" : "")}");
            }
            sb.AppendLine();
        }

        // Section 2: Build uncovered-by-client dictionary
        var uncoveredByClient = new Dictionary<string, HashSet<string>>();
        foreach (var op in coverage.UncoveredOperations)
        {
            if (!uncoveredByClient.TryGetValue(op.ClientType, out var ops))
            {
                ops = [];
                uncoveredByClient[op.ClientType] = ops;
            }
            ops.Add(op.Operation);
        }

        if (uncoveredByClient.Count is 0)
        {
            sb.AppendLine($"{commentPrefix} All operations are covered in existing samples.");
            return null;
        }

        sb.AppendLine($"{commentPrefix} UNCOVERED API ({coverage.UncoveredOperations.Count} operations) - Generate samples for these:");
        sb.AppendLine();

        return uncoveredByClient;
    }
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.Text;

namespace PublicApiGraphEngine.Contracts;

/// <summary>
/// Shared formatter for <see cref="UsageIndex"/> across all language analyzers.
/// Eliminates per-language duplication of the identical Format implementation.
/// </summary>
public static class UsageFormatter
{
    /// <summary>
    /// Formats a usage index as a compact summary for LLM context.
    /// </summary>
    public static string Format(UsageIndex index)
    {
        var sb = new StringBuilder(256 + (index.CoveredOperations.Count + index.UncoveredOperations.Count) * 80);

        sb.AppendLine($"Analyzed {index.FileCount} files.");
        sb.AppendLine();

        if (index.CoveredOperations.Count > 0)
        {
            sb.AppendLine("COVERED OPERATIONS (already have examples):");
            foreach (var op in index.CoveredOperations.OrderBy(o => o.ClientType).ThenBy(o => o.Operation))
            {
                sb.AppendLine($"  - {op.ClientType}.{op.Operation} ({op.File}:{op.Line})");
            }
            sb.AppendLine();
        }

        if (index.UncoveredOperations.Count > 0)
        {
            sb.AppendLine("UNCOVERED OPERATIONS (need examples):");
            foreach (var op in index.UncoveredOperations.OrderBy(o => o.ClientType).ThenBy(o => o.Operation))
            {
                sb.AppendLine($"  - {op.ClientType}.{op.Operation}: {op.Signature}");
            }
            sb.AppendLine();
        }

        return sb.ToString();
    }
}

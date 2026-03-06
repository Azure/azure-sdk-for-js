// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.Text;

namespace PublicApiGraphEngine.Contracts;

/// <summary>API surface size and quality metrics for a package.</summary>
public sealed record ApiMetrics
{
    public int TotalTypes { get; init; }
    public int TotalCallables { get; init; }
    public int TotalProperties { get; init; }
    public double AverageCallablesPerType { get; init; }
    public double AveragePropertiesPerType { get; init; }
    public int MaxParameterCount { get; init; }
    public string? MaxParameterMethod { get; init; }
    public int DocumentedTypes { get; init; }
    public int UndocumentedTypes { get; init; }
    public double DocumentationCoverage { get; init; }
    public int DeprecatedMembers { get; init; }
    public int TotalOverloads { get; init; }
}

/// <summary>Computes and formats <see cref="ApiMetrics"/> from an API index.</summary>
public static class ApiMetricsAnalyzer
{
    /// <summary>Computes metrics from the given API index.</summary>
    public static ApiMetrics Compute(IApiIndex index)
    {
        var types = index.GetDiagnosticTypes().ToList();
        var totalTypes = types.Count;

        var totalCallables = 0;
        var totalProperties = 0;
        var documentedTypes = 0;
        var deprecatedMembers = 0;
        var totalOverloads = 0;
        var maxParams = 0;
        string? maxParamMethod = null;

        foreach (var type in types)
        {
            if (!string.IsNullOrWhiteSpace(type.Doc))
                documentedTypes++;

            var callables = type.Callables;
            totalCallables += callables.Count;
            totalProperties += type.Properties.Count;

            foreach (var callable in callables)
            {
                if (callable.IsDeprecated)
                    deprecatedMembers++;

                var paramCount = callable.ParameterTypes.Count;
                if (paramCount > maxParams)
                {
                    maxParams = paramCount;
                    maxParamMethod = callable.Name;
                }
            }

            foreach (var prop in type.Properties)
            {
                if (prop.IsDeprecated)
                    deprecatedMembers++;
            }

            // Count overloads: methods that share a name within a type
            var overloadedNames = callables
                .GroupBy(c => c.Name, StringComparer.Ordinal)
                .Where(g => g.Count() > 1)
                .Sum(g => g.Count());
            totalOverloads += overloadedNames;
        }

        var undocumentedTypes = totalTypes - documentedTypes;
        var docCoverage = totalTypes > 0 ? (double)documentedTypes / totalTypes * 100.0 : 0.0;
        var avgCallables = totalTypes > 0 ? (double)totalCallables / totalTypes : 0.0;
        var avgProperties = totalTypes > 0 ? (double)totalProperties / totalTypes : 0.0;

        return new ApiMetrics
        {
            TotalTypes = totalTypes,
            TotalCallables = totalCallables,
            TotalProperties = totalProperties,
            AverageCallablesPerType = Math.Round(avgCallables, 1),
            AveragePropertiesPerType = Math.Round(avgProperties, 1),
            MaxParameterCount = maxParams,
            MaxParameterMethod = maxParamMethod,
            DocumentedTypes = documentedTypes,
            UndocumentedTypes = undocumentedTypes,
            DocumentationCoverage = Math.Round(docCoverage, 1),
            DeprecatedMembers = deprecatedMembers,
            TotalOverloads = totalOverloads,
        };
    }

    /// <summary>Formats metrics as a bordered CLI table.</summary>
    public static string FormatTable(ApiMetrics m)
    {
        // Build rows as (label, value) pairs, then size the box to fit.
        var rows = new List<(string Label, string Value)>
        {
            ("Total Types",          m.TotalTypes.ToString()),
            ("Total Methods",        m.TotalCallables.ToString()),
            ("Total Properties",     m.TotalProperties.ToString()),
            ("Avg Methods/Type",     m.AverageCallablesPerType.ToString("G4")),
            ("Avg Properties/Type",  m.AveragePropertiesPerType.ToString("G4")),
            ("Max Parameters",       m.MaxParameterCount.ToString()),
        };

        if (m.MaxParameterMethod is not null)
            rows.Add(($"  └─ {m.MaxParameterMethod}()", ""));

        rows.Add(("Doc Coverage",       $"{m.DocumentationCoverage:F1}%"));
        rows.Add(("Documented Types",   m.DocumentedTypes.ToString()));
        rows.Add(("Undocumented Types", m.UndocumentedTypes.ToString()));
        rows.Add(("Deprecated Members", m.DeprecatedMembers.ToString()));
        rows.Add(("Overloaded Methods", m.TotalOverloads.ToString()));

        const string title = " API Surface Metrics ";
        int contentWidth = Math.Max(
            title.Length,
            rows.Max(r => r.Label.Length + (r.Value.Length > 0 ? r.Value.Length + 2 : 0)) + 2);

        // Ensure minimum width
        contentWidth = Math.Max(contentWidth, 28);

        var sb = new StringBuilder();
        string top    = "╔" + new string('═', contentWidth) + "╗";
        string sep    = "╠" + new string('═', contentWidth) + "╣";
        string bottom = "╚" + new string('═', contentWidth) + "╝";

        sb.AppendLine(top);

        // Centered title
        int titlePad = contentWidth - title.Length;
        int padLeft  = titlePad / 2;
        int padRight = titlePad - padLeft;
        sb.AppendLine("║" + new string(' ', padLeft) + title + new string(' ', padRight) + "║");
        sb.AppendLine(sep);

        foreach (var (label, value) in rows)
        {
            string line;
            if (value.Length == 0)
            {
                // Sub-label line (no value), left-aligned with one leading space
                line = " " + label;
                line = line.PadRight(contentWidth);
            }
            else
            {
                // Label on left, value right-aligned
                int spacing = contentWidth - label.Length - value.Length - 1;
                line = " " + label + new string(' ', Math.Max(0, spacing)) + value;
                if (line.Length > contentWidth)
                    line = line[..contentWidth];
                else
                    line = line.PadRight(contentWidth);
            }
            sb.AppendLine("║" + line + "║");
        }

        sb.Append(bottom);
        return sb.ToString();
    }
}

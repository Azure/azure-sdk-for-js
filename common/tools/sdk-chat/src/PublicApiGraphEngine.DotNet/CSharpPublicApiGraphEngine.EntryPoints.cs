// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.Collections.Frozen;
using System.Diagnostics;
using System.Xml;
using System.Xml.Linq;

namespace PublicApiGraphEngine.DotNet;

/// <summary>
/// Entry point detection: resolves namespace entry points from .csproj configuration.
/// </summary>
public partial class CSharpPublicApiGraphEngine
{
    /// <summary>
    /// Resolves entry point namespaces from project configuration.
    /// Entry points in .NET are determined by:
    /// 1. RootNamespace from .csproj
    /// 2. PackageId from .csproj
    /// 3. AssemblyName from .csproj
    /// Returns a FrozenSet for guaranteed thread-safe concurrent reads.
    /// </summary>
    private static FrozenSet<string> ResolveEntryPointNamespaces(string rootPath)
    {
        var entryPoints = new HashSet<string>(StringComparer.OrdinalIgnoreCase);

        var csproj = Directory.EnumerateFiles(rootPath, "*.csproj", SearchOption.TopDirectoryOnly).FirstOrDefault()
                  ?? Directory.EnumerateFiles(rootPath, "*.csproj", SearchOption.AllDirectories).FirstOrDefault();

        if (csproj is not null)
        {
            try
            {
                var doc = LoadXmlSecure(csproj);

                var rootNs = ExtractCsprojProperty(doc, "RootNamespace");
                if (!string.IsNullOrEmpty(rootNs))
                    entryPoints.Add(rootNs);

                var packageId = ExtractCsprojProperty(doc, "PackageId");
                if (!string.IsNullOrEmpty(packageId))
                    entryPoints.Add(packageId);

                var assemblyName = ExtractCsprojProperty(doc, "AssemblyName");
                if (!string.IsNullOrEmpty(assemblyName))
                    entryPoints.Add(assemblyName);
            }
            catch (Exception ex) when (ex is XmlException or IOException)
            {
                Trace.TraceWarning("Failed to parse csproj '{0}': {1}", csproj, ex.Message);
            }
        }

        return entryPoints.ToFrozenSet();
    }

    /// <summary>
    /// Graphs a property value from a parsed .csproj XDocument.
    /// </summary>
    private static string? ExtractCsprojProperty(XDocument doc, string propertyName)
    {
        var value = doc.Descendants()
            .FirstOrDefault(e => e.Name.LocalName == propertyName)?.Value?.Trim();
        return string.IsNullOrEmpty(value) ? null : value;
    }

    /// <summary>
    /// Checks if a namespace is an entry point namespace.
    /// </summary>
    private static bool IsEntryPointNamespace(string ns, FrozenSet<string> entryPointNamespaces)
    {
        if (entryPointNamespaces.Count is 0)
        {
            return false;
        }

        foreach (var entryNs in entryPointNamespaces)
        {
            // Exact match or the namespace equals the entry point
            if (string.Equals(ns, entryNs, StringComparison.OrdinalIgnoreCase))
            {
                return true;
            }

            // Namespace is a direct child of entry point (e.g., "MyPkg.Models" when entry is "MyPkg")
            if (ns.StartsWith(entryNs + ".", StringComparison.OrdinalIgnoreCase))
            {
                var suffix = ns[(entryNs.Length + 1)..];
                // Direct children of entry namespace are entry points
                // But deeper nested ones are typically supporting types
                var depth = suffix.Count(c => c == '.');
                return depth == 0;
            }
        }

        return false;
    }
}

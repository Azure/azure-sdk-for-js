/**
 * Shared configuration for agentic workflows dashboard
 */

// Repositories to collect workflow data from
// v7: Fixed to match 6 stated repos (js, python, java, net, go, tools)
export const MONITORED_REPOS = [
  "Azure/azure-sdk-for-js",
  "Azure/azure-sdk-for-python",
  "Azure/azure-sdk-for-java",
  "Azure/azure-sdk-for-net",
  "Azure/azure-sdk-for-go",
  "Azure/azure-sdk-tools",
];

// Repos to exclude from metrics (test repos, etc)
export const EXCLUDED_REPOS = ["test/repo"];

// Cost estimation rates (USD per million tokens)
export const TOKEN_COSTS = {
  // Claude Sonnet 4 pricing
  inputPerMillion: 3.0,
  outputPerMillion: 15.0,
  cachedInputPerMillion: 0.3, // 90% discount for cached
};

// Schema version for tracking migrations
export const SCHEMA_VERSION = "2.0.0";

// Collector version
export const COLLECTOR_VERSION = "2.0.0";

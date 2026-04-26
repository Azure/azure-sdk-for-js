/**
 * Shared utility functions for the agentic workflows dashboard.
 * Exported for testing.
 */

// Model-specific pricing (USD per million tokens)
// Cache-write is explicitly $0 but tracked for future pricing changes
export const MODEL_PRICING: Record<string, { 
  input: number; 
  output: number; 
  cachedInput: number; 
  cachedWrite: number 
}> = {
  "claude-sonnet-4.6": { input: 3.0, output: 15.0, cachedInput: 0.3, cachedWrite: 0 },
  "claude-sonnet-4.5": { input: 3.0, output: 15.0, cachedInput: 0.3, cachedWrite: 0 },
  "claude-sonnet-4": { input: 3.0, output: 15.0, cachedInput: 0.3, cachedWrite: 0 },
  "claude-haiku-4.5": { input: 0.8, output: 4.0, cachedInput: 0.08, cachedWrite: 0 },
  "claude-opus-4.5": { input: 15.0, output: 75.0, cachedInput: 1.5, cachedWrite: 0 },
  "claude-opus-4.6": { input: 15.0, output: 75.0, cachedInput: 1.5, cachedWrite: 0 },
  "claude-opus-4.7": { input: 15.0, output: 75.0, cachedInput: 1.5, cachedWrite: 0 },
  "default": { input: 3.0, output: 15.0, cachedInput: 0.3, cachedWrite: 0 },
};

// Auditable conclusions (not skipped, queued, in_progress)
export const AUDITABLE_CONCLUSIONS = new Set([
  "success",
  "failure",
  "cancelled",
  "timed_out",
  "neutral",
  "action_required",
]);

/**
 * v9: Strict validation for CLI numeric arguments
 * Rejects partial matches like "7abc", negatives, zero, decimals
 */
export function validatePositiveInteger(value: string): { valid: boolean; value: number } {
  const num = Number(value);
  // Number() returns NaN for "7abc", Infinity for "Infinity", etc.
  // isSafeInteger rejects decimals, Infinity, NaN
  if (!Number.isSafeInteger(num) || num <= 0) {
    return { valid: false, value: Number.isNaN(num) ? NaN : num };
  }
  return { valid: true, value: num };
}

/**
 * Calculate cost for a model with explicit cache-write pricing
 * v6: Added input validation to prevent negative costs from bad data
 * v21: Uses sanitizeFiniteNonNegative for Infinity protection
 */
export function calculateModelCost(
  modelId: string,
  inputTokens: number,
  outputTokens: number,
  cacheReadTokens: number,
  cacheWriteTokens: number,
): number {
  const pricing = MODEL_PRICING[modelId] ?? MODEL_PRICING["default"];
  if (!pricing) {
    // This should never happen since "default" always exists
    return 0;
  }
  
  // v21: Use sanitizeFiniteNonNegative for all token values
  const validInput = sanitizeFiniteNonNegative(inputTokens);
  const validOutput = sanitizeFiniteNonNegative(outputTokens);
  const validCacheRead = Math.min(sanitizeFiniteNonNegative(cacheReadTokens), validInput);
  const validCacheWrite = sanitizeFiniteNonNegative(cacheWriteTokens);
  
  const uncachedInput = validInput - validCacheRead;

  return (
    (uncachedInput / 1_000_000) * pricing.input +
    (validCacheRead / 1_000_000) * pricing.cachedInput +
    (validOutput / 1_000_000) * pricing.output +
    (validCacheWrite / 1_000_000) * pricing.cachedWrite
  );
}

/**
 * Calculate cache savings for a model (difference between full price and cached price)
 * v6: Added input validation
 * v21: Uses sanitizeFiniteNonNegative for Infinity protection
 */
export function calculateCacheSavings(modelId: string, cacheReadTokens: number): number {
  const pricing = MODEL_PRICING[modelId] ?? MODEL_PRICING["default"];
  if (!pricing) {
    return 0;
  }
  // v21: Use sanitizeFiniteNonNegative for Infinity protection
  const validCacheRead = sanitizeFiniteNonNegative(cacheReadTokens);
  const savingsPerToken = pricing.input - pricing.cachedInput;
  return (validCacheRead / 1_000_000) * savingsPerToken;
}

/**
 * Sanitize a number to be finite and non-negative
 * v21: Guards against Infinity, NaN, and negative values
 * @internal Exported for testing
 */
export function sanitizeFiniteNonNegative(value: number | undefined | null): number {
  if (value === undefined || value === null) return 0;
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, value);
}

/**
 * Calculate cache hit rate percentage with validation
 * v6: Ensures rate is always 0-100%
 * v21: Uses sanitizeFiniteNonNegative for Infinity protection
 */
export function calculateCacheHitRate(
  inputTokens: number,
  cacheReadTokens: number
): number {
  const validInput = sanitizeFiniteNonNegative(inputTokens);
  if (validInput === 0) return 0;
  const validCacheRead = Math.max(0, Math.min(sanitizeFiniteNonNegative(cacheReadTokens), validInput));
  return (validCacheRead / validInput) * 100;
}

/**
 * Select primary model (most input tokens)
 */
export function selectPrimaryModel(
  byModel: Record<string, { input_tokens: number }> | undefined,
): string {
  if (!byModel || Object.keys(byModel).length === 0) {
    return "unknown";
  }

  const modelIds = Object.keys(byModel);
  return modelIds.reduce((a, b) => {
    const aTokens = byModel[a]?.input_tokens ?? 0;
    const bTokens = byModel[b]?.input_tokens ?? 0;
    return aTokens > bTokens ? a : b;
  });
}

/**
 * Determine if a PR is from a fork
 */
export function determineIsFromFork(
  headRepository: { full_name: string } | undefined,
  repo: string
): "true" | "false" | "unknown" {
  if (!headRepository) {
    return "unknown";
  } else if (headRepository.full_name !== repo) {
    return "true";
  } else {
    return "false";
  }
}

/**
 * Calculate timing metrics for a workflow run
 */
export function calculateTimings(
  createdAt: Date,
  startedAt: Date | null,
  completedAt: Date | null
): { queueTime: number | null; duration: number | null } {
  let queueTime: number | null = null;
  let duration: number | null = null;

  if (startedAt) {
    queueTime = (startedAt.getTime() - createdAt.getTime()) / 1000;
  }
  if (startedAt && completedAt) {
    duration = (completedAt.getTime() - startedAt.getTime()) / 1000;
  }

  return { queueTime, duration };
}

/**
 * Get the canonical analysis timestamp for a run.
 * For completed runs: CompletedAt
 * For in-progress runs: UpdatedAt
 * Fallback: CreatedAt
 */
export function getAnalysisTimestamp(
  createdAt: string,
  updatedAt: string | null,
  completedAt: string | null
): string {
  return completedAt || updatedAt || createdAt;
}

/**
 * Process items with bounded parallelism
 */
export async function processWithConcurrency<T, R>(
  items: T[],
  fn: (item: T, index: number) => Promise<R>,
  concurrency: number,
): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let nextIndex = 0;

  async function worker(): Promise<void> {
    while (nextIndex < items.length) {
      const index = nextIndex++;
      const item = items[index];
      if (item !== undefined) {
        results[index] = await fn(item, index);
      }
    }
  }

  const workers = Array(Math.min(concurrency, items.length))
    .fill(null)
    .map(() => worker());

  await Promise.all(workers);
  return results;
}

/**
 * Create composite run key for accurate counting (handles reruns)
 */
export function createRunKey(runId: number, runAttempt: number): string {
  return `${runId}:${runAttempt}`;
}

/**
 * Parse ISO duration to days (e.g., "P30D" -> 30)
 */
export function parseIsoDurationDays(duration: string): number {
  const match = duration.match(/P(\d+)D/);
  const days = match?.[1];
  return days ? parseInt(days, 10) : 30;
}

/**
 * Create ISO duration from days (e.g., 7 -> "P7D")
 */
export function createIsoDuration(days: number): string {
  return `P${Math.floor(days)}D`;
}

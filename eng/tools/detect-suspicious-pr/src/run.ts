/**
 * CLI entry point for the suspicious-PR detector.
 *
 * Reads a PullRequestInput as JSON from stdin, runs detection, and writes a
 * JSON DetectionResult to stdout. Exits with code 1 if suspicious.
 *
 * Usage:
 *   echo '{ ... }' | npx tsx src/run.ts
 */
import { detectSuspiciousPR, validateInput } from "./detect.js";

/** Maximum input size (10 MB) – prevents OOM from unexpectedly large payloads. */
const MAX_STDIN_BYTES = 10 * 1024 * 1024;

async function readStdin(): Promise<string> {
  const chunks: Buffer[] = [];
  let totalBytes = 0;
  for await (const chunk of process.stdin) {
    const buf = chunk as Buffer;
    totalBytes += buf.length;
    if (totalBytes > MAX_STDIN_BYTES) {
      console.error(`ERROR: stdin exceeds ${MAX_STDIN_BYTES} bytes`);
      process.exit(2);
    }
    chunks.push(buf);
  }
  return Buffer.concat(chunks).toString("utf-8");
}

async function main(): Promise<void> {
  const raw = await readStdin();
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    console.error("ERROR: Invalid JSON on stdin");
    process.exit(2);
  }

  const input = validateInput(parsed);
  const result = detectSuspiciousPR(input);
  console.log(JSON.stringify(result, null, 2));

  if (result.suspicious) {
    process.exit(1);
  }
}

main();

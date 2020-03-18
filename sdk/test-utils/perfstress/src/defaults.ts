import { PerfStressOption, makePerfStressOption } from './PerfStressOptions';

export const defaultPerfStressOptions: PerfStressOption[] = [
  makePerfStressOption(false, "Duration of test in seconds", "duration", "d", 10),
  makePerfStressOption(false, "Host to redirect HTTP requests", "host"),
  makePerfStressOption(false, "Allow non-trusted SSL certs", "insecure"),
  makePerfStressOption(false, "Number of iterations of main test loop", "iterations", "i", 1),
  makePerfStressOption(false, "Print job statistics (used by automation)", "job-statistics"),
  makePerfStressOption(false, "Disables test cleanup", "no-cleanup"),
  makePerfStressOption(false, "Number of operations to execute in parallel", "parallel", "p", 1),
  makePerfStressOption(false, "Port to redirect HTTP requests", "port"),
  makePerfStressOption(false, "Runs sync version of test", "sync"),
  makePerfStressOption(false, "Duration of warmup in seconds", "warmup", "w", 5),
  makePerfStressOption(false, "Number of items", "count", "c", 10)
];
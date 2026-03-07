export {
  checkInjection,
  checkCiFiles,
  checkLifecyclePatch,
  detectSuspiciousPR,
  validateInput,
} from "./detect.ts";

export type { DetectionReason, DetectionResult, PullRequestInput } from "./detect.ts";

export {
  checkInjection,
  checkCiFiles,
  checkLifecyclePatch,
  detectSuspiciousPR,
  validateInput,
} from "./detect.js";

export type { DetectionReason, DetectionResult, PullRequestInput } from "./detect.js";

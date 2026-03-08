export {
  checkInjection,
  checkCiFiles,
  checkLifecyclePatch,
  detectSuspiciousPR,
  detectSuspiciousIssue,
  validateInput,
  validateIssueInput,
} from "./detect.ts";

export type { DetectionReason, DetectionResult, IssueInput, PullRequestInput } from "./detect.ts";

# JavaScript mgmt. SDK release rotation runbook

Follow these steps for generated management SDK PRs affecting `sdk/*/arm-*` packages, ending with PR approval. **Review the `mgmt-review` findings and the Next Steps to Merge comment rather than repeating their API, tooling, and CI checks.** Route handwritten or generator changes to a JavaScript management SDK maintainer.

## Step 1. Start from the dashboard

Use the [Azure SDK JS Dashboard](https://ca-sdk-js-worker.ambitiouspond-79d04e69.eastus2.azurecontainerapps.io/#/sdk-prs) as the starting point for the daily rotation:

1. Open the dashboard link and sign in with your Microsoft work account if prompted. The link opens the SDK PRs view.
2. Check the unread activities for management SDK PRs, including new PRs and updates to PRs awaiting follow-up.
3. Open the relevant PR on GitHub and continue with Step 2 to read the workflow results and determine the next action. Use the existing PR conversation to avoid duplicating reviews or follow-up requests.
4. Once you have reviewed an activity, return to the dashboard and click **Mark read**.

**The dashboard data refreshes every morning.** It may not reflect changes made since that refresh, so use the live PR status for review and approval decisions.

If the dashboard is unavailable or appears stale, contact the JS owner and use the [live management AutoPR query](https://github.com/Azure/azure-sdk-for-js/pulls?q=is%3Apr+is%3Aopen+label%3AMgmt+AutoPR+in%3Atitle) as a fallback. A missing dashboard update does not mean the queue is empty.

## Step 2. Open the PR and find both workflow results

Read the PR description or release plan for the package, target version, and service-team contact. Check existing human decisions, holds, and the latest commit, then find these two distinct outputs:

| Output | Trigger and where to look |
| --- | --- |
| **`mgmt-review` result** | Adding `mgmt-review-needed` requests an API/tooling review. Find the submitted PR review, its summary, and any inline findings. |
| **Next Steps to Merge** | The separate `mgmt-guidance` workflow posts this conversation comment once all CI checks finish. It reports CI/merge blockers and any new-package pipeline setup action. It does not require `mgmt-review` to have finished. |

If the `mgmt-review` result is missing and no review is running, apply `mgmt-review-needed`. The request label is consumed when review starts, so its absence alone does not mean a review needs to be requested again. `mgmt-review-in-progress` indicates an active review; `mgmt-review-added` indicates completion, **not approval**.

If Next Steps to Merge is missing, first check whether CI is still running. Automatic guidance applies to PRs with the `Mgmt` label and `AutoPR` in the title. If CI has finished but guidance is missing or failed, ask the JS owner to investigate or manually rerun `mgmt-guidance`. Missing output is not a clean result.

## Step 3. Act on the findings and merge guidance

Use the workflows' findings and links to identify the next action rather than reconstructing their checks.

| Finding or guidance | Reviewer action |
| --- | --- |
| `mgmt-review` reports API design issues | Ask the service team to fix the source specification or supported customization and regenerate. Escalate unclear findings or intentional API changes to the JS owner for a decision. |
| `mgmt-review` reports tooling issues | Send the finding and affected package to the JS owner to coordinate a tooling fix. Do not patch regenerated output just to silence a finding. |
| `mgmt-review` reports no API design issues | Continue checking merge guidance and human blockers. This is advisory, not approval. |
| Next Steps to Merge lists failed CI checks | Relay the listed fixes and log links to the service team. Escalate pipeline infrastructure or generator failures to the JS owner. Wait for updated checks and guidance after fixes. |
| PR has merge conflicts, especially in `pnpm-lock.yaml` | No manual resolution is needed; daily automation resolves these conflicts. Wait for the automation update and the resulting CI checks before proceeding. |
| Next Steps to Merge requests new-package pipeline setup | Either the PR author or reviewer can post `/azp run prepare-pipelines` as a separate PR comment. Check existing requests and pipeline responses before requesting it again; a request alone does not prove setup succeeded. |
| Next Steps to Merge says all CI checks passed and the PR is ready for review | Continue with Step 4. This confirms CI readiness, not that management review is complete or that a human has approved. |

Keep the next action on the existing PR thread. Do not approve while a confirmed issue remains unresolved, and do not bypass required checks or human decisions based on an automated suggestion.

### General Copilot comments

Copilot may also review the PR separately from `mgmt-review`. Some suggestions do not apply to generated management SDKs. **Focus this rotation review on the `mgmt-review` workflow findings; there is no need to implement every general Copilot suggestion or treat each one as a release blocker.**

If a general Copilot comment identifies a real issue, route it to the service team or JS owner as appropriate. If the suggestion is inapplicable, resolve the comment thread rather than modifying generated code to satisfy it. Existing blocking human reviews still require resolution.

## Step 4. Approve

Approve when the current `mgmt-review` findings have been addressed or have a justified maintainer disposition, Next Steps to Merge and the live checks show no remaining CI or merge blockers, any requested onboarding setup has succeeded, and no hold or blocking human review remains.

### Common service-team questions

| Question | Response |
| --- | --- |
| "CI is green. Can you approve now?" | Check the current `mgmt-review` result and remaining human or onboarding actions. Green CI alone is not approval readiness. |
| "Why is this waiting, and can we unblock it?" | Link the specific workflow finding, required service-team action, or JS-owner escalation in Step 3. |
| "Must we make every Copilot change?" | No. Focus on `mgmt-review` findings and real issues; inapplicable general Copilot suggestions do not require generated-code changes. |

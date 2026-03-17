---
on:
  pull_request:
    types: [labeled]
    names: [mgmt-review-needed]
description: "Review a pull request for management-plane SDKs"
permissions:
  contents: read
  pull-requests: read
  actions: read
tools:
  github:
    toolsets: [context, repos, pull_requests, actions]
    lockdown: true
  bash: true
  cache-memory:
  repo-memory:
safe-outputs:
  create-pull-request-review-comment:
    max: 10
    side: "RIGHT"
    target: "${{ github.event.pull_request.number || github.event.issue.number }}"
  submit-pull-request-review:
    max: 1
    footer: "if-body"
    target: "${{ github.event.pull_request.number || github.event.issue.number }}"
  messages:
    footer: "> ⚡ *Benchmarked by [{workflow_name}]({run_url})*"
    run-started: "⚡ [{workflow_name}]({run_url}) is profiling this PR for reviewing..."
    run-success: "⚡ [{workflow_name}]({run_url}) completed the management-plane SDKs review. ✅"
    run-failure: "⚡ [{workflow_name}]({run_url}) {status}. ❌"
timeout-minutes: 15

---

# Workflow

We need to add a comment in current PR with pipeline failure details.

## Steps

1. Get PR details from the fixed PR - https://github.com/Azure/autorest.typescript/pull/3839;

2. Analyze the failure checks from the details
   - Execute `azsdk azp analyze <build-id> -a false` where `<build-id>` is the pipeline build ID.
   - Review the analysis output and extract a concise summary of the core error (e.g. compilation error, missing dependency, TypeSpec validation failure).
   - Include the error summary under each failed language in the issue comment so users can understand the failure without inspecting pipeline logs.


3. Add comment failed message in current PR

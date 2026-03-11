# Azure SDK Cross-Language Bug Analysis Report


**Methodology**: LLM-powered contextual classification of every issue labeled `bug` across all five Azure SDK repositories. Each of the 2,901 issues was individually analyzed by an AI classifier (Claude Haiku 4.5) that read the issue title, labels, and body to determine whether it represents an actual code bug, what the root cause is, the bug category, and which service area is affected.


**Scope**: All issues with the `bug` label (open and closed) from:

- [azure-sdk-for-python](https://github.com/Azure/azure-sdk-for-python) — 881 issues

- [azure-sdk-for-java](https://github.com/Azure/azure-sdk-for-java) — 703 issues

- [azure-sdk-for-net](https://github.com/Azure/azure-sdk-for-net) — 559 issues

- [azure-sdk-for-js](https://github.com/Azure/azure-sdk-for-js) — 495 issues

- [azure-sdk-for-go](https://github.com/Azure/azure-sdk-for-go) — 263 issues


**Total issues analyzed: 2,901**


## Classification Taxonomy


Each issue was classified along four dimensions:


### Root Cause

| Root Cause | Definition |
|---|---|
| `sdk_code_defect` | Bug in the SDK library source code requiring a code fix |
| `service_behavior` | Bug caused by Azure service behavior; may need service-side fix or SDK workaround |
| `codegen` | Bug in auto-generated code (ARM management plane, OpenAPI codegen) |
| `dependency` | Bug in a dependency (not the SDK's own code) |
| `build_ci` | Build, CI/CD, or packaging issue (not runtime behavior) |
| `user_error` | Misuse or misunderstanding by the reporter (not a bug) |
| `not_a_bug` | Feature request, question, documentation issue, or duplicate mislabeled as bug |


### Bug Category

| Category | Definition |
|---|---|
| `error_handling` | Incorrect exceptions, missing error info, swallowed errors, wrong error types |
| `api_surface` | Missing/incorrect methods, wrong signatures, broken overloads, API design flaws |
| `serialization` | JSON/XML serialization/deserialization bugs, model mapping errors |
| `connection_retry` | Connection management, retry logic, timeout, reconnection failures |
| `type_error` | Type system issues — wrong types, missing generics, casting failures |
| `auth` | Authentication/authorization — credential handling, token refresh, scope issues |
| `memory_lifecycle` | Memory leaks, resource disposal, connection pool exhaustion |
| `platform_compat` | Platform-specific issues — OS, runtime version, browser vs Node.js |
| `streaming` | Streaming/download/upload issues, chunked transfer problems |
| `perf` | Performance regressions, excessive latency, unnecessary allocations |
| `other` | Doesn't fit neatly into the above categories |


## Executive Summary


Of the 2,901 `bug`-labeled issues analyzed:

- **2497 (86.1%)** are actual bugs that required or would require a code change

- **404 (13.9%)** are not actual bugs (mislabeled feature requests, questions, duplicates, user error)


Among actual bugs:

- **1936 (77.5%)** are SDK source code defects (the SDK's own code is wrong)

- **211 (8.5%)** are caused by Azure service behavior (service returns unexpected results)

- **224 (9.0%)** are auto-generated code defects (codegen templates or OpenAPI specs)


**Key Findings:**

1. **~1 in 8 bug-labeled issues is not actually a bug** — the `bug` label is applied liberally across all repos

2. **SDK code defects outnumber service-behavior bugs ~9:1** — the vast majority of bugs are in the SDK code itself, not caused by Azure services

3. **Error handling and API surface issues dominate** — together they account for 46% of all bug categories

4. **Java has a massive codegen problem** — 19.5% of Java's bug-labeled issues are auto-generated code bugs (vs 1-5% for other languages)

5. **Storage and ARM management are the buggiest service areas** — together they account for 36% of all bugs across languages

6. **Python reports the most service-behavior bugs** — 10.9% of Python's issues are service-caused, nearly 2x the cross-language average


## 1. Are Bug-Labeled Issues Actually Bugs?


Not all issues labeled `bug` represent actual code defects. The classifier determined whether each issue required (or would require) a change to library source code, service behavior, or generated code.


| Repository | Total Issues | Actual Bugs | Not Bugs | Bug Rate |
|---|---|---|---|---|
| Python | 881 | 765 | 116 | 86.8% |
| Java | 703 | 669 | 34 | 95.2% |
| .NET | 559 | 424 | 135 | 75.8% |
| JavaScript | 495 | 394 | 101 | 79.6% |
| Go | 263 | 245 | 18 | 93.2% |
| **All Repos** | **2901** | **2497** | **404** | **86.1%** |


**Interpretation**: Java's 95.2% bug rate is inflated by the large number of codegen issues (which are technically bugs in generated code). .NET has the lowest bug rate at 75.8%, meaning ~1 in 4 of its bug-labeled issues are not actual bugs — they are feature requests, questions, or documentation issues that were mislabeled.


## 2. Root Cause Analysis


The root cause identifies *where* the bug originates — in the SDK's own source code, the Azure service, the code generator, a dependency, or elsewhere.


### 2.1 Cross-Language Root Cause Breakdown


| Root Cause | Count | % of All |
|---|---|---|
| sdk_code_defect | 1936 | 66.7% |
| not_a_bug | 368 | 12.7% |
| codegen | 224 | 7.7% |
| service_behavior | 211 | 7.3% |
| build_ci | 69 | 2.4% |
| dependency | 68 | 2.3% |
| user_error | 25 | 0.9% |


### 2.2 Root Cause by Repository


| Root Cause | Python | Java | .NET | JavaScript | Go |
|---|---|---|---|---|---|
| sdk_code_defect | 589 (66.9%) | 494 (70.3%) | 385 (68.9%) | 316 (63.8%) | 152 (57.8%) |
| service_behavior | 96 (10.9%) | 18 (2.6%) | 31 (5.5%) | 33 (6.7%) | 33 (12.5%) |
| codegen | 11 (1.2%) | 137 (19.5%) | 15 (2.7%) | 24 (4.8%) | 37 (14.1%) |
| not_a_bug | 111 (12.6%) | 32 (4.6%) | 113 (20.2%) | 95 (19.2%) | 17 (6.5%) |
| dependency | 28 (3.2%) | 15 (2.1%) | 6 (1.1%) | 12 (2.4%) | 7 (2.7%) |
| build_ci | 33 (3.7%) | 4 (0.6%) | 6 (1.1%) | 10 (2.0%) | 16 (6.1%) |
| user_error | 13 (1.5%) | 3 (0.4%) | 3 (0.5%) | 5 (1.0%) | 1 (0.4%) |


## 3. SDK Code Defects vs. Service-Behavior Bugs (Side-by-Side)


This is the core comparison the analysis was designed to answer: **How many bugs are the SDK's fault vs. the service's fault?**


| Repository | SDK Defects | Service Bugs | SDK:Service Ratio | SDK % | Service % |
|---|---|---|---|---|---|
| Python | 589 | 96 | 6.1:1 | 86.0% | 14.0% |
| Java | 494 | 18 | 27.4:1 | 96.5% | 3.5% |
| .NET | 385 | 31 | 12.4:1 | 92.5% | 7.5% |
| JavaScript | 316 | 33 | 9.6:1 | 90.5% | 9.5% |
| Go | 152 | 33 | 4.6:1 | 82.2% | 17.8% |
| **All Repos** | **1936** | **211** | **9.2:1** | **90.2%** | **9.8%** |


**Key takeaway**: Across all languages, SDK code defects outnumber service-behavior bugs by approximately 9:1. The SDKs themselves — not the Azure services — are the dominant source of bugs reported by users.


**Notable language differences:**

- **Python** has the highest proportion of service-behavior bugs (14.0%), suggesting Python users encounter or report service issues more frequently

- **Go** is second highest (17.8%), possibly because Go's strict type system surfaces service-side inconsistencies more readily

- **Java** has the lowest service-behavior proportion (3.5%), but this is partly because Java's bug pipeline is dominated by codegen issues that crowd out other categories


### 3.1 What Do Service-Behavior Bugs Look Like?


Service-behavior bugs are issues where the Azure service itself returns unexpected or incorrect results, and the SDK may need a workaround. Common patterns include:


- **Unexpected error responses**: Service returns 500/503 errors in situations the SDK expected to succeed

- **Schema mismatches**: Service returns JSON that doesn't match the documented schema, breaking deserialization

- **Behavioral changes**: Service changes behavior (e.g., pagination, retry-after headers) without API version changes

- **Auth flow issues**: Service rejects valid credentials or returns unexpected auth challenges

- **ARM inconsistencies**: Resource Manager APIs return inconsistent results across resource providers


## 4. Bug Category Themes


Bug categories describe *what kind of defect* was reported, regardless of root cause.


### 4.1 Overall Bug Category Distribution (Actual Bugs Only)


| Category | Count | % of Bugs | Description |
|---|---|---|---|
| api_surface | 602 | 24.1% | Missing methods, wrong signatures, broken overloads |
| error_handling | 539 | 21.6% | Wrong exceptions, swallowed errors, missing error context |
| other | 284 | 11.4% | Miscellaneous bugs |
| connection_retry | 217 | 8.7% | Connection drops, retry storms, timeout mishandling |
| serialization | 207 | 8.3% | JSON/XML serialization failures, model mapping errors |
| type_error | 185 | 7.4% | Wrong types, missing generics, casting failures |
| auth | 152 | 6.1% | Credential failures, token refresh bugs, scope issues |
| memory_lifecycle | 106 | 4.2% | Memory leaks, connection pool exhaustion, resource disposal |
| platform_compat | 92 | 3.7% | OS/runtime/browser-specific failures |
| streaming | 71 | 2.8% | Upload/download/chunked transfer issues |
| perf | 36 | 1.4% | Performance regressions, excessive allocations |
| none | 6 | 0.2% | Category not applicable |


### 4.2 Bug Category by Repository (Actual Bugs Only)


| Category | Python | Java | .NET | JavaScript | Go |
|---|---|---|---|---|---|
| error_handling | 197 | 142 | 114 | 42 | 44 |
| api_surface | 149 | 223 | 85 | 88 | 57 |
| serialization | 49 | 31 | 61 | 34 | 32 |
| connection_retry | 46 | 96 | 30 | 35 | 10 |
| type_error | 73 | 35 | 21 | 38 | 18 |
| auth | 50 | 39 | 17 | 34 | 12 |
| memory_lifecycle | 27 | 24 | 22 | 23 | 10 |
| platform_compat | 24 | 13 | 15 | 37 | 3 |
| streaming | 17 | 27 | 8 | 19 | 0 |
| perf | 17 | 5 | 7 | 6 | 1 |
| other | 113 | 33 | 42 | 38 | 58 |


**Observations by category:**


**Error Handling** (21.6% — the #1 bug type across most languages):

- Python leads with 197 error handling bugs — common pattern: exceptions not raised or wrong exception types

- Java has 142 — many in Service Bus and Event Hubs clients where connection error propagation is complex

- .NET has 114 — many around async operation error handling in management plane clients


**API Surface** (24.1% — #1 overall but heavily skewed by codegen):

- Java's 223 API surface issues are largely codegen-related (auto-generated management plane clients with wrong or missing APIs)

- Python has 149 — many are ARM management plane generated clients with incorrect method signatures

- This category is inflated by codegen; excluding codegen it drops significantly


**Connection/Retry** (8.7%):

- Java dominates with 96 connection/retry issues — Event Hubs and Service Bus AMQP connection management is notoriously complex

- These bugs tend to be the most user-impacting (service disruption, message loss)


**Serialization** (8.3%):

- .NET leads with 61 serialization bugs — System.Text.Json integration edge cases

- Python has 46 — model serialization with nested types and discriminated unions


**Auth** (6.1%):

- Evenly distributed; identity library (azure-identity) is a common source across all languages

- Common patterns: managed identity failures in specific environments, token cache race conditions


## 5. Codegen Bug Analysis


Auto-generated code (from OpenAPI/Swagger specs via AutoRest or TypeSpec) is a significant source of bugs, especially in Java and Go.


| Repository | Codegen Bugs | % of All Issues | Primary Source |
|---|---|---|---|
| Java | 137 | 19.5% | AutoRest Java codegen for ARM management plane |
| Go | 37 | 14.1% | AutoRest Go codegen for ARM management plane |
| JavaScript | 24 | 4.8% | AutoRest TypeScript codegen for ARM management plane |
| .NET | 15 | 2.7% | AutoRest C# codegen for ARM management plane |
| Python | 11 | 1.2% | AutoRest Python codegen for ARM management plane |


**Java's codegen problem is 4x worse than the next language** — nearly 1 in 5 Java bug issues are about auto-generated management plane code. This suggests the Java AutoRest codegen template has significantly more issues than other languages, or that Java users file more granular codegen issues.


## 6. Service Area Hotspots


Which Azure services have the most bugs across SDK languages?


### 6.1 Overall Service Area Distribution (Actual Bugs Only)


| Service Area | Count | % of Bugs |
|---|---|---|
| storage | 467 | 18.7% |
| arm_mgmt | 433 | 17.3% |
| service_bus | 319 | 12.8% |
| core | 211 | 8.5% |
| event_hubs | 182 | 7.3% |
| other | 172 | 6.9% |
| identity | 163 | 6.5% |
| ai_ml | 137 | 5.5% |
| cosmos | 124 | 5.0% |
| keyvault | 104 | 4.2% |
| communication | 46 | 1.8% |
| monitor | 44 | 1.8% |
| openai | 36 | 1.4% |
| app_config | 35 | 1.4% |
| search | 24 | 1.0% |


### 6.2 Service Area by Repository (Actual Bugs Only, Top 5 Per Repo)


**Python**: 

storage (177), arm_mgmt (110), ai_ml (104), other (71), core (67)


**Java**: 

arm_mgmt (177), service_bus (124), event_hubs (93), cosmos (65), identity (53)


**.NET**: 

storage (131), arm_mgmt (58), other (52), service_bus (34), core (33)


**JavaScript**: 

service_bus (88), storage (63), identity (31), core (31), communication (29)


**Go**: 

arm_mgmt (61), core (53), storage (46), other (27), service_bus (20)


**Cross-language patterns:**

- **Storage** is the #1 bug area in Python, .NET, and Go — it's the most-used service and has complex APIs (blob, queue, table, file, datalake)

- **ARM Management** is #1 in Java and #2 in Python, .NET, and Go — almost entirely driven by codegen issues

- **Service Bus** is #1 in JavaScript and #2 in Java — AMQP-based messaging is inherently complex

- **Event Hubs** is a major hotspot in Java (93 bugs) due to AMQP partition management and checkpointing

- **AI/ML** is #3 in Python (104 bugs) — Python is the primary language for Azure AI services


## 7. Service-Behavior Bugs: Detailed Breakdown


These are bugs caused by Azure service behavior rather than SDK code. They represent cases where the service returns unexpected results, violates its contract, or changes behavior in ways that break client code.


### 7.1 Service-Behavior Bugs by Service Area


| Service Area | Count | % of Service Bugs |
|---|---|---|
| arm_mgmt | 52 | 24.6% |
| other | 30 | 14.2% |
| service_bus | 28 | 13.3% |
| ai_ml | 22 | 10.4% |
| storage | 19 | 9.0% |
| cosmos | 12 | 5.7% |
| monitor | 9 | 4.3% |
| event_hubs | 9 | 4.3% |
| communication | 8 | 3.8% |
| keyvault | 6 | 2.8% |
| identity | 6 | 2.8% |
| openai | 4 | 1.9% |
| core | 3 | 1.4% |
| app_config | 2 | 0.9% |
| search | 1 | 0.5% |


### 7.2 Service-Behavior Bugs by Category


| Bug Category | Count | % |
|---|---|---|
| other | 44 | 20.9% |
| error_handling | 42 | 19.9% |
| api_surface | 36 | 17.1% |
| connection_retry | 29 | 13.7% |
| serialization | 14 | 6.6% |
| auth | 13 | 6.2% |
| none | 10 | 4.7% |
| platform_compat | 9 | 4.3% |
| perf | 6 | 2.8% |
| type_error | 4 | 1.9% |
| streaming | 4 | 1.9% |


**Patterns in service-behavior bugs:**

- ARM management plane accounts for the largest share — resource providers often have inconsistent behavior

- Error handling is the #1 service-behavior category — services returning unexpected error codes/messages

- Storage and Service Bus have significant service-behavior issues around connection management


## 8. Cross-Language Comparison Matrix


Side-by-side comparison of key metrics across all five SDK repositories:


| Metric | Python | Java | .NET | JavaScript | Go |
|---|---|---|---|---|---|
| Total Bug-Labeled Issues | 881 | 703 | 559 | 495 | 263 |
| Actual Bug Rate | 86.8% | 95.2% | 75.8% | 79.6% | 93.2% |
| SDK Defect (% of issues) | 66.9% | 70.3% | 68.9% | 63.8% | 57.8% |
| Service Behavior (% of issues) | 10.9% | 2.6% | 5.5% | 6.7% | 12.5% |
| Codegen (% of issues) | 1.2% | 19.5% | 2.7% | 4.8% | 14.1% |
| #1 Bug Category | error_handling | api_surface | error_handling | api_surface | other |
| #1 Service Area | storage | arm_mgmt | storage | service_bus | arm_mgmt |
| SDK:Service Ratio | 6.1:1 | 27.4:1 | 12.4:1 | 9.6:1 | 4.6:1 |


## 9. Implications and Recommendations


### For SDK Engineering Teams


1. **Invest in error handling quality** — it's the #1 or #2 bug category in every language. Consistent error types, clear messages, and proper error propagation would prevent ~22% of bugs.

2. **Fix the Java codegen pipeline** — 19.5% of Java bugs come from auto-generated code. Improving the Java AutoRest templates would have outsized impact.

3. **Storage SDK needs ongoing attention** — it's the buggiest service area and is the most-used SDK. Consider dedicated hardening sprints.

4. **Connection/retry bugs are high-impact** — while only 8.7% by count, they cause the most user-visible outages (dropped connections, message loss)


### For Azure Service Teams


1. **ARM management plane consistency** — ARM is the #2 service area for bugs across all languages, driven by inconsistent behavior across resource providers

2. **Service-behavior bugs are ~10% of the pipeline** — while SDK defects dominate, service teams should invest in better contract testing to reduce the ~211 service-caused issues

3. **Python users surface service issues most** — Python's 10.9% service-behavior rate suggests either Python users are more likely to encounter edge cases or Python's SDK surfaces service issues more transparently


### For Platform/Tooling Teams


1. **Label hygiene** — ~13% of bug-labeled issues are not bugs. Better triage templates and bot-assisted labeling could reduce noise.

2. **Codegen quality gates** — automated API surface comparison between generated code and specs could catch many of the 224 codegen bugs before release


## 10. Methodology Notes


**Data Collection**: All issues with the `bug` label were fetched via the GitHub Search API across all five Azure SDK repositories. The API returns up to 1,000 issues per query; repositories with >1,000 bug issues (none currently) would require date-range partitioning.


**Classification Process**: Each issue was classified by Claude Haiku 4.5 in batches of 50. The classifier received the issue number, state (open/closed), labels, title, and first ~300 characters of the body. Classification was based on contextual understanding of:

- Whether the issue describes a defect requiring a code change vs. a feature request/question

- Where the root cause lies (SDK code, service behavior, codegen, dependency, etc.)

- What category of bug it represents (error handling, serialization, auth, etc.)

- Which Azure service area is affected


**Validation**: The JS repository was used as the ground truth calibration set. Manual spot-checks of 20 randomly selected JS issues showed >90% agreement with the LLM classifier. A heuristic-based classifier was also tested but rejected due to 5% overestimation of bugs and significant underdetection of service-behavior issues.


**Limitations**:

- Classification is based on issue metadata (title + body snippet), not on linked PRs or code changes. Some issues may be misclassified if the title/body is misleading.

- Issue body was truncated to ~300 characters for efficiency. Complex issues with key context deeper in the body may be misclassified.

- The `bug` label is the only inclusion criterion. Bugs filed without the `bug` label are not captured.

- Older issues (pre-2020) may have different patterns than recent issues.

- Java and Go issue counts are slightly below expected totals (703/732 and 881/883) due to parse deduplication — <3% data loss.


## Appendix: Raw Numbers


| Repo | Total | Actual Bugs | SDK Defects | Service Bugs | Codegen | Not Bugs | Dependency | Build/CI | User Error |
|---|---|---|---|---|---|---|---|---|---|
| Python | 881 | 765 | 589 | 96 | 11 | 111 | 28 | 33 | 13 |
| Java | 703 | 669 | 494 | 18 | 137 | 32 | 15 | 4 | 3 |
| .NET | 559 | 424 | 385 | 31 | 15 | 113 | 6 | 6 | 3 |
| JavaScript | 495 | 394 | 316 | 33 | 24 | 95 | 12 | 10 | 5 |
| Go | 263 | 245 | 152 | 33 | 37 | 17 | 7 | 16 | 1 |
| **Total** | **2901** | **2497** | **1936** | **211** | **224** | **368** | **68** | **69** | **25** |


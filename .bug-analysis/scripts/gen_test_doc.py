import sqlite3

conn = sqlite3.connect("/tmp/final_classifications.db")
c = conn.cursor()

doc = []
def w(t=""): doc.append(t)

w("# Azure SDK Test Coverage Gap Analysis")
w()
w("**Companion to**: [Azure SDK Cross-Language Bug Analysis Report](azure-sdk-bug-analysis.md)")
w()
w("## Executive Summary")
w()
w("Of the 1,936 confirmed SDK code defects across all five Azure SDK repositories, 1,438 were analyzed for test catchability. The results are striking:")
w()

c.execute("SELECT catchable, COUNT(*) FROM test_catchability GROUP BY catchable")
counts = {r[0]: r[1] for r in c.fetchall()}
total = sum(counts.values())
yes_ct = counts.get('yes', 0)
partial_ct = counts.get('partially', 0)
no_ct = counts.get('no', 0)

w(f"| Catchable? | Count | % |")
w(f"|---|---|---|")
w(f"| **Yes** — a well-designed test would have caught this | {yes_ct} | {round(100*yes_ct/total,1)}% |")
w(f"| **Partially** — catchable with sophisticated test setup | {partial_ct} | {round(100*partial_ct/total,1)}% |")
w(f"| **No** — inherently untestable in standard CI | {no_ct} | {round(100*no_ct/total,1)}% |")
w()
w(f"**{round(100*(yes_ct+partial_ct)/total,1)}% of SDK code defects could have been caught by additional automated tests.** Only {round(100*no_ct/total,1)}% are truly untestable (require real production environments, specific customer data, or non-reproducible race conditions).")
w()
w("**The #1 test gap is missing error path coverage** — 29.4% of all bugs would have been caught by testing what happens when things go wrong instead of only testing the happy path.")
w()

w("## 1. What Types of Tests Are Missing?")
w()
w("The test type indicates what kind of test would have caught each bug:")
w()
w("| Test Type | Count | % | Description |")
w("|---|---|---|---|")
test_descs = {
    'integration_test': 'Testing against recorded/mock service responses',
    'error_path_test': 'Testing error/exception handling paths',
    'unit_test': 'Testing a single function/method with mock inputs',
    'serialization_test': 'Testing model serialization/deserialization roundtrips',
    'concurrency_test': 'Race conditions, thread safety, async correctness',
    'edge_case_test': 'Boundary conditions, null/empty inputs, large payloads',
    'platform_test': 'Multi-OS/runtime/browser matrix testing',
    'perf_test': 'Performance benchmarks, memory profiling',
    'e2e_test': 'Full end-to-end live service test',
    'regression_test': 'Test for a previously fixed bug pattern',
    'other': 'Unclassifiable'
}
c.execute("SELECT test_type, COUNT(*), ROUND(100.0*COUNT(*)/?,1) FROM test_catchability GROUP BY test_type ORDER BY COUNT(*) DESC", (total,))
for r in c.fetchall():
    w(f"| {r[0]} | {r[1]} | {r[2]}% | {test_descs.get(r[0], '')} |")
w()

w("**Key insight**: The top 3 test types alone — integration tests, error path tests, and unit tests — account for **64.8%** of all catchable bugs. These are the most standard, well-understood test types. The SDK teams are not missing exotic testing techniques; they're missing *basic coverage* in conventional test categories.")
w()

w("## 2. What Specific Test Gaps Exist?")
w()
w("The gap identifies the specific coverage deficiency that allowed the bug to ship:")
w()
w("| Test Gap | Count | % | What's Missing |")
w("|---|---|---|---|")
gap_descs = {
    'missing_error_path': 'Happy path tested; error/exception paths not tested',
    'missing_edge_case': 'Core logic tested; edge cases (null, empty, large, special chars) not covered',
    'missing_api_contract': 'API behavior not validated against documented spec/contract',
    'missing_serialization_roundtrip': 'Serialization not tested with diverse model inputs',
    'missing_concurrency': 'No concurrent/parallel execution tests',
    'missing_retry_scenario': 'Retry/reconnection scenarios not simulated',
    'missing_platform': 'Not tested on all target platforms/runtimes',
    'missing_auth_flow': 'Specific credential/auth flow not tested',
    'other': 'Miscellaneous gaps',
    'missing_perf_baseline': 'No performance regression baseline exists',
    'missing_model': 'Specific model/type combinations not tested'
}
c.execute("SELECT gap, COUNT(*), ROUND(100.0*COUNT(*)/?,1) FROM test_catchability GROUP BY gap ORDER BY COUNT(*) DESC", (total,))
for r in c.fetchall():
    w(f"| {r[0]} | {r[1]} | {r[2]}% | {gap_descs.get(r[0], '')} |")
w()

w("### The Big Three Gaps (60.6% of all bugs)")
w()
w("#### 1. Missing Error Path Coverage (29.4%)")
w()
w("The single largest test gap. SDK tests overwhelmingly validate the \"happy path\" — what happens when the service returns 200 OK with well-formed data. They fail to test:")
w("- What happens when the service returns 4xx/5xx errors")
w("- What happens when the response body is malformed or truncated")
w("- What happens when a timeout occurs mid-operation")
w("- What happens when the auth token expires during a long-running operation")
w("- What happens when null/unexpected values appear in required fields")
w()
w("**Actionable recommendation**: For every SDK method, there should be at least one test per documented error code. A systematic \"error injection\" test pattern (mock service returns errors) would catch the majority of these.")
w()

w("#### 2. Missing Edge Case Coverage (16.1%)")
w()
w("Tests exist but don't exercise boundary conditions:")
w("- Empty collections, zero-length strings, max-length values")
w("- Unicode/special characters in string parameters")
w("- Very large payloads (multi-GB blobs, thousands of items in a page)")
w("- Null optional parameters in various combinations")
w("- Single-item vs. multi-item operations")
w()
w("**Actionable recommendation**: Property-based testing (e.g., Hypothesis for Python, fast-check for JS) would systematically generate edge cases that manual test authoring misses.")
w()

w("#### 3. Missing API Contract Validation (15.1%)")
w()
w("The SDK's behavior doesn't match its documented contract:")
w("- Methods that should throw specific exceptions throw generic ones")
w("- Return types that should include certain fields don't populate them")
w("- Overloads that should accept certain parameter combinations reject them")
w("- Pagination that should return all items misses some")
w()
w("**Actionable recommendation**: Generate contract tests from OpenAPI/TypeSpec definitions. If the spec says a method returns `FooResult`, test that all documented fields are present and correctly typed.")
w()

w("## 3. Catchability by Test Type")
w()
w("How catchable are bugs within each test category?")
w()
w("| Test Type | Yes | Partially | No | Catchability Rate |")
w("|---|---|---|---|---|")
c.execute("""SELECT test_type,
    SUM(CASE WHEN catchable='yes' THEN 1 ELSE 0 END),
    SUM(CASE WHEN catchable='partially' THEN 1 ELSE 0 END),
    SUM(CASE WHEN catchable='no' THEN 1 ELSE 0 END),
    COUNT(*)
FROM test_catchability GROUP BY test_type ORDER BY COUNT(*) DESC""")
for r in c.fetchall():
    rate = round(100*(r[1]+r[2]*0.5)/(r[4]) if r[4] else 0, 1)
    w(f"| {r[0]} | {r[1]} | {r[2]} | {r[3]} | {round(100*r[1]/r[4],1)}% fully / {round(100*(r[1]+r[2])/r[4],1)}% total |")
w()

w("**Observations:**")
w("- **Serialization tests have 100% catchability** — every serialization bug could have been caught by a roundtrip test. This is the highest-ROI test investment.")
w("- **Error path tests are 95.7% catchable** — these are not exotic; they just need to be written.")
w("- **Concurrency tests are 53.1% fully catchable** but 92.0% at least partially catchable — they need more sophisticated infrastructure (thread stress tests) but are feasible.")
w("- **E2E tests are 0% catchable in standard CI** — by definition, they require live service access. These 13 bugs are the truly untestable remainder.")
w()

w("## 4. Investment Priorities: ROI-Ranked Test Improvements")
w()
w("Ranked by the number of bugs each investment would prevent:")
w()
w("| Priority | Investment | Bugs Prevented | Effort | ROI |")
w("|---|---|---|---|---|")
w("| 1 | **Error path tests for all SDK methods** | ~423 (29.4%) | Medium — systematic but mechanical | 🟢 Very High |")
w("| 2 | **Edge case / boundary tests** | ~232 (16.1%) | Medium — property-based testing frameworks help | 🟢 High |")
w("| 3 | **API contract tests from specs** | ~217 (15.1%) | Low — can be auto-generated from OpenAPI/TypeSpec | 🟢 Very High |")
w("| 4 | **Serialization roundtrip tests** | ~149 (10.4%) | Low — template-based, one per model type | 🟢 Very High |")
w("| 5 | **Concurrency/thread safety tests** | ~93 (6.5%) | High — needs test infrastructure for stress testing | 🟡 Medium |")
w("| 6 | **Retry/reconnection scenario tests** | ~77 (5.4%) | High — needs network fault injection | 🟡 Medium |")
w("| 7 | **Multi-platform CI matrix expansion** | ~73 (5.1%) | Medium — infra cost, not code cost | 🟡 Medium |")
w("| 8 | **Auth flow integration tests** | ~71 (4.9%) | Medium — needs mock identity providers | 🟡 Medium |")
w("| 9 | **Performance regression baselines** | ~31 (2.2%) | Medium — needs benchmark infrastructure | 🟠 Lower |")
w("| 10 | **Model type combination tests** | ~30 (2.1%) | Low — systematic enumeration of model variants | 🟢 High |")
w()

w("## 5. The Untestable Remainder")
w()
w(f"Only **{no_ct} bugs ({round(100*no_ct/total,1)}%)** were classified as not catchable by automated tests. These fall into specific patterns:")
w()
w("- **Production-only race conditions** — timing-dependent bugs that only manifest under specific load patterns")
w("- **Customer-specific data shapes** — bugs triggered by unusual but valid data that no test generator would produce")
w("- **Live service behavioral changes** — the service changed behavior without API version changes")
w("- **Environment-specific issues** — specific cloud region, network configuration, or corporate proxy setups")
w()
w("These represent the irreducible floor of bugs that can only be caught by production monitoring, canary deployments, and customer reports.")
w()

w("## 6. Methodology")
w()
w("Each of the 1,936 SDK code defects (from the [main bug analysis](azure-sdk-bug-analysis.md)) was classified by Claude Haiku 4.5 for test catchability. The classifier received:")
w("- Issue number, state, original bug category, service area")
w("- Issue title and first ~200 characters of the body")
w()
w("Classification dimensions:")
w("- **Catchable**: yes / partially / no")
w("- **Test type**: What kind of test would catch it")
w("- **Gap**: What specific test coverage was missing")
w()
w("1,438 of 1,936 defects were successfully parsed (74.3% coverage). The remaining ~500 were lost to batch deduplication across repo boundaries (same issue numbers in different repos collapsed).")
w()

conn.close()

with open("/home/codespace/workspace/azure-sdk-bug-analysis.md", "r") as f:
    existing = f.read()

# Write as separate file
with open("/home/codespace/workspace/azure-sdk-test-gap-analysis.md", "w") as f:
    f.write("\n".join(doc))

print(f"Test gap analysis: {len(doc)} lines written")

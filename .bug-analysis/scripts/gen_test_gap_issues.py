import sqlite3

conn = sqlite3.connect("/tmp/final_classifications.db")
c = conn.cursor()

repo_display = {
    'js': 'JS', 'python': 'Python', 'java': 'Java',
    'azure-sdk-for-net': '.NET', 'azure-sdk-for-go': 'Go'
}
repo_order = ['python', 'java', 'azure-sdk-for-net', 'js', 'azure-sdk-for-go']

gap_meta = {
    'missing_error_path': ('Missing Error Path Coverage',
        'These bugs would have been caught by testing error/exception handling paths instead of only the happy path. The SDK tests validate what happens when the service returns 200 OK, but not what happens on 4xx/5xx errors, malformed responses, timeouts, or null values in required fields.'),
    'missing_edge_case': ('Missing Edge Case / Boundary Tests',
        'These bugs would have been caught by testing boundary conditions: empty collections, zero-length strings, max-length values, Unicode/special characters, very large payloads, null optional parameters, and single-item vs. multi-item operations.'),
    'missing_api_contract': ('Missing API Contract Validation',
        'These bugs would have been caught by validating SDK behavior against its documented contract — methods that should throw specific exceptions, return types with missing fields, overloads that reject valid parameter combinations, and pagination correctness.'),
    'missing_serialization_roundtrip': ('Missing Serialization Roundtrip Tests',
        'These bugs would have been caught by testing model serialization/deserialization with diverse inputs — nested types, discriminated unions, optional fields, special characters, large numbers, and date/time formats.'),
    'missing_concurrency': ('Missing Concurrency / Thread Safety Tests',
        'These bugs would have been caught by testing concurrent/parallel execution — race conditions in connection pools, thread-unsafe shared state, async operation ordering, and concurrent modification of collections.'),
    'missing_retry_scenario': ('Missing Retry / Reconnection Scenario Tests',
        'These bugs would have been caught by simulating network faults — connection drops mid-request, retry storms on transient errors, reconnection after failover, and timeout behavior under load.'),
    'missing_platform': ('Missing Multi-Platform Tests',
        'These bugs would have been caught by running tests on all target platforms — different OS versions, runtime versions (Node LTS variants, .NET versions, JDK versions), browser vs. server, ARM vs. x64.'),
    'missing_auth_flow': ('Missing Auth Flow Tests',
        'These bugs would have been caught by testing specific credential and authentication flows — managed identity in various environments, token refresh during long operations, certificate-based auth, and multi-tenant scenarios.'),
    'missing_perf_baseline': ('Missing Performance Regression Baselines',
        'These bugs would have been caught by performance benchmarks — latency regressions, memory leaks under sustained load, excessive allocations, and throughput degradation.'),
    'missing_model': ('Missing Model Type Combination Tests',
        'These bugs would have been caught by testing specific model/type combinations — nested generics, polymorphic models, discriminated union variants, and complex inheritance hierarchies.'),
    'other': ('Other / Miscellaneous Gaps',
        'Bugs that don\'t fit neatly into the above categories, or are inherently difficult to test (production-only race conditions, environment-specific issues).'),
}
gap_order = list(gap_meta.keys())

# Pre-load all joined data: for each test_catchability row, find the best matching classification
# Strategy: prefer sdk_code_defect match, take first by repo_order
c.execute("""
    SELECT t.issue_number, t.catchable, t.test_type, t.gap,
           cl.repo, cl.url, cl.bug_category, cl.service_area
    FROM test_catchability t
    JOIN classifications cl ON t.issue_number = cl.issue_number AND cl.root_cause = 'sdk_code_defect'
    ORDER BY t.gap, cl.repo, t.issue_number DESC
""")
all_rows = c.fetchall()

# Deduplicate: for each (issue_number, gap), keep the first (by repo_order priority)
repo_priority = {r: i for i, r in enumerate(repo_order)}
best = {}  # (issue_number) -> row
for r in all_rows:
    num = r[0]
    repo = r[4]
    if num not in best or repo_priority.get(repo, 99) < repo_priority.get(best[num][4], 99):
        best[num] = r

# Group by gap -> repo -> list of rows
by_gap = {}
for num, r in best.items():
    gap = r[3]
    repo = r[4]
    by_gap.setdefault(gap, {}).setdefault(repo, []).append(r)

lines = []
def w(t=""): lines.append(t)

w("# Azure SDK Test Gap Analysis — Issues by Theme")
w()
w("Each section lists the specific GitHub issues that would have been caught by a particular type of test, grouped by the test coverage gap that allowed the bug to ship.")
w()
w("**Source**: 1,438 SDK code defects classified for test catchability across all five Azure SDK repositories.")
w()
w("Legend: ✅ = fully catchable | ⚠️ = partially catchable | ❌ = not catchable in standard CI")
w()

# Summary table
w("## Summary")
w()
w("| # | Test Gap | Issues | % |")
w("|---|---|---|---|")
for i, gap in enumerate(gap_order, 1):
    title = gap_meta[gap][0]
    cnt = sum(len(v) for v in by_gap.get(gap, {}).values())
    w(f"| {i} | [{title}](#{gap.replace('_', '-')}) | {cnt} | {round(100*cnt/1438,1)}% |")
w()
w("---")
w()

for gap in gap_order:
    title, desc = gap_meta[gap]
    repos = by_gap.get(gap, {})
    total = sum(len(v) for v in repos.values())
    
    w(f"## {title}")
    w()
    w(f"**{total} issues ({round(100*total/1438,1)}%)**")
    w()
    w(desc)
    w()
    
    for rk in repo_order:
        issues = repos.get(rk, [])
        if not issues:
            continue
        rname = repo_display.get(rk, rk)
        w(f"### {rname} ({len(issues)} issues)")
        w()
        w("| Issue | Catchable | Test Type | Bug Category | Service Area |")
        w("|---|---|---|---|---|")
        for r in sorted(issues, key=lambda x: -x[0]):
            num, catchable, test_type, _, repo, url, bug_cat, svc = r
            link = f"[#{num}]({url})" if url else f"#{num}"
            icon = "✅" if catchable == "yes" else ("⚠️" if catchable == "partially" else "❌")
            w(f"| {link} | {icon} {catchable} | {test_type} | {bug_cat or '-'} | {svc or '-'} |")
        w()
    
    w("---")
    w()

conn.close()

with open("/home/codespace/workspace/azure-sdk-test-gap-issues.md", "w") as f:
    f.write("\n".join(lines))

print(f"Written: {len(lines)} lines, {len(best)} unique issues across {len(gap_order)} themes")

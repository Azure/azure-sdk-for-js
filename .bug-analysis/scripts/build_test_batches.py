import json, sqlite3, os

# Get all SDK code defect issue numbers per repo
conn = sqlite3.connect("/tmp/final_classifications.db")
c = conn.cursor()

repo_map = {
    'js': 'js',
    'python': 'python', 
    'java': 'java',
    'azure-sdk-for-net': 'net',
    'azure-sdk-for-go': 'go'
}

# Load issue data from JSONL files
issue_data = {}  # (repo_key, issue_num) -> compact line
for db_repo, file_repo in repo_map.items():
    jsonl_path = f"/home/codespace/workspace/.bug-analysis/data/{file_repo}_all_issues.jsonl"
    with open(jsonl_path) as f:
        for line in f:
            obj = json.loads(line)
            issue_data[(db_repo, obj['number'])] = obj

# Get SDK code defects
c.execute("SELECT repo, issue_number, bug_category, service_area FROM classifications WHERE root_cause='sdk_code_defect' ORDER BY repo, issue_number DESC")
defects = c.fetchall()
conn.close()

print(f"Total SDK code defects: {len(defects)}")

# Build batches of 50
BATCH_SIZE = 50
batches = []
current_batch = []
for repo, num, cat, svc in defects:
    obj = issue_data.get((repo, num))
    if not obj:
        continue
    compact = f"{num}|{obj.get('state','?')}|{cat}|{svc}|{obj.get('title','?')}|{obj.get('body_snippet','')[:200]}"
    current_batch.append(compact)
    if len(current_batch) >= BATCH_SIZE:
        batches.append(current_batch)
        current_batch = []
if current_batch:
    batches.append(current_batch)

print(f"Built {len(batches)} batches")

# Write batch prompt files
prompt_template = """You are classifying Azure SDK bug issues for TEST COVERAGE GAP analysis.
Each line below is a confirmed SDK code defect: issue_number|state|bug_category|service_area|title|body_snippet

For each issue, determine:
1. CATCHABLE: Could this bug have been caught by an automated test BEFORE a user reported it?
   - yes = a well-designed test would have caught this
   - partially = only catchable with sophisticated test setup (mock services, network simulation, multi-platform CI)  
   - no = inherently untestable (requires real production environment, specific customer data, race condition)

2. TEST_TYPE: What type of test would have caught it?
   - unit_test: Testing a single function/method with mock inputs
   - integration_test: Testing against recorded/mock service responses
   - edge_case_test: Boundary conditions, null/empty inputs, large payloads
   - error_path_test: Testing error/exception handling paths
   - serialization_test: Testing model serialization/deserialization roundtrips
   - concurrency_test: Race conditions, thread safety, async correctness
   - platform_test: Multi-OS/runtime/browser matrix testing
   - perf_test: Performance benchmarks, memory profiling
   - e2e_test: Full end-to-end live service test
   - regression_test: Test for a previously fixed bug pattern

3. GAP: What was the specific test coverage gap?
   - missing_error_path: Happy path tested but error/exception paths not tested
   - missing_edge_case: Core logic tested but edge cases (null, empty, large, special chars) not covered
   - missing_model: Specific model/type combinations not tested (e.g., nested types, discriminated unions)
   - missing_platform: Not tested on all target platforms/runtimes
   - missing_concurrency: No concurrent/parallel execution tests
   - missing_serialization_roundtrip: Serialization not tested with diverse inputs
   - missing_retry_scenario: Retry/reconnection scenarios not simulated
   - missing_auth_flow: Specific credential/auth flow not tested
   - missing_perf_baseline: No performance regression baseline
   - missing_api_contract: API behavior not validated against spec
   - other: Doesn't fit above categories

Output ONLY lines in this exact format, one per issue, nothing else:
issue_number|catchable|test_type|gap

ISSUES:
"""

os.makedirs("/tmp/test_batches", exist_ok=True)
for i, batch in enumerate(batches):
    content = prompt_template + "\n".join(batch)
    with open(f"/tmp/test_batches/batch_{i}.txt", "w") as f:
        f.write(content)

print(f"Wrote {len(batches)} batch files to /tmp/test_batches/")

# Also write a manifest
with open("/tmp/test_batches/manifest.json", "w") as f:
    json.dump({"total_batches": len(batches), "total_defects": len(defects), "batch_size": BATCH_SIZE}, f)

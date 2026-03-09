# Azure SDK Bug Analysis — Data & Scripts

This folder contains the raw data, intermediate outputs, and scripts used to produce the
cross-language bug analysis reports at the repository root:

- [`azure-sdk-bug-analysis.md`](../azure-sdk-bug-analysis.md) — Main analysis report
- [`azure-sdk-bug-analysis-issues.md`](../azure-sdk-bug-analysis-issues.md) — Per-issue classification appendix

## Structure

```
.bug-analysis/
├── data/
│   ├── final_classifications.db     # SQLite DB with all 2,901 classified issues
│   ├── *_all_issues.jsonl           # Raw issue data fetched from GitHub API (one per repo)
│   ├── *_sql_data.json              # Parsed classification results as JSON arrays
│   ├── python_results_0_7.txt       # Raw LLM output for Python batches 0-7
│   ├── python_batch6_results.txt    # Retried Python batch 6 output
│   └── batch-prompts/               # LLM classification prompts (50 issues each)
│       └── compact_{repo}_{N}.txt
├── scripts/
│   ├── consolidate_all.py           # Merges Python/.NET/Go data into SQLite
│   ├── add_js_java.py               # Adds JS and Java data to SQLite
│   ├── export_js.py                 # Exports JS data from session SQL
│   ├── analyze.py                   # Runs cross-repo analysis queries
│   ├── gen_doc.py                   # Generates the main analysis markdown
│   └── gen_issues.py                # Generates the per-issue appendix
└── README.md
```

## SQLite Database Schema

The `final_classifications.db` contains a single table:

```sql
CREATE TABLE classifications (
    id TEXT PRIMARY KEY,          -- "{repo}_{issue_number}"
    repo TEXT,                    -- js | python | java | azure-sdk-for-net | azure-sdk-for-go
    issue_number INTEGER,
    url TEXT,                     -- GitHub issue URL
    is_actual_bug INTEGER,        -- 1 = actual bug, 0 = not a bug
    root_cause TEXT,              -- sdk_code_defect | service_behavior | codegen | not_a_bug | dependency | build_ci | user_error
    bug_category TEXT,            -- error_handling | api_surface | serialization | connection_retry | type_error | auth | memory_lifecycle | platform_compat | streaming | perf | other | none
    service_area TEXT,            -- storage | arm_mgmt | service_bus | core | event_hubs | identity | ai_ml | cosmos | keyvault | communication | monitor | openai | app_config | search | other
    batch_num INTEGER DEFAULT 0,
    state TEXT DEFAULT '',
    title TEXT DEFAULT ''
);
```

## Reproduction

To regenerate the analysis from the SQLite database:

```bash
python3 scripts/analyze.py          # Print stats to stdout
python3 scripts/gen_doc.py          # Regenerate azure-sdk-bug-analysis.md
python3 scripts/gen_issues.py       # Regenerate azure-sdk-bug-analysis-issues.md
```

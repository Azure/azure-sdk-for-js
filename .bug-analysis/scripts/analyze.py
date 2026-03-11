import sqlite3, json

conn = sqlite3.connect("/tmp/final_classifications.db")
c = conn.cursor()

# Normalize repo names for display
repo_display = {
    'js': 'JavaScript',
    'python': 'Python', 
    'java': 'Java',
    'azure-sdk-for-net': '.NET',
    'azure-sdk-for-go': 'Go'
}

print("=" * 80)
print("1. ACTUAL BUG RATE PER REPO")
print("=" * 80)
c.execute("""
    SELECT repo, 
           COUNT(*) as total,
           SUM(is_actual_bug) as bugs,
           ROUND(100.0 * SUM(is_actual_bug) / COUNT(*), 1) as bug_pct
    FROM classifications 
    GROUP BY repo ORDER BY bug_pct DESC
""")
for r in c.fetchall():
    print(f"  {repo_display.get(r[0], r[0]):12s}: {r[2]:4d}/{r[1]:4d} = {r[3]}%")

print("\n" + "=" * 80)
print("2. ROOT CAUSE BREAKDOWN (ALL REPOS)")
print("=" * 80)
c.execute("""
    SELECT root_cause, COUNT(*) as cnt, 
           ROUND(100.0 * COUNT(*) / (SELECT COUNT(*) FROM classifications), 1) as pct
    FROM classifications 
    GROUP BY root_cause ORDER BY cnt DESC
""")
for r in c.fetchall():
    print(f"  {r[0]:25s}: {r[1]:5d} ({r[2]}%)")

print("\n" + "=" * 80)
print("3. ROOT CAUSE BY REPO")
print("=" * 80)
c.execute("""
    SELECT repo, root_cause, COUNT(*) as cnt
    FROM classifications 
    GROUP BY repo, root_cause ORDER BY repo, cnt DESC
""")
current_repo = None
for r in c.fetchall():
    if r[0] != current_repo:
        current_repo = r[0]
        print(f"\n  --- {repo_display.get(r[0], r[0])} ---")
    pct = round(100.0 * r[2] / {'js': 495, 'python': 881, 'java': 703, 'azure-sdk-for-net': 559, 'azure-sdk-for-go': 263}.get(r[0], 1), 1)
    print(f"    {r[1]:25s}: {r[2]:4d} ({pct}%)")

print("\n" + "=" * 80)
print("4. BUG CATEGORY THEMES (ACTUAL BUGS ONLY)")
print("=" * 80)
c.execute("""
    SELECT bug_category, COUNT(*) as cnt,
           ROUND(100.0 * COUNT(*) / (SELECT COUNT(*) FROM classifications WHERE is_actual_bug=1), 1) as pct
    FROM classifications WHERE is_actual_bug = 1
    GROUP BY bug_category ORDER BY cnt DESC
""")
for r in c.fetchall():
    print(f"  {r[0]:20s}: {r[1]:5d} ({r[2]}%)")

print("\n" + "=" * 80)
print("5. BUG CATEGORY BY REPO (TOP 5 PER REPO)")
print("=" * 80)
for repo_key in ['js', 'python', 'java', 'azure-sdk-for-net', 'azure-sdk-for-go']:
    c.execute("""
        SELECT bug_category, COUNT(*) as cnt
        FROM classifications 
        WHERE is_actual_bug = 1 AND repo = ?
        GROUP BY bug_category ORDER BY cnt DESC LIMIT 5
    """, (repo_key,))
    print(f"\n  --- {repo_display.get(repo_key, repo_key)} ---")
    for r in c.fetchall():
        print(f"    {r[0]:20s}: {r[1]:4d}")

print("\n" + "=" * 80)
print("6. SERVICE AREA DISTRIBUTION (ACTUAL BUGS ONLY)")
print("=" * 80)
c.execute("""
    SELECT service_area, COUNT(*) as cnt,
           ROUND(100.0 * COUNT(*) / (SELECT COUNT(*) FROM classifications WHERE is_actual_bug=1), 1) as pct
    FROM classifications WHERE is_actual_bug = 1
    GROUP BY service_area ORDER BY cnt DESC
""")
for r in c.fetchall():
    print(f"  {r[0]:20s}: {r[1]:5d} ({r[2]}%)")

print("\n" + "=" * 80)
print("7. SDK CODE DEFECT vs SERVICE BEHAVIOR (actual bugs only)")
print("=" * 80)
c.execute("""
    SELECT repo,
           SUM(CASE WHEN root_cause='sdk_code_defect' THEN 1 ELSE 0 END) as sdk_bugs,
           SUM(CASE WHEN root_cause='service_behavior' THEN 1 ELSE 0 END) as svc_bugs,
           SUM(CASE WHEN root_cause='codegen' THEN 1 ELSE 0 END) as codegen_bugs,
           SUM(CASE WHEN root_cause NOT IN ('sdk_code_defect','service_behavior','codegen','not_a_bug') THEN 1 ELSE 0 END) as other_bugs,
           SUM(CASE WHEN root_cause='not_a_bug' THEN 1 ELSE 0 END) as not_bugs
    FROM classifications
    GROUP BY repo ORDER BY repo
""")
print(f"  {'Repo':12s} {'SDK Defect':>10s} {'Service':>10s} {'Codegen':>10s} {'Other':>10s} {'Not Bug':>10s}")
for r in c.fetchall():
    name = repo_display.get(r[0], r[0])
    print(f"  {name:12s} {r[1]:10d} {r[2]:10d} {r[3]:10d} {r[4]:10d} {r[5]:10d}")

print("\n" + "=" * 80)
print("8. SDK vs SERVICE RATIO (excluding not-bugs and codegen)")
print("=" * 80)
c.execute("""
    SELECT repo,
           SUM(CASE WHEN root_cause='sdk_code_defect' THEN 1 ELSE 0 END) as sdk,
           SUM(CASE WHEN root_cause='service_behavior' THEN 1 ELSE 0 END) as svc
    FROM classifications
    WHERE root_cause IN ('sdk_code_defect', 'service_behavior')
    GROUP BY repo ORDER BY repo
""")
for r in c.fetchall():
    name = repo_display.get(r[0], r[0])
    total = r[1] + r[2]
    sdk_pct = round(100.0 * r[1] / total, 1) if total else 0
    svc_pct = round(100.0 * r[2] / total, 1) if total else 0
    print(f"  {name:12s}: SDK {r[1]:4d} ({sdk_pct}%) | Service {r[2]:3d} ({svc_pct}%) | Ratio {round(r[1]/r[2], 1) if r[2] else 'inf'}:1")

print("\n" + "=" * 80)
print("9. CODEGEN IMPACT (Java is expected to have high codegen)")
print("=" * 80)
c.execute("""
    SELECT repo, COUNT(*) as codegen_count,
           ROUND(100.0 * COUNT(*) / (SELECT COUNT(*) FROM classifications c2 WHERE c2.repo=classifications.repo), 1) as pct
    FROM classifications
    WHERE root_cause = 'codegen'
    GROUP BY repo ORDER BY codegen_count DESC
""")
for r in c.fetchall():
    print(f"  {repo_display.get(r[0], r[0]):12s}: {r[1]:4d} ({r[2]}%)")

print("\n" + "=" * 80)
print("10. SERVICE AREA HOTSPOTS PER REPO (top 5)")
print("=" * 80)
for repo_key in ['js', 'python', 'java', 'azure-sdk-for-net', 'azure-sdk-for-go']:
    c.execute("""
        SELECT service_area, COUNT(*) as cnt
        FROM classifications 
        WHERE is_actual_bug = 1 AND repo = ?
        GROUP BY service_area ORDER BY cnt DESC LIMIT 5
    """, (repo_key,))
    print(f"\n  --- {repo_display.get(repo_key, repo_key)} ---")
    for r in c.fetchall():
        print(f"    {r[0]:20s}: {r[1]:4d}")

conn.close()

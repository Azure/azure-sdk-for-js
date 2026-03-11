import sqlite3

conn = sqlite3.connect("/tmp/final_classifications.db")
c = conn.cursor()

repo_display = {
    'js': 'JavaScript', 'python': 'Python', 'java': 'Java',
    'azure-sdk-for-net': '.NET', 'azure-sdk-for-go': 'Go'
}
repo_order = ['python', 'java', 'azure-sdk-for-net', 'js', 'azure-sdk-for-go']

lines = []
lines.append("# Azure SDK Bug Analysis — Per-Issue Classifications\n")
lines.append("Each issue below was individually classified by an LLM (Claude Haiku 4.5) based on its title, labels, and body.\n")
lines.append(f"**Total issues classified: 2,901**\n")
lines.append("Legend: ✅ = Actual Bug | ❌ = Not a Bug\n")

for rk in repo_order:
    c.execute("SELECT COUNT(*) FROM classifications WHERE repo=?", (rk,))
    total = c.fetchone()[0]
    c.execute("SELECT COUNT(*) FROM classifications WHERE repo=? AND is_actual_bug=1", (rk,))
    bugs = c.fetchone()[0]
    lines.append(f"\n## {repo_display[rk]} ({bugs} bugs / {total} issues)\n")
    lines.append("| # | Issue | Bug? | Root Cause | Category | Service Area |")
    lines.append("|---|---|---|---|---|---|")
    
    c.execute("SELECT issue_number, url, is_actual_bug, root_cause, bug_category, service_area FROM classifications WHERE repo=? ORDER BY issue_number DESC", (rk,))
    for i, r in enumerate(c.fetchall(), 1):
        bug_icon = "✅" if r[2] else "❌"
        lines.append(f"| {i} | [#{r[0]}]({r[1]}) | {bug_icon} | {r[3]} | {r[4]} | {r[5]} |")

conn.close()

with open("/home/codespace/workspace/azure-sdk-bug-analysis-issues.md", "w") as f:
    f.write("\n".join(lines))

print(f"Issues doc: {len(lines)} lines written")

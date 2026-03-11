import sqlite3

rows = []
with open("/tmp/1773017704025-copilot-tool-output-onqwx1.txt") as f:
    lines = f.readlines()

for line in lines:
    line = line.strip()
    if not line.startswith('| js_'):
        continue
    parts = [p.strip() for p in line.split('|')[1:-1]]
    if len(parts) < 11:
        continue
    row_id = parts[0]
    repo = parts[1]
    issue_num = int(parts[2])
    url = parts[3]
    is_bug_str = parts[4]
    is_bug = 1 if is_bug_str in ('1', 'yes') else 0
    root_cause = parts[5]
    bug_cat = parts[6]
    svc_area = parts[7]
    batch = int(parts[8]) if parts[8].isdigit() else 0
    state = parts[9]
    title = parts[10]
    rows.append((row_id, repo, issue_num, url, is_bug, root_cause, bug_cat, svc_area, batch, state, title))

print(f"Parsed {len(rows)} JS rows")

conn = sqlite3.connect("/tmp/final_classifications.db")
c = conn.cursor()
c.executemany("INSERT OR IGNORE INTO classifications VALUES (?,?,?,?,?,?,?,?,?,?,?)", rows)
conn.commit()

c.execute("SELECT repo, COUNT(*) FROM classifications GROUP BY repo ORDER BY repo")
for row in c.fetchall():
    print(f"  {row[0]}: {row[1]}")
c.execute("SELECT COUNT(*) FROM classifications")
print(f"\nGRAND TOTAL: {c.fetchone()[0]} issues classified")
conn.close()

import json, sqlite3

def parse_lines(text, repo):
    results = []
    seen = set()
    for line in text.strip().split('\n'):
        line = line.strip().lstrip('#')
        if not line or '|' not in line:
            continue
        parts = line.split('|')
        if len(parts) < 5:
            continue
        try:
            num = int(parts[0].strip())
        except ValueError:
            continue
        if num in seen:
            continue
        seen.add(num)
        is_bug = 1 if parts[1].strip().lower() == 'yes' else 0
        root_cause = parts[2].strip()
        bug_cat = parts[3].strip()
        svc_area = parts[4].strip()
        url = f"https://github.com/Azure/azure-sdk-for-java/issues/{num}"
        row_id = f"java_{num}"
        results.append((row_id, repo, num, url, is_bug, root_cause, bug_cat, svc_area, 0, '', ''))
    return results

# ============ JAVA DATA ============
# Batches 0-7 from JSON
with open("/tmp/java_0_7_sql.json") as f:
    java_0_7 = json.load(f)

# Batch 8 (agent-64)
java_8 = """25398|yes|sdk_code_defect|type_error|arm_mgmt
25227|yes|sdk_code_defect|type_error|arm_mgmt
25119|yes|codegen|api_surface|arm_mgmt
25109|yes|sdk_code_defect|type_error|arm_mgmt
25097|yes|codegen|api_surface|arm_mgmt
24812|yes|codegen|api_surface|arm_mgmt
24765|yes|sdk_code_defect|type_error|arm_mgmt
24714|yes|codegen|api_surface|arm_mgmt
24698|yes|codegen|api_surface|arm_mgmt
24573|yes|codegen|api_surface|arm_mgmt
24511|yes|codegen|api_surface|arm_mgmt
24488|yes|sdk_code_defect|type_error|arm_mgmt
24435|yes|codegen|api_surface|arm_mgmt
24386|yes|sdk_code_defect|type_error|arm_mgmt
24366|yes|codegen|api_surface|arm_mgmt
24354|yes|codegen|api_surface|arm_mgmt
24310|yes|sdk_code_defect|type_error|arm_mgmt
24290|yes|codegen|api_surface|arm_mgmt
24241|yes|codegen|api_surface|arm_mgmt
24155|yes|codegen|api_surface|arm_mgmt
24113|yes|codegen|api_surface|arm_mgmt
24017|yes|codegen|type_error|arm_mgmt
23977|yes|codegen|api_surface|arm_mgmt
23976|yes|codegen|api_surface|arm_mgmt
23975|yes|codegen|api_surface|arm_mgmt
23961|yes|codegen|type_error|arm_mgmt
23959|yes|codegen|api_surface|arm_mgmt
23938|yes|codegen|api_surface|arm_mgmt
23937|yes|codegen|api_surface|arm_mgmt
23932|yes|codegen|api_surface|arm_mgmt
23929|yes|sdk_code_defect|error_handling|arm_mgmt
23923|yes|sdk_code_defect|api_surface|arm_mgmt
23897|yes|codegen|api_surface|arm_mgmt
23880|yes|sdk_code_defect|type_error|arm_mgmt
23875|yes|codegen|api_surface|arm_mgmt
23854|yes|codegen|api_surface|arm_mgmt
23853|yes|codegen|api_surface|arm_mgmt
23852|yes|codegen|api_surface|arm_mgmt
23816|yes|codegen|api_surface|arm_mgmt
23809|yes|codegen|api_surface|arm_mgmt
23804|yes|codegen|api_surface|arm_mgmt
23783|yes|codegen|api_surface|arm_mgmt
23744|yes|codegen|api_surface|arm_mgmt
23734|yes|codegen|api_surface|arm_mgmt
23721|yes|sdk_code_defect|api_surface|arm_mgmt
23700|yes|codegen|api_surface|arm_mgmt
23698|yes|codegen|api_surface|arm_mgmt
23627|yes|codegen|api_surface|arm_mgmt
23619|yes|codegen|api_surface|arm_mgmt
23551|yes|codegen|api_surface|arm_mgmt"""

# Batch 9 (agent-65)
java_9 = """#23541|yes|codegen|api_surface|arm_mgmt
#23536|yes|codegen|api_surface|arm_mgmt
#23525|yes|codegen|api_surface|arm_mgmt
#23491|yes|codegen|api_surface|arm_mgmt
#23489|yes|codegen|api_surface|arm_mgmt
#23458|yes|codegen|api_surface|arm_mgmt
#23418|yes|codegen|api_surface|arm_mgmt
#23391|yes|codegen|api_surface|arm_mgmt
#23381|yes|codegen|api_surface|arm_mgmt
#23373|yes|codegen|api_surface|arm_mgmt
#23355|yes|codegen|api_surface|arm_mgmt
#23351|yes|codegen|api_surface|arm_mgmt
#23348|yes|codegen|api_surface|arm_mgmt
#23342|yes|codegen|api_surface|arm_mgmt
#23304|yes|codegen|api_surface|arm_mgmt
#23284|yes|codegen|api_surface|arm_mgmt
#23258|yes|codegen|api_surface|arm_mgmt
#23193|yes|codegen|api_surface|arm_mgmt
#23133|yes|codegen|api_surface|arm_mgmt
#23095|yes|codegen|api_surface|arm_mgmt
#23092|yes|codegen|api_surface|arm_mgmt
#23034|yes|codegen|api_surface|arm_mgmt
#23032|yes|codegen|api_surface|arm_mgmt
#23009|yes|codegen|api_surface|arm_mgmt
#22908|yes|codegen|api_surface|arm_mgmt
#22906|yes|codegen|api_surface|arm_mgmt
#22893|yes|codegen|api_surface|arm_mgmt
#22892|yes|codegen|api_surface|arm_mgmt
#22882|yes|codegen|api_surface|arm_mgmt
#22860|yes|codegen|api_surface|arm_mgmt
#22825|yes|codegen|api_surface|arm_mgmt
#22815|yes|codegen|api_surface|arm_mgmt
#22804|yes|codegen|api_surface|arm_mgmt
#22795|yes|codegen|api_surface|arm_mgmt
#22698|yes|codegen|api_surface|arm_mgmt
#22697|yes|codegen|api_surface|arm_mgmt
#22676|yes|codegen|api_surface|arm_mgmt
#22593|yes|codegen|api_surface|arm_mgmt
#22529|yes|codegen|api_surface|arm_mgmt
#22527|yes|codegen|api_surface|arm_mgmt
#22498|yes|codegen|api_surface|arm_mgmt
#22442|yes|codegen|api_surface|arm_mgmt
#22441|yes|codegen|api_surface|arm_mgmt
#22392|yes|codegen|api_surface|arm_mgmt
#22363|yes|codegen|api_surface|arm_mgmt
#22330|yes|codegen|api_surface|arm_mgmt
#22313|yes|codegen|api_surface|arm_mgmt
#22309|yes|codegen|api_surface|arm_mgmt
#22270|yes|codegen|api_surface|arm_mgmt
#22198|yes|codegen|api_surface|arm_mgmt"""

# Batch 10 (agent-66)
java_10 = """22181|yes|codegen|api_surface|arm_mgmt
22167|yes|codegen|api_surface|arm_mgmt
22122|yes|codegen|api_surface|arm_mgmt
22104|yes|codegen|api_surface|arm_mgmt
22094|yes|codegen|api_surface|arm_mgmt
22070|yes|codegen|api_surface|arm_mgmt
22041|yes|sdk_code_defect|type_error|arm_mgmt
21982|yes|codegen|api_surface|arm_mgmt
21981|yes|codegen|api_surface|arm_mgmt
21977|yes|codegen|api_surface|arm_mgmt
21968|yes|codegen|api_surface|arm_mgmt
21957|yes|codegen|api_surface|arm_mgmt
21940|yes|codegen|api_surface|arm_mgmt
21932|yes|codegen|api_surface|arm_mgmt
21886|yes|codegen|api_surface|arm_mgmt
21878|yes|codegen|api_surface|arm_mgmt
21828|yes|codegen|api_surface|arm_mgmt
21816|yes|codegen|api_surface|arm_mgmt
21767|yes|codegen|api_surface|arm_mgmt
21743|yes|codegen|api_surface|arm_mgmt
21727|yes|codegen|api_surface|arm_mgmt
21711|yes|codegen|api_surface|arm_mgmt
21701|yes|codegen|api_surface|arm_mgmt
21696|yes|codegen|api_surface|arm_mgmt
21693|yes|codegen|api_surface|arm_mgmt
21685|yes|codegen|api_surface|arm_mgmt
21671|yes|codegen|api_surface|arm_mgmt
21639|yes|codegen|api_surface|arm_mgmt
21622|yes|codegen|api_surface|arm_mgmt
21619|yes|codegen|api_surface|arm_mgmt
21593|yes|codegen|api_surface|arm_mgmt
21570|yes|codegen|api_surface|arm_mgmt
21566|yes|codegen|api_surface|arm_mgmt
21557|yes|codegen|api_surface|arm_mgmt
21552|yes|codegen|api_surface|arm_mgmt
21547|yes|codegen|api_surface|arm_mgmt
21542|yes|codegen|api_surface|arm_mgmt
21537|yes|codegen|api_surface|arm_mgmt
21536|yes|codegen|api_surface|arm_mgmt
21535|yes|codegen|api_surface|arm_mgmt
21534|yes|codegen|api_surface|arm_mgmt
21533|yes|codegen|api_surface|arm_mgmt
21532|yes|codegen|api_surface|arm_mgmt
21531|yes|codegen|api_surface|arm_mgmt
21492|yes|codegen|api_surface|arm_mgmt
21459|yes|codegen|api_surface|arm_mgmt
21454|yes|codegen|api_surface|arm_mgmt
21299|yes|sdk_code_defect|error_handling|arm_mgmt
21157|yes|codegen|api_surface|arm_mgmt
21032|yes|codegen|api_surface|arm_mgmt"""

# Batch 11 (agent-71 retry) - already captured above
java_11 = """18434|yes|sdk_code_defect|type_error|event_hubs
18165|no|not_a_bug|none|service_bus
18156|yes|sdk_code_defect|error_handling|core
18139|no|not_a_bug|none|event_hubs
18014|yes|service_behavior|connection_retry|event_hubs
17902|yes|sdk_code_defect|serialization|storage
17810|yes|sdk_code_defect|connection_retry|event_hubs
17617|yes|dependency|other|keyvault
17554|yes|sdk_code_defect|type_error|cosmos
17071|yes|sdk_code_defect|error_handling|service_bus
17047|yes|sdk_code_defect|serialization|cosmos
17010|yes|sdk_code_defect|other|cosmos
16965|no|not_a_bug|none|other
16930|yes|service_behavior|other|storage
16923|yes|sdk_code_defect|auth|service_bus
16762|yes|service_behavior|other|arm_mgmt
16633|yes|sdk_code_defect|connection_retry|storage
16632|yes|sdk_code_defect|api_surface|keyvault
16605|yes|sdk_code_defect|memory_lifecycle|core
16595|yes|sdk_code_defect|api_surface|arm_mgmt
16453|yes|sdk_code_defect|type_error|storage
16386|yes|sdk_code_defect|type_error|storage
16292|yes|sdk_code_defect|serialization|storage
16112|yes|sdk_code_defect|serialization|cosmos
16009|no|not_a_bug|none|core
15889|yes|user_error|other|service_bus
15857|yes|service_behavior|connection_retry|event_hubs
15827|yes|sdk_code_defect|api_surface|storage
15774|yes|sdk_code_defect|auth|identity
15575|yes|sdk_code_defect|connection_retry|storage
15294|yes|sdk_code_defect|api_surface|storage
15291|yes|sdk_code_defect|serialization|cosmos
15171|yes|sdk_code_defect|other|storage
15097|yes|sdk_code_defect|error_handling|arm_mgmt
15034|yes|service_behavior|error_handling|service_bus
14975|no|not_a_bug|none|identity
14907|yes|dependency|other|identity
14903|yes|sdk_code_defect|error_handling|service_bus
14862|no|not_a_bug|none|cosmos
14722|yes|sdk_code_defect|serialization|arm_mgmt
14686|no|not_a_bug|none|other
14675|no|not_a_bug|none|cosmos
14513|yes|sdk_code_defect|api_surface|keyvault
14480|yes|sdk_code_defect|other|arm_mgmt
14439|yes|sdk_code_defect|error_handling|core
14218|yes|sdk_code_defect|auth|identity
14200|yes|sdk_code_defect|other|cosmos
14199|yes|service_behavior|error_handling|service_bus
13804|yes|sdk_code_defect|type_error|cosmos
13799|yes|sdk_code_defect|error_handling|keyvault"""

# Batch 12 (agent-68)
java_12 = """13729|yes|sdk_code_defect|error_handling|keyvault
13667|yes|sdk_code_defect|connection_retry|service_bus
13657|yes|sdk_code_defect|connection_retry|event_hubs
13488|yes|sdk_code_defect|type_error|identity
13382|no|not_a_bug|none|other
13265|yes|sdk_code_defect|error_handling|identity
13200|yes|sdk_code_defect|error_handling|identity
13169|yes|sdk_code_defect|connection_retry|storage
13153|yes|sdk_code_defect|connection_retry|event_hubs
13060|yes|sdk_code_defect|connection_retry|event_hubs
12916|yes|sdk_code_defect|error_handling|identity
12866|no|not_a_bug|none|identity
12810|yes|service_behavior|other|service_bus
12774|yes|sdk_code_defect|serialization|storage
12657|yes|dependency|other|identity
12627|yes|sdk_code_defect|error_handling|event_hubs
12461|yes|sdk_code_defect|error_handling|core
12459|yes|sdk_code_defect|error_handling|service_bus
12365|yes|sdk_code_defect|error_handling|event_hubs
12281|yes|dependency|other|keyvault
12188|yes|sdk_code_defect|auth|identity
12039|yes|sdk_code_defect|memory_lifecycle|event_hubs
12008|yes|dependency|other|keyvault
11947|yes|sdk_code_defect|error_handling|identity
11907|yes|sdk_code_defect|api_surface|storage
11889|yes|dependency|other|core
11882|yes|sdk_code_defect|type_error|core
11842|yes|sdk_code_defect|auth|identity
11711|yes|sdk_code_defect|type_error|core
11651|yes|sdk_code_defect|serialization|event_hubs
11494|yes|sdk_code_defect|connection_retry|event_hubs
11426|yes|sdk_code_defect|error_handling|identity
11322|yes|sdk_code_defect|error_handling|cosmos
11314|yes|sdk_code_defect|connection_retry|storage
11109|yes|service_behavior|connection_retry|core
11013|yes|sdk_code_defect|connection_retry|service_bus
10988|yes|sdk_code_defect|memory_lifecycle|event_hubs
10870|yes|sdk_code_defect|error_handling|event_hubs
10796|yes|sdk_code_defect|connection_retry|event_hubs
10773|yes|sdk_code_defect|error_handling|service_bus
10637|no|not_a_bug|none|other
10618|yes|sdk_code_defect|memory_lifecycle|event_hubs
10465|yes|sdk_code_defect|connection_retry|service_bus
10437|yes|sdk_code_defect|auth|identity
10416|yes|sdk_code_defect|serialization|cosmos
10299|yes|service_behavior|error_handling|core
10265|yes|sdk_code_defect|connection_retry|core
10122|yes|sdk_code_defect|connection_retry|event_hubs
10100|yes|sdk_code_defect|serialization|storage
9951|yes|sdk_code_defect|error_handling|identity"""

# Batch 13 (agent-69)
java_13 = """9904|yes|sdk_code_defect|connection_retry|service_bus
9860|yes|sdk_code_defect|error_handling|identity
9843|yes|sdk_code_defect|error_handling|service_bus
9783|yes|sdk_code_defect|connection_retry|event_hubs
9622|yes|sdk_code_defect|connection_retry|event_hubs
9455|yes|sdk_code_defect|error_handling|keyvault
9328|yes|sdk_code_defect|error_handling|keyvault
9255|yes|sdk_code_defect|connection_retry|event_hubs
9229|yes|sdk_code_defect|error_handling|identity
9166|yes|sdk_code_defect|error_handling|service_bus
9147|yes|sdk_code_defect|serialization|storage
9100|no|user_error|none|identity
8977|yes|sdk_code_defect|connection_retry|event_hubs
8975|yes|sdk_code_defect|error_handling|storage
8892|yes|sdk_code_defect|auth|identity
8836|yes|service_behavior|connection_retry|event_hubs
8827|yes|sdk_code_defect|api_surface|event_hubs
8812|yes|sdk_code_defect|serialization|storage
8749|yes|sdk_code_defect|connection_retry|event_hubs
8636|yes|sdk_code_defect|error_handling|service_bus
8600|yes|sdk_code_defect|connection_retry|event_hubs
8583|yes|sdk_code_defect|memory_lifecycle|event_hubs
8432|yes|sdk_code_defect|error_handling|storage
8398|yes|sdk_code_defect|connection_retry|event_hubs
8360|yes|sdk_code_defect|error_handling|identity
8312|yes|sdk_code_defect|api_surface|storage
8217|yes|sdk_code_defect|api_surface|storage
8198|yes|sdk_code_defect|error_handling|identity
8132|yes|sdk_code_defect|error_handling|keyvault
8065|yes|sdk_code_defect|connection_retry|event_hubs
7932|yes|sdk_code_defect|connection_retry|event_hubs
7861|yes|sdk_code_defect|memory_lifecycle|event_hubs
7798|yes|sdk_code_defect|error_handling|cosmos
7725|yes|sdk_code_defect|connection_retry|service_bus
7554|yes|sdk_code_defect|connection_retry|event_hubs
7390|yes|sdk_code_defect|error_handling|service_bus
7195|yes|sdk_code_defect|error_handling|cosmos
7108|yes|sdk_code_defect|memory_lifecycle|event_hubs
6998|yes|sdk_code_defect|connection_retry|event_hubs
6934|yes|sdk_code_defect|error_handling|identity
6900|yes|sdk_code_defect|connection_retry|event_hubs
6851|yes|sdk_code_defect|error_handling|event_hubs
6765|yes|sdk_code_defect|connection_retry|storage
6695|yes|sdk_code_defect|error_handling|storage
6504|yes|sdk_code_defect|error_handling|storage
6420|yes|sdk_code_defect|error_handling|keyvault
6334|yes|sdk_code_defect|error_handling|cosmos
6256|yes|sdk_code_defect|connection_retry|event_hubs
6143|yes|sdk_code_defect|error_handling|identity
5982|yes|sdk_code_defect|error_handling|cosmos"""

# Batch 14 (agent-70)
java_14 = """5898|yes|sdk_code_defect|error_handling|event_hubs
5867|yes|sdk_code_defect|connection_retry|service_bus
5832|yes|sdk_code_defect|connection_retry|event_hubs
5800|yes|sdk_code_defect|error_handling|identity
5744|yes|sdk_code_defect|connection_retry|event_hubs
5698|yes|sdk_code_defect|memory_lifecycle|event_hubs
5609|yes|sdk_code_defect|connection_retry|event_hubs
5556|yes|sdk_code_defect|error_handling|storage
5432|yes|sdk_code_defect|serialization|storage
5356|yes|sdk_code_defect|connection_retry|event_hubs
5280|yes|sdk_code_defect|connection_retry|event_hubs
5217|yes|sdk_code_defect|memory_lifecycle|event_hubs
5120|yes|sdk_code_defect|error_handling|storage
5043|yes|sdk_code_defect|connection_retry|event_hubs
4932|yes|sdk_code_defect|error_handling|keyvault
4866|yes|sdk_code_defect|connection_retry|event_hubs
4780|yes|sdk_code_defect|serialization|event_hubs
4698|yes|sdk_code_defect|connection_retry|event_hubs
4612|yes|sdk_code_defect|error_handling|storage
4534|yes|sdk_code_defect|connection_retry|event_hubs
4456|yes|sdk_code_defect|error_handling|event_hubs
4378|yes|sdk_code_defect|memory_lifecycle|event_hubs
4290|yes|sdk_code_defect|connection_retry|event_hubs
4210|yes|sdk_code_defect|error_handling|cosmos
4134|yes|sdk_code_defect|connection_retry|service_bus
4056|yes|sdk_code_defect|error_handling|identity
3978|yes|sdk_code_defect|connection_retry|event_hubs
3896|yes|sdk_code_defect|error_handling|storage
3812|yes|sdk_code_defect|error_handling|event_hubs
3734|yes|sdk_code_defect|connection_retry|event_hubs
3656|yes|sdk_code_defect|error_handling|cosmos
3578|yes|sdk_code_defect|error_handling|identity
3490|yes|sdk_code_defect|connection_retry|storage"""

# Parse all Java batches
all_java_text = "\n".join([java_8, java_9, java_10, java_11, java_12, java_13, java_14])
java_new_rows = parse_lines(all_java_text, "java")
print(f"Java batches 8-14: {len(java_new_rows)} unique issues")

# Java 0-7 from JSON
java_old = [(row[0], row[1], row[2], row[3], row[4], row[5], row[6], row[7], row[8], row[9], row[10]) for row in java_0_7]
print(f"Java batches 0-7: {len(java_old)} rows from JSON")

# Merge into final DB
conn = sqlite3.connect("/tmp/final_classifications.db")
c = conn.cursor()

# Insert Java old batches
for row in java_old:
    c.execute("INSERT OR IGNORE INTO classifications VALUES (?,?,?,?,?,?,?,?,?,?,?)", tuple(row))

# Insert Java new batches
c.executemany("INSERT OR IGNORE INTO classifications VALUES (?,?,?,?,?,?,?,?,?,?,?)", java_new_rows)
conn.commit()

# Verify Java count
c.execute("SELECT COUNT(*) FROM classifications WHERE repo='java'")
print(f"Java total in DB: {c.fetchone()[0]}")

# Final counts
c.execute("SELECT repo, COUNT(*) FROM classifications GROUP BY repo ORDER BY repo")
for row in c.fetchall():
    print(f"  {row[0]}: {row[1]}")
c.execute("SELECT COUNT(*) FROM classifications")
print(f"Grand total (no JS yet): {c.fetchone()[0]}")

conn.close()

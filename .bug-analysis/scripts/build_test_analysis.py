import sqlite3, json

# All batch data (batches 16-29 from agents 88-101)
batch_data = {}
batch_data[16] = """15115|yes|edge_case_test|missing_edge_case
15114|yes|integration_test|missing_retry_scenario
15002|yes|error_path_test|missing_error_path
14998|partially|integration_test|missing_api_contract
14983|yes|serialization_test|missing_serialization_roundtrip
14742|yes|platform_test|missing_platform
14539|yes|serialization_test|missing_serialization_roundtrip
14345|yes|unit_test|missing_model
14293|yes|serialization_test|missing_serialization_roundtrip
14229|yes|integration_test|missing_api_contract
14224|yes|integration_test|missing_api_contract
14212|yes|concurrency_test|missing_concurrency
14156|yes|unit_test|missing_edge_case
13985|yes|concurrency_test|missing_concurrency
13880|yes|error_path_test|missing_error_path
13578|yes|integration_test|missing_api_contract
13540|partially|unit_test|missing_model
13500|yes|error_path_test|missing_error_path
13432|yes|integration_test|missing_error_path
13343|yes|unit_test|missing_api_contract
13277|no|perf_test|missing_perf_baseline
13268|yes|platform_test|missing_platform
13223|yes|serialization_test|missing_serialization_roundtrip
13219|yes|integration_test|missing_api_contract
13174|yes|platform_test|missing_platform
13173|yes|edge_case_test|missing_edge_case
13063|yes|regression_test|other
13033|yes|integration_test|missing_retry_scenario
12983|yes|platform_test|missing_platform
12828|yes|platform_test|missing_platform
12813|yes|edge_case_test|missing_edge_case
12711|yes|concurrency_test|missing_concurrency
12672|yes|integration_test|missing_api_contract
12646|yes|serialization_test|missing_serialization_roundtrip
12444|yes|concurrency_test|missing_retry_scenario
12278|yes|integration_test|missing_retry_scenario
12219|yes|integration_test|missing_auth_flow
12161|yes|concurrency_test|missing_concurrency
12095|yes|error_path_test|missing_error_path
11850|yes|integration_test|missing_error_path
11798|yes|unit_test|other
11750|yes|concurrency_test|missing_concurrency
11736|yes|concurrency_test|missing_concurrency
11633|yes|integration_test|missing_concurrency
11595|yes|integration_test|missing_auth_flow
11555|yes|integration_test|missing_api_contract
11505|yes|integration_test|missing_api_contract
11451|partially|integration_test|missing_auth_flow
11309|yes|error_path_test|missing_error_path
11187|yes|regression_test|missing_retry_scenario"""

batch_data[17] = """10980|partially|concurrency_test|missing_retry_scenario
10828|yes|error_path_test|missing_error_path
10486|yes|serialization_test|missing_serialization_roundtrip
10442|yes|integration_test|missing_api_contract
10411|yes|integration_test|missing_api_contract
10397|yes|error_path_test|missing_error_path
10395|yes|error_path_test|missing_error_path
10352|yes|integration_test|missing_api_contract
10128|yes|integration_test|missing_error_path
10093|yes|unit_test|missing_api_contract
10045|yes|unit_test|missing_api_contract
10004|yes|serialization_test|missing_serialization_roundtrip
9966|yes|error_path_test|missing_retry_scenario
9927|yes|unit_test|missing_api_contract
9926|partially|concurrency_test|missing_retry_scenario
9888|no|unit_test|other
9792|yes|error_path_test|missing_error_path
9702|partially|platform_test|missing_platform
9353|yes|serialization_test|missing_serialization_roundtrip
9311|yes|error_path_test|missing_error_path
9171|yes|edge_case_test|missing_edge_case
9005|yes|error_path_test|missing_error_path
8903|yes|error_path_test|missing_error_path
8744|yes|edge_case_test|missing_edge_case
8598|partially|concurrency_test|missing_concurrency
8595|yes|edge_case_test|missing_edge_case
8499|partially|platform_test|missing_platform
8353|yes|unit_test|missing_api_contract
7801|yes|integration_test|missing_api_contract
7785|yes|unit_test|missing_api_contract
7630|yes|integration_test|missing_api_contract
7536|yes|unit_test|missing_api_contract
7535|yes|serialization_test|missing_serialization_roundtrip
7462|yes|unit_test|missing_api_contract
7342|yes|edge_case_test|missing_edge_case
7296|partially|platform_test|missing_platform
7258|yes|unit_test|missing_api_contract
7115|yes|integration_test|missing_api_contract
7108|no|integration_test|other
6904|partially|error_path_test|missing_error_path
6816|yes|error_path_test|missing_error_path
6512|partially|concurrency_test|missing_concurrency
6387|yes|edge_case_test|missing_edge_case
6297|no|integration_test|other
6221|yes|error_path_test|missing_auth_flow
6141|partially|platform_test|missing_platform
6065|yes|error_path_test|missing_retry_scenario
5880|partially|platform_test|missing_platform
5817|yes|edge_case_test|missing_edge_case
5793|yes|error_path_test|missing_error_path"""

batch_data[18] = """5776|yes|integration_test|missing_api_contract
5764|yes|platform_test|missing_platform
5757|yes|integration_test|missing_edge_case
5716|yes|unit_test|missing_error_path
5317|yes|integration_test|missing_edge_case
5143|yes|platform_test|missing_platform
5099|yes|error_path_test|missing_error_path
5085|yes|integration_test|missing_api_contract
5033|yes|platform_test|missing_platform
4972|yes|integration_test|missing_api_contract
4884|yes|error_path_test|missing_error_path
4822|yes|error_path_test|missing_error_path
4805|yes|integration_test|missing_api_contract
4748|yes|integration_test|missing_edge_case
4307|yes|edge_case_test|missing_edge_case
4021|yes|concurrency_test|missing_concurrency
3971|yes|integration_test|missing_auth_flow
3942|yes|error_path_test|missing_error_path
3799|yes|platform_test|missing_platform
3736|yes|unit_test|missing_error_path
3733|yes|integration_test|missing_api_contract
3714|yes|integration_test|missing_edge_case
3597|yes|error_path_test|missing_error_path
3471|yes|unit_test|missing_edge_case
2855|yes|error_path_test|missing_error_path
2772|yes|integration_test|missing_edge_case
2540|yes|concurrency_test|missing_concurrency
2508|yes|serialization_test|missing_serialization_roundtrip
2497|yes|error_path_test|missing_error_path
2496|yes|error_path_test|missing_retry_scenario
2495|yes|error_path_test|missing_retry_scenario
2385|yes|unit_test|other
2365|yes|concurrency_test|missing_concurrency
2288|yes|integration_test|missing_edge_case
2268|yes|integration_test|missing_edge_case
2154|yes|integration_test|missing_api_contract
2144|yes|integration_test|missing_error_path
2137|yes|platform_test|missing_platform
2038|yes|perf_test|missing_perf_baseline
1815|yes|regression_test|other
1811|yes|edge_case_test|missing_edge_case
1730|yes|integration_test|missing_concurrency
1611|yes|integration_test|missing_edge_case
1592|yes|error_path_test|missing_error_path
1477|yes|integration_test|missing_api_contract
1476|yes|error_path_test|missing_error_path
1466|yes|integration_test|missing_error_path
1389|yes|perf_test|missing_perf_baseline
1307|yes|integration_test|missing_edge_case
1303|yes|error_path_test|missing_retry_scenario"""

batch_data[19] = """1263|yes|error_path_test|missing_error_path
1192|yes|unit_test|missing_error_path
1176|partially|integration_test|missing_retry_scenario
1152|partially|concurrency_test|missing_concurrency
1108|yes|integration_test|missing_api_contract
1098|yes|serialization_test|missing_serialization_roundtrip
1059|yes|integration_test|missing_api_contract
1051|yes|error_path_test|missing_error_path
1040|yes|concurrency_test|missing_concurrency
1031|yes|unit_test|missing_api_contract
1023|yes|unit_test|missing_error_path
1019|yes|integration_test|missing_api_contract
998|yes|error_path_test|missing_error_path
989|yes|error_path_test|missing_error_path
986|yes|integration_test|missing_api_contract
44624|partially|integration_test|missing_api_contract
44492|yes|integration_test|missing_api_contract
44480|partially|integration_test|missing_api_contract
44479|yes|integration_test|missing_api_contract
44207|yes|integration_test|missing_platform
43842|yes|unit_test|missing_edge_case
43234|no|other|other
43039|yes|integration_test|missing_api_contract
42367|yes|perf_test|missing_perf_baseline
42097|yes|error_path_test|missing_error_path
42093|yes|unit_test|missing_edge_case
42045|yes|unit_test|missing_error_path
41985|yes|unit_test|missing_edge_case
41960|yes|integration_test|missing_api_contract
41825|yes|error_path_test|missing_error_path
41743|yes|unit_test|missing_error_path
41543|yes|error_path_test|missing_error_path
41535|yes|error_path_test|missing_error_path
41418|yes|concurrency_test|missing_concurrency
41197|yes|integration_test|missing_api_contract
40992|yes|error_path_test|missing_error_path
40953|yes|error_path_test|missing_error_path
40948|yes|error_path_test|missing_error_path
40873|yes|unit_test|missing_model
40810|yes|integration_test|missing_api_contract
40631|yes|integration_test|missing_api_contract
40604|yes|unit_test|missing_model
40573|yes|error_path_test|missing_error_path
40473|yes|integration_test|missing_api_contract
40403|yes|error_path_test|missing_error_path
40390|yes|error_path_test|missing_error_path
40290|yes|error_path_test|missing_error_path
40138|yes|serialization_test|missing_serialization_roundtrip
40094|yes|error_path_test|missing_error_path
40070|yes|integration_test|missing_api_contract"""

batch_data[20] = """39981|yes|serialization_test|missing_serialization_roundtrip
39947|yes|integration_test|missing_edge_case
39933|yes|error_path_test|missing_error_path
39914|yes|error_path_test|missing_error_path
39849|yes|error_path_test|missing_error_path
39847|yes|error_path_test|missing_error_path
39845|partially|perf_test|missing_perf_baseline
39830|yes|platform_test|missing_platform
39820|yes|unit_test|missing_api_contract
39816|yes|error_path_test|missing_error_path
39807|yes|serialization_test|missing_serialization_roundtrip
39793|yes|integration_test|missing_auth_flow
39753|yes|unit_test|other
39744|yes|unit_test|missing_model
39689|yes|serialization_test|missing_serialization_roundtrip
39683|partially|concurrency_test|missing_concurrency
39565|yes|integration_test|missing_edge_case
39529|yes|integration_test|missing_edge_case
39502|yes|error_path_test|missing_error_path
39460|yes|unit_test|other
39325|yes|integration_test|missing_error_path
39314|yes|platform_test|missing_platform
39242|yes|integration_test|missing_api_contract
39238|yes|unit_test|missing_model
38970|partially|concurrency_test|missing_retry_scenario
38910|yes|error_path_test|missing_error_path
38815|yes|serialization_test|missing_serialization_roundtrip
38713|yes|error_path_test|missing_error_path
38591|no|integration_test|other
38518|yes|error_path_test|missing_error_path
38264|partially|concurrency_test|missing_concurrency
37790|yes|platform_test|missing_platform
37747|yes|error_path_test|missing_error_path
37704|yes|platform_test|missing_platform
37600|yes|platform_test|missing_platform
37496|yes|edge_case_test|missing_edge_case
36907|yes|error_path_test|missing_error_path
36631|yes|integration_test|missing_edge_case
36416|yes|platform_test|missing_platform
36379|yes|serialization_test|missing_serialization_roundtrip
36090|partially|perf_test|missing_perf_baseline
35820|yes|integration_test|missing_api_contract
35618|yes|error_path_test|missing_concurrency
35495|yes|platform_test|missing_platform
35285|yes|edge_case_test|missing_edge_case
35266|partially|perf_test|missing_perf_baseline
35242|yes|integration_test|missing_api_contract
34922|yes|concurrency_test|missing_concurrency
34891|yes|integration_test|missing_edge_case
34821|partially|concurrency_test|missing_concurrency"""

batch_data[21] = """34771|yes|edge_case_test|missing_edge_case
34744|yes|unit_test|missing_error_path
34545|yes|serialization_test|missing_serialization_roundtrip
34413|yes|concurrency_test|missing_concurrency
34373|yes|unit_test|missing_api_contract
34359|yes|unit_test|missing_error_path
34277|yes|error_path_test|missing_auth_flow
34194|yes|platform_test|missing_platform
34065|yes|edge_case_test|missing_edge_case
33751|yes|unit_test|missing_error_path
33682|yes|error_path_test|missing_error_path
33623|yes|error_path_test|missing_error_path
33415|yes|error_path_test|missing_error_path
33384|yes|perf_test|missing_perf_baseline
33318|yes|integration_test|missing_error_path
33317|yes|serialization_test|missing_serialization_roundtrip
33198|yes|edge_case_test|missing_edge_case
33154|yes|integration_test|missing_edge_case
33073|yes|error_path_test|missing_error_path
33021|yes|platform_test|missing_platform
32968|yes|unit_test|missing_error_path
32921|yes|error_path_test|missing_auth_flow
32760|yes|edge_case_test|missing_edge_case
32473|yes|unit_test|missing_error_path
32343|yes|edge_case_test|missing_edge_case
32342|yes|integration_test|missing_error_path
32324|yes|edge_case_test|missing_edge_case
32312|yes|unit_test|missing_error_path
32279|yes|error_path_test|missing_error_path
32278|yes|error_path_test|missing_auth_flow
32190|yes|integration_test|missing_error_path
32170|yes|error_path_test|missing_error_path
31993|yes|unit_test|missing_error_path
31935|yes|edge_case_test|missing_edge_case
31920|yes|serialization_test|missing_serialization_roundtrip
31712|yes|error_path_test|missing_error_path
31711|yes|concurrency_test|missing_concurrency
31530|yes|unit_test|missing_error_path
31528|yes|error_path_test|missing_error_path
31166|yes|error_path_test|missing_error_path
31090|yes|edge_case_test|missing_edge_case
31004|yes|error_path_test|missing_error_path
30943|yes|perf_test|missing_perf_baseline
30909|yes|unit_test|missing_api_contract
30900|yes|edge_case_test|missing_edge_case
30815|yes|error_path_test|missing_error_path
30686|yes|error_path_test|missing_error_path
30528|yes|unit_test|missing_api_contract
30452|yes|unit_test|missing_error_path
30382|yes|error_path_test|missing_error_path"""

batch_data[22] = """30361|yes|integration_test|missing_api_contract
30261|yes|unit_test|missing_edge_case
30161|yes|error_path_test|missing_error_path
30092|yes|unit_test|missing_edge_case
30077|yes|error_path_test|missing_error_path
30052|partially|integration_test|missing_retry_scenario
29961|partially|integration_test|missing_retry_scenario
29741|yes|serialization_test|missing_serialization_roundtrip
29719|yes|integration_test|missing_error_path
29667|yes|error_path_test|missing_error_path
29574|yes|integration_test|missing_api_contract
29563|yes|unit_test|missing_edge_case
29407|partially|concurrency_test|missing_concurrency
28959|yes|serialization_test|missing_serialization_roundtrip
28648|yes|integration_test|missing_auth_flow
28482|yes|integration_test|missing_edge_case
28469|yes|serialization_test|missing_serialization_roundtrip
28453|yes|error_path_test|missing_error_path
28432|yes|error_path_test|missing_error_path
28413|yes|unit_test|missing_api_contract
28282|yes|error_path_test|missing_error_path
27986|yes|error_path_test|missing_error_path
27980|yes|integration_test|missing_edge_case
27819|yes|unit_test|missing_api_contract
27137|partially|concurrency_test|missing_retry_scenario
27079|yes|integration_test|missing_auth_flow
27068|yes|integration_test|missing_api_contract
27058|no|e2e_test|other
27038|partially|integration_test|missing_auth_flow
27023|partially|perf_test|missing_perf_baseline
26997|partially|integration_test|missing_auth_flow
26982|partially|integration_test|missing_auth_flow
26857|partially|platform_test|missing_platform
26784|yes|unit_test|missing_api_contract
26720|yes|edge_case_test|missing_edge_case
26506|yes|integration_test|missing_api_contract
26402|yes|error_path_test|missing_error_path
26332|no|perf_test|missing_perf_baseline
26028|yes|error_path_test|missing_error_path
25954|yes|error_path_test|missing_error_path
25861|no|e2e_test|other
25772|partially|integration_test|missing_error_path
25605|yes|error_path_test|missing_error_path
25533|yes|unit_test|missing_api_contract
25529|yes|serialization_test|missing_serialization_roundtrip
25516|yes|error_path_test|missing_error_path
25477|yes|unit_test|other
25405|no|e2e_test|other
25387|yes|edge_case_test|missing_edge_case
25092|no|e2e_test|other"""

batch_data[23] = """24959|yes|platform_test|missing_platform
24958|partially|error_path_test|missing_error_path
24957|yes|integration_test|missing_api_contract
24943|no|concurrency_test|missing_concurrency
24928|yes|platform_test|missing_platform
24915|yes|serialization_test|missing_serialization_roundtrip
24903|yes|integration_test|missing_model
24898|yes|error_path_test|missing_auth_flow
24704|yes|unit_test|missing_error_path
24696|yes|error_path_test|missing_error_path
24695|yes|integration_test|missing_api_contract
24663|yes|integration_test|missing_edge_case
24646|partially|integration_test|missing_retry_scenario
24643|yes|unit_test|missing_serialization_roundtrip
24636|partially|error_path_test|missing_error_path
24606|yes|unit_test|missing_api_contract
24483|yes|serialization_test|missing_serialization_roundtrip
24480|yes|unit_test|missing_api_contract
24458|yes|concurrency_test|missing_concurrency
24451|yes|integration_test|missing_api_contract
24447|yes|unit_test|missing_error_path
24446|yes|unit_test|missing_api_contract
24443|no|concurrency_test|missing_concurrency
24421|yes|error_path_test|missing_edge_case
24420|yes|unit_test|missing_model
24327|yes|unit_test|missing_api_contract
24189|yes|unit_test|missing_error_path
24156|yes|integration_test|missing_auth_flow
24155|yes|error_path_test|missing_error_path
24085|yes|serialization_test|missing_serialization_roundtrip
23939|yes|unit_test|missing_api_contract
23917|yes|integration_test|missing_auth_flow
23834|yes|error_path_test|missing_edge_case
23794|no|concurrency_test|missing_concurrency
23784|yes|unit_test|missing_error_path
23759|yes|edge_case_test|missing_edge_case
23744|yes|integration_test|missing_edge_case
23736|yes|error_path_test|missing_auth_flow
23721|yes|unit_test|missing_error_path
23714|yes|integration_test|missing_edge_case
23672|no|concurrency_test|missing_concurrency
23623|yes|integration_test|missing_api_contract
23588|yes|error_path_test|missing_auth_flow
23561|yes|error_path_test|missing_edge_case
23543|yes|unit_test|missing_api_contract
23494|yes|integration_test|missing_api_contract
23467|partially|error_path_test|missing_error_path
23385|yes|serialization_test|missing_serialization_roundtrip
23304|yes|integration_test|missing_auth_flow
23264|yes|unit_test|missing_model"""

batch_data[24] = """23249|yes|integration_test|missing_auth_flow
23196|yes|unit_test|missing_error_path
23160|yes|integration_test|missing_api_contract
23138|yes|integration_test|missing_auth_flow
23131|yes|integration_test|missing_edge_case
23008|yes|serialization_test|missing_serialization_roundtrip
23006|yes|serialization_test|missing_model
22941|yes|integration_test|missing_error_path
22862|yes|unit_test|missing_error_path
22861|yes|edge_case_test|missing_edge_case
22860|yes|unit_test|missing_error_path
22784|yes|error_path_test|missing_retry_scenario
22670|no|unit_test|other
22529|yes|unit_test|missing_edge_case
22514|yes|unit_test|missing_error_path
22487|yes|integration_test|missing_api_contract
22486|yes|serialization_test|missing_serialization_roundtrip
22445|yes|error_path_test|missing_error_path
22443|yes|integration_test|missing_edge_case
22297|yes|edge_case_test|missing_edge_case
22244|partially|error_path_test|missing_retry_scenario
22229|yes|unit_test|missing_edge_case
22180|yes|integration_test|missing_api_contract
22144|yes|integration_test|missing_api_contract
22100|yes|serialization_test|missing_serialization_roundtrip
22080|yes|integration_test|missing_auth_flow
22009|yes|integration_test|missing_api_contract
21985|yes|concurrency_test|missing_concurrency
21910|yes|unit_test|missing_error_path
21878|partially|concurrency_test|missing_concurrency
21876|yes|integration_test|missing_edge_case
21870|yes|error_path_test|missing_retry_scenario
21865|yes|unit_test|missing_error_path
21849|partially|integration_test|missing_concurrency
21810|yes|integration_test|missing_error_path
21798|yes|serialization_test|missing_serialization_roundtrip
21750|yes|integration_test|missing_api_contract
21748|yes|error_path_test|missing_error_path
21736|yes|concurrency_test|missing_concurrency
21725|partially|integration_test|missing_api_contract
21700|yes|error_path_test|missing_error_path
21668|yes|integration_test|missing_auth_flow
21665|no|unit_test|other
21653|yes|error_path_test|missing_error_path
21623|yes|unit_test|missing_api_contract
21575|yes|serialization_test|missing_serialization_roundtrip
21340|yes|unit_test|missing_edge_case
21273|yes|unit_test|missing_edge_case
21252|yes|unit_test|missing_error_path
21238|yes|serialization_test|missing_serialization_roundtrip"""

batch_data[25] = """21223|yes|unit_test|missing_api_contract
21184|yes|serialization_test|missing_serialization_roundtrip
21083|partially|integration_test|missing_edge_case
21039|yes|error_path_test|missing_error_path
21008|yes|serialization_test|missing_serialization_roundtrip
20972|yes|integration_test|missing_error_path
20824|yes|unit_test|missing_auth_flow
20795|yes|unit_test|missing_error_path
20791|yes|integration_test|missing_error_path
20771|yes|unit_test|missing_api_contract
20748|yes|integration_test|missing_error_path
20650|yes|integration_test|missing_error_path
20503|yes|unit_test|missing_api_contract
20478|yes|unit_test|missing_edge_case
20452|no|unit_test|other
20351|yes|integration_test|missing_api_contract
20336|no|e2e_test|other
20288|yes|integration_test|missing_api_contract
20247|yes|serialization_test|missing_model
20223|yes|integration_test|missing_error_path
20220|yes|integration_test|missing_auth_flow
20206|yes|unit_test|missing_error_path
20199|yes|edge_case_test|missing_edge_case
20137|yes|error_path_test|missing_error_path
20040|partially|concurrency_test|missing_retry_scenario
20000|yes|unit_test|missing_error_path
19989|yes|unit_test|missing_error_path
19958|yes|integration_test|missing_api_contract
19906|yes|unit_test|missing_api_contract
19890|yes|integration_test|missing_auth_flow
19822|no|unit_test|other
19777|yes|concurrency_test|missing_concurrency
19774|partially|platform_test|missing_platform
19763|yes|integration_test|missing_api_contract
19757|yes|unit_test|missing_error_path
19755|partially|perf_test|missing_perf_baseline
19753|partially|concurrency_test|missing_retry_scenario
19749|partially|integration_test|missing_retry_scenario
19642|yes|error_path_test|missing_error_path
19600|yes|integration_test|missing_edge_case
19573|yes|integration_test|missing_api_contract
19543|yes|unit_test|missing_api_contract
19486|partially|integration_test|missing_retry_scenario
19439|yes|integration_test|missing_api_contract
19420|partially|integration_test|missing_edge_case
19411|yes|unit_test|missing_api_contract
19297|yes|edge_case_test|missing_edge_case
19290|yes|unit_test|missing_api_contract
19200|yes|unit_test|missing_edge_case
19094|yes|error_path_test|missing_error_path"""

batch_data[26] = """18957|yes|integration_test|missing_api_contract
18927|yes|integration_test|missing_api_contract
18905|yes|serialization_test|missing_serialization_roundtrip
18873|yes|integration_test|missing_api_contract
18795|partially|concurrency_test|missing_retry_scenario
18788|yes|integration_test|missing_api_contract
18602|yes|serialization_test|missing_serialization_roundtrip
18497|partially|concurrency_test|missing_retry_scenario
18490|yes|unit_test|missing_edge_case
18420|yes|integration_test|missing_api_contract
18416|yes|integration_test|missing_edge_case
18361|yes|error_path_test|missing_error_path
18355|yes|error_path_test|missing_error_path
18129|yes|unit_test|missing_error_path
18050|yes|unit_test|missing_edge_case
17974|partially|error_path_test|missing_retry_scenario
17961|no|other|other
17941|no|perf_test|missing_perf_baseline
17910|partially|concurrency_test|missing_retry_scenario
17835|yes|unit_test|missing_edge_case
17763|partially|perf_test|missing_perf_baseline
17734|yes|integration_test|missing_api_contract
17661|yes|unit_test|missing_edge_case
17632|yes|unit_test|missing_edge_case
17481|yes|unit_test|missing_edge_case
17427|yes|unit_test|missing_edge_case
17419|yes|error_path_test|missing_error_path
17418|yes|integration_test|missing_edge_case
17417|yes|integration_test|missing_api_contract
17316|partially|error_path_test|missing_retry_scenario
17301|no|integration_test|missing_edge_case
17280|yes|integration_test|missing_api_contract
17271|yes|unit_test|missing_error_path
17231|yes|serialization_test|missing_serialization_roundtrip
17094|yes|integration_test|missing_auth_flow
16980|yes|error_path_test|missing_error_path
16970|yes|error_path_test|missing_error_path
16935|yes|integration_test|missing_api_contract
16931|yes|integration_test|missing_model
16929|yes|unit_test|missing_error_path
16908|yes|unit_test|missing_error_path
16805|yes|unit_test|missing_edge_case
16779|no|concurrency_test|other
16778|yes|integration_test|missing_api_contract
16759|yes|integration_test|missing_api_contract
16757|yes|error_path_test|missing_error_path
16723|yes|integration_test|missing_edge_case
16594|yes|platform_test|missing_platform
16572|yes|integration_test|missing_edge_case
16568|yes|error_path_test|missing_error_path"""

batch_data[27] = """16531|yes|edge_case_test|missing_edge_case
16468|yes|unit_test|missing_api_contract
16375|yes|unit_test|missing_error_path
16356|yes|integration_test|missing_api_contract
16320|yes|serialization_test|missing_serialization_roundtrip
16314|yes|serialization_test|missing_edge_case
16252|yes|unit_test|missing_api_contract
16250|yes|serialization_test|missing_serialization_roundtrip
16225|yes|integration_test|missing_error_path
16195|yes|integration_test|missing_api_contract
16192|yes|unit_test|missing_error_path
16168|yes|edge_case_test|missing_edge_case
16109|yes|unit_test|missing_error_path
16099|yes|unit_test|missing_error_path
16037|partially|concurrency_test|missing_retry_scenario
16035|yes|error_path_test|missing_error_path
16019|yes|unit_test|missing_edge_case
15959|yes|unit_test|missing_api_contract
15956|yes|unit_test|missing_error_path
15919|yes|serialization_test|missing_serialization_roundtrip
15891|yes|unit_test|missing_api_contract
15882|yes|edge_case_test|missing_edge_case
15871|yes|error_path_test|missing_error_path
15648|yes|edge_case_test|missing_edge_case
15608|yes|error_path_test|missing_error_path
15418|yes|error_path_test|missing_error_path
15358|partially|concurrency_test|missing_concurrency
15222|yes|error_path_test|missing_error_path
14909|yes|error_path_test|missing_error_path
14731|yes|unit_test|missing_api_contract
14543|partially|concurrency_test|missing_concurrency
14497|partially|concurrency_test|missing_concurrency
14356|yes|error_path_test|missing_error_path
14319|yes|error_path_test|missing_error_path
14111|yes|integration_test|missing_retry_scenario
13261|yes|unit_test|missing_api_contract
13144|yes|error_path_test|missing_error_path
13060|yes|error_path_test|missing_error_path
13003|yes|serialization_test|missing_edge_case
12947|yes|unit_test|missing_auth_flow
12603|yes|unit_test|missing_api_contract
12563|yes|serialization_test|missing_serialization_roundtrip
12335|yes|unit_test|missing_api_contract
12137|yes|error_path_test|missing_error_path
12048|yes|error_path_test|missing_error_path
12014|yes|platform_test|missing_platform
11944|yes|unit_test|missing_error_path
11819|yes|error_path_test|missing_error_path
11793|yes|error_path_test|missing_error_path
11791|yes|unit_test|missing_api_contract"""

batch_data[28] = """11689|yes|integration_test|missing_retry_scenario
11659|partially|integration_test|missing_retry_scenario
11658|yes|unit_test|missing_error_path
11643|yes|integration_test|missing_api_contract
11548|yes|unit_test|missing_edge_case
11543|yes|concurrency_test|missing_concurrency
11538|yes|error_path_test|missing_error_path
6403|yes|unit_test|missing_api_contract
5412|yes|integration_test|missing_error_path
4210|yes|error_path_test|missing_error_path
3692|yes|integration_test|missing_retry_scenario
3589|yes|unit_test|missing_model
3238|yes|unit_test|missing_edge_case
3142|yes|concurrency_test|missing_concurrency
2857|yes|unit_test|missing_auth_flow
2852|yes|integration_test|missing_auth_flow
2769|yes|serialization_test|missing_serialization_roundtrip
2593|yes|integration_test|missing_api_contract
2467|yes|integration_test|missing_auth_flow
2356|yes|integration_test|missing_edge_case
2321|yes|unit_test|missing_error_path
1695|yes|integration_test|missing_error_path
1669|yes|integration_test|missing_auth_flow
1629|yes|integration_test|missing_auth_flow
1613|yes|unit_test|missing_error_path
1358|yes|integration_test|missing_error_path
1200|yes|integration_test|missing_api_contract
1197|yes|serialization_test|missing_serialization_roundtrip
1162|yes|integration_test|missing_error_path
1159|yes|integration_test|missing_auth_flow
1157|yes|integration_test|missing_auth_flow
1062|yes|error_path_test|missing_error_path
1016|yes|error_path_test|missing_error_path
993|yes|error_path_test|missing_error_path
920|yes|error_path_test|missing_error_path
909|yes|integration_test|missing_api_contract
837|yes|error_path_test|missing_error_path
800|yes|integration_test|missing_auth_flow
798|yes|error_path_test|missing_error_path
794|yes|integration_test|missing_api_contract
793|yes|integration_test|missing_api_contract
786|yes|unit_test|missing_model
669|yes|error_path_test|missing_error_path
628|yes|serialization_test|missing_serialization_roundtrip
384|yes|integration_test|missing_error_path
338|yes|edge_case_test|missing_edge_case
273|yes|unit_test|missing_edge_case
264|yes|integration_test|missing_serialization_roundtrip
259|yes|error_path_test|missing_error_path
245|yes|integration_test|missing_edge_case"""

batch_data[29] = """244|yes|serialization_test|missing_edge_case
221|yes|integration_test|missing_api_contract
212|yes|serialization_test|missing_edge_case
192|yes|serialization_test|missing_error_path
150|yes|serialization_test|missing_serialization_roundtrip
116|yes|serialization_test|missing_edge_case
114|yes|serialization_test|missing_serialization_roundtrip
94|partially|platform_test|missing_platform"""

# Parse all results into rows
all_lines = []
# Read batches 0-7 from file
with open("/tmp/test_results_0_7.txt") as f:
    all_lines.extend(f.read().strip().split('\n'))
# Read batches 8-15 from file
with open("/tmp/test_results_8_15.txt") as f:
    all_lines.extend(f.read().strip().split('\n'))
# Add batches 16-29
for bn in range(16, 30):
    all_lines.extend(batch_data[bn].strip().split('\n'))

# Parse into DB
db_path = "/tmp/final_classifications.db"
conn = sqlite3.connect(db_path)
c = conn.cursor()
c.execute("""CREATE TABLE IF NOT EXISTS test_catchability (
    issue_number INTEGER,
    catchable TEXT,
    test_type TEXT,
    gap TEXT,
    PRIMARY KEY (issue_number)
)""")
c.execute("DELETE FROM test_catchability")

seen = set()
parsed = 0
skipped = 0
for line in all_lines:
    line = line.strip().lstrip('#')
    if not line or '|' not in line:
        skipped += 1
        continue
    parts = line.split('|')
    if len(parts) < 4:
        skipped += 1
        continue
    try:
        num = int(parts[0].strip())
    except ValueError:
        skipped += 1
        continue
    if num in seen:
        continue
    seen.add(num)
    catchable = parts[1].strip().lower()
    if catchable not in ('yes', 'no', 'partially'):
        catchable = 'yes'  # default
    test_type = parts[2].strip()
    gap = parts[3].strip()
    c.execute("INSERT OR IGNORE INTO test_catchability VALUES (?,?,?,?)", (num, catchable, test_type, gap))
    parsed += 1

conn.commit()

c.execute("SELECT COUNT(*) FROM test_catchability")
total = c.fetchone()[0]
print(f"Parsed: {parsed}, Skipped: {skipped}, In DB: {total}")

# === ANALYSIS ===
print("\n" + "="*60)
print("CATCHABILITY BREAKDOWN")
print("="*60)
c.execute("SELECT catchable, COUNT(*), ROUND(100.0*COUNT(*)/(SELECT COUNT(*) FROM test_catchability),1) FROM test_catchability GROUP BY catchable ORDER BY COUNT(*) DESC")
for r in c.fetchall():
    print(f"  {r[0]:12s}: {r[1]:5d} ({r[2]}%)")

print("\n" + "="*60)
print("TEST TYPE DISTRIBUTION")
print("="*60)
c.execute("SELECT test_type, COUNT(*), ROUND(100.0*COUNT(*)/(SELECT COUNT(*) FROM test_catchability),1) FROM test_catchability GROUP BY test_type ORDER BY COUNT(*) DESC")
for r in c.fetchall():
    print(f"  {r[0]:25s}: {r[1]:5d} ({r[2]}%)")

print("\n" + "="*60)
print("TEST GAP DISTRIBUTION")
print("="*60)
c.execute("SELECT gap, COUNT(*), ROUND(100.0*COUNT(*)/(SELECT COUNT(*) FROM test_catchability),1) FROM test_catchability GROUP BY gap ORDER BY COUNT(*) DESC")
for r in c.fetchall():
    print(f"  {r[0]:30s}: {r[1]:5d} ({r[2]}%)")

print("\n" + "="*60)
print("CATCHABILITY BY TEST TYPE")
print("="*60)
c.execute("""SELECT test_type, 
    SUM(CASE WHEN catchable='yes' THEN 1 ELSE 0 END) as yes_ct,
    SUM(CASE WHEN catchable='partially' THEN 1 ELSE 0 END) as partial_ct,
    SUM(CASE WHEN catchable='no' THEN 1 ELSE 0 END) as no_ct,
    COUNT(*) as total
FROM test_catchability GROUP BY test_type ORDER BY COUNT(*) DESC""")
print(f"  {'Test Type':25s} {'Yes':>6s} {'Partial':>8s} {'No':>6s} {'Total':>6s}")
for r in c.fetchall():
    print(f"  {r[0]:25s} {r[1]:6d} {r[2]:8d} {r[3]:6d} {r[4]:6d}")

conn.close()

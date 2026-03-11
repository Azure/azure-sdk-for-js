# Azure SDK Test Gap Analysis — Issues by Theme

Each section lists the specific GitHub issues that would have been caught by a particular type of test, grouped by the test coverage gap that allowed the bug to ship.

**Source**: 1,438 SDK code defects classified for test catchability across all five Azure SDK repositories.

Legend: ✅ = fully catchable | ⚠️ = partially catchable | ❌ = not catchable in standard CI

## Summary

| # | Test Gap | Issues | % |
|---|---|---|---|
| 1 | [Missing Error Path Coverage](#missing-error-path) | 423 | 29.4% |
| 2 | [Missing Edge Case / Boundary Tests](#missing-edge-case) | 232 | 16.1% |
| 3 | [Missing API Contract Validation](#missing-api-contract) | 217 | 15.1% |
| 4 | [Missing Serialization Roundtrip Tests](#missing-serialization-roundtrip) | 149 | 10.4% |
| 5 | [Missing Concurrency / Thread Safety Tests](#missing-concurrency) | 93 | 6.5% |
| 6 | [Missing Retry / Reconnection Scenario Tests](#missing-retry-scenario) | 77 | 5.4% |
| 7 | [Missing Multi-Platform Tests](#missing-platform) | 73 | 5.1% |
| 8 | [Missing Auth Flow Tests](#missing-auth-flow) | 71 | 4.9% |
| 9 | [Missing Performance Regression Baselines](#missing-perf-baseline) | 31 | 2.2% |
| 10 | [Missing Model Type Combination Tests](#missing-model) | 30 | 2.1% |
| 11 | [Other / Miscellaneous Gaps](#other) | 42 | 2.9% |

---

## Missing Error Path Coverage

**423 issues (29.4%)**

These bugs would have been caught by testing error/exception handling paths instead of only the happy path. The SDK tests validate what happens when the service returns 200 OK, but not what happens on 4xx/5xx errors, malformed responses, timeouts, or null values in required fields.

### Python (153 issues)

| Issue | Catchable | Test Type | Bug Category | Service Area |
|---|---|---|---|---|
| [#42097](https://github.com/Azure/azure-sdk-for-python/issues/42097) | ✅ yes | error_path_test | error_handling | monitor |
| [#42045](https://github.com/Azure/azure-sdk-for-python/issues/42045) | ✅ yes | unit_test | error_handling | identity |
| [#41825](https://github.com/Azure/azure-sdk-for-python/issues/41825) | ✅ yes | error_path_test | error_handling | arm_mgmt |
| [#41743](https://github.com/Azure/azure-sdk-for-python/issues/41743) | ✅ yes | unit_test | error_handling | ai_ml |
| [#41543](https://github.com/Azure/azure-sdk-for-python/issues/41543) | ✅ yes | error_path_test | error_handling | ai_ml |
| [#41535](https://github.com/Azure/azure-sdk-for-python/issues/41535) | ✅ yes | error_path_test | error_handling | monitor |
| [#40992](https://github.com/Azure/azure-sdk-for-python/issues/40992) | ✅ yes | error_path_test | error_handling | ai_ml |
| [#40953](https://github.com/Azure/azure-sdk-for-python/issues/40953) | ✅ yes | error_path_test | error_handling | ai_ml |
| [#40948](https://github.com/Azure/azure-sdk-for-python/issues/40948) | ✅ yes | error_path_test | error_handling | ai_ml |
| [#40573](https://github.com/Azure/azure-sdk-for-python/issues/40573) | ✅ yes | error_path_test | error_handling | monitor |
| [#40403](https://github.com/Azure/azure-sdk-for-python/issues/40403) | ✅ yes | error_path_test | error_handling | arm_mgmt |
| [#40390](https://github.com/Azure/azure-sdk-for-python/issues/40390) | ✅ yes | error_path_test | error_handling | ai_ml |
| [#40290](https://github.com/Azure/azure-sdk-for-python/issues/40290) | ✅ yes | error_path_test | error_handling | ai_ml |
| [#40094](https://github.com/Azure/azure-sdk-for-python/issues/40094) | ✅ yes | error_path_test | error_handling | monitor |
| [#39933](https://github.com/Azure/azure-sdk-for-python/issues/39933) | ✅ yes | error_path_test | error_handling | arm_mgmt |
| [#39914](https://github.com/Azure/azure-sdk-for-python/issues/39914) | ✅ yes | error_path_test | error_handling | monitor |
| [#39849](https://github.com/Azure/azure-sdk-for-python/issues/39849) | ✅ yes | error_path_test | error_handling | openai |
| [#39847](https://github.com/Azure/azure-sdk-for-python/issues/39847) | ✅ yes | error_path_test | error_handling | other |
| [#39816](https://github.com/Azure/azure-sdk-for-python/issues/39816) | ✅ yes | error_path_test | error_handling | ai_ml |
| [#39502](https://github.com/Azure/azure-sdk-for-python/issues/39502) | ✅ yes | error_path_test | error_handling | ai_ml |
| [#39325](https://github.com/Azure/azure-sdk-for-python/issues/39325) | ✅ yes | integration_test | error_handling | ai_ml |
| [#38910](https://github.com/Azure/azure-sdk-for-python/issues/38910) | ✅ yes | error_path_test | error_handling | communication |
| [#38713](https://github.com/Azure/azure-sdk-for-python/issues/38713) | ✅ yes | error_path_test | error_handling | other |
| [#38518](https://github.com/Azure/azure-sdk-for-python/issues/38518) | ✅ yes | error_path_test | error_handling | storage |
| [#37747](https://github.com/Azure/azure-sdk-for-python/issues/37747) | ✅ yes | error_path_test | error_handling | monitor |
| [#36907](https://github.com/Azure/azure-sdk-for-python/issues/36907) | ✅ yes | error_path_test | error_handling | other |
| [#34744](https://github.com/Azure/azure-sdk-for-python/issues/34744) | ✅ yes | unit_test | type_error | keyvault |
| [#34359](https://github.com/Azure/azure-sdk-for-python/issues/34359) | ✅ yes | unit_test | type_error | storage |
| [#33751](https://github.com/Azure/azure-sdk-for-python/issues/33751) | ✅ yes | unit_test | api_surface | core |
| [#33682](https://github.com/Azure/azure-sdk-for-python/issues/33682) | ✅ yes | error_path_test | error_handling | app_config |
| [#33623](https://github.com/Azure/azure-sdk-for-python/issues/33623) | ✅ yes | error_path_test | error_handling | monitor |
| [#33318](https://github.com/Azure/azure-sdk-for-python/issues/33318) | ✅ yes | integration_test | error_handling | other |
| [#33073](https://github.com/Azure/azure-sdk-for-python/issues/33073) | ✅ yes | error_path_test | api_surface | app_config |
| [#32968](https://github.com/Azure/azure-sdk-for-python/issues/32968) | ✅ yes | unit_test | type_error | core |
| [#32473](https://github.com/Azure/azure-sdk-for-python/issues/32473) | ✅ yes | unit_test | serialization | core |
| [#32342](https://github.com/Azure/azure-sdk-for-python/issues/32342) | ✅ yes | integration_test | error_handling | cosmos |
| [#32312](https://github.com/Azure/azure-sdk-for-python/issues/32312) | ✅ yes | unit_test | connection_retry | core |
| [#32279](https://github.com/Azure/azure-sdk-for-python/issues/32279) | ✅ yes | error_path_test | error_handling | ai_ml |
| [#32190](https://github.com/Azure/azure-sdk-for-python/issues/32190) | ✅ yes | integration_test | error_handling | service_bus |
| [#32170](https://github.com/Azure/azure-sdk-for-python/issues/32170) | ✅ yes | error_path_test | error_handling | ai_ml |
| [#31993](https://github.com/Azure/azure-sdk-for-python/issues/31993) | ✅ yes | unit_test | error_handling | arm_mgmt |
| [#31712](https://github.com/Azure/azure-sdk-for-python/issues/31712) | ✅ yes | error_path_test | error_handling | service_bus |
| [#31530](https://github.com/Azure/azure-sdk-for-python/issues/31530) | ✅ yes | unit_test | connection_retry | core |
| [#31528](https://github.com/Azure/azure-sdk-for-python/issues/31528) | ✅ yes | error_path_test | connection_retry | core |
| [#31166](https://github.com/Azure/azure-sdk-for-python/issues/31166) | ✅ yes | error_path_test | error_handling | ai_ml |
| [#31004](https://github.com/Azure/azure-sdk-for-python/issues/31004) | ✅ yes | error_path_test | connection_retry | core |
| [#30815](https://github.com/Azure/azure-sdk-for-python/issues/30815) | ✅ yes | error_path_test | error_handling | event_hubs |
| [#30686](https://github.com/Azure/azure-sdk-for-python/issues/30686) | ✅ yes | error_path_test | error_handling | arm_mgmt |
| [#30452](https://github.com/Azure/azure-sdk-for-python/issues/30452) | ✅ yes | unit_test | other | other |
| [#30382](https://github.com/Azure/azure-sdk-for-python/issues/30382) | ✅ yes | error_path_test | error_handling | keyvault |
| [#30161](https://github.com/Azure/azure-sdk-for-python/issues/30161) | ✅ yes | error_path_test | error_handling | other |
| [#30077](https://github.com/Azure/azure-sdk-for-python/issues/30077) | ✅ yes | error_path_test | type_error | other |
| [#29719](https://github.com/Azure/azure-sdk-for-python/issues/29719) | ✅ yes | integration_test | api_surface | storage |
| [#29667](https://github.com/Azure/azure-sdk-for-python/issues/29667) | ✅ yes | error_path_test | error_handling | service_bus |
| [#28453](https://github.com/Azure/azure-sdk-for-python/issues/28453) | ✅ yes | error_path_test | api_surface | event_hubs |
| [#28432](https://github.com/Azure/azure-sdk-for-python/issues/28432) | ✅ yes | error_path_test | error_handling | other |
| [#28282](https://github.com/Azure/azure-sdk-for-python/issues/28282) | ✅ yes | error_path_test | error_handling | other |
| [#27986](https://github.com/Azure/azure-sdk-for-python/issues/27986) | ✅ yes | error_path_test | api_surface | event_hubs |
| [#26402](https://github.com/Azure/azure-sdk-for-python/issues/26402) | ✅ yes | error_path_test | error_handling | storage |
| [#26028](https://github.com/Azure/azure-sdk-for-python/issues/26028) | ✅ yes | error_path_test | error_handling | storage |
| [#25954](https://github.com/Azure/azure-sdk-for-python/issues/25954) | ✅ yes | error_path_test | error_handling | storage |
| [#25772](https://github.com/Azure/azure-sdk-for-python/issues/25772) | ⚠️ partially | integration_test | type_error | communication |
| [#25605](https://github.com/Azure/azure-sdk-for-python/issues/25605) | ✅ yes | error_path_test | error_handling | event_hubs |
| [#25516](https://github.com/Azure/azure-sdk-for-python/issues/25516) | ✅ yes | error_path_test | error_handling | cosmos |
| [#24958](https://github.com/Azure/azure-sdk-for-python/issues/24958) | ⚠️ partially | error_path_test | error_handling | storage |
| [#24704](https://github.com/Azure/azure-sdk-for-python/issues/24704) | ✅ yes | unit_test | auth | identity |
| [#24696](https://github.com/Azure/azure-sdk-for-python/issues/24696) | ✅ yes | error_path_test | error_handling | arm_mgmt |
| [#24636](https://github.com/Azure/azure-sdk-for-python/issues/24636) | ⚠️ partially | error_path_test | streaming | storage |
| [#24447](https://github.com/Azure/azure-sdk-for-python/issues/24447) | ✅ yes | unit_test | type_error | monitor |
| [#24420](https://github.com/Azure/azure-sdk-for-python/issues/24420) | ✅ yes | error_path_test | type_error | arm_mgmt |
| [#24189](https://github.com/Azure/azure-sdk-for-python/issues/24189) | ✅ yes | unit_test | type_error | core |
| [#24155](https://github.com/Azure/azure-sdk-for-python/issues/24155) | ✅ yes | error_path_test | error_handling | other |
| [#23784](https://github.com/Azure/azure-sdk-for-python/issues/23784) | ✅ yes | unit_test | type_error | ai_ml |
| [#23467](https://github.com/Azure/azure-sdk-for-python/issues/23467) | ⚠️ partially | error_path_test | connection_retry | search |
| [#23196](https://github.com/Azure/azure-sdk-for-python/issues/23196) | ✅ yes | unit_test | error_handling | core |
| [#22941](https://github.com/Azure/azure-sdk-for-python/issues/22941) | ✅ yes | integration_test | error_handling | arm_mgmt |
| [#22862](https://github.com/Azure/azure-sdk-for-python/issues/22862) | ✅ yes | unit_test | error_handling | keyvault |
| [#22860](https://github.com/Azure/azure-sdk-for-python/issues/22860) | ✅ yes | unit_test | error_handling | storage |
| [#22514](https://github.com/Azure/azure-sdk-for-python/issues/22514) | ✅ yes | unit_test | type_error | cosmos |
| [#22445](https://github.com/Azure/azure-sdk-for-python/issues/22445) | ✅ yes | error_path_test | error_handling | storage |
| [#22100](https://github.com/Azure/azure-sdk-for-python/issues/22100) | ✅ yes | error_path_test | serialization | monitor |
| [#21910](https://github.com/Azure/azure-sdk-for-python/issues/21910) | ✅ yes | unit_test | type_error | storage |
| [#21865](https://github.com/Azure/azure-sdk-for-python/issues/21865) | ✅ yes | unit_test | type_error | other |
| [#21810](https://github.com/Azure/azure-sdk-for-python/issues/21810) | ✅ yes | integration_test | error_handling | storage |
| [#21748](https://github.com/Azure/azure-sdk-for-python/issues/21748) | ✅ yes | error_path_test | error_handling | communication |
| [#21700](https://github.com/Azure/azure-sdk-for-python/issues/21700) | ✅ yes | error_path_test | error_handling | search |
| [#21653](https://github.com/Azure/azure-sdk-for-python/issues/21653) | ✅ yes | error_path_test | error_handling | identity |
| [#21252](https://github.com/Azure/azure-sdk-for-python/issues/21252) | ✅ yes | unit_test | error_handling | arm_mgmt |
| [#21039](https://github.com/Azure/azure-sdk-for-python/issues/21039) | ✅ yes | error_path_test | error_handling | storage |
| [#20972](https://github.com/Azure/azure-sdk-for-python/issues/20972) | ✅ yes | integration_test | error_handling | arm_mgmt |
| [#20795](https://github.com/Azure/azure-sdk-for-python/issues/20795) | ✅ yes | unit_test | error_handling | core |
| [#20791](https://github.com/Azure/azure-sdk-for-python/issues/20791) | ✅ yes | integration_test | api_surface | storage |
| [#20748](https://github.com/Azure/azure-sdk-for-python/issues/20748) | ✅ yes | integration_test | error_handling | arm_mgmt |
| [#20650](https://github.com/Azure/azure-sdk-for-python/issues/20650) | ✅ yes | integration_test | api_surface | storage |
| [#20223](https://github.com/Azure/azure-sdk-for-python/issues/20223) | ✅ yes | integration_test | error_handling | ai_ml |
| [#20206](https://github.com/Azure/azure-sdk-for-python/issues/20206) | ✅ yes | unit_test | error_handling | ai_ml |
| [#20137](https://github.com/Azure/azure-sdk-for-python/issues/20137) | ✅ yes | error_path_test | error_handling | identity |
| [#19989](https://github.com/Azure/azure-sdk-for-python/issues/19989) | ✅ yes | unit_test | error_handling | identity |
| [#19757](https://github.com/Azure/azure-sdk-for-python/issues/19757) | ✅ yes | unit_test | error_handling | other |
| [#19642](https://github.com/Azure/azure-sdk-for-python/issues/19642) | ✅ yes | error_path_test | memory_lifecycle | service_bus |
| [#19094](https://github.com/Azure/azure-sdk-for-python/issues/19094) | ✅ yes | error_path_test | error_handling | core |
| [#18873](https://github.com/Azure/azure-sdk-for-python/issues/18873) | ✅ yes | error_path_test | api_surface | arm_mgmt |
| [#18361](https://github.com/Azure/azure-sdk-for-python/issues/18361) | ✅ yes | error_path_test | type_error | service_bus |
| [#18355](https://github.com/Azure/azure-sdk-for-python/issues/18355) | ✅ yes | error_path_test | error_handling | ai_ml |
| [#18129](https://github.com/Azure/azure-sdk-for-python/issues/18129) | ✅ yes | unit_test | type_error | storage |
| [#17419](https://github.com/Azure/azure-sdk-for-python/issues/17419) | ✅ yes | error_path_test | type_error | other |
| [#17271](https://github.com/Azure/azure-sdk-for-python/issues/17271) | ✅ yes | unit_test | auth | core |
| [#16980](https://github.com/Azure/azure-sdk-for-python/issues/16980) | ✅ yes | error_path_test | error_handling | storage |
| [#16970](https://github.com/Azure/azure-sdk-for-python/issues/16970) | ✅ yes | error_path_test | error_handling | keyvault |
| [#16929](https://github.com/Azure/azure-sdk-for-python/issues/16929) | ✅ yes | unit_test | error_handling | core |
| [#16908](https://github.com/Azure/azure-sdk-for-python/issues/16908) | ✅ yes | unit_test | type_error | arm_mgmt |
| [#16757](https://github.com/Azure/azure-sdk-for-python/issues/16757) | ✅ yes | error_path_test | connection_retry | keyvault |
| [#16568](https://github.com/Azure/azure-sdk-for-python/issues/16568) | ✅ yes | error_path_test | error_handling | ai_ml |
| [#16375](https://github.com/Azure/azure-sdk-for-python/issues/16375) | ✅ yes | unit_test | error_handling | ai_ml |
| [#16225](https://github.com/Azure/azure-sdk-for-python/issues/16225) | ✅ yes | integration_test | error_handling | arm_mgmt |
| [#16192](https://github.com/Azure/azure-sdk-for-python/issues/16192) | ✅ yes | unit_test | auth | event_hubs |
| [#16109](https://github.com/Azure/azure-sdk-for-python/issues/16109) | ✅ yes | unit_test | type_error | storage |
| [#16099](https://github.com/Azure/azure-sdk-for-python/issues/16099) | ✅ yes | unit_test | error_handling | ai_ml |
| [#16035](https://github.com/Azure/azure-sdk-for-python/issues/16035) | ✅ yes | error_path_test | error_handling | ai_ml |
| [#15956](https://github.com/Azure/azure-sdk-for-python/issues/15956) | ✅ yes | unit_test | type_error | storage |
| [#15871](https://github.com/Azure/azure-sdk-for-python/issues/15871) | ✅ yes | error_path_test | error_handling | storage |
| [#15608](https://github.com/Azure/azure-sdk-for-python/issues/15608) | ✅ yes | error_path_test | error_handling | keyvault |
| [#15418](https://github.com/Azure/azure-sdk-for-python/issues/15418) | ✅ yes | error_path_test | error_handling | storage |
| [#15222](https://github.com/Azure/azure-sdk-for-python/issues/15222) | ✅ yes | error_path_test | error_handling | core |
| [#14909](https://github.com/Azure/azure-sdk-for-python/issues/14909) | ✅ yes | error_path_test | error_handling | core |
| [#14356](https://github.com/Azure/azure-sdk-for-python/issues/14356) | ✅ yes | error_path_test | error_handling | service_bus |
| [#14319](https://github.com/Azure/azure-sdk-for-python/issues/14319) | ✅ yes | error_path_test | error_handling | storage |
| [#13144](https://github.com/Azure/azure-sdk-for-python/issues/13144) | ✅ yes | error_path_test | error_handling | storage |
| [#13060](https://github.com/Azure/azure-sdk-for-python/issues/13060) | ✅ yes | error_path_test | error_handling | event_hubs |
| [#12137](https://github.com/Azure/azure-sdk-for-python/issues/12137) | ✅ yes | error_path_test | error_handling | core |
| [#12048](https://github.com/Azure/azure-sdk-for-python/issues/12048) | ✅ yes | error_path_test | error_handling | identity |
| [#11944](https://github.com/Azure/azure-sdk-for-python/issues/11944) | ✅ yes | unit_test | other | identity |
| [#11819](https://github.com/Azure/azure-sdk-for-python/issues/11819) | ✅ yes | error_path_test | error_handling | identity |
| [#11793](https://github.com/Azure/azure-sdk-for-python/issues/11793) | ✅ yes | error_path_test | type_error | cosmos |
| [#11658](https://github.com/Azure/azure-sdk-for-python/issues/11658) | ✅ yes | unit_test | error_handling | arm_mgmt |
| [#11538](https://github.com/Azure/azure-sdk-for-python/issues/11538) | ✅ yes | error_path_test | error_handling | service_bus |
| [#5412](https://github.com/Azure/azure-sdk-for-python/issues/5412) | ✅ yes | integration_test | connection_retry | arm_mgmt |
| [#4210](https://github.com/Azure/azure-sdk-for-python/issues/4210) | ✅ yes | error_path_test | error_handling | cosmos |
| [#2321](https://github.com/Azure/azure-sdk-for-python/issues/2321) | ✅ yes | unit_test | auth | core |
| [#1695](https://github.com/Azure/azure-sdk-for-python/issues/1695) | ✅ yes | integration_test | other | arm_mgmt |
| [#1613](https://github.com/Azure/azure-sdk-for-python/issues/1613) | ✅ yes | unit_test | other | core |
| [#1358](https://github.com/Azure/azure-sdk-for-python/issues/1358) | ✅ yes | integration_test | connection_retry | arm_mgmt |
| [#1162](https://github.com/Azure/azure-sdk-for-python/issues/1162) | ✅ yes | integration_test | auth | keyvault |
| [#1062](https://github.com/Azure/azure-sdk-for-python/issues/1062) | ✅ yes | error_path_test | error_handling | arm_mgmt |
| [#1016](https://github.com/Azure/azure-sdk-for-python/issues/1016) | ✅ yes | error_path_test | error_handling | arm_mgmt |
| [#993](https://github.com/Azure/azure-sdk-for-python/issues/993) | ✅ yes | error_path_test | error_handling | service_bus |
| [#920](https://github.com/Azure/azure-sdk-for-python/issues/920) | ✅ yes | error_path_test | error_handling | other |
| [#837](https://github.com/Azure/azure-sdk-for-python/issues/837) | ✅ yes | error_path_test | error_handling | arm_mgmt |
| [#798](https://github.com/Azure/azure-sdk-for-python/issues/798) | ✅ yes | error_path_test | error_handling | arm_mgmt |
| [#669](https://github.com/Azure/azure-sdk-for-python/issues/669) | ✅ yes | error_path_test | error_handling | service_bus |
| [#384](https://github.com/Azure/azure-sdk-for-python/issues/384) | ✅ yes | integration_test | error_handling | storage |
| [#259](https://github.com/Azure/azure-sdk-for-python/issues/259) | ✅ yes | error_path_test | error_handling | other |
| [#192](https://github.com/Azure/azure-sdk-for-python/issues/192) | ✅ yes | serialization_test | serialization | service_bus |

### Java (33 issues)

| Issue | Catchable | Test Type | Bug Category | Service Area |
|---|---|---|---|---|
| [#48030](https://github.com/Azure/azure-sdk-for-java/issues/48030) | ✅ yes | integration_test | memory_lifecycle | service_bus |
| [#47681](https://github.com/Azure/azure-sdk-for-java/issues/47681) | ✅ yes | error_path_test | error_handling | search |
| [#47647](https://github.com/Azure/azure-sdk-for-java/issues/47647) | ✅ yes | error_path_test | error_handling | keyvault |
| [#47623](https://github.com/Azure/azure-sdk-for-java/issues/47623) | ⚠️ partially | integration_test | error_handling | app_config |
| [#47417](https://github.com/Azure/azure-sdk-for-java/issues/47417) | ✅ yes | error_path_test | error_handling | ai_ml |
| [#47381](https://github.com/Azure/azure-sdk-for-java/issues/47381) | ✅ yes | error_path_test | auth | service_bus |
| [#47380](https://github.com/Azure/azure-sdk-for-java/issues/47380) | ⚠️ partially | integration_test | other | event_hubs |
| [#47379](https://github.com/Azure/azure-sdk-for-java/issues/47379) | ✅ yes | error_path_test | error_handling | storage |
| [#47169](https://github.com/Azure/azure-sdk-for-java/issues/47169) | ✅ yes | error_path_test | error_handling | core |
| [#47155](https://github.com/Azure/azure-sdk-for-java/issues/47155) | ✅ yes | error_path_test | error_handling | identity |
| [#47083](https://github.com/Azure/azure-sdk-for-java/issues/47083) | ✅ yes | error_path_test | error_handling | identity |
| [#46980](https://github.com/Azure/azure-sdk-for-java/issues/46980) | ✅ yes | error_path_test | other | service_bus |
| [#46892](https://github.com/Azure/azure-sdk-for-java/issues/46892) | ✅ yes | error_path_test | error_handling | app_config |
| [#46844](https://github.com/Azure/azure-sdk-for-java/issues/46844) | ✅ yes | integration_test | error_handling | app_config |
| [#46752](https://github.com/Azure/azure-sdk-for-java/issues/46752) | ✅ yes | integration_test | other | event_hubs |
| [#46547](https://github.com/Azure/azure-sdk-for-java/issues/46547) | ✅ yes | error_path_test | error_handling | storage |
| [#46368](https://github.com/Azure/azure-sdk-for-java/issues/46368) | ✅ yes | error_path_test | error_handling | openai |
| [#46325](https://github.com/Azure/azure-sdk-for-java/issues/46325) | ✅ yes | error_path_test | error_handling | service_bus |
| [#44965](https://github.com/Azure/azure-sdk-for-java/issues/44965) | ✅ yes | error_path_test | other | service_bus |
| [#44717](https://github.com/Azure/azure-sdk-for-java/issues/44717) | ✅ yes | integration_test | other | service_bus |
| [#44508](https://github.com/Azure/azure-sdk-for-java/issues/44508) | ✅ yes | error_path_test | error_handling | keyvault |
| [#43981](https://github.com/Azure/azure-sdk-for-java/issues/43981) | ✅ yes | integration_test | streaming | communication |
| [#33009](https://github.com/Azure/azure-sdk-for-java/issues/33009) | ✅ yes | error_path_test | error_handling | keyvault |
| [#32299](https://github.com/Azure/azure-sdk-for-java/issues/32299) | ✅ yes | integration_test | api_surface | keyvault |
| [#31190](https://github.com/Azure/azure-sdk-for-java/issues/31190) | ✅ yes | error_path_test | auth | identity |
| [#30684](https://github.com/Azure/azure-sdk-for-java/issues/30684) | ✅ yes | error_path_test | connection_retry | service_bus |
| [#17071](https://github.com/Azure/azure-sdk-for-java/issues/17071) | ✅ yes | error_path_test | error_handling | service_bus |
| [#15171](https://github.com/Azure/azure-sdk-for-java/issues/15171) | ✅ yes | integration_test | other | storage |
| [#15097](https://github.com/Azure/azure-sdk-for-java/issues/15097) | ✅ yes | error_path_test | error_handling | arm_mgmt |
| [#14903](https://github.com/Azure/azure-sdk-for-java/issues/14903) | ✅ yes | error_path_test | error_handling | service_bus |
| [#14439](https://github.com/Azure/azure-sdk-for-java/issues/14439) | ✅ yes | unit_test | error_handling | core |
| [#14218](https://github.com/Azure/azure-sdk-for-java/issues/14218) | ⚠️ partially | integration_test | auth | identity |
| [#14200](https://github.com/Azure/azure-sdk-for-java/issues/14200) | ✅ yes | error_path_test | other | cosmos |

### .NET (133 issues)

| Issue | Catchable | Test Type | Bug Category | Service Area |
|---|---|---|---|---|
| [#56458](https://github.com/Azure/azure-sdk-for-net/issues/56458) | ✅ yes | error_path_test | error_handling | storage |
| [#55474](https://github.com/Azure/azure-sdk-for-net/issues/55474) | ✅ yes | concurrency_test | memory_lifecycle | core |
| [#51777](https://github.com/Azure/azure-sdk-for-net/issues/51777) | ✅ yes | integration_test | error_handling | event_hubs |
| [#49318](https://github.com/Azure/azure-sdk-for-net/issues/49318) | ✅ yes | error_path_test | error_handling | event_hubs |
| [#48115](https://github.com/Azure/azure-sdk-for-net/issues/48115) | ✅ yes | error_path_test | error_handling | storage |
| [#47517](https://github.com/Azure/azure-sdk-for-net/issues/47517) | ✅ yes | error_path_test | error_handling | service_bus |
| [#46952](https://github.com/Azure/azure-sdk-for-net/issues/46952) | ✅ yes | unit_test | api_surface | service_bus |
| [#46756](https://github.com/Azure/azure-sdk-for-net/issues/46756) | ✅ yes | error_path_test | error_handling | monitor |
| [#46525](https://github.com/Azure/azure-sdk-for-net/issues/46525) | ✅ yes | integration_test | error_handling | event_hubs |
| [#46096](https://github.com/Azure/azure-sdk-for-net/issues/46096) | ✅ yes | integration_test | error_handling | service_bus |
| [#45288](https://github.com/Azure/azure-sdk-for-net/issues/45288) | ✅ yes | integration_test | other | monitor |
| [#43286](https://github.com/Azure/azure-sdk-for-net/issues/43286) | ✅ yes | integration_test | error_handling | monitor |
| [#42000](https://github.com/Azure/azure-sdk-for-net/issues/42000) | ✅ yes | error_path_test | api_surface | storage |
| [#40050](https://github.com/Azure/azure-sdk-for-net/issues/40050) | ✅ yes | error_path_test | error_handling | arm_mgmt |
| [#39837](https://github.com/Azure/azure-sdk-for-net/issues/39837) | ✅ yes | error_path_test | error_handling | arm_mgmt |
| [#39047](https://github.com/Azure/azure-sdk-for-net/issues/39047) | ✅ yes | error_path_test | error_handling | storage |
| [#38548](https://github.com/Azure/azure-sdk-for-net/issues/38548) | ✅ yes | error_path_test | error_handling | arm_mgmt |
| [#38524](https://github.com/Azure/azure-sdk-for-net/issues/38524) | ✅ yes | edge_case_test | api_surface | app_config |
| [#38219](https://github.com/Azure/azure-sdk-for-net/issues/38219) | ✅ yes | error_path_test | memory_lifecycle | core |
| [#38168](https://github.com/Azure/azure-sdk-for-net/issues/38168) | ✅ yes | error_path_test | api_surface | openai |
| [#37253](https://github.com/Azure/azure-sdk-for-net/issues/37253) | ✅ yes | error_path_test | error_handling | storage |
| [#36491](https://github.com/Azure/azure-sdk-for-net/issues/36491) | ✅ yes | concurrency_test | memory_lifecycle | storage |
| [#36120](https://github.com/Azure/azure-sdk-for-net/issues/36120) | ✅ yes | unit_test | api_surface | other |
| [#35701](https://github.com/Azure/azure-sdk-for-net/issues/35701) | ✅ yes | error_path_test | memory_lifecycle | storage |
| [#35553](https://github.com/Azure/azure-sdk-for-net/issues/35553) | ✅ yes | unit_test | error_handling | storage |
| [#35377](https://github.com/Azure/azure-sdk-for-net/issues/35377) | ✅ yes | integration_test | auth | storage |
| [#35346](https://github.com/Azure/azure-sdk-for-net/issues/35346) | ✅ yes | integration_test | api_surface | arm_mgmt |
| [#35300](https://github.com/Azure/azure-sdk-for-net/issues/35300) | ✅ yes | integration_test | error_handling | arm_mgmt |
| [#35291](https://github.com/Azure/azure-sdk-for-net/issues/35291) | ✅ yes | integration_test | error_handling | arm_mgmt |
| [#35290](https://github.com/Azure/azure-sdk-for-net/issues/35290) | ✅ yes | integration_test | other | arm_mgmt |
| [#34646](https://github.com/Azure/azure-sdk-for-net/issues/34646) | ✅ yes | integration_test | other | other |
| [#34627](https://github.com/Azure/azure-sdk-for-net/issues/34627) | ✅ yes | error_path_test | error_handling | other |
| [#34472](https://github.com/Azure/azure-sdk-for-net/issues/34472) | ✅ yes | error_path_test | connection_retry | service_bus |
| [#34398](https://github.com/Azure/azure-sdk-for-net/issues/34398) | ✅ yes | error_path_test | error_handling | other |
| [#34261](https://github.com/Azure/azure-sdk-for-net/issues/34261) | ✅ yes | error_path_test | api_surface | other |
| [#33997](https://github.com/Azure/azure-sdk-for-net/issues/33997) | ✅ yes | integration_test | api_surface | arm_mgmt |
| [#33994](https://github.com/Azure/azure-sdk-for-net/issues/33994) | ✅ yes | integration_test | error_handling | storage |
| [#33635](https://github.com/Azure/azure-sdk-for-net/issues/33635) | ✅ yes | integration_test | error_handling | storage |
| [#33353](https://github.com/Azure/azure-sdk-for-net/issues/33353) | ✅ yes | integration_test | api_surface | arm_mgmt |
| [#33170](https://github.com/Azure/azure-sdk-for-net/issues/33170) | ✅ yes | integration_test | error_handling | arm_mgmt |
| [#33131](https://github.com/Azure/azure-sdk-for-net/issues/33131) | ✅ yes | error_path_test | memory_lifecycle | core |
| [#32846](https://github.com/Azure/azure-sdk-for-net/issues/32846) | ✅ yes | integration_test | api_surface | other |
| [#32503](https://github.com/Azure/azure-sdk-for-net/issues/32503) | ✅ yes | error_path_test | error_handling | arm_mgmt |
| [#32200](https://github.com/Azure/azure-sdk-for-net/issues/32200) | ✅ yes | unit_test | api_surface | other |
| [#31752](https://github.com/Azure/azure-sdk-for-net/issues/31752) | ✅ yes | integration_test | error_handling | other |
| [#31633](https://github.com/Azure/azure-sdk-for-net/issues/31633) | ✅ yes | error_path_test | error_handling | arm_mgmt |
| [#31318](https://github.com/Azure/azure-sdk-for-net/issues/31318) | ✅ yes | error_path_test | error_handling | other |
| [#31249](https://github.com/Azure/azure-sdk-for-net/issues/31249) | ✅ yes | unit_test | type_error | arm_mgmt |
| [#31163](https://github.com/Azure/azure-sdk-for-net/issues/31163) | ✅ yes | error_path_test | error_handling | storage |
| [#30245](https://github.com/Azure/azure-sdk-for-net/issues/30245) | ✅ yes | integration_test | api_surface | arm_mgmt |
| [#30043](https://github.com/Azure/azure-sdk-for-net/issues/30043) | ⚠️ partially | integration_test | error_handling | service_bus |
| [#29912](https://github.com/Azure/azure-sdk-for-net/issues/29912) | ✅ yes | unit_test | type_error | arm_mgmt |
| [#29368](https://github.com/Azure/azure-sdk-for-net/issues/29368) | ✅ yes | error_path_test | error_handling | arm_mgmt |
| [#28162](https://github.com/Azure/azure-sdk-for-net/issues/28162) | ✅ yes | error_path_test | error_handling | arm_mgmt |
| [#24897](https://github.com/Azure/azure-sdk-for-net/issues/24897) | ✅ yes | concurrency_test | error_handling | storage |
| [#24801](https://github.com/Azure/azure-sdk-for-net/issues/24801) | ✅ yes | unit_test | memory_lifecycle | storage |
| [#24692](https://github.com/Azure/azure-sdk-for-net/issues/24692) | ✅ yes | error_path_test | error_handling | ai_ml |
| [#23319](https://github.com/Azure/azure-sdk-for-net/issues/23319) | ✅ yes | integration_test | api_surface | storage |
| [#23203](https://github.com/Azure/azure-sdk-for-net/issues/23203) | ✅ yes | error_path_test | error_handling | core |
| [#23128](https://github.com/Azure/azure-sdk-for-net/issues/23128) | ✅ yes | integration_test | memory_lifecycle | storage |
| [#23082](https://github.com/Azure/azure-sdk-for-net/issues/23082) | ✅ yes | error_path_test | error_handling | storage |
| [#23016](https://github.com/Azure/azure-sdk-for-net/issues/23016) | ✅ yes | integration_test | other | keyvault |
| [#22969](https://github.com/Azure/azure-sdk-for-net/issues/22969) | ✅ yes | error_path_test | error_handling | service_bus |
| [#21511](https://github.com/Azure/azure-sdk-for-net/issues/21511) | ✅ yes | integration_test | other | storage |
| [#21117](https://github.com/Azure/azure-sdk-for-net/issues/21117) | ✅ yes | integration_test | other | app_config |
| [#20931](https://github.com/Azure/azure-sdk-for-net/issues/20931) | ✅ yes | integration_test | connection_retry | storage |
| [#20495](https://github.com/Azure/azure-sdk-for-net/issues/20495) | ✅ yes | error_path_test | serialization | ai_ml |
| [#20418](https://github.com/Azure/azure-sdk-for-net/issues/20418) | ✅ yes | error_path_test | other | identity |
| [#20417](https://github.com/Azure/azure-sdk-for-net/issues/20417) | ✅ yes | error_path_test | error_handling | identity |
| [#20361](https://github.com/Azure/azure-sdk-for-net/issues/20361) | ✅ yes | integration_test | error_handling | storage |
| [#19330](https://github.com/Azure/azure-sdk-for-net/issues/19330) | ✅ yes | error_path_test | api_surface | storage |
| [#19267](https://github.com/Azure/azure-sdk-for-net/issues/19267) | ✅ yes | unit_test | auth | core |
| [#19086](https://github.com/Azure/azure-sdk-for-net/issues/19086) | ✅ yes | unit_test | api_surface | other |
| [#18992](https://github.com/Azure/azure-sdk-for-net/issues/18992) | ✅ yes | error_path_test | error_handling | core |
| [#18592](https://github.com/Azure/azure-sdk-for-net/issues/18592) | ✅ yes | error_path_test | error_handling | storage |
| [#18447](https://github.com/Azure/azure-sdk-for-net/issues/18447) | ✅ yes | error_path_test | api_surface | other |
| [#18199](https://github.com/Azure/azure-sdk-for-net/issues/18199) | ✅ yes | unit_test | memory_lifecycle | core |
| [#18187](https://github.com/Azure/azure-sdk-for-net/issues/18187) | ✅ yes | error_path_test | error_handling | arm_mgmt |
| [#18091](https://github.com/Azure/azure-sdk-for-net/issues/18091) | ✅ yes | error_path_test | error_handling | arm_mgmt |
| [#17719](https://github.com/Azure/azure-sdk-for-net/issues/17719) | ✅ yes | unit_test | api_surface | other |
| [#17690](https://github.com/Azure/azure-sdk-for-net/issues/17690) | ✅ yes | error_path_test | error_handling | storage |
| [#17459](https://github.com/Azure/azure-sdk-for-net/issues/17459) | ✅ yes | error_path_test | error_handling | other |
| [#16631](https://github.com/Azure/azure-sdk-for-net/issues/16631) | ✅ yes | error_path_test | error_handling | storage |
| [#16328](https://github.com/Azure/azure-sdk-for-net/issues/16328) | ✅ yes | unit_test | api_surface | identity |
| [#15801](https://github.com/Azure/azure-sdk-for-net/issues/15801) | ✅ yes | error_path_test | error_handling | identity |
| [#15628](https://github.com/Azure/azure-sdk-for-net/issues/15628) | ✅ yes | error_path_test | error_handling | storage |
| [#15403](https://github.com/Azure/azure-sdk-for-net/issues/15403) | ✅ yes | integration_test | error_handling | storage |
| [#13880](https://github.com/Azure/azure-sdk-for-net/issues/13880) | ✅ yes | integration_test | error_handling | storage |
| [#13813](https://github.com/Azure/azure-sdk-for-net/issues/13813) | ✅ yes | error_path_test | error_handling | ai_ml |
| [#13714](https://github.com/Azure/azure-sdk-for-net/issues/13714) | ✅ yes | error_path_test | error_handling | arm_mgmt |
| [#13298](https://github.com/Azure/azure-sdk-for-net/issues/13298) | ✅ yes | integration_test | error_handling | storage |
| [#13269](https://github.com/Azure/azure-sdk-for-net/issues/13269) | ✅ yes | integration_test | api_surface | storage |
| [#13136](https://github.com/Azure/azure-sdk-for-net/issues/13136) | ✅ yes | error_path_test | serialization | storage |
| [#13131](https://github.com/Azure/azure-sdk-for-net/issues/13131) | ✅ yes | error_path_test | error_handling | event_hubs |
| [#13044](https://github.com/Azure/azure-sdk-for-net/issues/13044) | ✅ yes | error_path_test | error_handling | identity |
| [#12986](https://github.com/Azure/azure-sdk-for-net/issues/12986) | ✅ yes | integration_test | api_surface | storage |
| [#12738](https://github.com/Azure/azure-sdk-for-net/issues/12738) | ✅ yes | integration_test | api_surface | storage |
| [#12511](https://github.com/Azure/azure-sdk-for-net/issues/12511) | ✅ yes | integration_test | error_handling | core |
| [#12186](https://github.com/Azure/azure-sdk-for-net/issues/12186) | ✅ yes | error_path_test | error_handling | storage |
| [#11870](https://github.com/Azure/azure-sdk-for-net/issues/11870) | ✅ yes | error_path_test | error_handling | event_hubs |
| [#11821](https://github.com/Azure/azure-sdk-for-net/issues/11821) | ✅ yes | error_path_test | error_handling | ai_ml |
| [#11734](https://github.com/Azure/azure-sdk-for-net/issues/11734) | ✅ yes | error_path_test | error_handling | arm_mgmt |
| [#11669](https://github.com/Azure/azure-sdk-for-net/issues/11669) | ✅ yes | integration_test | api_surface | keyvault |
| [#11564](https://github.com/Azure/azure-sdk-for-net/issues/11564) | ✅ yes | error_path_test | error_handling | ai_ml |
| [#11371](https://github.com/Azure/azure-sdk-for-net/issues/11371) | ✅ yes | error_path_test | error_handling | core |
| [#11009](https://github.com/Azure/azure-sdk-for-net/issues/11009) | ✅ yes | error_path_test | error_handling | service_bus |
| [#10905](https://github.com/Azure/azure-sdk-for-net/issues/10905) | ✅ yes | error_path_test | error_handling | keyvault |
| [#10814](https://github.com/Azure/azure-sdk-for-net/issues/10814) | ✅ yes | integration_test | streaming | storage |
| [#10659](https://github.com/Azure/azure-sdk-for-net/issues/10659) | ✅ yes | error_path_test | error_handling | identity |
| [#10624](https://github.com/Azure/azure-sdk-for-net/issues/10624) | ✅ yes | integration_test | memory_lifecycle | storage |
| [#10576](https://github.com/Azure/azure-sdk-for-net/issues/10576) | ✅ yes | error_path_test | error_handling | event_hubs |
| [#10324](https://github.com/Azure/azure-sdk-for-net/issues/10324) | ✅ yes | integration_test | other | event_hubs |
| [#10310](https://github.com/Azure/azure-sdk-for-net/issues/10310) | ✅ yes | error_path_test | connection_retry | event_hubs |
| [#9416](https://github.com/Azure/azure-sdk-for-net/issues/9416) | ✅ yes | error_path_test | error_handling | service_bus |
| [#9228](https://github.com/Azure/azure-sdk-for-net/issues/9228) | ✅ yes | error_path_test | error_handling | event_hubs |
| [#9213](https://github.com/Azure/azure-sdk-for-net/issues/9213) | ✅ yes | error_path_test | error_handling | event_hubs |
| [#8761](https://github.com/Azure/azure-sdk-for-net/issues/8761) | ✅ yes | error_path_test | connection_retry | event_hubs |
| [#8701](https://github.com/Azure/azure-sdk-for-net/issues/8701) | ✅ yes | integration_test | other | event_hubs |
| [#8476](https://github.com/Azure/azure-sdk-for-net/issues/8476) | ✅ yes | error_path_test | error_handling | identity |
| [#8023](https://github.com/Azure/azure-sdk-for-net/issues/8023) | ✅ yes | error_path_test | auth | other |
| [#7933](https://github.com/Azure/azure-sdk-for-net/issues/7933) | ✅ yes | error_path_test | error_handling | event_hubs |
| [#7305](https://github.com/Azure/azure-sdk-for-net/issues/7305) | ✅ yes | unit_test | type_error | event_hubs |
| [#6813](https://github.com/Azure/azure-sdk-for-net/issues/6813) | ⚠️ partially | integration_test | other | service_bus |
| [#6723](https://github.com/Azure/azure-sdk-for-net/issues/6723) | ⚠️ partially | error_path_test | error_handling | service_bus |
| [#6582](https://github.com/Azure/azure-sdk-for-net/issues/6582) | ✅ yes | unit_test | other | core |
| [#6501](https://github.com/Azure/azure-sdk-for-net/issues/6501) | ✅ yes | unit_test | api_surface | other |
| [#6031](https://github.com/Azure/azure-sdk-for-net/issues/6031) | ✅ yes | unit_test | api_surface | service_bus |
| [#3088](https://github.com/Azure/azure-sdk-for-net/issues/3088) | ⚠️ partially | integration_test | error_handling | arm_mgmt |
| [#2557](https://github.com/Azure/azure-sdk-for-net/issues/2557) | ✅ yes | error_path_test | error_handling | other |
| [#1986](https://github.com/Azure/azure-sdk-for-net/issues/1986) | ⚠️ partially | error_path_test | error_handling | arm_mgmt |
| [#1894](https://github.com/Azure/azure-sdk-for-net/issues/1894) | ✅ yes | error_path_test | error_handling | service_bus |
| [#1887](https://github.com/Azure/azure-sdk-for-net/issues/1887) | ⚠️ partially | error_path_test | api_surface | other |
| [#1863](https://github.com/Azure/azure-sdk-for-net/issues/1863) | ✅ yes | serialization_test | serialization | identity |

### JS (63 issues)

| Issue | Catchable | Test Type | Bug Category | Service Area |
|---|---|---|---|---|
| [#28343](https://github.com/Azure/azure-sdk-for-js/issues/28343) | ✅ yes | unit_test | streaming | openai |
| [#28145](https://github.com/Azure/azure-sdk-for-js/issues/28145) | ✅ yes | integration_test | type_error | openai |
| [#28093](https://github.com/Azure/azure-sdk-for-js/issues/28093) | ✅ yes | integration_test | streaming | openai |
| [#27913](https://github.com/Azure/azure-sdk-for-js/issues/27913) | ✅ yes | error_path_test | error_handling | storage |
| [#27813](https://github.com/Azure/azure-sdk-for-js/issues/27813) | ✅ yes | integration_test | connection_retry | storage |
| [#26953](https://github.com/Azure/azure-sdk-for-js/issues/26953) | ✅ yes | error_path_test | error_handling | openai |
| [#26610](https://github.com/Azure/azure-sdk-for-js/issues/26610) | ✅ yes | integration_test | error_handling | keyvault |
| [#26547](https://github.com/Azure/azure-sdk-for-js/issues/26547) | ✅ yes | integration_test | api_surface | keyvault |
| [#26485](https://github.com/Azure/azure-sdk-for-js/issues/26485) | ✅ yes | unit_test | type_error | openai |
| [#26414](https://github.com/Azure/azure-sdk-for-js/issues/26414) | ✅ yes | error_path_test | error_handling | communication |
| [#26001](https://github.com/Azure/azure-sdk-for-js/issues/26001) | ⚠️ partially | integration_test | api_surface | keyvault |
| [#25915](https://github.com/Azure/azure-sdk-for-js/issues/25915) | ⚠️ partially | integration_test | memory_lifecycle | communication |
| [#25532](https://github.com/Azure/azure-sdk-for-js/issues/25532) | ✅ yes | unit_test | auth | identity |
| [#24669](https://github.com/Azure/azure-sdk-for-js/issues/24669) | ✅ yes | unit_test | connection_retry | storage |
| [#24542](https://github.com/Azure/azure-sdk-for-js/issues/24542) | ⚠️ partially | integration_test | error_handling | service_bus |
| [#23849](https://github.com/Azure/azure-sdk-for-js/issues/23849) | ✅ yes | error_path_test | error_handling | core |
| [#23331](https://github.com/Azure/azure-sdk-for-js/issues/23331) | ✅ yes | error_path_test | auth | keyvault |
| [#23036](https://github.com/Azure/azure-sdk-for-js/issues/23036) | ✅ yes | error_path_test | error_handling | other |
| [#23025](https://github.com/Azure/azure-sdk-for-js/issues/23025) | ✅ yes | error_path_test | error_handling | cosmos |
| [#22790](https://github.com/Azure/azure-sdk-for-js/issues/22790) | ✅ yes | error_path_test | error_handling | communication |
| [#22722](https://github.com/Azure/azure-sdk-for-js/issues/22722) | ✅ yes | error_path_test | auth | identity |
| [#21614](https://github.com/Azure/azure-sdk-for-js/issues/21614) | ✅ yes | error_path_test | error_handling | communication |
| [#20689](https://github.com/Azure/azure-sdk-for-js/issues/20689) | ✅ yes | error_path_test | auth | cosmos |
| [#20500](https://github.com/Azure/azure-sdk-for-js/issues/20500) | ✅ yes | error_path_test | auth | identity |
| [#18406](https://github.com/Azure/azure-sdk-for-js/issues/18406) | ✅ yes | error_path_test | error_handling | identity |
| [#16842](https://github.com/Azure/azure-sdk-for-js/issues/16842) | ✅ yes | error_path_test | error_handling | other |
| [#15398](https://github.com/Azure/azure-sdk-for-js/issues/15398) | ✅ yes | error_path_test | type_error | service_bus |
| [#15002](https://github.com/Azure/azure-sdk-for-js/issues/15002) | ✅ yes | error_path_test | error_handling | event_hubs |
| [#13500](https://github.com/Azure/azure-sdk-for-js/issues/13500) | ✅ yes | error_path_test | connection_retry | service_bus |
| [#13432](https://github.com/Azure/azure-sdk-for-js/issues/13432) | ✅ yes | integration_test | streaming | storage |
| [#12095](https://github.com/Azure/azure-sdk-for-js/issues/12095) | ✅ yes | error_path_test | error_handling | service_bus |
| [#11850](https://github.com/Azure/azure-sdk-for-js/issues/11850) | ✅ yes | integration_test | memory_lifecycle | storage |
| [#11309](https://github.com/Azure/azure-sdk-for-js/issues/11309) | ✅ yes | error_path_test | error_handling | cosmos |
| [#10828](https://github.com/Azure/azure-sdk-for-js/issues/10828) | ✅ yes | error_path_test | auth | keyvault |
| [#10397](https://github.com/Azure/azure-sdk-for-js/issues/10397) | ✅ yes | error_path_test | type_error | service_bus |
| [#10395](https://github.com/Azure/azure-sdk-for-js/issues/10395) | ✅ yes | error_path_test | error_handling | service_bus |
| [#10128](https://github.com/Azure/azure-sdk-for-js/issues/10128) | ✅ yes | integration_test | streaming | search |
| [#9792](https://github.com/Azure/azure-sdk-for-js/issues/9792) | ✅ yes | error_path_test | type_error | service_bus |
| [#9311](https://github.com/Azure/azure-sdk-for-js/issues/9311) | ✅ yes | error_path_test | type_error | event_hubs |
| [#9005](https://github.com/Azure/azure-sdk-for-js/issues/9005) | ✅ yes | error_path_test | auth | keyvault |
| [#8903](https://github.com/Azure/azure-sdk-for-js/issues/8903) | ✅ yes | error_path_test | error_handling | storage |
| [#6904](https://github.com/Azure/azure-sdk-for-js/issues/6904) | ⚠️ partially | error_path_test | streaming | storage |
| [#6816](https://github.com/Azure/azure-sdk-for-js/issues/6816) | ✅ yes | error_path_test | error_handling | service_bus |
| [#5793](https://github.com/Azure/azure-sdk-for-js/issues/5793) | ✅ yes | error_path_test | error_handling | storage |
| [#5716](https://github.com/Azure/azure-sdk-for-js/issues/5716) | ✅ yes | unit_test | type_error | storage |
| [#5099](https://github.com/Azure/azure-sdk-for-js/issues/5099) | ✅ yes | error_path_test | error_handling | service_bus |
| [#4884](https://github.com/Azure/azure-sdk-for-js/issues/4884) | ✅ yes | error_path_test | error_handling | cosmos |
| [#4822](https://github.com/Azure/azure-sdk-for-js/issues/4822) | ✅ yes | error_path_test | error_handling | cosmos |
| [#3942](https://github.com/Azure/azure-sdk-for-js/issues/3942) | ✅ yes | error_path_test | error_handling | event_hubs |
| [#3736](https://github.com/Azure/azure-sdk-for-js/issues/3736) | ✅ yes | unit_test | api_surface | arm_mgmt |
| [#3597](https://github.com/Azure/azure-sdk-for-js/issues/3597) | ✅ yes | error_path_test | error_handling | event_hubs |
| [#2855](https://github.com/Azure/azure-sdk-for-js/issues/2855) | ✅ yes | error_path_test | connection_retry | service_bus |
| [#2497](https://github.com/Azure/azure-sdk-for-js/issues/2497) | ✅ yes | error_path_test | error_handling | service_bus |
| [#2144](https://github.com/Azure/azure-sdk-for-js/issues/2144) | ✅ yes | integration_test | api_surface | service_bus |
| [#1592](https://github.com/Azure/azure-sdk-for-js/issues/1592) | ✅ yes | error_path_test | error_handling | service_bus |
| [#1476](https://github.com/Azure/azure-sdk-for-js/issues/1476) | ✅ yes | error_path_test | error_handling | service_bus |
| [#1466](https://github.com/Azure/azure-sdk-for-js/issues/1466) | ✅ yes | integration_test | api_surface | service_bus |
| [#1263](https://github.com/Azure/azure-sdk-for-js/issues/1263) | ✅ yes | error_path_test | error_handling | service_bus |
| [#1192](https://github.com/Azure/azure-sdk-for-js/issues/1192) | ✅ yes | unit_test | memory_lifecycle | service_bus |
| [#1051](https://github.com/Azure/azure-sdk-for-js/issues/1051) | ✅ yes | error_path_test | error_handling | service_bus |
| [#1023](https://github.com/Azure/azure-sdk-for-js/issues/1023) | ✅ yes | unit_test | memory_lifecycle | service_bus |
| [#998](https://github.com/Azure/azure-sdk-for-js/issues/998) | ✅ yes | error_path_test | error_handling | service_bus |
| [#989](https://github.com/Azure/azure-sdk-for-js/issues/989) | ✅ yes | error_path_test | error_handling | service_bus |

### Go (41 issues)

| Issue | Catchable | Test Type | Bug Category | Service Area |
|---|---|---|---|---|
| [#25758](https://github.com/Azure/azure-sdk-for-go/issues/25758) | ⚠️ partially | error_path_test | auth | identity |
| [#25356](https://github.com/Azure/azure-sdk-for-go/issues/25356) | ✅ yes | error_path_test | error_handling | event_hubs |
| [#24641](https://github.com/Azure/azure-sdk-for-go/issues/24641) | ✅ yes | error_path_test | error_handling | storage |
| [#24566](https://github.com/Azure/azure-sdk-for-go/issues/24566) | ✅ yes | error_path_test | error_handling | storage |
| [#24351](https://github.com/Azure/azure-sdk-for-go/issues/24351) | ✅ yes | error_path_test | error_handling | cosmos |
| [#24274](https://github.com/Azure/azure-sdk-for-go/issues/24274) | ✅ yes | error_path_test | error_handling | arm_mgmt |
| [#23851](https://github.com/Azure/azure-sdk-for-go/issues/23851) | ✅ yes | error_path_test | auth | identity |
| [#21869](https://github.com/Azure/azure-sdk-for-go/issues/21869) | ✅ yes | error_path_test | type_error | storage |
| [#21017](https://github.com/Azure/azure-sdk-for-go/issues/21017) | ✅ yes | error_path_test | error_handling | service_bus |
| [#20842](https://github.com/Azure/azure-sdk-for-go/issues/20842) | ✅ yes | integration_test | error_handling | other |
| [#20805](https://github.com/Azure/azure-sdk-for-go/issues/20805) | ✅ yes | error_path_test | error_handling | arm_mgmt |
| [#20374](https://github.com/Azure/azure-sdk-for-go/issues/20374) | ✅ yes | error_path_test | error_handling | service_bus |
| [#20323](https://github.com/Azure/azure-sdk-for-go/issues/20323) | ✅ yes | error_path_test | error_handling | service_bus |
| [#19956](https://github.com/Azure/azure-sdk-for-go/issues/19956) | ✅ yes | error_path_test | error_handling | core |
| [#19889](https://github.com/Azure/azure-sdk-for-go/issues/19889) | ✅ yes | integration_test | connection_retry | core |
| [#19707](https://github.com/Azure/azure-sdk-for-go/issues/19707) | ✅ yes | integration_test | api_surface | arm_mgmt |
| [#19347](https://github.com/Azure/azure-sdk-for-go/issues/19347) | ✅ yes | error_path_test | connection_retry | event_hubs |
| [#19223](https://github.com/Azure/azure-sdk-for-go/issues/19223) | ✅ yes | error_path_test | error_handling | app_config |
| [#18777](https://github.com/Azure/azure-sdk-for-go/issues/18777) | ✅ yes | error_path_test | auth | storage |
| [#18321](https://github.com/Azure/azure-sdk-for-go/issues/18321) | ✅ yes | error_path_test | error_handling | keyvault |
| [#17591](https://github.com/Azure/azure-sdk-for-go/issues/17591) | ✅ yes | error_path_test | error_handling | arm_mgmt |
| [#17565](https://github.com/Azure/azure-sdk-for-go/issues/17565) | ✅ yes | error_path_test | error_handling | service_bus |
| [#17490](https://github.com/Azure/azure-sdk-for-go/issues/17490) | ✅ yes | error_path_test | error_handling | identity |
| [#17412](https://github.com/Azure/azure-sdk-for-go/issues/17412) | ✅ yes | error_path_test | error_handling | service_bus |
| [#17183](https://github.com/Azure/azure-sdk-for-go/issues/17183) | ✅ yes | error_path_test | memory_lifecycle | service_bus |
| [#17013](https://github.com/Azure/azure-sdk-for-go/issues/17013) | ✅ yes | error_path_test | error_handling | arm_mgmt |
| [#16394](https://github.com/Azure/azure-sdk-for-go/issues/16394) | ✅ yes | error_path_test | auth | service_bus |
| [#15632](https://github.com/Azure/azure-sdk-for-go/issues/15632) | ✅ yes | error_path_test | auth | identity |
| [#14750](https://github.com/Azure/azure-sdk-for-go/issues/14750) | ✅ yes | integration_test | other | storage |
| [#14402](https://github.com/Azure/azure-sdk-for-go/issues/14402) | ✅ yes | error_path_test | error_handling | storage |
| [#14334](https://github.com/Azure/azure-sdk-for-go/issues/14334) | ✅ yes | integration_test | other | arm_mgmt |
| [#14120](https://github.com/Azure/azure-sdk-for-go/issues/14120) | ✅ yes | error_path_test | error_handling | other |
| [#13882](https://github.com/Azure/azure-sdk-for-go/issues/13882) | ✅ yes | error_path_test | error_handling | core |
| [#4829](https://github.com/Azure/azure-sdk-for-go/issues/4829) | ✅ yes | error_path_test | error_handling | arm_mgmt |
| [#2822](https://github.com/Azure/azure-sdk-for-go/issues/2822) | ✅ yes | error_path_test | error_handling | arm_mgmt |
| [#2214](https://github.com/Azure/azure-sdk-for-go/issues/2214) | ✅ yes | error_path_test | error_handling | arm_mgmt |
| [#1825](https://github.com/Azure/azure-sdk-for-go/issues/1825) | ✅ yes | error_path_test | error_handling | arm_mgmt |
| [#686](https://github.com/Azure/azure-sdk-for-go/issues/686) | ✅ yes | error_path_test | error_handling | core |
| [#576](https://github.com/Azure/azure-sdk-for-go/issues/576) | ✅ yes | error_path_test | error_handling | arm_mgmt |
| [#210](https://github.com/Azure/azure-sdk-for-go/issues/210) | ✅ yes | error_path_test | api_surface | storage |
| [#205](https://github.com/Azure/azure-sdk-for-go/issues/205) | ✅ yes | error_path_test | error_handling | arm_mgmt |

---

## Missing Edge Case / Boundary Tests

**232 issues (16.1%)**

These bugs would have been caught by testing boundary conditions: empty collections, zero-length strings, max-length values, Unicode/special characters, very large payloads, null optional parameters, and single-item vs. multi-item operations.

### Python (78 issues)

| Issue | Catchable | Test Type | Bug Category | Service Area |
|---|---|---|---|---|
| [#43842](https://github.com/Azure/azure-sdk-for-python/issues/43842) | ✅ yes | unit_test | api_surface | ai_ml |
| [#42093](https://github.com/Azure/azure-sdk-for-python/issues/42093) | ✅ yes | unit_test | api_surface | communication |
| [#41985](https://github.com/Azure/azure-sdk-for-python/issues/41985) | ✅ yes | unit_test | type_error | ai_ml |
| [#39947](https://github.com/Azure/azure-sdk-for-python/issues/39947) | ✅ yes | integration_test | api_surface | arm_mgmt |
| [#39565](https://github.com/Azure/azure-sdk-for-python/issues/39565) | ✅ yes | integration_test | streaming | openai |
| [#39529](https://github.com/Azure/azure-sdk-for-python/issues/39529) | ✅ yes | integration_test | api_surface | ai_ml |
| [#37496](https://github.com/Azure/azure-sdk-for-python/issues/37496) | ✅ yes | edge_case_test | api_surface | ai_ml |
| [#36631](https://github.com/Azure/azure-sdk-for-python/issues/36631) | ✅ yes | integration_test | other | ai_ml |
| [#35285](https://github.com/Azure/azure-sdk-for-python/issues/35285) | ✅ yes | edge_case_test | type_error | ai_ml |
| [#34891](https://github.com/Azure/azure-sdk-for-python/issues/34891) | ✅ yes | integration_test | other | ai_ml |
| [#34771](https://github.com/Azure/azure-sdk-for-python/issues/34771) | ✅ yes | edge_case_test | other | app_config |
| [#34065](https://github.com/Azure/azure-sdk-for-python/issues/34065) | ✅ yes | edge_case_test | serialization | storage |
| [#33198](https://github.com/Azure/azure-sdk-for-python/issues/33198) | ✅ yes | edge_case_test | error_handling | storage |
| [#33154](https://github.com/Azure/azure-sdk-for-python/issues/33154) | ✅ yes | integration_test | error_handling | storage |
| [#32760](https://github.com/Azure/azure-sdk-for-python/issues/32760) | ✅ yes | edge_case_test | error_handling | other |
| [#32343](https://github.com/Azure/azure-sdk-for-python/issues/32343) | ✅ yes | edge_case_test | error_handling | cosmos |
| [#32324](https://github.com/Azure/azure-sdk-for-python/issues/32324) | ✅ yes | edge_case_test | type_error | storage |
| [#31935](https://github.com/Azure/azure-sdk-for-python/issues/31935) | ✅ yes | edge_case_test | error_handling | communication |
| [#31090](https://github.com/Azure/azure-sdk-for-python/issues/31090) | ✅ yes | edge_case_test | error_handling | storage |
| [#30900](https://github.com/Azure/azure-sdk-for-python/issues/30900) | ✅ yes | edge_case_test | error_handling | core |
| [#30261](https://github.com/Azure/azure-sdk-for-python/issues/30261) | ✅ yes | unit_test | type_error | other |
| [#30092](https://github.com/Azure/azure-sdk-for-python/issues/30092) | ✅ yes | unit_test | type_error | ai_ml |
| [#29563](https://github.com/Azure/azure-sdk-for-python/issues/29563) | ✅ yes | unit_test | perf | monitor |
| [#28482](https://github.com/Azure/azure-sdk-for-python/issues/28482) | ✅ yes | integration_test | error_handling | storage |
| [#27980](https://github.com/Azure/azure-sdk-for-python/issues/27980) | ✅ yes | integration_test | error_handling | ai_ml |
| [#26720](https://github.com/Azure/azure-sdk-for-python/issues/26720) | ✅ yes | edge_case_test | api_surface | storage |
| [#25387](https://github.com/Azure/azure-sdk-for-python/issues/25387) | ✅ yes | edge_case_test | api_surface | storage |
| [#24663](https://github.com/Azure/azure-sdk-for-python/issues/24663) | ✅ yes | integration_test | api_surface | arm_mgmt |
| [#24421](https://github.com/Azure/azure-sdk-for-python/issues/24421) | ✅ yes | error_path_test | api_surface | storage |
| [#23834](https://github.com/Azure/azure-sdk-for-python/issues/23834) | ✅ yes | error_path_test | error_handling | storage |
| [#23759](https://github.com/Azure/azure-sdk-for-python/issues/23759) | ✅ yes | edge_case_test | error_handling | storage |
| [#23744](https://github.com/Azure/azure-sdk-for-python/issues/23744) | ✅ yes | integration_test | api_surface | ai_ml |
| [#23714](https://github.com/Azure/azure-sdk-for-python/issues/23714) | ✅ yes | integration_test | streaming | storage |
| [#23561](https://github.com/Azure/azure-sdk-for-python/issues/23561) | ✅ yes | error_path_test | error_handling | arm_mgmt |
| [#23131](https://github.com/Azure/azure-sdk-for-python/issues/23131) | ✅ yes | integration_test | api_surface | storage |
| [#22861](https://github.com/Azure/azure-sdk-for-python/issues/22861) | ✅ yes | edge_case_test | api_surface | cosmos |
| [#22529](https://github.com/Azure/azure-sdk-for-python/issues/22529) | ✅ yes | unit_test | other | service_bus |
| [#22443](https://github.com/Azure/azure-sdk-for-python/issues/22443) | ✅ yes | integration_test | other | storage |
| [#22297](https://github.com/Azure/azure-sdk-for-python/issues/22297) | ✅ yes | edge_case_test | type_error | storage |
| [#22229](https://github.com/Azure/azure-sdk-for-python/issues/22229) | ✅ yes | unit_test | api_surface | other |
| [#21876](https://github.com/Azure/azure-sdk-for-python/issues/21876) | ✅ yes | integration_test | api_surface | storage |
| [#21340](https://github.com/Azure/azure-sdk-for-python/issues/21340) | ✅ yes | unit_test | type_error | core |
| [#21273](https://github.com/Azure/azure-sdk-for-python/issues/21273) | ✅ yes | unit_test | error_handling | core |
| [#21083](https://github.com/Azure/azure-sdk-for-python/issues/21083) | ⚠️ partially | integration_test | api_surface | other |
| [#20478](https://github.com/Azure/azure-sdk-for-python/issues/20478) | ✅ yes | unit_test | error_handling | storage |
| [#20199](https://github.com/Azure/azure-sdk-for-python/issues/20199) | ✅ yes | edge_case_test | type_error | cosmos |
| [#19600](https://github.com/Azure/azure-sdk-for-python/issues/19600) | ✅ yes | integration_test | api_surface | other |
| [#19420](https://github.com/Azure/azure-sdk-for-python/issues/19420) | ⚠️ partially | integration_test | api_surface | storage |
| [#19200](https://github.com/Azure/azure-sdk-for-python/issues/19200) | ✅ yes | unit_test | api_surface | storage |
| [#18490](https://github.com/Azure/azure-sdk-for-python/issues/18490) | ✅ yes | unit_test | type_error | storage |
| [#18416](https://github.com/Azure/azure-sdk-for-python/issues/18416) | ✅ yes | integration_test | api_surface | cosmos |
| [#18050](https://github.com/Azure/azure-sdk-for-python/issues/18050) | ✅ yes | unit_test | api_surface | arm_mgmt |
| [#17835](https://github.com/Azure/azure-sdk-for-python/issues/17835) | ✅ yes | unit_test | api_surface | storage |
| [#17661](https://github.com/Azure/azure-sdk-for-python/issues/17661) | ✅ yes | unit_test | memory_lifecycle | identity |
| [#17632](https://github.com/Azure/azure-sdk-for-python/issues/17632) | ✅ yes | unit_test | type_error | arm_mgmt |
| [#17481](https://github.com/Azure/azure-sdk-for-python/issues/17481) | ✅ yes | unit_test | error_handling | core |
| [#17427](https://github.com/Azure/azure-sdk-for-python/issues/17427) | ✅ yes | unit_test | type_error | core |
| [#17418](https://github.com/Azure/azure-sdk-for-python/issues/17418) | ✅ yes | integration_test | streaming | storage |
| [#17301](https://github.com/Azure/azure-sdk-for-python/issues/17301) | ❌ no | integration_test | error_handling | storage |
| [#16805](https://github.com/Azure/azure-sdk-for-python/issues/16805) | ✅ yes | unit_test | other | ai_ml |
| [#16723](https://github.com/Azure/azure-sdk-for-python/issues/16723) | ✅ yes | integration_test | streaming | storage |
| [#16572](https://github.com/Azure/azure-sdk-for-python/issues/16572) | ✅ yes | integration_test | api_surface | storage |
| [#16531](https://github.com/Azure/azure-sdk-for-python/issues/16531) | ✅ yes | edge_case_test | api_surface | storage |
| [#16314](https://github.com/Azure/azure-sdk-for-python/issues/16314) | ✅ yes | serialization_test | type_error | storage |
| [#16168](https://github.com/Azure/azure-sdk-for-python/issues/16168) | ✅ yes | edge_case_test | api_surface | storage |
| [#16019](https://github.com/Azure/azure-sdk-for-python/issues/16019) | ✅ yes | unit_test | type_error | storage |
| [#15882](https://github.com/Azure/azure-sdk-for-python/issues/15882) | ✅ yes | edge_case_test | type_error | storage |
| [#15648](https://github.com/Azure/azure-sdk-for-python/issues/15648) | ✅ yes | edge_case_test | streaming | storage |
| [#13003](https://github.com/Azure/azure-sdk-for-python/issues/13003) | ✅ yes | serialization_test | type_error | storage |
| [#11548](https://github.com/Azure/azure-sdk-for-python/issues/11548) | ✅ yes | unit_test | api_surface | identity |
| [#3238](https://github.com/Azure/azure-sdk-for-python/issues/3238) | ✅ yes | unit_test | api_surface | arm_mgmt |
| [#2356](https://github.com/Azure/azure-sdk-for-python/issues/2356) | ✅ yes | integration_test | other | service_bus |
| [#338](https://github.com/Azure/azure-sdk-for-python/issues/338) | ✅ yes | edge_case_test | memory_lifecycle | storage |
| [#273](https://github.com/Azure/azure-sdk-for-python/issues/273) | ✅ yes | unit_test | type_error | other |
| [#245](https://github.com/Azure/azure-sdk-for-python/issues/245) | ✅ yes | integration_test | other | core |
| [#244](https://github.com/Azure/azure-sdk-for-python/issues/244) | ✅ yes | serialization_test | other | other |
| [#212](https://github.com/Azure/azure-sdk-for-python/issues/212) | ✅ yes | serialization_test | serialization | storage |
| [#116](https://github.com/Azure/azure-sdk-for-python/issues/116) | ✅ yes | serialization_test | type_error | storage |

### Java (19 issues)

| Issue | Catchable | Test Type | Bug Category | Service Area |
|---|---|---|---|---|
| [#47640](https://github.com/Azure/azure-sdk-for-java/issues/47640) | ✅ yes | edge_case_test | api_surface | arm_mgmt |
| [#47593](https://github.com/Azure/azure-sdk-for-java/issues/47593) | ✅ yes | edge_case_test | type_error | cosmos |
| [#47587](https://github.com/Azure/azure-sdk-for-java/issues/47587) | ✅ yes | edge_case_test | error_handling | app_config |
| [#47511](https://github.com/Azure/azure-sdk-for-java/issues/47511) | ✅ yes | edge_case_test | connection_retry | core |
| [#47033](https://github.com/Azure/azure-sdk-for-java/issues/47033) | ✅ yes | edge_case_test | error_handling | app_config |
| [#46551](https://github.com/Azure/azure-sdk-for-java/issues/46551) | ✅ yes | edge_case_test | api_surface | storage |
| [#46434](https://github.com/Azure/azure-sdk-for-java/issues/46434) | ✅ yes | edge_case_test | api_surface | storage |
| [#45839](https://github.com/Azure/azure-sdk-for-java/issues/45839) | ✅ yes | unit_test | api_surface | service_bus |
| [#45562](https://github.com/Azure/azure-sdk-for-java/issues/45562) | ✅ yes | edge_case_test | api_surface | other |
| [#44529](https://github.com/Azure/azure-sdk-for-java/issues/44529) | ✅ yes | edge_case_test | api_surface | other |
| [#43912](https://github.com/Azure/azure-sdk-for-java/issues/43912) | ✅ yes | integration_test | api_surface | cosmos |
| [#43895](https://github.com/Azure/azure-sdk-for-java/issues/43895) | ✅ yes | edge_case_test | type_error | identity |
| [#18156](https://github.com/Azure/azure-sdk-for-java/issues/18156) | ✅ yes | edge_case_test | error_handling | core |
| [#17010](https://github.com/Azure/azure-sdk-for-java/issues/17010) | ✅ yes | edge_case_test | other | cosmos |
| [#16453](https://github.com/Azure/azure-sdk-for-java/issues/16453) | ✅ yes | edge_case_test | type_error | storage |
| [#16386](https://github.com/Azure/azure-sdk-for-java/issues/16386) | ✅ yes | edge_case_test | type_error | storage |
| [#15827](https://github.com/Azure/azure-sdk-for-java/issues/15827) | ✅ yes | edge_case_test | api_surface | storage |
| [#15291](https://github.com/Azure/azure-sdk-for-java/issues/15291) | ✅ yes | edge_case_test | serialization | cosmos |
| [#14513](https://github.com/Azure/azure-sdk-for-java/issues/14513) | ✅ yes | edge_case_test | api_surface | keyvault |

### .NET (67 issues)

| Issue | Catchable | Test Type | Bug Category | Service Area |
|---|---|---|---|---|
| [#55272](https://github.com/Azure/azure-sdk-for-net/issues/55272) | ✅ yes | unit_test | type_error | core |
| [#54802](https://github.com/Azure/azure-sdk-for-net/issues/54802) | ✅ yes | unit_test | other | other |
| [#52793](https://github.com/Azure/azure-sdk-for-net/issues/52793) | ✅ yes | edge_case_test | error_handling | storage |
| [#48460](https://github.com/Azure/azure-sdk-for-net/issues/48460) | ✅ yes | unit_test | other | event_hubs |
| [#47017](https://github.com/Azure/azure-sdk-for-net/issues/47017) | ✅ yes | unit_test | memory_lifecycle | storage |
| [#40023](https://github.com/Azure/azure-sdk-for-net/issues/40023) | ✅ yes | edge_case_test | other | monitor |
| [#35972](https://github.com/Azure/azure-sdk-for-net/issues/35972) | ✅ yes | edge_case_test | error_handling | storage |
| [#35475](https://github.com/Azure/azure-sdk-for-net/issues/35475) | ✅ yes | unit_test | api_surface | core |
| [#35365](https://github.com/Azure/azure-sdk-for-net/issues/35365) | ✅ yes | edge_case_test | serialization | arm_mgmt |
| [#35154](https://github.com/Azure/azure-sdk-for-net/issues/35154) | ✅ yes | edge_case_test | type_error | arm_mgmt |
| [#34794](https://github.com/Azure/azure-sdk-for-net/issues/34794) | ✅ yes | edge_case_test | type_error | storage |
| [#34463](https://github.com/Azure/azure-sdk-for-net/issues/34463) | ✅ yes | edge_case_test | error_handling | storage |
| [#33018](https://github.com/Azure/azure-sdk-for-net/issues/33018) | ✅ yes | edge_case_test | memory_lifecycle | storage |
| [#31395](https://github.com/Azure/azure-sdk-for-net/issues/31395) | ✅ yes | edge_case_test | memory_lifecycle | event_hubs |
| [#31054](https://github.com/Azure/azure-sdk-for-net/issues/31054) | ✅ yes | edge_case_test | error_handling | communication |
| [#29942](https://github.com/Azure/azure-sdk-for-net/issues/29942) | ✅ yes | integration_test | api_surface | storage |
| [#29742](https://github.com/Azure/azure-sdk-for-net/issues/29742) | ✅ yes | edge_case_test | api_surface | storage |
| [#29245](https://github.com/Azure/azure-sdk-for-net/issues/29245) | ✅ yes | edge_case_test | api_surface | storage |
| [#29156](https://github.com/Azure/azure-sdk-for-net/issues/29156) | ✅ yes | edge_case_test | error_handling | storage |
| [#29062](https://github.com/Azure/azure-sdk-for-net/issues/29062) | ✅ yes | edge_case_test | error_handling | storage |
| [#27692](https://github.com/Azure/azure-sdk-for-net/issues/27692) | ✅ yes | integration_test | api_surface | storage |
| [#27242](https://github.com/Azure/azure-sdk-for-net/issues/27242) | ✅ yes | integration_test | api_surface | storage |
| [#25051](https://github.com/Azure/azure-sdk-for-net/issues/25051) | ✅ yes | edge_case_test | api_surface | storage |
| [#24955](https://github.com/Azure/azure-sdk-for-net/issues/24955) | ✅ yes | unit_test | api_surface | storage |
| [#23976](https://github.com/Azure/azure-sdk-for-net/issues/23976) | ✅ yes | serialization_test | serialization | storage |
| [#23634](https://github.com/Azure/azure-sdk-for-net/issues/23634) | ✅ yes | edge_case_test | api_surface | storage |
| [#23134](https://github.com/Azure/azure-sdk-for-net/issues/23134) | ✅ yes | edge_case_test | type_error | ai_ml |
| [#22616](https://github.com/Azure/azure-sdk-for-net/issues/22616) | ✅ yes | error_path_test | error_handling | storage |
| [#22329](https://github.com/Azure/azure-sdk-for-net/issues/22329) | ✅ yes | serialization_test | serialization | storage |
| [#21956](https://github.com/Azure/azure-sdk-for-net/issues/21956) | ✅ yes | integration_test | other | storage |
| [#20950](https://github.com/Azure/azure-sdk-for-net/issues/20950) | ✅ yes | error_path_test | error_handling | storage |
| [#19329](https://github.com/Azure/azure-sdk-for-net/issues/19329) | ✅ yes | edge_case_test | type_error | storage |
| [#18976](https://github.com/Azure/azure-sdk-for-net/issues/18976) | ✅ yes | edge_case_test | memory_lifecycle | storage |
| [#18190](https://github.com/Azure/azure-sdk-for-net/issues/18190) | ✅ yes | edge_case_test | serialization | core |
| [#17268](https://github.com/Azure/azure-sdk-for-net/issues/17268) | ✅ yes | edge_case_test | streaming | storage |
| [#16570](https://github.com/Azure/azure-sdk-for-net/issues/16570) | ✅ yes | edge_case_test | error_handling | search |
| [#15831](https://github.com/Azure/azure-sdk-for-net/issues/15831) | ✅ yes | edge_case_test | serialization | storage |
| [#15343](https://github.com/Azure/azure-sdk-for-net/issues/15343) | ✅ yes | edge_case_test | error_handling | service_bus |
| [#14724](https://github.com/Azure/azure-sdk-for-net/issues/14724) | ✅ yes | unit_test | error_handling | storage |
| [#14585](https://github.com/Azure/azure-sdk-for-net/issues/14585) | ✅ yes | unit_test | error_handling | identity |
| [#14080](https://github.com/Azure/azure-sdk-for-net/issues/14080) | ✅ yes | integration_test | streaming | storage |
| [#13971](https://github.com/Azure/azure-sdk-for-net/issues/13971) | ✅ yes | unit_test | api_surface | ai_ml |
| [#13877](https://github.com/Azure/azure-sdk-for-net/issues/13877) | ✅ yes | integration_test | streaming | storage |
| [#13441](https://github.com/Azure/azure-sdk-for-net/issues/13441) | ✅ yes | edge_case_test | streaming | storage |
| [#12956](https://github.com/Azure/azure-sdk-for-net/issues/12956) | ✅ yes | unit_test | error_handling | core |
| [#12801](https://github.com/Azure/azure-sdk-for-net/issues/12801) | ✅ yes | edge_case_test | streaming | storage |
| [#12102](https://github.com/Azure/azure-sdk-for-net/issues/12102) | ✅ yes | unit_test | serialization | core |
| [#11881](https://github.com/Azure/azure-sdk-for-net/issues/11881) | ✅ yes | integration_test | api_surface | ai_ml |
| [#11093](https://github.com/Azure/azure-sdk-for-net/issues/11093) | ✅ yes | edge_case_test | api_surface | storage |
| [#10910](https://github.com/Azure/azure-sdk-for-net/issues/10910) | ✅ yes | edge_case_test | type_error | keyvault |
| [#10816](https://github.com/Azure/azure-sdk-for-net/issues/10816) | ✅ yes | edge_case_test | type_error | identity |
| [#10425](https://github.com/Azure/azure-sdk-for-net/issues/10425) | ✅ yes | integration_test | api_surface | storage |
| [#9489](https://github.com/Azure/azure-sdk-for-net/issues/9489) | ✅ yes | edge_case_test | error_handling | storage |
| [#9322](https://github.com/Azure/azure-sdk-for-net/issues/9322) | ✅ yes | unit_test | connection_retry | event_hubs |
| [#9304](https://github.com/Azure/azure-sdk-for-net/issues/9304) | ✅ yes | edge_case_test | error_handling | storage |
| [#9279](https://github.com/Azure/azure-sdk-for-net/issues/9279) | ✅ yes | integration_test | error_handling | service_bus |
| [#9158](https://github.com/Azure/azure-sdk-for-net/issues/9158) | ✅ yes | integration_test | streaming | event_hubs |
| [#8699](https://github.com/Azure/azure-sdk-for-net/issues/8699) | ✅ yes | edge_case_test | type_error | search |
| [#8490](https://github.com/Azure/azure-sdk-for-net/issues/8490) | ✅ yes | edge_case_test | error_handling | service_bus |
| [#7800](https://github.com/Azure/azure-sdk-for-net/issues/7800) | ✅ yes | edge_case_test | api_surface | storage |
| [#7783](https://github.com/Azure/azure-sdk-for-net/issues/7783) | ✅ yes | edge_case_test | other | event_hubs |
| [#7735](https://github.com/Azure/azure-sdk-for-net/issues/7735) | ✅ yes | integration_test | api_surface | arm_mgmt |
| [#7708](https://github.com/Azure/azure-sdk-for-net/issues/7708) | ✅ yes | edge_case_test | other | event_hubs |
| [#7659](https://github.com/Azure/azure-sdk-for-net/issues/7659) | ✅ yes | serialization_test | api_surface | storage |
| [#7658](https://github.com/Azure/azure-sdk-for-net/issues/7658) | ✅ yes | serialization_test | other | storage |
| [#6761](https://github.com/Azure/azure-sdk-for-net/issues/6761) | ⚠️ partially | edge_case_test | api_surface | search |
| [#2521](https://github.com/Azure/azure-sdk-for-net/issues/2521) | ✅ yes | edge_case_test | api_surface | other |

### JS (39 issues)

| Issue | Catchable | Test Type | Bug Category | Service Area |
|---|---|---|---|---|
| [#28951](https://github.com/Azure/azure-sdk-for-js/issues/28951) | ✅ yes | unit_test | api_surface | core |
| [#26431](https://github.com/Azure/azure-sdk-for-js/issues/26431) | ✅ yes | edge_case_test | api_surface | keyvault |
| [#26348](https://github.com/Azure/azure-sdk-for-js/issues/26348) | ✅ yes | serialization_test | serialization | openai |
| [#26293](https://github.com/Azure/azure-sdk-for-js/issues/26293) | ✅ yes | unit_test | other | search |
| [#25864](https://github.com/Azure/azure-sdk-for-js/issues/25864) | ✅ yes | unit_test | other | identity |
| [#25827](https://github.com/Azure/azure-sdk-for-js/issues/25827) | ✅ yes | unit_test | type_error | identity |
| [#25541](https://github.com/Azure/azure-sdk-for-js/issues/25541) | ✅ yes | unit_test | auth | identity |
| [#25463](https://github.com/Azure/azure-sdk-for-js/issues/25463) | ✅ yes | edge_case_test | auth | app_config |
| [#24901](https://github.com/Azure/azure-sdk-for-js/issues/24901) | ✅ yes | unit_test | type_error | other |
| [#24568](https://github.com/Azure/azure-sdk-for-js/issues/24568) | ✅ yes | edge_case_test | other | cosmos |
| [#23771](https://github.com/Azure/azure-sdk-for-js/issues/23771) | ✅ yes | integration_test | api_surface | cosmos |
| [#23313](https://github.com/Azure/azure-sdk-for-js/issues/23313) | ✅ yes | unit_test | other | core |
| [#22765](https://github.com/Azure/azure-sdk-for-js/issues/22765) | ✅ yes | edge_case_test | other | cosmos |
| [#18759](https://github.com/Azure/azure-sdk-for-js/issues/18759) | ✅ yes | edge_case_test | api_surface | cosmos |
| [#16754](https://github.com/Azure/azure-sdk-for-js/issues/16754) | ✅ yes | edge_case_test | type_error | core |
| [#16447](https://github.com/Azure/azure-sdk-for-js/issues/16447) | ✅ yes | unit_test | type_error | storage |
| [#15720](https://github.com/Azure/azure-sdk-for-js/issues/15720) | ✅ yes | edge_case_test | api_surface | core |
| [#15115](https://github.com/Azure/azure-sdk-for-js/issues/15115) | ✅ yes | edge_case_test | streaming | service_bus |
| [#14156](https://github.com/Azure/azure-sdk-for-js/issues/14156) | ✅ yes | unit_test | api_surface | cosmos |
| [#13173](https://github.com/Azure/azure-sdk-for-js/issues/13173) | ✅ yes | edge_case_test | api_surface | storage |
| [#12813](https://github.com/Azure/azure-sdk-for-js/issues/12813) | ✅ yes | edge_case_test | api_surface | storage |
| [#9171](https://github.com/Azure/azure-sdk-for-js/issues/9171) | ✅ yes | edge_case_test | api_surface | storage |
| [#8744](https://github.com/Azure/azure-sdk-for-js/issues/8744) | ✅ yes | edge_case_test | api_surface | storage |
| [#8595](https://github.com/Azure/azure-sdk-for-js/issues/8595) | ✅ yes | edge_case_test | api_surface | cosmos |
| [#7342](https://github.com/Azure/azure-sdk-for-js/issues/7342) | ✅ yes | edge_case_test | api_surface | arm_mgmt |
| [#6387](https://github.com/Azure/azure-sdk-for-js/issues/6387) | ✅ yes | edge_case_test | platform_compat | core |
| [#5817](https://github.com/Azure/azure-sdk-for-js/issues/5817) | ✅ yes | edge_case_test | api_surface | storage |
| [#5757](https://github.com/Azure/azure-sdk-for-js/issues/5757) | ✅ yes | integration_test | streaming | service_bus |
| [#5317](https://github.com/Azure/azure-sdk-for-js/issues/5317) | ✅ yes | integration_test | streaming | service_bus |
| [#4748](https://github.com/Azure/azure-sdk-for-js/issues/4748) | ✅ yes | integration_test | streaming | service_bus |
| [#4307](https://github.com/Azure/azure-sdk-for-js/issues/4307) | ✅ yes | edge_case_test | error_handling | event_hubs |
| [#3714](https://github.com/Azure/azure-sdk-for-js/issues/3714) | ✅ yes | integration_test | streaming | event_hubs |
| [#3471](https://github.com/Azure/azure-sdk-for-js/issues/3471) | ✅ yes | unit_test | other | event_hubs |
| [#2772](https://github.com/Azure/azure-sdk-for-js/issues/2772) | ✅ yes | integration_test | streaming | event_hubs |
| [#2288](https://github.com/Azure/azure-sdk-for-js/issues/2288) | ✅ yes | integration_test | api_surface | service_bus |
| [#2268](https://github.com/Azure/azure-sdk-for-js/issues/2268) | ✅ yes | integration_test | api_surface | service_bus |
| [#1811](https://github.com/Azure/azure-sdk-for-js/issues/1811) | ✅ yes | edge_case_test | api_surface | arm_mgmt |
| [#1611](https://github.com/Azure/azure-sdk-for-js/issues/1611) | ✅ yes | integration_test | api_surface | service_bus |
| [#1307](https://github.com/Azure/azure-sdk-for-js/issues/1307) | ✅ yes | integration_test | streaming | service_bus |

### Go (29 issues)

| Issue | Catchable | Test Type | Bug Category | Service Area |
|---|---|---|---|---|
| [#25036](https://github.com/Azure/azure-sdk-for-go/issues/25036) | ✅ yes | unit_test | api_surface | arm_mgmt |
| [#23092](https://github.com/Azure/azure-sdk-for-go/issues/23092) | ✅ yes | unit_test | api_surface | storage |
| [#22544](https://github.com/Azure/azure-sdk-for-go/issues/22544) | ✅ yes | edge_case_test | auth | identity |
| [#22281](https://github.com/Azure/azure-sdk-for-go/issues/22281) | ✅ yes | edge_case_test | serialization | storage |
| [#21629](https://github.com/Azure/azure-sdk-for-go/issues/21629) | ✅ yes | edge_case_test | other | openai |
| [#20718](https://github.com/Azure/azure-sdk-for-go/issues/20718) | ✅ yes | edge_case_test | serialization | storage |
| [#19651](https://github.com/Azure/azure-sdk-for-go/issues/19651) | ⚠️ partially | edge_case_test | other | storage |
| [#19507](https://github.com/Azure/azure-sdk-for-go/issues/19507) | ✅ yes | edge_case_test | auth | storage |
| [#19384](https://github.com/Azure/azure-sdk-for-go/issues/19384) | ✅ yes | edge_case_test | other | core |
| [#18975](https://github.com/Azure/azure-sdk-for-go/issues/18975) | ✅ yes | integration_test | other | storage |
| [#18424](https://github.com/Azure/azure-sdk-for-go/issues/18424) | ✅ yes | unit_test | type_error | other |
| [#17335](https://github.com/Azure/azure-sdk-for-go/issues/17335) | ✅ yes | edge_case_test | type_error | storage |
| [#17058](https://github.com/Azure/azure-sdk-for-go/issues/17058) | ✅ yes | edge_case_test | api_surface | service_bus |
| [#17029](https://github.com/Azure/azure-sdk-for-go/issues/17029) | ✅ yes | edge_case_test | type_error | service_bus |
| [#16295](https://github.com/Azure/azure-sdk-for-go/issues/16295) | ✅ yes | edge_case_test | api_surface | storage |
| [#15912](https://github.com/Azure/azure-sdk-for-go/issues/15912) | ✅ yes | unit_test | other | core |
| [#15308](https://github.com/Azure/azure-sdk-for-go/issues/15308) | ✅ yes | unit_test | api_surface | identity |
| [#15243](https://github.com/Azure/azure-sdk-for-go/issues/15243) | ✅ yes | unit_test | api_surface | core |
| [#15180](https://github.com/Azure/azure-sdk-for-go/issues/15180) | ✅ yes | unit_test | other | core |
| [#14426](https://github.com/Azure/azure-sdk-for-go/issues/14426) | ✅ yes | integration_test | other | arm_mgmt |
| [#12639](https://github.com/Azure/azure-sdk-for-go/issues/12639) | ✅ yes | integration_test | other | arm_mgmt |
| [#11763](https://github.com/Azure/azure-sdk-for-go/issues/11763) | ✅ yes | integration_test | other | arm_mgmt |
| [#6792](https://github.com/Azure/azure-sdk-for-go/issues/6792) | ✅ yes | integration_test | other | other |
| [#6498](https://github.com/Azure/azure-sdk-for-go/issues/6498) | ✅ yes | unit_test | api_surface | arm_mgmt |
| [#918](https://github.com/Azure/azure-sdk-for-go/issues/918) | ✅ yes | integration_test | error_handling | arm_mgmt |
| [#900](https://github.com/Azure/azure-sdk-for-go/issues/900) | ✅ yes | unit_test | api_surface | core |
| [#822](https://github.com/Azure/azure-sdk-for-go/issues/822) | ✅ yes | unit_test | type_error | storage |
| [#697](https://github.com/Azure/azure-sdk-for-go/issues/697) | ✅ yes | unit_test | api_surface | keyvault |
| [#548](https://github.com/Azure/azure-sdk-for-go/issues/548) | ✅ yes | edge_case_test | api_surface | storage |

---

## Missing API Contract Validation

**217 issues (15.1%)**

These bugs would have been caught by validating SDK behavior against its documented contract — methods that should throw specific exceptions, return types with missing fields, overloads that reject valid parameter combinations, and pagination correctness.

### Python (89 issues)

| Issue | Catchable | Test Type | Bug Category | Service Area |
|---|---|---|---|---|
| [#44624](https://github.com/Azure/azure-sdk-for-python/issues/44624) | ⚠️ partially | integration_test | error_handling | ai_ml |
| [#44492](https://github.com/Azure/azure-sdk-for-python/issues/44492) | ✅ yes | integration_test | error_handling | ai_ml |
| [#44480](https://github.com/Azure/azure-sdk-for-python/issues/44480) | ⚠️ partially | integration_test | error_handling | ai_ml |
| [#44479](https://github.com/Azure/azure-sdk-for-python/issues/44479) | ✅ yes | integration_test | error_handling | ai_ml |
| [#43039](https://github.com/Azure/azure-sdk-for-python/issues/43039) | ✅ yes | integration_test | api_surface | ai_ml |
| [#41960](https://github.com/Azure/azure-sdk-for-python/issues/41960) | ✅ yes | integration_test | api_surface | ai_ml |
| [#41197](https://github.com/Azure/azure-sdk-for-python/issues/41197) | ✅ yes | integration_test | api_surface | ai_ml |
| [#40810](https://github.com/Azure/azure-sdk-for-python/issues/40810) | ✅ yes | integration_test | error_handling | ai_ml |
| [#40631](https://github.com/Azure/azure-sdk-for-python/issues/40631) | ✅ yes | integration_test | error_handling | ai_ml |
| [#40473](https://github.com/Azure/azure-sdk-for-python/issues/40473) | ✅ yes | integration_test | api_surface | ai_ml |
| [#40070](https://github.com/Azure/azure-sdk-for-python/issues/40070) | ✅ yes | integration_test | api_surface | cosmos |
| [#39820](https://github.com/Azure/azure-sdk-for-python/issues/39820) | ✅ yes | unit_test | api_surface | ai_ml |
| [#39242](https://github.com/Azure/azure-sdk-for-python/issues/39242) | ✅ yes | integration_test | api_surface | arm_mgmt |
| [#35820](https://github.com/Azure/azure-sdk-for-python/issues/35820) | ✅ yes | integration_test | other | ai_ml |
| [#35242](https://github.com/Azure/azure-sdk-for-python/issues/35242) | ✅ yes | integration_test | api_surface | ai_ml |
| [#34373](https://github.com/Azure/azure-sdk-for-python/issues/34373) | ✅ yes | unit_test | api_surface | storage |
| [#30909](https://github.com/Azure/azure-sdk-for-python/issues/30909) | ✅ yes | unit_test | api_surface | cosmos |
| [#30528](https://github.com/Azure/azure-sdk-for-python/issues/30528) | ✅ yes | unit_test | api_surface | app_config |
| [#30361](https://github.com/Azure/azure-sdk-for-python/issues/30361) | ✅ yes | integration_test | api_surface | other |
| [#29574](https://github.com/Azure/azure-sdk-for-python/issues/29574) | ✅ yes | integration_test | api_surface | arm_mgmt |
| [#28413](https://github.com/Azure/azure-sdk-for-python/issues/28413) | ✅ yes | unit_test | api_surface | ai_ml |
| [#27819](https://github.com/Azure/azure-sdk-for-python/issues/27819) | ✅ yes | unit_test | api_surface | ai_ml |
| [#27068](https://github.com/Azure/azure-sdk-for-python/issues/27068) | ✅ yes | integration_test | api_surface | arm_mgmt |
| [#26784](https://github.com/Azure/azure-sdk-for-python/issues/26784) | ✅ yes | unit_test | api_surface | communication |
| [#26506](https://github.com/Azure/azure-sdk-for-python/issues/26506) | ✅ yes | integration_test | api_surface | arm_mgmt |
| [#25533](https://github.com/Azure/azure-sdk-for-python/issues/25533) | ✅ yes | unit_test | api_surface | keyvault |
| [#24959](https://github.com/Azure/azure-sdk-for-python/issues/24959) | ✅ yes | integration_test | api_surface | service_bus |
| [#24957](https://github.com/Azure/azure-sdk-for-python/issues/24957) | ✅ yes | integration_test | api_surface | storage |
| [#24695](https://github.com/Azure/azure-sdk-for-python/issues/24695) | ✅ yes | integration_test | api_surface | arm_mgmt |
| [#24606](https://github.com/Azure/azure-sdk-for-python/issues/24606) | ✅ yes | unit_test | api_surface | monitor |
| [#24480](https://github.com/Azure/azure-sdk-for-python/issues/24480) | ✅ yes | unit_test | api_surface | storage |
| [#24451](https://github.com/Azure/azure-sdk-for-python/issues/24451) | ✅ yes | integration_test | api_surface | core |
| [#24446](https://github.com/Azure/azure-sdk-for-python/issues/24446) | ✅ yes | unit_test | api_surface | keyvault |
| [#24327](https://github.com/Azure/azure-sdk-for-python/issues/24327) | ✅ yes | unit_test | api_surface | cosmos |
| [#23939](https://github.com/Azure/azure-sdk-for-python/issues/23939) | ✅ yes | unit_test | api_surface | other |
| [#23623](https://github.com/Azure/azure-sdk-for-python/issues/23623) | ✅ yes | integration_test | api_surface | keyvault |
| [#23543](https://github.com/Azure/azure-sdk-for-python/issues/23543) | ✅ yes | unit_test | error_handling | storage |
| [#23494](https://github.com/Azure/azure-sdk-for-python/issues/23494) | ✅ yes | integration_test | api_surface | arm_mgmt |
| [#23160](https://github.com/Azure/azure-sdk-for-python/issues/23160) | ✅ yes | integration_test | api_surface | arm_mgmt |
| [#22487](https://github.com/Azure/azure-sdk-for-python/issues/22487) | ✅ yes | integration_test | api_surface | other |
| [#22180](https://github.com/Azure/azure-sdk-for-python/issues/22180) | ✅ yes | integration_test | api_surface | arm_mgmt |
| [#22144](https://github.com/Azure/azure-sdk-for-python/issues/22144) | ✅ yes | integration_test | other | storage |
| [#22009](https://github.com/Azure/azure-sdk-for-python/issues/22009) | ✅ yes | integration_test | other | arm_mgmt |
| [#21750](https://github.com/Azure/azure-sdk-for-python/issues/21750) | ✅ yes | integration_test | api_surface | cosmos |
| [#21725](https://github.com/Azure/azure-sdk-for-python/issues/21725) | ⚠️ partially | integration_test | other | ai_ml |
| [#21623](https://github.com/Azure/azure-sdk-for-python/issues/21623) | ✅ yes | unit_test | api_surface | keyvault |
| [#21223](https://github.com/Azure/azure-sdk-for-python/issues/21223) | ✅ yes | unit_test | type_error | storage |
| [#20771](https://github.com/Azure/azure-sdk-for-python/issues/20771) | ✅ yes | unit_test | type_error | storage |
| [#20503](https://github.com/Azure/azure-sdk-for-python/issues/20503) | ✅ yes | unit_test | error_handling | arm_mgmt |
| [#20351](https://github.com/Azure/azure-sdk-for-python/issues/20351) | ✅ yes | integration_test | api_surface | other |
| [#20288](https://github.com/Azure/azure-sdk-for-python/issues/20288) | ✅ yes | integration_test | api_surface | arm_mgmt |
| [#20000](https://github.com/Azure/azure-sdk-for-python/issues/20000) | ✅ yes | integration_test | memory_lifecycle | other |
| [#19958](https://github.com/Azure/azure-sdk-for-python/issues/19958) | ✅ yes | integration_test | api_surface | arm_mgmt |
| [#19906](https://github.com/Azure/azure-sdk-for-python/issues/19906) | ✅ yes | unit_test | type_error | storage |
| [#19763](https://github.com/Azure/azure-sdk-for-python/issues/19763) | ✅ yes | integration_test | api_surface | arm_mgmt |
| [#19573](https://github.com/Azure/azure-sdk-for-python/issues/19573) | ✅ yes | integration_test | other | core |
| [#19543](https://github.com/Azure/azure-sdk-for-python/issues/19543) | ✅ yes | unit_test | type_error | storage |
| [#19439](https://github.com/Azure/azure-sdk-for-python/issues/19439) | ✅ yes | integration_test | api_surface | storage |
| [#19411](https://github.com/Azure/azure-sdk-for-python/issues/19411) | ✅ yes | unit_test | type_error | keyvault |
| [#19297](https://github.com/Azure/azure-sdk-for-python/issues/19297) | ⚠️ partially | integration_test | type_error | service_bus |
| [#19290](https://github.com/Azure/azure-sdk-for-python/issues/19290) | ✅ yes | unit_test | type_error | storage |
| [#18927](https://github.com/Azure/azure-sdk-for-python/issues/18927) | ✅ yes | integration_test | api_surface | arm_mgmt |
| [#18788](https://github.com/Azure/azure-sdk-for-python/issues/18788) | ✅ yes | integration_test | api_surface | arm_mgmt |
| [#18420](https://github.com/Azure/azure-sdk-for-python/issues/18420) | ✅ yes | integration_test | api_surface | arm_mgmt |
| [#17734](https://github.com/Azure/azure-sdk-for-python/issues/17734) | ✅ yes | integration_test | api_surface | ai_ml |
| [#17417](https://github.com/Azure/azure-sdk-for-python/issues/17417) | ✅ yes | integration_test | api_surface | storage |
| [#17280](https://github.com/Azure/azure-sdk-for-python/issues/17280) | ✅ yes | integration_test | api_surface | arm_mgmt |
| [#16935](https://github.com/Azure/azure-sdk-for-python/issues/16935) | ✅ yes | integration_test | api_surface | other |
| [#16778](https://github.com/Azure/azure-sdk-for-python/issues/16778) | ✅ yes | integration_test | api_surface | other |
| [#16759](https://github.com/Azure/azure-sdk-for-python/issues/16759) | ✅ yes | integration_test | api_surface | storage |
| [#16468](https://github.com/Azure/azure-sdk-for-python/issues/16468) | ✅ yes | unit_test | api_surface | communication |
| [#16356](https://github.com/Azure/azure-sdk-for-python/issues/16356) | ✅ yes | integration_test | api_surface | arm_mgmt |
| [#16252](https://github.com/Azure/azure-sdk-for-python/issues/16252) | ✅ yes | unit_test | api_surface | arm_mgmt |
| [#16195](https://github.com/Azure/azure-sdk-for-python/issues/16195) | ✅ yes | integration_test | api_surface | storage |
| [#15959](https://github.com/Azure/azure-sdk-for-python/issues/15959) | ✅ yes | unit_test | api_surface | communication |
| [#15891](https://github.com/Azure/azure-sdk-for-python/issues/15891) | ✅ yes | unit_test | api_surface | storage |
| [#14731](https://github.com/Azure/azure-sdk-for-python/issues/14731) | ✅ yes | unit_test | api_surface | storage |
| [#13261](https://github.com/Azure/azure-sdk-for-python/issues/13261) | ✅ yes | unit_test | type_error | storage |
| [#12603](https://github.com/Azure/azure-sdk-for-python/issues/12603) | ✅ yes | unit_test | api_surface | keyvault |
| [#12335](https://github.com/Azure/azure-sdk-for-python/issues/12335) | ✅ yes | unit_test | api_surface | arm_mgmt |
| [#11791](https://github.com/Azure/azure-sdk-for-python/issues/11791) | ✅ yes | unit_test | other | cosmos |
| [#11643](https://github.com/Azure/azure-sdk-for-python/issues/11643) | ✅ yes | integration_test | other | cosmos |
| [#6403](https://github.com/Azure/azure-sdk-for-python/issues/6403) | ✅ yes | unit_test | api_surface | arm_mgmt |
| [#2593](https://github.com/Azure/azure-sdk-for-python/issues/2593) | ✅ yes | integration_test | api_surface | service_bus |
| [#1200](https://github.com/Azure/azure-sdk-for-python/issues/1200) | ✅ yes | integration_test | api_surface | cosmos |
| [#909](https://github.com/Azure/azure-sdk-for-python/issues/909) | ✅ yes | integration_test | other | arm_mgmt |
| [#794](https://github.com/Azure/azure-sdk-for-python/issues/794) | ✅ yes | integration_test | other | other |
| [#793](https://github.com/Azure/azure-sdk-for-python/issues/793) | ✅ yes | integration_test | other | other |
| [#221](https://github.com/Azure/azure-sdk-for-python/issues/221) | ✅ yes | integration_test | api_surface | service_bus |

### Java (16 issues)

| Issue | Catchable | Test Type | Bug Category | Service Area |
|---|---|---|---|---|
| [#47285](https://github.com/Azure/azure-sdk-for-java/issues/47285) | ✅ yes | unit_test | api_surface | service_bus |
| [#47096](https://github.com/Azure/azure-sdk-for-java/issues/47096) | ✅ yes | unit_test | auth | core |
| [#46715](https://github.com/Azure/azure-sdk-for-java/issues/46715) | ✅ yes | integration_test | error_handling | app_config |
| [#46531](https://github.com/Azure/azure-sdk-for-java/issues/46531) | ✅ yes | unit_test | api_surface | openai |
| [#46349](https://github.com/Azure/azure-sdk-for-java/issues/46349) | ✅ yes | error_path_test | api_surface | openai |
| [#46101](https://github.com/Azure/azure-sdk-for-java/issues/46101) | ✅ yes | unit_test | api_surface | openai |
| [#46085](https://github.com/Azure/azure-sdk-for-java/issues/46085) | ✅ yes | unit_test | api_surface | service_bus |
| [#45921](https://github.com/Azure/azure-sdk-for-java/issues/45921) | ✅ yes | unit_test | api_surface | ai_ml |
| [#45460](https://github.com/Azure/azure-sdk-for-java/issues/45460) | ✅ yes | integration_test | other | service_bus |
| [#44804](https://github.com/Azure/azure-sdk-for-java/issues/44804) | ✅ yes | unit_test | auth | identity |
| [#37337](https://github.com/Azure/azure-sdk-for-java/issues/37337) | ✅ yes | integration_test | error_handling | service_bus |
| [#28307](https://github.com/Azure/azure-sdk-for-java/issues/28307) | ✅ yes | integration_test | api_surface | service_bus |
| [#27943](https://github.com/Azure/azure-sdk-for-java/issues/27943) | ⚠️ partially | integration_test | serialization | event_hubs |
| [#18434](https://github.com/Azure/azure-sdk-for-java/issues/18434) | ✅ yes | integration_test | type_error | event_hubs |
| [#16595](https://github.com/Azure/azure-sdk-for-java/issues/16595) | ✅ yes | integration_test | api_surface | arm_mgmt |
| [#15294](https://github.com/Azure/azure-sdk-for-java/issues/15294) | ✅ yes | unit_test | api_surface | storage |

### .NET (35 issues)

| Issue | Catchable | Test Type | Bug Category | Service Area |
|---|---|---|---|---|
| [#40511](https://github.com/Azure/azure-sdk-for-net/issues/40511) | ✅ yes | integration_test | api_surface | arm_mgmt |
| [#38098](https://github.com/Azure/azure-sdk-for-net/issues/38098) | ✅ yes | unit_test | api_surface | app_config |
| [#35949](https://github.com/Azure/azure-sdk-for-net/issues/35949) | ✅ yes | integration_test | api_surface | arm_mgmt |
| [#35844](https://github.com/Azure/azure-sdk-for-net/issues/35844) | ✅ yes | integration_test | api_surface | monitor |
| [#35299](https://github.com/Azure/azure-sdk-for-net/issues/35299) | ✅ yes | integration_test | api_surface | communication |
| [#35152](https://github.com/Azure/azure-sdk-for-net/issues/35152) | ✅ yes | integration_test | api_surface | arm_mgmt |
| [#34591](https://github.com/Azure/azure-sdk-for-net/issues/34591) | ✅ yes | unit_test | api_surface | storage |
| [#34464](https://github.com/Azure/azure-sdk-for-net/issues/34464) | ✅ yes | unit_test | api_surface | other |
| [#34417](https://github.com/Azure/azure-sdk-for-net/issues/34417) | ✅ yes | unit_test | api_surface | other |
| [#34321](https://github.com/Azure/azure-sdk-for-net/issues/34321) | ✅ yes | unit_test | api_surface | other |
| [#33672](https://github.com/Azure/azure-sdk-for-net/issues/33672) | ✅ yes | integration_test | api_surface | storage |
| [#33588](https://github.com/Azure/azure-sdk-for-net/issues/33588) | ✅ yes | integration_test | api_surface | search |
| [#32872](https://github.com/Azure/azure-sdk-for-net/issues/32872) | ✅ yes | integration_test | error_handling | keyvault |
| [#30213](https://github.com/Azure/azure-sdk-for-net/issues/30213) | ✅ yes | integration_test | api_surface | arm_mgmt |
| [#23802](https://github.com/Azure/azure-sdk-for-net/issues/23802) | ✅ yes | integration_test | api_surface | storage |
| [#23031](https://github.com/Azure/azure-sdk-for-net/issues/23031) | ✅ yes | integration_test | other | storage |
| [#18431](https://github.com/Azure/azure-sdk-for-net/issues/18431) | ✅ yes | integration_test | auth | storage |
| [#18148](https://github.com/Azure/azure-sdk-for-net/issues/18148) | ✅ yes | integration_test | api_surface | arm_mgmt |
| [#18039](https://github.com/Azure/azure-sdk-for-net/issues/18039) | ✅ yes | integration_test | api_surface | core |
| [#17493](https://github.com/Azure/azure-sdk-for-net/issues/17493) | ✅ yes | integration_test | serialization | storage |
| [#17142](https://github.com/Azure/azure-sdk-for-net/issues/17142) | ✅ yes | integration_test | api_surface | storage |
| [#16953](https://github.com/Azure/azure-sdk-for-net/issues/16953) | ✅ yes | integration_test | api_surface | storage |
| [#16816](https://github.com/Azure/azure-sdk-for-net/issues/16816) | ✅ yes | integration_test | memory_lifecycle | storage |
| [#16268](https://github.com/Azure/azure-sdk-for-net/issues/16268) | ✅ yes | integration_test | error_handling | storage |
| [#16122](https://github.com/Azure/azure-sdk-for-net/issues/16122) | ✅ yes | integration_test | api_surface | arm_mgmt |
| [#13412](https://github.com/Azure/azure-sdk-for-net/issues/13412) | ✅ yes | unit_test | api_surface | ai_ml |
| [#13301](https://github.com/Azure/azure-sdk-for-net/issues/13301) | ✅ yes | unit_test | api_surface | storage |
| [#12208](https://github.com/Azure/azure-sdk-for-net/issues/12208) | ✅ yes | unit_test | api_surface | event_hubs |
| [#10539](https://github.com/Azure/azure-sdk-for-net/issues/10539) | ✅ yes | integration_test | connection_retry | storage |
| [#10518](https://github.com/Azure/azure-sdk-for-net/issues/10518) | ✅ yes | unit_test | api_surface | arm_mgmt |
| [#10260](https://github.com/Azure/azure-sdk-for-net/issues/10260) | ✅ yes | unit_test | api_surface | event_hubs |
| [#9404](https://github.com/Azure/azure-sdk-for-net/issues/9404) | ✅ yes | integration_test | connection_retry | storage |
| [#6616](https://github.com/Azure/azure-sdk-for-net/issues/6616) | ❌ no | unit_test | api_surface | other |
| [#4853](https://github.com/Azure/azure-sdk-for-net/issues/4853) | ❌ no | unit_test | api_surface | monitor |
| [#3763](https://github.com/Azure/azure-sdk-for-net/issues/3763) | ❌ no | integration_test | other | event_hubs |

### JS (55 issues)

| Issue | Catchable | Test Type | Bug Category | Service Area |
|---|---|---|---|---|
| [#27704](https://github.com/Azure/azure-sdk-for-js/issues/27704) | ✅ yes | regression_test | auth | identity |
| [#26347](https://github.com/Azure/azure-sdk-for-js/issues/26347) | ✅ yes | integration_test | api_surface | monitor |
| [#26300](https://github.com/Azure/azure-sdk-for-js/issues/26300) | ✅ yes | integration_test | api_surface | arm_mgmt |
| [#25791](https://github.com/Azure/azure-sdk-for-js/issues/25791) | ✅ yes | integration_test | other | cosmos |
| [#25638](https://github.com/Azure/azure-sdk-for-js/issues/25638) | ❌ no | e2e_test | api_surface | communication |
| [#25322](https://github.com/Azure/azure-sdk-for-js/issues/25322) | ✅ yes | integration_test | other | monitor |
| [#25316](https://github.com/Azure/azure-sdk-for-js/issues/25316) | ✅ yes | integration_test | api_surface | other |
| [#24273](https://github.com/Azure/azure-sdk-for-js/issues/24273) | ✅ yes | integration_test | other | service_bus |
| [#24215](https://github.com/Azure/azure-sdk-for-js/issues/24215) | ❌ no | e2e_test | api_surface | communication |
| [#22408](https://github.com/Azure/azure-sdk-for-js/issues/22408) | ✅ yes | integration_test | api_surface | monitor |
| [#22398](https://github.com/Azure/azure-sdk-for-js/issues/22398) | ✅ yes | integration_test | api_surface | arm_mgmt |
| [#21999](https://github.com/Azure/azure-sdk-for-js/issues/21999) | ✅ yes | integration_test | api_surface | arm_mgmt |
| [#21984](https://github.com/Azure/azure-sdk-for-js/issues/21984) | ✅ yes | integration_test | api_surface | monitor |
| [#21156](https://github.com/Azure/azure-sdk-for-js/issues/21156) | ✅ yes | integration_test | api_surface | other |
| [#21116](https://github.com/Azure/azure-sdk-for-js/issues/21116) | ✅ yes | integration_test | api_surface | arm_mgmt |
| [#18062](https://github.com/Azure/azure-sdk-for-js/issues/18062) | ✅ yes | integration_test | streaming | cosmos |
| [#16673](https://github.com/Azure/azure-sdk-for-js/issues/16673) | ✅ yes | integration_test | api_surface | storage |
| [#16623](https://github.com/Azure/azure-sdk-for-js/issues/16623) | ✅ yes | integration_test | api_surface | core |
| [#16418](https://github.com/Azure/azure-sdk-for-js/issues/16418) | ✅ yes | integration_test | api_surface | core |
| [#15854](https://github.com/Azure/azure-sdk-for-js/issues/15854) | ✅ yes | integration_test | other | other |
| [#14998](https://github.com/Azure/azure-sdk-for-js/issues/14998) | ⚠️ partially | integration_test | api_surface | keyvault |
| [#14229](https://github.com/Azure/azure-sdk-for-js/issues/14229) | ✅ yes | integration_test | serialization | storage |
| [#14224](https://github.com/Azure/azure-sdk-for-js/issues/14224) | ✅ yes | integration_test | serialization | storage |
| [#13578](https://github.com/Azure/azure-sdk-for-js/issues/13578) | ✅ yes | integration_test | api_surface | storage |
| [#13343](https://github.com/Azure/azure-sdk-for-js/issues/13343) | ✅ yes | unit_test | error_handling | identity |
| [#13219](https://github.com/Azure/azure-sdk-for-js/issues/13219) | ✅ yes | integration_test | api_surface | service_bus |
| [#12672](https://github.com/Azure/azure-sdk-for-js/issues/12672) | ✅ yes | integration_test | serialization | storage |
| [#11555](https://github.com/Azure/azure-sdk-for-js/issues/11555) | ✅ yes | integration_test | api_surface | other |
| [#11505](https://github.com/Azure/azure-sdk-for-js/issues/11505) | ✅ yes | integration_test | api_surface | storage |
| [#10442](https://github.com/Azure/azure-sdk-for-js/issues/10442) | ✅ yes | integration_test | other | search |
| [#10411](https://github.com/Azure/azure-sdk-for-js/issues/10411) | ✅ yes | integration_test | api_surface | arm_mgmt |
| [#10352](https://github.com/Azure/azure-sdk-for-js/issues/10352) | ✅ yes | integration_test | auth | keyvault |
| [#10093](https://github.com/Azure/azure-sdk-for-js/issues/10093) | ✅ yes | unit_test | type_error | arm_mgmt |
| [#10045](https://github.com/Azure/azure-sdk-for-js/issues/10045) | ✅ yes | unit_test | api_surface | arm_mgmt |
| [#9927](https://github.com/Azure/azure-sdk-for-js/issues/9927) | ✅ yes | unit_test | api_surface | storage |
| [#8353](https://github.com/Azure/azure-sdk-for-js/issues/8353) | ✅ yes | unit_test | api_surface | ai_ml |
| [#7801](https://github.com/Azure/azure-sdk-for-js/issues/7801) | ✅ yes | integration_test | api_surface | event_hubs |
| [#7785](https://github.com/Azure/azure-sdk-for-js/issues/7785) | ✅ yes | unit_test | api_surface | ai_ml |
| [#7630](https://github.com/Azure/azure-sdk-for-js/issues/7630) | ✅ yes | integration_test | api_surface | arm_mgmt |
| [#7536](https://github.com/Azure/azure-sdk-for-js/issues/7536) | ✅ yes | unit_test | api_surface | storage |
| [#7462](https://github.com/Azure/azure-sdk-for-js/issues/7462) | ✅ yes | unit_test | other | storage |
| [#7258](https://github.com/Azure/azure-sdk-for-js/issues/7258) | ✅ yes | unit_test | type_error | identity |
| [#7115](https://github.com/Azure/azure-sdk-for-js/issues/7115) | ✅ yes | integration_test | api_surface | storage |
| [#5776](https://github.com/Azure/azure-sdk-for-js/issues/5776) | ✅ yes | integration_test | other | core |
| [#5085](https://github.com/Azure/azure-sdk-for-js/issues/5085) | ✅ yes | integration_test | api_surface | arm_mgmt |
| [#4972](https://github.com/Azure/azure-sdk-for-js/issues/4972) | ✅ yes | integration_test | api_surface | cosmos |
| [#4805](https://github.com/Azure/azure-sdk-for-js/issues/4805) | ✅ yes | integration_test | api_surface | storage |
| [#3733](https://github.com/Azure/azure-sdk-for-js/issues/3733) | ✅ yes | integration_test | api_surface | communication |
| [#2154](https://github.com/Azure/azure-sdk-for-js/issues/2154) | ✅ yes | integration_test | api_surface | service_bus |
| [#1477](https://github.com/Azure/azure-sdk-for-js/issues/1477) | ✅ yes | integration_test | api_surface | service_bus |
| [#1108](https://github.com/Azure/azure-sdk-for-js/issues/1108) | ✅ yes | integration_test | api_surface | service_bus |
| [#1059](https://github.com/Azure/azure-sdk-for-js/issues/1059) | ✅ yes | integration_test | api_surface | service_bus |
| [#1031](https://github.com/Azure/azure-sdk-for-js/issues/1031) | ✅ yes | unit_test | api_surface | service_bus |
| [#1019](https://github.com/Azure/azure-sdk-for-js/issues/1019) | ✅ yes | integration_test | api_surface | service_bus |
| [#986](https://github.com/Azure/azure-sdk-for-js/issues/986) | ✅ yes | integration_test | api_surface | service_bus |

### Go (22 issues)

| Issue | Catchable | Test Type | Bug Category | Service Area |
|---|---|---|---|---|
| [#24492](https://github.com/Azure/azure-sdk-for-go/issues/24492) | ✅ yes | unit_test | api_surface | arm_mgmt |
| [#21517](https://github.com/Azure/azure-sdk-for-go/issues/21517) | ✅ yes | unit_test | api_surface | app_config |
| [#21291](https://github.com/Azure/azure-sdk-for-go/issues/21291) | ✅ yes | unit_test | api_surface | arm_mgmt |
| [#20664](https://github.com/Azure/azure-sdk-for-go/issues/20664) | ✅ yes | unit_test | api_surface | storage |
| [#20051](https://github.com/Azure/azure-sdk-for-go/issues/20051) | ✅ yes | unit_test | api_surface | core |
| [#19775](https://github.com/Azure/azure-sdk-for-go/issues/19775) | ✅ yes | unit_test | api_surface | storage |
| [#19415](https://github.com/Azure/azure-sdk-for-go/issues/19415) | ✅ yes | integration_test | connection_retry | app_config |
| [#18590](https://github.com/Azure/azure-sdk-for-go/issues/18590) | ⚠️ partially | integration_test | api_surface | other |
| [#18538](https://github.com/Azure/azure-sdk-for-go/issues/18538) | ⚠️ partially | integration_test | api_surface | arm_mgmt |
| [#17287](https://github.com/Azure/azure-sdk-for-go/issues/17287) | ✅ yes | integration_test | error_handling | storage |
| [#17196](https://github.com/Azure/azure-sdk-for-go/issues/17196) | ✅ yes | integration_test | error_handling | arm_mgmt |
| [#17152](https://github.com/Azure/azure-sdk-for-go/issues/17152) | ✅ yes | integration_test | api_surface | storage |
| [#17061](https://github.com/Azure/azure-sdk-for-go/issues/17061) | ✅ yes | integration_test | api_surface | storage |
| [#16692](https://github.com/Azure/azure-sdk-for-go/issues/16692) | ✅ yes | integration_test | api_surface | service_bus |
| [#16679](https://github.com/Azure/azure-sdk-for-go/issues/16679) | ✅ yes | integration_test | api_surface | storage |
| [#16676](https://github.com/Azure/azure-sdk-for-go/issues/16676) | ⚠️ partially | integration_test | api_surface | keyvault |
| [#15602](https://github.com/Azure/azure-sdk-for-go/issues/15602) | ✅ yes | integration_test | api_surface | arm_mgmt |
| [#15582](https://github.com/Azure/azure-sdk-for-go/issues/15582) | ✅ yes | unit_test | api_surface | other |
| [#14592](https://github.com/Azure/azure-sdk-for-go/issues/14592) | ✅ yes | integration_test | other | other |
| [#14571](https://github.com/Azure/azure-sdk-for-go/issues/14571) | ✅ yes | integration_test | api_surface | other |
| [#7869](https://github.com/Azure/azure-sdk-for-go/issues/7869) | ✅ yes | unit_test | api_surface | other |
| [#426](https://github.com/Azure/azure-sdk-for-go/issues/426) | ✅ yes | integration_test | other | other |

---

## Missing Serialization Roundtrip Tests

**149 issues (10.4%)**

These bugs would have been caught by testing model serialization/deserialization with diverse inputs — nested types, discriminated unions, optional fields, special characters, large numbers, and date/time formats.

### Python (40 issues)

| Issue | Catchable | Test Type | Bug Category | Service Area |
|---|---|---|---|---|
| [#40138](https://github.com/Azure/azure-sdk-for-python/issues/40138) | ✅ yes | serialization_test | type_error | search |
| [#39981](https://github.com/Azure/azure-sdk-for-python/issues/39981) | ✅ yes | serialization_test | serialization | ai_ml |
| [#39807](https://github.com/Azure/azure-sdk-for-python/issues/39807) | ✅ yes | serialization_test | serialization | arm_mgmt |
| [#39689](https://github.com/Azure/azure-sdk-for-python/issues/39689) | ✅ yes | serialization_test | serialization | ai_ml |
| [#38815](https://github.com/Azure/azure-sdk-for-python/issues/38815) | ✅ yes | serialization_test | serialization | storage |
| [#36379](https://github.com/Azure/azure-sdk-for-python/issues/36379) | ✅ yes | serialization_test | serialization | storage |
| [#34545](https://github.com/Azure/azure-sdk-for-python/issues/34545) | ✅ yes | serialization_test | api_surface | app_config |
| [#33415](https://github.com/Azure/azure-sdk-for-python/issues/33415) | ✅ yes | serialization_test | error_handling | communication |
| [#33317](https://github.com/Azure/azure-sdk-for-python/issues/33317) | ✅ yes | serialization_test | type_error | storage |
| [#31920](https://github.com/Azure/azure-sdk-for-python/issues/31920) | ✅ yes | serialization_test | serialization | other |
| [#29741](https://github.com/Azure/azure-sdk-for-python/issues/29741) | ✅ yes | serialization_test | serialization | ai_ml |
| [#28959](https://github.com/Azure/azure-sdk-for-python/issues/28959) | ✅ yes | serialization_test | type_error | keyvault |
| [#28469](https://github.com/Azure/azure-sdk-for-python/issues/28469) | ✅ yes | serialization_test | serialization | other |
| [#25529](https://github.com/Azure/azure-sdk-for-python/issues/25529) | ✅ yes | serialization_test | type_error | cosmos |
| [#24915](https://github.com/Azure/azure-sdk-for-python/issues/24915) | ✅ yes | serialization_test | serialization | monitor |
| [#24643](https://github.com/Azure/azure-sdk-for-python/issues/24643) | ✅ yes | unit_test | auth | identity |
| [#24483](https://github.com/Azure/azure-sdk-for-python/issues/24483) | ✅ yes | serialization_test | serialization | storage |
| [#24085](https://github.com/Azure/azure-sdk-for-python/issues/24085) | ✅ yes | serialization_test | serialization | ai_ml |
| [#23385](https://github.com/Azure/azure-sdk-for-python/issues/23385) | ✅ yes | serialization_test | serialization | ai_ml |
| [#23008](https://github.com/Azure/azure-sdk-for-python/issues/23008) | ✅ yes | serialization_test | serialization | storage |
| [#22486](https://github.com/Azure/azure-sdk-for-python/issues/22486) | ✅ yes | serialization_test | serialization | service_bus |
| [#21798](https://github.com/Azure/azure-sdk-for-python/issues/21798) | ✅ yes | serialization_test | auth | identity |
| [#21575](https://github.com/Azure/azure-sdk-for-python/issues/21575) | ✅ yes | serialization_test | serialization | storage |
| [#21238](https://github.com/Azure/azure-sdk-for-python/issues/21238) | ✅ yes | serialization_test | auth | identity |
| [#21184](https://github.com/Azure/azure-sdk-for-python/issues/21184) | ✅ yes | serialization_test | serialization | other |
| [#21008](https://github.com/Azure/azure-sdk-for-python/issues/21008) | ✅ yes | serialization_test | serialization | arm_mgmt |
| [#18905](https://github.com/Azure/azure-sdk-for-python/issues/18905) | ✅ yes | serialization_test | serialization | arm_mgmt |
| [#18602](https://github.com/Azure/azure-sdk-for-python/issues/18602) | ✅ yes | serialization_test | serialization | communication |
| [#17231](https://github.com/Azure/azure-sdk-for-python/issues/17231) | ✅ yes | serialization_test | serialization | storage |
| [#16779](https://github.com/Azure/azure-sdk-for-python/issues/16779) | ✅ yes | serialization_test | error_handling | event_hubs |
| [#16320](https://github.com/Azure/azure-sdk-for-python/issues/16320) | ✅ yes | serialization_test | serialization | other |
| [#16250](https://github.com/Azure/azure-sdk-for-python/issues/16250) | ✅ yes | serialization_test | serialization | storage |
| [#15919](https://github.com/Azure/azure-sdk-for-python/issues/15919) | ✅ yes | serialization_test | serialization | storage |
| [#12563](https://github.com/Azure/azure-sdk-for-python/issues/12563) | ✅ yes | serialization_test | serialization | storage |
| [#2769](https://github.com/Azure/azure-sdk-for-python/issues/2769) | ✅ yes | serialization_test | serialization | other |
| [#1197](https://github.com/Azure/azure-sdk-for-python/issues/1197) | ✅ yes | serialization_test | serialization | keyvault |
| [#628](https://github.com/Azure/azure-sdk-for-python/issues/628) | ✅ yes | serialization_test | serialization | service_bus |
| [#264](https://github.com/Azure/azure-sdk-for-python/issues/264) | ✅ yes | integration_test | serialization | storage |
| [#150](https://github.com/Azure/azure-sdk-for-python/issues/150) | ✅ yes | serialization_test | serialization | storage |
| [#114](https://github.com/Azure/azure-sdk-for-python/issues/114) | ✅ yes | serialization_test | serialization | storage |

### Java (10 issues)

| Issue | Catchable | Test Type | Bug Category | Service Area |
|---|---|---|---|---|
| [#47264](https://github.com/Azure/azure-sdk-for-java/issues/47264) | ✅ yes | serialization_test | serialization | openai |
| [#45521](https://github.com/Azure/azure-sdk-for-java/issues/45521) | ✅ yes | serialization_test | serialization | cosmos |
| [#44659](https://github.com/Azure/azure-sdk-for-java/issues/44659) | ✅ yes | serialization_test | serialization | keyvault |
| [#43927](https://github.com/Azure/azure-sdk-for-java/issues/43927) | ✅ yes | serialization_test | type_error | other |
| [#17902](https://github.com/Azure/azure-sdk-for-java/issues/17902) | ✅ yes | serialization_test | serialization | storage |
| [#17554](https://github.com/Azure/azure-sdk-for-java/issues/17554) | ✅ yes | serialization_test | type_error | cosmos |
| [#17047](https://github.com/Azure/azure-sdk-for-java/issues/17047) | ✅ yes | serialization_test | serialization | cosmos |
| [#16292](https://github.com/Azure/azure-sdk-for-java/issues/16292) | ✅ yes | serialization_test | serialization | storage |
| [#16112](https://github.com/Azure/azure-sdk-for-java/issues/16112) | ✅ yes | serialization_test | serialization | cosmos |
| [#14722](https://github.com/Azure/azure-sdk-for-java/issues/14722) | ✅ yes | serialization_test | serialization | arm_mgmt |

### .NET (50 issues)

| Issue | Catchable | Test Type | Bug Category | Service Area |
|---|---|---|---|---|
| [#49221](https://github.com/Azure/azure-sdk-for-net/issues/49221) | ✅ yes | serialization_test | serialization | other |
| [#40528](https://github.com/Azure/azure-sdk-for-net/issues/40528) | ✅ yes | serialization_test | serialization | storage |
| [#38100](https://github.com/Azure/azure-sdk-for-net/issues/38100) | ✅ yes | serialization_test | type_error | other |
| [#37475](https://github.com/Azure/azure-sdk-for-net/issues/37475) | ✅ yes | serialization_test | type_error | monitor |
| [#37468](https://github.com/Azure/azure-sdk-for-net/issues/37468) | ✅ yes | serialization_test | serialization | storage |
| [#36360](https://github.com/Azure/azure-sdk-for-net/issues/36360) | ✅ yes | serialization_test | serialization | arm_mgmt |
| [#36104](https://github.com/Azure/azure-sdk-for-net/issues/36104) | ✅ yes | serialization_test | serialization | cosmos |
| [#35585](https://github.com/Azure/azure-sdk-for-net/issues/35585) | ✅ yes | serialization_test | serialization | arm_mgmt |
| [#35583](https://github.com/Azure/azure-sdk-for-net/issues/35583) | ✅ yes | serialization_test | serialization | arm_mgmt |
| [#35245](https://github.com/Azure/azure-sdk-for-net/issues/35245) | ✅ yes | serialization_test | serialization | keyvault |
| [#35221](https://github.com/Azure/azure-sdk-for-net/issues/35221) | ✅ yes | serialization_test | serialization | other |
| [#35004](https://github.com/Azure/azure-sdk-for-net/issues/35004) | ✅ yes | serialization_test | serialization | arm_mgmt |
| [#35000](https://github.com/Azure/azure-sdk-for-net/issues/35000) | ✅ yes | serialization_test | serialization | core |
| [#34977](https://github.com/Azure/azure-sdk-for-net/issues/34977) | ✅ yes | serialization_test | serialization | other |
| [#34577](https://github.com/Azure/azure-sdk-for-net/issues/34577) | ✅ yes | serialization_test | serialization | other |
| [#34544](https://github.com/Azure/azure-sdk-for-net/issues/34544) | ✅ yes | serialization_test | serialization | storage |
| [#33572](https://github.com/Azure/azure-sdk-for-net/issues/33572) | ✅ yes | serialization_test | serialization | monitor |
| [#32804](https://github.com/Azure/azure-sdk-for-net/issues/32804) | ✅ yes | serialization_test | serialization | cosmos |
| [#32756](https://github.com/Azure/azure-sdk-for-net/issues/32756) | ✅ yes | serialization_test | serialization | arm_mgmt |
| [#31504](https://github.com/Azure/azure-sdk-for-net/issues/31504) | ✅ yes | serialization_test | serialization | arm_mgmt |
| [#31280](https://github.com/Azure/azure-sdk-for-net/issues/31280) | ✅ yes | serialization_test | serialization | ai_ml |
| [#30366](https://github.com/Azure/azure-sdk-for-net/issues/30366) | ✅ yes | serialization_test | serialization | other |
| [#29002](https://github.com/Azure/azure-sdk-for-net/issues/29002) | ✅ yes | integration_test | auth | storage |
| [#27225](https://github.com/Azure/azure-sdk-for-net/issues/27225) | ✅ yes | serialization_test | serialization | communication |
| [#27044](https://github.com/Azure/azure-sdk-for-net/issues/27044) | ✅ yes | serialization_test | serialization | arm_mgmt |
| [#25165](https://github.com/Azure/azure-sdk-for-net/issues/25165) | ✅ yes | serialization_test | serialization | storage |
| [#24013](https://github.com/Azure/azure-sdk-for-net/issues/24013) | ✅ yes | serialization_test | serialization | storage |
| [#22877](https://github.com/Azure/azure-sdk-for-net/issues/22877) | ✅ yes | serialization_test | serialization | storage |
| [#21655](https://github.com/Azure/azure-sdk-for-net/issues/21655) | ✅ yes | serialization_test | serialization | monitor |
| [#19021](https://github.com/Azure/azure-sdk-for-net/issues/19021) | ✅ yes | serialization_test | serialization | storage |
| [#18401](https://github.com/Azure/azure-sdk-for-net/issues/18401) | ✅ yes | serialization_test | serialization | storage |
| [#18169](https://github.com/Azure/azure-sdk-for-net/issues/18169) | ✅ yes | serialization_test | serialization | search |
| [#16974](https://github.com/Azure/azure-sdk-for-net/issues/16974) | ✅ yes | serialization_test | serialization | other |
| [#16702](https://github.com/Azure/azure-sdk-for-net/issues/16702) | ✅ yes | serialization_test | serialization | identity |
| [#15478](https://github.com/Azure/azure-sdk-for-net/issues/15478) | ✅ yes | serialization_test | serialization | storage |
| [#15146](https://github.com/Azure/azure-sdk-for-net/issues/15146) | ✅ yes | serialization_test | serialization | search |
| [#14075](https://github.com/Azure/azure-sdk-for-net/issues/14075) | ✅ yes | serialization_test | serialization | storage |
| [#13391](https://github.com/Azure/azure-sdk-for-net/issues/13391) | ✅ yes | serialization_test | serialization | storage |
| [#12932](https://github.com/Azure/azure-sdk-for-net/issues/12932) | ✅ yes | serialization_test | serialization | core |
| [#12889](https://github.com/Azure/azure-sdk-for-net/issues/12889) | ✅ yes | serialization_test | api_surface | ai_ml |
| [#12287](https://github.com/Azure/azure-sdk-for-net/issues/12287) | ✅ yes | serialization_test | serialization | storage |
| [#10908](https://github.com/Azure/azure-sdk-for-net/issues/10908) | ✅ yes | serialization_test | other | keyvault |
| [#10137](https://github.com/Azure/azure-sdk-for-net/issues/10137) | ✅ yes | serialization_test | serialization | other |
| [#9986](https://github.com/Azure/azure-sdk-for-net/issues/9986) | ✅ yes | serialization_test | serialization | keyvault |
| [#9963](https://github.com/Azure/azure-sdk-for-net/issues/9963) | ✅ yes | serialization_test | serialization | keyvault |
| [#4429](https://github.com/Azure/azure-sdk-for-net/issues/4429) | ✅ yes | serialization_test | serialization | other |
| [#2812](https://github.com/Azure/azure-sdk-for-net/issues/2812) | ✅ yes | serialization_test | serialization | other |
| [#2135](https://github.com/Azure/azure-sdk-for-net/issues/2135) | ✅ yes | serialization_test | serialization | other |
| [#2131](https://github.com/Azure/azure-sdk-for-net/issues/2131) | ✅ yes | serialization_test | serialization | other |
| [#1749](https://github.com/Azure/azure-sdk-for-net/issues/1749) | ✅ yes | serialization_test | serialization | arm_mgmt |

### JS (28 issues)

| Issue | Catchable | Test Type | Bug Category | Service Area |
|---|---|---|---|---|
| [#28643](https://github.com/Azure/azure-sdk-for-js/issues/28643) | ✅ yes | serialization_test | serialization | search |
| [#28561](https://github.com/Azure/azure-sdk-for-js/issues/28561) | ✅ yes | serialization_test | serialization | openai |
| [#28428](https://github.com/Azure/azure-sdk-for-js/issues/28428) | ✅ yes | serialization_test | serialization | openai |
| [#28325](https://github.com/Azure/azure-sdk-for-js/issues/28325) | ✅ yes | serialization_test | serialization | openai |
| [#26376](https://github.com/Azure/azure-sdk-for-js/issues/26376) | ✅ yes | serialization_test | serialization | openai |
| [#26237](https://github.com/Azure/azure-sdk-for-js/issues/26237) | ✅ yes | serialization_test | serialization | other |
| [#25914](https://github.com/Azure/azure-sdk-for-js/issues/25914) | ✅ yes | serialization_test | serialization | other |
| [#25777](https://github.com/Azure/azure-sdk-for-js/issues/25777) | ✅ yes | serialization_test | serialization | search |
| [#24277](https://github.com/Azure/azure-sdk-for-js/issues/24277) | ✅ yes | serialization_test | serialization | communication |
| [#23089](https://github.com/Azure/azure-sdk-for-js/issues/23089) | ✅ yes | serialization_test | type_error | other |
| [#22534](https://github.com/Azure/azure-sdk-for-js/issues/22534) | ✅ yes | serialization_test | serialization | storage |
| [#22310](https://github.com/Azure/azure-sdk-for-js/issues/22310) | ✅ yes | serialization_test | type_error | cosmos |
| [#22103](https://github.com/Azure/azure-sdk-for-js/issues/22103) | ✅ yes | serialization_test | serialization | arm_mgmt |
| [#16877](https://github.com/Azure/azure-sdk-for-js/issues/16877) | ✅ yes | serialization_test | serialization | cosmos |
| [#15688](https://github.com/Azure/azure-sdk-for-js/issues/15688) | ✅ yes | serialization_test | serialization | monitor |
| [#15653](https://github.com/Azure/azure-sdk-for-js/issues/15653) | ✅ yes | serialization_test | serialization | core |
| [#15131](https://github.com/Azure/azure-sdk-for-js/issues/15131) | ✅ yes | serialization_test | serialization | other |
| [#14983](https://github.com/Azure/azure-sdk-for-js/issues/14983) | ✅ yes | serialization_test | serialization | core |
| [#14539](https://github.com/Azure/azure-sdk-for-js/issues/14539) | ✅ yes | serialization_test | serialization | service_bus |
| [#14293](https://github.com/Azure/azure-sdk-for-js/issues/14293) | ✅ yes | serialization_test | type_error | storage |
| [#13223](https://github.com/Azure/azure-sdk-for-js/issues/13223) | ✅ yes | serialization_test | serialization | storage |
| [#12646](https://github.com/Azure/azure-sdk-for-js/issues/12646) | ✅ yes | serialization_test | type_error | arm_mgmt |
| [#10486](https://github.com/Azure/azure-sdk-for-js/issues/10486) | ✅ yes | serialization_test | serialization | search |
| [#10004](https://github.com/Azure/azure-sdk-for-js/issues/10004) | ✅ yes | serialization_test | serialization | arm_mgmt |
| [#9353](https://github.com/Azure/azure-sdk-for-js/issues/9353) | ✅ yes | serialization_test | serialization | storage |
| [#7535](https://github.com/Azure/azure-sdk-for-js/issues/7535) | ✅ yes | serialization_test | serialization | storage |
| [#2508](https://github.com/Azure/azure-sdk-for-js/issues/2508) | ✅ yes | serialization_test | serialization | event_hubs |
| [#1098](https://github.com/Azure/azure-sdk-for-js/issues/1098) | ✅ yes | serialization_test | type_error | service_bus |

### Go (21 issues)

| Issue | Catchable | Test Type | Bug Category | Service Area |
|---|---|---|---|---|
| [#24562](https://github.com/Azure/azure-sdk-for-go/issues/24562) | ✅ yes | serialization_test | serialization | storage |
| [#21887](https://github.com/Azure/azure-sdk-for-go/issues/21887) | ✅ yes | serialization_test | serialization | storage |
| [#20738](https://github.com/Azure/azure-sdk-for-go/issues/20738) | ✅ yes | serialization_test | serialization | arm_mgmt |
| [#20475](https://github.com/Azure/azure-sdk-for-go/issues/20475) | ✅ yes | serialization_test | serialization | storage |
| [#19475](https://github.com/Azure/azure-sdk-for-go/issues/19475) | ✅ yes | serialization_test | serialization | storage |
| [#18785](https://github.com/Azure/azure-sdk-for-go/issues/18785) | ✅ yes | serialization_test | serialization | service_bus |
| [#17850](https://github.com/Azure/azure-sdk-for-go/issues/17850) | ✅ yes | serialization_test | serialization | storage |
| [#17741](https://github.com/Azure/azure-sdk-for-go/issues/17741) | ✅ yes | serialization_test | serialization | other |
| [#16542](https://github.com/Azure/azure-sdk-for-go/issues/16542) | ✅ yes | serialization_test | serialization | storage |
| [#15913](https://github.com/Azure/azure-sdk-for-go/issues/15913) | ✅ yes | serialization_test | serialization | core |
| [#15295](https://github.com/Azure/azure-sdk-for-go/issues/15295) | ✅ yes | serialization_test | serialization | cosmos |
| [#5921](https://github.com/Azure/azure-sdk-for-go/issues/5921) | ✅ yes | serialization_test | serialization | arm_mgmt |
| [#5855](https://github.com/Azure/azure-sdk-for-go/issues/5855) | ✅ yes | serialization_test | serialization | event_hubs |
| [#5190](https://github.com/Azure/azure-sdk-for-go/issues/5190) | ✅ yes | serialization_test | serialization | storage |
| [#2824](https://github.com/Azure/azure-sdk-for-go/issues/2824) | ✅ yes | serialization_test | serialization | arm_mgmt |
| [#1020](https://github.com/Azure/azure-sdk-for-go/issues/1020) | ✅ yes | serialization_test | serialization | storage |
| [#912](https://github.com/Azure/azure-sdk-for-go/issues/912) | ✅ yes | serialization_test | serialization | arm_mgmt |
| [#902](https://github.com/Azure/azure-sdk-for-go/issues/902) | ✅ yes | serialization_test | serialization | other |
| [#898](https://github.com/Azure/azure-sdk-for-go/issues/898) | ✅ yes | serialization_test | serialization | arm_mgmt |
| [#896](https://github.com/Azure/azure-sdk-for-go/issues/896) | ✅ yes | serialization_test | serialization | core |
| [#351](https://github.com/Azure/azure-sdk-for-go/issues/351) | ✅ yes | serialization_test | serialization | storage |

---

## Missing Concurrency / Thread Safety Tests

**93 issues (6.5%)**

These bugs would have been caught by testing concurrent/parallel execution — race conditions in connection pools, thread-unsafe shared state, async operation ordering, and concurrent modification of collections.

### Python (26 issues)

| Issue | Catchable | Test Type | Bug Category | Service Area |
|---|---|---|---|---|
| [#41418](https://github.com/Azure/azure-sdk-for-python/issues/41418) | ✅ yes | concurrency_test | error_handling | ai_ml |
| [#39683](https://github.com/Azure/azure-sdk-for-python/issues/39683) | ⚠️ partially | concurrency_test | other | other |
| [#38264](https://github.com/Azure/azure-sdk-for-python/issues/38264) | ⚠️ partially | concurrency_test | connection_retry | keyvault |
| [#35618](https://github.com/Azure/azure-sdk-for-python/issues/35618) | ✅ yes | error_path_test | error_handling | service_bus |
| [#34922](https://github.com/Azure/azure-sdk-for-python/issues/34922) | ✅ yes | concurrency_test | streaming | cosmos |
| [#34821](https://github.com/Azure/azure-sdk-for-python/issues/34821) | ⚠️ partially | concurrency_test | connection_retry | arm_mgmt |
| [#34413](https://github.com/Azure/azure-sdk-for-python/issues/34413) | ✅ yes | concurrency_test | other | ai_ml |
| [#31711](https://github.com/Azure/azure-sdk-for-python/issues/31711) | ✅ yes | concurrency_test | streaming | service_bus |
| [#29407](https://github.com/Azure/azure-sdk-for-python/issues/29407) | ⚠️ partially | concurrency_test | memory_lifecycle | storage |
| [#24943](https://github.com/Azure/azure-sdk-for-python/issues/24943) | ❌ no | concurrency_test | other | storage |
| [#24458](https://github.com/Azure/azure-sdk-for-python/issues/24458) | ✅ yes | concurrency_test | platform_compat | identity |
| [#24443](https://github.com/Azure/azure-sdk-for-python/issues/24443) | ❌ no | concurrency_test | error_handling | other |
| [#23794](https://github.com/Azure/azure-sdk-for-python/issues/23794) | ❌ no | concurrency_test | memory_lifecycle | cosmos |
| [#23721](https://github.com/Azure/azure-sdk-for-python/issues/23721) | ❌ no | concurrency_test | auth | identity |
| [#23672](https://github.com/Azure/azure-sdk-for-python/issues/23672) | ❌ no | concurrency_test | memory_lifecycle | storage |
| [#23588](https://github.com/Azure/azure-sdk-for-python/issues/23588) | ✅ yes | concurrency_test | auth | service_bus |
| [#21985](https://github.com/Azure/azure-sdk-for-python/issues/21985) | ✅ yes | concurrency_test | memory_lifecycle | service_bus |
| [#21878](https://github.com/Azure/azure-sdk-for-python/issues/21878) | ⚠️ partially | concurrency_test | streaming | ai_ml |
| [#21849](https://github.com/Azure/azure-sdk-for-python/issues/21849) | ⚠️ partially | integration_test | other | event_hubs |
| [#21736](https://github.com/Azure/azure-sdk-for-python/issues/21736) | ✅ yes | concurrency_test | type_error | storage |
| [#19777](https://github.com/Azure/azure-sdk-for-python/issues/19777) | ✅ yes | concurrency_test | memory_lifecycle | service_bus |
| [#15358](https://github.com/Azure/azure-sdk-for-python/issues/15358) | ⚠️ partially | concurrency_test | memory_lifecycle | storage |
| [#14543](https://github.com/Azure/azure-sdk-for-python/issues/14543) | ⚠️ partially | concurrency_test | error_handling | event_hubs |
| [#14497](https://github.com/Azure/azure-sdk-for-python/issues/14497) | ⚠️ partially | concurrency_test | memory_lifecycle | storage |
| [#11543](https://github.com/Azure/azure-sdk-for-python/issues/11543) | ✅ yes | concurrency_test | memory_lifecycle | core |
| [#3142](https://github.com/Azure/azure-sdk-for-python/issues/3142) | ✅ yes | concurrency_test | memory_lifecycle | core |

### Java (7 issues)

| Issue | Catchable | Test Type | Bug Category | Service Area |
|---|---|---|---|---|
| [#47508](https://github.com/Azure/azure-sdk-for-java/issues/47508) | ⚠️ partially | concurrency_test | memory_lifecycle | service_bus |
| [#47356](https://github.com/Azure/azure-sdk-for-java/issues/47356) | ❌ no | concurrency_test | connection_retry | service_bus |
| [#46231](https://github.com/Azure/azure-sdk-for-java/issues/46231) | ❌ no | concurrency_test | memory_lifecycle | identity |
| [#44519](https://github.com/Azure/azure-sdk-for-java/issues/44519) | ❌ no | concurrency_test | platform_compat | identity |
| [#43765](https://github.com/Azure/azure-sdk-for-java/issues/43765) | ⚠️ partially | concurrency_test | streaming | event_hubs |
| [#16605](https://github.com/Azure/azure-sdk-for-java/issues/16605) | ❌ no | concurrency_test | memory_lifecycle | core |
| [#13799](https://github.com/Azure/azure-sdk-for-java/issues/13799) | ✅ yes | concurrency_test | error_handling | keyvault |

### .NET (24 issues)

| Issue | Catchable | Test Type | Bug Category | Service Area |
|---|---|---|---|---|
| [#49981](https://github.com/Azure/azure-sdk-for-net/issues/49981) | ✅ yes | concurrency_test | memory_lifecycle | storage |
| [#35435](https://github.com/Azure/azure-sdk-for-net/issues/35435) | ✅ yes | integration_test | memory_lifecycle | storage |
| [#33718](https://github.com/Azure/azure-sdk-for-net/issues/33718) | ⚠️ partially | concurrency_test | connection_retry | storage |
| [#33463](https://github.com/Azure/azure-sdk-for-net/issues/33463) | ✅ yes | unit_test | memory_lifecycle | storage |
| [#27018](https://github.com/Azure/azure-sdk-for-net/issues/27018) | ✅ yes | concurrency_test | memory_lifecycle | storage |
| [#26416](https://github.com/Azure/azure-sdk-for-net/issues/26416) | ✅ yes | concurrency_test | serialization | storage |
| [#25656](https://github.com/Azure/azure-sdk-for-net/issues/25656) | ✅ yes | concurrency_test | error_handling | storage |
| [#22314](https://github.com/Azure/azure-sdk-for-net/issues/22314) | ✅ yes | concurrency_test | error_handling | identity |
| [#22156](https://github.com/Azure/azure-sdk-for-net/issues/22156) | ✅ yes | concurrency_test | api_surface | ai_ml |
| [#21297](https://github.com/Azure/azure-sdk-for-net/issues/21297) | ✅ yes | concurrency_test | error_handling | event_hubs |
| [#20485](https://github.com/Azure/azure-sdk-for-net/issues/20485) | ✅ yes | concurrency_test | auth | identity |
| [#18483](https://github.com/Azure/azure-sdk-for-net/issues/18483) | ⚠️ partially | concurrency_test | memory_lifecycle | core |
| [#16825](https://github.com/Azure/azure-sdk-for-net/issues/16825) | ⚠️ partially | concurrency_test | connection_retry | storage |
| [#13156](https://github.com/Azure/azure-sdk-for-net/issues/13156) | ⚠️ partially | concurrency_test | memory_lifecycle | core |
| [#12938](https://github.com/Azure/azure-sdk-for-net/issues/12938) | ✅ yes | concurrency_test | error_handling | keyvault |
| [#12466](https://github.com/Azure/azure-sdk-for-net/issues/12466) | ✅ yes | concurrency_test | error_handling | event_hubs |
| [#10904](https://github.com/Azure/azure-sdk-for-net/issues/10904) | ✅ yes | concurrency_test | other | core |
| [#10027](https://github.com/Azure/azure-sdk-for-net/issues/10027) | ✅ yes | concurrency_test | streaming | storage |
| [#7472](https://github.com/Azure/azure-sdk-for-net/issues/7472) | ⚠️ partially | concurrency_test | error_handling | event_hubs |
| [#7435](https://github.com/Azure/azure-sdk-for-net/issues/7435) | ⚠️ partially | concurrency_test | other | event_hubs |
| [#7018](https://github.com/Azure/azure-sdk-for-net/issues/7018) | ⚠️ partially | concurrency_test | other | storage |
| [#6540](https://github.com/Azure/azure-sdk-for-net/issues/6540) | ⚠️ partially | concurrency_test | error_handling | service_bus |
| [#6187](https://github.com/Azure/azure-sdk-for-net/issues/6187) | ⚠️ partially | concurrency_test | error_handling | service_bus |
| [#4448](https://github.com/Azure/azure-sdk-for-net/issues/4448) | ⚠️ partially | concurrency_test | error_handling | service_bus |

### JS (23 issues)

| Issue | Catchable | Test Type | Bug Category | Service Area |
|---|---|---|---|---|
| [#28342](https://github.com/Azure/azure-sdk-for-js/issues/28342) | ✅ yes | concurrency_test | streaming | openai |
| [#28023](https://github.com/Azure/azure-sdk-for-js/issues/28023) | ⚠️ partially | concurrency_test | connection_retry | service_bus |
| [#26398](https://github.com/Azure/azure-sdk-for-js/issues/26398) | ✅ yes | concurrency_test | error_handling | communication |
| [#25918](https://github.com/Azure/azure-sdk-for-js/issues/25918) | ✅ yes | concurrency_test | auth | storage |
| [#25572](https://github.com/Azure/azure-sdk-for-js/issues/25572) | ✅ yes | concurrency_test | memory_lifecycle | event_hubs |
| [#25426](https://github.com/Azure/azure-sdk-for-js/issues/25426) | ✅ yes | concurrency_test | memory_lifecycle | event_hubs |
| [#24314](https://github.com/Azure/azure-sdk-for-js/issues/24314) | ✅ yes | concurrency_test | memory_lifecycle | communication |
| [#17968](https://github.com/Azure/azure-sdk-for-js/issues/17968) | ✅ yes | concurrency_test | memory_lifecycle | storage |
| [#14212](https://github.com/Azure/azure-sdk-for-js/issues/14212) | ✅ yes | concurrency_test | connection_retry | service_bus |
| [#13985](https://github.com/Azure/azure-sdk-for-js/issues/13985) | ✅ yes | concurrency_test | memory_lifecycle | core |
| [#12711](https://github.com/Azure/azure-sdk-for-js/issues/12711) | ✅ yes | concurrency_test | memory_lifecycle | service_bus |
| [#12161](https://github.com/Azure/azure-sdk-for-js/issues/12161) | ✅ yes | concurrency_test | memory_lifecycle | service_bus |
| [#11750](https://github.com/Azure/azure-sdk-for-js/issues/11750) | ✅ yes | concurrency_test | memory_lifecycle | service_bus |
| [#11736](https://github.com/Azure/azure-sdk-for-js/issues/11736) | ✅ yes | concurrency_test | memory_lifecycle | service_bus |
| [#11633](https://github.com/Azure/azure-sdk-for-js/issues/11633) | ✅ yes | integration_test | error_handling | service_bus |
| [#8598](https://github.com/Azure/azure-sdk-for-js/issues/8598) | ⚠️ partially | concurrency_test | memory_lifecycle | event_hubs |
| [#6512](https://github.com/Azure/azure-sdk-for-js/issues/6512) | ⚠️ partially | concurrency_test | connection_retry | event_hubs |
| [#4021](https://github.com/Azure/azure-sdk-for-js/issues/4021) | ✅ yes | concurrency_test | memory_lifecycle | storage |
| [#2540](https://github.com/Azure/azure-sdk-for-js/issues/2540) | ✅ yes | concurrency_test | streaming | service_bus |
| [#2365](https://github.com/Azure/azure-sdk-for-js/issues/2365) | ✅ yes | concurrency_test | memory_lifecycle | service_bus |
| [#1730](https://github.com/Azure/azure-sdk-for-js/issues/1730) | ✅ yes | integration_test | memory_lifecycle | service_bus |
| [#1152](https://github.com/Azure/azure-sdk-for-js/issues/1152) | ⚠️ partially | concurrency_test | streaming | service_bus |
| [#1040](https://github.com/Azure/azure-sdk-for-js/issues/1040) | ✅ yes | concurrency_test | memory_lifecycle | service_bus |

### Go (13 issues)

| Issue | Catchable | Test Type | Bug Category | Service Area |
|---|---|---|---|---|
| [#24869](https://github.com/Azure/azure-sdk-for-go/issues/24869) | ✅ yes | concurrency_test | memory_lifecycle | core |
| [#24031](https://github.com/Azure/azure-sdk-for-go/issues/24031) | ✅ yes | concurrency_test | auth | keyvault |
| [#19965](https://github.com/Azure/azure-sdk-for-go/issues/19965) | ✅ yes | concurrency_test | error_handling | service_bus |
| [#19528](https://github.com/Azure/azure-sdk-for-go/issues/19528) | ✅ yes | concurrency_test | memory_lifecycle | core |
| [#18517](https://github.com/Azure/azure-sdk-for-go/issues/18517) | ✅ yes | concurrency_test | connection_retry | service_bus |
| [#17325](https://github.com/Azure/azure-sdk-for-go/issues/17325) | ✅ yes | concurrency_test | connection_retry | service_bus |
| [#17144](https://github.com/Azure/azure-sdk-for-go/issues/17144) | ✅ yes | concurrency_test | other | identity |
| [#16092](https://github.com/Azure/azure-sdk-for-go/issues/16092) | ✅ yes | concurrency_test | other | service_bus |
| [#15736](https://github.com/Azure/azure-sdk-for-go/issues/15736) | ✅ yes | concurrency_test | memory_lifecycle | service_bus |
| [#14729](https://github.com/Azure/azure-sdk-for-go/issues/14729) | ✅ yes | concurrency_test | memory_lifecycle | core |
| [#14418](https://github.com/Azure/azure-sdk-for-go/issues/14418) | ✅ yes | concurrency_test | memory_lifecycle | arm_mgmt |
| [#5243](https://github.com/Azure/azure-sdk-for-go/issues/5243) | ✅ yes | concurrency_test | memory_lifecycle | core |
| [#1450](https://github.com/Azure/azure-sdk-for-go/issues/1450) | ✅ yes | concurrency_test | error_handling | core |

---

## Missing Retry / Reconnection Scenario Tests

**77 issues (5.4%)**

These bugs would have been caught by simulating network faults — connection drops mid-request, retry storms on transient errors, reconnection after failover, and timeout behavior under load.

### Python (22 issues)

| Issue | Catchable | Test Type | Bug Category | Service Area |
|---|---|---|---|---|
| [#38970](https://github.com/Azure/azure-sdk-for-python/issues/38970) | ⚠️ partially | concurrency_test | connection_retry | service_bus |
| [#30052](https://github.com/Azure/azure-sdk-for-python/issues/30052) | ⚠️ partially | integration_test | connection_retry | service_bus |
| [#29961](https://github.com/Azure/azure-sdk-for-python/issues/29961) | ⚠️ partially | integration_test | connection_retry | event_hubs |
| [#27137](https://github.com/Azure/azure-sdk-for-python/issues/27137) | ⚠️ partially | concurrency_test | connection_retry | event_hubs |
| [#24646](https://github.com/Azure/azure-sdk-for-python/issues/24646) | ⚠️ partially | integration_test | connection_retry | keyvault |
| [#22784](https://github.com/Azure/azure-sdk-for-python/issues/22784) | ✅ yes | error_path_test | connection_retry | storage |
| [#22244](https://github.com/Azure/azure-sdk-for-python/issues/22244) | ⚠️ partially | error_path_test | connection_retry | storage |
| [#21870](https://github.com/Azure/azure-sdk-for-python/issues/21870) | ✅ yes | error_path_test | connection_retry | storage |
| [#20040](https://github.com/Azure/azure-sdk-for-python/issues/20040) | ⚠️ partially | concurrency_test | connection_retry | core |
| [#19753](https://github.com/Azure/azure-sdk-for-python/issues/19753) | ⚠️ partially | concurrency_test | connection_retry | storage |
| [#19749](https://github.com/Azure/azure-sdk-for-python/issues/19749) | ⚠️ partially | integration_test | streaming | ai_ml |
| [#19486](https://github.com/Azure/azure-sdk-for-python/issues/19486) | ⚠️ partially | integration_test | connection_retry | storage |
| [#18795](https://github.com/Azure/azure-sdk-for-python/issues/18795) | ⚠️ partially | concurrency_test | connection_retry | service_bus |
| [#18497](https://github.com/Azure/azure-sdk-for-python/issues/18497) | ⚠️ partially | concurrency_test | connection_retry | service_bus |
| [#17974](https://github.com/Azure/azure-sdk-for-python/issues/17974) | ⚠️ partially | error_path_test | connection_retry | storage |
| [#17910](https://github.com/Azure/azure-sdk-for-python/issues/17910) | ⚠️ partially | concurrency_test | connection_retry | service_bus |
| [#17316](https://github.com/Azure/azure-sdk-for-python/issues/17316) | ⚠️ partially | error_path_test | auth | app_config |
| [#16037](https://github.com/Azure/azure-sdk-for-python/issues/16037) | ⚠️ partially | concurrency_test | connection_retry | service_bus |
| [#14111](https://github.com/Azure/azure-sdk-for-python/issues/14111) | ✅ yes | integration_test | error_handling | arm_mgmt |
| [#11689](https://github.com/Azure/azure-sdk-for-python/issues/11689) | ✅ yes | integration_test | other | cosmos |
| [#11659](https://github.com/Azure/azure-sdk-for-python/issues/11659) | ⚠️ partially | integration_test | connection_retry | storage |
| [#3692](https://github.com/Azure/azure-sdk-for-python/issues/3692) | ✅ yes | integration_test | connection_retry | service_bus |

### Java (14 issues)

| Issue | Catchable | Test Type | Bug Category | Service Area |
|---|---|---|---|---|
| [#47036](https://github.com/Azure/azure-sdk-for-java/issues/47036) | ✅ yes | integration_test | auth | keyvault |
| [#46659](https://github.com/Azure/azure-sdk-for-java/issues/46659) | ✅ yes | integration_test | connection_retry | service_bus |
| [#46227](https://github.com/Azure/azure-sdk-for-java/issues/46227) | ✅ yes | integration_test | connection_retry | service_bus |
| [#45248](https://github.com/Azure/azure-sdk-for-java/issues/45248) | ✅ yes | integration_test | connection_retry | event_hubs |
| [#44926](https://github.com/Azure/azure-sdk-for-java/issues/44926) | ✅ yes | error_path_test | connection_retry | identity |
| [#44688](https://github.com/Azure/azure-sdk-for-java/issues/44688) | ✅ yes | integration_test | connection_retry | service_bus |
| [#44278](https://github.com/Azure/azure-sdk-for-java/issues/44278) | ⚠️ partially | concurrency_test | connection_retry | event_hubs |
| [#43894](https://github.com/Azure/azure-sdk-for-java/issues/43894) | ⚠️ partially | integration_test | connection_retry | identity |
| [#43877](https://github.com/Azure/azure-sdk-for-java/issues/43877) | ⚠️ partially | concurrency_test | error_handling | service_bus |
| [#25718](https://github.com/Azure/azure-sdk-for-java/issues/25718) | ⚠️ partially | concurrency_test | connection_retry | service_bus |
| [#17810](https://github.com/Azure/azure-sdk-for-java/issues/17810) | ⚠️ partially | concurrency_test | connection_retry | event_hubs |
| [#16633](https://github.com/Azure/azure-sdk-for-java/issues/16633) | ⚠️ partially | concurrency_test | connection_retry | storage |
| [#15575](https://github.com/Azure/azure-sdk-for-java/issues/15575) | ⚠️ partially | concurrency_test | connection_retry | storage |
| [#8398](https://github.com/Azure/azure-sdk-for-java/issues/8398) | ✅ yes | error_path_test | connection_retry | event_hubs |

### .NET (16 issues)

| Issue | Catchable | Test Type | Bug Category | Service Area |
|---|---|---|---|---|
| [#54572](https://github.com/Azure/azure-sdk-for-net/issues/54572) | ✅ yes | integration_test | connection_retry | service_bus |
| [#51052](https://github.com/Azure/azure-sdk-for-net/issues/51052) | ✅ yes | integration_test | connection_retry | identity |
| [#42952](https://github.com/Azure/azure-sdk-for-net/issues/42952) | ✅ yes | integration_test | connection_retry | service_bus |
| [#40028](https://github.com/Azure/azure-sdk-for-net/issues/40028) | ✅ yes | integration_test | connection_retry | event_hubs |
| [#35010](https://github.com/Azure/azure-sdk-for-net/issues/35010) | ⚠️ partially | integration_test | connection_retry | storage |
| [#31252](https://github.com/Azure/azure-sdk-for-net/issues/31252) | ⚠️ partially | integration_test | connection_retry | storage |
| [#21392](https://github.com/Azure/azure-sdk-for-net/issues/21392) | ✅ yes | error_path_test | connection_retry | core |
| [#20177](https://github.com/Azure/azure-sdk-for-net/issues/20177) | ✅ yes | concurrency_test | connection_retry | service_bus |
| [#20174](https://github.com/Azure/azure-sdk-for-net/issues/20174) | ✅ yes | concurrency_test | connection_retry | event_hubs |
| [#19457](https://github.com/Azure/azure-sdk-for-net/issues/19457) | ⚠️ partially | concurrency_test | connection_retry | core |
| [#16416](https://github.com/Azure/azure-sdk-for-net/issues/16416) | ⚠️ partially | concurrency_test | connection_retry | arm_mgmt |
| [#15108](https://github.com/Azure/azure-sdk-for-net/issues/15108) | ✅ yes | integration_test | error_handling | search |
| [#12415](https://github.com/Azure/azure-sdk-for-net/issues/12415) | ✅ yes | integration_test | connection_retry | storage |
| [#7454](https://github.com/Azure/azure-sdk-for-net/issues/7454) | ⚠️ partially | concurrency_test | connection_retry | service_bus |
| [#6252](https://github.com/Azure/azure-sdk-for-net/issues/6252) | ⚠️ partially | concurrency_test | connection_retry | service_bus |
| [#6097](https://github.com/Azure/azure-sdk-for-net/issues/6097) | ⚠️ partially | integration_test | error_handling | service_bus |

### JS (21 issues)

| Issue | Catchable | Test Type | Bug Category | Service Area |
|---|---|---|---|---|
| [#26236](https://github.com/Azure/azure-sdk-for-js/issues/26236) | ❌ no | integration_test | connection_retry | service_bus |
| [#26154](https://github.com/Azure/azure-sdk-for-js/issues/26154) | ✅ yes | integration_test | connection_retry | communication |
| [#25940](https://github.com/Azure/azure-sdk-for-js/issues/25940) | ⚠️ partially | integration_test | connection_retry | event_hubs |
| [#25722](https://github.com/Azure/azure-sdk-for-js/issues/25722) | ⚠️ partially | integration_test | connection_retry | storage |
| [#25647](https://github.com/Azure/azure-sdk-for-js/issues/25647) | ✅ yes | integration_test | connection_retry | other |
| [#25553](https://github.com/Azure/azure-sdk-for-js/issues/25553) | ⚠️ partially | integration_test | connection_retry | service_bus |
| [#24540](https://github.com/Azure/azure-sdk-for-js/issues/24540) | ⚠️ partially | integration_test | connection_retry | service_bus |
| [#24407](https://github.com/Azure/azure-sdk-for-js/issues/24407) | ⚠️ partially | integration_test | connection_retry | storage |
| [#15114](https://github.com/Azure/azure-sdk-for-js/issues/15114) | ✅ yes | integration_test | streaming | service_bus |
| [#13033](https://github.com/Azure/azure-sdk-for-js/issues/13033) | ✅ yes | integration_test | connection_retry | storage |
| [#12444](https://github.com/Azure/azure-sdk-for-js/issues/12444) | ✅ yes | concurrency_test | connection_retry | event_hubs |
| [#12278](https://github.com/Azure/azure-sdk-for-js/issues/12278) | ✅ yes | integration_test | connection_retry | event_hubs |
| [#11187](https://github.com/Azure/azure-sdk-for-js/issues/11187) | ✅ yes | regression_test | error_handling | storage |
| [#10980](https://github.com/Azure/azure-sdk-for-js/issues/10980) | ⚠️ partially | concurrency_test | connection_retry | service_bus |
| [#9966](https://github.com/Azure/azure-sdk-for-js/issues/9966) | ✅ yes | error_path_test | connection_retry | core |
| [#9926](https://github.com/Azure/azure-sdk-for-js/issues/9926) | ⚠️ partially | concurrency_test | connection_retry | service_bus |
| [#6065](https://github.com/Azure/azure-sdk-for-js/issues/6065) | ✅ yes | error_path_test | connection_retry | service_bus |
| [#2496](https://github.com/Azure/azure-sdk-for-js/issues/2496) | ✅ yes | error_path_test | connection_retry | service_bus |
| [#2495](https://github.com/Azure/azure-sdk-for-js/issues/2495) | ✅ yes | error_path_test | connection_retry | service_bus |
| [#1303](https://github.com/Azure/azure-sdk-for-js/issues/1303) | ✅ yes | error_path_test | connection_retry | service_bus |
| [#1176](https://github.com/Azure/azure-sdk-for-js/issues/1176) | ⚠️ partially | integration_test | connection_retry | service_bus |

### Go (4 issues)

| Issue | Catchable | Test Type | Bug Category | Service Area |
|---|---|---|---|---|
| [#21346](https://github.com/Azure/azure-sdk-for-go/issues/21346) | ⚠️ partially | integration_test | connection_retry | core |
| [#20735](https://github.com/Azure/azure-sdk-for-go/issues/20735) | ⚠️ partially | integration_test | connection_retry | storage |
| [#20647](https://github.com/Azure/azure-sdk-for-go/issues/20647) | ✅ yes | integration_test | error_handling | service_bus |
| [#14655](https://github.com/Azure/azure-sdk-for-go/issues/14655) | ✅ yes | integration_test | other | storage |

---

## Missing Multi-Platform Tests

**73 issues (5.1%)**

These bugs would have been caught by running tests on all target platforms — different OS versions, runtime versions (Node LTS variants, .NET versions, JDK versions), browser vs. server, ARM vs. x64.

### Python (17 issues)

| Issue | Catchable | Test Type | Bug Category | Service Area |
|---|---|---|---|---|
| [#44207](https://github.com/Azure/azure-sdk-for-python/issues/44207) | ✅ yes | integration_test | api_surface | ai_ml |
| [#39830](https://github.com/Azure/azure-sdk-for-python/issues/39830) | ✅ yes | platform_test | platform_compat | ai_ml |
| [#39314](https://github.com/Azure/azure-sdk-for-python/issues/39314) | ✅ yes | platform_test | type_error | ai_ml |
| [#37790](https://github.com/Azure/azure-sdk-for-python/issues/37790) | ✅ yes | platform_test | type_error | identity |
| [#37704](https://github.com/Azure/azure-sdk-for-python/issues/37704) | ✅ yes | platform_test | type_error | ai_ml |
| [#37600](https://github.com/Azure/azure-sdk-for-python/issues/37600) | ✅ yes | platform_test | type_error | ai_ml |
| [#36416](https://github.com/Azure/azure-sdk-for-python/issues/36416) | ✅ yes | platform_test | error_handling | arm_mgmt |
| [#35495](https://github.com/Azure/azure-sdk-for-python/issues/35495) | ✅ yes | platform_test | type_error | ai_ml |
| [#34194](https://github.com/Azure/azure-sdk-for-python/issues/34194) | ✅ yes | platform_test | auth | identity |
| [#33021](https://github.com/Azure/azure-sdk-for-python/issues/33021) | ✅ yes | platform_test | platform_compat | identity |
| [#26857](https://github.com/Azure/azure-sdk-for-python/issues/26857) | ⚠️ partially | platform_test | platform_compat | identity |
| [#24928](https://github.com/Azure/azure-sdk-for-python/issues/24928) | ✅ yes | platform_test | platform_compat | core |
| [#24903](https://github.com/Azure/azure-sdk-for-python/issues/24903) | ✅ yes | platform_test | api_surface | ai_ml |
| [#19774](https://github.com/Azure/azure-sdk-for-python/issues/19774) | ⚠️ partially | platform_test | platform_compat | storage |
| [#16594](https://github.com/Azure/azure-sdk-for-python/issues/16594) | ✅ yes | platform_test | type_error | storage |
| [#12014](https://github.com/Azure/azure-sdk-for-python/issues/12014) | ✅ yes | platform_test | platform_compat | identity |
| [#94](https://github.com/Azure/azure-sdk-for-python/issues/94) | ⚠️ partially | platform_test | platform_compat | core |

### Java (6 issues)

| Issue | Catchable | Test Type | Bug Category | Service Area |
|---|---|---|---|---|
| [#47614](https://github.com/Azure/azure-sdk-for-java/issues/47614) | ✅ yes | platform_test | error_handling | identity |
| [#47106](https://github.com/Azure/azure-sdk-for-java/issues/47106) | ✅ yes | platform_test | platform_compat | identity |
| [#44267](https://github.com/Azure/azure-sdk-for-java/issues/44267) | ⚠️ partially | error_path_test | auth | keyvault |
| [#44182](https://github.com/Azure/azure-sdk-for-java/issues/44182) | ❌ no | platform_test | platform_compat | keyvault |
| [#44085](https://github.com/Azure/azure-sdk-for-java/issues/44085) | ⚠️ partially | error_path_test | auth | keyvault |
| [#31355](https://github.com/Azure/azure-sdk-for-java/issues/31355) | ❌ no | e2e_test | api_surface | cosmos |

### .NET (17 issues)

| Issue | Catchable | Test Type | Bug Category | Service Area |
|---|---|---|---|---|
| [#42925](https://github.com/Azure/azure-sdk-for-net/issues/42925) | ✅ yes | platform_test | platform_compat | storage |
| [#34467](https://github.com/Azure/azure-sdk-for-net/issues/34467) | ✅ yes | platform_test | type_error | storage |
| [#33472](https://github.com/Azure/azure-sdk-for-net/issues/33472) | ✅ yes | platform_test | platform_compat | storage |
| [#32474](https://github.com/Azure/azure-sdk-for-net/issues/32474) | ✅ yes | platform_test | platform_compat | storage |
| [#29645](https://github.com/Azure/azure-sdk-for-net/issues/29645) | ✅ yes | platform_test | platform_compat | arm_mgmt |
| [#24055](https://github.com/Azure/azure-sdk-for-net/issues/24055) | ⚠️ partially | platform_test | platform_compat | core |
| [#20125](https://github.com/Azure/azure-sdk-for-net/issues/20125) | ✅ yes | integration_test | connection_retry | core |
| [#17052](https://github.com/Azure/azure-sdk-for-net/issues/17052) | ✅ yes | platform_test | auth | identity |
| [#16795](https://github.com/Azure/azure-sdk-for-net/issues/16795) | ✅ yes | platform_test | platform_compat | identity |
| [#14362](https://github.com/Azure/azure-sdk-for-net/issues/14362) | ✅ yes | platform_test | platform_compat | identity |
| [#13893](https://github.com/Azure/azure-sdk-for-net/issues/13893) | ✅ yes | platform_test | serialization | core |
| [#12939](https://github.com/Azure/azure-sdk-for-net/issues/12939) | ✅ yes | platform_test | platform_compat | identity |
| [#11372](https://github.com/Azure/azure-sdk-for-net/issues/11372) | ✅ yes | platform_test | platform_compat | identity |
| [#10476](https://github.com/Azure/azure-sdk-for-net/issues/10476) | ✅ yes | platform_test | platform_compat | storage |
| [#9294](https://github.com/Azure/azure-sdk-for-net/issues/9294) | ✅ yes | platform_test | platform_compat | service_bus |
| [#5995](https://github.com/Azure/azure-sdk-for-net/issues/5995) | ✅ yes | platform_test | platform_compat | event_hubs |
| [#3904](https://github.com/Azure/azure-sdk-for-net/issues/3904) | ✅ yes | platform_test | platform_compat | service_bus |

### JS (31 issues)

| Issue | Catchable | Test Type | Bug Category | Service Area |
|---|---|---|---|---|
| [#36384](https://github.com/Azure/azure-sdk-for-js/issues/36384) | ✅ yes | platform_test | platform_compat | core |
| [#36261](https://github.com/Azure/azure-sdk-for-js/issues/36261) | ✅ yes | platform_test | platform_compat | storage |
| [#28956](https://github.com/Azure/azure-sdk-for-js/issues/28956) | ✅ yes | platform_test | platform_compat | core |
| [#28101](https://github.com/Azure/azure-sdk-for-js/issues/28101) | ✅ yes | platform_test | platform_compat | core |
| [#27140](https://github.com/Azure/azure-sdk-for-js/issues/27140) | ✅ yes | platform_test | platform_compat | identity |
| [#27083](https://github.com/Azure/azure-sdk-for-js/issues/27083) | ✅ yes | platform_test | platform_compat | identity |
| [#25912](https://github.com/Azure/azure-sdk-for-js/issues/25912) | ❌ no | e2e_test | other | communication |
| [#25640](https://github.com/Azure/azure-sdk-for-js/issues/25640) | ✅ yes | platform_test | platform_compat | storage |
| [#25552](https://github.com/Azure/azure-sdk-for-js/issues/25552) | ✅ yes | platform_test | platform_compat | storage |
| [#24905](https://github.com/Azure/azure-sdk-for-js/issues/24905) | ✅ yes | platform_test | platform_compat | communication |
| [#24556](https://github.com/Azure/azure-sdk-for-js/issues/24556) | ✅ yes | platform_test | platform_compat | communication |
| [#23390](https://github.com/Azure/azure-sdk-for-js/issues/23390) | ✅ yes | platform_test | platform_compat | communication |
| [#23090](https://github.com/Azure/azure-sdk-for-js/issues/23090) | ❌ no | platform_test | other | communication |
| [#22263](https://github.com/Azure/azure-sdk-for-js/issues/22263) | ⚠️ partially | platform_test | platform_compat | cosmos |
| [#21110](https://github.com/Azure/azure-sdk-for-js/issues/21110) | ⚠️ partially | platform_test | platform_compat | storage |
| [#20289](https://github.com/Azure/azure-sdk-for-js/issues/20289) | ⚠️ partially | platform_test | platform_compat | cosmos |
| [#14742](https://github.com/Azure/azure-sdk-for-js/issues/14742) | ✅ yes | platform_test | platform_compat | storage |
| [#13268](https://github.com/Azure/azure-sdk-for-js/issues/13268) | ✅ yes | platform_test | platform_compat | core |
| [#13174](https://github.com/Azure/azure-sdk-for-js/issues/13174) | ✅ yes | platform_test | platform_compat | storage |
| [#12983](https://github.com/Azure/azure-sdk-for-js/issues/12983) | ✅ yes | platform_test | platform_compat | service_bus |
| [#12828](https://github.com/Azure/azure-sdk-for-js/issues/12828) | ✅ yes | platform_test | platform_compat | core |
| [#9702](https://github.com/Azure/azure-sdk-for-js/issues/9702) | ⚠️ partially | platform_test | platform_compat | storage |
| [#8499](https://github.com/Azure/azure-sdk-for-js/issues/8499) | ⚠️ partially | platform_test | platform_compat | storage |
| [#7296](https://github.com/Azure/azure-sdk-for-js/issues/7296) | ⚠️ partially | platform_test | platform_compat | storage |
| [#6141](https://github.com/Azure/azure-sdk-for-js/issues/6141) | ⚠️ partially | platform_test | platform_compat | service_bus |
| [#5880](https://github.com/Azure/azure-sdk-for-js/issues/5880) | ⚠️ partially | platform_test | platform_compat | storage |
| [#5764](https://github.com/Azure/azure-sdk-for-js/issues/5764) | ✅ yes | platform_test | platform_compat | storage |
| [#5143](https://github.com/Azure/azure-sdk-for-js/issues/5143) | ✅ yes | platform_test | platform_compat | core |
| [#5033](https://github.com/Azure/azure-sdk-for-js/issues/5033) | ✅ yes | platform_test | platform_compat | storage |
| [#3799](https://github.com/Azure/azure-sdk-for-js/issues/3799) | ✅ yes | platform_test | platform_compat | service_bus |
| [#2137](https://github.com/Azure/azure-sdk-for-js/issues/2137) | ✅ yes | platform_test | platform_compat | service_bus |

### Go (2 issues)

| Issue | Catchable | Test Type | Bug Category | Service Area |
|---|---|---|---|---|
| [#19684](https://github.com/Azure/azure-sdk-for-go/issues/19684) | ✅ yes | platform_test | platform_compat | storage |
| [#16820](https://github.com/Azure/azure-sdk-for-go/issues/16820) | ⚠️ partially | platform_test | platform_compat | keyvault |

---

## Missing Auth Flow Tests

**71 issues (4.9%)**

These bugs would have been caught by testing specific credential and authentication flows — managed identity in various environments, token refresh during long operations, certificate-based auth, and multi-tenant scenarios.

### Python (32 issues)

| Issue | Catchable | Test Type | Bug Category | Service Area |
|---|---|---|---|---|
| [#39793](https://github.com/Azure/azure-sdk-for-python/issues/39793) | ✅ yes | integration_test | auth | ai_ml |
| [#34277](https://github.com/Azure/azure-sdk-for-python/issues/34277) | ✅ yes | error_path_test | auth | ai_ml |
| [#32921](https://github.com/Azure/azure-sdk-for-python/issues/32921) | ✅ yes | error_path_test | auth | ai_ml |
| [#32278](https://github.com/Azure/azure-sdk-for-python/issues/32278) | ✅ yes | error_path_test | auth | monitor |
| [#28648](https://github.com/Azure/azure-sdk-for-python/issues/28648) | ✅ yes | integration_test | auth | keyvault |
| [#27079](https://github.com/Azure/azure-sdk-for-python/issues/27079) | ✅ yes | integration_test | auth | event_hubs |
| [#27038](https://github.com/Azure/azure-sdk-for-python/issues/27038) | ⚠️ partially | integration_test | error_handling | ai_ml |
| [#26997](https://github.com/Azure/azure-sdk-for-python/issues/26997) | ⚠️ partially | integration_test | auth | identity |
| [#26982](https://github.com/Azure/azure-sdk-for-python/issues/26982) | ⚠️ partially | integration_test | auth | identity |
| [#24898](https://github.com/Azure/azure-sdk-for-python/issues/24898) | ✅ yes | error_path_test | auth | ai_ml |
| [#24156](https://github.com/Azure/azure-sdk-for-python/issues/24156) | ✅ yes | integration_test | auth | storage |
| [#23917](https://github.com/Azure/azure-sdk-for-python/issues/23917) | ✅ yes | integration_test | auth | app_config |
| [#23736](https://github.com/Azure/azure-sdk-for-python/issues/23736) | ✅ yes | error_path_test | error_handling | ai_ml |
| [#23304](https://github.com/Azure/azure-sdk-for-python/issues/23304) | ✅ yes | integration_test | auth | storage |
| [#23249](https://github.com/Azure/azure-sdk-for-python/issues/23249) | ✅ yes | integration_test | auth | identity |
| [#23138](https://github.com/Azure/azure-sdk-for-python/issues/23138) | ✅ yes | integration_test | auth | identity |
| [#22080](https://github.com/Azure/azure-sdk-for-python/issues/22080) | ✅ yes | integration_test | auth | identity |
| [#21668](https://github.com/Azure/azure-sdk-for-python/issues/21668) | ✅ yes | integration_test | auth | storage |
| [#20824](https://github.com/Azure/azure-sdk-for-python/issues/20824) | ✅ yes | unit_test | auth | storage |
| [#20220](https://github.com/Azure/azure-sdk-for-python/issues/20220) | ✅ yes | integration_test | auth | arm_mgmt |
| [#19890](https://github.com/Azure/azure-sdk-for-python/issues/19890) | ✅ yes | integration_test | api_surface | storage |
| [#18957](https://github.com/Azure/azure-sdk-for-python/issues/18957) | ✅ yes | error_path_test | api_surface | arm_mgmt |
| [#17094](https://github.com/Azure/azure-sdk-for-python/issues/17094) | ✅ yes | integration_test | auth | storage |
| [#12947](https://github.com/Azure/azure-sdk-for-python/issues/12947) | ✅ yes | unit_test | auth | identity |
| [#2857](https://github.com/Azure/azure-sdk-for-python/issues/2857) | ✅ yes | unit_test | auth | core |
| [#2852](https://github.com/Azure/azure-sdk-for-python/issues/2852) | ✅ yes | integration_test | auth | keyvault |
| [#2467](https://github.com/Azure/azure-sdk-for-python/issues/2467) | ✅ yes | integration_test | auth | core |
| [#1669](https://github.com/Azure/azure-sdk-for-python/issues/1669) | ✅ yes | integration_test | auth | core |
| [#1629](https://github.com/Azure/azure-sdk-for-python/issues/1629) | ✅ yes | integration_test | auth | core |
| [#1159](https://github.com/Azure/azure-sdk-for-python/issues/1159) | ✅ yes | integration_test | auth | keyvault |
| [#1157](https://github.com/Azure/azure-sdk-for-python/issues/1157) | ✅ yes | integration_test | other | keyvault |
| [#800](https://github.com/Azure/azure-sdk-for-python/issues/800) | ✅ yes | integration_test | error_handling | core |

### Java (11 issues)

| Issue | Catchable | Test Type | Bug Category | Service Area |
|---|---|---|---|---|
| [#47238](https://github.com/Azure/azure-sdk-for-java/issues/47238) | ✅ yes | integration_test | auth | app_config |
| [#45833](https://github.com/Azure/azure-sdk-for-java/issues/45833) | ✅ yes | integration_test | auth | keyvault |
| [#45263](https://github.com/Azure/azure-sdk-for-java/issues/45263) | ✅ yes | integration_test | error_handling | keyvault |
| [#44771](https://github.com/Azure/azure-sdk-for-java/issues/44771) | ✅ yes | integration_test | auth | keyvault |
| [#43650](https://github.com/Azure/azure-sdk-for-java/issues/43650) | ✅ yes | integration_test | api_surface | storage |
| [#40182](https://github.com/Azure/azure-sdk-for-java/issues/40182) | ✅ yes | integration_test | auth | event_hubs |
| [#39458](https://github.com/Azure/azure-sdk-for-java/issues/39458) | ✅ yes | integration_test | connection_retry | service_bus |
| [#35340](https://github.com/Azure/azure-sdk-for-java/issues/35340) | ✅ yes | integration_test | auth | app_config |
| [#32123](https://github.com/Azure/azure-sdk-for-java/issues/32123) | ⚠️ partially | integration_test | connection_retry | cosmos |
| [#16923](https://github.com/Azure/azure-sdk-for-java/issues/16923) | ✅ yes | integration_test | auth | service_bus |
| [#15774](https://github.com/Azure/azure-sdk-for-java/issues/15774) | ✅ yes | integration_test | auth | identity |

### .NET (10 issues)

| Issue | Catchable | Test Type | Bug Category | Service Area |
|---|---|---|---|---|
| [#38998](https://github.com/Azure/azure-sdk-for-net/issues/38998) | ⚠️ partially | integration_test | auth | monitor |
| [#30401](https://github.com/Azure/azure-sdk-for-net/issues/30401) | ⚠️ partially | integration_test | auth | identity |
| [#27263](https://github.com/Azure/azure-sdk-for-net/issues/27263) | ✅ yes | integration_test | auth | identity |
| [#16306](https://github.com/Azure/azure-sdk-for-net/issues/16306) | ✅ yes | integration_test | auth | identity |
| [#13228](https://github.com/Azure/azure-sdk-for-net/issues/13228) | ✅ yes | integration_test | auth | identity |
| [#11595](https://github.com/Azure/azure-sdk-for-net/issues/11595) | ✅ yes | integration_test | auth | identity |
| [#11574](https://github.com/Azure/azure-sdk-for-net/issues/11574) | ✅ yes | integration_test | auth | keyvault |
| [#8957](https://github.com/Azure/azure-sdk-for-net/issues/8957) | ✅ yes | integration_test | auth | identity |
| [#8627](https://github.com/Azure/azure-sdk-for-net/issues/8627) | ✅ yes | integration_test | auth | identity |
| [#4193](https://github.com/Azure/azure-sdk-for-net/issues/4193) | ✅ yes | unit_test | auth | other |

### JS (14 issues)

| Issue | Catchable | Test Type | Bug Category | Service Area |
|---|---|---|---|---|
| [#27810](https://github.com/Azure/azure-sdk-for-js/issues/27810) | ✅ yes | integration_test | auth | identity |
| [#26395](https://github.com/Azure/azure-sdk-for-js/issues/26395) | ✅ yes | unit_test | auth | identity |
| [#26021](https://github.com/Azure/azure-sdk-for-js/issues/26021) | ✅ yes | error_path_test | auth | openai |
| [#25989](https://github.com/Azure/azure-sdk-for-js/issues/25989) | ✅ yes | unit_test | auth | identity |
| [#24349](https://github.com/Azure/azure-sdk-for-js/issues/24349) | ✅ yes | integration_test | auth | identity |
| [#24095](https://github.com/Azure/azure-sdk-for-js/issues/24095) | ✅ yes | integration_test | auth | identity |
| [#23903](https://github.com/Azure/azure-sdk-for-js/issues/23903) | ✅ yes | integration_test | auth | identity |
| [#23647](https://github.com/Azure/azure-sdk-for-js/issues/23647) | ✅ yes | error_path_test | auth | storage |
| [#16861](https://github.com/Azure/azure-sdk-for-js/issues/16861) | ✅ yes | error_path_test | platform_compat | identity |
| [#15945](https://github.com/Azure/azure-sdk-for-js/issues/15945) | ✅ yes | error_path_test | platform_compat | identity |
| [#12219](https://github.com/Azure/azure-sdk-for-js/issues/12219) | ✅ yes | integration_test | auth | storage |
| [#11451](https://github.com/Azure/azure-sdk-for-js/issues/11451) | ⚠️ partially | integration_test | auth | identity |
| [#6221](https://github.com/Azure/azure-sdk-for-js/issues/6221) | ✅ yes | error_path_test | auth | keyvault |
| [#3971](https://github.com/Azure/azure-sdk-for-js/issues/3971) | ✅ yes | integration_test | auth | service_bus |

### Go (4 issues)

| Issue | Catchable | Test Type | Bug Category | Service Area |
|---|---|---|---|---|
| [#21648](https://github.com/Azure/azure-sdk-for-go/issues/21648) | ✅ yes | error_path_test | auth | monitor |
| [#21053](https://github.com/Azure/azure-sdk-for-go/issues/21053) | ✅ yes | error_path_test | auth | identity |
| [#19682](https://github.com/Azure/azure-sdk-for-go/issues/19682) | ✅ yes | error_path_test | auth | storage |
| [#5843](https://github.com/Azure/azure-sdk-for-go/issues/5843) | ✅ yes | integration_test | auth | arm_mgmt |

---

## Missing Performance Regression Baselines

**31 issues (2.2%)**

These bugs would have been caught by performance benchmarks — latency regressions, memory leaks under sustained load, excessive allocations, and throughput degradation.

### Python (11 issues)

| Issue | Catchable | Test Type | Bug Category | Service Area |
|---|---|---|---|---|
| [#42367](https://github.com/Azure/azure-sdk-for-python/issues/42367) | ✅ yes | perf_test | perf | monitor |
| [#39845](https://github.com/Azure/azure-sdk-for-python/issues/39845) | ⚠️ partially | perf_test | memory_lifecycle | storage |
| [#36090](https://github.com/Azure/azure-sdk-for-python/issues/36090) | ⚠️ partially | perf_test | memory_lifecycle | service_bus |
| [#35266](https://github.com/Azure/azure-sdk-for-python/issues/35266) | ⚠️ partially | perf_test | perf | service_bus |
| [#33384](https://github.com/Azure/azure-sdk-for-python/issues/33384) | ✅ yes | perf_test | perf | other |
| [#30943](https://github.com/Azure/azure-sdk-for-python/issues/30943) | ✅ yes | perf_test | perf | storage |
| [#27023](https://github.com/Azure/azure-sdk-for-python/issues/27023) | ⚠️ partially | perf_test | memory_lifecycle | storage |
| [#26332](https://github.com/Azure/azure-sdk-for-python/issues/26332) | ❌ no | perf_test | perf | storage |
| [#19755](https://github.com/Azure/azure-sdk-for-python/issues/19755) | ⚠️ partially | perf_test | perf | storage |
| [#17941](https://github.com/Azure/azure-sdk-for-python/issues/17941) | ❌ no | perf_test | memory_lifecycle | storage |
| [#17763](https://github.com/Azure/azure-sdk-for-python/issues/17763) | ⚠️ partially | perf_test | perf | storage |

### Java (1 issues)

| Issue | Catchable | Test Type | Bug Category | Service Area |
|---|---|---|---|---|
| [#47883](https://github.com/Azure/azure-sdk-for-java/issues/47883) | ⚠️ partially | perf_test | perf | cosmos |

### .NET (9 issues)

| Issue | Catchable | Test Type | Bug Category | Service Area |
|---|---|---|---|---|
| [#46417](https://github.com/Azure/azure-sdk-for-net/issues/46417) | ✅ yes | perf_test | other | monitor |
| [#31052](https://github.com/Azure/azure-sdk-for-net/issues/31052) | ✅ yes | perf_test | perf | arm_mgmt |
| [#25317](https://github.com/Azure/azure-sdk-for-net/issues/25317) | ✅ yes | perf_test | perf | storage |
| [#22991](https://github.com/Azure/azure-sdk-for-net/issues/22991) | ⚠️ partially | perf_test | perf | service_bus |
| [#22462](https://github.com/Azure/azure-sdk-for-net/issues/22462) | ⚠️ partially | perf_test | perf | storage |
| [#21594](https://github.com/Azure/azure-sdk-for-net/issues/21594) | ⚠️ partially | perf_test | perf | storage |
| [#17781](https://github.com/Azure/azure-sdk-for-net/issues/17781) | ✅ yes | perf_test | perf | core |
| [#17149](https://github.com/Azure/azure-sdk-for-net/issues/17149) | ✅ yes | perf_test | perf | storage |
| [#4064](https://github.com/Azure/azure-sdk-for-net/issues/4064) | ❌ no | perf_test | memory_lifecycle | other |

### JS (9 issues)

| Issue | Catchable | Test Type | Bug Category | Service Area |
|---|---|---|---|---|
| [#27253](https://github.com/Azure/azure-sdk-for-js/issues/27253) | ⚠️ partially | perf_test | memory_lifecycle | event_hubs |
| [#26591](https://github.com/Azure/azure-sdk-for-js/issues/26591) | ⚠️ partially | perf_test | memory_lifecycle | event_hubs |
| [#25928](https://github.com/Azure/azure-sdk-for-js/issues/25928) | ✅ yes | perf_test | perf | event_hubs |
| [#19075](https://github.com/Azure/azure-sdk-for-js/issues/19075) | ⚠️ partially | perf_test | memory_lifecycle | cosmos |
| [#16985](https://github.com/Azure/azure-sdk-for-js/issues/16985) | ⚠️ partially | perf_test | perf | cosmos |
| [#15935](https://github.com/Azure/azure-sdk-for-js/issues/15935) | ⚠️ partially | perf_test | perf | core |
| [#13277](https://github.com/Azure/azure-sdk-for-js/issues/13277) | ❌ no | perf_test | memory_lifecycle | core |
| [#2038](https://github.com/Azure/azure-sdk-for-js/issues/2038) | ✅ yes | perf_test | perf | service_bus |
| [#1389](https://github.com/Azure/azure-sdk-for-js/issues/1389) | ✅ yes | perf_test | perf | service_bus |

### Go (1 issues)

| Issue | Catchable | Test Type | Bug Category | Service Area |
|---|---|---|---|---|
| [#21684](https://github.com/Azure/azure-sdk-for-go/issues/21684) | ⚠️ partially | perf_test | perf | service_bus |

---

## Missing Model Type Combination Tests

**30 issues (2.1%)**

These bugs would have been caught by testing specific model/type combinations — nested generics, polymorphic models, discriminated union variants, and complex inheritance hierarchies.

### Python (10 issues)

| Issue | Catchable | Test Type | Bug Category | Service Area |
|---|---|---|---|---|
| [#40873](https://github.com/Azure/azure-sdk-for-python/issues/40873) | ✅ yes | unit_test | api_surface | storage |
| [#40604](https://github.com/Azure/azure-sdk-for-python/issues/40604) | ✅ yes | unit_test | api_surface | search |
| [#39744](https://github.com/Azure/azure-sdk-for-python/issues/39744) | ✅ yes | unit_test | type_error | ai_ml |
| [#39238](https://github.com/Azure/azure-sdk-for-python/issues/39238) | ✅ yes | unit_test | type_error | ai_ml |
| [#23264](https://github.com/Azure/azure-sdk-for-python/issues/23264) | ✅ yes | unit_test | type_error | storage |
| [#23006](https://github.com/Azure/azure-sdk-for-python/issues/23006) | ✅ yes | serialization_test | api_surface | cosmos |
| [#20247](https://github.com/Azure/azure-sdk-for-python/issues/20247) | ✅ yes | serialization_test | type_error | other |
| [#16931](https://github.com/Azure/azure-sdk-for-python/issues/16931) | ✅ yes | integration_test | api_surface | ai_ml |
| [#3589](https://github.com/Azure/azure-sdk-for-python/issues/3589) | ✅ yes | unit_test | type_error | arm_mgmt |
| [#786](https://github.com/Azure/azure-sdk-for-python/issues/786) | ✅ yes | unit_test | type_error | arm_mgmt |

### Java (1 issues)

| Issue | Catchable | Test Type | Bug Category | Service Area |
|---|---|---|---|---|
| [#16632](https://github.com/Azure/azure-sdk-for-java/issues/16632) | ✅ yes | edge_case_test | api_surface | keyvault |

### .NET (9 issues)

| Issue | Catchable | Test Type | Bug Category | Service Area |
|---|---|---|---|---|
| [#53862](https://github.com/Azure/azure-sdk-for-net/issues/53862) | ✅ yes | unit_test | type_error | other |
| [#47205](https://github.com/Azure/azure-sdk-for-net/issues/47205) | ✅ yes | edge_case_test | api_surface | service_bus |
| [#29336](https://github.com/Azure/azure-sdk-for-net/issues/29336) | ✅ yes | integration_test | api_surface | arm_mgmt |
| [#26226](https://github.com/Azure/azure-sdk-for-net/issues/26226) | ✅ yes | integration_test | api_surface | arm_mgmt |
| [#26140](https://github.com/Azure/azure-sdk-for-net/issues/26140) | ✅ yes | integration_test | api_surface | storage |
| [#24515](https://github.com/Azure/azure-sdk-for-net/issues/24515) | ✅ yes | unit_test | api_surface | ai_ml |
| [#18414](https://github.com/Azure/azure-sdk-for-net/issues/18414) | ✅ yes | unit_test | api_surface | other |
| [#18413](https://github.com/Azure/azure-sdk-for-net/issues/18413) | ✅ yes | serialization_test | memory_lifecycle | other |
| [#10263](https://github.com/Azure/azure-sdk-for-net/issues/10263) | ✅ yes | unit_test | api_surface | arm_mgmt |

### JS (8 issues)

| Issue | Catchable | Test Type | Bug Category | Service Area |
|---|---|---|---|---|
| [#28312](https://github.com/Azure/azure-sdk-for-js/issues/28312) | ✅ yes | serialization_test | api_surface | openai |
| [#27942](https://github.com/Azure/azure-sdk-for-js/issues/27942) | ✅ yes | unit_test | type_error | search |
| [#26754](https://github.com/Azure/azure-sdk-for-js/issues/26754) | ✅ yes | unit_test | type_error | monitor |
| [#24810](https://github.com/Azure/azure-sdk-for-js/issues/24810) | ✅ yes | unit_test | type_error | storage |
| [#24578](https://github.com/Azure/azure-sdk-for-js/issues/24578) | ✅ yes | unit_test | type_error | communication |
| [#20545](https://github.com/Azure/azure-sdk-for-js/issues/20545) | ✅ yes | unit_test | type_error | service_bus |
| [#14345](https://github.com/Azure/azure-sdk-for-js/issues/14345) | ✅ yes | unit_test | serialization | event_hubs |
| [#13540](https://github.com/Azure/azure-sdk-for-js/issues/13540) | ⚠️ partially | unit_test | type_error | storage |

### Go (2 issues)

| Issue | Catchable | Test Type | Bug Category | Service Area |
|---|---|---|---|---|
| [#14311](https://github.com/Azure/azure-sdk-for-go/issues/14311) | ✅ yes | serialization_test | api_surface | arm_mgmt |
| [#2293](https://github.com/Azure/azure-sdk-for-go/issues/2293) | ✅ yes | unit_test | type_error | core |

---

## Other / Miscellaneous Gaps

**42 issues (2.9%)**

Bugs that don't fit neatly into the above categories, or are inherently difficult to test (production-only race conditions, environment-specific issues).

### Python (15 issues)

| Issue | Catchable | Test Type | Bug Category | Service Area |
|---|---|---|---|---|
| [#43234](https://github.com/Azure/azure-sdk-for-python/issues/43234) | ❌ no | other | other | ai_ml |
| [#39753](https://github.com/Azure/azure-sdk-for-python/issues/39753) | ✅ yes | unit_test | error_handling | ai_ml |
| [#39460](https://github.com/Azure/azure-sdk-for-python/issues/39460) | ✅ yes | unit_test | type_error | arm_mgmt |
| [#38591](https://github.com/Azure/azure-sdk-for-python/issues/38591) | ❌ no | integration_test | error_handling | search |
| [#27058](https://github.com/Azure/azure-sdk-for-python/issues/27058) | ❌ no | e2e_test | other | ai_ml |
| [#25861](https://github.com/Azure/azure-sdk-for-python/issues/25861) | ❌ no | e2e_test | other | ai_ml |
| [#25477](https://github.com/Azure/azure-sdk-for-python/issues/25477) | ✅ yes | unit_test | error_handling | storage |
| [#25405](https://github.com/Azure/azure-sdk-for-python/issues/25405) | ❌ no | e2e_test | other | cosmos |
| [#25092](https://github.com/Azure/azure-sdk-for-python/issues/25092) | ❌ no | e2e_test | other | other |
| [#22670](https://github.com/Azure/azure-sdk-for-python/issues/22670) | ❌ no | unit_test | other | search |
| [#21665](https://github.com/Azure/azure-sdk-for-python/issues/21665) | ❌ no | unit_test | other | arm_mgmt |
| [#20452](https://github.com/Azure/azure-sdk-for-python/issues/20452) | ❌ no | unit_test | error_handling | arm_mgmt |
| [#20336](https://github.com/Azure/azure-sdk-for-python/issues/20336) | ❌ no | e2e_test | error_handling | other |
| [#19822](https://github.com/Azure/azure-sdk-for-python/issues/19822) | ❌ no | unit_test | other | ai_ml |
| [#17961](https://github.com/Azure/azure-sdk-for-python/issues/17961) | ❌ no | other | error_handling | storage |

### Java (6 issues)

| Issue | Catchable | Test Type | Bug Category | Service Area |
|---|---|---|---|---|
| [#47688](https://github.com/Azure/azure-sdk-for-java/issues/47688) | ❌ no | e2e_test | api_surface | communication |
| [#47261](https://github.com/Azure/azure-sdk-for-java/issues/47261) | ❌ no | perf_test | memory_lifecycle | service_bus |
| [#46804](https://github.com/Azure/azure-sdk-for-java/issues/46804) | ❌ no | perf_test | memory_lifecycle | core |
| [#14480](https://github.com/Azure/azure-sdk-for-java/issues/14480) | ❌ no | e2e_test | other | arm_mgmt |
| [#13804](https://github.com/Azure/azure-sdk-for-java/issues/13804) | ❌ no | integration_test | type_error | cosmos |
| [#7108](https://github.com/Azure/azure-sdk-for-java/issues/7108) | ❌ no | integration_test | memory_lifecycle | event_hubs |

### .NET (5 issues)

| Issue | Catchable | Test Type | Bug Category | Service Area |
|---|---|---|---|---|
| [#32515](https://github.com/Azure/azure-sdk-for-net/issues/32515) | ❌ no | unit_test | api_surface | other |
| [#22594](https://github.com/Azure/azure-sdk-for-net/issues/22594) | ❌ no | unit_test | other | service_bus |
| [#21584](https://github.com/Azure/azure-sdk-for-net/issues/21584) | ❌ no | e2e_test | other | core |
| [#19554](https://github.com/Azure/azure-sdk-for-net/issues/19554) | ✅ yes | unit_test | type_error | service_bus |
| [#18720](https://github.com/Azure/azure-sdk-for-net/issues/18720) | ❌ no | regression_test | other | storage |

### JS (9 issues)

| Issue | Catchable | Test Type | Bug Category | Service Area |
|---|---|---|---|---|
| [#26474](https://github.com/Azure/azure-sdk-for-js/issues/26474) | ❌ no | e2e_test | error_handling | communication |
| [#22761](https://github.com/Azure/azure-sdk-for-js/issues/22761) | ✅ yes | unit_test | type_error | storage |
| [#20275](https://github.com/Azure/azure-sdk-for-js/issues/20275) | ✅ yes | unit_test | api_surface | core |
| [#13063](https://github.com/Azure/azure-sdk-for-js/issues/13063) | ✅ yes | regression_test | api_surface | service_bus |
| [#11798](https://github.com/Azure/azure-sdk-for-js/issues/11798) | ✅ yes | unit_test | other | core |
| [#9888](https://github.com/Azure/azure-sdk-for-js/issues/9888) | ❌ no | unit_test | other | other |
| [#6297](https://github.com/Azure/azure-sdk-for-js/issues/6297) | ❌ no | integration_test | other | core |
| [#2385](https://github.com/Azure/azure-sdk-for-js/issues/2385) | ✅ yes | unit_test | other | service_bus |
| [#1815](https://github.com/Azure/azure-sdk-for-js/issues/1815) | ✅ yes | regression_test | other | service_bus |

### Go (7 issues)

| Issue | Catchable | Test Type | Bug Category | Service Area |
|---|---|---|---|---|
| [#18767](https://github.com/Azure/azure-sdk-for-go/issues/18767) | ❌ no | unit_test | error_handling | storage |
| [#17423](https://github.com/Azure/azure-sdk-for-go/issues/17423) | ❌ no | unit_test | api_surface | storage |
| [#16920](https://github.com/Azure/azure-sdk-for-go/issues/16920) | ❌ no | unit_test | error_handling | storage |
| [#16856](https://github.com/Azure/azure-sdk-for-go/issues/16856) | ❌ no | unit_test | type_error | keyvault |
| [#16800](https://github.com/Azure/azure-sdk-for-go/issues/16800) | ❌ no | unit_test | api_surface | storage |
| [#16116](https://github.com/Azure/azure-sdk-for-go/issues/16116) | ❌ no | unit_test | api_surface | identity |
| [#15876](https://github.com/Azure/azure-sdk-for-go/issues/15876) | ❌ no | unit_test | api_surface | identity |

---

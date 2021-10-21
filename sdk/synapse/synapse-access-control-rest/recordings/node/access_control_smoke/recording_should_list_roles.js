let nock = require('nock');

module.exports.hash = "64070ff21de37f164ae9470d25d2c7c2";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/common/discovery/instance')
  .query(true)
  .reply(200, {"tenant_discovery_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/v2.0/.well-known/openid-configuration","api-version":"1.1","metadata":[{"preferred_network":"login.microsoftonline.com","preferred_cache":"login.windows.net","aliases":["login.microsoftonline.com","login.windows.net","login.microsoft.com","sts.windows.net"]},{"preferred_network":"login.partner.microsoftonline.cn","preferred_cache":"login.partner.microsoftonline.cn","aliases":["login.partner.microsoftonline.cn","login.chinacloudapi.cn"]},{"preferred_network":"login.microsoftonline.de","preferred_cache":"login.microsoftonline.de","aliases":["login.microsoftonline.de"]},{"preferred_network":"login.microsoftonline.us","preferred_cache":"login.microsoftonline.us","aliases":["login.microsoftonline.us","login.usgovcloudapi.net"]},{"preferred_network":"login-us.microsoftonline.com","preferred_cache":"login-us.microsoftonline.com","aliases":["login-us.microsoftonline.com"]}]}, [
  'Cache-Control',
  'max-age=86400, private',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Methods',
  'GET, OPTIONS',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'x-ms-request-id',
  'ac8d0c0f-789c-4cb5-ad80-0ec8e07f1800',
  'x-ms-ests-server',
  '2.1.12158.6 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=Ap9x6E7q8S9ChQzrH1V8bJM; expires=Sat, 20-Nov-2021 22:55:04 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr0UnUpQh5kfj43Hrvs-gaedCZeOnK5nFCsmjNlKOm-JcAA3tpGrrzqytaX9l-fkGwaf6xpnKONYwHcIdX0oh5W801ewa7mXGNI8GizdXqLWhWciZvdmxhPhcGSkmmb5-1FDG8xcqtyMHAw1AmvYBAheJeQ1iiRsMsbQ1dEH8v70IgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 21 Oct 2021 22:55:04 GMT',
  'Content-Length',
  '980'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/88888888-8888-8888-8888-888888888888/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"kerberos_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/kerberos","tenant_region_scope":"WW","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
  'Cache-Control',
  'max-age=86400, private',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Methods',
  'GET, OPTIONS',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'x-ms-request-id',
  '466734fa-1d85-45f1-884c-d01055ac4501',
  'x-ms-ests-server',
  '2.1.12158.6 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AlIdFvzpngtDnnUAdXCpuQc; expires=Sat, 20-Nov-2021 22:55:04 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrEdDX7YEj2OkLteDETmbm_gtJHz3lLBZWfCCnIR1Ph4AuQr6Xyety9bknvp9neJhRunbESr0NtIXmPx6eorEwayISVyQ66_mhq9krzrvFebk5yCgGXAbTNuNfk2aRzH03j-IcmbcP5ev0-4Dx-pUSv6iisX27exskr3oF-xAXOoYgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 21 Oct 2021 22:55:04 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.2&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=a9e31045-4a52-4029-bd3c-848f3adf851b&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'x-ms-request-id',
  'e8379047-0bfc-4edd-a17b-993640632801',
  'x-ms-ests-server',
  '2.1.12158.6 - NCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AhX9BwX4ce5AukquXRCNz0JZqlpPAQAAAMjmA9kOAAAA; expires=Sat, 20-Nov-2021 22:55:05 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 21 Oct 2021 22:55:05 GMT',
  'Content-Length',
  '1322'
]);

nock('https://testaccount.dev.azuresynapse.net', {"encodedQueryParams":true})
  .get('/roleDefinitions')
  .query(true)
  .reply(200, [{"name":"Synapse Administrator","description":"Full Synapse access to serverless SQL pools, Apache Spark pools and Integration runtimes.  Includes create, read, update and delete access to all published code artifacts.  Includes Compute Operator, Linked Data Manager, and Credential User permissions on the workspace system identity credential.  Includes granting access.  Azure permissions are required to create, delete, or manage compute resources.​","id":"6e4bf58a-b8e1-4cc3-bbf9-d73143322b78","isBuiltIn":true,"permissions":[{"actions":[],"notActions":[],"dataActions":["Microsoft.Synapse/workspaces/read","Microsoft.Synapse/workspaces/roleAssignments/write","Microsoft.Synapse/workspaces/roleAssignments/delete","Microsoft.Synapse/workspaces/managedPrivateEndpoints/write","Microsoft.Synapse/workspaces/managedPrivateEndpoints/delete","Microsoft.Synapse/workspaces/bigDataPools/useCompute/action","Microsoft.Synapse/workspaces/bigDataPools/viewLogs/action","Microsoft.Synapse/workspaces/scopePools/useCompute/action","Microsoft.Synapse/workspaces/scopePools/viewLogs/action","Microsoft.Synapse/workspaces/integrationRuntimes/useCompute/action","Microsoft.Synapse/workspaces/integrationRuntimes/viewLogs/action","Microsoft.Synapse/workspaces/artifacts/read","Microsoft.Synapse/workspaces/notebooks/write","Microsoft.Synapse/workspaces/sparkJobDefinitions/write","Microsoft.Synapse/workspaces/scopeJobDefinitions/write","Microsoft.Synapse/workspaces/sqlScripts/write","Microsoft.Synapse/workspaces/dataFlows/write","Microsoft.Synapse/workspaces/pipelines/write","Microsoft.Synapse/workspaces/triggers/write","Microsoft.Synapse/workspaces/datasets/write","Microsoft.Synapse/workspaces/linkedServices/write","Microsoft.Synapse/workspaces/credentials/write","Microsoft.Synapse/workspaces/notebooks/delete","Microsoft.Synapse/workspaces/sparkJobDefinitions/delete","Microsoft.Synapse/workspaces/scopeJobDefinitions/delete","Microsoft.Synapse/workspaces/sqlScripts/delete","Microsoft.Synapse/workspaces/dataFlows/delete","Microsoft.Synapse/workspaces/pipelines/delete","Microsoft.Synapse/workspaces/triggers/delete","Microsoft.Synapse/workspaces/datasets/delete","Microsoft.Synapse/workspaces/linkedServices/delete","Microsoft.Synapse/workspaces/credentials/delete","Microsoft.Synapse/workspaces/cancelPipelineRun/action","Microsoft.Synapse/workspaces/notebooks/viewOutputs/action","Microsoft.Synapse/workspaces/pipelines/viewOutputs/action","Microsoft.Synapse/workspaces/linkedServices/useSecret/action","Microsoft.Synapse/workspaces/credentials/useSecret/action","Microsoft.Synapse/workspaces/libraries/delete","Microsoft.Synapse/workspaces/libraries/write","Microsoft.Synapse/workspaces/kqlScripts/write","Microsoft.Synapse/workspaces/kqlScripts/delete","Microsoft.Synapse/workspaces/sparkConfigurations/write","Microsoft.Synapse/workspaces/sparkConfigurations/delete","Microsoft.Synapse/workspaces/linkConnections/read","Microsoft.Synapse/workspaces/linkConnections/write","Microsoft.Synapse/workspaces/linkConnections/delete","Microsoft.Synapse/workspaces/linkConnections/useCompute/action"],"notDataActions":[]}],"scopes":["workspaces/{workspaceName}","workspaces/{workspaceName}/bigDataPools/{bigDataPoolName}","workspaces/{workspaceName}/scopePools/{scopePoolName}","workspaces/{workspaceName}/integrationRuntimes/{integrationRuntimeName}","workspaces/{workspaceName}/linkedServices/{linkedServiceName}","workspaces/{workspaceName}/credentials/{credentialName}"],"availabilityStatus":"Available"},{"name":"Synapse Linked Data Manager","description":"Creation and management of managed private endpoints, linked services, and credentials.​","id":"dd665582-e433-40ca-b183-1b1b33e73375","isBuiltIn":true,"permissions":[{"actions":[],"notActions":[],"dataActions":["Microsoft.Synapse/workspaces/read","Microsoft.Synapse/workspaces/managedPrivateEndpoints/write","Microsoft.Synapse/workspaces/managedPrivateEndpoints/delete","Microsoft.Synapse/workspaces/linkedServices/write","Microsoft.Synapse/workspaces/credentials/write","Microsoft.Synapse/workspaces/linkedServices/delete","Microsoft.Synapse/workspaces/credentials/delete"],"notDataActions":[]}],"scopes":["workspaces/{workspaceName}"],"availabilityStatus":"Available"},{"name":"Synapse Contributor","description":"Full Synapse access to serverless SQL pools, Apache Spark pools, Integration runtimes.  Includes create, read, update, and delete access to all published code artifacts and their outputs, including credentials and linked services.  Includes compute operator permissions. Does not include permission to use credentials and run pipelines. Does not include granting access.​","id":"7572bffe-f453-4b66-912a-46cc5ef38fda","isBuiltIn":true,"permissions":[{"actions":[],"notActions":[],"dataActions":["Microsoft.Synapse/workspaces/read","Microsoft.Synapse/workspaces/bigDataPools/useCompute/action","Microsoft.Synapse/workspaces/bigDataPools/viewLogs/action","Microsoft.Synapse/workspaces/scopePools/useCompute/action","Microsoft.Synapse/workspaces/scopePools/viewLogs/action","Microsoft.Synapse/workspaces/integrationRuntimes/useCompute/action","Microsoft.Synapse/workspaces/integrationRuntimes/viewLogs/action","Microsoft.Synapse/workspaces/artifacts/read","Microsoft.Synapse/workspaces/notebooks/write","Microsoft.Synapse/workspaces/sparkJobDefinitions/write","Microsoft.Synapse/workspaces/sqlScripts/write","Microsoft.Synapse/workspaces/dataFlows/write","Microsoft.Synapse/workspaces/pipelines/write","Microsoft.Synapse/workspaces/triggers/write","Microsoft.Synapse/workspaces/datasets/write","Microsoft.Synapse/workspaces/linkedServices/write","Microsoft.Synapse/workspaces/credentials/write","Microsoft.Synapse/workspaces/notebooks/delete","Microsoft.Synapse/workspaces/sparkJobDefinitions/delete","Microsoft.Synapse/workspaces/sqlScripts/delete","Microsoft.Synapse/workspaces/dataFlows/delete","Microsoft.Synapse/workspaces/pipelines/delete","Microsoft.Synapse/workspaces/triggers/delete","Microsoft.Synapse/workspaces/datasets/delete","Microsoft.Synapse/workspaces/linkedServices/delete","Microsoft.Synapse/workspaces/credentials/delete","Microsoft.Synapse/workspaces/cancelPipelineRun/action","Microsoft.Synapse/workspaces/notebooks/viewOutputs/action","Microsoft.Synapse/workspaces/pipelines/viewOutputs/action","Microsoft.Synapse/workspaces/libraries/delete","Microsoft.Synapse/workspaces/libraries/write","Microsoft.Synapse/workspaces/kqlScripts/write","Microsoft.Synapse/workspaces/kqlScripts/delete","Microsoft.Synapse/workspaces/sparkConfigurations/write","Microsoft.Synapse/workspaces/sparkConfigurations/delete","Microsoft.Synapse/workspaces/linkConnections/read","Microsoft.Synapse/workspaces/linkConnections/write","Microsoft.Synapse/workspaces/linkConnections/delete","Microsoft.Synapse/workspaces/linkConnections/useCompute/action"],"notDataActions":[]}],"scopes":["workspaces/{workspaceName}","workspaces/{workspaceName}/bigDataPools/{bigDataPoolName}","workspaces/{workspaceName}/scopePools/{scopePoolName}","workspaces/{workspaceName}/integrationRuntimes/{integrationRuntimeName}"],"availabilityStatus":"Available"},{"name":"Synapse Artifact Publisher","description":"Create, read, update, and delete access to published code artifacts and their outputs. Does not include permission to run code or pipelines, or to grant access. ​","id":"05930f57-09a3-4c0d-9fa9-6d1eb91c178b","isBuiltIn":true,"permissions":[{"actions":[],"notActions":[],"dataActions":["Microsoft.Synapse/workspaces/read","Microsoft.Synapse/workspaces/artifacts/read","Microsoft.Synapse/workspaces/notebooks/write","Microsoft.Synapse/workspaces/sparkJobDefinitions/write","Microsoft.Synapse/workspaces/scopeJobDefinitions/write","Microsoft.Synapse/workspaces/sqlScripts/write","Microsoft.Synapse/workspaces/dataFlows/write","Microsoft.Synapse/workspaces/pipelines/write","Microsoft.Synapse/workspaces/triggers/write","Microsoft.Synapse/workspaces/datasets/write","Microsoft.Synapse/workspaces/linkedServices/write","Microsoft.Synapse/workspaces/credentials/write","Microsoft.Synapse/workspaces/notebooks/delete","Microsoft.Synapse/workspaces/sparkJobDefinitions/delete","Microsoft.Synapse/workspaces/scopeJobDefinitions/delete","Microsoft.Synapse/workspaces/sqlScripts/delete","Microsoft.Synapse/workspaces/dataFlows/delete","Microsoft.Synapse/workspaces/pipelines/delete","Microsoft.Synapse/workspaces/triggers/delete","Microsoft.Synapse/workspaces/datasets/delete","Microsoft.Synapse/workspaces/linkedServices/delete","Microsoft.Synapse/workspaces/credentials/delete","Microsoft.Synapse/workspaces/notebooks/viewOutputs/action","Microsoft.Synapse/workspaces/pipelines/viewOutputs/action","Microsoft.Synapse/workspaces/libraries/delete","Microsoft.Synapse/workspaces/libraries/write","Microsoft.Synapse/workspaces/kqlScripts/write","Microsoft.Synapse/workspaces/kqlScripts/delete","Microsoft.Synapse/workspaces/sparkConfigurations/write","Microsoft.Synapse/workspaces/sparkConfigurations/delete"],"notDataActions":[]}],"scopes":["workspaces/{workspaceName}"],"availabilityStatus":"Available"},{"name":"Synapse Artifact User","description":"Read access to published code artifacts and their outputs. Can create new artifacts but cannot publish changes or run code without additional permissions.​","id":"53faaa0e-40b6-40c8-a2ff-e38f2d388875","isBuiltIn":true,"permissions":[{"actions":[],"notActions":[],"dataActions":["Microsoft.Synapse/workspaces/read","Microsoft.Synapse/workspaces/artifacts/read","Microsoft.Synapse/workspaces/notebooks/viewOutputs/action","Microsoft.Synapse/workspaces/pipelines/viewOutputs/action"],"notDataActions":[]}],"scopes":["workspaces/{workspaceName}"],"availabilityStatus":"Available"},{"name":"Synapse Compute Operator","description":"Submit Spark jobs and notebooks and view logs.  Includes canceling Spark jobs submitted by any user. Requires additional credential use permissions on the workspace system identity to run pipelines, view pipeline runs and outputs.​","id":"e3844cc7-4670-42cb-9349-9bdac1ee7881","isBuiltIn":true,"permissions":[{"actions":[],"notActions":[],"dataActions":["Microsoft.Synapse/workspaces/read","Microsoft.Synapse/workspaces/bigDataPools/useCompute/action","Microsoft.Synapse/workspaces/bigDataPools/viewLogs/action","Microsoft.Synapse/workspaces/scopePools/useCompute/action","Microsoft.Synapse/workspaces/scopePools/viewLogs/action","Microsoft.Synapse/workspaces/integrationRuntimes/useCompute/action","Microsoft.Synapse/workspaces/integrationRuntimes/viewLogs/action","Microsoft.Synapse/workspaces/cancelPipelineRun/action","Microsoft.Synapse/workspaces/linkConnections/read","Microsoft.Synapse/workspaces/linkConnections/useCompute/action"],"notDataActions":[]}],"scopes":["workspaces/{workspaceName}","workspaces/{workspaceName}/bigDataPools/{bigDataPoolName}","workspaces/{workspaceName}/scopePools/{scopePoolName}","workspaces/{workspaceName}/integrationRuntimes/{integrationRuntimeName}"],"availabilityStatus":"Available"},{"name":"Synapse Credential User","description":"Runtime and configuration-time use of secrets within credentials and linked services in activities like pipeline runs. To run pipelines, this role is required, scoped to the workspace system identity.​","id":"5eb298b4-692c-4241-9cf0-f58a3b42bb25","isBuiltIn":true,"permissions":[{"actions":[],"notActions":[],"dataActions":["Microsoft.Synapse/workspaces/read","Microsoft.Synapse/workspaces/linkedServices/useSecret/action","Microsoft.Synapse/workspaces/credentials/useSecret/action"],"notDataActions":[]}],"scopes":["workspaces/{workspaceName}","workspaces/{workspaceName}/linkedServices/{linkedServiceName}","workspaces/{workspaceName}/credentials/{credentialName}"],"availabilityStatus":"Available"},{"name":"Synapse User","description":"List and view details of SQL pools, Apache Spark pools, Integration runtimes, and published linked services and credentials.  Does not include other published code artifacts.  Can create new artifacts but cannot run or publish without additional permissions.   ​","id":"2a385764-43e8-416c-9825-7b18d05a2c4b","isBuiltIn":true,"permissions":[{"actions":[],"notActions":[],"dataActions":["Microsoft.Synapse/workspaces/read"],"notDataActions":[]}],"scopes":["workspaces/{workspaceName}","workspaces/{workspaceName}/bigDataPools/{bigDataPoolName}","workspaces/{workspaceName}/scopePools/{scopePoolName}","workspaces/{workspaceName}/integrationRuntimes/{integrationRuntimeName}","workspaces/{workspaceName}/linkedServices/{linkedServiceName}","workspaces/{workspaceName}/credentials/{credentialName}"],"availabilityStatus":"Available"},{"name":"Apache Spark Administrator","description":"Full Synapse access to Apache Spark Pools.  Create, read, update, and delete access to published Spark job definitions, notebooks, and their outputs, and to libraries, linked services and credentials.  Includes read access to all other published code artifacts. Does not include permission to use credentials and run pipelines. Does not include granting access.​","id":"c3a6d2f1-a26f-4810-9b0f-591308d5cbf1","isBuiltIn":true,"permissions":[{"actions":[],"notActions":[],"dataActions":["Microsoft.Synapse/workspaces/read","Microsoft.Synapse/workspaces/bigDataPools/useCompute/action","Microsoft.Synapse/workspaces/bigDataPools/viewLogs/action","Microsoft.Synapse/workspaces/artifacts/read","Microsoft.Synapse/workspaces/notebooks/write","Microsoft.Synapse/workspaces/sparkJobDefinitions/write","Microsoft.Synapse/workspaces/linkedServices/write","Microsoft.Synapse/workspaces/credentials/write","Microsoft.Synapse/workspaces/notebooks/delete","Microsoft.Synapse/workspaces/sparkJobDefinitions/delete","Microsoft.Synapse/workspaces/linkedServices/delete","Microsoft.Synapse/workspaces/credentials/delete","Microsoft.Synapse/workspaces/libraries/delete","Microsoft.Synapse/workspaces/libraries/write","Microsoft.Synapse/workspaces/notebooks/viewOutputs/action"],"notDataActions":[]}],"scopes":["workspaces/{workspaceName}"],"availabilityStatus":"Available"},{"name":"Synapse SQL Administrator","description":"Full Synapse access to serverless SQL pools.  Create, read, update, and delete access to published SQL scripts, credentials and linked services.  Includes read access to all other published code artifacts.  Does not include permission to use credentials and run pipelines. Does not include granting access.","id":"7af0c69a-a548-47d6-aea3-d00e69bd83aa","isBuiltIn":true,"permissions":[{"actions":[],"notActions":[],"dataActions":["Microsoft.Synapse/workspaces/read","Microsoft.Synapse/workspaces/artifacts/read","Microsoft.Synapse/workspaces/sqlScripts/write","Microsoft.Synapse/workspaces/linkedServices/write","Microsoft.Synapse/workspaces/credentials/write","Microsoft.Synapse/workspaces/sqlScripts/delete","Microsoft.Synapse/workspaces/linkedServices/delete","Microsoft.Synapse/workspaces/credentials/delete"],"notDataActions":[]}],"scopes":["workspaces/{workspaceName}"],"availabilityStatus":"Available"}], [
  'Content-Length',
  '14974',
  'Content-Type',
  'application/json; charset=utf-8',
  'Server',
  'Microsoft-HTTPAPI/2.0 Microsoft-HTTPAPI/2.0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'ce6e5fbb-6e2d-4aea-8c9b-27ad2322c755',
  'x-ms-request-id',
  'ce6e5fbb-6e2d-4aea-8c9b-27ad2322c755',
  'Date',
  'Thu, 21 Oct 2021 22:55:04 GMT'
]);

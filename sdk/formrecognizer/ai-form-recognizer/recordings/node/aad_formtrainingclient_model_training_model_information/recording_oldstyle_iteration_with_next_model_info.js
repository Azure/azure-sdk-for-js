let nock = require('nock');

module.exports.hash = "0b380ec49ea2252e1bfbaa30e93be775";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/common/discovery/instance')
  .query(true)
  .reply(200, {"tenant_discovery_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/v2.0/.well-known/openid-configuration","api-version":"1.1","metadata":[{"preferred_network":"login.microsoftonline.com","preferred_cache":"login.windows.net","aliases":["login.microsoftonline.com","login.windows.net","login.microsoft.com","sts.windows.net"]},{"preferred_network":"login.partner.microsoftonline.cn","preferred_cache":"login.partner.microsoftonline.cn","aliases":["login.partner.microsoftonline.cn","login.chinacloudapi.cn"]},{"preferred_network":"login.microsoftonline.de","preferred_cache":"login.microsoftonline.de","aliases":["login.microsoftonline.de"]},{"preferred_network":"login.microsoftonline.us","preferred_cache":"login.microsoftonline.us","aliases":["login.microsoftonline.us","login.usgovcloudapi.net"]},{"preferred_network":"login-us.microsoftonline.com","preferred_cache":"login-us.microsoftonline.com","aliases":["login-us.microsoftonline.com"]}]}, [
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
  'efe14120-1a03-4eb7-b581-4a405ff10801',
  'x-ms-ests-server',
  '2.1.11654.16 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AgRLK_yyL-BMiLhMpVRBz8rGLH8mCwAAAFyuG9gOAAAA; expires=Fri, 28-May-2021 19:32:19 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrJ2b5faPD9IOENtg0CH5zJMgH4WvpRRNbdHfVSm9mzU3u-qLBDxaemOZNqJRebS1yt_F5U-Bz41GYA7HGTrJojXGZ--CS-qc2quz655mrdfVawBjF-CCwnHrgsTeV4by1HFFc3hwykdR2TRpj1E0-xwKxieIdDgK3FgpPFIf0y1ggAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 19:32:18 GMT',
  'Content-Length',
  '980'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/12345678-1234-1234-1234-123456789012/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"tenant_region_scope":"WW","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
  'Cache-Control',
  'max-age=86400, private',
  'Content-Length',
  '1651',
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
  'fc9ed9eb-c584-48ca-96c5-463193cd4b01',
  'x-ms-ests-server',
  '2.1.11654.16 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AgRLK_yyL-BMiLhMpVRBz8rGLH8mCwAAAFyuG9gOAAAA; expires=Fri, 28-May-2021 19:32:19 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrlnoXr7_y_BSJF-XNpADl5ai8vRCc3PXNkIN63SwNfTAdcY8_pC_hAH-PV853EzVzyrvIgX1XDGpAzBthelB42WtsP-5ghAg_nSBTQsqTDixMoh45-2fh704IkbmEG9jPnr2fu_sfCYhO3oUxl2EOK_ju1ClhSZqA6hOMcrk8bAAgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 19:32:18 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .filteringRequestBody(function (body) {
            return body.replace(/client-request-id=[^&]*/g, "client-request-id=client-request-id");
        })
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default%20openid%20profile%20offline_access&grant_type=client_credentials&client-request-id=client-request-id&client_secret=azure_client_secret")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '1331',
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
  '06eddcf6-9993-42fc-8c86-b63e615bb100',
  'x-ms-ests-server',
  '2.1.11654.16 - WUS2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AgRLK_yyL-BMiLhMpVRBz8rGLH8mCwAAAFyuG9gOAAAA; expires=Fri, 28-May-2021 19:32:19 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 19:32:18 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.3/custom/models')
  .query(true)
  .reply(200, {"modelList":[{"modelId":"05a880fb-241b-409e-bb3d-663b1dbce623","modelName":"composedModelName161963562950007869","attributes":{"isComposed":true},"status":"ready","createdDateTime":"2021-04-28T18:47:09Z","lastUpdatedDateTime":"2021-04-28T18:47:10Z"},{"modelId":"10250a8a-179e-4d0f-b1fc-44b9f71fbac4","modelName":"modelName161963815423509947","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2021-04-28T19:29:14Z","lastUpdatedDateTime":"2021-04-28T19:29:18Z"},{"modelId":"17bc4272-ce74-4dcc-aea6-5f1795787215","modelName":"supplies","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2021-04-06T19:23:01Z","lastUpdatedDateTime":"2021-04-06T19:23:14Z"},{"modelId":"24be0483-f15a-4e71-9722-e9838470351e","modelName":"supplies","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2021-04-06T19:47:17Z","lastUpdatedDateTime":"2021-04-06T19:47:24Z"},{"modelId":"2d1142ee-bf6d-4f52-8517-469ebef3d4ef","modelName":"input2","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2021-04-28T18:50:42Z","lastUpdatedDateTime":"2021-04-28T18:50:49Z"},{"modelId":"374d443e-5014-433f-94de-b5dd498c734e","modelName":"input2","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2021-04-28T19:28:30Z","lastUpdatedDateTime":"2021-04-28T19:28:34Z"},{"modelId":"3759cbc9-d420-48c2-94f0-8c164a2e4f1e","modelName":"copyModelName161963812698900068","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2021-04-28T19:28:47Z","lastUpdatedDateTime":"2021-04-28T19:28:50Z"},{"modelId":"39477d13-3e99-49c4-a611-d75702b95e83","modelName":"composedModelName161963812132706942","attributes":{"isComposed":true},"status":"ready","createdDateTime":"2021-04-28T19:28:41Z","lastUpdatedDateTime":"2021-04-28T19:28:42Z"},{"modelId":"3d884bdf-e466-4290-8538-0d137c7a43c1","modelName":"input1","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2021-04-28T18:50:42Z","lastUpdatedDateTime":"2021-04-28T18:50:46Z"},{"modelId":"59e4a275-adca-467d-8df6-a9acbe78c8be","modelName":"copyModelName161963585858208044","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2021-04-28T18:50:58Z","lastUpdatedDateTime":"2021-04-28T18:51:02Z"},{"modelId":"6d97d70d-f8c1-428d-8fc1-ac63fbcadf10","modelName":"input1","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2021-04-28T19:28:30Z","lastUpdatedDateTime":"2021-04-28T19:28:37Z"},{"modelId":"7460a8f3-0aa5-4d41-b23c-62ac86b91b38","modelName":"purchase_order","attributes":{"isComposed":true},"status":"ready","createdDateTime":"2021-04-06T19:47:33Z","lastUpdatedDateTime":"2021-04-06T19:47:33Z"},{"modelId":"74788239-3b46-4e9f-9690-0898da82d97e","modelName":"input2","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2021-04-28T18:46:58Z","lastUpdatedDateTime":"2021-04-28T18:47:02Z"},{"modelId":"7ce7d230-5685-4bc4-b8af-2d387d391ce4","modelName":"cleaningSupplies","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2021-04-06T19:47:17Z","lastUpdatedDateTime":"2021-04-06T19:47:29Z"},{"modelId":"7ef1cacc-2b05-462a-882b-125641ece3bb","modelName":"modelName161963826335906169","status":"ready","createdDateTime":"2021-04-28T19:31:03Z","lastUpdatedDateTime":"2021-04-28T19:31:22Z"},{"modelId":"848924b3-c59f-46aa-99f5-b9dcc0224771","modelName":"input1","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2021-04-28T18:46:58Z","lastUpdatedDateTime":"2021-04-28T18:47:05Z"},{"modelId":"87800801-ef6f-42ed-8e77-6f8f9f72d733","modelName":"equipment","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2021-04-06T19:23:01Z","lastUpdatedDateTime":"2021-04-06T19:23:08Z"},{"modelId":"8b66a454-3a2f-4bef-85a9-c4f9e2e33b65","modelName":"modelName161963817146406404","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2021-04-28T19:29:31Z","lastUpdatedDateTime":"2021-04-28T19:29:35Z"},{"modelId":"8ee7765f-c281-4d53-bbc1-d43555353aca","modelName":"composedModelName161963585309908352","attributes":{"isComposed":true},"status":"ready","createdDateTime":"2021-04-28T18:50:53Z","lastUpdatedDateTime":"2021-04-28T18:50:53Z"},{"modelId":"93b0d0b7-fcb4-4fe1-86c3-c2761f097c6a","modelName":"customFormModelName161963609390107114","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2021-04-28T18:54:54Z","lastUpdatedDateTime":"2021-04-28T18:54:59Z"},{"modelId":"957a9fe3-d370-498e-8c69-60c73e153291","modelName":"furniture","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2021-04-06T19:23:01Z","lastUpdatedDateTime":"2021-04-06T19:23:11Z"},{"modelId":"959620e1-a98d-44eb-aaae-12cbdd11ed34","modelName":"copyModelName161963563520708074","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2021-04-28T18:47:15Z","lastUpdatedDateTime":"2021-04-28T18:47:19Z"},{"modelId":"966249d9-11ac-4b7d-9753-01f17b472df3","modelName":"copyModelName161963812698900068","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2021-04-28T19:28:47Z","lastUpdatedDateTime":"2021-04-28T19:28:50Z"},{"modelId":"a0ee42b7-83a8-4d6e-ba0b-30bf94363a1b","modelName":"copyModelName161963563520708074","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2021-04-28T18:47:15Z","lastUpdatedDateTime":"2021-04-28T18:47:19Z"},{"modelId":"a5628c42-3695-4d23-87f1-fded75f8760f","modelName":"cleaningSupplies","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2021-04-06T19:23:01Z","lastUpdatedDateTime":"2021-04-06T19:23:06Z"},{"modelId":"a93f4609-8c46-4784-9aaa-46289cf86ac6","modelName":"copyModelName161963585858208044","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2021-04-28T18:50:58Z","lastUpdatedDateTime":"2021-04-28T18:51:02Z"}],"nextLink":"https://endpoint/formrecognizer/v2.1-preview.3/custom/models?nextLink=2!212!MDAwMTEzIXN1YnNjcmlwdGlvbnMvNGE5OTc1MTJhYjI3NGEzMWE5NDBjZTZiNTAyYTczYTYvbW9kZWxzL2E5M2Y0NjA5LThjNDYtNDc4NC05YWFhLTQ2Mjg5Y2Y4NmFjNi9jb3B5QXV0aG9yaXphdGlvbi5qc29uITAwMDAyOCE5OTk5LTEyLTMxVDIzOjU5OjU5Ljk5OTk5OTlaIQ--"}, [
  'Content-Length',
  '6122',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '152',
  'apim-request-id',
  'd264920c-eb27-4d7b-a6ba-1190ad8fbf2c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 19:32:19 GMT'
]);

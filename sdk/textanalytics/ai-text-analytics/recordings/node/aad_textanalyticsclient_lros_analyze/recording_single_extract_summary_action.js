let nock = require('nock');

module.exports.hash = "a788ea793ca9ab6cfdd7b8b7eb1d2dfd";

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
  'd9ad8218-59ec-43b8-9237-fa87377fc100',
  'x-ms-ests-server',
  '2.1.12158.6 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AkQl-NrNmQ5GnyOWiaebq8A; expires=Mon, 22-Nov-2021 00:44:05 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr3b3D8fLWzfzil8qaX9jvbOHTA_M3exHnY0yMxVXaA3jNYoXD48WtCg6Yf1DlKSb77ZzsbozF7rI9CICNgPOgSazWzo27I0hBGT2NQw8zwYmbvOkTA6v0lKL_NrTpHFODWf_W07fmDH0lg9kCCB2pZ2xlNJpjb8623v6BTHFFP18gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 23 Oct 2021 00:44:05 GMT',
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
  '2b12dcad-3958-415b-bc54-51fda5e50500',
  'x-ms-ests-server',
  '2.1.12171.14 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AsPhRZaszYNLt1qHnBt648E; expires=Mon, 22-Nov-2021 00:44:05 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrSna5QcD6WsLoONE1wBv1UaecUFL5Hi8DqkVypn468FGNhMpkd7GJ2Tw3N3WE0V90Tb3SbCM96CbxaEJcFESNRHbX9eZPlAnHYDLy2cTqYOHcxXOxS2S1pXVdfM3LNuly63VQ8PvtOGCuGTf-pZs6DEmBR1j1VXGIaf7lBcLtUywgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 23 Oct 2021 00:44:05 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=a7ea6296-24ca-4a37-ae4d-80fa3462d228&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '4e12589e-050b-4fb3-8971-406989cb0500',
  'x-ms-ests-server',
  '2.1.12171.14 - SCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Aq132D3p4c1EnRmkBcKX-pA; expires=Mon, 22-Nov-2021 00:44:05 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 23 Oct 2021 00:44:05 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.2/analyze', {"analysisInput":{"documents":[{"id":"0","text":"\n          No roads or rails connect the 39,000 people dispersed across Nunavut, a territory in northeastern Canada that spans three time zones and features fjord-cut isles that stretch into the Arctic Circle off the west coast of Greenland. About 80% of the population is of Inuit descent with cultural ties to the land that date back more than 4,000 years.\n          \n          Today, low-bandwidth satellite internet service links the people of Nunavut to each other and with the rest of the world.\n                  \n          The Government of Nunavut relies on this internet link to provide healthcare, education, housing and family, and financial and other services to 25 communities. The smallest, Grise Fiord, has a population of 130; the largest, the capital, Iqaluit, has 8,500 people. About 3,100 people work full-time for the government, which has an office in each community. Another 3,000 people work for the government as relief workers, casual, term or contractors.\n                  \n          Managing information technology for this dispersed and elastic workforce is a constant challenge for Martin Joy, director of information communication and technology for the Government of Nunavut.\n                  \n          “Traditionally, in IT, you would have to send a device or mail a device to that end user. In Nunavut, there is no road, there is no logistical framework that allows us to move stuff cost-effectively, so everything has to be flown,” he explained. “Based on weather, based on the types of cargo flows, that could take a considerable amount of time. It could take two to three weeks for us to get a user a device to get them onboarded securely into our environment.”\n                  \n          “Now, with Windows 365, we can do that within less than an hour of the account being created,” he said.\n                  \n          Windows 365 puts Microsoft’s flagship operating system in the cloud. Users select Windows 10 or Windows 11, once it is generally available later this calendar year, along with a configuration of processing power, storage and memory that suits their needs. They then access their Cloud PC through a native application or web browser on any device, from anywhere with an internet connection.\n                  \n          The creation of the Cloud PC follows other products and services to the cloud, from Windows Server on Azure to the suite of Microsoft Office productivity applications in Microsoft 365. Windows is already accessible in the cloud via Azure Virtual Desktop, which offers customers flexibility to create and run their own virtualization service. Windows 365 is a new virtualization technology for Windows that is easy to set up and deploy for today’s login-from-anywhere, mobile and elastic workforces.\n                  \n          “Windows 365 is really going to make a huge difference for organizations that wanted to try virtualization for various reasons but could not – maybe it was too costly, too complex or they didn’t have the expertise in house to do it,” said Wangui McKelvey, general manager of Microsoft 365, who works from a home office in Atlanta, Georgia.\n                  \n          With Windows 365, she added, IT admins can manage and deploy Cloud PCs using the same tools they use today to manage physical PCs.\n                  \n          The remote and hybrid workforces of today and tomorrow were top of mind for Scott Manchester when he set out to develop Windows 365. The director of program management for Windows 365 in Redmond, Washington, wanted to deliver an experience with the look, feel and security of a traditional Windows PC, only accessed through a native app or web browser on a device of the user’s choosing from anywhere with an internet connection.\n          \n          “You want them to be able to get access to their corporate resources, applications, databases and HR tools, and do all the things they do in a typical workday sitting in the office – you want them to have that same experience,” he said. “And you want them to have that experience in such a way that it feels familiar to them. It’s not this jolting thing that takes away all the things they love about Windows.”\n          \n          Virtualization, he noted, can be challenging to set up and maintain, especially for organizations without dedicated IT resources. IT consulting firms do brisk business working with companies to set up virtualization solutions and staffing help desks to field calls from employees when they run into complications. Manchester knows this because he worked on Microsoft’s Windows virtualization technologies for nearly two decades prior to leading the development of Windows 365.\n          \n          The inspiration for Windows 365 came earlier, when he was assigned to an internal team at Microsoft working on a project, code named Arcadia, a consumer-facing service that would stream video games from the cloud. The target audience – gamers – lacks an IT department to lean on when things glitch. “That started me thinking, ‘How do we build something that doesn’t require IT intervention, something that could truly scale to the consumer market?’” Manchester said.\n          \n          The consumer experience was Manchester’s benchmark when he started work on virtualization.\n          \n          “I took note of every time there was something that didn’t quite deliver on that,” he said. “And, as I started meeting with customers and partners and learning about how they fill in these gaps either by setting expectations of their workforce or having an IT department that picks up the phone and deals with those situations, I realized we had some ground to cover.”\n          \n          Covering that ground led to improvements in Microsoft’s business offering now known as Azure Virtual Desktop. This offering continues to experience accelerated growth among customers who need full customization and control over their operating environment and have the resources for dedicated IT staff to support the system, Manchester noted. Windows 365 is for the approximate 80% of the marketplace that lacks the need for full customization or the resources for dedicated IT.\n          \n          To lead the development of Windows 365, Manchester leaned into his Arcadia mindset.\n          \n          “When we built this team, we brought in a couple of leaders who had experience with virtualization, but for the most part we brought in people who had experience with Windows and experience with consumer experiences because that was the bar we wanted to set,” he said.\n          \n          Soon after this bar was set, and the first batch of hires made – a handful of experts in virtualization and user experience – COVID-19 hit and changed the world.\n          \n          “We hired everybody else during the pandemic,” Manchester said. “They were remote. They were living all over the U.S., Australia, Europe and China. Many of them have never set foot in the office. And as soon as we got far enough along with the development, we moved those people to use the service. People who never used virtualization before, had no expectations – their bar was the experience they had on their laptop – and we basically used Windows 365 to build Windows 365.”\n          \n          As the team used the service and encountered bugs in the system, they worked through and solved them on their way to creating a unique category of virtualization, the Cloud PC.\n          \n          “We’re giving you Windows from the cloud,” Manchester said.\n                  ","language":"en"},{"id":"1","text":"\n          Windows 365 was in the works before COVID-19 sent companies around the world on a scramble to secure solutions to support employees suddenly forced to work from home, but “what really put the firecracker behind it was the pandemic, it accelerated everything,” McKelvey said. She explained that customers were asking, “’How do we create an experience for people that makes them still feel connected to the company without the physical presence of being there?”\n\n          In this new world of Windows 365, remote workers flip the lid on their laptop, bootup the family workstation or clip a keyboard onto a tablet, launch a native app or modern web browser and login to their Windows 365 account. From there, their Cloud PC appears with their background, apps, settings and content just as they left it when they last were last there – in the office, at home or a coffee shop.\n\n          “And then, when you’re done, you’re done. You won’t have any issues around security because you’re not saving anything on your device,” McKelvey said, noting that all the data is stored in the cloud.\n\n          The ability to login to a Cloud PC from anywhere on any device is part of Microsoft’s larger strategy around tailoring products such as Microsoft Teams and Microsoft 365 for the post-pandemic hybrid workforce of the future, she added. It enables employees accustomed to working from home to continue working from home; it enables companies to hire interns from halfway around the world; it allows startups to scale without requiring IT expertise.\n\n          “I think this will be interesting for those organizations who, for whatever reason, have shied away from virtualization. This is giving them an opportunity to try it in a way that their regular, everyday endpoint admin could manage,” McKelvey said.\n\n          The simplicity of Windows 365 won over Dean Wells, the corporate chief information officer for the Government of Nunavut. His team previously attempted to deploy a traditional virtual desktop infrastructure and found it inefficient and unsustainable given the limitations of low-bandwidth satellite internet and the constant need for IT staff to manage the network and infrastructure.\n\n          We didn’t run it for very long,” he said. “It didn’t turn out the way we had hoped. So, we actually had terminated the project and rolled back out to just regular PCs.”\n\n          He re-evaluated this decision after the Government of Nunavut was hit by a ransomware attack in November 2019 that took down everything from the phone system to the government’s servers. Microsoft helped rebuild the system, moving the government to Teams, SharePoint, OneDrive and Microsoft 365. Manchester’s team recruited the Government of Nunavut to pilot Windows 365. Wells was intrigued, especially by the ability to manage the elastic workforce securely and seamlessly.\n\n          “The impact that I believe we are finding, and the impact that we’re going to find going forward, is being able to access specialists from outside the territory and organizations outside the territory to come in and help us with our projects, being able to get people on staff with us to help us deliver the day-to-day expertise that we need to run the government,” he said.\n\n          “Being able to improve healthcare, being able to improve education, economic development is going to improve the quality of life in the communities.”\n          ","language":"en"}]},"tasks":{"extractiveSummarizationTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit","sentenceCount":5,"sortBy":"Offset"}}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.2-preview.2/analyze/jobs/380dc56a-f44f-4f8a-b410-0a2f2efa04b5',
  'x-envoy-upstream-service-time',
  '185',
  'apim-request-id',
  'a0482e02-151f-43e3-a112-1aa723a4fb14',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:44:05 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/380dc56a-f44f-4f8a-b410-0a2f2efa04b5')
  .query(true)
  .reply(200, {"jobId":"380dc56a-f44f-4f8a-b410-0a2f2efa04b5","lastUpdateDateTime":"2021-10-23T00:44:06Z","createdDateTime":"2021-10-23T00:44:05Z","expirationDateTime":"2021-10-24T00:44:05Z","status":"notStarted","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  'e7f73a14-9af1-4137-89c9-9cf5195c6490',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:44:05 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/380dc56a-f44f-4f8a-b410-0a2f2efa04b5')
  .query(true)
  .reply(200, {"jobId":"380dc56a-f44f-4f8a-b410-0a2f2efa04b5","lastUpdateDateTime":"2021-10-23T00:44:06Z","createdDateTime":"2021-10-23T00:44:05Z","expirationDateTime":"2021-10-24T00:44:05Z","status":"notStarted","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '63',
  'apim-request-id',
  'e7e6fe77-0803-4cc3-8eeb-b705f0f46ede',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:44:06 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/380dc56a-f44f-4f8a-b410-0a2f2efa04b5')
  .query(true)
  .reply(200, {"jobId":"380dc56a-f44f-4f8a-b410-0a2f2efa04b5","lastUpdateDateTime":"2021-10-23T00:44:06Z","createdDateTime":"2021-10-23T00:44:05Z","expirationDateTime":"2021-10-24T00:44:05Z","status":"running","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  '0fe6a179-e5f4-4fed-a554-d7304b3e0baa',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:44:07 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/380dc56a-f44f-4f8a-b410-0a2f2efa04b5')
  .query(true)
  .reply(200, {"jobId":"380dc56a-f44f-4f8a-b410-0a2f2efa04b5","lastUpdateDateTime":"2021-10-23T00:44:06Z","createdDateTime":"2021-10-23T00:44:05Z","expirationDateTime":"2021-10-24T00:44:05Z","status":"running","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '11',
  'apim-request-id',
  '0b273ffd-6196-462b-b1d4-e56601f167cc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:44:09 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/380dc56a-f44f-4f8a-b410-0a2f2efa04b5')
  .query(true)
  .reply(200, {"jobId":"380dc56a-f44f-4f8a-b410-0a2f2efa04b5","lastUpdateDateTime":"2021-10-23T00:44:06Z","createdDateTime":"2021-10-23T00:44:05Z","expirationDateTime":"2021-10-24T00:44:05Z","status":"running","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  'f749ecf4-a23a-4cc3-b2da-ac086fbb0c26',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:44:11 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/380dc56a-f44f-4f8a-b410-0a2f2efa04b5')
  .query(true)
  .reply(200, {"jobId":"380dc56a-f44f-4f8a-b410-0a2f2efa04b5","lastUpdateDateTime":"2021-10-23T00:44:06Z","createdDateTime":"2021-10-23T00:44:05Z","expirationDateTime":"2021-10-24T00:44:05Z","status":"running","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '3d2ef8b8-47d1-4597-9b3f-d81da28a950c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:44:13 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/380dc56a-f44f-4f8a-b410-0a2f2efa04b5')
  .query(true)
  .reply(200, {"jobId":"380dc56a-f44f-4f8a-b410-0a2f2efa04b5","lastUpdateDateTime":"2021-10-23T00:44:06Z","createdDateTime":"2021-10-23T00:44:05Z","expirationDateTime":"2021-10-24T00:44:05Z","status":"running","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  'e934127c-15b0-4974-8fd7-5f08f938908e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:44:16 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/380dc56a-f44f-4f8a-b410-0a2f2efa04b5')
  .query(true)
  .reply(200, {"jobId":"380dc56a-f44f-4f8a-b410-0a2f2efa04b5","lastUpdateDateTime":"2021-10-23T00:44:06Z","createdDateTime":"2021-10-23T00:44:05Z","expirationDateTime":"2021-10-24T00:44:05Z","status":"running","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  'd342263d-a680-4221-864d-eeeb8a538dcb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:44:18 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/380dc56a-f44f-4f8a-b410-0a2f2efa04b5')
  .query(true)
  .reply(200, {"jobId":"380dc56a-f44f-4f8a-b410-0a2f2efa04b5","lastUpdateDateTime":"2021-10-23T00:44:06Z","createdDateTime":"2021-10-23T00:44:05Z","expirationDateTime":"2021-10-24T00:44:05Z","status":"running","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  'aca2d812-ff9f-4b14-b63f-240a189b1485',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:44:20 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/380dc56a-f44f-4f8a-b410-0a2f2efa04b5')
  .query(true)
  .reply(200, {"jobId":"380dc56a-f44f-4f8a-b410-0a2f2efa04b5","lastUpdateDateTime":"2021-10-23T00:44:06Z","createdDateTime":"2021-10-23T00:44:05Z","expirationDateTime":"2021-10-24T00:44:05Z","status":"running","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '55628807-ea77-4d42-a49c-ca30e55e86b3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:44:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/380dc56a-f44f-4f8a-b410-0a2f2efa04b5')
  .query(true)
  .reply(200, {"jobId":"380dc56a-f44f-4f8a-b410-0a2f2efa04b5","lastUpdateDateTime":"2021-10-23T00:44:24Z","createdDateTime":"2021-10-23T00:44:05Z","expirationDateTime":"2021-10-24T00:44:05Z","status":"succeeded","errors":[],"tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"extractiveSummarizationTasks":[{"lastUpdateDateTime":"2021-10-23T00:44:24.0414391Z","state":"succeeded","results":{"documents":[{"id":"0","sentences":[{"text":"The Government of Nunavut relies on this internet link to provide healthcare, education, housing and family, and financial and other services to 25 communities.","rankScore":0.24,"offset":531,"length":160},{"text":"Windows 365 puts Microsoft’s flagship operating system in the cloud.","rankScore":0.26,"offset":1864,"length":68},{"text":"The creation of the Cloud PC follows other products and services to the cloud, from Windows Server on Azure to the suite of Microsoft Office productivity applications in Microsoft 365.","rankScore":0.26,"offset":2283,"length":184},{"text":"Windows is already accessible in the cloud via Azure Virtual Desktop, which offers customers flexibility to create and run their own virtualization service.","rankScore":0.49,"offset":2468,"length":156},{"text":"Windows 365 is a new virtualization technology for Windows that is easy to set up and deploy for today’s login-from-anywhere, mobile and elastic workforces.","rankScore":1,"offset":2625,"length":156}],"warnings":[]},{"id":"1","sentences":[{"text":"Windows 365 was in the works before COVID-19 sent companies around the world on a scramble to secure solutions to support employees suddenly forced to work from home, but “what really put the firecracker behind it was the pandemic, it accelerated everything,” McKelvey said.","rankScore":0.63,"offset":11,"length":274},{"text":"The ability to login to a Cloud PC from anywhere on any device is part of Microsoft’s larger strategy around tailoring products such as Microsoft Teams and Microsoft 365 for the post-pandemic hybrid workforce of the future, she added.","rankScore":0.79,"offset":1109,"length":234},{"text":"It enables employees accustomed to working from home to continue working from home;","rankScore":1,"offset":1344,"length":83},{"text":"it enables companies to hire interns from halfway around the world;","rankScore":0.86,"offset":1428,"length":67},{"text":"it allows startups to scale without requiring IT expertise.","rankScore":0.66,"offset":1496,"length":59}],"warnings":[]}],"errors":[],"modelVersion":"2021-08-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '84',
  'apim-request-id',
  'c0e2d7ee-6bf7-4d73-9a1c-ea6c3c5aa144',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:44:24 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/380dc56a-f44f-4f8a-b410-0a2f2efa04b5')
  .query(true)
  .reply(200, {"jobId":"380dc56a-f44f-4f8a-b410-0a2f2efa04b5","lastUpdateDateTime":"2021-10-23T00:44:24Z","createdDateTime":"2021-10-23T00:44:05Z","expirationDateTime":"2021-10-24T00:44:05Z","status":"succeeded","errors":[],"tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"extractiveSummarizationTasks":[{"lastUpdateDateTime":"2021-10-23T00:44:24.0414391Z","state":"succeeded","results":{"documents":[{"id":"0","sentences":[{"text":"The Government of Nunavut relies on this internet link to provide healthcare, education, housing and family, and financial and other services to 25 communities.","rankScore":0.24,"offset":531,"length":160},{"text":"Windows 365 puts Microsoft’s flagship operating system in the cloud.","rankScore":0.26,"offset":1864,"length":68},{"text":"The creation of the Cloud PC follows other products and services to the cloud, from Windows Server on Azure to the suite of Microsoft Office productivity applications in Microsoft 365.","rankScore":0.26,"offset":2283,"length":184},{"text":"Windows is already accessible in the cloud via Azure Virtual Desktop, which offers customers flexibility to create and run their own virtualization service.","rankScore":0.49,"offset":2468,"length":156},{"text":"Windows 365 is a new virtualization technology for Windows that is easy to set up and deploy for today’s login-from-anywhere, mobile and elastic workforces.","rankScore":1,"offset":2625,"length":156}],"warnings":[]},{"id":"1","sentences":[{"text":"Windows 365 was in the works before COVID-19 sent companies around the world on a scramble to secure solutions to support employees suddenly forced to work from home, but “what really put the firecracker behind it was the pandemic, it accelerated everything,” McKelvey said.","rankScore":0.63,"offset":11,"length":274},{"text":"The ability to login to a Cloud PC from anywhere on any device is part of Microsoft’s larger strategy around tailoring products such as Microsoft Teams and Microsoft 365 for the post-pandemic hybrid workforce of the future, she added.","rankScore":0.79,"offset":1109,"length":234},{"text":"It enables employees accustomed to working from home to continue working from home;","rankScore":1,"offset":1344,"length":83},{"text":"it enables companies to hire interns from halfway around the world;","rankScore":0.86,"offset":1428,"length":67},{"text":"it allows startups to scale without requiring IT expertise.","rankScore":0.66,"offset":1496,"length":59}],"warnings":[]}],"errors":[],"modelVersion":"2021-08-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '197',
  'apim-request-id',
  'eeb7b012-0a2f-40d7-bc60-f6471ee53370',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:44:24 GMT'
]);

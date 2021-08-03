let nock = require('nock');

module.exports.hash = "4219507adf0424bb513a4d7e506b5620";

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
  'f60228f7-f3c1-4a06-a978-0bbdf5cfbd01',
  'x-ms-ests-server',
  '2.1.11898.12 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AlWKmlww77xOo6Ig5BuHWzBz_bg1EQAAAKy9m9gOAAAA; expires=Thu, 02-Sep-2021 22:44:31 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrIb6wXGBKgGzMNZ9tPY1Og2XXdUhwLafz_kXzz0RiKaSW0IqQmlRERBvwu_g0NlX_i3H_eXBiel_wHO6b5TrBCtelYC1ClL-Sg2lCNP2jzwIuLSRV86sMW_CQwwQqPrXKRvjMamI_sIRVomfb9OANzm9MGbJAwJM1X1eQuMHtBa0gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 03 Aug 2021 22:44:31 GMT',
  'Content-Length',
  '980'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/88888888-8888-8888-8888-888888888888/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"kerberos_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/kerberos","tenant_region_scope":"WW","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
  'Cache-Control',
  'max-age=86400, private',
  'Content-Length',
  '1753',
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
  '20801e77-f2e6-4936-8724-4d69eec52e01',
  'x-ms-ests-server',
  '2.1.11898.12 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AlWKmlww77xOo6Ig5BuHWzBz_bg1EQAAAKy9m9gOAAAA; expires=Thu, 02-Sep-2021 22:44:31 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevruCr6QQN9hMjoNkg9O07WOY0WXw8Vg6q9UcHh85ABWuhwgQOagbHOqO6hSaCLe0jbXSfgosjnWv6IEYEQsX8EX-8GnpNJtlEBlTBTtxo5iTfayTBvGbsoxeaeywJnjJ9ZoOaGowmbPKpVA4KJoUHrOHaRnCr7a_5zzintqCJwjvIgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 03 Aug 2021 22:44:31 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.2.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=2|771,0|,&x-client-last-telemetry=2|0|||0,0&client-request-id=1b72e9e6-ca7a-41c3-932c-dbb04dffa3d4&client_secret=azure_client_secret")
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
  'c1100c44-8432-4564-a044-0cf9cbed5d01',
  'x-ms-ests-server',
  '2.1.11898.12 - SCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AlWKmlww77xOo6Ig5BuHWzBz_bg1EQAAAKy9m9gOAAAA; expires=Thu, 02-Sep-2021 22:44:32 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 03 Aug 2021 22:44:31 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.1/analyze', {"analysisInput":{"documents":[{"id":"0","text":"\n          No roads or rails connect the 39,000 people dispersed across Nunavut, a territory in northeastern Canada that spans three time zones and features fjord-cut isles that stretch into the Arctic Circle off the west coast of Greenland. About 80% of the population is of Inuit descent with cultural ties to the land that date back more than 4,000 years.\n          \n          Today, low-bandwidth satellite internet service links the people of Nunavut to each other and with the rest of the world.\n                  \n          The Government of Nunavut relies on this internet link to provide healthcare, education, housing and family, and financial and other services to 25 communities. The smallest, Grise Fiord, has a population of 130; the largest, the capital, Iqaluit, has 8,500 people. About 3,100 people work full-time for the government, which has an office in each community. Another 3,000 people work for the government as relief workers, casual, term or contractors.\n                  \n          Managing information technology for this dispersed and elastic workforce is a constant challenge for Martin Joy, director of information communication and technology for the Government of Nunavut.\n                  \n          “Traditionally, in IT, you would have to send a device or mail a device to that end user. In Nunavut, there is no road, there is no logistical framework that allows us to move stuff cost-effectively, so everything has to be flown,” he explained. “Based on weather, based on the types of cargo flows, that could take a considerable amount of time. It could take two to three weeks for us to get a user a device to get them onboarded securely into our environment.”\n                  \n          “Now, with Windows 365, we can do that within less than an hour of the account being created,” he said.\n                  \n          Windows 365 puts Microsoft’s flagship operating system in the cloud. Users select Windows 10 or Windows 11, once it is generally available later this calendar year, along with a configuration of processing power, storage and memory that suits their needs. They then access their Cloud PC through a native application or web browser on any device, from anywhere with an internet connection.\n                  \n          The creation of the Cloud PC follows other products and services to the cloud, from Windows Server on Azure to the suite of Microsoft Office productivity applications in Microsoft 365. Windows is already accessible in the cloud via Azure Virtual Desktop, which offers customers flexibility to create and run their own virtualization service. Windows 365 is a new virtualization technology for Windows that is easy to set up and deploy for today’s login-from-anywhere, mobile and elastic workforces.\n                  \n          “Windows 365 is really going to make a huge difference for organizations that wanted to try virtualization for various reasons but could not – maybe it was too costly, too complex or they didn’t have the expertise in house to do it,” said Wangui McKelvey, general manager of Microsoft 365, who works from a home office in Atlanta, Georgia.\n                  \n          With Windows 365, she added, IT admins can manage and deploy Cloud PCs using the same tools they use today to manage physical PCs.\n                  \n          The remote and hybrid workforces of today and tomorrow were top of mind for Scott Manchester when he set out to develop Windows 365. The director of program management for Windows 365 in Redmond, Washington, wanted to deliver an experience with the look, feel and security of a traditional Windows PC, only accessed through a native app or web browser on a device of the user’s choosing from anywhere with an internet connection.\n          \n          “You want them to be able to get access to their corporate resources, applications, databases and HR tools, and do all the things they do in a typical workday sitting in the office – you want them to have that same experience,” he said. “And you want them to have that experience in such a way that it feels familiar to them. It’s not this jolting thing that takes away all the things they love about Windows.”\n          \n          Virtualization, he noted, can be challenging to set up and maintain, especially for organizations without dedicated IT resources. IT consulting firms do brisk business working with companies to set up virtualization solutions and staffing help desks to field calls from employees when they run into complications. Manchester knows this because he worked on Microsoft’s Windows virtualization technologies for nearly two decades prior to leading the development of Windows 365.\n          \n          The inspiration for Windows 365 came earlier, when he was assigned to an internal team at Microsoft working on a project, code named Arcadia, a consumer-facing service that would stream video games from the cloud. The target audience – gamers – lacks an IT department to lean on when things glitch. “That started me thinking, ‘How do we build something that doesn’t require IT intervention, something that could truly scale to the consumer market?’” Manchester said.\n          \n          The consumer experience was Manchester’s benchmark when he started work on virtualization.\n          \n          “I took note of every time there was something that didn’t quite deliver on that,” he said. “And, as I started meeting with customers and partners and learning about how they fill in these gaps either by setting expectations of their workforce or having an IT department that picks up the phone and deals with those situations, I realized we had some ground to cover.”\n          \n          Covering that ground led to improvements in Microsoft’s business offering now known as Azure Virtual Desktop. This offering continues to experience accelerated growth among customers who need full customization and control over their operating environment and have the resources for dedicated IT staff to support the system, Manchester noted. Windows 365 is for the approximate 80% of the marketplace that lacks the need for full customization or the resources for dedicated IT.\n          \n          To lead the development of Windows 365, Manchester leaned into his Arcadia mindset.\n          \n          “When we built this team, we brought in a couple of leaders who had experience with virtualization, but for the most part we brought in people who had experience with Windows and experience with consumer experiences because that was the bar we wanted to set,” he said.\n          \n          Soon after this bar was set, and the first batch of hires made – a handful of experts in virtualization and user experience – COVID-19 hit and changed the world.\n          \n          “We hired everybody else during the pandemic,” Manchester said. “They were remote. They were living all over the U.S., Australia, Europe and China. Many of them have never set foot in the office. And as soon as we got far enough along with the development, we moved those people to use the service. People who never used virtualization before, had no expectations – their bar was the experience they had on their laptop – and we basically used Windows 365 to build Windows 365.”\n          \n          As the team used the service and encountered bugs in the system, they worked through and solved them on their way to creating a unique category of virtualization, the Cloud PC.\n          \n          “We’re giving you Windows from the cloud,” Manchester said.\n                  ","language":"en"},{"id":"1","text":"\n          Windows 365 was in the works before COVID-19 sent companies around the world on a scramble to secure solutions to support employees suddenly forced to work from home, but “what really put the firecracker behind it was the pandemic, it accelerated everything,” McKelvey said. She explained that customers were asking, “’How do we create an experience for people that makes them still feel connected to the company without the physical presence of being there?”\n\n          In this new world of Windows 365, remote workers flip the lid on their laptop, bootup the family workstation or clip a keyboard onto a tablet, launch a native app or modern web browser and login to their Windows 365 account. From there, their Cloud PC appears with their background, apps, settings and content just as they left it when they last were last there – in the office, at home or a coffee shop.\n\n          “And then, when you’re done, you’re done. You won’t have any issues around security because you’re not saving anything on your device,” McKelvey said, noting that all the data is stored in the cloud.\n\n          The ability to login to a Cloud PC from anywhere on any device is part of Microsoft’s larger strategy around tailoring products such as Microsoft Teams and Microsoft 365 for the post-pandemic hybrid workforce of the future, she added. It enables employees accustomed to working from home to continue working from home; it enables companies to hire interns from halfway around the world; it allows startups to scale without requiring IT expertise.\n\n          “I think this will be interesting for those organizations who, for whatever reason, have shied away from virtualization. This is giving them an opportunity to try it in a way that their regular, everyday endpoint admin could manage,” McKelvey said.\n\n          The simplicity of Windows 365 won over Dean Wells, the corporate chief information officer for the Government of Nunavut. His team previously attempted to deploy a traditional virtual desktop infrastructure and found it inefficient and unsustainable given the limitations of low-bandwidth satellite internet and the constant need for IT staff to manage the network and infrastructure.\n\n          We didn’t run it for very long,” he said. “It didn’t turn out the way we had hoped. So, we actually had terminated the project and rolled back out to just regular PCs.”\n\n          He re-evaluated this decision after the Government of Nunavut was hit by a ransomware attack in November 2019 that took down everything from the phone system to the government’s servers. Microsoft helped rebuild the system, moving the government to Teams, SharePoint, OneDrive and Microsoft 365. Manchester’s team recruited the Government of Nunavut to pilot Windows 365. Wells was intrigued, especially by the ability to manage the elastic workforce securely and seamlessly.\n\n          “The impact that I believe we are finding, and the impact that we’re going to find going forward, is being able to access specialists from outside the territory and organizations outside the territory to come in and help us with our projects, being able to get people on staff with us to help us deliver the day-to-day expertise that we need to run the government,” he said.\n\n          “Being able to improve healthcare, being able to improve education, economic development is going to improve the quality of life in the communities.”\n          ","language":"en"}]},"tasks":{"extractiveSummarizationTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit","sentenceCount":5,"sortBy":"Offset"}}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.2-preview.1/analyze/jobs/30582670-5725-402e-8d0c-f5f74654d0db',
  'x-envoy-upstream-service-time',
  '164',
  'apim-request-id',
  'c71fb1e7-e6eb-484a-b139-a8aa53c07f63',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:44:32 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/30582670-5725-402e-8d0c-f5f74654d0db')
  .query(true)
  .reply(200, {"jobId":"30582670-5725-402e-8d0c-f5f74654d0db","lastUpdateDateTime":"2021-08-03T22:44:32Z","createdDateTime":"2021-08-03T22:44:32Z","expirationDateTime":"2021-08-04T22:44:32Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  'fb063324-2047-486c-a79b-39e015c886fb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:44:32 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/30582670-5725-402e-8d0c-f5f74654d0db')
  .query(true)
  .reply(200, {"jobId":"30582670-5725-402e-8d0c-f5f74654d0db","lastUpdateDateTime":"2021-08-03T22:44:32Z","createdDateTime":"2021-08-03T22:44:32Z","expirationDateTime":"2021-08-04T22:44:32Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '12',
  'apim-request-id',
  'e3640743-6c0d-4d4d-9e6b-3c7422910bf8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:44:32 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/30582670-5725-402e-8d0c-f5f74654d0db')
  .query(true)
  .reply(200, {"jobId":"30582670-5725-402e-8d0c-f5f74654d0db","lastUpdateDateTime":"2021-08-03T22:44:32Z","createdDateTime":"2021-08-03T22:44:32Z","expirationDateTime":"2021-08-04T22:44:32Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '6822ec29-6c59-4446-bb8d-4e01f6f9ec4c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:44:34 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/30582670-5725-402e-8d0c-f5f74654d0db')
  .query(true)
  .reply(200, {"jobId":"30582670-5725-402e-8d0c-f5f74654d0db","lastUpdateDateTime":"2021-08-03T22:44:32Z","createdDateTime":"2021-08-03T22:44:32Z","expirationDateTime":"2021-08-04T22:44:32Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  '9d41cce8-cb51-496b-9eb0-79e3f2bce98e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:44:36 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/30582670-5725-402e-8d0c-f5f74654d0db')
  .query(true)
  .reply(200, {"jobId":"30582670-5725-402e-8d0c-f5f74654d0db","lastUpdateDateTime":"2021-08-03T22:44:32Z","createdDateTime":"2021-08-03T22:44:32Z","expirationDateTime":"2021-08-04T22:44:32Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '13',
  'apim-request-id',
  'e0f027ca-6904-40b4-9e76-9c76f4513027',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:44:38 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/30582670-5725-402e-8d0c-f5f74654d0db')
  .query(true)
  .reply(200, {"jobId":"30582670-5725-402e-8d0c-f5f74654d0db","lastUpdateDateTime":"2021-08-03T22:44:32Z","createdDateTime":"2021-08-03T22:44:32Z","expirationDateTime":"2021-08-04T22:44:32Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '2e93a094-bd6e-448f-b1f1-ef79f3f5d78b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:44:40 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/30582670-5725-402e-8d0c-f5f74654d0db')
  .query(true)
  .reply(200, {"jobId":"30582670-5725-402e-8d0c-f5f74654d0db","lastUpdateDateTime":"2021-08-03T22:44:32Z","createdDateTime":"2021-08-03T22:44:32Z","expirationDateTime":"2021-08-04T22:44:32Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'e14596c5-7be3-4407-81ae-34d3f44807e7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:44:42 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/30582670-5725-402e-8d0c-f5f74654d0db')
  .query(true)
  .reply(200, {"jobId":"30582670-5725-402e-8d0c-f5f74654d0db","lastUpdateDateTime":"2021-08-03T22:44:32Z","createdDateTime":"2021-08-03T22:44:32Z","expirationDateTime":"2021-08-04T22:44:32Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '8c70c212-febe-4bb1-be90-126239e0698a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:44:44 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/30582670-5725-402e-8d0c-f5f74654d0db')
  .query(true)
  .reply(200, {"jobId":"30582670-5725-402e-8d0c-f5f74654d0db","lastUpdateDateTime":"2021-08-03T22:44:32Z","createdDateTime":"2021-08-03T22:44:32Z","expirationDateTime":"2021-08-04T22:44:32Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '3ab7d394-fa71-4926-bf62-d541fbb6ebfb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:44:46 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/30582670-5725-402e-8d0c-f5f74654d0db')
  .query(true)
  .reply(200, {"jobId":"30582670-5725-402e-8d0c-f5f74654d0db","lastUpdateDateTime":"2021-08-03T22:44:32Z","createdDateTime":"2021-08-03T22:44:32Z","expirationDateTime":"2021-08-04T22:44:32Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '46b1a1ad-900e-4751-becd-5ae2dbc5f23f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:44:48 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/30582670-5725-402e-8d0c-f5f74654d0db')
  .query(true)
  .reply(200, {"jobId":"30582670-5725-402e-8d0c-f5f74654d0db","lastUpdateDateTime":"2021-08-03T22:44:32Z","createdDateTime":"2021-08-03T22:44:32Z","expirationDateTime":"2021-08-04T22:44:32Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '127a4556-1619-4c93-a732-1e9bdfcb5e83',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:44:51 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/30582670-5725-402e-8d0c-f5f74654d0db')
  .query(true)
  .reply(200, {"jobId":"30582670-5725-402e-8d0c-f5f74654d0db","lastUpdateDateTime":"2021-08-03T22:44:52Z","createdDateTime":"2021-08-03T22:44:32Z","expirationDateTime":"2021-08-04T22:44:32Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"extractiveSummarizationTasks":[{"lastUpdateDateTime":"2021-08-03T22:44:52.4734988Z","taskName":"ExtractiveSummarization_latest","state":"succeeded","results":{"documents":[{"id":"0","sentences":[{"text":"No roads or rails connect the 39,000 people dispersed across Nunavut, a territory in northeastern Canada that spans three time zones and features fjord-cut isles that stretch into the Arctic Circle off the west coast of Greenland.","rankScore":0.9424625379379141,"offset":11,"length":230},{"text":"About 80% of the population is of Inuit descent with cultural ties to the land that date back more than 4,000 years.","rankScore":0.8696578658347244,"offset":242,"length":116},{"text":"Today, low-bandwidth satellite internet service links the people of Nunavut to each other and with the rest of the world.","rankScore":0.79887955940961,"offset":380,"length":121},{"text":"The Government of Nunavut relies on this internet link to provide healthcare, education, housing and family, and financial and other services to 25 communities.","rankScore":0.7014254027202066,"offset":531,"length":160},{"text":"Managing information technology for this dispersed and elastic workforce is a constant challenge for Martin Joy, director of information communication and technology for the Government of Nunavut.","rankScore":0.6628612394522352,"offset":1012,"length":196}],"warnings":[]},{"id":"1","sentences":[{"text":"Windows 365 was in the works before COVID-19 sent companies around the world on a scramble to secure solutions to support employees suddenly forced to work from home, but “what really put the firecracker behind it was the pandemic, it accelerated everything,” McKelvey said.","rankScore":0.9862194204316037,"offset":11,"length":274},{"text":"She explained that customers were asking, “’How do we create an experience for people that makes them still feel connected to the company without the physical presence of being there?”","rankScore":0.9978084744623865,"offset":286,"length":184},{"text":"In this new world of Windows 365, remote workers flip the lid on their laptop, bootup the family workstation or clip a keyboard onto a tablet, launch a native app or modern web browser and login to their Windows 365 account.","rankScore":0.860018698051389,"offset":482,"length":224},{"text":"From there, their Cloud PC appears with their background, apps, settings and content just as they left it when they last were last there – in the office, at home or a coffee shop.","rankScore":0.6112745423048975,"offset":707,"length":179},{"text":"His team previously attempted to deploy a traditional virtual desktop infrastructure and found it inefficient and unsustainable given the limitations of low-bandwidth satellite internet and the constant need for IT staff to manage the network and infrastructure.","rankScore":0.27658209232173997,"offset":1949,"length":262}],"warnings":[]}],"errors":[],"modelVersion":"2021-08-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '66',
  'apim-request-id',
  '36f30480-9f7c-4e74-969e-f1d661b1be53',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:44:53 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/30582670-5725-402e-8d0c-f5f74654d0db')
  .query(true)
  .reply(200, {"jobId":"30582670-5725-402e-8d0c-f5f74654d0db","lastUpdateDateTime":"2021-08-03T22:44:52Z","createdDateTime":"2021-08-03T22:44:32Z","expirationDateTime":"2021-08-04T22:44:32Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"extractiveSummarizationTasks":[{"lastUpdateDateTime":"2021-08-03T22:44:52.4734988Z","taskName":"ExtractiveSummarization_latest","state":"succeeded","results":{"documents":[{"id":"0","sentences":[{"text":"No roads or rails connect the 39,000 people dispersed across Nunavut, a territory in northeastern Canada that spans three time zones and features fjord-cut isles that stretch into the Arctic Circle off the west coast of Greenland.","rankScore":0.9424625379379141,"offset":11,"length":230},{"text":"About 80% of the population is of Inuit descent with cultural ties to the land that date back more than 4,000 years.","rankScore":0.8696578658347244,"offset":242,"length":116},{"text":"Today, low-bandwidth satellite internet service links the people of Nunavut to each other and with the rest of the world.","rankScore":0.79887955940961,"offset":380,"length":121},{"text":"The Government of Nunavut relies on this internet link to provide healthcare, education, housing and family, and financial and other services to 25 communities.","rankScore":0.7014254027202066,"offset":531,"length":160},{"text":"Managing information technology for this dispersed and elastic workforce is a constant challenge for Martin Joy, director of information communication and technology for the Government of Nunavut.","rankScore":0.6628612394522352,"offset":1012,"length":196}],"warnings":[]},{"id":"1","sentences":[{"text":"Windows 365 was in the works before COVID-19 sent companies around the world on a scramble to secure solutions to support employees suddenly forced to work from home, but “what really put the firecracker behind it was the pandemic, it accelerated everything,” McKelvey said.","rankScore":0.9862194204316037,"offset":11,"length":274},{"text":"She explained that customers were asking, “’How do we create an experience for people that makes them still feel connected to the company without the physical presence of being there?”","rankScore":0.9978084744623865,"offset":286,"length":184},{"text":"In this new world of Windows 365, remote workers flip the lid on their laptop, bootup the family workstation or clip a keyboard onto a tablet, launch a native app or modern web browser and login to their Windows 365 account.","rankScore":0.860018698051389,"offset":482,"length":224},{"text":"From there, their Cloud PC appears with their background, apps, settings and content just as they left it when they last were last there – in the office, at home or a coffee shop.","rankScore":0.6112745423048975,"offset":707,"length":179},{"text":"His team previously attempted to deploy a traditional virtual desktop infrastructure and found it inefficient and unsustainable given the limitations of low-bandwidth satellite internet and the constant need for IT staff to manage the network and infrastructure.","rankScore":0.27658209232173997,"offset":1949,"length":262}],"warnings":[]}],"errors":[],"modelVersion":"2021-08-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '63',
  'apim-request-id',
  '19e6cc97-ec3b-462c-9490-cc1156f63674',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:44:53 GMT'
]);

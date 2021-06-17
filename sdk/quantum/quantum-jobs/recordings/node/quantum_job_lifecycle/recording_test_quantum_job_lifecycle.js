let nock = require('nock');

module.exports.hash = "ab4dd1c6afdb4de9db1250bebba8700d";

module.exports.testInfo = {"uniqueName":{"input-":"input-162395518609708661","job-":"job-162395518637801404","jobname-":"jobname-162395518637800407"},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=ce7bd34e-0000-0000-0000-000000000000&client_secret=clientsecret&scope=https%3A%2F%2Fsanitized%2F")
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
  '52ebd993-9b36-4726-88e8-bfd5021b2d00',
  'x-ms-ests-server',
  '2.1.11829.4 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AjOYKNDeKnVMgTu-D2lode4H9ySAAwAAAO6NXdgOAAAA; expires=Sat, 17-Jul-2021 18:39:44 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 17 Jun 2021 18:39:43 GMT',
  'Content-Length',
  '1722'
]);

nock('https://westus.quantum.azure.com:443', {"encodedQueryParams":true})
  .post('/v1.0/subscriptions/677fc922-91d0-4bf6-0000-4274d319a0fa/resourceGroups/resourcegroup/providers/Microsoft.Quantum/workspaces/workspace/storage/sasUri', {"containerName":"testcontainer"})
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1474dd67c55171f3dfa68deb6abe6d1ddbb6ddeb44d5bd5d945de6475f6d3d9221b4fca6a329e56753ebe2a96b3eaaa192ff3965b4eab659b15cbbcfe3d9acbcff676761f6eefecd1ff7e61535c7cf67affec6cfd7cf97b7df555bd37fbbd0f7ef7bd27bfd7c5c5efbef7ece1ceebd3df7bff8b2fbedb2e2fbfdb9e14dffdc9d90f5eee9ffdeef79efec22627207bbbdb3b9f6eefedbed93df8ddef1ddf7b48ffecdfffa95fd8d4ed67d3ea1736cd67935fd8ac3eabb3e9d547","bfe4ff0145b51572c1000000"], [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Encoding',
  'gzip',
  'Vary',
  'Accept-Encoding',
  'Server',
  'Microsoft-IIS/10.0',
  'Request-Context',
  'appId=cid-v1:4d6ac272-7369-45c6-9036-63d733c8519f',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-request-id',
  '201a9774aa87b041',
  'X-Powered-By',
  'ASP.NET',
  'Date',
  'Thu, 17 Jun 2021 18:39:45 GMT',
  'Connection',
  'close'
]);

nock('https://dummystorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/testcontainer')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 17 Jun 2021 18:39:46 GMT',
  'ETag',
  '"0x8D931BF47D319BC"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6257857e-801e-0001-39a8-634fe8000000',
  'x-ms-client-request-id',
  'fea2388a-163e-42bc-bb17-216716a678b5',
  'x-ms-version',
  '2020-08-04',
  'Date',
  'Thu, 17 Jun 2021 18:39:46 GMT'
]);

nock('https://westus.quantum.azure.com:443', {"encodedQueryParams":true})
  .post('/v1.0/subscriptions/677fc922-91d0-4bf6-0000-4274d319a0fa/resourceGroups/resourcegroup/providers/Microsoft.Quantum/workspaces/workspace/storage/sasUri', {"containerName":"testcontainer","blobName":"input-162395518609708661.json"})
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1474dd67c55171f3dfa68deb6abe6d1ddbb6ddeb44d5bd5d945de6475f6d3d9221b4fca6a329e56753ebe2a96b3eaaa192ff3965b4eab659b15cbbcbe5b2c57eb767bf7d3bd7b0fefdfdf3df874e7e1839d834f3fdd1dff74532d7f8fe6f2b3bd9ddd87db3b7bf4bf5fd8d49f4d7e61535c7cf6f06173ff64bd9e7ff5f9eeee93f96efbfacba74fbffbed9f7e7075f2bbef3dbbf7f97cf717bdba7eb777ffc5eeeca71e1efceef79efec22627387bbbdb3b9f6eefedbed9a5cf8eef3da47ff63ffda95fd8ac3eaba7571ffd","92ff0758b5b52cd5000000"], [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Encoding',
  'gzip',
  'Vary',
  'Accept-Encoding',
  'Server',
  'Microsoft-IIS/10.0',
  'Request-Context',
  'appId=cid-v1:4d6ac272-7369-45c6-9036-63d733c8519f',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-request-id',
  '1551329c0ce13944',
  'X-Powered-By',
  'ASP.NET',
  'Date',
  'Thu, 17 Jun 2021 18:39:46 GMT',
  'Connection',
  'close'
]);

nock('https://dummystorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/testcontainer/input-162395518609708661.json', {"cost_function":{"version":"1.0","type":"ising","terms":[{"c":-3,"ids":[1,0]},{"c":5,"ids":[2,0]},{"c":9,"ids":[2,1]},{"c":2,"ids":[3,0]},{"c":-4,"ids":[3,1]},{"c":4,"ids":[3,2]}]}})
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'X8K62ldLT+xYkvrjps/bQQ==',
  'Last-Modified',
  'Thu, 17 Jun 2021 18:39:46 GMT',
  'ETag',
  '"0x8D931BF47FE462E"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '625786c6-801e-0001-5fa8-634fe8000000',
  'x-ms-client-request-id',
  'd57ac1e0-4e26-4ac2-b164-1aa9be3cdeac',
  'x-ms-version',
  '2020-08-04',
  'x-ms-content-crc64',
  'BXcAuCMpTtQ=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 17 Jun 2021 18:39:46 GMT'
]);

nock('https://westus.quantum.azure.com:443', {"encodedQueryParams":true})
  .put('/v1.0/subscriptions/677fc922-91d0-4bf6-0000-4274d319a0fa/resourceGroups/resourcegroup/providers/Microsoft.Quantum/workspaces/workspace/jobs/job-162395518637801404', {"id":"job-162395518637801404","name":"jobname-162395518637800407","containerUri":"https://dummystorageaccount.blob.core.windows.net/testcontainer?sv=2019-02-02&sig=0000000000000000000000000000000000000000000000&se=2021-06-21T18%3A39%3A45Z&srt=co&ss=b&sp=racw","inputDataUri":"https://dummystorageaccount.blob.core.windows.net/testcontainer/input-162395518609708661.json?sv=2019-02-02&sr=b&sig=0000000000000000000000000000000000000000000000&se=2021-06-21T18%3A39%3A46Z&sp=rcw","inputDataFormat":"microsoft.qio.v2","providerId":"microsoft","target":"microsoft.paralleltempering-parameterfree.cpu","outputDataFormat":"microsoft.qio-results.v2"})
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147d36ad966c532afbfaa8b8f1e7d346fdb55f3e8eedd366fdaa6adeaec226fb23afbe96c918d276535194fab3a1f5f15cb5975d58c9779cb2d2d90dfa3b9fc6c6f67f7e1f6ce1efdef1736c5c567aff7cfced6cf97bfd7575fd57bb3dffbe077df7bf27b5d5cfcee7bcf1eeebc3efdbdf7bff8e2bbedf2f2bbed49f1dd9f9cfde0e5fed9ef7eefe92f6c7202b2b7bbbdf3e9f6deee9bdd83dffddef1bd87f4cffefd9ffa854ddd7e36ad7e61d37c36f985cdeab33a9b5e7d34faa858aed6edd3accdbe9151dc6570dbbb9feedd7b78fffeeec1a73b0f1fec1c7cfae9eef8a79b6ad91d630d4c68a00f1f36f74fd6ebf9579fefee3e99efb6afbf7cfaf4bbdffee907572734da7b9fcf777fd1abeb777bf75fecce7eea210d69c3303fa561d2d0c2913dabea45d6d2e016c5b4ae9aeabc1dffa2a21a5fee99462f69848be6a347bff8978c3e5ad5d56531cbebb399ff02b56cb3fa220fa1ace8bdb2cccb365facf2ba585e6ce39345dee6f5799de7e3e96a4d2fd2dfd98cd0f8e8d1725d96a38f96d482c0fc7435c16f1eadee3d38d8d9d9df7940ef14e89d5a74bedddddfd9a76f9b366bd784ef47dfcd8a96baa58faa754b03191eed769d37ebb26d64d4aef5d79cf547fbfbf7b8b59b7907b33bcd34c33f14569ed679d616d5f24dc104366fef3ea0b71fdd7bf868ffd3f1c1eebdddfbfb079fecec3cdad9a15726f945b13c7d974fd7ee4599a57c398b7e3ecd96d3bc2cbd8ee4f3bcaeab1aa3371f14cd8934c5043d3acfca2607135dd0bc7deffbbf","e4ff013fec872b3f040000"], [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Encoding',
  'gzip',
  'Vary',
  'Accept-Encoding',
  'Server',
  'Microsoft-IIS/10.0',
  'Request-Context',
  'appId=cid-v1:4d6ac272-7369-45c6-9036-63d733c8519f',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-request-id',
  '92016472a8ab4f47',
  'X-Powered-By',
  'ASP.NET',
  'Date',
  'Thu, 17 Jun 2021 18:39:45 GMT',
  'Connection',
  'close'
]);

nock('https://westus.quantum.azure.com:443', {"encodedQueryParams":true})
  .get('/v1.0/subscriptions/677fc922-91d0-4bf6-0000-4274d319a0fa/resourceGroups/resourcegroup/providers/Microsoft.Quantum/workspaces/workspace/jobs/job-162395518637801404')
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147d36a","d966c532afbfaa8b8f1e7d346fdb55f3e8eedd366fdaa6adeaec226fb23afbe96c918d276535194fab3a1f5f15cb5975d58c9779cb2d2d90dfa3b9fc6c6f67f7e1f6ce1efdef1736c5c567aff7cfced6cf97bfd7575fd57bb3dffbe077df7bf27b5d5cfcee7bcf1eeebc3efdbdf7bff8e2bbedf2f2bbed49f1dd9f9cfde0e5fed9ef7eefe92f6c7202b2b7bbbdf3e9f6deee9bdd83dffddef1bd87f4cffefd9ffa854ddd7e36ad7e61d37c36f985cdeab33a9b5e7d34faa858aed6edd3accdbe9151dc6570dbbb9feedd7b78fffeeec1a73b0f1fec1c7cfae9eef8a79b6ad91d630d4c68a0fbbfcff1d3773fb5b7787571efabe90fceeeff3e577b172ff6bfa201efbe7d49033e9effc4d3af4e9bf632dfbf575f5d6c1ce8031a280dee17d6cd74f659d6b6d974bec897edef7eefc9efbeb7735e94f9325be404e1a7ab097ef350bdf7e06067677fe7c1367dd5f978777f677fcc43e371f8647b56d58bac25ca2d8a695d35d5793bfe454535bedc338d5e12f916cd478f7ef12f197db4aaabcb6296d76733ff056ad966f5451e4259d17b6599976dbe58e575b1bcd8c6278bbccdebf33acfc7d3d59a5ea4bfb319a1f1d1a3e5ba2c471f614c04868680df3ac3c0e8e89d02bd538bceb718247ddbb459bb267c3ffa6e56b4d42d7d54ad5b1ac8f068b7ebbc59976d23a376adbf199672f086f8e7f383072f7eefef3cfcc9aa7e9895d9f5aba2faf674b1777ef9eae1efbd7ff2ec27f3f3b317efae0f1e7cb1b76e68e67f2e7847c66098675ae7595b54cb37054f964166f70121f3e8dec347fb9f8e0f76efeddedf3ff86467e7d1ce0ebd32c92f8ae5e9bb7cba762fca8ce7cb59f4f369b69ce665e975249fe7755dd5a0a6f9a0684ea42926fbd17956363918f28278e07bdfff25","ff0f8afafc11e8040000"], [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Encoding',
  'gzip',
  'Vary',
  'Accept-Encoding',
  'Server',
  'Microsoft-IIS/10.0',
  'Request-Context',
  'appId=cid-v1:4d6ac272-7369-45c6-9036-63d733c8519f',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-request-id',
  '82dc063f9a046943',
  'X-Powered-By',
  'ASP.NET',
  'Date',
  'Thu, 17 Jun 2021 18:39:46 GMT',
  'Connection',
  'close'
]);

nock('https://westus.quantum.azure.com:443', {"encodedQueryParams":true})
  .get('/v1.0/subscriptions/677fc922-91d0-4bf6-0000-4274d319a0fa/resourceGroups/resourcegroup/providers/Microsoft.Quantum/workspaces/workspace/jobs')
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1479759b9ce3f7af4bd5ffcd1b45ab659b1ccebafeae2a3471fcddb76d53cba7bb7cd9bb669ab3abbc89bacce7e3a5b64e349594dc6d3aacec757c572565d35e365de724b0be4f7682e3fdbdbd97db8bdb347fffb854d71f1d9ebfdb3b3f5f3e5eff5d557f5deecf73ef8ddf79efc5e1717bffbdeb3873baf4f7feffd2fbef86ebbbcfc6e7b527cf727673f78b97ff6bbdf7bfa0b9b9c80eced6eef7cbabdb7fb66f7e077bf777cef21fdb37fffa77e6153b79f4dab5fd8349f4d7e61b3faaccea6571f8d3e2a96ab75fb346bb36f64147719dcf6eea77bf71edebfbf7bf0e9cec3073b079f7eba3bfee9a65a76c75803131ae8c387cdfd93f57afed5e7bbbb4fe6bbedeb2f9f3efdeeb77ffac1d5098df6dee7f3dd5ff4eafadddefd17bbb39f7a4843da30cc4f699834b47064cfaa7a91b534b84531adaba63a6fc7bfa8a8c6977ba6d14b1ae1a2f9e8d12ffe25a38f56757559ccf2fa6ce6bf402ddbacbec843282b7aaf2cf3b2cd17abbc2e9617dbf86491b7797d5ee7f978ba5ad38bf4773623343e7ab45c97e5e8a325b520303f5d4df09b47ab7b0f0e7676f6771ed03b057aa7169d6f77f777f6e9dba6cdda35e1fbd177b3a2a56ee9a36addd2408647bb5de7cdba6c1b19b56bfd3567fdd1fefe3d6eed66dec1ec4e33cdf00f8595a7759eb545b57c533081cddbbb0fe8ed47f71e3edaff747cb07b6ff7fefec14f51eb497e512c4fdfe5d3b57b4726285fcea29f4fb3e5342f4baf0ff93cafebaac6c0cd074573224d31378fceb3b2c9c13f173465dffbfe2ff93eb140feae7d5e2cdfca0b","bfe4ff013f9a3c1556040000"], [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Encoding',
  'gzip',
  'Vary',
  'Accept-Encoding',
  'Server',
  'Microsoft-IIS/10.0',
  'Request-Context',
  'appId=cid-v1:4d6ac272-7369-45c6-9036-63d733c8519f',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-request-id',
  '1f88172e571efc4c',
  'X-Powered-By',
  'ASP.NET',
  'Date',
  'Thu, 17 Jun 2021 18:39:47 GMT',
  'Connection',
  'close'
]);

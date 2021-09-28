let nock = require('nock');

module.exports.hash = "777c512b7287926c2d6ff181e6b1e861";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks')
  .query(true)
  .reply(200, {"value":[{"hookId":"874704b3-80d3-4e78-929d-64be2accfb4f","hookName":"js-test-emailHook-161531685824404287","hookType":"Email","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"toList":["test@example.com"]}},{"hookId":"54b8eea6-fdfc-4fd7-a7b5-b8dfa1d37d70","hookName":"js-test-emailHook-161531705673800660","hookType":"Email","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"toList":["test@example.com"]}},{"hookId":"2a5859d5-6df2-463e-840d-350a980f3291","hookName":"js-test-emailHook-162265643099209817","hookType":"Email","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"toList":["test2@example.com","test3@example.com"]}},{"hookId":"535ee654-f225-461b-9d8d-2c6abb9fed1a","hookName":"js-test-emailHook-162266592635407258","hookType":"Email","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"toList":["test2@example.com","test3@example.com"]}},{"hookId":"1ecc09b3-0ad9-4ecf-a34a-8a576de78fbd","hookName":"js-test-webHook-161531829480305604","hookType":"Webhook","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"endpoint":"https://httpbin.org/post","username":"user","password":"pass","headers":null,"certificateKey":null,"certificatePassword":null}},{"hookId":"1314214b-cedc-42d0-a3fe-368857bf786b","hookName":"js-test-webHook-161531859960401262","hookType":"Webhook","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"endpoint":"https://httpbin.org/post","username":"user","password":"pass","headers":null,"certificateKey":null,"certificatePassword":null}},{"hookId":"a8db2484-9b93-4ed0-8c76-94dfcd17fe6e","hookName":"js-test-webHook-161531878351801649","hookType":"Webhook","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"endpoint":"https://httpbin.org/post","username":"user","password":"pass","headers":null,"certificateKey":null,"certificatePassword":null}},{"hookId":"6ec2b7ef-2e7e-4be7-a662-d8df6328d4bd","hookName":"js-test-webHook-162265643099207315","hookType":"Webhook","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"endpoint":"https://mawebhook.azurewebsites.net/api/HttpTrigger","username":"user1","password":"SecretPlaceholder","headers":{},"certificateKey":"","certificatePassword":""}},{"hookId":"800bcc70-1f2b-4ca9-937c-d19453993b74","hookName":"js-test-webHook-162266592635409328","hookType":"Webhook","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"endpoint":"https://mawebhook.azurewebsites.net/api/HttpTrigger","username":"user1","password":"SecretPlaceholder","headers":{},"certificateKey":"","certificatePassword":""}}]}, [
  'Content-Length',
  '2875',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '1af7da57-8fb3-4c02-ac00-dd9754a50e73',
  'x-envoy-upstream-service-time',
  '165',
  'apim-request-id',
  '1af7da57-8fb3-4c02-ac00-dd9754a50e73',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 20:32:21 GMT'
]);

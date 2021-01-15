let nock = require('nock');

module.exports.hash = "2e82caedae6eb6c5cb61d53e57d2bdcb";

module.exports.testInfo = {"uniqueName":{"js-test-emailHook-":"js-test-emailHook-161069154791506556","js-test-webHook-":"js-test-webHook-161069154791507773"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/hooks', {"hookType":"Email","hookName":"js-test-emailHook-161069154791506556","description":"description","hookParameter":{"toList":["test@example.com"]}})
  .reply(401, {"error":{"code":"401","message":"Access denied due to invalid subscription key or wrong API endpoint. Make sure to provide a valid key for an active subscription and use a correct regional API endpoint for your resource."}}, [ 'Content-Length', '224', 'Date', 'Fri, 15 Jan 2021 06:19:07 GMT' ]);

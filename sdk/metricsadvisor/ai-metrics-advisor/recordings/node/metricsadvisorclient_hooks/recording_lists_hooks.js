let nock = require('nock');

module.exports.hash = "70edbaf8153517593b6c88256917bae3";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks')
  .query(true)
  .reply(401, {"error":{"code":"401","message":"Access denied due to invalid subscription key or wrong API endpoint. Make sure to provide a valid key for an active subscription and use a correct regional API endpoint for your resource."}}, [ 'Content-Length', '224', 'Date', 'Fri, 15 Jan 2021 06:19:08 GMT' ]);

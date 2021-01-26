let nock = require('nock');

module.exports.hash = "6f194676a5a2f1c7a1496c74c15198a1";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/datasources')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fcd354eb7a9a371f8d3ebaccca75fed1a3ef59e8d4ec8240ffbe1fedbc3b787af0e4f4d3e32707a7cf0e9eedddff7d3fa2f6cb6c41cd3f5a5c6fa3f5b600dadea56f667933ad8b555b54cb8f1e2dd76539faa8bd5ea1f1b46a1655339b50a3663d910fa5c1b4ce67f9b22db2b2f9e8d12fa686cb653e0584d76d5d2c090f34fb25d48e869c15cbbc462b45615eb539bd36fae817adf3fada36055a27f36c79913fcd5b01f6b22a8ba9b690064ff332c737034df2e5b4bee691fc5eb97ef84b461b29f4ece9c9dec1c30d14daa36ffe7f4ea1efff92ff078e5fcc65a3020000"], [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; odata.metadata=minimal',
  'Content-Encoding',
  'gzip',
  'Expires',
  '-1',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '4f6d3e44-3f3a-47d5-9bd4-0fd1cbebe7f6',
  'elapsed-time',
  '27',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Fri, 22 Jan 2021 00:14:52 GMT',
  'Content-Length',
  '392'
]);

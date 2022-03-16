let nock = require('nock');

module.exports.hash = "44724d694c42fdf8f37a2133d306768d";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://test-jannovak.int.communication.azure.net:443', {"encodedQueryParams":true})
  .patch('/sip', {"trunks":{"-1":{"sipSignalingPort":8239}}})
  .query(true)
  .reply(422, {"error":{"code":"UnprocessableConfiguration","message":"One or more request inputs are not valid.","innererror":{"code":"InvalidTrunkFqdn","message":"Trunk with an invalid FQDN."}}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json',
  'MS-CV',
  'W8jZPjQ9ukiN6iC5KJpUzQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-05-01-preview, 2022-09-01-preview',
  'X-Processing-Time',
  '80ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0htr6YgAAAADGgSDQ45B0SZE+9MU9A4gkUFJHMDFFREdFMDkxMQBjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Mon, 15 Aug 2022 23:45:10 GMT'
]);

nock('https://test-jannovak.int.communication.azure.net:443', {"encodedQueryParams":true})
  .get('/sip')
  .query(true)
  .reply(200, {"trunks":{"111.fqdn.com":{"sipSignalingPort":8239},"222.fqdn.com":{"sipSignalingPort":7348}},"routes":[{"description":"myFirstRoute's description","name":"myFirstRoute","numberPattern":"^+[1-9][0-9]{3,23}$","trunks":["111.fqdn.com","222.fqdn.com"]},{"description":"mySecondRoute's description","name":"mySecondRoute","numberPattern":"^+[1-9][0-9]{3,23}$","trunks":["111.fqdn.com"]}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'r3Yw+SuAR0CC3T2+gWZV6w.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-05-01-preview, 2022-09-01-preview',
  'X-Processing-Time',
  '222ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0h9r6YgAAAABI+Wt+kX2TQ5of/zs/b+/oUFJHMDFFREdFMDkxMQBjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Mon, 15 Aug 2022 23:45:11 GMT'
]);

nock('https://test-jannovak.int.communication.azure.net:443', {"encodedQueryParams":true})
  .patch('/sip', {"trunks":{"-1":{"sipSignalingPort":8239},"111.fqdn.com":null,"222.fqdn.com":null}})
  .query(true)
  .reply(422, {"error":{"code":"UnprocessableConfiguration","message":"One or more request inputs are not valid.","innererror":{"code":"InvalidTrunkFqdn","message":"Trunk with an invalid FQDN."}}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json',
  'MS-CV',
  '3HbcWX8sNkWfvtoFPlpIPA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-05-01-preview, 2022-09-01-preview',
  'X-Processing-Time',
  '26ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0h9r6YgAAAADx5/2GKmJaSYdeqjY5K6IeUFJHMDFFREdFMDkxMQBjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Mon, 15 Aug 2022 23:45:11 GMT'
]);

nock('https://test-jannovak.int.communication.azure.net:443', {"encodedQueryParams":true})
  .get('/sip')
  .query(true)
  .reply(200, {"trunks":{"111.fqdn.com":{"sipSignalingPort":8239},"222.fqdn.com":{"sipSignalingPort":7348}},"routes":[{"description":"myFirstRoute's description","name":"myFirstRoute","numberPattern":"^+[1-9][0-9]{3,23}$","trunks":["111.fqdn.com","222.fqdn.com"]},{"description":"mySecondRoute's description","name":"mySecondRoute","numberPattern":"^+[1-9][0-9]{3,23}$","trunks":["111.fqdn.com"]}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  '7RPFskKZ8E69VHGsbdKL8w.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-05-01-preview, 2022-09-01-preview',
  'X-Processing-Time',
  '714ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0iNr6YgAAAAAVXcjL82PoRr+uTpfLPQ83UFJHMDFFREdFMDkxMQBjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Mon, 15 Aug 2022 23:45:12 GMT'
]);

let nock = require('nock');

module.exports.hash = "d90d9a1e7e1b703710dfb23b7740d13c";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://jannovak.communication.azure.com:443', {"encodedQueryParams":true})
  .patch('/sip', {"routes":[]})
  .query(true)
  .reply(200, {"trunks":{"test-sbc.foo.bar":{"sipSignalingPort":5678}},"routes":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'sMP26WAa9EuOIMwcpZYt2A.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'X-Processing-Time',
  '263ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0s+uoYgAAAACCDNiSdRnrTq8CJaQM/yXgUFJHMDFFREdFMDYxNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 14 Jun 2022 20:12:35 GMT'
]);

nock('https://jannovak.communication.azure.com:443', {"encodedQueryParams":true})
  .get('/sip')
  .query(true)
  .reply(200, {"trunks":{"test-sbc.foo.bar":{"sipSignalingPort":5678}},"routes":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'HeyTU1btoUC3Fu4Rg2bOTA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'X-Processing-Time',
  '184ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0tOuoYgAAAADbAUht6bZeRrf/4T/SRjspUFJHMDFFREdFMDYxNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 14 Jun 2022 20:12:36 GMT'
]);

nock('https://jannovak.communication.azure.com:443', {"encodedQueryParams":true})
  .patch('/sip', {"trunks":{"test-sbc.foo.bar":null}})
  .query(true)
  .reply(200, {"trunks":{},"routes":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'dczjIZwlikW82qYzjuc+RA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'X-Processing-Time',
  '451ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0tOuoYgAAAABSsUtwwGuJSKiu+C+sCpjoUFJHMDFFREdFMDYxNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 14 Jun 2022 20:12:36 GMT'
]);

nock('https://jannovak.communication.azure.com:443', {"encodedQueryParams":true})
  .patch('/sip', {"trunks":{"test-sbc.foo.bar":{"sipSignalingPort":5678}}})
  .query(true)
  .reply(200, {"trunks":{"test-sbc.foo.bar":{"sipSignalingPort":5678}},"routes":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  '++79o/w6AEiR3zm04Np9Zw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'X-Processing-Time',
  '687ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0tOuoYgAAAACPx4TX+a3RS4GsHvqP51UwUFJHMDFFREdFMDYxNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 14 Jun 2022 20:12:37 GMT'
]);

nock('https://jannovak.communication.azure.com:443', {"encodedQueryParams":true})
  .patch('/sip', {"trunks":{"test-sbc.foo.bar":{"sipSignalingPort":6789}}})
  .query(true)
  .reply(200, {"trunks":{"test-sbc.foo.bar":{"sipSignalingPort":6789}},"routes":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'vojqUdgNdEKEzDSPYnQkVA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'X-Processing-Time',
  '792ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0teuoYgAAAACRPDiu2ge3R47niEScfeRgUFJHMDFFREdFMDYxNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 14 Jun 2022 20:12:38 GMT'
]);

nock('https://jannovak.communication.azure.com:443', {"encodedQueryParams":true})
  .get('/sip')
  .query(true)
  .reply(200, {"trunks":{"test-sbc.foo.bar":{"sipSignalingPort":6789}},"routes":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'lsFMiOINW0uIPAP/EMBzVQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'X-Processing-Time',
  '235ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0tuuoYgAAAADrRYA2mrspSLaZi4AYD5/zUFJHMDFFREdFMDYxNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 14 Jun 2022 20:12:39 GMT'
]);

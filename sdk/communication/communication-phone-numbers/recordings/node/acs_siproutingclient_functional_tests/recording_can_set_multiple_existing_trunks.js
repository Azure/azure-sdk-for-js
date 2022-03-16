let nock = require('nock');

module.exports.hash = "ce1ca365e80a23f45dbbb242db004d38";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://jannovak.communication.azure.com:443', {"encodedQueryParams":true})
  .patch('/sip', {"routes":[]})
  .query(true)
  .reply(200, {"trunks":{"test-one-sbc.foo.bar":{"sipSignalingPort":5678},"test-two-sbc.foo.bar":{"sipSignalingPort":5678}},"routes":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'x2kJA7PbEU+IS89IE6Yrsg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'X-Processing-Time',
  '433ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0ueuoYgAAAABF+e78Rcs+TrS1iiZeIuJSUFJHMDFFREdFMDYxNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 14 Jun 2022 20:12:42 GMT'
]);

nock('https://jannovak.communication.azure.com:443', {"encodedQueryParams":true})
  .get('/sip')
  .query(true)
  .reply(200, {"trunks":{"test-one-sbc.foo.bar":{"sipSignalingPort":5678},"test-two-sbc.foo.bar":{"sipSignalingPort":5678}},"routes":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'FPm3VnP6XE68P6B4v9OVTA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'X-Processing-Time',
  '2294ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0uuuoYgAAAAAINN1OWw60QIzwt99PSBXiUFJHMDFFREdFMDYxNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 14 Jun 2022 20:12:44 GMT'
]);

nock('https://jannovak.communication.azure.com:443', {"encodedQueryParams":true})
  .patch('/sip', {"trunks":{"test-one-sbc.foo.bar":null,"test-two-sbc.foo.bar":null}})
  .query(true)
  .reply(200, {"trunks":{},"routes":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'zcbcwU5vwEK9XRmvJ46PyQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'X-Processing-Time',
  '413ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0vOuoYgAAAADw0o/ofAMXR6WcGT6BLykFUFJHMDFFREdFMDYxNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 14 Jun 2022 20:12:45 GMT'
]);

nock('https://jannovak.communication.azure.com:443', {"encodedQueryParams":true})
  .get('/sip')
  .query(true)
  .reply(200, {"trunks":{},"routes":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'zkanhLCDFE+oxlL+NnEbKQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'X-Processing-Time',
  '241ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0veuoYgAAAACYfcEIYq1UR4sAhBAk8lTeUFJHMDFFREdFMDYxNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 14 Jun 2022 20:12:45 GMT'
]);

nock('https://jannovak.communication.azure.com:443', {"encodedQueryParams":true})
  .patch('/sip', {"trunks":{"test-one-sbc.foo.bar":{"sipSignalingPort":5678},"test-two-sbc.foo.bar":{"sipSignalingPort":5678}}})
  .query(true)
  .reply(200, {"trunks":{"test-one-sbc.foo.bar":{"sipSignalingPort":5678},"test-two-sbc.foo.bar":{"sipSignalingPort":5678}},"routes":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  '70p7J1/RfUanuXeUpElhCQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'X-Processing-Time',
  '749ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0veuoYgAAAACDaMY1QOZ0TbtedpbnIL5RUFJHMDFFREdFMDYxNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 14 Jun 2022 20:12:46 GMT'
]);

nock('https://jannovak.communication.azure.com:443', {"encodedQueryParams":true})
  .get('/sip')
  .query(true)
  .reply(200, {"trunks":{"test-one-sbc.foo.bar":{"sipSignalingPort":5678},"test-two-sbc.foo.bar":{"sipSignalingPort":5678}},"routes":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'MsoDfGqh60mJNTUTe5jxMQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'X-Processing-Time',
  '292ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0vuuoYgAAAACC07KTnTZyQL6WIwZQMWa8UFJHMDFFREdFMDYxNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 14 Jun 2022 20:12:46 GMT'
]);

nock('https://jannovak.communication.azure.com:443', {"encodedQueryParams":true})
  .patch('/sip', {"trunks":{"test-one-sbc.foo.bar":{"sipSignalingPort":6789},"test-two-sbc.foo.bar":{"sipSignalingPort":9876}}})
  .query(true)
  .reply(200, {"trunks":{"test-one-sbc.foo.bar":{"sipSignalingPort":6789},"test-two-sbc.foo.bar":{"sipSignalingPort":9876}},"routes":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'QZLdTuSnhkCZXg8jN7s7Aw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'X-Processing-Time',
  '638ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0v+uoYgAAAABTDYt7Q/hUSZprDQqk51m1UFJHMDFFREdFMDYxNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 14 Jun 2022 20:12:47 GMT'
]);

nock('https://jannovak.communication.azure.com:443', {"encodedQueryParams":true})
  .get('/sip')
  .query(true)
  .reply(200, {"trunks":{"test-one-sbc.foo.bar":{"sipSignalingPort":6789},"test-two-sbc.foo.bar":{"sipSignalingPort":9876}},"routes":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'FbU6886hyE2CPMv7NVhVZQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'X-Processing-Time',
  '182ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0v+uoYgAAAADWls0Rz2guRpRK8qfzaJyvUFJHMDFFREdFMDYxNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 14 Jun 2022 20:12:47 GMT'
]);

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { readFileSync } from 'fs';
import { randomUUID } from 'crypto';
import { createRecorder, createClient } from './utils/recordedClient.js';
import { assert, beforeEach, afterEach, it, describe } from 'vitest';
import { Recorder, isLiveMode, isPlaybackMode } from '@azure-tools/test-recorder';

import {
  FaceClient,
  LivenessResponseBodyOutput,
  isUnexpected,
} from '../../src/index.js';

describe('Session', () => {
  const livenessResponseBodyOutput: LivenessResponseBodyOutput[] = [
    {
      "livenessDecision": "spoofface",
      "target": {
        "faceRectangle": {
          "top": 782,
          "left": 260,
          "width": 858,
          "height": 984
        },
        "fileName": "video.webp",
        "timeOffsetWithinFile": 0,
        "imageType": "Color"
      },
      "modelVersionUsed": "2022-10-15-preview.04"
    },
    {
      "livenessDecision": "spoofface",
      "target": {
        "faceRectangle": {
          "top": 782,
          "left": 260,
          "width": 858,
          "height": 984
        },
        "fileName": "video.webp",
        "timeOffsetWithinFile": 0,
        "imageType": "Color"
      },
      "modelVersionUsed": "2022-10-15-preview.04"
    },
  ];

  let recorder: Recorder;
  let client: FaceClient;

  beforeEach(async context => {
    recorder = await createRecorder(context);
    client = await createClient(recorder);
  });

  afterEach(async () => {
    if (recorder?.recordingId) {
      await recorder.stop();
    }
  });

  it('TestCreateSession', async () => {
    const deviceCorrelationId = recorder.variable('deviceCorrelationId', randomUUID());

    const createLivenessSessionResponse = await client.path('/detectLiveness/singleModal/sessions').post({
      body: {
        livenessOperationMode: 'Passive',
        deviceCorrelationId,
      },
    });
    if (isUnexpected(createLivenessSessionResponse)) {
      throw new Error(createLivenessSessionResponse.body.error.message);
    }
    assert.equal(createLivenessSessionResponse.status, '200');
    assert.isNotEmpty(createLivenessSessionResponse.body.sessionId);
    assert.isNotEmpty(createLivenessSessionResponse.body.authToken);

    const { sessionId } = createLivenessSessionResponse.body;

    const getLivenessSessionResultResponse = await client.path('/detectLiveness/singleModal/sessions/{sessionId}', sessionId).get();
    if (isUnexpected(getLivenessSessionResultResponse)) {
      throw new Error(getLivenessSessionResultResponse.body.error.message);
    }
    assert.equal(getLivenessSessionResultResponse.status, '200');
    assert.equal(getLivenessSessionResultResponse.body.deviceCorrelationId, deviceCorrelationId);

    const deleteLivenessSessionResponse = await client.path('/detectLiveness/singleModal/sessions/{sessionId}', sessionId).delete();
    if (isUnexpected(deleteLivenessSessionResponse)) {
      throw new Error(deleteLivenessSessionResponse.body.error.message);
    }
    assert.equal(deleteLivenessSessionResponse.status, '200');
  });

  it('TestListSessions', async () => {
    const createSession = async () => {
      const deviceCorrelationId = recorder.variable('deviceCorrelationId', randomUUID());
      const createLivenessSessionResponse = await client.path('/detectLiveness/singleModal/sessions').post({
        body: {
          livenessOperationMode: 'Passive',
          deviceCorrelationId,
        },
      });
      if (isUnexpected(createLivenessSessionResponse)) {
        throw new Error(createLivenessSessionResponse.body.error.message);
      }
      assert.equal(createLivenessSessionResponse.status, '200');
      return [createLivenessSessionResponse.body.sessionId, deviceCorrelationId];
    };

    const sessions = Object.fromEntries(await Promise.all([createSession(), createSession()]));
    console.log(sessions);

    const getLivenessSessionsResponse = await client.path('/detectLiveness/singleModal/sessions').get();
    if (isUnexpected(getLivenessSessionsResponse)) {
      throw new Error(getLivenessSessionsResponse.body.error.message);
    }
    assert.equal(getLivenessSessionsResponse.status, '200');
    assert.equal(getLivenessSessionsResponse.body.length, 2);
    for (const livenessSessionItemOutput of getLivenessSessionsResponse.body) {
      assert.isNotEmpty(livenessSessionItemOutput.createdDateTime);
      assert.isAtLeast(livenessSessionItemOutput.authTokenTimeToLiveInSeconds ?? 0, 60);
      assert.isAtMost(livenessSessionItemOutput.authTokenTimeToLiveInSeconds ?? 0, 86400);
      assert.isTrue(livenessSessionItemOutput.id in sessions);
      assert.equal(livenessSessionItemOutput.deviceCorrelationId, sessions[livenessSessionItemOutput.id]);
    }

    await Promise.all(Object.keys(sessions).map(async sessionId => {
      const deleteLivenessSessionResponse = await client.path('/detectLiveness/singleModal/sessions/{sessionId}', sessionId).delete();
      if (isUnexpected(deleteLivenessSessionResponse)) {
        throw new Error(deleteLivenessSessionResponse.body.error.message);
      }
      assert.equal(deleteLivenessSessionResponse.status, '200');
    }));
  });

  it.runIf(isPlaybackMode())('TestGetSessionResult', async () => {
    const deviceCorrelationId = recorder.variable('deviceCorrelationId');
    const sessionId = recorder.variable('sessionId');

    const getLivenessSessionResultResponse = await client.path('/detectLiveness/singleModal/sessions/{sessionId}', sessionId).get();
    if (isUnexpected(getLivenessSessionResultResponse)) {
      throw new Error(getLivenessSessionResultResponse.body.error.message);
    }
    assert.equal(getLivenessSessionResultResponse.status, '200');

    const livenessSessionOutput = getLivenessSessionResultResponse.body;
    assert.equal(livenessSessionOutput.deviceCorrelationId, deviceCorrelationId);
    assert.equal(livenessSessionOutput.id, sessionId);
    assert.equal(livenessSessionOutput.status, 'ResultAvailable');
    assert.equal(livenessSessionOutput.result?.sessionId, sessionId);
    assert.deepEqual(livenessSessionOutput.result?.response.body, livenessResponseBodyOutput[0]);
  });

  it.runIf(isPlaybackMode())('TestGetSessionAuditEntries', async () => {
    const sessionId = recorder.variable('sessionId');

    const getLivenessSessionAuditEntriesResponse = await client.path('/detectLiveness/singleModal/sessions/{sessionId}/audit', sessionId).get();
    if (isUnexpected(getLivenessSessionAuditEntriesResponse)) {
      throw new Error(getLivenessSessionAuditEntriesResponse.body.error.message);
    }
    assert.equal(getLivenessSessionAuditEntriesResponse.status, '200');
    assert.isTrue(getLivenessSessionAuditEntriesResponse.body.every(entry => entry.sessionId === sessionId));
    assert.deepEqual(getLivenessSessionAuditEntriesResponse.body.map(entry => entry.response.body), livenessResponseBodyOutput);
  });

  it('TestDeleteSession', async () => {
    const createLivenessSessionResponse = await client.path('/detectLiveness/singleModal/sessions').post({
      body: {
        livenessOperationMode: 'Passive',
        deviceCorrelationId: recorder.variable('deviceCorrelationId', randomUUID()),
      },
    });
    if (isUnexpected(createLivenessSessionResponse)) {
      throw new Error(createLivenessSessionResponse.body.error.message);
    }
    assert.equal(createLivenessSessionResponse.status, '200');

    const { sessionId } = createLivenessSessionResponse.body;

    const deleteLivenessSessionResponse = await client.path('/detectLiveness/singleModal/sessions/{sessionId}', sessionId).delete();
    if (isUnexpected(deleteLivenessSessionResponse)) {
      throw new Error(deleteLivenessSessionResponse.body.error.message);
    }
    assert.equal(deleteLivenessSessionResponse.status, '200');

    const getLivenessSessionResultResponse = await client.path('/detectLiveness/singleModal/sessions/{sessionId}', sessionId).get();
    if (!isUnexpected(getLivenessSessionResultResponse)) {
      throw new Error(`Session ${sessionId} should not be found.`);
    }
    assert.equal(getLivenessSessionResultResponse.status, '404');
    assert.equal(getLivenessSessionResultResponse.body.error.code, 'SessionNotFound');
  });
});

describe('SessionWithVerify', () => {
  const livenessResponseBodyOutput: LivenessResponseBodyOutput[] = [
    {
      "livenessDecision": "spoofface",
      "target": {
        "faceRectangle": {
          "top": 782,
          "left": 260,
          "width": 858,
          "height": 984
        },
        "fileName": "video.webp",
        "timeOffsetWithinFile": 0,
        "imageType": "Color"
      },
      "modelVersionUsed": "2022-10-15-preview.04",
      "verifyResult": {
        "verifyImage": {
          "faceRectangle": {
            "top": 302,
            "left": 93,
            "width": 601,
            "height": 681
          },
          "qualityForRecognition": "high"
        },
        "matchConfidence": 0.99736166,
        "isIdentical": true
      }
    },
    {
      "livenessDecision": "spoofface",
      "target": {
        "faceRectangle": {
          "top": 782,
          "left": 260,
          "width": 858,
          "height": 984
        },
        "fileName": "video.webp",
        "timeOffsetWithinFile": 0,
        "imageType": "Color"
      },
      "modelVersionUsed": "2022-10-15-preview.04",
      "verifyResult": {
        "verifyImage": {
        "faceRectangle": {
            "top": 302,
            "left": 93,
            "width": 601,
            "height": 681
          },
          "qualityForRecognition": "high"
        },
        "matchConfidence": 0.99736166,
        "isIdentical": true
      }
    },
  ];

  let recorder: Recorder;
  let client: FaceClient;

  beforeEach(async context => {
    recorder = await createRecorder(context);
    client = await createClient(recorder);
  });

  afterEach(async () => {
    if (recorder?.recordingId) {
      await recorder.stop();
    }
  });

  it.skip('TestDeleteAllVerifySessions', async () => {
    const getLivenessSessionsResponse = await client.path('/detectLivenessWithVerify/singleModal/sessions').get();
    if (isUnexpected(getLivenessSessionsResponse)) {
      throw new Error(getLivenessSessionsResponse.body.error.message);
    }
    assert.equal(getLivenessSessionsResponse.status, '200');
    console.log(`Number of sessions: ${getLivenessSessionsResponse.body.length}`);
    const deleteLivenessSessionResponses = await Promise.all(getLivenessSessionsResponse.body.map(livenessSessionItemOutput => client.path('/detectLivenessWithVerify/singleModal/sessions/{sessionId}', livenessSessionItemOutput.id).delete()));
    assert.isTrue(deleteLivenessSessionResponses.every(response => response.status === '200'));
  });

  it('TestCreateVerifySession', async () => {
    const deviceCorrelationId = recorder.variable('deviceCorrelationId', randomUUID());
    const createLivenessSessionResponse = await client.path('/detectLivenessWithVerify/singleModal/sessions').post({
      body: {
        livenessOperationMode: 'Passive',
        deviceCorrelationId,
      },
    });
    if (isUnexpected(createLivenessSessionResponse)) {
      throw new Error(createLivenessSessionResponse.body.error.message);
    }
    assert.equal(createLivenessSessionResponse.status, '200');
    assert.isNotEmpty(createLivenessSessionResponse.body.sessionId);
    assert.isNotEmpty(createLivenessSessionResponse.body.authToken);

    const { sessionId } = createLivenessSessionResponse.body;

    const getLivenessSessionResultResponse = await client.path('/detectLivenessWithVerify/singleModal/sessions/{sessionId}', sessionId).get();
    if (isUnexpected(getLivenessSessionResultResponse)) {
      throw new Error(getLivenessSessionResultResponse.body.error.message);
    }
    assert.equal(getLivenessSessionResultResponse.status, '200');
    assert.equal(getLivenessSessionResultResponse.body.deviceCorrelationId, deviceCorrelationId);

    const deleteLivenessSessionResponse = await client.path('/detectLivenessWithVerify/singleModal/sessions/{sessionId}', sessionId).delete();
    if (isUnexpected(deleteLivenessSessionResponse)) {
      throw new Error(deleteLivenessSessionResponse.body.error.message);
    }
    assert.equal(deleteLivenessSessionResponse.status, '200');
  });

  it.runIf(isLiveMode())('TestCreateVerifySessionWithImage', async () => {
    const deviceCorrelationId = recorder.variable('deviceCorrelationId', randomUUID());
    const createLivenessSessionResponse = await client.path('/detectLivenessWithVerify/singleModal/sessions').post({
      contentType: 'multipart/form-data',
      body: [
        {
            name: 'VerifyImage',
            body: readFileSync('samples-dev/data/detection1.jpg'),
        },
        {
            name: 'Parameters',
            body: {
                livenessOperationMode: 'Passive',
                sendResultsToClient: false,
                authTokenTimeToLiveInSeconds: 60,
                deviceCorrelationId: deviceCorrelationId,
            },
        },
      ],
    });
    if (isUnexpected(createLivenessSessionResponse)) {
      throw new Error(createLivenessSessionResponse.body.error.message);
    }
    assert.equal(createLivenessSessionResponse.status, '200');
    assert.isNotEmpty(createLivenessSessionResponse.body.sessionId);
    assert.isNotEmpty(createLivenessSessionResponse.body.authToken);
    assert.isNotEmpty(createLivenessSessionResponse.body.verifyImage?.faceRectangle);
    assert.isNotEmpty(createLivenessSessionResponse.body.verifyImage?.qualityForRecognition);

    const { sessionId } = createLivenessSessionResponse.body;

    const getLivenessSessionResultResponse = await client.path('/detectLivenessWithVerify/singleModal/sessions/{sessionId}', sessionId).get();
    if (isUnexpected(getLivenessSessionResultResponse)) {
      throw new Error(getLivenessSessionResultResponse.body.error.message);
    }
    assert.equal(getLivenessSessionResultResponse.status, '200');
    assert.equal(getLivenessSessionResultResponse.body.deviceCorrelationId, deviceCorrelationId);

    const deleteLivenessSessionResponse = await client.path('/detectLivenessWithVerify/singleModal/sessions/{sessionId}', sessionId).delete();
    if (isUnexpected(deleteLivenessSessionResponse)) {
      throw new Error(deleteLivenessSessionResponse.body.error.message);
    }
    assert.equal(deleteLivenessSessionResponse.status, '200');
  });

  it('TestListVerifySessions', async () => {
    const createSession = async () => {
      const deviceCorrelationId = recorder.variable('deviceCorrelationId', randomUUID());
      const createLivenessSessionResponse = await client.path('/detectLivenessWithVerify/singleModal/sessions').post({
        body: {
          livenessOperationMode: 'Passive',
          deviceCorrelationId,
        },
      });
      if (isUnexpected(createLivenessSessionResponse)) {
        throw new Error(createLivenessSessionResponse.body.error.message);
      }
      assert.equal(createLivenessSessionResponse.status, '200');
      return [createLivenessSessionResponse.body.sessionId, deviceCorrelationId];
    };

    const sessions = Object.fromEntries(await Promise.all([createSession(), createSession()]));
    console.log(sessions);

    const getLivenessSessionsResponse = await client.path('/detectLivenessWithVerify/singleModal/sessions').get();
    if (isUnexpected(getLivenessSessionsResponse)) {
      throw new Error(getLivenessSessionsResponse.body.error.message);
    }
    assert.equal(getLivenessSessionsResponse.status, '200');
    assert.equal(getLivenessSessionsResponse.body.length, 2);
    for (const livenessSessionItemOutput of getLivenessSessionsResponse.body) {
      assert.isNotEmpty(livenessSessionItemOutput.createdDateTime);
      assert.isAtLeast(livenessSessionItemOutput.authTokenTimeToLiveInSeconds ?? 0, 60);
      assert.isAtMost(livenessSessionItemOutput.authTokenTimeToLiveInSeconds ?? 0, 86400);
      assert.isTrue(livenessSessionItemOutput.id in sessions);
      assert.equal(livenessSessionItemOutput.deviceCorrelationId, sessions[livenessSessionItemOutput.id]);
    }

    await Promise.all(Object.keys(sessions).map(async sessionId => {
      const deleteLivenessSessionResponse = await client.path('/detectLivenessWithVerify/singleModal/sessions/{sessionId}', sessionId).delete();
      if (isUnexpected(deleteLivenessSessionResponse)) {
        throw new Error(deleteLivenessSessionResponse.body.error.message);
      }
      assert.equal(deleteLivenessSessionResponse.status, '200');
    }));
  });

  it.runIf(isPlaybackMode())('TestGetVerifySessionResult', async () => {
    const deviceCorrelationId = recorder.variable('deviceCorrelationId');
    const sessionId = recorder.variable('sessionId');

    const getLivenessSessionResultResponse = await client.path('/detectLivenessWithVerify/singleModal/sessions/{sessionId}', sessionId).get();
    if (isUnexpected(getLivenessSessionResultResponse)) {
      throw new Error(getLivenessSessionResultResponse.body.error.message);
    }
    assert.equal(getLivenessSessionResultResponse.status, '200');

    const livenessSessionOutput = getLivenessSessionResultResponse.body;
    assert.equal(livenessSessionOutput.deviceCorrelationId, deviceCorrelationId);
    assert.equal(livenessSessionOutput.id, sessionId);
    assert.equal(livenessSessionOutput.status, 'ResultAvailable');
    assert.equal(livenessSessionOutput.result?.sessionId, sessionId);
    assert.deepEqual(livenessSessionOutput.result?.response.body, livenessResponseBodyOutput[0]);
  });

  it.runIf(isPlaybackMode())('TestGetVerifySessionAuditEntries', async () => {
    const sessionId = recorder.variable('sessionId');

    const getLivenessSessionAuditEntriesResponse = await client.path('/detectLivenessWithVerify/singleModal/sessions/{sessionId}/audit', sessionId).get();
    if (isUnexpected(getLivenessSessionAuditEntriesResponse)) {
      throw new Error(getLivenessSessionAuditEntriesResponse.body.error.message);
    }
    assert.equal(getLivenessSessionAuditEntriesResponse.status, '200');
    assert.isTrue(getLivenessSessionAuditEntriesResponse.body.every(entry => entry.sessionId === sessionId));
    assert.deepEqual(getLivenessSessionAuditEntriesResponse.body.map(entry => entry.response.body), livenessResponseBodyOutput);
  });

  it('TestDeleteVerifySession', async () => {
    const createLivenessSessionResponse = await client.path('/detectLivenessWithVerify/singleModal/sessions').post({
      body: {
        livenessOperationMode: 'Passive',
        deviceCorrelationId: recorder.variable('deviceCorrelationId', randomUUID()),
      },
    });
    if (isUnexpected(createLivenessSessionResponse)) {
      throw new Error(createLivenessSessionResponse.body.error.message);
    }
    assert.equal(createLivenessSessionResponse.status, '200');

    const { sessionId } = createLivenessSessionResponse.body;

    const deleteLivenessSessionResponse = await client.path('/detectLivenessWithVerify/singleModal/sessions/{sessionId}', sessionId).delete();
    if (isUnexpected(deleteLivenessSessionResponse)) {
      throw new Error(deleteLivenessSessionResponse.body.error.message);
    }
    assert.equal(deleteLivenessSessionResponse.status, '200');

    const getLivenessSessionResultResponse = await client.path('/detectLivenessWithVerify/singleModal/sessions/{sessionId}', sessionId).get();
    if (!isUnexpected(getLivenessSessionResultResponse)) {
      throw new Error(`Session ${sessionId} should not be found.`);
    }
    assert.equal(getLivenessSessionResultResponse.status, '404');
    assert.equal(getLivenessSessionResultResponse.body.error.code, 'SessionNotFound');
  });
});

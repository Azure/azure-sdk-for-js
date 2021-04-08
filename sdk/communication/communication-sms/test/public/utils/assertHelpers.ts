import { assert } from "chai";
import { SmsSendResult } from "../../../src/smsClient";

export const assertIsSuccessResult = (
  actualSmsResult: SmsSendResult,
  expectedRecipient: string
): void => {
  assert.equal(actualSmsResult.httpStatusCode, 202);
  assert.equal(actualSmsResult.to, expectedRecipient);
  assert.isString(actualSmsResult.messageId);
  assert.isTrue(actualSmsResult.successful);
  assert.notExists(actualSmsResult.errorMessage, "no error message for success");
};

export const assertIsFailureResult = (
  actualSmsResult: SmsSendResult,
  expectedRecipient: string,
  expectedErrorMessage: string
): void => {
  assert.equal(actualSmsResult.httpStatusCode, 400);
  assert.equal(actualSmsResult.to, expectedRecipient);
  assert.notExists(actualSmsResult.messageId, "no message id for errors");
  assert.isFalse(actualSmsResult.successful);
  assert.equal(actualSmsResult.errorMessage, expectedErrorMessage);
};

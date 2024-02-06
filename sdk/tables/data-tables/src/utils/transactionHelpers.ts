// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { HeaderConstants, TRANSACTION_HTTP_LINE_ENDING } from "./constants";

/**
 * Builds a transaction change set boundary to be added to the transaction request body
 * @param changesetId - Id of the transaction changeset
 */
export function getChangeSetBoundary(changesetId: string): string {
  return `changeset_${changesetId}`;
}

/**
 * Builds a transaction boundary to be added to the transaction request body
 * @param transactionId - Id of the transaction
 */
export function getTransactionBoundary(transactionId: string): string {
  return `batch_${transactionId}`;
}

/**
 * Returns an initial representation of the Transaction body.
 * @param transactionId - Id of the transaction
 * @param changesetId - Id of the transaction changeset
 */
export function getInitialTransactionBody(transactionId: string, changesetId: string): string[] {
  const transactionBoundary = `batch_${transactionId}`;
  return [
    `--${transactionBoundary}${TRANSACTION_HTTP_LINE_ENDING}${HeaderConstants.CONTENT_TYPE}: multipart/mixed; boundary=changeset_${changesetId}${TRANSACTION_HTTP_LINE_ENDING}${TRANSACTION_HTTP_LINE_ENDING}`,
  ];
}

/**
 * Build the Transaction http request body to send to the service.
 * @param bodyParts - Parts of the transaction body, containing information about the actions to be included in the transaction request
 * @param transactionId - Id of the transaction
 * @param changesetId - Id of the transaction changeset
 */
export function getTransactionHttpRequestBody(
  bodyParts: string[],
  transactionId: string,
  changesetId: string
): string {
  const transactionBoundary = getTransactionBoundary(transactionId);
  const changesetBoundary = getChangeSetBoundary(changesetId);
  const changesetEnding = `--${changesetBoundary}--`;
  const transactionEnding = `--${transactionBoundary}--`;
  const bodyContent = bodyParts.join(TRANSACTION_HTTP_LINE_ENDING);
  return `${bodyContent}${TRANSACTION_HTTP_LINE_ENDING}${changesetEnding}${TRANSACTION_HTTP_LINE_ENDING}${transactionEnding}${TRANSACTION_HTTP_LINE_ENDING}`;
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @param {string} pipelineId
 * @return {string} - the url to get the latest build for the pipeline
 */
export function buildUrl(pipelineId: string): string {
  return `https://dev.azure.com/azure-sdk/internal/_apis/build/builds?definitions=${pipelineId}&$top=1&queryOrder=finishTimeDescending&reasonFilter=schedule&api-version=7.0`;
}
const LIST_BUILDS_URL = "https://dev.azure.com/azure-sdk/internal/_apis/pipelines?api-version=7.0";

export async function getAllDevopsBuilds(authToken: string) {
  const response = await fetch(LIST_BUILDS_URL, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  if (!response.ok) {
    throw new Error(`Error fetching pipelines: ${response.statusText}`);
  }

  const responseText = await response.text();
  try {
    return JSON.parse(responseText);
  } catch {
    console.error(responseText);
    throw new Error(`failed to parse response as json`);
  }
}

export function getBuild(pipelineId: number, authToken: string) {
  return fetch(buildUrl(pipelineId), {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
}
export function getBuildTimeline(buildId: number, authToken: string) {
  return fetch(buildTimelineUrl(buildId), {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
}

/**
 * @param {string} buildId
 * @return {string} - the timeline url for the build
 */
export function buildTimelineUrl(buildId) {
  return `https://dev.azure.com/azure-sdk/internal/_apis/build/builds/${buildId}/Timeline?api-version=7.0`;
}

/**
 *
 * @param {string} label - space separated github labels
 * @param {"bug" | "question"} kind - issue kind
 * @param {string} created - issue created date in ISO format
 * @returns {string} - the github issue link
 */
export function githubIssueLinkUrl(label, kind, created) {
  const minus = kind === "question" ? "bug" : "question";
  return `https://github.com/Azure/azure-sdk-for-js/issues?q=is%3Aopen+is%3Aissue+label%3Acustomer-reported+label%3AClient+-label%3Aissue-addressed+-label%3A${minus}+-label%3Aneeds-author-feedback+-label%3Afeature-request+label%3A%22${label.replace(" ", "+")}%22+created%3A%3C${created}`;
}

/**
 *
 * @param {string} label - space separated github labels
 * @returns {string} - the github issue link
 */
export function githubTotalIssueLink(label) {
  return `https://github.com/Azure/azure-sdk-for-js/issues?q=is%3Aopen+is%3Aissue+label%3Acustomer-reported+label%3AClient+label%3A%22${label.replace(" ", "%20")}%22`;
}

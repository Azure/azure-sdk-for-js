// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export interface ContainerInfo {
  url: string;
}
export type ContainerName = string;
export type Containers = Record<ContainerName, ContainerInfo>;

const sourceContainersSingleDoc = ["source-container1", "source-container2"] as const;
const sourceContainersMultiDocs = ["source-container3"] as const;
const sourceContainersExtra = [
  "source-container4",
  "source-container5",
  "source-container6",
  "source-container7",
  "source-container8",
  "source-container9",
  "source-container10",
  "source-container11",
] as const;
const targetContainers = [
  "target-container1",
  "target-container2",
  "target-container3",
  "target-container4",
  "target-container5",
  "target-container6",
  "target-container7",
  "target-container8",
  "target-container9",
  "target-container10",
  "target-container11",
  "target-container12",
  "target-container13",
  "target-container14",
  "target-container15",
  "target-container16",
  "target-container17",
  "target-container18",
  "target-container19",
  "target-container20",
  "target-container21",
  "target-container22",
  "target-container23",
  "target-container24",
  "target-container25",
  "target-container26",
  "target-container27",
  "target-container28",
  "target-container29",
  "target-container30",
] as const;
export const containerNames = [
  ...sourceContainersSingleDoc,
  ...sourceContainersMultiDocs,
  ...sourceContainersExtra,
  ...targetContainers,
] as const;

export type KnownContainerName = (typeof containerNames)[number];

export type KnownContainers = {
  [K in (typeof containerNames)[number]]: ContainerInfo;
};

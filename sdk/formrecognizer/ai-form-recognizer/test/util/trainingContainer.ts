// Copyright (c) Microsoft Corporation
// Licensed under the MIT license.

const [getTrainingContainerSasUrl, setTrainingContainerSasUrl] = (() => {
  let trainingContainerSasUrl: string | undefined = undefined;

  const getter = (): string => {
    if (trainingContainerSasUrl === undefined) {
      throw new Error(
        "Attempted to retrieve SAS URL for training data container, but it was not defined yet."
      );
    }
    return trainingContainerSasUrl;
  };

  const setter = (sasUrl: string): void => {
    if (trainingContainerSasUrl !== undefined) {
      throw new Error(
        "Attempted to set SAS URL for traning data container, but it was already defined."
      );
    }
    trainingContainerSasUrl = sasUrl;
  };

  return [getter, setter] as const;
})();

export { getTrainingContainerSasUrl, setTrainingContainerSasUrl };

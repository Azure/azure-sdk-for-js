// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License

let customizationState: CustomizationState = {
  originalDir: "",
  customDir: "",
  outDir: "",
};

export interface CustomizationState {
  originalDir: string;
  customDir: string;
  outDir: string;
}

export function getCustomizationState(): CustomizationState {
  return customizationState;
}

export function setCustomizationState(state: CustomizationState): void {
  customizationState = state;
}

export function resetCustomizationState(): void {
  customizationState = {
    originalDir: "",
    customDir: "",
    outDir: "",
  };
}

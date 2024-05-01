// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CompositeMapper } from "../src/interfaces";

export const JobOutput: CompositeMapper = {
  type: {
    name: "Composite",
    className: "JobOutput",
    uberParent: "JobOutput",
    polymorphicDiscriminator: {
      serializedName: "@odata\\.type",
      clientName: "odataType",
    },
    modelProperties: {
      odataType: {
        serializedName: "@odata\\.type",
        required: true,
        type: {
          name: "String",
        },
      },
      error: {
        serializedName: "error",
        type: {
          name: "Composite",
          className: "JobError",
        },
      },
      presetOverride: {
        serializedName: "presetOverride",
        type: {
          name: "Composite",
          className: "Preset",
        },
      },
      state: {
        serializedName: "state",
        readOnly: true,
        type: {
          name: "String",
        },
      },
      progress: {
        serializedName: "progress",
        readOnly: true,
        type: {
          name: "Number",
        },
      },
      label: {
        serializedName: "label",
        type: {
          name: "String",
        },
      },
      startTime: {
        serializedName: "startTime",
        readOnly: true,
        nullable: true,
        type: {
          name: "DateTime",
        },
      },
      endTime: {
        serializedName: "endTime",
        readOnly: true,
        nullable: true,
        type: {
          name: "DateTime",
        },
      },
    },
  },
};

export const JobOutputAsset: CompositeMapper = {
  serializedName: "#Microsoft.Media.JobOutputAsset",
  type: {
    name: "Composite",
    className: "JobOutputAsset",
    uberParent: "JobOutput",
    polymorphicDiscriminator: JobOutput.type.polymorphicDiscriminator,
    modelProperties: {
      ...JobOutput.type.modelProperties,
      assetName: {
        serializedName: "assetName",
        required: true,
        type: {
          name: "String",
        },
      },
    },
  },
};

export const ClipTime: CompositeMapper = {
  type: {
    name: "Composite",
    className: "ClipTime",
    uberParent: "ClipTime",
    polymorphicDiscriminator: {
      serializedName: "@odata\\.type",
      clientName: "odataType",
    },
    modelProperties: {
      odataType: {
        serializedName: "@odata\\.type",
        required: true,
        type: {
          name: "String",
        },
      },
    },
  },
};

export const AbsoluteClipTime: CompositeMapper = {
  serializedName: "#Microsoft.Media.AbsoluteClipTime",
  type: {
    name: "Composite",
    className: "AbsoluteClipTime",
    uberParent: "ClipTime",
    polymorphicDiscriminator: ClipTime.type.polymorphicDiscriminator,
    modelProperties: {
      ...ClipTime.type.modelProperties,
      time: {
        serializedName: "time",
        required: true,
        type: {
          name: "TimeSpan",
        },
      },
    },
  },
};

export const Resource: CompositeMapper = {
  type: {
    name: "Composite",
    className: "Resource",
    modelProperties: {
      id: {
        serializedName: "id",
        readOnly: true,
        type: {
          name: "String",
        },
      },
      name: {
        serializedName: "name",
        readOnly: true,
        type: {
          name: "String",
        },
      },
      type: {
        serializedName: "type",
        readOnly: true,
        type: {
          name: "String",
        },
      },
    },
  },
};

export const ProxyResource: CompositeMapper = {
  type: {
    name: "Composite",
    className: "ProxyResource",
    modelProperties: {
      ...Resource.type.modelProperties,
    },
  },
};

export const Job: CompositeMapper = {
  type: {
    name: "Composite",
    className: "Job",
    modelProperties: {
      ...ProxyResource.type.modelProperties,
      systemData: {
        serializedName: "systemData",
        type: {
          name: "Composite",
          className: "SystemData",
        },
      },
      created: {
        serializedName: "properties.created",
        readOnly: true,
        type: {
          name: "DateTime",
        },
      },
      state: {
        serializedName: "properties.state",
        readOnly: true,
        type: {
          name: "String",
        },
      },
      description: {
        serializedName: "properties.description",
        type: {
          name: "String",
        },
      },
      input: {
        serializedName: "properties.input",
        type: {
          name: "Composite",
          className: "JobInput",
        },
      },
      lastModified: {
        serializedName: "properties.lastModified",
        readOnly: true,
        type: {
          name: "DateTime",
        },
      },
      outputs: {
        serializedName: "properties.outputs",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "JobOutput",
            },
          },
        },
      },
      priority: {
        serializedName: "properties.priority",
        type: {
          name: "String",
        },
      },
      correlationData: {
        serializedName: "properties.correlationData",
        type: {
          name: "Dictionary",
          value: { type: { name: "String" } },
        },
      },
      startTime: {
        serializedName: "properties.startTime",
        readOnly: true,
        nullable: true,
        type: {
          name: "DateTime",
        },
      },
      endTime: {
        serializedName: "properties.endTime",
        readOnly: true,
        nullable: true,
        type: {
          name: "DateTime",
        },
      },
    },
  },
};

export const JobInput: CompositeMapper = {
  type: {
    name: "Composite",
    className: "JobInput",
    uberParent: "JobInput",
    polymorphicDiscriminator: {
      serializedName: "@odata\\.type",
      clientName: "odataType",
    },
    modelProperties: {
      odataType: {
        serializedName: "@odata\\.type",
        required: true,
        type: {
          name: "String",
        },
      },
    },
  },
};

export const JobInputClip: CompositeMapper = {
  serializedName: "#Microsoft.Media.JobInputClip",
  type: {
    name: "Composite",
    className: "JobInputClip",
    uberParent: "JobInput",
    polymorphicDiscriminator: {
      serializedName: "@odata\\.type",
      clientName: "odataType",
    },
    modelProperties: {
      ...JobInput.type.modelProperties,
      files: {
        serializedName: "files",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "String",
            },
          },
        },
      },
      start: {
        serializedName: "start",
        type: {
          name: "Composite",
          className: "ClipTime",
        },
      },
      end: {
        serializedName: "end",
        type: {
          name: "Composite",
          className: "ClipTime",
        },
      },
      label: {
        serializedName: "label",
        type: {
          name: "String",
        },
      },
      inputDefinitions: {
        serializedName: "inputDefinitions",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "InputDefinition",
            },
          },
        },
      },
    },
  },
};

export const JobInputAsset: CompositeMapper = {
  serializedName: "#Microsoft.Media.JobInputAsset",
  type: {
    name: "Composite",
    className: "JobInputAsset",
    uberParent: "JobInput",
    polymorphicDiscriminator: JobInput.type.polymorphicDiscriminator,
    modelProperties: {
      ...JobInputClip.type.modelProperties,
      assetName: {
        serializedName: "assetName",
        required: true,
        type: {
          name: "String",
        },
      },
    },
  },
};

export const JobInputSequence: CompositeMapper = {
  serializedName: "#Microsoft.Media.JobInputSequence",
  type: {
    name: "Composite",
    className: "JobInputSequence",
    uberParent: "JobInput",
    polymorphicDiscriminator: JobInput.type.polymorphicDiscriminator,
    modelProperties: {
      ...JobInput.type.modelProperties,
      inputs: {
        serializedName: "inputs",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "JobInputClip",
            },
          },
        },
      },
    },
  },
};

export const JobInputs: CompositeMapper = {
  serializedName: "#Microsoft.Media.JobInputs",
  type: {
    name: "Composite",
    className: "JobInputs",
    uberParent: "JobInput",
    polymorphicDiscriminator: JobInput.type.polymorphicDiscriminator,
    modelProperties: {
      ...JobInput.type.modelProperties,
      inputs: {
        serializedName: "inputs",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "JobInput",
            },
          },
        },
      },
    },
  },
};

export const discriminators = {
  JobInput: JobInput,
  JobOutput: JobOutput,
  "JobOutput.#Microsoft.Media.JobOutputAsset": JobOutputAsset,
  ClipTime: ClipTime,
  "ClipTime.#Microsoft.Media.AbsoluteClipTime": AbsoluteClipTime,
  "JobInput.#Microsoft.Media.JobInputClip": JobInputClip,
  "JobInput.#Microsoft.Media.JobInputs": JobInputs,
  "JobInput.#Microsoft.Media.JobInputSequence": JobInputSequence,
  "JobInput.#Microsoft.Media.JobInputAsset": JobInputAsset,
};

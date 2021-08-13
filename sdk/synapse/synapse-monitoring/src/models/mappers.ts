// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import * as coreHttp from "@azure/core-http";

export const SparkJobListViewResponse: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "SparkJobListViewResponse",
    modelProperties: {
      nJobs: {
        serializedName: "nJobs",
        type: {
          name: "Number"
        }
      },
      sparkJobs: {
        serializedName: "sparkJobs",
        nullable: true,
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "SparkJob"
            }
          }
        }
      }
    }
  }
};

export const SparkJob: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "SparkJob",
    modelProperties: {
      state: {
        serializedName: "state",
        type: {
          name: "String"
        }
      },
      name: {
        serializedName: "name",
        type: {
          name: "String"
        }
      },
      submitter: {
        serializedName: "submitter",
        type: {
          name: "String"
        }
      },
      compute: {
        serializedName: "compute",
        type: {
          name: "String"
        }
      },
      sparkApplicationId: {
        serializedName: "sparkApplicationId",
        type: {
          name: "String"
        }
      },
      livyId: {
        serializedName: "livyId",
        type: {
          name: "String"
        }
      },
      timing: {
        serializedName: "timing",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "String"
            }
          }
        }
      },
      sparkJobDefinition: {
        serializedName: "sparkJobDefinition",
        nullable: true,
        type: {
          name: "String"
        }
      },
      pipeline: {
        serializedName: "pipeline",
        nullable: true,
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "SparkJob"
            }
          }
        }
      },
      jobType: {
        serializedName: "jobType",
        type: {
          name: "String"
        }
      },
      submitTime: {
        serializedName: "submitTime",
        nullable: true,
        type: {
          name: "DateTime"
        }
      },
      endTime: {
        serializedName: "endTime",
        nullable: true,
        type: {
          name: "DateTime"
        }
      },
      queuedDuration: {
        serializedName: "queuedDuration",
        type: {
          name: "String"
        }
      },
      runningDuration: {
        serializedName: "runningDuration",
        type: {
          name: "String"
        }
      },
      totalDuration: {
        serializedName: "totalDuration",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const SqlQueryStringDataModel: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "SqlQueryStringDataModel",
    modelProperties: {
      query: {
        serializedName: "query",
        type: {
          name: "String"
        }
      }
    }
  }
};

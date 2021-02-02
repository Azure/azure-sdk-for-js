// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import * as coreHttp from "@azure/core-http";

export const SparkBatchJobCollection: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "SparkBatchJobCollection",
    modelProperties: {
      from: {
        serializedName: "from",
        required: true,
        type: {
          name: "Number"
        }
      },
      total: {
        serializedName: "total",
        required: true,
        type: {
          name: "Number"
        }
      },
      sessions: {
        serializedName: "sessions",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "SparkBatchJob"
            }
          }
        }
      }
    }
  }
};

export const SparkBatchJob: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "SparkBatchJob",
    modelProperties: {
      livyInfo: {
        serializedName: "livyInfo",
        type: {
          name: "Composite",
          className: "SparkBatchJobState"
        }
      },
      name: {
        serializedName: "name",
        type: {
          name: "String"
        }
      },
      workspaceName: {
        serializedName: "workspaceName",
        type: {
          name: "String"
        }
      },
      sparkPoolName: {
        serializedName: "sparkPoolName",
        type: {
          name: "String"
        }
      },
      submitterName: {
        serializedName: "submitterName",
        type: {
          name: "String"
        }
      },
      submitterId: {
        serializedName: "submitterId",
        type: {
          name: "String"
        }
      },
      artifactId: {
        serializedName: "artifactId",
        type: {
          name: "String"
        }
      },
      jobType: {
        serializedName: "jobType",
        type: {
          name: "String"
        }
      },
      result: {
        serializedName: "result",
        type: {
          name: "String"
        }
      },
      scheduler: {
        serializedName: "schedulerInfo",
        type: {
          name: "Composite",
          className: "SparkScheduler"
        }
      },
      plugin: {
        serializedName: "pluginInfo",
        type: {
          name: "Composite",
          className: "SparkServicePlugin"
        }
      },
      errors: {
        serializedName: "errorInfo",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "SparkServiceError"
            }
          }
        }
      },
      tags: {
        serializedName: "tags",
        type: {
          name: "Dictionary",
          value: { type: { name: "String" } }
        }
      },
      id: {
        serializedName: "id",
        required: true,
        type: {
          name: "Number"
        }
      },
      appId: {
        serializedName: "appId",
        nullable: true,
        type: {
          name: "String"
        }
      },
      appInfo: {
        serializedName: "appInfo",
        nullable: true,
        type: {
          name: "Dictionary",
          value: { type: { name: "String" } }
        }
      },
      state: {
        serializedName: "state",
        type: {
          name: "String"
        }
      },
      logLines: {
        serializedName: "log",
        nullable: true,
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "String"
            }
          }
        }
      }
    }
  }
};

export const SparkBatchJobState: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "SparkBatchJobState",
    modelProperties: {
      notStartedAt: {
        serializedName: "notStartedAt",
        nullable: true,
        type: {
          name: "DateTime"
        }
      },
      startingAt: {
        serializedName: "startingAt",
        nullable: true,
        type: {
          name: "DateTime"
        }
      },
      runningAt: {
        serializedName: "runningAt",
        nullable: true,
        type: {
          name: "DateTime"
        }
      },
      deadAt: {
        serializedName: "deadAt",
        nullable: true,
        type: {
          name: "DateTime"
        }
      },
      successAt: {
        serializedName: "successAt",
        nullable: true,
        type: {
          name: "DateTime"
        }
      },
      terminatedAt: {
        serializedName: "killedAt",
        nullable: true,
        type: {
          name: "DateTime"
        }
      },
      recoveringAt: {
        serializedName: "recoveringAt",
        nullable: true,
        type: {
          name: "DateTime"
        }
      },
      currentState: {
        serializedName: "currentState",
        type: {
          name: "String"
        }
      },
      jobCreationRequest: {
        serializedName: "jobCreationRequest",
        type: {
          name: "Composite",
          className: "SparkRequest"
        }
      }
    }
  }
};

export const SparkRequest: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "SparkRequest",
    modelProperties: {
      name: {
        serializedName: "name",
        type: {
          name: "String"
        }
      },
      file: {
        serializedName: "file",
        type: {
          name: "String"
        }
      },
      className: {
        serializedName: "className",
        type: {
          name: "String"
        }
      },
      arguments: {
        serializedName: "args",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "String"
            }
          }
        }
      },
      jars: {
        serializedName: "jars",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "String"
            }
          }
        }
      },
      pythonFiles: {
        serializedName: "pyFiles",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "String"
            }
          }
        }
      },
      files: {
        serializedName: "files",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "String"
            }
          }
        }
      },
      archives: {
        serializedName: "archives",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "String"
            }
          }
        }
      },
      configuration: {
        serializedName: "conf",
        type: {
          name: "Dictionary",
          value: { type: { name: "String" } }
        }
      },
      driverMemory: {
        serializedName: "driverMemory",
        type: {
          name: "String"
        }
      },
      driverCores: {
        serializedName: "driverCores",
        type: {
          name: "Number"
        }
      },
      executorMemory: {
        serializedName: "executorMemory",
        type: {
          name: "String"
        }
      },
      executorCores: {
        serializedName: "executorCores",
        type: {
          name: "Number"
        }
      },
      executorCount: {
        serializedName: "numExecutors",
        type: {
          name: "Number"
        }
      }
    }
  }
};

export const SparkScheduler: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "SparkScheduler",
    modelProperties: {
      submittedAt: {
        serializedName: "submittedAt",
        nullable: true,
        type: {
          name: "DateTime"
        }
      },
      scheduledAt: {
        serializedName: "scheduledAt",
        nullable: true,
        type: {
          name: "DateTime"
        }
      },
      endedAt: {
        serializedName: "endedAt",
        nullable: true,
        type: {
          name: "DateTime"
        }
      },
      cancellationRequestedAt: {
        serializedName: "cancellationRequestedAt",
        nullable: true,
        type: {
          name: "DateTime"
        }
      },
      currentState: {
        serializedName: "currentState",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const SparkServicePlugin: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "SparkServicePlugin",
    modelProperties: {
      preparationStartedAt: {
        serializedName: "preparationStartedAt",
        nullable: true,
        type: {
          name: "DateTime"
        }
      },
      resourceAcquisitionStartedAt: {
        serializedName: "resourceAcquisitionStartedAt",
        nullable: true,
        type: {
          name: "DateTime"
        }
      },
      submissionStartedAt: {
        serializedName: "submissionStartedAt",
        nullable: true,
        type: {
          name: "DateTime"
        }
      },
      monitoringStartedAt: {
        serializedName: "monitoringStartedAt",
        nullable: true,
        type: {
          name: "DateTime"
        }
      },
      cleanupStartedAt: {
        serializedName: "cleanupStartedAt",
        nullable: true,
        type: {
          name: "DateTime"
        }
      },
      currentState: {
        serializedName: "currentState",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const SparkServiceError: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "SparkServiceError",
    modelProperties: {
      message: {
        serializedName: "message",
        type: {
          name: "String"
        }
      },
      errorCode: {
        serializedName: "errorCode",
        type: {
          name: "String"
        }
      },
      source: {
        serializedName: "source",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const SparkBatchJobOptions: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "SparkBatchJobOptions",
    modelProperties: {
      tags: {
        serializedName: "tags",
        type: {
          name: "Dictionary",
          value: { type: { name: "String" } }
        }
      },
      artifactId: {
        serializedName: "artifactId",
        type: {
          name: "String"
        }
      },
      name: {
        serializedName: "name",
        required: true,
        type: {
          name: "String"
        }
      },
      file: {
        serializedName: "file",
        required: true,
        type: {
          name: "String"
        }
      },
      className: {
        serializedName: "className",
        type: {
          name: "String"
        }
      },
      arguments: {
        serializedName: "args",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "String"
            }
          }
        }
      },
      jars: {
        serializedName: "jars",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "String"
            }
          }
        }
      },
      pythonFiles: {
        serializedName: "pyFiles",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "String"
            }
          }
        }
      },
      files: {
        serializedName: "files",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "String"
            }
          }
        }
      },
      archives: {
        serializedName: "archives",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "String"
            }
          }
        }
      },
      configuration: {
        serializedName: "conf",
        type: {
          name: "Dictionary",
          value: { type: { name: "String" } }
        }
      },
      driverMemory: {
        serializedName: "driverMemory",
        type: {
          name: "String"
        }
      },
      driverCores: {
        serializedName: "driverCores",
        type: {
          name: "Number"
        }
      },
      executorMemory: {
        serializedName: "executorMemory",
        type: {
          name: "String"
        }
      },
      executorCores: {
        serializedName: "executorCores",
        type: {
          name: "Number"
        }
      },
      executorCount: {
        serializedName: "numExecutors",
        type: {
          name: "Number"
        }
      }
    }
  }
};

export const SparkSessionCollection: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "SparkSessionCollection",
    modelProperties: {
      from: {
        serializedName: "from",
        required: true,
        type: {
          name: "Number"
        }
      },
      total: {
        serializedName: "total",
        required: true,
        type: {
          name: "Number"
        }
      },
      sessions: {
        serializedName: "sessions",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "SparkSession"
            }
          }
        }
      }
    }
  }
};

export const SparkSession: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "SparkSession",
    modelProperties: {
      livyInfo: {
        serializedName: "livyInfo",
        type: {
          name: "Composite",
          className: "SparkSessionState"
        }
      },
      name: {
        serializedName: "name",
        type: {
          name: "String"
        }
      },
      workspaceName: {
        serializedName: "workspaceName",
        type: {
          name: "String"
        }
      },
      sparkPoolName: {
        serializedName: "sparkPoolName",
        type: {
          name: "String"
        }
      },
      submitterName: {
        serializedName: "submitterName",
        type: {
          name: "String"
        }
      },
      submitterId: {
        serializedName: "submitterId",
        type: {
          name: "String"
        }
      },
      artifactId: {
        serializedName: "artifactId",
        type: {
          name: "String"
        }
      },
      jobType: {
        serializedName: "jobType",
        type: {
          name: "String"
        }
      },
      result: {
        serializedName: "result",
        type: {
          name: "String"
        }
      },
      scheduler: {
        serializedName: "schedulerInfo",
        type: {
          name: "Composite",
          className: "SparkScheduler"
        }
      },
      plugin: {
        serializedName: "pluginInfo",
        type: {
          name: "Composite",
          className: "SparkServicePlugin"
        }
      },
      errors: {
        serializedName: "errorInfo",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "SparkServiceError"
            }
          }
        }
      },
      tags: {
        serializedName: "tags",
        type: {
          name: "Dictionary",
          value: { type: { name: "String" } }
        }
      },
      id: {
        serializedName: "id",
        required: true,
        type: {
          name: "Number"
        }
      },
      appId: {
        serializedName: "appId",
        nullable: true,
        type: {
          name: "String"
        }
      },
      appInfo: {
        serializedName: "appInfo",
        nullable: true,
        type: {
          name: "Dictionary",
          value: { type: { name: "String" } }
        }
      },
      state: {
        serializedName: "state",
        type: {
          name: "String"
        }
      },
      logLines: {
        serializedName: "log",
        nullable: true,
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "String"
            }
          }
        }
      }
    }
  }
};

export const SparkSessionState: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "SparkSessionState",
    modelProperties: {
      notStartedAt: {
        serializedName: "notStartedAt",
        nullable: true,
        type: {
          name: "DateTime"
        }
      },
      startingAt: {
        serializedName: "startingAt",
        nullable: true,
        type: {
          name: "DateTime"
        }
      },
      idleAt: {
        serializedName: "idleAt",
        nullable: true,
        type: {
          name: "DateTime"
        }
      },
      deadAt: {
        serializedName: "deadAt",
        nullable: true,
        type: {
          name: "DateTime"
        }
      },
      shuttingDownAt: {
        serializedName: "shuttingDownAt",
        nullable: true,
        type: {
          name: "DateTime"
        }
      },
      terminatedAt: {
        serializedName: "killedAt",
        nullable: true,
        type: {
          name: "DateTime"
        }
      },
      recoveringAt: {
        serializedName: "recoveringAt",
        nullable: true,
        type: {
          name: "DateTime"
        }
      },
      busyAt: {
        serializedName: "busyAt",
        nullable: true,
        type: {
          name: "DateTime"
        }
      },
      errorAt: {
        serializedName: "errorAt",
        nullable: true,
        type: {
          name: "DateTime"
        }
      },
      currentState: {
        serializedName: "currentState",
        type: {
          name: "String"
        }
      },
      jobCreationRequest: {
        serializedName: "jobCreationRequest",
        type: {
          name: "Composite",
          className: "SparkRequest"
        }
      }
    }
  }
};

export const SparkSessionOptions: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "SparkSessionOptions",
    modelProperties: {
      tags: {
        serializedName: "tags",
        type: {
          name: "Dictionary",
          value: { type: { name: "String" } }
        }
      },
      artifactId: {
        serializedName: "artifactId",
        type: {
          name: "String"
        }
      },
      name: {
        serializedName: "name",
        required: true,
        type: {
          name: "String"
        }
      },
      file: {
        serializedName: "file",
        type: {
          name: "String"
        }
      },
      className: {
        serializedName: "className",
        type: {
          name: "String"
        }
      },
      arguments: {
        serializedName: "args",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "String"
            }
          }
        }
      },
      jars: {
        serializedName: "jars",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "String"
            }
          }
        }
      },
      pythonFiles: {
        serializedName: "pyFiles",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "String"
            }
          }
        }
      },
      files: {
        serializedName: "files",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "String"
            }
          }
        }
      },
      archives: {
        serializedName: "archives",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "String"
            }
          }
        }
      },
      configuration: {
        serializedName: "conf",
        type: {
          name: "Dictionary",
          value: { type: { name: "String" } }
        }
      },
      driverMemory: {
        serializedName: "driverMemory",
        type: {
          name: "String"
        }
      },
      driverCores: {
        serializedName: "driverCores",
        type: {
          name: "Number"
        }
      },
      executorMemory: {
        serializedName: "executorMemory",
        type: {
          name: "String"
        }
      },
      executorCores: {
        serializedName: "executorCores",
        type: {
          name: "Number"
        }
      },
      executorCount: {
        serializedName: "numExecutors",
        type: {
          name: "Number"
        }
      }
    }
  }
};

export const SparkStatementCollection: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "SparkStatementCollection",
    modelProperties: {
      total: {
        serializedName: "total_statements",
        required: true,
        type: {
          name: "Number"
        }
      },
      statements: {
        serializedName: "statements",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "SparkStatement"
            }
          }
        }
      }
    }
  }
};

export const SparkStatement: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "SparkStatement",
    modelProperties: {
      id: {
        serializedName: "id",
        required: true,
        type: {
          name: "Number"
        }
      },
      code: {
        serializedName: "code",
        type: {
          name: "String"
        }
      },
      state: {
        serializedName: "state",
        type: {
          name: "String"
        }
      },
      output: {
        serializedName: "output",
        type: {
          name: "Composite",
          className: "SparkStatementOutput"
        }
      }
    }
  }
};

export const SparkStatementOutput: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "SparkStatementOutput",
    modelProperties: {
      status: {
        serializedName: "status",
        type: {
          name: "String"
        }
      },
      executionCount: {
        serializedName: "execution_count",
        required: true,
        type: {
          name: "Number"
        }
      },
      data: {
        serializedName: "data",
        type: {
          name: "any"
        }
      },
      errorName: {
        serializedName: "ename",
        nullable: true,
        type: {
          name: "String"
        }
      },
      errorValue: {
        serializedName: "evalue",
        nullable: true,
        type: {
          name: "String"
        }
      },
      traceback: {
        serializedName: "traceback",
        nullable: true,
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "String"
            }
          }
        }
      }
    }
  }
};

export const SparkStatementOptions: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "SparkStatementOptions",
    modelProperties: {
      code: {
        serializedName: "code",
        type: {
          name: "String"
        }
      },
      kind: {
        serializedName: "kind",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const SparkStatementCancellationResult: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "SparkStatementCancellationResult",
    modelProperties: {
      message: {
        serializedName: "msg",
        type: {
          name: "String"
        }
      }
    }
  }
};

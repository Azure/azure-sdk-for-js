---
inject: true
to: <%= fullServicePath %>/ci.yml
after: pr:\n  branches:\n.*\n.*\n.*\n.*\n.*\n  paths:\n[ ]{4}include:\n[ ]{6}- sdk\/template\/.*
---
      # eng/common code changes trigger template pipeline for basic checking.
      - eng/common/
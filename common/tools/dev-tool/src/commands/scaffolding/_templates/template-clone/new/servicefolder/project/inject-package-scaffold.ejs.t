---
inject: true
to: "<%= name === 'template' ? `${fullProjectPath}/package.json` : null %>"
after: unit-test\"
skip_if: scaffold-template
---
    ,"scaffold-template": "dev-tool scaffolding template-clone --force=true --name=template --service-folder=template --tracing-namespace='Microsoft.Learn' --version='1.0.11-beta.1' --package-description='Example project for learning how to build a client library' --product-name='Azure Template'"

## Fetch Parameters from AWS SSM parameter store for Github Actions

Fetch parameters from AWS SSM parameter store. And export environment variables for github workflows

## Usage

```yaml
- name: Configure AWS credentials
  uses: aws-actions/configure-aws-credentials@v1
  with:
    aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
    aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
    aws-region: <<YOUR_S3_REGION>>
- name: Fetch paramters from AWS SSM parameter store
  uses: oneyedev/aws-fetch-ssm-parameter-store@v1
- name: Use environment variables in below steps
  run: |
    echo "$ENV_VARIABLE"
```

## Input Params

```yml
inputs:
  path:
    description: 'Path in parameter store, Default is root(/)'
    required: false
    default: '/'
  recursive:
    description: 'Fetch all nested parameters'
    required: false
    default: 'false'
  replacePathWithEmpty:
    description: 'Replace path string with empty string for relative path usage'
    required: false
    default: 'false'
  mask:
    description: 'Masked from Logs'
    required: false
    default: 'false'
```

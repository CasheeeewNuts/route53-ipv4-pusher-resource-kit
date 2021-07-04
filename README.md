# Route53-IPv4-Pusher-Resource-Kit

It is defined in TypeScript + AWS CDK, including IAM roles, Lambda, API Gateway  
for Route53-IPv4-Pusher

## Usage
### !!! Required configure your AWS account in AWS CLI !!!
clone this repository, execute next command
```shell
npm i
cp .env.example .env
vi .env
# HOSTED_ZONE_ID=your_target_hosted_zone_id
```
or
```shell
echo HOSTED_ZONE_ID=your_target_hosted_zone_id > .env
```

then
```shell
cdk deploy # create resources to your AWS account
```



import * as cdk from '@aws-cdk/core';
import * as apiGateway from "@aws-cdk/aws-apigateway"
import {NodejsFunction} from "@aws-cdk/aws-lambda-nodejs"
import "dotenv/config"
import {createExecutionRole} from "./route53-ipv4-pusher-role";


export class Route53Ipv4PusherResourceKitStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const {HOSTED_ZONE_ID} = process.env

        if (HOSTED_ZONE_ID == null) throw 'HOSTED_ZONE_ID environment variable was not set'

        const lambdaFunction: NodejsFunction = new NodejsFunction(this, 'Pusher', {
            entry: "src/aws/lambda/index.ts",
            environment: {
                HOSTED_ZONE_ID: HOSTED_ZONE_ID
            },
            role: createExecutionRole(this)
        })

        const gateway: apiGateway.RestApi = new apiGateway.RestApi(this, 'PusherGateway')
        const apiKey: apiGateway.ApiKey = new apiGateway.ApiKey(this, 'PusherAPIKey', {
            apiKeyName: 'PusherAPIKey',
            enabled: true
        })

        gateway.addUsagePlan('PusherUsagePlan', {
            name: 'PusherUsagePlan',
            apiKey: apiKey,
            throttle: {
                rateLimit: 10,
                burstLimit: 100
            }
        }).addApiStage({stage: gateway.deploymentStage})

        gateway.root.addMethod('POST', new apiGateway.LambdaIntegration(lambdaFunction), {
            apiKeyRequired: true
        })
    }
}

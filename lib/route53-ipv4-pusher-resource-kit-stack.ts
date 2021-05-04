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

        const lambdaFunction: NodejsFunction = new NodejsFunction(this, 'ipv4PushFunction', {
            entry: "src/aws/lambda/index.ts",
            environment: {
                HOSTED_ZONE_ID: HOSTED_ZONE_ID
            },
            role: createExecutionRole(this)
        })

        const gateway: apiGateway.RestApi = new apiGateway.RestApi(this, 'ipv4PusherGateway')

        gateway.root.addMethod('POST', new apiGateway.LambdaIntegration(lambdaFunction))
    }
}

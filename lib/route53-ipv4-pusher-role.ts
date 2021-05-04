import * as cdk from "@aws-cdk/core";
import * as iam from "@aws-cdk/aws-iam"


export function createExecutionRole(scope: cdk.Construct): iam.IRole {
    const AWSLambdaBasicExecutionRolePolicy: iam.IManagedPolicy = iam.ManagedPolicy.fromManagedPolicyArn(scope, 'PusherBasicRole', 'arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole')
    const AmazonRoute53FullAccessPolicy: iam.IManagedPolicy = iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonRoute53FullAccess')

    const role: iam.Role = new iam.Role(scope, 'PusherRole', {
        assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
    })

    role.addManagedPolicy(AWSLambdaBasicExecutionRolePolicy)
    role.addManagedPolicy(AmazonRoute53FullAccessPolicy)

    return role
}


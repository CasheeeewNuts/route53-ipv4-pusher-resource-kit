import * as cdk from "@aws-cdk/core";
import * as iam from "@aws-cdk/aws-iam"

export function createExecutionRole(scope: cdk.Construct): iam.IRole {
    const AmazonRoute53FullAccessPolicy = iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonRoute53FullAccess')

    const role = new iam.Role(scope, 'ipv4PushRole', {
        assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
    })

    role.addManagedPolicy(AmazonRoute53FullAccessPolicy)

    return role
}


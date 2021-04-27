import * as AWS from "aws-sdk"

type Props = {
    ip: string,
    domainName: string,
    hostedZoneId: string,
    route53: AWS.Route53
}

export async function changeARecord({ip, domainName, hostedZoneId, route53}: Props): Promise<AWS.Route53.ChangeResourceRecordSetsResponse> {
    const params: AWS.Route53.ChangeResourceRecordSetsRequest = {
        ChangeBatch: {
            Changes: [{
                Action: "UPSERT",
                ResourceRecordSet: {
                    Name: domainName,
                    ResourceRecords: [
                        {
                            Value: ip
                        }
                    ],
                    TTL: 60,
                    Type: "A"
                }
            }]
        },
        HostedZoneId: hostedZoneId
    }

    return await route53.changeResourceRecordSets(params).promise()
}
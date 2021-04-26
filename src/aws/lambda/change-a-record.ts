import * as AWS from "aws-sdk"

export async function changeARecord(ip: string): Promise<AWS.Route53.ChangeResourceRecordSetsResponse> {
    const route53 = new AWS.Route53()
    const params: AWS.Route53.ChangeResourceRecordSetsRequest = {
        ChangeBatch: {
            Changes: [{
                Action: "UPSERT",
                ResourceRecordSet: {
                    Name: "",
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
        HostedZoneId: ""
    }

    return await route53.changeResourceRecordSets(params).promise()
}
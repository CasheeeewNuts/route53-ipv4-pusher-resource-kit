import {APIGatewayProxyEvent, APIGatewayEventRequestContext, APIGatewayProxyResult} from "aws-lambda";
import {changeARecord} from "./change-a-record";

export async function handler(event: APIGatewayProxyEvent, context: APIGatewayEventRequestContext): Promise<APIGatewayProxyResult> {
    try {
        if (event.body == null || event.body === '') {
            return {
                statusCode: 400,
                body: 'Error: illegal request(empty body)'
            }
        }

        const {domainName} = JSON.parse(event.body)

        if (domainName == null || domainName.length === 0) {
            return {
                statusCode: 400,
                body: 'Error: illegal request(domain name is empty)'
            }
        }

        const {sourceIp: clientIp} = context.identity
        const {HOSTED_ZONE_ID} = process.env

        if (HOSTED_ZONE_ID == null) throw 'Error: target hosted zone id is undefined'

        return await changeARecord(clientIp, domainName, HOSTED_ZONE_ID)
            .then(() => ({
                statusCode: 200,
                body: ''
            }))

    } catch (e) {
        return {
            statusCode: 500,
            body: e
        }
    }
}
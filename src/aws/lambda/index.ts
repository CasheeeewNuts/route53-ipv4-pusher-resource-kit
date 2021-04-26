import {APIGatewayProxyEvent, APIGatewayEventRequestContext, APIGatewayProxyResult} from "aws-lambda";
import {changeARecord} from "./change-a-record";

export async function handler(event: APIGatewayProxyEvent, context: APIGatewayEventRequestContext): Promise<APIGatewayProxyResult> {
    const {sourceIp: clientIp} = context.identity

    try {
        return await changeARecord(clientIp)
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
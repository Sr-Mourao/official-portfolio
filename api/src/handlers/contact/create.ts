import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { prismaClientDatabase } from '../../database'
import { handlerError, handlerCreated } from '../../utils/response'
// import { sendEmail } from '../../service/sendEmail'

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const body = JSON.parse(event.body!);

    if (!body) return handlerError(400, "contact is required")

    try {
        await prismaClientDatabase.contact.create({
            data: body
        })
        // await sendEmail(body)
        return handlerCreated({})
    } catch (error) {
        console.error(error)
        return handlerError(500, "Internal Server Error")
    }
}
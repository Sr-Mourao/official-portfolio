import { APIGatewayProxyResult } from "aws-lambda"

export const handlerError = (statusCode: number, message: string): APIGatewayProxyResult => ({
    statusCode,
    headers: getHeaders(),
    body: JSON.stringify({ message })
})

export const handlerSuccess = (result: any): APIGatewayProxyResult => ({
    statusCode: 200,
    headers: getHeaders(),
    body: JSON.stringify(result)
})

export const handlerNoContent = (): APIGatewayProxyResult => ({
    statusCode: 204,
    headers: getHeaders(),
    body: JSON.stringify({})
})

export const handlerCreated = (result: any): APIGatewayProxyResult => ({
    statusCode: 201,
    headers: getHeaders(),
    body: JSON.stringify(result)
})

export const getHeaders = () => {
    return {
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Methods': 'HEAD,OPTIONS,POST,GET,PATCH,PUT',
    }
}
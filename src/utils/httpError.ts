class HttpError extends Error {
    constructor(message:string, statusCode:any) {
        super(message)
this.statusCode = statusCode
    }
}

export default HttpError;
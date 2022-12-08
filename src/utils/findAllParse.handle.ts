const findAllParse = (model: any) => {
    let response: any = JSON.stringify(model, null, 2)
    response = JSON.parse(response)
    return response;
}

export { findAllParse }
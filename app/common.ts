export function unwrap(value: any, errorMessage = 'unwrap !!!!!!!!!!!!!!! Value is not defined') {
    if (!value) {
        // throw new Error(errorMessage);
        console.error(errorMessage)
    }
    return value;
}

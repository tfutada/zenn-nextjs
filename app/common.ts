export function unwrap(value: any, errorMessage = '!!! Value is not defined') {
    if (!value) {
        throw new Error(errorMessage);
    }
    return value;
}

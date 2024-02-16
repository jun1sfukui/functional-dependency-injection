// Functional Dependency Injection
export const FDI = {
    // Function container
    functions: [],
    // Get the required function
    getRequiredFunction(functionInfo) {
        // If the argument is an object, get the first property name of the object
        const functionName = ((type) => {
            switch (type) {
                case 'object':
                    return Object.keys(functionInfo)[0];
                case 'string':
                    return functionInfo;
                default:
                    return null;
            }
        })(typeof functionInfo);

        // Get the function from the container
        const func = this.functions[functionName];
        // If the function does not exist, throw an error
        if (!func) {
            throw new Error(`Function not found: ${functionName}`);
        }

        // The arguments of the retrieved function are dependency-injected functions, so recursively get them
        const args = getFunctionArguments(func).map(arg => this.getRequiredFunction(arg));
        // Execute the dependency-injected function
        return func(...args);
    }
}

// Get the argument names of a function
function getFunctionArguments(func) {
    var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
    var ARGUMENT_NAMES = /([^\s,]+)/g;
    var fnStr = func.toString().replace(STRIP_COMMENTS, '');
    var arrowIndex = fnStr.indexOf('=>');
    var parenIndex = fnStr.indexOf('(');
    var result;
    if (arrowIndex !== -1 && arrowIndex < parenIndex) {
        result = fnStr.slice(arrowIndex + 2, fnStr.indexOf('=>', arrowIndex + 2)).match(ARGUMENT_NAMES);
    } else {
        result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
    }
    if (result === null)
        result = [];
    return result;
}

export default FDI;
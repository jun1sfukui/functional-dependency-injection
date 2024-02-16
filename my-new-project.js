function sayHello(getResourceString, name) {
    const hello = getResourceString('Hello');
    return `${hello}, ${name}!`;
}

export default {
    sayHello,
}
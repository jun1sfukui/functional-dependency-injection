# FunctionalDependencyInjection

FunctionalDependencyInjection is a JavaScript library that brings the power of Dependency Injection to functional programming.

## Usage

### Your sample functions
```javascript
// sample-mylib.js
// Retrieving the current language
export function getLanguage() {
    // Actually retrieve from browser language settings, etc.
    return 'fr';
}

// Retrieving internationalized string resources
export function getResource(language) {
    return {
        'en': {
            'Hello': 'Hello',
        },
        'ja': {
            'Hello': 'こんにちは'
        },
        'fr': {
            'Hello': 'Bonjour'
        },
    }[language];
}

// Retrieving a string with the specified message ID from resources
export function getResourceString(resource, messageId) {
    return resource[messageId];
}

export default {
    getResource,
    getLanguage,
    getResourceString
}
```

### Register your functions to the functional DI container
```javascript
// fdi.js
import { FDI } from './functional-dependency-injection.js';
import { getLanguage, getResource, getResourceString } from './sample-mylib.js';

// add functions to the DI container
FDI.addFunction('getLanguage', () => () => SampleMyLib.getLanguage());
FDI.addFunction('getResource', (getLanguage) => () => SampleMyLib.getResource(getLanguage()));
FDI.addFunction('getResourceString', (getResource) => (messageId) => SampleMyLib.getResourceString(getResource(), messageId));

export default FDI;
```

### Register your new project function 'sayHello' to the container
```javascript
// Your new project 'Say Hello'
function sayHello(getResourceString, name) {
    const hello = getResourceString('Hello');
    return `${hello}, ${name}!`;
}

// Add the project function to the container
FDI.addFunctions('sayHello'], (getResourceString) => (name) => sayHello(getResourceString, name));

// Run the project 'Say Hello'
function main() {
    const sayHello = FDI.getRequiredFunction('sayHello');
    const hello = sayHello('Jun-ichi');
    console.log(hello); // Bonjour, Jun-ichi!
}

main();
```

## License
[MIT](https://choosealicense.com/licenses/mit/)
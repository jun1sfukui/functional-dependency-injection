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

// Register functions in the DI container
FDI.functions['getLanguage'] = () => () => getLanguage();
FDI.functions['getResource'] = (getLanguage) => () => getResource(getLanguage());
FDI.functions['getResourceString'] = (getResource) => (messageId) => getResourceString(getResource(), messageId);

export default FDI;
```

## License
[MIT](https://choosealicense.com/licenses/mit/)
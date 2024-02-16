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
import { FDI } from './functional-dependency-injection.js';
import { getLanguage, getResource, getResourceString } from './sample-mylib.js';

// Register functions in the DI container
FDI.functions['getLanguage'] = () => () => getLanguage();
FDI.functions['getResource'] = (getLanguage) => () => getResource(getLanguage());
FDI.functions['getResourceString'] = (getResource) => (messageId) => getResourceString(getResource(), messageId);

export default FDI;
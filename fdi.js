import { FDI } from './functional-dependency-injection.js';
import SampleMyLib from './sample-mylib.js';
import MyNewProject from './my-new-project.js';

// Register sample-my-lib in the DI container
function registerSampleMyLib(FDI) {
    FDI.addFunction('getLanguage', () => () => SampleMyLib.getLanguage());
    FDI.addFunction('getResource', (getLanguage) => () => SampleMyLib.getResource(getLanguage()));
    FDI.addFunction('getResourceString', (getResource) => (messageId) => SampleMyLib.getResourceString(getResource(), messageId));
}

// Register my-new-project in the DI container
function registerMyNewProject(FDI) {
    FDI.addFunction('sayHello', (getResourceString) => (name) => MyNewProject.sayHello(getResourceString, name));
}

registerSampleMyLib(FDI);
registerMyNewProject(FDI);

export default FDI;
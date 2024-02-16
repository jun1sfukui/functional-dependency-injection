import { FDI } from './functional-dependency-injection.js';
import SampleMyLib from './sample-mylib.js';
import MyNewProject from './my-new-project.js';

// Register sample-my-lib in the DI container
function registerSampleMyLib(FDI) {
    FDI.functions['getLanguage'] = () => () => SampleMyLib.getLanguage();
    FDI.functions['getResource'] = (getLanguage) => () => SampleMyLib.getResource(getLanguage());
    FDI.functions['getResourceString'] = (getResource) => (messageId) => SampleMyLib.getResourceString(getResource(), messageId);
}

// Register my-new-project in the DI container
function registerMyNewProject(FDI) {
    FDI.functions['sayHello'] = (getResourceString) => (name) => MyNewProject.sayHello(getResourceString, name);
}

registerSampleMyLib(FDI);
registerMyNewProject(FDI);

export default FDI;
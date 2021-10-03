import { descriptor as echoDescriptor } from './echo';
import { CommandDescriptorBase } from '../commandDescriptorBase';
import { tags as tagsDescriptor, tag as tagDescriptor } from './tags';
import { miscPicker, oPhasenPicker, startPicker, subjectPicker } from './rolesMessage';

type CommandDescriptor = CommandDescriptorBase & { idMappings: Map<string, string> };

export const commands: CommandDescriptor[] = [
    echoDescriptor,
    tagDescriptor,
    tagsDescriptor,
    oPhasenPicker,
    startPicker,
    subjectPicker,
    miscPicker,
].map((descriptor) => {
    return { ...descriptor, idMappings: new Map<string, string>() };
});

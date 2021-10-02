import { descriptor as echoDescriptor } from './echo';
import { CommandDescriptorBase } from '../commandDescriptorBase';
import { tags as tagsDescriptor, tag as tagDescriptor } from './tags';

type CommandDescriptor = CommandDescriptorBase & { idMappings: Map<string, string> };

export const commands: CommandDescriptor[] = [echoDescriptor, tagDescriptor, tagsDescriptor].map(
    (descriptor) => {
        return { ...descriptor, idMappings: new Map<string, string>() };
    }
);

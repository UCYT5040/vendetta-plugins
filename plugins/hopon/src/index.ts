import { logger } from "@vendetta";
import FindStoreByName from "@vendor/metro";
import {ReactNative, FluxDispatcher} from "@vendetta/metro/common";
import Settings from "./Settings";

const SelectedChannelStore = FindStoreByName("SelectedChannelStore");
const Linking = ReactNative.Linking;

function on_message(event) {
    if (event.message.content && event.channelId === SelectedChannelStore.getChannelId()) {
        const message = event.message.content;
        const match = message.match(/hop on ([\w-]+)/);
        if (match) {
            const packageName = match[1];
            Linking.canOpenURL(packageName).then(supported => {
                if (!supported) {
                    logger.log(`Cannot open ${packageName}`);
                } else {
                    return Linking.openURL(packageName);
                }
            }).catch(err => logger.log(`Error opening ${packageName}: ${err}`));
        }
    }
}


export default {
    onLoad: () => {
        FluxDispatcher.subscribe("MESSAGE_CREATE", on_message);
    },
    onUnload: () => {
        FluxDispatcher.unsubscribe("MESSAGE_CREATE", on_message);
    },
    settings: Settings,
}
(function(e,i,l,t,g){"use strict";const{FormText:f}=g.Forms;function d(){return React.createElement(f,null,"Hello, world! This settings menu is coming soon!")}const h=l("SelectedChannelStore"),s=t.ReactNative.Linking;function u(o){if(o.message.content&&o.channelId===h.getChannelId()){const a=o.message.content.match(/hop on ([\w-]+)/);if(a){const n=a[1];s.canOpenURL(n).then(function(c){if(!c)i.logger.log(`Cannot open ${n}`);else return s.openURL(n)}).catch(function(c){return i.logger.log(`Error opening ${n}: ${c}`)})}}}var E={onLoad:function(){t.FluxDispatcher.subscribe("MESSAGE_CREATE",u)},onUnload:function(){t.FluxDispatcher.unsubscribe("MESSAGE_CREATE",u)},settings:d};return e.default=E,Object.defineProperty(e,"__esModule",{value:!0}),e})({},vendetta,r,vendetta.metro.common,vendetta.ui.components);

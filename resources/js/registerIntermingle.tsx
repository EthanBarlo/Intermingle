export default function registerIntermingle(type: string, name: string, component: any) {
    if(!window.Intermingle || !window.Intermingle.initialized){
        console.error("Intermingle is not initialized")
        return;
    }

    window.Intermingle.components[name] = {
        type,
        component
    };
}
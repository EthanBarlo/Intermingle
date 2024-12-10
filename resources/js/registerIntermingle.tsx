export default function registerIntermingle(type: string, name: string, component: any) {
    if(!window.Intermingle){
        throw new Error("Intermingle is not initialized")
    }

    window.Intermingle.components[name] = {
        type,
        component
    };
}
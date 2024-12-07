export default function registerIntermingle(type: string, name: string, component: any) {
    if(!window.IntermingleComponents){
        window.IntermingleComponents = {}
    }

    window.IntermingleComponents[name] = {
        type,
        component
    };
}
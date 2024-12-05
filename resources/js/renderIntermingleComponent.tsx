export default function renderIntermingleComponent(livewireComponent: LivewireComponent, intermingleComponentName: string): CleanupCallback {

    if(!window.Intermingle || !window.Intermingle.initialized){
        console.error("Intermingle is not initialized")
        return () => {};
    }

    const intermingleComponent = window.Intermingle.components[intermingleComponentName]
        
    if (!intermingleComponent) {
        console.error(`Intermingle component "${intermingleComponentName}" not found`)
        return () => {};
    }

    let props = {}
    const propsAttr = livewireComponent.el.getAttribute('x-intermingle-props')
    if (propsAttr) {
        try {
            props = JSON.parse(propsAttr)
        } catch (e) {
            console.error('Failed to parse x-intermingle-props:', e)
        }
    }

    const intermingleRenderer = window.Intermingle.renderers[intermingleComponent.type];

    if(!intermingleRenderer){
        console.error(`Intermingle renderer for "${intermingleComponent.type}" not found`)
        return () => {};
    }

    return intermingleRenderer(livewireComponent, intermingleComponent.component, props)
}
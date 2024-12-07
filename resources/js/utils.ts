export function getComponentName(el: HTMLElement){
    return el.dataset.intermingleComponent;
}

export function getProps(el: HTMLElement){
    let props = el.dataset.intermingleProps
    if (props) {
        try {
            props = JSON.parse(props)
        } catch (e) {
            console.error('Failed to parse data-intermingle-props:', e)
        }
    }
    return props;
}

export function getComponent(name: string){
    const component = window.IntermingleComponents?.[name];
    if(!component){
        throw new Error(`Intermingle component "${name}" not found`)
    }
    return component;
}

export function setRenderedComponent(livewire_id: string, renderedComponent: RenderedComponent){
    if(!window.Intermingle){
        throw new Error("Intermingle is not initialized")
    }
    window.Intermingle.renderedComponents[livewire_id] = renderedComponent;
}

export function getRenderedComponent(livewire_id: string){
    const renderedComponent = window.Intermingle?.renderedComponents[livewire_id];
    if(!renderedComponent){
        throw new Error(`Intermingle rendered component "${livewire_id}" not found`)
    }
    return renderedComponent;
}

export function getRenderer(type: string){
    const renderer = window.Intermingle?.renderers[type];
    if(!renderer){
        throw new Error(`Intermingle renderer for "${type}" not found`)
    }
    return renderer;
}
import { getComponent, getProps, getRenderer } from "./utils";

export default function renderIntermingleComponent(livewireComponent: LivewireComponent, intermingleComponentName: string): RenderedComponent {
    if(!window.Intermingle){
        throw new Error("Intermingle is not initialized")
    }
    
    const intermingleComponent = getComponent(intermingleComponentName);
    const props = getProps(livewireComponent.el);
    const intermingleRenderer = getRenderer(intermingleComponent.type);

    const renderedComponent = intermingleRenderer(intermingleComponentName, livewireComponent, intermingleComponent.component, props);

    return renderedComponent;
}
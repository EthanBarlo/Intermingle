import { getComponent, getProps, getRenderer } from "./utils";

/**
 *  This function attempts to render the intermingle component, sometimes the component has not been registered yet
 *  so we need to defer the rendering until all other scripts have been loaded.
 *  If needed we could add a delay, and increase the number of attempts.
 */

export default async function renderIntermingleComponent(livewireComponent: LivewireComponent, componentName: string, attempt: number = 0): Promise<RenderedComponent> {
    if(!window.Intermingle){
        throw new Error("Intermingle is not initialized")
    }

    const { renderAttempts, renderDelay } = window.Intermingle.config;

    try{
        const { type, component } = getComponent(componentName);
        const renderComponent = getRenderer(type);

        const props = getProps(livewireComponent.el);
        return renderComponent(componentName, livewireComponent, component, props);
    } catch (e){
        if(attempt < renderAttempts){
            await new Promise(resolve => setTimeout(resolve, renderDelay));
            return renderIntermingleComponent(livewireComponent, componentName, attempt + 1);
        }
        throw new Error("Error rendering intermingle component after " + attempt + " attempts: " + e)
    }
}

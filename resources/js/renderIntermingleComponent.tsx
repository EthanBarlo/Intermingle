import { getComponent, getProps, getRenderer } from "./utils";

/**
 *  This function attempts to render the intermingle component, sometimes the component has not been registered yet
 *  so we need to defer the rendering until all other scripts have been loaded.
 *  If needed we could add a delay, and increase the number of attempts.
 */

export default async function renderIntermingleComponent(livewireComponent: LivewireComponent, intermingleComponentName: string, attempt: number = 0): Promise<RenderedComponent> {
    if(!window.Intermingle){
        throw new Error("Intermingle is not initialized")
    }

    const { renderAttempts, renderDelay } = window.Intermingle.config;

    try{
        const intermingleComponent = getComponent(intermingleComponentName);
        const props = getProps(livewireComponent.el);
        const renderComponent = getRenderer(intermingleComponent.type);

        return renderComponent(intermingleComponentName, livewireComponent, intermingleComponent.component, props);
    } catch (e){
        if(attempt < renderAttempts){
            await new Promise(resolve => setTimeout(resolve, renderDelay));
            return renderIntermingleComponent(livewireComponent, intermingleComponentName, attempt + 1);
        }
        throw new Error("Error rendering intermingle component after " + attempt + " attempts: " + e)
    }
}

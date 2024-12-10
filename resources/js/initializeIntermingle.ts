import renderIntermingleComponent from "./renderIntermingleComponent";
import { getComponentName, getProps, getRenderedComponent, setRenderedComponent } from "./utils";


export default async function initializeIntermingle(Livewire: any, config: Config){
    const { 
        renderers, 
        renderAttempts = 1, 
        renderDelay = 0
    } = config;

    window.Intermingle = {
        components: {},
        renderedComponents: {},
        config: {
            renderers: initializeRenderers(renderers),
            renderAttempts,
            renderDelay
        }
    }

    // Allows us to render an intermingle component utilizing livewires lifecycle
    Livewire.hook('component.init', async ({ component, cleanup }) => {
        const intermingleComponentName = getComponentName(component.el)
        
        if (intermingleComponentName === null || intermingleComponentName === undefined) {
            return; // Not an intermingle component
        }

        try{
            const renderedComponent = await renderIntermingleComponent(component, intermingleComponentName);
            setRenderedComponent(component.id, renderedComponent);
            cleanup(() => renderedComponent.cleanup());
        } catch (e) {
            throw new Error("Error rendering intermingle component: " + e)
        }
    });

    // Allows us to update the props of a rendered component
    // Making the component reactive to livewire changes after its initial render
    Livewire.hook('morph.updated', ({ el, component }) => {
        try {
            const intermingleRenderedComponent = getRenderedComponent(component.id);
            let props = getProps(component.el);
            intermingleRenderedComponent.updateProps(component, props);
        } catch (e) {
            return; // Not an intermingle rendered component
        }
    })
}

function initializeRenderers(renderers: IntermingleRenderer[]): {[key: string]: RenderFunction}{
    const renderersMap = {};
    renderers.forEach((renderer) => {
        renderersMap[renderer.type] = renderer.renderComponent;
    });
    return renderersMap;
}

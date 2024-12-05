import renderIntermingleComponent from "./renderIntermingleComponent";

export default function initializeIntermingle(Livewire:any, renderers: IntermingleRenderer[]){
    Livewire.hook('component.init', ({ component, cleanup }) => {
        const intermingleComponentName = component.el.getAttribute('x-intermingle')
        
        if (intermingleComponentName === null) {
            return; // Not an intermingle component
        }

        const cleanupComponent = renderIntermingleComponent(component, intermingleComponentName);
        cleanup(() => cleanupComponent());
    });

    window.Intermingle = {
        initialized: true,
        components: {},
        renderers: initializeRenderers(renderers)
    }
}

function initializeRenderers(renderers: IntermingleRenderer[]){
    const renderersMap = {};
    renderers.forEach((renderer) => {
        renderersMap[renderer.type] = renderer.renderComponent;
    });
    return renderersMap;
}
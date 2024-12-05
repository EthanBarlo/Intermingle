import { createContext, useContext } from "react";

const LivewireContext = createContext<LivewireComponent | null>(null);

export default LivewireContext;

export const useLivewire = () => {
    const livewire = useContext(LivewireContext);
    if(!livewire){
        throw new Error("useLivewire must be used within the LivewireContext");
    }
    
    return livewire;
}; 
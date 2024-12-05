import React from 'react';
import { useLivewire } from './contexts/LivewireContext';

interface IComponent{
    
}
const Component: React.FC<IComponent> = ({}) => {
    const { $wire } = useLivewire();

    return (
        <div>
            <h1>Intermingle Template</h1>
        </div>
    )
};

export default Component;
<?php

namespace EthanBarlo\Intermingle;

use Livewire\Component as LivewireComponent;

abstract class Component extends LivewireComponent
{
    abstract public function component(): string;

    abstract public function props(): array;

    public function render()
    {
        return view('intermingle::livewire.component');
    }
}

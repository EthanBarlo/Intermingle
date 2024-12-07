<?php

namespace EthanBarlo\Intermingle\Contracts;

interface HasIntermingles
{
    public function component(): string;

    public function props(): array;
}

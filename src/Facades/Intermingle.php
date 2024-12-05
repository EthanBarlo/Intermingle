<?php

namespace EthanBarlo\Intermingle\Facades;

use Illuminate\Support\Facades\Facade;

/**
 * @see \EthanBarlo\Intermingle\Intermingle
 */
class Intermingle extends Facade
{
    protected static function getFacadeAccessor(): string
    {
        return \EthanBarlo\Intermingle\Intermingle::class;
    }
}

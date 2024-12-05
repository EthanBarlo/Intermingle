<?php

namespace EthanBarlo\Intermingle;

use EthanBarlo\Intermingle\Commands\IntermingleCommand;
use Spatie\LaravelPackageTools\Package;
use Spatie\LaravelPackageTools\PackageServiceProvider;

class IntermingleServiceProvider extends PackageServiceProvider
{
    public function configurePackage(Package $package): void
    {
        /*
         * This class is a Package Service Provider
         *
         * More info: https://github.com/spatie/laravel-package-tools
         */
        $package
            ->name('intermingle')
            ->hasConfigFile()
            ->hasViews()
            ->hasMigration('create_intermingle_table')
            ->hasCommand(IntermingleCommand::class);
    }
}

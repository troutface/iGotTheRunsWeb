import { BrowserModule } from '@angular/platform-browser';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { MATERIAL_MODULES } from './material.modules';

@NgModule({
  imports: [
    MATERIAL_MODULES,
    ],
  exports: [
    MATERIAL_MODULES,
  ],
  declarations: [
  ],
})
export class SharedModule {
  /* Providers are added here so they are only added to root DI injector */
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
      ],
    };
  }
}

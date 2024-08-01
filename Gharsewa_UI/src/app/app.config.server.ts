import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering()
  ]
};
export const environment = {
  production: false,
  ignoreSSL: true
};

export const config = mergeApplicationConfig(appConfig, serverConfig);

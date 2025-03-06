import { ApplicationConfig, NgModule, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    ////provideHttpClient(withInterceptorsFromDi()) ,
    // provideClientHydration(withEventReplay())
    provideHttpClient(),
    // provideClientHydration()
  ]
};
  
@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    // מודולים נוספים
  ],
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    // ספקים נוספים
  ]
})
export class AppModule { }

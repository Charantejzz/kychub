import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AmlComponent } from './aml/aml.component';
import { OnboardingComponent } from './onboarding/onboarding.component';

const routes: Routes = [
   {path: 'home',component: AmlComponent},
   {path: 'aml',component: AmlComponent},
   {path: 'onboarding',component: OnboardingComponent},
   {path: 'settings',component: AmlComponent},
   {path: 'reports',component: AmlComponent},
   {path: 'risk',component: AmlComponent},
   {path: 'billing',component: AmlComponent},
   {path: 'faqs',component: AmlComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

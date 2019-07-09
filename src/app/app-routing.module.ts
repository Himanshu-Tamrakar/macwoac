import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'macwoac', loadChildren: () => import(`./macwoac/macwoac.module`).then(m => m.MacwoacModule) },
  { path: '', redirectTo: 'macwoac', pathMatch: 'full' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

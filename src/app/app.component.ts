import { Component } from '@angular/core';
import { RouterOutlet, RouterModule, RouterLink, RouterLinkActive } from '@angular/router';
import { FeatureModule } from './feature/feature.module';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FeatureModule, RouterModule, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'assignment1';
}

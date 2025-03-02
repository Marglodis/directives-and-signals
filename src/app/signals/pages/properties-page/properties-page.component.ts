import { Component } from '@angular/core';

@Component({
  standalone: false,
  templateUrl: './properties-page.component.html',
  styleUrl: './properties-page.component.css'
})
export class PropertiesPageComponent {

  onFieldUpdated( value: string, field: string ) {
    console.log({value, field});
  }

}

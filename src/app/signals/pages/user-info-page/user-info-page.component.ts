import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { UserServiceService } from '../../services/user-service.service';
import { User } from '../../interfaces/user-request.interface';

@Component({
  standalone: false,
  templateUrl: './user-info-page.component.html',
  styleUrl: './user-info-page.component.css'
})
export class UserInfoPageComponent implements OnInit {
  
  private userService = inject(UserServiceService);
  
  public userId = signal(1);
  
  public currentuser = signal<User | undefined>(undefined);
  
  public userWasFound = signal(true);

  public fullName = computed<string>(() => {
    if( !this.currentuser() ) return 'Usuario no encontrado';
    
    return `${ this.currentuser()?.first_name } ${ this.currentuser()?.last_name }`
  });
  
  ngOnInit(): void {
    this.loadUser(this.userId());
  }

  loadUser(id: number) {
    if( id <= 0 ) return;

    this.userId.set(id);
    this.currentuser.set(undefined); // Esto para que el usuario tnga la sensación de que se está cargando el nuevo usuario en cada actualziación

    this.userService.getUserById(id)
    .subscribe({
      next: user => {
        this.currentuser.set(user);
        this.userWasFound.set(true);
      },
      error: () => {
        this.currentuser.set(undefined);
        this.userWasFound.set(false);
      }
    });
  }
}

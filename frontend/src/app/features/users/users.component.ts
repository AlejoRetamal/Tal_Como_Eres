import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService, User  } from '../../core/services/user.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  newUser: User = { name: '', email: '' };
  editingUser: User | null = null;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAll().subscribe(users => this.users = users);
  }

  create() {
    this.userService.create(this.newUser).subscribe(() => {
      this.newUser = { name: '', email: '' };
      this.loadUsers();
    });
  }

  edit(user: User) {
    this.editingUser = { ...user };
  }

  update() {
    if (!this.editingUser?.id) return;
    this.userService.update(this.editingUser.id, this.editingUser).subscribe(() => {
      this.editingUser = null;
      this.loadUsers();
    });
  }

  remove(id: number) {
    this.userService.remove(id).subscribe(() => this.loadUsers());
  }
}
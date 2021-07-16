import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { User } from '../../users.models';
import { UsersService } from '../../users.service';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.sass']
})
export class UserDeleteComponent implements OnInit {

  @Input() user?: User;

  constructor(
    private usersService: UsersService,
    private activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
  }

  close(user?: User) {
    this.activeModal.close(user);
  }

  delete() {

    if(this.user?.id){
      this.usersService
      .delete(this.user.id)
      .subscribe(() => this.close(this.user));
    }
    
  }

}

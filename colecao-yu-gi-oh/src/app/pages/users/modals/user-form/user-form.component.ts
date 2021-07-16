import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { USER_TYPES } from '../../users.constants';
import { User, UserType } from '../../users.models';
import { UsersService } from '../../users.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.sass']
})
export class UserFormComponent implements OnInit, OnDestroy {

  @Input() user?: User = {};

  get userTypes() {

    return Object
      .values(UserType)
      .map(value => {
        return {
          label: USER_TYPES[value],
          value: value,
        }
      });
  }

  public userForm = new FormGroup({
    id: new FormControl(null),
    login: new FormControl(null, [Validators.required]),
    name: new FormControl(null),
    type: new FormControl(null),
  });

  public showFeedbackOnlyPlay = false;

  private subscriptions = new Subscription();


  constructor(
    private usersService: UsersService,
    private activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.loadForm();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  loadForm() {
    if (this.user) {
      this.userForm.patchValue(this.user);
    }

    this.onChangeType();
  }

  close(user?: User) {
    this.activeModal.close(user);
  }

  submit() {
    const user: User = this.userForm.value;

    debugger;

    if (this.userForm.invalid) {
      return;
    }

    this.usersService
      .save(user)
      .subscribe((user) => this.close(user));
  }

  onChangeType() {

    const onChange$ = this.userForm
      .get('type')?.valueChanges
      .subscribe((value) => this.showFeedbackOnlyPlay = value === UserType.Duelist);

    this.subscriptions.add(onChange$);
  }
}
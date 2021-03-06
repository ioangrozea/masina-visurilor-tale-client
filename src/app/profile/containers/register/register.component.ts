import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AccountRegister, ProfileRegister} from "../../model/register";
import {ProfileApiService} from "../../http";
import {Router} from "@angular/router";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  hide = true;
  accountRegister: AccountRegister;
  profileRegister: ProfileRegister;


  constructor(private profileApiService: ProfileApiService,
              private router: Router) {
  }

  public registerForm = new FormGroup({
    userName: new FormControl('',),
    password: new FormControl('',),
    profileName: new FormControl('',),
    profileType: new FormControl('',),
    profileDescription: new FormControl('',),
  });

  register() {
    this.profileApiService.registerAccount(this.accountRegister).subscribe((data) => {
      this.profileRegister.user_id = data['data'].AccountId;
      this.profileApiService.registerProfile(this.profileRegister).subscribe(() => {
        this.router.navigate(['/login']);
      });
    })

  }

  ngOnInit(): void {
    this.registerForm.valueChanges.subscribe((next) => {
      this.accountRegister = new AccountRegister(next.userName, next.password, next.password);
      this.profileRegister = new ProfileRegister(next.profileName, next.profileType);
    })
  }
}

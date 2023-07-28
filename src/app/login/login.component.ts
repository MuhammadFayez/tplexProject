import { HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public form!: FormGroup;
  submitted = false;
  constructor(
    private authenticationService: AuthService,
    private fb : FormBuilder,
  ) {}

  ngOnInit(): void {

    this.form = this.fb.group(
      {
        email: ['nilson@email.com', [Validators.required, Validators.email]],
        password: [
          'nilson',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(10)
          ]
        ]
      }
    );


  }


  onSubmit(): void {
    localStorage.clear();
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
    else{
      const body = new HttpParams()
      .set('email', this.form.get('email')?.value)
      .set('password', this.form.get('password')?.value)

      this.authenticationService.login(body);

    }

  }


  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

}

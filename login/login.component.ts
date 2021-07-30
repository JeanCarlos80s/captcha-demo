import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  captchaForm: FormGroup;
  public captcha = new Array();
  public theCaptcha: string = '';
  public isValid: boolean = false;

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.generateCaptcha();

    this.captchaForm = this.fb.group({
      captcha: [''],
      reCaptcha: ['', [Validators.required]],
    });
  }

  reset() {
    this.isValid = false;
    this.captchaForm.patchValue({
      reCaptcha: ''
    })

    this.generateCaptcha();
  }

  generateCaptcha() {
    const activeCaptcha = document.getElementById("captcha");

    let q = 0;

    for (q = 0; q < 6; q++) {
      if (q % 2 == 0) {
        this.captcha[q] = String.fromCharCode(Math.floor(Math.random() * 26 + 65));
      } else {
        this.captcha[q] = Math.floor(Math.random() * 10 + 0);
      }
    }

    this.theCaptcha = this.captcha.join("");
    activeCaptcha.innerHTML = `${this.theCaptcha}`;
  }

  matchCaptcha() {
    const errCaptcha = document.getElementById("errCaptcha");
    const recaptcha = this.captchaForm.get('reCaptcha').value;

    let validateCaptcha = 0;

    for (var z = 0; z < 6; z++) {
      if (recaptcha.charAt(z) != this.captcha[z]) {
        validateCaptcha++;
      }
    }

    if (recaptcha == "") {
      errCaptcha.innerHTML = "Re-Captcha deve ser preenchido";
      this.isValid = false;
    } else if (validateCaptcha > 0 || recaptcha.length > 6) {
      errCaptcha.innerHTML = "Captcha Errada";
      this.isValid = false;
    } else {
      this.isValid = true;
      errCaptcha.innerHTML = "Ok";
    }

    if (!this.isValid) {
      this.reset();
    }
  }

}

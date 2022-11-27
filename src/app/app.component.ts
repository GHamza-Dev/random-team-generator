import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  newMember = '';
  members: string[] = [];
  errorMessage: string = '';

  onInput(memberInput: string){
    this.newMember = memberInput;
  }

  addMember(){
    if (this.newMember === '') {
      this.errorMessage = "Please enter a member name!";
      return;
    }

    this.members.push(this.newMember);
    this.newMember = '';
    this.errorMessage = '';
  }
}

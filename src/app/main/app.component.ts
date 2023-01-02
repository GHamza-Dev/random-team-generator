import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'my-app';
  newMember = '';
  members: string[] = [];
  errorMessage: string = '';
  numberOfTeams: number = 0;
  generatedTeams: string[][] = [];

  onInput(memberInput: string) {
    this.newMember = memberInput;
  }

  setNumberOfTeams(nbrOfTeams: string) {
    this.numberOfTeams = parseInt(nbrOfTeams);
  }

  addMember() {
    this.resetErrorMessage();
    // console.log('add', this.members);

    if (this.newMember === '') {
      this.errorMessage = 'Please enter a member name!';
      return;
    }

    this.members.push(this.newMember);
    this.newMember = '';
  }

  deleteMember(index: number) {
    if (index == 0 || index == this.members.length - 1) {
      this.members.splice(index, index + 1);
    } else {
      this.members.splice(index, index - 1);
    }

    // console.log('before', this.numberOfTeams);
    if (this.numberOfTeams > this.members.length) {
      this.numberOfTeams--;
      // console.log('inside', this.numberOfTeams);
    }
    this.generateTeams(false);
    // console.log('after', this.numberOfTeams);

    // console.log(this.members);
    // console.log(index);
  }

  generateTeams(check: boolean) {
    this.resetErrorMessage();

    if (check) {
      if (!this.inputIsValid()) {
        return;
      }
    }

    // console.log('inside');

    let numberOfMembersForEachTeam = Math.floor(
      this.members.length / this.numberOfTeams
    );

    this.resetGeneratedTeams();

    let team: string[] = [];
    let tmpMembers = [...this.members];
    let rand = 0;

    // not fixed yet
    for (let i = 0; i < this.numberOfTeams; i++) {
      for (let j = 0; j < numberOfMembersForEachTeam; j++) {
        rand = this.random(tmpMembers.length) - 1;
        let member = tmpMembers.splice(rand, 1)[0];
        team.push(member);
      }
      this.generatedTeams.push(team);
      team = [];
    }

    if (check) {
      if (!(this.members.length % this.numberOfTeams === 0)) {
        let randomTeam = this.random(this.numberOfTeams) - 1;
        this.generatedTeams[randomTeam].push(tmpMembers[0]);
      }
    }

    // console.log('hello', this.generatedTeams);
  }

  random(max: number): number {
    return Math.floor(Math.random() * max + 1);
  }

  resetErrorMessage() {
    this.errorMessage = '';
  }

  resetGeneratedTeams() {
    this.generatedTeams = [];
  }

  inputIsValid(): boolean {
    if (this.members.length === 0) {
      this.errorMessage = 'Please add members first!';
      return false;
    }

    if (!this.numberOfTeams || this.numberOfTeams <= 0) {
      this.errorMessage = 'Number of teams can not be less than 1 ;)';
      return false;
    }

    if (this.numberOfTeams > this.members.length) {
      this.errorMessage =
        'Number of teams can not be greater than the number of members ;)';
      return false;
    }

    return true;
  }
}

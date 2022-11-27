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
  numberOfTeams: number = 0;
  generatedTeams: string[][] = [];

  onInput(memberInput: string){
    this.newMember = memberInput;
  }

  setNumberOfTeams(nbrOfTeams: string){
    this.numberOfTeams = parseInt(nbrOfTeams);
  }

  addMember(){

    this.resetErrorMessage();

    if (this.newMember === '') {
      this.errorMessage = "Please enter a member name!";
      return;
    }

    this.members.push(this.newMember);
    this.newMember = '';
  }

  generateTeams(){

    this.resetErrorMessage();
    
    if(this.members.length === 0){
      this.errorMessage = "Please add members first!";
      return;
    }

    if(!this.numberOfTeams || this.numberOfTeams <= 0){
      this.errorMessage = "Number of teams can not be less than 1 ;)";
      return;
    }

    if(this.numberOfTeams > this.members.length){
      this.errorMessage = "Number of teams can not be greater than the number of members ;)";
      return;
    }


    let numberOfMembersForEachTeam = Math.floor(this.members.length / this.numberOfTeams);
    let allTeamsEquals = (this.members.length % this.numberOfTeams) === 0;

    this.resetGeneratedTeams();

    let team: string[] = [];
    let tmpMembers = [...this.members];
    let rand = 0;

    for (let i = 0; i < this.numberOfTeams; i++) {
        for (let j = 0; j < numberOfMembersForEachTeam; j++) {
          rand = this.random(tmpMembers.length)-1;
          let member = tmpMembers.splice(rand,1)[0];
          team.push(member);          
        }
        this.generatedTeams.push(team);
        team = [];
    }

    
    if(!allTeamsEquals){
      let randomTeam = this.random(this.numberOfTeams)-1;
      this.generatedTeams[randomTeam].push(tmpMembers[0]);
    }

    console.log(this.generatedTeams);
    

  }

  random(max: number): number{
    return Math.floor(Math.random()*max+1);
  }

  resetErrorMessage(){
    this.errorMessage = '';
  }

  resetGeneratedTeams(){
    this.generatedTeams = [];
  }
}

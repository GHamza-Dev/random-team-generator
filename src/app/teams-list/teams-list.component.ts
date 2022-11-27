import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-teams-list',
  templateUrl: './teams-list.component.html',
  styleUrls: ['./teams-list.component.css']
})
export class TeamsListComponent {
  @Input() teams: string[][] = [];
}

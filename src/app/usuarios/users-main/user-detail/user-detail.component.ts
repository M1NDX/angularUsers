import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
 id: number;
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params)=> this.id=params.id)
  }

  irAAbout(){
    this.router.navigate(['edit'],{relativeTo: this.route});
    //this.router.navigate(['../', this.id, 'edit'],{relativeTo: this.route})
  }

}

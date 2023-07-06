import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { Member } from 'src/app/Models/Member';
import { MembersService } from 'src/app/Services/members.service';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit {

  member!:Member;
  galleryOptions:NgxGalleryOptions[]=[];
  galleryImages:NgxGalleryImage[]=[]
  spinner:boolean=true;

  constructor(private memberService:MembersService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.loadMember();

    this.galleryOptions = [
      {
        width:'500px',
        height:'500px',
        imagePercent:100,
        thumbnailsColumns:4,
        imageAnimation:NgxGalleryAnimation.Slide,
        preview:false
      }
    ]
  }

  loadMember(){
    const userName=this.route.snapshot.paramMap.get('userName');
    if(!userName) return;
    this.memberService.getMember(userName).subscribe({
      next:(res)=> {
        this.member=res;
        this.galleryImages = this.getImages();
        this.spinner=false;
      },
      error:(err)=>{
        this.spinner=false;
      }
    })
  }

  getImages(){
    const imageUrl = [];
    if(!this.member) return [];
    for(const photo of this.member.photos){
      imageUrl.push({
        small:photo.url,
        medium:photo.url,
        big:photo.url,
      })
    }
    return imageUrl;
  }
}

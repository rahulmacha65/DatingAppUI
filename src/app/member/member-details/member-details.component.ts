import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { Member } from 'src/app/Models/Member';
import { IUser } from 'src/app/Models/User';
import { PresenceService } from 'src/app/Service/presence.service';
import { AccountService } from 'src/app/Services/account.service';
import { MembersService } from 'src/app/Services/members.service';
import { MessagesService } from 'src/app/Services/messages.service';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit,OnDestroy {

  member!:Member;
  galleryOptions:NgxGalleryOptions[]=[];
  galleryImages:NgxGalleryImage[]=[]
  spinner:boolean=true;
  tabName:string="about";
  user?:IUser;

  constructor(private memberService:MembersService,private route:ActivatedRoute,public presenceServce:PresenceService,
    private messageService:MessagesService,private accountService:AccountService) 
    {
      this.accountService.currentUser$.subscribe({
        next:user=>{
          if(user){
            this.user = user;
          }
        }
      })
    }

  ngOnInit(): void {
    this.loadMember();
    this.route.queryParams.subscribe({
      next:params=>{
        if(params['tab']){
          this.tabName = params['tab'];
        }
      }
    })

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

  ngOnDestroy(): void {
    this.messageService.stopHubConnection();
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

  messageTab(){
    this.tabName="message";
    if(this.user)
    {
      this.messageService.createHubConnection(this.user,this.member.userName);
    }
  }

  interests(){
    this.tabName="interests";
    this.messageService.stopHubConnection();
  }

  photos(){
    this.tabName="images";
    this.messageService.stopHubConnection();
  }
  about(){
    this.tabName="about";
    this.messageService.stopHubConnection();
  }
}

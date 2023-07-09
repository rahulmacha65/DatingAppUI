import { Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { take } from 'rxjs';
import { Member } from 'src/app/Models/Member';
import { Photo } from 'src/app/Models/Photo';
import { IUser } from 'src/app/Models/User';
import { AccountService } from 'src/app/Services/account.service';
import { MembersService } from 'src/app/Services/members.service';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {

  @Input()member:Member|undefined;
  
  uploader:FileUploader |undefined;
  hasBaseDropZoneOver=false;
  baseUrl = environment.apiUrl;
  user:IUser|undefined;
  constructor(private _accountService:AccountService,private _memberService:MembersService) 
  { 
    this._accountService.currentUser$.pipe(take(1)).subscribe({
      next:user=>{
        if(user){
          this.user=user
        }
      }
    })
  }

  ngOnInit(): void {
    this.initialUploader();
  }

  fileOverBase(e:any){
    this.hasBaseDropZoneOver=e;
  }

  setMainPhoto(photo:Photo){
    this._memberService.setMainPhoto(photo.id).subscribe({
      next:_=>{
        if(this.user && this.member){
          this.user.photoUrl = photo.url;
          this._accountService.setCurrentUser(this.user);
          this.member.photoUrl=photo.url;
          this.member.photos.forEach(p =>{
            if(p.isMain) p.isMain = false;
            if(p.id === photo.id) p.isMain = true;
          })
        }
      }
    })
  }

  deletePhoto(photoId:number){
    this._memberService.deletePhoto(photoId).subscribe({
      next: _ =>{
        if(this.member){
          this.member.photos = this.member.photos.filter(el => el.id !=photoId)
        }
      }
    })
  }
  initialUploader(){
    this.uploader = new FileUploader({
      url:this.baseUrl + 'Users/add-photo',
      authToken:'Bearer '+this.user?.token,
      isHTML5:true,
      allowedFileType:['image'],
      removeAfterUpload:true,
      autoUpload:false,
      maxFileSize:10*1024*1024
    })

    this.uploader.onAfterAddingFile = (file)=>{
      file.withCredentials = false;
    }

    this.uploader.onSuccessItem = (item,response,status,header)=>{
      console.log(this.baseUrl);
      if(response){
        const photo = JSON.parse(response);
        this.member?.photos.push(photo);
        if(photo.isMain && this.user && this.member){
          this.user.photoUrl = photo.url;
          this.member.photoUrl  = photo.url;
          this._accountService.setCurrentUser(this.user);
        }
      }
    }
    
  }
}

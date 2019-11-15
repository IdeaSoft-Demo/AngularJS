import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {EditProfileComponent} from './edit-profile-dialog';
import {User} from '../intefaces/user';
import {Router} from '@angular/router';
import {AuthService} from './services';
@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
    public userData: User;
    constructor(
        private dialog: MatDialog,
        private authService: AuthService,
        private profileService: ProfileService,
    ) {
    }
    ngOnInit(): void {
        this.getUserData();
    }
    public onEditProfile(): void {
        this.dialog.open(EditUserComponent, {
            panelClass: 'edit-user-dialog',
            data: this.userData
        }).afterClosed()
            .subscribe((updated) => {
                if (updated) {
                    this.getUserData();
                }
            });
    }
    public onLogOut(): void {
        this.authService.logout();
    }
    private getUserData(): void {
        this.profileService.getProfile()
            .subscribe(user => {
                this.userData = user;
            });
    }
}


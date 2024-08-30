// Core Module
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title }                  from '@angular/platform-browser';

export class AppModule {
  constructor(private router: Router, private titleService: Title, private route: ActivatedRoute) {
    router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        var title = this.route.snapshot.firstChild.data['title'];
        this.titleService.setTitle(title);
      }
    });
  }
}

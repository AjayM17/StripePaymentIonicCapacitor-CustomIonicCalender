import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CalaenderPage } from './calaender.page';

describe('CalaenderPage', () => {
  let component: CalaenderPage;
  let fixture: ComponentFixture<CalaenderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalaenderPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CalaenderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

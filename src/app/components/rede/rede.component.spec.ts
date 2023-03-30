import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedeComponent } from './rede.component';

describe('RedeComponent', () => {
  let component: RedeComponent;
  let fixture: ComponentFixture<RedeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RedeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RedeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

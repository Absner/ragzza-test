import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabletClientComponent } from './tablet-client.component';

describe('TabletClientComponent', () => {
  let component: TabletClientComponent;
  let fixture: ComponentFixture<TabletClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabletClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabletClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

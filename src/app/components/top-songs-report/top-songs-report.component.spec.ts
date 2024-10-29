import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopSongsReportComponent } from './top-songs-report.component';

describe('TopSongsReportComponent', () => {
  let component: TopSongsReportComponent;
  let fixture: ComponentFixture<TopSongsReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopSongsReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopSongsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

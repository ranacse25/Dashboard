import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsvCheckComponent } from './csv-check.component';

describe('CsvCheckComponent', () => {
  let component: CsvCheckComponent;
  let fixture: ComponentFixture<CsvCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CsvCheckComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CsvCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

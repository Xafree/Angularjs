import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestDuComposantComponent } from './test-du-composant.component';

describe('TestDuComposantComponent', () => {
  let component: TestDuComposantComponent;
  let fixture: ComponentFixture<TestDuComposantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestDuComposantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestDuComposantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

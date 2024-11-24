import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioPeliculaComponent } from './formulario-pelicula.component';

describe('FormularioPeliculaComponent', () => {
  let component: FormularioPeliculaComponent;
  let fixture: ComponentFixture<FormularioPeliculaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormularioPeliculaComponent]
    });
    fixture = TestBed.createComponent(FormularioPeliculaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

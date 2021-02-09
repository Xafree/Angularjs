import {ActivatedRoute, Router} from '@angular/router';
import {UserLdap} from '../../model/user-ldaps';
import {FormBuilder} from '@angular/forms';
import {ConfirmValidParentMatcher, passwordValidator} from './passwords-validator.directive';


export abstract class LdapDetailComponent{

  user: UserLdap = null;
  passwordPlaceHolder: string;
  processLoadRunning = false;
  processValidateRunning = false;
  // Message d'erreur
  errorMessage = '';
  userForm = this.fb.group({
    login: [''], // Valeur de départ vide
    nom: [''],
    prenom: [''],
// Groupe de données imbriqué
    passwordGroup: this.fb.group({
      password: [''],
      confirmPassword: ['']
    }, { validators: passwordValidator }),
    mail: {value: '', disabled: true},
  });
  confirmValidParentMatcher = new ConfirmValidParentMatcher();
  protected constructor(
    public addForm: boolean,
    protected route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.passwordPlaceHolder = 'Mot de passe' + (this.addForm ? '' : ' (vide si inchangé)');
  }

  protected onInit(): void {
    // Permet d'initialiser le formulaire au cas où
    // Nous n'en avons pas besoin ici
  }
  abstract validateForm(): void;

  goToLdap(): void {
    this.router.navigate(['/user/list']);
  }
  onSubmitForm(): void {
    this.validateForm();
  }

  updateLogin(): void {
    if (this.addForm){
      this.userForm.get('login').setValue((this.formGetValue('prenom') + '.' + this.formGetValue('nom')).toLowerCase());
      this.updateMail();
    }

  }

  updateMail(): void {
    if (this.addForm){
      this.userForm.get('mail').setValue(this.formGetValue('login').toLowerCase() + '@kilroy.lan');
    }
  }

  private formGetValue(name: string): any {
    return this.userForm.get(name).value;
  }

  isFormValid(): boolean {
    return this.userForm.valid
      // Exemple de validation d'un champ :
      && (!this.addForm || this.formGetValue('passwordGroup.password') !== '');
  }

  protected copyUserToFormControl(): void {
    this.userForm.get('login').setValue(this.user.login);
    this.userForm.get('nom').setValue(this.user.nom);
    this.userForm.get('prenom').setValue(this.user.prenom);
    this.userForm.get('mail').setValue(this.user.mail);

    /* Il faudra ajouter les champs suivant au formulaire
     this.userForm.get('employeNumero').setValue(this.user.employeNumero);
     this.userForm.get('employeNiveau').setValue(this.user.employeNiveau);
     this.userForm.get('dateEmbauche').setValue(this.user.dateEmbauche);
     this.userForm.get('publisherId').setValue(this.user.publisherId);
     this.userForm.get(‘active’).setValue(this.user.active);
     */
  }
// Permet de récupérer les valeurs du formulaire et
// de retourner un objet UserLdap avec ces valeurs

  protected getUserFromFormControl(): UserLdap {
    return {
      id: this.user === null ? 0 : this.user.id,
      login: this.userForm.get('login').value,
      nom: this.userForm.get('nom').value,
      prenom: this.userForm.get('prenom').value,
      nomComplet: this.userForm.get('nom').value + ' ' + this.userForm.get('prenom').value,
      mail: this.userForm.get('mail').value,
      // Les valeurs suivantes devraient être eprise du formulaire
      employeNumero: 1, // this.userForm.get('employeNumero').value,
      employeNiveau: 1, // this.userForm.get('employeNiveau').value,
      dateEmbauche: '2020-04-24', // this.userForm.get('dateEmbauche').value,
      publisherId: 1, // this.userForm.get('publisherId').value,
      active: true,
      motDePasse: '',
      role: 'ROLE_USER'
    };
  }
}


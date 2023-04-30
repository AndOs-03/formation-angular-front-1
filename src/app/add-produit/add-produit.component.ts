import {Component, OnInit} from '@angular/core';
import {Produit} from '../model/produit.model';
import {ProduitService} from "../services/produit.service";
import {Router} from "@angular/router";
import {Categorie} from "../model/categorie.model";

@Component({
  selector: 'app-add-produit',
  templateUrl: './add-produit.component.html',
  styles: []
})
export class AddProduitComponent implements OnInit {

  newProduit = new Produit();
  message: string = "";
  categories!: Categorie[];
  newIdCat!: number;

  // newCategorie!: Categorie;

  constructor(private produitsService: ProduitService, private router: Router) {

  }

  ngOnInit(): void {
    this.produitsService.listeCategories().subscribe((categorie) => {
      this.categories = categorie._embedded.categories
    })
  }

  addProduit() {
    this.newProduit.categorie = this.categories.find(cat => cat.idCat === this.newIdCat)!;
    this.produitsService.ajouterProduit(this.newProduit).subscribe((produit) => {
      this.router.navigate(['produits']);
    })
  }
}

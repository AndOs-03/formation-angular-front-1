import {Component, OnInit} from '@angular/core';
import {Produit} from "../model/produit.model";
import {ActivatedRoute, Router} from "@angular/router";
import {ProduitService} from "../services/produit.service";
import {Categorie} from "../model/categorie.model";

@Component({
  selector: 'app-update-produit',
  templateUrl: './update-produit.component.html',
  styles: []
})
export class UpdateProduitComponent implements OnInit {

  currentProduit: Produit = new Produit();
  categories!: Categorie[];
  updatedCatId!: number;

  constructor(private activatedRoute: ActivatedRoute, private router: Router,
              private produitService: ProduitService) {
  }

  ngOnInit(): void {
    this.produitService.listeCategories().subscribe((categories) => {
      this.categories = categories._embedded.categories;
    })
    this.produitService.consulterProduit(this.activatedRoute.snapshot.params['id'])
    .subscribe((produit) => {
      this.currentProduit = produit;
      this.updatedCatId = this.currentProduit.categorie.idCat;
    });
  }

  updateProduit() {
    this.currentProduit.categorie = this.categories.find(cat => cat.idCat = this.updatedCatId)!;
    this.produitService.updateProduit(this.currentProduit).subscribe((produit) => {
      this.router.navigate(['produits']);
    });
  }
}

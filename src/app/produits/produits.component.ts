import {Component, OnInit} from '@angular/core';
import {Produit} from "../model/produit.model";
import {ProduitService} from "../services/produit.service";

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html'
})
export class ProduitsComponent implements OnInit {

  produits: Produit[] | undefined;

  constructor(private produitsService: ProduitService) {

  }

  ngOnInit(): void {
    this.chargerProduits();
  }

  chargerProduits() {
    this.produitsService.listeProduit().subscribe(prods => {
      console.log(prods);
      this.produits = prods;
    });
  }

  supprimerProduit(produit: Produit) {
    let conf = confirm("Êtes-vous sur ?")
    if (conf) {
      this.produitsService.supprimerProduit(produit.idProduit!).subscribe(() => {
        console.log("produit supprimé");
        this.chargerProduits();
      });
    }
  }
}

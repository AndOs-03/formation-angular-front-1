import {Component, OnInit} from '@angular/core';
import {Produit} from "../model/produit.model";
import {ProduitService} from "../services/produit.service";
import {AuthService} from "../services/auth.service";
import {Image} from "../model/image.model";

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html'
})
export class ProduitsComponent implements OnInit {

  produits: Produit[] | undefined;

  constructor(private produitsService: ProduitService, public authService: AuthService) {

  }

  ngOnInit(): void {
    this.chargerProduits();
  }

  chargerProduits() {
    this.produitsService.listeProduit().subscribe(prods => {
      this.produits = prods;
      this.produits.forEach((prod) => {
        this.produitsService.loadImage(prod.image.idImage).subscribe((img: Image) => {
          prod.imageStr = 'data:' + img.type + ';base64,' + img.image;
        });
      });
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

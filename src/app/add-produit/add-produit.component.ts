import {Component, OnInit} from '@angular/core';
import {Produit} from '../model/produit.model';
import {ProduitService} from "../services/produit.service";
import {Router} from "@angular/router";
import {Categorie} from "../model/categorie.model";
import {Image} from "../model/image.model";

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
  uploadedImage!: File;
  imagePath: any;

  constructor(private produitsService: ProduitService, private router: Router) {

  }

  ngOnInit(): void {
    this.produitsService.listeCategories().subscribe((categorie) => {
      this.categories = categorie._embedded.categories
    })
  }

  addProduit() {
    this.produitsService.uploadImage(this.uploadedImage, this.uploadedImage.name).subscribe((img: Image) => {
      this.newProduit.image = img;
      this.newProduit.categorie = this.categories.find(cat => cat.idCat == this.newIdCat)!;
      this.produitsService.ajouterProduit(this.newProduit).subscribe(() => {
        this.router.navigate(['produits']);
      });
    });

  }

  onImageUpload(event: Event) {
    // @ts-ignore
    this.uploadedImage = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(this.uploadedImage);
    reader.onload = (_event) => {
      this.imagePath = reader.result;
    }
  }
}

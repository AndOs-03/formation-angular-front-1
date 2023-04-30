import {Injectable} from '@angular/core';
import {Produit} from "../model/produit.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {CategorieWrapper} from "../model/categorieWrapper.model";

const httpOptions = {
  headers: new HttpHeaders({"Content-Type": "application/json"})
};

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  apiUrl: string = 'http://localhost:8080/produits/api';
  apiURLCat: string = 'http://localhost:8080/produits/cat';
  produits: Produit[];
  produit?: Produit;

  // categories: Categorie[];

  constructor(private http: HttpClient) {
    this.produits = [
      {
        idProduit: 1,
        nomProduit: "PC Asus",
        prixProduit: 3000.600,
        dateCreation: new Date("01/14/2011"),
        categorie: {idCat: 1, nomCat: "PC"}
      },
      {
        idProduit: 2,
        nomProduit: "Imprimante Epson",
        prixProduit: 450,
        dateCreation: new Date("12/17/2010"),
        categorie: {idCat: 2, nomCat: "Imprimante"}
      },
      {
        idProduit: 3,
        nomProduit: "Tablette Samsung",
        prixProduit: 900.123,
        dateCreation: new Date("02/20/2020"),
        categorie: {idCat: 1, nomCat: "PC"}
      }
    ];
  }

  listeProduit(): Observable<Produit[]> {
    return this.http.get<Produit[]>(this.apiUrl);
  }

  ajouterProduit(prod: Produit): Observable<Produit> {
    return this.http.post<Produit>(this.apiUrl, prod, httpOptions);
  }

  supprimerProduit(id: number): Observable<Object> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url, httpOptions);
  }

  consulterProduit(id: number): Observable<Produit> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Produit>(url)
  }

  updateProduit(produit: Produit): Observable<Produit> {
    return this.http.put<Produit>(this.apiUrl, produit, httpOptions);
  }

  trierProduits() {
    this.produits = this.produits.sort((n1, n2) => {
      // @ts-ignore
      if (n1.idProduit > n2.idProduit) {
        return 1;
      }
      // @ts-ignore
      if (n1.idProduit < n2.idProduit) {
        return -1;
      }
      return 0;
    });
  }

  listeCategories(): Observable<CategorieWrapper> {
    return this.http.get<CategorieWrapper>(this.apiURLCat);
  }

  rechercherParCategorie(idCat: number): Observable<Produit[]> {
    const url = `${this.apiUrl}/prodscat/${idCat}`;
    return this.http.get<Produit[]>(url);
  }

  rechercherParNom(nom: string): Observable<Produit[]> {
    const url = `${this.apiUrl}/prodsByName/${nom}`;
    return this.http.get<Produit[]>(url);
  }
}

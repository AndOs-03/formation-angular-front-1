import {Injectable} from '@angular/core';
import {Produit} from "../model/produit.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {CategorieWrapper} from "../model/categorieWrapper.model";
import {Categorie} from "../model/categorie.model";
import {Image} from "../model/image.model";

const httpOptions = {
  headers: new HttpHeaders({"Content-Type": "application/json"})
};

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  apiUrl: string = 'http://localhost:8080/produits/api';
  apiURLCat: string = 'http://localhost:8080/produits/cat';
  produit?: Produit;

  constructor(private http: HttpClient) {}

  listeProduit(): Observable<Produit[]> {
    const url = `${this.apiUrl}/all`;
    return this.http.get<Produit[]>(url);
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

  ajouterCategorie(cat: Categorie): Observable<Categorie> {
    return this.http.post<Categorie>(this.apiURLCat, cat, httpOptions);
  }

  uploadImage(file: File, filename: string): Observable<Image>{
    const imageFormData = new FormData();
    imageFormData.append('image', file, filename);
    const url = `${this.apiUrl + '/image/upload'}`;
    return this.http.post<Image>(url, imageFormData);
  }

  loadImage(id: number): Observable<Image> {
    const url = `${this.apiUrl + '/image/get/info'}/${id}`;
    return this.http.get<Image>(url);
  }
}

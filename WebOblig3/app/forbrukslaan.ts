import {Component, OnInit} from "@angular/core";
import { Http, Response } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {Kunde} from "./Kunde";
import {Headers} from "@angular/http";

@Component({
    selector: "min-app",
    styleUrls: ["./app/WebObligStyle.css"],
    templateUrl: "./app/Forbrukslaan.html"
})
export class FORBRUKSLAAN {
    visSkjema: boolean;
    visTilbakeMelding: boolean;
    validering: string;
    visValideringMelding: boolean;
    gBelop: number;
    aar: number;
    skjemaStatus: string;
    tilbakeMelding: string;
    skjema: FormGroup;
    visCalc: boolean;
    laster: boolean;
    mBelop: number;

    constructor(private _http: Http, private fb: FormBuilder) {
        this.skjema = fb.group({
            grunnBelop: ["", Validators.pattern("[0-9]{5,6}")],
            antallAar: ["", Validators.pattern("[0-9]{1,2}")],
            personnummer: ["", Validators.pattern("[0-9]{11}")],
            epost: ["", Validators.pattern("[0-9a-zA-ZøæåØÆÅ_@\\-. ]{3,30}")],
            telefonnummer: ["", Validators.pattern("[0-9]{8}")],
        });
    }

    ngOnInit() {
        this.sliderInnstilling();
        this.laster = true;
        this.visCalc = true;
        this.visSkjema = false;
        this.visTilbakeMelding = false;
        this.skjemaStatus == "Endre";
        
    }

    // Sliderene sine innstillinger når programmet blir kjørt.
    sliderInnstilling() {
        this.gBelop = 20000;
        this.aar = 5;
        this.utRekning();
    }

    // Utrekning av månedsbeløpet.
    utRekning() {
        var utRekning = 0.07 * this.gBelop;
        var utRekning2 = 1 - Math.pow(1 / (1 + 0.07), this.aar);
        var utRekning3 = utRekning / utRekning2;
        this.mBelop = Math.round(utRekning3 / 12);
    }

    vedSubmit() {
            if (this.skjemaStatus == "Registrer") {
                this.lagreKunde();
            } else {
                this.validering = "Feil i registrering";
                this.visValideringMelding = true;
            }
    }

    registrerKunde() {
        this.skjema.patchValue({ personnummer: "" });
        this.skjema.patchValue({ epost: "" });
        this.skjema.patchValue({ telefonnummer: "" });
        this.skjema.patchValue({ grunnBelop: "" });
        this.skjema.patchValue({ antallAar: "" });
        this.skjemaStatus = "Registrer";
        this.visSkjema = true;
        this.visCalc = false;
    }

    // Blir sendt tilbake til forsiden.
    tilbakeTilForside() {
        this.visSkjema = false;
        this.visTilbakeMelding = false;
        this.visCalc = true;
        this.sliderInnstilling();
    }

    // Tar inn verdiene fra skjema og lagrer dem.
    lagreKunde() {
            var lagretKunde = new Kunde();

            lagretKunde.grunnBelop = this.skjema.value.grunnBelop;
            lagretKunde.antallAar = this.skjema.value.antallAar;
            var utRekning = 0.07 * this.skjema.value.grunnBelop;
            var utRekning2 = 1 - Math.pow(1 / (1 + 0.07), this.skjema.value.antallAar);
            var utRekning3 = utRekning / utRekning2;
            lagretKunde.maanedsBelop = Math.round(utRekning3 / 12);

            lagretKunde.personnummer = this.skjema.value.personnummer;
            lagretKunde.epost = this.skjema.value.epost;
            lagretKunde.telefonnummer = this.skjema.value.telefonnummer;

            var body: string = JSON.stringify(lagretKunde);
            var headers = new Headers({ "Content-Type": "application/json" });

            this._http.post("api/kunde", body, { headers: headers })
                .map(returData => returData.toString())
                .subscribe(
                retur => {
                    this.laster = true;
                    this.visSkjema = false;
                    this.visCalc = false;
                    this.visTilbakeMelding = true;
                    this.tilbakeMelding = "Lånesøknaden din er nå registrert. Din kunderådgiver vil ta kontakt med deg så snart søknaden er behandlet.";
                },
                error => alert(error),
                () => console.log("ferdig post-api/kunde")
                );
    };

}
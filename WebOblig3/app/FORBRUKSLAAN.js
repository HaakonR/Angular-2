"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require('@angular/http');
var forms_1 = require('@angular/forms');
require('rxjs/add/operator/map');
require('rxjs/add/operator/toPromise');
var Kunde_1 = require("./Kunde");
var http_2 = require("@angular/http");
var FORBRUKSLAAN = (function () {
    function FORBRUKSLAAN(_http, fb) {
        this._http = _http;
        this.fb = fb;
        this.skjema = fb.group({
            grunnBelop: ["", forms_1.Validators.pattern("[0-9]{5,6}")],
            antallAar: ["", forms_1.Validators.pattern("[0-9]{1,2}")],
            personnummer: ["", forms_1.Validators.pattern("[0-9]{11}")],
            epost: ["", forms_1.Validators.pattern("[0-9a-zA-ZøæåØÆÅ_@\\-. ]{3,30}")],
            telefonnummer: ["", forms_1.Validators.pattern("[0-9]{8}")],
        });
    }
    FORBRUKSLAAN.prototype.ngOnInit = function () {
        this.sliderInnstilling();
        this.laster = true;
        this.visCalc = true;
        this.visSkjema = false;
        this.visTilbakeMelding = false;
        this.skjemaStatus == "Endre";
    };
    // Sliderene sine innstillinger når programmet blir kjørt.
    FORBRUKSLAAN.prototype.sliderInnstilling = function () {
        this.gBelop = 20000;
        this.aar = 5;
        this.utRekning();
    };
    // Utrekning av månedsbeløpet.
    FORBRUKSLAAN.prototype.utRekning = function () {
        var utRekning = 0.07 * this.gBelop;
        var utRekning2 = 1 - Math.pow(1 / (1 + 0.07), this.aar);
        var utRekning3 = utRekning / utRekning2;
        this.mBelop = Math.round(utRekning3 / 12);
    };
    FORBRUKSLAAN.prototype.vedSubmit = function () {
        if (this.skjemaStatus == "Registrer") {
            this.lagreKunde();
        }
        else {
            this.validering = "Feil i registrering";
            this.visValideringMelding = true;
        }
    };
    FORBRUKSLAAN.prototype.registrerKunde = function () {
        this.skjema.patchValue({ personnummer: "" });
        this.skjema.patchValue({ epost: "" });
        this.skjema.patchValue({ telefonnummer: "" });
        this.skjema.patchValue({ grunnBelop: "" });
        this.skjema.patchValue({ antallAar: "" });
        this.skjemaStatus = "Registrer";
        this.visSkjema = true;
        this.visCalc = false;
    };
    // Blir sendt tilbake til forsiden.
    FORBRUKSLAAN.prototype.tilbakeTilForside = function () {
        this.visSkjema = false;
        this.visTilbakeMelding = false;
        this.visCalc = true;
        this.sliderInnstilling();
    };
    // Tar inn verdiene fra skjema og lagrer dem.
    FORBRUKSLAAN.prototype.lagreKunde = function () {
        var _this = this;
        var lagretKunde = new Kunde_1.Kunde();
        lagretKunde.grunnBelop = this.skjema.value.grunnBelop;
        lagretKunde.antallAar = this.skjema.value.antallAar;
        var utRekning = 0.07 * this.skjema.value.grunnBelop;
        var utRekning2 = 1 - Math.pow(1 / (1 + 0.07), this.skjema.value.antallAar);
        var utRekning3 = utRekning / utRekning2;
        lagretKunde.maanedsBelop = Math.round(utRekning3 / 12);
        lagretKunde.personnummer = this.skjema.value.personnummer;
        lagretKunde.epost = this.skjema.value.epost;
        lagretKunde.telefonnummer = this.skjema.value.telefonnummer;
        var body = JSON.stringify(lagretKunde);
        var headers = new http_2.Headers({ "Content-Type": "application/json" });
        this._http.post("api/kunde", body, { headers: headers })
            .map(function (returData) { return returData.toString(); })
            .subscribe(function (retur) {
            _this.laster = true;
            _this.visSkjema = false;
            _this.visCalc = false;
            _this.visTilbakeMelding = true;
            _this.tilbakeMelding = "Lånesøknaden din er nå registrert. Din kunderådgiver vil ta kontakt med deg så snart søknaden er behandlet.";
        }, function (error) { return alert(error); }, function () { return console.log("ferdig post-api/kunde"); });
    };
    ;
    FORBRUKSLAAN = __decorate([
        core_1.Component({
            selector: "min-app",
            styleUrls: ["./app/WebObligStyle.css"],
            templateUrl: "./app/Forbrukslaan.html"
        }), 
        __metadata('design:paramtypes', [http_1.Http, forms_1.FormBuilder])
    ], FORBRUKSLAAN);
    return FORBRUKSLAAN;
}());
exports.FORBRUKSLAAN = FORBRUKSLAAN;
//# sourceMappingURL=FORBRUKSLAAN.js.map
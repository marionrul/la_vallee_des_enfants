let db = require('../config/db');
let helper = require('../helpers/helper');

let Contrat = {
    findOne: function (numContrat, callback) {
        db.query('SELECT * FROM public.contrat WHERE id_contrat = $1',
            [numContrat], function (err, rslt) {
                retour = {
                    erreur: null,
                    contrat: null,
                    statut: null
                };
                let e = helper.handleError(err, rslt,'Aucun contrats');
                retour.erreur = e.erreur;
                retour.statut = e.statut;
                if(retour.erreur == null){
                    retour.contrat = {
                        id: rslt.rows[0].id_contrat,
                        dateDebut: rslt.rows[0].date_debut,
                        nbSemainesCongesParent: rslt.rows[0].nb_semaines_conges_parents,
                        tarif: rslt.rows[0].tarif,
                        nbHeuresSemaine: rslt.rows[0].nb_heures_semaine,
                        taux: rslt.rows[0].taux_majore,
                        dateDebAdapt: rslt.rows[0].date_deb_periode_adaptation,
                        dateFinAdapt: rslt.rows[0].date_fin_periode_adaptation,
                        jourPaiement: rslt.rows[0].jour_paiement,
                        nomEnfant: rslt.rows[0].nom_enfant,
                        prenomEnfant: rslt.rows[0].prenom_enfant,
                        sexeEnfant: rslt.rows[0].sexe,
                        date_fin : rslt.rows[0].date_fin
                    }
                    retour.statut = 200
                }
                callback(retour);
            });
    },

    getAllEnCours: function (callback) {
        db.query(
            'SELECT * FROM public.contrat C, public.enfant E WHERE C.id_enfant=E.id_enfant AND C.date_fin IS NULL ORDER BY C.date_debut, E.nom_enfant',
            [],
            function (err, rslt){
                retour = {
                    erreur: null,
                    contrats: null,
                    statut: null
                };
                let e = helper.handleError(err, rslt,'Aucun contrats');
                retour.erreur = e.erreur;
                retour.statut = e.statut;
                if(retour.erreur == null){
                    var array = []
                    for(var i = 0; i < rslt.rows.length; i++){
                        array.push({
                            id: rslt.rows[i].id_contrat,
                            dateDebut: rslt.rows[i].date_debut,
                            nbSemainesCongesParent: rslt.rows[i].nb_semaines_conges_parents,
                            tarif: rslt.rows[i].tarif,
                            nbHeuresSemaine: rslt.rows[i].nb_heures_semaine,
                            taux: rslt.rows[i].taux_majore,
                            dateDebAdapt: rslt.rows[i].date_deb_periode_adaptation,
                            dateFinAdapt: rslt.rows[i].date_fin_periode_adaptation,
                            jourPaiement: rslt.rows[i].jour_paiement,
                            nomEnfant: rslt.rows[i].nom_enfant,
                            prenomEnfant: rslt.rows[i].prenom_enfant,
                            sexeEnfant: rslt.rows[i].sexe
                        });
                    }
                    retour.contrats = array;
                    retour.statut = 200
                } // on remplie contrats avec les contrats de la BD
                callback(retour); // on passe en parametre l'objet retour
                // il faudra verifier si une erreur existe ou non
            }
        );
    },

    getAllTermines: function (callback) {
        db.query(
            'SELECT * FROM public.contrat C, public.enfant E WHERE C.id_enfant=E.id_enfant AND C.date_fin IS NOT NULL ORDER BY C.date_debut, E.nom_enfant',
            [],
            function (err, rslt){
                retour = {
                    erreur: null,
                    contrats: null,
                    statut: null
                };
                let e = helper.handleError(err, rslt,'Aucun contrats');
                retour.erreur = e.erreur;
                retour.statut = e.statut;
                if(retour.erreur == null){
                    var array = []
                    for(var i = 0; i < rslt.rows.length; i++){
                        array.push({
                            id: rslt.rows[i].id_contrat,
                            dateDebut: rslt.rows[i].date_debut,
                            nbSemainesCongesParent: rslt.rows[i].nb_semaines_conges_parents,
                            tarif: rslt.rows[i].tarif,
                            nbHeuresSemaine: rslt.rows[i].nb_heures_semaine,
                            taux: rslt.rows[i].taux_majore,
                            dateDebAdapt: rslt.rows[i].date_deb_periode_adaptation,
                            dateFinAdapt: rslt.rows[i].date_fin_periode_adaptation,
                            jourPaiement: rslt.rows[i].jour_paiement,
                            nomEnfant: rslt.rows[i].nom_enfant,
                            prenomEnfant: rslt.rows[i].prenom_enfant,
                            sexeEnfant: rslt.rows[i].sexe
                        });
                    }
                    retour.contrats = array;
                    retour.statut = 200
                } // on remplie contrats avec les contrats de la BD
                callback(retour); // on passe en parametre l'objet retour
            }
        );
    },

    getAllById: function (numeroContrat, callback) {
        db.query(
            'SELECT * ' +
            'FROM public.contrat as co, public.enfant as en, public.employeur as em, public.modedepaiement as mp,' +
            ' public.assmat as am, public.typecontrat as tc ' +
            'WHERE co.id_contrat = $1 AND co.id_enfant = en.id_enfant AND co.id_type_contrat = tc.id_type ' +
            'AND co.id_mode_paiement = mp.id_mode AND co.id_employeur = em.id_employeur AND co.id_am = am.id_am;',
            [numeroContrat],
            function (err, rslt){
                retour = {
                    erreur: null,
                    contrats: null,
                    statut: null
                };
                let e = helper.handleError(err, rslt,'Aucun contrat');
                retour.erreur = e.erreur;
                retour.statut = e.statut;
                if(retour.erreur == null){
                    retour.type_contrat = rslt.rows[0].nom_type,
                    retour.date_deb_periode_adaptation = rslt.rows[0].date_deb_periode_adaptation,
                    retour.date_fin_periode_adaptation = rslt.rows[0].date_fin_periode_adaptation,
                    retour.modepaiements = rslt.rows[0].nom_mode,
                    retour.date_debut_contrat = rslt.rows[0].date_debut,
                    retour.date_fin_contrat = rslt.rows[0].date_fin,
                    retour.nb_heures_semaine = rslt.rows[0].nb_heures_semaine,
                    retour.tarif = rslt.rows[0].tarif,
                    retour.taux_majore = rslt.rows[0].taux_majore,
                    retour.jour_paiement = rslt.rows[0].jour_paiement,
                    retour.nom_enfant = rslt.rows[0].nom_enfant,
                    retour.prenom_enfant = rslt.rows[0].prenom_enfant,
                    retour.date_naissance_enfant = rslt.rows[0].date_naissance_enfant,
                    retour.sexe = rslt.rows[0].sexe,
                    retour.nom_usage_am = rslt.rows[0].nom_usage_am,
                    retour.prenom_am = rslt.rows[0].prenom_am,
                    retour.nom_naissance_am = rslt.rows[0].nom_naissance_am,
                    retour.date_naissance_am = rslt.rows[0].date_naissance_am,
                    retour.ville_naissance_am = rslt.rows[0].ville_naissance_am,
                    retour.tel_am = rslt.rows[0].tel_am,
                    retour.numero_ss = rslt.rows[0].numero_ss,
                    retour.date_agrement = rslt.rows[0].date_agrement,
                    retour.reference_agrement = rslt.rows[0].reference_agrement,
                    retour.assurance_resp_civile = rslt.rows[0].assurance_resp_civile,
                    retour.num_police = rslt.rows[0].num_police,
                    retour.nb_semaines_conges = rslt.rows[0].nb_semaines_conges,
                    retour.nom_usage_employeur = rslt.rows[0].nom_usage_employeur,
                    retour.prenom_employeur = rslt.rows[0].prenom_employeur,
                    retour.nom_naissance_employeur = rslt.rows[0].nom_naissance_employeur,
                    retour.rue_employeur = rslt.rows[0].rue_employeur,
                    retour.cp_employeur = rslt.rows[0].cp_employeur,
                    retour.ville_employeur = rslt.rows[0].ville_employeur,
                    retour.telephone_employeur = rslt.rows[0].telephone_employeur,
                    retour.mail_employeur = rslt.rows[0].mail_employeur,
                    retour.identifiant_connexion = rslt.rows[0].identifiant_connexion,
                    retour.nb_semaines_conges_parents = rslt.rows[0].nb_semaines_conges_parents,
                    retour.id_employeur = rslt.rows[0].id_employeur,
                    retour.statut = 200;
                }
                callback(retour); // on passe en parametre l'objet retour
                // il faudra verifier si une erreur existe ou non
            }
        );
    },

    getAllByIdEmployeur: function (numeroEmployeur, callback) {
        db.query(
            'SELECT * FROM public.contrat C, public.enfant E WHERE C.id_enfant=E.id_enfant AND c.id_employeur = $1 ORDER BY C.date_debut, E.nom_enfant',
            [numeroEmployeur],
            function (err, rslt){
                retour = {
                    erreur: null,
                    contrats: null,
                    statut: null
                };
                let e = helper.handleError(err, rslt,'Aucun contrats');
                retour.erreur = e.erreur;
                retour.statut = e.statut;
                if(retour.erreur == null){
                    var array = []
                    for(var i = 0; i < rslt.rows.length; i++){
                        array.push({
                            id: rslt.rows[i].id_contrat,
                            dateDebut: rslt.rows[i].date_debut,
                            nbSemainesCongesParent: rslt.rows[i].nb_semaines_conges_parents,
                            tarif: rslt.rows[i].tarif,
                            nbHeuresSemaine: rslt.rows[i].nb_heures_semaine,
                            taux: rslt.rows[i].taux_majore,
                            dateDebAdapt: rslt.rows[i].date_deb_periode_adaptation,
                            dateFinAdapt: rslt.rows[i].date_fin_periode_adaptation,
                            jourPaiement: rslt.rows[i].jour_paiement,
                            nomEnfant: rslt.rows[i].nom_enfant,
                            prenomEnfant: rslt.rows[i].prenom_enfant,
                            sexeEnfant: rslt.rows[i].sexe
                        });
                    }
                    retour.contrats = array;
                    retour.statut = 200
                }
                callback(retour); // on passe en parametre l'objet retour
            }
        );
    },

    getTuteursById: function (numeroContrat, callback) {
        db.query(
            'SELECT tu.nom_tuteur, tu.prenom_tuteur, tu.telephone, tu.profession, tu.telephone_pro, nom_type_tuteur, tu.id_tuteur ' +
            'FROM public.contrat as co, public.enfant as en, public.tuteur as tu, public.apourtuteur as apt, public.typetuteur as tt ' +
            'WHERE co.id_contrat = $1 AND co.id_enfant = en.id_enfant AND apt.id_enfant = en.id_enfant AND apt.id_tuteur = tu.id_tuteur ' +
            'AND tt.id_type_tuteur = tu.id_type_tuteur;',
            [numeroContrat],
            function (err, rslt){
                retour = {
                    erreur: null,
                    tuteurs: null,
                    statut: null
                };
                let e = helper.handleError(err, rslt,'Aucun contrat');
                retour.erreur = e.erreur;
                retour.statut = e.statut;
                if(retour.erreur == null){
                    var array = []
                    for(var i = 0; i < rslt.rows.length; i++){
                        array.push({
                            id_tuteur: rslt.rows[i].id_tuteur,
                            nom_tuteur: rslt.rows[i].nom_tuteur,
                            prenom_tuteur: rslt.rows[i].prenom_tuteur,
                            telephone: rslt.rows[i].telephone,
                            profession: rslt.rows[i].profession,
                            telephone_pro: rslt.rows[i].telephone_pro,
                            nom_type_tuteur: rslt.rows[i].nom_type_tuteur
                        });
                    }
                    retour.tuteurs = array;
                    retour.statut = 200
                }
                callback(retour); // on passe en parametre l'objet retour
                // il faudra verifier si une erreur existe ou non
            }
        );
    },

    getPresencesByContrat: function (numeroContrat, callback) {
        db.query(
            'SELECT * FROM public.contrat as co, public.presencetheorique pt, public.typejour tj \n' +
            'WHERE co.id_contrat = pt.id_contrat AND co.id_contrat= $1 \n' +
            'AND pt.id_type_jour  = tj.id_type \n' +
            'ORDER BY pt.id_type_jour',
            [numeroContrat],
            function (err, rslt){
                retour = {
                    erreur: null,
                    resultats: null,
                    statut: null
                };
                let e = helper.handleError(err, rslt,'Aucune présence correspondant');
                retour.erreur = e.erreur;
                retour.statut = e.statut;
                if(retour.erreur == null){
                    let array = []
                    for(let i = 0; i < rslt.rows.length; i++){
                        array.push({
                            heureArrivee: rslt.rows[i].heure_arrivee,
                            heureDepart: rslt.rows[i].heure_depart,
                            id_type_jour: rslt.rows[i].id_type_jour,
                            libelle_jour: rslt.rows[i].libelle,
                            gouter: rslt.rows[i].prends_gouter
                        });
                    }
                    retour.resultats = array;
                    retour.statut = 200
                }
                callback(retour); // on passe en parametre l'objet retour
                // il faudra verifier si une erreur existe ou non
            }
        );
    },

    create: function (numContrat, numAssMat, callback) {
        db.query('INSERT INTO public.contrat(id_contrat, id_am) VALUES ($1, $2)',
            [numContrat, numAssMat],
            function (e) {
                let retour = {
                    erreur : null
                }
                if (e) {
                    retour.erreur = e.toString()
                }
                callback(retour)
            });
    },

    // Ajout de l'enfant au contrat
    sectionEnfantCreate: function (numContrat, numEnfant, callback) {
        db.query('UPDATE public.contrat SET id_enfant = $1 WHERE id_contrat = $2',
            [numEnfant, numContrat],
            function (e) {
            let retour = {erreur : null}
                if (e) {
                    retour.erreur = e.toString()
                }
                callback(retour)
            }
        )
    },

    // Ajout de l'employeur au contrat
    sectionEmployeurCreate: function (numContrat, nombreSemainesCong, numEmployeur, callback) {
        db.query('UPDATE public.contrat ' +
            'SET id_employeur = $1, nb_semaines_conges_parents = $2 ' +
            'WHERE id_contrat = $3',
            [numEmployeur, nombreSemainesCong, numContrat],
            function () {
                let retour = 'l\'employeur et ses conges sont ajoutés au contrat'
                callback(retour)
            }
        )
    },

    // Ajout des informations générales
    sectionInfosGeneralesCreate: function (numContrat, numTypeContrat, numModeDePaiement, dateDebutContrat, dateDebAdapt, dateFinAdapt, jourDePaiement, callback) {
        db.query('UPDATE public.contrat ' +
            'SET id_type_contrat = $1, id_mode_paiement = $2, jour_paiement = $3, date_debut = $4, date_deb_periode_adaptation = $5, date_fin_periode_adaptation = $6 ' +
            'WHERE id_contrat = $7',
            [numTypeContrat, numModeDePaiement, jourDePaiement, new Date(dateDebutContrat), new Date(dateDebAdapt), new Date(dateFinAdapt), numContrat],
            function (er) {
                let retour = {erreur: null}
                if (er) {
                    retour.erreur = er
                }
                callback(retour)
            }
        )
    },

    // Ajout du nombre d'heures de presence hebdomadaire de l'enfant
    sectionHeuresHebdoCreate: function(numContrat, nbHeures, callback) {
        db.query('UPDATE public.contrat ' +
            'SET nb_heures_semaine = $1 ' +
            'WHERE id_contrat = $2',
            [nbHeures, numContrat],
            function () {
                let retour = 'le nb d\'heures hebdos est ajouté au contrat'
                callback(retour)
            })
    },

    // Ajout des tarifs de l'assmat au contrat
    sectionTarifscreate: function (numContrat, tarifHoraire, tauxMajoration, callback) {
        db.query('UPDATE public.contrat ' +
            'SET tarif = $1 , taux_majore = $2 ' +
            'WHERE id_contrat = $3',
            [tarifHoraire, tauxMajoration, numContrat],
            function () {
                let retour = 'les tarifs sont ajoutés au contrat'
                callback(retour)
            })
    },

    // Clôture le contrat en mettant la date de fin
    updateDateFin: function (numContrat, callback) {
        db.query('UPDATE public.contrat ' +
            'SET date_fin = Date(now()) WHERE id_contrat = $1',
            [numContrat],
            function () {
                let retour = 'Le contrat est clôturé'
                callback(retour)
            })
    },

    /* -------------------------------------------------------------------------------------------------------------- */
    create2: function (contrat, callback) {
        db.query("INSERT INTO public.contrat(id_contrat, date_debut, nb_semaines_conges_parents, tarif, nb_heures_semaine, taux_majore, date_deb_periode_adaptation, date_fin_periode_adaptation, jour_paiement) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
            [contrat.id, contrat.date, contrat.congesSupp, contrat.salaireNet, contrat.nbHeuresSemaine, contrat.majoration, contrat.dateDebAdapt, contrat.dateFinAdapt, contrat.jourPrelevement],
            function (err, result) {
                let retour = {
                    erreur: null,
                    contrat: null,
                    statut: null
                };
                let e = helper.handleError(err, result, 'Aucun contrat');
                retour.erreur= e.erreur;
                retour.statut= e.statut;
                if (retour.erreur == null) {
                    retour.contrat = {
                        id: result.rows[0].id_contrat,
                        date: result.rows[0].date_debut,
                        congesSupp: result.rows[0].nb_semaines_conges_parents,
                        salaireNet: result.rows[0].tarif,
                        nbHeuresSemaine: result.rows[0].nb_heures_semaine,
                        majoration: result.rows[0].taux_majore,
                        dateDebAdapt: result.rows[0].date_deb_periode_adaptation,
                        dateFinAdapt: result.rows[0].date_fin_periode_adaptation,
                        jourPrelevement: result.rows[0].jour_paiement
                    }
                    retour.statut = 200
                }
                callback(retour);
            });
    },

    informationFacture (numContrat, callback) {
        db.query('SELECT C.nb_semaines_conges_parents, C.nb_heures_semaine, A.nb_semaines_conges\n' +
            ', C.tarif, F.tarif as tarif_gouter, F1.tarif as tarif_entretien,\n' +
            'Count(P.id_presence_theorique) as jour_semaine, SUM(P.heure_depart - P.heure_arrivee) as heure_semaine\n' +
            'FROM public.contrat C, public.assmat A, public.presencetheorique P, public.frais F, public.frais F1\n' +
            'WHERE C.id_contrat = $1 and C.id_am = A.id_am AND C.id_contrat = P.id_contrat AND P.heure_arrivee is not null\n' +
            'AND F.nom_frais = $2 AND F1.nom_frais = $3 \n' +
            'GROUP BY C.nb_semaines_conges_parents, C.nb_heures_semaine, A.nb_semaines_conges, C.tarif, F.tarif, F1.tarif',
            [numContrat,'gouter' , 'entretien'],
            function (err, rslt) {
                retour = {
                    erreur: null,
                    resultat: null,
                    statut: null
                };
                let e = helper.handleError(err, rslt,'Aucune information');
                retour.erreur = e.erreur;
                retour.statut = e.statut;
                if(retour.erreur == null){
                    retour.resultat = rslt.rows[0]
                    retour.statut = 200
                }
                callback(retour)
            })
    },

    informationContrat (numContrat, callback) {
        db.query('SELECT * FROM public.contrat C, public.enfant E, public.employeur Emp\n' +
            'WHERE C.id_contrat = $1 and C.id_enfant = E.id_enfant AND C.id_employeur = Emp.id_employeur',
            [numContrat],
            function (err, rslt) {
                retour = {
                    erreur: null,
                    resultat: null,
                    statut: null
                };
                let e = helper.handleError(err, rslt,'Aucune information');
                retour.erreur = e.erreur;
                retour.statut = e.statut;
                if(retour.erreur == null){
                    retour.resultat = rslt.rows[0]
                    retour.statut = 200
                }
                callback(retour)
            })
    }

}

module.exports = Contrat;
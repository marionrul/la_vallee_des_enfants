let db = require('../config/db');
let helper = require('../helpers/helper');

let Facture = {

    // récupère toutes les infos necessaires pour ecrire la facture (autres que les presences theo et reelles)
    getBasicsInfosForFacture: function (id_contrat, callback) {
        db.query(
            'SELECT am.nom_usage_am, am.prenom_am, am.nb_semaines_conges, co.id_contrat, co.nb_semaines_conges_parents, ' +
            'co.tarif, co.nb_heures_semaine, co.taux_majore, co.date_deb_periode_adaptation, co.date_fin_periode_adaptation, co.jour_paiement, co.date_fin, ' +
            'em.nom_usage_employeur, em.prenom_employeur, em.rue_employeur, em.cp_employeur, em.ville_employeur, en.nom_enfant, en.prenom_enfant ' +
            'FROM public.assmat am, public.contrat co, public.employeur em, public.enfant en ' +
            'WHERE am.id_am = co.id_am AND em.id_employeur = co.id_employeur AND en.id_enfant = co.id_enfant AND co.id_contrat = $1',
            [id_contrat],
            function (err, rslt){
                retour = {
                    erreur: null,
                    statut: null
                };
                let e = helper.handleError(err, rslt,'Aucun contrats');
                retour.erreur = e.erreur;
                retour.statut = e.statut;
                if(retour.erreur == null){
                    retour.nom_usage_am = rslt.rows[0].nom_usage_am
                    retour.prenom_am = rslt.rows[0].prenom_am
                    retour.nb_semaines_conges = rslt.rows[0].nb_semaines_conges
                    retour.id_contrat = rslt.rows[0].id_contrat
                    retour.nb_semaines_conges_parents = rslt.rows[0].nb_semaines_conges_parents
                    retour.tarif = rslt.rows[0].tarif
                    retour.nb_heures_semaine = rslt.rows[0].nb_heures_semaine
                    retour.taux_majore = rslt.rows[0].taux_majore
                    retour.date_deb_periode_adaptation = rslt.rows[0].date_deb_periode_adaptation
                    retour.date_fin_periode_adaptation = rslt.rows[0].date_fin_periode_adaptation
                    retour.jour_paiement = rslt.rows[0].jour_paiement
                    retour.date_fin_contrat = rslt.rows[0].date_fin
                    retour.nom_usage_employeur = rslt.rows[0].nom_usage_employeur
                    retour.prenom_employeur = rslt.rows[0].prenom_employeur
                    retour.rue_employeur = rslt.rows[0].rue_employeur
                    retour.cp_employeur = rslt.rows[0].cp_employeur
                    retour.ville_employeur = rslt.rows[0].ville_employeur
                    retour.nom_enfant = rslt.rows[0].nom_enfant
                    retour.prenom_enfant = rslt.rows[0].prenom_enfant

                    retour.statut = 200
                }
                callback(retour); // on passe en parametre l'objet retour
                // il faudra verifier si une erreur existe ou non
            }
        );
    },

    // Création d'une facture
    create: function (facture, callback) {
        db.query('INSERT INTO public.facture(mois, annee, id_contrat, nb_jours_conges_payes) VALUES ($1, $2, $3, $4)',
            [facture.mois, facture.annee, facture.id_contrat, 2.5],
            function (e) {
                retour = {
                    erreur : null
                }
                if (e) {
                    retour.erreur = e.toString()
                }
                console.log('c\'est inséré :)')
                callback(retour)
            });
    },

    // Dit si une facture existe deja pour le contrat au mois et annee donnés
        // return true si existe, false sinon
    existeFacture: function (id_contrat, mois, annee, callback) {
        db.query('SELECT id_facture ' +
            'FROM public.facture ' +
            'WHERE mois = $1, annee = $2, id_contrat = $3',
            [mois, annee, id_contrat],
            function (err, rslt) {
                retour = {
                    erreur: null,
                    contrats: null,
                    statut: null
                };
                let e = helper.handleError(err, rslt, 'Aucune facture');
                retour.erreur = e.erreur;
                retour.statut = e.statut;
                if (retour.erreur == null) {
                    retour.existe = true
                } else {
                    retour.existe = false
                }
                retour.statut = 200
            })
            callback(retour)
    },

    getInfosFacture: function (id_contrat, mois, annee, callback) {
        db.query('SELECT * ' +
            'FROM public.facture ' +
            'WHERE mois = $1, annee = $2, id_contrat = $3',
            [mois, annee, id_contrat],
            function (err, rslt){
                retour = {
                    erreur: null,
                    contrats: null,
                    statut: null
                };
                let e = helper.handleError(err, rslt,'Aucune facture');
                retour.erreur = e.erreur;
                retour.statut = e.statut;
                if(retour.erreur == null){
                    retour.id_facture = rslt.rows[0].id_facture,
                    retour.date_debut = rslt.rows[0].date_debut,
                    retour.date_fin = rslt.rows[0].date_fin,
                    retour.nb_jours_activite = rslt.rows[0].nb_jours_activite,
                    retour.nb_heures_normales = rslt.rows[0].nb_heures_normales,
                    retour.nb_heures_supp = rslt.rows[0].nb_heures_supp,
                    retour.nb_jours_conges_payes = rslt.rows[0].nb_heures_supp,
                    retour.mois = rslt.rows[0].mois,
                    retour.annee = rslt.rows[0].annee,
                    retour.nb_heures_majorees = rslt.rows[0].nb_heures_majorees,
                    retour.id_contrat = rslt.rows[0].id_contrat
                    }
                    retour.statut = 200
                })
                callback(retour);
    },

    updateInfosFacture: function (facture, callback) {
        db.query('UPDATE public.facture ' +
            'SET date_debut = $1, date_fin = $2, nb_jours_activite = $3, nb_heures_normales = $4, ' +
            'nb_heures_supp = $5 ' +
            'WHERE id_contrat = $6, mois = $7, annee = $8',
            [facture.date_debut, facture.date_fin, facture.nb_jours_activite, facture.nb_heures_normales, facture.nb_heures_supp, facture.id_contrat, facture.mois, facture.annee],
            function () {
                console.log('c\'est mis à jour :)')
                let retour = 'la facture a bien ete mise a jour'
                callback(retour)
            }
        )
    },

    updatenbHeuresMajo: function (facture, callback) {
        db.query('UPDATE public.facture ' +
            'SET nb_heures_majorees = $1 ' +
            'WHERE id_contrat = $2, mois = $3, annee = $4',
            [facture.nb_heures_majorees, facture.id_contrat, facture.mois, facture.annee],
            function () {
                console.log('c\'est mis à jour :)')
                let retour = 'la facture a bien ete mise a jour'
                callback(retour)
            }
        )
    },


    getAllByIdContrat: function (numContrat, callback) {
        db.query(
            'SELECT * FROM public.facturemensuelle WHERE id_contrat = $1 ORDER BY date_debut DESC ',
            [numContrat],
            function (err, rslt){
                retour = {
                    erreur: null,
                    factures: null,
                    statut: null
                };
                let e = helper.handleError(err, rslt,'Aucun contrats');
                retour.erreur = e.erreur;
                retour.statut = e.statut;
                if(retour.erreur == null){
                    var array = []
                    for(var i = 0; i < rslt.rows.length; i++){
                        console.log(1)
                        array.push({
                            dateDebut: rslt.rows[i].date_debut,
                            dateFin: rslt.rows[i].date_fin,
                            nbJoursActivite: rslt.rows[i].nb_jours_activite,
                            nbHeuresNormales: rslt.rows[i].nb_heures_normales,
                            nbHeuresSupp: rslt.rows[i].nb_heures_supp,
                            nbJoursCongesPayes: rslt.rows[i].nb_jours_conges_payes,
                            mois: rslt.rows[i].mois,
                            annee: rslt.rows[i].annee,
                            nbHeuresMajorees: rslt.rows[i].nb_heures_majorees,
                            idContrat: rslt.rows[i].id_contrat
                        });
                        console.log('array', array)
                    }
                    retour.factures = array;
                    retour.statut = 200
                } // on remplie contrats avec les contrats de la BD
                callback(retour); // on passe en parametre l'objet retour
                // il faudra verifier si une erreur existe ou non
            }
        );
    },

}

module.exports = Facture;
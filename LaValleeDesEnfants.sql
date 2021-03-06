drop table if exists public."disposer" cascade;
drop table if exists public."apourparent" cascade;
drop table if exists public."apourtuteur" cascade;
drop table if exists public."parent" cascade;
drop table if exists public."assmat" cascade;
drop table if exists public."contrat" cascade;
drop table if exists public."employeur" cascade;
drop table if exists public."enfant" cascade;
drop table if exists public."etreenconges" cascade;
drop table if exists public."evenement" cascade;
drop table if exists public."facturemensuelle" cascade;
drop table if exists public."periodeconges" cascade;
drop table if exists public."post" cascade;
drop table if exists public."presencereelle" cascade;
drop table if exists public."presencetheorique" cascade;
drop table if exists public."tuteur" cascade;
drop table if exists public."typecontrat" cascade;
drop table if exists public."typejour" cascade;
drop table if exists public."typetuteur" cascade;
drop table if exists public."compte" cascade;
drop table if exists public."modedepaiement" cascade;
drop table if exists public."frais" cascade;
drop table if exists public."contact" cascade;

create table public."enfant"
(
    id_enfant SERIAL NOT NULL primary key,
    nom_enfant character varying(255) not null,
    prenom_enfant character varying(255) not null,
    date_naissance_enfant date not null,
    sexe character varying(1) not null
)
with (
    oids = false
);

-- Table: public.typetuteur

-- DROP TABLE public.typetuteur;

CREATE TABLE public.typetuteur
(
    id_type_tuteur SERIAL NOT NULL,
    "nom_type_tuteur" character varying NOT NULL,
    CONSTRAINT typetuteur_pkey PRIMARY KEY (id_type_tuteur)
)
WITH (
    OIDS = FALSE
);

-- Table: public.tuteur

-- DROP TABLE public.tuteur;

CREATE TABLE public.tuteur
(
    id_tuteur SERIAL NOT NULL,
    nom_tuteur character varying NOT NULL,
    prenom_tuteur character varying NOT NULL,
    telephone character varying(10) NOT NULL,
    profession character varying(255),
    id_type_tuteur integer NOT NULL,
    telephone_pro character varying,
    CONSTRAINT tuteur_pkey PRIMARY KEY (id_tuteur),
    CONSTRAINT tuteur_id_type_tuteur_fkey FOREIGN KEY (id_type_tuteur)
        REFERENCES public.typetuteur (id_type_tuteur) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)
WITH (
    OIDS = FALSE
);
-- Table: public.apourtuteur

-- DROP TABLE public.apourtuteur;

CREATE TABLE public.apourtuteur
(
    id_enfant integer NOT NULL,
    id_tuteur integer NOT NULL,
	constraint "apourtuteur_pkey" primary key (id_enfant, id_tuteur),
    CONSTRAINT apourparent_id_enfant_fkey FOREIGN KEY (id_enfant)
        REFERENCES public.enfant (id_enfant) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT apourtuteur_id_tuteur_fkey FOREIGN KEY (id_tuteur)
        REFERENCES public.tuteur (id_tuteur) MATCH SIMPLE
        ON UPDATE NO ACTION
       ON DELETE CASCADE
)
WITH (
    OIDS = FALSE
);

create table public."evenement"
(
    id_evenement SERIAL NOT NULL primary key,
    libelle_evenement character varying (255) not null,
    date_debut date not null,
    date_fin date not null
)with (
    oids = false
);

-- table: public."assmat"

-- drop table public."assmat";

create table public."assmat"
(
    id_am SERIAL NOT NULL primary key,
    nom_naissance_am character varying(255) not null,
    nom_usage_am character varying(255) not null,
    prenom_am character varying(255) not null,
    tel_am character varying(10) not null,
    nb_semaines_conges integer not null,
    date_naissance_am date not null,
    ville_naissance_am character varying(255) not null,
    numero_ss character varying not null,
    date_agrement date not null,
    reference_agrement character varying not null,
    assurance_resp_civile character varying not null,
    num_police character varying not null,
    login character varying(255) not null,
    mot_de_passe_am character varying not null,
    rue_am character varying NOT NULL,
    cp_am character varying NOT NULL,
    ville_am character varying NOT NULL

)
with (
    oids = false
);

-- table: public."typecontrat"

-- drop table public."typecontrat";

create table public."typecontrat"
(
    id_type SERIAL NOT NULL primary key,
    nom_type character varying(255) not null
)
with (
    oids = false
);

-- table: public."typejour"

-- drop table public."typejour";

create table public."typejour"
(
    id_type SERIAL NOT NULL primary key,
    libelle character varying not null
)
with (
    oids = false
);

-- table: public."post"

-- drop table public."post";

create table public."post"
(
    id_post SERIAL NOT NULL primary key,
    date_post date not null,
    texte text not null,
    image character varying,
    titre character varying,
    id_am integer not null,
    image_id character varying,
    constraint "post_id_am_fkey" foreign key (id_am)
        references public."assmat" (id_am) match simple
        on update no action
        ON DELETE CASCADE
)
with (
    oids = false
);
-- table: public."periodeconges"

-- drop table public."periodeconges";

create table public."periodeconges"
(
    "date_debut" date not null,
    "date_fin" date not null,
    id_periode SERIAL NOT NULL primary key

)
with (
    oids = false
);

-- table: public."etreenconges"

-- drop table public."etreenconges";

create table public."etreenconges"
(
    id_am integer not null,
    id_periode integer not null,
    constraint "etreenconges_pkey" primary key (id_am, id_periode),
    constraint "etreenconges_id_am_fkey" foreign key (id_am)
        references public."assmat" (id_am) match simple
        on update no action
        ON DELETE CASCADE,
    constraint "etreenconges_id_periode_fkey" foreign key (id_periode)
        references public."periodeconges" (id_periode) match simple
        on update no action
        ON DELETE CASCADE
)
with (
    oids = false
);

-- Table: public.employeur

-- DROP TABLE public.employeur;

CREATE TABLE public.employeur
(
    id_employeur SERIAL NOT NULL,
    nom_naissance_employeur character varying NOT NULL,
    nom_usage_employeur character varying NOT NULL,
    prenom_employeur character varying NOT NULL,
    rue_employeur character varying NOT NULL,
    cp_employeur character varying NOT NULL,
    ville_employeur character varying NOT NULL,
    mail_employeur character varying NOT NULL,
    telephone_employeur character varying NOT NULL,
    identifiant_connexion character varying NOT NULL,
    mot_de_passe character varying NOT NULL,
    CONSTRAINT employeur_pkey PRIMARY KEY (id_employeur)
)
WITH (
    OIDS = FALSE
);


-- table: public."modedepaiement"

-- drop table public."modedepaiement";

create table public."modedepaiement"
(
    id_mode SERIAL NOT NULL primary key,
    nom_mode character varying(255) not null
)
with (
    oids = false
);

-- table: public."frais"

-- drop table public."frais";

create table public."frais"
(
    id_frais SERIAL NOT NULL primary key,
    nom_frais character varying not null,
    tarif numeric not null
)
with (
    oids = false
);

-- Table: public.contrat

-- DROP TABLE public.contrat;

CREATE TABLE public.contrat
(
    id_contrat character varying NOT NULL,
    date_debut date,
    date_fin date,
    nb_semaines_conges_parents integer,
    tarif numeric,
    nb_heures_semaine numeric,
    taux_majore numeric,
    date_deb_periode_adaptation date,
    date_fin_periode_adaptation date,
    id_enfant integer,
    id_mode_paiement integer,
    id_am integer NOT NULL,
    id_employeur integer,
    jour_paiement integer,
    id_type_contrat integer,
    CONSTRAINT contrat_pkey PRIMARY KEY (id_contrat),
    CONSTRAINT contrat_id_am_fkey FOREIGN KEY (id_am)
        REFERENCES public.assmat (id_am) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT employeur_id_employeur_fkey FOREIGN KEY (id_employeur)
        REFERENCES public.employeur (id_employeur) MATCH SIMPLE
        ON UPDATE NO ACTION
       ON DELETE CASCADE,
    CONSTRAINT contrat_id_enfant_fkey FOREIGN KEY (id_enfant)
        REFERENCES public.enfant (id_enfant) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT contrat_id_mode_paiement_fkey FOREIGN KEY (id_mode_paiement)
        REFERENCES public.modedepaiement (id_mode) MATCH SIMPLE
        ON UPDATE NO ACTION
       ON DELETE CASCADE,
    CONSTRAINT contrat_idO_type_contrat_fkey FOREIGN KEY (id_type_contrat)
        REFERENCES public.typecontrat (id_type) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)
WITH (
    OIDS = FALSE
);
-- table: public."presencetheorique"

-- drop table public."presencetheorique";

CREATE TABLE public.presencetheorique
(
    prends_gouter boolean,
    id_contrat character varying NOT NULL,
    id_type_jour integer NOT NULL,
    heure_depart time without time zone,
    id_presence_theorique SERIAL,
    heure_arrivee time without time zone,
    CONSTRAINT presencetheorique_pkey PRIMARY KEY (id_presence_theorique),
    CONSTRAINT presencetheorique_id_contrat_fkey FOREIGN KEY (id_contrat)
        REFERENCES public.contrat (id_contrat) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT presencetheorique_id_type_jour_fkey FOREIGN KEY (id_type_jour)
        REFERENCES public.typejour (id_type) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)
WITH (
    OIDS = FALSE
);
-- table: public."facturemensuelle"

-- drop table public."facturemensuelle";

create table public."facturemensuelle"
(
    id_facture SERIAL NOT NULL primary key,
    date_debut date,
    date_fin date,
    nb_jours_activite integer,
    nb_heures_normales numeric,
    nb_heures_supp numeric,
    nb_jours_conges_payes integer not null,
    mois integer not null,
    annee integer not null,
    nb_heures_majorees numeric,
    id_contrat  character varying not null,
    constraint "facturemensuelle_id_contrat_fkey" foreign key (id_contrat)
        references public."contrat" (id_contrat) match simple
        on update no action
        ON DELETE CASCADE
)
with (
    oids = false
);
-- table: public."presencereelle"

-- drop table public."presencereelle";

CREATE TABLE public.presencereelle
(
    datepresencereelle date,
    heure_arrivee_r time without time zone,
    heure_depart_r time without time zone,
    prends_gouter_r boolean,
    id_presence_theo integer,
    id_presence_reelle SERIAL,
    id_facture integer,
    absence_justifiee boolean,
    CONSTRAINT presencereelle_pkey PRIMARY KEY (id_presence_reelle),
    CONSTRAINT presencereelle_id_facture_fkey FOREIGN KEY (id_facture)
        REFERENCES public.facturemensuelle (id_facture) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)
WITH (
    OIDS = FALSE
);

CREATE TABLE public.contact (
    id_contact SERIAL NOT NULL primary key,
    mail character varying,
    sujet character varying,
    message character varying,
    date_envoi date,
    ouvert boolean
)
WITH (
    OIDS = FALSE
);

INSERT INTO public.typetuteur(nom_type_tuteur)
	VALUES ('Père'),('Mère'),('Tuteur');
INSERT INTO public.typejour(libelle)
	VALUES ('Lundi'), ('Mardi'), ('Mercredi'), ('Jeudi'), ('Vendredi'), ('Samedi'), ('Dimanche');
INSERT INTO public.typecontrat(nom_type)
	VALUES ('CDI');
INSERT INTO public.modedepaiement(nom_mode)
	VALUES ('Virement'), ('Chèque'), ('Espèces');
INSERT INTO public.frais(nom_frais, tarif)
    VALUES ('gouter', 1), ('entretien', 4);

insert into public.assmat
(nom_naissance_am, nom_usage_am, prenom_am, tel_am, nb_semaines_conges, date_naissance_am, ville_naissance_am,
numero_ss, date_agrement, reference_agrement, assurance_resp_civile, num_police, login, mot_de_passe_am, rue_am,
 cp_am, ville_am)
values ('PERNELLE','PERNELLE','Leo','0635480137','5','1995-01-09','Creil','45','2018-05-01','gktlm','MEP','17',
'leopernelle','$2b$08$v2uhaaDUVzJW5gWFvfWGteHln1unc8FF2E6m3jQq8tmjUDXoKQjAi',
'18 rue Saint Firmin','34000','Montpellier');
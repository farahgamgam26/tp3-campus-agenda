import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from "react-native";
type Evenement = {
  id: string;
  titre: string;
  categorie: string;
  capacite: number;
  inscrits: number;
};

const evenements: Evenement[] = [
  {
    id: "E01",
    titre: "Atelier React",
    categorie: "Atelier",
    capacite: 25,
    inscrits: 25,
  },
  {
    id: "E02",
    titre: "Conférence IA",
    categorie: "Conférence",
    capacite: 70,
    inscrits: 52,
  },
  {
    id: "E03",
    titre: "Sécurité mobile",
    categorie: "Atelier",
    capacite: 20,
    inscrits: 17,
  },
  {
    id: "E04",
    titre: "Design UI",
    categorie: "Atelier",
    capacite: 18,
    inscrits: 9,
  },
  {
    id: "E05",
    titre: "Forum projets",
    categorie: "Rencontre",
    capacite: 50,
    inscrits: 49,
  },
  {
    id: "E06",
    titre: "Découverte Git",
    categorie: "Atelier",
    capacite: 24,
    inscrits: 24,
  },
];

function placesRestantes(e: Evenement): number {
  return Math.max(0, e.capacite - e.inscrits);
}

function statutEvenement(e: Evenement): string {
  const places = placesRestantes(e);

  if (places === 0) {
    return "Complet";
  } else if (places <= 3) {
    return "Presque complet";
  } else {
    return "Ouvert";
  }
}

const nombreTotal = evenements.length;

const nombreComplets = evenements.filter(
  (e) => placesRestantes(e) === 0
).length;

const nombreAvecPlaces = evenements.filter(
  (e) => placesRestantes(e) > 0
).length;

const totalPlaces = evenements.reduce(
  (total, e) => total + placesRestantes(e),
  0
);

const ateliersDisponibles = evenements.filter(
  (e) =>
    e.categorie === "Atelier" &&
    placesRestantes(e) > 0
);

type BadgeEtatProps = {
  statut: string;
};

function BadgeEtat({ statut }: BadgeEtatProps) {
  let couleur = "#d1fae5";

  if (statut === "Complet") {
    couleur = "#fecaca";
  } else if (statut === "Presque complet") {
    couleur = "#fed7aa";
  }

  return (
    <View style={[styles.badge, { backgroundColor: couleur }]}>
      <Text>{statut}</Text>
    </View>
  );
}

type CarteEvenementProps = {
  evenement: Evenement;
};

function CarteEvenement({ evenement }: CarteEvenementProps) {
  return (
    <View style={styles.carte}>
      <Text style={styles.titreCarte}>
        {evenement.titre}
      </Text>

      <Text>Catégorie : {evenement.categorie}</Text>

      <Text>
        {placesRestantes(evenement)} places libres
      </Text>

      <BadgeEtat statut={statutEvenement(evenement)} />
    </View>
  );
}

type BlocStatistiqueProps = {
  libelle: string;
  nombre: number;
};

function BlocStatistique({
  libelle,
  nombre,
}: BlocStatistiqueProps) {
  return (
    <View style={styles.blocStatistique}>
      <Text>{libelle}</Text>

      <Text style={styles.nombre}>
        {nombre}
      </Text>
    </View>
  );
}

const mode: "tous" | "ateliers" = "tous";

export default function App() {
  const evenementsAffiches =
    mode === "tous"
      ? evenements
      : ateliersDisponibles;

  return (
    <View style={styles.container}>
      <Text style={styles.titre}>
        CampusAgenda
      </Text>

      <Text style={styles.sousTitre}>
        Découvrez les événements du campus
      </Text>

      <View style={styles.statistiques}>
        <BlocStatistique
          libelle="Total événements"
          nombre={nombreTotal}
        />

        <BlocStatistique
          libelle="Événements complets"
          nombre={nombreComplets}
        />

        <BlocStatistique
          libelle="Avec places"
          nombre={nombreAvecPlaces}
        />

        <BlocStatistique
          libelle="Places disponibles"
          nombre={totalPlaces}
        />
      </View>

      <Text style={styles.titreSection}>
        {mode === "tous"
          ? "Tous les événements"
          : "Ateliers disponibles"}
      </Text>

      <FlatList
        data={evenementsAffiches}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CarteEvenement evenement={item} />
        )}
        ListEmptyComponent={
          <Text>Aucun événement disponible</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    padding: 20,
  },
  titre: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  sousTitre: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#666",
  },
  statistiques: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
  },
  blocStatistique: {
    backgroundColor: "#e0e7ff",
    padding: 15,
    margin: 5,
    borderRadius: 10,
    flex: 1,
    minWidth: 130,
  },
  nombre: {
    fontSize: 22,
    fontWeight: "bold",
  },
  titreSection: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  carte: {
    backgroundColor: "#ffffff",
    padding: 15,
    marginVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#dddddd",
  },
  titreCarte: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  badge: {
    padding: 8,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginTop: 8,
  },
});

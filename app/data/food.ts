/**
 * If you want to create a new food type, just add it here and it should automatically
 * apply everywhere.
 */
export const food = {
  beef: {
    CO2E: 3,
    categorie: "meat",
    color: "#fbd203",
  },
  chicken: {
    CO2E: 2,
    categorie: "meat",
    color: "#ffb300",
  },
  dairy: {
    CO2E: 1.5,
    categorie: "dairy & eggs",
    color: "#ff9100",
  },
  plant: {
    CO2E: 1,
    categorie: "plant",
    color: "#ff99ff",
  },
} as const;

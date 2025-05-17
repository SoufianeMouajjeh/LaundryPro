export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  subcategory?: string;
}

export const products: Product[] = [
  // Casuals
  {
    id: "jeans",
    name: "Jeans",
    description: "Nettoyage professionnel de jeans pour une fraîcheur longue durée",
    price: 15,
    category: "Casuals"
  },
  {
    id: "chemise",
    name: "Chemise",
    description: "Lavée, repassée, soigneusement pliée et prête à porter",
    price: 13,
    category: "Casuals"
  },
  {
    id: "costume",
    name: "Costume",
    description: "Pressing complet pour vos ensembles professionnels",
    price: 30,
    category: "Casuals"
  },
  {
    id: "jacket",
    name: "Jacket",
    description: "Soins experts pour vos vestes de ville",
    price: 25,
    category: "Casuals"
  },
  {
    id: "pull",
    name: "Pull",
    description: "Spécial laine et cachemire pour un résultat parfait",
    price: 15,
    category: "Casuals"
  },
  {
    id: "tshirt",
    name: "T-shirt",
    description: "Lavage quotidien avec soin professionnel",
    price: 12,
    category: "Casuals"
  },
  {
    id: "robe",
    name: "Robe",
    description: "Traitement délicat pour vos robes, tout en douceur",
    price: 50,
    category: "Casuals"
  },
  {
    id: "jupe",
    name: "Jupe",
    description: "Pressing impeccable pour toutes vos jupes",
    price: 30,
    category: "Casuals"
  },

  // Traditionnels
  {
    id: "caftan",
    name: "Caftan",
    description: "Nettoyage selon les normes traditionnelles",
    price: 50,
    category: "Traditionnels"
  },
  {
    id: "takchita",
    name: "Takchita",
    description: "Traitement spécial pour vos tenues traditionnelles",
    price: 100,
    category: "Traditionnels"
  },
  {
    id: "djellaba",
    name: "Djellaba",
    description: "Nettoyage professionnel pour vos djellabas",
    price: 40,
    category: "Traditionnels"
  },
  {
    id: "jabador",
    name: "Jabador",
    description: "Entretien soigné pour vos ensembles traditionnels",
    price: 50,
    category: "Traditionnels"
  },

  // Linge Maison
  {
    id: "couette",
    name: "Couette",
    description: "Nettoyage professionnel pour vos couettes",
    price: 30,
    category: "Linge Maison"
  },
  {
    id: "oreiller",
    name: "Oreiller",
    description: "Lavage soigné pour vos oreillers",
    price: 20,
    category: "Linge Maison"
  },
  {
    id: "tapis",
    name: "Tapis",
    description: "Lavage professionnel au m² pour tapis",
    price: 20,
    category: "Linge Maison",
    subcategory: "per_m2"
  },
  {
    id: "nappe",
    name: "Nappe de Table",
    description: "Nettoyage soigné pour vos nappes",
    price: 15,
    category: "Linge Maison"
  },
  {
    id: "drap2",
    name: "Drap 2 Places",
    description: "Lavage professionnel de drap pour lit double",
    price: 18,
    category: "Linge Maison"
  },
  {
    id: "drap1",
    name: "Drap 1 Place",
    description: "Nettoyage soigné de drap pour lit simple",
    price: 10,
    category: "Linge Maison"
  }
];

export const services = {
  pressingKilo: {
    name: "Pressing au Kilo",
    price: 30,
    unit: "kg"
  },
  repassage: {
    name: "Repassage Uniquement",
    discount: 0.35, // 35% discount
    minItems: 5
  }
}; 
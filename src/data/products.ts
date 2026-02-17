export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  weight: string;
}

export const categories = [
  "Traditional Sweets",
  "Baklava",
  "Dry Fruit Sweets",
  "Ghee Sweets",
  "Halwa",
  "Milk Sweets",
  "Pickles and Rice Mix",
  "Savouries",
  "Home Made Sweets",
  "Nellai Special Savouries",
] as const;

export type Category = (typeof categories)[number];

const generateProducts = (): Product[] => {
  const items: Record<string, { name: string; price: number; desc: string; weight: string }[]> = {
    "Traditional Sweets": [
      { name: "Motichoor Laddu", price: 280, desc: "Golden pearl-shaped laddu made with besan and saffron", weight: "250g" },
      { name: "Mysore Pak", price: 320, desc: "Rich ghee-based sweet from Karnataka's royal kitchens", weight: "250g" },
      { name: "Jangri", price: 260, desc: "Spiral-shaped crispy sweet soaked in sugar syrup", weight: "250g" },
      { name: "Gulab Jamun", price: 300, desc: "Soft milk-solid dumplings in rose-scented syrup", weight: "500g" },
      { name: "Kaju Katli", price: 480, desc: "Diamond-shaped cashew fudge with silver vark", weight: "250g" },
      { name: "Soan Papdi", price: 220, desc: "Flaky, melt-in-mouth layered sweet with cardamom", weight: "250g" },
      { name: "Rasgulla", price: 280, desc: "Soft spongy cottage cheese balls in light syrup", weight: "500g" },
      { name: "Peda", price: 300, desc: "Rich condensed milk sweet flavored with saffron", weight: "250g" },
      { name: "Barfi Assortment", price: 350, desc: "Mixed barfi collection with nuts and flavors", weight: "500g" },
      { name: "Coconut Laddu", price: 240, desc: "Fresh grated coconut and condensed milk laddu", weight: "250g" },
    ],
    "Baklava": [
      { name: "Pistachio Baklava", price: 450, desc: "Crispy phyllo layers filled with premium pistachios", weight: "250g" },
      { name: "Walnut Baklava", price: 420, desc: "Honey-soaked baklava with crunchy walnut filling", weight: "250g" },
      { name: "Cashew Baklava", price: 480, desc: "Golden baklava with roasted cashew and cardamom", weight: "250g" },
      { name: "Almond Baklava", price: 440, desc: "Delicate layers with blanched almond filling", weight: "250g" },
      { name: "Mixed Nut Baklava", price: 500, desc: "Assorted premium nuts in flaky pastry layers", weight: "250g" },
      { name: "Rose Baklava", price: 460, desc: "Rose water infused baklava with pistachio", weight: "250g" },
      { name: "Chocolate Baklava", price: 520, desc: "Modern twist with Belgian chocolate and nuts", weight: "250g" },
      { name: "Saffron Baklava", price: 550, desc: "Premium saffron-scented with dry fruits", weight: "250g" },
      { name: "Baklava Rolls", price: 400, desc: "Cylindrical baklava filled with mixed nuts", weight: "250g" },
      { name: "Bird's Nest Baklava", price: 480, desc: "Shredded phyllo nests with pistachio center", weight: "250g" },
    ],
    "Dry Fruit Sweets": [
      { name: "Dry Fruit Laddu", price: 520, desc: "Power-packed laddu with dates and mixed nuts", weight: "250g" },
      { name: "Anjeer Barfi", price: 480, desc: "Fig and nut barfi with silver garnish", weight: "250g" },
      { name: "Date Walnut Roll", price: 420, desc: "Natural date rolls stuffed with walnuts", weight: "250g" },
      { name: "Kaju Pista Roll", price: 500, desc: "Cashew roll layered with pistachio paste", weight: "250g" },
      { name: "Almond Pinni", price: 450, desc: "Traditional Punjabi almond sweet with ghee", weight: "250g" },
      { name: "Mixed Dry Fruit Chikki", price: 350, desc: "Crunchy jaggery brittle with assorted nuts", weight: "250g" },
      { name: "Badam Halwa Bites", price: 480, desc: "Soft almond halwa cut into bite-sized pieces", weight: "250g" },
      { name: "Pista Burfi", price: 550, desc: "Pure pistachio fudge with rose essence", weight: "250g" },
      { name: "Fruit & Nut Squares", price: 400, desc: "Compressed fruit and nut energy squares", weight: "250g" },
      { name: "Cashew Cluster", price: 460, desc: "Caramelized cashew clusters with cardamom", weight: "250g" },
    ],
    "Ghee Sweets": [
      { name: "Ghee Mysore Pak", price: 380, desc: "Extra rich mysore pak with pure desi ghee", weight: "250g" },
      { name: "Nei Appam", price: 300, desc: "Traditional ghee-fried sweet rice dumpling", weight: "500g" },
      { name: "Ghee Laddu", price: 280, desc: "Classic besan laddu made with aromatic ghee", weight: "250g" },
      { name: "Ghee Pongal Sweet", price: 260, desc: "Festival sweet made with rice, dal and ghee", weight: "500g" },
      { name: "Ghee Halwa", price: 320, desc: "Smooth wheat halwa swimming in pure ghee", weight: "250g" },
      { name: "Neyyi Payasam", price: 280, desc: "Ghee-enriched vermicelli payasam mix", weight: "250g" },
      { name: "Ghee Burfi", price: 300, desc: "Dense milk burfi enriched with premium ghee", weight: "250g" },
      { name: "Ghee Jalebi", price: 250, desc: "Crispy spirals deep-fried in pure ghee", weight: "250g" },
      { name: "Ghee Puri Sweet", price: 220, desc: "Flaky sweet puri prepared in aromatic ghee", weight: "250g" },
      { name: "Pure Ghee Mixture", price: 340, desc: "Savory-sweet mix prepared entirely in ghee", weight: "250g" },
    ],
    "Halwa": [
      { name: "Tirunelveli Halwa", price: 350, desc: "Famous wheat halwa from Nellai with pure ghee", weight: "250g" },
      { name: "Carrot Halwa", price: 280, desc: "Fresh grated carrot slow-cooked with milk and ghee", weight: "500g" },
      { name: "Moong Dal Halwa", price: 320, desc: "Rich lentil halwa with saffron and dry fruits", weight: "250g" },
      { name: "Beetroot Halwa", price: 280, desc: "Vibrant beetroot halwa with coconut and cardamom", weight: "250g" },
      { name: "Bread Halwa", price: 240, desc: "Unique halwa made with bread, ghee, and nuts", weight: "250g" },
      { name: "Ashoka Halwa", price: 300, desc: "Translucent moong dal halwa from Trichy", weight: "250g" },
      { name: "Rava Halwa", price: 260, desc: "Semolina halwa with ghee, saffron and raisins", weight: "250g" },
      { name: "Pumpkin Halwa", price: 280, desc: "Seasonal pumpkin halwa with khoya and nuts", weight: "250g" },
      { name: "Badam Halwa", price: 450, desc: "Pure almond halwa rich in flavor and texture", weight: "250g" },
      { name: "Double Ka Meetha", price: 300, desc: "Hyderabadi bread pudding in saffron milk", weight: "500g" },
    ],
    "Milk Sweets": [
      { name: "Milk Peda", price: 300, desc: "Classic condensed milk peda with saffron", weight: "250g" },
      { name: "Kalakand", price: 320, desc: "Soft granular milk cake with cardamom", weight: "250g" },
      { name: "Rasmalai", price: 350, desc: "Flat cottage cheese patties in saffron cream", weight: "500g" },
      { name: "Paneer Jalebi", price: 280, desc: "Soft paneer jalebi in light sugar syrup", weight: "250g" },
      { name: "Milk Cake", price: 300, desc: "Caramelized milk cake with rich brown flavor", weight: "250g" },
      { name: "Kheer Kadam", price: 340, desc: "Cottage cheese ball coated in kheer layer", weight: "250g" },
      { name: "Sandesh", price: 320, desc: "Bengali cottage cheese sweet with pistachio", weight: "250g" },
      { name: "Rabri", price: 280, desc: "Thick sweetened condensed milk with nuts", weight: "250g" },
      { name: "Chum Chum", price: 300, desc: "Oval cottage cheese sweet in colored coconut", weight: "250g" },
      { name: "Malai Laddu", price: 280, desc: "Cream-based laddu with cardamom essence", weight: "250g" },
    ],
    "Pickles and Rice Mix": [
      { name: "Mango Pickle", price: 220, desc: "Tangy raw mango pickle in mustard oil", weight: "250g" },
      { name: "Lemon Pickle", price: 200, desc: "Zesty lemon pickle with traditional spices", weight: "250g" },
      { name: "Mixed Vegetable Pickle", price: 240, desc: "Assorted vegetable pickle in sesame oil", weight: "250g" },
      { name: "Tomato Rice Mix", price: 180, desc: "Instant tomato rice seasoning powder", weight: "100g" },
      { name: "Lemon Rice Mix", price: 180, desc: "Ready-to-use lemon rice spice blend", weight: "100g" },
      { name: "Tamarind Rice Mix", price: 200, desc: "Authentic puliyodarai rice paste", weight: "200g" },
      { name: "Coconut Rice Mix", price: 180, desc: "Fresh coconut chutney powder for rice", weight: "100g" },
      { name: "Garlic Pickle", price: 220, desc: "Spicy garlic pickle in gingelly oil", weight: "250g" },
      { name: "Curd Chilli Pickle", price: 200, desc: "Green chilli pickle in yogurt base", weight: "250g" },
      { name: "Curry Leaf Rice Mix", price: 180, desc: "Fragrant curry leaf powder for rice", weight: "100g" },
    ],
    "Savouries": [
      { name: "Murukku", price: 220, desc: "Crispy spiral-shaped rice flour snack", weight: "250g" },
      { name: "Mixture", price: 240, desc: "Classic South Indian snack mix", weight: "250g" },
      { name: "Ribbon Pakoda", price: 200, desc: "Thin crispy ribbon-shaped gram flour snack", weight: "250g" },
      { name: "Thattai", price: 200, desc: "Flat crispy rice crackers with cumin", weight: "250g" },
      { name: "Seedai", price: 220, desc: "Round rice flour balls, crunchy and savory", weight: "250g" },
      { name: "Omapodi", price: 200, desc: "Thin besan noodles with ajwain flavor", weight: "250g" },
      { name: "Kara Sev", price: 200, desc: "Spicy thin gram flour noodles", weight: "250g" },
      { name: "Masala Vadai Mix", price: 180, desc: "Ready-to-fry lentil vadai batter mix", weight: "200g" },
      { name: "Banana Chips", price: 200, desc: "Crispy raw banana chips in coconut oil", weight: "250g" },
      { name: "Athirasam", price: 280, desc: "Traditional jaggery and rice flour sweet snack", weight: "250g" },
    ],
    "Home Made Sweets": [
      { name: "Palkova", price: 320, desc: "Thick reduced milk sweet, home-style", weight: "250g" },
      { name: "Adhirasam", price: 280, desc: "Traditional jaggery doughnut-style sweet", weight: "250g" },
      { name: "Coconut Burfi", price: 260, desc: "Fresh coconut and sugar homestyle burfi", weight: "250g" },
      { name: "Rava Laddu", price: 240, desc: "Semolina laddu with ghee and cashews", weight: "250g" },
      { name: "Peanut Chikki", price: 200, desc: "Crunchy peanut jaggery brittle bars", weight: "250g" },
      { name: "Ellu Urundai", price: 220, desc: "Sesame seed and jaggery balls", weight: "250g" },
      { name: "Aval Pori Urundai", price: 200, desc: "Puffed rice balls with jaggery", weight: "250g" },
      { name: "Nei Urundai", price: 280, desc: "Ghee-rich gram flour sweet balls", weight: "250g" },
      { name: "Kozhukattai", price: 240, desc: "Steamed rice dumplings with jaggery filling", weight: "250g" },
      { name: "Sakkarai Pongal", price: 260, desc: "Sweet rice and lentil pudding with ghee", weight: "500g" },
    ],
    "Nellai Special Savouries": [
      { name: "Nellai Seval", price: 260, desc: "Famous Tirunelveli crispy rice noodles", weight: "250g" },
      { name: "Nellai Murukku", price: 240, desc: "Signature Nellai-style butter murukku", weight: "250g" },
      { name: "Nellai Mixture", price: 260, desc: "Spicy Nellai special snack mixture", weight: "250g" },
      { name: "Thenkuzhal", price: 220, desc: "Ring-shaped crispy snack from Nellai", weight: "250g" },
      { name: "Nellai Pakoda", price: 220, desc: "Thick crunchy gram flour fritters", weight: "250g" },
      { name: "Kara Boondhi", price: 200, desc: "Spicy tiny gram flour pearls", weight: "250g" },
      { name: "Nellai Chips", price: 220, desc: "Crispy tapioca chips Nellai style", weight: "250g" },
      { name: "Seeni Urundai", price: 240, desc: "Sweet sugar-coated rice flour balls", weight: "250g" },
      { name: "Nellai Thattai", price: 220, desc: "Large crispy Nellai rice crackers", weight: "250g" },
      { name: "Vathal Chips", price: 240, desc: "Sun-dried vegetable chips from Nellai", weight: "250g" },
    ],
  };

  const products: Product[] = [];
  Object.entries(items).forEach(([category, prods]) => {
    prods.forEach((p, i) => {
      products.push({
        id: `${category.toLowerCase().replace(/\s+/g, "-")}-${i + 1}`,
        name: p.name,
        price: p.price,
        category,
        image: `/placeholder.svg`,
        description: p.desc,
        weight: p.weight,
      });
    });
  });

  return products;
};

export const products = generateProducts();

export const getProductsByCategory = (category: string) =>
  products.filter((p) => p.category === category);

export const searchProducts = (query: string) => {
  const q = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
  );
};

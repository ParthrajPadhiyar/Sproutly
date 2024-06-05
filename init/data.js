const sampleListings = [
    {
      title: "Apple Seeds",
      gujname: "સફરજન",
      description:
        "Grow your own apple trees! These majestic trees produce delicious fruits enjoyed fresh or in pies and juices. Apple trees prefer full sun and well-drained soil.",
      image: {
        filename: "itemimage",
        url: "https://th.bing.com/th/id/OIG2.Ch5pgoR859VIpn9Zz5.p?pid=ImgGn",
      } ,
      category: ["Fruit","Vegetable"],
      price: 199,
      
      
    },
    {
      title: "Coriander Seeds",
      gujname: "ધાણા (Dhana)",
      description:
        "Add a burst of flavor to your dishes with homegrown coriander! This versatile herb is used in various cuisines and thrives in full sun with moderate watering.",
      image: {
        filename: "itemimage",
        url: "https://th.bing.com/th/id/OIG1.L1zpQJsRgSMcv1w97Dzc?w=1024&h=1024&rs=1&pid=ImgDetMain",
      } ,
      category: ["Spice","Vegetable"],
      price: 299,
      
      
    },
    {
      title: "Fenugreek Seeds",
      gujname: "મેથી (Methi) ",
      description:
        "Fenugreek boasts both culinary and medicinal benefits. Enjoy its unique flavor in curries or use the leaves for their health properties. Fenugreek prefers full sun and well-drained soil.",
      image: {
        filename: "itemimage",
        url: "https://th.bing.com/th/id/OIG2.yPphU8GS2PGiZiBIdyvV?pid=ImgGn",
      } ,
      category: ["Herb","Vegetable"],
      price: 99,
      
      
    },
    {
      title: "Holy Basil Seeds",
      gujname: "તુલસી (Tulsi)",
      description:
        "Considered sacred in Hinduism, holy basil offers a beautiful addition to your garden with its fragrant leaves. It thrives in full sun and enjoys regular watering.",
      image: {
        filename: "itemimage",
        url: "https://th.bing.com/th/id/OIG2.Dbmw.ja1UvFEcn4JCsdC?w=1024&h=1024&rs=1&pid=ImgDetMain",
      } ,
      category: ["Herb"],
      price: 259,
      
      
    },
    {
      title: "Eggplant Seeds",
      gujname: "રીંગણા",
      description:
        "Explore the world of eggplants with your own seeds! These versatile vegetables come in various shapes and sizes and thrive in full sun with warm temperatures.",
      image: {
        filename: "itemimage",
        url: "https://th.bing.com/th/id/OIG1.1Y7eKzsOW8W19_oUJgJd?pid=ImgGn",
      } ,
      category: ["Vegetable"],
      price: 99,
      
      
    },
    {
      title: "Chili Pepper Seeds",
      gujname: "મરચાં (Marchan)",
      description:
        "Spice up your life with homegrown chili peppers! Choose from mild to fiery varieties and enjoy a flavorful addition to your dishes. Chili peppers prefer full sun and well-drained soil.",
      image: {
        filename: "itemimage",
        url: "https://th.bing.com/th/id/OIG2.RtNXXDkMlwwowvXv3cwB?pid=ImgGn",
      } ,
      category: ["Spice","Vegetable"],
      price: 289,
      
      
    },
    {
      title: "Potato Seeds",
      gujname: "બટાકા (Bataka)",
      description:
        "Grow your own delicious potatoes! Seed potatoes are small whole potatoes used for planting. They prefer cool temperatures and loose, well-drained soil.",
      image: {
        filename: "itemimage",
        url: "https://th.bing.com/th/id/OIG2.Nojm_tWAiOdV7_.j7fVE?pid=ImgGn",
      } ,
      category: ["Vegetable"],
      price: 99,
      
      
    },
    {
      title: "Tomato Seeds",
      gujname: "ટામેટાં (Tamatan)",
      description:
        "Grow your own juicy tomatoes! These versatile vegetables are perfect for salads, sauces, and sandwiches. Tomato plants thrive in full sun with regular watering.",
      image: {
        filename: "itemimage",
        url: "https://th.bing.com/th/id/OIG3.5_YKgGuu5TJm0EfnJrb9?w=1024&h=1024&rs=1&pid=ImgDetMain",
      } ,
      category: ["Fruit","Vegetable"],
      price: 359,
      
      
    },
    {
      title: "Spinach Seeds",
      gujname: "પાલક (Paalak)",
      description:
        "Enjoy the health benefits of fresh spinach grown in your own garden! This leafy green thrives in cool weather and well-drained soil.",
      image: {
        filename: "itemimage",
        url: "https://th.bing.com/th/id/OIG4.8lALQesTZszLmR9V3lVX?pid=ImgGn",
      } ,
      category: ["Green Leafy","Vegetable"],
      price: 399,
      
      
    },
    {
      title: "Sunflower Seeds",
      gujname: "સૂર્યમુખી (Suryamukhi)",
      description:
        "Add a touch of sunshine to your garden with vibrant sunflowers! These tall plants produce large, cheerful flowers and are easy to grow from seed. Sunflowers prefer full sun and well-drained soil.",
      image: {
        filename: "itemimage",
        url: "https://th.bing.com/th/id/OIG2.y9G6WvvnteUrNu86mOO8?pid=ImgDetMain",
      } ,
      category: ["Flower"],
      price: 499,
      
      
    },
    {
      title: "Lemon Seeds",
      gujname: "લીંબુ (Limbu)",
      description:
        "Grow your own citrus tree! While starting lemons from seed may take longer to produce fruit, it can be a rewarding project. Lemons prefer full sun and well-drained soil.",
      image: {
        filename: "itemimage",
        url: "https://th.bing.com/th/id/OIG4.7DAdAdrjb1thy7_mL0OS?pid=ImgGn",
      } ,
      category: ["Fruit","Vegetable"],
      price: 189,
      
      
    },
    {
      title: "Corn Seeds",
      gujname: "મકાઈ (Makai)",
      description:
        "Enjoy fresh, homegrown corn on the cob! Corn is a warm-season crop that thrives in full sun and well-drained soil.",
      image: {
        filename: "itemimage",
        url: "https://th.bing.com/th/id/OIG2.TvlmRjvDqQVPjXxJWrTm?pid=ImgGn",
      } ,
      category: ["Fruit","Vegetable"],
      price: 199,
      
      
    },
    {
      title: "Beans (Green Beans)",
      gujname: "વાલ (Val)",
      description:
        "Add nutritious green beans to your meals with your own seeds! Green beans are a versatile vegetable that thrives in full sun with moderate watering.",
      image: {
        filename: "itemimage",
        url: "https://th.bing.com/th/id/OIG4.iru2ZmeO4.cmVlEBKpSK?pid=ImgGn",
      } ,
      category: ["Vegetable","Legume"],
      price: 120,
      
      
    },
    {
      title: "Mung Bean Seeds",
      gujname: "મગ (Mag)",
      description:
        "Explore the world of mung beans with your own seeds! These versatile legumes can be enjoyed sprouted, boiled, or used in curries. Mung beans prefer warm weather and well-drained soil",
      image: {
        filename: "itemimage",
        url: "https://th.bing.com/th/id/OIG2.WwpsqSXL.4XT63Lobdql?pid=ImgGn",
      } ,
      category: ["Vegetable", "Legume"],
      price: 220,
      
      
    },
    {
      title: "Celery Seeds ",
      gujname: "અજમો (Ajamo)",
      description:
        "Grow your own flavorful celery stalks from seed! Celery seeds are tiny and require specific germination techniques. Celery prefers cool weather and moist soil. (Celery seeds are tiny and require special care for germination)",
      image: {
        filename: "itemimage",
        url: "https://th.bing.com/th/id/OIG4.hs987VXShVwQz.hUnkPX?pid=ImgGn",
      } ,
      category: ["Green Leafy","Vegetable"],
      price: 180,
      
      
    },
    {
      title: "Broccoli Seeds",
      gujname: "બ્રોકોલી (Brokoli)",
      description:
        "Enjoy the health benefits of broccoli grown fresh in your garden! Broccoli is a cool-season crop that thrives in full sun with regular watering.",
      image: {
        filename: "itemimage",
        url: "https://th.bing.com/th/id/OIG4.R452BSiF1Lb0vACwSFg3?pid=ImgGn",
      } ,
      category: ["Green Leafy","Vegetable"],
      price: 150,
      
      
    },
    {
      title: "Cauliflower Seeds",
      gujname: "ફ્લાવર (Fulavar)",
      description:
        "Add versatile cauliflower to your dishes with homegrown seeds! Cauliflower is a cool-season crop that prefers full sun and moist soil.",
      image: {
        filename: "itemimage",
        url: "https://th.bing.com/th/id/OIG3.VHJN073c8Yt7WoPNlLKZ?pid=ImgGn",
      } ,
      category: ["Vegetable"],
      price: 160,
      
      
    },
    {
      title: "Garlic Seeds",
      gujname: "લસણ (Lasan)",
      description:
        "Grow your own flavorful garlic from cloves! Separate cloves from a garlic bulb and plant them pointed end up for a rewarding harvest. Garlic prefers full sun and well-drained soil. (Garlic is typically grown from cloves, not seeds)",
      image: {
        filename: "itemimage",
        url: "https://th.bing.com/th/id/OIG3.MJ4FKV_KZMTuIvJKxh0w?pid=ImgGn",
      } ,
      category: ["Vegetable"],
      price: 300,
      
      
    },
    {
      title: "Curry Leaf Seeds",
      gujname: "મીઠો લીમડો",
      description:
        "Bring authentic Indian flavors to your cooking with curry leaf plants grown from seed! Curry leaves add a unique aroma and taste to curries and other dishes. Curry leaf plants prefer warm temperatures and well-drained soil.",
      image: {
        filename: "itemimage",
        url: "https://th.bing.com/th/id/OIG4.hFniL98yPDp4T1zQ6m9Y?pid=ImgGn",
      } ,
      category: ["Green Leafy","Vegetable"],
      price: 400,
      
      
    },
    {
      title: "Black Sesame Seeds",
      gujname: "કાળા તલ (Kala Tal)",
      description:
        "Add a nutty flavor and rich color to your dishes with black sesame seeds! Black sesame plants are easy to grow from seed and thrive in full sun with moderate watering.",
      image: {
        filename: "itemimage",
        url: "https://th.bing.com/th/id/OIG2.OzO84goAUI7jAI0MfKys?pid=ImgDetMain",
      } ,
      category: ["Vegetable", "Oil"],
      price: 500,
      
      
    },
    {
      title: "White Sesame Seeds",
      gujname: "સફેદ તલ (Safed Tal) ",
      description:
        "Enjoy the versatility of white sesame seeds with your own plants! White sesame seeds are a popular ingredient in many cuisines and can be used whole or toasted. White sesame plants prefer full sun with moderate watering.",
      image: {
        filename: "itemimage",
        url: "https://th.bing.com/th/id/OIG3.Hm2INZlmzI.M5ZjZCe9x?pid=ImgGn",
      } ,
      category: ["Vegetable", "Oil"],
      price: 100,
      
      
    },
    {
      title: "Flax Seeds",
      gujname: "અળસી (Alasi)",
      description:
        "Flax seeds offer both culinary and health benefits. Enjoy them ground into meal or use the oil for cooking. Flax plants prefer cool weather and well-drained soil.",
      image: {
        filename: "itemimage",
        url: "https://th.bing.com/th/id/OIG3.CW92.xYZfi4.KEAJiOrK?pid=ImgGn",
      } ,
      category: ["Vegetable", "Oil"],
      price: 250,
      
      
    },
    {
      title: "Pumpkin Seeds",
      gujname: "કોળું (Kolu)",
      description:
        "Roast your own delicious pumpkin seeds or enjoy the vibrant flowers of pumpkin plants grown from seed! Pumpkins prefer full sun and well-drained soil.",
      image: {
        filename: "itemimage",
        url: "https://th.bing.com/th/id/OIG3.4iM1ZCBTS.t0W45VDe.w?pid=ImgDetMain",
      } ,
      category: ["Vegetable"],
      price: 750,
      
      
    },
    {
      title: "Dill Seeds",
      gujname: "સુવા (Suva)",
      description:
        "Grow your own feathery dill plants for their aromatic leaves and flavorful seeds! Dill prefers full sun and well-drained soil.",
      image: {
        filename: "itemimage",
        url: "https://th.bing.com/th/id/OIG1.19x63piM7ZuRRUUX8cwJ?pid=ImgGn",
      }  ,
      category: ["Vegetable", "Herb"],
      price: 160,
      
      
    },
    {
      title: "Swiss Chard Seeds",
      gujname: "પાલક (Paalak)",
      description:
        "Enjoy the vibrant colors and health benefits of Swiss Chard grown from seed! Swiss Chard is a leafy green with beautiful red, green, or purple stems. It thrives in cool weather and well-drained soil.",
      image: {
        filename: "itemimage",
        url: "https://th.bing.com/th/id/OIG4.A4aZg8sUUeg7jxbleZK_?pid=ImgGn",
      } ,
      category: ["Vegetable"],
      price: 200,
      
      
    },
    {
      title: "Black-Eyed Peas",
      gujname: "ચોળા (Chola)",
      description:
        "Add protein and fiber to your meals with black-eyed peas grown from seed! These versatile legumes thrive in warm weather and well-drained soil.",
      image: {
        filename: "itemimage",
        url: "https://th.bing.com/th/id/OIG2.yr8VwCX81.0O.g53aRac?pid=ImgDetMain",
      } ,
      category: ["Vegetable", "Legume"],
      price: 120,
      
      
    },
    {
      title: "Peanuts",
      gujname: "મગફળી (Magfalli)",
      description:
        "Grow your own peanuts for a fun and rewarding experience! Peanuts are legumes that develop underground and require specific planting techniques. Peanuts prefer warm weather and well-drained soil. (Technically peanuts are legumes grown underground)",
      image: {
        filename: "itemimage",
        url: "https://th.bing.com/th/id/OIG2.f2rZ0v21I7hOtpp6ZN3m?pid=ImgGn",
      } ,
      category: ["Nut","Legume"],
      price: 600,
      
      
    },
    {
      title: "Kale Seeds",
      gujname: "પાંદડાવાળુ કોબીજ (Green Leafy Cabbage)", 
      description:
        "Enjoy the superfood status of kale with your own plants! Kale is a nutritious leafy green that thrives in cool weather and well-drained soil.",
      image: {
        filename: "itemimage",
        url: "https://th.bing.com/th/id/OIG3.ev98OvISAGF3FiR0zVZu?pid=ImgGn",
      } ,
      category: ["Green Leafy","Vegetable"],
      price: 400,
      
      
    },
    {
      title: "Carrot Seeds",
      gujname: "ગાજર (Gajar) ",
      description:
        "Grow your own crisp and colorful carrots from seed! Carrots prefer cool weather and loose, well-drained soil.",
      image: {
        filename: "itemimage",
        url: "https://th.bing.com/th/id/OIG2.h.4eUSHdG6ey.WAlEBSt?pid=ImgGn",
      } ,
      category: ["Fruit","Vegetable"],
      price: 180,
      
      
    },
  ];
  
  module.exports = { data: sampleListings };
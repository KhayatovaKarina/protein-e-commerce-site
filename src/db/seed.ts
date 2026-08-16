import { db } from "./index";
import { products, reviews } from "./schema";

const productData = [
  {
    slug: "sparkling-strawberry",
    name: "Клубничный Блеск",
    nameEn: "Sparkling Strawberry",
    description:
      "Наш самый популярный вкус! Клубничный Блеск — это не просто протеин, это настоящий праздник вкуса. Каждый глоток наполнен нежным ароматом свежей клубники со слегка газированным послевкусием, которое освежает и заряжает энергией после тренировки. Формула обогащена коллагеном и витаминами группы B для здоровья кожи и волос. Идеально подходит для девушек, которые хотят оставаться в форме, не жертвуя удовольствием.",
    shortDescription:
      "Нежный клубничный вкус со сладкой газировкой и 25г протеина",
    price: "2490.00",
    comparePrice: "2990.00",
    images: [
      "/img/product-strawberry.png",
      "/img/for_sport.png",     
      "/img/product-pack.png",
    ],
    flavor: "Клубника",
    category: "whey",
    weightGrams: 500,
    servings: 20,
    proteinPerServing: 25,
    calories: 120,
    isNew: false,
    isBestseller: true,
    isFeatured: true,
    stock: 47,
    rating: "4.90",
    reviewCount: 0,
  },
  {
    slug: "sparkling-vanilla",
    name: "Ванильная Мечта",
    nameEn: "Sparkling Vanilla",
    description:
      "Классика в новом прочтении. Ванильная Мечта сочетает в себе кремовую нежность настоящей ванили бурбон с лёгкой шипучестью, которая делает каждый коктейль похожим на десерт. Высококачественный сывороточный изолят (WPI) обеспечивает быстрое усвоение и максимальный результат. Содержит 26г чистого протеина при минимальном количестве сахара.",
    shortDescription:
      "Кремовая ваниль с пузырьками — нежный вкус и 26г протеина",
    price: "2490.00",
    comparePrice: null,
    images: [
      "/img/product-aurora.png",
      "/img/for_sport.png",
      "/img/product-pack.png",
    ],
    flavor: "Ваниль",
    category: "isolate",
    weightGrams: 500,
    servings: 20,
    proteinPerServing: 26,
    calories: 110,
    isNew: false,
    isBestseller: false,
    isFeatured: true,
    stock: 83,
    rating: "4.75",
    reviewCount: 0,
  },
  {
    slug: "sparkling-raspberry",
    name: "Малиновый Взрыв",
    nameEn: "Sparkling Raspberry",
    description:
      "Яркий и смелый — Малиновый Взрыв создан для тех, кто не боится выделяться. Насыщенный вкус лесной малины с фруктовой кислинкой и бодрящей шипучестью делает этот протеин настоящим энергетическим взрывом. Содержит натуральные экстракты малины и граната, богатые антиоксидантами. Заряжает мотивацией на весь день.",
    shortDescription:
      "Взрывной малиновый вкус с антиоксидантами и 24г протеина",
    price: "2690.00",
    comparePrice: "3190.00",
    images: [
      "/img/product-raspberry.png",
      "/img/for_sport.png",
      "/img/product-pack.png",
    ],
    flavor: "Малина",
    category: "whey",
    weightGrams: 500,
    servings: 20,
    proteinPerServing: 24,
    calories: 115,
    isNew: true,
    isBestseller: false,
    isFeatured: true,
    stock: 31,
    rating: "4.80",
    reviewCount: 0,
  },
  {
    slug: "sparkling-peach-mango",
    name: "Персиковый Рай",
    nameEn: "Sparkling Peach Mango",
    description:
      "Тропическое настроение в каждой порции! Персиковый Рай переносит вас на летний пляж с первого глотка. Сочный персик и экзотическое манго создают идеальный дуэт, дополненный нежной газировкой. Формула на основе растительного протеина (горох + рис) подходит для веганов и тех, кто избегает молочного. Богат витамином C и цинком.",
    shortDescription: "Тропический персик и манго, веганский протеин, 22г",
    price: "2790.00",
    comparePrice: null,
    images: [
      "/img/product-raspberry.png",
      "/img/product-pack.png",
      "/img/for_sport.png",
    ],
    flavor: "Персик-Манго",
    category: "vegan",
    weightGrams: 450,
    servings: 18,
    proteinPerServing: 22,
    calories: 130,
    isNew: true,
    isBestseller: false,
    isFeatured: false,
    stock: 62,
    rating: "4.65",
    reviewCount: 0,
  },
  {
    slug: "sparkling-bubblegum",
    name: "Розовая Жвачка",
    nameEn: "Sparkling Bubblegum",
    description:
      "Самый весёлый протеин на рынке! Розовая Жвачка — это ностальгия по детству в спортивном флаконе. Неповторимый вкус розовой жвачки с яркими пузырьками делает каждую тренировку праздником. Содержит полный аминокислотный профиль BCAA 8:1:1 и инулин пребиотик для здоровья кишечника. Ограниченная серия — успей попробовать!",
    shortDescription: "Лимитированный вкус розовой жвачки с BCAA 8:1:1, 25г",
    price: "2890.00",
    comparePrice: "3390.00",
    images: [
      "/img/product-bubblegum.png",
      "/img/for_sport.png",
      "/img/product-pack.png",
    ],
    flavor: "Жвачка",
    category: "whey",
    weightGrams: 500,
    servings: 20,
    proteinPerServing: 25,
    calories: 118,
    isNew: true,
    isBestseller: true,
    isFeatured: true,
    stock: 18,
    rating: "4.95",
    reviewCount: 0,
  },
  {
    slug: "sparkling-starter-pack",
    name: "Стартовый Набор",
    nameEn: "Sparkling Starter Pack",
    description:
      "Не знаешь, с чего начать? Стартовый Набор включает 5 мини-банок (по 100г) всех наших вкусов, чтобы ты могла выбрать любимый. Идеальный подарок для себя или подружки. Красивая фирменная коробка в розовом цвете с понишкой делает этот набор отличным сюрпризом. Каждая порция — 25г чистого протеина.",
    shortDescription: "5 вкусов в одном наборе — идеальный подарок, 25г/порция",
    price: "3490.00",
    comparePrice: "4500.00",
    images: [
      "/img/product-pack.png",
      "/img/product-strawberry.png",
      "/img/product-aurora.png",
    ],
    flavor: "Ассорти",
    category: "bundle",
    weightGrams: 500,
    servings: 20,
    proteinPerServing: 25,
    calories: 118,
    isNew: false,
    isBestseller: true,
    isFeatured: false,
    stock: 25,
    rating: "5.00",
    reviewCount: 0,
  },
];

const reviewData = [
  // Strawberry
  {
    productSlug: "sparkling-strawberry",
    authorName: "Анастасия К.",
    authorAvatar: "👩",
    rating: 5,
    title: "Лучший протеин в моей жизни!",
    body: "Я перепробовала кучу протеинов, но Pink Pony — это что-то особенное. Клубничный вкус просто невероятный, не приторный и не искусственный. Растворяется идеально, без комков. И главное — после тренировок реально чувствую результат! Подруги уже все спрашивают, где взяла 🦄",
    verified: true,
    helpful: 47,
  },
  {
    productSlug: "sparkling-strawberry",
    authorName: "Диана М.",
    authorAvatar: "💁",
    rating: 5,
    title: "Беру уже третий месяц подряд",
    body: "Сначала взяла на пробу, теперь беру каждый месяц. Вкус не надоедает, что очень важно. Добавляю в смузи — получается как молочный коктейль. Результаты в спортзале заметны — мышцы восстанавливаются быстрее, и чувствую себя энергичнее. Упаковка очаровательная, всегда приятно открывать!",
    verified: true,
    helpful: 31,
  },
  {
    productSlug: "sparkling-strawberry",
    authorName: "Ксения П.",
    authorAvatar: "🏃",
    rating: 5,
    title: "Идеально для бегунов",
    body: "Занимаюсь бегом и пилатесом. Этот протеин — мой постренировочный ритуал. Размешиваю с ледяной водой и немного клубничного льда — получается настоящий газированный коктейль! 25г белка без лишних калорий — что ещё нужно?",
    verified: true,
    helpful: 22,
  },
  {
    productSlug: "sparkling-strawberry",
    authorName: "Виктория Л.",
    authorAvatar: "🌸",
    rating: 4,
    title: "Очень вкусно, чуть сладковато",
    body: "Мне очень понравился вкус — натуральная клубника чувствуется отлично. Единственное — для меня немного сладко, но это дело вкуса. Качество протеина на высоте, растворимость отличная. Буду брать ещё!",
    verified: true,
    helpful: 15,
  },
  // Vanilla
  {
    productSlug: "sparkling-vanilla",
    authorName: "Мария Т.",
    authorAvatar: "✨",
    rating: 5,
    title: "Ванильная нежность — моя любовь",
    body: "Ванильный вкус очень благородный — не приторный, а именно ванильный. Смешиваю с миндальным молоком — это просто космос! Протеин высокого качества, изолят усваивается быстро. Видимый результат уже через месяц регулярных тренировок.",
    verified: true,
    helpful: 28,
  },
  {
    productSlug: "sparkling-vanilla",
    authorName: "Елена С.",
    authorAvatar: "🎀",
    rating: 5,
    title: "Всем советую!",
    body: "Взяла по совету инструктора в зале. Теперь вся группа пьёт Pink Pony! Ванильный вкус универсальный — можно добавлять в выпечку, в кашу, в смузи. Упаковка красивая, пони на банке такой милый! Качество 10/10.",
    verified: true,
    helpful: 19,
  },
  // Raspberry
  {
    productSlug: "sparkling-raspberry",
    authorName: "Полина Р.",
    authorAvatar: "💪",
    rating: 5,
    title: "Малина — огонь!",
    body: "Ожидала чего угодно, но не такого яркого вкуса! Малина реальная, кислинка приятная, газировка бодрит. Теперь это мой любимый вкус. Беру после силовых тренировок — восстановление заметно ускорилось. Ещё и состав отличный — антиоксиданты бонус!",
    verified: true,
    helpful: 33,
  },
  {
    productSlug: "sparkling-raspberry",
    authorName: "Наталья В.",
    authorAvatar: "🍓",
    rating: 5,
    title: "Новинка, которую ждала",
    body: "Наконец-то появился малиновый вкус! Очень свежий и натуральный. Отлично растворяется даже в холодной воде. За 3 недели приёма уже вижу, как уходит отёчность и улучшается тонус. Упаковка просто прелесть!",
    verified: true,
    helpful: 24,
  },
  // Peach Mango
  {
    productSlug: "sparkling-peach-mango",
    authorName: "Алина Б.",
    authorAvatar: "🌺",
    rating: 5,
    title: "Лето в баночке!",
    body: "Веганский протеин, который наконец-то вкусный! Персик и манго — идеальное сочетание. Я сыроед и долго искала достойный растительный протеин. Этот — находка. Не оставляет послевкусия, хорошо растворяется. Всем веганам рекомендую!",
    verified: true,
    helpful: 41,
  },
  {
    productSlug: "sparkling-peach-mango",
    authorName: "Светлана О.",
    authorAvatar: "🥭",
    rating: 4,
    title: "Вкусно и полезно",
    body: "Очень приятный тропический вкус. Беру из-за непереносимости лактозы — наконец нашла протеин, который мне подходит. 22г протеина из растительных источников — отличный показатель. Минус один — цена чуть выше, но качество стоит того.",
    verified: true,
    helpful: 18,
  },
  // Bubblegum
  {
    productSlug: "sparkling-bubblegum",
    authorName: "Дарья Н.",
    authorAvatar: "🎉",
    rating: 5,
    title: "Это просто ШЕДЕВР",
    body: "Я была скептиком — жвачка?! Но первый глоток и я влюбилась. Это такая ностальгия и одновременно радость! Беру на соревнования — поднимает настроение сразу. BCAA в составе — отдельный плюс. Надеюсь, этот вкус останется в постоянной линейке!",
    verified: true,
    helpful: 67,
  },
  {
    productSlug: "sparkling-bubblegum",
    authorName: "Юлия З.",
    authorAvatar: "🩷",
    rating: 5,
    title: "Купила подруге в подарок — она в восторге",
    body: "Взяла в подарок на день рождения подруге-спортсменке. Она сначала посмеялась над вкусом, а потом написала, что уже купила ещё две банки! Вкус действительно уникальный и запоминающийся. Упаковка подарочная — сразу видно, что это премиум.",
    verified: true,
    helpful: 45,
  },
  // Starter Pack
  {
    productSlug: "sparkling-starter-pack",
    authorName: "Ирина Ф.",
    authorAvatar: "🎁",
    rating: 5,
    title: "Лучший подарок для спортивной подруги",
    body: "Купила сестре на 8 марта — она была в полном восторге! Коробка очень красивая, все 5 вкусов в миниатюрных банках — просто прелесть. В итоге она влюбилась в клубничный и малиновый. Очень советую как подарок!",
    verified: true,
    helpful: 52,
  },
  {
    productSlug: "sparkling-starter-pack",
    authorName: "Татьяна Ж.",
    authorAvatar: "🌟",
    rating: 5,
    title: "Отличный способ выбрать любимый вкус",
    body: "Сама не знала, какой вкус выбрать — набор решил эту проблему! Попробовала все 5, теперь знаю, что буду брать клубничный и жвачку. Очень выгодная покупка по сравнению с покупкой 5 отдельных банок. Качество упаковки на высоте.",
    verified: true,
    helpful: 38,
  },
];

async function seed() {
  console.log("🌱 Seeding database...");

  // Clear existing data
  await db.delete(reviews);
  await db.delete(products);

  // Insert products
  const insertedProducts = await db
    .insert(products)
    .values(productData)
    .returning();

  console.log(`✅ Inserted ${insertedProducts.length} products`);

  // Create a map of slug to id
  const productMap = Object.fromEntries(
    insertedProducts.map((p) => [p.slug, p.id])
  );

  // Insert reviews
  const reviewsToInsert = reviewData.map(({ productSlug, ...r }) => ({
    ...r,
    productId: productMap[productSlug],
  }));

  await db.insert(reviews).values(reviewsToInsert);
  console.log(`✅ Inserted ${reviewsToInsert.length} reviews`);

  // Update review counts and ratings
  for (const product of insertedProducts) {
    const productReviews = reviewsToInsert.filter(
      (r) => r.productId === product.id
    );
    if (productReviews.length > 0) {
      const avgRating =
        productReviews.reduce((sum, r) => sum + r.rating, 0) /
        productReviews.length;
      await db
        .update(products)
        .set({
          reviewCount: productReviews.length,
          rating: avgRating.toFixed(2),
        })
        .where(require("drizzle-orm").eq(products.id, product.id));
    }
  }

  console.log("✅ Updated ratings and review counts");
  console.log("🎉 Seed complete!");
}

seed().catch(console.error);

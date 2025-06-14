const getTimestamp = (dateStr) => {
  const daysAgo = dateStr === 'Сегодня' ? 0 : 
                 dateStr === 'Вчера' ? 1 :
                 parseInt(dateStr) || 0;
  return Date.now() - daysAgo * 24 * 60 * 60 * 1000;
};

export const _rawAds = {
  give: [
    {
      id: 1,
      title: "Отдам книги по программированию",
      description: "JavaScript, Python, б/у, в хорошем состоянии",
      contact: "Комната 305",
      date: "Сегодня",
      type: "give",
      images: []
    },
    {
      id: 2,
      title: "Отдам электрический чайник",
      description: "Работает, но требует чистки",
      contact: "Комната 217",
      date: "Вчера",
      type: "give",
      images: []
    }
  ],
  take: [
    {
      id: 3,
      title: "Нужен велосипед на лето",
      description: "Ищу недорогой велосипед в хорошем состоянии",
      contact: "@student123",
      date: "2 дня назад",
      type: "take",
      images: []
    }
  ],
  lost: [
    {
      id: 4,
      title: "Найден ключ от комнаты",
      description: "Найден в холле 3 этажа. Опознать по брелку",
      contact: "Комната 310",
      date: "Сегодня",
      type: "lost",
      images: []
    }
  ]
};


export const getAdById = (id) => {
  return getAllAds().find(ad => ad.id.toString() === id.toString());
};

export const getAdsByType = (type) => {
  return sortAds(avitoAds[type] || []);
};

const sortAds = (ads) => {
  return [...ads].sort((a, b) => b.timestamp - a.timestamp);
};

export const addNewAd = (newAd) => {
  const id = Math.max(...getAllAds().map(ad => ad.id), 0) + 1;
  const adWithId = {
    ...newAd,
    id,
    date: "Сегодня",
    timestamp: Date.now()
  };
  avitoAds[newAd.type].unshift(adWithId);
  return adWithId;
};

const dateToTimestamp = (dateStr) => {
  const daysMap = {
    'Сегодня': 0,
    'Вчера': 1,
    '2 дня назад': 2,
    '3 дня назад': 3,
    'Неделю назад': 7,
    'Больше недели': 14
  };
  
  const daysAgo = daysMap[dateStr] || parseInt(dateStr) || 0;
  return Date.now() - daysAgo * 24 * 60 * 60 * 1000;
};

const processAds = (ads) => {
  return ads.map(ad => ({
    ...ad,
    timestamp: dateToTimestamp(ad.date)
  }));
};

const processedAds = {
  give: processAds(_rawAds.give),
  take: processAds(_rawAds.take),
  lost: processAds(_rawAds.lost)
};

export const avitoAds = {
  // Получить ВСЕ объявления (отсортированные)
  getAll: () => {
    const allAds = [
      ...processedAds.give,
      ...processedAds.take,
      ...processedAds.lost
    ];
    return sortAds(allAds);
  },

  // Получить по типу (отсортированные)
  getByType: (type) => {
    if (!processedAds[type]) return [];
    return sortAds(processedAds[type]);
  },

  // Найти по ID
  getById: (id) => {
    return avitoAds.getAll().find(ad => ad.id.toString() === id.toString());
  },

  // Добавить новое объявление
  add: (newAd) => {
    const id = Math.max(0, ...avitoAds.getAll().map(ad => ad.id)) + 1;
    const adWithId = {
      ...newAd,
      id,
      date: "Сегодня",
      timestamp: Date.now(),
      images: newAd.images || []
    };
    
    processedAds[newAd.type].unshift(adWithId);
    return adWithId;
  },

  // Получить последние N объявлений
  getRecent: (count = 5) => {
    return avitoAds.getAll().slice(0, count);
  }
};
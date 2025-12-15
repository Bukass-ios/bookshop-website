// Sample book data
BOOKS = [
  // {id: 'b1', title: 'Skyward Paths', author: 'A. Rivers', price: 14.99, category: 'Fiction', image: 'assets/images/b1.svg', isbn: '978-1-23456-001-1', description: 'A lyrical novel about journeys, ambition and small-town dreams.'},
  // {id: 'b2', title: 'The Quiet Science', author: 'L. Grant', price: 19.5, category: 'Science', image: 'assets/images/b2.svg', isbn: '978-1-23456-002-8', description: 'Accessible essays unpacking modern scientific discoveries.'},
  // {id: 'b3', title: 'Mindful Living', author: 'T. Hale', price: 12.0, category: 'Personal Development', image: 'assets/images/b3.svg', isbn: '978-1-23456-003-5', description: 'Practical strategies for daily mindfulness and calmer living.'},

  // {id: 'b5', title: 'Old Cities', author: 'H. Baines', price: 9.99, category: 'History', image: 'assets/images/b5.svg', isbn: '978-1-23456-005-9', description: 'A photographic tour and history of ancient cities around the world.'},
  // {id: 'b6', title: 'Cooking at Home', author: 'M. Patel', price: 17.2, category: 'Education', image: 'assets/images/b6.svg', isbn: '978-1-23456-006-6', description: 'A practical cookbook focused on quick, nourishing home meals.'},
  // {id: 'b7', title: 'Mystery Lane', author: 'K. Ortiz', price: 11.5, category: 'Fiction', image: 'assets/images/b7.svg', isbn: '978-1-23456-007-3', description: 'A cozy mystery with winding plots and memorable characters.'},
  // {id: 'b8', title: 'Secrets of Physics', author: 'D. Yoon', price: 24.0, category: 'Science', image: 'assets/images/b8.svg', isbn: '978-1-23456-008-0', description: 'Clear explanations of cutting-edge physics for curious readers.'},
  // {id: 'b9', title: 'Journeys', author: 'E. Cole', price: 13.75, category: 'Personal Development', image: 'assets/images/b9.svg', isbn: '978-1-23456-009-7', description: 'Memoirs and reflections about travel and self-discovery.'},
  // {id: 'b10', title: 'The Economist', author: 'R. Singh', price: 29.0, category: 'Education', image: 'assets/images/b10.svg', isbn: '978-1-23456-010-3', description: 'A deep dive into macroeconomic ideas shaping policy today.'},
  // {id: 'b11', title: 'Gardens of Thought', author: 'P. Moreno', price: 15.0, category: 'Personal Development', image: 'assets/images/b11.svg', isbn: '978-1-23456-011-0', description: 'Reflections on creativity, gardening and the mind.'},
  // {id: 'b12', title: 'Waves', author: 'S. Nadir', price: 18.5, category: 'Science', image: 'assets/images/b12.svg', isbn: '978-1-23456-012-7', description: 'An engaging guide to wave phenomena in nature and technology.'},
  // {id: 'b13', title: 'Fables Reimagined', author: 'L. Tan', price: 9.5, category: 'Fiction', image: 'assets/images/b13.svg', isbn: '978-1-23456-013-4', description: 'Short stories inspired by classic fables with a modern twist.'},
  // {id: 'b14', title: 'Atlas of Rivers', author: 'M. Osei', price: 21.0, category: 'History', image: 'assets/images/b14.svg', isbn: '978-1-23456-014-1', description: 'A richly illustrated atlas documenting the world’s great rivers.'},
  // {id: 'b15', title: 'Home Mechanics', author: 'J. Park', price: 16.25, category: 'Education', image: 'assets/images/b15.svg', isbn: '978-1-23456-015-8', description: 'A beginner-friendly guide to basic repairs and DIY projects.'},
  // {id: 'b16', title: 'A Short Walk', author: "N. D'Souza", price: 8.99, category: 'Fiction', image: 'assets/images/b16.svg', isbn: '978-1-23456-016-5', description: 'A gentle novella about small encounters on a neighborhood walk.'},
  

  // Personal Development Books
  
  {
    id: "b4",
    title: "Rich Dad Poor Dad",
    author: "Robert kiyosaki",
    price: 22.0,
    category: "Personal Development",
    image: "assets/images/Rich dad poor dad.jpg",
    isbn: "978-1-23456-004-2",
    description:
      "Rich Dad Poor Dad teaches how to build wealth by changing your mindset about money, focusing on assets, financial education, and making money work for you instead of working for money.",
  },

  {
    id: "pd2",
    title: "Think and Grow Rich",
    author: "Napoleon Hill",
    price: 18.5,
    category: "Personal Development",
    image: "assets/images/think-and-grow-rich.jpg",
    isbn: "9781585424337",
    description:
      "Think and Grow Rich explains the power of mindset, desire, and persistence in achieving financial success and personal goals.",
  },
  {
    id: "pd3",
    title: "The 7 Habits of Highly Effective People",
    author: "Stephen R. Covey",
    price: 24.0,
    category: "Personal Development",
    image: "assets/images/7-habits.jpg",
    isbn: "9781982137274",
    description:
      "This book provides practical habits that help individuals become more effective in their personal and professional lives.",
  },
  {
    id: "pd4",
    title: "Atomic Habits",
    author: "James Clear",
    price: 26.0,
    category: "Personal Development",
    image: "assets/images/atomic-habits.jpg",
    isbn: "9780735211292",
    description:
      "Atomic Habits shows how small daily changes can lead to remarkable personal growth and long-term success.",
  },
  {
    id: "pd5",
    title: "The Power of Now",
    author: "Eckhart Tolle",
    price: 20.0,
    category: "Personal Development",
    image: "assets/images/the-power-of-now.jpg",
    isbn: "9781577314806",
    description:
      "The Power of Now focuses on mindfulness and living in the present moment to achieve peace and fulfillment.",
  },
  {
    id: "pd6",
    title: "How to Win Friends and Influence People",
    author: "Dale Carnegie",
    price: 19.0,
    category: "Personal Development",
    image: "assets/images/how-to-win-friends.jpg",
    isbn: "9780671027032",
    description:
      "This classic teaches communication and relationship skills that help improve influence, leadership, and social success.",
  },
  {
    id: "pd7",
    title: "The Subtle Art of Not Giving a F*ck",
    author: "Mark Manson",
    price: 21.5,
    category: "Personal Development",
    image: "assets/images/subtle-art.jpg",
    isbn: "9780062457714",
    description:
      "The book encourages focusing on what truly matters in life and letting go of unnecessary stress and expectations.",
  },
  {
    id: "pd8",
    title: "Awaken the Giant Within",
    author: "Tony Robbins",
    price: 23.0,
    category: "Personal Development",
    image: "assets/images/awaken-the-giant-within.jpg",
    isbn: "9780671791544",
    description:
      "Awaken the Giant Within provides strategies to take control of emotions, finances, relationships, and personal destiny.",
  },
  {
    id: "pd9",
    title: "You Are a Badass",
    author: "Jen Sincero",
    price: 17.5,
    category: "Personal Development",
    image: "assets/images/you-are-a-badass.jpg",
    isbn: "9780762447695",
    description:
      "This book motivates readers to overcome self-doubt, build confidence, and create a life they love.",
  },
  {
    id: "pd10",
    title: "Deep Work",
    author: "Cal Newport",
    price: 22.5,
    category: "Personal Development",
    image: "assets/images/deep-work.jpg",
    isbn: "9781455586691",
    description:
      "Deep Work explains how focused, distraction-free work leads to higher productivity and meaningful success."
  },


  //History Books

  {
    id: 'h1',
    title: 'Sapiens: A Brief History of Humankind',
    author: 'Yuval Noah Harari',
    price: 24.0,
    category: 'History',
    image: 'assets/images/Sapiens.jpg',
    isbn: '9780062316097',
    description: 'Sapiens explores the history of humankind, from early ancestors to modern societies, focusing on culture, science, and power.'
  },
  {
    id: 'h2',
    title: 'Guns, Germs, and Steel',
    author: 'Jared Diamond',
    price: 22.5,
    category: 'History',
    image: 'assets/images/ggs.jpg',
    isbn: '9780393317558',
    description: 'This book explains how geography and environment shaped the development of civilizations across the world.'
  },
  {
    id: 'h3',
    title: 'A Little History of the World',
    author: 'E. H. Gombrich',
    price: 18.0,
    category: 'History',
    image: 'assets/images/A Little History of the World.jpg',
    isbn: '9780300143324',
    description: 'A simple and engaging introduction to world history, written in a clear and easy-to-understand style.'
  },
  {
    id: 'h4',
    title: 'The Silk Roads',
    author: 'Peter Frankopan',
    price: 23.0,
    category: 'History',
    image: 'assets/images/The Silk Roads.jpg',
    isbn: '9781101912379',
    description: 'The Silk Roads tells the story of the ancient trade routes that connected East and West and shaped global history.'
  },
  {
    id: 'h5',
    title: 'Long Walk to Freedom',
    author: 'Nelson Mandela',
    price: 21.0,
    category: 'History',
    image: 'assets/images/Long Walk to Freedom.jpg',
    isbn: '9780316548182',
    description: 'Nelson Mandela’s autobiography chronicles his life and South Africa’s struggle against apartheid.'
  },
  
  {
    id: 'h7',
    title: 'Africa Since Independence',
    author: 'Martin Meredith',
    price: 26.0,
    category: 'History',
    image: 'assets/images/Africa Since Independence.jpg',
    isbn: '9781585678945',
    description: 'An in-depth look at African nations after independence, examining leadership, conflict, and development.'
  },
  {
    id: 'h8',
    title: 'The Second World War',
    author: 'Antony Beevor',
    price: 28.0,
    category: 'History',
    image: 'assets/images/The Second World War.jpg',
    isbn: '9780316023740',
    description: 'A comprehensive account of World War II, covering major battles, political decisions, and human experiences.'
  },
];

SELLER_PHONE = "233206178482"; // E.164 without + — change to your WhatsApp number

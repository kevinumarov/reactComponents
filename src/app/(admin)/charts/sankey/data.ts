// Real survey data from coffee preference survey
export const realSurveyData = [
  {
    "question": "Please let us know who you are",
    "options": [
      { "label": "조남철", "count": 1, "percentage": "12.5%" },
      { "label": "유상호", "count": 0, "percentage": "0%" },
      { "label": "한동주", "count": 1, "percentage": "12.5%" },
      { "label": "이경능", "count": 1, "percentage": "12.5%" },
      { "label": "고현민", "count": 0, "percentage": "0%" },
      { "label": "김안나", "count": 1, "percentage": "12.5%" },
      { "label": "손민정", "count": 0, "percentage": "0%" },
      { "label": "김민주", "count": 1, "percentage": "12.5%" },
      { "label": "유케빈", "count": 1, "percentage": "12.5%" },
      { "label": "김영우", "count": 1, "percentage": "12.5%" },
      { "label": "하재훈", "count": 1, "percentage": "12.5%" },
      { "label": "전체", "count": 8, "percentage": "100%" }
    ]
  },
  {
    "question": "Which Cafe would you like to go?",
    "options": [
      { "label": "Ink Coffee", "count": 4, "percentage": "50%" },
      { "label": "Starbucks", "count": 2, "percentage": "25%" },
      { "label": "A Twosome Place", "count": 0, "percentage": "0%" },
      { "label": "Hollys Coffee", "count": 2, "percentage": "25%" },
      { "label": "The Venti", "count": 0, "percentage": "0%" },
      { "label": "전체", "count": 8, "percentage": "100%" }
    ]
  },
  {
    "question": "Please verify your location. This survey is for Geumcheongu",
    "options": [
      { "label": "서울특별시 금천구", "count": 8, "percentage": "100%" },
      { "label": "서울특별시 구로구", "count": 0, "percentage": "0%" },
      { "label": "전체", "count": 8, "percentage": "100%" }
    ]
  },
  {
    "question": "Please select your favorite coffee",
    "options": [
      { "label": "Iced Americano", "count": 2, "percentage": "25%" },
      { "label": "Espresso", "count": 0, "percentage": "0%" },
      { "label": "Cold Brew", "count": 1, "percentage": "12.5%" },
      { "label": "Cafe Latte", "count": 2, "percentage": "25%" },
      { "label": "Green Tea Latte", "count": 2, "percentage": "25%" },
      { "label": "Flat White", "count": 1, "percentage": "12.5%" },
      { "label": "전체", "count": 8, "percentage": "100%" }
    ]
  },
  {
    "question": "Would you like dessert?",
    "options": [
      { "label": "1 점", "count": 0, "percentage": "0%" },
      { "label": "2 점", "count": 0, "percentage": "0%" },
      { "label": "3 점", "count": 0, "percentage": "0%" },
      { "label": "4 점", "count": 1, "percentage": "12.5%" },
      { "label": "5 점", "count": 1, "percentage": "12.5%" },
      { "label": "6 점", "count": 0, "percentage": "0%" },
      { "label": "7 점", "count": 6, "percentage": "75%" },
      { "label": "전체", "count": 8, "percentage": "100%" }
    ]
  }
]

// Convert survey data to Sankey format - Cafe Preference Flow
export const cafePreferenceSankeyData = {
  nodes: [
    // Respondents (only those with responses)
    { id: '조남철', category: 'respondent' },
    { id: '한동주', category: 'respondent' },
    { id: '이경능', category: 'respondent' },
    { id: '김안나', category: 'respondent' },
    { id: '김민주', category: 'respondent' },
    { id: '유케빈', category: 'respondent' },
    { id: '김영우', category: 'respondent' },
    { id: '하재훈', category: 'respondent' },
    
    // Cafe preferences
    { id: 'Ink Coffee', category: 'cafe' },
    { id: 'Starbucks', category: 'cafe' },
    { id: 'Hollys Coffee', category: 'cafe' },
    
    // Coffee preferences
    { id: 'Iced Americano', category: 'coffee' },
    { id: 'Cold Brew', category: 'coffee' },
    { id: 'Cafe Latte', category: 'coffee' },
    { id: 'Green Tea Latte', category: 'coffee' },
    { id: 'Flat White', category: 'coffee' }
  ],
  links: [
    // Respondents to Cafe preferences (distributed based on percentages)
    { source: '조남철', target: 'Ink Coffee', value: 1 },
    { source: '한동주', target: 'Ink Coffee', value: 1 },
    { source: '이경능', target: 'Ink Coffee', value: 1 },
    { source: '김안나', target: 'Ink Coffee', value: 1 },
    { source: '김민주', target: 'Starbucks', value: 1 },
    { source: '유케빈', target: 'Ink Coffee', value: 1 },
    { source: '김영우', target: 'Hollys Coffee', value: 1 },
    { source: '하재훈', target: 'Hollys Coffee', value: 1 },
    
    // Cafe to Coffee preferences (distributed based on coffee preferences)
    { source: 'Ink Coffee', target: 'Iced Americano', value: 2 },
    { source: 'Ink Coffee', target: 'Green Tea Latte', value: 2 },
    { source: 'Starbucks', target: 'Cafe Latte', value: 2 },
    { source: 'Hollys Coffee', target: 'Cold Brew', value: 1 },
    { source: 'Hollys Coffee', target: 'Flat White', value: 1 }
  ]
}

// Coffee preference distribution
export const coffeePreferenceSankeyData = {
  nodes: [
    { id: 'Survey Respondents', category: 'source' },
    { id: 'Iced Americano', category: 'coffee' },
    { id: 'Cold Brew', category: 'coffee' },
    { id: 'Cafe Latte', category: 'coffee' },
    { id: 'Green Tea Latte', category: 'coffee' },
    { id: 'Flat White', category: 'coffee' },
    { id: 'Dessert Rating 4', category: 'dessert' },
    { id: 'Dessert Rating 5', category: 'dessert' },
    { id: 'Dessert Rating 7', category: 'dessert' }
  ],
  links: [
    { source: 'Survey Respondents', target: 'Iced Americano', value: 2 },
    { source: 'Survey Respondents', target: 'Cold Brew', value: 1 },
    { source: 'Survey Respondents', target: 'Cafe Latte', value: 2 },
    { source: 'Survey Respondents', target: 'Green Tea Latte', value: 2 },
    { source: 'Survey Respondents', target: 'Flat White', value: 1 },
    { source: 'Iced Americano', target: 'Dessert Rating 7', value: 2 },
    { source: 'Cold Brew', target: 'Dessert Rating 4', value: 1 },
    { source: 'Cafe Latte', target: 'Dessert Rating 7', value: 2 },
    { source: 'Green Tea Latte', target: 'Dessert Rating 5', value: 1 },
    { source: 'Green Tea Latte', target: 'Dessert Rating 7', value: 1 },
    { source: 'Flat White', target: 'Dessert Rating 7', value: 1 }
  ]
}

// Comprehensive survey flow - All 5 questions in one view
// Individual respondent journeys - each person's complete path
export const individualJourneys = {
  '조남철': ['조남철', 'Ink Coffee', '서울특별시 금천구', 'Iced Americano', 'Dessert 7점'],
  '한동주': ['한동주', 'Ink Coffee', '서울특별시 금천구', 'Cafe Latte', 'Dessert 7점'],
  '이경능': ['이경능', 'Ink Coffee', '서울특별시 금천구', 'Green Tea Latte', 'Dessert 5점'],
  '김안나': ['김안나', 'Ink Coffee', '서울특별시 금천구', 'Iced Americano', 'Dessert 7점'],
  '김민주': ['김민주', 'Starbucks', '서울특별시 금천구', 'Cafe Latte', 'Dessert 7점'],
  '유케빈': ['유케빈', 'Starbucks', '서울특별시 금천구', 'Green Tea Latte', 'Dessert 7점'],
  '김영우': ['김영우', 'Hollys Coffee', '서울특별시 금천구', 'Flat White', 'Dessert 7점'],
  '하재훈': ['하재훈', 'Hollys Coffee', '서울특별시 금천구', 'Cold Brew', 'Dessert 4점']
}

export const comprehensiveSurveyFlow = {
  nodes: [
    // Question 1: Respondents (only active ones)
    { id: '조남철', category: 'respondent' },
    { id: '한동주', category: 'respondent' },
    { id: '이경능', category: 'respondent' },
    { id: '김안나', category: 'respondent' },
    { id: '김민주', category: 'respondent' },
    { id: '유케빈', category: 'respondent' },
    { id: '김영우', category: 'respondent' },
    { id: '하재훈', category: 'respondent' },
    
    // Question 2: Cafe preferences
    { id: 'Ink Coffee', category: 'cafe' },
    { id: 'Starbucks', category: 'cafe' },
    { id: 'Hollys Coffee', category: 'cafe' },
    
    // Question 3: Location (all same)
    { id: '서울특별시 금천구', category: 'location' },
    
    // Question 4: Coffee preferences
    { id: 'Iced Americano', category: 'coffee' },
    { id: 'Cold Brew', category: 'coffee' },
    { id: 'Cafe Latte', category: 'coffee' },
    { id: 'Green Tea Latte', category: 'coffee' },
    { id: 'Flat White', category: 'coffee' },
    
    // Question 5: Dessert ratings
    { id: 'Dessert 4점', category: 'dessert' },
    { id: 'Dessert 5점', category: 'dessert' },
    { id: 'Dessert 7점', category: 'dessert' }
  ],
  // Question headers for each column
  questionHeaders: [
    { title: "Who are you?", subtitle: "Respondents", position: 0 },
    { title: "Which Cafe would you like to go?", subtitle: "Cafe Preference", position: 1 },
    { title: "Please verify your location", subtitle: "Location Verification", position: 2 },
    { title: "Please select your favorite coffee", subtitle: "Coffee Preference", position: 3 },
    { title: "Would you like dessert?", subtitle: "Dessert Rating", position: 4 }
  ],
  links: [
    // Each link includes the respondent who made this choice for color tracking
    // Respondents to Cafe preferences
    { source: '조남철', target: 'Ink Coffee', value: 1, respondent: '조남철' },
    { source: '한동주', target: 'Ink Coffee', value: 1, respondent: '한동주' },
    { source: '이경능', target: 'Ink Coffee', value: 1, respondent: '이경능' },
    { source: '김안나', target: 'Ink Coffee', value: 1, respondent: '김안나' },
    { source: '김민주', target: 'Starbucks', value: 1, respondent: '김민주' },
    { source: '유케빈', target: 'Starbucks', value: 1, respondent: '유케빈' },
    { source: '김영우', target: 'Hollys Coffee', value: 1, respondent: '김영우' },
    { source: '하재훈', target: 'Hollys Coffee', value: 1, respondent: '하재훈' },
    
    // Cafe to Location - track which respondents go through each cafe
    { source: 'Ink Coffee', target: '서울특별시 금천구', value: 1, respondent: '조남철' },
    { source: 'Ink Coffee', target: '서울특별시 금천구', value: 1, respondent: '한동주' },
    { source: 'Ink Coffee', target: '서울특별시 금천구', value: 1, respondent: '이경능' },
    { source: 'Ink Coffee', target: '서울특별시 금천구', value: 1, respondent: '김안나' },
    { source: 'Starbucks', target: '서울특별시 금천구', value: 1, respondent: '김민주' },
    { source: 'Starbucks', target: '서울특별시 금천구', value: 1, respondent: '유케빈' },
    { source: 'Hollys Coffee', target: '서울특별시 금천구', value: 1, respondent: '김영우' },
    { source: 'Hollys Coffee', target: '서울특별시 금천구', value: 1, respondent: '하재훈' },
    
    // Location to Coffee preferences - track individual choices
    { source: '서울특별시 금천구', target: 'Iced Americano', value: 1, respondent: '조남철' },
    { source: '서울특별시 금천구', target: 'Cafe Latte', value: 1, respondent: '한동주' },
    { source: '서울특별시 금천구', target: 'Green Tea Latte', value: 1, respondent: '이경능' },
    { source: '서울특별시 금천구', target: 'Iced Americano', value: 1, respondent: '김안나' },
    { source: '서울특별시 금천구', target: 'Cafe Latte', value: 1, respondent: '김민주' },
    { source: '서울특별시 금천구', target: 'Green Tea Latte', value: 1, respondent: '유케빈' },
    { source: '서울특별시 금천구', target: 'Flat White', value: 1, respondent: '김영우' },
    { source: '서울특별시 금천구', target: 'Cold Brew', value: 1, respondent: '하재훈' },
    
    // Coffee to Dessert ratings - track individual choices
    { source: 'Iced Americano', target: 'Dessert 7점', value: 1, respondent: '조남철' },
    { source: 'Cafe Latte', target: 'Dessert 7점', value: 1, respondent: '한동주' },
    { source: 'Green Tea Latte', target: 'Dessert 5점', value: 1, respondent: '이경능' },
    { source: 'Iced Americano', target: 'Dessert 7점', value: 1, respondent: '김안나' },
    { source: 'Cafe Latte', target: 'Dessert 7점', value: 1, respondent: '김민주' },
    { source: 'Green Tea Latte', target: 'Dessert 7점', value: 1, respondent: '유케빈' },
    { source: 'Flat White', target: 'Dessert 7점', value: 1, respondent: '김영우' },
    { source: 'Cold Brew', target: 'Dessert 4점', value: 1, respondent: '하재훈' }
  ],
  // Add journey data for the streamlined component
  journeys: {
    '조남철': ['조남철', 'Ink Coffee', '서울특별시 금천구', 'Iced Americano', 'Dessert 7점'],
    '한동주': ['한동주', 'Ink Coffee', '서울특별시 금천구', 'Cafe Latte', 'Dessert 7점'],
    '이경능': ['이경능', 'Ink Coffee', '서울특별시 금천구', 'Green Tea Latte', 'Dessert 5점'],
    '김안나': ['김안나', 'Ink Coffee', '서울특별시 금천구', 'Iced Americano', 'Dessert 7점'],
    '김민주': ['김민주', 'Starbucks', '서울특별시 금천구', 'Cafe Latte', 'Dessert 7점'],
    '유케빈': ['유케빈', 'Starbucks', '서울특별시 금천구', 'Green Tea Latte', 'Dessert 7점'],
    '김영우': ['김영우', 'Hollys Coffee', '서울특별시 금천구', 'Flat White', 'Dessert 7점'],
    '하재훈': ['하재훈', 'Hollys Coffee', '서울특별시 금천구', 'Cold Brew', 'Dessert 4점']
  }
}

// Location verification flow
export const locationVerificationSankeyData = {
  nodes: [
    { id: 'All Respondents', category: 'source' },
    { id: '서울특별시 금천구', category: 'location' },
    { id: 'Ink Coffee', category: 'cafe' },
    { id: 'Starbucks', category: 'cafe' },
    { id: 'Hollys Coffee', category: 'cafe' }
  ],
  links: [
    { source: 'All Respondents', target: '서울특별시 금천구', value: 8 },
    { source: '서울특별시 금천구', target: 'Ink Coffee', value: 4 },
    { source: '서울특별시 금천구', target: 'Starbucks', value: 2 },
    { source: '서울특별시 금천구', target: 'Hollys Coffee', value: 2 }
  ]
}

export const STATE_DISTRICTS_MAP = [
  {
    state: "Bihar",
    districts: [
      "Patna",
      "Gaya",
      "Muzaffarpur",
      "Bhagalpur",
      "Darbhanga",
      "Purnia",
      "Begusarai",
      "Arrah (Bhojpur)",
      "Bihar Sharif (Nalanda)",
      "Chhapra (Saran)",
      "Hajipur (Vaishali)",
      "Katihar",
      "Munger",
      "Samastipur",
      "Sasaram (Rohtas)",
      "Motihari (East Champaran)",
      "Siwan",
      "Bettiah (West Champaran)"
    ]
  },
  {
    state: "Uttar Pradesh",
    districts: [
      "Lucknow",
      "Kanpur",
      "Varanasi",
      "Agra",
      "Prayagraj",
      "Noida (Gautam Buddha Nagar)",
      "Ghaziabad",
      "Gorakhpur",
      "Bareilly",
      "Aligarh",
      "Meerut",
      "Ayodhya",
      "Jhansi",
      "Moradabad",
      "Mathura"
    ]
  },
  {
    state: "Maharashtra",
    districts: [
      "Mumbai City",
      "Mumbai Suburban",
      "Thane",
      "Pune",
      "Nagpur",
      "Nashik",
      "Navi Mumbai",
      "Chhatrapati Sambhajinagar (Aurangabad)",
      "Solapur",
      "Amravati",
      "Kolhapur",
      "Jalgaon",
      "Sangli"
    ]
  },
  {
    state: "Delhi NCR",
    districts: [
      "New Delhi",
      "South Delhi",
      "Central Delhi",
      "Gurugram (NCR)",
      "Noida (NCR)",
      "Greater Noida",
      "Ghaziabad (NCR)",
      "Faridabad (NCR)"
    ]
  },
  {
    state: "Rajasthan",
    districts: [
      "Jaipur",
      "Jodhpur",
      "Udaipur",
      "Kota",
      "Ajmer",
      "Bikaner",
      "Alwar",
      "Bhilwara",
      "Bharatpur",
      "Sikar"
    ]
  },
  {
    state: "Madhya Pradesh",
    districts: [
      "Indore",
      "Bhopal",
      "Gwalior",
      "Jabalpur",
      "Ujjain",
      "Sagar",
      "Rewa",
      "Satna"
    ]
  },
  {
    state: "Punjab & Haryana",
    districts: [
      "Chandigarh",
      "Ludhiana",
      "Amritsar",
      "Jalandhar",
      "Patiala",
      "Bathinda",
      "Panipat",
      "Ambala",
      "Hisar",
      "Karnal"
    ]
  },
  {
    state: "Gujarat",
    districts: [
      "Ahmedabad",
      "Surat",
      "Vadodara",
      "Rajkot",
      "Bhavnagar",
      "Jamnagar",
      "Junagadh",
      "Anand",
      "Gandhinagar"
    ]
  },
  {
    state: "Karnataka",
    districts: [
      "Bengaluru Urban",
      "Mysuru",
      "Mangaluru (Dakshina Kannada)",
      "Belagavi",
      "Hubballi-Dharwad",
      "Kalaburagi",
      "Shivamogga",
      "Ballari"
    ]
  },
  {
    state: "Tamil Nadu",
    districts: [
      "Chennai",
      "Coimbatore",
      "Madurai",
      "Tiruchirappalli",
      "Salem",
      "Tirunelveli",
      "Vellore",
      "Erode"
    ]
  },
  {
    state: "West Bengal",
    districts: [
      "Kolkata",
      "Howrah",
      "North 24 Parganas",
      "South 24 Parganas",
      "Siliguri (Darjeeling)",
      "Durgapur (Paschim Bardhaman)",
      "Asansol",
      "Murshidabad"
    ]
  },
  {
    state: "Telangana & AP",
    districts: [
      "Hyderabad",
      "Rangareddy",
      "Warangal",
      "Visakhapatnam",
      "Vijayawada",
      "Guntur",
      "Tirupati",
      "Nellore"
    ]
  },
  {
    state: "Goa",
    districts: [
      "North Goa (Panaji/Mapusa)",
      "South Goa (Margao/Vasco)"
    ]
  },
  {
    state: "Kerala",
    districts: [
      "Thiruvananthapuram",
      "Ernakulam (Kochi)",
      "Kozhikode",
      "Thrissur",
      "Kannur",
      "Kollam"
    ]
  },
  {
    state: "Jharkhand",
    districts: [
      "Ranchi",
      "Dhanbad",
      "Jamshedpur (East Singhbhum)",
      "Bokaro",
      "Hazaribagh",
      "Deoghar"
    ]
  }
];

export const STATE_CITIES_MAP = STATE_DISTRICTS_MAP.map((item) => ({
  state: item.state,
  cities: item.districts
}));

export const GROUPED_CITIES = [
  {
    groupName: "All Locations",
    items: ["All Cities/Districts"]
  },
  ...STATE_DISTRICTS_MAP.map((g) => ({
    groupName: g.state,
    items: g.districts
  }))
];

const allDistrictsRaw = STATE_DISTRICTS_MAP.flatMap((item) => item.districts);
export const CITIES = [
  "All Cities/Districts",
  ...Array.from(new Set(allDistrictsRaw))
];

export const STATES = [
  "All States",
  ...Array.from(new Set(STATE_DISTRICTS_MAP.map((item) => item.state)))
];

export const GUARD_TYPES = [
  "All Types",
  "Bouncer",
  "Security Guard",
  "Personal Bodyguard"
];

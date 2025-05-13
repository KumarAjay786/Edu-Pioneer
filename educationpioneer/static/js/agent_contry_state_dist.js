// Sample data (replace with API calls if needed)
const locationData = {
    India: {
       "andhra-pradesh": ["Anantapur", "Chittoor", "East Godavari", "Guntur", "Krishna", "Kurnool", "Nellore", "Prakasam", "Srikakulam", "Visakhapatnam", "Vizianagaram", "West Godavari", "YSR Kadapa"],
    "arunachal-pradesh": ["Anjaw", "Changlang", "Dibang Valley", "East Kameng", "East Siang", "Kamle", "Kra Daadi", "Kurung Kumey", "Lepa Rada", "Lohit", "Longding", "Lower Dibang Valley", "Lower Siang", "Lower Subansiri", "Namsai", "Pakke-Kessang", "Papum Pare", "Shi Yomi", "Siang", "Tawang", "Tirap", "Upper Siang", "Upper Subansiri", "West Kameng", "West Siang"],
    "assam": ["Baksa", "Barpeta", "Biswanath", "Bongaigaon", "Cachar", "Charaideo", "Chirang", "Darrang", "Dhemaji", "Dhubri", "Dibrugarh", "Dima Hasao", "Goalpara", "Golaghat", "Hailakandi", "Hojai", "Jorhat", "Kamrup", "Kamrup Metropolitan", "Karbi Anglong", "Karimganj", "Kokrajhar", "Lakhimpur", "Majuli", "Morigaon", "Nagaon", "Nalbari", "Sivasagar", "Sonitpur", "South Salmara-Mankachar", "Tinsukia", "Udalguri", "West Karbi Anglong"],
    "bihar": ["Araria", "Arwal", "Aurangabad", "Banka", "Begusarai", "Bhagalpur", "Bhojpur", "Buxar", "Darbhanga", "East Champaran", "Gaya", "Gopalganj", "Jamui", "Jehanabad", "Kaimur", "Katihar", "Khagaria", "Kishanganj", "Lakhisarai", "Madhepura", "Madhubani", "Munger", "Muzaffarpur", "Nalanda", "Nawada", "Patna", "Purnia", "Rohtas", "Saharsa", "Samastipur", "Saran", "Sheikhpura", "Sheohar", "Sitamarhi", "Siwan", "Supaul", "Vaishali", "West Champaran"],
    "chhattisgarh": ["Balod", "Baloda Bazar", "Balrampur", "Bastar", "Bemetara", "Bijapur", "Bilaspur", "Dantewada", "Dhamtari", "Durg", "Gariaband", "Gaurela-Pendra-Marwahi", "Janjgir-Champa", "Jashpur", "Kabirdham", "Kanker", "Kondagaon", "Korba", "Koriya", "Mahasamund", "Mungeli", "Narayanpur", "Raigarh", "Raipur", "Rajnandgaon", "Sukma", "Surajpur", "Surguja"],
    "goa": ["North Goa", "South Goa"],
    "gujarat": ["Ahmedabad", "Amreli", "Anand", "Aravalli", "Banaskantha", "Bharuch", "Bhavnagar", "Botad", "Chhota Udaipur", "Dahod", "Dang", "Devbhoomi Dwarka", "Gandhinagar", "Gir Somnath", "Jamnagar", "Junagadh", "Kheda", "Kutch", "Mahisagar", "Mehsana", "Morbi", "Narmada", "Navsari", "Panchmahal", "Patan", "Porbandar", "Rajkot", "Sabarkantha", "Surat", "Surendranagar", "Tapi", "Vadodara", "Valsad"],
    "haryana": ["Ambala", "Bhiwani", "Charkhi Dadri", "Faridabad", "Fatehabad", "Gurugram", "Hisar", "Jhajjar", "Jind", "Kaithal", "Karnal", "Kurukshetra", "Mahendragarh", "Nuh", "Palwal", "Panchkula", "Panipat", "Rewari", "Rohtak", "Sirsa", "Sonipat", "Yamunanagar"],
    "himachal-pradesh": ["Bilaspur", "Chamba", "Hamirpur", "Kangra", "Kinnaur", "Kullu", "Lahaul and Spiti", "Mandi", "Shimla", "Sirmaur", "Solan", "Una"],
    "jharkhand": ["Bokaro", "Chatra", "Deoghar", "Dhanbad", "Dumka", "East Singhbhum", "Garhwa", "Giridih", "Godda", "Gumla", "Hazaribagh", "Jamtara", "Khunti", "Koderma", "Latehar", "Lohardaga", "Pakur", "Palamu", "Ramgarh", "Ranchi", "Sahebganj", "Seraikela Kharsawan", "Simdega", "West Singhbhum"],
    "karnataka": ["Bagalkot", "Bangalore Rural", "Bangalore Urban", "Belgaum", "Bellary", "Bidar", "Bijapur", "Chamarajanagar", "Chikkamagaluru", "Chitradurga", "Dakshina Kannada", "Davangere", "Dharwad", "Gadag", "Gulbarga", "Hassan", "Haveri", "Kodagu", "Kolar", "Koppal", "Mandya", "Mysore", "Raichur", "Ramanagara", "Shimoga", "Tumkur", "Udupi", "Uttara Kannada", "Vijayanagara", "Vijayapura", "Yadgir"],
    "kerala": ["Alappuzha", "Ernakulam", "Idukki", "Kannur", "Kasaragod", "Kollam", "Kottayam", "Kozhikode", "Malappuram", "Palakkad", "Pathanamthitta", "Thiruvananthapuram", "Thrissur", "Wayanad"],
    "madhya-pradesh": ["Agar Malwa", "Alirajpur", "Anuppur", "Ashoknagar", "Balaghat", "Barwani", "Betul", "Bhind", "Bhopal", "Burhanpur", "Chhatarpur", "Chhindwara", "Damoh", "Datia", "Dewas", "Dhar", "Dindori", "Guna", "Gwalior", "Harda", "Hoshangabad", "Indore", "Jabalpur", "Jhabua", "Katni", "Khandwa", "Khargone", "Mandla", "Mandsaur", "Morena", "Narsinghpur", "Neemuch", "Niwari", "Panna", "Raisen", "Rajgarh", "Ratlam", "Rewa", "Sagar", "Satna", "Sehore", "Seoni", "Shahdol", "Shajapur", "Sheopur", "Shivpuri", "Sidhi", "Singrauli", "Tikamgarh", "Ujjain", "Umaria", "Vidisha"],
    "maharashtra": ["Ahmednagar", "Akola", "Amravati", "Aurangabad", "Beed", "Bhandara", "Buldhana", "Chandrapur", "Dhule", "Gadchiroli", "Gondia", "Hingoli", "Jalgaon", "Jalna", "Kolhapur", "Latur", "Mumbai City", "Mumbai Suburban", "Nagpur", "Nanded", "Nandurbar", "Nashik", "Osmanabad", "Palghar", "Parbhani", "Pune", "Raigad", "Ratnagiri", "Sangli", "Satara", "Sindhudurg", "Solapur", "Thane", "Wardha", "Washim", "Yavatmal"],
    "manipur": ["Bishnupur", "Chandel", "Churachandpur", "Imphal East", "Imphal West", "Jiribam", "Kakching", "Kamjong", "Kangpokpi", "Noney", "Pherzawl", "Senapati", "Tamenglong", "Tengnoupal", "Thoubal", "Ukhrul"],
    "meghalaya": ["East Garo Hills", "East Jaintia Hills", "East Khasi Hills", "North Garo Hills", "Ri-Bhoi", "South Garo Hills", "South West Garo Hills", "South West Khasi Hills", "West Garo Hills", "West Jaintia Hills", "West Khasi Hills"],
    "mizoram": ["Aizawl", "Champhai", "Hnahthial", "Khawzawl", "Kolasib", "Lawngtlai", "Lunglei", "Mamit", "Saiha", "Saitual", "Serchhip"],
    "nagaland": ["Chümoukedima", "Dimapur", "Kiphire", "Kohima", "Longleng", "Mokokchung", "Mon", "Noklak", "Peren", "Phek", "Shamator", "Tuensang", "Tseminyü", "Wokha", "Zünheboto"],
    "odisha": ["Angul", "Balangir", "Balasore", "Bargarh", "Bhadrak", "Boudh", "Cuttack", "Debagarh"],
    "punjab": [
        "Amritsar", "Barnala", "Bathinda", "Faridkot", "Fatehgarh Sahib", "Fazilka", "Ferozepur", "Gurdaspur",
        "Hoshiarpur", "Jalandhar", "Kapurthala", "Ludhiana", "Malerkotla", "Mansa", "Moga", "Sri Muktsar Sahib",
        "Pathankot", "Patiala", "Rupnagar", "Sahibzada Ajit Singh Nagar", "Sangrur", "Shaheed Bhagat Singh Nagar", "Tarn Taran"
    ],
    "rajasthan": [
        "Ajmer", "Alwar", "Banswara", "Baran", "Barmer", "Bharatpur", "Bhilwara", "Bikaner", "Bundi", "Chittorgarh",
        "Churu", "Dausa", "Dholpur", "Dungarpur", "Hanumangarh", "Jaipur", "Jaisalmer", "Jalore", "Jhalawar", "Jhunjhunu",
        "Jodhpur", "Karauli", "Kota", "Nagaur", "Pali", "Pratapgarh", "Rajsamand", "Sawai Madhopur", "Sikar", "Sirohi",
        "Sri Ganganagar", "Tonk", "Udaipur"
    ],
    "sikkim": [
        "Gangtok", "Gyalshing", "Mangan", "Namchi", "Pakyong", "Soreng"
    ],
    "tamil-nadu": [
        "Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", "Dindigul", "Erode",
        "Kallakurichi", "Kanchipuram", "Kanyakumari", "Karur", "Krishnagiri", "Madurai", "Mayiladuthurai",
        "Nagapattinam", "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai", "Ramanathapuram", "Ranipet",
        "Salem", "Sivaganga", "Tenkasi", "Thanjavur", "Theni", "Thiruvallur", "Thiruvarur", "Thiruvannamalai",
        "Thoothukudi", "Tiruchirappalli", "Tirunelveli", "Tirupathur", "Tiruppur", "Vellore", "Viluppuram",
        "Virudhunagar"
      ],
      "telangana": [
    "Adilabad", "Bhadradri Kothagudem", "Hyderabad", "Jagitial", "Jangaon", "Jayashankar Bhupalpally",
    "Jogulamba Gadwal", "Kamareddy", "Karimnagar", "Khammam", "Komaram Bheem Asifabad", "Mahabubabad",
    "Mahbubnagar", "Mancherial", "Medak", "Medchal–Malkajgiri", "Mulugu", "Nagarkurnool", "Nalgonda",
    "Narayanpet", "Nirmal", "Nizamabad", "Peddapalli", "Rajanna Sircilla", "Ranga Reddy", "Sangareddy",
    "Siddipet", "Suryapet", "Vikarabad", "Wanaparthy", "Yadadri Bhuvanagiri"
  ],
    "tripura": [
        "Dhalai", "Gomati", "Khowai", "North Tripura", "Sepahijala", "South Tripura", "Unakoti", "West Tripura"
    ],
    "uttar-pradesh": [
    "Agra", "Aligarh", "Ambedkar Nagar", "Amethi", "Amroha", "Auraiya", "Ayodhya", "Azamgarh", "Badaun",
    "Baghpat", "Bahraich", "Ballia", "Balrampur", "Banda", "Barabanki", "Bareilly", "Basti", "Bhadohi",
    "Bijnor", "Bulandshahr", "Chandauli", "Chitrakoot", "Deoria", "Etah", "Etawah", "Farrukhabad", "Fatehpur",
    "Firozabad", "Gautam Buddh Nagar", "Ghaziabad", "Ghazipur", "Gonda", "Gorakhpur", "Hapur", "Hardoi",
    "Hathras", "Jalaun", "Jaunpur", "Jhansi", "Kannauj", "Kanpur Dehat", "Kanpur Nagar", "Kasganj",
    "Kaushambi", "Kheri", "Kushinagar", "Lakhimpur Kheri", "Lalitpur", "Lucknow", "Maharajganj", "Mahoba",
    "Mainpuri", "Mathura", "Mau", "Meerut", "Mirzapur", "Moradabad", "Muzaffarnagar", "Pilibhit", "Pratapgarh",
    "Prayagraj", "Rae Bareli", "Rampur", "Saharanpur", "Sambhal", "Sant Kabir Nagar", "Shahjahanpur",
    "Shamli", "Shravasti", "Siddharthnagar", "Sitapur", "Sonbhadra", "Sultanpur", "Unnao", "Varanasi"
  ],
    "uttarakhand": [
        "Almora", "Bageshwar", "Chamoli", "Champawat", "Dehradun", "Haridwar", "Nainital", "Pauri Garhwal",
        "Pithoragarh", "Rudraprayag", "Tehri Garhwal", "Udham Singh Nagar", "Uttarkashi"
    ],
    "west-bengal": [
        "Alipurduar", "Bankura", "Birbhum", "Cooch Behar", "Dakshin Dinajpur", "Darjeeling", "Hooghly", "Howrah",
        "Jalpaiguri", "Jhargram", "Kalimpong", "Kolkata", "Malda", "Murshidabad", "Nadia", "North 24 Parganas",
        "Paschim Bardhaman", "Paschim Medinipur", "Purba Bardhaman", "Purba Medinipur", "Purulia", "South 24 Parganas", "Uttar Dinajpur"
    ]
    },
    USA: {
        Alabama: ['Birmingham', 'Montgomery', 'Mobile', 'Huntsville', 'Tuscaloosa'],
        Alaska: ['Anchorage', 'Fairbanks', 'Juneau', 'Sitka', 'Wasilla'],
        Arizona: ['Phoenix', 'Tucson', 'Mesa', 'Chandler', 'Scottsdale'],
        Arkansas: ['Little Rock', 'Fort Smith', 'Fayetteville', 'Springdale', 'Jonesboro'],
        California: ['Los Angeles', 'San Diego', 'San Jose', 'San Francisco', 'Fresno', 'Sacramento', 'Long Beach', 'Oakland', 'Bakersfield', 'Anaheim'],
        Colorado: ['Denver', 'Colorado Springs', 'Aurora', 'Fort Collins', 'Lakewood'],
        Connecticut: ['Bridgeport', 'New Haven', 'Stamford', 'Hartford', 'Waterbury'],
        Delaware: ['Wilmington', 'Dover', 'Newark', 'Middletown', 'Smyrna'],
        Florida: ['Jacksonville', 'Miami', 'Tampa', 'Orlando', 'St. Petersburg', 'Hialeah', 'Tallahassee', 'Fort Lauderdale', 'Port St. Lucie', 'Pembroke Pines'],
        Georgia: ['Atlanta', 'Augusta', 'Columbus', 'Savannah', 'Athens'],
        Hawaii: ['Honolulu', 'Pearl City', 'Hilo', 'Kailua', 'Waipahu'],
        Idaho: ['Boise', 'Nampa', 'Meridian', 'Idaho Falls', 'Pocatello'],
        Illinois: ['Chicago', 'Aurora', 'Rockford', 'Joliet', 'Naperville'],
        Indiana: ['Indianapolis', 'Fort Wayne', 'Evansville', 'South Bend', 'Carmel'],
        Iowa: ['Des Moines', 'Cedar Rapids', 'Davenport', 'Sioux City', 'Iowa City'],
        Kansas: ['Wichita', 'Overland Park', 'Kansas City', 'Olathe', 'Topeka'],
        Kentucky: ['Louisville', 'Lexington', 'Bowling Green', 'Owensboro', 'Covington'],
        Louisiana: ['New Orleans', 'Baton Rouge', 'Shreveport', 'Lafayette', 'Lake Charles'],
        Maine: ['Portland', 'Lewiston', 'Bangor', 'South Portland', 'Auburn'],
        Maryland: ['Baltimore', 'Frederick', 'Rockville', 'Gaithersburg', 'Bowie'],
        Massachusetts: ['Boston', 'Worcester', 'Springfield', 'Lowell', 'Cambridge'],
        Michigan: ['Detroit', 'Grand Rapids', 'Warren', 'Sterling Heights', 'Ann Arbor'],
        Minnesota: ['Minneapolis', 'Saint Paul', 'Rochester', 'Duluth', 'Bloomington'],
        Mississippi: ['Jackson', 'Gulfport', 'Southaven', 'Hattiesburg', 'Biloxi'],
        Missouri: ['Kansas City', 'St. Louis', 'Springfield', 'Independence', 'Columbia'],
        Montana: ['Billings', 'Missoula', 'Great Falls', 'Bozeman', 'Butte'],
        Nebraska: ['Omaha', 'Lincoln', 'Bellevue', 'Grand Island', 'Kearney'],
        Nevada: ['Las Vegas', 'Henderson', 'Reno', 'North Las Vegas', 'Sparks'],
        'New Hampshire': ['Manchester', 'Nashua', 'Concord', 'Dover', 'Rochester'],
        'New Jersey': ['Newark', 'Jersey City', 'Paterson', 'Elizabeth', 'Edison'],
        'New Mexico': ['Albuquerque', 'Las Cruces', 'Rio Rancho', 'Santa Fe', 'Roswell'],
        'New York': ['New York City', 'Buffalo', 'Rochester', 'Yonkers', 'Syracuse'],
        'North Carolina': ['Charlotte', 'Raleigh', 'Greensboro', 'Durham', 'Winston-Salem'],
        'North Dakota': ['Fargo', 'Bismarck', 'Grand Forks', 'Minot', 'West Fargo'],
        Ohio: ['Columbus', 'Cleveland', 'Cincinnati', 'Toledo', 'Akron'],
        Oklahoma: ['Oklahoma City', 'Tulsa', 'Norman', 'Broken Arrow', 'Lawton'],
        Oregon: ['Portland', 'Eugene', 'Salem', 'Gresham', 'Hillsboro'],
        Pennsylvania: ['Philadelphia', 'Pittsburgh', 'Allentown', 'Erie', 'Reading'],
        'Rhode Island': ['Providence', 'Warwick', 'Cranston', 'Pawtucket', 'East Providence'],
        'South Carolina': ['Columbia', 'Charleston', 'North Charleston', 'Mount Pleasant', 'Rock Hill'],
        'South Dakota': ['Sioux Falls', 'Rapid City', 'Aberdeen', 'Brookings', 'Watertown'],
        Tennessee: ['Nashville', 'Memphis', 'Knoxville', 'Chattanooga', 'Clarksville'],
        Texas: ['Houston', 'San Antonio', 'Dallas', 'Austin', 'Fort Worth', 'El Paso', 'Arlington', 'Corpus Christi', 'Plano', 'Laredo'],
        Utah: ['Salt Lake City', 'West Valley City', 'Provo', 'West Jordan', 'Orem'],
        Vermont: ['Burlington', 'South Burlington', 'Rutland', 'Barre', 'Montpelier'],
        Virginia: ['Virginia Beach', 'Norfolk', 'Chesapeake', 'Richmond', 'Newport News'],
        Washington: ['Seattle', 'Spokane', 'Tacoma', 'Vancouver', 'Bellevue'],
        'West Virginia': ['Charleston', 'Huntington', 'Parkersburg', 'Morgantown', 'Wheeling'],
        Wisconsin: ['Milwaukee', 'Madison', 'Green Bay', 'Kenosha', 'Racine'],
        Wyoming: ['Cheyenne', 'Casper', 'Laramie', 'Gillette', 'Rock Springs']
    },
    Canada: {
        Alberta: ['Calgary', 'Edmonton', 'Red Deer', 'Lethbridge', 'St. Albert'],
        'British Columbia': ['Vancouver', 'Victoria', 'Surrey', 'Burnaby', 'Richmond'],
        Manitoba: ['Winnipeg', 'Brandon', 'Steinbach', 'Thompson', 'Portage la Prairie'],
        'New Brunswick': ['Moncton', 'Saint John', 'Fredericton', 'Dieppe', 'Miramichi'],
        Newfoundland_and_Labrador: ['St. John\'s', 'Mount Pearl', 'Corner Brook', 'Gander', 'Grand Falls-Windsor'],
        'Nova Scotia': ['Halifax', 'Sydney', 'Truro', 'New Glasgow', 'Kentville'],
        Ontario: ['Toronto', 'Ottawa', 'Mississauga', 'Brampton', 'Hamilton'],
        Prince_Edward_Island: ['Charlottetown', 'Summerside', 'Stratford', 'Cornwall', 'Montague'],
        Quebec: ['Montreal', 'Quebec City', 'Laval', 'Gatineau', 'Longueuil'],
        Saskatchewan: ['Saskatoon', 'Regina', 'Prince Albert', 'Moose Jaw', 'Swift Current']
    },
    Australia: {
        'New South Wales': ['Sydney', 'Newcastle', 'Wollongong', 'Albury', 'Maitland'],
        Victoria: ['Melbourne', 'Geelong', 'Ballarat', 'Bendigo', 'Shepparton'],
        Queensland: ['Brisbane', 'Gold Coast', 'Cairns', 'Townsville', 'Toowoomba'],
        'Western Australia': ['Perth', 'Fremantle', 'Bunbury', 'Geraldton', 'Kalgoorlie'],
        'South Australia': ['Adelaide', 'Mount Gambier', 'Whyalla', 'Gawler', 'Port Augusta'],
        Tasmania: ['Hobart', 'Launceston', 'Devonport', 'Burnie', 'Glenorchy'],
        'Australian Capital Territory': ['Canberra', 'Belconnen', 'Tuggeranong'],
        'Northern Territory': ['Darwin', 'Alice Springs', 'Palmerston', 'Katherine', 'Tennant Creek']
    },
    UK: {
        England: ['London', 'Manchester', 'Birmingham', 'Leeds', 'Liverpool'],
        Scotland: ['Edinburgh', 'Glasgow', 'Aberdeen', 'Dundee', 'Inverness'],
        Wales: ['Cardiff', 'Swansea', 'Newport', 'Wrexham', 'Bangor'],
        'Northern Ireland': ['Belfast', 'Derry', 'Lisburn', 'Newry', 'Armagh']
    },
    Germany: {
        'Baden-Württemberg': ['Stuttgart', 'Mannheim', 'Karlsruhe', 'Freiburg', 'Heidelberg'],
        Bavaria: ['Munich', 'Nuremberg', 'Augsburg', 'Regensburg', 'Ingolstadt'],
        Berlin: ['Berlin'],
        Brandenburg: ['Potsdam', 'Cottbus', 'Brandenburg an der Havel', 'Frankfurt (Oder)', 'Oranienburg'],
        Bremen: ['Bremen', 'Bremerhaven'],
        Hamburg: ['Hamburg'],
        Hesse: ['Frankfurt', 'Wiesbaden', 'Kassel', 'Darmstadt', 'Offenbach'],
        'Lower Saxony': ['Hanover', 'Braunschweig', 'Osnabrück', 'Oldenburg', 'Göttingen'],
        'Mecklenburg-Vorpommern': ['Rostock', 'Schwerin', 'Neubrandenburg', 'Stralsund', 'Greifswald'],
        'North Rhine-Westphalia': ['Cologne', 'Düsseldorf', 'Dortmund', 'Essen', 'Bonn'],
        'Rhineland-Palatinate': ['Mainz', 'Ludwigshafen', 'Koblenz', 'Trier', 'Kaiserslautern'],
        Saarland: ['Saarbrücken', 'Neunkirchen', 'Homburg', 'Völklingen', 'Sankt Ingbert'],
        Saxony: ['Dresden', 'Leipzig', 'Chemnitz', 'Zwickau', 'Görlitz'],
        'Saxony-Anhalt': ['Magdeburg', 'Halle', 'Dessau-Roßlau', 'Wittenberg', 'Stendal'],
        'Schleswig-Holstein': ['Kiel', 'Lübeck', 'Flensburg', 'Neumünster', 'Norderstedt'],
        Thuringia: ['Erfurt', 'Jena', 'Gera', 'Weimar', 'Eisenach']
    },
    France: {
        'Île-de-France': ['Paris', 'Versailles', 'Boulogne-Billancourt', 'Montreuil', 'Argenteuil'],
       ' Provence-Alpes-Côte d\'Azur': ['Marseille', 'Nice', 'Toulon', 'Aix-en-Provence', 'Cannes'],
       ' Rhône-Alpes': ['Lyon', 'Saint-Étienne', 'Grenoble', 'Annecy', 'Chambéry'],
        'Nord-Pas-de-Calais': ['Lille', 'Roubaix', 'Tourcoing', 'Dunkerque', 'Calais'],
        'Haute-Normandie': ['Rouen', 'Le Havre', 'Évreux', 'Dieppe', 'Fécamp'],
        Bretagne: ['Rennes', 'Brest', 'Quimper', 'Saint-Malo', 'Vannes'],
        Alsace: ['Strasbourg', 'Mulhouse', 'Colmar', 'Haguenau', 'Schiltigheim'],
        Aquitaine: ['Bordeaux', 'Pau', 'Bayonne', 'Arcachon', 'Anglet'],
        'Midi-Pyrénées': ['Toulouse', 'Montauban', 'Albi', 'Cahors', 'Tarbes'],
        Lorraine: ['Nancy', 'Metz', 'Thionville', 'Epinal', 'Longwy']
    },
    Japan: {
        Hokkaido: ['Sapporo', 'Asahikawa', 'Hakodate', 'Obihiro', 'Kushiro'],
        Tohoku: ['Sendai', 'Morioka', 'Yamagata', 'Fukushima', 'Aomori'],
        Kanto: ['Tokyo', 'Yokohama', 'Chiba', 'Saitama', 'Kawasaki'],
        Chubu: ['Nagoya', 'Shizuoka', 'Hamamatsu', 'Toyohashi', 'Gifu'],
        Kansai: ['Osaka', 'Kyoto', 'Kobe', 'Himeji', 'Nara'],
        Chugoku: ['Hiroshima', 'Okayama', 'Yamaguchi', 'Shimonoseki', 'Tottori'],
        Shikoku: ['Matsuyama', 'Takamatsu', 'Kochi', 'Tokushima', 'Marugame'],
        Kyushu: ['Fukuoka', 'Kagoshima', 'Nagasaki', 'Okinawa', 'Kumamoto']
    },
    Brazil: {
        Acre: ['Rio Branco', 'Cruzeiro do Sul', 'Tarauacá', 'Sena Madureira', 'Feijó'],
        Alagoas: ['Maceió', 'Arapiraca', 'Palmeira dos Índios', 'Rio Largo', 'Penedo'],
        Amazonas: ['Manaus', 'Parintins', 'Itacoatiara', 'Manacapuru', 'Tabatinga'],
        Bahia: ['Salvador', 'Feira de Santana', 'Vitória da Conquista', 'Camaçari', 'Ilhéus'],
        Ceará: ['Fortaleza', 'Caucaia', 'Juazeiro do Norte', 'Sobral', 'Maracanaú'],
        'Espírito Santo': ['Vitória', 'Vila Velha', 'Serra', 'Cariacica', 'Linhares'],
        Goiás: ['Goiânia', 'Anápolis', 'Aparecida de Goiânia', 'Rio Verde', 'Luziânia'],
        Maranhão: ['São Luís', 'Imperatriz', 'Caxias', 'Timon', 'Bacabal'],
        'Mato Grosso': ['Cuiabá', 'Várzea Grande', 'Rondonópolis', 'Sinop', 'Tangará da Serra'],
        'Mato Grosso do Sul': ['Campo Grande', 'Dourados', 'Três Lagoas', 'Corumbá', 'Ponta Porã']
    },
    Italy: {
        Lazio: ['Rome', 'Frosinone', 'Viterbo', 'Latina', 'Rieti'],
        Lombardy: ['Milan', 'Brescia', 'Monza', 'Bergamo', 'Como'],
        Tuscany: ['Florence', 'Pisa', 'Siena', 'Livorno', 'Arezzo'],
        Campania: ['Naples', 'Salerno', 'Caserta', 'Avellino', 'Benevento'],
        Veneto: ['Venice', 'Verona', 'Vicenza', 'Padua', 'Treviso'],
        'Emilia-Romagna': ['Bologna', 'Modena', 'Parma', 'Reggio Emilia', 'Ravenna'],
        Sicily: ['Palermo', 'Catania', 'Messina', 'Syracuse', 'Trapani'],
        Puglia: ['Bari', 'Lecce', 'Taranto', 'Foggia', 'Brindisi'],
        Calabria: ['Reggio Calabria', 'Catanzaro', 'Cosenza', 'Crotone', 'Vibo Valentia'],
        Piedmont: ['Turin', 'Novara', 'Alessandria', 'Asti', 'Cuneo']
    },
    Spain: {
        Andalusia: ['Seville', 'Malaga', 'Granada', 'Córdoba', 'Jerez de la Frontera'],
        Catalonia: ['Barcelona', 'Girona', 'Tarragona', 'Lleida', 'Reus'],
        Madrid: ['Madrid', 'Alcalá de Henares', 'Getafe', 'Móstoles', 'Leganés'],
        Valencian_Community: ['Valencia', 'Alicante', 'Castellón de la Plana', 'Elche', 'Torrevieja'],
        Galicia: ['A Coruña', 'Vigo', 'Santiago de Compostela', 'Lugo', 'Ourense'],
        Castilla_and_Leon: ['Valladolid', 'León', 'Salamanca', 'Burgos', 'Palencia'],
        Basque_Country: ['Bilbao', 'San Sebastián', 'Vitoria-Gasteiz', 'Getxo', 'Irun'],
        'Castile-La_Mancha': ['Toledo', 'Albacete', 'Ciudad Real', 'Cuenca', 'Guadalajara'],
        Canary_Islands: ['Las Palmas', 'Santa Cruz de Tenerife', 'San Cristóbal de La Laguna', 'La Orotava', 'Tegueste'],
        Extremadura: ['Badajoz', 'Cáceres', 'Mérida', 'Don Benito', 'Almendralejo']
    },
    Mexico: {
        Baja_California: ['Tijuana', 'Mexicali', 'Ensenada', 'Tecate', 'Rosarito'],
        Jalisco: ['Guadalajara', 'Puerto Vallarta', 'Tepatitlán', 'Zapopan', 'Tlaquepaque'],
        Yucatán: ['Mérida', 'Valladolid', 'Progreso', 'Tizimín', 'Izamal'],
        Veracruz: ['Veracruz', 'Xalapa', 'Coatzacoalcos', 'Poza Rica', 'Orizaba'],
        Nuevo_León: ['Monterrey', 'San Nicolás', 'Guadalupe', 'San Pedro Garza García', 'Apodaca'],
        Ciudad_de_México: ['Mexico City', 'Iztapalapa', 'Ecatepec', 'Gustavo A. Madero', 'Azcapotzalco'],
        Chiapas: ['Tuxtla Gutiérrez', 'Tapachula', 'San Cristóbal de las Casas', 'Comitán', 'Palenque'],
        Puebla: ['Puebla', 'Tehuacán', 'Atlixco', 'Cholula', 'Huejotzingo'],
        Sonora: ['Hermosillo', 'Nogales', 'Cajeme', 'San Luis Río Colorado', 'Guaymas'],
        Guanajuato: ['Guanajuato', 'León', 'Irapuato', 'Celaya', 'Silao']
    },
    'South Africa': {
        Gauteng: ['Johannesburg', 'Pretoria', 'Midrand', 'Centurion', 'Benoni'],
        Western_Cape: ['Cape Town', 'Stellenbosch', 'George', 'Knysna', 'Paternoster'],
        KwaZulu_Natal: ['Durban', 'Pietermaritzburg', 'Richards Bay', 'Umdloti', 'Ballito'],
        Eastern_Cape: ['Port Elizabeth', 'East London', 'Gqeberha', 'Mthatha', 'Queenstown'],
        Limpopo: ['Polokwane', 'Tzaneen', 'Thohoyandou', 'Makhado', 'Lephalale'],
        Free_State: ['Bloemfontein', 'Welkom', 'Kroonstad', 'Sasolburg', 'Virginia'],
        Mpumalanga: ['Nelspruit', 'Witbank', 'White River', 'Secunda', 'Lydenburg'],
        North_West: ['Mahikeng', 'Rustenburg', 'Klerksdorp', 'Potchefstroom', 'Mafikeng'],
        Northern_Cape: ['Kimberley', 'Upington', 'Springbok', 'Postmasburg', 'Douglas'],
        Western_Cape: ['Cape Town', 'Paternoster', 'Stellenbosch', 'Hermanus', 'Ceres']
    }
        
};

// Populate countries
const countrySelect = document.getElementById('agent-country');
const stateSelect = document.getElementById('agent-state');
const districtSelect = document.getElementById('agent-district');

function populateCountries() {
    for (let country in locationData) {
        countrySelect.innerHTML += `<option value="${country}">${country}</option>`;
    }
}

function populateStates(country) {
    stateSelect.innerHTML = '<option value="">Select State</option>';
    districtSelect.innerHTML = '<option value="">Select District</option>';
    if (country && locationData[country]) {
        for (let state in locationData[country]) {
            stateSelect.innerHTML += `<option value="${state}">${state}</option>`;
        }
    }
}

function populateDistricts(country, state) {
    districtSelect.innerHTML = '<option value="">Select District</option>';
    if (country && state && locationData[country][state]) {
        locationData[country][state].forEach(district => {
            districtSelect.innerHTML += `<option value="${district}">${district}</option>`;
        });
    }
}

countrySelect.addEventListener('change', () => {
    const country = countrySelect.value;
    populateStates(country);
});

stateSelect.addEventListener('change', () => {
    const country = countrySelect.value;
    const state = stateSelect.value;
    populateDistricts(country, state);
});

populateCountries();



function showCollegeDetails(collegeId) {
    const college = colleges.find(c => c.id === collegeId);
    if (!college) return;

    const modal = document.getElementById('collegeDetailsModal');
    const countryName = locationData[college.country].name;
    const stateName = locationData[college.country].states[college.state].name;
    const cityName = college.city.charAt(0).toUpperCase() + college.city.slice(1);

    // Update modal content
    modal.querySelector('.modal-title').textContent = college.name;
    modal.querySelector('.modal-college-image').src = college.image;
    modal.querySelector('.modal-description').textContent = college.description;
    modal.querySelector('.modal-tuition').textContent = `$${college.tuition.toLocaleString()}/year`;
    modal.querySelector('.modal-acceptance').textContent = `${college.acceptance}%`;
    modal.querySelector('.modal-location').textContent = `${cityName}, ${stateName}, ${countryName}`;
    modal.querySelector('.modal-fields').textContent = college.field.map(f => f.charAt(0).toUpperCase() + f.slice(1)).join(', ');
    modal.querySelector('.modal-degrees').textContent = college.degrees.map(d => d.charAt(0).toUpperCase() + d.slice(1)).join(', ');
    modal.querySelector('.modal-ranking').textContent = college.ranking;

    // Show the modal using Bootstrap's modal component
    const bootstrapModal = new bootstrap.Modal(modal);
    bootstrapModal.show();
}

const colleges = [
    {
        id: 1,
        name: "Harvard University",
        country: "us",
        state: "massachusetts",
        city: "cambridge",
        field: ["business", "medicine", "arts"],
        degrees: ["undergraduate", "graduate", "phd"],
        tuition: 52000,
        acceptance: 5,
        ranking: "#1 in National Universities",
        description: "Ivy League university known for excellence in law, business, and medicine. World-class faculty and resources.",
        image: "https://images.unsplash.com/photo-1541178735493-479c1a27ed24?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        highlighted: true
    },
    {
        id: 2,
        name: "Massachusetts Institute of Technology",
        country: "us",
        state: "massachusetts",
        city: "cambridge",
        field: ["engineering"],
        degrees: ["undergraduate", "graduate", "phd"],
        tuition: 53800,
        acceptance: 7,
        ranking: "#1 in Engineering",
        description: "Premier institution for science and technology education with cutting-edge research facilities.",
        image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        highlighted: true
    },
    {
        id: 3,
        name: "Stanford University",
        country: "us",
        state: "california",
        city: "stanford",
        field: ["engineering", "business"],
        degrees: ["undergraduate", "graduate", "phd"],
        tuition: 56000,
        acceptance: 4,
        ranking: "#2 in National Universities",
        description: "Located in Silicon Valley, known for entrepreneurship and innovation across disciplines.",
        image: "https://images.unsplash.com/photo-1546521343-4eb2c01aa44b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        highlighted: true
    },
    {
        id: 4,
        name: "University of Oxford",
        country: "uk",
        state: "england",
        city: "oxford",
        field: ["medicine", "arts"],
        degrees: ["undergraduate", "graduate", "phd"],
        tuition: 35000,
        acceptance: 17,
        ranking: "#1 in World University Rankings",
        description: "One of the world's oldest and most prestigious universities with tutorial-based teaching.",
        image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        highlighted: false
    },
    {
        id: 5,
        name: "University of Toronto",
        country: "ca",
        state: "ontario",
        city: "toronto",
        field: ["medicine", "engineering"],
        degrees: ["undergraduate", "graduate", "phd"],
        tuition: 48000,
        acceptance: 43,
        ranking: "#1 in Canada",
        description: "Canada's leading university with strengths in medical research and engineering.",
        image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        highlighted: false
    },
    {
        id: 6,
        name: "University of Melbourne",
        country: "au",
        state: "victoria",
        city: "melbourne",
        field: ["business", "arts"],
        degrees: ["undergraduate", "graduate"],
        tuition: 42000,
        acceptance: 70,
        ranking: "#1 in Australia",
        description: "Australia's top-ranked university with a strong focus on research and industry engagement.",
        image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        highlighted: false
    },
    {
        id: 7,
        name: "California Institute of Technology",
        country: "us",
        state: "california",
        city: "pasadena",
        field: ["engineering"],
        degrees: ["undergraduate", "graduate", "phd"],
        tuition: 58000,
        acceptance: 6,
        ranking: "#4 in Engineering",
        description: "Small but elite institution focused on science and engineering with a low student-to-faculty ratio.",
        image: "https://images.unsplash.com/photo-1546521343-4eb2c01aa44b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        highlighted: false
    },
    {
        id: 8,
        name: "London School of Economics",
        country: "uk",
        state: "england",
        city: "london",
        field: ["business"],
        degrees: ["undergraduate", "graduate"],
        tuition: 23000,
        acceptance: 16,
        ranking: "#2 in Social Sciences",
        description: "Specializing in social sciences with a strong focus on economics, politics, and law.",
        image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        highlighted: false
    },
    {
        id: 9,
        name: "Indian Institute of Technology Bombay",
        country: "ind",
        state: "maharashtra",
        city: "mumbai",
        field: ["engineering", "science"],
        degrees: ["undergraduate", "graduate", "phd"],
        tuition: 3000,
        acceptance: 1.5,
        ranking: "#1 in Engineering (India)",
        description: "Premier engineering institute in India known for research, innovation, and academic excellence.",
        image: "/../static/images/ind1.png",
        highlighted: true
    },
    {
        id: 10,
        name: "Indian Institute of Management Ahmedabad",
        country: "ind",
        state: "gujarat",
        city: "ahmedabad",
        field: ["business"],
        degrees: ["graduate", "phd"],
        tuition: 25000,
        acceptance: 1,
        ranking: "#1 in Business (India)",
        description: "Top business school in India offering world-class MBA and executive programs.",
        image: "/../static/images/ind2.png",
        highlighted: true
    },
    {
        id: 11,
        name: "University of Delhi",
        country: "ind",
        state: "delhi",
        city: "new delhi",
        field: ["arts", "science", "commerce"],
        degrees: ["undergraduate", "graduate"],
        tuition: 500,
        acceptance: 10,
        ranking: "#1 in Arts and Science (India)",
        description: "Leading central university in India known for quality education and diverse programs.",
        image: "/../static/images/ind3.png",
        highlighted: false
    },
    {
        id: 12,
        name: "Manipal Academy of Higher Education",
        country: "ind",
        state: "karnataka",
        city: "manipal",
        field: ["medicine", "engineering", "business"],
        degrees: ["undergraduate", "graduate"],
        tuition: 9000,
        acceptance: 30,
        ranking: "#6 in Private Universities (India)",
        description: "Private deemed university offering multidisciplinary programs with modern facilities.",
        image: "/../static/images/ind4.png",
        highlighted: false
    }
];

const locationData = {
    us: {
        name: "United States",
        states: {
            massachusetts: {
                name: "Massachusetts",
                cities: ["cambridge", "boston", "amherst"]
            },
            california: {
                name: "California",
                cities: ["stanford", "pasadena", "berkeley", "los angeles"]
            },
            new_york: {
                name: "New York",
                cities: ["new york", "ithaca", "albany"]
            }
        }
    },
    uk: {
        name: "United Kingdom",
        states: {
            england: {
                name: "England",
                cities: ["oxford", "london", "cambridge", "manchester"]
            },
            scotland: {
                name: "Scotland",
                cities: ["edinburgh", "glasgow"]
            }
        }
    },
    ca: {
        name: "Canada",
        states: {
            ontario: {
                name: "Ontario",
                cities: ["toronto", "waterloo", "ottawa"]
            },
            british_columbia: {
                name: "British Columbia",
                cities: ["vancouver", "victoria"]
            }
        }
    },
    au: {
        name: "Australia",
        states: {
            victoria: {
                name: "Victoria",
                cities: ["melbourne"]
            },
            new_south_wales: {
                name: "New South Wales",
                cities: ["sydney", "newcastle"]
            }
        }
    },
    ind: {
        name: "India",
        states: {
            maharashtra: {
                name: "Maharashtra",
                cities: ["mumbai"]
            },
            gujarat: {
                name: "Gujarat",
                cities: ["ahmedabad"]
            },
            delhi: {
                name: "Delhi",
                cities: ["new delhi"]
            },
            karnataka: {
                name: "Karnataka",
                cities: ["manipal"]
            }
        }
    }
};

// DOM elements
const countryFilter = document.getElementById('countryFilter');
const stateFilter = document.getElementById('stateFilter');
const cityFilter = document.getElementById('cityFilter');
const fieldFilter = document.getElementById('fieldFilter');
const undergradCheckbox = document.getElementById('undergradCheckbox');
const gradCheckbox = document.getElementById('gradCheckbox');
const phdCheckbox = document.getElementById('phdCheckbox');
const tuitionRange = document.getElementById('tuitionRange');
const minTuition = document.getElementById('minTuition');
const maxTuition = document.getElementById('maxTuition');
const difficultyFilter = document.getElementById('difficultyFilter');
const resetFilters = document.getElementById('resetFilters');
const sortBy = document.getElementById('sortBy');
const resultsCount = document.getElementById('resultsCount');
const collegeResultsContainer = document.getElementById('collegeResultsContainer');
const paginationContainer = document.getElementById('paginationContainer');
const searchInput = document.querySelector('.search_box_inside_instutution');

// Pagination variables
let currentPage = 1;
const collegesPerPage = 8;
let filteredColleges = colleges; // Store filtered colleges globally

// Initialize the page
document.addEventListener('DOMContentLoaded', function () {
    // Set up event listeners
    countryFilter.addEventListener('change', updateLocationFilters);
    stateFilter.addEventListener('change', updateCityFilter);
    searchInput.addEventListener('input', () => filterColleges(true));
    // Filter event listeners (reset page only on filter change)
    countryFilter.addEventListener('change', () => filterColleges(true));
    stateFilter.addEventListener('change', () => filterColleges(true));
    cityFilter.addEventListener('change', () => filterColleges(true));
    fieldFilter.addEventListener('change', () => filterColleges(true));
    undergradCheckbox.addEventListener('change', () => filterColleges(true));
    gradCheckbox.addEventListener('change', () => filterColleges(true));
    phdCheckbox.addEventListener('change', () => filterColleges(true));
    tuitionRange.addEventListener('input', updateTuitionDisplay);
    tuitionRange.addEventListener('change', () => filterColleges(true));
    difficultyFilter.addEventListener('change', () => filterColleges(true));
    sortBy.addEventListener('change', () => filterColleges(true));
    resetFilters.addEventListener('click', resetAllFilters);

    // Initial display
    updateLocationFilters();
    updateTuitionDisplay();
    filterColleges(false);
});

// Update location filters based on country selection
function updateLocationFilters() {
    const country = countryFilter.value;

    // Reset state and city filters
    stateFilter.innerHTML = '<option value="all">All States/Provinces</option>';
    cityFilter.innerHTML = '<option value="all">All District</option>';

    if (country === 'all') {
        stateFilter.disabled = true;
        cityFilter.disabled = true;
    } else {
        stateFilter.disabled = false;
        cityFilter.disabled = true;

        // Populate states
        const states = locationData[country].states;
        for (const [key, state] of Object.entries(states)) {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = state.name;
            stateFilter.appendChild(option);
        }
    }
}

// Update city filter based on state selection
function updateCityFilter() {
    const country = countryFilter.value;
    const state = stateFilter.value;

    // Reset city filter
    cityFilter.innerHTML = '<option value="all">All District</option>';

    if (state === 'all') {
        cityFilter.disabled = true;
    } else {
        cityFilter.disabled = false;

        // Populate cities
        const cities = locationData[country].states[state].cities;
        cities.forEach(city => {
            const option = document.createElement('option');
            option.value = city;
            option.textContent = city.charAt(0).toUpperCase() + city.slice(1);
            cityFilter.appendChild(option);
        });
    }
}

// Update tuition range display
function updateTuitionDisplay() {
    const value = parseInt(tuitionRange.value);
    maxTuition.textContent = value === 100000 ? '$100,000+' : `$${value.toLocaleString()}`;
}

// Reset all filters
function resetAllFilters() {
    countryFilter.value = 'all';
    fieldFilter.value = 'all';
    undergradCheckbox.checked = true;
    gradCheckbox.checked = true;
    phdCheckbox.checked = true;
    tuitionRange.value = 100000;
    difficultyFilter.value = 'all';
    sortBy.value = 'relevance';

    updateLocationFilters();
    updateTuitionDisplay();
    filterColleges(true);
    searchInput.value = '';
}

// Filter colleges based on current filters
function filterColleges(resetPage = false) {
    const searchTerm = searchInput.value.trim().toLowerCase();
    // Reset current page only if explicitly requested (e.g., filter change)
    if (resetPage) {
        currentPage = 1;
    }

    // Get filter values
    const country = countryFilter.value;
    const state = stateFilter.value;
    const city = cityFilter.value;
    const field = fieldFilter.value;
    const undergrad = undergradCheckbox.checked;
    const grad = gradCheckbox.checked;
    const phd = phdCheckbox.checked;
    const maxTuitionValue = parseInt(tuitionRange.value);
    const difficulty = difficultyFilter.value;
    const sort = sortBy.value;

    // Filter colleges
    filteredColleges = colleges.filter(college => {
        // Search filter
        if (searchTerm && !(
            college.name.toLowerCase().includes(searchTerm) ||
            college.city.toLowerCase().includes(searchTerm) ||
            college.field.some(f => f.toLowerCase().includes(searchTerm)) || 
            college.description.toLowerCase().includes(searchTerm)
        )) {
            return false;
        }
    
        // Country filter
        if (country !== 'all' && college.country !== country) return false;
    
        // State filter
        if (state !== 'all' && college.state !== state) return false;
    
        // City filter
        if (city !== 'all' && college.city !== city) return false;
    
        // Field of study filter
        if (field !== 'all' && !college.field.includes(field)) return false;
        if (country !== 'all' && college.country !== country) return false;
        // Degree level filter
        const degreeMatch =
            (undergrad && college.degrees.includes('undergraduate')) ||
            (grad && college.degrees.includes('graduate')) ||
            (phd && college.degrees.includes('phd'));
        if (!degreeMatch) return false;
    
        // Tuition filter
        if (college.tuition > maxTuitionValue) return false;
    
        // Difficulty filter
        if (difficulty !== 'all') {
            if (difficulty === 'easy' && college.acceptance <= 50) return false;
            if (difficulty === 'moderate' && (college.acceptance <= 30 || college.acceptance > 50)) return false;
            if (difficulty === 'competitive' && (college.acceptance <= 15 || college.acceptance > 30)) return false;
            if (difficulty === 'highly' && college.acceptance > 15) return false;
        }
    
        return true;
    });

    // Sort colleges
    filteredColleges = sortColleges(filteredColleges, sort);

    // Update results count
    resultsCount.textContent = `Matching Colleges (${filteredColleges.length})`;

    // Display results
    displayColleges();
}

// Sort colleges based on selected option
function sortColleges(collegesToSort, sortOption) {
    switch (sortOption) {
        case 'name-asc':
            return [...collegesToSort].sort((a, b) => a.name.localeCompare(b.name));
        case 'name-desc':
            return [...collegesToSort].sort((a, b) => b.name.localeCompare(a.name));
        case 'tuition-asc':
            return [...collegesToSort].sort((a, b) => a.tuition - b.tuition);
        case 'tuition-desc':
            return [...collegesToSort].sort((a, b) => b.tuition - a.tuition);
        default: // 'relevance'
            return [...collegesToSort].sort((a, b) => {
                if (a.highlighted && !b.highlighted) return -1;
                if (!a.highlighted && b.highlighted) return 1;
                return a.name.localeCompare(b.name);
            });
    }
}

// Display colleges with pagination
function displayColleges() {
    // Calculate total pages
    const totalPages = Math.ceil(filteredColleges.length / collegesPerPage);

    // Adjust current page if it exceeds total pages
    if (currentPage > totalPages && totalPages > 0) {
        currentPage = totalPages;
    }

    // Clear previous results
    collegeResultsContainer.innerHTML = '';

    if (filteredColleges.length === 0) {
        collegeResultsContainer.innerHTML = `
      <div class="no_results">
        <h3>No colleges match your filters</h3>
        <p>Try adjusting your search criteria or <a href="#" id="resetLink">reset all filters</a>.</p>
      </div>
    `;
        document.getElementById('resetLink')?.addEventListener('click', function (e) {
            e.preventDefault();
            resetAllFilters();
        });
        paginationContainer.innerHTML = '';
        return;
    }

    // Display colleges for current page
    updateDisplayedColleges(totalPages);
}

// Create a college card element
function createCollegeCard(college) {
    const card = document.createElement('article');
    card.className = `college_info_card ${college.highlighted ? 'highlighted' : ''}`;

    const acceptanceText = `Acceptance: ${college.acceptance}%`;
    const countryName = locationData[college.country].name;
    const stateName = locationData[college.country].states[college.state].name;
    const cityName = college.city.charAt(0).toUpperCase() + college.city.slice(1);

    card.innerHTML = `
    <div class="college_card_image">
      <img src="${college.image}" alt="${college.name}">
      <span class="college_favorite_icon">♥</span>
    </div>
    <div class="college_card_content">
      <h3 class="college_card_title">${college.name}</h3>
      <div class="college_card_location">
        <span class="college_card_country">${countryName}</span>,
        <span class="college_card_state">${stateName}</span>,
        <span class="college_card_city">${cityName}</span>
      </div>
      <div class="college_card_meta">
        <span class="college_card_ranking">${college.ranking}</span>
        <span class="college_card_acceptance">${acceptanceText}</span>
      </div>
      <p class="college_card_description">
        ${college.description}
      </p>
      <div class="college_card_footer">
        <span class="college_card_tuition">Tuition: $${college.tuition.toLocaleString()}/year</span>
        <a href="#" class="college_card_cta" data-college-id="${college.id}">View Details</a>
      </div>
    </div>
  `;

    return card;
}

// Display pagination controls
function displayPagination(totalPages) {
    if (totalPages <= 1) {
        paginationContainer.innerHTML = '';
        return;
    }

    let paginationHTML = `
    <button class="pagination_prev" ${currentPage === 1 ? 'disabled' : ''}>Previous</button>
    <div class="pagination_pages">
  `;

    for (let i = 1; i <= totalPages; i++) {
        paginationHTML += `
      <span class="pagination_page ${currentPage === i ? 'active' : ''}" data-page="${i}">${i}</span>
    `;
    }

    paginationHTML += `
    </div>
    <button class="pagination_next" ${currentPage === totalPages ? 'disabled' : ''}>Next</button>
  `;

    paginationContainer.innerHTML = paginationHTML;

    // Add event listeners to pagination buttons
    const prevButton = document.querySelector('.pagination_prev');
    const nextButton = document.querySelector('.pagination_next');
    const pageButtons = document.querySelectorAll('.pagination_page');

    prevButton?.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayColleges();
        }
    });

    nextButton?.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            displayColleges();
        }
    });

    pageButtons.forEach(page => {
        page.addEventListener('click', function () {
            currentPage = parseInt(this.dataset.page);
            displayColleges();
        });
    });
}

// Update displayed colleges for current page
function updateDisplayedColleges(totalPages) {
    const startIndex = (currentPage - 1) * collegesPerPage;
    const endIndex = Math.min(startIndex + collegesPerPage, filteredColleges.length);

    collegeResultsContainer.innerHTML = '';

    for (let i = startIndex; i < endIndex; i++) {
        const college = filteredColleges[i];
        collegeResultsContainer.appendChild(createCollegeCard(college));
    }

    // Display pagination
    displayPagination(totalPages);

    // Add favorite button functionality
    document.querySelectorAll('.college_favorite_icon').forEach(button => {
        button.addEventListener('click', function () {
            this.classList.toggle('favorited');
        });
    });
    // Add click handler to View Details buttons
    document.querySelectorAll('.college_card_cta').forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            const collegeId = parseInt(this.dataset.collegeId);
            showCollegeDetails(collegeId);
        });
    });
}


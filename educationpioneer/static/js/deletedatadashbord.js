
// document.addEventListener('DOMContentLoaded', function () {
//     const searchInput = document.getElementById('searchInput');
//     const stateFilter = document.getElementById('stateFilter');
//     const countryFilter = document.getElementById('countryFilter');

//     function fetchFilteredData() {
//         const params = new URLSearchParams();
//         if (searchInput.value) params.append('search', searchInput.value);
//         if (stateFilter.value) params.append('state', stateFilter.value);
//         if (countryFilter.value) params.append('country', countryFilter.value);

//         fetch(`?${params.toString()}`, {
//             headers: {
//                 'X-Requested-With': 'XMLHttpRequest'
//             }
//         })
//         .then(res => res.json())
//         .then(data => {
//             document.querySelector('.table-responsive').innerHTML = data.html;
//         });
//     }

//     searchInput.addEventListener('keyup', function (e) {
//         if (e.key === 'Enter') fetchFilteredData();
//     });
//     stateFilter.addEventListener('change', fetchFilteredData);
//     countryFilter.addEventListener('change', fetchFilteredData);
// });


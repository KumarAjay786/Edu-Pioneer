document.addEventListener('DOMContentLoaded', function () {
    const courseTypeSelect = document.getElementById('courseType');
    const courseSelect = document.getElementById('course');

    // Comprehensive course list by type
    const courses = {
        pu: [
            { value: 'pu_science_pcmb', text: 'PCMB (Physics, Chemistry, Math, Biology)' },
            { value: 'pu_science_pcmc', text: 'PCMC (Physics, Chemistry, Math, Computer)' },
            { value: 'pu_commerce', text: 'Commerce (Accounts, Business, Economics)' },
            { value: 'pu_arts', text: 'Arts (History, Political Science, Sociology)' },
            { value: 'pu_vocational', text: 'Vocational Stream' }
        ],
        diploma: [
            { value: 'diploma_engineering', text: 'Engineering Diploma' },
            { value: 'diploma_management', text: 'Management Diploma' },
            { value: 'diploma_computer', text: 'Computer Applications' },
            { value: 'diploma_medical', text: 'Medical Laboratory' },
            { value: 'diploma_hotel', text: 'Hotel Management' },
            { value: 'diploma_animation', text: 'Animation & Multimedia' }
        ],
        degree: [
            { value: 'btech', text: 'B.Tech (Engineering)' },
            { value: 'bsc', text: 'B.Sc (Science)' },
            { value: 'bcom', text: 'B.Com (Commerce)' },
            { value: 'ba', text: 'B.A (Arts)' },
            { value: 'bba', text: 'BBA (Business Administration)' },
            { value: 'bca', text: 'BCA (Computer Applications)' },
            { value: 'bsw', text: 'BSW (Social Work)' },
            { value: 'bhm', text: 'BHM (Hotel Management)' },
            { value: 'bdes', text: 'B.Des (Design)' },
            { value: 'bams', text: 'BAMS (Ayurvedic Medicine)' }
        ],
        integrated: [
            { value: 'int_btech_mtech', text: 'Integrated B.Tech + M.Tech' },
            { value: 'int_bsc_msc', text: 'Integrated B.Sc + M.Sc' },
            { value: 'int_bba_mba', text: 'Integrated BBA + MBA' },
            { value: 'int_llb', text: 'Integrated Law (BA LLB, BBA LLB)' }
        ],
        master: [
            { value: 'mtech', text: 'M.Tech (Engineering)' },
            { value: 'msc', text: 'M.Sc (Science)' },
            { value: 'mcom', text: 'M.Com (Commerce)' },
            { value: 'ma', text: 'M.A (Arts)' },
            { value: 'mba', text: 'MBA (Business Administration)' },
            { value: 'mca', text: 'MCA (Computer Applications)' },
            { value: 'msw', text: 'MSW (Social Work)' },
            { value: 'mphil', text: 'M.Phil (Research)' }
        ],
        phd: [
            { value: 'phd_engineering', text: 'PhD in Engineering' },
            { value: 'phd_science', text: 'PhD in Science' },
            { value: 'phd_commerce', text: 'PhD in Commerce' },
            { value: 'phd_arts', text: 'PhD in Arts' },
            { value: 'phd_management', text: 'PhD in Management' }
        ],
        pg_diploma: [
            { value: 'pgd_management', text: 'PG Diploma in Management' },
            { value: 'pgd_computer', text: 'PG Diploma in Computer Applications' },
            { value: 'pgd_analytics', text: 'PG Diploma in Data Analytics' },
            { value: 'pgd_digital_marketing', text: 'PG Diploma in Digital Marketing' }
        ],
        certificate: [
            { value: 'cert_programming', text: 'Programming Certificate' },
            { value: 'cert_digital_marketing', text: 'Digital Marketing' },
            { value: 'cert_graphic_design', text: 'Graphic Design' },
            { value: 'cert_foreign_language', text: 'Foreign Language' },
            { value: 'cert_accounting', text: 'Accounting' }
        ],
        vocational: [
            { value: 'voc_it', text: 'IT/Computer Vocational' },
            { value: 'voc_electrician', text: 'Electrician Training' },
            { value: 'voc_plumbing', text: 'Plumbing Training' },
            { value: 'voc_beauty', text: 'Beauty & Wellness' },
            { value: 'voc_tailoring', text: 'Fashion & Tailoring' }
        ],
        distance: [
            { value: 'dist_ba', text: 'BA (Distance)' },
            { value: 'dist_bcom', text: 'B.Com (Distance)' },
            { value: 'dist_mba', text: 'MBA (Distance)' },
            { value: 'dist_mca', text: 'MCA (Distance)' }
        ]
    };

    // Update courses when course type changes
    courseTypeSelect.addEventListener('change', function () {
        const selectedType = this.value;
        courseSelect.innerHTML = '<option value="" selected disabled>Select course</option>';

        if (selectedType && courses[selectedType]) {
            courseSelect.disabled = false;
            courses[selectedType].forEach(course => {
                const option = document.createElement('option');
                option.value = course.value;
                option.textContent = course.text;
                courseSelect.appendChild(option);
            });
        } else {
            courseSelect.disabled = true;
        }
    });

    // Form submission
    document.getElementById('studentForm').addEventListener('submit', function (e) {
        e.preventDefault();

        if (!this.checkValidity()) {
            e.stopPropagation();
            this.classList.add('was-validated');
            return;
        }

        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            mobile: document.getElementById('mobile').value,
            email: document.getElementById('email').value,
            address: document.getElementById('address').value,
            courseType: document.getElementById('courseType').value,
            course: document.getElementById('course').value
        };

        console.log('Form submitted:', formData);
        alert('Registration successful!');

        // Reset form
        this.reset();
        this.classList.remove('was-validated');
        courseSelect.innerHTML = '<option value="" selected disabled>First select course type</option>';
        courseSelect.disabled = true;
    });
});

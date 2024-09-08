var _a;
(_a = document.getElementById('resumeform')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', function (event) {
    event.preventDefault();
    // Type assertion
    var nameElement = document.getElementById('name');
    var emailElement = document.getElementById('email');
    var phoneElement = document.getElementById('phone');
    var educationElement = document.getElementById('education');
    var skillsElement = document.getElementById('skills');
    var experienceElement = document.getElementById('experience');
    var profilePictureElement = document.getElementById('profilePicture');
    if (nameElement && emailElement && phoneElement && educationElement && skillsElement && experienceElement) {
        var name_1 = nameElement.value;
        var email_1 = emailElement.value;
        var phone_1 = phoneElement.value;
        var education_1 = educationElement.value;
        var skills_1 = skillsElement.value;
        var experience_1 = experienceElement.value;
        var profilePictureURL_1 = '';
        if (profilePictureElement && profilePictureElement.files && profilePictureElement.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                if (e.target && e.target.result) {
                    profilePictureURL_1 = e.target.result.toString();
                    updateResumeOutput(name_1, email_1, phone_1, education_1, skills_1, experience_1, profilePictureURL_1);
                }
            };
            reader.readAsDataURL(profilePictureElement.files[0]);
        }
        else {
            // If no profile picture is uploaded, update without image
            updateResumeOutput(name_1, email_1, phone_1, education_1, skills_1, experience_1, profilePictureURL_1);
        }
    }
    else {
        console.error('One or more form elements are missing!');
    }
});
function updateResumeOutput(name, email, phone, education, skills, experience, profilePictureURL) {
    // Creating resume output
    var resumeOutput = "\n        <h2>Resume</h2>\n        ".concat(profilePictureURL ? "<img src=\"".concat(profilePictureURL, "\" alt=\"Profile Picture\" class=\"output-img\">") : '', "\n        <p><strong>Name:</strong><span id=\"edit-name\" class=\"editable\"> ").concat(name, "</span></p>\n        <p><strong>Email:</strong><span id=\"edit-edit\" class=\"editable\"> ").concat(email, "</span></p>\n        <p><strong>Phone Number:</strong><span id=\"edit-phone\" class=\"editable\"> ").concat(phone, "</span></p>\n\n        <h3>Education</h3>\n        <p id=\"edit-education\" class=\"editable\">").concat(education, "</p>\n\n        <h3>Skills</h3>\n        <p id=\"edit-skills\" class=\"editable\">").concat(skills, "</p>\n\n        <h3>Experience</h3>\n        <p id=\"edit-experience\" class=\"editable\">").concat(experience, "</p>\n    ");
    var resumeOutputElement = document.getElementById('resumeOutput');
    if (resumeOutputElement) {
        resumeOutputElement.innerHTML = resumeOutput;
        makeEditable();
    }
    else {
        console.error('The resume output element is missing!');
    }
}
;
function makeEditable() {
    var makeEditableElements = document.querySelectorAll('.editable');
    makeEditableElements.forEach(function (element) {
        element.addEventListener('click', function () {
            var _a;
            var currentElement = element;
            var currentValue = currentElement.textContent || "";
            // Replace content 
            if (currentElement.tagName === "p" || currentElement.tagName === 'SPAN') {
                var input_1 = document.createElement('input');
                input_1.type = 'text';
                input_1.value = currentValue;
                input_1.classList.add('editing-input');
                input_1.addEventListener('blur', function () {
                    currentElement.textContent = input_1.value;
                    currentElement.style.display = 'inline';
                    input_1.remove();
                });
                currentElement.style.display = 'none';
                (_a = currentElement.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(input_1, currentElement);
                input_1.focus();
            }
        });
    });
}

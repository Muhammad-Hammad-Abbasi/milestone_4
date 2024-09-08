document.getElementById('resumeform')?.addEventListener('submit', function(event) {
    event.preventDefault();

    // Type assertion
    const nameElement = document.getElementById('name') as HTMLInputElement;
    const emailElement = document.getElementById('email') as HTMLInputElement;
    const phoneElement = document.getElementById('phone') as HTMLInputElement;
    const educationElement = document.getElementById('education') as HTMLInputElement;
    const skillsElement = document.getElementById('skills') as HTMLInputElement;
    const experienceElement = document.getElementById('experience') as HTMLInputElement;
    const profilePictureElement = document.getElementById('profilePicture') as HTMLInputElement;

    if (nameElement && emailElement && phoneElement && educationElement && skillsElement && experienceElement) {
        const name = nameElement.value;
        const email = emailElement.value;
        const phone = phoneElement.value;
        const education = educationElement.value;
        const skills = skillsElement.value;
        const experience = experienceElement.value;

        let profilePictureURL = '';
        if (profilePictureElement && profilePictureElement.files && profilePictureElement.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                if (e.target && e.target.result) {
                    profilePictureURL = e.target.result.toString();
                    updateResumeOutput(name, email, phone, education, skills, experience, profilePictureURL);
                }
            };
            reader.readAsDataURL(profilePictureElement.files[0]);
        } else {
            // If no profile picture is uploaded, update without image
            updateResumeOutput(name, email, phone, education, skills, experience, profilePictureURL);
        }
    } else {
        console.error('One or more form elements are missing!');
    }
});

function updateResumeOutput(name, email, phone, education, skills, experience, profilePictureURL) {

    // Creating resume output
    const resumeOutput = `
        <h2>Resume</h2>
        ${profilePictureURL ? `<img src="${profilePictureURL}" alt="Profile Picture" class="output-img">` : ''}
        <p><strong>Name:</strong><span id="edit-name" class="editable"> ${name}</span></p>
        <p><strong>Email:</strong><span id="edit-edit" class="editable"> ${email}</span></p>
        <p><strong>Phone Number:</strong><span id="edit-phone" class="editable"> ${phone}</span></p>

        <h3>Education</h3>
        <p id="edit-education" class="editable">${education}</p>

        <h3>Skills</h3>
        <p id="edit-skills" class="editable">${skills}</p>

        <h3>Experience</h3>
        <p id="edit-experience" class="editable">${experience}</p>
    `;

    const resumeOutputElement = document.getElementById('resumeOutput');
    if (resumeOutputElement) {
        resumeOutputElement.innerHTML = resumeOutput;
        makeEditable();
    } else {
        console.error('The resume output element is missing!');
    }
};

function makeEditable(){
    const makeEditableElements  = document.querySelectorAll('.editable')
    makeEditableElements.forEach(element =>{
        element.addEventListener('click', function() {
            const currentElement = element as HTMLElement;
            const currentValue = currentElement.textContent || "";

            // Replace content 
            if(currentElement.tagName === "p" || currentElement.tagName === 'SPAN') {
                const input = document.createElement('input')
                input.type = 'text'
                input.value = currentValue
                input.classList.add('editing-input')

                input.addEventListener('blur', function(){
                    currentElement.textContent = input.value;
                    currentElement.style.display = 'inline'
                    input.remove()
                })
                currentElement.style.display = 'none'
                currentElement.parentNode?.insertBefore(input,currentElement)
                input.focus()

            }
        })
    })
}

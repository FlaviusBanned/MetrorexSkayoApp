document.addEventListener('DOMContentLoaded', () => {
    const beneficiaryTypeSelect = document.getElementById('beneficiary-type');
    const contentDynamic = document.getElementById('dynamic-fields');

    beneficiaryTypeSelect.addEventListener('change', () => {
        const beneficiaryType = beneficiaryTypeSelect.value;

        contentDynamic.innerHTML = '';

        if (beneficiaryType === 'student') {
          contentDynamic.innerHTML = `
    <div class="form-group">
        <label for="faculty">Facultate:<span class="required">*</span></label>
        <input type="text" id="faculty" name="faculty" required class="dynamic-input">
    </div>
    <div class="form-group">
        <label for="series-number">Numar si Serie:<span class="required">*</span></label>
        <input type="text" id="series-number" name="series-number" required class="dynamic-input">
    </div>
    <div class="form-group">
        <label for="institutional-mail">Email Institutie (secretariat):<span class="required">*</span></label>
        <input type="text" id="institutional-mail" name="institutional-mail" required>
    </div>
<div id="gdpr-section">
    <div class="gdpr-container">
        <p class="gdpr-text">Am verificat corectitudinea datelor personale! <span class="required">*</span></p>
        <input type="checkbox" name="GDPRtextBox" required>
    </div>
</div>



`;

        } else if (beneficiaryType === 'pupil') {
            contentDynamic.innerHTML = `
             
               <div class="form-group">
            <label for="school">Scoala:<span class="required">*</span></label>
            <input type="text" id="school" name="school" required class="dynamic-input">
        </div>
        <div class="form-group">
            <label for="institutional-mail">Email Institutie (secretariat):<span class="required">*</span></label>
            <input type="text" id="institutional-mail" name="institutional-mail" required>
        </div>
           <div id="gdpr-section">
    <div class="gdpr-container">
        <p class="gdpr-text">Am verificat corectitudinea datelor personale! <span class="required">*</span></p>
        <input type="checkbox" name="GDPRtextBox" required>
    </div>
</div>

`;
        }
    });
});

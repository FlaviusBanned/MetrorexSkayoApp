document.addEventListener('DOMContentLoaded', () => {
  //emailjs.init(); 

    const Form = document.getElementById('verification-form');

    Form.addEventListener('submit', function (event) {
        event.preventDefault();
        const Institution = (document.getElementById('faculty')?.value || document.getElementById('school')?.value);
        const Email = document.getElementById('institutional-mail').value;
        const SerialNumber = document.getElementById('series-number').value;

        if (!Email || !SerialNumber|| !Institution) {
            alert("Trebuie sa completati toate campurile necesare!");
            return;
        }
        const FormularData = {
            email: Email,
            institution: Institution,
            seriesNumber: SerialNumber,
        };
        //emailjs.send()
    });
});
